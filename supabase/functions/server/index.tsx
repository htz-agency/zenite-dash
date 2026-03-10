import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2.49.8";
import {
  type TuringRequest,
  type SessionContext,
  buildSystemPrompt,
  getConnectedSources,
  saveQueryHistory,
  executeSafeQuery,
  callGemini,
} from "./turing.tsx";

// ── Suppress "Http: connection closed before message completed" ──────────────
// This Deno runtime error fires when a client disconnects mid-response.
// It's thrown INSIDE Deno's internal HTTP layer (ext:runtime/http.js)
// AFTER the handler returns, so no try/catch or onError can intercept it.
// We suppress it at every possible level:

function isConnectionClosedError(err: any): boolean {
  if (!err) return false;
  if (err?.name === "Http") return true;
  const msg = typeof err === "string" ? err : err?.message || "";
  return (
    msg.includes("connection closed") ||
    msg.includes("connection reset") ||
    msg.includes("connection error") ||
    msg.includes("Http: connection closed")
  );
}

// 1. Global event listeners (catches unhandled rejections & errors)
globalThis.addEventListener("error", (e) => {
  if (isConnectionClosedError(e.error ?? e.message)) {
    e.preventDefault();
  }
});
globalThis.addEventListener("unhandledrejection", (e) => {
  if (isConnectionClosedError(e.reason)) {
    e.preventDefault();
  }
});

// 2. Patch console.error / console.warn to filter Deno runtime log output
//    The Deno runtime itself calls console.error for unhandled errors before
//    global listeners fire in some Edge Function versions.
const _origConsoleError = console.error;
const _origConsoleWarn = console.warn;
console.error = (...args: any[]) => {
  const first = args[0];
  if (isConnectionClosedError(first)) return;
  if (typeof first === "string" && first.includes("connection closed")) return;
  _origConsoleError.apply(console, args);
};
console.warn = (...args: any[]) => {
  const first = args[0];
  if (isConnectionClosedError(first)) return;
  if (typeof first === "string" && first.includes("connection closed")) return;
  _origConsoleWarn.apply(console, args);
};

const app = new Hono();

app.use("*", logger(console.log));

app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

/* ================================================================== */
/*  Supabase client — queries real CRM tables                         */
/* ================================================================== */

const supabase = () =>
  createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

/* ================================================================== */
/*  Helpers                                                            */
/* ================================================================== */

function monthLabel(date: string | Date): string {
  const d = new Date(date);
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  return months[d.getMonth()] || "?";
}

