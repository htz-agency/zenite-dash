/* ================================================================== */
/*  Zenite Dash — Sync Configuration Page                              */
/*  Full-page UI for connecting Zenite Sync Data Feed API              */
/* ================================================================== */

import { useState, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowsClockwise, Lightning, Check, X, Plugs, Spinner, Globe,
  Key, LinkSimpleHorizontal, CaretRight, ArrowLeft, Info,
  GoogleLogo, LinkedinLogo, MetaLogo, ChartLineUp,
  Database, ShieldCheck, Broadcast, Gauge, Rows, ShieldWarning,
  SelectionPlus, Eye, CaretDown, Table, Hash, TextT, CalendarBlank,
} from "@phosphor-icons/react";
import { useDashData } from "./dash-data-provider";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { projectId, publicAnonKey } from "/utils/supabase/info";

const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

const connectors = [
  { id: "google_ads", name: "Google Ads", color: "#4285F4", bg: "#E8F0FE", icon: GoogleLogo, description: "Campanhas, grupos de anúncios, keywords e métricas de performance" },
  { id: "meta_ads", name: "Meta Ads", color: "#0081FB", bg: "#E5F0FF", icon: MetaLogo, description: "Campanhas do Facebook e Instagram Ads com métricas detalhadas" },
  { id: "linkedin_ads", name: "LinkedIn Ads", color: "#0A66C2", bg: "#E1EEFF", icon: LinkedinLogo, description: "Campanhas B2B do LinkedIn com dados de engajamento e conversão" },
];

const features = [
  { icon: Database, title: "Data Feed API", desc: "6 endpoints REST com dados normalizados de todas as plataformas" },
  { icon: ChartLineUp, title: "KPIs Unificados", desc: "Métricas padronizadas: impressões, cliques, CTR, CPC, conversões" },
  { icon: Broadcast, title: "Time Series", desc: "Séries temporais para análise de tendências e comparação de períodos" },
  { icon: Gauge, title: "Visual Builder", desc: "Campos de Ads aparecem no Data Pane para arrastar nos shelves" },
];

