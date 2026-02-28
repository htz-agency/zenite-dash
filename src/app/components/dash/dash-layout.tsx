import { Outlet, useLocation, useNavigate } from "react-router";
import { DashSidebar } from "./dash-sidebar";
import {
  Bell, List, MagnifyingGlass, CalendarBlank, Export, Funnel, CaretDown,
  CloudCheck, CloudSlash, ArrowsClockwise, X, Check, FilePdf, FileCsv,
} from "@phosphor-icons/react";
import { useState, useRef, Suspense, useEffect } from "react";
import { Toaster, toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import { DashDataProvider, useDashData } from "./dash-data-provider";
import { DashFilterProvider, useDashFilters, PERIOD_OPTIONS } from "./dash-filter-context";
import { exportToCSV, exportToPDF } from "./dash-export-utils";

const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

function SyncIndicator() {
  const { loading, error, lastSynced, refetch } = useDashData();
  if (loading) return (
    <div className="flex items-center gap-1.5 h-[30px] px-3 rounded-full bg-[#DCF0FF] text-[#0483AB]">
      <ArrowsClockwise size={12} weight="bold" className="animate-spin" />
      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: -0.3, ...ff }}>Sincronizando...</span>
    </div>
  );
  if (error) return (
    <button onClick={() => refetch()}
      className="flex items-center gap-1.5 h-[30px] px-3 rounded-full bg-[#FFEDEB] text-[#ED5200] hover:bg-[#FFDDD8] transition-colors cursor-pointer">
      <CloudSlash size={12} weight="fill" />
      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: -0.3, ...ff }}>Erro · Reconectar</span>
    </button>
  );
  return (
    <button onClick={() => refetch()}
      className="flex items-center gap-1.5 h-[30px] px-3 rounded-full bg-[#D9F8EF] text-[#135543] hover:bg-[#C4F0E4] transition-colors cursor-pointer">
      <CloudCheck size={12} weight="fill" />
      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: -0.3, ...ff }}>
        Supabase {lastSynced ? `· ${lastSynced.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}` : ""}
      </span>
    </button>
  );
}

/* ── Filter Pill ── */
function FilterPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className={`h-[28px] px-3 rounded-full transition-all cursor-pointer ${
        active ? "bg-[#0483AB] text-white" : "bg-[#F6F7F9] text-[#4E6987] border border-[#EEF1F6] hover:bg-[#DDE3EC]"
      }`}
      style={{ fontSize: 11, fontWeight: active ? 700 : 500, letterSpacing: -0.3, ...ff }}>
      {label}
    </button>
  );
}

