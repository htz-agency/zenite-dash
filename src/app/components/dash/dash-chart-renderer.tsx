/* ================================================================== */
/* Dash Chart Renderer — Zenite DS v2 (Remodelagem Bar + Line + Pie + Bubble) */
/* ================================================================== */

import React, { useState, useCallback, useMemo } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Sector,
  ScatterChart,
  Scatter,
  ZAxis,
  Treemap as RTreemap,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ReferenceLine,
  ReferenceArea,
} from "recharts";
import { formatNumber } from "./dash-data-provider";
import { RhombusMatrixChart } from "./dash-rhombus-matrix";
import { SankeyChart, type SankeyLink } from "./dash-sankey-chart";

export const ff: React.CSSProperties = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

/* ── DS Color Palette ── */
export const DS_COLORS = {
  blueBerry: { bg: "#DCF0FF", "100": "#73D0FF", "200": "#07ABDE", "300": "#0483AB", "400": "#025E7B", "500": "#013B4F" },
  greenMint: { bg: "#D9F8EF", "200": "#23E6B2", "300": "#3CCEA7", "400": "#135543" },
  gold:      { bg: "#FEEDCA", "200": "#EAC23D", "300": "#917822" },
  redCherry: { bg: "#FFEDEB", "200": "#FF8C76", "300": "#F56233", "400": "#B13B00" },
  neutral:   { bg: "#F6F7F9", border: "#DDE3EC", "100": "#C8CFDB", muted: "#98989d", "300": "#4E6987", "400": "#28415C", "500": "#122232" },
};

export const CHART_PALETTE = [
  DS_COLORS.blueBerry["200"],  // #07ABDE
  DS_COLORS.greenMint["300"],  // #3CCEA7
  DS_COLORS.gold["200"],       // #EAC23D
  DS_COLORS.redCherry["300"],  // #F56233
  DS_COLORS.blueBerry["300"],  // #0483AB
  DS_COLORS.neutral["300"],    // #4E6987
];

/* Per-series light and mid opacities for the stacked-depth Figma effect */
export const LIGHT_OPACITY = 0.18;
export const MID_OPACITY = 0.45;

/* ── Custom Tooltip (dark pill, Figma-inspired) ── */
export const ZeniteTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div
      className="px-[14px] py-[8px] rounded-[10px] min-w-[80px]"
      style={{
        backgroundColor: DS_COLORS.neutral["400"],
        boxShadow: "0px 4px 12px rgba(18,34,50,0.25)",
      }}
    >
      {label && (
        <p
          className="text-[#C8CFDB] mb-[4px] truncate max-w-[180px]"
          style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.3, textTransform: "uppercase", ...ff }}
        >
          {label}
        </p>
      )}
      {payload.map((entry: any, idx: number) => (
        <div key={idx} className="flex items-center gap-[6px]">
          <span className="w-[6px] h-[6px] rounded-full shrink-0" style={{ backgroundColor: entry.color || entry.fill }} />
          <span className="text-[#C8CFDB]" style={{ fontSize: 11, fontWeight: 500, ...ff }}>
            {entry.name}:
          </span>
          <span className="text-white" style={{ fontSize: 12, fontWeight: 700, letterSpacing: -0.3, ...ff }}>
            {formatNumber ? formatNumber(entry.value) : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

/* ── Custom Legend (DS pill style) ── */
export const ZeniteLegend = ({ payload }: any) => {
  if (!payload || !payload.length) return null;
  const filtered = payload.filter((e: any) => e.value !== "_ghost");
  if (!filtered.length) return null;
  return (
    <div className="flex items-center justify-center gap-[12px] mt-[8px]">
      {filtered.map((entry: any, idx: number) => (
        <div key={idx} className="flex items-center gap-[5px]">
          <span
            className="w-[8px] h-[8px] rounded-full shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span
            className="text-[#4E6987] truncate max-w-[120px]"
            style={{ fontSize: 11, fontWeight: 600, letterSpacing: -0.2, ...ff }}
          >
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

/* ── Custom Axis Tick (DS typography) ── */
export const DSAxisTick = ({ x, y, payload, angle }: any) => {
  const displayVal = typeof payload.value === "string" && payload.value.length > 14
    ? payload.value.slice(0, 13) + "\u2026"
    : payload.value;
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={12}
        textAnchor={angle ? "end" : "middle"}
        fill={DS_COLORS.neutral.muted}
        style={{ fontSize: 11, fontWeight: 500, letterSpacing: -0.2, ...ff }}
        transform={angle ? `rotate(${angle})` : undefined}
      >
        {displayVal}
      </text>
    </g>
  );
};

export const DSYAxisTick = ({ x, y, payload }: any) => {
  const val = typeof payload.value === "number"
    ? (formatNumber ? formatNumber(payload.value) : payload.value)
    : payload.value;
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={-8}
        y={0}
        dy={4}
        textAnchor="end"
        fill={DS_COLORS.neutral.muted}
        style={{ fontSize: 10, fontWeight: 500, letterSpacing: -0.2, ...ff }}
      >
        {val}
      </text>
    </g>
  );
};

/* ── Custom Bar Shape (Figma 3-layer depth: light + mid + solid) ── */
export const StackedBarShape = (props: any) => {
  const { x, y, width, height, fill, payload, dataKey, index } = props;
  if (!height || height <= 0) return null;

  // Get the actual value to compute proportional layers
  const value = payload?.[dataKey] ?? 0;
  const maxBarH = height;

  // Light layer: full height of the bar area (tallest) with low opacity
  const lightH = Math.min(maxBarH * 1.6, maxBarH + 40);
  // Mid layer: ~70% of bar height
  const midH = maxBarH * 0.7;

  const r = Math.min(3, width / 4); // corner radius

  return (
    <g>
      {/* Light layer — tallest, most transparent */}
      <rect
        x={x}
        y={y + height - lightH}
        width={width}
        height={lightH}
        rx={r}
        ry={r}
        fill={fill}
        opacity={LIGHT_OPACITY}
      />
      {/* Mid layer — medium height, medium opacity */}
      <rect
        x={x}
        y={y + height - midH}
        width={width}
        height={midH}
        rx={r}
        ry={r}
        fill={fill}
        opacity={MID_OPACITY}
      />
      {/* Solid layer — actual bar height, full color */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={r}
        ry={r}
        fill={fill}
        opacity={0.85}
      />
    </g>
  );
};

/* ── Custom Horizontal Bar Shape (3-layer depth, horizontal) ── */
export const StackedBarShapeH = (props: any) => {
  const { x, y, width, height, fill } = props;
  if (!width || width <= 0) return null;

  const lightW = Math.min(width * 1.5, width + 40);
  const midW = width * 0.7;
  const r = Math.min(3, height / 4);

  return (
    <g>
      {/* Light layer */}
      <rect x={x} y={y} width={lightW} height={height} rx={r} ry={r} fill={fill} opacity={LIGHT_OPACITY} />
      {/* Mid layer */}
      <rect x={x} y={y} width={midW} height={height} rx={r} ry={r} fill={fill} opacity={MID_OPACITY} />
      {/* Solid */}
      <rect x={x} y={y} width={width} height={height} rx={r} ry={r} fill={fill} opacity={0.85} />
    </g>
  );
};

/* ── Custom Line Dot (Figma: filled circle with white stroke) ── */
export const ZeniteDot = (props: any) => {
  const { cx, cy, fill } = props;
  if (cx == null || cy == null) return null;
  return (
    <g>
      <circle cx={cx} cy={cy} r={4.5} fill={fill} stroke="white" strokeWidth={2} />
    </g>
  );
};

export const ZeniteActiveDot = (props: any) => {
  const { cx, cy, fill } = props;
  if (cx == null || cy == null) return null;
  return (
    <g>
      {/* Glow ring */}
      <circle cx={cx} cy={cy} r={10} fill={fill} opacity={0.15} />
      <circle cx={cx} cy={cy} r={6} fill={fill} stroke="white" strokeWidth={2.5} />
    </g>
  );
};

/* ── Pie Slice Opacity Palette (Figma layered effect) ── */
export const PIE_OPACITY_LAYERS = [0.85, 0.65, 0.50, 0.38, 0.28, 0.20];

/* ── Custom Pie Label with connector line (Figma-style external labels) ── */
const renderPieLabel = (props: any) => {
  const { cx, cy, midAngle, outerRadius, fill, name, value, percent } = props;
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 6) * cos;
  const sy = cy + (outerRadius + 6) * sin;
  const mx = cx + (outerRadius + 22) * cos;
  const my = cy + (outerRadius + 22) * sin;
  const ex = mx + (cos >= 0 ? 16 : -16);
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";
  const displayVal = formatNumber ? formatNumber(value) : value;
  const displayName = typeof name === "string" && name.length > 12 ? name.slice(0, 11) + "\u2026" : name;

  return (
    <g>
      {/* Connector line */}
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} strokeWidth={1.5} fill="none" opacity={0.5} />
      {/* Endpoint dot */}
      <circle cx={sx} cy={sy} r={2.5} fill={fill} />
      {/* Name label */}
      <text x={ex + (cos >= 0 ? 4 : -4)} y={ey - 7} textAnchor={textAnchor}
        fill={DS_COLORS.neutral["400"]} style={{ fontSize: 11, fontWeight: 600, letterSpacing: -0.2, ...ff }}>
        {displayName}
      </text>
      {/* Value label */}
      <text x={ex + (cos >= 0 ? 4 : -4)} y={ey + 8} textAnchor={textAnchor}
        fill={DS_COLORS.neutral.muted} style={{ fontSize: 10, fontWeight: 500, ...ff }}>
        {displayVal} ({(percent * 100).toFixed(0)}%)
      </text>
    </g>
  );
};

/* ── Active shape for Pie (Figma: expanded slice with shadow + outer ring) ── */
const renderPieActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, value, percent, name } = props;
  return (
    <g>
      {/* Shadow glow layer */}
      <Sector cx={cx} cy={cy}
        innerRadius={innerRadius} outerRadius={outerRadius + 12}
        startAngle={startAngle} endAngle={endAngle}
        fill={fill} opacity={0.2}
        style={{ filter: "blur(4px)" }}
      />
      {/* Expanded slice */}
      <Sector cx={cx} cy={cy}
        innerRadius={innerRadius - 2} outerRadius={outerRadius + 8}
        startAngle={startAngle} endAngle={endAngle}
        fill={fill}
        style={{ filter: "drop-shadow(0px 6px 12px rgba(0,0,0,0.2))", transition: "all 0.25s ease-out" }}
      />
      {/* Outer accent ring */}
      <Sector cx={cx} cy={cy}
        innerRadius={outerRadius + 10} outerRadius={outerRadius + 13}
        startAngle={startAngle} endAngle={endAngle}
        fill={fill} opacity={0.35}
      />
      {/* Center text */}
      <text x={cx} y={cy - 10} textAnchor="middle" fill={DS_COLORS.neutral["500"]}
        style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.5, ...ff }}>
        {formatNumber ? formatNumber(value) : value}
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" fill={DS_COLORS.neutral.muted}
        style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase", ...ff }}>
        {(percent * 100).toFixed(1)}%
      </text>
    </g>
  );
};

/* ── Donut Active Shape (progress ring style from Figma) ── */
const renderDonutActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, value, percent, name } = props;
  return (
    <g>
      {/* Expanded slice with glow */}
      <Sector cx={cx} cy={cy}
        innerRadius={innerRadius - 3} outerRadius={outerRadius + 6}
        startAngle={startAngle} endAngle={endAngle}
        fill={fill}
        style={{ filter: "drop-shadow(0px 4px 10px rgba(0,0,0,0.18))", transition: "all 0.25s ease-out" }}
      />
      {/* Value in center */}
      <text x={cx} y={cy - 14} textAnchor="middle" fill={DS_COLORS.neutral["500"]}
        style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5, ...ff }}>
        {(percent * 100).toFixed(1)}%
      </text>
      <text x={cx} y={cy + 6} textAnchor="middle" fill={DS_COLORS.neutral.muted}
        style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", ...ff }}>
        {typeof name === "string" && name.length > 14 ? name.slice(0, 13) + "\u2026" : name}
      </text>
      <text x={cx} y={cy + 22} textAnchor="middle" fill={DS_COLORS.neutral["300"]}
        style={{ fontSize: 13, fontWeight: 600, ...ff }}>
        {formatNumber ? formatNumber(value) : value}
      </text>
    </g>
  );
};

