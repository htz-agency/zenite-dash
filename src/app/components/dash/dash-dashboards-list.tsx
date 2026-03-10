/* ================================================================== */
/*  Zenite Dash — Todos Dashboards (redesign baseado no Relatórios)  */
/*  Layout: Sidebar Filtros | Tabela de Dashboards                    */
/* ================================================================== */

import { useState, useMemo, useRef, useEffect, useCallback, type ReactNode, type MouseEvent as ReactMouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FolderSimple, Heart, GearSix, ChartBar, Layout,
  User, Clock, Table, FolderOpen, Link as LinkIcon, FloppyDisk,
  CalendarBlank, Check, Plus, MagnifyingGlass, Presentation,
  Star, DotsThree, Pencil, Trash, Copy, Export, Eye,
  ListBullets, Globe, LockKey, FileText, Spinner,
} from "@phosphor-icons/react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { projectId, publicAnonKey } from "/utils/supabase/info";

const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };
const API = `https://${projectId}.supabase.co/functions/v1/make-server-d2ca3281`;

/* ── Types ── */

interface Dashboard {
  id: string;
  name: string;
  description: string;
  isPublic: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
  _source: "dashboard" | "panel";
  _itemCount?: number;
  favorite: boolean;
  folder: string;
}

/* ── Sidebar filter categories ── */

const FILTER_CATEGORIES = [
  { id: "recentes", label: "Recentes", icon: <Clock size={18} weight="duotone" /> },
  { id: "criados", label: "Criados por mim", icon: <User size={18} weight="duotone" /> },
  { id: "privados", label: "Dashboards privados", icon: <LockKey size={18} weight="duotone" /> },
  { id: "compartilhados", label: "Dashboards Públicos", icon: <Globe size={18} weight="duotone" /> },
];

const SIDEBAR_NAV = [
  { id: "pastas", label: "Pastas", icon: <FolderSimple size={19} weight="duotone" /> },
  { id: "favoritos", label: "Favoritos", icon: <Heart size={19} weight="duotone" /> },
  { id: "config", label: "Configurações", icon: <GearSix size={19} weight="duotone" /> },
];

/* ── Column definitions ── */

const COLUMNS = [
  { key: "name", label: "Nome do Dashboard", icon: <FileText size={15} weight="duotone" />, defaultWidth: 200 },
  { key: "folder", label: "Pasta", icon: <FolderSimple size={15} weight="duotone" />, defaultWidth: 130 },
  { key: "type", label: "Tipo", icon: <Layout size={15} weight="duotone" />, defaultWidth: 130 },
  { key: "visibility", label: "Visibilidade", icon: <Globe size={15} weight="duotone" />, defaultWidth: 130 },
  { key: "author", label: "Criado por", icon: <User size={15} weight="duotone" />, defaultWidth: 170 },
  { key: "updatedAt", label: "Atualizado em", icon: <Clock size={15} weight="duotone" />, defaultWidth: 145 },
];

const COL_MIN_WIDTH = 80;

/* ── Type badge config ── */
const SOURCE_META: Record<string, { label: string; icon: ReactNode; color: string; bg: string }> = {
  panel: {
    label: "Dash",
    icon: <Layout size={11} weight="duotone" />,
    color: "#135543",
    bg: "#D9F8EF",
  },
  dashboard: {
    label: "Dashboard",
    icon: <ChartBar size={11} weight="duotone" />,
    color: "#0483AB",
    bg: "#DCF0FF",
  },
};

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

