/* ================================================================== */
/*  Zenite Dash — Real Supabase Data Provider                         */
/*  Fetches CRM data from real tables via server API                  */
/* ================================================================== */

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import { projectId, publicAnonKey } from "/utils/supabase/info";

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-d2ca3281`;

/* ── Types matching real CRM schema ── */

export interface Lead {
  id: string;
  name: string;
  company: string;
  stage: string;
  value: number;
  owner: string;
  source: string;
  createdAt: string;
  lastActivity: string;
  score: number;
  email: string;
  phone: string;
  segment: string;
  isActive: boolean;
  scoreLabel: string;
  qualificationProgress: number;
  tags: string;
}

export interface Opportunity {
  id: string;
  name: string;
  account: string;
  company: string;
  stage: string;
  value: number;
  probability: number;
  owner: string;
  closeDate: string;
  createdAt: string;
  score: number;
  origin: string;
  tipo: string;
  decisor: string;
  lastActivity: string;
  labels: any[];
  tag: string;
}

export interface Activity {
  id: string;
  type: "tarefa" | "compromisso" | "ligacao" | "nota" | "mensagem" | "email";
  title: string;
  relatedTo: string;
  relatedToName: string;
  entityType: string;
  owner: string;
  date: string;
  status: "pendente" | "concluida" | "atrasada";
  priority: string;
  description: string;
}

export interface Account {
  id: string;
  name: string;
  industry: string;
  revenue: number;
  employees: number;
  owner: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  website: string;
  cnpj: string;
  type: string;
  accountStage: string;
  contacts: number;
  createdAt: string;
}

export interface Contact {
  id: string;
  name: string;
  role: string;
  company: string;
  account: string;
  email: string;
  phone: string;
  stage: string;
  owner: string;
  origin: string;
  createdAt: string;
}

export interface Report {
  id: string;
  name: string;
  type: "dashboard" | "tabela" | "grafico" | "funil";
  category: string;
  author: string;
  updatedAt: string;
  views: number;
  favorite: boolean;
}

export interface SyncConfig {
  baseUrl: string;
  apiKey: string;
  gatewayToken: string;
  connectors: string[];
  updatedAt: string;
}

export interface DashData {
  leads: Lead[];
  opportunities: Opportunity[];
  activities: Activity[];
  accounts: Account[];
  contacts: Contact[];
  monthlyRevenue: { month: string; leads: number; oportunidades: number; receita: number; conversao: number }[];
  pipelineByStage: { stage: string; count: number; value: number }[];
  leadsBySource: { source: string; count: number; value: number }[];
  activityByType: { type: string; count: number; color: string }[];
  weeklyActivities: { day: string; tarefas: number; compromissos: number; ligacoes: number; emails: number }[];
  conversionFunnel: { stage: string; value: number }[];
  reports: Report[];
  meta: {
    totalLeads: number;
    totalOpportunities: number;
    totalActivities: number;
    totalAccounts: number;
    totalContacts: number;
    fetchedAt: string;
  } | null;
  // Zenite Sync data
  syncGoogleAds: any[];
  syncMetaAds: any[];
  syncLinkedinAds: any[];
  syncConnected: boolean;
  syncConfig: SyncConfig | null;
  syncKpis: any | null;
  syncMeta: any | null;
  syncSchema: any | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  refreshSyncSchema: () => Promise<any | null>;
  saveSyncConfig: (config: Omit<SyncConfig, "updatedAt">) => Promise<boolean>;
  disconnectSync: () => Promise<boolean>;
  lastSynced: Date | null;
}

const defaultReports: Report[] = [
  { id: "R001", name: "Relatório Mensal de Vendas", type: "dashboard", category: "Vendas", author: "Sistema", updatedAt: "28 Fev 2026", views: 145, favorite: true },
  { id: "R002", name: "Pipeline por Região", type: "funil", category: "Pipeline", author: "Sistema", updatedAt: "24 Fev 2026", views: 89, favorite: false },
  { id: "R003", name: "Análise de Conversão Q4", type: "grafico", category: "Conversão", author: "Sistema", updatedAt: "20 Fev 2026", views: 67, favorite: true },
  { id: "R004", name: "Performance do Time Comercial", type: "tabela", category: "Performance", author: "Sistema", updatedAt: "18 Fev 2026", views: 234, favorite: false },
  { id: "R005", name: "Leads por Origem e Mês", type: "grafico", category: "Leads", author: "Sistema", updatedAt: "15 Fev 2026", views: 56, favorite: false },
  { id: "R006", name: "Forecast de Receita", type: "dashboard", category: "Vendas", author: "Sistema", updatedAt: "12 Fev 2026", views: 178, favorite: true },
  { id: "R007", name: "Atividades por Vendedor", type: "tabela", category: "Atividades", author: "Sistema", updatedAt: "10 Fev 2026", views: 45, favorite: false },
  { id: "R008", name: "Funil de Qualificação", type: "funil", category: "Pipeline", author: "Sistema", updatedAt: "08 Fev 2026", views: 92, favorite: false },
  { id: "R009", name: "Cross-Object: Leads x Contas", type: "tabela", category: "Cross-Data", author: "Sistema", updatedAt: "05 Fev 2026", views: 34, favorite: true },
  { id: "R010", name: "Dashboard Executivo", type: "dashboard", category: "Geral", author: "Sistema", updatedAt: "01 Fev 2026", views: 312, favorite: true },
];

const emptyData: Omit<DashData, "loading" | "error" | "refetch" | "refreshSyncSchema" | "saveSyncConfig" | "disconnectSync" | "lastSynced"> = {
  leads: [],
  opportunities: [],
  activities: [],
  accounts: [],
  contacts: [],
  monthlyRevenue: [],
  pipelineByStage: [],
  leadsBySource: [],
  activityByType: [],
  weeklyActivities: [],
  conversionFunnel: [],
  reports: defaultReports,
  meta: null,
  syncGoogleAds: [],
  syncMetaAds: [],
  syncLinkedinAds: [],
  syncConnected: false,
  syncConfig: null,
  syncKpis: null,
  syncMeta: null,
  syncSchema: null,
};

const DashDataContext = createContext<DashData>({
  ...emptyData,
  loading: true,
  error: null,
  refetch: async () => {},
  refreshSyncSchema: async () => null,
  saveSyncConfig: async () => false,
  disconnectSync: async () => false,
  lastSynced: null,
});

export function useDashData() {
  return useContext(DashDataContext);
}

async function apiCall(path: string, signal?: AbortSignal) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${publicAnonKey}`,
    },
    signal,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${path} failed (${res.status}): ${text}`);
  }
  return res.json();
}

export function DashDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState(emptyData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastSynced, setLastSynced] = useState<Date | null>(null);

  const fetchSyncData = useCallback(async (signal?: AbortSignal): Promise<{
    syncGoogleAds: any[];
    syncMetaAds: any[];
    syncLinkedinAds: any[];
    syncConnected: boolean;
    syncConfig: SyncConfig | null;
    syncKpis: any | null;
    syncMeta: any | null;
    syncSchema: any | null;
  }> => {
    const emptySyncResult = { syncGoogleAds: [], syncMetaAds: [], syncLinkedinAds: [], syncConnected: false, syncConfig: null, syncKpis: null, syncMeta: null, syncSchema: null };
    try {
      // First check if sync is configured — use a resilient fetch (not apiCall which throws on non-200)
      let configResult: any = null;
      try {
        const res = await fetch(`${API_BASE}/dash/sync/config`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          signal,
        });
        if (res.ok) {
          configResult = await res.json();
        } else {
          console.log(`[Dash/Sync] Config endpoint returned ${res.status}, skipping sync`);
          return emptySyncResult;
        }
      } catch (fetchErr) {
        console.log("[Dash/Sync] Config endpoint unreachable, skipping sync:", fetchErr);
        return emptySyncResult;
      }
      
      if (!configResult?.config || !configResult.config.baseUrl || !configResult.config.apiKey) {
        console.log("[Dash/Sync] Sync not configured");
        return emptySyncResult;
      }
      
      console.log("[Dash/Sync] Fetching Sync data and schema from Data Feed API...");
      let syncResult: any = null;
      let schemaResult: any = null;
      try {
        const [dataSettled, schemaSettled] = await Promise.allSettled([
          apiCall("/dash/sync/data", signal),
          apiCall("/dash/sync/schema", signal),
        ]);
        syncResult = dataSettled.status === "fulfilled" ? dataSettled.value : null;
        schemaResult = schemaSettled.status === "fulfilled" && schemaSettled.value?.ok ? schemaSettled.value.schema : null;
        if (dataSettled.status === "rejected") {
          console.log("[Dash/Sync] Data endpoint failed:", dataSettled.reason);
          return { ...emptySyncResult, syncConfig: configResult.config, syncSchema: schemaResult };
        }
        if (schemaSettled.status === "rejected") {
          console.log("[Dash/Sync] Schema endpoint failed (will use fallback):", schemaSettled.reason);
        } else if (schemaResult) {
          console.log(`[Dash/Sync] Schema loaded: ${schemaResult.fields?.length || 0} fields, ${schemaResult.groups?.length || 0} groups`);
        }
      } catch (dataErr) {
        console.log("[Dash/Sync] Data/Schema fetch failed, skipping sync:", dataErr);
        return { ...emptySyncResult, syncConfig: configResult.config };
      }
      
      if (!syncResult?.connected) {
        console.log("[Dash/Sync] Sync not connected:", syncResult?.error);
        return { ...emptySyncResult, syncConfig: configResult.config, syncSchema: schemaResult };
      }
      
      console.log(
        `[Dash/Sync] Data loaded! ${syncResult.googleAds?.length || 0} Google Ads, ` +
        `${syncResult.metaAds?.length || 0} Meta Ads, ` +
        `${syncResult.linkedinAds?.length || 0} LinkedIn Ads records` +
        (schemaResult ? ` | Schema: ${schemaResult.fields?.length || 0} fields` : " | Schema: fallback")
      );
      
      return {
        syncGoogleAds: syncResult.googleAds || [],
        syncMetaAds: syncResult.metaAds || [],
        syncLinkedinAds: syncResult.linkedinAds || [],
        syncConnected: true,
        syncConfig: configResult.config,
        syncKpis: syncResult.kpis || null,
        syncMeta: syncResult.meta || null,
        syncSchema: schemaResult,
      };
    } catch (err) {
      console.warn("[Dash/Sync] Error fetching sync data:", err);
      return emptySyncResult;
    }
  }, []);

  const fetchData = useCallback(async (signal?: AbortSignal) => {
    try {
      setLoading(true);
      setError(null);

      console.log("[Dash] Fetching real CRM data from Supabase tables...");
      
      // Fetch CRM data and Sync data in parallel
      const [result, syncData] = await Promise.all([
        apiCall("/dash/data", signal),
        fetchSyncData(signal),
      ]);

      if (result.error) {
        throw new Error(result.error);
      }

      setData({
        leads: result.leads || [],
        opportunities: result.opportunities || [],
        activities: result.activities || [],
        accounts: result.accounts || [],
        contacts: result.contacts || [],
        monthlyRevenue: result.monthlyRevenue || [],
        pipelineByStage: result.pipelineByStage || [],
        leadsBySource: result.leadsBySource || [],
        activityByType: result.activityByType || [],
        weeklyActivities: result.weeklyActivities || [],
        conversionFunnel: result.conversionFunnel || [],
        reports: result.reports?.length ? result.reports : defaultReports,
        meta: result.meta || null,
        ...syncData,
      });

      setLastSynced(new Date());
      console.log(
        `[Dash] Real CRM data loaded! ${result.meta?.totalLeads || 0} leads, ` +
        `${result.meta?.totalOpportunities || 0} opps, ` +
        `${result.meta?.totalActivities || 0} activities, ` +
        `${result.meta?.totalAccounts || 0} accounts, ` +
        `${result.meta?.totalContacts || 0} contacts` +
        (syncData.syncConnected ? ` | Sync connected with ${syncData.syncGoogleAds.length + syncData.syncMetaAds.length + syncData.syncLinkedinAds.length} ad records` : "")
      );
    } catch (err: any) {
      // Silently ignore abort errors (component unmounted / navigation)
      if (err instanceof DOMException && err.name === "AbortError") return;
      
      // Network errors (server unreachable) are expected when CRM tables aren't set up
      const isNetworkError = err instanceof TypeError && err.message === "Failed to fetch";
      if (isNetworkError) {
        console.log("[Dash] Server unreachable — loading demo data");
      } else {
        console.log("[Dash] CRM data fetch error, using demo data:", err?.message || err);
      }
      
      // Fallback para dados mock quando servidor falhar
      const mockData = await import("./dash-mock-data");
      setData({
        leads: mockData.leads || [],
        opportunities: mockData.opportunities || [],
        activities: mockData.activities || [],
        accounts: mockData.accounts || [],
        contacts: [],
        monthlyRevenue: mockData.monthlyRevenue || [],
        pipelineByStage: mockData.pipelineByStage || [],
        leadsBySource: mockData.leadsBySource || [],
        activityByType: mockData.activityByType || [],
        weeklyActivities: mockData.weeklyActivities || [],
        conversionFunnel: mockData.conversionFunnel || [],
        reports: defaultReports,
        meta: null,
        syncGoogleAds: [],
        syncMetaAds: [],
        syncLinkedinAds: [],
        syncConnected: false,
        syncConfig: null,
        syncKpis: null,
        syncMeta: null,
        syncSchema: null,
      });
      
      setError("Usando dados de demonstração (servidor indisponível)");
      setLastSynced(new Date());
    } finally {
      setLoading(false);
    }
  }, [fetchSyncData]);

  const refreshSyncSchema = useCallback(async (): Promise<any | null> => {
    try {
      const res = await fetch(`${API_BASE}/dash/sync/schema?refresh=true`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publicAnonKey}`,
        },
      });
      if (!res.ok) {
        console.error("[Dash/Sync] Failed to refresh sync schema:", await res.text());
        return null;
      }
      const schemaResult = await res.json();
      const schema = schemaResult?.ok ? schemaResult.schema : schemaResult.schema || null;
      console.log(`[Dash/Sync] Sync schema refreshed: ${schema?.fields?.length || 0} fields`);
      // Update state so UI re-renders with new schema
      if (schema) {
        setData(prev => ({ ...prev, syncSchema: schema }));
      }
      return schema;
    } catch (err) {
      console.error("[Dash/Sync] Error refreshing sync schema:", err);
      return null;
    }
  }, []);

  const saveSyncConfig = useCallback(async (config: Omit<SyncConfig, "updatedAt">): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/dash/sync/config`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(config),
      });
      if (!res.ok) {
        console.error("[Dash/Sync] Failed to save sync config:", await res.text());
        return false;
      }
      console.log("[Dash/Sync] Sync config saved, refetching data...");
      // Refetch to load sync data
      await fetchData();
      return true;
    } catch (err) {
      console.error("[Dash/Sync] Error saving sync config:", err);
      return false;
    }
  }, [fetchData]);

  const disconnectSync = useCallback(async (): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/dash/sync/config`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publicAnonKey}`,
        },
      });
      if (!res.ok) {
        console.error("[Dash/Sync] Failed to disconnect sync:", await res.text());
        return false;
      }
      console.log("[Dash/Sync] Sync disconnected, refetching data...");
      // Refetch to load sync data
      await fetchData();
      return true;
    } catch (err) {
      console.error("[Dash/Sync] Error disconnecting sync:", err);
      return false;
    }
  }, [fetchData]);

  useEffect(() => {
    let cancelled = false;
    fetchData().catch(() => {});
    return () => { cancelled = true; };
  }, [fetchData]);

  return (
    <DashDataContext.Provider
      value={{
        ...data,
        loading,
        error,
        refetch: fetchData,
        refreshSyncSchema,
        saveSyncConfig,
        disconnectSync,
        lastSynced,
      }}
    >
      {children}
    </DashDataContext.Provider>
  );
}

/* ── Utility functions (kept here for backward compat imports) ── */
export function formatCurrency(value: number | string): string {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (num == null || isNaN(num)) return "R$ 0,00";
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num);
}

export function formatNumber(value: number | string): string {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (num == null || isNaN(num)) return "0";
  return new Intl.NumberFormat("pt-BR").format(num);
}