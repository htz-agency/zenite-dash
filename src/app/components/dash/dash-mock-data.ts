/* ================================================================== */
/*  Zenite Dash — Mock CRM Data for BI Analytics                      */
/* ================================================================== */

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
}

export interface Opportunity {
  id: string;
  name: string;
  account: string;
  stage: string;
  value: number;
  probability: number;
  owner: string;
  closeDate: string;
  createdAt: string;
}

export interface Activity {
  id: string;
  type: "tarefa" | "compromisso" | "ligacao" | "nota" | "mensagem" | "email";
  title: string;
  relatedTo: string;
  owner: string;
  date: string;
  status: "pendente" | "concluida" | "atrasada";
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
}

export const STAGES = ["Prospecção", "Qualificação", "Proposta", "Negociação", "Fechado Ganho", "Fechado Perdido"];
export const SOURCES = ["Inbound", "Outbound", "Indicação", "Evento", "Ads", "Orgânico"];
export const OWNERS = ["Ana Oliveira", "Carlos Mendes", "Maria Santos", "João Ferreira", "Luciana Reis", "Pedro Costa", "Rafael Lima"];
export const INDUSTRIES = ["Tecnologia", "Saúde", "Financeiro", "Varejo", "Educação", "Indústria", "Serviços", "Agronegócio"];

export const leads: Lead[] = [
  { id: "L001", name: "TechBrasil Solutions", company: "TechBrasil", stage: "Qualificação", value: 45000, owner: "Ana Oliveira", source: "Inbound", createdAt: "2026-01-15", lastActivity: "2026-02-26", score: 82 },
  { id: "L002", name: "XPTO Corp Enterprise", company: "XPTO Corp", stage: "Proposta", value: 120000, owner: "Carlos Mendes", source: "Outbound", createdAt: "2026-01-20", lastActivity: "2026-02-25", score: 91 },
  { id: "L003", name: "Digital Co. Premium", company: "Digital Co.", stage: "Negociação", value: 78000, owner: "Maria Santos", source: "Indicação", createdAt: "2026-02-01", lastActivity: "2026-02-27", score: 75 },
  { id: "L004", name: "StartupX Growth", company: "StartupX", stage: "Prospecção", value: 32000, owner: "João Ferreira", source: "Evento", createdAt: "2026-02-05", lastActivity: "2026-02-20", score: 45 },
  { id: "L005", name: "AgriTech SA Plus", company: "AgriTech SA", stage: "Qualificação", value: 95000, owner: "Luciana Reis", source: "Ads", createdAt: "2026-02-10", lastActivity: "2026-02-24", score: 68 },
  { id: "L006", name: "FinServ Pro", company: "FinServ", stage: "Fechado Ganho", value: 200000, owner: "Pedro Costa", source: "Indicação", createdAt: "2025-12-15", lastActivity: "2026-02-15", score: 98 },
  { id: "L007", name: "MedHealth Corp", company: "MedHealth", stage: "Proposta", value: 67000, owner: "Ana Oliveira", source: "Orgânico", createdAt: "2026-01-28", lastActivity: "2026-02-23", score: 77 },
  { id: "L008", name: "EduTech Brasil", company: "EduTech", stage: "Fechado Perdido", value: 55000, owner: "Rafael Lima", source: "Inbound", createdAt: "2025-12-20", lastActivity: "2026-01-30", score: 30 },
  { id: "L009", name: "RetailMax Group", company: "RetailMax", stage: "Negociação", value: 180000, owner: "Carlos Mendes", source: "Outbound", createdAt: "2026-01-10", lastActivity: "2026-02-26", score: 88 },
  { id: "L010", name: "CloudServ Solutions", company: "CloudServ", stage: "Qualificação", value: 42000, owner: "Maria Santos", source: "Evento", createdAt: "2026-02-12", lastActivity: "2026-02-25", score: 56 },
  { id: "L011", name: "IndusTech Heavy", company: "IndusTech", stage: "Prospecção", value: 150000, owner: "João Ferreira", source: "Ads", createdAt: "2026-02-18", lastActivity: "2026-02-27", score: 40 },
  { id: "L012", name: "BioFarma Plus", company: "BioFarma", stage: "Proposta", value: 88000, owner: "Luciana Reis", source: "Inbound", createdAt: "2026-02-08", lastActivity: "2026-02-22", score: 72 },
  { id: "L013", name: "LogiTrans Express", company: "LogiTrans", stage: "Fechado Ganho", value: 135000, owner: "Pedro Costa", source: "Outbound", createdAt: "2025-11-25", lastActivity: "2026-02-10", score: 95 },
  { id: "L014", name: "SmartBuild Engh.", company: "SmartBuild", stage: "Qualificação", value: 62000, owner: "Ana Oliveira", source: "Orgânico", createdAt: "2026-02-14", lastActivity: "2026-02-26", score: 60 },
  { id: "L015", name: "FoodTech SA", company: "FoodTech", stage: "Negociação", value: 105000, owner: "Rafael Lima", source: "Indicação", createdAt: "2026-01-25", lastActivity: "2026-02-28", score: 85 },
];

