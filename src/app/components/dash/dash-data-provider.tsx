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
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
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

const emptyData: Omit<DashData, "loading" | "error" | "refetch" | "lastSynced"> = {
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
};

const DashDataContext = createContext<DashData>({
  ...emptyData,
  loading: true,
  error: null,
  refetch: async () => {},
  lastSynced: null,
});

export function useDashData() {
  return useContext(DashDataContext);
}

async function apiCall(path: string) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${publicAnonKey}`,
    },
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

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("[Dash] Fetching real CRM data from Supabase tables...");
      const result = await apiCall("/dash/data");

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
      });

      setLastSynced(new Date());
      console.log(
        `[Dash] Real CRM data loaded! ${result.meta?.totalLeads || 0} leads, ` +
        `${result.meta?.totalOpportunities || 0} opps, ` +
        `${result.meta?.totalActivities || 0} activities, ` +
        `${result.meta?.totalAccounts || 0} accounts, ` +
        `${result.meta?.totalContacts || 0} contacts`
      );
    } catch (err: any) {
      console.error("[Dash] Error loading CRM data:", err);
      setError(err.message || "Erro ao carregar dados do CRM");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <DashDataContext.Provider
      value={{
        ...data,
        loading,
        error,
        refetch: fetchData,
        lastSynced,
      }}
    >
      {children}
    </DashDataContext.Provider>
  );
}

/* ── Utility functions (kept here for backward compat imports) ── */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("pt-BR").format(value);
}
