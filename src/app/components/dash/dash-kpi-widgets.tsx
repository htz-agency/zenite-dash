/* ================================================================== */
/*  Zenite Dash — KPI Widgets                                         */
/*  Single-number widgets, bullet charts, dial & full-dial gauges     */
/* ================================================================== */

import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
  X, CaretDown, CaretRight, MagnifyingGlass, TrendUp, TrendDown,
  Minus, Heart, Building, IdentificationCard, SketchLogo, Lightning,
  GoogleLogo, MetaLogo, LinkedinLogo, Check,
  ArrowUp, ArrowDown, Equals, Funnel, Plus, Trash,
  ClipboardText, Package, Phone, Textbox, FloppyDisk,
} from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";
import { formatNumber } from "./dash-data-provider";

const ff: React.CSSProperties = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

/* ══════════════════════════════════════════════════════════════ */
/*  Types                                                         */
/* ══════════════════════════════════════════════════════════════ */

export type KpiWidgetVariant =
  | "simple"           // Label + Value
  | "secondary"        // Label + Value + secondary label:value
  | "full"             // Label + secondary + tertiary
  | "indicator"        // Label + Value + trend arrow
  | "indicator-sec"    // Label + Value + trend arrow + secondary
  | "indicator-full"   // Label + Value + trend arrow + secondary + tertiary
  | "bullet"           // Bullet chart
  | "dial"             // Half-dial gauge
  | "full-dial";       // Full-circle gauge

export interface KpiFieldBinding {
  fieldId: string;
  fieldName: string;
  fieldLabel: string;
  table: string;
  aggregation: string;
  dataType?: string;
}

export interface KpiNumberFormat {
  prefix?: string;            // e.g. "R$", "$", "€"
  suffix?: string;            // e.g. "%", " un."
  units?: "auto" | "none" | "K" | "M" | "B";
  decimalPlaces?: number;     // 0–4
  thousandSep?: "dot" | "comma" | "space" | "none";
  decimalSep?: "comma" | "dot";
  negativeStyle?: "minus" | "parentheses" | "red";
}

export interface KpiWidgetConfig {
  variant: KpiWidgetVariant;
  title: string;
  primaryField?: KpiFieldBinding;
  secondaryField?: KpiFieldBinding;
  tertiaryField?: KpiFieldBinding;
  comparisonField?: KpiFieldBinding;
  // Bullet / Dial settings
  minValue?: number;
  maxValue?: number;
  targetValue?: number;
  qualitativeRanges?: { label: string; value: number; color: string }[];
  // Style
  accentColor?: string;
  showTrend?: boolean;
  trendDirection?: "up" | "down" | "neutral";
  // Number format
  numberFormat?: KpiNumberFormat;
  // Filters
  filters?: KpiWidgetFilter[];
}

export interface KpiWidgetFilter {
  id: string;
  fieldId: string;
  fieldName: string;
  fieldLabel: string;
  table: string;
  dataType?: string;
  // Advanced filter
  mode: "include" | "exclude";
  selectedValues: string[];
  componentType: "multi" | "single" | "slider-double";
  // Date granularity
  dateGranularity?: "year" | "quarter" | "month" | "week" | "date" | "datetime" | "range";
  // Numeric range
  aggregationFn?: string;
  rangeMin?: number;
  rangeMax?: number;
  // Legacy compat
  operator: "equals" | "not_equals" | "contains" | "gt" | "gte" | "lt" | "lte" | "between" | "in";
  value: string;
}

const FILTER_OPERATORS = [
  { id: "equals" as const, label: "Igual a" },
  { id: "not_equals" as const, label: "Diferente de" },
  { id: "contains" as const, label: "Contém" },
  { id: "gt" as const, label: "Maior que" },
  { id: "gte" as const, label: "Maior ou igual" },
  { id: "lt" as const, label: "Menor que" },
  { id: "lte" as const, label: "Menor ou igual" },
  { id: "between" as const, label: "Entre" },
  { id: "in" as const, label: "Está em" },
];

/* ══════════════════════════════════════════════════════════════ */
/*  Aggregation helpers                                           */
/* ══════════════════════════════════════════════════════════════ */

const AGGREGATIONS = [
  { id: "SUM", label: "Soma" },
  { id: "AVG", label: "Média" },
  { id: "COUNT", label: "Contagem" },
  { id: "MIN", label: "Mínimo" },
  { id: "MAX", label: "Máximo" },
  { id: "COUNTD", label: "Contagem Distinta" },
  { id: "MEDIAN", label: "Mediana" },
  { id: "STDEV", label: "Desvio Padrão" },
];

export function computeAggregation(
  data: any[],
  fieldName: string,
  aggregation: string
): number {
  if (!data || data.length === 0) return 0;

  if (aggregation === "COUNT") return data.length;
  if (fieldName === "_count") return data.length;

  const values = data
    .map((r) => {
      const v = r[fieldName];
      return typeof v === "number" ? v : parseFloat(v);
    })
    .filter((v) => !isNaN(v));

  if (values.length === 0) return 0;

  switch (aggregation) {
    case "SUM":
      return values.reduce((a, b) => a + b, 0);
    case "AVG":
      return values.reduce((a, b) => a + b, 0) / values.length;
    case "MIN":
      return Math.min(...values);
    case "MAX":
      return Math.max(...values);
    case "COUNTD":
      return new Set(data.map((r) => r[fieldName])).size;
    case "MEDIAN": {
      const sorted = [...values].sort((a, b) => a - b);
      const mid = Math.floor(sorted.length / 2);
      return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
    }
    case "STDEV": {
      const mean = values.reduce((a, b) => a + b, 0) / values.length;
      const sq = values.reduce((a, v) => a + (v - mean) ** 2, 0) / values.length;
      return Math.sqrt(sq);
    }
    default:
      return values.reduce((a, b) => a + b, 0);
  }
}

export function formatKpiValue(value: number, fmt?: KpiNumberFormat): string {
  if (!fmt || Object.keys(fmt).length === 0) {
    // Legacy auto-format
    const abs = Math.abs(value);
    if (abs >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(2)}B`;
    if (abs >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`;
    if (abs >= 1_000) return `${(value / 1_000).toFixed(2)}K`;
    if (Number.isInteger(value)) return value.toString();
    return value.toFixed(2);
  }

  const units = fmt.units ?? "auto";
  const dec = fmt.decimalPlaces ?? 2;
  const tSep = fmt.thousandSep ?? "dot";
  const dSep = fmt.decimalSep ?? "comma";
  const negStyle = fmt.negativeStyle ?? "minus";

  // Scale
  let scaled = value;
  let unitSuffix = "";
  if (units === "auto") {
    const abs = Math.abs(value);
    if (abs >= 1_000_000_000) { scaled = value / 1_000_000_000; unitSuffix = "B"; }
    else if (abs >= 1_000_000) { scaled = value / 1_000_000; unitSuffix = "M"; }
    else if (abs >= 1_000) { scaled = value / 1_000; unitSuffix = "K"; }
  } else if (units === "K") { scaled = value / 1_000; unitSuffix = "K"; }
  else if (units === "M") { scaled = value / 1_000_000; unitSuffix = "M"; }
  else if (units === "B") { scaled = value / 1_000_000_000; unitSuffix = "B"; }

  const isNeg = scaled < 0;
  let abs = Math.abs(scaled);

  // Fixed decimals
  const fixed = abs.toFixed(dec);
  const [intPart, decPart] = fixed.split(".");

  // Thousand separator
  const sepChar = tSep === "dot" ? "." : tSep === "comma" ? "," : tSep === "space" ? " " : "";
  const intFormatted = sepChar
    ? intPart.replace(/\B(?=(\d{3})+(?!\d))/g, sepChar)
    : intPart;

  // Decimal separator
  const dChar = dSep === "comma" ? "," : ".";
  const numStr = dec > 0 && decPart ? `${intFormatted}${dChar}${decPart}` : intFormatted;

  // Assemble
  const core = `${fmt.prefix ?? ""}${numStr}${unitSuffix}${fmt.suffix ?? ""}`;

  if (isNeg) {
    if (negStyle === "parentheses") return `(${core})`;
    return `−${core}`;
  }
  return core;
}

/* ══════════════════════════════════════════════════════════════ */
/*  Table meta (matches composer)                                 */
/* ══════════════════════════════════════════════════════════════ */

const TABLE_META: Record<string, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  leads:              { label: "LEADS",          color: "#EAC23D", bg: "#FEEDCA", icon: <Heart size={11} weight="fill" /> },
  opportunities:      { label: "OPORTUNIDADES", color: "#07ABDE", bg: "#DCF0FF", icon: <SketchLogo size={11} weight="fill" /> },
  activities:         { label: "ATIVIDADES",     color: "#4E6987", bg: "#DDE3EC", icon: <Lightning size={11} weight="fill" /> },
  accounts:           { label: "CONTAS",         color: "#28415C", bg: "#DDE3EC", icon: <Building size={11} weight="fill" /> },
  contacts:           { label: "CONTATOS",       color: "#FF8C76", bg: "#FFEDEB", icon: <IdentificationCard size={11} weight="fill" /> },
  monthlyRevenue:     { label: "RECEITA",        color: "#07ABDE", bg: "#DCF0FF", icon: <SketchLogo size={11} weight="fill" /> },
  pipelineByStage:    { label: "PIPELINE",       color: "#07ABDE", bg: "#DCF0FF", icon: <SketchLogo size={11} weight="fill" /> },
  leadsBySource:      { label: "LEADS/ORIGEM",   color: "#EAC23D", bg: "#FEEDCA", icon: <Heart size={11} weight="fill" /> },
  activityByType:     { label: "ATIV./TIPO",     color: "#4E6987", bg: "#DDE3EC", icon: <Lightning size={11} weight="fill" /> },
  sync_google_ads:    { label: "GOOGLE ADS",     color: "#4285F4", bg: "#E8F0FE", icon: <GoogleLogo size={11} weight="duotone" /> },
  sync_meta_ads:      { label: "META ADS",       color: "#0668E1", bg: "#E7F3FF", icon: <MetaLogo size={11} weight="duotone" /> },
  sync_linkedin_ads:  { label: "LINKEDIN ADS",   color: "#0A66C2", bg: "#E8F1FA", icon: <LinkedinLogo size={11} weight="duotone" /> },
  proposals:          { label: "PROPOSTAS",      color: "#07ABDE", bg: "#FFE8E0", icon: <ClipboardText size={11} weight="fill" /> },
  proposal_services:  { label: "SERVIÇOS PROP.", color: "#4E6987", bg: "#E0E8F0", icon: <Package size={11} weight="fill" /> },
  call_records:       { label: "LIGAÇÕES",       color: "#23E6B2", bg: "#D9F4FB", icon: <Phone size={11} weight="fill" /> },
  field_history:      { label: "HISTÓRICO",      color: "#8C8CD4", bg: "#D9F8EF", icon: <Textbox size={11} weight="fill" /> },
};

/* ══════════════════════════════════════════════════════════════ */
/*  KPI Widget Renderer — draws the final widget on canvas        */
/* ══════════════════════════════════════════════════════════════ */

