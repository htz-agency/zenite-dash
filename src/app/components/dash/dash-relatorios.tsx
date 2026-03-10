/* ================================================================== */
/*  Zenite Dash — Todos Relatórios (redesign baseado no Figma spec)  */
/*  Layout: Sidebar Filtros | Tabela de Relatórios                    */
/* ================================================================== */

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FunnelSimple, FolderSimple, Heart, GearSix, FileText, ChartBar,
  User, Clock, Table, FolderOpen, Link as LinkIcon, FloppyDisk,
  CalendarBlank, Check, Plus, MagnifyingGlass, Presentation,
  Star, DotsThree, Pencil, Trash, Copy, Export, Eye,
  ChartLineUp, FunnelSimple as FunnelIcon,
  ListBullets, ChartBarHorizontal, ChartPieSlice, ChartDonut,
  ChartScatter, SquaresFour, ChartPolar, Atom,
  Target, Lightning, Building, AddressBook, SketchLogo,
  Briefcase, Phone, ClockCounterClockwise,
  GoogleLogo, MetaLogo, LinkedinLogo, IdentificationCard,
} from "@phosphor-icons/react";
import { useDashData } from "./dash-data-provider";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { projectId, publicAnonKey } from "/utils/supabase/info";

const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

/* ── Types ── */

interface Report {
  id: string;
  name: string;
  type: string;
  category: string;
  folder: string;
  author: string;
  updatedAt: string;
  views: number;
  favorite: boolean;
}

const TYPE_LABEL: Record<string, string> = {
  auto: "Automático",
  bar: "Barras",
  "bar-h": "Barras Horiz.",
  line: "Linhas",
  area: "Área",
  pie: "Pizza",
  donut: "Donut",
  scatter: "Dispersão",
  treemap: "Treemap",
  radar: "Polar",
  sankey: "Sankey",
  table: "Tabela",
  dashboard: "Dashboard",
  grafico: "Gráfico",
  tabela: "Tabela",
  funil: "Funil",
};

const TYPE_ICON_SMALL: Record<string, React.ReactNode> = {
  auto: <Atom size={14} weight="duotone" className="text-[#28415C]" />,
  bar: <ChartBar size={14} weight="duotone" className="text-[#28415C]" />,
  "bar-h": <ChartBarHorizontal size={14} weight="duotone" className="text-[#28415C]" />,
  line: <ChartLineUp size={14} weight="duotone" className="text-[#28415C]" />,
  area: <ChartLineUp size={14} weight="duotone" className="text-[#28415C]" />,
  pie: <ChartPieSlice size={14} weight="duotone" className="text-[#28415C]" />,
  donut: <ChartDonut size={14} weight="duotone" className="text-[#28415C]" />,
  scatter: <ChartScatter size={14} weight="duotone" className="text-[#28415C]" />,
  treemap: <SquaresFour size={14} weight="duotone" className="text-[#28415C]" />,
  radar: <ChartPolar size={14} weight="duotone" className="text-[#28415C]" />,
  sankey: <FunnelIcon size={14} weight="duotone" className="text-[#28415C]" />,
  table: <Table size={14} weight="duotone" className="text-[#28415C]" />,
  dashboard: <ChartBar size={14} weight="duotone" className="text-[#28415C]" />,
  grafico: <ChartLineUp size={14} weight="duotone" className="text-[#28415C]" />,
  tabela: <Table size={14} weight="duotone" className="text-[#28415C]" />,
  funil: <FunnelIcon size={14} weight="duotone" className="text-[#28415C]" />,
};

/* ── Sidebar filter categories ── */

const FILTER_CATEGORIES = [
  { id: "recentes", label: "Recentes" },
  { id: "criados", label: "Criados por mim" },
  { id: "privados", label: "Relatórios privados" },
  { id: "compartilhados", label: "Relatórios Públicos" },
];

const SIDEBAR_NAV = [
  { id: "pastas", label: "Pastas", icon: <FolderSimple size={19} weight="duotone" /> },
  { id: "favoritos", label: "Favoritos", icon: <Heart size={19} weight="duotone" /> },
  { id: "config", label: "Configurações", icon: <GearSix size={19} weight="duotone" /> },
];

/* ── Column definitions ── */