export const opportunities: Opportunity[] = [
  { id: "O001", name: "Implementação CRM TechBrasil", account: "TechBrasil", stage: "Proposta", value: 120000, probability: 60, owner: "Ana Oliveira", closeDate: "2026-03-30", createdAt: "2026-01-15" },
  { id: "O002", name: "Licenciamento XPTO Corp", account: "XPTO Corp", stage: "Negociação", value: 350000, probability: 80, owner: "Carlos Mendes", closeDate: "2026-03-15", createdAt: "2026-01-20" },
  { id: "O003", name: "Consultoria Digital Co.", account: "Digital Co.", stage: "Qualificação", value: 85000, probability: 40, owner: "Maria Santos", closeDate: "2026-04-20", createdAt: "2026-02-01" },
  { id: "O004", name: "Expansão FinServ", account: "FinServ", stage: "Fechado Ganho", value: 500000, probability: 100, owner: "Pedro Costa", closeDate: "2026-02-15", createdAt: "2025-12-10" },
  { id: "O005", name: "Plataforma RetailMax", account: "RetailMax", stage: "Proposta", value: 280000, probability: 55, owner: "Carlos Mendes", closeDate: "2026-04-10", createdAt: "2026-01-10" },
  { id: "O006", name: "Integração MedHealth", account: "MedHealth", stage: "Prospecção", value: 95000, probability: 25, owner: "Ana Oliveira", closeDate: "2026-05-01", createdAt: "2026-02-05" },
  { id: "O007", name: "Migração LogiTrans", account: "LogiTrans", stage: "Fechado Ganho", value: 220000, probability: 100, owner: "Pedro Costa", closeDate: "2026-02-01", createdAt: "2025-11-20" },
  { id: "O008", name: "Suite BioFarma", account: "BioFarma", stage: "Negociação", value: 175000, probability: 70, owner: "Luciana Reis", closeDate: "2026-03-25", createdAt: "2026-02-08" },
  { id: "O009", name: "Analytics FoodTech", account: "FoodTech", stage: "Proposta", value: 140000, probability: 50, owner: "Rafael Lima", closeDate: "2026-04-15", createdAt: "2026-01-25" },
  { id: "O010", name: "Setup CloudServ", account: "CloudServ", stage: "Qualificação", value: 68000, probability: 35, owner: "Maria Santos", closeDate: "2026-05-10", createdAt: "2026-02-12" },
];

