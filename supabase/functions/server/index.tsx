import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2.49.8";

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

Deno.serve(app.fetch);