const COLUMNS = [
  { key: "name", label: "Nome do Relatório", icon: <FileText size={15} weight="duotone" />, flex: "2.2", defaultWidth: 160 },
  { key: "folder", label: "Pasta", icon: <FolderSimple size={15} weight="duotone" />, flex: "1.1", defaultWidth: 130 },
  { key: "category", label: "Categoria", icon: <FolderSimple size={15} weight="duotone" />, flex: "1.4", defaultWidth: 170 },
  { key: "type", label: "Tipo de Relatório", icon: <ChartBar size={15} weight="duotone" />, flex: "1.3", defaultWidth: 155 },
  { key: "author", label: "Criado por", icon: <User size={15} weight="duotone" />, flex: "1.4", defaultWidth: 170 },
  { key: "updatedAt", label: "Atualizado em", icon: <Clock size={15} weight="duotone" />, flex: "1.2", defaultWidth: 145 },
];

const COL_MIN_WIDTH = 80;

/* ── Table origin metadata (matching CRM_TABLES in visual builder) ── */
const TABLE_META: Record<string, { label: string; color: string; bg: string }> = {
  leads:              { label: "Leads",               color: "#EAC23D", bg: "#FEEDCA" },
  opportunities:      { label: "Oportunidades",       color: "#07ABDE", bg: "#DCF0FF" },
  activities:         { label: "Atividades",           color: "#4E6987", bg: "#DDE3EC" },
  accounts:           { label: "Contas",               color: "#3CCEA7", bg: "#D9F8EF" },
  contacts:           { label: "Contatos",             color: "#FF8C76", bg: "#FFEDEB" },
  proposals:          { label: "Propostas",            color: "#07ABDE", bg: "#FFE8E0" },
  proposal_services:  { label: "Serviços",             color: "#4E6987", bg: "#E0E8F0" },
  call_records:       { label: "Ligações",             color: "#23E6B2", bg: "#D9F4FB" },
  field_history:      { label: "Histórico",            color: "#8C8CD4", bg: "#D9F8EF" },
  sync_google_ads:    { label: "Google Ads",           color: "#4285F4", bg: "#E8F0FE" },
  sync_meta_ads:      { label: "Meta Ads",             color: "#0081FB", bg: "#E5F0FF" },
  sync_linkedin_ads:  { label: "LinkedIn Ads",         color: "#0A66C2", bg: "#E1EEFF" },
};

/* ── Category icons per table (matching DS entity-activity-icons) ── */
const TABLE_ICON: Record<string, (color: string) => React.ReactNode> = {
  leads:              (c) => <Heart size={11} weight="duotone" color={c} />,
  opportunities:      (c) => <SketchLogo size={11} weight="duotone" color={c} />,
  activities:         (c) => <Lightning size={11} weight="duotone" color={c} />,
  accounts:           (c) => <Building size={11} weight="duotone" color={c} />,
  contacts:           (c) => <IdentificationCard size={11} weight="duotone" color={c} />,
  proposals:          (c) => <FileText size={11} weight="duotone" color={c} />,
  proposal_services:  (c) => <Briefcase size={11} weight="duotone" color={c} />,
  call_records:       (c) => <Phone size={11} weight="duotone" color={c} />,
  field_history:      (c) => <ClockCounterClockwise size={11} weight="duotone" color={c} />,
  sync_google_ads:    (c) => <GoogleLogo size={11} weight="duotone" color={c} />,
  sync_meta_ads:      (c) => <MetaLogo size={11} weight="duotone" color={c} />,
  sync_linkedin_ads:  (c) => <LinkedinLogo size={11} weight="duotone" color={c} />,
};

/** Extract the primary table from a report config's shelf fields */
function extractTableFromConfig(config: any): string {
  if (!config) return "";
  const shelves = [...(config.colShelf || []), ...(config.rowShelf || []), ...(config.filterShelf || [])];
  // ShelfItem has { field: CrmField } where CrmField has { table: string }
  const tables = shelves
    .map((s: any) => s?.field?.table || s?.table)
    .filter(Boolean);
  // Also check marks (color, size, label, detail, tooltip)
  if (config.marks) {
    for (const mk of Object.values(config.marks)) {
      if (mk && typeof mk === "object" && (mk as any).table) {
        tables.push((mk as any).table);
      }
    }
  }
  return tables[0] || "";
}

/* ── Checkbox component ── */