export const activities: Activity[] = [
  { id: "A001", type: "tarefa", title: "Follow-up com TechBrasil", relatedTo: "L001", owner: "Ana Oliveira", date: "2026-02-28", status: "pendente" },
  { id: "A002", type: "compromisso", title: "Demo XPTO Corp", relatedTo: "L002", owner: "Carlos Mendes", date: "2026-02-27", status: "concluida" },
  { id: "A003", type: "ligacao", title: "Call negociação Digital Co.", relatedTo: "L003", owner: "Maria Santos", date: "2026-02-26", status: "concluida" },
  { id: "A004", type: "email", title: "Envio proposta RetailMax", relatedTo: "O005", owner: "Carlos Mendes", date: "2026-02-26", status: "concluida" },
  { id: "A005", type: "nota", title: "Notas reunião FinServ", relatedTo: "O004", owner: "Pedro Costa", date: "2026-02-25", status: "concluida" },
  { id: "A006", type: "tarefa", title: "Preparar contrato BioFarma", relatedTo: "O008", owner: "Luciana Reis", date: "2026-02-28", status: "pendente" },
  { id: "A007", type: "compromisso", title: "Reunião StartupX", relatedTo: "L004", owner: "João Ferreira", date: "2026-03-01", status: "pendente" },
  { id: "A008", type: "ligacao", title: "Ligar AgriTech SA", relatedTo: "L005", owner: "Luciana Reis", date: "2026-02-24", status: "atrasada" },
  { id: "A009", type: "mensagem", title: "WhatsApp FoodTech", relatedTo: "O009", owner: "Rafael Lima", date: "2026-02-27", status: "concluida" },
  { id: "A010", type: "tarefa", title: "Atualizar CRM CloudServ", relatedTo: "O010", owner: "Maria Santos", date: "2026-02-27", status: "atrasada" },
  { id: "A011", type: "email", title: "Orçamento IndusTech", relatedTo: "L011", owner: "João Ferreira", date: "2026-02-28", status: "pendente" },
  { id: "A012", type: "compromisso", title: "Apresentação SmartBuild", relatedTo: "L014", owner: "Ana Oliveira", date: "2026-03-02", status: "pendente" },
];

export const accounts: Account[] = [
  { id: "AC01", name: "TechBrasil", industry: "Tecnologia", revenue: 12000000, employees: 150, owner: "Ana Oliveira", city: "São Paulo", state: "SP" },
  { id: "AC02", name: "XPTO Corp", industry: "Tecnologia", revenue: 45000000, employees: 500, owner: "Carlos Mendes", city: "Rio de Janeiro", state: "RJ" },
  { id: "AC03", name: "Digital Co.", industry: "Serviços", revenue: 8000000, employees: 80, owner: "Maria Santos", city: "Curitiba", state: "PR" },
  { id: "AC04", name: "FinServ", industry: "Financeiro", revenue: 120000000, employees: 2000, owner: "Pedro Costa", city: "São Paulo", state: "SP" },
  { id: "AC05", name: "RetailMax", industry: "Varejo", revenue: 85000000, employees: 1200, owner: "Carlos Mendes", city: "Belo Horizonte", state: "MG" },
  { id: "AC06", name: "MedHealth", industry: "Saúde", revenue: 25000000, employees: 300, owner: "Ana Oliveira", city: "Porto Alegre", state: "RS" },
  { id: "AC07", name: "LogiTrans", industry: "Serviços", revenue: 35000000, employees: 400, owner: "Pedro Costa", city: "Campinas", state: "SP" },
  { id: "AC08", name: "BioFarma", industry: "Saúde", revenue: 60000000, employees: 800, owner: "Luciana Reis", city: "São Paulo", state: "SP" },
  { id: "AC09", name: "FoodTech", industry: "Agronegócio", revenue: 18000000, employees: 200, owner: "Rafael Lima", city: "Goiânia", state: "GO" },
  { id: "AC10", name: "CloudServ", industry: "Tecnologia", revenue: 5000000, employees: 60, owner: "Maria Santos", city: "Florianópolis", state: "SC" },
  { id: "AC11", name: "StartupX", industry: "Tecnologia", revenue: 2000000, employees: 25, owner: "João Ferreira", city: "São Paulo", state: "SP" },
  { id: "AC12", name: "IndusTech", industry: "Indústria", revenue: 150000000, employees: 3000, owner: "João Ferreira", city: "Joinville", state: "SC" },
  { id: "AC13", name: "SmartBuild", industry: "Indústria", revenue: 22000000, employees: 250, owner: "Ana Oliveira", city: "Salvador", state: "BA" },
  { id: "AC14", name: "EduTech", industry: "Educação", revenue: 7000000, employees: 100, owner: "Rafael Lima", city: "Recife", state: "PE" },
  { id: "AC15", name: "AgriTech SA", industry: "Agronegócio", revenue: 40000000, employees: 450, owner: "Luciana Reis", city: "Ribeirão Preto", state: "SP" },
];

