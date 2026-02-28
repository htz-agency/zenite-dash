import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  ChartBar, ChartLineUp, FunnelSimple, Lightning, Target, ChartDonut,
  Table, Cube, Presentation, ArrowRight, Plus, Star, Clock, Sparkle,
  CloudCheck, Database, SelectionPlus,
} from "@phosphor-icons/react";
import { useDashData, formatCurrency } from "./dash-data-provider";

const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

const quickAccess = [
  { title: "Visão Geral", desc: "Panorama completo do CRM", icon: <ChartBar size={24} weight="duotone" />, bg: "#DCF0FF", color: "#0483AB", to: "/dashboards/overview" },
  { title: "Vendas", desc: "Métricas de receita e pipeline", icon: <ChartLineUp size={24} weight="duotone" />, bg: "#D9F8EF", color: "#3CCEA7", to: "/dashboards/vendas" },
  { title: "Pipeline", desc: "Funil de conversão visual", icon: <FunnelSimple size={24} weight="duotone" />, bg: "#FEEDCA", color: "#917822", to: "/dashboards/pipeline" },
  { title: "Atividades", desc: "Produtividade da equipe", icon: <Lightning size={24} weight="duotone" />, bg: "#FFEDEB", color: "#ED5200", to: "/dashboards/atividades" },
  { title: "Performance", desc: "Ranking e metas individuais", icon: <Target size={24} weight="duotone" />, bg: "#E8E8FD", color: "#6868B1", to: "/dashboards/performance" },
  { title: "Conversão", desc: "Taxas e funil completo", icon: <ChartDonut size={24} weight="duotone" />, bg: "#DCF0FF", color: "#07ABDE", to: "/dashboards/conversao" },
  { title: "Tabelas Cruzadas", desc: "Dados multi-objeto", icon: <Table size={24} weight="duotone" />, bg: "#F6F7F9", color: "#4E6987", to: "/explorador/tabelas" },
  { title: "Objetos CRM", desc: "Explorar dados brutos", icon: <Cube size={24} weight="duotone" />, bg: "#F6F7F9", color: "#28415C", to: "/explorador/objetos" },
  { title: "Dashboard Builder", desc: "Monte seu painel personalizado", icon: <SelectionPlus size={24} weight="duotone" />, bg: "#E8E8FD", color: "#6868B1", to: "/dashboards/builder" },
];

const recentReports = [
  { name: "Relatório Mensal de Vendas", updated: "Há 2 dias", views: 45 },
  { name: "Pipeline por Região", updated: "Há 5 dias", views: 28 },
  { name: "Análise de Conversão Q4", updated: "Há 1 semana", views: 67 },
  { name: "Performance do Time Comercial", updated: "Há 2 semanas", views: 34 },
];