function monthKey(date: string | Date): string {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

/* ================================================================== */
/*  Routes                                                             */
/* ================================================================== */

app.get("/make-server-d2ca3281/health", (c) => c.json({ status: "ok" }));

// ══════════════════════════════════════════════════════════════
//  STATIC ASSETS — Supabase Storage (mascot, logos, etc.)
// ══════════════════════════════════════════════════════════════

const ASSETS_BUCKET = "make-d2ca3281-assets";

let bucketReady = false;
async function ensureAssetsBucket() {
  if (bucketReady) return;
  const db = supabase();
  const { data: buckets } = await db.storage.listBuckets();
  const exists = buckets?.some((b: any) => b.name === ASSETS_BUCKET);
  if (!exists) {
    await db.storage.createBucket(ASSETS_BUCKET, { public: false });
  }
  bucketReady = true;
}

// POST /assets/upload — Upload a named asset (e.g. turing-mascot)
app.post("/make-server-d2ca3281/assets/upload", async (c) => {
  try {
    await ensureAssetsBucket();
    const db = supabase();
    const formData = await c.req.formData();
    const file = formData.get("file") as File | null;
    const name = formData.get("name") as string | null;
    if (!file || !name) {
      return c.json({ error: "Missing 'file' or 'name' in form data" }, 400);
    }
    const ext = file.name.split(".").pop() || "png";
    const path = `${name}.${ext}`;
    const arrayBuf = await file.arrayBuffer();
    const { error } = await db.storage
      .from(ASSETS_BUCKET)
      .upload(path, arrayBuf, {
        contentType: file.type || "image/png",
        upsert: true,
      });
    if (error) {
      console.log(`[Assets] Upload error for ${path}:`, error.message);
      return c.json({ error: error.message }, 500);
    }
    console.log(`[Assets] Uploaded ${path}`);
    return c.json({ ok: true, path });
  } catch (err: any) {
    console.log("[Assets] Upload exception:", err?.message || err);
    return c.json({ error: err?.message || "Upload failed" }, 500);
  }
});

// GET /assets/:name — Get a signed URL for a named asset
app.get("/make-server-d2ca3281/assets/:name", async (c) => {
  try {
    await ensureAssetsBucket();
    const db = supabase();
    const name = c.req.param("name");
    const { data: files } = await db.storage.from(ASSETS_BUCKET).list("", { limit: 100 });
    const match = files?.find((f: any) => f.name.startsWith(name + "."));
    if (!match) {
      return c.json({ error: "Asset not found", name }, 404);
    }
    const { data, error } = await db.storage
      .from(ASSETS_BUCKET)
      .createSignedUrl(match.name, 3600);
    if (error || !data?.signedUrl) {
      console.log(`[Assets] Signed URL error for ${name}:`, error?.message);
      return c.json({ error: error?.message || "Failed to create signed URL" }, 500);
    }
    return c.json({ url: data.signedUrl, name: match.name });
  } catch (err: any) {
    console.log("[Assets] Get exception:", err?.message || err);
    return c.json({ error: err?.message || "Failed to get asset" }, 500);
  }
});

// ── GET /dash/data — Aggregate all CRM data for the BI dashboard ──
app.get("/make-server-d2ca3281/dash/data", async (c) => {
  try {
    const db = supabase();

    // Parallel fetch of all CRM tables
    const [leadsRes, oppsRes, activitiesRes, accountsRes, contactsRes] = await Promise.all([
      db.from("crm_leads").select("*").eq("is_deleted", false).order("created_at", { ascending: false }),
      db.from("crm_opportunities").select("*").order("created_at", { ascending: false }),
      db.from("crm_activities").select("*").order("created_at", { ascending: false }),
      db.from("crm_accounts").select("*").eq("is_deleted", false).order("created_at", { ascending: false }),
      db.from("crm_contacts").select("*").eq("is_deleted", false).order("created_at", { ascending: false }),
    ]);

    if (leadsRes.error) console.log("Error fetching leads:", leadsRes.error.message);
    if (oppsRes.error) console.log("Error fetching opportunities:", oppsRes.error.message);
    if (activitiesRes.error) console.log("Error fetching activities:", activitiesRes.error.message);
    if (accountsRes.error) console.log("Error fetching accounts:", accountsRes.error.message);
    if (contactsRes.error) console.log("Error fetching contacts:", contactsRes.error.message);

    const rawLeads = leadsRes.data || [];
    const rawOpps = oppsRes.data || [];
    const rawActivities = activitiesRes.data || [];
    const rawAccounts = accountsRes.data || [];
    const rawContacts = contactsRes.data || [];

    // ── Map leads ──
    const leads = rawLeads.map((l: any) => ({
      id: l.id,
      name: l.name || `${l.name || ""} ${l.lastname || ""}`.trim() || "Sem nome",
      company: l.company || "-",
      stage: l.stage || "Novo",
      value: Number(l.annual_revenue) || 0,
      owner: l.owner || "-",
      source: l.origin || l.mkt_canal || "-",
      createdAt: l.created_at ? new Date(l.created_at).toISOString().split("T")[0] : "-",
      lastActivity: l.last_activity_date ? new Date(l.last_activity_date).toISOString().split("T")[0] : "-",
      score: l.score || 0,
      email: l.email || "",
      phone: l.phone || "",
      segment: l.segment || "-",
      isActive: l.is_active !== false,
      scoreLabel: l.score_label || "-",
      qualificationProgress: l.qualification_progress || 0,
      tags: l.tags || "",
    }));

    // ── Map opportunities ──
    const opps = rawOpps.map((o: any) => ({
      id: o.id,
      name: o.name || "Sem nome",
      account: o.account || o.company || "-",
      company: o.company || "-",
      stage: o.stage || "Novo",
      value: Number(o.value) || 0,
      probability: probabilityFromStage(o.stage, o.score),
      owner: o.owner || "-",
      closeDate: o.close_date ? new Date(o.close_date).toISOString().split("T")[0] : "-",
      createdAt: o.created_at ? new Date(o.created_at).toISOString().split("T")[0] : "-",
      score: o.score || 0,
      origin: o.origin || "-",
      tipo: o.tipo || o.type || "-",
      decisor: o.decisor || "-",
      lastActivity: o.last_activity || "-",
      labels: o.labels || [],
      tag: o.tag || "",
    }));

    // ── Map activities ──
    const activities = rawActivities.map((a: any) => ({
      id: a.id,
      type: mapActivityType(a.type),
      title: a.subject || a.label || "Sem título",
      relatedTo: a.entity_id || a.related_to_id || "-",
      relatedToName: a.related_to_name || a.contact_name || "-",
      entityType: a.entity_type || a.related_to_type || "-",
      owner: a.owner || a.assigned_to || "-",
      date: a.due_date
        ? new Date(a.due_date).toISOString().split("T")[0]
        : a.date || (a.created_at ? new Date(a.created_at).toISOString().split("T")[0] : "-"),
      status: mapActivityStatus(a.status, a.completed_at, a.due_date),
      priority: a.priority || "normal",
      description: a.description || a.body || "",
    }));

    // ── Map accounts ──
    const accounts = rawAccounts.map((a: any) => ({
      id: a.id,
      name: a.name || "Sem nome",
      industry: a.sector || "-",
      revenue: Number(a.annual_revenue) || Number(a.revenue) || 0,
      employees: a.employees || 0,
      owner: a.owner || "-",
      city: a.billing_city || a.personal_city || "-",
      state: a.billing_state || a.personal_state || "-",
      phone: a.phone || "-",
      email: a.email || "-",
      website: a.website || "-",
      cnpj: a.cnpj || "-",
      type: a.type || "-",
      accountStage: a.stage || "-",
      contacts: a.contacts || 0,
      createdAt: a.created_at ? new Date(a.created_at).toISOString().split("T")[0] : "-",
    }));

    // ── Map contacts ──
    const contacts = rawContacts.map((ct: any) => ({
      id: ct.id,
      name: `${ct.name || ""} ${ct.last_name || ""}`.trim() || "Sem nome",
      role: ct.role || "-",
      company: ct.company || "-",
      account: ct.account || "-",
      email: ct.email || "-",
      phone: ct.phone || ct.mobile || "-",
      stage: ct.stage || "-",
      owner: ct.owner || "-",
      origin: ct.origin || "-",
      createdAt: ct.created_at ? new Date(ct.created_at).toISOString().split("T")[0] : "-",
    }));

    // ══════════════════════════════════════════════════════════════
    //  Computed analytics from REAL data
    // ══════════════════════════════════════════════════════════════

    // ── Monthly revenue (last 6 months) ──
    const now = new Date();
    const monthlyMap: Record<string, { leads: number; oportunidades: number; receita: number; conversao: number }> = {};
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = monthKey(d);
      monthlyMap[key] = { leads: 0, oportunidades: 0, receita: 0, conversao: 0 };
    }

    for (const l of rawLeads) {
      if (!l.created_at) continue;
      const key = monthKey(l.created_at);
      if (monthlyMap[key]) monthlyMap[key].leads++;
    }

    for (const o of rawOpps) {
      if (!o.created_at) continue;
      const key = monthKey(o.created_at);
      if (monthlyMap[key]) {
        monthlyMap[key].oportunidades++;
        monthlyMap[key].receita += Number(o.value) || 0;
      }
    }

    const monthlyRevenue = Object.entries(monthlyMap).map(([key, val]) => {
      const [y, m] = key.split("-");
      const d = new Date(Number(y), Number(m) - 1, 1);
      const totalLeads = val.leads || 1;
      return {
        month: monthLabel(d),
        leads: val.leads,
        oportunidades: val.oportunidades,
        receita: Math.round(val.receita),
        conversao: val.leads > 0 ? Math.round((val.oportunidades / val.leads) * 100) : 0,
      };
    });

    // ── Pipeline by stage ──
    const stageMap: Record<string, { count: number; value: number }> = {};
    for (const o of opps) {
      if (o.stage.startsWith("Fechad") || o.stage === "Perdida" || o.stage === "Perdido") continue;
      const stage = o.stage || "Outros";
      if (!stageMap[stage]) stageMap[stage] = { count: 0, value: 0 };
      stageMap[stage].count++;
      stageMap[stage].value += o.value;
    }
    const pipelineByStage = Object.entries(stageMap)
      .map(([stage, data]) => ({ stage, count: data.count, value: Math.round(data.value) }))
      .sort((a, b) => b.value - a.value);

    // ── Leads by source ──
    const sourceMap: Record<string, { count: number; value: number }> = {};
    for (const l of leads) {
      const source = l.source && l.source !== "-" ? l.source : "Outros";
      if (!sourceMap[source]) sourceMap[source] = { count: 0, value: 0 };
      sourceMap[source].count++;
      sourceMap[source].value += l.value;
    }
    const leadsBySource = Object.entries(sourceMap)
      .map(([source, data]) => ({ source, count: data.count, value: Math.round(data.value) }))
      .sort((a, b) => b.count - a.count);

    // ── Activity by type ──
    const TYPE_COLORS: Record<string, string> = {
      tarefa: "#0483AB",
      compromisso: "#3CCEA7",
      ligacao: "#917822",
      email: "#ED5200",
      nota: "#6868B1",
      mensagem: "#07ABDE",
    };
    const TYPE_LABELS: Record<string, string> = {
      tarefa: "Tarefas",
      compromisso: "Compromissos",
      ligacao: "Ligações",
      email: "Emails",
      nota: "Notas",
      mensagem: "Mensagens",
    };
    const typeMap: Record<string, number> = {};
    for (const a of activities) {
      const t = a.type || "tarefa";
      typeMap[t] = (typeMap[t] || 0) + 1;
    }
    const activityByType = Object.entries(typeMap)
      .map(([type, count]) => ({
        type: TYPE_LABELS[type] || type,
        count,
        color: TYPE_COLORS[type] || "#4E6987",
      }))
      .sort((a, b) => b.count - a.count);

    // ── Weekly activities (current week) ──
    const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const weeklyData: Record<string, { tarefas: number; compromissos: number; ligacoes: number; emails: number }> = {};
    for (const dayName of dayNames) {
      weeklyData[dayName] = { tarefas: 0, compromissos: 0, ligacoes: 0, emails: 0 };
    }
    for (const a of rawActivities) {
      const dateStr = a.due_date || a.date || a.created_at;
      if (!dateStr) continue;
      const d = new Date(dateStr);
      const dayDiff = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
      if (dayDiff < 0 || dayDiff > 7) continue;
      const dayName = dayNames[d.getDay()];
      const type = mapActivityType(a.type);
      if (weeklyData[dayName]) {
        if (type === "tarefa") weeklyData[dayName].tarefas++;
        else if (type === "compromisso") weeklyData[dayName].compromissos++;
        else if (type === "ligacao") weeklyData[dayName].ligacoes++;
        else if (type === "email") weeklyData[dayName].emails++;
      }
    }
    const weeklyActivities = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((day) => ({
      day,
      ...weeklyData[day],
    }));

    // ── Conversion funnel (approximate) ──
    const totalVisitantes = rawLeads.length * 5; // rough approximation
    const totalLeadsCaptados = rawLeads.length;
    const mqls = rawLeads.filter((l: any) => (l.score || 0) >= 30).length;
    const sqls = rawLeads.filter((l: any) => (l.score || 0) >= 60).length;
    const totalOpps = rawOpps.length;
    const totalClientes = rawOpps.filter((o: any) => {
      const s = (o.stage || "").toLowerCase();
      return s.includes("ganho") || s.includes("ganha") || s.includes("won") || s.includes("fechado ganho") || s.includes("fechada ganha");
    }).length;

    const conversionFunnel = [
      { stage: "Visitantes", value: totalVisitantes || 1 },
      { stage: "Leads Captados", value: totalLeadsCaptados || 0 },
      { stage: "MQLs", value: mqls || 0 },
      { stage: "SQLs", value: sqls || 0 },
      { stage: "Oportunidades", value: totalOpps || 0 },
      { stage: "Clientes", value: totalClientes || 0 },
    ];

    // ── Reports (from KV store — keep this for user-created reports) ──
    let reports: any[] = [];
    try {
      const { default: kv } = await import("./kv_store.tsx");
    } catch (_) {}
    // fallback to empty - reports are a UI concern

    return c.json({
      leads,
      opportunities: opps,
      activities,
      accounts,
      contacts,
      monthlyRevenue,
      pipelineByStage,
      leadsBySource,
      activityByType,
      weeklyActivities,
      conversionFunnel,
      reports: [],
      meta: {
        totalLeads: rawLeads.length,
        totalOpportunities: rawOpps.length,
        totalActivities: rawActivities.length,
        totalAccounts: rawAccounts.length,
        totalContacts: rawContacts.length,
        fetchedAt: new Date().toISOString(),
      },
    });
  } catch (err) {
    console.log(`Error in /dash/data: ${err}`);
    return c.json({ error: `Failed to fetch CRM data: ${err}` }, 500);
  }
});

