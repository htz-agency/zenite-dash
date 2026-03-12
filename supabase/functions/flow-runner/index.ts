import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  let body: any;
  try { body = await req.json(); } catch { return new Response("Invalid JSON", { status: 400 }); }

  const { flow_id, trigger_type, trigger_data } = body;
  if (!flow_id) return new Response(JSON.stringify({ error: "flow_id obrigatório" }), { status: 400 });

  const { data: run, error } = await supabase
    .from("flow_runs")
    .insert({ flow_id, trigger_type: trigger_type ?? "manual", trigger_data: trigger_data ?? {}, status: "running" })
    .select("id, flow_id, status")
    .single();

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

  // Executa os steps em background
  executeFlow(supabase, flow_id, run.id, trigger_data ?? {}).catch(console.error);

  return new Response(JSON.stringify({ run_id: run.id, status: "running", flow_id }), {
    headers: { "Content-Type": "application/json" },
  });
});

async function executeFlow(supabase: any, flow_id: string, run_id: string, trigger_data: any) {
  try {
    const { data: steps } = await supabase.from("flow_steps").select("*").eq("flow_id", flow_id).eq("is_disabled", false);
    const { data: connections } = await supabase.from("flow_connections").select("*").eq("flow_id", flow_id);

    if (!steps?.length) throw new Error("Fluxo sem nós ativos");

    const trigger = steps.find((s: any) => s.type === "gatilho");
    if (!trigger) throw new Error("Gatilho não encontrado");

    const context: any = { $trigger: trigger_data, $steps: {} };
    await runStep(supabase, trigger, steps, connections ?? [], context, run_id, flow_id);

    await supabase.from("flow_runs").update({ status: "success" }).eq("id", run_id);
  } catch (err: any) {
    await supabase.from("flow_runs").update({ status: "error", error_message: err.message }).eq("id", run_id);
  }
}

async function runStep(supabase: any, step: any, allSteps: any[], connections: any[], context: any, run_id: string, flow_id: string) {
  const { data: stepRun } = await supabase.from("flow_run_steps")
    .insert({ run_id, flow_id, org_id: step.org_id, step_id: step.id, status: "running", input_data: [context.$trigger] })
    .select().single();

  let output: any = null;
  let outputIndex = 0;

  try {
    const result = await executeNodeLogic(supabase, step, context);
    output = result.output;
    outputIndex = result.outputIndex ?? 0;
    context.$steps[step.id] = output;
    context.$steps[step.name] = output;
    if (stepRun) await supabase.from("flow_run_steps").update({ status: "success", output_data: [output], output_index: outputIndex }).eq("id", stepRun.id);
  } catch (err: any) {
    if (stepRun) await supabase.from("flow_run_steps").update({ status: "error", error_message: err.message }).eq("id", stepRun.id);
    throw err;
  }

  const nextConns = connections.filter((c: any) => c.source_step_id === step.id && c.source_output === outputIndex);
  for (const conn of nextConns) {
    const next = allSteps.find((s: any) => s.id === conn.target_step_id);
    if (next) await runStep(supabase, next, allSteps, connections, context, run_id, flow_id);
  }
}

async function executeNodeLogic(supabase: any, step: any, context: any) {
  const cfg = step.config ?? {};

  switch (step.type) {
    case "gatilho":
      return { output: context.$trigger };

    case "notificacoes":
    case "gmail": {
      if (cfg.canal === "email" || step.type === "gmail") {
        const { data: cred } = await supabase.from("flow_credentials").select("encrypted_data").eq("id", cfg.credencial_id ?? cfg.credenciais).single();
        if (!cred) throw new Error("Credencial não encontrada");

        const { data: decrypted } = await supabase.rpc("decrypt_credential", {
          data: cred.encrypted_data,
          key: Deno.env.get("CREDENTIAL_ENCRYPT_KEY")!,
        });
        const tokens = JSON.parse(decrypted);

        const to = resolve(cfg.para, context);
        const subject = resolve(cfg.assunto, context);
        const html = resolve(cfg.corpo, context);

        const boundary = "z_" + Date.now();
        const raw = btoa(unescape(encodeURIComponent(
          `From: Zenite Flow <${tokens.email ?? "noreply"}>\r\nTo: ${to}\r\nSubject: ${subject}\r\nMIME-Version: 1.0\r\nContent-Type: multipart/alternative; boundary="${boundary}"\r\n\r\n--${boundary}\r\nContent-Type: text/html; charset=UTF-8\r\n\r\n${html}\r\n--${boundary}--`
        ))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

        const res = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
          method: "POST",
          headers: { Authorization: `Bearer ${tokens.access_token}`, "Content-Type": "application/json" },
          body: JSON.stringify({ raw }),
        });
        if (!res.ok) { const e = await res.json(); throw new Error(`Gmail API: ${JSON.stringify(e)}`); }
        const result = await res.json();
        return { output: { enviado: true, messageId: result.id, para: to } };
      }
      throw new Error(`Canal não suportado: ${cfg.canal}`);
    }

    case "filtro": {
      const val = resolve(cfg.campo, context);
      if (!evalCondition(val, cfg.operador, cfg.valor)) throw new Error("Filtrado — não passa a condição");
      return { output: context.$trigger };
    }

    case "rota":
    case "bifurcacao": {
      const val = resolve(cfg.campo, context);
      const passes = evalCondition(val, cfg.operador, cfg.valor);
      return { output: { resultado: passes }, outputIndex: passes ? 0 : 1 };
    }

    case "tempo": {
      const ms = toMs(cfg.valor ?? 1, cfg.unidade ?? "segundos");
      if (ms <= 60000) await new Promise(r => setTimeout(r, ms));
      return { output: { aguardou_ms: ms } };
    }

    case "variavel":
      return { output: { operacao: cfg.operacao, nome: cfg.nome } };

    case "registro":
      console.log(`[LOG] ${resolve(cfg.mensagem ?? "", context)}`);
      return { output: { logged: true } };

    default:
      return { output: null };
  }
}

function resolve(template: string, ctx: any): string {
  if (!template || typeof template !== "string") return String(template ?? "");
  return template.replace(/\{\{\s*(.+?)\s*\}\}/g, (_, path) => {
    const parts = path.trim().split(".");
    let v: any = ctx;
    for (const p of parts) { if (v == null) return ""; v = v[p]; }
    return v != null ? String(v) : "";
  });
}

function evalCondition(value: any, op: string, target: any): boolean {
  const v = String(value ?? "").toLowerCase();
  const t = String(target ?? "").toLowerCase();
  switch (op) {
    case "igual": return v === t;
    case "diferente": return v !== t;
    case "contem": return v.includes(t);
    case "maior_que": return Number(value) > Number(target);
    case "menor_que": return Number(value) < Number(target);
    case "esta_vazio": return !value || v === "";
    case "nao_esta_vazio": return !!value && v !== "";
    default: return false;
  }
}

function toMs(val: number, unit: string): number {
  return val * ({ segundos: 1000, minutos: 60000, horas: 3600000, dias: 86400000 }[unit] ?? 1000);
}