/* ── Filter Panel (Slide down) ── */
function FilterPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { period, setPeriod, owners, stages, sources, toggleOwner, toggleStage, toggleSource, clearAll, activeFilterCount } = useDashFilters();
  const { leads, opportunities } = useDashData();

  const allOwners = [...new Set([...leads.map(l => l.owner), ...opportunities.map(o => o.owner)])].filter(o => o !== "-").sort();
  const allStages = [...new Set([...leads.map(l => l.stage), ...opportunities.map(o => o.stage)])].filter(Boolean).sort();
  const allSources = [...new Set(leads.map(l => l.source))].filter(s => s !== "-").sort();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="overflow-hidden border-b border-[#EEF1F6] bg-white"
        >
          <div className="px-6 py-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[#122232]" style={{ fontSize: 14, fontWeight: 700, letterSpacing: -0.3, ...ff }}>
                Filtros Globais
                {activeFilterCount > 0 && (
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-[#0483AB] text-white" style={{ fontSize: 10, fontWeight: 700 }}>
                    {activeFilterCount}
                  </span>
                )}
              </span>
              <div className="flex items-center gap-2">
                {activeFilterCount > 0 && (
                  <button onClick={clearAll}
                    className="flex items-center gap-1 h-[28px] px-3 rounded-full bg-[#FFEDEB] text-[#ED5200] hover:bg-[#FFDDD8] transition-colors cursor-pointer"
                    style={{ fontSize: 10, fontWeight: 700, ...ff }}>
                    <X size={10} weight="bold" /> Limpar
                  </button>
                )}
                <button onClick={onClose} className="p-1 rounded-full hover:bg-[#F6F7F9] text-[#4E6987] cursor-pointer">
                  <X size={16} weight="bold" />
                </button>
              </div>
            </div>

            {/* Period */}
            <div className="mb-3">
              <span className="text-[#98989d] block mb-1.5" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", ...ff }}>Período</span>
              <div className="flex flex-wrap gap-1.5">
                {PERIOD_OPTIONS.map(p => (
                  <FilterPill key={p.value} label={p.label} active={period === p.value} onClick={() => setPeriod(p.value)} />
                ))}
              </div>
            </div>

            {/* Owners */}
            {allOwners.length > 0 && (
              <div className="mb-3">
                <span className="text-[#98989d] block mb-1.5" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", ...ff }}>Responsável</span>
                <div className="flex flex-wrap gap-1.5">
                  {allOwners.slice(0, 12).map(o => (
                    <FilterPill key={o} label={o.split(" ")[0]} active={owners.includes(o)} onClick={() => toggleOwner(o)} />
                  ))}
                </div>
              </div>
            )}

            {/* Stages */}
            {allStages.length > 0 && (
              <div className="mb-3">
                <span className="text-[#98989d] block mb-1.5" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", ...ff }}>Estágio</span>
                <div className="flex flex-wrap gap-1.5">
                  {allStages.slice(0, 10).map(s => (
                    <FilterPill key={s} label={s} active={stages.includes(s)} onClick={() => toggleStage(s)} />
                  ))}
                </div>
              </div>
            )}

            {/* Sources */}
            {allSources.length > 0 && (
              <div className="mb-1">
                <span className="text-[#98989d] block mb-1.5" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", ...ff }}>Origem</span>
                <div className="flex flex-wrap gap-1.5">
                  {allSources.slice(0, 10).map(s => (
                    <FilterPill key={s} label={s} active={sources.includes(s)} onClick={() => toggleSource(s)} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Export Menu ── */
function ExportMenu({ open, onClose, anchorRef }: { open: boolean; onClose: () => void; anchorRef: React.RefObject<HTMLButtonElement | null> }) {
  const { leads, opportunities, activities, accounts } = useDashData();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node) &&
          anchorRef.current && !anchorRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose, anchorRef]);

  const handleExport = (type: string) => {
    switch (type) {
      case "leads-csv":
        exportToCSV(leads as any[], "zenite-leads", [
          { key: "name", label: "Nome" }, { key: "company", label: "Empresa" }, { key: "stage", label: "Estágio" },
          { key: "value", label: "Valor" }, { key: "score", label: "Score" }, { key: "owner", label: "Responsável" },
          { key: "source", label: "Origem" }, { key: "createdAt", label: "Criado em" },
        ]);
        toast.success("Leads exportados em CSV");
        break;
      case "opps-csv":
        exportToCSV(opportunities as any[], "zenite-oportunidades", [
          { key: "name", label: "Nome" }, { key: "account", label: "Conta" }, { key: "stage", label: "Estágio" },
          { key: "value", label: "Valor" }, { key: "probability", label: "Probabilidade" }, { key: "owner", label: "Responsável" },
          { key: "closeDate", label: "Previsão" },
        ]);
        toast.success("Oportunidades exportadas em CSV");
        break;
      case "activities-csv":
        exportToCSV(activities as any[], "zenite-atividades", [
          { key: "title", label: "Título" }, { key: "type", label: "Tipo" }, { key: "status", label: "Status" },
          { key: "owner", label: "Responsável" }, { key: "date", label: "Data" },
        ]);
        toast.success("Atividades exportadas em CSV");
        break;
      case "pdf":
        const main = document.querySelector("main > div > div");
        if (main) {
          toast.loading("Gerando PDF...", { id: "pdf-export" });
          exportToPDF(main as HTMLElement, "zenite-dash-relatorio", "Zenite Dash — Relatório")
            .then(() => toast.success("PDF exportado!", { id: "pdf-export" }))
            .catch(() => toast.error("Erro ao exportar PDF", { id: "pdf-export" }));
        }
        break;
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div ref={menuRef}
          initial={{ opacity: 0, y: -4, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -4, scale: 0.96 }}
          transition={{ duration: 0.15 }}
          className="absolute top-full right-0 mt-2 w-[220px] bg-white rounded-[14px] z-50 py-2"
          style={{ boxShadow: "0px 8px 32px rgba(18,34,50,0.12)", border: "0.7px solid rgba(200,207,219,0.5)" }}>
          <span className="px-4 py-1.5 text-[#98989d] block" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", ...ff }}>
            Exportar como CSV
          </span>
          {[
            { id: "leads-csv", label: "Leads", icon: <FileCsv size={14} weight="duotone" /> },
            { id: "opps-csv", label: "Oportunidades", icon: <FileCsv size={14} weight="duotone" /> },
            { id: "activities-csv", label: "Atividades", icon: <FileCsv size={14} weight="duotone" /> },
          ].map(item => (
            <button key={item.id} onClick={() => handleExport(item.id)}
              className="flex items-center gap-2.5 w-full px-4 py-2 text-[#28415c] hover:bg-[#F6F7F9] transition-colors cursor-pointer"
              style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3, ...ff }}>
              {item.icon} {item.label}
            </button>
          ))}
          <div className="h-[1px] bg-[#EEF1F6] mx-3 my-1" />
          <button onClick={() => handleExport("pdf")}
            className="flex items-center gap-2.5 w-full px-4 py-2 text-[#28415c] hover:bg-[#F6F7F9] transition-colors cursor-pointer"
            style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3, ...ff }}>
            <FilePdf size={14} weight="duotone" className="text-[#ED5200]" /> Exportar Página (PDF)
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Top Bar ── */
function DashTopBar({ onMenuToggle }: { onMenuToggle: () => void }) {
  const { period, activeFilterCount } = useDashFilters();
  const [filterOpen, setFilterOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const exportBtnRef = useRef<HTMLButtonElement>(null);
  const periodLabel = PERIOD_OPTIONS.find(p => p.value === period)?.label || "Todos";

  return (
    <>
      <header className="flex items-center justify-between h-[56px] px-4 md:px-6 bg-[#f6f7f9] relative">
        <div className="flex items-center gap-2 md:gap-3 flex-1 max-w-[400px]">
          <button onClick={onMenuToggle}
            className="p-2 rounded-lg hover:bg-[#DDE3EC] transition-colors lg:hidden shrink-0 cursor-pointer">
            <List size={20} className="text-[#4E6987]" />
          </button>
          <div className="hidden sm:flex items-center gap-2 h-[36px] px-3 bg-white rounded-[10px] border border-[#DDE3EC] flex-1 max-w-[320px]">
            <MagnifyingGlass size={16} className="text-[#C8CFDB] shrink-0" />
            <input type="text" placeholder="Buscar dashboards, relatórios..."
              className="flex-1 bg-transparent border-none outline-none text-[#122232] placeholder-[#C8CFDB]"
              style={{ fontSize: 13, fontWeight: 400, letterSpacing: -0.3, ...ff }} />
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <SyncIndicator />
          {/* Period button */}
          <button onClick={() => setFilterOpen(v => !v)}
            className="hidden md:flex items-center gap-1.5 h-[34px] px-3 rounded-full bg-white border border-[#DDE3EC] text-[#28415c] hover:bg-[#f6f7f9] transition-colors cursor-pointer">
            <CalendarBlank size={14} weight="duotone" className="text-[#4E6987]" />
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.3, ...ff }}>{periodLabel}</span>
            <CaretDown size={10} className="text-[#4E6987]" />
          </button>
          {/* Filter button */}
          <button onClick={() => setFilterOpen(v => !v)}
            className={`flex items-center justify-center w-[34px] h-[34px] rounded-full border transition-colors cursor-pointer ${
              activeFilterCount > 0 || filterOpen ? "bg-[#0483AB] border-[#0483AB] text-white" : "bg-white border-[#DDE3EC] text-[#4E6987] hover:bg-[#f6f7f9]"
            }`}>
            <Funnel size={16} weight={activeFilterCount > 0 ? "fill" : "duotone"} />
            {activeFilterCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-[14px] h-[14px] rounded-full bg-[#ED5200] text-white flex items-center justify-center"
                style={{ fontSize: 8, fontWeight: 700 }}>{activeFilterCount}</span>
            )}
          </button>
          {/* Export */}
          <div className="relative">
            <button ref={exportBtnRef} onClick={() => setExportOpen(v => !v)}
              className={`flex items-center justify-center w-[34px] h-[34px] rounded-full border transition-colors cursor-pointer ${
                exportOpen ? "bg-[#28415c] border-[#28415c] text-white" : "bg-white border-[#DDE3EC] text-[#4E6987] hover:bg-[#f6f7f9]"
              }`}>
              <Export size={16} weight="duotone" />
            </button>
            <ExportMenu open={exportOpen} onClose={() => setExportOpen(false)} anchorRef={exportBtnRef} />
          </div>
          {/* Bell */}
          <button className="flex items-center justify-center w-[34px] h-[34px] rounded-full hover:bg-[#f6f7f9] transition-colors cursor-pointer relative">
            <Bell size={18} className="text-[#4E6987]" />
            <span className="absolute top-1 right-1 w-[7px] h-[7px] rounded-full bg-[#ED5200]" />
          </button>
          <div className="w-8 h-8 rounded-full bg-[#0483AB] flex items-center justify-center text-white"
            style={{ fontSize: 12, fontWeight: 700 }}>HZ</div>
        </div>
      </header>
      <FilterPanel open={filterOpen} onClose={() => setFilterOpen(false)} />
    </>
  );
}

export function DashLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <DashDataProvider>
      <DashFilterProvider>
        <div className="flex h-screen overflow-hidden">
          <Toaster position="top-right" toastOptions={{ style: { fontFamily: "'DM Sans', sans-serif", fontSize: 13 } }} />
          <DashSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <div className="flex flex-col flex-1 overflow-hidden min-w-0">
            <DashTopBar onMenuToggle={() => setSidebarOpen(true)} />
            <main className="flex-1 overflow-hidden flex flex-col">
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  className="flex-1 flex flex-col items-stretch justify-start overflow-auto pr-[10px] pb-[10px] pt-[10px] pl-0"
                >
                  <Suspense fallback={<div className="flex items-center justify-center h-32 text-[#98989d]">Carregando...</div>}>
                    <Outlet />
                  </Suspense>
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </div>
      </DashFilterProvider>
    </DashDataProvider>
  );
}