/* ---- Computed analytics ---- */

export const monthlyRevenue = [
  { month: "Set", leads: 18, oportunidades: 5, receita: 180000, conversao: 18 },
  { month: "Out", leads: 22, oportunidades: 7, receita: 250000, conversao: 22 },
  { month: "Nov", leads: 28, oportunidades: 9, receita: 310000, conversao: 25 },
  { month: "Dez", leads: 35, oportunidades: 11, receita: 420000, conversao: 28 },
  { month: "Jan", leads: 41, oportunidades: 14, receita: 520000, conversao: 30 },
  { month: "Fev", leads: 47, oportunidades: 16, receita: 680000, conversao: 32 },
];

export const pipelineByStage = [
  { stage: "Prospecção", count: 3, value: 332000 },
  { stage: "Qualificação", count: 4, value: 244000 },
  { stage: "Proposta", count: 3, value: 275000 },
  { stage: "Negociação", count: 3, value: 363000 },
  { stage: "Fechado Ganho", count: 2, value: 335000 },
];

export const leadsBySource = [
  { source: "Inbound", count: 3, value: 142000 },
  { source: "Outbound", count: 3, value: 450000 },
  { source: "Indicação", count: 3, value: 413000 },
  { source: "Evento", count: 2, value: 74000 },
  { source: "Ads", count: 2, value: 245000 },
  { source: "Orgânico", count: 2, value: 104000 },
];

export const activityByType = [
  { type: "Tarefas", count: 3, color: "#0483AB" },
  { type: "Compromissos", count: 3, color: "#3CCEA7" },
  { type: "Ligações", count: 2, color: "#917822" },
  { type: "Emails", count: 2, color: "#ED5200" },
  { type: "Notas", count: 1, color: "#6868B1" },
  { type: "Mensagens", count: 1, color: "#07ABDE" },
];

export const ownerPerformance = OWNERS.map((owner) => {
  const ownerLeads = leads.filter((l) => l.owner === owner);
  const ownerOpps = opportunities.filter((o) => o.owner === owner);
  const won = ownerOpps.filter((o) => o.stage === "Fechado Ganho");
  return {
    owner,
    leads: ownerLeads.length,
    opportunities: ownerOpps.length,
    wonValue: won.reduce((s, o) => s + o.value, 0),
    totalPipeline: ownerOpps.filter((o) => !o.stage.startsWith("Fechado")).reduce((s, o) => s + o.value, 0),
    avgScore: ownerLeads.length > 0 ? Math.round(ownerLeads.reduce((s, l) => s + l.score, 0) / ownerLeads.length) : 0,
  };
});

export const weeklyActivities = [
  { day: "Seg", tarefas: 5, compromissos: 3, ligacoes: 2, emails: 4 },
  { day: "Ter", tarefas: 7, compromissos: 4, ligacoes: 3, emails: 6 },
  { day: "Qua", tarefas: 4, compromissos: 6, ligacoes: 5, emails: 3 },
  { day: "Qui", tarefas: 8, compromissos: 2, ligacoes: 4, emails: 7 },
  { day: "Sex", tarefas: 6, compromissos: 5, ligacoes: 3, emails: 5 },
  { day: "Sáb", tarefas: 2, compromissos: 1, ligacoes: 1, emails: 1 },
  { day: "Dom", tarefas: 1, compromissos: 0, ligacoes: 0, emails: 0 },
];

export const conversionFunnel = [
  { stage: "Visitantes", value: 5200 },
  { stage: "Leads Captados", value: 1800 },
  { stage: "MQLs", value: 680 },
  { stage: "SQLs", value: 290 },
  { stage: "Oportunidades", value: 145 },
  { stage: "Clientes", value: 52 },
];

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("pt-BR").format(value);
}