function ZCheckbox({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onChange(); }}
      className={`flex items-center justify-center w-[16px] h-[16px] rounded-full border-[1.5px] transition-all duration-150 cursor-pointer shrink-0 ${
        checked
          ? "bg-[#3CCEA7] border-[#3CCEA7]"
          : "border-[#28415C] bg-transparent hover:border-[#3CCEA7]"
      }`}
    >
      {checked && <Check size={10} weight="bold" className="text-white" />}
    </button>
  );
}

/* ── Segmented Control ── */

function SegmentedControl({ value, onChange }: { value: "tabela" | "pasta"; onChange: (v: "tabela" | "pasta") => void }) {
  return (
    <div className="flex items-center bg-[#F6F7F9] rounded-full p-[4px] relative" style={{ boxShadow: "inset 0px -0.5px 1px rgba(255,255,255,0.3), inset 1px 1.5px 4px rgba(0,0,0,0.08)" }}>
      {(["tabela", "pasta"] as const).map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`relative flex items-center justify-center gap-[3px] h-[36px] px-[14px] rounded-[20px] transition-all duration-200 cursor-pointer ${
            value === tab
              ? "bg-[#28415C] text-white"
              : "text-[#98989D] hover:text-[#4E6987]"
          }`}
          style={value === tab ? { boxShadow: "0px 2px 4px rgba(18,34,50,0.3)" } : undefined}
        >
          {tab === "tabela" ? <Table size={15} weight="bold" /> : <FolderOpen size={15} weight="bold" />}
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", ...ff }}>
            {tab === "tabela" ? "TABELA" : "PASTA"}
          </span>
        </button>
      ))}
    </div>
  );
}

/* ── Row context menu ── */