// ── GET /dash/leads — Raw leads ──
app.get("/make-server-d2ca3281/dash/leads", async (c) => {
  try {
    const db = supabase();
    const { data, error } = await db.from("crm_leads").select("*").eq("is_deleted", false).order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return c.json({ data: data || [], count: data?.length || 0 });
  } catch (err) {
    console.log(`Error fetching leads: ${err}`);
    return c.json({ error: `${err}` }, 500);
  }
});

// ── GET /dash/opportunities — Raw opportunities ──
app.get("/make-server-d2ca3281/dash/opportunities", async (c) => {
  try {
    const db = supabase();
    const { data, error } = await db.from("crm_opportunities").select("*").order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return c.json({ data: data || [], count: data?.length || 0 });
  } catch (err) {
    console.log(`Error fetching opportunities: ${err}`);
    return c.json({ error: `${err}` }, 500);
  }
});

// ── GET /dash/activities — Raw activities ──
app.get("/make-server-d2ca3281/dash/activities", async (c) => {
  try {
    const db = supabase();
    const { data, error } = await db.from("crm_activities").select("*").order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return c.json({ data: data || [], count: data?.length || 0 });
  } catch (err) {
    console.log(`Error fetching activities: ${err}`);
    return c.json({ error: `${err}` }, 500);
  }
});

// ── GET /dash/accounts — Raw accounts ──
app.get("/make-server-d2ca3281/dash/accounts", async (c) => {
  try {
    const db = supabase();
    const { data, error } = await db.from("crm_accounts").select("*").eq("is_deleted", false).order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return c.json({ data: data || [], count: data?.length || 0 });
  } catch (err) {
    console.log(`Error fetching accounts: ${err}`);
    return c.json({ error: `${err}` }, 500);
  }
});

// ── GET /dash/contacts — Raw contacts ──
app.get("/make-server-d2ca3281/dash/contacts", async (c) => {
  try {
    const db = supabase();
    const { data, error } = await db.from("crm_contacts").select("*").eq("is_deleted", false).order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return c.json({ data: data || [], count: data?.length || 0 });
  } catch (err) {
    console.log(`Error fetching contacts: ${err}`);
    return c.json({ error: `${err}` }, 500);
  }
});

// ══════════════════════════════════════════════════════════════
//  Builder Layout Persistence (KV Store)
// ══════════════════════════════════════════════════════════════

// ── GET /dash/builder/layout — Load saved builder layout ──
app.get("/make-server-d2ca3281/dash/builder/layout", async (c) => {
  try {
    const kv = await import("./kv_store.tsx");
    const userId = c.req.query("userId") || "default";
    const key = `dash-builder-layout:${userId}`;
    const result = await kv.get(key);
    if (!result) {
      return c.json({ layout: null });
    }
    return c.json({ layout: typeof result === "string" ? JSON.parse(result) : result });
  } catch (err) {
    console.log(`Error loading builder layout: ${err}`);
    return c.json({ error: `Failed to load layout: ${err}` }, 500);
  }
});

// ── POST /dash/builder/layout — Save builder layout ──
app.post("/make-server-d2ca3281/dash/builder/layout", async (c) => {
  try {
    const kv = await import("./kv_store.tsx");
    const body = await c.req.json();
    const userId = body.userId || "default";
    const key = `dash-builder-layout:${userId}`;
    const payload = {
      widgets: body.widgets,
      layouts: body.layouts,
      savedAt: new Date().toISOString(),
    };
    await kv.set(key, payload);
    return c.json({ success: true, savedAt: new Date().toISOString() });
  } catch (err) {
    console.log(`Error saving builder layout: ${err}`);
    return c.json({ error: `Failed to save layout: ${err}` }, 500);
  }
});