/* ── Sync field schemas for each connector ── */
const SYNC_FIELD_SCHEMAS: Record<string, { dimensions: { label: string; name: string }[]; measures: { label: string; name: string }[]; dates: { label: string; name: string }[] }> = {
  google_ads: {
    dimensions: [
      { label: "Campanha", name: "campaign_name" }, { label: "Grupo de Anúncios", name: "ad_group_name" },
      { label: "Anúncio", name: "ad_name" }, { label: "Palavra-chave", name: "keyword" },
      { label: "Tipo de Correspondência", name: "match_type" }, { label: "Dispositivo", name: "device" },
      { label: "Rede", name: "network" }, { label: "Tipo de Campanha", name: "campaign_type" },
      { label: "Status da Campanha", name: "campaign_status" }, { label: "Localização", name: "location" },
      { label: "Plataforma", name: "platform" }, { label: "Conta", name: "account_name" },
      { label: "ID da Conta", name: "account_id" }, { label: "ID da Campanha", name: "campaign_id" },
    ],
    measures: [
      { label: "Impressões", name: "impressions" }, { label: "Cliques", name: "clicks" },
      { label: "CTR", name: "ctr" }, { label: "CPC", name: "cpc" }, { label: "CPM", name: "cpm" },
      { label: "Investimento", name: "spend" }, { label: "Conversões", name: "conversions" },
      { label: "Custo por Conversão", name: "cost_per_conversion" }, { label: "Taxa de Conversão", name: "conversion_rate" },
      { label: "Índice de Qualidade", name: "quality_score" },
    ],
    dates: [{ label: "Data", name: "date" }, { label: "Semana", name: "week" }, { label: "Mês", name: "month" }],
  },
  meta_ads: {
    dimensions: [
      { label: "Campanha", name: "campaign_name" }, { label: "Conjunto de Anúncios", name: "ad_set_name" },
      { label: "Anúncio", name: "ad_name" }, { label: "Posicionamento", name: "placement" },
      { label: "Objetivo", name: "objective" }, { label: "Plataforma (FB/IG)", name: "publisher_platform" },
      { label: "Dispositivo", name: "device_platform" }, { label: "Status da Campanha", name: "campaign_status" },
      { label: "Conta de Anúncios", name: "account_name" }, { label: "ID da Conta", name: "account_id" },
      { label: "ID da Campanha", name: "campaign_id" }, { label: "Faixa Etária", name: "age" },
      { label: "Gênero", name: "gender" }, { label: "País", name: "country" }, { label: "Região", name: "region" },
      { label: "Plataforma", name: "platform" }, { label: "Ranking de Qualidade", name: "quality_ranking" },
      { label: "Ranking de Engajamento", name: "engagement_rate_ranking" }, { label: "Ranking de Conversão", name: "conversion_rate_ranking" },
    ],
    measures: [
      // Core
      { label: "Impressões", name: "impressions" }, { label: "Cliques", name: "clicks" },
      { label: "CTR", name: "ctr" }, { label: "CPC", name: "cpc" }, { label: "CPM", name: "cpm" },
      { label: "Investimento", name: "spend" }, { label: "Conversões", name: "conversions" },
      // Delivery
      { label: "Alcance", name: "reach" }, { label: "Frequência", name: "frequency" },
      { label: "Cliques Únicos", name: "unique_clicks" }, { label: "CTR Único", name: "unique_ctr" },
      { label: "Custo por Clique Único", name: "cost_per_unique_click" },
      { label: "Cliques Inline", name: "inline_link_clicks" }, { label: "CTR Inline", name: "inline_link_click_ctr" },
      { label: "Gasto Social", name: "social_spend" },
      // Actions
      { label: "Resultados", name: "results" }, { label: "Custo por Resultado", name: "cost_per_result" },
      { label: "Leads", name: "leads" }, { label: "CPL", name: "cost_per_lead" },
      { label: "Compras", name: "purchases" }, { label: "Custo por Compra", name: "cost_per_purchase" },
      { label: "Add to Cart", name: "add_to_cart" }, { label: "Custo por Add to Cart", name: "cost_per_add_to_cart" },
      { label: "Views Landing Page", name: "landing_page_views" }, { label: "Custo por View LP", name: "cost_per_landing_page_view" },
      { label: "Cliques no Link", name: "link_clicks" }, { label: "Custo por Clique Link", name: "cost_per_link_click" },
      { label: "Visualizações de Vídeo", name: "video_views" },
      { label: "Engajamento de Post", name: "post_engagement" }, { label: "Engajamento de Página", name: "page_engagement" },
      { label: "Início de Checkout", name: "initiate_checkout" }, { label: "Registro Completo", name: "complete_registration" },
      // ⭐ Lead Breakdown
      { label: "Leads Offline", name: "leads_offline" }, { label: "CPL Offline", name: "cost_per_lead_offline" },
      { label: "Leads Website", name: "leads_website" }, { label: "CPL Website", name: "cost_per_lead_website" },
      { label: "Leads On-Platform", name: "leads_on_meta" }, { label: "CPL On-Platform", name: "cost_per_lead_on_meta" },
      { label: "ROAS", name: "roas" },
    ],
    dates: [{ label: "Data", name: "date" }, { label: "Semana", name: "week" }, { label: "Mês", name: "month" }],
  },
  linkedin_ads: {
    dimensions: [
      { label: "Campanha", name: "campaign_name" }, { label: "Grupo de Campanhas", name: "campaign_group_name" },
      { label: "Formato do Anúncio", name: "ad_format" }, { label: "Tipo de Objetivo", name: "objective_type" },
      { label: "Status da Campanha", name: "campaign_status" }, { label: "Criativo", name: "creative_name" },
      { label: "Conta de Anúncios", name: "account_name" }, { label: "ID da Conta", name: "account_id" },
      { label: "ID da Campanha", name: "campaign_id" }, { label: "Setor", name: "industry" },
      { label: "Função", name: "job_function" }, { label: "Senioridade", name: "seniority" },
      { label: "Porte da Empresa", name: "company_size" }, { label: "Plataforma", name: "platform" },
    ],
    measures: [
      // Core
      { label: "Impressões", name: "impressions" }, { label: "Cliques", name: "clicks" },
      { label: "CTR", name: "ctr" }, { label: "CPC", name: "cpc" }, { label: "CPM", name: "cpm" },
      { label: "Investimento", name: "spend" }, { label: "Conversões", name: "conversions" },
      // Leads
      { label: "Leads", name: "leads" }, { label: "CPL", name: "cost_per_lead" },
      { label: "Aberturas de Formulário", name: "lead_form_opens" }, { label: "Formulários Preenchidos", name: "lead_form_completions" },
      { label: "Leads One-Click", name: "one_click_leads" },
      // Engajamento
      { label: "Engajamentos", name: "engagements" }, { label: "Engajamentos Totais", name: "total_engagements" },
      { label: "Ações Sociais", name: "social_actions" }, { label: "Curtidas", name: "likes" },
      { label: "Comentários", name: "comments" }, { label: "Compartilhamentos", name: "shares" },
      { label: "Reações", name: "reactions" }, { label: "Novos Seguidores", name: "follows" },
      // Vídeo & Navigation
      { label: "Vídeos Completos", name: "video_completions" }, { label: "Cliques na LP", name: "landing_page_clicks" },
      { label: "Aberturas", name: "opens" }, { label: "Envios", name: "sends" },
      { label: "Taxa de Conversão", name: "conversion_rate" },
    ],
    dates: [{ label: "Data", name: "date" }, { label: "Semana", name: "week" }, { label: "Mês", name: "month" }],
  },
};