/* ── Custom Bubble Renderer for Scatter (Figma bubble chart) ── */
/* Figma-inspired: value inside bubble, white stroke, 3-layer depth */
const fmtBubbleVal = (v: number) => {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 10_000) return `${(v / 1000).toFixed(0)}k`;
  if (v >= 1000) return `${(v / 1000).toFixed(1)}k`;
  return v % 1 === 0 ? String(Math.round(v)) : v.toFixed(1);
};

/* Note: BubbleShape reads _hoveredIdx and _bubbleIdx from payload for hover dimming */
const BubbleShape = (props: any) => {
  const { cx, cy, payload, fill } = props;
  if (cx == null || cy == null) return null;
  
  const zVal = payload?._bubbleSize ?? 30;
  const r = Math.max(8, Math.min(zVal, 80));
  const idx = payload?._bubbleIdx ?? -1;
  const hovIdx = payload?._hoveredIdx ?? null;
  const isHovered = hovIdx === idx;
  const isDimmed = hovIdx !== null && hovIdx !== idx;
  
  const valLabel = payload?._bubbleValueLabel || payload?._bubbleLabel || "";
  const canShowVal = r >= 12;
  const canShowSmallVal = r >= 8 && r < 12;
  const fontSize = r >= 30 ? Math.min(14, r / 2.8) : r >= 20 ? Math.min(12, r / 2.5) : Math.max(7, r / 2.2);
  const mainOpacity = isDimmed ? 0.22 : isHovered ? 0.95 : 0.82;
  const haloOpacity = isDimmed ? 0.02 : isHovered ? 0.16 : 0.08;
  const midOpacity = isDimmed ? 0.06 : isHovered ? 0.35 : 0.22;
  const strokeW = isHovered ? 2.4 : r > 16 ? 1.8 : 1;
  const strokeOp = isDimmed ? 0.2 : isHovered ? 1 : 0.7;
  
  return (
    <g style={{ transition: "opacity 0.18s ease" }}>
      {/* Ghost halo */}
      <circle cx={cx} cy={cy} r={r + 5} fill={fill} opacity={haloOpacity}
        style={{ transition: "opacity 0.18s ease" }} />
      {/* Mid depth ring */}
      <circle cx={cx} cy={cy} r={r + 1.5} fill={fill} opacity={midOpacity}
        style={{ transition: "opacity 0.18s ease" }} />
      {/* Main bubble with white stroke */}
      <circle cx={cx} cy={cy} r={r} fill={fill} opacity={mainOpacity}
        stroke="white" strokeWidth={strokeW} strokeOpacity={strokeOp}
        style={{ transition: "opacity 0.18s ease, stroke-width 0.18s ease" }}
      />
      {/* Gloss highlight */}
      <ellipse cx={cx - r * 0.15} cy={cy - r * 0.2} rx={r * 0.45} ry={r * 0.3}
        fill="white" opacity={isDimmed ? 0.03 : 0.10} />
      {/* Value label inside */}
      {canShowVal && (
        <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central"
          fill="white" opacity={isDimmed ? 0.3 : 1}
          style={{ fontSize, fontWeight: 700, letterSpacing: -0.3, transition: "opacity 0.18s ease", ...ff }}>
          {valLabel}
        </text>
      )}
      {canShowSmallVal && !isDimmed && (
        <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central"
          fill="white" style={{ fontSize: 7, fontWeight: 600, letterSpacing: -0.2, ...ff }}>
          {valLabel.length > 3 ? valLabel.slice(0, 3) : valLabel}
        </text>
      )}
    </g>
  );
};

/* ================================================================== */
/*  MAIN COMPONENT                                                     */
/* ================================================================== */

interface ChartRendererProps {
  data: any[];
  config: {
    chartType: string;
    polarSubType?: string;
    scatterSubType?: string;
    rowShelf: any[];
    colShelf: any[];
  };
  tableMeta?: {
    label: string;
    icon: React.ReactNode;
    color: string;
    bg: string;
  } | null;
}