// ── DELETE /dash/builder/layout — Reset builder layout ──
app.delete("/make-server-d2ca3281/dash/builder/layout", async (c) => {
  try {
    const kv = await import("./kv_store.tsx");
    const userId = c.req.query("userId") || "default";
    const key = `dash-builder-layout:${userId}`;
    await kv.del(key);
    return c.json({ success: true });
  } catch (err) {
    console.log(`Error deleting builder layout: ${err}`);
    return c.json({ error: `Failed to delete layout: ${err}` }, 500);
  }
});

// ── GET /dash/builder/layouts — List all saved layouts ──
app.get("/make-server-d2ca3281/dash/builder/layouts", async (c) => {
  try {
    const kv = await import("./kv_store.tsx");
    const results = await kv.getByPrefix("dash-builder-layout:");
    const layouts = (results || []).map((val: any, i: number) => {
      const parsed = typeof val === "string" ? JSON.parse(val) : val;
      return { index: i, ...parsed };
    });
    return c.json({ layouts });
  } catch (err) {
    console.log(`Error listing builder layouts: ${err}`);
    return c.json({ error: `Failed to list layouts: ${err}` }, 500);
  }
});

// ══════════════════════════════════════════════════════════════
//  Visual Builder Dashboard Persistence
// ══════════════════════════════════════════════════════════════

