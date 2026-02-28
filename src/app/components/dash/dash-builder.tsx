/* ================================================================== */
/*  Zenite Dash — Dashboard Builder                                    */
/*  Customizable drag-and-drop grid with widget system                 */
/* ================================================================== */

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { ResponsiveGridLayout, useContainerWidth, getCompactor } from "react-grid-layout";
import { motion, AnimatePresence } from "motion/react";
import {
  DotsSixVertical, Plus, Trash, PencilSimple, Eye, FloppyDisk,
  ChartBar, ChartLineUp, FunnelSimple, Target, Lightning,
  Table, Gauge as GaugeIcon, GridNine, X, Check, Export, FilePdf,
  ArrowsOutCardinal, MagnifyingGlass, ArrowCounterClockwise, CloudCheck,
} from "@phosphor-icons/react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar,
} from "recharts";
import { useDashData, formatCurrency, formatNumber } from "./dash-data-provider";
import { useDashFilters } from "./dash-filter-context";
import { DashGauge } from "./dash-gauge";
import { DashDataTable } from "./dash-data-table";
import { DrillDownPanel, DrillRow } from "./dash-drill-down";
import { exportToPDF } from "./dash-export-utils";
import { type ColumnDef } from "@tanstack/react-table";
import { projectId, publicAnonKey } from "/utils/supabase/info";
import { toast } from "sonner";

type Layout = { i: string; x: number; y: number; w: number; h: number; minW?: number; minH?: number };
const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };
const COLORS = ["#0483AB", "#3CCEA7", "#917822", "#ED5200", "#6868B1", "#07ABDE", "#EAC23D"];

/* ── Widget Types ── */
type WidgetType =
  | "kpi-pipeline" | "kpi-receita" | "kpi-leads" | "kpi-winrate"
  | "chart-revenue" | "chart-pipeline-donut" | "chart-leads-source"
  | "chart-activities-bar" | "chart-funnel"
  | "gauge-meta-mensal" | "gauge-meta-leads" | "gauge-meta-pipeline"
  | "table-leads" | "table-opps" | "table-activities"
  | "heatmap-activities";

interface Widget {
  id: string;
  type: WidgetType;
  title: string;
}

interface WidgetCatalogItem {
  type: WidgetType;
  label: string;
  icon: React.ReactNode;
  category: string;
  defaultW: number;
  defaultH: number;
  minW?: number;
  minH?: number;
}

const WIDGET_CATALOG: WidgetCatalogItem[] = [
  // KPIs
  { type: "kpi-pipeline", label: "Pipeline Total", icon: <ChartBar size={16} weight="duotone" />, category: "KPIs", defaultW: 3, defaultH: 2, minW: 2, minH: 2 },
  { type: "kpi-receita", label: "Receita Fechada", icon: <ChartLineUp size={16} weight="duotone" />, category: "KPIs", defaultW: 3, defaultH: 2, minW: 2, minH: 2 },
  { type: "kpi-leads", label: "Leads Ativos", icon: <Target size={16} weight="duotone" />, category: "KPIs", defaultW: 3, defaultH: 2, minW: 2, minH: 2 },
  { type: "kpi-winrate", label: "Win Rate", icon: <FunnelSimple size={16} weight="duotone" />, category: "KPIs", defaultW: 3, defaultH: 2, minW: 2, minH: 2 },
  // Charts
  { type: "chart-revenue", label: "Receita Mensal", icon: <ChartLineUp size={16} weight="duotone" />, category: "Gráficos", defaultW: 8, defaultH: 5, minW: 4, minH: 3 },
  { type: "chart-pipeline-donut", label: "Pipeline (Donut)", icon: <ChartBar size={16} weight="duotone" />, category: "Gráficos", defaultW: 4, defaultH: 5, minW: 3, minH: 3 },
  { type: "chart-leads-source", label: "Leads por Origem", icon: <ChartBar size={16} weight="duotone" />, category: "Gráficos", defaultW: 6, defaultH: 5, minW: 3, minH: 3 },
  { type: "chart-activities-bar", label: "Atividades (Barra)", icon: <Lightning size={16} weight="duotone" />, category: "Gráficos", defaultW: 6, defaultH: 5, minW: 3, minH: 3 },
  { type: "chart-funnel", label: "Funil de Conversão", icon: <FunnelSimple size={16} weight="duotone" />, category: "Gráficos", defaultW: 6, defaultH: 5, minW: 3, minH: 3 },
  // Gauges
  { type: "gauge-meta-mensal", label: "Meta Mensal", icon: <GaugeIcon size={16} weight="duotone" />, category: "Metas", defaultW: 4, defaultH: 4, minW: 3, minH: 3 },
  { type: "gauge-meta-leads", label: "Meta de Leads", icon: <GaugeIcon size={16} weight="duotone" />, category: "Metas", defaultW: 4, defaultH: 4, minW: 3, minH: 3 },
  { type: "gauge-meta-pipeline", label: "Meta Pipeline", icon: <GaugeIcon size={16} weight="duotone" />, category: "Metas", defaultW: 4, defaultH: 4, minW: 3, minH: 3 },
  // Tables
  { type: "table-leads", label: "Tabela de Leads", icon: <Table size={16} weight="duotone" />, category: "Tabelas", defaultW: 12, defaultH: 6, minW: 6, minH: 4 },
  { type: "table-opps", label: "Tabela de Opps", icon: <Table size={16} weight="duotone" />, category: "Tabelas", defaultW: 12, defaultH: 6, minW: 6, minH: 4 },
  { type: "table-activities", label: "Tabela de Atividades", icon: <Table size={16} weight="duotone" />, category: "Tabelas", defaultW: 12, defaultH: 6, minW: 6, minH: 4 },
  // Heatmap
  { type: "heatmap-activities", label: "Heatmap Atividades", icon: <GridNine size={16} weight="duotone" />, category: "Especiais", defaultW: 6, defaultH: 5, minW: 4, minH: 4 },
];

