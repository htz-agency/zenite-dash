import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Presentation, Plus, MagnifyingGlass, Star, Clock, Eye, DotsThree,
  ChartBar, ChartLineUp, Table, ChartPieSlice, FunnelSimple, Lightning,
  Pencil, Trash, Copy, Export, Heart,
} from "@phosphor-icons/react";
import { useDashData } from "./dash-data-provider";

const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

interface Report {
  id: string;
  name: string;
  type: "dashboard" | "tabela" | "grafico" | "funil";
  category: string;
  author: string;
  updatedAt: string;
  views: number;
  favorite: boolean;
}

const TYPE_ICON: Record<string, React.ReactNode> = {
  dashboard: <ChartBar size={18} weight="duotone" className="text-[#0483AB]" />,
  tabela: <Table size={18} weight="duotone" className="text-[#4E6987]" />,
  grafico: <ChartLineUp size={18} weight="duotone" className="text-[#3CCEA7]" />,
  funil: <FunnelSimple size={18} weight="duotone" className="text-[#ED5200]" />,
};

const TYPE_BG: Record<string, string> = {
  dashboard: "#DCF0FF",
  tabela: "#F6F7F9",
  grafico: "#D9F8EF",
  funil: "#FFEDEB",
};

export function DashRelatorios() {
  const { reports: initialReports, loading } = useDashData();
  const [reports, setReports] = useState<Report[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("todos");
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  // Initialize reports from context when data loads
  useMemo(() => {
    if (!loading && initialReports.length > 0 && !initialized) {
      setReports(initialReports as Report[]);
      setInitialized(true);
    }
  }, [loading, initialReports, initialized]);

  const toggleFav = (id: string) => setReports(rs => rs.map(r => r.id === id ? { ...r, favorite: !r.favorite } : r));

  const filteredReports = reports
    .filter(r => {
      if (filter === "favoritos") return r.favorite;
      if (filter !== "todos") return r.type === filter;
      return true;
    })
    .filter(r => !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.category.toLowerCase().includes(search.toLowerCase()));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-[#98989d]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#0483AB] border-t-transparent rounded-full animate-spin" />
          <span style={{ fontSize: 13, fontWeight: 500, ...ff }}>Carregando dados do Supabase...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-2">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-[#122232]" style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5, ...ff }}>Relatórios</h1>
          <p className="text-[#4E6987] mt-1" style={{ fontSize: 14, letterSpacing: -0.3, ...ff }}>Gerencie e crie seus relatórios e dashboards</p>
        </div>
        <button
          className="flex items-center gap-2 h-[38px] px-5 rounded-full bg-[#0483AB] text-white hover:bg-[#025E7B] transition-colors cursor-pointer"
          style={{ fontSize: 13, fontWeight: 700, letterSpacing: -0.3, boxShadow: "0px 2px 6px rgba(4,131,171,0.3)", ...ff }}
        >
          <Plus size={16} weight="bold" />
          Novo Relatório
        </button>
      </motion.div>

      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <div className="flex items-center gap-2 h-[36px] px-3 bg-white rounded-[10px] border border-[#DDE3EC] flex-1 max-w-[280px]">
          <MagnifyingGlass size={14} className="text-[#C8CFDB]" />
          <input
            type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Buscar relatórios..."
            className="flex-1 bg-transparent border-none outline-none text-[#122232] placeholder-[#C8CFDB]"
            style={{ fontSize: 12, fontWeight: 400, letterSpacing: -0.3, ...ff }}
          />
        </div>
        <div className="flex items-center gap-1.5">
          {[
            { id: "todos", label: "Todos" },
            { id: "favoritos", label: "Favoritos" },
            { id: "dashboard", label: "Dashboards" },
            { id: "grafico", label: "Gráficos" },
            { id: "tabela", label: "Tabelas" },
            { id: "funil", label: "Funis" },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`h-[30px] px-3 rounded-full transition-all cursor-pointer ${
                filter === f.id
                  ? "bg-[#28415c] text-white"
                  : "bg-white border border-[#DDE3EC] text-[#4E6987] hover:bg-[#F6F7F9]"
              }`}
              style={filter === f.id
                ? { fontSize: 11, fontWeight: 700, letterSpacing: -0.3, boxShadow: "0px 2px 4px rgba(18,34,50,0.2)", ...ff }
                : { fontSize: 11, fontWeight: 500, letterSpacing: -0.3, ...ff }
              }
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <AnimatePresence mode="popLayout">
          {filteredReports.map((report, idx) => (
            <motion.div
              key={report.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: idx * 0.03 }}
              className="bg-white rounded-[14px] border border-[#DDE3EC] p-4 hover:border-[#0483AB]/30 transition-all group cursor-pointer relative"
              style={{ boxShadow: "0px 1px 3px rgba(18,34,50,0.04)" }}
            >
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-[42px] h-[42px] rounded-[10px] shrink-0" style={{ backgroundColor: TYPE_BG[report.type] }}>
                  {TYPE_ICON[report.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[#122232] truncate" style={{ fontSize: 15, fontWeight: 700, letterSpacing: -0.3, ...ff }}>{report.name}</span>
                    <button onClick={(e) => { e.stopPropagation(); toggleFav(report.id); }} className="shrink-0">
                      <Star size={14} weight={report.favorite ? "fill" : "regular"} className={report.favorite ? "text-[#EAC23D]" : "text-[#C8CFDB] hover:text-[#EAC23D]"} />
                    </button>
                  </div>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-[#F6F7F9] text-[#4E6987]" style={{ fontSize: 10, fontWeight: 600, letterSpacing: -0.3, ...ff }}>
                      {report.category}
                    </span>
                    <span className="text-[#98989d]" style={{ fontSize: 11, fontWeight: 500, letterSpacing: -0.3, ...ff }}>{report.author}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1 text-[#C8CFDB]">
                      <Clock size={12} weight="regular" />
                      <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: -0.3, ...ff }}>{report.updatedAt}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#C8CFDB]">
                      <Eye size={12} weight="regular" />
                      <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: -0.3, ...ff }}>{report.views}</span>
                    </div>
                  </div>
                </div>

                <div className="relative shrink-0">
                  <button
                    onClick={(e) => { e.stopPropagation(); setMenuOpen(menuOpen === report.id ? null : report.id); }}
                    className="flex items-center justify-center w-[28px] h-[28px] rounded-[6px] text-[#C8CFDB] hover:bg-[#F6F7F9] hover:text-[#4E6987] transition-colors"
                  >
                    <DotsThree size={18} weight="bold" />
                  </button>
                  <AnimatePresence>
                    {menuOpen === report.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -4 }}
                        className="absolute right-0 top-[calc(100%+4px)] w-[150px] bg-white rounded-[10px] py-1.5 z-20"
                        style={{ boxShadow: "0px 8px 24px rgba(18,34,50,0.12)", border: "0.7px solid rgba(200,207,219,0.4)" }}
                      >
                        {[
                          { icon: <Pencil size={14} />, label: "Editar" },
                          { icon: <Copy size={14} />, label: "Duplicar" },
                          { icon: <Export size={14} />, label: "Exportar" },
                          { icon: <Trash size={14} className="text-[#ED5200]" />, label: "Excluir", danger: true },
                        ].map(action => (
                          <button
                            key={action.label}
                            onClick={(e) => { e.stopPropagation(); setMenuOpen(null); }}
                            className={`flex items-center gap-2 w-full px-3 py-1.5 transition-colors ${
                              action.danger ? "text-[#ED5200] hover:bg-[#FFEDEB]" : "text-[#4E6987] hover:bg-[#F6F7F9]"
                            }`}
                            style={{ fontSize: 12, fontWeight: 500, letterSpacing: -0.3, ...ff }}
                          >
                            {action.icon}
                            {action.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredReports.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-[#C8CFDB]">
          <Presentation size={48} weight="duotone" />
          <p className="mt-3 text-[#98989d]" style={{ fontSize: 14, fontWeight: 500, ...ff }}>Nenhum relatório encontrado</p>
        </div>
      )}
    </div>
  );
}