// ── POST /dash/visual-builder/save — Save a visual builder dashboard ──
app.post("/make-server-d2ca3281/dash/visual-builder/save", async (c) => {
  try {
    const kv = await import("./kv_store.tsx");
    const body = await c.req.json();
    
    const dashboardId = body.id || `dash-${Date.now()}`;
    const userId = body.userId || "default";
    
    const dashboard = {
      id: dashboardId,
      name: body.name || "Sem Título",
      description: body.description || "",
      isPublic: body.isPublic || false,
      userId: userId,
      config: body.config || {},
      createdAt: body.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const key = `visual-dashboard:${dashboardId}`;
    await kv.set(key, dashboard);
    
    return c.json({ success: true, dashboard });
  } catch (err) {
    console.log(`Error saving visual builder dashboard: ${err}`);
    return c.json({ error: `Failed to save dashboard: ${err}` }, 500);
  }
});

// ── GET /dash/visual-builder/list — List all saved visual builder dashboards ──
app.get("/make-server-d2ca3281/dash/visual-builder/list", async (c) => {
  try {
    const kv = await import("./kv_store.tsx");
    const userId = c.req.query("userId") || "default";
    const filter = c.req.query("filter") || "all"; // all, private, public, mine, recent
    
    const results = await kv.getByPrefix("visual-dashboard:");
    const dashboards = (results || [])
      .map((val: any) => typeof val === "string" ? JSON.parse(val) : val)
      .filter((d: any) => {
        if (filter === "private") return !d.isPublic && d.userId === userId;
        if (filter === "public") return d.isPublic;
        if (filter === "mine") return d.userId === userId;
        return true;
      })
      .sort((a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    
    return c.json({ dashboards });
  } catch (err) {
    console.log(`Error listing visual builder dashboards: ${err}`);
    return c.json({ error: `Failed to list dashboards: ${err}` }, 500);
  }
});

// ── GET /dash/visual-builder/get/:id — Get a specific dashboard ──
app.get("/make-server-d2ca3281/dash/visual-builder/get/:id", async (c) => {
  try {
    const kv = await import("./kv_store.tsx");
    const dashboardId = c.req.param("id");
    const key = `visual-dashboard:${dashboardId}`;
    
    const result = await kv.get(key);
    if (!result) {
      return c.json({ error: "Dashboard not found" }, 404);
    }
    
    const dashboard = typeof result === "string" ? JSON.parse(result) : result;
    return c.json({ dashboard });
  } catch (err) {
    console.log(`Error getting visual builder dashboard: ${err}`);
    return c.json({ error: `Failed to get dashboard: ${err}` }, 500);
  }
});

// ── DELETE /dash/visual-builder/delete/:id — Delete a dashboard ──
app.delete("/make-server-d2ca3281/dash/visual-builder/delete/:id", async (c) => {
  try {
    const kv = await import("./kv_store.tsx");
    const dashboardId = c.req.param("id");
    const key = `visual-dashboard:${dashboardId}`;
    
    await kv.del(key);
    return c.json({ success: true });
  } catch (err) {
    console.log(`Error deleting visual builder dashboard: ${err}`);
    return c.json({ error: `Failed to delete dashboard: ${err}` }, 500);
  }
});

// ══════════════════════════════════════════════════════════════
//  RELATÓRIOS (Reports) — Similar to Dashboards
// ══════════════════════════════════════════════════════════════

// ── POST /dash/visual-builder/save-report — Save a report ──
app.post("/make-server-d2ca3281/dash/visual-builder/save-report", async (c) => {
  try {
    const kv = await import("./kv_store.tsx");
    const body = await c.req.json();
    
    const reportId = body.id || `report-${Date.now()}`;
    const userId = body.userId || "default";
    
    console.log(`[save-report] Saving report "${body.name}" (id=${reportId}, isUpdate=${!!body.id})`);
    
    // Preservar createdAt do relatório original ao atualizar
    let existingCreatedAt: string | null = null;
    if (body.id) {
      try {
        const existing = await kv.get(`visual-report:${body.id}`);
        if (existing) {
          const parsed = typeof existing === "string" ? JSON.parse(existing) : existing;
          existingCreatedAt = parsed.createdAt || null;
          console.log(`[save-report] Existing report found, createdAt: ${existingCreatedAt}`);
        }
      } catch (_) {}
    }
    
    const report = {
      id: reportId,
      name: body.name || "Sem Título",
      description: body.description || "",
      isPublic: body.isPublic || false,
      userId: userId,
      config: body.config || {},
      createdAt: existingCreatedAt || body.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const key = `visual-report:${reportId}`;
    console.log(`[save-report] Writing to key: ${key}`);
    console.log(`[save-report] Config chartType: ${report.config?.chartType}, rowShelf: ${report.config?.rowShelf?.length || 0} fields, colShelf: ${report.config?.colShelf?.length || 0} fields`);
    await kv.set(key, report);
    console.log(`[save-report] Success! updatedAt: ${report.updatedAt}`);
    
    return c.json({ success: true, report });
  } catch (err) {
    console.log(`Error saving visual builder report: ${err}`);
    return c.json({ error: `Failed to save report: ${err}` }, 500);
  }
});

// ── GET /dash/visual-builder/list-reports — List all saved reports ──
app.get("/make-server-d2ca3281/dash/visual-builder/list-reports", async (c) => {
  try {
    const kv = await import("./kv_store.tsx");
    const userId = c.req.query("userId") || "default";
    const filter = c.req.query("filter") || "all"; // all, private, public, mine, recent
    
    const results = await kv.getByPrefix("visual-report:");
    const reports = (results || [])
      .map((val: any) => typeof val === "string" ? JSON.parse(val) : val)
      .filter((r: any) => {
        if (filter === "private") return !r.isPublic && r.userId === userId;
        if (filter === "public") return r.isPublic;
        if (filter === "mine") return r.userId === userId;
        return true;
      })
      .sort((a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    
    return c.json({ reports });
  } catch (err) {
    console.log(`Error listing visual builder reports: ${err}`);
    return c.json({ error: `Failed to list reports: ${err}` }, 500);
  }
});

// ── GET /dash/visual-builder/get-report/:id — Get a specific report ──
app.get("/make-server-d2ca3281/dash/visual-builder/get-report/:id", async (c) => {
  try {
    const kv = await import("./kv_store.tsx");
    const reportId = c.req.param("id");
    const key = `visual-report:${reportId}`;
    
    console.log(`[get-report] Fetching key: ${key}`);
    const result = await kv.get(key);
    if (!result) {
      console.log(`[get-report] Not found: ${key}`);
      return c.json({ error: "Report not found" }, 404);
    }
    
    const report = typeof result === "string" ? JSON.parse(result) : result;
    console.log(`[get-report] Found report "${report.name}" (updatedAt: ${report.updatedAt})`);
    // Impedir cache do browser — sempre retornar dados frescos
    c.header("Cache-Control", "no-store, no-cache, must-revalidate");
    c.header("Pragma", "no-cache");
    return c.json({ report });
  } catch (err) {
    console.log(`Error getting visual builder report: ${err}`);
    return c.json({ error: `Failed to get report: ${err}` }, 500);
  }
});

// ── DELETE /dash/visual-builder/delete-report/:id — Delete a report ──
app.delete("/make-server-d2ca3281/dash/visual-builder/delete-report/:id", async (c) => {
  try {
    const kv = await import("./kv_store.tsx");
    const reportId = c.req.param("id");
    const key = `visual-report:${reportId}`;
    
    await kv.del(key);
    return c.json({ success: true });
  } catch (err) {
    console.log(`Error deleting visual builder report: ${err}`);
    return c.json({ error: `Failed to delete report: ${err}` }, 500);
  }
});

// ══════════════════════════════════════════════════════════════
//  PAINÉIS (Dashboard Panels / Composer)
// ══════════════════════════════════════════════════════════════

// ── POST /dash/panels/save — Save a panel (dashboard) ──
app.post("/make-server-d2ca3281/dash/panels/save", async (c) => {
  try {
    const kv = await import("./kv_store.tsx");
    const body = await c.req.json();
    
    const panelId = body.id || `panel-${Date.now()}`;
    const userId = body.userId || "default";
    
    const panel = {
      id: panelId,
      name: body.name || "Sem Título",
      description: body.description || "",
      isPublic: body.isPublic || false,
      userId,
      size: body.size || { type: "fixed", width: 1200, height: 800 },
      items: body.items || [],
      globalFilters: body.globalFilters || [],
      createdAt: body.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const key = `panel:${panelId}`;
    await kv.set(key, panel);
    
    return c.json({ success: true, panel });
  } catch (err) {
    console.log(`Error saving panel: ${err}`);
    return c.json({ error: `Failed to save panel: ${err}` }, 500);
  }
});

// ── GET /dash/panels/list — List all saved panels ──
app.get("/make-server-d2ca3281/dash/panels/list", async (c) => {
  try {
    const kv = await import("./kv_store.tsx");
    const userId = c.req.query("userId") || "default";
    const filter = c.req.query("filter") || "all";
    
    const results = await kv.getByPrefix("panel:");
    const panels = (results || [])
      .map((val: any) => typeof val === "string" ? JSON.parse(val) : val)
      .filter((p: any) => {
        if (filter === "private") return !p.isPublic && p.userId === userId;
        if (filter === "public") return p.isPublic;
        if (filter === "mine") return p.userId === userId;
        return true;
      })
      .sort((a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    
    return c.json({ panels });
  } catch (err) {
    console.log(`Error listing panels: ${err}`);
    return c.json({ error: `Failed to list panels: ${err}` }, 500);
  }
});

// ── GET /dash/panels/get/:id — Get a specific panel ──
app.get("/make-server-d2ca3281/dash/panels/get/:id", async (c) => {
  try {
    const kv = await import("./kv_store.tsx");
    const panelId = c.req.param("id");
    const key = `panel:${panelId}`;
    
    const result = await kv.get(key);
    if (!result) {
      return c.json({ error: "Panel not found" }, 404);
    }
    
    const panel = typeof result === "string" ? JSON.parse(result) : result;
    return c.json({ panel });
  } catch (err) {
    console.log(`Error getting panel: ${err}`);
    return c.json({ error: `Failed to get panel: ${err}` }, 500);
  }
});

// ── DELETE /dash/panels/delete/:id — Delete a panel ──
app.delete("/make-server-d2ca3281/dash/panels/delete/:id", async (c) => {
  try {
    const kv = await import("./kv_store.tsx");
    const panelId = c.req.param("id");
    const key = `panel:${panelId}`;
    
    await kv.del(key);
    return c.json({ success: true });
  } catch (err) {
    console.log(`Error deleting panel: ${err}`);
    return c.json({ error: `Failed to delete panel: ${err}` }, 500);
  }
});

// ══════════════════════════════════════════════════════════════
//  ZENITE SYNC — Data Feed Integration for Visual Builder
// ══════════════════════════════════════════════════════════════

// ── POST /dash/sync/config — Save Sync API connection config ──
app.post("/make-server-d2ca3281/dash/sync/config", async (c) => {
  try {
    const kv = await import("./kv_store.tsx");
    const body = await c.req.json();
    const config = {
      baseUrl: body.baseUrl || "",
      apiKey: body.apiKey || "",
      gatewayToken: body.gatewayToken || "",
      connectors: body.connectors || [], // e.g. ["google_ads", "meta_ads", "linkedin_ads"]
      updatedAt: new Date().toISOString(),
    };
    await kv.set("sync-config:default", config);
    return c.json({ success: true, config });
  } catch (err) {
    console.log(`Error saving sync config: ${err}`);
    return c.json({ error: `Failed to save sync config: ${err}` }, 500);
  }
});

// ── GET /dash/sync/config — Get Sync API connection config ──
app.get("/make-server-d2ca3281/dash/sync/config", async (c) => {
  try {
    const kv = await import("./kv_store.tsx");
    const result = await kv.get("sync-config:default");
    if (!result) {
      return c.json({ config: null });
    }
    const config = typeof result === "string" ? JSON.parse(result) : result;
    return c.json({ config });
  } catch (err) {
    console.log(`Error loading sync config: ${err}`);
    return c.json({ error: `Failed to load sync config: ${err}` }, 500);
  }
});

// ── POST /dash/sync/test — Test Sync API connection (proxy to avoid CORS) ──
app.post("/make-server-d2ca3281/dash/sync/test", async (c) => {
  try {
    const body = await c.req.json();
    const baseUrl = (body.baseUrl || "").replace(/\/$/, "");
    const apiKey = body.apiKey || "";
    const gatewayToken = body.gatewayToken || "";

    if (!baseUrl || !apiKey) {
      return c.json({ ok: false, error: "URL e API Key são obrigatórios" }, 400);
    }

    if (!gatewayToken) {
      return c.json({ ok: false, error: "Gateway Token (Supabase Anon Key do Sync) é obrigatório" }, 400);
    }

    console.log(`[Sync/Test] Testing connection to: ${baseUrl}/meta`);

    const res = await fetch(`${baseUrl}/meta`, {
      headers: { "X-API-Key": apiKey, "Authorization": `Bearer ${gatewayToken}` },
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.log(`[Sync/Test] Failed (${res.status}): ${errText}`);
      return c.json({ ok: false, error: `Erro ${res.status}: ${errText}` });
    }

    const meta = await res.json();
    const connectors = meta.connectors?.length || meta.platforms?.length || 0;
    const totalRecords = meta.totalRecords || meta.total_records || 0;

    console.log(`[Sync/Test] Success! ${connectors} connector(s), ${totalRecords} records`);
    return c.json({
      ok: true,
      connectors,
      totalRecords,
      platforms: meta.connectors || meta.platforms || [],
      message: `Conexão OK! ${connectors} conector(es) disponível(is)${totalRecords ? `, ${totalRecords} registros` : ""}`,
    });
  } catch (err: any) {
    console.log(`[Sync/Test] Error: ${err}`);
    const msg = err.name === "TimeoutError" || err.name === "AbortError"
      ? "Timeout: servidor não respondeu em 10s"
      : `Falha na conexão: ${err.message || err}`;
    return c.json({ ok: false, error: msg });
  }
});

// ── DELETE /dash/sync/config — Disconnect Sync (remove config) ──
app.delete("/make-server-d2ca3281/dash/sync/config", async (c) => {
  try {
    const kv = await import("./kv_store.tsx");
    await kv.del("sync-config:default");
    console.log("[Sync] Config deleted — Sync disconnected");
    return c.json({ success: true, message: "Zenite Sync desconectado com sucesso" });
  } catch (err) {
    console.log(`Error deleting sync config: ${err}`);
    return c.json({ error: `Failed to delete sync config: ${err}` }, 500);
  }
});

// ── GET /dash/sync/schema — Fetch schema from Zenite Sync Data Feed API ──
app.get("/make-server-d2ca3281/dash/sync/schema", async (c) => {
  const SCHEMA_CACHE_KEY = "sync-schema-cache:default";
  const SCHEMA_CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes
  try {
    const kv = await import("./kv_store.tsx");
    const configResult = await kv.get("sync-config:default");
    if (!configResult) {
      return c.json({ ok: false, error: "Sync not configured" }, 404);
    }
    const config = typeof configResult === "string" ? JSON.parse(configResult) : configResult;
    if (!config.baseUrl || !config.apiKey) {
      return c.json({ ok: false, error: "Sync API URL or Key missing" }, 400);
    }

    // Check KV cache first
    const forceRefresh = c.req.query("refresh") === "true";
    if (!forceRefresh) {
      try {
        const cached = await kv.get(SCHEMA_CACHE_KEY);
        if (cached) {
          const parsed = typeof cached === "string" ? JSON.parse(cached) : cached;
          if (parsed.cachedAt && (Date.now() - parsed.cachedAt) < SCHEMA_CACHE_TTL_MS) {
            console.log(`[Sync/Schema] Returning cached schema (${parsed.schema?.fields?.length || 0} fields, age: ${Math.round((Date.now() - parsed.cachedAt) / 1000)}s)`);
            return c.json({ ok: true, schema: parsed.schema, cached: true });
          }
          console.log("[Sync/Schema] Cache expired, fetching fresh schema");
        }
      } catch (cacheErr) {
        console.log("[Sync/Schema] Cache read failed, fetching fresh:", cacheErr);
      }
    }

    const schemaUrl = `${config.baseUrl}/schema`;
    console.log(`[Sync/Schema] Fetching schema from: ${schemaUrl}`);
    const res = await fetch(schemaUrl, {
      headers: { "X-API-Key": config.apiKey, "Authorization": `Bearer ${config.gatewayToken}` },
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) {
      const errText = await res.text();
      console.log(`[Sync/Schema] Failed (${res.status}): ${errText}`);
      return c.json({ ok: false, error: `Schema fetch failed: ${res.status}` }, res.status);
    }
    const schema = await res.json();
    console.log(`[Sync/Schema] Schema loaded: ${schema.fields?.length || 0} fields, ${schema.groups?.length || 0} groups`);

    // Cache in KV
    try {
      await kv.set(SCHEMA_CACHE_KEY, JSON.stringify({ schema, cachedAt: Date.now() }));
      console.log("[Sync/Schema] Schema cached in KV");
    } catch (cacheWriteErr) {
      console.log("[Sync/Schema] Cache write failed (non-fatal):", cacheWriteErr);
    }

    return c.json({ ok: true, schema });
  } catch (err: any) {
    console.log(`[Sync/Schema] Error: ${err}`);
    const msg = err.name === "TimeoutError" || err.name === "AbortError"
      ? "Timeout: servidor não respondeu em 10s"
      : `Falha ao buscar schema: ${err.message || err}`;
    return c.json({ ok: false, error: msg }, 500);
  }
});

// ── GET /dash/sync/data — Fetch data from Zenite Sync Data Feed API ──
app.get("/make-server-d2ca3281/dash/sync/data", async (c) => {
  try {
    const kv = await import("./kv_store.tsx");
    const configResult = await kv.get("sync-config:default");
    
    if (!configResult) {
      return c.json({ 
        connected: false,
        error: "Sync not configured. Please set up the Zenite Sync connection.",
        googleAds: [], metaAds: [], linkedinAds: [],
      });
    }
    
    const config = typeof configResult === "string" ? JSON.parse(configResult) : configResult;
    
    if (!config.baseUrl || !config.apiKey) {
      return c.json({ 
        connected: false,
        error: "Sync API URL or Key missing",
        googleAds: [], metaAds: [], linkedinAds: [],
      });
    }
    
    const dateFrom = c.req.query("dateFrom") || "";
    const dateTo = c.req.query("dateTo") || "";
    const platform = c.req.query("platform") || "";
    
    // Fetch ALL records from Sync Data Feed API in a single call using per_page=all
    const params = new URLSearchParams();
    if (dateFrom) params.set("dateFrom", dateFrom);
    if (dateTo) params.set("dateTo", dateTo);
    if (platform) params.set("platform", platform);
    params.set("per_page", "all"); // Fetch entire dataset without pagination
    
    const recordsUrl = `${config.baseUrl}/records?${params.toString()}`;
    console.log(`[Sync] Fetching ALL records from: ${recordsUrl}`);
    
    const recordsRes = await fetch(recordsUrl, {
      headers: { "X-API-Key": config.apiKey, "Authorization": `Bearer ${config.gatewayToken}` },
    });
    
    if (!recordsRes.ok) {
      const errText = await recordsRes.text();
      console.log(`[Sync] Records fetch failed (${recordsRes.status}): ${errText}`);
      return c.json({ 
        connected: true,
        error: `Sync API error ${recordsRes.status}: ${errText}`,
        googleAds: [], metaAds: [], linkedinAds: [],
      });
    }
    
    const recordsData = await recordsRes.json();
    const records = recordsData.records || recordsData.data || [];
    console.log(`[Sync] Total records fetched: ${records.length}`);
    
    // Also fetch KPIs and metadata
    let kpis: any = null;
    let meta: any = null;
    
    try {
      const [kpisRes, metaRes] = await Promise.all([
        fetch(`${config.baseUrl}/kpis?${params.toString()}`, {
          headers: { "X-API-Key": config.apiKey, "Authorization": `Bearer ${config.gatewayToken}` },
        }),
        fetch(`${config.baseUrl}/meta`, {
          headers: { "X-API-Key": config.apiKey, "Authorization": `Bearer ${config.gatewayToken}` },
        }),
      ]);
      
      if (kpisRes.ok) kpis = await kpisRes.json();
      if (metaRes.ok) meta = await metaRes.json();
    } catch (e) {
      console.log(`[Sync] KPIs/Meta fetch error: ${e}`);
    }
    
    // Separate records by platform
    const googleAds = records.filter((r: any) => 
      (r.platform || "").toLowerCase().includes("google")
    );
    const metaAds = records.filter((r: any) => {
      const p = (r.platform || "").toLowerCase();
      return p.includes("meta") || p.includes("facebook") || p.includes("instagram");
    });
    const linkedinAds = records.filter((r: any) => 
      (r.platform || "").toLowerCase().includes("linkedin")
    );
    
    return c.json({
      connected: true,
      googleAds,
      metaAds,
      linkedinAds,
      allRecords: records,
      kpis,
      meta,
      recordCount: records.length,
      fetchedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.log(`Error fetching sync data: ${err}`);
    return c.json({ error: `Failed to fetch sync data: ${err}`, connected: false, googleAds: [], metaAds: [], linkedinAds: [] }, 500);
  }
});

// ── GET /dash/sync/kpis — Fetch KPIs from Sync API ──
app.get("/make-server-d2ca3281/dash/sync/kpis", async (c) => {
  try {
    const kv = await import("./kv_store.tsx");
    const configResult = await kv.get("sync-config:default");
    
    if (!configResult) {
      return c.json({ error: "Sync not configured", connected: false });
    }
    
    const config = typeof configResult === "string" ? JSON.parse(configResult) : configResult;
    
    const dateFrom = c.req.query("dateFrom") || "";
    const dateTo = c.req.query("dateTo") || "";
    const params = new URLSearchParams();
    if (dateFrom) params.set("dateFrom", dateFrom);
    if (dateTo) params.set("dateTo", dateTo);
    
    const res = await fetch(`${config.baseUrl}/kpis?${params.toString()}`, {
      headers: { "X-API-Key": config.apiKey, "Authorization": `Bearer ${config.gatewayToken}` },
    });
    
    if (!res.ok) {
      const errText = await res.text();
      return c.json({ error: `Sync KPIs API error: ${errText}`, connected: true }, res.status as any);
    }
    
    const data = await res.json();
    return c.json({ connected: true, ...data });
  } catch (err) {
    console.log(`Error fetching sync KPIs: ${err}`);
    return c.json({ error: `${err}`, connected: false }, 500);
  }
});

// ── GET /dash/sync/time-series — Fetch time series from Sync API ──
app.get("/make-server-d2ca3281/dash/sync/time-series", async (c) => {
  try {
    const kv = await import("./kv_store.tsx");
    const configResult = await kv.get("sync-config:default");
    
    if (!configResult) {
      return c.json({ error: "Sync not configured", connected: false });
    }
    
    const config = typeof configResult === "string" ? JSON.parse(configResult) : configResult;
    
    const granularity = c.req.query("granularity") || "daily";
    const dateFrom = c.req.query("dateFrom") || "";
    const dateTo = c.req.query("dateTo") || "";
    const params = new URLSearchParams({ granularity });
    if (dateFrom) params.set("dateFrom", dateFrom);
    if (dateTo) params.set("dateTo", dateTo);
    
    const res = await fetch(`${config.baseUrl}/time-series?${params.toString()}`, {
      headers: { "X-API-Key": config.apiKey, "Authorization": `Bearer ${config.gatewayToken}` },
    });
    
    if (!res.ok) {
      const errText = await res.text();
      return c.json({ error: `Sync time series API error: ${errText}`, connected: true }, res.status as any);
    }
    
    const data = await res.json();
    return c.json({ connected: true, ...data });
  } catch (err) {
    console.log(`Error fetching sync time series: ${err}`);
    return c.json({ error: `${err}`, connected: false }, 500);
  }
});

// ── GET /dash/sync/campaigns — Fetch campaigns breakdown from Sync API ──
app.get("/make-server-d2ca3281/dash/sync/campaigns", async (c) => {
  try {
    const kv = await import("./kv_store.tsx");
    const configResult = await kv.get("sync-config:default");
    
    if (!configResult) {
      return c.json({ error: "Sync not configured", connected: false });
    }
    
    const config = typeof configResult === "string" ? JSON.parse(configResult) : configResult;
    
    const sortBy = c.req.query("sortBy") || "spend";
    const platform = c.req.query("platform") || "";
    const params = new URLSearchParams({ sortBy });
    if (platform) params.set("platform", platform);
    
    const res = await fetch(`${config.baseUrl}/campaigns?${params.toString()}`, {
      headers: { "X-API-Key": config.apiKey, "Authorization": `Bearer ${config.gatewayToken}` },
    });
    
    if (!res.ok) {
      const errText = await res.text();
      return c.json({ error: `Sync campaigns API error: ${errText}`, connected: true }, res.status as any);
    }
    
    const data = await res.json();
    return c.json({ connected: true, ...data });
  } catch (err) {
    console.log(`Error fetching sync campaigns: ${err}`);
    return c.json({ error: `${err}`, connected: false }, 500);
  }
});

// ── GET /dash/sync/platforms — Fetch platforms comparison from Sync API ──
app.get("/make-server-d2ca3281/dash/sync/platforms", async (c) => {
  try {
    const kv = await import("./kv_store.tsx");
    const configResult = await kv.get("sync-config:default");
    
    if (!configResult) {
      return c.json({ error: "Sync not configured", connected: false });
    }
    
    const config = typeof configResult === "string" ? JSON.parse(configResult) : configResult;
    
    const res = await fetch(`${config.baseUrl}/platforms`, {
      headers: { "X-API-Key": config.apiKey, "Authorization": `Bearer ${config.gatewayToken}` },
    });
    
    if (!res.ok) {
      const errText = await res.text();
      return c.json({ error: `Sync platforms API error: ${errText}`, connected: true }, res.status as any);
    }
    
    const data = await res.json();
    return c.json({ connected: true, ...data });
  } catch (err) {
    console.log(`Error fetching sync platforms: ${err}`);
    return c.json({ error: `${err}`, connected: false }, 500);
  }
});

// ══════════════════════════════════════════════════════════════
//  TURING — Agente IA do Zenite Cloud
// ══════════════════════════════════════════════════════════════

// ── POST /turing-ask — Process a Turing AI question ──
app.post("/make-server-d2ca3281/turing-ask", async (c) => {
  try {
    const authHeader = c.req.header("Authorization");
    if (!authHeader) {
      return c.json({ error: "Nao autorizado." }, 401);
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const userClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: authError } = await userClient.auth.getUser();
    if (authError || !user) {
      return c.json({ error: "Sessao invalida." }, 401);
    }

    // Try to get profile, but use defaults if not available
    let session: SessionContext;
    try {
      const { data: profile } = await userClient
        .from("profiles")
        .select("name, role, org_id, organizations(name)")
        .eq("id", user.id)
        .single();

      if (profile) {
        session = {
          user_id: user.id,
          user_name: profile.name ?? user.email ?? "Usuario",
          user_role: profile.role ?? "admin",
          org_id: profile.org_id ?? "default",
          org_name: (profile.organizations as { name: string })?.name ?? "Organizacao",
        };
      } else {
        session = {
          user_id: user.id,
          user_name: user.email ?? "Usuario",
          user_role: "admin",
          org_id: "default",
          org_name: "Zenite Cloud",
        };
      }
    } catch {
      session = {
        user_id: user.id,
        user_name: user.email ?? "Usuario",
        user_role: "admin",
        org_id: "default",
        org_name: "Zenite Cloud",
      };
    }

    const body: TuringRequest = await c.req.json();
    if (!body.message?.trim()) {
      return c.json({ error: "Mensagem vazia." }, 400);
    }

    console.log(`[Turing] Question from ${session.user_name}: "${body.message.substring(0, 80)}..."`);

    const connectedSources = await getConnectedSources(userClient, session.org_id);
    const systemPrompt = buildSystemPrompt(session, connectedSources);
    const rawResponse = await callGemini(systemPrompt, body.history ?? [], body.message);

    let turingResponse: Record<string, unknown>;
    try {
      turingResponse = JSON.parse(rawResponse);
    } catch {
      turingResponse = { type: "text", message: rawResponse };
    }

    let queryResult = null;
    if (turingResponse.type === "query" && turingResponse.sql) {
      const db = supabase();
      const { data, error } = await executeSafeQuery(
        db,
        turingResponse.sql as string,
        session.org_id
      );

      if (error) {
        console.log(`[Turing] Query execution error: ${error}`);
        turingResponse = {
          type: "error",
          message: `Nao consegui executar essa consulta: ${error}`,
          suggestions: ["Tente reformular a pergunta", "Verifique se a fonte de dados esta conectada"],
        };
      } else {
        queryResult = data;
        console.log(`[Turing] Query returned ${Array.isArray(data) ? data.length : 0} rows`);
      }
    }

    // Save history in background (non-blocking)
    saveQueryHistory(
      userClient,
      session,
      body.message,
      turingResponse,
      (turingResponse.sql as string) ?? null
    ).catch((err: unknown) => console.log(`[Turing] History save failed: ${err}`));

    return c.json({
      turing: turingResponse,
      data: queryResult,
      session: {
        user_name: session.user_name,
        org_name: session.org_name,
      },
    });
  } catch (error) {
    console.log(`[Turing] Error: ${error}`);
    return c.json({
      turing: {
        type: "error",
        message: "Ocorreu um erro interno. Tente novamente em instantes.",
      },
    }, 500);
  }
});

/* ================================================================== */
/*  Utility functions                                                  */
/* ================================================================== */

function probabilityFromStage(stage: string | null, score: number | null): number {
  if (!stage) return 10;
  const s = stage.toLowerCase();
  if (s.includes("ganho") || s.includes("ganha") || s.includes("won")) return 100;
  if (s.includes("perdid") || s.includes("lost")) return 0;
  if (s.includes("negoci") || s.includes("negoti")) return 75;
  if (s.includes("proposta") || s.includes("proposal")) return 55;
  if (s.includes("qualific")) return 35;
  if (s.includes("prospec") || s.includes("prospect")) return 15;
  if (s.includes("contato") || s.includes("contact")) return 20;
  if (s.includes("descoberta") || s.includes("discovery")) return 30;
  if (s.includes("apresenta")) return 45;
  if (s.includes("demo")) return 50;
  // Use score as fallback
  if (score && score > 0) return Math.min(score, 100);
  return 10;
}

function mapActivityType(type: string | null): string {
  if (!type) return "tarefa";
  const t = type.toLowerCase();
  if (t.includes("tarefa") || t.includes("task")) return "tarefa";
  if (t.includes("compromisso") || t.includes("evento") || t.includes("event") || t.includes("reuniao") || t.includes("meeting") || t.includes("calendar")) return "compromisso";
  if (t.includes("ligacao") || t.includes("call") || t.includes("telefone")) return "ligacao";
  if (t.includes("email") || t.includes("e-mail")) return "email";
  if (t.includes("nota") || t.includes("note") || t.includes("anotacao")) return "nota";
  if (t.includes("mensagem") || t.includes("message") || t.includes("whatsapp") || t.includes("sms") || t.includes("chat")) return "mensagem";
  return "tarefa";
}

function mapActivityStatus(status: string | null, completedAt: string | null, dueDate: string | null): string {
  if (completedAt) return "concluida";
  if (status) {
    const s = status.toLowerCase();
    if (s.includes("concluid") || s.includes("complet") || s.includes("done") || s.includes("finished")) return "concluida";
    if (s.includes("atrasad") || s.includes("overdue") || s.includes("late")) return "atrasada";
    if (s.includes("cancelad") || s.includes("cancel")) return "concluida";
    if (s.includes("pendent") || s.includes("pending") || s.includes("aberto") || s.includes("open") || s.includes("agendad") || s.includes("schedul")) return "pendente";
    if (s.includes("em andamento") || s.includes("in progress")) return "pendente";
  }
  // Check if overdue by date
  if (dueDate) {
    const due = new Date(dueDate);
    const now = new Date();
    if (due < now) return "atrasada";
  }
  return "pendente";
}

Deno.serve({
  onError(err: unknown) {
    const e = err as any;
    if (e?.name === "Http" || (e?.message && e.message.includes("connection closed"))) {
      console.log("[Server] Client disconnected before response completed (benign)");
      return new Response(null, { status: 499 });
    }
    console.log(`[Server] Transport error: ${e}`);
    return new Response("Internal Server Error", { status: 500 });
  },
}, async (req: Request, info: Deno.ServeHandlerInfo) => {
  try {
    return await app.fetch(req, info);
  } catch (err: any) {
    // Suppress "Http: connection closed before message completed" errors
    // These occur when the client navigates away before the response is fully sent
    if (err?.name === "Http" || (err?.message && err.message.includes("connection closed"))) {
      console.log("[Server] Client disconnected before response completed (benign)");
      return new Response(null, { status: 499 });
    }
    console.log(`[Server] Unhandled error: ${err}`);
    return new Response("Internal Server Error", { status: 500 });
  }
});