function RowMenu({ open, onClose, dashboard, onDelete, onView, onEdit }: {
  open: boolean; onClose: () => void; dashboard: Dashboard;
  onDelete: (d: Dashboard) => void; onView: (d: Dashboard) => void; onEdit: (d: Dashboard) => void;
}) {
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
                if (action.action === "delete") onDelete(dashboard);
                else if (action.action === "open") onView(dashboard);
                else if (action.action === "edit") onEdit(dashboard);
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

export function DashDashboardsList() {
  const location = useLocation();
  const navigate = useNavigate();
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("recentes");
  const [viewMode, setViewMode] = useState<"tabela" | "pasta">("tabela");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  /* ── Column resize logic ── */
  const defaultWidthsKey = COLUMNS.map(c => c.defaultWidth).join(",");
  const [colWidths, setColWidths] = useState<number[]>(() => COLUMNS.map(c => c.defaultWidth));
  useEffect(() => { setColWidths(COLUMNS.map(c => c.defaultWidth)); }, [defaultWidthsKey]);
  const resizeRef = useRef<{ idx: number; startX: number; startW: number } | null>(null);

  const startResize = useCallback((idx: number, e: ReactMouseEvent) => {
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

  /* ── Fetch dashboards + panels from the API ── */
  const fetchAll = async () => {
    setLoading(true);
    try {
      const apiFilter = getApiFilter(activeFilter);
      const [dashRes, panelRes] = await Promise.allSettled([
        fetch(`${API}/dash/visual-builder/list?filter=${apiFilter}&userId=default`, {
          headers: { Authorization: `Bearer ${publicAnonKey}` },
        }),
        fetch(`${API}/dash/panels/list?filter=${apiFilter}&userId=default`, {
          headers: { Authorization: `Bearer ${publicAnonKey}` },
        }),
      ]);

      let allItems: Dashboard[] = [];

      // Old dashboards
      if (dashRes.status === "fulfilled" && dashRes.value.ok) {
        const data = await dashRes.value.json();
        const items = (data.dashboards || []).map((d: any) => ({
          id: d.id,
          name: d.name || "Sem título",
          description: d.description || "",
          isPublic: d.isPublic || false,
          userId: d.userId || "default",
          createdAt: d.createdAt,
          updatedAt: d.updatedAt,
          _source: "dashboard" as const,
          _itemCount: undefined,
          favorite: false,
          folder: d.folder || "Sem pasta",
        }));
        allItems = [...allItems, ...items];
      }

      // New panels
      if (panelRes.status === "fulfilled" && panelRes.value.ok) {
        const data = await panelRes.value.json();
        const items = (data.panels || []).map((p: any) => ({
          id: p.id,
          name: p.name || "Sem título",
          description: p.description || "",
          isPublic: p.isPublic || false,
          userId: p.userId || "default",
          createdAt: p.createdAt,
          updatedAt: p.updatedAt,
          _source: "panel" as const,
          _itemCount: (p.items || []).length,
          favorite: false,
          folder: p.folder || "Sem pasta",
        }));
        allItems = [...allItems, ...items];
      }

      // Sort by updatedAt descending
      allItems.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      setDashboards(allItems);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      console.error("Error fetching dashboards:", err);
      toast.error("Erro ao carregar dashboards");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, [activeFilter]);

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
    const pathMap: Record<string, string> = {
      recentes: "/estudio/dashboards/recentes",
      criados: "/estudio/dashboards/criados-por-mim",
      privados: "/estudio/dashboards/privados",
      compartilhados: "/estudio/dashboards/publicos",
      todos: "/estudio/dashboards/todos",
    };
    if (pathMap[filterId]) navigate(pathMap[filterId]);
  };

  const toggleFav = (id: string) => setDashboards(ds => ds.map(d => d.id === id ? { ...d, favorite: !d.favorite } : d));

  /* ── Delete dashboard/panel via API ── */
  const deleteDashboard = async (dash: Dashboard) => {
    if (!confirm(`Deseja realmente excluir "${dash.name}"?`)) return;
    try {
      const endpoint = dash._source === "panel"
        ? `${API}/dash/panels/delete/${dash.id}`
        : `${API}/dash/visual-builder/delete/${dash.id}`;
      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${publicAnonKey}` },
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      toast.success(`"${dash.name}" excluído com sucesso`);
      setDashboards(ds => ds.filter(d => !(d.id === dash.id && d._source === dash._source)));
      setSelectedIds(prev => { const next = new Set(prev); next.delete(dash.id); return next; });
    } catch (err) {
      console.error("Error deleting:", err);
      toast.error("Erro ao excluir");
    }
  };

  const viewDashboard = (dash: Dashboard) => {
    if (dash._source === "panel") navigate(`/estudio/painel?id=${dash.id}&mode=view`);
    else navigate(`/estudio/visual?load=${dash.id}&mode=view`);
  };

  const editDashboard = (dash: Dashboard) => {
    if (dash._source === "panel") navigate(`/estudio/painel?id=${dash.id}`);
    else navigate(`/estudio/visual?load=${dash.id}`);
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const filteredDashboards = dashboards
    .filter(d => {
      if (activeFilter === "favoritos") return d.favorite;
      return true;
    })
    .filter(d => !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.description.toLowerCase().includes(search.toLowerCase()));

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredDashboards.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredDashboards.map(d => d.id)));
    }
  };

  const dashCount = filteredDashboards.length;

  /* ── Folder grouping for "Pasta" view ── */
  const groupedByFolder = useMemo(() => {
    const groups: Record<string, Dashboard[]> = {};
    filteredDashboards.forEach(d => {
      const key = d.folder || "Sem pasta";
      if (!groups[key]) groups[key] = [];
      groups[key].push(d);
    });
    return groups;
  }, [filteredDashboards]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-[#98989d]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#0483AB] border-t-transparent rounded-full animate-spin" />
          <span style={{ fontSize: 13, fontWeight: 500, ...ff }}>Carregando dashboards...</span>
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
              Todos Dashboards
            </h1>
            <p className="text-[#98989D] mt-[2px]" style={{ fontSize: 8, fontWeight: 700, lineHeight: "20px", letterSpacing: 0.5, textTransform: "uppercase", ...ff }}>
              VISUALIZANDO AGORA: {dashCount} DASHBOARD{dashCount !== 1 ? "S" : ""}
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

            {/* New buttons */}
            <button
              onClick={() => navigate("/estudio/painel")}
              className="group/pill relative flex items-center gap-[3px] h-[36px] pl-[14px] pr-[16px] rounded-[100px] bg-[#D9F8EF] text-[#135543] hover:bg-[#c2f0e3] hover:shadow-[0px_2px_4px_0px_rgba(18,34,50,0.3)] transition-all duration-150 cursor-pointer"
            >
              <Plus size={14} weight="bold" />
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: -0.3, lineHeight: "22px", ...ff }}>
                Novo Dash
              </span>
            </button>
            <a
              href="/estudio/visual"
              className="group/pill relative flex items-center gap-[3px] h-[36px] pl-[14px] pr-[16px] rounded-[100px] bg-[#dcf0ff] text-[#28415c] hover:bg-[#bcdaf1] hover:shadow-[0px_2px_4px_0px_rgba(18,34,50,0.3)] transition-all duration-150 cursor-pointer"
            >
              <Plus size={14} weight="bold" />
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: -0.3, lineHeight: "22px", ...ff }}>
                Novo Dashboard
              </span>
            </a>

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
          {/* Todos button */}
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
                Todos os Dashboards
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
                  {cat.icon}
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
                    checked={selectedIds.size > 0 && selectedIds.size === filteredDashboards.length}
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
                  {filteredDashboards.map((dash, idx) => {
                    const sourceMeta = SOURCE_META[dash._source];
                    return (
                    <motion.div
                      key={`${dash._source}-${dash.id}`}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2, delay: idx * 0.02 }}
                      className={`grid items-center px-[20px] h-[44px] border-b border-[#DDE3EC]/60 transition-colors group/row cursor-pointer ${
                        selectedIds.has(dash.id) ? "bg-[#F6F7F9]" : "hover:bg-[#FAFBFC]"
                      }`}
                      style={{ gridTemplateColumns: gridTemplate, gap: "0 8px" }}
                      onClick={() => toggleSelect(dash.id)}
                    >
                      {/* Checkbox */}
                      <div className="flex items-center justify-center">
                        <ZCheckbox checked={selectedIds.has(dash.id)} onChange={() => toggleSelect(dash.id)} />
                      </div>

                      {/* Name */}
                      <div className="min-w-0 overflow-hidden">
                        <span
                          className="text-[#07ABDE] truncate block hover:underline cursor-pointer"
                          style={{ fontSize: 12, fontWeight: 500, lineHeight: "17px", letterSpacing: -0.5, ...ff }}
                          onClick={(e) => {
                            e.stopPropagation();
                            viewDashboard(dash);
                          }}
                        >
                          {dash.name}
                        </span>
                      </div>

                      {/* Folder */}
                      <div className="min-w-0 overflow-hidden">
                        <div className="flex items-center gap-[6px] pl-[10px]">
                          <FolderSimple size={14} weight="duotone" className="text-[#4E6987] shrink-0" />
                          <span className="text-[#28415C] truncate" style={{ fontSize: 12, fontWeight: 500, lineHeight: "17px", letterSpacing: -0.5, ...ff }}>
                            {dash.folder}
                          </span>
                        </div>
                      </div>

                      {/* Type */}
                      <div className="min-w-0 overflow-hidden">
                        <div className="flex items-center gap-[8px] pl-[10px]">
                          {sourceMeta && (
                            <span
                              className="inline-flex items-center gap-[4px] px-[8px] py-[1px] rounded-full truncate shrink-0"
                              style={{
                                fontSize: 10,
                                fontWeight: 700,
                                lineHeight: "17px",
                                letterSpacing: 0.3,
                                backgroundColor: sourceMeta.bg,
                                color: sourceMeta.color,
                                ...ff,
                              }}
                            >
                              <span className="shrink-0 flex items-center justify-center" style={{ color: sourceMeta.color }}>
                                {sourceMeta.icon}
                              </span>
                              {sourceMeta.label}
                              {dash._source === "panel" && dash._itemCount !== undefined && (
                                <span style={{ opacity: 0.7 }}>· {dash._itemCount}</span>
                              )}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Visibility */}
                      <div className="min-w-0 overflow-hidden">
                        <div className="flex items-center gap-[6px] pl-[10px]">
                          {dash.isPublic ? (
                            <>
                              <Globe size={13} weight="duotone" className="text-[#0483AB] shrink-0" />
                              <span className="text-[#0483AB]" style={{ fontSize: 12, fontWeight: 500, lineHeight: "17px", letterSpacing: -0.5, ...ff }}>
                                Público
                              </span>
                            </>
                          ) : (
                            <>
                              <LockKey size={13} weight="duotone" className="text-[#98989d] shrink-0" />
                              <span className="text-[#98989d]" style={{ fontSize: 12, fontWeight: 500, lineHeight: "17px", letterSpacing: -0.5, ...ff }}>
                                Privado
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Author */}
                      <div className="min-w-0 overflow-hidden">
                        <div className="flex items-center gap-[8px] pl-[10px]">
                          <div className="w-[18px] h-[18px] rounded-full bg-gradient-to-br from-[#07ABDE] to-[#3CCEA7] flex items-center justify-center shrink-0">
                            <span className="text-white" style={{ fontSize: 8, fontWeight: 700 }}>
                              {(dash.userId === "default" ? "V" : dash.userId.charAt(0)).toUpperCase()}
                            </span>
                          </div>
                          <span className="text-[#07ABDE] truncate" style={{ fontSize: 12, fontWeight: 500, lineHeight: "17px", letterSpacing: -0.5, ...ff }}>
                            {dash.userId === "default" ? "Você" : dash.userId}
                          </span>
                        </div>
                      </div>

                      {/* Updated At */}
                      <div className="min-w-0 overflow-hidden">
                        <span className="text-[#28415C] truncate block pl-[10px]" style={{ fontSize: 12, fontWeight: 500, lineHeight: "17px", letterSpacing: -0.5, ...ff }}>
                          {new Date(dash.updatedAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}
                        </span>
                      </div>

                      {/* Row actions */}
                      <div className="flex items-center justify-center relative">
                        <div className="flex items-center gap-1 opacity-0 group-hover/row:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleFav(dash.id); }}
                            className="cursor-pointer"
                          >
                            <Star size={14} weight={dash.favorite ? "fill" : "regular"} className={dash.favorite ? "text-[#EAC23D]" : "text-[#C8CFDB] hover:text-[#EAC23D]"} />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); setMenuOpen(menuOpen === dash.id ? null : dash.id); }}
                            className="flex items-center justify-center w-[24px] h-[24px] rounded-[6px] text-[#C8CFDB] hover:bg-[#F6F7F9] hover:text-[#4E6987] transition-colors cursor-pointer"
                          >
                            <DotsThree size={16} weight="bold" />
                          </button>
                        </div>
                        <RowMenu
                          open={menuOpen === dash.id}
                          onClose={() => setMenuOpen(null)}
                          dashboard={dash}
                          onDelete={deleteDashboard}
                          onView={viewDashboard}
                          onEdit={editDashboard}
                        />
                      </div>
                    </motion.div>
                    );
                  })}
                </AnimatePresence>

                {filteredDashboards.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-16 text-[#C8CFDB]">
                    <ChartBar size={48} weight="duotone" />
                    <p className="mt-3 text-[#98989d]" style={{ fontSize: 14, fontWeight: 500, ...ff }}>Nenhum dashboard encontrado</p>
                  </div>
                )}
              </div>
                </div>
              </div>

              {/* Footer summary */}
              {filteredDashboards.length > 0 && (
                <div className="flex items-center justify-between px-[20px] h-[36px] shrink-0 border-t border-[#DDE3EC] bg-[#FAFBFC]">
                  <span className="text-[#98989D]" style={{ fontSize: 11, fontWeight: 500, letterSpacing: -0.3, ...ff }}>
                    {selectedIds.size > 0
                      ? `${selectedIds.size} de ${dashCount} selecionado${selectedIds.size !== 1 ? "s" : ""}`
                      : `${dashCount} dashboard${dashCount !== 1 ? "s" : ""}`
                    }
                  </span>
                </div>
              )}
            </div>
          ) : (
            /* ═══ PASTA (FOLDER) VIEW ═══ */
            <div className="flex-1 overflow-y-auto p-[20px]">
              <AnimatePresence mode="popLayout">
                {Object.entries(groupedByFolder).map(([folder, items], gIdx) => (
                  <motion.div
                    key={folder}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: gIdx * 0.05 }}
                    className="mb-[16px]"
                  >
                    {/* Folder header */}
                    <div className="flex items-center gap-[8px] mb-[8px]">
                      <FolderSimple size={18} weight="duotone" className="text-[#4E6987]" />
                      <span className="text-[#28415C]" style={{ fontSize: 14, fontWeight: 700, letterSpacing: -0.5, ...ff }}>
                        {folder}
                      </span>
                      <span className="text-[#98989D] ml-1" style={{ fontSize: 11, fontWeight: 500, ...ff }}>
                        ({items.length})
                      </span>
                    </div>

                    {/* Folder cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[10px] pl-[26px]">
                      {items.map((dash, idx) => {
                        const sourceMeta = SOURCE_META[dash._source];
                        return (
                        <motion.div
                          key={`${dash._source}-${dash.id}`}
                          initial={{ opacity: 0, scale: 0.97 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2, delay: idx * 0.03 }}
                          className="flex items-center gap-3 p-[12px] rounded-[10px] border border-[#DDE3EC] hover:border-[#07ABDE]/30 bg-white transition-all cursor-pointer group/card"
                          style={{ boxShadow: "0px 1px 2px rgba(18,34,50,0.03)" }}
                          onClick={() => viewDashboard(dash)}
                        >
                          <div
                            className="flex items-center justify-center w-[36px] h-[36px] rounded-[8px] shrink-0"
                            style={{ backgroundColor: sourceMeta?.bg || "#F6F7F9" }}
                          >
                            {dash._source === "panel"
                              ? <Layout size={18} weight="duotone" style={{ color: sourceMeta?.color }} />
                              : <ChartBar size={18} weight="duotone" style={{ color: sourceMeta?.color }} />
                            }
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-[#28415C] truncate block" style={{ fontSize: 13, fontWeight: 600, letterSpacing: -0.3, ...ff }}>
                              {dash.name}
                            </span>
                            <div className="flex items-center gap-2 mt-[2px]">
                              {sourceMeta && (
                                <span
                                  className="inline-flex items-center gap-[3px] px-[6px] rounded-full"
                                  style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.3, backgroundColor: sourceMeta.bg, color: sourceMeta.color, ...ff }}
                                >
                                  {sourceMeta.label}
                                </span>
                              )}
                              <span className="text-[#DDE3EC]">·</span>
                              <span className="text-[#98989D]" style={{ fontSize: 10, fontWeight: 500, ...ff }}>
                                {new Date(dash.updatedAt).toLocaleDateString("pt-BR")}
                              </span>
                              {dash.isPublic && (
                                <>
                                  <span className="text-[#DDE3EC]">·</span>
                                  <Globe size={10} weight="fill" className="text-[#0483AB]" />
                                </>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleFav(dash.id); }}
                            className="opacity-0 group-hover/card:opacity-100 transition-opacity cursor-pointer"
                          >
                            <Star size={14} weight={dash.favorite ? "fill" : "regular"} className={dash.favorite ? "text-[#EAC23D]" : "text-[#C8CFDB] hover:text-[#EAC23D]"} />
                          </button>
                        </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredDashboards.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-[#C8CFDB]">
                  <FolderOpen size={48} weight="duotone" />
                  <p className="mt-3 text-[#98989d]" style={{ fontSize: 14, fontWeight: 500, ...ff }}>Nenhuma pasta com dashboards</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}