/* ── Default Layout ── */
const DEFAULT_WIDGETS: Widget[] = [
  { id: "w1", type: "kpi-pipeline", title: "Pipeline Total" },
  { id: "w2", type: "kpi-receita", title: "Receita Fechada" },
  { id: "w3", type: "kpi-leads", title: "Leads Ativos" },
  { id: "w4", type: "kpi-winrate", title: "Win Rate" },
  { id: "w5", type: "chart-revenue", title: "Receita Mensal" },
  { id: "w6", type: "chart-pipeline-donut", title: "Pipeline por Estágio" },
  { id: "w7", type: "gauge-meta-mensal", title: "Meta Mensal" },
  { id: "w8", type: "chart-leads-source", title: "Leads por Origem" },
  { id: "w9", type: "chart-funnel", title: "Funil de Conversão" },
  { id: "w10", type: "heatmap-activities", title: "Heatmap Semanal" },
  { id: "w11", type: "table-opps", title: "Oportunidades" },
];

const DEFAULT_LAYOUTS: Record<string, Layout[]> = {
  lg: [
    { i: "w1", x: 0, y: 0, w: 3, h: 2 }, { i: "w2", x: 3, y: 0, w: 3, h: 2 },
    { i: "w3", x: 6, y: 0, w: 3, h: 2 }, { i: "w4", x: 9, y: 0, w: 3, h: 2 },
    { i: "w5", x: 0, y: 2, w: 8, h: 5 }, { i: "w6", x: 8, y: 2, w: 4, h: 5 },
    { i: "w7", x: 0, y: 7, w: 4, h: 4 }, { i: "w8", x: 4, y: 7, w: 4, h: 4 },
    { i: "w9", x: 8, y: 7, w: 4, h: 4 },
    { i: "w10", x: 0, y: 11, w: 6, h: 5 }, { i: "w11", x: 6, y: 11, w: 6, h: 6 },
  ],
};