export function KpiWidgetRenderer({
  config,
  data,
  width,
  height,
}: {
  config: KpiWidgetConfig;
  data: any[];
  width?: number;
  height?: number;
}) {
  const primaryVal = useMemo(() => {
    if (!config.primaryField) return 0;
    return computeAggregation(data, config.primaryField.fieldName, config.primaryField.aggregation);
  }, [data, config.primaryField]);

  const secondaryVal = useMemo(() => {
    if (!config.secondaryField) return null;
    return computeAggregation(data, config.secondaryField.fieldName, config.secondaryField.aggregation);
  }, [data, config.secondaryField]);

  const tertiaryVal = useMemo(() => {
    if (!config.tertiaryField) return null;
    return computeAggregation(data, config.tertiaryField.fieldName, config.tertiaryField.aggregation);
  }, [data, config.tertiaryField]);

  const comparisonVal = useMemo(() => {
    if (!config.comparisonField) return null;
    return computeAggregation(data, config.comparisonField.fieldName, config.comparisonField.aggregation);
  }, [data, config.comparisonField]);

  const trend = useMemo(() => {
    if (comparisonVal == null || comparisonVal === 0) return config.trendDirection || "neutral";
    return primaryVal > comparisonVal ? "up" : primaryVal < comparisonVal ? "down" : "neutral";
  }, [primaryVal, comparisonVal, config.trendDirection]);

  const accent = config.accentColor || "#122232";
  const v = config.variant;

  // ── Bullet Chart ──
  if (v === "bullet") {
    return (
      <BulletChartWidget
        title={config.title || "KPI"}
        value={primaryVal}
        target={config.targetValue ?? primaryVal * 1.1}
        min={config.minValue ?? 0}
        max={config.maxValue ?? primaryVal * 1.5}
        ranges={config.qualitativeRanges}
        accent={accent}
      />
    );
  }

  // ── Dial Chart ──
  if (v === "dial") {
    return (
      <DialChartWidget
        title={config.title || "KPI"}
        value={primaryVal}
        target={config.targetValue}
        min={config.minValue ?? 0}
        max={config.maxValue ?? primaryVal * 1.5}
        accent={accent}
      />
    );
  }

  // ── Full Dial Chart ──
  if (v === "full-dial") {
    return (
      <FullDialChartWidget
        title={config.title || "KPI"}
        value={primaryVal}
        max={config.maxValue ?? primaryVal * 1.5}
        accent={accent}
      />
    );
  }

  // ── Label Widgets ──
  const showTrend = v === "indicator" || v === "indicator-sec" || v === "indicator-full";
  const showSecondary = v === "secondary" || v === "full" || v === "indicator-sec" || v === "indicator-full";
  const showTertiary = v === "full" || v === "indicator-full";

  return (
    <div className="h-full w-full flex flex-col items-center justify-center px-4 py-3 gap-1">
      {/* Title */}
      <span
        className="text-[#4E6987] text-center truncate w-full"
        style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.2, ...ff }}
      >
        {config.title || "KPI"}
      </span>

      {/* Secondary top (for "full" / "indicator-full" variants with tertiary) */}
      {showSecondary && secondaryVal != null && (
        <span className="text-[#98989d] text-center" style={{ fontSize: 10, fontWeight: 500, ...ff }}>
          {config.secondaryField?.fieldLabel || "Sec"}: {formatKpiValue(secondaryVal, config.numberFormat)}
        </span>
      )}

      {/* Primary Value */}
      <div className="flex items-center gap-2">
        <span
          className="text-center"
          style={{
            fontSize: Math.min(36, Math.max(22, (width || 200) * 0.14)),
            fontWeight: 800,
            letterSpacing: -1,
            color: accent,
            lineHeight: 1.1,
            ...ff,
          }}
        >
          {config.primaryField ? formatKpiValue(primaryVal, config.numberFormat) : "--"}
        </span>
        {showTrend && (
          <span
            className="flex items-center"
            style={{ color: trend === "up" ? "#16A34A" : trend === "down" ? "#DC2626" : "#98989d" }}
          >
            {trend === "up" ? (
              <ArrowUp size={18} weight="bold" />
            ) : trend === "down" ? (
              <ArrowDown size={18} weight="bold" />
            ) : (
              <Equals size={14} weight="bold" />
            )}
          </span>
        )}
      </div>

      {/* Tertiary */}
      {showTertiary && tertiaryVal != null && (
        <span className="text-[#98989d] text-center" style={{ fontSize: 10, fontWeight: 500, ...ff }}>
          {config.tertiaryField?.fieldLabel || "Ter"}: {formatKpiValue(tertiaryVal, config.numberFormat)}
        </span>
      )}

      {/* Secondary bottom (for non-tertiary variants) */}
      {!showTertiary && showSecondary && secondaryVal == null && (
        <span className="text-[#C8CFDB] italic text-center" style={{ fontSize: 10, ...ff }}>
          Arraste um campo secundário
        </span>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/*  Bullet Chart (SVG)                                            */
/* ══════════════════════════════════════════════════════════════ */

function BulletChartWidget({
  title, value, target, min, max, ranges, accent,
}: {
  title: string; value: number; target: number; min: number; max: number;
  ranges?: { label: string; value: number; color: string }[];
  accent: string;
}) {
  const range = max - min || 1;
  const pct = Math.min(100, Math.max(0, ((value - min) / range) * 100));
  const targetPct = Math.min(100, Math.max(0, ((target - min) / range) * 100));

  const defaultRanges = [
    { pct: 33, color: "#DDE3EC" },
    { pct: 66, color: "#C8CFDB" },
    { pct: 100, color: "#EEF1F6" },
  ];

  return (
    <div className="h-full w-full flex flex-col items-center justify-center px-4 py-3 gap-2">
      <span className="text-[#4E6987] text-center" style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.2, ...ff }}>
        {title}
      </span>
      <div className="w-full relative" style={{ height: 28 }}>
        {/* Qualitative ranges */}
        <svg width="100%" height="28" className="absolute inset-0">
          {(ranges && ranges.length > 0
            ? ranges.map((r, i) => ({
                pct: Math.min(100, Math.max(0, ((r.value - min) / range) * 100)),
                color: r.color,
              }))
            : defaultRanges
          ).map((r, i) => (
            <rect key={i} x="0" y="2" width={`${r.pct}%`} height="24" fill={r.color} rx="4" />
          ))}
        </svg>
        {/* Value bar */}
        <div
          className="absolute top-[6px] left-0 rounded-[3px]"
          style={{ width: `${pct}%`, height: 16, backgroundColor: accent, transition: "width 0.5s ease" }}
        />
        {/* Value label inside bar */}
        <div
          className="absolute top-[6px] flex items-center justify-end pr-1.5"
          style={{ width: `${pct}%`, height: 16 }}
        >
          <span className="text-white" style={{ fontSize: 9, fontWeight: 700, ...ff }}>
            {formatKpiValue(value)}
          </span>
        </div>
        {/* Target line */}
        <div
          className="absolute top-0"
          style={{ left: `${targetPct}%`, width: 2, height: 28, backgroundColor: "#122232" }}
        />
        {/* Target label */}
        <div
          className="absolute"
          style={{ left: `${targetPct}%`, top: -12, transform: "translateX(-50%)" }}
        >
          <span className="text-[#4E6987]" style={{ fontSize: 8, fontWeight: 600, ...ff }}>
            {formatKpiValue(target)}
          </span>
        </div>
      </div>
      {/* Min / Max labels */}
      <div className="w-full flex justify-between">
        <span className="text-[#98989d]" style={{ fontSize: 8, fontWeight: 500, ...ff }}>{formatKpiValue(min)}</span>
        <span className="text-[#98989d]" style={{ fontSize: 8, fontWeight: 500, ...ff }}>{formatKpiValue(max)}</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/*  Dial Chart — Semi-circle Gauge (SVG)                          */
/* ══════════════════════════════════════════════════════════════ */

function DialChartWidget({
  title, value, target, min, max, accent,
}: {
  title: string; value: number; target?: number; min: number; max: number; accent: string;
}) {
  const range = max - min || 1;
  const pct = Math.min(1, Math.max(0, (value - min) / range));
  const targetPct = target != null ? Math.min(1, Math.max(0, (target - min) / range)) : null;

  const cx = 100, cy = 100, r = 80;
  const startAngle = Math.PI;
  const sweepAngle = Math.PI;

  const arcPath = (startFrac: number, endFrac: number) => {
    const a1 = startAngle + sweepAngle * startFrac;
    const a2 = startAngle + sweepAngle * endFrac;
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    const x2 = cx + r * Math.cos(a2);
    const y2 = cy + r * Math.sin(a2);
    const largeArc = endFrac - startFrac > 0.5 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
  };

  // Needle
  const needleAngle = startAngle + sweepAngle * pct;
  const needleLen = r - 10;
  const nx = cx + needleLen * Math.cos(needleAngle);
  const ny = cy + needleLen * Math.sin(needleAngle);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center px-2 py-2 gap-0">
      <span className="text-[#4E6987] text-center" style={{ fontSize: 11, fontWeight: 600, letterSpacing: -0.2, ...ff }}>
        {title}
      </span>
      <svg viewBox="0 0 200 115" className="w-full max-w-[180px]">
        {/* Background track */}
        <path d={arcPath(0, 1)} fill="none" stroke="#EEF1F6" strokeWidth="18" strokeLinecap="round" />
        {/* Value arc */}
        <path d={arcPath(0, pct)} fill="none" stroke={accent} strokeWidth="18" strokeLinecap="round" />
        {/* Target tick */}
        {targetPct != null && (() => {
          const ta = startAngle + sweepAngle * targetPct;
          const tx1 = cx + (r - 12) * Math.cos(ta);
          const ty1 = cy + (r - 12) * Math.sin(ta);
          const tx2 = cx + (r + 12) * Math.cos(ta);
          const ty2 = cy + (r + 12) * Math.sin(ta);
          return <line x1={tx1} y1={ty1} x2={tx2} y2={ty2} stroke="#122232" strokeWidth="2" />;
        })()}
        {/* Needle */}
        <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="#122232" strokeWidth="2" strokeLinecap="round" />
        <circle cx={cx} cy={cy} r="4" fill="#122232" />
      </svg>
      <span
        className="text-center -mt-2"
        style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.8, color: accent, ...ff }}
      >
        {formatKpiValue(value)}
      </span>
      <div className="w-full flex justify-between px-4 -mt-1">
        <span className="text-[#98989d]" style={{ fontSize: 8, ...ff }}>{formatKpiValue(min)}</span>
        {targetPct != null && (
          <span className="text-[#4E6987]" style={{ fontSize: 8, fontWeight: 600, ...ff }}>{formatKpiValue(target!)}</span>
        )}
        <span className="text-[#98989d]" style={{ fontSize: 8, ...ff }}>{formatKpiValue(max)}</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/*  Full Dial Chart — Full-circle Gauge (SVG)                     */
/* ══════════════════════════════════════════════════════════════ */

function FullDialChartWidget({
  title, value, max, accent,
}: {
  title: string; value: number; max: number; accent: string;
}) {
  const pct = max > 0 ? Math.min(1, Math.max(0, value / max)) : 0;
  const cx = 60, cy = 60, r = 50;
  const circumference = 2 * Math.PI * r;
  const dashOffset = circumference * (1 - pct);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center px-2 py-2">
      <span className="text-[#4E6987] text-center mb-1" style={{ fontSize: 11, fontWeight: 600, letterSpacing: -0.2, ...ff }}>
        {title}
      </span>
      <div className="relative">
        <svg viewBox="0 0 120 120" className="w-full max-w-[110px]">
          {/* Background ring */}
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#EEF1F6" strokeWidth="10" />
          {/* Value ring */}
          <circle
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={accent}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            transform={`rotate(-90 ${cx} ${cy})`}
            style={{ transition: "stroke-dashoffset 0.5s ease" }}
          />
        </svg>
        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: -0.5, color: accent, ...ff }}>
            {(pct * 100).toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/*  Widget Thumbnail Preview (for sidebar)                        */
/* ══════════════════════════════════════════════════════════════ */

export const WIDGET_VARIANTS: {
  id: KpiWidgetVariant;
  label: string;
  category: "label" | "chart";
  description: string;
}[] = [
  { id: "simple",         label: "Rótulo",                category: "label", description: "Valor único" },
  { id: "secondary",      label: "Rótulo + Sec.",         category: "label", description: "Valor + secundário" },
  { id: "full",           label: "Rótulo Completo",       category: "label", description: "Valor + sec. + ter." },
  { id: "indicator",      label: "Indicador",             category: "label", description: "Valor + tendência" },
  { id: "indicator-sec",  label: "Indicador + Sec.",      category: "label", description: "Valor + tend. + sec." },
  { id: "indicator-full", label: "Indicador Completo",    category: "label", description: "Valor + tend. + sec. + ter." },
  { id: "bullet",         label: "Gráf. Bullet",          category: "chart", description: "Barra com meta" },
  { id: "dial",           label: "Gráf. Dial",            category: "chart", description: "Medidor semicírculo" },
  { id: "full-dial",      label: "Gráf. Dial Completo",   category: "chart", description: "Medidor circular completo" },
];

export function WidgetThumbnail({ variant }: { variant: typeof WIDGET_VARIANTS[number] }) {
  const isChart = variant.category === "chart";

  return (
    <div className="flex flex-col items-center gap-1 p-2 rounded-[10px] border border-[#EEF1F6] hover:bg-[#EEF1F6] transition-all cursor-grab active:cursor-grabbing">
      {/* Mini preview */}
      <div className="w-full h-[48px] flex items-center justify-center bg-[#F6F7F9] rounded-[6px]">
        {variant.id === "simple" && (
          <div className="flex flex-col items-center">
            <span className="text-[#98989d]" style={{ fontSize: 7, fontWeight: 600, ...ff }}>T&#237;tulo</span>
            <span className="text-[#122232]" style={{ fontSize: 14, fontWeight: 800, ...ff }}>Valor</span>
          </div>
        )}
        {variant.id === "secondary" && (
          <div className="flex flex-col items-center">
            <span className="text-[#98989d]" style={{ fontSize: 7, fontWeight: 600, ...ff }}>T&#237;tulo</span>
            <span className="text-[#122232]" style={{ fontSize: 12, fontWeight: 800, ...ff }}>Valor</span>
            <span className="text-[#98989d]" style={{ fontSize: 6, ...ff }}>Sec: Valor 2</span>
          </div>
        )}
        {variant.id === "full" && (
          <div className="flex flex-col items-center">
            <span className="text-[#98989d]" style={{ fontSize: 6, ...ff }}>Sec: Valor 2</span>
            <span className="text-[#122232]" style={{ fontSize: 11, fontWeight: 800, ...ff }}>Valor</span>
            <span className="text-[#98989d]" style={{ fontSize: 6, ...ff }}>Ter: Valor 3</span>
          </div>
        )}
        {variant.id === "indicator" && (
          <div className="flex flex-col items-center">
            <span className="text-[#98989d]" style={{ fontSize: 7, fontWeight: 600, ...ff }}>T&#237;tulo</span>
            <div className="flex items-center gap-0.5">
              <span className="text-[#122232]" style={{ fontSize: 12, fontWeight: 800, ...ff }}>Valor</span>
              <ArrowUp size={8} weight="bold" className="text-[#16A34A]" />
            </div>
          </div>
        )}
        {variant.id === "indicator-sec" && (
          <div className="flex flex-col items-center">
            <span className="text-[#98989d]" style={{ fontSize: 7, fontWeight: 600, ...ff }}>T&#237;tulo</span>
            <div className="flex items-center gap-0.5">
              <span className="text-[#122232]" style={{ fontSize: 11, fontWeight: 800, ...ff }}>Valor</span>
              <ArrowUp size={7} weight="bold" className="text-[#16A34A]" />
            </div>
            <span className="text-[#98989d]" style={{ fontSize: 6, ...ff }}>Sec: Valor 2</span>
          </div>
        )}
        {variant.id === "indicator-full" && (
          <div className="flex flex-col items-center">
            <span className="text-[#98989d]" style={{ fontSize: 6, ...ff }}>Sec: Valor 2</span>
            <div className="flex items-center gap-0.5">
              <span className="text-[#122232]" style={{ fontSize: 10, fontWeight: 800, ...ff }}>Valor</span>
              <ArrowUp size={7} weight="bold" className="text-[#16A34A]" />
            </div>
            <span className="text-[#98989d]" style={{ fontSize: 6, ...ff }}>Ter: Valor 3</span>
          </div>
        )}
        {variant.id === "bullet" && (
          <div className="w-full px-2 flex flex-col items-center gap-1">
            <div className="w-full h-[8px] rounded-[2px] bg-[#DDE3EC] relative">
              <div className="absolute inset-y-0 left-0 w-[60%] rounded-[2px] bg-[#28415C]" />
              <div className="absolute top-[-2px] bottom-[-2px] w-[1.5px] bg-[#122232]" style={{ left: "75%" }} />
            </div>
          </div>
        )}
        {variant.id === "dial" && (
          <svg viewBox="0 0 50 30" className="w-[40px]">
            <path d="M 5 28 A 20 20 0 0 1 45 28" fill="none" stroke="#EEF1F6" strokeWidth="5" strokeLinecap="round" />
            <path d="M 5 28 A 20 20 0 0 1 35 12" fill="none" stroke="#28415C" strokeWidth="5" strokeLinecap="round" />
          </svg>
        )}
        {variant.id === "full-dial" && (
          <svg viewBox="0 0 40 40" className="w-[36px]">
            <circle cx="20" cy="20" r="15" fill="none" stroke="#EEF1F6" strokeWidth="4" />
            <circle
              cx="20" cy="20" r="15" fill="none" stroke="#28415C" strokeWidth="4"
              strokeDasharray={`${2 * Math.PI * 15 * 0.68} ${2 * Math.PI * 15}`}
              strokeLinecap="round"
              transform="rotate(-90 20 20)"
            />
            <text x="20" y="22" textAnchor="middle" fill="#122232" style={{ fontSize: 7, fontWeight: 700 }}>68%</text>
          </svg>
        )}
      </div>
      <span className="text-[#122232] text-center" style={{ fontSize: 9, fontWeight: 700, letterSpacing: -0.2, ...ff }}>
        {variant.label}
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/*  KPI Widget Editor Modal                                       */
/* ══════════════════════════════════════════════════════════════ */

interface FieldDef {
  id: string;
  name: string;
  label: string;
  table: string;
  type: "dimension" | "measure" | "date";
  dataType: string;
  aggregation?: string;
}

export function KpiWidgetEditor({
  config,
  onChange,
  onClose,
  allTables,
  getTableData,
}: {
  config: KpiWidgetConfig;
  onChange: (c: KpiWidgetConfig) => void;
  onClose: () => void;
  allTables: { id: string; name: string; fields: FieldDef[] }[];
  getTableData: (tableId: string) => any[];
}) {
  const [tab, setTab] = useState<"data" | "filters" | "settings">("data");
  const [fieldSearch, setFieldSearch] = useState("");
  const [expandedTable, setExpandedTable] = useState<string | null>(null);
  const [bindingTarget, setBindingTarget] = useState<"primary" | "secondary" | "tertiary" | "comparison" | null>(null);
  const [colSelectCols, setColSelectCols] = useState(false);
  const [colShowValue, setColShowValue] = useState(false);
  const [colComparison, setColComparison] = useState(false);
  const [colFormat, setColFormat] = useState(true);

  const filteredTables = useMemo(() => {
    if (!fieldSearch) return allTables;
    const q = fieldSearch.toLowerCase();
    return allTables
      .map((t) => ({
        ...t,
        fields: t.fields.filter(
          (f) =>
            f.label.toLowerCase().includes(q) ||
            f.name.toLowerCase().includes(q) ||
            t.name.toLowerCase().includes(q)
        ),
      }))
      .filter((t) => t.fields.length > 0);
  }, [allTables, fieldSearch]);

  const selectField = (field: FieldDef) => {
    if (!bindingTarget) return;
    const binding: KpiFieldBinding = {
      fieldId: field.id,
      fieldName: field.name,
      fieldLabel: field.label,
      table: field.table,
      aggregation: field.aggregation || "SUM",
      dataType: field.dataType,
    };
    const update: Partial<KpiWidgetConfig> = {};
    if (bindingTarget === "primary") update.primaryField = binding;
    else if (bindingTarget === "secondary") update.secondaryField = binding;
    else if (bindingTarget === "tertiary") update.tertiaryField = binding;
    else if (bindingTarget === "comparison") update.comparisonField = binding;
    onChange({ ...config, ...update });
    setBindingTarget(null);
  };

  const removeField = (target: "primary" | "secondary" | "tertiary" | "comparison") => {
    const update: Partial<KpiWidgetConfig> = {};
    if (target === "primary") update.primaryField = undefined;
    else if (target === "secondary") update.secondaryField = undefined;
    else if (target === "tertiary") update.tertiaryField = undefined;
    else if (target === "comparison") update.comparisonField = undefined;
    onChange({ ...config, ...update });
  };

  const updateAggregation = (target: "primary" | "secondary" | "tertiary" | "comparison", agg: string) => {
    const fieldKey = `${target}Field` as const;
    const current = config[fieldKey as keyof KpiWidgetConfig] as KpiFieldBinding | undefined;
    if (!current) return;
    onChange({ ...config, [fieldKey]: { ...current, aggregation: agg } });
  };

  const updateFormat = (patch: Partial<KpiNumberFormat>) => {
    onChange({ ...config, numberFormat: { ...(config.numberFormat || {}), ...patch } });
  };

  const isChartVariant = config.variant === "bullet" || config.variant === "dial" || config.variant === "full-dial";
  const hasSecondary = config.variant !== "simple" && config.variant !== "indicator";
  const hasTertiary = config.variant === "full" || config.variant === "indicator-full";
  const hasComparison = config.variant === "indicator" || config.variant === "indicator-sec" || config.variant === "indicator-full";

  const boundFieldCount = [config.primaryField, config.secondaryField, config.tertiaryField, config.comparisonField].filter(Boolean).length;

  const sharedDropdownProps = {
    fieldSearch,
    setFieldSearch,
    expandedTable,
    setExpandedTable,
    onSelectField: selectField,
    onClosePicker: () => setBindingTarget(null),
    filteredTables,
  };

  const tabs = [
    { id: "data" as const, label: "DADOS" },
    { id: "filters" as const, label: "FILTROS" },
    { id: "settings" as const, label: "CONFIGURAÇÕES" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/20 flex justify-end z-[9999]"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 30, stiffness: 350 }}
        className="bg-white h-full p-6 shadow-[0_24px_48px_rgba(0,0,0,0.15)] flex flex-col"
        style={{ width: 380 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[#122232]" style={{ fontSize: 18, fontWeight: 700, letterSpacing: -0.5, ...ff }}>
            Editor de Widget KPI
          </h3>
          <div className="flex items-center bg-[#F6F7F9] rounded-[100px] h-[44px] px-[5px]">
            <button onClick={onClose} className="flex items-center justify-center size-[32px] rounded-full bg-transparent text-[#0483AB] hover:bg-[#DCF0FF] transition-colors cursor-pointer">
              <X size={18} weight="bold" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="relative flex items-center gap-[4px] h-[44px] p-[4px] bg-[#F6F7F9] rounded-[100px] mb-4">
          <div
            className="absolute inset-0 pointer-events-none rounded-[inherit]"
            style={{
              boxShadow: "inset 0px -0.5px 1px 0px rgba(255,255,255,0.3), inset 0px -0.5px 1px 0px rgba(255,255,255,0.25), inset 1px 1.5px 4px 0px rgba(0,0,0,0.08), inset 1px 1.5px 4px 0px rgba(0,0,0,0.1)",
            }}
          />
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`relative flex items-center justify-center gap-[3px] h-[36px] rounded-[100px] transition-all cursor-pointer ${
                t.id === "settings" ? "flex-[1.4]" : "flex-[0.8]"
              } ${
                tab === t.id
                  ? "text-[#F6F7F9]"
                  : "text-[#98989d] hover:text-[#4E6987] hover:bg-[#e8eaee]"
              }`}
            >
              {tab === t.id && (
                <>
                  <div className="absolute inset-0 bg-[#28415c] rounded-[20px] backdrop-blur-[50px]" />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none rounded-[20px] border-[0.5px] border-solid border-[rgba(200,207,219,0.6)]"
                    style={{ boxShadow: "0px 2px 4px 0px rgba(18,34,50,0.3)" }}
                  />
                </>
              )}
              <span className="relative z-[1] uppercase tracking-[0.5px]" style={{ fontSize: 10, fontWeight: 700, ...ff }}>
                {t.label}
              </span>
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto">
          {tab === "data" ? (
            <div className="flex flex-col gap-1">
              {/* Title */}
              <div className="mb-3">
                <label className="text-[#98989D] uppercase block mb-1.5" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.5, ...ff }}>
                  Título do Widget
                </label>
                <input
                  type="text"
                  value={config.title}
                  onChange={(e) => onChange({ ...config, title: e.target.value })}
                  className="w-full h-[38px] px-3 rounded-[10px] border border-[#DDE3EC] text-[#122232] outline-none focus:border-[#0483AB] transition-colors"
                  style={{ fontSize: 13, fontWeight: 500, ...ff }}
                  placeholder="Ex: Total de Vendas"
                />
              </div>

              {/* ── Section: Selecionar Colunas ── */}
              <SectionHeader
                title="Selecionar Colunas"
                collapsed={colSelectCols}
                onToggle={() => setColSelectCols(!colSelectCols)}
                count={boundFieldCount}
              />
              {!colSelectCols && (
                <div className="flex flex-col gap-3 pl-3 pb-3 border-l-2 border-[#EEF1F6] ml-1">
                  {/* Primary — Coluna de Dados */}
                  <FieldDropdown
                    label="Coluna de Dados"
                    binding={config.primaryField}
                    onStartPick={() => setBindingTarget(bindingTarget === "primary" ? null : "primary")}
                    onRemove={() => removeField("primary")}
                    onChangeAgg={(agg) => updateAggregation("primary", agg)}
                    isActive={bindingTarget === "primary"}
                    {...sharedDropdownProps}
                  />
                </div>
              )}

              {/* ── Section: Exibir Valor Como ── */}
              <SectionHeader
                title="Exibir Valor Como"
                collapsed={colShowValue}
                onToggle={() => setColShowValue(!colShowValue)}
              />
              {!colShowValue && (
                <div className="flex flex-col gap-3 pl-3 pb-3 border-l-2 border-[#EEF1F6] ml-1">
                  {/* Primary Value aggregation summary */}
                  {config.primaryField && (
                    <div className="flex items-center gap-2 px-3 py-2 rounded-[8px] bg-[#F6F7F9]">
                      <span className="text-[#4E6987]" style={{ fontSize: 10, fontWeight: 600, ...ff }}>Valor Primário:</span>
                      <span className="text-[#122232] font-bold" style={{ fontSize: 10, ...ff }}>
                        {config.primaryField.fieldLabel}
                      </span>
                      <span className="text-[#07ABDE] ml-auto" style={{ fontSize: 9, fontWeight: 700, ...ff }}>
                        ({AGGREGATIONS.find(a => a.id === config.primaryField!.aggregation)?.label || config.primaryField.aggregation})
                      </span>
                    </div>
                  )}

                  {/* Secondary field */}
                  {hasSecondary && (
                    <FieldDropdown
                      label="Valor Secundário"
                      binding={config.secondaryField}
                      onStartPick={() => setBindingTarget(bindingTarget === "secondary" ? null : "secondary")}
                      onRemove={() => removeField("secondary")}
                      onChangeAgg={(agg) => updateAggregation("secondary", agg)}
                      isActive={bindingTarget === "secondary"}
                      {...sharedDropdownProps}
                    />
                  )}

                  {/* Tertiary field */}
                  {hasTertiary && (
                    <FieldDropdown
                      label="Valor Terciário"
                      binding={config.tertiaryField}
                      onStartPick={() => setBindingTarget(bindingTarget === "tertiary" ? null : "tertiary")}
                      onRemove={() => removeField("tertiary")}
                      onChangeAgg={(agg) => updateAggregation("tertiary", agg)}
                      isActive={bindingTarget === "tertiary"}
                      {...sharedDropdownProps}
                    />
                  )}
                </div>
              )}

              {/* ── Section: Formato do Número ── */}
              <SectionHeader
                title="Formato do Número"
                collapsed={colFormat}
                onToggle={() => setColFormat(!colFormat)}
              />
              {!colFormat && (() => {
                const nf = config.numberFormat || {};
                return (
                  <div className="flex flex-col gap-3 pl-3 pb-3 border-l-2 border-[#EEF1F6] ml-1">
                    {/* Prefixo & Sufixo */}
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="text-[#98989D] uppercase block mb-1" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.5, ...ff }}>
                          Prefixo
                        </label>
                        <input
                          type="text"
                          value={nf.prefix ?? ""}
                          onChange={(e) => updateFormat({ prefix: e.target.value })}
                          className="w-full h-[34px] px-2.5 rounded-[8px] border border-[#DDE3EC] text-[#122232] outline-none focus:border-[#0483AB] transition-colors"
                          style={{ fontSize: 12, fontWeight: 500, ...ff }}
                          placeholder="R$"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="text-[#98989D] uppercase block mb-1" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.5, ...ff }}>
                          Sufixo
                        </label>
                        <input
                          type="text"
                          value={nf.suffix ?? ""}
                          onChange={(e) => updateFormat({ suffix: e.target.value })}
                          className="w-full h-[34px] px-2.5 rounded-[8px] border border-[#DDE3EC] text-[#122232] outline-none focus:border-[#0483AB] transition-colors"
                          style={{ fontSize: 12, fontWeight: 500, ...ff }}
                          placeholder="%"
                        />
                      </div>
                    </div>

                    {/* Unidades */}
                    <div>
                      <label className="text-[#98989D] uppercase block mb-1" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.5, ...ff }}>
                        Unidades
                      </label>
                      <div className="flex gap-1">
                        {([
                          { id: "auto", label: "Auto" },
                          { id: "none", label: "Nenhum" },
                          { id: "K", label: "K" },
                          { id: "M", label: "M" },
                          { id: "B", label: "B" },
                        ] as const).map((u) => (
                          <button
                            key={u.id}
                            onClick={() => updateFormat({ units: u.id })}
                            className={`h-[28px] px-2.5 rounded-[500px] text-center transition-colors cursor-pointer ${
                              (nf.units ?? "auto") === u.id
                                ? "bg-[#07ABDE] text-white"
                                : "bg-[#F6F7F9] text-[#4E6987] hover:bg-[#ebedf0]"
                            }`}
                            style={{ fontSize: 10, fontWeight: 700, ...ff }}
                          >
                            {u.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Casas decimais */}
                    <div>
                      <label className="text-[#98989D] uppercase block mb-1" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.5, ...ff }}>
                        Casas Decimais
                      </label>
                      <div className="flex gap-1">
                        {[0, 1, 2, 3, 4].map((d) => (
                          <button
                            key={d}
                            onClick={() => updateFormat({ decimalPlaces: d })}
                            className={`h-[28px] w-[32px] rounded-[500px] text-center transition-colors cursor-pointer ${
                              (nf.decimalPlaces ?? 2) === d
                                ? "bg-[#07ABDE] text-white"
                                : "bg-[#F6F7F9] text-[#4E6987] hover:bg-[#ebedf0]"
                            }`}
                            style={{ fontSize: 10, fontWeight: 700, ...ff }}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Separadores */}
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="text-[#98989D] uppercase block mb-1" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.5, ...ff }}>
                          Sep. Milhar
                        </label>
                        <select
                          value={nf.thousandSep ?? "dot"}
                          onChange={(e) => updateFormat({ thousandSep: e.target.value as KpiNumberFormat["thousandSep"] })}
                          className="w-full h-[34px] px-2 rounded-[8px] border border-[#DDE3EC] text-[#122232] outline-none focus:border-[#0483AB] transition-colors cursor-pointer bg-white"
                          style={{ fontSize: 12, fontWeight: 500, ...ff }}
                        >
                          <option value="dot">Ponto (1.000)</option>
                          <option value="comma">Vírgula (1,000)</option>
                          <option value="space">Espaço (1 000)</option>
                          <option value="none">Nenhum (1000)</option>
                        </select>
                      </div>
                      <div className="flex-1">
                        <label className="text-[#98989D] uppercase block mb-1" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.5, ...ff }}>
                          Sep. Decimal
                        </label>
                        <select
                          value={nf.decimalSep ?? "comma"}
                          onChange={(e) => updateFormat({ decimalSep: e.target.value as KpiNumberFormat["decimalSep"] })}
                          className="w-full h-[34px] px-2 rounded-[8px] border border-[#DDE3EC] text-[#122232] outline-none focus:border-[#0483AB] transition-colors cursor-pointer bg-white"
                          style={{ fontSize: 12, fontWeight: 500, ...ff }}
                        >
                          <option value="comma">Vírgula (0,00)</option>
                          <option value="dot">Ponto (0.00)</option>
                        </select>
                      </div>
                    </div>

                    {/* Número negativo */}
                    <div>
                      <label className="text-[#98989D] uppercase block mb-1" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.5, ...ff }}>
                        Nº Negativo
                      </label>
                      <div className="flex gap-1">
                        {([
                          { id: "minus", label: "−100" },
                          { id: "parentheses", label: "(100)" },
                          { id: "red", label: "−100", color: "#DC2626" },
                        ] as const).map((n) => (
                          <button
                            key={n.id}
                            onClick={() => updateFormat({ negativeStyle: n.id })}
                            className={`h-[28px] px-3 rounded-[500px] text-center transition-colors cursor-pointer ${
                              (nf.negativeStyle ?? "minus") === n.id
                                ? "bg-[#07ABDE] text-white"
                                : "bg-[#F6F7F9] text-[#4E6987] hover:bg-[#ebedf0]"
                            }`}
                            style={{ fontSize: 10, fontWeight: 700, color: (nf.negativeStyle ?? "minus") !== n.id && n.color ? n.color : undefined, ...ff }}
                          >
                            {n.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Preview */}
                    {config.primaryField && (
                      <div className="flex items-center gap-2 px-3 py-2 rounded-[8px] bg-[#F6F7F9]">
                        <span className="text-[#4E6987]" style={{ fontSize: 10, fontWeight: 600, ...ff }}>Preview:</span>
                        <span className="text-[#122232] font-bold" style={{ fontSize: 12, ...ff }}>
                          {formatKpiValue(1234567.89, config.numberFormat)}
                        </span>
                        <span className="text-[#98989d] ml-auto" style={{ fontSize: 9, ...ff }}>
                          (ex: 1234567.89)
                        </span>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* ── Section: Indicadores de Comparação ── */}
              {hasComparison && (
                <>
                  <SectionHeader
                    title="Indicadores de Comparação"
                    collapsed={colComparison}
                    onToggle={() => setColComparison(!colComparison)}
                  />
                  {!colComparison && (
                    <div className="flex flex-col gap-3 pl-3 pb-3 border-l-2 border-[#EEF1F6] ml-1">
                      <FieldDropdown
                        label="Comparação (Tendência)"
                        binding={config.comparisonField}
                        onStartPick={() => setBindingTarget(bindingTarget === "comparison" ? null : "comparison")}
                        onRemove={() => removeField("comparison")}
                        onChangeAgg={(agg) => updateAggregation("comparison", agg)}
                        isActive={bindingTarget === "comparison"}
                        {...sharedDropdownProps}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          ) : tab === "filters" ? (
            /* ── Filters Tab ── */
            <FiltersTabContent
              allTables={allTables}
              config={config}
              onChange={onChange}
              getTableData={getTableData}
            />
          ) : (
            /* ── Settings Tab ── */
            <div className="flex flex-col gap-4">
              {/* Variant selector */}
              <div>
                <label className="text-[#98989D] uppercase block mb-2" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.5, ...ff }}>
                  Tipo de Widget
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {WIDGET_VARIANTS.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => onChange({ ...config, variant: v.id })}
                      className={`flex flex-col items-center gap-0.5 p-2 rounded-[10px] border transition-colors cursor-pointer ${
                        config.variant === v.id
                          ? "border-[#07ABDE] bg-[#DCF0FF]"
                          : "border-[#DDE3EC] hover:border-[#0483AB]/40 bg-white"
                      }`}
                    >
                      <span
                        className={config.variant === v.id ? "text-[#0483AB]" : "text-[#122232]"}
                        style={{ fontSize: 9, fontWeight: 700, letterSpacing: -0.2, ...ff }}
                      >
                        {v.label}
                      </span>
                      <span className="text-[#98989d]" style={{ fontSize: 8, ...ff }}>
                        {v.description}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color accent */}
              <div>
                <label className="text-[#98989D] uppercase block mb-1.5" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.5, ...ff }}>
                  Cor do Valor
                </label>
                <div className="flex items-center gap-2">
                  {["#122232", "#07ABDE", "#28415C", "#16A34A", "#EAC23D", "#DC2626", "#6868B1", "#FF8C76"].map((c) => (
                    <button
                      key={c}
                      onClick={() => onChange({ ...config, accentColor: c })}
                      className={`w-[24px] h-[24px] rounded-full border-2 transition-all cursor-pointer ${
                        config.accentColor === c ? "border-[#07ABDE] scale-110" : "border-transparent"
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              {/* Chart-specific settings */}
              {isChartVariant && (
                <>
                  <div className="h-px bg-[#EEF1F6]" />
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-[#98989D] uppercase block mb-1.5" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.5, ...ff }}>
                        Mínimo
                      </label>
                      <input
                        type="number"
                        value={config.minValue ?? 0}
                        onChange={(e) => onChange({ ...config, minValue: +e.target.value })}
                        className="w-full h-[38px] px-3 rounded-[10px] border border-[#DDE3EC] outline-none focus:border-[#0483AB] text-[#122232] text-center transition-colors"
                        style={{ fontSize: 11, ...ff }}
                      />
                    </div>
                    <div>
                      <label className="text-[#98989D] uppercase block mb-1.5" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.5, ...ff }}>
                        Meta
                      </label>
                      <input
                        type="number"
                        value={config.targetValue ?? ""}
                        onChange={(e) => onChange({ ...config, targetValue: e.target.value ? +e.target.value : undefined })}
                        className="w-full h-[38px] px-3 rounded-[10px] border border-[#DDE3EC] outline-none focus:border-[#0483AB] text-[#122232] text-center transition-colors"
                        style={{ fontSize: 11, ...ff }}
                        placeholder="--"
                      />
                    </div>
                    <div>
                      <label className="text-[#98989D] uppercase block mb-1.5" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.5, ...ff }}>
                        Máximo
                      </label>
                      <input
                        type="number"
                        value={config.maxValue ?? ""}
                        onChange={(e) => onChange({ ...config, maxValue: e.target.value ? +e.target.value : undefined })}
                        className="w-full h-[38px] px-3 rounded-[10px] border border-[#DDE3EC] outline-none focus:border-[#0483AB] text-[#122232] text-center transition-colors"
                        style={{ fontSize: 11, ...ff }}
                        placeholder="Auto"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-2 justify-end mt-6">
          <button
            onClick={onClose}
            className="flex items-center gap-[6px] h-[34px] px-[16px] rounded-[500px] bg-[#3CCEA7] text-white hover:bg-[#30B893] transition-colors cursor-pointer"
          >
            <FloppyDisk size={14} weight="bold" />
            <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...ff }}>Salvar</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Section Header (Zoho-style collapsible) ── */

function SectionHeader({ title, collapsed, onToggle, count }: { title: string; collapsed: boolean; onToggle: () => void; count?: number }) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center gap-2 py-2 cursor-pointer group"
    >
      {collapsed ? (
        <CaretRight size={10} weight="bold" className="text-[#98989d] group-hover:text-[#4E6987]" />
      ) : (
        <CaretDown size={10} weight="bold" className="text-[#98989d] group-hover:text-[#4E6987]" />
      )}
      <span className="text-[#4E6987] uppercase tracking-[0.5px]" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.5, ...ff }}>
        {title}
      </span>
      {count != null && count > 0 && (
        <span
          className="flex items-center justify-center w-[16px] h-[16px] rounded-full bg-[#07ABDE] text-white"
          style={{ fontSize: 8, fontWeight: 700, ...ff }}
        >
          {count}
        </span>
      )}
      <div className="flex-1 h-px bg-[#EEF1F6] ml-1" />
    </button>
  );
}

/* ── Field Dropdown (Zoho-style dropdown selector) ── */

function FieldDropdown({
  label,
  binding,
  onStartPick,
  onRemove,
  onChangeAgg,
  isActive,
  fieldSearch,
  setFieldSearch,
  expandedTable,
  setExpandedTable,
  onSelectField,
  onClosePicker,
  filteredTables,
}: {
  label: string;
  binding?: KpiFieldBinding;
  onStartPick: () => void;
  onRemove: () => void;
  onChangeAgg: (agg: string) => void;
  isActive: boolean;
  fieldSearch: string;
  setFieldSearch: (s: string) => void;
  expandedTable: string | null;
  setExpandedTable: (s: string | null) => void;
  onSelectField: (f: FieldDef) => void;
  onClosePicker: () => void;
  filteredTables: { id: string; name: string; fields: FieldDef[] }[];
}) {
  const [showAgg, setShowAgg] = useState(false);
  const meta = binding ? TABLE_META[binding.table] : null;
  const aggLabel = AGGREGATIONS.find(a => a.id === binding?.aggregation)?.label || binding?.aggregation;

  return (
    <div className="flex flex-col gap-1.5">
      {/* Label row */}
      <div className="flex items-center justify-between">
        <span className="text-[#98989D] uppercase" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.5, ...ff }}>
          {label}
        </span>
        {binding && (
          <button
            onClick={onRemove}
            className="p-0.5 rounded hover:bg-[#FFEDEB] text-[#98989d] hover:text-[#DC2626] cursor-pointer"
          >
            <X size={10} weight="bold" />
          </button>
        )}
      </div>

      {/* Dropdown trigger — DS: rounded-[10px] h-[38px] */}
      {binding ? (
        <div className="flex flex-col gap-1.5">
          {/* Selected field row */}
          <button
            onClick={onStartPick}
            className={`w-full flex items-center gap-2 h-[38px] px-3 rounded-[10px] border transition-colors cursor-pointer ${
              isActive ? "border-[#07ABDE] bg-[#DCF0FF]/30" : "border-[#DDE3EC] bg-white hover:border-[#0483AB]/40"
            }`}
          >
            {meta && (
              <div
                className="flex items-center justify-center w-[16px] h-[16px] rounded-[4px] shrink-0"
                style={{ backgroundColor: meta.bg }}
              >
                <span style={{ color: meta.color, fontSize: 9 }}>{meta.icon}</span>
              </div>
            )}
            <span className="text-[#122232] truncate flex-1 text-left" style={{ fontSize: 12, fontWeight: 600, ...ff }}>
              {binding.fieldLabel}
            </span>
            <CaretDown size={10} weight="bold" className={`shrink-0 transition-transform ${isActive ? "text-[#07ABDE] rotate-180" : "text-[#98989d]"}`} />
          </button>

          {/* Aggregation pill row */}
          <div className="flex items-center gap-2 px-1">
            <span className="text-[#98989d] uppercase" style={{ fontSize: 8, fontWeight: 700, letterSpacing: 0.4, ...ff }}>Agregação</span>
            <div className="relative">
              <button
                onClick={() => setShowAgg(!showAgg)}
                className="flex items-center gap-1 h-[24px] px-2.5 rounded-[500px] bg-[#F6F7F9] hover:bg-[#EEF1F6] text-[#28415C] cursor-pointer transition-colors"
                style={{ fontSize: 10, fontWeight: 600, ...ff }}
              >
                {aggLabel}
                <CaretDown size={8} weight="bold" className="text-[#98989d]" />
              </button>
              {showAgg && (
                <div className="absolute left-0 top-full mt-1 z-50 bg-white rounded-[10px] border border-[#DDE3EC] shadow-[0_8px_24px_rgba(0,0,0,0.12)] py-1 min-w-[140px]">
                  {AGGREGATIONS.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => { onChangeAgg(a.id); setShowAgg(false); }}
                      className={`w-full flex items-center justify-between px-3 py-1.5 text-left hover:bg-[#F6F7F9] transition-colors cursor-pointer ${
                        binding.aggregation === a.id ? "text-[#07ABDE]" : "text-[#122232]"
                      }`}
                    >
                      <span style={{ fontSize: 11, fontWeight: 500, ...ff }}>{a.label}</span>
                      {binding.aggregation === a.id && <Check size={10} weight="bold" className="text-[#07ABDE]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={onStartPick}
          className={`w-full h-[38px] rounded-[10px] border flex items-center justify-between px-3 transition-colors cursor-pointer ${
            isActive
              ? "border-[#07ABDE] bg-[#DCF0FF]/30"
              : "border-[#DDE3EC] hover:border-[#0483AB]/40 bg-white"
          }`}
        >
          <span className={isActive ? "text-[#07ABDE]" : "text-[#c8cfdb]"} style={{ fontSize: 12, fontWeight: 500, ...ff }}>
            Selecionar campo...
          </span>
          <CaretDown size={10} weight="bold" className={`transition-transform ${isActive ? "text-[#07ABDE] rotate-180" : "text-[#98989d]"}`} />
        </button>
      )}

      {/* Inline field picker */}
      {isActive && (
        <div className="rounded-[10px] border border-[#07ABDE]/25 bg-[#FAFBFC] overflow-hidden">
          {/* Search — DS pattern: compact inline search */}
          <div className="p-2 pb-1.5">
            <div
              className="flex items-center gap-[8px] h-[34px] px-[10px] rounded-[8px] bg-[#DDE3EC]"
              style={{ boxShadow: "inset 0px 1px 3px 0px rgba(0,0,0,0.1), inset 0px 1px 2px 0px rgba(0,0,0,0.06)" }}
            >
              <MagnifyingGlass size={13} weight="bold" className="text-[#98989d] shrink-0" />
              <input
                type="text"
                value={fieldSearch}
                onChange={(e) => setFieldSearch(e.target.value)}
                placeholder="Buscar campos..."
                className="flex-1 bg-transparent outline-none text-[#28415c] placeholder:text-[#c8cfdb]"
                style={{ fontSize: 12, fontWeight: 500, letterSpacing: -0.3, ...ff }}
                autoFocus
              />
              {fieldSearch && (
                <button
                  onClick={() => setFieldSearch("")}
                  className="p-0.5 rounded-full hover:bg-[#c8cfdb]/40 text-[#98989d] cursor-pointer transition-colors"
                >
                  <X size={10} weight="bold" />
                </button>
              )}
            </div>
          </div>
          {/* Table tree */}
          <div className="max-h-[200px] overflow-y-auto p-1.5 pt-0.5 flex flex-col gap-0.5">
            {filteredTables.map((t) => {
              const tMeta = TABLE_META[t.id];
              const isExp = expandedTable === t.id;
              return (
                <div key={t.id}>
                  <button
                    onClick={() => setExpandedTable(isExp ? null : t.id)}
                    className="w-full flex items-center gap-1.5 px-2 py-1.5 rounded-[6px] hover:bg-[#EEF1F6] transition-colors cursor-pointer"
                  >
                    {isExp ? (
                      <CaretDown size={9} weight="bold" className="text-[#98989d]" />
                    ) : (
                      <CaretRight size={9} weight="bold" className="text-[#98989d]" />
                    )}
                    {tMeta && (
                      <div
                        className="flex items-center justify-center w-[16px] h-[16px] rounded-[4px]"
                        style={{ backgroundColor: tMeta.bg }}
                      >
                        <span style={{ color: tMeta.color, fontSize: 9 }}>{tMeta.icon}</span>
                      </div>
                    )}
                    <span className="text-[#122232]" style={{ fontSize: 11, fontWeight: 600, ...ff }}>
                      {t.name}
                    </span>
                    <span className="text-[#98989d] ml-auto" style={{ fontSize: 9, fontWeight: 500, ...ff }}>
                      {t.fields.length}
                    </span>
                  </button>
                  {isExp && (
                    <div className="ml-5 flex flex-col gap-0.5 py-0.5">
                      {t.fields.map((f) => {
                        const typeColor = f.type === "measure" ? "#07ABDE" : f.type === "date" ? "#EAC23D" : "#6868B1";
                        const typeLabel = f.type === "measure" ? (f.aggregation || "SUM") : f.type === "date" ? "DATA" : "DIM";
                        const isSelected = binding?.fieldId === f.id && binding?.table === f.table;
                        return (
                          <button
                            key={f.id}
                            onClick={() => onSelectField(f)}
                            className={`w-full flex items-center gap-2 px-2 py-1 rounded-[6px] transition-colors text-left cursor-pointer ${
                              isSelected ? "bg-[#07ABDE]/10" : "hover:bg-[#DCF0FF]"
                            }`}
                          >
                            <span
                              className="w-[5px] h-[5px] rounded-full shrink-0"
                              style={{ backgroundColor: typeColor }}
                            />
                            <span className={`truncate ${isSelected ? "text-[#07ABDE]" : "text-[#122232]"}`} style={{ fontSize: 11, fontWeight: isSelected ? 600 : 500, ...ff }}>
                              {f.label}
                            </span>
                            <span
                              className="ml-auto shrink-0 px-1 py-0.5 rounded-[3px]"
                              style={{ fontSize: 7, fontWeight: 700, letterSpacing: 0.3, color: typeColor, backgroundColor: `${typeColor}18`, ...ff }}
                            >
                              {typeLabel}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
            {filteredTables.length === 0 && (
              <span className="text-[#98989d] text-center py-3" style={{ fontSize: 11, ...ff }}>
                Nenhum campo encontrado
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Filters Tab Content (Advanced — Zoho Analytics pattern) ── */

const DATE_GRANULARITIES = [
  { id: "year" as const, label: "Ano" },
  { id: "quarter" as const, label: "Trim." },
  { id: "month" as const, label: "Mês" },
  { id: "week" as const, label: "Sem." },
  { id: "date" as const, label: "Data" },
  { id: "range" as const, label: "Faixa" },
];

const FILTER_AGG_FNS = [
  { id: "actual", label: "Valor Real" },
  { id: "SUM", label: "Soma" },
  { id: "MAX", label: "Máximo" },
  { id: "MIN", label: "Mínimo" },
  { id: "AVG", label: "Média" },
  { id: "STDEV", label: "Desvio Padrão" },
  { id: "COUNT", label: "Contagem" },
  { id: "COUNTD", label: "Contagem Distinta" },
];

function extractDistinctValues(data: any[], fieldName: string, granularity?: string): string[] {
  const vals = new Set<string>();
  for (const row of data) {
    const v = row[fieldName];
    if (v == null || v === "") continue;
    if (granularity) {
      const d = new Date(v);
      if (isNaN(d.getTime())) { vals.add(String(v)); continue; }
      switch (granularity) {
        case "year": vals.add(String(d.getFullYear())); break;
        case "quarter": vals.add(`${d.getFullYear()}-Q${Math.ceil((d.getMonth() + 1) / 3)}`); break;
        case "month": vals.add(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`); break;
        case "week": {
          const jan1 = new Date(d.getFullYear(), 0, 1);
          const wk = Math.ceil(((d.getTime() - jan1.getTime()) / 86400000 + jan1.getDay() + 1) / 7);
          vals.add(`${d.getFullYear()}-W${String(wk).padStart(2, "0")}`);
          break;
        }
        case "date": vals.add(d.toISOString().split("T")[0]); break;
        default: vals.add(String(v));
      }
    } else {
      vals.add(String(v));
    }
  }
  return [...vals].sort();
}

function FiltersTabContent({
  allTables,
  config,
  onChange,
  getTableData,
}: {
  allTables: { id: string; name: string; fields: FieldDef[] }[];
  config: KpiWidgetConfig;
  onChange: (c: KpiWidgetConfig) => void;
  getTableData: (tableId: string) => any[];
}) {
  const [fieldSearch, setFieldSearch] = useState("");
  const [expandedTable, setExpandedTable] = useState<string | null>(null);
  const [picking, setPicking] = useState(false);
  const [activeFilterId, setActiveFilterId] = useState<string | null>(null);
  const [valueSearch, setValueSearch] = useState("");

  const filteredTables = useMemo(() => {
    if (!fieldSearch) return allTables;
    const q = fieldSearch.toLowerCase();
    return allTables
      .map((t) => ({
        ...t,
        fields: t.fields.filter(
          (f) =>
            f.label.toLowerCase().includes(q) ||
            f.name.toLowerCase().includes(q) ||
            t.name.toLowerCase().includes(q)
        ),
      }))
      .filter((t) => t.fields.length > 0);
  }, [allTables, fieldSearch]);

  const addFilter = (field: FieldDef) => {
    const isDate = field.type === "date" || field.dataType === "date" || field.dataType === "datetime";
    const isNumeric = field.type === "measure" || field.dataType === "number" || field.dataType === "currency";
    const filter: KpiWidgetFilter = {
      id: `${field.table}-${field.id}-${Date.now()}`,
      fieldId: field.id,
      fieldName: field.name,
      fieldLabel: field.label,
      table: field.table,
      dataType: field.dataType,
      mode: "include",
      selectedValues: [],
      componentType: isNumeric ? "slider-double" : "multi",
      dateGranularity: isDate ? "year" : undefined,
      aggregationFn: isNumeric ? "actual" : undefined,
      operator: "in",
      value: "",
    };
    const newFilters = [...(config.filters || []), filter];
    onChange({ ...config, filters: newFilters });
    setActiveFilterId(filter.id);
    setPicking(false);
    setFieldSearch("");
  };

  const removeFilter = (id: string) => {
    onChange({ ...config, filters: (config.filters || []).filter((f) => f.id !== id) });
    if (activeFilterId === id) setActiveFilterId(null);
  };

  const updateFilter = (id: string, patch: Partial<KpiWidgetFilter>) => {
    onChange({
      ...config,
      filters: (config.filters || []).map((f) => (f.id === id ? { ...f, ...patch } : f)),
    });
  };

  const clearAllFilters = () => {
    onChange({ ...config, filters: [] });
    setActiveFilterId(null);
  };

  const filters = config.filters || [];
  const activeFilter = filters.find((f) => f.id === activeFilterId);

  // Get distinct values for the active filter
  const distinctValues = useMemo(() => {
    if (!activeFilter) return [];
    const data = getTableData(activeFilter.table);
    const isDate = activeFilter.dataType === "date" || activeFilter.dataType === "datetime" || activeFilter.dateGranularity != null;
    return extractDistinctValues(data, activeFilter.fieldName, isDate ? (activeFilter.dateGranularity || "year") : undefined);
  }, [activeFilter, getTableData]);

  const filteredDistinctValues = useMemo(() => {
    if (!valueSearch) return distinctValues;
    const q = valueSearch.toLowerCase();
    return distinctValues.filter((v) => v.toLowerCase().includes(q));
  }, [distinctValues, valueSearch]);

  // Numeric range for slider-double
  const numericRange = useMemo(() => {
    if (!activeFilter || activeFilter.componentType !== "slider-double") return { min: 0, max: 100 };
    const data = getTableData(activeFilter.table);
    const values = data
      .map((r) => parseFloat(r[activeFilter.fieldName]))
      .filter((v) => !isNaN(v));
    if (values.length === 0) return { min: 0, max: 100 };
    return { min: Math.min(...values), max: Math.max(...values) };
  }, [activeFilter, getTableData]);

  const isDateFilter = activeFilter && (activeFilter.dataType === "date" || activeFilter.dataType === "datetime" || activeFilter.dateGranularity != null);
  const isNumericFilter = activeFilter?.componentType === "slider-double";

  const toggleValue = (val: string) => {
    if (!activeFilter) return;
    const cur = activeFilter.selectedValues || [];
    const next = cur.includes(val) ? cur.filter((v) => v !== val) : [...cur, val];
    updateFilter(activeFilter.id, { selectedValues: next, value: next.join(",") });
  };

  const selectAllValues = () => {
    if (!activeFilter) return;
    updateFilter(activeFilter.id, { selectedValues: [...distinctValues], value: distinctValues.join(",") });
  };

  const clearFilterValues = (id: string) => {
    updateFilter(id, { selectedValues: [], value: "" });
  };

  return (
    <div className="flex flex-col gap-[16px]">
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[6px]">
          <Funnel size={14} weight="bold" className="text-[#4E6987]" />
          <span className="text-[#4E6987]" style={{ fontSize: 13, fontWeight: 700, letterSpacing: -0.3, ...ff }}>
            Filtros do Widget
          </span>
          {filters.length > 0 && (
            <span
              className="flex items-center justify-center w-[20px] h-[20px] rounded-full bg-[#07ABDE] text-white"
              style={{ fontSize: 9, fontWeight: 700, ...ff }}
            >
              {filters.length}
            </span>
          )}
        </div>
        {filters.length > 0 && (
          <button
            onClick={clearAllFilters}
            className="flex items-center gap-[4px] h-[28px] px-[12px] rounded-[500px] bg-[#F6F7F9] text-[#F56233] hover:bg-[#FFEDEB] transition-colors cursor-pointer"
          >
            <Trash size={11} weight="bold" />
            <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 9, ...ff }}>Limpar Tudo</span>
          </button>
        )}
      </div>

      {/* ── Active filter chips (DS status pill pattern) ── */}
      {filters.length > 0 && (
        <div className="flex flex-wrap gap-[6px]">
          {filters.map((filter) => {
            const meta = TABLE_META[filter.table];
            const isActive = activeFilterId === filter.id;
            const selCount = filter.selectedValues?.length || 0;
            return (
              <div
                key={filter.id}
                className={`flex items-center gap-[3px] h-[28px] rounded-[500px] overflow-hidden transition-all ${
                  isActive ? "ring-[1.5px] ring-[#07ABDE] ring-offset-1" : ""
                }`}
                style={{ backgroundColor: meta?.bg || "#DDE3EC" }}
              >
                {/* Entity icon + field label */}
                <button
                  onClick={() => { setActiveFilterId(isActive ? null : filter.id); setValueSearch(""); }}
                  className="flex items-center gap-[4px] h-full pl-[10px] pr-[4px] cursor-pointer transition-opacity hover:opacity-80"
                >
                  {meta && <span style={{ color: meta.color, fontSize: 10 }}>{meta.icon}</span>}
                  <span
                    className="truncate max-w-[90px]"
                    style={{ fontSize: 10, fontWeight: 700, letterSpacing: -0.2, color: meta?.color || "#28415c", ...ff }}
                  >
                    {filter.fieldLabel}
                  </span>
                </button>
                {/* Mode mini-pill */}
                <span
                  className="flex items-center h-[18px] px-[6px] rounded-[500px] uppercase"
                  style={{
                    fontSize: 7, fontWeight: 700, letterSpacing: 0.3,
                    backgroundColor: filter.mode === "exclude" ? "#FFEDEB" : "rgba(255,255,255,0.6)",
                    color: filter.mode === "exclude" ? "#B13B00" : (meta?.color || "#28415c"),
                    ...ff,
                  }}
                >
                  {filter.mode === "include" ? "Incl." : "Excl."}
                </span>
                {/* Count */}
                {selCount > 0 && (
                  <span
                    className="flex items-center justify-center w-[16px] h-[16px] rounded-full bg-[#07ABDE] text-white"
                    style={{ fontSize: 8, fontWeight: 700, ...ff }}
                  >
                    {selCount}
                  </span>
                )}
                {/* Expand */}
                <button
                  onClick={() => { setActiveFilterId(isActive ? null : filter.id); setValueSearch(""); }}
                  className="flex items-center justify-center w-[24px] h-full cursor-pointer hover:opacity-70 transition-opacity"
                  style={{ color: meta?.color || "#28415c" }}
                >
                  {isActive ? <CaretDown size={10} weight="bold" /> : <Check size={10} weight="bold" />}
                </button>
                {/* Remove */}
                <button
                  onClick={() => removeFilter(filter.id)}
                  className="flex items-center justify-center w-[24px] h-full pr-[4px] text-[#F56233] hover:text-[#B13B00] cursor-pointer transition-colors"
                >
                  <X size={10} weight="bold" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* ── + Adicionar Filtros (DS utility blue pill) ── */}
      <button
        onClick={() => setPicking(!picking)}
        className="flex items-center gap-[6px] h-[34px] px-[16px] rounded-[500px] bg-[#DCF0FF] text-[#0483AB] hover:bg-[#c5e5f7] transition-colors cursor-pointer self-start"
      >
        <Plus size={13} weight="bold" />
        <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...ff }}>Adicionar Filtros</span>
      </button>

      {/* ── Expanded filter configuration panel ── */}
      {activeFilter && (() => {
        const afMeta = TABLE_META[activeFilter.table];
        return (
          <div className="rounded-[12px] border border-[#DDE3EC] bg-white overflow-hidden">
            {/* Panel header */}
            <div className="flex items-center gap-[8px] px-[16px] py-[10px] border-b border-[#EEF1F6]">
              {afMeta && (
                <div className="flex items-center justify-center w-[22px] h-[22px] rounded-[6px] shrink-0" style={{ backgroundColor: afMeta.bg }}>
                  <span style={{ color: afMeta.color, fontSize: 11 }}>{afMeta.icon}</span>
                </div>
              )}
              <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: -0.3, color: "#122232", ...ff }}>
                {activeFilter.fieldLabel}
              </span>
              <button
                onClick={() => setActiveFilterId(null)}
                className="ml-auto flex items-center justify-center w-[24px] h-[24px] rounded-full bg-[#F6F7F9] text-[#0483AB] hover:bg-[#DCF0FF] transition-colors cursor-pointer"
              >
                <X size={12} weight="bold" />
              </button>
            </div>

            {/* ── Date granularity: DS Segmented Control (dark glossy) ── */}
            {isDateFilter && (
              <div className="px-[12px] py-[10px] border-b border-[#EEF1F6]">
                <span className="text-[#98989d] uppercase block mb-[8px]" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.5, ...ff }}>
                  Granularidade
                </span>
                <div className="relative flex items-center gap-[4px] h-[36px] p-[3px] bg-[#F6F7F9] rounded-[100px] w-fit">
                  {DATE_GRANULARITIES.map((g) => {
                    const isGActive = activeFilter.dateGranularity === g.id;
                    return (
                      <button
                        key={g.id}
                        onClick={() => updateFilter(activeFilter.id, { dateGranularity: g.id })}
                        className={`relative flex items-center h-[30px] px-[10px] rounded-[100px] transition-all cursor-pointer ${
                          isGActive ? "text-[#F6F7F9]" : "text-[#98989d] hover:text-[#4E6987] hover:bg-[#e8eaee]"
                        }`}
                      >
                        {isGActive && (
                          <>
                            <div className="absolute inset-0 bg-[#28415c] rounded-[20px] backdrop-blur-[50px]" />
                            <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[20px] border-[0.5px] border-solid border-[rgba(200,207,219,0.6)]" style={{ boxShadow: "0px 2px 4px 0px rgba(18,34,50,0.3)" }} />
                          </>
                        )}
                        <span className="relative z-[1] font-bold uppercase tracking-[0.5px]" style={{ fontSize: 9, ...ff }}>{g.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Numeric: Component Type + Aggregation ── */}
            {isNumericFilter && (
              <div className="px-[16px] py-[12px] border-b border-[#EEF1F6]">
                <div className="flex gap-[10px]">
                  <div className="flex-1">
                    <span className="text-[#98989d] uppercase block mb-[6px]" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.5, ...ff }}>Tipo Componente</span>
                    <select
                      value={activeFilter.componentType}
                      onChange={(e) => updateFilter(activeFilter.id, { componentType: e.target.value as KpiWidgetFilter["componentType"] })}
                      className="w-full h-[34px] px-[10px] rounded-[10px] border border-[#DDE3EC] bg-white text-[#28415c] outline-none focus:border-[#07ABDE] cursor-pointer transition-colors"
                      style={{ fontSize: 12, fontWeight: 500, letterSpacing: -0.3, ...ff }}
                    >
                      <option value="slider-double">Slider Duplo</option>
                      <option value="multi">Multi Select</option>
                      <option value="single">Single Select</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <span className="text-[#98989d] uppercase block mb-[6px]" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.5, ...ff }}>Função</span>
                    <select
                      value={activeFilter.aggregationFn || "actual"}
                      onChange={(e) => updateFilter(activeFilter.id, { aggregationFn: e.target.value })}
                      className="w-full h-[34px] px-[10px] rounded-[10px] border border-[#DDE3EC] bg-white text-[#28415c] outline-none focus:border-[#07ABDE] cursor-pointer transition-colors"
                      style={{ fontSize: 12, fontWeight: 500, letterSpacing: -0.3, ...ff }}
                    >
                      {FILTER_AGG_FNS.map((fn) => (
                        <option key={fn.id} value={fn.id}>{fn.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* ── Numeric slider-double range ── */}
            {isNumericFilter && activeFilter.componentType === "slider-double" && (
              <div className="px-[16px] py-[12px] border-b border-[#EEF1F6]">
                <span className="text-[#98989d] uppercase block mb-[8px]" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.5, ...ff }}>Faixa de Valores</span>
                <div className="flex items-end gap-[10px]">
                  <div className="flex-1">
                    <label className="text-[#4E6987] uppercase block mb-[4px]" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.3, ...ff }}>Mínimo</label>
                    <input
                      type="number"
                      value={activeFilter.rangeMin ?? numericRange.min}
                      onChange={(e) => updateFilter(activeFilter.id, { rangeMin: parseFloat(e.target.value) || 0, value: `${e.target.value || 0},${activeFilter.rangeMax ?? numericRange.max}` })}
                      className="w-full h-[38px] px-[12px] rounded-[10px] border border-[#DDE3EC] bg-white text-[#28415c] outline-none focus:border-[#07ABDE] transition-colors"
                      style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3, ...ff }}
                    />
                  </div>
                  <span className="text-[#C8CFDB] pb-[10px]" style={{ fontSize: 14, fontWeight: 600, ...ff }}>—</span>
                  <div className="flex-1">
                    <label className="text-[#4E6987] uppercase block mb-[4px]" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.3, ...ff }}>Máximo</label>
                    <input
                      type="number"
                      value={activeFilter.rangeMax ?? numericRange.max}
                      onChange={(e) => updateFilter(activeFilter.id, { rangeMax: parseFloat(e.target.value) || 0, value: `${activeFilter.rangeMin ?? numericRange.min},${e.target.value || 0}` })}
                      className="w-full h-[38px] px-[12px] rounded-[10px] border border-[#DDE3EC] bg-white text-[#28415c] outline-none focus:border-[#07ABDE] transition-colors"
                      style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3, ...ff }}
                    />
                  </div>
                </div>
                <div className="mt-[10px] h-[6px] rounded-full bg-[#EEF1F6] relative overflow-hidden">
                  <div className="absolute h-full rounded-full bg-[#07ABDE] transition-all" style={{
                    left: `${Math.max(0, ((activeFilter.rangeMin ?? numericRange.min) - numericRange.min) / Math.max(1, numericRange.max - numericRange.min) * 100)}%`,
                    width: `${Math.max(4, ((activeFilter.rangeMax ?? numericRange.max) - (activeFilter.rangeMin ?? numericRange.min)) / Math.max(1, numericRange.max - numericRange.min) * 100)}%`,
                  }} />
                </div>
                <div className="flex justify-between mt-[4px]">
                  <span className="text-[#98989d]" style={{ fontSize: 9, fontWeight: 500, ...ff }}>{numericRange.min.toLocaleString("pt-BR")}</span>
                  <span className="text-[#98989d]" style={{ fontSize: 9, fontWeight: 500, ...ff }}>{numericRange.max.toLocaleString("pt-BR")}</span>
                </div>
              </div>
            )}

            {/* ── Values checkbox list ── */}
            {(!isNumericFilter || activeFilter.componentType !== "slider-double") && (
              <div className="px-[16px] py-[12px]">
                {/* DS Search Input (rounded-full bg-[#DDE3EC] inset shadow) */}
                {distinctValues.length > 6 && (
                  <div
                    className="relative flex items-center gap-[10px] h-[34px] px-[12px] rounded-full bg-[#DDE3EC] mb-[10px]"
                    style={{ boxShadow: "inset 0px 1px 3px 0px rgba(0,0,0,0.1), inset 0px 1px 2px 0px rgba(0,0,0,0.06)" }}
                  >
                    <MagnifyingGlass size={13} weight="bold" className="text-[#98989d] shrink-0" />
                    <input type="text" value={valueSearch} onChange={(e) => setValueSearch(e.target.value)} placeholder="Buscar valores..."
                      className="flex-1 bg-transparent outline-none text-[#28415c] placeholder:text-[#c8cfdb]"
                      style={{ fontSize: 12, fontWeight: 500, letterSpacing: -0.3, ...ff }}
                    />
                    {valueSearch && (
                      <button onClick={() => setValueSearch("")} className="p-[2px] rounded-full hover:bg-[#c8cfdb]/40 text-[#98989d] cursor-pointer transition-colors">
                        <X size={10} weight="bold" />
                      </button>
                    )}
                  </div>
                )}
                {/* Select All / Clear */}
                <div className="flex items-center gap-[12px] mb-[8px]">
                  <button onClick={selectAllValues} className="text-[#0483AB] hover:text-[#025E7B] cursor-pointer transition-colors" style={{ fontSize: 10, fontWeight: 700, letterSpacing: -0.2, ...ff }}>
                    Selecionar Tudo
                  </button>
                  <div className="w-[1px] h-[12px] bg-[#DDE3EC]" />
                  <button onClick={() => clearFilterValues(activeFilter.id)} className="text-[#F56233] hover:text-[#B13B00] cursor-pointer transition-colors" style={{ fontSize: 10, fontWeight: 700, letterSpacing: -0.2, ...ff }}>
                    Limpar Seleção
                  </button>
                </div>
                {/* Checkbox rows */}
                <div className="max-h-[180px] overflow-y-auto flex flex-col gap-[2px] pr-[4px]">
                  {filteredDistinctValues.length > 0 ? (
                    filteredDistinctValues.map((val) => {
                      const isSel = (activeFilter.selectedValues || []).includes(val);
                      return (
                        <button key={val} onClick={() => toggleValue(val)}
                          className={`w-full flex items-center gap-[8px] px-[8px] py-[6px] rounded-[8px] cursor-pointer transition-all text-left ${isSel ? "bg-[#DCF0FF]" : "hover:bg-[#F6F7F9]"}`}
                        >
                          <div className={`w-[16px] h-[16px] rounded-[4px] border-[1.5px] flex items-center justify-center shrink-0 transition-colors ${isSel ? "bg-[#07ABDE] border-[#07ABDE]" : "border-[#C8CFDB] bg-white"}`}>
                            {isSel && <Check size={10} weight="bold" className="text-white" />}
                          </div>
                          <span className="truncate" style={{ fontSize: 12, fontWeight: isSel ? 600 : 500, letterSpacing: -0.3, color: isSel ? "#122232" : "#4E6987", ...ff }}>
                            {val || "(vazio)"}
                          </span>
                        </button>
                      );
                    })
                  ) : (
                    <div className="flex flex-col items-center justify-center py-[16px] gap-[4px]">
                      <MagnifyingGlass size={18} weight="duotone" className="text-[#C8CFDB]" />
                      <span className="text-[#98989d]" style={{ fontSize: 11, fontWeight: 500, ...ff }}>
                        {valueSearch ? "Nenhum valor encontrado" : "Sem dados disponíveis"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── Include / Exclude (DS Segmented dark glossy) + chips ── */}
            <div className="border-t border-[#EEF1F6] px-[16px] py-[12px]">
              <div className="flex items-center justify-between mb-[10px]">
                <div className="relative flex items-center gap-[4px] h-[32px] p-[3px] bg-[#F6F7F9] rounded-[100px]">
                  {(["include", "exclude"] as const).map((mode) => {
                    const isModeActive = activeFilter.mode === mode;
                    return (
                      <button key={mode} onClick={() => updateFilter(activeFilter.id, { mode })}
                        className={`relative flex items-center h-[26px] px-[12px] rounded-[100px] transition-all cursor-pointer ${isModeActive ? "text-[#F6F7F9]" : "text-[#98989d] hover:text-[#4E6987] hover:bg-[#e8eaee]"}`}
                      >
                        {isModeActive && (
                          <>
                            <div className={`absolute inset-0 rounded-[20px] backdrop-blur-[50px] ${mode === "exclude" ? "bg-[#B13B00]" : "bg-[#28415c]"}`} />
                            <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[20px] border-[0.5px] border-solid border-[rgba(200,207,219,0.6)]" style={{ boxShadow: "0px 2px 4px 0px rgba(18,34,50,0.3)" }} />
                          </>
                        )}
                        <span className="relative z-[1] font-bold uppercase tracking-[0.5px]" style={{ fontSize: 9, ...ff }}>
                          {mode === "include" ? "Incluir Itens" : "Excluir Itens"}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {(activeFilter.selectedValues?.length || 0) > 0 && (
                  <span className="flex items-center justify-center w-[20px] h-[20px] rounded-full bg-[#07ABDE] text-white" style={{ fontSize: 9, fontWeight: 700, ...ff }}>
                    {activeFilter.selectedValues.length}
                  </span>
                )}
              </div>
              {/* Selected items — DS status pill chips (BlueBerry bg) */}
              {(activeFilter.selectedValues?.length || 0) > 0 ? (
                <div className="flex flex-wrap gap-[4px] max-h-[80px] overflow-y-auto">
                  {activeFilter.selectedValues.map((val) => (
                    <div key={val} className="flex items-center gap-[4px] h-[24px] pl-[10px] pr-[6px] rounded-[500px] bg-[#DCF0FF]">
                      <span className="truncate max-w-[90px]" style={{ fontSize: 10, fontWeight: 600, letterSpacing: -0.2, color: "#0483AB", ...ff }}>{val}</span>
                      <button onClick={() => toggleValue(val)} className="flex items-center justify-center w-[14px] h-[14px] rounded-full text-[#0483AB] hover:bg-[#FFEDEB] hover:text-[#F56233] cursor-pointer transition-colors">
                        <X size={8} weight="bold" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-[#C8CFDB]" style={{ fontSize: 11, fontWeight: 500, letterSpacing: -0.3, ...ff }}>Nenhum item selecionado</span>
              )}
            </div>
          </div>
        );
      })()}

      {/* ── Empty state ── */}
      {filters.length === 0 && !picking && (
        <div className="flex flex-col items-center justify-center py-[24px] gap-[8px]">
          <div className="w-[48px] h-[48px] rounded-full bg-[#F6F7F9] flex items-center justify-center">
            <Funnel size={22} weight="duotone" className="text-[#C8CFDB]" />
          </div>
          <span className="text-[#98989d] text-center" style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3, ...ff }}>
            Nenhum filtro aplicado
          </span>
          <span className="text-[#C8CFDB] text-center" style={{ fontSize: 11, fontWeight: 500, letterSpacing: -0.3, ...ff }}>
            Adicione filtros para restringir os dados exibidos neste widget
          </span>
        </div>
      )}

      {/* ── Field picker ── */}
      {picking && (
        <div className="rounded-[12px] border border-[#07ABDE]/30 bg-white p-[16px]">
          <div className="flex items-center gap-[8px] mb-[10px]">
            <div className="flex items-center justify-center w-[22px] h-[22px] rounded-[6px] bg-[#DCF0FF]">
              <Funnel size={12} weight="bold" className="text-[#0483AB]" />
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: -0.3, color: "#0483AB", ...ff }}>
              Selecione um campo para filtrar
            </span>
            <button
              onClick={() => { setPicking(false); setFieldSearch(""); }}
              className="ml-auto flex items-center justify-center w-[24px] h-[24px] rounded-full bg-[#F6F7F9] text-[#0483AB] hover:bg-[#DCF0FF] transition-colors cursor-pointer"
            >
              <X size={12} weight="bold" />
            </button>
          </div>
          {/* DS Search Input (rounded-full bg-[#DDE3EC] inset shadow) */}
          <div
            className="relative flex items-center gap-[10px] h-[34px] px-[12px] rounded-full bg-[#DDE3EC] mb-[10px]"
            style={{ boxShadow: "inset 0px 1px 3px 0px rgba(0,0,0,0.1), inset 0px 1px 2px 0px rgba(0,0,0,0.06)" }}
          >
            <MagnifyingGlass size={14} weight="bold" className="text-[#98989d] shrink-0" />
            <input
              type="text"
              value={fieldSearch}
              onChange={(e) => setFieldSearch(e.target.value)}
              placeholder="Buscar campos..."
              className="flex-1 bg-transparent outline-none text-[#28415c] placeholder:text-[#c8cfdb]"
              style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3, ...ff }}
            />
            {fieldSearch && (
              <button onClick={() => setFieldSearch("")} className="p-[2px] rounded-full hover:bg-[#c8cfdb]/40 text-[#98989d] cursor-pointer transition-colors">
                <X size={10} weight="bold" />
              </button>
            )}
          </div>
          {/* Table list */}
          <div className="max-h-[220px] overflow-y-auto flex flex-col gap-[2px]">
            {filteredTables.map((t) => {
              const meta = TABLE_META[t.id];
              const isExpanded = expandedTable === t.id;
              return (
                <div key={t.id}>
                  <button
                    onClick={() => setExpandedTable(isExpanded ? null : t.id)}
                    className="w-full flex items-center gap-[6px] px-[8px] py-[6px] rounded-[8px] hover:bg-[#F6F7F9] transition-colors cursor-pointer"
                  >
                    {isExpanded ? (
                      <CaretDown size={10} weight="bold" className="text-[#98989d]" />
                    ) : (
                      <CaretRight size={10} weight="bold" className="text-[#98989d]" />
                    )}
                    {meta && (
                      <div className="flex items-center justify-center w-[18px] h-[18px] rounded-[5px]" style={{ backgroundColor: meta.bg }}>
                        <span style={{ color: meta.color, fontSize: 10 }}>{meta.icon}</span>
                      </div>
                    )}
                    <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.3, color: "#122232", ...ff }}>{t.name}</span>
                    <span className="text-[#98989d] ml-auto" style={{ fontSize: 10, fontWeight: 500, ...ff }}>{t.fields.length}</span>
                  </button>
                  {isExpanded && (
                    <div className="ml-[28px] flex flex-col gap-[1px] py-[2px]">
                      {t.fields.map((f) => {
                        const alreadyAdded = filters.some((fl) => fl.fieldId === f.id && fl.table === f.table);
                        return (
                          <button
                            key={f.id}
                            onClick={() => !alreadyAdded && addFilter(f)}
                            className={`w-full flex items-center justify-between gap-[8px] px-[8px] py-[5px] rounded-[6px] transition-colors text-left ${
                              alreadyAdded ? "opacity-40 cursor-default" : "hover:bg-[#DCF0FF] cursor-pointer"
                            }`}
                          >
                            <div className="flex items-center gap-[6px]">
                              <span className="w-[6px] h-[6px] rounded-full shrink-0" style={{ backgroundColor: alreadyAdded ? "#C8CFDB" : "#07ABDE" }} />
                              <span style={{ fontSize: 12, fontWeight: 500, letterSpacing: -0.3, color: "#122232", ...ff }}>{f.label}</span>
                            </div>
                            {alreadyAdded && <Check size={10} weight="bold" className="text-[#07ABDE]" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
            {filteredTables.length === 0 && (
              <div className="flex flex-col items-center justify-center py-[16px] gap-[4px]">
                <MagnifyingGlass size={18} weight="duotone" className="text-[#C8CFDB]" />
                <span className="text-[#98989d]" style={{ fontSize: 11, fontWeight: 500, ...ff }}>Nenhum campo encontrado</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}