export function DashSyncConfig() {
  const dashData = useDashData();
  const navigate = useNavigate();

  const [baseUrl, setBaseUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [gatewayToken, setGatewayToken] = useState("");
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ ok: boolean; msg: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [disconnecting, setDisconnecting] = useState(false);

  // Pre-fill if already configured
  useEffect(() => {
    if (dashData.syncConfig) {
      setBaseUrl(dashData.syncConfig.baseUrl || "");
      setApiKey(dashData.syncConfig.apiKey || "");
      setGatewayToken(dashData.syncConfig.gatewayToken || "");
    }
  }, [dashData.syncConfig]);

  const testConnection = useCallback(async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const res = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d2ca3281/dash/sync/test`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            baseUrl: baseUrl.replace(/\/$/, ""),
            apiKey: apiKey,
            gatewayToken: gatewayToken,
          }),
        }
      );
      const data = await res.json();
      if (data.ok) {
        setTestResult({ ok: true, msg: data.message || "Conexão OK!" });
      } else {
        setTestResult({ ok: false, msg: data.error || "Erro desconhecido" });
      }
    } catch (err: any) {
      setTestResult({ ok: false, msg: `Falha na conexão: ${err.message || err}` });
    } finally {
      setTesting(false);
    }
  }, [baseUrl, apiKey, gatewayToken]);

  const handleConnect = useCallback(async () => {
    if (!baseUrl || !apiKey || !gatewayToken) {
      toast.error("Preencha a URL, Gateway Token e API Key");
      return;
    }
    setSaving(true);
    const success = await dashData.saveSyncConfig({
      baseUrl: baseUrl.replace(/\/$/, ""),
      apiKey,
      gatewayToken,
      connectors: ["google_ads", "meta_ads", "linkedin_ads"],
    });
    setSaving(false);
    if (success) {
      toast.success("Zenite Sync conectado com sucesso!");
      // Force-refresh schema cache to pick up any new fields from the API
      dashData.refreshSyncSchema().then((schema) => {
        if (schema) {
          console.log(`[SyncConfig] Schema refreshed: ${schema.fields?.length || 0} fields`);
          toast.success(`Schema atualizado: ${schema.fields?.length || 0} campos`);
        }
      }).catch(() => {});
      // Refetch all data
      dashData.refetch();
    } else {
      toast.error("Erro ao conectar. Verifique a URL e API Key.");
    }
  }, [baseUrl, apiKey, gatewayToken, dashData]);

  const handleDisconnect = useCallback(async () => {
    if (!confirm("Desconectar o Zenite Sync? Os campos Sync serão removidos do Data Pane.")) return;
    setDisconnecting(true);
    const success = await dashData.disconnectSync();
    setDisconnecting(false);
    if (success) {
      toast.success("Zenite Sync desconectado");
      setBaseUrl("");
      setApiKey("");
      setGatewayToken("");
      setTestResult(null);
    } else {
      toast.error("Erro ao desconectar o Sync");
    }
  }, [dashData]);

  const syncRecordCount = dashData.syncGoogleAds.length + dashData.syncMetaAds.length + dashData.syncLinkedinAds.length;
  const [expandedPreview, setExpandedPreview] = useState<string | null>(null);
  const [expandedFields, setExpandedFields] = useState<string | null>(null);

  // Build dynamic field schemas from API schema (Single Source of Truth), falling back to hardcoded
  const PLATFORM_SCOPE_MAP: Record<string, string> = { google_ads: "google_ads", meta_ads: "meta_ads", linkedin_ads: "linkedin_ads" };
  const dynamicFieldSchemas = useMemo(() => {
    const schema = dashData.syncSchema;
    if (!schema?.fields?.length) return SYNC_FIELD_SCHEMAS;
    const result: Record<string, { dimensions: { label: string; name: string }[]; measures: { label: string; name: string }[]; dates: { label: string; name: string }[] }> = {};
    for (const cId of Object.keys(PLATFORM_SCOPE_MAP)) {
      const platformKey = PLATFORM_SCOPE_MAP[cId];
      const fields = (schema.fields as any[]).filter((f: any) => {
        const scope = f.platform_scope;
        if (scope == null || scope === "" || scope === "all") return true;
        if (Array.isArray(scope)) return scope.includes("all") || scope.includes(platformKey);
        if (typeof scope === "string") {
          if (scope.includes(",")) {
            const parts = scope.split(",").map((s: string) => s.trim());
            return parts.includes("all") || parts.includes(platformKey);
          }
          return scope === "all" || scope === platformKey;
        }
        return true;
      });
      const dims: { label: string; name: string }[] = [];
      const meas: { label: string; name: string }[] = [];
      const dates: { label: string; name: string }[] = [];
      fields.forEach((f: any) => {
        const entry = { label: f.label || f.name, name: f.name };
        const t = (f.type || "").toLowerCase();
        const fmt = (f.format || "").toLowerCase();
        const rawAgg = (f.aggregation || "").toUpperCase();
        const hasAgg = ["SUM", "AVG", "COUNT", "MIN", "MAX", "COUNTD"].includes(rawAgg);
        // Same classification logic as buildSyncTablesFromSchema
        if (t === "date" || fmt === "date") {
          dates.push(entry);
        } else if (t === "measure" || t === "metric" || t === "number"
          || ["currency", "percent", "ratio", "number", "integer"].includes(fmt)
          || hasAgg) {
          meas.push(entry);
        } else {
          dims.push(entry);
        }
      });
      result[cId] = { dimensions: dims, measures: meas, dates: dates };
    }
    console.log(`[SyncConfig] Dynamic schema: ${Object.entries(result).map(([k, v]) => `${k}: ${v.dimensions.length}D + ${v.measures.length}M + ${v.dates.length}T`).join(", ")}`);
    return result;
  }, [dashData.syncSchema]);

  // Get records for a connector
  const getConnectorRecords = (id: string): any[] => {
    if (id === "google_ads") return dashData.syncGoogleAds;
    if (id === "meta_ads") return dashData.syncMetaAds;
    return dashData.syncLinkedinAds;
  };

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#F6F7F9]">
      <div className="max-w-[820px] mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-[#E0E5EC] hover:bg-[#EBF1FA] text-[#4E6987] transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} weight="bold" />
          </button>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-[#3CCEA7] to-[#2BB896] shadow-md">
              <ArrowsClockwise size={22} weight="bold" className="text-white" />
            </div>
            <div>
              <h1 className="text-[#122232]" style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.8, ...ff }}>
                Zenite Sync
              </h1>
              <p className="text-[#4E6987]" style={{ fontSize: 12, fontWeight: 500, letterSpacing: -0.2, ...ff }}>
                Conecte plataformas de Ads ao Visual Builder
              </p>
            </div>
          </div>

          {/* Status badge */}
          <div className="ml-auto">
            {dashData.syncConnected ? (
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D9F8EF] border border-[#3CCEA7]/30">
                <div className="w-2 h-2 rounded-full bg-[#3CCEA7] animate-pulse" />
                <span className="text-[#135543]" style={{ fontSize: 12, fontWeight: 700, ...ff }}>Conectado</span>
                <span className="text-[#3CCEA7]/70" style={{ fontSize: 11, fontWeight: 500, ...ff }}>
                  {syncRecordCount > 0 ? `${syncRecordCount} registros` : ""}
                </span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F6F7F9] border border-[#E0E5EC]">
                <div className="w-2 h-2 rounded-full bg-[#C8CFDB]" />
                <span className="text-[#4E6987]" style={{ fontSize: 12, fontWeight: 600, ...ff }}>Desconectado</span>
              </span>
            )}
          </div>
        </div>

        {/* Connection Config Card */}
        <div className="bg-white rounded-2xl border border-[#E0E5EC] shadow-sm mb-6 overflow-hidden">
          <div className="px-6 py-5 border-b border-[#EEF1F6]">
            <div className="flex items-center gap-2">
              <LinkSimpleHorizontal size={16} weight="bold" className="text-[#3CCEA7]" />
              <h2 className="text-[#122232]" style={{ fontSize: 15, fontWeight: 700, letterSpacing: -0.4, ...ff }}>
                Configuração da Conexão
              </h2>
            </div>
            <p className="text-[#4E6987] mt-1" style={{ fontSize: 12, fontWeight: 500, ...ff }}>
              Informe a URL base e a API Key da sua instância Zenite Sync
            </p>
          </div>

          <div className="px-6 py-5 space-y-5">
            {/* Base URL */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5">
                <Globe size={13} weight="bold" className="text-[#4E6987]" />
                <span className="text-[#28415C]" style={{ fontSize: 12, fontWeight: 700, letterSpacing: -0.2, ...ff }}>
                  URL Base da API
                </span>
              </label>
              <input
                type="url"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                placeholder="https://xxxx.supabase.co/functions/v1/make-server-xxx/dash-api/v1"
                className="w-full px-4 py-3 rounded-xl border border-[#E0E5EC] bg-[#FAFBFC] text-[#122232] placeholder:text-[#C8CFDB] focus:border-[#3CCEA7] focus:ring-2 focus:ring-[#3CCEA7]/15 outline-none transition-all"
                style={{ fontSize: 13, fontWeight: 500, ...ff }}
              />
              <p className="text-[#8896A6]" style={{ fontSize: 10, fontWeight: 500, ...ff }}>
                Endpoint raiz da Data Feed API do Zenite Sync
              </p>
            </div>

            {/* API Key */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5">
                <Key size={13} weight="bold" className="text-[#4E6987]" />
                <span className="text-[#28415C]" style={{ fontSize: 12, fontWeight: 700, letterSpacing: -0.2, ...ff }}>
                  API Key
                </span>
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="zs_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                className="w-full px-4 py-3 rounded-xl border border-[#E0E5EC] bg-[#FAFBFC] text-[#122232] placeholder:text-[#C8CFDB] focus:border-[#3CCEA7] focus:ring-2 focus:ring-[#3CCEA7]/15 outline-none transition-all"
                style={{ fontSize: 13, fontWeight: 500, fontFamily: "monospace" }}
              />
              <p className="text-[#8896A6]" style={{ fontSize: 10, fontWeight: 500, ...ff }}>
                Chave de autenticação gerada no Zenite Sync
              </p>
            </div>

            {/* Gateway Token */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5">
                <ShieldWarning size={13} weight="bold" className="text-[#EAC23D]" />
                <span className="text-[#28415C]" style={{ fontSize: 12, fontWeight: 700, letterSpacing: -0.2, ...ff }}>
                  Gateway Token
                </span>
                <span className="text-[#EAC23D] ml-1" style={{ fontSize: 10, fontWeight: 700, ...ff }}>(OBRIGATÓRIO)</span>
              </label>
              <input
                type="password"
                value={gatewayToken}
                onChange={(e) => setGatewayToken(e.target.value)}
                placeholder="eyJhbGci..."
                className="w-full px-4 py-3 rounded-xl border border-[#E0E5EC] bg-[#FAFBFC] text-[#122232] placeholder:text-[#C8CFDB] focus:border-[#3CCEA7] focus:ring-2 focus:ring-[#3CCEA7]/15 outline-none transition-all"
                style={{ fontSize: 13, fontWeight: 500, fontFamily: "monospace" }}
              />
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-[#FFF8E1] border border-[#EAC23D]/30">
                <ShieldWarning size={12} weight="bold" className="text-[#917822] mt-0.5 shrink-0" />
                <p className="text-[#917822]" style={{ fontSize: 10, fontWeight: 500, lineHeight: 1.5, ...ff }}>
                  O Supabase exige <code className="px-1 py-0.5 rounded bg-[#EAC23D]/15 font-mono" style={{ fontSize: 9 }}>Authorization: Bearer &lt;gateway_token&gt;</code> em toda requisição. Sem este header, o gateway retorna <code className="px-1 py-0.5 rounded bg-[#FFEBEE] font-mono text-[#B71C1C]" style={{ fontSize: 9 }}>401 Missing authorization header</code> antes de chegar à sua API Key. Copie o Gateway Token da página Data Feed API do Zenite Sync.
                </p>
              </div>
            </div>

            {/* Test Connection */}
            <AnimatePresence mode="wait">
              {baseUrl && apiKey && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-center gap-3 pt-1">
                    <button
                      onClick={testConnection}
                      disabled={testing}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E0E5EC] bg-white hover:bg-[#F6F7F9] text-[#4E6987] transition-colors cursor-pointer disabled:opacity-50"
                      style={{ fontSize: 12, fontWeight: 600, ...ff }}
                    >
                      {testing ? <Spinner size={14} className="animate-spin" /> : <Lightning size={14} weight="bold" />}
                      {testing ? "Testando..." : "Testar Conexão"}
                    </button>
                    <AnimatePresence mode="wait">
                      {testResult && (
                        <motion.span
                          key={testResult.ok ? "ok" : "fail"}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -8 }}
                          className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl ${testResult.ok ? "bg-[#D9F8EF] text-[#135543]" : "bg-[#FFEBEE] text-[#B71C1C]"}`}
                          style={{ fontSize: 11, fontWeight: 600, ...ff }}
                        >
                          {testResult.ok ? <Check size={12} weight="bold" /> : <X size={12} weight="bold" />}
                          {testResult.msg}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-[#EEF1F6] bg-[#FAFBFC]">
            <div>
              {dashData.syncConnected && (
                <button
                  onClick={handleDisconnect}
                  disabled={disconnecting}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[#B71C1C] bg-[#FFEBEE] hover:bg-[#FFCDD2] disabled:opacity-50 transition-colors cursor-pointer"
                  style={{ fontSize: 12, fontWeight: 600, ...ff }}
                >
                  {disconnecting ? <Spinner size={14} className="animate-spin" /> : <Plugs size={14} weight="bold" />}
                  {disconnecting ? "Desconectando..." : "Desconectar"}
                </button>
              )}
            </div>
            <button
              onClick={handleConnect}
              disabled={saving || !baseUrl || !apiKey || !gatewayToken}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#3CCEA7] text-white hover:bg-[#2BB896] disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-sm"
              style={{ fontSize: 13, fontWeight: 700, ...ff }}
            >
              {saving ? <Spinner size={15} className="animate-spin" /> : <ArrowsClockwise size={15} weight="bold" />}
              {saving ? "Conectando..." : dashData.syncConnected ? "Reconectar" : "Conectar"}
            </button>
          </div>
        </div>

        {/* Connectors */}
        <div className="bg-white rounded-2xl border border-[#E0E5EC] shadow-sm mb-6 overflow-hidden">
          <div className="px-6 py-5 border-b border-[#EEF1F6]">
            <div className="flex items-center gap-2">
              <Broadcast size={16} weight="bold" className="text-[#3CCEA7]" />
              <h2 className="text-[#122232]" style={{ fontSize: 15, fontWeight: 700, letterSpacing: -0.4, ...ff }}>
                Conectores Disponíveis
              </h2>
            </div>
          </div>
          <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {connectors.map(c => {
              const Icon = c.icon;
              const count = c.id === "google_ads" ? dashData.syncGoogleAds.length
                : c.id === "meta_ads" ? dashData.syncMetaAds.length
                : dashData.syncLinkedinAds.length;
              return (
                <div
                  key={c.id}
                  className="relative p-4 rounded-2xl border transition-all"
                  style={{
                    backgroundColor: dashData.syncConnected && count > 0 ? `${c.bg}` : "#FAFBFC",
                    borderColor: dashData.syncConnected && count > 0 ? `${c.color}30` : "#E0E5EC",
                  }}
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    <div
                      className="flex items-center justify-center w-8 h-8 rounded-lg"
                      style={{ backgroundColor: c.bg }}
                    >
                      <Icon size={18} weight="duotone" style={{ color: c.color }} />
                    </div>
                    <span className="text-[#122232]" style={{ fontSize: 13, fontWeight: 700, ...ff }}>
                      {c.name}
                    </span>
                  </div>
                  <p className="text-[#8896A6] mb-3" style={{ fontSize: 11, fontWeight: 500, lineHeight: 1.4, ...ff }}>
                    {c.description}
                  </p>
                  {dashData.syncConnected ? (
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${count > 0 ? "bg-[#3CCEA7]" : "bg-[#C8CFDB]"}`} />
                      <span
                        className={count > 0 ? "text-[#135543]" : "text-[#8896A6]"}
                        style={{ fontSize: 11, fontWeight: 600, ...ff }}
                      >
                        {count > 0 ? `${count} registros` : "Sem dados"}
                      </span>
                    </div>
                  ) : (
                    <span className="text-[#C8CFDB]" style={{ fontSize: 10, fontWeight: 600, ...ff }}>
                      Aguardando conexão
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Data Preview (when connected with data) ── */}
        {dashData.syncConnected && syncRecordCount > 0 && (
          <div className="bg-white rounded-2xl border border-[#E0E5EC] shadow-sm mb-6 overflow-hidden">
            <div className="px-6 py-5 border-b border-[#EEF1F6]">
              <div className="flex items-center gap-2">
                <Eye size={16} weight="bold" className="text-[#0483AB]" />
                <h2 className="text-[#122232]" style={{ fontSize: 15, fontWeight: 700, letterSpacing: -0.4, ...ff }}>
                  Preview dos Dados
                </h2>
                <span className="ml-auto text-[#4E6987]" style={{ fontSize: 11, fontWeight: 500, ...ff }}>
                  Primeiras 5 linhas por conector
                </span>
              </div>
            </div>
            <div className="p-5 space-y-4">
              {connectors.map(c => {
                const Icon = c.icon;
                const records = getConnectorRecords(c.id);
                if (records.length === 0) return null;
                const isExpanded = expandedPreview === c.id;
                const previewRows = records.slice(0, 5);
                const previewCols = ["campaign_name", "impressions", "clicks", "spend", "ctr", "date"].filter(
                  col => previewRows.some(r => r[col] != null && r[col] !== "")
                );
                return (
                  <div key={c.id} className="rounded-xl border overflow-hidden" style={{ borderColor: `${c.color}30` }}>
                    <button
                      onClick={() => setExpandedPreview(isExpanded ? null : c.id)}
                      className="flex items-center gap-2 w-full px-4 py-3 hover:bg-[#F6F7F9] transition-colors cursor-pointer"
                      style={{ backgroundColor: `${c.bg}40` }}
                    >
                      {isExpanded ? <CaretDown size={12} weight="bold" className="text-[#4E6987]" /> : <CaretRight size={12} weight="bold" className="text-[#4E6987]" />}
                      <Icon size={14} weight="duotone" style={{ color: c.color }} />
                      <span className="text-[#122232]" style={{ fontSize: 12, fontWeight: 700, ...ff }}>{c.name}</span>
                      <span className="ml-auto px-2 py-0.5 rounded-full text-white" style={{ fontSize: 10, fontWeight: 700, backgroundColor: c.color }}>
                        {records.length}
                      </span>
                    </button>
                    <AnimatePresence>
                      {isExpanded && previewCols.length > 0 && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="overflow-x-auto">
                            <table className="w-full text-left" style={{ fontSize: 11 }}>
                              <thead>
                                <tr className="bg-[#F6F7F9]">
                                  {previewCols.map(col => (
                                    <th key={col} className="px-3 py-2 text-[#4E6987] whitespace-nowrap" style={{ fontWeight: 700, letterSpacing: -0.2, ...ff }}>
                                      {col}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {previewRows.map((row, ri) => (
                                  <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-[#FAFBFC]"}>
                                    {previewCols.map(col => (
                                      <td key={`${ri}-${col}`} className="px-3 py-2 text-[#122232] whitespace-nowrap max-w-[200px] truncate" style={{ fontWeight: 500, ...ff }}>
                                        {(() => {
                                          const raw = row[col];
                                          const num = typeof raw === "number" ? raw : (typeof raw === "string" && raw !== "" && !isNaN(Number(raw)) ? Number(raw) : null);
                                          const isCurrency = ["spend", "cost", "cpc", "cpm", "cpv", "cost_per_click", "cost_per_impression", "budget", "daily_budget", "investimento"].includes(col);
                                          const isPercent = ["ctr", "conversion_rate", "bounce_rate", "view_rate"].includes(col);

                                          if (num !== null && isCurrency) {
                                            return `R$ ${num.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                                          }
                                          if (num !== null && isPercent) {
                                            const pct = num <= 1 && num >= 0 ? num * 100 : num;
                                            return `${pct.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`;
                                          }
                                          if (num !== null && typeof raw === "number") {
                                            return num.toLocaleString("pt-BR");
                                          }
                                          return String(raw ?? "-");
                                        })()}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          {records.length > 5 && (
                            <div className="px-4 py-2 bg-[#F6F7F9] border-t border-[#EEF1F6]">
                              <span className="text-[#4E6987]" style={{ fontSize: 10, fontWeight: 500, ...ff }}>
                                ... e mais {records.length - 5} registros disponíveis no Visual Builder
                              </span>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Available Fields per Connector ── */}
        {dashData.syncConnected && (
          <div className="bg-white rounded-2xl border border-[#E0E5EC] shadow-sm mb-6 overflow-hidden">
            <div className="px-6 py-5 border-b border-[#EEF1F6]">
              <div className="flex items-center gap-2">
                <Table size={16} weight="bold" className="text-[#0483AB]" />
                <h2 className="text-[#122232]" style={{ fontSize: 15, fontWeight: 700, letterSpacing: -0.4, ...ff }}>
                  Campos Disponíveis no Visual Builder
                </h2>
              </div>
              <p className="text-[#4E6987] mt-1" style={{ fontSize: 12, fontWeight: 500, ...ff }}>
                Estes campos aparecem na seção "Zenite Sync" do Data Pane ao criar um relatório
              </p>
            </div>
            <div className="p-5 space-y-3">
              {connectors.map(c => {
                const Icon = c.icon;
                const schema = dynamicFieldSchemas[c.id];
                if (!schema) return null;
                const isExpanded = expandedFields === c.id;
                const totalFields = schema.dimensions.length + schema.measures.length + schema.dates.length;
                return (
                  <div key={c.id} className="rounded-xl border overflow-hidden" style={{ borderColor: `${c.color}20` }}>
                    <button
                      onClick={() => setExpandedFields(isExpanded ? null : c.id)}
                      className="flex items-center gap-2 w-full px-4 py-3 hover:bg-[#F6F7F9] transition-colors cursor-pointer bg-white"
                    >
                      {isExpanded ? <CaretDown size={12} weight="bold" className="text-[#4E6987]" /> : <CaretRight size={12} weight="bold" className="text-[#4E6987]" />}
                      <div className="flex items-center justify-center w-6 h-6 rounded-md" style={{ backgroundColor: c.bg }}>
                        <Icon size={13} weight="duotone" style={{ color: c.color }} />
                      </div>
                      <span className="text-[#122232]" style={{ fontSize: 12, fontWeight: 700, ...ff }}>{c.name}</span>
                      <span className="ml-auto text-[#C8CFDB]" style={{ fontSize: 10, fontWeight: 500, ...ff }}>{totalFields} campos</span>
                    </button>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden border-t border-[#EEF1F6]"
                        >
                          <div className="px-4 py-3 space-y-3">
                            {/* Dimensions */}
                            <div>
                              <div className="flex items-center gap-1.5 mb-2">
                                <TextT size={11} weight="bold" className="text-[#0483AB]" />
                                <span className="text-[#0483AB]" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.3, textTransform: "uppercase", ...ff }}>
                                  Dimensões ({schema.dimensions.length})
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {schema.dimensions.map(d => (
                                  <span key={d.name} className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#DCF0FF] text-[#025E7B]"
                                    style={{ fontSize: 10, fontWeight: 600, ...ff }}>
                                    <TextT size={9} weight="bold" />
                                    {d.label}
                                  </span>
                                ))}
                              </div>
                            </div>
                            {/* Measures */}
                            <div>
                              <div className="flex items-center gap-1.5 mb-2">
                                <Hash size={11} weight="bold" className="text-[#135543]" />
                                <span className="text-[#135543]" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.3, textTransform: "uppercase", ...ff }}>
                                  Métricas ({schema.measures.length})
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {schema.measures.map(m => (
                                  <span key={m.name} className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#D9F8EF] text-[#135543]"
                                    style={{ fontSize: 10, fontWeight: 600, ...ff }}>
                                    <Hash size={9} weight="bold" />
                                    {m.label}
                                  </span>
                                ))}
                              </div>
                            </div>
                            {/* Dates */}
                            <div>
                              <div className="flex items-center gap-1.5 mb-2">
                                <CalendarBlank size={11} weight="bold" className="text-[#917822]" />
                                <span className="text-[#917822]" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.3, textTransform: "uppercase", ...ff }}>
                                  Datas ({schema.dates.length})
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {schema.dates.map(d => (
                                  <span key={d.name} className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#FEEDCA] text-[#917822]"
                                    style={{ fontSize: 10, fontWeight: 600, ...ff }}>
                                    <CalendarBlank size={9} weight="bold" />
                                    {d.label}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Features (when not connected) */}
        {!dashData.syncConnected && (
          <div className="bg-white rounded-2xl border border-[#E0E5EC] shadow-sm mb-6 overflow-hidden">
            <div className="px-6 py-5 border-b border-[#EEF1F6]">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} weight="bold" className="text-[#3CCEA7]" />
                <h2 className="text-[#122232]" style={{ fontSize: 15, fontWeight: 700, letterSpacing: -0.4, ...ff }}>
                  Como funciona
                </h2>
              </div>
            </div>
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F6F7F9] border border-[#EEF1F6]">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#3CCEA7]/10 shrink-0 mt-0.5">
                      <Icon size={16} weight="bold" className="text-[#3CCEA7]" />
                    </div>
                    <div>
                      <p className="text-[#122232]" style={{ fontSize: 12, fontWeight: 700, letterSpacing: -0.2, ...ff }}>
                        {f.title}
                      </p>
                      <p className="text-[#8896A6] mt-0.5" style={{ fontSize: 11, fontWeight: 500, lineHeight: 1.4, ...ff }}>
                        {f.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CTA to Visual Builder (when connected) / Info box (when not) */}
        {dashData.syncConnected ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl overflow-hidden mb-6"
            style={{ background: "linear-gradient(135deg, #28415C 0%, #0483AB 100%)", boxShadow: "0 8px 24px rgba(4,131,171,0.25)" }}
          >
            <div className="px-6 py-6 flex items-center gap-5">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm shrink-0">
                <SelectionPlus size={28} weight="duotone" className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white" style={{ fontSize: 16, fontWeight: 800, letterSpacing: -0.5, ...ff }}>
                  Criar Relatório com dados Sync
                </h3>
                <p className="text-white/70 mt-1" style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.5, ...ff }}>
                  {syncRecordCount > 0
                    ? `${syncRecordCount} registros de Ads prontos para análise. Os campos Google Ads, Meta Ads e LinkedIn Ads já estão no Data Pane do Visual Builder.`
                    : "Os campos de Ads estão disponíveis no Data Pane. Arraste dimensões e métricas para os shelves para criar visualizações."}
                </p>
              </div>
              <button
                onClick={() => navigate("/dashboards/builder")}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-[#0483AB] hover:bg-[#F6F7F9] transition-colors cursor-pointer shadow-lg shrink-0"
                style={{ fontSize: 13, fontWeight: 700, ...ff }}
              >
                <SelectionPlus size={16} weight="bold" />
                Abrir Visual Builder
              </button>
            </div>
            {syncRecordCount > 0 && (
              <div className="px-6 py-3 bg-white/10 border-t border-white/10 flex items-center gap-4">
                {connectors.map(c => {
                  const count = getConnectorRecords(c.id).length;
                  const Icon = c.icon;
                  return (
                    <span key={c.id} className="inline-flex items-center gap-1.5 text-white/80" style={{ fontSize: 11, fontWeight: 600, ...ff }}>
                      <Icon size={12} weight="bold" />
                      {c.name}: <span className="text-white font-bold">{count}</span>
                    </span>
                  );
                })}
              </div>
            )}
          </motion.div>
        ) : (
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#D9F8EF]/40 border border-[#3CCEA7]/20">
            <Info size={16} weight="bold" className="text-[#3CCEA7] mt-0.5 shrink-0" />
            <div>
              <p className="text-[#135543]" style={{ fontSize: 12, fontWeight: 600, ...ff }}>
                Os dados do Sync ficam disponíveis no Visual Builder
              </p>
              <p className="text-[#3CCEA7]/80 mt-1" style={{ fontSize: 11, fontWeight: 500, lineHeight: 1.5, ...ff }}>
                Após conectar, os campos de Google Ads, Meta Ads e LinkedIn Ads aparecem automaticamente no Data Pane do Visual Builder.
                Arraste os campos para os shelves (Columns, Rows, Color, Size, etc.) para criar visualizações com dados de Ads integrados aos dados CRM.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}