/* ── Custom Tooltip ── */
const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-[10px] px-3 py-2 border border-[#DDE3EC]" style={{ boxShadow: "0px 8px 24px rgba(18,34,50,0.12)", ...ff }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: "#122232", letterSpacing: -0.3 }}>{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ fontSize: 11, fontWeight: 500, color: p.color, letterSpacing: -0.3 }}>
          {p.name}: {typeof p.value === "number" && p.value > 1000 ? formatCurrency(p.value) : p.value}
        </p>
      ))}
    </div>
  );
};

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-d2ca3281`;

/* ── Main Component ── */
export function DashBuilder() {
  const { leads, opportunities, activities, accounts, monthlyRevenue, pipelineByStage, leadsBySource, activityByType, weeklyActivities, conversionFunnel, loading } = useDashData();
  const { matchesFilters, setCrossFilter, crossFilter, clearCrossFilter, pushDrill } = useDashFilters();

  const { width: containerWidth, containerRef } = useContainerWidth({ initialWidth: 1200 });

  const [widgets, setWidgets] = useState<Widget[]>(DEFAULT_WIDGETS);
  const [layouts, setLayouts] = useState(DEFAULT_LAYOUTS);
  const [editing, setEditing] = useState(false);
  const [showCatalog, setShowCatalog] = useState(false);
  const [catalogFilter, setCatalogFilter] = useState("");
  const [saving, setSaving] = useState(false);
  const [layoutLoaded, setLayoutLoaded] = useState(false);
  const [drillOpen, setDrillOpen] = useState(false);
  const [drillTitle, setDrillTitle] = useState("");
  const [drillData, setDrillData] = useState<any[]>([]);
  const [drillDimension, setDrillDimension] = useState("");
  const dashRef = useRef<HTMLDivElement>(null);

  // ── Load saved layout from server ──
  useEffect(() => {
    async function loadLayout() {
      try {
        const res = await fetch(`${API_BASE}/dash/builder/layout?userId=default`, {
          headers: { Authorization: `Bearer ${publicAnonKey}` },
        });
        const result = await res.json();
        if (result.layout?.widgets && result.layout?.layouts) {
          setWidgets(result.layout.widgets);
          setLayouts(result.layout.layouts);
          console.log("[Builder] Layout loaded from KV store", result.layout.savedAt);
        }
      } catch (err) {
        console.log("[Builder] No saved layout found, using defaults:", err);
      } finally {
        setLayoutLoaded(true);
      }
    }
    loadLayout();
  }, []);

  // ── Save layout to server ──
  const saveLayout = useCallback(async (w: Widget[], l: Record<string, Layout[]>) => {
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/dash/builder/layout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ userId: "default", widgets: w, layouts: l }),
      });
      const result = await res.json();
      if (result.success) {
        toast.success("Layout salvo no servidor!", { icon: <CloudCheck size={16} weight="fill" /> });
      } else {
        throw new Error(result.error || "Unknown error");
      }
    } catch (err) {
      console.error("[Builder] Error saving layout:", err);
      toast.error("Erro ao salvar layout");
    } finally {
      setSaving(false);
    }
  }, []);

  // ── Reset layout ──
  const resetLayout = useCallback(async () => {
    setWidgets(DEFAULT_WIDGETS);
    setLayouts(DEFAULT_LAYOUTS);
    try {
      await fetch(`${API_BASE}/dash/builder/layout?userId=default`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${publicAnonKey}` },
      });
      toast.success("Layout restaurado ao padrão");
    } catch (err) {
      console.error("[Builder] Error resetting layout:", err);
    }
  }, []);

  // ── Drill-down handler ──
  const openDrill = useCallback((title: string, dimension: string, data: any[]) => {
    setDrillTitle(title);
    setDrillDimension(dimension);
    setDrillData(data);
    setDrillOpen(true);
    pushDrill({ label: title, dimension, value: title });
  }, [pushDrill]);

  // Filtered data
  const filteredLeads = useMemo(() => leads.filter(l => matchesFilters(l as any)), [leads, matchesFilters]);
  const filteredOpps = useMemo(() => opportunities.filter(o => matchesFilters({ owner: o.owner, stage: o.stage, createdAt: o.createdAt })), [opportunities, matchesFilters]);
  const filteredActivities = useMemo(() => activities.filter(a => matchesFilters({ owner: a.owner, createdAt: a.date })), [activities, matchesFilters]);

  // Computed values
  const isWon = (s: string) => { const low = s.toLowerCase(); return low.includes("ganho") || low.includes("ganha"); };
  const isClosed = (s: string) => { const low = s.toLowerCase(); return low.includes("fechad") || low.includes("perdid") || low.includes("ganho") || low.includes("ganha"); };
  const totalPipeline = filteredOpps.filter(o => !isClosed(o.stage)).reduce((s, o) => s + o.value, 0);
  const wonValue = filteredOpps.filter(o => isWon(o.stage)).reduce((s, o) => s + o.value, 0);
  const activeLeads = filteredLeads.filter(l => !isClosed(l.stage)).length;
  const winRate = filteredOpps.length > 0 ? Math.round(filteredOpps.filter(o => isWon(o.stage)).length / filteredOpps.length * 100) : 0;

  /* ── Layout change handler ── */
  const onLayoutChange = useCallback((_: Layout[], allLayouts: Record<string, Layout[]>) => {
    setLayouts(allLayouts);
  }, []);

  /* ── Add widget ── */
  const addWidget = useCallback((type: WidgetType) => {
    const cat = WIDGET_CATALOG.find(c => c.type === type);
    if (!cat) return;
    const id = `w${Date.now()}`;
    setWidgets(ws => [...ws, { id, type, title: cat.label }]);
    setLayouts(prev => {
      const lgLayouts = prev.lg || [];
      const maxY = lgLayouts.reduce((m, l) => Math.max(m, l.y + l.h), 0);
      return { ...prev, lg: [...lgLayouts, { i: id, x: 0, y: maxY, w: cat.defaultW, h: cat.defaultH, minW: cat.minW, minH: cat.minH }] };
    });
    setShowCatalog(false);
    toast.success(`Widget "${cat.label}" adicionado`);
  }, []);

  /* ── Remove widget ── */
  const removeWidget = useCallback((id: string) => {
    setWidgets(ws => ws.filter(w => w.id !== id));
    setLayouts(prev => {
      const updated: Record<string, Layout[]> = {};
      for (const [bp, ls] of Object.entries(prev)) {
        updated[bp] = ls.filter(l => l.i !== id);
      }
      return updated;
    });
  }, []);

  /* ── Export PDF ── */
  const handleExportPDF = async () => {
    if (!dashRef.current) return;
    toast.loading("Gerando PDF...", { id: "pdf" });
    try {
      await exportToPDF(dashRef.current, "zenite-dash-builder", "Dashboard Personalizado");
      toast.success("PDF exportado com sucesso!", { id: "pdf" });
    } catch (e) {
      toast.error("Erro ao exportar PDF", { id: "pdf" });
    }
  };

  /* ── Lead columns for TanStack ── */
  const leadColumns: ColumnDef<any, any>[] = [
    { accessorKey: "name", header: "Nome", cell: (info: any) => <span className="text-[#07ABDE]">{info.getValue()}</span> },
    { accessorKey: "company", header: "Empresa" },
    { accessorKey: "stage", header: "Estágio", cell: (info: any) => <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ backgroundColor: "#0483AB1A", color: "#0483AB" }}>{info.getValue()}</span> },
    { accessorKey: "value", header: "Valor", cell: (info: any) => <span className="text-[#122232] font-bold">{formatCurrency(info.getValue())}</span> },
    { accessorKey: "score", header: "Score", cell: (info: any) => <span style={{ color: info.getValue() >= 70 ? "#3CCEA7" : info.getValue() >= 50 ? "#EAC23D" : "#ED5200", fontWeight: 700 }}>{info.getValue()}</span> },
    { accessorKey: "owner", header: "Responsável" },
  ];

  const oppColumns: ColumnDef<any, any>[] = [
    { accessorKey: "name", header: "Nome", cell: (info: any) => <span className="text-[#07ABDE]">{info.getValue()}</span> },
    { accessorKey: "account", header: "Conta" },
    { accessorKey: "stage", header: "Estágio", cell: (info: any) => <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ backgroundColor: "#6868B11A", color: "#6868B1" }}>{info.getValue()}</span> },
    { accessorKey: "value", header: "Valor", cell: (info: any) => <span className="text-[#122232] font-bold">{formatCurrency(info.getValue())}</span> },
    { accessorKey: "probability", header: "Prob.", cell: (info: any) => <span style={{ color: info.getValue() >= 70 ? "#3CCEA7" : "#EAC23D", fontWeight: 700 }}>{info.getValue()}%</span> },
    { accessorKey: "owner", header: "Responsável" },
  ];

  const actColumns: ColumnDef<any, any>[] = [
    { accessorKey: "title", header: "Título" },
    { accessorKey: "type", header: "Tipo", cell: (info: any) => <span className="capitalize">{info.getValue()}</span> },
    { accessorKey: "status", header: "Status", cell: (info: any) => { const s = info.getValue(); const c = s === "concluida" ? "#3CCEA7" : s === "atrasada" ? "#ED5200" : "#EAC23D"; return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold capitalize" style={{ backgroundColor: c + "1A", color: c }}>{s}</span>; } },
    { accessorKey: "owner", header: "Responsável" },
    { accessorKey: "date", header: "Data" },
  ];

  /* ── Heatmap data ── */
  const heatmapData = useMemo(() => {
    const days = ["Seg", "Ter", "Qua", "Qui", "Sex"];
    const hours = ["08h", "09h", "10h", "11h", "12h", "13h", "14h", "15h", "16h", "17h"];
    return days.map(day => ({
      day,
      cells: hours.map(hour => ({
        hour,
        value: Math.floor(Math.random() * filteredActivities.length / 8) + 1,
      })),
    }));
  }, [filteredActivities.length]);

  /* ── Render Widget Content ── */
  const renderWidget = (widget: Widget) => {
    switch (widget.type) {
      case "kpi-pipeline":
        return (
          <div className="flex flex-col justify-center h-full px-4">
            <span className="text-[#4E6987]" style={{ fontSize: 12, fontWeight: 500, ...ff }}>Pipeline Total</span>
            <span className="text-[#122232]" style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5, ...ff }}>{formatCurrency(totalPipeline)}</span>
            <span className="text-[#3CCEA7]" style={{ fontSize: 11, fontWeight: 700, ...ff }}>+12% vs mês anterior</span>
          </div>
        );
      case "kpi-receita":
        return (
          <div className="flex flex-col justify-center h-full px-4">
            <span className="text-[#4E6987]" style={{ fontSize: 12, fontWeight: 500, ...ff }}>Receita Fechada</span>
            <span className="text-[#122232]" style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5, ...ff }}>{formatCurrency(wonValue)}</span>
            <span className="text-[#3CCEA7]" style={{ fontSize: 11, fontWeight: 700, ...ff }}>+28% vs mês anterior</span>
          </div>
        );
      case "kpi-leads":
        return (
          <div className="flex flex-col justify-center h-full px-4">
            <span className="text-[#4E6987]" style={{ fontSize: 12, fontWeight: 500, ...ff }}>Leads Ativos</span>
            <span className="text-[#122232]" style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5, ...ff }}>{activeLeads}</span>
            <span className="text-[#3CCEA7]" style={{ fontSize: 11, fontWeight: 700, ...ff }}>+8% vs mês anterior</span>
          </div>
        );
      case "kpi-winrate":
        return (
          <div className="flex flex-col justify-center h-full px-4">
            <span className="text-[#4E6987]" style={{ fontSize: 12, fontWeight: 500, ...ff }}>Win Rate</span>
            <span className="text-[#122232]" style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5, ...ff }}>{winRate}%</span>
            <span className="text-[#3CCEA7]" style={{ fontSize: 11, fontWeight: 700, ...ff }}>+3% vs mês anterior</span>
          </div>
        );
      case "chart-revenue":
        return (
          <div className="h-full px-2 pt-1 pb-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenue} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="revGradB" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0483AB" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#0483AB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF1F6" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#4E6987" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: "#98989d" }} axisLine={false} tickLine={false} tickFormatter={v => `${v / 1000}k`} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="receita" name="Receita" fill="url(#revGradB)" stroke="#0483AB" strokeWidth={2} animationDuration={1000} />
                <Bar dataKey="leads" name="Leads" fill="#07ABDE" radius={[3, 3, 0, 0]} barSize={14} opacity={0.6} animationDuration={800} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        );
      case "chart-pipeline-donut":
        return (
          <div className="h-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pipelineByStage} cx="50%" cy="50%" innerRadius="50%" outerRadius="80%" dataKey="value" nameKey="stage"
                  onClick={(data) => {
                    setCrossFilter("stage", data.stage);
                    const stageOpps = filteredOpps.filter(o => o.stage === data.stage);
                    openDrill(`Pipeline — ${data.stage}`, "stage", stageOpps.map(o => ({ label: o.name, value: o.value, sublabel: `${o.owner} · ${o.probability}%` })));
                  }}
                  animationDuration={1000} style={{ cursor: "pointer" }}>
                  {pipelineByStage.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="white" strokeWidth={2}
                    opacity={crossFilter?.dimension === "stage" && crossFilter?.value !== pipelineByStage[i].stage ? 0.3 : 1} />)}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );
      case "chart-leads-source":
        return (
          <div className="h-full px-2 pt-1 pb-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leadsBySource} layout="vertical" margin={{ top: 5, right: 10, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF1F6" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 9, fill: "#98989d" }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="source" tick={{ fontSize: 10, fill: "#4E6987" }} axisLine={false} tickLine={false} width={70} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="count" name="Leads" radius={[0, 6, 6, 0]} barSize={14} animationDuration={800}
                  onClick={(data) => setCrossFilter("source", data.source)}>
                  {leadsBySource.map((entry, i) => <Cell key={i} fill={COLORS[i % COLORS.length]}
                    opacity={crossFilter?.dimension === "source" && crossFilter?.value !== entry.source ? 0.3 : 1} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      case "chart-activities-bar":
        return (
          <div className="h-full px-2 pt-1 pb-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityByType} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF1F6" vertical={false} />
                <XAxis dataKey="type" tick={{ fontSize: 10, fill: "#4E6987" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: "#98989d" }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="count" name="Quantidade" radius={[6, 6, 0, 0]} barSize={32} animationDuration={800}>
                  {activityByType.map((entry, i) => <Cell key={i} fill={entry.color || COLORS[i % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      case "chart-funnel":
        return (
          <div className="flex flex-col items-center gap-1 py-3 h-full justify-center">
            {conversionFunnel.map((item, i) => {
              const maxVal = conversionFunnel[0]?.value || 1;
              const pct = Math.max((item.value / maxVal) * 100, 20);
              return (
                <motion.div key={item.stage} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="rounded-[8px] flex items-center justify-between px-3 py-1.5 text-white"
                  style={{ width: `${pct}%`, minWidth: 120, backgroundColor: COLORS[i % COLORS.length], fontSize: 11, fontWeight: 600, ...ff }}>
                  <span>{item.stage}</span>
                  <span style={{ fontWeight: 700 }}>{formatNumber(item.value)}</span>
                </motion.div>
              );
            })}
          </div>
        );
      case "gauge-meta-mensal":
        return (
          <div className="h-full flex items-center justify-center">
            <DashGauge value={wonValue} max={500000} label="Meta Mensal" formatValue={formatCurrency} color="#0483AB" />
          </div>
        );
      case "gauge-meta-leads":
        return (
          <div className="h-full flex items-center justify-center">
            <DashGauge value={activeLeads} max={100} label="Meta de Leads" color="#3CCEA7" />
          </div>
        );
      case "gauge-meta-pipeline":
        return (
          <div className="h-full flex items-center justify-center">
            <DashGauge value={totalPipeline} max={2000000} label="Meta Pipeline" formatValue={formatCurrency} color="#917822" />
          </div>
        );
      case "table-leads":
        return (
          <div className="h-full overflow-auto">
            <DashDataTable data={filteredLeads} columns={leadColumns} pageSize={8} exportFilename="leads" />
          </div>
        );
      case "table-opps":
        return (
          <div className="h-full overflow-auto">
            <DashDataTable data={filteredOpps} columns={oppColumns} pageSize={8} exportFilename="oportunidades" />
          </div>
        );
      case "table-activities":
        return (
          <div className="h-full overflow-auto">
            <DashDataTable data={filteredActivities} columns={actColumns} pageSize={8} exportFilename="atividades" />
          </div>
        );
      case "heatmap-activities":
        return (
          <div className="h-full flex flex-col items-center justify-center px-3 py-2">
            <div className="flex items-center gap-1 mb-2">
              <span className="w-[32px]" />
              {["08h", "09h", "10h", "11h", "12h", "13h", "14h", "15h", "16h", "17h"].map(h => (
                <span key={h} className="w-[32px] text-center text-[#98989d]" style={{ fontSize: 8, fontWeight: 600, ...ff }}>{h}</span>
              ))}
            </div>
            {heatmapData.map(row => (
              <div key={row.day} className="flex items-center gap-1 mb-1">
                <span className="w-[32px] text-right pr-1 text-[#4E6987]" style={{ fontSize: 10, fontWeight: 600, ...ff }}>{row.day}</span>
                {row.cells.map(cell => {
                  const maxVal = Math.max(...heatmapData.flatMap(r => r.cells.map(c => c.value)));
                  const intensity = cell.value / (maxVal || 1);
                  return (
                    <motion.div
                      key={cell.hour}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: Math.random() * 0.5 }}
                      className="w-[32px] h-[26px] rounded-[4px] flex items-center justify-center cursor-pointer hover:ring-1 hover:ring-[#0483AB]"
                      style={{ backgroundColor: `rgba(4, 131, 171, ${0.08 + intensity * 0.7})` }}
                      title={`${row.day} ${cell.hour}: ${cell.value} atividades`}
                    >
                      <span className="text-[#122232]" style={{ fontSize: 8, fontWeight: 700, opacity: intensity > 0.3 ? 1 : 0.5, ...ff }}>
                        {cell.value}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            ))}
            <div className="flex items-center gap-1 mt-2">
              <span className="text-[#98989d]" style={{ fontSize: 9, fontWeight: 500, ...ff }}>Menos</span>
              {[0.1, 0.25, 0.5, 0.75, 1].map((o, i) => (
                <div key={i} className="w-[14px] h-[10px] rounded-[2px]" style={{ backgroundColor: `rgba(4, 131, 171, ${0.08 + o * 0.7})` }} />
              ))}
              <span className="text-[#98989d]" style={{ fontSize: 9, fontWeight: 500, ...ff }}>Mais</span>
            </div>
          </div>
        );
      default:
        return <div className="flex items-center justify-center h-full text-[#98989d]" style={{ fontSize: 12, ...ff }}>Widget desconhecido</div>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-[#98989d]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#0483AB] border-t-transparent rounded-full animate-spin" />
          <span style={{ fontSize: 13, fontWeight: 500, ...ff }}>Carregando dados...</span>
        </div>
      </div>
    );
  }

  const catalogCategories = [...new Set(WIDGET_CATALOG.map(w => w.category))];
  const filteredCatalog = WIDGET_CATALOG.filter(w =>
    !catalogFilter || w.label.toLowerCase().includes(catalogFilter.toLowerCase()) || w.category.toLowerCase().includes(catalogFilter.toLowerCase())
  );

  return (
    <div className="max-w-[1400px] mx-auto px-2">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-5 gap-3 flex-wrap">
        <div>
          <h1 className="text-[#122232]" style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5, ...ff }}>Dashboard Builder</h1>
          <p className="text-[#4E6987] mt-0.5" style={{ fontSize: 14, letterSpacing: -0.3, ...ff }}>
            Arraste, redimensione e personalize seus widgets
          </p>
        </div>
        <div className="flex items-center gap-2">
          {crossFilter && (
            <button onClick={clearCrossFilter}
              className="flex items-center gap-1.5 h-[34px] px-3 rounded-full bg-[#FEEDCA] text-[#917822] hover:bg-[#EAC23D]/30 transition-colors cursor-pointer"
              style={{ fontSize: 11, fontWeight: 700, letterSpacing: -0.3, ...ff }}>
              <X size={12} weight="bold" />
              Filtro: {crossFilter.value}
            </button>
          )}
          <button onClick={() => setShowCatalog(true)}
            className="flex items-center gap-1.5 h-[34px] px-4 rounded-full bg-[#0483AB] text-white hover:bg-[#036a8a] transition-colors cursor-pointer"
            style={{ fontSize: 12, fontWeight: 700, letterSpacing: -0.3, ...ff }}>
            <Plus size={14} weight="bold" /> Adicionar Widget
          </button>
          <button onClick={() => setEditing(e => !e)}
            className={`flex items-center gap-1.5 h-[34px] px-4 rounded-full transition-colors cursor-pointer ${
              editing ? "bg-[#3CCEA7] text-white" : "bg-white border border-[#DDE3EC] text-[#4E6987] hover:bg-[#F6F7F9]"
            }`}
            style={{ fontSize: 12, fontWeight: 700, letterSpacing: -0.3, ...ff }}>
            {editing ? <><Check size={14} weight="bold" /> Salvar</> : <><ArrowsOutCardinal size={14} weight="duotone" /> Editar Grid</>}
          </button>
          <button onClick={() => saveLayout(widgets, layouts)} disabled={saving}
            className={`flex items-center gap-1.5 h-[34px] px-3 rounded-full transition-colors cursor-pointer ${
              saving ? "bg-[#DDE3EC] text-[#98989d]" : "bg-[#122232] text-white hover:bg-[#28415c]"
            }`}
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: -0.3, ...ff }}>
            <FloppyDisk size={14} weight={saving ? "regular" : "fill"} className={saving ? "animate-pulse" : ""} />
            {saving ? "Salvando..." : "Persistir"}
          </button>
          <button onClick={resetLayout}
            className="flex items-center gap-1.5 h-[34px] px-3 rounded-full bg-white border border-[#DDE3EC] text-[#4E6987] hover:bg-[#FFEDEB] hover:text-[#ED5200] hover:border-[#ED5200]/30 transition-colors cursor-pointer"
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: -0.3, ...ff }}>
            <ArrowCounterClockwise size={14} weight="bold" /> Reset
          </button>
          <button onClick={handleExportPDF}
            className="flex items-center gap-1.5 h-[34px] px-3 rounded-full bg-white border border-[#DDE3EC] text-[#4E6987] hover:bg-[#F6F7F9] transition-colors cursor-pointer"
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: -0.3, ...ff }}>
            <FilePdf size={14} weight="duotone" /> PDF
          </button>
        </div>
      </motion.div>

      {/* Grid */}
      <div ref={(node) => { (dashRef as any).current = node; (containerRef as any).current = node; }}>
        <ResponsiveGridLayout
          className="layout"
          layouts={layouts}
          width={containerWidth}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={50}
          isDraggable={editing}
          isResizable={editing}
          onLayoutChange={onLayoutChange}
          draggableHandle=".drag-handle"
          margin={[12, 12]}
          compactor={getCompactor("vertical")}
        >
          {widgets.map(widget => (
            <div key={widget.id} className="group">
              <div className={`bg-white rounded-[16px] border h-full flex flex-col overflow-hidden transition-all ${
                editing ? "border-[#0483AB]/30 ring-1 ring-[#0483AB]/10" : "border-[#DDE3EC]"
              }`} style={{ boxShadow: "0px 1px 3px rgba(18,34,50,0.04)" }}>
                {/* Widget header */}
                <div className="flex items-center justify-between px-3 pt-3 pb-1 shrink-0">
                  <div className="flex items-center gap-2 min-w-0">
                    {editing && (
                      <div className="drag-handle cursor-grab active:cursor-grabbing text-[#C8CFDB] hover:text-[#4E6987]">
                        <DotsSixVertical size={14} weight="bold" />
                      </div>
                    )}
                    <span className="text-[#122232] truncate" style={{ fontSize: 13, fontWeight: 700, letterSpacing: -0.3, ...ff }}>
                      {widget.title}
                    </span>
                  </div>
                  {editing && (
                    <button onClick={() => removeWidget(widget.id)}
                      className="flex items-center justify-center w-[24px] h-[24px] rounded-full text-[#C8CFDB] hover:text-[#ED5200] hover:bg-[#FFEDEB] transition-colors cursor-pointer">
                      <Trash size={12} weight="bold" />
                    </button>
                  )}
                </div>
                {/* Widget content */}
                <div className="flex-1 min-h-0">
                  {renderWidget(widget)}
                </div>
              </div>
            </div>
          ))}
        </ResponsiveGridLayout>
      </div>

      {/* Widget Catalog Modal */}
      <AnimatePresence>
        {showCatalog && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-40" onClick={() => setShowCatalog(false)} />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] max-w-[95vw] max-h-[80vh] bg-white rounded-[20px] z-50 flex flex-col"
              style={{ boxShadow: "0px 16px 48px rgba(18,34,50,0.16)" }}
            >
              <div className="flex items-center justify-between px-6 pt-5 pb-3">
                <h2 className="text-[#122232]" style={{ fontSize: 18, fontWeight: 700, letterSpacing: -0.5, ...ff }}>Catálogo de Widgets</h2>
                <button onClick={() => setShowCatalog(false)} className="p-1.5 rounded-full hover:bg-[#F6F7F9] text-[#4E6987] cursor-pointer">
                  <X size={18} weight="bold" />
                </button>
              </div>
              <div className="px-6 pb-3">
                <div className="flex items-center gap-2 h-[36px] px-3 bg-[#F6F7F9] rounded-[10px]">
                  <MagnifyingGlass size={14} className="text-[#C8CFDB]" />
                  <input type="text" value={catalogFilter} onChange={e => setCatalogFilter(e.target.value)}
                    placeholder="Buscar widgets..." className="flex-1 bg-transparent border-none outline-none text-[#122232] placeholder-[#C8CFDB]"
                    style={{ fontSize: 12, ...ff }} />
                </div>
              </div>
              <div className="flex-1 overflow-auto px-6 pb-6">
                {catalogCategories.map(cat => {
                  const items = filteredCatalog.filter(w => w.category === cat);
                  if (!items.length) return null;
                  return (
                    <div key={cat} className="mb-4">
                      <span className="text-[#98989d] block mb-2" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", ...ff }}>
                        {cat}
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        {items.map(item => (
                          <motion.button key={item.type} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                            onClick={() => addWidget(item.type)}
                            className="flex items-center gap-3 p-3 rounded-[12px] border border-[#DDE3EC] hover:border-[#0483AB]/40 hover:bg-[#DCF0FF]/20 transition-all cursor-pointer text-left">
                            <div className="flex items-center justify-center w-[36px] h-[36px] rounded-[10px] bg-[#EBF1FA] text-[#4E6987] shrink-0">
                              {item.icon}
                            </div>
                            <div className="min-w-0">
                              <span className="text-[#122232] block truncate" style={{ fontSize: 13, fontWeight: 600, letterSpacing: -0.3, ...ff }}>{item.label}</span>
                              <span className="text-[#98989d]" style={{ fontSize: 10, fontWeight: 500, ...ff }}>{item.defaultW}x{item.defaultH}</span>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Drill-down Panel */}
      <DrillDownPanel
        open={drillOpen}
        title={drillTitle}
        onClose={() => { setDrillOpen(false); }}
      >
        <div className="space-y-1">
          {drillData.map((item, i) => (
            <DrillRow
              key={i}
              label={item.label || item.name || item.stage || `Item ${i + 1}`}
              value={item.value !== undefined ? (typeof item.value === "number" && item.value > 1000 ? formatCurrency(item.value) : formatNumber(item.value)) : item.count || ""}
              sublabel={item.sublabel || item.owner || item.source || ""}
              color={COLORS[i % COLORS.length]}
            />
          ))}
          {drillData.length === 0 && (
            <div className="flex items-center justify-center h-32 text-[#98989d]" style={{ fontSize: 13, ...ff }}>
              Nenhum dado para exibir
            </div>
          )}
        </div>
      </DrillDownPanel>
    </div>
  );
}