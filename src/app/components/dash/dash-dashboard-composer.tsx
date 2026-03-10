/* ================================================================== */
/*  Zenite Dash — Dashboard Builder (Dash Tableau-like)                */
/*  Compose multiple saved reports into a single dashboard canvas      */
/* ================================================================== */

import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { motion, AnimatePresence } from "motion/react";
import {
  X, FloppyDisk, Broom, Plus, Trash, Eye, EyeSlash,
  ChartBar, ChartLineUp, Table, TextT, Image as ImageIcon,
  ArrowsOutSimple, ArrowsInSimple, FunnelSimple, Crosshair,
  CaretDown, CaretRight, Spinner, MagnifyingGlass, Presentation,
  NavigationArrow, SquaresFour, Rows, Columns, Lock, Globe,
  DotsThreeVertical, Copy, PencilSimple, ArrowsClockwise,
  Heart, Building, IdentificationCard, SketchLogo, Lightning,
  GoogleLogo, MetaLogo, LinkedinLogo, TreeStructure,
  TextAlignLeft, LinkSimpleHorizontal, Sidebar as SidebarIcon,
  Atom, Check, Info, Warning, ArrowLeft, Layout,
  ChartBarHorizontal, ChartPieSlice, ChartDonut, ChartScatter,
  Textbox,
} from "@phosphor-icons/react";
import {
  BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Treemap as RTreemap,
} from "recharts";
import { toast } from "sonner";
import { projectId, publicAnonKey } from "/utils/supabase/info";
import { useDashData, formatNumber } from "./dash-data-provider";
import { processDashData } from "../../hooks/use-dash-data-processor";
import {
  KpiWidgetConfig, KpiWidgetVariant, KpiWidgetRenderer, KpiWidgetEditor,
  WIDGET_VARIANTS, WidgetThumbnail,
} from "./dash-kpi-widgets";
import { ALL_TABLES as VB_ALL_TABLES } from "./dash-visual-builder";
import { RhombusMatrixChart } from "./dash-rhombus-matrix";
import { SankeyChart, type SankeyLink } from "./dash-sankey-chart";
import { relativeDateToRange, isDateInRange } from "./dash-relative-date-utils";
import {
  DS_COLORS, CHART_PALETTE, StackedBarShape, PIE_OPACITY_LAYERS,
} from "./dash-chart-renderer";

const ff: React.CSSProperties = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };
const API = `https://${projectId}.supabase.co/functions/v1/make-server-d2ca3281`;
const GRID_COLS = 12;
const GRID_ROW_H = 48;

/* ── Types ── */

type DynTransition = "fade" | "slide" | "slideLeft" | "slideRight" | "expand";

const DYN_TRANSITION_VARIANTS: Record<DynTransition, { initial: any; animate: any; exit: any }> = {
  fade:       { initial: { opacity: 0 },                       animate: { opacity: 1 },                       exit: { opacity: 0 } },
  slide:      { initial: { opacity: 0, y: 24 },                animate: { opacity: 1, y: 0 },                 exit: { opacity: 0, y: 24 } },
  slideLeft:  { initial: { opacity: 0, x: -30 },               animate: { opacity: 1, x: 0 },                 exit: { opacity: 0, x: -30 } },
  slideRight: { initial: { opacity: 0, x: 30 },                animate: { opacity: 1, x: 0 },                 exit: { opacity: 0, x: 30 } },
  expand:     { initial: { opacity: 0, scale: 0.8 },           animate: { opacity: 1, scale: 1 },             exit: { opacity: 0, scale: 0.8 } },
};

const DYN_TRANSITION_OPTIONS: { value: DynTransition; label: string; icon: string }[] = [
  { value: "fade",       label: "Fade",      icon: "◐" },
  { value: "slide",      label: "Slide ↑",   icon: "↕" },
  { value: "slideLeft",  label: "Slide ←",   icon: "←" },
  { value: "slideRight", label: "Slide →",   icon: "→" },
  { value: "expand",     label: "Expand",    icon: "⊕" },
];

interface DashParameter {
  id: string;
  name: string;
  defaultValue: boolean;
  currentValue: boolean;
}

interface ReportConfig {
  sheetName: string;
  colShelf: any[];
  rowShelf: any[];
  filterShelf: any[];
  chartType: string;
  polarSubType?: string;
  scatterSubType?: string;
  calculatedFields: any[];
  marks?: any;
  showSummaryRow?: boolean;
  summaryFunctions?: Record<string, string>;
  colAggregations?: Record<string, string>;
  rowAggregations?: Record<string, string>;
  filterConfigs?: Record<string, any>;
  colTableCalcs?: Record<string, any>;
  rowTableCalcs?: Record<string, any>;
}

interface SavedReport {
  id: string;
  name: string;
  description: string;
  isPublic: boolean;
  config: ReportConfig;
  createdAt: string;
  updatedAt: string;
}

type PanelItemType = "report" | "text" | "image" | "blank" | "navigation" | "kpi";

interface PanelItem {
  id: string;
  type: PanelItemType;
  reportId?: string;
  reportName?: string;
  reportConfig?: ReportConfig;
  useAsFilter?: boolean;
  content?: string;
  imageUrl?: string;
  navTarget?: string;
  navLabel?: string;
  widgetConfig?: KpiWidgetConfig;
  layout: { x: number; y: number; w: number; h: number };
  visible?: boolean;
  dynamicVisibility?: {
    enabled: boolean;
    sourceItemIds: string[];
    logicOperator: "or" | "and";
    condition: "showOnFilter" | "hideOnFilter";
    parameterId?: string;
    transition: DynTransition;
  };
}

interface PanelSize {
  type: "fixed" | "auto" | "range";
  width: number;
  height: number;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
}

/* ── Table meta (icons + colors per entity) ── */
const TABLE_META: Record<string, { label: string; icon: React.ReactNode; color: string; bg: string }> = {
  leads: { label: "LEADS", icon: <Heart size={11} weight="fill" />, color: "#EAC23D", bg: "#FEEDCA" },
  opportunities: { label: "OPORTUNIDADES", icon: <SketchLogo size={11} weight="fill" />, color: "#07ABDE", bg: "#DCF0FF" },
  activities: { label: "ATIVIDADES", icon: <Lightning size={11} weight="fill" />, color: "#4E6987", bg: "#DDE3EC" },
  accounts: { label: "CONTAS", icon: <Building size={11} weight="fill" />, color: "#28415C", bg: "#DDE3EC" },
  contacts: { label: "CONTATOS", icon: <IdentificationCard size={11} weight="fill" />, color: "#FF8C76", bg: "#FFEDEB" },
  monthlyRevenue: { label: "RECEITA", icon: <SketchLogo size={11} weight="fill" />, color: "#07ABDE", bg: "#DCF0FF" },
  pipelineByStage: { label: "PIPELINE", icon: <SketchLogo size={11} weight="fill" />, color: "#07ABDE", bg: "#DCF0FF" },
  leadsBySource: { label: "LEADS/ORIGEM", icon: <Heart size={11} weight="fill" />, color: "#EAC23D", bg: "#FEEDCA" },
  activityByType: { label: "ATIV./TIPO", icon: <Lightning size={11} weight="fill" />, color: "#4E6987", bg: "#DDE3EC" },
  sync_google_ads: { label: "GOOGLE ADS", icon: <GoogleLogo size={11} weight="duotone" />, color: "#4285F4", bg: "#E8F0FE" },
  sync_meta_ads: { label: "META ADS", icon: <MetaLogo size={11} weight="duotone" />, color: "#0668E1", bg: "#E7F3FF" },
  sync_linkedin_ads: { label: "LINKEDIN ADS", icon: <LinkedinLogo size={11} weight="duotone" />, color: "#0A66C2", bg: "#E8F1FA" },
};

const CHART_TYPE_ICONS: Record<string, React.ReactNode> = {
  auto: <Atom size={13} weight="fill" />,
  bar: <ChartBar size={13} weight="fill" />,
  "bar-h": <ChartBarHorizontal size={13} weight="fill" />,
  line: <ChartLineUp size={13} weight="fill" />,
  area: <ChartLineUp size={13} weight="duotone" />,
  pie: <ChartPieSlice size={13} weight="fill" />,
  donut: <ChartDonut size={13} weight="fill" />,
  scatter: <ChartScatter size={13} weight="fill" />,
  treemap: <SquaresFour size={13} weight="fill" />,
  radar: <svg width={13} height={13} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" opacity="0.35"/><circle cx="12" cy="12" r="5.5" stroke="currentColor" strokeWidth="1.4" opacity="0.25"/><path d="M12 3L12 21M3 12L21 12" stroke="currentColor" strokeWidth="1" opacity="0.18"/><path d="M12 5L16.5 9L15 15L9 15L7.5 9Z" fill="currentColor" opacity="0.45" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
  table: <Table size={13} weight="fill" />,
};

/* ── Full field catalog for KPI Widget Editor (derived from Visual Builder) ── */
const KPI_FIELD_TABLES: { id: string; name: string; fields: { id: string; name: string; label: string; table: string; type: "dimension" | "measure" | "date"; dataType: string; aggregation?: string }[] }[] =
  VB_ALL_TABLES.map((t) => ({
    id: t.id,
    name: t.name,
    fields: t.fields.map((f) => ({
      id: f.id,
      name: f.name,
      label: f.label,
      table: f.table,
      type: f.type as "dimension" | "measure" | "date",
      dataType: f.dataType,
      aggregation: f.aggregation,
    })),
  }));

/* ══════════════════════════════════════════════════════════════ */
/*  DnD Item Types                                               */
/* ══════════════════════════════════════════════════════════════ */

const DND_TYPES = {
  REPORT: "PANEL_REPORT",
  OBJECT: "PANEL_OBJECT",
  WIDGET: "PANEL_WIDGET",
  CANVAS_ITEM: "CANVAS_ITEM",
};

/* ══════════════════════════════════════════════════════════════ */
/*  Sidebar: Report Item (Draggable)                             */
/* ══════════════════════════════════════════════════════════════ */

function DraggableReport({ report }: { report: SavedReport }) {
  const primaryTable = useMemo(() => {
    const allFields = [...(report.config?.rowShelf || []), ...(report.config?.colShelf || [])];
    return allFields.length > 0 ? allFields[0].field?.table : null;
  }, [report]);

  const meta = primaryTable ? TABLE_META[primaryTable] : null;

  const [{ isDragging }, drag] = useDrag({
    type: DND_TYPES.REPORT,
    item: { report },
    collect: (m) => ({ isDragging: m.isDragging() }),
  });

  return (
    <div
      ref={drag as any}
      className={`group flex items-center gap-2.5 px-3 py-2 rounded-[10px] cursor-grab active:cursor-grabbing transition-all ${
        isDragging ? "opacity-40 scale-95" : "hover:bg-[#EEF1F6]"
      }`}
    >
      <div
        className="flex items-center justify-center w-[26px] h-[26px] rounded-[8px] shrink-0"
        style={{ backgroundColor: meta?.bg || "#F6F7F9" }}
      >
        {(() => {
          const icon = CHART_TYPE_ICONS[report.config?.chartType];
          const iconColor = meta?.color || "#4E6987";
          return icon
            ? React.cloneElement(icon as React.ReactElement, { style: { color: iconColor }, weight: "duotone" })
            : <ChartBar size={13} weight="duotone" style={{ color: iconColor }} />;
        })()}
      </div>
      <div className="flex flex-col min-w-0 flex-1">
        <span
          className="text-[#122232] truncate"
          style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.3, ...ff }}
        >
          {report.name}
        </span>
        {meta && (
          <span
            className="flex items-center gap-1 truncate"
            style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.3, color: meta.color, ...ff }}
          >
            {meta.icon} {meta.label}
          </span>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/*  Sidebar: Object Item (Draggable)                             */
/* ══════════════════════════════════════════════════════════════ */

function DraggableObject({ type, label, icon }: { type: PanelItemType; label: string; icon: React.ReactNode }) {
  const [{ isDragging }, drag] = useDrag({
    type: DND_TYPES.OBJECT,
    item: { objectType: type },
    collect: (m) => ({ isDragging: m.isDragging() }),
  });

  return (
    <div
      ref={drag as any}
      className={`flex items-center gap-2.5 px-3 py-2 rounded-[10px] cursor-grab active:cursor-grabbing transition-all ${
        isDragging ? "opacity-40 scale-95" : "hover:bg-[#EEF1F6]"
      }`}
    >
      <div className="flex items-center justify-center w-[26px] h-[26px] rounded-[8px] bg-[#F6F7F9] text-[#4E6987] shrink-0">
        {icon}
      </div>
      <span className="text-[#122232]" style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.3, ...ff }}>
        {label}
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/*  Sidebar: Widget Item (Draggable)                              */
/* ══════════════════════════════════════════════════════════════ */

