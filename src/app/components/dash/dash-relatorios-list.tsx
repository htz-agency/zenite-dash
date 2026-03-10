/* ================================================================== */
/*  Dash Relatórios List — Lista de relatórios salvos                */
/* ================================================================== */

import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router";
import { motion } from "motion/react";
import {
  Clock, User, LockKey, Globe, FileText, Plus, Trash, 
  Eye, PencilSimple, MagnifyingGlass, Spinner
} from "@phosphor-icons/react";
import { toast } from "sonner";
import { projectId, publicAnonKey } from "/utils/supabase/info";

const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

interface Report {
  id: string;
  name: string;
  description: string;
  isPublic: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export function DashRelatoriosList() {
  const location = useLocation();
  
  // Determinar filtro pela URL
  const getFilterFromPath = () => {
    if (location.pathname.includes("/recentes")) return "recent";
    if (location.pathname.includes("/criados-por-mim")) return "mine";
    if (location.pathname.includes("/privados")) return "private";
    if (location.pathname.includes("/publicos")) return "public";
    return "all";
  };
  
  const filter = getFilterFromPath();
  
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Fetch reports
  useEffect(() => {
    let cancelled = false;
    fetchReports().catch(() => {});
    return () => { cancelled = true; };
  }, [filter]);

  const fetchReports = async (signal?: AbortSignal) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d2ca3281/dash/visual-builder/list-reports?filter=${filter}&userId=default`,
        {
          headers: {
            "Authorization": `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();
      setReports(data.reports || []);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      console.error("Error fetching reports:", err);
      toast.error("Erro ao carregar relatórios");
    } finally {
      setLoading(false);
    }
  };

  const deleteReport = async (id: string, name: string) => {
    if (!confirm(`Deseja realmente excluir o relatório "${name}"?`)) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d2ca3281/dash/visual-builder/delete-report/${id}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      toast.success(`Relatório "${name}" excluído com sucesso`);
      fetchReports();
    } catch (err) {
      console.error("Error deleting report:", err);
      toast.error("Erro ao excluir relatório");
    }
  };

  const filteredReports = reports.filter(r => 
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.description.toLowerCase().includes(search.toLowerCase())
  );

  const getTitle = () => {
    switch (filter) {
      case "recent": return "Relatórios Recentes";
      case "mine": return "Criados por Mim";
      case "private": return "Relatórios Privados";
      case "public": return "Relatórios Públicos";
      default: return "Todos os Relatórios";
    }
  };

  const getIcon = () => {
    switch (filter) {
      case "recent": return <Clock size={22} weight="duotone" className="text-[#0483AB]" />;
      case "mine": return <User size={22} weight="duotone" className="text-[#0483AB]" />;
      case "private": return <LockKey size={22} weight="duotone" className="text-[#0483AB]" />;
      case "public": return <Globe size={22} weight="duotone" className="text-[#0483AB]" />;
      default: return <FileText size={22} weight="duotone" className="text-[#0483AB]" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-8 py-6 bg-white border-b border-[#EEF1F6] rounded-[16px]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {getIcon()}
            <h1 className="text-[#122232]" style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.5, ...ff }}>
              {getTitle()}
            </h1>
          </div>
          <Link
            to="/estudio/visual"
            className="group/pill relative flex items-center gap-[3px] h-[40px] pl-[16px] pr-[20px] rounded-[100px] bg-[#dcf0ff] text-[#28415c] hover:bg-[#bcdaf1] hover:shadow-[0px_2px_4px_0px_rgba(18,34,50,0.3)] transition-all duration-150 cursor-pointer"
          >
            <Plus size={16} weight="bold" />
            <span className="font-semibold" style={{ fontSize: 15, letterSpacing: -0.5, lineHeight: "22px" }}>
              Novo Relatório
            </span>
          </Link>
        </div>

        {/* Search */}
        <div className="relative max-w-[400px]">
          <MagnifyingGlass size={16} weight="bold" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#98989d]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar relatórios..."
            className="w-full h-[40px] pl-9 pr-3 border border-[#EEF1F6] rounded-[8px] text-[#122232] placeholder:text-[#98989d] focus:outline-none focus:border-[#0483AB] transition-colors"
            style={{ fontSize: 14, letterSpacing: -0.3, ...ff }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-8 py-6 overflow-y-auto bg-[#F6F7F9]">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Spinner size={32} weight="bold" className="text-[#0483AB] animate-spin" />
          </div>
        ) : filteredReports.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <FileText size={64} weight="duotone" className="text-[#98989d] mb-4" />
            <p className="text-[#4E6987] mb-2" style={{ fontSize: 18, fontWeight: 600, letterSpacing: -0.3, ...ff }}>
              {search ? "Nenhum relatório encontrado" : "Nenhum relatório salvo ainda"}
            </p>
            <p className="text-[#98989d]" style={{ fontSize: 14, letterSpacing: -0.3, ...ff }}>
              {search ? "Tente buscar por outro termo" : "Crie seu primeiro relatório no Visual Builder"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.map((report, idx) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
              >
                <div className="group/card bg-white border border-[#EEF1F6] rounded-[12px] p-5 hover:shadow-[0px_4px_12px_0px_rgba(18,34,50,0.08)] transition-all duration-200">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[#122232] truncate mb-1" style={{ fontSize: 16, fontWeight: 600, letterSpacing: -0.3, ...ff }}>
                        {report.name}
                      </h3>
                      {report.description && (
                        <p className="text-[#98989d] line-clamp-2" style={{ fontSize: 13, letterSpacing: -0.3, ...ff }}>
                          {report.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-1 ml-2 opacity-0 group-hover/card:opacity-100 transition-opacity">
                      <Link
                        to={`/estudio/visual?load=${report.id}&type=report`}
                        className="p-2 rounded-[8px] text-[#4E6987] hover:bg-[#F6F7F9] transition-colors"
                        title="Editar"
                      >
                        <PencilSimple size={16} weight="bold" />
                      </Link>
                      <button
                        onClick={() => deleteReport(report.id, report.name)}
                        className="p-2 rounded-[8px] text-[#F56233] hover:bg-[#FFF5F2] transition-colors"
                        title="Excluir"
                      >
                        <Trash size={16} weight="bold" />
                      </button>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center gap-4 pt-3 border-t border-[#EEF1F6]">
                    <div className="flex items-center gap-1.5">
                      {report.isPublic ? (
                        <Globe size={14} weight="bold" className="text-[#3CCEA7]" />
                      ) : (
                        <LockKey size={14} weight="bold" className="text-[#98989d]" />
                      )}
                      <span className="text-[#98989d]" style={{ fontSize: 12, letterSpacing: -0.3, ...ff }}>
                        {report.isPublic ? "Público" : "Privado"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} weight="bold" className="text-[#98989d]" />
                      <span className="text-[#98989d]" style={{ fontSize: 12, letterSpacing: -0.3, ...ff }}>
                        {new Date(report.updatedAt).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link
                    to={`${location.pathname}/${report.id}`}
                    className="flex items-center justify-center gap-2 w-full h-[36px] mt-4 rounded-[8px] bg-[#F6F7F9] text-[#4E6987] hover:bg-[#0483AB] hover:text-white transition-all duration-200"
                  >
                    <Eye size={16} weight="bold" />
                    <span className="font-semibold" style={{ fontSize: 13, letterSpacing: -0.3, ...ff }}>
                      Abrir Relatório
                    </span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}