export function DashChartRenderer({ data, config, tableMeta }: ChartRendererProps) {
  const rawChartType = config.chartType;
  const allFields = [...(config.rowShelf || []), ...(config.colShelf || [])];

  const [activePieIndex, setActivePieIndex] = useState<number>(-1);
  const onPieEnter = useCallback((_: any, index: number) => setActivePieIndex(index), []);
  const onPieLeave = useCallback(() => setActivePieIndex(-1), []);
  // Scatter interactive states
  const [hoveredBubbleIdx, setHoveredBubbleIdx] = useState<number | null>(null);
  const [scatterHiddenSeries, setScatterHiddenSeries] = useState<Set<string>>(new Set());
  const [scatterCrosshair, setScatterCrosshair] = useState<{ x: number; y: number } | null>(null);
  const [scatterZoomDomain, setScatterZoomDomain] = useState<{ x: [number, number]; y: [number, number] } | null>(null);
  const [scatterZoomStart, setScatterZoomStart] = useState<{ x: number; y: number } | null>(null);
  const [scatterZoomEnd, setScatterZoomEnd] = useState<{ x: number; y: number } | null>(null);

  // ── Empty/missing states ──
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full gap-[8px] py-[40px]">
        <div className="w-[40px] h-[40px] rounded-full bg-[#F6F7F9] flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="12" width="4" height="9" rx="1" fill="#C8CFDB"/><rect x="10" y="7" width="4" height="14" rx="1" fill="#C8CFDB"/><rect x="17" y="3" width="4" height="18" rx="1" fill="#C8CFDB"/></svg>
        </div>
        <p className="text-[#98989d]" style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3, ...ff }}>
          Nenhum dado disponivel
        </p>
        <p className="text-[#C8CFDB]" style={{ fontSize: 11, fontWeight: 500, ...ff }}>
          Adicione campos as prateleiras
        </p>
      </div>
    );
  }

  const dimensionField = allFields.find((f) => f.field.type === "dimension" || f.field.type === "date");
  const dimensionFields = allFields.filter((f) => f.field.type === "dimension" || f.field.type === "date");
  const measureFields = allFields.filter((f) => f.field.type === "measure");

  if (measureFields.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full gap-[6px] py-[40px]">
        <p className="text-[#98989d]" style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3, ...ff }}>
          Adicione uma medida para visualizar
        </p>
      </div>
    );
  }

  // ── Resolve auto chart type ──
  const resolveChartType = (type: string): string => {
    if (type !== "auto") return type;
    const dims = dimensionFields.length;
    const measures = measureFields.length;
    const hasDates = allFields.some(f => f.field.type === "date");
    if (dims === 0 && measures > 0) return "bar";
    if (hasDates && measures > 0) return "line";
    if (dims === 1 && measures === 1 && data.length <= 8) return "pie";
    return "bar";
  };

  const chartType = resolveChartType(rawChartType);
  const xAxisKey = dimensionField ? dimensionField.field.name : undefined;

  const getColor = (index: number) => {
    if (tableMeta?.color && measureFields.length === 1) return tableMeta.color;
    return CHART_PALETTE[index % CHART_PALETTE.length];
  };

  /* ══════════════════════════════════════════════════════════════════ */
  /*  BAR CHART (Vertical) — Figma 3-layer stacked depth              */
  /* ══════════════════════════════════════════════════════════════════ */
  if (chartType === "bar") {
    return (
      <div style={{ width: "100%", height: "500px", minWidth: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 16, right: 24, left: 8, bottom: 48 }} barCategoryGap="20%">
            <CartesianGrid
              key="bar-grid"
              strokeDasharray="none"
              stroke={DS_COLORS.neutral.border}
              strokeOpacity={0.5}
              vertical={false}
            />
            <XAxis
              key="bar-xaxis"
              dataKey={xAxisKey}
              tick={<DSAxisTick angle={data.length > 8 ? -40 : 0} />}
              axisLine={{ stroke: DS_COLORS.neutral.border, strokeWidth: 1 }}
              tickLine={false}
              height={data.length > 8 ? 70 : 40}
            />
            <YAxis
              key="bar-yaxis"
              tick={<DSYAxisTick />}
              axisLine={false}
              tickLine={false}
              width={55}
            />
            <Tooltip key="bar-tooltip" content={<ZeniteTooltip />} cursor={{ fill: "rgba(7,171,222,0.06)", radius: 3 }} />
            <Legend key="bar-legend" content={<ZeniteLegend />} />
            {measureFields.map((field, index) => (
              <Bar
                key={`bar-${index}-${field.field.name}`}
                dataKey={field.field.name}
                fill={getColor(index)}
                name={field.field.label}
                shape={<StackedBarShape />}
                animationBegin={index * 120}
                animationDuration={700}
                animationEasing="ease-out"
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════════════ */
  /*  BAR CHART (Horizontal) — Figma stacked depth horizontal         */
  /* ══════════════════════════════════════════════════════════════════ */
  if (chartType === "bar_h" || chartType === "bar-h") {
    return (
      <div style={{ width: "100%", height: "500px", minWidth: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 16, right: 24, left: 12, bottom: 16 }} barCategoryGap="18%">
            <CartesianGrid
              key="barh-grid"
              strokeDasharray="none"
              stroke={DS_COLORS.neutral.border}
              strokeOpacity={0.5}
              horizontal={false}
            />
            <XAxis
              key="barh-xaxis"
              type="number"
              tick={<DSYAxisTick />}
              axisLine={{ stroke: DS_COLORS.neutral.border, strokeWidth: 1 }}
              tickLine={false}
            />
            <YAxis
              key="barh-yaxis"
              type="category"
              dataKey={xAxisKey}
              tick={({ x, y, payload }: any) => {
                const val = typeof payload.value === "string" && payload.value.length > 16
                  ? payload.value.slice(0, 15) + "\u2026"
                  : payload.value;
                return (
                  <g transform={`translate(${x},${y})`}>
                    <text x={-8} y={0} dy={4} textAnchor="end" fill={DS_COLORS.neutral["400"]}
                      style={{ fontSize: 11, fontWeight: 600, letterSpacing: -0.2, ...ff }}>
                      {val}
                    </text>
                  </g>
                );
              }}
              axisLine={false}
              tickLine={false}
              width={100}
            />
            <Tooltip key="barh-tooltip" content={<ZeniteTooltip />} cursor={{ fill: "rgba(7,171,222,0.06)" }} />
            <Legend key="barh-legend" content={<ZeniteLegend />} />
            {measureFields.map((field, index) => (
              <Bar
                key={`barh-${index}-${field.field.name}`}
                dataKey={field.field.name}
                fill={getColor(index)}
                name={field.field.label}
                shape={<StackedBarShapeH />}
                animationBegin={index * 120}
                animationDuration={700}
                animationEasing="ease-out"
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════════════ */
  /*  LINE CHART — Figma wave style with area gradient + dots         */
  /* ══════════════════════════════════════════════════════════════════ */
  if (chartType === "line") {
    return (
      <div style={{ width: "100%", height: "500px", minWidth: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 16, right: 24, left: 8, bottom: 48 }}>
            {/* Single defs block for all gradients */}
            <defs key="line-defs">
              {measureFields.map((_field, index) => (
                <linearGradient key={`lineGrad-def-${index}`} id={`lineGrad-${index}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={getColor(index)} stopOpacity={0.28} />
                  <stop offset="85%" stopColor={getColor(index)} stopOpacity={0.04} />
                  <stop offset="100%" stopColor={getColor(index)} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid
              key="line-grid"
              strokeDasharray="none"
              stroke={DS_COLORS.neutral.border}
              strokeOpacity={0.4}
              vertical={false}
            />
            <XAxis
              key="line-xaxis"
              dataKey={xAxisKey}
              tick={<DSAxisTick angle={data.length > 10 ? -40 : 0} />}
              axisLine={{ stroke: DS_COLORS.neutral.border, strokeWidth: 1 }}
              tickLine={false}
              height={data.length > 10 ? 70 : 40}
            />
            <YAxis
              key="line-yaxis"
              tick={<DSYAxisTick />}
              axisLine={false}
              tickLine={false}
              width={55}
            />
            <Tooltip key="line-tooltip" content={<ZeniteTooltip />} />
            <Legend key="line-legend" content={<ZeniteLegend />} />
            {measureFields.map((field, index) => {
              const color = getColor(index);
              return (
                <Area
                  key={`line-area-${index}-${field.field.name}`}
                  type="monotone"
                  dataKey={field.field.name}
                  stroke={color}
                  strokeWidth={2.5}
                  fill={`url(#lineGrad-${index})`}
                  fillOpacity={1}
                  dot={<ZeniteDot fill={color} />}
                  activeDot={<ZeniteActiveDot fill={color} />}
                  name={field.field.label}
                  animationDuration={900}
                  animationEasing="ease-out"
                />
              );
            })}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════════════ */
  /*  AREA CHART — Similar to line but with stronger fill             */
  /* ══════════════════════════════════════════════════════════════════ */
  if (chartType === "area") {
    return (
      <div style={{ width: "100%", height: "500px", minWidth: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 16, right: 24, left: 8, bottom: 48 }}>
            <defs key="area-defs">
              {measureFields.map((_field, index) => {
                const color = getColor(index);
                return (
                  <linearGradient key={`areaGrad-def-${index}`} id={`areaGrad-${index}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity={0.35} />
                    <stop offset="90%" stopColor={color} stopOpacity={0.05} />
                  </linearGradient>
                );
              })}
            </defs>
            <CartesianGrid key="area-grid" strokeDasharray="none" stroke={DS_COLORS.neutral.border} strokeOpacity={0.4} vertical={false} />
            <XAxis
              key="area-xaxis"
              dataKey={xAxisKey}
              tick={<DSAxisTick angle={data.length > 10 ? -40 : 0} />}
              axisLine={{ stroke: DS_COLORS.neutral.border, strokeWidth: 1 }}
              tickLine={false}
              height={data.length > 10 ? 70 : 40}
            />
            <YAxis key="area-yaxis" tick={<DSYAxisTick />} axisLine={false} tickLine={false} width={55} />
            <Tooltip key="area-tooltip" content={<ZeniteTooltip />} />
            <Legend key="area-legend" content={<ZeniteLegend />} />
            {measureFields.map((field, index) => {
              const color = getColor(index);
              return (
                <Area
                  key={`area-${index}-${field.field.name}`}
                  type="monotone"
                  dataKey={field.field.name}
                  stroke={color}
                  fill={`url(#areaGrad-${index})`}
                  fillOpacity={1}
                  strokeWidth={2.5}
                  dot={<ZeniteDot fill={color} />}
                  activeDot={<ZeniteActiveDot fill={color} />}
                  name={field.field.label}
                />
              );
            })}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════════════ */
  /*  PIE CHART — Figma multi-layer opacity slices + external labels  */
  /* ══════════════════════════════════════════════════════════════════ */
  if (chartType === "pie") {
    const measureField = measureFields[0];
    if (!dimensionField) {
      return (
        <div className="flex items-center justify-center h-full w-full">
          <p className="text-[#98989d]" style={{ fontSize: 13, fontWeight: 500, ...ff }}>
            O grafico de pizza requer 1 dimensao e 1 medida.
          </p>
        </div>
      );
    }

    // Sort data by value descending for better visual layering
    const sortedData = [...data].sort((a, b) => {
      const aVal = typeof a[measureField.field.name] === "number" ? a[measureField.field.name] : 0;
      const bVal = typeof b[measureField.field.name] === "number" ? b[measureField.field.name] : 0;
      return bVal - aVal;
    });

    return (
      <div style={{ width: "100%", height: "500px", minWidth: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* Background base circle (Figma light base layer) */}
            <Pie
              key="pie-bg"
              data={[{ value: 1 }]}
              dataKey="value"
              cx="50%" cy="48%"
              outerRadius={155}
              innerRadius={0}
              isAnimationActive={false}
              stroke="none"
            >
              <Cell fill={DS_COLORS.neutral.bg} />
            </Pie>
            {/* Main pie with opacity-varied slices */}
            <Pie
              key="pie-main"
              data={sortedData}
              dataKey={measureField.field.name}
              nameKey={dimensionField.field.name}
              cx="50%" cy="48%"
              outerRadius={150}
              innerRadius={0}
              paddingAngle={0}
              stroke="none"
              strokeWidth={0}
              label={renderPieLabel}
              labelLine={false}
              activeIndex={activePieIndex}
              activeShape={renderPieActiveShape}
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              animationDuration={800}
              animationEasing="ease-out"
            >
              {sortedData.map((_entry, index) => (
                <Cell
                  key={`pie-cell-${index}`}
                  fill={CHART_PALETTE[index % CHART_PALETTE.length]}
                  stroke="white"
                  strokeWidth={2}
                  opacity={PIE_OPACITY_LAYERS[Math.min(index, PIE_OPACITY_LAYERS.length - 1)]}
                />
              ))}
            </Pie>
            <Tooltip key="cr-pie-tip" content={<ZeniteTooltip />} />
            <Legend key="cr-pie-leg" content={<ZeniteLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════════════ */
  /*  DONUT — Figma progress ring with centered value + gray track    */
  /* ══════════════════════════════════════════════════════════════════ */
  if (chartType === "donut") {
    const measureField = measureFields[0];
    if (!dimensionField) {
      return (
        <div className="flex items-center justify-center h-full w-full">
          <p className="text-[#98989d]" style={{ fontSize: 13, fontWeight: 500, ...ff }}>
            O grafico de donut requer 1 dimensao e 1 medida.
          </p>
        </div>
      );
    }

    // Calculate total for center display
    const total = data.reduce((sum, row) => {
      const v = typeof row[measureField.field.name] === "number" ? row[measureField.field.name] : 0;
      return sum + v;
    }, 0);

    return (
      <div style={{ width: "100%", height: "500px", minWidth: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* Gray track ring (background) */}
            <Pie
              key="donut-bg"
              data={[{ value: 1 }]}
              dataKey="value"
              cx="50%" cy="48%"
              outerRadius={155}
              innerRadius={100}
              isAnimationActive={false}
              stroke="none"
            >
              <Cell fill={DS_COLORS.neutral.border} opacity={0.5} />
            </Pie>
            {/* Colored data ring */}
            <Pie
              key="donut-main"
              data={data}
              dataKey={measureField.field.name}
              nameKey={dimensionField.field.name}
              cx="50%" cy="48%"
              outerRadius={152}
              innerRadius={103}
              paddingAngle={2}
              stroke="white"
              strokeWidth={2}
              cornerRadius={4}
              activeIndex={activePieIndex}
              activeShape={renderDonutActiveShape}
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              animationDuration={900}
              animationEasing="ease-out"
            >
              {data.map((_entry, index) => (
                <Cell
                  key={`donut-cell-${index}`}
                  fill={CHART_PALETTE[index % CHART_PALETTE.length]}
                />
              ))}
            </Pie>
            {/* Center total (only shown when no slice is hovered) */}
            {activePieIndex < 0 && (
              <>
                <text
                  key="donut-total-value"
                  x="50%" y="45%"
                  textAnchor="middle" dominantBaseline="central"
                  fill={DS_COLORS.neutral["500"]}
                  style={{ fontSize: 30, fontWeight: 700, letterSpacing: -0.5, ...ff }}
                >
                  {formatNumber ? formatNumber(total) : total}
                </text>
                <text
                  key="donut-total-label"
                  x="50%" y="54%"
                  textAnchor="middle" dominantBaseline="central"
                  fill={DS_COLORS.neutral.muted}
                  style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", ...ff }}
                >
                  TOTAL
                </text>
              </>
            )}
            <Tooltip key="cr-donut-tip" content={<ZeniteTooltip />} />
            <Legend key="cr-donut-leg" content={<ZeniteLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════════════ */
  /*  SCATTER / BUBBLE — Figma bubble chart with sized circles        */
  /* ══════════════════════════════════════════════════════════════════ */
  if (chartType === "scatter") {
    /* ── Rhombus Matrix sub-type ── */
    const scatterSub = config.scatterSubType || "classic";
    if (scatterSub === "matrix") {
      const dimFields = allFields.filter(f => f.field?.type === "dimension" || f.field?.type === "date");
      const dim1Key = dimFields[0]?.field?.name || dimensionField?.field?.name || "_category";
      const dim2Key = dimFields[1]?.field?.name || null;
      const matMeasureKey = measureFields[0]?.field?.name || "value";
      const matMeasureLabel = measureFields[0]?.field?.label || matMeasureKey;

      const xCats = [...new Set(data.map((d: any) => String(d[dim1Key] || "")))];
      const yCats = dim2Key
        ? [...new Set(data.map((d: any) => String(d[dim2Key] || "")))]
        : [matMeasureLabel];

      const matrixMap = new Map<string, number>();
      let matMin = Infinity, matMax = -Infinity;
      data.forEach((row: any) => {
        const xVal = String(row[dim1Key] || "");
        const yVal = dim2Key ? String(row[dim2Key] || "") : matMeasureLabel;
        const v = typeof row[matMeasureKey] === "number" ? row[matMeasureKey] : 0;
        const key = `${xVal}__${yVal}`;
        matrixMap.set(key, (matrixMap.get(key) || 0) + v);
      });
      matrixMap.forEach(v => { if (v < matMin) matMin = v; if (v > matMax) matMax = v; });
      if (matMin === Infinity) matMin = 0;
      if (matMax === -Infinity) matMax = 1;
      const matRange = matMax - matMin || 1;

      const CELL = 52;
      const PAD_LEFT = 100;
      const PAD_TOP = 50;
      const PAD_RIGHT = 20;
      const PAD_BOTTOM = 70;
      const RHOMBUS_COLOR = DS_COLORS.neutral["400"];
      const svgW = PAD_LEFT + xCats.length * CELL + PAD_RIGHT;
      const svgH = PAD_TOP + yCats.length * CELL + PAD_BOTTOM;

      return (
        <div style={{ width: "100%", height: "500px", minWidth: "300px", overflow: "auto" }}>
          <RhombusMatrixChart
            xCats={xCats} yCats={yCats} matrixMap={matrixMap}
            matMin={matMin} matMax={matMax} matRange={matRange}
            padLeft={PAD_LEFT} padTop={PAD_TOP} padRight={PAD_RIGHT} padBottom={PAD_BOTTOM}
            cellSize={CELL} rhombusColor={RHOMBUS_COLOR}
            filterId="cr-mat-shadow" keyPrefix="cr"
            measureLabel={matMeasureLabel}
            shadowColor={DS_COLORS.neutral["500"]}
            axisColor={DS_COLORS.neutral["300"]}
            gridColor={DS_COLORS.neutral.border}
          />
        </div>
      );
    }

    const xMeasure = measureFields[0];
    const yMeasure = measureFields[1] || measureFields[0];
    const zMeasure = measureFields[2] || measureFields[0]; // size axis
    const xKey = xMeasure.field.name;
    const yKey = yMeasure.field.name;

    /* ── DS Scatter Series Palette ── */
    const SCATTER_SERIES = CHART_PALETTE;
    const dimSeriesMap = new Map<string, string>();
    const seriesEntries: { name: string; color: string }[] = [];
    if (dimensionField) {
      const dimVals = [...new Set(data.map(d => String(d[dimensionField.field.name] || "")))];
      dimVals.forEach((dv, i) => {
        dimSeriesMap.set(dv, SCATTER_SERIES[i % SCATTER_SERIES.length]);
        if (dv) seriesEntries.push({ name: dv, color: SCATTER_SERIES[i % SCATTER_SERIES.length] });
      });
    }

    // Compute bubble sizes normalized to pixel range [12, 65]
    const zValues = data.map(d => {
      const v = typeof d[zMeasure.field.name] === "number" ? d[zMeasure.field.name] : 0;
      return v;
    });
    const zMin = Math.min(...zValues);
    const zMax = Math.max(...zValues);
    const zRange = zMax - zMin || 1;

    const allBubbleData = data.map((row, idx) => {
      const zVal = typeof row[zMeasure.field.name] === "number" ? row[zMeasure.field.name] : 0;
      const normalizedSize = 12 + ((zVal - zMin) / zRange) * 53;
      const dimLabel = dimensionField ? String(row[dimensionField.field.name] || "") : "";
      return {
        ...row,
        _bubbleSize: normalizedSize,
        _bubbleLabel: dimLabel,
        _bubbleValueLabel: fmtBubbleVal(zVal),
        _bubbleZ: zVal,
        _bubbleIdx: idx,
        _hoveredIdx: hoveredBubbleIdx,
        _seriesKey: dimLabel,
        _seriesColor: dimSeriesMap.get(dimLabel) || SCATTER_SERIES[idx % SCATTER_SERIES.length],
      };
    });

    /* ── Legend filter: hide selected series ── */
    const bubbleData = allBubbleData.filter((d: any) => !scatterHiddenSeries.has(d._seriesKey));

    /* ── Jitter/Spread: offset overlapping bubbles ── */
    (() => {
      if (bubbleData.length < 2) return;
      const xVals = bubbleData.map((d: any) => typeof d[xKey] === "number" ? d[xKey] : 0);
      const yVals = bubbleData.map((d: any) => typeof d[yKey] === "number" ? d[yKey] : 0);
      const xRng = (Math.max(...xVals) - Math.min(...xVals)) || 1;
      const yRng = (Math.max(...yVals) - Math.min(...yVals)) || 1;
      const thresh = 0.025;
      const assigned = new Set<number>();
      for (let i = 0; i < bubbleData.length; i++) {
        if (assigned.has(i)) continue;
        const cluster = [i];
        assigned.add(i);
        for (let j = i + 1; j < bubbleData.length; j++) {
          if (assigned.has(j)) continue;
          const dx = Math.abs((bubbleData[i][xKey] || 0) - (bubbleData[j][xKey] || 0)) / xRng;
          const dy = Math.abs((bubbleData[i][yKey] || 0) - (bubbleData[j][yKey] || 0)) / yRng;
          if (dx < thresh && dy < thresh) { cluster.push(j); assigned.add(j); }
        }
        if (cluster.length > 1) {
          const spreadX = xRng * 0.028;
          const spreadY = yRng * 0.028;
          cluster.forEach((ci, gi) => {
            if (gi === 0) return;
            const angle = gi * (2 * Math.PI / cluster.length);
            const layer = Math.ceil(gi / 6);
            bubbleData[ci][xKey] = (bubbleData[ci][xKey] || 0) + Math.cos(angle) * spreadX * layer;
            bubbleData[ci][yKey] = (bubbleData[ci][yKey] || 0) + Math.sin(angle) * spreadY * layer;
          });
        }
      }
    })();

    /* ── Hover handler with crosshair ── */
    const handleBubbleEnter = (entry: any, idx: number) => {
      setHoveredBubbleIdx(idx);
      if (entry) {
        const xVal = typeof entry[xKey] === "number" ? entry[xKey] : null;
        const yVal = typeof entry[yKey] === "number" ? entry[yKey] : null;
        if (xVal != null && yVal != null) setScatterCrosshair({ x: xVal, y: yVal });
      }
    };
    const handleBubbleLeave = () => {
      setHoveredBubbleIdx(null);
      setScatterCrosshair(null);
    };

    /* ── Interactive Legend ── */
    const CRScatterLegend = () => {
      if (seriesEntries.length < 2) return <ZeniteLegend payload={seriesEntries.map(s => ({ value: s.name, color: s.color }))} />;
      return (
        <div className="flex items-center justify-center gap-[6px] flex-wrap mt-[4px] px-[8px]">
          {seriesEntries.slice(0, 12).map((s, i) => {
            const hidden = scatterHiddenSeries.has(s.name);
            return (
              <button key={i} type="button"
                className="flex items-center gap-[4px] rounded-full px-[8px] py-[2px] border transition-all duration-150"
                style={{
                  borderColor: hidden ? DS_COLORS.neutral.border : s.color,
                  backgroundColor: hidden ? "transparent" : `${s.color}0D`,
                  opacity: hidden ? 0.45 : 1,
                  cursor: "pointer",
                }}
                onClick={() => {
                  setScatterHiddenSeries(prev => {
                    const next = new Set(prev);
                    if (next.has(s.name)) next.delete(s.name); else next.add(s.name);
                    if (next.size >= seriesEntries.length) return prev;
                    return next;
                  });
                }}
              >
                <span className="w-[7px] h-[7px] rounded-full shrink-0"
                  style={{ backgroundColor: hidden ? "#C8CFDB" : s.color, transition: "background-color 0.15s ease" }} />
                <span style={{
                  fontSize: 10, fontWeight: 600, letterSpacing: -0.2, color: hidden ? "#98989d" : DS_COLORS.neutral["300"],
                  textDecoration: hidden ? "line-through" : "none", ...ff,
                }}>
                  {s.name.length > 18 ? s.name.slice(0, 17) + "\u2026" : s.name}
                </span>
              </button>
            );
          })}
        </div>
      );
    };

    /* ── Zoom handlers ── */
    const handleZoomMouseDown = (e: any) => {
      if (e?.chartX != null && e?.chartY != null) {
        setScatterZoomStart({ x: e.chartX, y: e.chartY });
        setScatterZoomEnd(null);
      }
    };
    const handleZoomMouseMove = (e: any) => {
      if (scatterZoomStart && e?.chartX != null && e?.chartY != null) {
        setScatterZoomEnd({ x: e.chartX, y: e.chartY });
      }
    };
    const handleZoomMouseUp = () => {
      if (scatterZoomStart && scatterZoomEnd) {
        const allX = bubbleData.map((d: any) => d[xKey] || 0);
        const allY = bubbleData.map((d: any) => d[yKey] || 0);
        const dataXMin = Math.min(...allX), dataXMax = Math.max(...allX);
        const dataYMin = Math.min(...allY), dataYMax = Math.max(...allY);
        const cLeft = 65, cRight = 30, cTop = 20, cBottom = 48;
        const areaW = Math.max(100, 600 - cLeft - cRight);
        const areaH = Math.max(100, 500 - cTop - cBottom);
        const pxToDataX = (px: number) => dataXMin + ((px - cLeft) / areaW) * (dataXMax - dataXMin);
        const pxToDataY = (px: number) => dataYMax - ((px - cTop) / areaH) * (dataYMax - dataYMin);
        let x1 = pxToDataX(Math.min(scatterZoomStart.x, scatterZoomEnd.x));
        let x2 = pxToDataX(Math.max(scatterZoomStart.x, scatterZoomEnd.x));
        let y1 = pxToDataY(Math.max(scatterZoomStart.y, scatterZoomEnd.y));
        let y2 = pxToDataY(Math.min(scatterZoomStart.y, scatterZoomEnd.y));
        if (Math.abs(x2 - x1) > (dataXMax - dataXMin) * 0.05 && Math.abs(y2 - y1) > (dataYMax - dataYMin) * 0.05) {
          setScatterZoomDomain({ x: [x1, x2], y: [y1, y2] });
        }
      }
      setScatterZoomStart(null);
      setScatterZoomEnd(null);
    };

    return (
      <div style={{ width: "100%", height: "500px", minWidth: "300px", position: "relative" }}>
        {/* Zoom reset */}
        {scatterZoomDomain && (
          <button
            type="button"
            className="absolute top-[6px] right-[10px] z-10 flex items-center gap-[3px] px-[8px] py-[3px] rounded-full border transition-colors"
            style={{ borderColor: DS_COLORS.neutral.border, backgroundColor: "white", fontSize: 9, fontWeight: 600, color: DS_COLORS.neutral["300"], letterSpacing: -0.2, cursor: "pointer", ...ff }}
            onClick={() => setScatterZoomDomain(null)}
          >
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M3 8l3-3M3 8l3 3" stroke={DS_COLORS.neutral["300"]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Reset Zoom
          </button>
        )}
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 30, left: 12, bottom: 48 }}
            onMouseDown={handleZoomMouseDown}
            onMouseMove={handleZoomMouseMove}
            onMouseUp={handleZoomMouseUp}
          >
            <CartesianGrid key="scatter-grid" strokeDasharray="none" stroke={DS_COLORS.neutral.border} strokeOpacity={0.35} vertical />
            <XAxis key="scatter-xaxis" type="number" dataKey={xKey} name={xMeasure.field.label}
              tick={<DSYAxisTick />} axisLine={{ stroke: DS_COLORS.neutral.border, strokeWidth: 1 }} tickLine={false}
              domain={scatterZoomDomain ? scatterZoomDomain.x : ["auto", "auto"]}
              allowDataOverflow={!!scatterZoomDomain}
            />
            <YAxis key="scatter-yaxis" type="number" dataKey={yKey} name={yMeasure.field.label}
              tick={<DSYAxisTick />} axisLine={false} tickLine={false} width={55}
              domain={scatterZoomDomain ? scatterZoomDomain.y : ["auto", "auto"]}
              allowDataOverflow={!!scatterZoomDomain}
            />
            <ZAxis key="scatter-zaxis" type="number" dataKey="_bubbleZ" range={[200, 4000]} name={zMeasure.field.label} />
            {/* ── Crosshair guides ── */}
            {scatterCrosshair && (
              <>
                <ReferenceLine key="cr-ch-x" x={scatterCrosshair.x} stroke={DS_COLORS.neutral["300"]} strokeDasharray="3 3" strokeOpacity={0.4} strokeWidth={1} />
                <ReferenceLine key="cr-ch-y" y={scatterCrosshair.y} stroke={DS_COLORS.neutral["300"]} strokeDasharray="3 3" strokeOpacity={0.4} strokeWidth={1} />
              </>
            )}
            <Tooltip
              key="scatter-tooltip"
              content={({ active, payload }: any) => {
                if (!active || !payload?.length) return null;
                const p = payload[0]?.payload;
                if (!p) return null;
                const sColor = p._seriesColor || SCATTER_SERIES[0];
                return (
                  <div className="px-[14px] py-[8px] rounded-[10px] min-w-[100px]"
                    style={{ backgroundColor: DS_COLORS.neutral["400"], boxShadow: "0px 4px 16px rgba(18,34,50,0.30)", ...ff }}>
                    {p._bubbleLabel && (
                      <p className="text-[#C8CFDB] mb-[3px] truncate max-w-[180px]"
                        style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.3, textTransform: "uppercase" }}>
                        {p._bubbleLabel}
                      </p>
                    )}
                    <div className="flex items-center gap-[6px]">
                      <span className="w-[6px] h-[6px] rounded-full shrink-0" style={{ backgroundColor: sColor }} />
                      <span className="text-[#C8CFDB]" style={{ fontSize: 11, fontWeight: 500 }}>{xMeasure.field.label}:</span>
                      <span className="text-white" style={{ fontSize: 13, fontWeight: 700, letterSpacing: -0.3 }}>
                        {formatNumber ? formatNumber(p[xMeasure.field.name]) : p[xMeasure.field.name]}
                      </span>
                    </div>
                    {yMeasure !== xMeasure && (
                      <div className="flex items-center gap-[6px]">
                        <span className="w-[6px] h-[6px] rounded-full shrink-0" style={{ backgroundColor: sColor, opacity: 0.6 }} />
                        <span className="text-[#C8CFDB]" style={{ fontSize: 11, fontWeight: 500 }}>{yMeasure.field.label}:</span>
                        <span className="text-white" style={{ fontSize: 13, fontWeight: 700, letterSpacing: -0.3 }}>
                          {formatNumber ? formatNumber(p[yMeasure.field.name]) : p[yMeasure.field.name]}
                        </span>
                      </div>
                    )}
                    {zMeasure !== xMeasure && zMeasure !== yMeasure && (
                      <div className="flex items-center gap-[6px]" style={{ borderTop: "1px solid rgba(200,207,219,0.15)", paddingTop: 3, marginTop: 2 }}>
                        <span className="text-[#C8CFDB]" style={{ fontSize: 10, fontWeight: 500 }}>{zMeasure.field.label}:</span>
                        <span className="text-white" style={{ fontSize: 12, fontWeight: 700 }}>
                          {formatNumber ? formatNumber(p._bubbleZ) : p._bubbleZ}
                        </span>
                      </div>
                    )}
                  </div>
                );
              }}
              cursor={false}
            />
            <Legend key="scatter-legend" content={<CRScatterLegend />} />
            <Scatter key="scatter-data" name={dimensionField ? dimensionField.field.label : "Dados"}
              data={bubbleData} fill={getColor(0)} shape={<BubbleShape />}
              animationDuration={700} animationEasing="ease-out"
              onMouseEnter={handleBubbleEnter}
              onMouseLeave={handleBubbleLeave}
            >
              {bubbleData.map((entry: any, index: number) => (
                <Cell key={`bubble-cell-${index}`} fill={entry._seriesColor || CHART_PALETTE[index % CHART_PALETTE.length]} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════════════ */
  /*  TREEMAP                                                          */
  /* ══════════════════════════════════════════════════════════════════ */
  if (chartType === "treemap") {
    const measureField = measureFields[0];
    const nameKey = dimensionField ? dimensionField.field.name : measureField.field.name;
    const treemapData = data.map((row, idx) => ({
      name: String(row[nameKey] || `Item ${idx + 1}`),
      size: typeof row[measureField.field.name] === "number" ? row[measureField.field.name] : 0,
      fill: CHART_PALETTE[idx % CHART_PALETTE.length],
    }));

    const CustomTreemapContent = (props: any) => {
      const { x, y, width, height, name, fill, index } = props;
      if (!width || !height || width < 30 || height < 20) return null;
      const opacity = PIE_OPACITY_LAYERS[Math.min(index ?? 0, PIE_OPACITY_LAYERS.length - 1)];
      const displayName = typeof name === "string" ? name : String(name ?? "");
      return (
        <g>
          <rect x={x} y={y} width={width} height={height} fill={fill} stroke="#fff" strokeWidth={2.5} rx={8} ry={8} opacity={opacity} />
          {width > 60 && height > 30 && displayName && (
            <text x={x + width / 2} y={y + height / 2} textAnchor="middle" dominantBaseline="central" fill="#fff"
              style={{ fontSize: Math.min(12, width / 8), fontWeight: 600, ...ff }}>
              {displayName.length > 15 ? displayName.slice(0, 14) + "\u2026" : displayName}
            </text>
          )}
        </g>
      );
    };

    return (
      <div style={{ width: "100%", height: "500px", minWidth: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <RTreemap data={treemapData} dataKey="size" nameKey="name" stroke="#fff" content={<CustomTreemapContent />} animationDuration={600}>
            <Tooltip key="cr-tree-tip" content={<ZeniteTooltip />} formatter={(value: any) => [formatNumber ? formatNumber(value) : value, measureField.field.label]} />
          </RTreemap>
        </ResponsiveContainer>
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════════════ */
  /*  SANKEY — Alluvial flow diagram for funnel analysis               */
  /* ══════════════════════════════════════════════════════════════════ */
  if (chartType === "sankey") {
    const dimFields = allFields.filter(f => f.field?.type === "dimension" || f.field?.type === "date");
    const dim1Key = dimFields[0]?.field?.name || dimensionField?.field?.name || "_category";
    const dim2Key = dimFields[1]?.field?.name || null;
    const sankeyMeasureKey = measureFields[0]?.field?.name || "value";
    const dim1Label = dimFields[0]?.field?.label || dim1Key;
    const dim2Label = dimFields[1]?.field?.label || dim2Key || "Destino";

    if (!dim2Key) {
      return (
        <div className="flex flex-col items-center justify-center h-[400px] gap-2 text-[#98989d]" style={{ ...ff }}>
          <span style={{ fontSize: 13, fontWeight: 600 }}>Sankey requer 2 dimensoes + 1 medida</span>
        </div>
      );
    }

    const sankeyLinks: SankeyLink[] = data
      .filter((row: any) => row[dim1Key] && row[dim2Key])
      .map((row: any) => ({
        source: String(row[dim1Key]),
        target: String(row[dim2Key]),
        value: typeof row[sankeyMeasureKey] === "number" ? row[sankeyMeasureKey] : 1,
      }));

    return (
      <div style={{ width: "100%", height: "500px", minHeight: "350px" }}>
        <SankeyChart
          links={sankeyLinks}
          sourceLabel={dim1Label}
          targetLabel={dim2Label}
        />
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════════════ */
  /*  POLAR / RADAR — Spider, Rose (Nightingale), Polar Grid           */
  /* ══════════════════════════════════════════════════════════════════ */
  if (chartType === "radar") {
    const measureField = measureFields[0];
    const nameKey = dimensionField ? dimensionField.field.name : "category";
    const polarSub = config.polarSubType || "spider";

    const radarData = data.map((row, idx) => ({
      category: String(row[nameKey] || `Item ${idx + 1}`),
      value: typeof row[measureField.field.name] === "number" ? row[measureField.field.name] : 0,
      _idx: idx,
    }));
    const radarMax = Math.max(...radarData.map(d => d.value), 1);
    const radarNormalized = radarData.map(d => ({
      ...d,
      normalized: (d.value / radarMax) * 100,
      fullMark: 100,
    }));

    /* ── Spider (Classic Radar) — Figma polygon grid + 3-layer depth ── */
    if (polarSub === "spider") {
      const spiderColor = CHART_PALETTE[0];
      const spiderMax = radarMax;
      return (
        <div style={{ width: "100%", height: "500px", minWidth: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="68%" data={radarNormalized}>
              <PolarGrid key="cr-spider-pgrid" gridType="polygon" stroke={DS_COLORS.neutral.border} strokeOpacity={0.7} />
              <PolarAngleAxis
                key="cr-spider-angle"
                dataKey="category"
                tick={({ x, y, payload, cx: acx, cy: acy }: any) => {
                  const label = typeof payload.value === "string" && payload.value.length > 12
                    ? payload.value.slice(0, 11) + "\u2026" : payload.value;
                  const dx = x - acx; const dy = y - acy;
                  const dist = Math.sqrt(dx * dx + dy * dy);
                  const nudge = 14;
                  const nx = x + (dx / (dist || 1)) * nudge;
                  const ny = y + (dy / (dist || 1)) * nudge;
                  const anchor = Math.abs(dx) < 5 ? "middle" : dx > 0 ? "start" : "end";
                  return (
                    <text x={nx} y={ny} textAnchor={anchor} dominantBaseline="central"
                      fill={DS_COLORS.neutral["300"]} style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.2, ...ff }}>
                      {label}
                    </text>
                  );
                }}
              />
              <PolarRadiusAxis key="cr-spider-raxis" angle={90} domain={[0, 100]} axisLine={false}
                tick={({ x, y, payload }: any) => {
                  if (payload.value === 0) return <g />;
                  const realVal = Math.round((payload.value / 100) * spiderMax);
                  return (
                    <g>
                      <rect x={x - 16} y={y - 9} width={32} height={18} rx={3} fill="white"
                        stroke={DS_COLORS.neutral.border} strokeWidth={0.8}
                        style={{ filter: "drop-shadow(0px 1px 3px rgba(84,110,122,0.15))" }} />
                      <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="central"
                        fill={DS_COLORS.neutral["400"]} style={{ fontSize: 10, fontWeight: 600, letterSpacing: 0.2, ...ff }}>
                        {realVal > 999 ? `${(realVal / 1000).toFixed(0)}k` : realVal}
                      </text>
                    </g>
                  );
                }}
                tickCount={6}
              />
              {/* Layer 1 — light ghost fill (3-layer stacked depth) */}
              <Radar key="cr-spider-ghost" dataKey="normalized" name="_ghost"
                stroke="none" fill={spiderColor} fillOpacity={0.08}
                dot={false} isAnimationActive={false} legendType="none" />
              {/* Layer 2 — main fill + stroke + dots */}
              <Radar key="cr-spider-main" name={measureField.field.label} dataKey="normalized"
                stroke={spiderColor} strokeWidth={2} fill={spiderColor} fillOpacity={0.22}
                dot={{ r: 4, fill: spiderColor, stroke: "#fff", strokeWidth: 2 }}
                activeDot={{ r: 6, fill: spiderColor, stroke: "#fff", strokeWidth: 2.5 }}
                animationDuration={800} animationEasing="ease-out" />
              <Tooltip key="cr-spider-tip" content={({ active, payload }: any) => {
                if (!active || !payload?.length) return null;
                const p = payload.find((e: any) => e.name !== "_ghost")?.payload || payload[0]?.payload;
                return (
                  <div className="px-[12px] py-[7px] rounded-[10px]"
                    style={{ backgroundColor: DS_COLORS.neutral["400"], boxShadow: "0px 4px 12px rgba(18,34,50,0.25)" }}>
                    <p style={{ fontSize: 9, fontWeight: 700, color: "#C8CFDB", letterSpacing: 0.3, textTransform: "uppercase", marginBottom: 2, ...ff }}>
                      {p?.category}
                    </p>
                    <div className="flex items-center gap-[5px]">
                      <span className="w-[5px] h-[5px] rounded-full" style={{ backgroundColor: spiderColor }} />
                      <span style={{ fontSize: 11, fontWeight: 500, color: "#C8CFDB", ...ff }}>{measureField.field.label}:</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: "white", letterSpacing: -0.3, ...ff }}>
                        {formatNumber ? formatNumber(p?.value) : p?.value}
                      </span>
                    </div>
                  </div>
                );
              }} />
              <Legend key="cr-spider-leg" content={<ZeniteLegend />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      );
    }

    /* ── Rose (Nightingale / Coxcomb) ── */
    if (polarSub === "rose") {
      const roseMax = Math.max(...radarData.map(d => d.value), 1);
      const roseData = radarData.map((d, i) => ({
        ...d,
        fill: CHART_PALETTE[i % CHART_PALETTE.length],
        outerR: 20 + (d.value / roseMax) * 80,
      }));
      const angleStep = 360 / roseData.length;
      const svgCx = 200, svgCy = 200, svgMaxR = 140;
      const gridRings = [0.25, 0.5, 0.75, 1.0];
      const ROSE_OPACITIES = [0.85, 0.72, 0.60, 0.50, 0.42, 0.35];

      const sectorPath = (startAngle: number, endAngle: number, radius: number) => {
        const toRad = (a: number) => ((a - 90) * Math.PI) / 180;
        const x1 = svgCx + radius * Math.cos(toRad(startAngle));
        const y1 = svgCy + radius * Math.sin(toRad(startAngle));
        const x2 = svgCx + radius * Math.cos(toRad(endAngle));
        const y2 = svgCy + radius * Math.sin(toRad(endAngle));
        const largeArc = endAngle - startAngle > 180 ? 1 : 0;
        return `M${svgCx},${svgCy} L${x1},${y1} A${radius},${radius} 0 ${largeArc} 1 ${x2},${y2} Z`;
      };

      return (
        <div style={{ width: "100%", height: "500px", minWidth: "300px" }} className="flex items-center justify-center">
          <svg viewBox="0 0 400 400" width="100%" height="100%" style={{ maxWidth: 450, maxHeight: 450 }}>
            {gridRings.map((pct, i) => (
              <circle key={`cr-ring-${i}`} cx={svgCx} cy={svgCy} r={svgMaxR * pct}
                fill="none" stroke={DS_COLORS.neutral.border} strokeWidth={1} strokeDasharray="3 3" strokeOpacity={0.5} />
            ))}
            {roseData.map((d, i) => {
              const start = i * angleStep;
              const end = start + angleStep - 1.5;
              const r = (d.outerR / 100) * svgMaxR;
              const opacity = ROSE_OPACITIES[Math.min(i, ROSE_OPACITIES.length - 1)];
              return (
                <g key={`cr-rose-${i}`}>
                  <path d={sectorPath(start, end, r * 1.08)} fill={d.fill} opacity={opacity * 0.25} />
                  <path d={sectorPath(start, end, r)} fill={d.fill} opacity={opacity} stroke="white" strokeWidth={1.5} />
                </g>
              );
            })}
            {roseData.map((d, i) => {
              const midAngle = i * angleStep + angleStep / 2;
              const toRad = (a: number) => ((a - 90) * Math.PI) / 180;
              const labelR = svgMaxR + 16;
              const lx = svgCx + labelR * Math.cos(toRad(midAngle));
              const ly = svgCy + labelR * Math.sin(toRad(midAngle));
              const label = d.category.length > 8 ? d.category.slice(0, 7) + "\u2026" : d.category;
              const anchor = midAngle > 90 && midAngle < 270 ? "end" : "start";
              return (
                <text key={`cr-lbl-${i}`} x={lx} y={ly}
                  textAnchor={Math.abs(midAngle - 180) < 5 || Math.abs(midAngle) < 5 || midAngle > 355 ? "middle" : anchor}
                  dominantBaseline="central" fill={DS_COLORS.neutral.muted}
                  style={{ fontSize: 9, fontWeight: 500, letterSpacing: -0.2, ...ff }}>
                  {label}
                </text>
              );
            })}
            <circle cx={svgCx} cy={svgCy} r={3} fill={DS_COLORS.neutral["400"]} opacity={0.3} />
          </svg>
        </div>
      );
    }

    /* ── Polar Grid (Pie on polar concentric grid) ── */
    const polarPieData = radarData.map((d, i) => ({
      ...d,
      fill: CHART_PALETTE[i % CHART_PALETTE.length],
    }));
    const POLAR_OPACITIES = [0.85, 0.70, 0.55, 0.42, 0.32, 0.24];

    return (
      <div style={{ width: "100%", height: "500px", minWidth: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {[0.25, 0.5, 0.75, 1.0].map((pct, i) => (
              <Pie key={`cr-pgrid-${i}`} data={[{ value: 1 }]} dataKey="value"
                cx="50%" cy="48%" outerRadius={`${pct * 72}%`} innerRadius={`${Math.max(0, pct * 72 - 0.5)}%`}
                isAnimationActive={false} stroke="none">
                <Cell key={`cr-pgrid-cell-${i}`} fill={DS_COLORS.neutral.border} opacity={0.4} />
              </Pie>
            ))}
            <Pie data={polarPieData} cx="50%" cy="48%" innerRadius={0} outerRadius="68%"
              dataKey="value" nameKey="category" paddingAngle={0} stroke="none"
              label={({ cx: pcx, cy: pcy, midAngle, outerRadius: or, name, value, percent }: any) => {
                const RAD = Math.PI / 180;
                const cos = Math.cos(-RAD * midAngle);
                const sin = Math.sin(-RAD * midAngle);
                const ex = pcx + (or + 22) * cos;
                const ey = pcy + (or + 22) * sin;
                const sx = pcx + (or + 4) * cos;
                const sy = pcy + (or + 4) * sin;
                const anchor = cos >= 0 ? "start" : "end";
                const dName = typeof name === "string" && name.length > 10 ? name.slice(0, 9) + "\u2026" : name;
                return (
                  <g>
                    <path d={`M${sx},${sy}L${ex},${ey}`} stroke={DS_COLORS.neutral.border} strokeWidth={1} fill="none" opacity={0.6} />
                    <text x={ex + (cos >= 0 ? 3 : -3)} y={ey - 4} textAnchor={anchor}
                      fill={DS_COLORS.neutral["400"]} style={{ fontSize: 10, fontWeight: 600, letterSpacing: -0.2, ...ff }}>
                      {dName}
                    </text>
                    <text x={ex + (cos >= 0 ? 3 : -3)} y={ey + 8} textAnchor={anchor}
                      fill={DS_COLORS.neutral.muted} style={{ fontSize: 9, fontWeight: 500, ...ff }}>
                      {formatNumber ? formatNumber(value) : value} ({(percent * 100).toFixed(0)}%)
                    </text>
                  </g>
                );
              }}
              labelLine={false}
              animationDuration={800} animationEasing="ease-out">
              {polarPieData.map((d, i) => (
                <Cell key={`cr-polar-cell-${i}`} fill={d.fill} stroke="white" strokeWidth={2}
                  opacity={POLAR_OPACITIES[Math.min(i, POLAR_OPACITIES.length - 1)]} />
              ))}
            </Pie>
            <Tooltip key="cr-polar-tip" content={({ active, payload }: any) => {
              if (!active || !payload?.length) return null;
              const p = payload[0];
              return (
                <div className="px-[12px] py-[7px] rounded-[10px]"
                  style={{ backgroundColor: DS_COLORS.neutral["400"], boxShadow: "0px 4px 12px rgba(18,34,50,0.25)" }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "white", ...ff }}>{p.name}</p>
                  <div className="flex items-center gap-[5px] mt-[2px]">
                    <span className="w-[5px] h-[5px] rounded-full" style={{ backgroundColor: p.payload?.fill }} />
                    <span style={{ fontSize: 11, fontWeight: 500, color: "#C8CFDB", ...ff }}>
                      {measureField.field.label}: {formatNumber ? formatNumber(p.value) : p.value}
                    </span>
                  </div>
                </div>
              );
            }} />
            <Legend key="cr-polar-leg" content={<ZeniteLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════════════ */
  /*  FALLBACK → Bar                                                   */
  /* ══════════════════════════════════════════════════════════════════ */
  console.warn(`[ChartRenderer] Tipo "${chartType}" nao reconhecido, renderizando como barra`);
  return (
    <div style={{ width: "100%", height: "500px", minWidth: "300px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 16, right: 24, left: 8, bottom: 48 }} barCategoryGap="20%">
          <CartesianGrid key="fb-grid" strokeDasharray="none" stroke={DS_COLORS.neutral.border} strokeOpacity={0.5} vertical={false} />
          <XAxis
            key="fb-xaxis"
            dataKey={xAxisKey}
            tick={<DSAxisTick angle={data.length > 8 ? -40 : 0} />}
            axisLine={{ stroke: DS_COLORS.neutral.border, strokeWidth: 1 }}
            tickLine={false}
            height={data.length > 8 ? 70 : 40}
          />
          <YAxis key="fb-yaxis" tick={<DSYAxisTick />} axisLine={false} tickLine={false} width={55} />
          <Tooltip key="fb-tooltip" content={<ZeniteTooltip />} cursor={{ fill: "rgba(7,171,222,0.06)", radius: 3 }} />
          <Legend key="fb-legend" content={<ZeniteLegend />} />
          {measureFields.map((field, index) => (
            <Bar
              key={`fallback-bar-${index}-${field.field.name}`}
              dataKey={field.field.name}
              fill={getColor(index)}
              name={field.field.label}
              shape={<StackedBarShape />}
              animationDuration={700}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}