function DraggableWidget({ variant }: { variant: typeof WIDGET_VARIANTS[number] }) {
  const [{ isDragging }, drag] = useDrag({
    type: DND_TYPES.WIDGET,
    item: { widgetVariant: variant.id },
    collect: (m) => ({ isDragging: m.isDragging() }),
  });

  return (
    <div ref={drag as any} className={isDragging ? "opacity-40 scale-95" : ""}>
      <WidgetThumbnail variant={variant} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/*  Mini Chart Renderer (simplified for panel preview)           */
/* ══════════════════════════════════════════════════════════════ */

function MiniChartRenderer({ data, config }: { data: any[]; config: ReportConfig }) {
  const chartType = config.chartType;
  const allFields = [...(config.rowShelf || []), ...(config.colShelf || [])];
  const dimensionField = allFields.find((f) => f.field?.type === "dimension" || f.field?.type === "date");

  // ── Summary Row helpers (compact version of VB logic) ──
  const showSummaryRow = config.showSummaryRow || false;
  const summaryFunctions = config.summaryFunctions || {};

  const CURRENCY_NAMES = useMemo(() => new Set(["spend", "cost", "cpc", "cpm", "cpv", "cost_per_click", "cost_per_impression", "budget", "daily_budget", "cost_per_conversion", "cost_per_result", "cost_per_lead", "revenue"]), []);
  const PERCENT_NAMES = useMemo(() => new Set(["ctr", "conversion_rate", "bounce_rate", "view_rate", "unique_ctr"]), []);
  const RATIO_NAMES = useMemo(() => new Set(["roas", "frequency"]), []);

  const fieldFormatMap = useMemo(() => {
    const m = new Map<string, { format?: string; name: string; label: string }>();
    allFields.forEach(s => {
      const entry = { format: s.field?.format, name: s.field?.name, label: s.field?.label || s.field?.name };
      m.set(entry.label, entry);
      if (s.field?.name && s.field.name !== entry.label) m.set(s.field.name, entry);
    });
    return m;
  }, [allFields]);

  const isCurrencyCol = useCallback((k: string) => { const info = fieldFormatMap.get(k); return info?.format === "currency" || CURRENCY_NAMES.has(info?.name || k); }, [fieldFormatMap, CURRENCY_NAMES]);
  const isPercentCol = useCallback((k: string) => { const info = fieldFormatMap.get(k); return info?.format === "percent" || PERCENT_NAMES.has(info?.name || k); }, [fieldFormatMap, PERCENT_NAMES]);
  const isRatioCol = useCallback((k: string) => { const info = fieldFormatMap.get(k); return info?.format === "ratio" || RATIO_NAMES.has(info?.name || k); }, [fieldFormatMap, RATIO_NAMES]);

  const getDefaultSummaryFn = useCallback((colKey: string): string => {
    if (isPercentCol(colKey) || isRatioCol(colKey)) return "avg";
    if (isCurrencyCol(colKey)) {
      const info = fieldFormatMap.get(colKey);
      if (info?.name?.startsWith("cost_per") || info?.name === "cpc" || info?.name === "cpm" || info?.name === "cpv") return "avg";
      return "sum";
    }
    const firstVal = data[0]?.[colKey];
    return typeof firstVal === "number" ? "sum" : "count";
  }, [isCurrencyCol, isPercentCol, isRatioCol, fieldFormatMap, data]);

  const computeSummary = useCallback((colKey: string, fn: string, rows: any[]): string => {
    const vals = rows.map(r => r[colKey]).map(v => typeof v === "number" ? v : (typeof v === "string" && v !== "" && !isNaN(Number(v)) ? Number(v) : null)).filter((v): v is number => v !== null);
    if (vals.length === 0) return "-";
    let result: number;
    switch (fn) {
      case "sum": result = vals.reduce((a, b) => a + b, 0); break;
      case "avg": result = vals.reduce((a, b) => a + b, 0) / vals.length; break;
      case "count": return vals.length.toLocaleString("pt-BR");
      case "countd": return new Set(vals).size.toLocaleString("pt-BR");
      case "min": result = Math.min(...vals); break;
      case "max": result = Math.max(...vals); break;
      case "median": { const sorted = [...vals].sort((a, b) => a - b); const mid = Math.floor(sorted.length / 2); result = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2; break; }
      case "none": return "-";
      default: result = vals.reduce((a, b) => a + b, 0); break;
    }
    if (isCurrencyCol(colKey)) return `R$ ${result.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (isPercentCol(colKey)) { const pct = result <= 1 && result >= 0 ? result * 100 : result; return `${pct.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`; }
    if (isRatioCol(colKey)) return `${result.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}x`;
    return result.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  }, [isCurrencyCol, isPercentCol, isRatioCol]);

  const SUMMARY_LABELS: Record<string, string> = { sum: "Soma", avg: "Média", count: "Contagem", countd: "Distintos", min: "Mín", max: "Máx", median: "Mediana", none: "-" };

  const renderSummaryFoot = useCallback((fields: { label: string; name: string }[], rows: any[]) => {
    if (!showSummaryRow) return null;
    return (
      <tfoot>
        <tr className="border-t-2 border-[#07ABDE] bg-[#F0FAFF] sticky bottom-0">
          {fields.map((f, i) => {
            const labelKey = f.label || f.name;
            const dataKey = f.name;
            const fn = summaryFunctions[labelKey] || getDefaultSummaryFn(dataKey);
            return (
              <td key={`s-${i}`} className="px-2 py-1" style={{ fontSize: 9, fontWeight: 700, letterSpacing: -0.2, ...ff }}>
                <span className="text-[#07ABDE] block" style={{ fontSize: 7, fontWeight: 600, letterSpacing: 0.3, textTransform: "uppercase" }}>
                  {SUMMARY_LABELS[fn] || fn}
                </span>
                <span className="text-[#122232]">{computeSummary(dataKey, fn, rows)}</span>
              </td>
            );
          })}
        </tr>
      </tfoot>
    );
  }, [showSummaryRow, summaryFunctions, getDefaultSummaryFn, computeSummary]);

  // Deduplicate measure fields by name and filter out entries with no name to avoid Recharts duplicate key warnings
  const rawMeasureFields = allFields.filter((f) => f.field?.type === "measure" && f.field?.name);
  const measureFields = rawMeasureFields.filter(
    (f, i, arr) => arr.findIndex((x) => x.field.name === f.field.name) === i
  );
  const SYNTH_KEY = "__mini_x__";
  const xAxisKey = dimensionField?.field?.name || SYNTH_KEY;
  const chartId = React.useId();

  // Sanitize data: ensure every xAxis value is a unique non-null string, and measure nulls → 0
  const sanitizedData = React.useMemo(() => {
    if (!data || data.length === 0) return [];
    const mNames = measureFields.map((f) => f.field.name);
    const seen = new Map<string, number>();
    return data.map((row, idx) => {
      const patched: Record<string, any> = { ...row };
      // Ensure xAxis value is never null / undefined / empty
      let val = xAxisKey === SYNTH_KEY ? idx : patched[xAxisKey];
      if (val == null || val === "") val = "(vazio)";
      const strVal = String(val);
      const count = seen.get(strVal) || 0;
      seen.set(strVal, count + 1);
      patched[xAxisKey] = count > 0 ? `${strVal} (${count + 1})` : strVal;
      // Coerce null measures to 0 so Recharts never gets null dataKey values
      for (const m of mNames) {
        if (patched[m] == null) patched[m] = 0;
      }
      return patched;
    });
  }, [data, xAxisKey, measureFields]);

  if (!sanitizedData || sanitizedData.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-[#98989D]" style={{ fontSize: 12, ...ff }}>
        Sem dados para exibir
      </div>
    );
  }

  // Handle dimension-only tables (no measures) — render as table
  if (measureFields.length === 0) {
    if (allFields.length > 0) {
      return (
        <div className="overflow-auto h-full w-full">
          <table className="w-full border-collapse" style={{ fontSize: 11 }}>
            <thead>
              <tr className="bg-[#F6F7F9]">
                {allFields.map((f, i) => (
                  <th key={i} className="text-left px-2 py-1.5 border-b border-[#EEF1F6] text-[#4E6987] whitespace-nowrap" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.3, ...ff }}>
                    {f.field?.label || f.field?.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sanitizedData.slice(0, 50).map((row, ri) => (
                <tr key={ri} className="hover:bg-[#F6F7F9]/50">
                  {allFields.map((f, ci) => (
                    <td key={ci} className="px-2 py-1 border-b border-[#EEF1F6]/50 text-[#122232] whitespace-nowrap" style={{ fontSize: 11, ...ff }}>
                      {typeof row[f.field?.name] === "number" ? formatNumber(row[f.field.name]) : row[f.field?.name] ?? "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            {renderSummaryFoot(allFields.map(f => ({ label: f.field?.label || f.field?.name, name: f.field?.name })), sanitizedData)}
          </table>
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center h-full text-[#98989D]" style={{ fontSize: 12, ...ff }}>
        Adicione uma medida para visualizar o gráfico
      </div>
    );
  }

  if (chartType === "table") {
    return (
      <div className="overflow-auto h-full w-full">
        <table className="w-full border-collapse" style={{ fontSize: 11 }}>
          <thead>
            <tr className="bg-[#F6F7F9]">
              {allFields.map((f, i) => (
                <th
                  key={i}
                  className="text-left px-2 py-1.5 border-b border-[#EEF1F6] text-[#4E6987] whitespace-nowrap"
                  style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.3, ...ff }}
                >
                  {f.field?.label || f.field?.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sanitizedData.slice(0, 50).map((row, ri) => (
              <tr key={ri} className="hover:bg-[#F6F7F9]/50">
                {allFields.map((f, ci) => (
                  <td
                    key={ci}
                    className="px-2 py-1 border-b border-[#EEF1F6]/50 text-[#122232] whitespace-nowrap"
                    style={{ fontSize: 11, ...ff }}
                  >
                    {typeof row[f.field?.name] === "number"
                      ? formatNumber(row[f.field.name])
                      : row[f.field?.name] ?? "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          {renderSummaryFoot(allFields.map(f => ({ label: f.field?.label || f.field?.name, name: f.field?.name })), sanitizedData)}
        </table>
      </div>
    );
  }

  /* ── DS-consistent mini chart getColor ── */
  const getMiniColor = (i: number) => CHART_PALETTE[i % CHART_PALETTE.length];

  /* ── Compact DS Axis Ticks (smaller for mini preview) ── */
  const MiniAxisTick = ({ x, y, payload }: any) => {
    const raw = payload?.value ?? "";
    const displayVal = typeof raw === "string" && raw.length > 10 ? raw.slice(0, 9) + "\u2026" : raw;
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={10} textAnchor="end" fill={DS_COLORS.neutral.muted}
          style={{ fontSize: 8, fontWeight: 500, letterSpacing: -0.2, ...ff }}
          transform="rotate(-35)">
          {displayVal}
        </text>
      </g>
    );
  };
  const MiniYTick = ({ x, y, payload }: any) => {
    const val = typeof payload?.value === "number"
      ? (payload.value >= 1000 ? `${(payload.value / 1000).toFixed(0)}k` : payload.value)
      : payload?.value;
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={-4} y={0} dy={3} textAnchor="end" fill={DS_COLORS.neutral.muted}
          style={{ fontSize: 8, fontWeight: 500, letterSpacing: -0.2, ...ff }}>
          {val}
        </text>
      </g>
    );
  };

  /* ── Mini Tooltip (dark pill, same as reports) ── */
  const MiniTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="px-[10px] py-[5px] rounded-[8px] min-w-[60px]"
        style={{ backgroundColor: DS_COLORS.neutral["400"], boxShadow: "0px 3px 10px rgba(18,34,50,0.25)" }}>
        {label && (
          <p className="text-[#C8CFDB] mb-[2px] truncate max-w-[120px]"
            style={{ fontSize: 8, fontWeight: 700, letterSpacing: 0.3, textTransform: "uppercase", ...ff }}>
            {label}
          </p>
        )}
        {payload.map((entry: any, idx: number) => (
          <div key={idx} className="flex items-center gap-[4px]">
            <span className="w-[5px] h-[5px] rounded-full shrink-0" style={{ backgroundColor: entry.color || entry.fill }} />
            <span className="text-[#C8CFDB]" style={{ fontSize: 9, fontWeight: 500, ...ff }}>{entry.name}:</span>
            <span className="text-white" style={{ fontSize: 10, fontWeight: 700, letterSpacing: -0.3, ...ff }}>
              {formatNumber ? formatNumber(entry.value) : entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  /* ── Mini Legend (DS pill dots, compact) ── */
  const MiniLegend = ({ payload }: any) => {
    if (!payload || !payload.length) return null;
    const filtered = payload.filter((e: any) => e.value !== "_ghost");
    if (!filtered.length) return null;
    return (
      <div className="flex items-center justify-center gap-[6px] flex-wrap mt-[2px]">
        {filtered.slice(0, 5).map((entry: any, idx: number) => (
          <div key={idx} className="flex items-center gap-[3px]">
            <span className="w-[5px] h-[5px] rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
            <span className="text-[#4E6987] truncate max-w-[60px]"
              style={{ fontSize: 8, fontWeight: 600, letterSpacing: -0.2, ...ff }}>
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  /* ── Mini Dot (Figma: filled circle with white stroke, smaller) ── */
  const MiniDot = (props: any) => {
    const { cx, cy, fill } = props;
    if (cx == null || cy == null) return null;
    return <circle cx={cx} cy={cy} r={2.5} fill={fill} stroke="white" strokeWidth={1.2} />;
  };

  /* ══════════════════════════════════════════════════════════════ */
  /*  BAR — 3-layer stacked depth (DS)                             */
  /* ══════════════════════════════════════════════════════════════ */
  if (chartType === "bar" || chartType === "bar_h" || chartType === "bar-h") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={sanitizedData} margin={{ top: 6, right: 6, left: 0, bottom: 16 }} barCategoryGap="20%">
          <CartesianGrid key="grid" strokeDasharray="none" stroke={DS_COLORS.neutral.border} strokeOpacity={0.4} vertical={false} />
          <XAxis key="xaxis" dataKey={xAxisKey} tick={<MiniAxisTick />}
            axisLine={{ stroke: DS_COLORS.neutral.border, strokeWidth: 1 }} tickLine={false}
            height={32} allowDuplicatedCategory={false} />
          <YAxis key="yaxis" tick={<MiniYTick />} axisLine={false} tickLine={false} width={36}
            domain={[0, "auto"]} allowDuplicatedCategory={false} />
          <Tooltip key="tooltip" content={<MiniTooltip />} cursor={{ fill: "rgba(7,171,222,0.06)", radius: 2 }} />
          <Legend key="legend" content={<MiniLegend />} />
          {measureFields.map((f, i) => (
            <Bar key={`bar-${chartId}-${i}`} dataKey={f.field.name} name={f.field.label || f.field.name}
              fill={getMiniColor(i)} shape={<StackedBarShape />} isAnimationActive={false} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
  }

  /* ══════════════════════════════════════════════════════════════ */
  /*  LINE — wave style with area gradient + dots (DS)             */
  /* ══════════════════════════════════════════════════════════════ */
  if (chartType === "line") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={sanitizedData} margin={{ top: 6, right: 6, left: 0, bottom: 16 }}>
          <defs key="line-defs">
            {measureFields.map((_f, i) => (
              <linearGradient key={`miniLineGrad-${i}`} id={`miniLineGrad-${chartId}-${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={getMiniColor(i)} stopOpacity={0.28} />
                <stop offset="85%" stopColor={getMiniColor(i)} stopOpacity={0.04} />
                <stop offset="100%" stopColor={getMiniColor(i)} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid key="grid" strokeDasharray="none" stroke={DS_COLORS.neutral.border} strokeOpacity={0.4} vertical={false} />
          <XAxis key="xaxis" dataKey={xAxisKey} tick={<MiniAxisTick />}
            axisLine={{ stroke: DS_COLORS.neutral.border, strokeWidth: 1 }} tickLine={false}
            height={32} allowDuplicatedCategory={false} />
          <YAxis key="yaxis" tick={<MiniYTick />} axisLine={false} tickLine={false} width={36}
            domain={[0, "auto"]} allowDuplicatedCategory={false} />
          <Tooltip key="tooltip" content={<MiniTooltip />} />
          <Legend key="legend" content={<MiniLegend />} />
          {measureFields.map((f, i) => {
            const color = getMiniColor(i);
            return (
              <Area key={`line-${chartId}-${i}`} type="monotone" dataKey={f.field.name} name={f.field.label || f.field.name}
                stroke={color} strokeWidth={2} fill={`url(#miniLineGrad-${chartId}-${i})`} fillOpacity={1}
                dot={<MiniDot fill={color} />} isAnimationActive={false} />
            );
          })}
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  /* ══════════════════════════════════════════════════════════════ */
  /*  AREA — stronger gradient fill (DS)                           */
  /* ══════════════════════════════════════════════════════════════ */
  if (chartType === "area") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={sanitizedData} margin={{ top: 6, right: 6, left: 0, bottom: 16 }}>
          <defs key="area-defs">
            {measureFields.map((_f, i) => (
              <linearGradient key={`miniAreaGrad-${i}`} id={`miniAreaGrad-${chartId}-${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={getMiniColor(i)} stopOpacity={0.35} />
                <stop offset="90%" stopColor={getMiniColor(i)} stopOpacity={0.05} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid key="grid" strokeDasharray="none" stroke={DS_COLORS.neutral.border} strokeOpacity={0.4} vertical={false} />
          <XAxis key="xaxis" dataKey={xAxisKey} tick={<MiniAxisTick />}
            axisLine={{ stroke: DS_COLORS.neutral.border, strokeWidth: 1 }} tickLine={false}
            height={32} allowDuplicatedCategory={false} />
          <YAxis key="yaxis" tick={<MiniYTick />} axisLine={false} tickLine={false} width={36}
            domain={[0, "auto"]} allowDuplicatedCategory={false} />
          <Tooltip key="tooltip" content={<MiniTooltip />} />
          <Legend key="legend" content={<MiniLegend />} />
          {measureFields.map((f, i) => {
            const color = getMiniColor(i);
            return (
              <Area key={`area-${chartId}-${i}`} type="monotone" dataKey={f.field.name} name={f.field.label || f.field.name}
                stroke={color} strokeWidth={2} fill={`url(#miniAreaGrad-${chartId}-${i})`} fillOpacity={1}
                dot={<MiniDot fill={color} />} isAnimationActive={false} />
            );
          })}
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  /* ══════════════════════════════════════════════════════════════ */
  /*  PIE — multi-layer opacity slices (DS)                        */
  /* ══════════════════════════════════════════════════════════════ */
  if (chartType === "pie") {
    const mField = measureFields[0];
    const nameKey = dimensionField?.field?.name || SYNTH_KEY;
    const sortedData = [...sanitizedData].sort((a, b) => {
      const aV = typeof a[mField.field.name] === "number" ? a[mField.field.name] : 0;
      const bV = typeof b[mField.field.name] === "number" ? b[mField.field.name] : 0;
      return bV - aV;
    }).slice(0, 8);
    const pieData = sortedData.map((d, i) => ({
      name: nameKey !== SYNTH_KEY ? String(d[nameKey] ?? `Item ${i + 1}`) : `Item ${i + 1}`,
      value: typeof d[mField.field.name] === "number" ? d[mField.field.name] : 0,
    }));
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          {/* Background base circle (DS) */}
          <Pie key="pie-bg" data={[{ value: 1 }]} dataKey="value" cx="50%" cy="50%"
            outerRadius="78%" innerRadius={0} isAnimationActive={false} stroke="none">
            <Cell fill={DS_COLORS.neutral.bg} />
          </Pie>
          {/* Main pie with opacity-varied slices */}
          <Pie key="pie-main" data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%"
            outerRadius="75%" innerRadius={0} paddingAngle={0} stroke="none" strokeWidth={0}
            labelLine={false} isAnimationActive={false}>
            {pieData.map((_entry, i) => (
              <Cell key={`cell-${chartId}-${i}`} fill={CHART_PALETTE[i % CHART_PALETTE.length]}
                stroke="white" strokeWidth={1.5}
                opacity={PIE_OPACITY_LAYERS[Math.min(i, PIE_OPACITY_LAYERS.length - 1)]} />
            ))}
          </Pie>
          <Tooltip key="tooltip" content={<MiniTooltip />} />
          <Legend key="legend" content={<MiniLegend />} />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  /* ══════════════════════════════════════════════════════════════ */
  /*  DONUT — progress ring with gray track (DS)                   */
  /* ══════════════════════════════════════════════════════════════ */
  if (chartType === "donut") {
    const mField = measureFields[0];
    const nameKey = dimensionField?.field?.name || SYNTH_KEY;
    const pieData = sanitizedData.slice(0, 8).map((d, i) => ({
      name: nameKey !== SYNTH_KEY ? String(d[nameKey] ?? `Item ${i + 1}`) : `Item ${i + 1}`,
      value: typeof d[mField.field.name] === "number" ? d[mField.field.name] : 0,
    }));
    const total = pieData.reduce((s, d) => s + d.value, 0);
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          {/* Gray track ring */}
          <Pie key="donut-bg" data={[{ value: 1 }]} dataKey="value" cx="50%" cy="50%"
            outerRadius="78%" innerRadius="52%" isAnimationActive={false} stroke="none">
            <Cell fill={DS_COLORS.neutral.border} opacity={0.5} />
          </Pie>
          {/* Colored data ring */}
          <Pie key="donut-main" data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%"
            outerRadius="76%" innerRadius="54%" paddingAngle={2} stroke="white" strokeWidth={1.5}
            cornerRadius={3} isAnimationActive={false}>
            {pieData.map((_entry, i) => (
              <Cell key={`dcell-${chartId}-${i}`} fill={CHART_PALETTE[i % CHART_PALETTE.length]} />
            ))}
          </Pie>
          {/* Center total */}
          <text x="50%" y="47%" textAnchor="middle" dominantBaseline="central"
            fill={DS_COLORS.neutral["500"]} style={{ fontSize: 14, fontWeight: 700, letterSpacing: -0.5, ...ff }}>
            {formatNumber ? formatNumber(total) : total}
          </text>
          <text x="50%" y="57%" textAnchor="middle" dominantBaseline="central"
            fill={DS_COLORS.neutral.muted} style={{ fontSize: 7, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", ...ff }}>
            TOTAL
          </text>
          <Tooltip key="tooltip" content={<MiniTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  /* ══════════════════════════════════════════════════════════════ */
  /*  TREEMAP — rounded cells with opacity layers (DS)             */
  /* ══════════════════════════════════════════════════════════════ */
  if (chartType === "treemap") {
    const mField = measureFields[0];
    const nameKey = dimensionField?.field?.name || mField.field.name;
    const treemapData = sanitizedData.map((d, idx) => ({
      name: String(d[nameKey] || `Item ${idx + 1}`),
      size: typeof d[mField.field.name] === "number" ? d[mField.field.name] : 0,
      fill: CHART_PALETTE[idx % CHART_PALETTE.length],
    }));
    const MiniTreemapContent = (props: any) => {
      const { x, y, width, height, name, fill, index } = props;
      if (!width || !height || width < 16 || height < 12) return null;
      const opacity = PIE_OPACITY_LAYERS[Math.min(index ?? 0, PIE_OPACITY_LAYERS.length - 1)];
      const displayName = typeof name === "string" ? name : String(name ?? "");
      return (
        <g>
          <rect x={x} y={y} width={width} height={height} fill={fill} stroke="#fff" strokeWidth={2} rx={6} ry={6} opacity={opacity} />
          {width > 40 && height > 22 && displayName && (
            <text x={x + width / 2} y={y + height / 2} textAnchor="middle" dominantBaseline="central" fill="#fff"
              style={{ fontSize: Math.min(9, width / 8), fontWeight: 600, ...ff }}>
              {displayName.length > 10 ? displayName.slice(0, 9) + "\u2026" : displayName}
            </text>
          )}
        </g>
      );
    };
    return (
      <ResponsiveContainer width="100%" height="100%">
        <RTreemap data={treemapData} dataKey="size" nameKey="name" stroke="#fff" content={<MiniTreemapContent />} isAnimationActive={false}>
          <Tooltip key="tooltip" content={<MiniTooltip />} />
        </RTreemap>
      </ResponsiveContainer>
    );
  }

  /* ══════════════════════════════════════════════════════════════ */
  /*  RADAR — polygon grid + 3-layer depth (DS)                    */
  /* ══════════════════════════════════════════════════════════════ */
  if (chartType === "radar") {
    const mField = measureFields[0];
    const dimKey = dimensionField?.field?.name || SYNTH_KEY;
    const radarMax = Math.max(...sanitizedData.map((d: any) => typeof d[mField.field.name] === "number" ? d[mField.field.name] : 0), 1);
    const spiderColor = CHART_PALETTE[0];
    const radarData = sanitizedData.map((d: any, i: number) => ({
      category: String(d[dimKey] || `Item ${i + 1}`),
      normalized: ((typeof d[mField.field.name] === "number" ? d[mField.field.name] : 0) / radarMax) * 100,
      fullMark: 100,
    }));
    return (
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="60%" data={radarData}>
          <PolarGrid gridType="polygon" stroke={DS_COLORS.neutral.border} strokeOpacity={0.7} />
          <PolarAngleAxis dataKey="category" tick={{ fill: DS_COLORS.neutral["300"], fontSize: 7, fontWeight: 600 }} />
          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
          {/* Ghost layer (3-layer depth) */}
          <Radar key={`radar-ghost-${chartId}`} dataKey="normalized" stroke="none"
            fill={spiderColor} fillOpacity={0.08} isAnimationActive={false} legendType="none" />
          {/* Main layer */}
          <Radar key={`radar-main-${chartId}`} dataKey="normalized" stroke={spiderColor} strokeWidth={1.5}
            fill={spiderColor} fillOpacity={0.22}
            dot={{ r: 2, fill: spiderColor, stroke: "#fff", strokeWidth: 1.2 }}
            isAnimationActive={false} />
          <Tooltip key="tooltip" content={<MiniTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    );
  }

  // Scatter / Matrix
  if (chartType === "scatter" && config.scatterSubType === "matrix") {
    const dimFields = allFields.filter(f => f.field?.type === "dimension" || f.field?.type === "date");
    const dim1Key = dimFields[0]?.field?.name || xAxisKey;
    const dim2Key = dimFields[1]?.field?.name || null;
    const mKey = measureFields[0]?.field?.name || "value";

    const xCats = [...new Set(sanitizedData.map((d: any) => String(d[dim1Key] || "")))].slice(0, 12);
    const yCats = dim2Key
      ? [...new Set(sanitizedData.map((d: any) => String(d[dim2Key] || "")))].slice(0, 8)
      : [measureFields[0]?.field?.label || mKey];

    const matMap = new Map<string, number>();
    let mMin = Infinity, mMax = -Infinity;
    sanitizedData.forEach((row: any) => {
      const xV = String(row[dim1Key] || "");
      const yV = dim2Key ? String(row[dim2Key] || "") : (measureFields[0]?.field?.label || mKey);
      const v = typeof row[mKey] === "number" ? row[mKey] : 0;
      const k = `${xV}__${yV}`;
      matMap.set(k, (matMap.get(k) || 0) + v);
    });
    matMap.forEach(v => { if (v < mMin) mMin = v; if (v > mMax) mMax = v; });
    if (mMin === Infinity) mMin = 0;
    if (mMax === -Infinity) mMax = 1;
    const mRange = mMax - mMin || 1;

    return (
      <RhombusMatrixChart
        xCats={xCats} yCats={yCats} matrixMap={matMap}
        matMin={mMin} matMax={mMax} matRange={mRange}
        cellSize={28} keyPrefix="mini" compact
      />
    );
  }

  // Scatter classic mini-chart (DS 3-layer bubbles with jitter + series colors)
  if (chartType === "scatter" && config.scatterSubType !== "matrix") {
    const mKey = measureFields[0]?.field?.name || "value";
    const mKey2 = measureFields[1]?.field?.name || mKey;
    const dimKey = allFields.find(f => f.field?.type === "dimension")?.field?.name || "";
    const vals = sanitizedData.map((d: any) => typeof d[mKey] === "number" ? d[mKey] : 0);
    const vMin = Math.min(...vals), vMax = Math.max(...vals);
    const vRange = vMax - vMin || 1;
    const W = 240, H = 140, PAD = 12;
    const fmtMiniVal = (v: number) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v % 1 === 0 ? String(Math.round(v)) : v.toFixed(1);
    const yVals = sanitizedData.map((d: any) => typeof d[mKey2] === "number" ? d[mKey2] : 0);
    const y2Min = Math.min(...yVals), y2Max = Math.max(...yVals), y2R = y2Max - y2Min || 1;
    // DS Series color map by dimension
    const dimVals = dimKey ? [...new Set(sanitizedData.map((d: any) => String(d[dimKey] || "")))] : [];
    const dimColorMap = new Map<string, string>();
    dimVals.forEach((dv, i) => dimColorMap.set(dv, CHART_PALETTE[i % CHART_PALETTE.length]));
    const points = sanitizedData.slice(0, 30).map((row: any, i: number) => {
      const v1 = typeof row[mKey] === "number" ? row[mKey] : 0;
      const v2 = typeof row[mKey2] === "number" ? row[mKey2] : 0;
      const r = 4 + ((v1 - vMin) / vRange) * 14;
      const x = PAD + ((v1 - vMin) / vRange) * (W - PAD * 2);
      const y = H - PAD - ((v2 - y2Min) / y2R) * (H - PAD * 2);
      const dv = dimKey ? String(row[dimKey] || "") : "";
      const color = dimColorMap.get(dv) || CHART_PALETTE[i % CHART_PALETTE.length];
      return { x, y, r, val: fmtMiniVal(v1), color };
    });
    // Mini jitter: spread overlapping points
    const pxThresh = 6;
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].x - points[j].x, dy = points[i].y - points[j].y;
        if (Math.sqrt(dx * dx + dy * dy) < pxThresh) {
          const angle = j * (2 * Math.PI / Math.max(3, points.length));
          points[j].x += Math.cos(angle) * 5;
          points[j].y += Math.sin(angle) * 5;
        }
      }
    }
    return (
      <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet"
        style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
        {/* DS Grid lines (solid, subtle) */}
        {[0.25, 0.5, 0.75].map(f => (
          <line key={`gh-${f}`} x1={PAD} y1={PAD + f * (H - PAD * 2)} x2={W - PAD} y2={PAD + f * (H - PAD * 2)}
            stroke={DS_COLORS.neutral.border} strokeWidth={0.5} opacity={0.4} />
        ))}
        {[0.25, 0.5, 0.75].map(f => (
          <line key={`gv-${f}`} x1={PAD + f * (W - PAD * 2)} y1={PAD} x2={PAD + f * (W - PAD * 2)} y2={H - PAD}
            stroke={DS_COLORS.neutral.border} strokeWidth={0.5} opacity={0.25} />
        ))}
        {/* DS 3-layer Bubbles (ghost halo + mid ring + solid core) */}
        {points.map((p, i) => (
          <g key={`sb-${i}`}>
            {/* Ghost halo */}
            <circle cx={p.x} cy={p.y} r={p.r + 3} fill={p.color} opacity={0.08} />
            {/* Mid depth ring */}
            <circle cx={p.x} cy={p.y} r={p.r + 1} fill={p.color} opacity={0.22} />
            {/* Main bubble with white stroke */}
            <circle cx={p.x} cy={p.y} r={p.r} fill={p.color} opacity={0.82}
              stroke="white" strokeWidth={1} strokeOpacity={0.7} />
            {/* Gloss highlight */}
            <ellipse cx={p.x - p.r * 0.15} cy={p.y - p.r * 0.2} rx={p.r * 0.4} ry={p.r * 0.25}
              fill="white" opacity={0.10} />
            {/* Value label inside */}
            {p.r >= 8 && (
              <text x={p.x} y={p.y} textAnchor="middle" dominantBaseline="central"
                fill="white" style={{ fontSize: Math.max(5, p.r / 2.2), fontWeight: 700, letterSpacing: -0.3 }}>
                {p.val}
              </text>
            )}
          </g>
        ))}
      </svg>
    );
  }

  // Sankey mini-chart
  if (chartType === "sankey") {
    const dimFields = allFields.filter(f => f.field?.type === "dimension" || f.field?.type === "date");
    const dim1Key = dimFields[0]?.field?.name || xAxisKey;
    const dim2Key = dimFields[1]?.field?.name || null;
    const mKey = measureFields[0]?.field?.name || "value";

    if (dim2Key) {
      const sankeyLinks: SankeyLink[] = sanitizedData
        .filter((row: any) => row[dim1Key] && row[dim2Key])
        .map((row: any) => ({
          source: String(row[dim1Key]),
          target: String(row[dim2Key]),
          value: typeof row[mKey] === "number" ? row[mKey] : 1,
        }));

      return <SankeyChart links={sankeyLinks} compact />;
    }
  }

  // Fallback — DS bar chart
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={sanitizedData} margin={{ top: 6, right: 6, left: 0, bottom: 16 }} barCategoryGap="20%">
        <CartesianGrid key="grid" strokeDasharray="none" stroke={DS_COLORS.neutral.border} strokeOpacity={0.4} vertical={false} />
        <XAxis key="xaxis" dataKey={xAxisKey} tick={<MiniAxisTick />}
          axisLine={{ stroke: DS_COLORS.neutral.border, strokeWidth: 1 }} tickLine={false}
          height={32} allowDuplicatedCategory={false} />
        <YAxis key="yaxis" tick={<MiniYTick />} axisLine={false} tickLine={false} width={36}
          domain={[0, "auto"]} allowDuplicatedCategory={false} />
        <Tooltip key="tooltip" content={<MiniTooltip />} cursor={{ fill: "rgba(7,171,222,0.06)", radius: 2 }} />
        {measureFields.map((f, i) => (
          <Bar key={`fb-${chartId}-${i}`} dataKey={f.field.name} name={f.field.label || f.field.name}
            fill={getMiniColor(i)} shape={<StackedBarShape />} isAnimationActive={false} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/*  Canvas Panel Widget                                          */
/* ══════════════════════════════════════════════════════════════ */

function PanelWidget({
  item,
  data,
  isSelected,
  onSelect,
  onRemove,
  onToggleFilter,
  onToggleVisibility,
  onDuplicate,
  onUpdateContent,
  onUpdateImageUrl,
  onUpdateNavTarget,
  onEditWidget,
  crossFilterValue,
  onCrossFilterClick,
}: {
  item: PanelItem;
  data: any[];
  isSelected: boolean;
  onSelect: () => void;
  onRemove: () => void;
  onToggleFilter: () => void;
  onToggleVisibility: () => void;
  onDuplicate: () => void;
  onUpdateContent: (content: string) => void;
  onUpdateImageUrl?: (url: string) => void;
  onUpdateNavTarget?: (target: string, label: string) => void;
  onEditWidget?: () => void;
  crossFilterValue?: Record<string, any>;
  onCrossFilterClick?: (filterData: Record<string, any>) => void;
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(item.content || "");
  const [editingImageUrl, setEditingImageUrl] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState(item.imageUrl || "");
  const [editingNav, setEditingNav] = useState(false);
  const [navTargetInput, setNavTargetInput] = useState(item.navTarget || "");
  const [navLabelInput, setNavLabelInput] = useState(item.navLabel || "Navegar");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setShowMenu(false);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  // Apply cross-filter to data if present
  const filteredData = useMemo(() => {
    if (!crossFilterValue || Object.keys(crossFilterValue).length === 0) return data;
    return data.filter((row) =>
      Object.entries(crossFilterValue).every(([key, val]) => row[key] === val)
    );
  }, [data, crossFilterValue]);

  const primaryTable = useMemo(() => {
    if (item.type !== "report" || !item.reportConfig) return null;
    const allFields = [...(item.reportConfig.rowShelf || []), ...(item.reportConfig.colShelf || [])];
    return allFields.length > 0 ? allFields[0].field?.table : null;
  }, [item]);

  const meta = primaryTable ? TABLE_META[primaryTable] : null;

  if (item.visible === false) {
    return (
      <div
        className="h-full w-full flex items-center justify-center bg-[#F6F7F9]/50 rounded-[12px] border border-dashed border-[#DDE3EC]"
        onClick={onSelect}
      >
        <span className="text-[#98989D]" style={{ fontSize: 11, ...ff }}>
          <EyeSlash size={16} className="inline mr-1" /> Oculto
        </span>
      </div>
    );
  }

  // ── Text object ──
  if (item.type === "text") {
    return (
      <div
        className={`h-full w-full flex flex-col rounded-[12px] bg-white border transition-all ${
          isSelected ? "border-[#0483AB] shadow-[0_0_0_2px_rgba(4,131,171,0.15)]" : "border-[#EEF1F6]"
        }`}
        onClick={onSelect}
      >
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-[#EEF1F6]/60">
          <span className="text-[#98989D] uppercase" style={{ fontSize: 8, fontWeight: 700, letterSpacing: 0.5, ...ff }}>Texto</span>
          <div className="flex items-center gap-0.5">
            <button onClick={(e) => { e.stopPropagation(); setEditing(!editing); }} className="p-1 rounded hover:bg-[#F6F7F9] text-[#98989D] hover:text-[#0483AB] cursor-pointer">
              <PencilSimple size={12} weight="bold" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); onRemove(); }} className="p-1 rounded hover:bg-[#FFEDEB] text-[#98989D] hover:text-[#F56233] cursor-pointer">
              <X size={12} weight="bold" />
            </button>
          </div>
        </div>
        <div className="flex-1 p-3 overflow-auto">
          {editing ? (
            <textarea
              autoFocus
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={() => { onUpdateContent(editText); setEditing(false); }}
              className="w-full h-full resize-none border-none outline-none text-[#122232] bg-transparent"
              style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3, lineHeight: "20px", ...ff }}
              placeholder="Digite seu texto aqui..."
            />
          ) : (
            <p
              className="text-[#122232] whitespace-pre-wrap"
              style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3, lineHeight: "20px", ...ff }}
              onDoubleClick={() => setEditing(true)}
            >
              {item.content || "Clique duas vezes para editar"}
            </p>
          )}
        </div>
      </div>
    );
  }

  // ── Image object ──
  if (item.type === "image") {
    return (
      <div
        className={`h-full w-full flex flex-col rounded-[12px] bg-white border transition-all ${
          isSelected ? "border-[#0483AB] shadow-[0_0_0_2px_rgba(4,131,171,0.15)]" : "border-[#EEF1F6]"
        }`}
        onClick={onSelect}
      >
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-[#EEF1F6]/60">
          <span className="text-[#98989D] uppercase" style={{ fontSize: 8, fontWeight: 700, letterSpacing: 0.5, ...ff }}>Imagem</span>
          <div className="flex items-center gap-0.5">
            <button onClick={(e) => { e.stopPropagation(); setEditingImageUrl(!editingImageUrl); }} className="p-1 rounded hover:bg-[#F6F7F9] text-[#98989D] hover:text-[#0483AB] cursor-pointer">
              <PencilSimple size={12} weight="bold" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); onRemove(); }} className="p-1 rounded hover:bg-[#FFEDEB] text-[#98989D] hover:text-[#F56233] cursor-pointer">
              <X size={12} weight="bold" />
            </button>
          </div>
        </div>
        {editingImageUrl && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-[#EEF1F6]/60">
            <input
              autoFocus
              value={imageUrlInput}
              onChange={(e) => setImageUrlInput(e.target.value)}
              placeholder="Cole a URL da imagem..."
              className="flex-1 h-[26px] px-2 rounded-[6px] bg-[#F6F7F9] border-none outline-none text-[#122232] placeholder-[#C8CFDB]"
              style={{ fontSize: 10, ...ff }}
              onKeyDown={(e) => { if (e.key === "Enter") { onUpdateImageUrl?.(imageUrlInput); setEditingImageUrl(false); } }}
            />
            <button onClick={() => { onUpdateImageUrl?.(imageUrlInput); setEditingImageUrl(false); }} className="p-1 rounded bg-[#3CCEA7] text-white hover:bg-[#30B893] cursor-pointer">
              <Check size={10} weight="bold" />
            </button>
          </div>
        )}
        <div className="flex-1 flex items-center justify-center p-3">
          {item.imageUrl ? (
            <img src={item.imageUrl} alt="" className="max-w-full max-h-full object-contain rounded-[8px]" />
          ) : (
            <div className="flex flex-col items-center gap-2 text-[#98989D] cursor-pointer" onClick={(e) => { e.stopPropagation(); setEditingImageUrl(true); }}>
              <ImageIcon size={32} weight="duotone" />
              <span style={{ fontSize: 11, ...ff }}>Clique para adicionar URL</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Blank object ──
  if (item.type === "blank") {
    return (
      <div
        className={`h-full w-full rounded-[12px] border transition-all ${
          isSelected ? "border-[#0483AB] bg-white shadow-[0_0_0_2px_rgba(4,131,171,0.15)]" : "border-[#EEF1F6] bg-[#FAFBFC]"
        }`}
        onClick={onSelect}
      >
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-[#EEF1F6]/60">
          <span className="text-[#98989D] uppercase" style={{ fontSize: 8, fontWeight: 700, letterSpacing: 0.5, ...ff }}>Espaçador</span>
          <button onClick={(e) => { e.stopPropagation(); onRemove(); }} className="p-1 rounded hover:bg-[#FFEDEB] text-[#98989D] hover:text-[#F56233] cursor-pointer">
            <X size={12} weight="bold" />
          </button>
        </div>
      </div>
    );
  }

  // ── Navigation object ──
  if (item.type === "navigation") {
    return (
      <div
        className={`h-full w-full flex flex-col rounded-[12px] bg-white border transition-all ${
          isSelected ? "border-[#0483AB] shadow-[0_0_0_2px_rgba(4,131,171,0.15)]" : "border-[#EEF1F6]"
        }`}
        onClick={onSelect}
      >
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-[#EEF1F6]/60">
          <span className="text-[#98989D] uppercase" style={{ fontSize: 8, fontWeight: 700, letterSpacing: 0.5, ...ff }}>Navegação</span>
          <div className="flex items-center gap-0.5">
            <button onClick={(e) => { e.stopPropagation(); setEditingNav(!editingNav); }} className="p-1 rounded hover:bg-[#F6F7F9] text-[#98989D] hover:text-[#0483AB] cursor-pointer">
              <PencilSimple size={12} weight="bold" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); onRemove(); }} className="p-1 rounded hover:bg-[#FFEDEB] text-[#98989D] hover:text-[#F56233] cursor-pointer">
              <X size={12} weight="bold" />
            </button>
          </div>
        </div>
        {editingNav && (
          <div className="flex flex-col gap-1.5 px-3 py-1.5 border-b border-[#EEF1F6]/60">
            <div className="flex items-center gap-1.5">
              <span className="text-[#98989D] shrink-0" style={{ fontSize: 9, fontWeight: 700, ...ff }}>Label:</span>
              <input
                value={navLabelInput}
                onChange={(e) => setNavLabelInput(e.target.value)}
                className="flex-1 h-[24px] px-2 rounded-[5px] bg-[#F6F7F9] border-none outline-none text-[#122232]"
                style={{ fontSize: 10, ...ff }}
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#98989D] shrink-0" style={{ fontSize: 9, fontWeight: 700, ...ff }}>URL:</span>
              <input
                value={navTargetInput}
                onChange={(e) => setNavTargetInput(e.target.value)}
                placeholder="/estudio/dashboards/recentes"
                className="flex-1 h-[24px] px-2 rounded-[5px] bg-[#F6F7F9] border-none outline-none text-[#122232] placeholder-[#C8CFDB]"
                style={{ fontSize: 10, ...ff }}
              />
              <button onClick={() => { onUpdateNavTarget?.(navTargetInput, navLabelInput); setEditingNav(false); }} className="p-1 rounded bg-[#3CCEA7] text-white hover:bg-[#30B893] cursor-pointer">
                <Check size={10} weight="bold" />
              </button>
            </div>
          </div>
        )}
        <div className="flex-1 flex items-center justify-center p-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-[500px] bg-[#DCF0FF] text-[#0483AB] hover:bg-[#c5e5f7] transition-colors cursor-pointer">
            <NavigationArrow size={14} weight="bold" />
            <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...ff }}>
              {item.navLabel || "Navegar"}
            </span>
          </button>
        </div>
      </div>
    );
  }

  // ── KPI Widget ──
  if (item.type === "kpi" && item.widgetConfig) {
    return (
      <div
        className={`h-full w-full flex flex-col rounded-[12px] bg-white border transition-all ${
          isSelected ? "border-[#0483AB] shadow-[0_0_0_2px_rgba(4,131,171,0.15)]" : "border-[#EEF1F6]"
        }`}
        onClick={onSelect}
        onDoubleClick={() => onEditWidget?.()}
      >
        {/* KPI Header */}
        <div className="flex items-center justify-between px-3 py-1 border-b border-[#EEF1F6]/60 shrink-0">
          <div className="flex items-center gap-1.5 min-w-0">
            <Atom size={12} weight="duotone" className="text-[#07ABDE] shrink-0" />
            <span className="text-[#98989d] truncate uppercase" style={{ fontSize: 8, fontWeight: 700, letterSpacing: 0.5, ...ff }}>
              KPI Widget
            </span>
          </div>
          <div className="flex items-center gap-0.5 relative" ref={menuRef}>
            <button
              onClick={(e) => { e.stopPropagation(); onEditWidget?.(); }}
              className="p-1 rounded hover:bg-[#F6F7F9] text-[#98989D] hover:text-[#0483AB] cursor-pointer"
              title="Editar Widget"
            >
              <PencilSimple size={12} weight="bold" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
              className="p-1 rounded hover:bg-[#F6F7F9] text-[#98989D] hover:text-[#4E6987] cursor-pointer"
            >
              <DotsThreeVertical size={14} weight="bold" />
            </button>
            <AnimatePresence>
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -4 }}
                  className="absolute right-0 top-7 z-50 bg-white rounded-[10px] border border-[#DDE3EC] shadow-[0_8px_24px_rgba(0,0,0,0.12)] py-1 min-w-[160px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => { onEditWidget?.(); setShowMenu(false); }}
                    className="w-full flex items-center gap-2 px-3 py-1.5 text-left hover:bg-[#F6F7F9] transition-colors cursor-pointer"
                  >
                    <PencilSimple size={13} weight="bold" className="text-[#0483AB]" />
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#122232", ...ff }}>Editar Widget</span>
                  </button>
                  <button
                    onClick={() => { onDuplicate(); setShowMenu(false); }}
                    className="w-full flex items-center gap-2 px-3 py-1.5 text-left hover:bg-[#F6F7F9] transition-colors cursor-pointer"
                  >
                    <Copy size={13} weight="bold" className="text-[#4E6987]" />
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#122232", ...ff }}>Duplicar</span>
                  </button>
                  <div className="h-px bg-[#EEF1F6] my-0.5" />
                  <button
                    onClick={() => { onRemove(); setShowMenu(false); }}
                    className="w-full flex items-center gap-2 px-3 py-1.5 text-left hover:bg-[#FFEDEB] transition-colors cursor-pointer"
                  >
                    <Trash size={13} weight="bold" className="text-[#DC2626]" />
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#DC2626", ...ff }}>Remover</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        {/* KPI Content */}
        <div className="flex-1 overflow-hidden">
          {item.widgetConfig.primaryField ? (
            <KpiWidgetRenderer config={item.widgetConfig} data={data} />
          ) : (
            <div className="h-full flex flex-col items-center justify-center gap-2 text-[#98989d]">
              <Textbox size={20} weight="duotone" className="text-[#C8CFDB]" />
              <span className="text-center px-4" style={{ fontSize: 10, fontWeight: 500, ...ff }}>
                Clique duas vezes para configurar
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Report Widget ──
  return (
    <div
      className={`h-full w-full flex flex-col rounded-[12px] bg-white border transition-all ${
        isSelected ? "border-[#0483AB] shadow-[0_0_0_2px_rgba(4,131,171,0.15)]" : "border-[#EEF1F6]"
      }`}
      onClick={onSelect}
    >
      {/* Widget Header */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-[#EEF1F6]/60 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          {meta && (
            <div
              className="flex items-center justify-center w-[18px] h-[18px] rounded-[5px] shrink-0"
              style={{ backgroundColor: meta.bg }}
            >
              <span style={{ color: meta.color }}>{meta.icon}</span>
            </div>
          )}
          <span
            className="text-[#122232] truncate"
            style={{ fontSize: 12, fontWeight: 700, letterSpacing: -0.3, ...ff }}
          >
            {item.reportName || "Sem Título"}
          </span>
          {item.useAsFilter && (
            <span
              className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-[#DCF0FF] text-[#0483AB] shrink-0"
              style={{ fontSize: 8, fontWeight: 700, letterSpacing: 0.3, ...ff }}
            >
              <FunnelSimple size={8} weight="bold" /> FILTRO
            </span>
          )}
          {/* Badge showing saved report has active filters */}
          {!item.useAsFilter && item.reportConfig?.filterShelf && item.reportConfig.filterShelf.length > 0 && (
            <span
              className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-[#F0F4FA] text-[#4E6987] shrink-0"
              style={{ fontSize: 8, fontWeight: 700, letterSpacing: 0.3, ...ff }}
              title={`${item.reportConfig.filterShelf.length} filtro(s) salvo(s)`}
            >
              <FunnelSimple size={8} weight="bold" /> {item.reportConfig.filterShelf.length}
            </span>
          )}
          {/* Dynamic visibility badge */}
          {item.dynamicVisibility?.enabled && (
            <span
              className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-[#F0FAFF] text-[#07ABDE] shrink-0"
              style={{ fontSize: 8, fontWeight: 700, letterSpacing: 0.3, ...ff }}
              title={`Visibilidade dinâmica: ${item.dynamicVisibility.condition === "showOnFilter" ? "Mostrar" : "Ocultar"} ao filtrar (${item.dynamicVisibility.sourceItemIds?.length || 0} fonte(s), ${item.dynamicVisibility.logicOperator?.toUpperCase() || "OR"})`}
            >
              <Lightning size={8} weight="fill" /> DINÂMICO
            </span>
          )}
        </div>
        <div className="flex items-center gap-0.5 relative" ref={menuRef}>
          <button
            onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
            className="p-1 rounded hover:bg-[#F6F7F9] text-[#98989D] hover:text-[#4E6987] cursor-pointer"
          >
            <DotsThreeVertical size={14} weight="bold" />
          </button>
          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -4 }}
                className="absolute right-0 top-7 z-50 bg-white rounded-[10px] border border-[#DDE3EC] shadow-[0_8px_24px_rgba(0,0,0,0.12)] py-1 min-w-[160px]"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => { onToggleFilter(); setShowMenu(false); }}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-left hover:bg-[#F6F7F9] transition-colors cursor-pointer"
                >
                  <FunnelSimple size={13} weight="bold" className="text-[#0483AB]" />
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#122232", ...ff }}>
                    {item.useAsFilter ? "Desativar Filtro" : "Usar como Filtro"}
                  </span>
                </button>
                <button
                  onClick={() => { onToggleVisibility(); setShowMenu(false); }}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-left hover:bg-[#F6F7F9] transition-colors cursor-pointer"
                >
                  <EyeSlash size={13} weight="bold" className="text-[#4E6987]" />
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#122232", ...ff }}>Ocultar</span>
                </button>
                <button
                  onClick={() => { onDuplicate(); setShowMenu(false); }}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-left hover:bg-[#F6F7F9] transition-colors cursor-pointer"
                >
                  <Copy size={13} weight="bold" className="text-[#4E6987]" />
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#122232", ...ff }}>Duplicar</span>
                </button>
                {item.reportId && (
                  <button
                    onClick={() => { window.open(`/estudio/relatorios/recentes/${item.reportId}`, "_blank"); setShowMenu(false); }}
                    className="w-full flex items-center gap-2 px-3 py-1.5 text-left hover:bg-[#F6F7F9] transition-colors cursor-pointer"
                  >
                    <Eye size={13} weight="bold" className="text-[#4E6987]" />
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#122232", ...ff }}>Ver Relatório</span>
                  </button>
                )}
                <div className="h-px bg-[#EEF1F6] my-0.5" />
                <button
                  onClick={() => { onRemove(); setShowMenu(false); }}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-left hover:bg-[#FFEDEB] transition-colors cursor-pointer"
                >
                  <Trash size={13} weight="bold" className="text-[#F56233]" />
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#F56233", ...ff }}>Remover</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Widget Body */}
      <div className="flex-1 min-h-0 p-2 overflow-hidden">
        {item.reportConfig ? (
          <MiniChartRenderer data={filteredData} config={item.reportConfig} />
        ) : (
          <div className="flex items-center justify-center h-full text-[#98989D]">
            <Spinner size={20} className="animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/*  Layout Hierarchy Tree                                        */
/* ══════════════════════════════════════════════════════════════ */

function LayoutTree({
  items,
  selectedId,
  onSelect,
  onRemove,
  onToggleVisibility,
}: {
  items: PanelItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
  onToggleVisibility: (id: string) => void;
}) {
  const typeLabels: Record<PanelItemType, string> = {
    report: "Planilha",
    text: "Texto",
    image: "Imagem",
    blank: "Espa\u00e7ador",
    navigation: "Navega\u00e7\u00e3o",
    kpi: "KPI Widget",
  };

  return (
    <div className="flex flex-col gap-0.5">
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => onSelect(item.id)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-[8px] cursor-pointer transition-colors ${
            selectedId === item.id ? "bg-[#DCF0FF]" : "hover:bg-[#EEF1F6]"
          }`}
        >
          <span className="text-[#98989D]" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.3, ...ff }}>
            {typeLabels[item.type] || "?"}
          </span>
          <span
            className="flex-1 text-[#122232] truncate"
            style={{ fontSize: 11, fontWeight: 600, letterSpacing: -0.3, ...ff }}
          >
            {item.reportName || item.widgetConfig?.title || item.content?.slice(0, 20) || item.type}
          </span>
          <div className="flex items-center gap-0.5">
            {item.dynamicVisibility?.enabled && (
              <span className="text-[#07ABDE]" title="Visibilidade Dinâmica">
                <Lightning size={10} weight="fill" />
              </span>
            )}
            <button
              onClick={(e) => { e.stopPropagation(); onToggleVisibility(item.id); }}
              className="p-0.5 rounded hover:bg-white/60 text-[#98989D] cursor-pointer"
            >
              {item.visible === false ? <EyeSlash size={11} /> : <Eye size={11} />}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onRemove(item.id); }}
              className="p-0.5 rounded hover:bg-[#FFEDEB] text-[#98989D] hover:text-[#F56233] cursor-pointer"
            >
              <X size={11} weight="bold" />
            </button>
          </div>
        </div>
      ))}
      {items.length === 0 && (
        <div className="flex items-center justify-center py-6 text-[#98989D]" style={{ fontSize: 11, ...ff }}>
          Arraste planilhas para o canvas
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/*  Save Modal                                                   */
/* ══════════════════════════════════════════════════════════════ */

function SavePanelModal({
  isOpen,
  onClose,
  onSave,
  initialName,
  initialDesc,
  initialPublic,
  isSaving,
  isEditing,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, desc: string, isPublic: boolean) => void;
  initialName: string;
  initialDesc: string;
  initialPublic: boolean;
  isSaving: boolean;
  isEditing: boolean;
}) {
  const [name, setName] = useState(initialName);
  const [desc, setDesc] = useState(initialDesc);
  const [isPublic, setIsPublic] = useState(initialPublic);

  useEffect(() => {
    setName(initialName);
    setDesc(initialDesc);
    setIsPublic(initialPublic);
  }, [initialName, initialDesc, initialPublic, isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/20 flex items-center justify-center z-[9999]"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-[15px] p-6 w-[420px] max-w-[90vw] shadow-[0_24px_48px_rgba(0,0,0,0.15)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[#122232]" style={{ fontSize: 18, fontWeight: 700, letterSpacing: -0.5, ...ff }}>
            {isEditing ? "Atualizar Dash" : "Salvar Dash"}
          </h3>
          <button onClick={onClose} className="text-[#98989D] hover:text-[#122232] transition-colors cursor-pointer">
            <X size={20} weight="bold" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-[#98989D] uppercase block mb-1.5" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.5, ...ff }}>
              Nome do Dash
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-[38px] px-3 rounded-[10px] border border-[#DDE3EC] text-[#122232] outline-none focus:border-[#0483AB] transition-colors"
              style={{ fontSize: 13, fontWeight: 500, ...ff }}
              placeholder="Ex: Dashboard de Vendas"
            />
          </div>

          <div>
            <label className="text-[#98989D] uppercase block mb-1.5" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.5, ...ff }}>
              Descrição
            </label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full h-[70px] px-3 py-2 rounded-[10px] border border-[#DDE3EC] text-[#122232] outline-none focus:border-[#0483AB] resize-none transition-colors"
              style={{ fontSize: 13, fontWeight: 500, ...ff }}
              placeholder="Opcional"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPublic(!isPublic)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[500px] text-xs font-bold transition-colors cursor-pointer ${
                isPublic ? "bg-[#DDE3EC] text-[#28415C]" : "bg-[#F6F7F9] text-[#4E6987]"
              }`}
              style={{ fontSize: 10, letterSpacing: 0.5, ...ff }}
            >
              {isPublic ? <Globe size={13} weight="bold" /> : <Lock size={13} weight="bold" />}
              {isPublic ? "PÚBLICO" : "PRIVADO"}
            </button>
          </div>
        </div>

        <div className="flex gap-2 justify-end mt-6">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 h-[34px] px-4 rounded-[500px] bg-[#F6F7F9] text-[#4E6987] hover:bg-[#ebedf0] transition-colors cursor-pointer"
          >
            <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...ff }}>Cancelar</span>
          </button>
          <button
            onClick={() => onSave(name, desc, isPublic)}
            disabled={isSaving || !name.trim()}
            className={`flex items-center gap-1.5 h-[34px] px-4 rounded-[500px] transition-colors cursor-pointer ${
              isSaving || !name.trim()
                ? "bg-[#DDE3EC] text-[#98989D] cursor-not-allowed"
                : "bg-[#3CCEA7] text-white hover:bg-[#30B893]"
            }`}
          >
            {isSaving ? <Spinner size={14} className="animate-spin" /> : <FloppyDisk size={14} weight="bold" />}
            <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...ff }}>
              {isSaving ? "Salvando..." : "Salvar"}
            </span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/*  MAIN: DashboardBuilderInner                                  */
/* ══════════════════════════════════════════════════════════════ */

function DashboardBuilderInner() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dashData = useDashData();

  // ── Panel State ──
  const [panelName, setPanelName] = useState("Dash 1");
  const [panelDesc, setPanelDesc] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [editingPanelId, setEditingPanelId] = useState<string | null>(null);
  const [items, setItems] = useState<PanelItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [panelSize, setPanelSize] = useState<PanelSize>({ type: "auto", width: 1200, height: 800 });

  // ── View mode ──
  const isViewMode = searchParams.get("mode") === "view";

  // ── Cross-filter state ──
  const [crossFilter, setCrossFilter] = useState<Record<string, any>>({});
  const [crossFilterSourceId, setCrossFilterSourceId] = useState<string | null>(null);

  // ── Parameter Actions state ──
  const [parameters, setParameters] = useState<DashParameter[]>([]);

  // Auto-set parameter values when cross-filter changes (Parameter Actions)
  useEffect(() => {
    if (!crossFilterSourceId) {
      // Reset all parameters to default when filter clears
      setParameters(prev => prev.map(p => ({ ...p, currentValue: p.defaultValue })));
      return;
    }
    // Find items that reference this source and trigger their associated parameters
    items.forEach(item => {
      if (!item.dynamicVisibility?.enabled) return;
      const { sourceItemIds, parameterId } = item.dynamicVisibility;
      if (parameterId && sourceItemIds.includes(crossFilterSourceId)) {
        setParameters(prev => prev.map(p => p.id === parameterId ? { ...p, currentValue: true } : p));
      }
    });
  }, [crossFilterSourceId, crossFilter]);

  // ── Dynamic Zone Visibility evaluator ──
  const isDynamicVisible = useCallback(
    (item: PanelItem): boolean => {
      if (!item.dynamicVisibility?.enabled) return true;
      const { sourceItemIds, logicOperator, condition, parameterId } = item.dynamicVisibility;

      // Priority: if a parameter is set, use it
      if (parameterId) {
        const param = parameters.find(p => p.id === parameterId);
        if (param) {
          const val = param.currentValue;
          return condition === "showOnFilter" ? val : !val;
        }
      }

      // Multi-source evaluation
      if (!sourceItemIds || sourceItemIds.length === 0) return true;
      const hasFilter = Object.keys(crossFilter).length > 0;
      const sourceMatches = sourceItemIds.map(sid => crossFilterSourceId === sid && hasFilter);
      const result = logicOperator === "and"
        ? sourceMatches.every(Boolean)
        : sourceMatches.some(Boolean);

      if (condition === "showOnFilter") return result;
      if (condition === "hideOnFilter") return !result;
      return true;
    },
    [crossFilter, crossFilterSourceId, parameters]
  );

  // ── Sidebar state ──
  const [sidebarTab, setSidebarTab] = useState<"dash" | "planilhas">("planilhas");
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [reports, setReports] = useState<SavedReport[]>([]);
  const [loadingReports, setLoadingReports] = useState(true);
  const [reportSearch, setReportSearch] = useState("");
  const [objectsCollapsed, setObjectsCollapsed] = useState(false);
  const [sizeCollapsed, setSizeCollapsed] = useState(false);
  const [widgetsCollapsed, setWidgetsCollapsed] = useState(false);
  const [editingWidgetId, setEditingWidgetId] = useState<string | null>(null);

  // ── Save state ──
  const [saveModal, setSaveModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [loadingPanel, setLoadingPanel] = useState(false);

  // ── Canvas ref ──
  const canvasRef = useRef<HTMLDivElement>(null);

  // ── Load reports on mount (skip in view mode — not needed) ──
  useEffect(() => {
    if (!isViewMode) fetchReports();
  }, [isViewMode]);

  // ── Load panel if editing or viewing ──
  useEffect(() => {
    const loadId = searchParams.get("id");
    if (!loadId) return;
    let cancelled = false;
    loadPanel(loadId).catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const fetchReports = async () => {
    setLoadingReports(true);
    try {
      const res = await fetch(`${API}/dash/visual-builder/list-reports?userId=default`, {
        headers: { Authorization: `Bearer ${publicAnonKey}` },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setReports(data.reports || []);
    } catch (err) {
      console.error("[DashboardBuilder] Error fetching reports:", err);
      toast.error("Erro ao carregar planilhas");
    } finally {
      setLoadingReports(false);
    }
  };

  const loadPanel = async (id: string) => {
    setLoadingPanel(true);
    try {
      const res = await fetch(`${API}/dash/panels/get/${id}`, {
        headers: { Authorization: `Bearer ${publicAnonKey}` },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const panel = data.panel;
      if (panel) {
        setPanelName(panel.name || "Dash 1");
        setPanelDesc(panel.description || "");
        setIsPublic(panel.isPublic || false);
        setEditingPanelId(panel.id);
        // Migrate old sourceItemId → sourceItemIds if needed
        const migratedItems = (panel.items || []).map((it: any) => {
          if (it.dynamicVisibility && 'sourceItemId' in it.dynamicVisibility && !it.dynamicVisibility.sourceItemIds) {
            const old = it.dynamicVisibility.sourceItemId;
            return {
              ...it,
              dynamicVisibility: {
                ...it.dynamicVisibility,
                sourceItemIds: old ? [old] : [],
                logicOperator: it.dynamicVisibility.logicOperator || "or",
                transition: it.dynamicVisibility.transition || "fade",
              },
            };
          }
          return it;
        });
        setItems(migratedItems);
        if (panel.parameters) setParameters(panel.parameters);
        if (panel.size) setPanelSize(panel.size);
        if (!isViewMode) toast.success(`Dash "${panel.name}" carregado`);
      }
    } catch (err) {
      // Ignore abort errors (component unmounted / navigation)
      if (err instanceof DOMException && err.name === "AbortError") return;
      console.error("[DashboardBuilder] Error loading panel:", err);
      toast.error("Erro ao carregar dash");
    } finally {
      setLoadingPanel(false);
    }
  };

  const savePanel = async (name: string, desc: string, pub: boolean) => {
    setIsSaving(true);
    try {
      const res = await fetch(`${API}/dash/panels/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          ...(editingPanelId ? { id: editingPanelId } : {}),
          name,
          description: desc,
          isPublic: pub,
          userId: "default",
          size: panelSize,
          items,
          parameters,
          globalFilters: [],
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.panel?.id) setEditingPanelId(data.panel.id);
      setPanelName(name);
      setPanelDesc(desc);
      setIsPublic(pub);
      toast.success(`Dash "${name}" ${editingPanelId ? "atualizado" : "criado"} com sucesso!`);
      setSaveModal(false);
    } catch (err) {
      console.error("[DashboardBuilder] Error saving panel:", err);
      toast.error(`Erro ao salvar dash: ${err}`);
    } finally {
      setIsSaving(false);
    }
  };

  // ── Get table data for a report ──
  const getTableData = useCallback(
    (tableId: string): any[] => {
      switch (tableId) {
        case "leads": return dashData.leads || [];
        case "opportunities": return dashData.opportunities || [];
        case "activities": return dashData.activities || [];
        case "accounts": return dashData.accounts || [];
        case "contacts": return dashData.contacts || [];
        case "monthlyRevenue": return dashData.monthlyRevenue || [];
        case "pipelineByStage": return dashData.pipelineByStage || [];
        case "leadsBySource": return dashData.leadsBySource || [];
        case "activityByType": return dashData.activityByType || [];
        case "sync_google_ads": return (dashData as any).syncGoogleAds || [];
        case "sync_meta_ads": return (dashData as any).syncMetaAds || [];
        case "sync_linkedin_ads": return (dashData as any).syncLinkedinAds || [];
        default: return [];
      }
    },
    [dashData]
  );

  // ── Process report data ──
  // ── Apply saved filter shelf + filterConfigs to raw data (same logic as VB) ──
  const applyReportFilters = useCallback(
    (sourceData: any[], config: ReportConfig): any[] => {
      const filterShelf = config.filterShelf || [];
      const filterConfigs = config.filterConfigs || {};
      if (filterShelf.length === 0) return sourceData;

      let data = sourceData;
      filterShelf.forEach((sf: any, idx: number) => {
        const field = sf.field;
        const fc = (filterConfigs as any)[String(idx)];
        if (!fc) return; // no config for this filter index → skip

        data = data.filter((row: any) => {
          const value = row[field.name];

          // Relative date filtering
          if (field.dataType === "date" && fc.isRelativeDate && fc.relativeDateValue) {
            try {
              const dateRange = relativeDateToRange(fc.relativeDateValue);
              return isDateInRange(value, dateRange);
            } catch { return true; }
          }

          // Operator-based filtering
          switch (fc.operator) {
            case "isEmpty":
              return value == null || value === "" || value === "null";
            case "isNotEmpty":
              return value != null && value !== "" && value !== "null";
            case "isTrue":
              return value === true;
            case "isFalse":
              return value === false || !value;
            case "equals":
              if (field.dataType === "number") return Number(value) === Number(fc.value);
              if (field.dataType === "date") return new Date(value).toDateString() === new Date(fc.value as string).toDateString();
              return String(value).toLowerCase() === String(fc.value).toLowerCase();
            case "notEquals":
              if (field.dataType === "number") return Number(value) !== Number(fc.value);
              if (field.dataType === "date") return new Date(value).toDateString() !== new Date(fc.value as string).toDateString();
              return String(value).toLowerCase() !== String(fc.value).toLowerCase();
            case "contains":
              return String(value).toLowerCase().includes(String(fc.value).toLowerCase());
            case "notContains":
              return !String(value).toLowerCase().includes(String(fc.value).toLowerCase());
            case "greaterThan":
              if (field.dataType === "number") return Number(value) > Number(fc.value);
              if (field.dataType === "date") return new Date(value) > new Date(fc.value as string);
              return false;
            case "lessThan":
              if (field.dataType === "number") return Number(value) < Number(fc.value);
              if (field.dataType === "date") return new Date(value) < new Date(fc.value as string);
              return false;
            case "greaterOrEqual":
              if (field.dataType === "number") return Number(value) >= Number(fc.value);
              return false;
            case "lessOrEqual":
              if (field.dataType === "number") return Number(value) <= Number(fc.value);
              return false;
            default:
              return true;
          }
        });
      });

      console.log(`[DashboardBuilder] Filters applied: ${sourceData.length} → ${data.length} rows (${filterShelf.length} filters)`);
      return data;
    },
    []
  );

  const getProcessedData = useCallback(
    (config: ReportConfig): any[] => {
      const allFields = [...(config.rowShelf || []), ...(config.colShelf || [])];
      if (allFields.length === 0) return [];
      const primaryField = allFields[0];
      const rawData = getTableData(primaryField.field?.table);
      // Apply saved filters BEFORE processing aggregation
      const sourceData = applyReportFilters(rawData, config);
      try {
        return processDashData({
          rowShelf: config.rowShelf || [],
          colShelf: config.colShelf || [],
          filterShelf: config.filterShelf || [],
          sourceData,
          calculatedFields: config.calculatedFields || [],
        });
      } catch (e) {
        console.error("[DashboardBuilder] processDashData error:", e);
        return [];
      }
    },
    [getTableData, applyReportFilters]
  );

  // ── Memoized data per panel item ──
  const itemDataMap = useMemo(() => {
    const map: Record<string, any[]> = {};
    items.forEach((item) => {
      if (item.type === "report" && item.reportConfig) {
        map[item.id] = getProcessedData(item.reportConfig);
      } else if (item.type === "kpi" && item.widgetConfig?.primaryField) {
        // KPI widgets use raw table data (aggregation is done inside the renderer)
        map[item.id] = getTableData(item.widgetConfig.primaryField.table);
      }
    });
    return map;
  }, [items, getProcessedData, getTableData, dashData]);

  // ── Add item to canvas ──
  const addItem = useCallback(
    (type: PanelItemType, reportData?: SavedReport, widgetVariant?: KpiWidgetVariant) => {
      const defaultW = type === "kpi" ? 3 : type === "blank" ? 12 : type === "text" ? 4 : type === "navigation" ? 3 : 4;
      const defaultH = type === "kpi" ? 4 : type === "blank" ? 1 : type === "text" ? 3 : type === "navigation" ? 2 : 5;

      // Smart auto-layout: try to place side-by-side on the last row if space available
      let bestX = 0;
      let bestY = 0;
      if (items.length > 0) {
        const maxY = items.reduce((max, it) => Math.max(max, it.layout.y + it.layout.h), 0);
        // Find items on the last row
        const lastRowItems = items.filter((it) => it.layout.y + it.layout.h === maxY);
        if (lastRowItems.length > 0) {
          const lastItem = lastRowItems[lastRowItems.length - 1];
          const endX = lastItem.layout.x + lastItem.layout.w;
          if (endX + defaultW <= GRID_COLS) {
            // Fits next to the last item on the same row
            bestX = endX;
            bestY = lastItem.layout.y;
          } else {
            // Place on a new row
            bestX = 0;
            bestY = maxY;
          }
        } else {
          bestY = maxY;
        }
      }

      const newItem: PanelItem = {
        id: `item-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        type,
        layout: { x: bestX, y: bestY, w: defaultW, h: defaultH },
        visible: true,
      };

      if (type === "report" && reportData) {
        newItem.reportId = reportData.id;
        newItem.reportName = reportData.name;
        newItem.reportConfig = reportData.config;
      } else if (type === "kpi") {
        const variant = widgetVariant || "simple";
        const isChart = variant === "bullet" || variant === "dial" || variant === "full-dial";
        newItem.widgetConfig = {
          variant,
          title: "Novo KPI",
          accentColor: "#122232",
          ...(isChart ? { minValue: 0 } : {}),
        };
      } else if (type === "text") {
        newItem.content = "";
      }

      setItems((prev) => [...prev, newItem]);
      setSelectedItemId(newItem.id);
    },
    [items]
  );

  // ── Canvas drop zone ──
  const [{ isOver }, canvasDrop] = useDrop({
    accept: [DND_TYPES.REPORT, DND_TYPES.OBJECT, DND_TYPES.WIDGET],
    drop: (dragItem: any) => {
      if (dragItem.report) {
        addItem("report", dragItem.report);
      } else if (dragItem.widgetVariant) {
        addItem("kpi", undefined, dragItem.widgetVariant);
      } else if (dragItem.objectType) {
        addItem(dragItem.objectType);
      }
    },
    collect: (m) => ({ isOver: m.isOver() }),
  });

  // ── Item operations ──
  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    if (selectedItemId === id) setSelectedItemId(null);
  };

  const duplicateItem = (id: string) => {
    const original = items.find((i) => i.id === id);
    if (!original) return;
    const maxY = items.reduce((max, it) => Math.max(max, it.layout.y + it.layout.h), 0);
    const clone: PanelItem = {
      ...original,
      id: `item-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      layout: { ...original.layout, y: maxY },
    };
    setItems((prev) => [...prev, clone]);
    setSelectedItemId(clone.id);
  };

  const toggleFilter = (id: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, useAsFilter: !i.useAsFilter } : i))
    );
  };

  const toggleVisibility = (id: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, visible: i.visible === false ? true : false } : i))
    );
  };

  const updateItemContent = (id: string, content: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, content } : i))
    );
  };

  const updateItemImageUrl = (id: string, imageUrl: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, imageUrl } : i))
    );
  };

  const updateItemNavTarget = (id: string, navTarget: string, navLabel: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, navTarget, navLabel } : i))
    );
  };

  const updateItemWidgetConfig = (id: string, widgetConfig: KpiWidgetConfig) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, widgetConfig } : i))
    );
  };

  const updateItemLayout = (id: string, layout: Partial<PanelItem["layout"]>) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, layout: { ...i.layout, ...layout } } : i))
    );
  };

  // ── Keyboard shortcuts ──
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Delete" || e.key === "Backspace") {
        // Don't trigger if user is typing in an input/textarea
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
        if (selectedItemId) {
          removeItem(selectedItemId);
        }
      }
      if (e.key === "Escape") {
        setSelectedItemId(null);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedItemId]);

  const resetAll = () => {
    if (items.length > 0 && !confirm("Limpar todo o canvas?")) return;
    setItems([]);
    setSelectedItemId(null);
    setCrossFilter({});
    setCrossFilterSourceId(null);
  };

  // ── Filtered reports by search ──
  const filteredReports = useMemo(() => {
    if (!reportSearch.trim()) return reports;
    const q = reportSearch.toLowerCase();
    return reports.filter((r) => r.name.toLowerCase().includes(q));
  }, [reports, reportSearch]);

  // ── Resize logic for canvas items ──
  const [resizing, setResizing] = useState<string | null>(null);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [dragStartLayout, setDragStartLayout] = useState({ w: 0, h: 0 });

  const handleResizeStart = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setResizing(id);
    setDragStartPos({ x: e.clientX, y: e.clientY });
    const item = items.find((i) => i.id === id);
    if (item) setDragStartLayout({ w: item.layout.w, h: item.layout.h });
  };

  useEffect(() => {
    if (!resizing) return;
    const handleMove = (e: MouseEvent) => {
      const dx = e.clientX - dragStartPos.x;
      const dy = e.clientY - dragStartPos.y;
      const canvasWidth = canvasRef.current?.clientWidth || 1200;
      const colWidth = canvasWidth / GRID_COLS;
      const dw = Math.round(dx / colWidth);
      const dh = Math.round(dy / GRID_ROW_H);
      const newW = Math.max(1, Math.min(GRID_COLS, dragStartLayout.w + dw));
      const newH = Math.max(1, dragStartLayout.h + dh);
      updateItemLayout(resizing, { w: newW, h: newH });
    };
    const handleUp = () => setResizing(null);
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleUp);
    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleUp);
    };
  }, [resizing, dragStartPos, dragStartLayout]);

  // ── Drag-to-move logic for canvas items ──
  const [moving, setMoving] = useState<string | null>(null);
  const [moveStartPos, setMoveStartPos] = useState({ x: 0, y: 0 });
  const [moveStartLayout, setMoveStartLayout] = useState({ x: 0, y: 0 });

  const handleMoveStart = (id: string, e: React.MouseEvent) => {
    // Only start move on left-click, not on resize handle
    if (e.button !== 0) return;
    e.preventDefault();
    setMoving(id);
    setMoveStartPos({ x: e.clientX, y: e.clientY });
    const item = items.find((i) => i.id === id);
    if (item) setMoveStartLayout({ x: item.layout.x, y: item.layout.y });
    setSelectedItemId(id);
  };

  useEffect(() => {
    if (!moving) return;
    const item = items.find((i) => i.id === moving);
    if (!item) return;
    const handleMove = (e: MouseEvent) => {
      const dx = e.clientX - moveStartPos.x;
      const dy = e.clientY - moveStartPos.y;
      const canvasWidth = canvasRef.current?.clientWidth || 1200;
      const colWidth = canvasWidth / GRID_COLS;
      const newX = Math.max(0, Math.min(GRID_COLS - item.layout.w, moveStartLayout.x + Math.round(dx / colWidth)));
      const newY = Math.max(0, moveStartLayout.y + Math.round(dy / GRID_ROW_H));
      updateItemLayout(moving, { x: newX, y: newY });
    };
    const handleUp = () => setMoving(null);
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleUp);
    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleUp);
    };
  }, [moving, moveStartPos, moveStartLayout, items]);

  // ── Size presets ──
  const SIZE_PRESETS = [
    { label: "Desktop", w: 1200, h: 800 },
    { label: "Laptop", w: 1000, h: 700 },
    { label: "Tablet", w: 768, h: 1024 },
    { label: "Mobile", w: 375, h: 812 },
  ];

  /* ═══════════════════════════════════════════════════════════ */
  /*  VIEW MODE — read-only presentation (like DashReportView)   */
  /* ═══════════════════════════════════════════════════════════ */

  if (isViewMode) {
    const panelId = searchParams.get("id");

    if (loadingPanel || dashData.loading) {
      return (
        <div className="flex items-center justify-center h-screen bg-[#F6F7F9]">
          <div className="flex flex-col items-center gap-3">
            <Spinner size={32} weight="bold" className="text-[#0483AB] animate-spin" />
            <p className="text-[#98989D]" style={{ fontSize: 13, fontWeight: 500, ...ff }}>
              Carregando Dash...
            </p>
          </div>
        </div>
      );
    }

    if (items.length === 0 && !loadingPanel) {
      return (
        <div className="flex flex-col h-screen bg-[#F6F7F9]">
          {/* Header */}
          <div className="bg-white border-b border-[#DDE3EC] px-[12px] py-[12px] rounded-t-[16px]">
            <div className="flex items-center gap-[10px]">
              <button
                onClick={() => navigate("/estudio/dashboards/recentes")}
                className="flex items-center justify-center bg-[#DDE3EC] rounded-[8px] shrink-0 size-[31px] text-[#28415C] hover:bg-[#C8CFD7] transition-colors cursor-pointer"
              >
                <ArrowLeft size={18} weight="bold" />
              </button>
              <div className="flex flex-col h-[30px] justify-end">
                <div className="text-[#64676C] uppercase h-[8px] flex items-center" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, ...ff }}>
                  DASH
                </div>
                <div className="flex items-center h-[20px]">
                  <p className="text-[#28415C] whitespace-nowrap" style={{ fontSize: 19, fontWeight: 700, letterSpacing: -0.5, ...ff }}>
                    {panelName}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center flex-1 gap-3">
            <Warning size={48} weight="duotone" className="text-[#98989D]" />
            <p className="text-[#122232]" style={{ fontSize: 15, fontWeight: 600, ...ff }}>
              Este Dash não possui itens
            </p>
            <button
              onClick={() => navigate("/estudio/dashboards/recentes")}
              className="flex items-center gap-2 h-[36px] px-4 rounded-full bg-[#0483AB] text-white hover:bg-[#025E7B] transition-colors mt-2 cursor-pointer"
              style={{ fontSize: 13, fontWeight: 600, ...ff }}
            >
              <ArrowLeft size={16} weight="bold" />
              Voltar
            </button>
          </div>
        </div>
      );
    }

    // Compute canvas max rows for proper height
    const maxRow = items.reduce((max, it) => Math.max(max, it.layout.y + it.layout.h), 0);

    return (
      <div className="flex flex-col h-screen bg-[#F6F7F9]">
        {/* ── View Header (Report-View style) ── */}
        <div className="bg-white border-b border-[#DDE3EC] px-[12px] py-[12px] rounded-t-[16px] shrink-0">
          <div className="flex items-center gap-[10px]">
            {/* Back */}
            <button
              onClick={() => navigate("/estudio/dashboards/recentes")}
              className="flex items-center justify-center bg-[#DDE3EC] rounded-[8px] shrink-0 size-[31px] text-[#28415C] hover:bg-[#C8CFD7] transition-colors cursor-pointer"
            >
              <Layout size={18} weight="duotone" />
            </button>

            {/* Title */}
            <div className="flex flex-col h-[30px] justify-end">
              <div
                className="text-[#64676C] uppercase h-[8px] flex items-center"
                style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, ...ff }}
              >
                DASH
              </div>
              <div className="flex items-center h-[20px]">
                <p
                  className="text-[#28415C] whitespace-nowrap"
                  style={{ fontSize: 19, fontWeight: 700, letterSpacing: -0.5, ...ff }}
                >
                  {panelName}
                </p>
              </div>
            </div>

            {/* Description */}
            {panelDesc && (
              <>
                <div className="w-[1.5px] h-[20px] bg-[#DDE3EC]" />
                <span className="text-[#4E6987] truncate max-w-[300px]" style={{ fontSize: 12, fontWeight: 500, letterSpacing: -0.2, ...ff }}>
                  {panelDesc}
                </span>
              </>
            )}

            {/* Spacer */}
            <div className="flex-1" />

            {/* Metadata */}
            <div className="flex items-center gap-[8px]">
              <span className="text-[#98989D]" style={{ fontSize: 11, fontWeight: 600, ...ff }}>
                {items.filter(i => i.type === "report").length} {items.filter(i => i.type === "report").length === 1 ? "planilha" : "planilhas"}
              </span>
              <span className="text-[#98989D]" style={{ fontSize: 11 }}>·</span>
              <span className="text-[#98989D]" style={{ fontSize: 11, fontWeight: 600, ...ff }}>
                {items.filter(i => i.type === "kpi").length} {items.filter(i => i.type === "kpi").length === 1 ? "widget" : "widgets"}
              </span>
              <span className="text-[#98989D]" style={{ fontSize: 11 }}>·</span>
              <span className="text-[#98989D]" style={{ fontSize: 11, fontWeight: 600, ...ff }}>
                {items.length} {items.length === 1 ? "item" : "itens"}
              </span>

              {/* Cross-filter clear */}
              {Object.keys(crossFilter).length > 0 && (
                <button
                  onClick={() => { setCrossFilter({}); setCrossFilterSourceId(null); }}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-[500px] bg-[#DCF0FF] text-[#0483AB] hover:bg-[#c5e5f7] transition-colors cursor-pointer"
                >
                  <FunnelSimple size={11} weight="bold" />
                  <span className="font-bold uppercase tracking-[0.3px]" style={{ fontSize: 9, ...ff }}>Limpar Filtro</span>
                  <X size={10} weight="bold" />
                </button>
              )}

              {/* Divider */}
              <div className="w-[1.5px] h-[20px] bg-[#DDE3EC]" />

              {/* Action Pill */}
              <div className="flex items-center gap-[10px] bg-[#F6F7F9] rounded-[100px] h-[44px] px-[5px]">
                <button
                  onClick={() => navigate(`/estudio/painel?id=${panelId}`)}
                  className="flex items-center justify-center size-[32px] rounded-full bg-transparent text-[#0483AB] hover:bg-[#DCF0FF] transition-colors cursor-pointer"
                  title="Editar"
                >
                  <PencilSimple size={18} weight="bold" />
                </button>
                <button
                  onClick={() => navigate("/estudio/dashboards/recentes")}
                  className="flex items-center justify-center size-[32px] rounded-full bg-transparent text-[#0483AB] hover:bg-[#DCF0FF] transition-colors cursor-pointer"
                  title="Fechar"
                >
                  <X size={18} weight="bold" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Read-only Canvas ── */}
        <div className="flex-1 overflow-auto">
          <div
            className="relative min-h-full p-6 bg-white"
            style={{
              ...(panelSize.type === "fixed"
                ? { width: panelSize.width, minHeight: panelSize.height, margin: "0 auto" }
                : {}),
            }}
          >
            <div
              className="grid gap-2"
              style={{
                gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
                gridAutoRows: `${GRID_ROW_H}px`,
              }}
            >
              <AnimatePresence>
              {items.filter(i => i.visible !== false && isDynamicVisible(i)).map((item) => {
                // Apply cross-filter
                const rawData = itemDataMap[item.id] || [];
                const data = (crossFilter && Object.keys(crossFilter).length > 0 && !item.useAsFilter)
                  ? rawData.filter((row: any) => Object.entries(crossFilter).every(([k, v]) => row[k] === v))
                  : rawData;

                const dynT = item.dynamicVisibility?.enabled ? item.dynamicVisibility.transition || "fade" : "fade";
                const variants = DYN_TRANSITION_VARIANTS[dynT];

                return (
                  <motion.div
                    key={item.id}
                    initial={variants.initial}
                    animate={variants.animate}
                    exit={variants.exit}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="rounded-[12px]"
                    style={{
                      gridColumn: `${item.layout.x + 1} / span ${item.layout.w}`,
                      gridRow: `${item.layout.y + 1} / span ${item.layout.h}`,
                      minHeight: item.layout.h * GRID_ROW_H,
                    }}
                  >
                    {/* ── Report widget (read-only) ── */}
                    {item.type === "report" && (
                      <div className={`h-full w-full flex flex-col rounded-[12px] bg-white border overflow-hidden transition-all duration-200 ${
                        crossFilterSourceId === item.id ? "border-[#07ABDE] ring-2 ring-[#07ABDE]/20 shadow-[0_0_12px_rgba(7,171,222,0.15)]" : "border-[#EEF1F6]"
                      }`}>
                        <div className="flex items-center gap-2 px-3 py-1.5 border-b border-[#EEF1F6]/60 shrink-0">
                          {(() => {
                            const pt = item.reportConfig
                              ? [...(item.reportConfig.rowShelf || []), ...(item.reportConfig.colShelf || [])].find(f => f.field?.table)?.field?.table
                              : null;
                            const m = pt ? TABLE_META[pt] : null;
                            return m ? (
                              <div className="flex items-center justify-center w-[18px] h-[18px] rounded-[5px] shrink-0" style={{ backgroundColor: m.bg }}>
                                <span style={{ color: m.color }}>{m.icon}</span>
                              </div>
                            ) : null;
                          })()}
                          <span className="text-[#122232] truncate" style={{ fontSize: 12, fontWeight: 700, letterSpacing: -0.3, ...ff }}>
                            {item.reportName || "Sem Título"}
                          </span>
                          {item.useAsFilter && (
                            <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-[#DCF0FF] text-[#0483AB] shrink-0" style={{ fontSize: 8, fontWeight: 700, letterSpacing: 0.3, ...ff }}>
                              <FunnelSimple size={8} weight="bold" /> FILTRO
                            </span>
                          )}
                          {crossFilterSourceId === item.id && (
                            <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-[#07ABDE] text-white shrink-0" style={{ fontSize: 8, fontWeight: 700, letterSpacing: 0.3, ...ff }}>
                              <Lightning size={8} weight="fill" /> ATIVO
                            </span>
                          )}
                        </div>
                        <div
                          className={`flex-1 min-h-0 p-2 overflow-hidden ${item.useAsFilter ? "cursor-pointer" : ""}`}
                          onClick={item.useAsFilter ? () => {
                            // Toggle: if already filtering from this source, clear; else set filter from first dimension value
                            if (crossFilterSourceId === item.id) {
                              setCrossFilter({});
                              setCrossFilterSourceId(null);
                            } else {
                              const cfg = item.reportConfig;
                              if (cfg) {
                                const dimField = [...(cfg.rowShelf || []), ...(cfg.colShelf || [])].find(f => f.field?.type === "dimension" || f.field?.type === "date");
                                if (dimField && data.length > 0) {
                                  setCrossFilter({ [dimField.field.name]: data[0][dimField.field.name] });
                                  setCrossFilterSourceId(item.id);
                                }
                              }
                            }
                          } : undefined}
                        >
                          {item.reportConfig ? (
                            <MiniChartRenderer data={data} config={item.reportConfig} />
                          ) : (
                            <div className="flex items-center justify-center h-full text-[#98989D]">
                              <Spinner size={20} className="animate-spin" />
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* ── Text widget (read-only) ── */}
                    {item.type === "text" && (
                      <div className="h-full w-full flex flex-col rounded-[12px] bg-white border border-[#EEF1F6]">
                        <div className="flex-1 p-3 overflow-auto">
                          <p className="text-[#122232] whitespace-pre-wrap" style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3, lineHeight: "20px", ...ff }}>
                            {item.content || ""}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* ── Image widget (read-only) ── */}
                    {item.type === "image" && (
                      <div className="h-full w-full flex items-center justify-center rounded-[12px] bg-white border border-[#EEF1F6] p-3">
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt="" className="max-w-full max-h-full object-contain rounded-[8px]" />
                        ) : (
                          <ImageIcon size={32} weight="duotone" className="text-[#C8CFDB]" />
                        )}
                      </div>
                    )}

                    {/* ── Navigation widget (read-only) ── */}
                    {item.type === "navigation" && (
                      <div className="h-full w-full flex items-center justify-center rounded-[12px] bg-white border border-[#EEF1F6]">
                        <button
                          onClick={() => item.navTarget && navigate(item.navTarget)}
                          className="flex items-center gap-2 px-4 py-2 rounded-[500px] bg-[#DCF0FF] text-[#0483AB] hover:bg-[#c5e5f7] transition-colors cursor-pointer"
                        >
                          <NavigationArrow size={14} weight="bold" />
                          <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...ff }}>
                            {item.navLabel || "Navegar"}
                          </span>
                        </button>
                      </div>
                    )}

                    {/* ── KPI Widget (read-only) ── */}
                    {item.type === "kpi" && item.widgetConfig && (
                      <div className="h-full w-full flex flex-col rounded-[12px] bg-white border border-[#EEF1F6] overflow-hidden">
                        <div className="flex-1 overflow-hidden">
                          {item.widgetConfig.primaryField ? (
                            <KpiWidgetRenderer config={item.widgetConfig} data={data} />
                          ) : (
                            <div className="h-full flex items-center justify-center text-[#C8CFDB]">
                              <Atom size={24} weight="duotone" />
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* ── Blank spacer (read-only) ── */}
                    {item.type === "blank" && (
                      <div className="h-full w-full" />
                    )}
                  </motion.div>
                );
              })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════════ */
  /*  RENDER (Editor Mode)                                       */
  /* ═══════════════════════════════════════════════════════════ */

  return (
    <div className="flex flex-col h-screen">
      {/* ── Toolbar ── */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-4 py-2 bg-white border-b border-[#EEF1F6] shrink-0 rounded-t-[16px]">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-[28px] h-[28px] rounded-[10px] bg-[#DDE3EC]">
            <Layout size={14} weight="duotone" className="text-[#28415C]" />
          </div>
          <input
            value={panelName}
            onChange={(e) => setPanelName(e.target.value)}
            className="text-[#122232] bg-transparent border-none outline-none hover:bg-[#F6F7F9] focus:bg-[#F6F7F9] px-2 py-1 rounded-[8px] transition-colors"
            style={{ fontSize: 15, fontWeight: 700, letterSpacing: -0.5, ...ff }}
          />
          <span
            className="text-[#98989D] hidden sm:inline"
            style={{ fontSize: 11, fontWeight: 500, ...ff }}
          >
            {items.length} {items.length === 1 ? "item" : "itens"}
          </span>
          {Object.keys(crossFilter).length > 0 && (
            <button
              onClick={() => { setCrossFilter({}); setCrossFilterSourceId(null); }}
              className="flex items-center gap-1 px-2.5 py-1 rounded-[500px] bg-[#DCF0FF] text-[#0483AB] hover:bg-[#c5e5f7] transition-colors cursor-pointer ml-2"
            >
              <FunnelSimple size={11} weight="bold" />
              <span className="font-bold uppercase tracking-[0.3px]" style={{ fontSize: 9, ...ff }}>Limpar Filtro</span>
              <X size={10} weight="bold" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-[10px] bg-[#F6F7F9] rounded-[100px] h-[44px] px-[5px]">
          <button
            onClick={() => setSaveModal(true)}
            className="flex items-center justify-center size-[32px] rounded-full bg-transparent text-[#0483AB] hover:bg-[#DCF0FF] transition-colors cursor-pointer"
            title="Salvar"
          >
            <FloppyDisk size={18} weight="bold" />
          </button>
          <button
            onClick={fetchReports}
            className="flex items-center justify-center size-[32px] rounded-full bg-transparent text-[#0483AB] hover:bg-[#DCF0FF] transition-colors cursor-pointer"
            title="Atualizar Planilhas"
          >
            <ArrowsClockwise size={18} weight="bold" />
          </button>
          <button
            onClick={resetAll}
            className="flex items-center justify-center size-[32px] rounded-full bg-transparent text-[#0483AB] hover:bg-[#DCF0FF] transition-colors cursor-pointer"
            title="Limpar"
          >
            <Broom size={18} weight="bold" />
          </button>
          <button
            onClick={() => {
              if (window.history.length > 1) navigate(-1);
              else navigate("/estudio/dashboards/recentes");
            }}
            className="flex items-center justify-center size-[32px] rounded-full bg-transparent text-[#0483AB] hover:bg-[#DCF0FF] transition-colors cursor-pointer"
            title="Fechar"
          >
            <X size={18} weight="bold" />
          </button>
        </div>
      </div>

      {/* ── Main Area ── */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* ── LEFT SIDEBAR ── */}
        <div className="w-[240px] min-w-[240px] bg-white border-r border-[#EEF1F6] flex flex-col overflow-hidden">
          {/* Tabs */}
          <div className="relative flex items-center gap-[4px] h-[44px] p-[4px] bg-[#F6F7F9] rounded-[100px] w-[216px] ml-3 my-2">
            <div
              className="absolute inset-0 pointer-events-none rounded-[inherit]"
              style={{
                boxShadow: "inset 0px -0.5px 1px 0px rgba(255,255,255,0.3), inset 0px -0.5px 1px 0px rgba(255,255,255,0.25), inset 1px 1.5px 4px 0px rgba(0,0,0,0.08), inset 1px 1.5px 4px 0px rgba(0,0,0,0.1)",
              }}
            />
            {(["planilhas", "dash"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setSidebarTab(tab)}
                className={`relative flex-1 flex items-center justify-center gap-[3px] h-[36px] rounded-[100px] transition-all cursor-pointer ${
                  sidebarTab === tab
                    ? "text-[#F6F7F9]"
                    : "text-[#98989d] hover:text-[#4E6987] hover:bg-[#e8eaee]"
                }`}
              >
                {sidebarTab === tab && (
                  <>
                    <div className="absolute inset-0 bg-[#28415c] rounded-[20px] backdrop-blur-[50px]" />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 pointer-events-none rounded-[20px] border-[0.5px] border-solid border-[rgba(200,207,219,0.6)]"
                      style={{ boxShadow: "0px 2px 4px 0px rgba(18,34,50,0.3)" }}
                    />
                  </>
                )}
                {tab === "planilhas" ? <Table size={13} weight={sidebarTab === tab ? "fill" : "regular"} className="relative z-[1]" /> : <SquaresFour size={13} weight={sidebarTab === tab ? "fill" : "regular"} className="relative z-[1]" />}
                <span className="relative z-[1] uppercase tracking-[0.5px]" style={{ fontSize: 10, fontWeight: 700, ...ff }}>
                  {tab === "planilhas" ? "Planilhas" : "Dash"}
                </span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto px-2 pb-3">
            {sidebarTab === "planilhas" ? (
              /* ── Planilhas Tab ── */
              <div className="flex flex-col gap-1">
                {/* Search */}
                <div
                  className="relative flex items-center gap-[10px] h-[40px] px-[14px] rounded-full bg-[#DDE3EC] mb-1 mx-1"
                  style={{ boxShadow: "inset 0px 1px 3px 0px rgba(0,0,0,0.1), inset 0px 1px 2px 0px rgba(0,0,0,0.06)" }}
                >
                  <MagnifyingGlass size={16} weight="bold" className="text-[#98989d] shrink-0" />
                  <input
                    value={reportSearch}
                    onChange={(e) => setReportSearch(e.target.value)}
                    placeholder="Buscar planilhas..."
                    className="flex-1 bg-transparent outline-none text-[#28415c] placeholder:text-[#c8cfdb]"
                    style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3, ...ff }}
                  />
                </div>

                {loadingReports ? (
                  <div className="flex items-center justify-center py-8">
                    <Spinner size={20} className="animate-spin text-[#0483AB]" />
                  </div>
                ) : filteredReports.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 gap-2 text-[#98989D]">
                    <Table size={28} weight="duotone" />
                    <span style={{ fontSize: 11, fontWeight: 500, ...ff }}>
                      {reportSearch ? "Nenhuma planilha encontrada" : "Nenhuma planilha salva"}
                    </span>
                    <span className="text-center px-4" style={{ fontSize: 10, ...ff }}>
                      Crie planilhas no Visual Builder e salve como relatório
                    </span>
                  </div>
                ) : (
                  filteredReports.map((r) => <DraggableReport key={r.id} report={r} />)
                )}
              </div>
            ) : (
              /* ── Dash Tab ── */
              <div className="flex flex-col gap-2">
                {/* Size Settings */}
                <div>
                  <button
                    onClick={() => setSizeCollapsed(!sizeCollapsed)}
                    className="w-full flex items-center gap-1.5 px-2 py-1.5 cursor-pointer"
                  >
                    {sizeCollapsed ? <CaretRight size={11} weight="bold" className="text-[#98989D]" /> : <CaretDown size={11} weight="bold" className="text-[#98989D]" />}
                    <span className="text-[#98989D] uppercase" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.5, ...ff }}>
                      Tamanho
                    </span>
                  </button>
                  {!sizeCollapsed && (
                    <div className="px-2 flex flex-col gap-2">
                      {/* Type selector */}
                      <div className="flex gap-1">
                        {(["auto", "fixed", "range"] as const).map((t) => (
                          <button
                            key={t}
                            onClick={() => setPanelSize((prev) => ({ ...prev, type: t }))}
                            className={`flex-1 h-[28px] rounded-[8px] transition-colors cursor-pointer ${
                              panelSize.type === t
                                ? "bg-[#DCF0FF] text-[#0483AB]"
                                : "bg-[#F6F7F9] text-[#4E6987] hover:bg-[#EEF1F6]"
                            }`}
                          >
                            <span className="font-bold uppercase tracking-[0.3px]" style={{ fontSize: 9, ...ff }}>
                              {t === "auto" ? "Auto" : t === "fixed" ? "Fixo" : "Range"}
                            </span>
                          </button>
                        ))}
                      </div>
                      {/* Size presets */}
                      {panelSize.type === "fixed" && (
                        <div className="flex flex-col gap-1">
                          {SIZE_PRESETS.map((p) => (
                            <button
                              key={p.label}
                              onClick={() => setPanelSize((prev) => ({ ...prev, width: p.w, height: p.h }))}
                              className={`flex items-center justify-between px-2.5 py-1.5 rounded-[8px] transition-colors cursor-pointer ${
                                panelSize.width === p.w && panelSize.height === p.h
                                  ? "bg-[#DCF0FF] text-[#0483AB]"
                                  : "hover:bg-[#F6F7F9] text-[#4E6987]"
                              }`}
                            >
                              <span style={{ fontSize: 11, fontWeight: 600, ...ff }}>{p.label}</span>
                              <span className="font-mono text-[#98989D]" style={{ fontSize: 10 }}>
                                {p.w}×{p.h}
                              </span>
                            </button>
                          ))}
                          {/* Custom size inputs */}
                          <div className="flex gap-2 mt-1">
                            <div className="flex-1">
                              <label className="text-[#98989D] uppercase block mb-0.5" style={{ fontSize: 8, fontWeight: 700, letterSpacing: 0.3, ...ff }}>
                                Largura
                              </label>
                              <input
                                type="number"
                                value={panelSize.width}
                                onChange={(e) => setPanelSize((prev) => ({ ...prev, width: +e.target.value }))}
                                className="w-full h-[28px] px-2 rounded-[6px] bg-[#F6F7F9] border-none outline-none text-[#122232] text-center"
                                style={{ fontSize: 11, ...ff }}
                              />
                            </div>
                            <div className="flex-1">
                              <label className="text-[#98989D] uppercase block mb-0.5" style={{ fontSize: 8, fontWeight: 700, letterSpacing: 0.3, ...ff }}>
                                Altura
                              </label>
                              <input
                                type="number"
                                value={panelSize.height}
                                onChange={(e) => setPanelSize((prev) => ({ ...prev, height: +e.target.value }))}
                                className="w-full h-[28px] px-2 rounded-[6px] bg-[#F6F7F9] border-none outline-none text-[#122232] text-center"
                                style={{ fontSize: 11, ...ff }}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className="h-px bg-[#EEF1F6] mx-2" />

                {/* Objects Section */}
                <div>
                  <button
                    onClick={() => setObjectsCollapsed(!objectsCollapsed)}
                    className="w-full flex items-center gap-1.5 px-2 py-1.5 cursor-pointer"
                  >
                    {objectsCollapsed ? <CaretRight size={11} weight="bold" className="text-[#98989D]" /> : <CaretDown size={11} weight="bold" className="text-[#98989D]" />}
                    <span className="text-[#98989D] uppercase" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.5, ...ff }}>
                      Objetos
                    </span>
                  </button>
                  {!objectsCollapsed && (
                    <div className="flex flex-col gap-0.5">
                      <DraggableObject type="text" label="Texto" icon={<TextT size={13} weight="bold" />} />
                      <DraggableObject type="image" label="Imagem" icon={<ImageIcon size={13} weight="bold" />} />
                      <DraggableObject type="blank" label="Espaçador" icon={<Rows size={13} weight="bold" />} />
                      <DraggableObject type="navigation" label="Navegação" icon={<NavigationArrow size={13} weight="bold" />} />
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className="h-px bg-[#EEF1F6] mx-2" />

                {/* Widgets Section */}
                <div>
                  <button
                    onClick={() => setWidgetsCollapsed(!widgetsCollapsed)}
                    className="w-full flex items-center gap-1.5 px-2 py-1.5 cursor-pointer"
                  >
                    {widgetsCollapsed ? <CaretRight size={11} weight="bold" className="text-[#98989D]" /> : <CaretDown size={11} weight="bold" className="text-[#98989D]" />}
                    <span className="text-[#98989D] uppercase" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.5, ...ff }}>
                      Widgets
                    </span>
                  </button>
                  {!widgetsCollapsed && (
                    <div className="px-1">
                      <div className="grid grid-cols-2 gap-1">
                        {WIDGET_VARIANTS.map(v => (
                          <DraggableWidget key={v.id} variant={v} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className="h-px bg-[#EEF1F6] mx-2" />

                {/* Info Section */}
                <div className="px-3 py-2">
                  <div className="flex items-start gap-2 p-2.5 rounded-[10px] bg-[#F6F7F9]">
                    <Info size={14} weight="fill" className="text-[#0483AB] shrink-0 mt-0.5" />
                    <p className="text-[#4E6987]" style={{ fontSize: 10, fontWeight: 500, lineHeight: "14px", ...ff }}>
                      Arraste planilhas e objetos para o canvas à direita. Use "Usar como Filtro" para cross-filtering entre visualizações.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── CANVAS ── */}
        <div className="flex-1 overflow-auto bg-[#F0F2F5]">
          <div
            ref={(node) => {
              canvasDrop(node);
              (canvasRef as any).current = node;
            }}
            className={`relative min-h-full p-6 transition-colors ${
              isOver ? "bg-[#DCF0FF]/20" : "bg-[#F6F7F9]"
            }`}
            style={{
              backgroundImage: "radial-gradient(circle, #C8CFDB 1px, transparent 1px)",
              backgroundSize: `${100 / GRID_COLS}% ${GRID_ROW_H}px`,
              backgroundPosition: "12px 12px",
              ...(panelSize.type === "fixed"
                ? { width: panelSize.width, minHeight: panelSize.height, margin: "0 auto" }
                : {}),
            }}
          >
            {items.length === 0 ? (
              /* ── Empty state ── */
              <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] gap-4">
                <div className="w-[80px] h-[80px] rounded-[20px] bg-white flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
                  <Presentation size={36} weight="duotone" className="text-[#0483AB]" />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <h3 className="text-[#122232]" style={{ fontSize: 18, fontWeight: 700, letterSpacing: -0.5, ...ff }}>
                    Crie seu Dash
                  </h3>
                  <p className="text-[#4E6987] text-center max-w-[300px]" style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3, ...ff }}>
                    Arraste planilhas da barra lateral para compor seu dashboard com múltiplas visualizações
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F6F7F9] text-[#98989D]" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, ...ff }}>
                    <Table size={12} weight="bold" /> PLANILHAS
                  </span>
                  <span className="text-[#C8CFDB]" style={{ fontSize: 12 }}>→</span>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#DCF0FF] text-[#0483AB]" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, ...ff }}>
                    <Presentation size={12} weight="bold" /> CANVAS
                  </span>
                </div>
              </div>
            ) : (
              /* ── Grid of items ── */
              <div
                className="grid gap-2"
                style={{
                  gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
                  gridAutoRows: `${GRID_ROW_H}px`,
                }}
              >
                {items.map((item) => {
                  const isSelected = selectedItemId === item.id;
                  const isMoving = moving === item.id;
                  const dynVisible = isDynamicVisible(item);
                  const hasDynRule = item.dynamicVisibility?.enabled;
                  return (
                    <div
                      key={item.id}
                      className={`relative group rounded-[12px] transition-all duration-200 ${
                        isSelected ? "ring-2 ring-[#07ABDE] shadow-[0_0_0_1px_rgba(7,171,222,0.2)]" : ""
                      } ${isMoving ? "opacity-80 z-50" : ""} ${hasDynRule && !dynVisible ? "opacity-40" : ""}`}
                      style={{
                        gridColumn: `${item.layout.x + 1} / span ${item.layout.w}`,
                        gridRow: `${item.layout.y + 1} / span ${item.layout.h}`,
                        minHeight: item.layout.h * GRID_ROW_H,
                      }}
                    >
                      {/* Dynamic visibility ghost overlay */}
                      {hasDynRule && !dynVisible && (
                        <div className="absolute inset-0 z-30 rounded-[12px] border-2 border-dashed border-[#07ABDE]/30 bg-[#F0FAFF]/40 flex items-center justify-center pointer-events-none">
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 shadow-sm border border-[#DDE3EC]">
                            <EyeSlash size={12} weight="bold" className="text-[#07ABDE]" />
                            <span className="text-[#4E6987]" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.3, ...ff }}>ZONA DINÂMICA</span>
                          </div>
                        </div>
                      )}
                      {/* Drag-to-move bar */}
                      <div
                        className="absolute top-0 left-0 right-0 h-5 z-20 flex items-center justify-center cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
                        onMouseDown={(e) => { e.stopPropagation(); handleMoveStart(item.id, e); }}
                      >
                        <div className="flex items-center gap-0.5 px-2 py-0.5 rounded-b-[6px] bg-[#122232]/60 backdrop-blur-sm">
                          <svg width="12" height="4" viewBox="0 0 12 4" fill="none">
                            <circle cx="2" cy="2" r="1" fill="white" opacity="0.8" />
                            <circle cx="6" cy="2" r="1" fill="white" opacity="0.8" />
                            <circle cx="10" cy="2" r="1" fill="white" opacity="0.8" />
                          </svg>
                        </div>
                      </div>
                      <PanelWidget
                        item={item}
                        data={itemDataMap[item.id] || []}
                        isSelected={isSelected}
                        onSelect={() => setSelectedItemId(item.id)}
                        onRemove={() => removeItem(item.id)}
                        onToggleFilter={() => toggleFilter(item.id)}
                        onToggleVisibility={() => toggleVisibility(item.id)}
                        onDuplicate={() => duplicateItem(item.id)}
                        onUpdateContent={(c) => updateItemContent(item.id, c)}
                        onUpdateImageUrl={(url) => updateItemImageUrl(item.id, url)}
                        onUpdateNavTarget={(target, label) => updateItemNavTarget(item.id, target, label)}
                        onEditWidget={item.type === "kpi" ? () => setEditingWidgetId(item.id) : undefined}
                        crossFilterValue={item.useAsFilter ? undefined : crossFilter}
                        onCrossFilterClick={item.useAsFilter ? (filterData) => { setCrossFilter(filterData); setCrossFilterSourceId(item.id); } : undefined}
                      />
                      {/* Resize Handle SE */}
                      <div
                        className="absolute bottom-0 right-0 w-5 h-5 cursor-se-resize opacity-0 group-hover:opacity-100 transition-opacity z-20"
                        onMouseDown={(e) => { e.stopPropagation(); handleResizeStart(item.id, e); }}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M14 2L2 14" stroke="#0483AB" strokeWidth="1.5" strokeLinecap="round" />
                          <path d="M14 6L6 14" stroke="#0483AB" strokeWidth="1.5" strokeLinecap="round" />
                          <path d="M14 10L10 14" stroke="#0483AB" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </div>
                      {/* Width indicator on hover */}
                      {isSelected && (
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-[#122232]/80 text-white whitespace-nowrap z-30"
                          style={{ fontSize: 9, fontWeight: 600, ...ff }}>
                          {item.layout.w}/{GRID_COLS} col · {item.layout.h} row
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Drop indicator */}
            {isOver && items.length > 0 && (
              <div className="absolute inset-0 pointer-events-none border-2 border-dashed border-[#0483AB]/30 rounded-[12px]" />
            )}
          </div>
        </div>

        {/* ── RIGHT SIDEBAR: Layout Tree ── */}
        <AnimatePresence>
          {rightSidebarOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 220, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="bg-white border-l border-[#EEF1F6] flex flex-col overflow-hidden"
            >
              <div className="flex items-center justify-between px-3 py-2.5 border-b border-[#EEF1F6]">
                <div className="flex items-center gap-1.5">
                  <TreeStructure size={13} weight="bold" className="text-[#0483AB]" />
                  <span className="text-[#122232]" style={{ fontSize: 12, fontWeight: 700, letterSpacing: -0.3, ...ff }}>
                    Layout
                  </span>
                </div>
                <button
                  onClick={() => setRightSidebarOpen(false)}
                  className="p-1 rounded hover:bg-[#F6F7F9] text-[#98989D] cursor-pointer"
                >
                  <X size={12} weight="bold" />
                </button>
              </div>

              {/* Panel info */}
              <div className="px-3 py-2 border-b border-[#EEF1F6]/50">
                <span className="text-[#98989D] uppercase block mb-1" style={{ fontSize: 8, fontWeight: 700, letterSpacing: 0.5, ...ff }}>
                  Dash
                </span>
                <span className="text-[#122232] block truncate" style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.3, ...ff }}>
                  {panelName}
                </span>
                <span className="text-[#98989D] font-mono" style={{ fontSize: 9 }}>
                  {panelSize.type === "fixed" ? `${panelSize.width}×${panelSize.height}` : panelSize.type === "auto" ? "Automático" : "Range"}
                </span>
              </div>

              {/* Items tree */}
              <div className="flex-1 overflow-y-auto px-1 py-2">
                <LayoutTree
                  items={items}
                  selectedId={selectedItemId}
                  onSelect={setSelectedItemId}
                  onRemove={removeItem}
                  onToggleVisibility={toggleVisibility}
                />
              </div>

              {/* ── Parameters Manager ── */}
              {parameters.length > 0 && (
                <div className="border-t border-[#EEF1F6] px-3 py-2">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[#98989D] uppercase flex items-center gap-1" style={{ fontSize: 8, fontWeight: 700, letterSpacing: 0.5, ...ff }}>
                      <Atom size={9} weight="fill" /> Parâmetros
                    </span>
                    <span className="text-[#98989D] font-mono" style={{ fontSize: 8 }}>{parameters.length}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    {parameters.map(p => (
                      <div key={p.id} className="flex items-center gap-1.5 px-2 py-1 rounded-[6px] bg-[#FAFBFC] border border-[#EEF1F6]">
                        <button
                          onClick={() => setParameters(prev => prev.map(pp => pp.id === p.id ? { ...pp, currentValue: !pp.currentValue } : pp))}
                          className={`w-[14px] h-[14px] rounded-[3px] flex items-center justify-center shrink-0 cursor-pointer transition-colors ${
                            p.currentValue ? "bg-[#07ABDE] text-white" : "bg-[#DDE3EC] text-transparent"
                          }`}
                        >
                          <Check size={8} weight="bold" />
                        </button>
                        <span className="flex-1 text-[#122232] truncate" style={{ fontSize: 10, fontWeight: 600, ...ff }}>{p.name}</span>
                        <span className={`px-1 py-0.5 rounded-[3px] ${p.currentValue ? "bg-[#D1FAE5] text-[#065F46]" : "bg-[#FEE2E2] text-[#991B1B]"}`} style={{ fontSize: 7, fontWeight: 800, ...ff }}>
                          {p.currentValue ? "T" : "F"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Selected item properties */}
              {selectedItemId && (() => {
                const sel = items.find((i) => i.id === selectedItemId);
                if (!sel) return null;
                return (
                  <div className="border-t border-[#EEF1F6] px-3 py-2.5">
                    <span className="text-[#98989D] uppercase block mb-2" style={{ fontSize: 8, fontWeight: 700, letterSpacing: 0.5, ...ff }}>
                      Propriedades
                    </span>
                    <div className="flex flex-col gap-1.5">
                      {/* Quick size presets */}
                      <div className="flex flex-wrap gap-1 mb-1">
                        {[
                          { label: "Full", w: 12 },
                          { label: "1/2", w: 6 },
                          { label: "1/3", w: 4 },
                          { label: "1/4", w: 3 },
                          { label: "2/3", w: 8 },
                          { label: "1/6", w: 2 },
                        ].map((p) => (
                          <button
                            key={p.label}
                            onClick={() => updateItemLayout(sel.id, { w: p.w })}
                            className={`px-1.5 py-0.5 rounded-[4px] text-center transition-all cursor-pointer ${
                              sel.layout.w === p.w
                                ? "bg-[#07ABDE] text-white"
                                : "bg-[#F6F7F9] text-[#4E6987] hover:bg-[#E8ECF1]"
                            }`}
                            style={{ fontSize: 9, fontWeight: 600, ...ff }}
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <label className="text-[#98989D] block mb-0.5" style={{ fontSize: 8, fontWeight: 600, ...ff }}>X</label>
                          <input
                            type="number"
                            value={sel.layout.x}
                            min={0}
                            max={GRID_COLS - sel.layout.w}
                            onChange={(e) => updateItemLayout(sel.id, { x: +e.target.value })}
                            className="w-full h-[24px] px-1.5 rounded-[5px] bg-[#F6F7F9] border-none outline-none text-center text-[#122232]"
                            style={{ fontSize: 10, ...ff }}
                          />
                        </div>
                        <div className="flex-1">
                          <label className="text-[#98989D] block mb-0.5" style={{ fontSize: 8, fontWeight: 600, ...ff }}>Y</label>
                          <input
                            type="number"
                            value={sel.layout.y}
                            min={0}
                            onChange={(e) => updateItemLayout(sel.id, { y: +e.target.value })}
                            className="w-full h-[24px] px-1.5 rounded-[5px] bg-[#F6F7F9] border-none outline-none text-center text-[#122232]"
                            style={{ fontSize: 10, ...ff }}
                          />
                        </div>
                        <div className="flex-1">
                          <label className="text-[#98989D] block mb-0.5" style={{ fontSize: 8, fontWeight: 600, ...ff }}>W</label>
                          <input
                            type="number"
                            value={sel.layout.w}
                            min={1}
                            max={GRID_COLS}
                            onChange={(e) => updateItemLayout(sel.id, { w: +e.target.value })}
                            className="w-full h-[24px] px-1.5 rounded-[5px] bg-[#F6F7F9] border-none outline-none text-center text-[#122232]"
                            style={{ fontSize: 10, ...ff }}
                          />
                        </div>
                        <div className="flex-1">
                          <label className="text-[#98989D] block mb-0.5" style={{ fontSize: 8, fontWeight: 600, ...ff }}>H</label>
                          <input
                            type="number"
                            value={sel.layout.h}
                            min={1}
                            onChange={(e) => updateItemLayout(sel.id, { h: +e.target.value })}
                            className="w-full h-[24px] px-1.5 rounded-[5px] bg-[#F6F7F9] border-none outline-none text-center text-[#122232]"
                            style={{ fontSize: 10, ...ff }}
                          />
                        </div>
                      </div>

                      {/* ── Dynamic Zone Visibility ── */}
                      <div className="mt-3 pt-2.5 border-t border-[#EEF1F6]">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[#98989D] uppercase" style={{ fontSize: 8, fontWeight: 700, letterSpacing: 0.5, ...ff }}>
                            Visibilidade Dinâmica
                          </span>
                          <button
                            onClick={() => {
                              setItems(prev => prev.map(i => i.id === sel.id ? {
                                ...i,
                                dynamicVisibility: i.dynamicVisibility?.enabled
                                  ? { ...i.dynamicVisibility, enabled: false }
                                  : { enabled: true, sourceItemIds: [], logicOperator: "or" as const, condition: "showOnFilter" as const, transition: "fade" as DynTransition }
                              } : i));
                            }}
                            className={`relative w-[28px] h-[16px] rounded-full transition-colors cursor-pointer ${
                              sel.dynamicVisibility?.enabled ? "bg-[#07ABDE]" : "bg-[#DDE3EC]"
                            }`}
                          >
                            <div className={`absolute top-[2px] w-[12px] h-[12px] rounded-full bg-white shadow-sm transition-transform ${
                              sel.dynamicVisibility?.enabled ? "left-[14px]" : "left-[2px]"
                            }`} />
                          </button>
                        </div>

                        {sel.dynamicVisibility?.enabled && (() => {
                          const dv = sel.dynamicVisibility;
                          const filterSources = items.filter(i => i.id !== sel.id && i.useAsFilter && i.type === "report");
                          const updateDV = (patch: Partial<typeof dv>) =>
                            setItems(prev => prev.map(i => i.id === sel.id
                              ? { ...i, dynamicVisibility: { ...i.dynamicVisibility!, ...patch } }
                              : i));

                          return (
                          <div className="flex flex-col gap-2.5">
                            {/* Condition */}
                            <div>
                              <label className="text-[#98989D] block mb-1" style={{ fontSize: 8, fontWeight: 600, ...ff }}>Condição</label>
                              <div className="flex gap-1">
                                {([
                                  { value: "showOnFilter" as const, label: "Mostrar", icon: <Eye size={10} weight="bold" /> },
                                  { value: "hideOnFilter" as const, label: "Ocultar", icon: <EyeSlash size={10} weight="bold" /> },
                                ] as const).map(opt => (
                                  <button
                                    key={opt.value}
                                    onClick={() => updateDV({ condition: opt.value })}
                                    className={`flex-1 flex items-center justify-center gap-1 py-1 rounded-[5px] transition-all cursor-pointer ${
                                      dv.condition === opt.value
                                        ? "bg-[#07ABDE] text-white"
                                        : "bg-[#F6F7F9] text-[#4E6987] hover:bg-[#E8ECF1]"
                                    }`}
                                    style={{ fontSize: 9, fontWeight: 600, ...ff }}
                                  >
                                    {opt.icon} {opt.label}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Source Items (multi-select chips) */}
                            <div>
                              <label className="text-[#98989D] block mb-1" style={{ fontSize: 8, fontWeight: 600, ...ff }}>
                                Fontes de filtro
                              </label>
                              {/* Selected chips */}
                              {(dv.sourceItemIds || []).length > 0 && (
                                <div className="flex flex-wrap gap-1 mb-1.5">
                                  {(dv.sourceItemIds || []).map(sid => {
                                    const src = items.find(i => i.id === sid);
                                    return (
                                      <span key={sid} className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-[5px] bg-[#DCF0FF] text-[#0483AB]" style={{ fontSize: 9, fontWeight: 600, ...ff }}>
                                        {src?.reportName || sid.slice(0, 8)}
                                        <button
                                          onClick={() => updateDV({ sourceItemIds: (dv.sourceItemIds || []).filter(s => s !== sid) })}
                                          className="hover:text-[#F56233] cursor-pointer"
                                        >
                                          <X size={8} weight="bold" />
                                        </button>
                                      </span>
                                    );
                                  })}
                                </div>
                              )}
                              {/* Add source dropdown */}
                              <select
                                value=""
                                onChange={(e) => {
                                  if (e.target.value) {
                                    updateDV({ sourceItemIds: [...(dv.sourceItemIds || []), e.target.value] });
                                  }
                                }}
                                className="w-full h-[26px] px-1.5 rounded-[5px] bg-[#F6F7F9] border border-[#EEF1F6] outline-none text-[#122232] cursor-pointer appearance-none"
                                style={{ fontSize: 10, fontWeight: 500, ...ff }}
                              >
                                <option value="">+ Adicionar fonte...</option>
                                {filterSources.filter(i => !(dv.sourceItemIds || []).includes(i.id)).map(i => (
                                  <option key={i.id} value={i.id}>{i.reportName || i.id}</option>
                                ))}
                              </select>
                              {filterSources.length === 0 && (
                                <span className="text-[#EAC23D] block mt-1" style={{ fontSize: 8, fontWeight: 600, ...ff }}>
                                  <Warning size={9} weight="fill" className="inline mr-0.5" />
                                  Nenhum item com "Usar como Filtro" ativo
                                </span>
                              )}
                            </div>

                            {/* Logic Operator (OR / AND) — only show when 2+ sources */}
                            {(dv.sourceItemIds || []).length >= 2 && (
                              <div>
                                <label className="text-[#98989D] block mb-1" style={{ fontSize: 8, fontWeight: 600, ...ff }}>Operador Lógico</label>
                                <div className="flex gap-1">
                                  {([
                                    { value: "or" as const, label: "OU", desc: "Qualquer fonte" },
                                    { value: "and" as const, label: "E", desc: "Todas as fontes" },
                                  ]).map(op => (
                                    <button
                                      key={op.value}
                                      onClick={() => updateDV({ logicOperator: op.value })}
                                      className={`flex-1 flex flex-col items-center py-1.5 rounded-[5px] transition-all cursor-pointer ${
                                        dv.logicOperator === op.value
                                          ? "bg-[#07ABDE] text-white"
                                          : "bg-[#F6F7F9] text-[#4E6987] hover:bg-[#E8ECF1]"
                                      }`}
                                    >
                                      <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 0.5, ...ff }}>{op.label}</span>
                                      <span style={{ fontSize: 7, fontWeight: 500, opacity: 0.7, ...ff }}>{op.desc}</span>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Parameter Action (optional) */}
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <label className="text-[#98989D]" style={{ fontSize: 8, fontWeight: 600, ...ff }}>Parâmetro (opcional)</label>
                                <button
                                  onClick={() => {
                                    const id = `param_${Date.now()}`;
                                    const name = `Parâmetro ${parameters.length + 1}`;
                                    setParameters(prev => [...prev, { id, name, defaultValue: false, currentValue: false }]);
                                    updateDV({ parameterId: id });
                                  }}
                                  className="text-[#07ABDE] hover:text-[#0483AB] cursor-pointer"
                                  style={{ fontSize: 8, fontWeight: 700, ...ff }}
                                >
                                  + Criar
                                </button>
                              </div>
                              <select
                                value={dv.parameterId || ""}
                                onChange={(e) => updateDV({ parameterId: e.target.value || undefined })}
                                className="w-full h-[26px] px-1.5 rounded-[5px] bg-[#F6F7F9] border border-[#EEF1F6] outline-none text-[#122232] cursor-pointer appearance-none"
                                style={{ fontSize: 10, fontWeight: 500, ...ff }}
                              >
                                <option value="">Sem parâmetro (filtro direto)</option>
                                {parameters.map(p => (
                                  <option key={p.id} value={p.id}>{p.name}</option>
                                ))}
                              </select>
                              {dv.parameterId && (() => {
                                const param = parameters.find(p => p.id === dv.parameterId);
                                if (!param) return null;
                                return (
                                  <div className="mt-1.5 p-2 rounded-[6px] bg-[#FAFBFC] border border-[#EEF1F6]">
                                    <div className="flex items-center justify-between mb-1">
                                      <input
                                        value={param.name}
                                        onChange={(e) => setParameters(prev => prev.map(p => p.id === param.id ? { ...p, name: e.target.value } : p))}
                                        className="flex-1 bg-transparent outline-none text-[#122232]"
                                        style={{ fontSize: 10, fontWeight: 600, ...ff }}
                                      />
                                      <button
                                        onClick={() => {
                                          setParameters(prev => prev.filter(p => p.id !== param.id));
                                          updateDV({ parameterId: undefined });
                                        }}
                                        className="text-[#98989D] hover:text-[#F56233] cursor-pointer ml-1"
                                      >
                                        <Trash size={10} weight="bold" />
                                      </button>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-[#98989D]" style={{ fontSize: 8, fontWeight: 600, ...ff }}>Default:</span>
                                      <button
                                        onClick={() => setParameters(prev => prev.map(p => p.id === param.id ? { ...p, defaultValue: !p.defaultValue } : p))}
                                        className={`px-2 py-0.5 rounded-[4px] cursor-pointer ${param.defaultValue ? "bg-[#07ABDE] text-white" : "bg-[#F6F7F9] text-[#4E6987]"}`}
                                        style={{ fontSize: 8, fontWeight: 700, ...ff }}
                                      >
                                        {param.defaultValue ? "TRUE" : "FALSE"}
                                      </button>
                                      <span className="text-[#98989D]" style={{ fontSize: 8, fontWeight: 600, ...ff }}>Atual:</span>
                                      <span className={`px-2 py-0.5 rounded-[4px] ${param.currentValue ? "bg-[#D1FAE5] text-[#065F46]" : "bg-[#FEE2E2] text-[#991B1B]"}`} style={{ fontSize: 8, fontWeight: 700, ...ff }}>
                                        {param.currentValue ? "TRUE" : "FALSE"}
                                      </span>
                                    </div>
                                  </div>
                                );
                              })()}
                            </div>

                            {/* Transition Picker */}
                            <div>
                              <label className="text-[#98989D] block mb-1" style={{ fontSize: 8, fontWeight: 600, ...ff }}>Transição</label>
                              <div className="flex gap-1">
                                {DYN_TRANSITION_OPTIONS.map(t => (
                                  <button
                                    key={t.value}
                                    onClick={() => updateDV({ transition: t.value })}
                                    className={`flex-1 flex flex-col items-center gap-0.5 py-1.5 rounded-[5px] transition-all cursor-pointer ${
                                      (dv.transition || "fade") === t.value
                                        ? "bg-[#07ABDE] text-white"
                                        : "bg-[#F6F7F9] text-[#4E6987] hover:bg-[#E8ECF1]"
                                    }`}
                                  >
                                    <span style={{ fontSize: 11 }}>{t.icon}</span>
                                    <span style={{ fontSize: 7, fontWeight: 600, letterSpacing: 0.2, ...ff }}>{t.label}</span>
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Visual feedback summary */}
                            {(dv.sourceItemIds || []).length > 0 && (
                              <div className="flex items-start gap-1.5 p-2 rounded-[6px] bg-[#F0FAFF] border border-[#DCF0FF]">
                                <Lightning size={11} weight="fill" className="text-[#07ABDE] shrink-0 mt-0.5" />
                                <span className="text-[#4E6987]" style={{ fontSize: 9, fontWeight: 500, letterSpacing: -0.2, lineHeight: "14px", ...ff }}>
                                  {dv.condition === "showOnFilter" ? "Aparece" : "Desaparece"} quando{" "}
                                  {dv.sourceItemIds.length === 1 ? (
                                    <strong>{items.find(i => i.id === dv.sourceItemIds[0])?.reportName || "item"}</strong>
                                  ) : (
                                    dv.sourceItemIds.map((sid, idx) => (
                                      <React.Fragment key={sid}>
                                        {idx > 0 && <span className="text-[#07ABDE] font-bold"> {dv.logicOperator === "and" ? "E" : "OU"} </span>}
                                        <strong>{items.find(i => i.id === sid)?.reportName || "item"}</strong>
                                      </React.Fragment>
                                    ))
                                  )}
                                  {" "}receber clique
                                  {dv.parameterId && <span className="text-[#98989D]"> (via parâmetro)</span>}
                                  {" "}· <span className="capitalize">{dv.transition || "fade"}</span>
                                </span>
                              </div>
                            )}
                          </div>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle right sidebar */}
        {!rightSidebarOpen && (
          <button
            onClick={() => setRightSidebarOpen(true)}
            className="absolute right-2 top-16 z-10 flex items-center justify-center w-[28px] h-[28px] rounded-[8px] bg-white border border-[#DDE3EC] text-[#4E6987] hover:text-[#0483AB] hover:border-[#0483AB] shadow-sm transition-all cursor-pointer"
            title="Abrir Layout"
          >
            <TreeStructure size={14} weight="bold" />
          </button>
        )}
      </div>

      {/* ── Save Modal ── */}
      <AnimatePresence>
        <SavePanelModal
          isOpen={saveModal}
          onClose={() => setSaveModal(false)}
          onSave={savePanel}
          initialName={panelName}
          initialDesc={panelDesc}
          initialPublic={isPublic}
          isSaving={isSaving}
          isEditing={!!editingPanelId}
        />
      </AnimatePresence>

      {/* ── KPI Widget Editor Modal ── */}
      <AnimatePresence>
        {editingWidgetId && (() => {
          const editingItem = items.find(i => i.id === editingWidgetId);
          if (!editingItem?.widgetConfig) return null;
          return (
            <KpiWidgetEditor
              config={editingItem.widgetConfig}
              onChange={(newConfig) => updateItemWidgetConfig(editingWidgetId, newConfig)}
              onClose={() => setEditingWidgetId(null)}
              allTables={KPI_FIELD_TABLES}
              getTableData={getTableData}
            />
          );
        })()}
      </AnimatePresence>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/*  Export: DashDashboardBuilder with DndProvider                  */
/* ══════════════════════════════════════════════════════════════ */

export function DashDashboardBuilder() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="rounded-[16px] overflow-hidden h-full">
        <DashboardBuilderInner />
      </div>
    </DndProvider>
  );
}