export function DashHome() {
  const navigate = useNavigate();
  const { leads, opportunities, activities, accounts, contacts, loading, lastSynced, error, meta } = useDashData();

  const totalRecords = (meta?.totalLeads || 0) + (meta?.totalOpportunities || 0) + (meta?.totalActivities || 0) + (meta?.totalAccounts || 0) + (meta?.totalContacts || 0);

  return (
    <div className="max-w-[1200px] mx-auto px-2">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center w-[44px] h-[44px] rounded-[12px] bg-[#EBF1FA]">
            <Sparkle size={24} weight="fill" className="text-[#4E6987]" />
          </div>
          <div>
            <h1 className="text-[#122232]" style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5, ...ff }}>
              Zenite Dash
            </h1>
            <p className="text-[#4E6987]" style={{ fontSize: 14, fontWeight: 400, letterSpacing: -0.3, ...ff }}>
              Business Intelligence integrado ao CRM
            </p>
          </div>
        </div>
        {/* Supabase status */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-4 flex items-center gap-3 flex-wrap"
        >
          {error ? (
            <div className="flex items-center gap-2 h-[32px] px-3 rounded-full bg-[#FFEDEB] text-[#B13B00]">
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: -0.3, ...ff }}>
                Erro na conexão
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 h-[32px] px-3 rounded-full bg-[#D9F8EF] text-[#135543]">
              <CloudCheck size={14} weight="fill" />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: -0.3, ...ff }}>
                Conectado ao Supabase (tabelas reais)
              </span>
            </div>
          )}
          <div className="flex items-center gap-2 h-[32px] px-3 rounded-full bg-[#F6F7F9] text-[#4E6987]">
            <Database size={14} weight="duotone" />
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: -0.3, ...ff }}>
              {loading ? "Carregando..." : `${totalRecords} registros carregados`}
            </span>
          </div>
          {lastSynced && (
            <span className="text-[#98989d]" style={{ fontSize: 11, fontWeight: 500, letterSpacing: -0.3, ...ff }}>
              Sync: {lastSynced.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
            </span>
          )}
        </motion.div>
      </motion.div>

      {/* Quick Access Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="mb-6"
      >
        <p className="text-[#98989d] px-1 mb-3" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", lineHeight: "20px", ...ff }}>
          Acesso Rápido
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickAccess.map((item, i) => (
            <motion.button
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.04 }}
              onClick={() => navigate(item.to)}
              className="bg-white rounded-[14px] p-4 border border-[#DDE3EC] text-left hover:border-[#0483AB]/40 transition-all group cursor-pointer"
              style={{ boxShadow: "0px 1px 3px rgba(18,34,50,0.04)" }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center justify-center w-[40px] h-[40px] rounded-[10px]" style={{ backgroundColor: item.bg }}>
                  <span style={{ color: item.color }}>{item.icon}</span>
                </div>
                <ArrowRight size={14} className="text-[#C8CFDB] group-hover:text-[#0483AB] transition-colors" />
              </div>
              <p className="text-[#122232]" style={{ fontSize: 14, fontWeight: 700, letterSpacing: -0.3, ...ff }}>{item.title}</p>
              <p className="text-[#4E6987] mt-0.5" style={{ fontSize: 11, fontWeight: 500, letterSpacing: -0.3, ...ff }}>{item.desc}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Recent reports */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="bg-white rounded-[16px] border border-[#DDE3EC] overflow-hidden"
        style={{ boxShadow: "0px 1px 3px rgba(18,34,50,0.04)" }}
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div className="flex items-center gap-2.5">
            <Clock size={18} weight="duotone" className="text-[#0483AB]" />
            <span className="text-[#122232]" style={{ fontSize: 15, fontWeight: 700, letterSpacing: -0.5, ...ff }}>
              Relatórios Recentes
            </span>
          </div>
          <button
            onClick={() => navigate("/relatorios")}
            className="flex items-center gap-[3px] h-[30px] px-3 rounded-full bg-[#f6f7f9] text-[#28415c] hover:bg-[#dde3ec] transition-colors cursor-pointer"
            style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", ...ff }}
          >
            Ver todos
            <ArrowRight size={12} weight="bold" />
          </button>
        </div>

        <div className="px-5 pb-5">
          <div
            className="grid items-center h-[34px]"
            style={{ gridTemplateColumns: "32px 1fr 120px 80px", fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", color: "#28415c", ...ff }}
          >
            <span className="text-right pr-3">#</span>
            <span>Nome</span>
            <span>Atualizado</span>
            <span className="text-right">Visualizações</span>
          </div>

          {recentReports.map((report, idx) => (
            <div key={report.name}>
              <div className="h-0 relative w-full">
                <div className="absolute inset-[-0.75px_0_0_0]">
                  <svg className="block w-full h-[1.5px]" fill="none" preserveAspectRatio="none" viewBox="0 0 1096 1.5">
                    <line stroke="#DDE3EC" strokeWidth="1.5" x2="1096" y1="0.75" y2="0.75" />
                  </svg>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.35 + idx * 0.05 }}
                className="grid items-center h-[40px] rounded-[100px] hover:bg-[#f6f7f9] transition-colors cursor-pointer mx-[-4px] px-1"
                style={{ gridTemplateColumns: "32px 1fr 120px 80px", ...ff }}
              >
                <span className="text-[#28415c] text-right pr-3" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5 }}>{idx + 1}</span>
                <span className="text-[#07ABDE] truncate" style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3 }}>{report.name}</span>
                <span className="text-[#4E6987]" style={{ fontSize: 12, fontWeight: 500, letterSpacing: -0.3 }}>{report.updated}</span>
                <span className="text-[#28415c] text-right" style={{ fontSize: 12, fontWeight: 500, letterSpacing: -0.3 }}>{report.views}</span>
              </motion.div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}