function RowMenu({ open, onClose, reportId, onDelete }: { open: boolean; onClose: () => void; reportId: string; onDelete: (id: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.95, y: -4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -4 }}
          className="absolute right-0 top-[calc(100%+4px)] w-[150px] bg-white rounded-[10px] py-1.5 z-30"
          style={{ boxShadow: "0px 8px 24px rgba(18,34,50,0.12)", border: "0.7px solid rgba(200,207,219,0.4)" }}
        >
          {[
            { icon: <Eye size={14} />, label: "Abrir", action: "open" },
            { icon: <Pencil size={14} />, label: "Editar", action: "edit" },
            { icon: <Copy size={14} />, label: "Duplicar", action: "duplicate" },
            { icon: <Export size={14} />, label: "Exportar", action: "export" },
            { icon: <Trash size={14} className="text-[#ED5200]" />, label: "Excluir", danger: true, action: "delete" },
          ].map(action => (
            <button
              key={action.label}
              onClick={(e) => {
                e.stopPropagation();
                if (action.action === "delete") onDelete(reportId);
                onClose();
              }}
              className={`flex items-center gap-2 w-full px-3 py-1.5 transition-colors cursor-pointer ${
                (action as any).danger ? "text-[#ED5200] hover:bg-[#FFEDEB]" : "text-[#4E6987] hover:bg-[#F6F7F9]"
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
  );
}

/* ================================================================== */
/*  Main Component                                                     */
/* ================================================================== */

export function DashRelatorios() {
  const { reports: initialReports, loading } = useDashData();
  const [reports, setReports] = useState<Report[]>([]);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("recentes");
  const [viewMode, setViewMode] = useState<"tabela" | "pasta">("tabela");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [apiLoading, setApiLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  /* ── Column resize logic ── */
  const defaultWidthsKey = COLUMNS.map(c => c.defaultWidth).join(",");
  const [colWidths, setColWidths] = useState<number[]>(() => COLUMNS.map(c => c.defaultWidth));
  useEffect(() => { setColWidths(COLUMNS.map(c => c.defaultWidth)); }, [defaultWidthsKey]);
  const resizeRef = useRef<{ idx: number; startX: number; startW: number } | null>(null);

  const startResize = useCallback((idx: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    resizeRef.current = { idx, startX: e.clientX, startW: colWidths[idx] };
    const onMove = (ev: MouseEvent) => {
      if (!resizeRef.current) return;
      const delta = ev.clientX - resizeRef.current.startX;
      const newW = Math.max(COL_MIN_WIDTH, resizeRef.current.startW + delta);
      setColWidths(prev => {
        const next = [...prev];
        next[resizeRef.current!.idx] = newW;
        return next;
      });
    };
    const onUp = () => {
      resizeRef.current = null;
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  }, [colWidths]);

  const gridTemplate = `40px ${colWidths.map(w => `${w}px`).join(" ")} 48px`;

  /* ── Map active filter to API filter param ── */
  const getApiFilter = (filterId: string) => {
    const map: Record<string, string> = {
      recentes: "recent",
      criados: "mine",
      privados: "private",
      compartilhados: "public",
      todos: "all",
      favoritos: "all",
    };
    return map[filterId] || "all";
  };

  /* ── Fetch real reports from the API ── */
  const fetchApiReports = async () => {
    setApiLoading(true);
    try {
      const apiFilter = getApiFilter(activeFilter);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d2ca3281/dash/visual-builder/list-reports?filter=${apiFilter}&userId=default`,
        { headers: { Authorization: `Bearer ${publicAnonKey}` } }
      );
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      const apiReports: Report[] = (data.reports || []).map((r: any) => {
        const tableId = extractTableFromConfig(r.config);
        const tableMeta = TABLE_META[tableId];
        return {
          id: r.id,
          name: r.name || "Sem título",
          type: r.config?.chartType || r.type || "bar",
          category: tableId || r.category || r.description || "Visual Builder",
          folder: r.folder || "Sem pasta",
          author: r.userId === "default" ? "Você" : (r.userId || "Sistema"),
          updatedAt: r.updatedAt
            ? new Date(r.updatedAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })
            : "—",
          views: 0,
          favorite: false,
        };
      });

      setReports(apiReports);
    } catch (err) {
      console.error("Error fetching reports from API:", err);
      setReports([]);
    } finally {
      setApiLoading(false);
    }
  };

  useEffect(() => {
    fetchApiReports();
  }, [activeFilter, loading]);

  /* ── Sync filter from URL path ── */
  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/recentes")) setActiveFilter("recentes");
    else if (path.includes("/criados-por-mim")) setActiveFilter("criados");
    else if (path.includes("/privados")) setActiveFilter("privados");
    else if (path.includes("/publicos")) setActiveFilter("compartilhados");
    else if (path.includes("/todos")) setActiveFilter("todos");
  }, [location.pathname]);

  /* ── Navigate when filter changes via sidebar click ── */
  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
    const isEstudio = location.pathname.startsWith("/estudio");
    if (isEstudio) {
      const pathMap: Record<string, string> = {
        recentes: "/estudio/relatorios/recentes",
        criados: "/estudio/relatorios/criados-por-mim",
        privados: "/estudio/relatorios/privados",
        compartilhados: "/estudio/relatorios/publicos",
        todos: "/estudio/relatorios/todos",
      };
      if (pathMap[filterId]) navigate(pathMap[filterId]);
    }
  };

  const toggleFav = (id: string) => setReports(rs => rs.map(r => r.id === id ? { ...r, favorite: !r.favorite } : r));

  /* ── Delete report via API ── */
  const deleteReport = async (id: string) => {
    const report = reports.find(r => r.id === id);
    if (!report) return;
    if (!confirm(`Deseja realmente excluir o relatório "${report.name}"?`)) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d2ca3281/dash/visual-builder/delete-report/${id}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${publicAnonKey}` } }
      );
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      toast.success(`Relatório "${report.name}" excluído`);
      // Remove locally and refetch
      setReports(rs => rs.filter(r => r.id !== id));
      setSelectedIds(prev => { const next = new Set(prev); next.delete(id); return next; });
    } catch (err) {
      console.error("Error deleting report:", err);
      // If it's a static report, just remove locally
      setReports(rs => rs.filter(r => r.id !== id));
      toast.success(`Relatório "${report.name}" removido`);
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredReports.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredReports.map(r => r.id)));
    }
  };

  const filteredReports = reports
    .filter(r => {
      if (activeFilter === "favoritos") return r.favorite;
      if (activeFilter === "recentes") return true; // all, sorted by date
      if (activeFilter === "criados") return true; // mock: all belong to current user
      if (activeFilter === "privados") return true;
      if (activeFilter === "compartilhados") return true;
      return true;
    })
    .filter(r => !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.category.toLowerCase().includes(search.toLowerCase()));

  const reportCount = filteredReports.length;

  /* ── Folder grouping for "Pasta" view ── */
  const groupedByCategory = useMemo(() => {
    const groups: Record<string, Report[]> = {};
    filteredReports.forEach(r => {
      if (!groups[r.category]) groups[r.category] = [];
      groups[r.category].push(r);
    });
    return groups;
  }, [filteredReports]);

  if (loading || apiLoading) {
    return (
      <div className="flex items-center justify-center h-64 text-[#98989d]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#0483AB] border-t-transparent rounded-full animate-spin" />
          <span style={{ fontSize: 13, fontWeight: 500, ...ff }}>Carregando dados...</span>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-[15px] flex flex-col h-full min-h-0 overflow-hidden"
      style={{ boxShadow: "0px 1px 3px rgba(18,34,50,0.04)" }}
    >
      {/* ═══ Header ═══ */}
      <div className="px-6 pt-[17px] pb-0">
        {/* Title row */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[#28415C]" style={{ fontSize: 19, fontWeight: 700, lineHeight: "24px", letterSpacing: -0.5, ...ff }}>
              Todos Relatórios
            </h1>
            <p className="text-[#98989D] mt-[2px]" style={{ fontSize: 8, fontWeight: 700, lineHeight: "20px", letterSpacing: 0.5, textTransform: "uppercase", ...ff }}>
              VISUALIZANDO AGORA: {reportCount} RELATÓRIO{reportCount !== 1 ? "S" : ""}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Action buttons pill */}
            <div className="flex items-center gap-[10px] bg-[#F6F7F9] rounded-full px-[10px] py-0 h-[32px]">
              <button className="flex items-center justify-center w-[20px] h-[20px] text-[#28415C] hover:text-[#07ABDE] transition-colors cursor-pointer" title="Compartilhar">
                <LinkIcon size={15} weight="regular" />
              </button>
              <button className="flex items-center justify-center w-[20px] h-[20px] text-[#28415C] hover:text-[#07ABDE] transition-colors cursor-pointer" title="Salvar">
                <FloppyDisk size={15} weight="regular" />
              </button>
              <button className="flex items-center justify-center w-[20px] h-[20px] text-[#28415C] hover:text-[#07ABDE] transition-colors cursor-pointer" title="Calendário">
                <CalendarBlank size={15} weight="regular" />
              </button>
            </div>

            {/* Segmented Control */}
            <SegmentedControl value={viewMode} onChange={setViewMode} />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-[#DDE3EC] mt-[12px]" />

      {/* ═══ Body: Sidebar + Content ═══ */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* ── Sidebar ── */}
        <div className="w-[240px] shrink-0 flex flex-col border-r border-border min-h-0">
          {/* Filtros Rápidos button */}
          <div className="pl-[19px] pt-[18px] pb-[6px] shrink-0">
            <div
              className={`flex items-center gap-[10px] h-[36px] pl-[6px] pr-[22px] rounded-tr-full rounded-br-full cursor-pointer transition-all duration-150 ${
                activeFilter === "todos"
                  ? "bg-[#28415C] text-white"
                  : "text-muted-foreground hover:bg-muted"
              }`}
              style={activeFilter === "todos" ? { backdropFilter: "blur(50px)", boxShadow: "0px 2px 4px rgba(18,34,50,0.3)" } : undefined}
              onClick={() => handleFilterChange("todos")}
            >
              <span className="flex items-center justify-center size-[28px] shrink-0">
                <ListBullets size={18} weight="regular" />
              </span>
              <span style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.5, lineHeight: "22px" }}>
                Todos os Relatórios
              </span>
            </div>
          </div>

          {/* Search inline */}
          <div className="px-[19px] py-[8px] shrink-0">
            <div className="flex items-center gap-2 h-[32px] pl-[6px] pr-[3px] rounded-lg bg-muted">
              <MagnifyingGlass size={13} className="text-muted-foreground shrink-0" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar..."
                className="flex-1 bg-transparent border-none outline-none text-callout text-[#28415C] placeholder-[#98989D]"
              />
            </div>
          </div>

          {/* Category filter tabs */}
          <div className="flex flex-col gap-[2px] px-0 pl-[19px] py-[4px] shrink-0">
            {FILTER_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleFilterChange(cat.id)}
                className={`flex items-center gap-[10px] h-[36px] pl-[6px] pr-[22px] rounded-tr-full rounded-br-full transition-all duration-150 cursor-pointer text-left ${
                  activeFilter === cat.id
                    ? "bg-[#28415C] text-white"
                    : "text-muted-foreground hover:bg-muted"
                }`}
                style={activeFilter === cat.id
                  ? { fontSize: 13, fontWeight: 500, letterSpacing: -0.5, lineHeight: "22px", backdropFilter: "blur(50px)", boxShadow: "0px 2px 4px rgba(18,34,50,0.3)" }
                  : { fontSize: 13, fontWeight: 500, letterSpacing: -0.5, lineHeight: "22px" }
                }
              >
                <span className="flex items-center justify-center size-[28px] shrink-0">
                  {cat.id === "recentes" && <Clock size={18} weight="duotone" />}
                  {cat.id === "criados" && <User size={18} weight="duotone" />}
                  {cat.id === "privados" && <FileText size={18} weight="duotone" />}
                  {cat.id === "compartilhados" && <LinkIcon size={18} weight="duotone" />}
                </span>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="mx-[19px] h-[1px] bg-border my-[8px] shrink-0" />

          {/* Bottom nav */}
          <div className="flex flex-col pb-[16px] shrink-0">
            {SIDEBAR_NAV.map(nav => (
              <button
                key={nav.id}
                onClick={() => { if (nav.id === "favoritos") setActiveFilter("favoritos"); }}
                className={`flex items-center gap-[10px] h-[36px] pl-[19px] pr-[22px] rounded-tr-full rounded-br-full transition-all duration-150 cursor-pointer ${
                  activeFilter === "favoritos" && nav.id === "favoritos"
                    ? "bg-[#28415C] text-white"
                    : "text-muted-foreground hover:text-[#28415C] hover:bg-muted"
                }`}
                style={activeFilter === "favoritos" && nav.id === "favoritos"
                  ? { backdropFilter: "blur(50px)", boxShadow: "0px 2px 4px rgba(18,34,50,0.3)" }
                  : undefined
                }
              >
                <span className="flex items-center justify-center size-[28px] shrink-0">{nav.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.5, lineHeight: "22px" }}>
                  {nav.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Main Content ── */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {viewMode === "tabela" ? (
            /* ═══ TABLE VIEW ═══ */
            <div className="flex flex-col flex-1 min-h-0">
              {/* Shared horizontal + vertical scroll container */}
              <div className="flex-1 overflow-auto min-h-0">
                <div className="min-w-fit">
              {/* Table Header */}
              <div
                className="grid items-center px-[20px] h-[40px] shrink-0 border-b border-[#DDE3EC] bg-white sticky top-0 z-10"
                style={{ gridTemplateColumns: gridTemplate, gap: "0 8px" }}
              >
                {/* Select all checkbox */}
                <div className="flex items-center justify-center">
                  <ZCheckbox
                    checked={selectedIds.size > 0 && selectedIds.size === filteredReports.length}
                    onChange={toggleSelectAll}
                  />
                </div>

                {/* Header cells */}
                {COLUMNS.map((col, i) => (
                  <div key={col.key} className="flex items-center h-[32px] relative cursor-default group/hdr">
                    <span
                      className="text-[10px] font-bold uppercase tracking-[0.5px] text-[#28415C] whitespace-nowrap leading-[20px]"
                      style={ff}
                    >
                      {col.label}
                    </span>
                    {/* Resize handle + visual divider */}
                    {i < COLUMNS.length && (
                      <div
                        className="absolute right-[-5px] top-0 bottom-0 w-[10px] z-10 flex items-center justify-center cursor-col-resize group/resize"
                        onMouseDown={(e) => startResize(i, e)}
                      >
                        <div className="w-[1.5px] h-[20px] rounded-full bg-[#DDE3EC] transition-colors group-hover/resize:bg-[#0483AB] group-hover/resize:h-full" />
                      </div>
                    )}
                  </div>
                ))}

                {/* Actions column spacer */}
                <div />
              </div>

              {/* Table Body */}
              <div>
                <AnimatePresence mode="popLayout">
                  {filteredReports.map((report, idx) => (
                    <motion.div
                      key={report.id}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2, delay: idx * 0.02 }}
                      className={`grid items-center px-[20px] h-[44px] border-b border-[#DDE3EC]/60 transition-colors group/row cursor-pointer ${
                        selectedIds.has(report.id) ? "bg-[#F6F7F9]" : "hover:bg-[#FAFBFC]"
                      }`}
                      style={{ gridTemplateColumns: gridTemplate, gap: "0 8px" }}
                      onClick={() => toggleSelect(report.id)}
                    >
                      {/* Checkbox */}
                      <div className="flex items-center justify-center">
                        <ZCheckbox checked={selectedIds.has(report.id)} onChange={() => toggleSelect(report.id)} />
                      </div>

                      {/* Name */}
                      <div className="min-w-0 overflow-hidden">
                        <span
                          className="text-[#07ABDE] truncate block hover:underline cursor-pointer"
                          style={{ fontSize: 12, fontWeight: 500, lineHeight: "17px", letterSpacing: -0.5, ...ff }}
                          onClick={(e) => {
                            e.stopPropagation();
                            const filterPathMap: Record<string, string> = {
                              recentes: "recentes",
                              criados: "criados-por-mim",
                              privados: "privados",
                              compartilhados: "publicos",
                              todos: "todos",
                              favoritos: "recentes",
                            };
                            const segment = filterPathMap[activeFilter] || "recentes";
                            navigate(`/estudio/relatorios/${segment}/${report.id}`);
                          }}
                        >
                          {report.name}
                        </span>
                      </div>

                      {/* Folder */}
                      <div className="min-w-0 overflow-hidden">
                        <div className="flex items-center gap-[6px] pl-[10px]">
                          <FolderSimple size={14} weight="duotone" className="text-[#4E6987] shrink-0" />
                          <span className="text-[#28415C] truncate" style={{ fontSize: 12, fontWeight: 500, lineHeight: "17px", letterSpacing: -0.5, ...ff }}>
                            {report.folder}
                          </span>
                        </div>
                      </div>

                      {/* Category */}
                      <div className="min-w-0 overflow-hidden">
                        <div className="flex items-center gap-[8px] pl-[10px]">
                          {(() => {
                            const meta = TABLE_META[report.category];
                            if (meta) {
                              return (
                                <span
                                  className="inline-flex items-center gap-[4px] px-[8px] py-[1px] rounded-full truncate shrink-0"
                                  style={{
                                    fontSize: 10,
                                    fontWeight: 700,
                                    lineHeight: "17px",
                                    letterSpacing: 0.3,
                                    backgroundColor: meta.bg,
                                    color: meta.color,
                                    ...ff,
                                  }}
                                >
                                  <span
                                    className="shrink-0 flex items-center justify-center"
                                  >
                                    {TABLE_ICON[report.category]?.(meta.color) || (
                                      <span
                                        className="w-[5px] h-[5px] rounded-full"
                                        style={{ backgroundColor: meta.color }}
                                      />
                                    )}
                                  </span>
                                  {meta.label}
                                </span>
                              );
                            }
                            return (
                              <span className="text-[#28415C] truncate" style={{ fontSize: 12, fontWeight: 500, lineHeight: "17px", letterSpacing: -0.5, ...ff }}>
                                {report.category}
                              </span>
                            );
                          })()}
                        </div>
                      </div>

                      {/* Type */}
                      <div className="min-w-0 overflow-hidden">
                        <div className="flex items-center gap-[6px] pl-[10px]">
                          {TYPE_ICON_SMALL[report.type]}
                          <span className="text-[#28415C] truncate" style={{ fontSize: 12, fontWeight: 500, lineHeight: "17px", letterSpacing: -0.5, ...ff }}>
                            {TYPE_LABEL[report.type]}
                          </span>
                        </div>
                      </div>

                      {/* Author */}
                      <div className="min-w-0 overflow-hidden">
                        <div className="flex items-center gap-[8px] pl-[10px]">
                          <div className="w-[18px] h-[18px] rounded-full bg-gradient-to-br from-[#07ABDE] to-[#3CCEA7] flex items-center justify-center shrink-0">
                            <span className="text-white" style={{ fontSize: 8, fontWeight: 700 }}>
                              {report.author.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="text-[#07ABDE] truncate" style={{ fontSize: 12, fontWeight: 500, lineHeight: "17px", letterSpacing: -0.5, ...ff }}>
                            {report.author}
                          </span>
                        </div>
                      </div>

                      {/* Updated At */}
                      <div className="min-w-0 overflow-hidden">
                        <span className="text-[#28415C] truncate block pl-[10px]" style={{ fontSize: 12, fontWeight: 500, lineHeight: "17px", letterSpacing: -0.5, ...ff }}>
                          {report.updatedAt}
                        </span>
                      </div>

                      {/* Row actions */}
                      <div className="flex items-center justify-center relative">
                        <div className="flex items-center gap-1 opacity-0 group-hover/row:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleFav(report.id); }}
                            className="cursor-pointer"
                          >
                            <Star size={14} weight={report.favorite ? "fill" : "regular"} className={report.favorite ? "text-[#EAC23D]" : "text-[#C8CFDB] hover:text-[#EAC23D]"} />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); setMenuOpen(menuOpen === report.id ? null : report.id); }}
                            className="flex items-center justify-center w-[24px] h-[24px] rounded-[6px] text-[#C8CFDB] hover:bg-[#F6F7F9] hover:text-[#4E6987] transition-colors cursor-pointer"
                          >
                            <DotsThree size={16} weight="bold" />
                          </button>
                        </div>
                        <RowMenu open={menuOpen === report.id} onClose={() => setMenuOpen(null)} reportId={report.id} onDelete={deleteReport} />
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {filteredReports.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-16 text-[#C8CFDB]">
                    <Presentation size={48} weight="duotone" />
                    <p className="mt-3 text-[#98989d]" style={{ fontSize: 14, fontWeight: 500, ...ff }}>Nenhum relatório encontrado</p>
                  </div>
                )}
              </div>
                </div>
              </div>

              {/* Footer summary */}
              {filteredReports.length > 0 && (
                <div className="flex items-center justify-between px-[20px] h-[36px] shrink-0 border-t border-[#DDE3EC] bg-[#FAFBFC]">
                  <span className="text-[#98989D]" style={{ fontSize: 11, fontWeight: 500, letterSpacing: -0.3, ...ff }}>
                    {selectedIds.size > 0
                      ? `${selectedIds.size} de ${reportCount} selecionado${selectedIds.size !== 1 ? "s" : ""}`
                      : `${reportCount} relatório${reportCount !== 1 ? "s" : ""}`
                    }
                  </span>
                </div>
              )}
            </div>
          ) : (
            /* ═══ PASTA (FOLDER) VIEW ═══ */
            <div className="flex-1 overflow-y-auto p-[20px]">
              <AnimatePresence mode="popLayout">
                {Object.entries(groupedByCategory).map(([category, items], gIdx) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: gIdx * 0.05 }}
                    className="mb-[16px]"
                  >
                    {/* Folder header */}
                    <div className="flex items-center gap-[8px] mb-[8px]">
                      <FolderSimple size={18} weight="duotone" className="text-[#4E6987]" />
                      <span className="text-[#28415C]" style={{ fontSize: 14, fontWeight: 700, letterSpacing: -0.5, ...ff }}>
                        {category}
                      </span>
                      <span className="text-[#98989D] ml-1" style={{ fontSize: 11, fontWeight: 500, ...ff }}>
                        ({items.length})
                      </span>
                    </div>

                    {/* Folder cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[10px] pl-[26px]">
                      {items.map((report, idx) => (
                        <motion.div
                          key={report.id}
                          initial={{ opacity: 0, scale: 0.97 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2, delay: idx * 0.03 }}
                          className="flex items-center gap-3 p-[12px] rounded-[10px] border border-[#DDE3EC] hover:border-[#07ABDE]/30 bg-white transition-all cursor-pointer group/card"
                          style={{ boxShadow: "0px 1px 2px rgba(18,34,50,0.03)" }}
                        >
                          <div className="flex items-center justify-center w-[36px] h-[36px] rounded-[8px] bg-[#F6F7F9] shrink-0">
                            {TYPE_ICON_SMALL[report.type]}
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-[#28415C] truncate block" style={{ fontSize: 13, fontWeight: 600, letterSpacing: -0.3, ...ff }}>
                              {report.name}
                            </span>
                            <div className="flex items-center gap-2 mt-[2px]">
                              <span className="text-[#98989D]" style={{ fontSize: 10, fontWeight: 500, ...ff }}>{report.author}</span>
                              <span className="text-[#DDE3EC]">·</span>
                              <span className="text-[#98989D]" style={{ fontSize: 10, fontWeight: 500, ...ff }}>{report.updatedAt}</span>
                            </div>
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleFav(report.id); }}
                            className="opacity-0 group-hover/card:opacity-100 transition-opacity cursor-pointer"
                          >
                            <Star size={14} weight={report.favorite ? "fill" : "regular"} className={report.favorite ? "text-[#EAC23D]" : "text-[#C8CFDB] hover:text-[#EAC23D]"} />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredReports.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-[#C8CFDB]">
                  <FolderOpen size={48} weight="duotone" />
                  <p className="mt-3 text-[#98989d]" style={{ fontSize: 14, fontWeight: 500, ...ff }}>Nenhuma pasta com relatórios</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}