/* ================================================================== */
/*  Zenite Dash — Visual Builder (Tableau-like Workspace)              */
/*  Drag fields to shelves, auto-generate visualizations               */
/* ================================================================== */

import React, { useState, useMemo, useCallback, useRef, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { motion, AnimatePresence } from "motion/react";
import {
  MagnifyingGlass, X, Eye, Palette, Resize, TextT, DotsThreeCircle,
  ChatCircle, Diamond, CaretDown, CaretRight, Table, Heart, SketchLogo,
  Building, Lightning, Users, ChartBar, ChartBarHorizontal, ChartLineUp, ChartPieSlice,
  FunnelSimple, GridNine, Sparkle, ArrowCounterClockwise, FloppyDisk,
  Plus, Trash, NumberCircleOne, TextAa, CalendarBlank, Hash, Tag,
  SortAscending, SortDescending, Funnel, Lightbulb, Robot, Crosshair,
  ChartDonut, ChartScatter, TreeStructure, SquaresFour, Rows, Columns,
  Phone, EnvelopeSimple, LinkSimpleHorizontal, TextAlignLeft, Calendar,
  Timer, Percent, CurrencyDollar, ListBullets, CaretCircleUpDown,
  UserCircle, ToggleLeft, MapPin, Shapes, Function as FunctionIcon, Fingerprint,
  Atom, IdentificationCard, ClipboardText, Textbox, Package, ChartLine, Info,
  Highlighter, Folder, FolderOpen, Check, DotsThreeVertical, Copy, Scissors,
  PencilSimple, EyeSlash, ArrowsOutSimple, ArrowsInSimple, Lock, Globe, FileText, Spinner,
  ArrowsClockwise, Plugs, GoogleLogo, LinkedinLogo, MetaLogo, Broom, PresentationChart,
  Compass, ChartPolar,
} from "@phosphor-icons/react";
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell,
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, Treemap as RTreemap,
  LabelList, ZAxis, RadialBarChart, RadialBar,
  ReferenceLine, ReferenceArea,
} from "recharts";
import { useDashData, formatCurrency, formatNumber } from "./dash-data-provider";
import { useDashFilters } from "./dash-filter-context";
import { toast } from "sonner";
import { CalculatedFieldEditor } from "./dash-calculated-field-editor";
import { TableCalculationModal, type TableCalculationConfig } from "./dash-table-calculation-modal";
import { ShelfPill, type DateLevel } from "./dash-shelf-pill";
import { AnalyticsItem, ANALYTICS_ITEM_TYPE, type AnalyticsItemType, type AnalyticsItemData } from "./dash-analytics-item";
import { formatRelativeDate, type RelativeDateValue, type RelativeDatePreset, type RelativeDateParametric } from "./dash-relative-date-picker";
import { relativeDateToRange, isDateInRange } from "./dash-relative-date-utils";
import { RhombusMatrixChart } from "./dash-rhombus-matrix";
import { SankeyChart, type SankeyLink } from "./dash-sankey-chart";
import turingMascot from "figma:asset/a0a098268cd5d371916d7667ac146292c14e5a3f.png";
import { projectId, publicAnonKey } from "/utils/supabase/info";

const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };
const TURING_GRADIENT = "linear-gradient(135deg, #8C8CD4 0%, #8C8CD4 35%, #07ABDE 65%, #3CCEA7 100%)";
const TURING_GRADIENT_LOOP = "linear-gradient(90deg, #8C8CD4, #8C8CD4, #07ABDE, #3CCEA7, #07ABDE, #8C8CD4, #8C8CD4)";
const COLORS = ["#0483AB", "#3CCEA7", "#917822", "#ED5200", "#6868B1", "#07ABDE", "#EAC23D", "#B13B00", "#135543", "#28415C"];

/* ── DS palette constants (matching DashChartRenderer) ── */
const DS_NEUTRAL_BORDER = "#DDE3EC";
const DS_NEUTRAL_MUTED = "#98989d";
const DS_NEUTRAL_400 = "#28415C";
const DS_NEUTRAL_BG = "#F6F7F9";
const VB_LIGHT_OPACITY = 0.18;
const VB_MID_OPACITY = 0.45;

/* ── Custom Bar Shape (3-layer stacked depth, matching DashChartRenderer) ── */
const VBStackedBarShape = (props: any) => {
  const { x, y, width, height, fill } = props;
  if (!height || height <= 0) return null;
  const maxBarH = height;
  const lightH = Math.min(maxBarH * 1.6, maxBarH + 40);
  const midH = maxBarH * 0.7;
  const r = Math.min(3, width / 4);
  return (
    <g>
      <rect x={x} y={y + height - lightH} width={width} height={lightH} rx={r} ry={r} fill={fill} opacity={VB_LIGHT_OPACITY} />
      <rect x={x} y={y + height - midH} width={width} height={midH} rx={r} ry={r} fill={fill} opacity={VB_MID_OPACITY} />
      <rect x={x} y={y} width={width} height={height} rx={r} ry={r} fill={fill} opacity={0.85} />
    </g>
  );
};

/* ── Custom Horizontal Bar Shape (3-layer depth, matching DashChartRenderer) ── */
const VBStackedBarShapeH = (props: any) => {
  const { x, y, width, height, fill } = props;
  if (!width || width <= 0) return null;
  const lightW = Math.min(width * 1.5, width + 40);
  const midW = width * 0.7;
  const r = Math.min(3, height / 4);
  return (
    <g>
      <rect x={x} y={y} width={lightW} height={height} rx={r} ry={r} fill={fill} opacity={VB_LIGHT_OPACITY} />
      <rect x={x} y={y} width={midW} height={height} rx={r} ry={r} fill={fill} opacity={VB_MID_OPACITY} />
      <rect x={x} y={y} width={width} height={height} rx={r} ry={r} fill={fill} opacity={0.85} />
    </g>
  );
};

/* ── Custom Axis Ticks (DS typography, matching DashChartRenderer) ── */
const VBAxisTick = ({ x, y, payload, angle }: any) => {
  const displayVal = typeof payload.value === "string" && payload.value.length > 14
    ? payload.value.slice(0, 13) + "\u2026"
    : payload.value;
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={12} textAnchor={angle ? "end" : "middle"} fill={DS_NEUTRAL_MUTED}
        style={{ fontSize: 11, fontWeight: 500, letterSpacing: -0.2, ...ff }}
        transform={angle ? `rotate(${angle})` : undefined}>
        {displayVal}
      </text>
    </g>
  );
};

const VBYAxisTick = ({ x, y, payload }: any) => {
  const val = typeof payload.value === "number"
    ? (payload.value >= 1000 ? `${(payload.value / 1000).toFixed(0)}k` : String(payload.value))
    : payload.value;
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={-8} y={0} dy={4} textAnchor="end" fill={DS_NEUTRAL_MUTED}
        style={{ fontSize: 10, fontWeight: 500, letterSpacing: -0.2, ...ff }}>
        {val}
      </text>
    </g>
  );
};

/* ── Custom Legend (DS pill style, matching DashChartRenderer) ── */
const VBLegend = ({ payload }: any) => {
  if (!payload || !payload.length) return null;
  const filtered = payload.filter((e: any) => e.value !== "_ghost");
  if (!filtered.length) return null;
  return (
    <div className="flex items-center justify-center gap-[12px] mt-[8px]">
      {filtered.map((entry: any, idx: number) => (
        <div key={idx} className="flex items-center gap-[5px]">
          <span className="w-[8px] h-[8px] rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
          <span className="text-[#4E6987] truncate max-w-[120px]"
            style={{ fontSize: 11, fontWeight: 600, letterSpacing: -0.2, ...ff }}>
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

/* ── Custom Line Dot (matching DashChartRenderer) ── */
const VBDot = (props: any) => {
  const { cx, cy, fill } = props;
  if (cx == null || cy == null) return null;
  return <circle cx={cx} cy={cy} r={4.5} fill={fill} stroke="white" strokeWidth={2} />;
};

const VBActiveDot = (props: any) => {
  const { cx, cy, fill } = props;
  if (cx == null || cy == null) return null;
  return (
    <g>
      <circle cx={cx} cy={cy} r={10} fill={fill} opacity={0.15} />
      <circle cx={cx} cy={cy} r={6} fill={fill} stroke="white" strokeWidth={2.5} />
    </g>
  );
};

const ITEM_TYPE = "FIELD";

/* ── Field Schema ── */
type FieldType = "dimension" | "measure" | "date";
interface CrmField {
  id: string;
  name: string;
  label: string;
  table: string;
  type: FieldType;
  dataType: "string" | "number" | "date" | "boolean";
  aggregation?: "SUM" | "AVG" | "COUNT" | "MIN" | "MAX" | "COUNTD";
  format?: "text" | "currency" | "percent" | "ratio" | "ranking" | "json" | "number" | "date" | "integer";
}

interface CrmTable {
  id: string;
  name: string;
  icon: ReactNode;
  color: string;
  bg: string;
  fields: CrmField[];
}

// Calculated Field
interface CalculatedField extends CrmField {
  formula: string;
  isCalculated: true;
}

// Filter Configuration
type FilterOperator = "equals" | "notEquals" | "contains" | "notContains" | "greaterThan" | "lessThan" | "greaterOrEqual" | "lessOrEqual" | "isEmpty" | "isNotEmpty" | "isTrue" | "isFalse";
interface FilterConfig {
  operator: FilterOperator;
  value?: string | number | boolean;
  // Date-specific: relative date support
  relativeDateValue?: import("./dash-relative-date-picker").RelativeDateValue;
  isRelativeDate?: boolean;
}

export const CRM_TABLES: CrmTable[] = [
  {
    id: "leads", name: "Leads", icon: <Heart size={14} weight="duotone" />, color: "#EAC23D", bg: "#FEEDCA",
    fields: [
      // ID
      { id: "l_id", name: "id", label: "ID do Lead", table: "leads", type: "dimension", dataType: "string" },
      // Dimensões básicas
      { id: "l_name", name: "name", label: "Nome", table: "leads", type: "dimension", dataType: "string" },
      { id: "l_lastname", name: "lastname", label: "Sobrenome", table: "leads", type: "dimension", dataType: "string" },
      { id: "l_role", name: "role", label: "Cargo", table: "leads", type: "dimension", dataType: "string" },
      { id: "l_company", name: "company", label: "Empresa", table: "leads", type: "dimension", dataType: "string" },
      { id: "l_phone", name: "phone", label: "Telefone", table: "leads", type: "dimension", dataType: "string" },
      { id: "l_email", name: "email", label: "E-mail", table: "leads", type: "dimension", dataType: "string" },
      { id: "l_address", name: "address", label: "Endereço", table: "leads", type: "dimension", dataType: "string" },
      { id: "l_type", name: "type", label: "Tipo", table: "leads", type: "dimension", dataType: "string" },
      { id: "l_origin", name: "origin", label: "Origem", table: "leads", type: "dimension", dataType: "string" },
      { id: "l_segment", name: "segment", label: "Segmento", table: "leads", type: "dimension", dataType: "string" },
      { id: "l_stage", name: "stage", label: "Estágio", table: "leads", type: "dimension", dataType: "string" },
      { id: "l_stageComp", name: "stage_complement", label: "Complemento do Estágio", table: "leads", type: "dimension", dataType: "string" },
      { id: "l_owner", name: "owner", label: "Responsável", table: "leads", type: "dimension", dataType: "string" },
      { id: "l_scoreLabel", name: "score_label", label: "Classificação", table: "leads", type: "dimension", dataType: "string" },
      { id: "l_lastActivity", name: "last_activity", label: "Última Atividade", table: "leads", type: "dimension", dataType: "string" },
      { id: "l_responseTime", name: "response_time", label: "Tempo de Resposta", table: "leads", type: "dimension", dataType: "string" },
      { id: "l_website", name: "website", label: "Website", table: "leads", type: "dimension", dataType: "string" },
      { id: "l_prefContact", name: "preferred_contact", label: "Contato Preferido", table: "leads", type: "dimension", dataType: "string" },
      { id: "l_isActive", name: "is_active", label: "Ativo", table: "leads", type: "dimension", dataType: "boolean" },
      { id: "l_isDeleted", name: "is_deleted", label: "Excluído", table: "leads", type: "dimension", dataType: "boolean" },
      { id: "l_tags", name: "tags", label: "Tags", table: "leads", type: "dimension", dataType: "string" },
      { id: "l_notes", name: "notes", label: "Notas", table: "leads", type: "dimension", dataType: "string" },
      { id: "l_createdBy", name: "created_by", label: "Criado Por", table: "leads", type: "dimension", dataType: "string" },
      { id: "l_updatedBy", name: "updated_by", label: "Atualizado Por", table: "leads", type: "dimension", dataType: "string" },
      // Marketing
      { id: "l_mktCamp", name: "mkt_campanha", label: "Campanha", table: "leads", type: "dimension", dataType: "string" },
      { id: "l_mktGrupo", name: "mkt_grupo_anuncios", label: "Grupo de Anúncios", table: "leads", type: "dimension", dataType: "string" },
      { id: "l_mktAnuncio", name: "mkt_anuncio", label: "Anúncio", table: "leads", type: "dimension", dataType: "string" },
      { id: "l_mktCanal", name: "mkt_canal", label: "Canal", table: "leads", type: "dimension", dataType: "string" },
      // Datas
      { id: "l_createdAt", name: "created_at", label: "Data de Criação", table: "leads", type: "date", dataType: "date" },
      { id: "l_updatedAt", name: "updated_at", label: "Data de Atualização", table: "leads", type: "date", dataType: "date" },
      { id: "l_lastActivityDate", name: "last_activity_date", label: "Data da Última Atividade", table: "leads", type: "date", dataType: "date" },
      { id: "l_lastViewed", name: "last_viewed_date", label: "Data da Última Visualização", table: "leads", type: "date", dataType: "date" },
      { id: "l_lastRef", name: "last_referenced_date", label: "Data da Última Referência", table: "leads", type: "date", dataType: "date" },
      { id: "l_systemMod", name: "system_modstamp", label: "Data de Modificação do Sistema", table: "leads", type: "date", dataType: "date" },
      { id: "l_mktUltConv", name: "mkt_ultima_conversao", label: "Data da Última Conversão", table: "leads", type: "date", dataType: "date" },
      // Medidas
      { id: "l_score", name: "score", label: "Score", table: "leads", type: "measure", dataType: "number", aggregation: "AVG" },
      { id: "l_qualProg", name: "qualification_progress", label: "Progr. Qualificação", table: "leads", type: "measure", dataType: "number", aggregation: "AVG" },
      { id: "l_annualRev", name: "annual_revenue", label: "Receita Anual", table: "leads", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "l_employees", name: "employee_count", label: "Nº Funcionários", table: "leads", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "l_convRate", name: "conversion_rate", label: "Taxa de Conversão", table: "leads", type: "measure", dataType: "number", aggregation: "AVG" },
      { id: "l_count", name: "_count", label: "Contagem de Leads", table: "leads", type: "measure", dataType: "number", aggregation: "COUNT" },
    ],
  },
  {
    id: "opportunities", name: "Oportunidades", icon: <SketchLogo size={14} weight="duotone" />, color: "#07ABDE", bg: "#DCF0FF",
    fields: [
      // ID
      { id: "o_id", name: "id", label: "ID da Oportunidade", table: "opportunities", type: "dimension", dataType: "string" },
      // Dimensões básicas
      { id: "o_name", name: "name", label: "Nome", table: "opportunities", type: "dimension", dataType: "string" },
      { id: "o_company", name: "company", label: "Empresa", table: "opportunities", type: "dimension", dataType: "string" },
      { id: "o_stage", name: "stage", label: "Estágio", table: "opportunities", type: "dimension", dataType: "string" },
      { id: "o_stageComp", name: "stage_complement", label: "Complemento do Estágio", table: "opportunities", type: "dimension", dataType: "string" },
      { id: "o_tipo", name: "tipo", label: "Tipo", table: "opportunities", type: "dimension", dataType: "string" },
      { id: "o_type", name: "type", label: "Type", table: "opportunities", type: "dimension", dataType: "string" },
      { id: "o_owner", name: "owner", label: "Responsável", table: "opportunities", type: "dimension", dataType: "string" },
      { id: "o_decisor", name: "decisor", label: "Decisor", table: "opportunities", type: "dimension", dataType: "string" },
      { id: "o_account", name: "account", label: "Conta", table: "opportunities", type: "dimension", dataType: "string" },
      { id: "o_origin", name: "origin", label: "Origem", table: "opportunities", type: "dimension", dataType: "string" },
      { id: "o_lastActivity", name: "last_activity", label: "Última Atividade", table: "opportunities", type: "dimension", dataType: "string" },
      { id: "o_scoreLabel", name: "score_label", label: "Classificação", table: "opportunities", type: "dimension", dataType: "string" },
      { id: "o_mostRecent", name: "most_recent", label: "Mais Recente", table: "opportunities", type: "dimension", dataType: "boolean" },
      { id: "o_tag", name: "tag", label: "Tag", table: "opportunities", type: "dimension", dataType: "string" },
      { id: "o_createdBy", name: "created_by", label: "Criado Por", table: "opportunities", type: "dimension", dataType: "string" },
      { id: "o_updatedBy", name: "updated_by", label: "Atualizado Por", table: "opportunities", type: "dimension", dataType: "string" },
      // Needs (BANT/MEDDIC)
      { id: "o_needsObj", name: "needs_objective", label: "Objetivo", table: "opportunities", type: "dimension", dataType: "string" },
      { id: "o_needsCurr", name: "needs_current_situation", label: "Situação Atual", table: "opportunities", type: "dimension", dataType: "string" },
      { id: "o_needsChall", name: "needs_challenges", label: "Desafios", table: "opportunities", type: "dimension", dataType: "string" },
      { id: "o_needsBudget", name: "needs_budget", label: "Orçamento", table: "opportunities", type: "dimension", dataType: "string" },
      { id: "o_needsTime", name: "needs_timeline", label: "Timeline", table: "opportunities", type: "dimension", dataType: "string" },
      { id: "o_needsNotes", name: "needs_notes", label: "Notas de Needs", table: "opportunities", type: "dimension", dataType: "string" },
      // Marketing
      { id: "o_mktCamp", name: "mkt_campanha", label: "Campanha", table: "opportunities", type: "dimension", dataType: "string" },
      { id: "o_mktGrupo", name: "mkt_grupo_anuncios", label: "Grupo de Anúncios", table: "opportunities", type: "dimension", dataType: "string" },
      { id: "o_mktAnuncio", name: "mkt_anuncio", label: "Anúncio", table: "opportunities", type: "dimension", dataType: "string" },
      { id: "o_mktCanal", name: "mkt_canal", label: "Canal", table: "opportunities", type: "dimension", dataType: "string" },
      // Datas
      { id: "o_createdAt", name: "created_at", label: "Data de Criação", table: "opportunities", type: "date", dataType: "date" },
      { id: "o_updatedAt", name: "updated_at", label: "Data de Atualização", table: "opportunities", type: "date", dataType: "date" },
      { id: "o_closeDate", name: "close_date", label: "Data de Fechamento", table: "opportunities", type: "date", dataType: "date" },
      { id: "o_lastActivityDate", name: "last_activity_date", label: "Data da Última Atividade", table: "opportunities", type: "date", dataType: "date" },
      { id: "o_mktUltConv", name: "mkt_ultima_conversao", label: "Data da Última Conversão", table: "opportunities", type: "date", dataType: "date" },
      // Medidas
      { id: "o_value", name: "value", label: "Valor", table: "opportunities", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "o_score", name: "score", label: "Score", table: "opportunities", type: "measure", dataType: "number", aggregation: "AVG" },
      { id: "o_comments", name: "comments", label: "Comentários", table: "opportunities", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "o_calls", name: "calls", label: "Ligações", table: "opportunities", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "o_count", name: "_count", label: "Contagem de Opps", table: "opportunities", type: "measure", dataType: "number", aggregation: "COUNT" },
    ],
  },
  {
    id: "activities", name: "Atividades", icon: <Lightning size={14} weight="duotone" />, color: "#4E6987", bg: "#DDE3EC",
    fields: [
      // ID
      { id: "a_id", name: "id", label: "ID da Atividade", table: "activities", type: "dimension", dataType: "string" },
      // Dimensões básicas
      { id: "a_type", name: "type", label: "Tipo", table: "activities", type: "dimension", dataType: "string" },
      { id: "a_label", name: "label", label: "Rótulo", table: "activities", type: "dimension", dataType: "string" },
      { id: "a_subject", name: "subject", label: "Assunto", table: "activities", type: "dimension", dataType: "string" },
      { id: "a_description", name: "description", label: "Descrição", table: "activities", type: "dimension", dataType: "string" },
      { id: "a_status", name: "status", label: "Status", table: "activities", type: "dimension", dataType: "string" },
      { id: "a_priority", name: "priority", label: "Prioridade", table: "activities", type: "dimension", dataType: "string" },
      { id: "a_owner", name: "owner", label: "Responsável", table: "activities", type: "dimension", dataType: "string" },
      { id: "a_assignedTo", name: "assigned_to", label: "Atribuído a", table: "activities", type: "dimension", dataType: "string" },
      { id: "a_group", name: "group", label: "Grupo", table: "activities", type: "dimension", dataType: "string" },
      { id: "a_entityType", name: "entity_type", label: "Tipo de Entidade", table: "activities", type: "dimension", dataType: "string" },
      { id: "a_entityId", name: "entity_id", label: "ID da Entidade", table: "activities", type: "dimension", dataType: "string" },
      { id: "a_relatedToType", name: "related_to_type", label: "Tipo Relacionado", table: "activities", type: "dimension", dataType: "string" },
      { id: "a_relatedToId", name: "related_to_id", label: "ID Relacionado", table: "activities", type: "dimension", dataType: "string" },
      { id: "a_relatedToName", name: "related_to_name", label: "Nome Relacionado", table: "activities", type: "dimension", dataType: "string" },
      { id: "a_contactId", name: "contact_id", label: "ID do Contato", table: "activities", type: "dimension", dataType: "string" },
      { id: "a_contactName", name: "contact_name", label: "Nome do Contato", table: "activities", type: "dimension", dataType: "string" },
      { id: "a_location", name: "location", label: "Local", table: "activities", type: "dimension", dataType: "string" },
      { id: "a_allDay", name: "all_day", label: "Dia Inteiro", table: "activities", type: "dimension", dataType: "boolean" },
      { id: "a_isPrivate", name: "is_private", label: "Privado", table: "activities", type: "dimension", dataType: "boolean" },
      { id: "a_isRecurring", name: "is_recurring", label: "Recorrente", table: "activities", type: "dimension", dataType: "boolean" },
      { id: "a_tags", name: "tags", label: "Tags", table: "activities", type: "dimension", dataType: "string" },
      { id: "a_body", name: "body", label: "Corpo", table: "activities", type: "dimension", dataType: "string" },
      { id: "a_meetLink", name: "meet_link", label: "Link da Reunião", table: "activities", type: "dimension", dataType: "string" },
      { id: "a_googleEventId", name: "google_event_id", label: "ID do Evento Google", table: "activities", type: "dimension", dataType: "string" },
      { id: "a_timezone", name: "timezone", label: "Fuso Horário", table: "activities", type: "dimension", dataType: "string" },
      { id: "a_recurrence", name: "recurrence", label: "Recorrência", table: "activities", type: "dimension", dataType: "string" },
      { id: "a_reminder", name: "reminder", label: "Lembrete", table: "activities", type: "dimension", dataType: "string" },
      { id: "a_busyStatus", name: "busy_status", label: "Status de Ocupação", table: "activities", type: "dimension", dataType: "string" },
      { id: "a_visibility", name: "visibility", label: "Visibilidade", table: "activities", type: "dimension", dataType: "string" },
      { id: "a_calendarName", name: "calendar_name", label: "Nome do Calendário", table: "activities", type: "dimension", dataType: "string" },
      { id: "a_callType", name: "call_type", label: "Tipo de Ligação", table: "activities", type: "dimension", dataType: "string" },
      { id: "a_callResult", name: "call_result", label: "Resultado da Ligação", table: "activities", type: "dimension", dataType: "string" },
      { id: "a_callDirection", name: "call_direction", label: "Direção da Ligação", table: "activities", type: "dimension", dataType: "string" },
      { id: "a_phone", name: "phone", label: "Telefone", table: "activities", type: "dimension", dataType: "string" },
      { id: "a_channel", name: "channel", label: "Canal", table: "activities", type: "dimension", dataType: "string" },
      { id: "a_recipient", name: "recipient", label: "Destinatário", table: "activities", type: "dimension", dataType: "string" },
      { id: "a_recipientPhone", name: "recipient_phone", label: "Telefone do Destinatário", table: "activities", type: "dimension", dataType: "string" },
      { id: "a_noteVis", name: "note_visibility", label: "Visibilidade da Nota", table: "activities", type: "dimension", dataType: "string" },
      { id: "a_createdBy", name: "created_by", label: "Criado Por", table: "activities", type: "dimension", dataType: "string" },
      { id: "a_updatedBy", name: "updated_by", label: "Atualizado Por", table: "activities", type: "dimension", dataType: "string" },
      // Datas
      { id: "a_date", name: "date", label: "Data", table: "activities", type: "date", dataType: "date" },
      { id: "a_dueDate", name: "due_date", label: "Data de Vencimento", table: "activities", type: "date", dataType: "date" },
      { id: "a_startDate", name: "start_date", label: "Data de Início", table: "activities", type: "date", dataType: "date" },
      { id: "a_endDate", name: "end_date", label: "Data de Término", table: "activities", type: "date", dataType: "date" },
      { id: "a_completedAt", name: "completed_at", label: "Data de Conclusão", table: "activities", type: "date", dataType: "date" },
      { id: "a_sentAt", name: "sent_at", label: "Data de Envio", table: "activities", type: "date", dataType: "date" },
      { id: "a_readAt", name: "read_at", label: "Data de Leitura", table: "activities", type: "date", dataType: "date" },
      { id: "a_createdAt", name: "created_at", label: "Data de Criação", table: "activities", type: "date", dataType: "date" },
      { id: "a_updatedAt", name: "updated_at", label: "Data de Atualização", table: "activities", type: "date", dataType: "date" },
      // Medidas
      { id: "a_callDuration", name: "call_duration", label: "Duração da Ligação", table: "activities", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "a_recurrenceInt", name: "recurrence_interval", label: "Intervalo de Recorrência", table: "activities", type: "measure", dataType: "number", aggregation: "AVG" },
      { id: "a_version", name: "version", label: "Versão", table: "activities", type: "measure", dataType: "number", aggregation: "MAX" },
      { id: "a_count", name: "_count", label: "Contagem de Atividades", table: "activities", type: "measure", dataType: "number", aggregation: "COUNT" },
    ],
  },
  {
    id: "accounts", name: "Contas", icon: <Building size={14} weight="duotone" />, color: "#3CCEA7", bg: "#D9F8EF",
    fields: [
      // ID
      { id: "ac_id", name: "id", label: "ID da Conta", table: "accounts", type: "dimension", dataType: "string" },
      // Dimensões básicas
      { id: "ac_name", name: "name", label: "Nome", table: "accounts", type: "dimension", dataType: "string" },
      { id: "ac_type", name: "type", label: "Tipo", table: "accounts", type: "dimension", dataType: "string" },
      { id: "ac_stage", name: "stage", label: "Estágio", table: "accounts", type: "dimension", dataType: "string" },
      { id: "ac_owner", name: "owner", label: "Responsável", table: "accounts", type: "dimension", dataType: "string" },
      { id: "ac_accountNum", name: "account_number", label: "Número da Conta", table: "accounts", type: "dimension", dataType: "string" },
      { id: "ac_sector", name: "sector", label: "Setor", table: "accounts", type: "dimension", dataType: "string" },
      { id: "ac_website", name: "website", label: "Website", table: "accounts", type: "dimension", dataType: "string" },
      { id: "ac_phone", name: "phone", label: "Telefone", table: "accounts", type: "dimension", dataType: "string" },
      { id: "ac_fax", name: "fax", label: "Fax", table: "accounts", type: "dimension", dataType: "string" },
      { id: "ac_cnpj", name: "cnpj", label: "CNPJ", table: "accounts", type: "dimension", dataType: "string" },
      { id: "ac_description", name: "description", label: "Descrição", table: "accounts", type: "dimension", dataType: "string" },
      { id: "ac_ownership", name: "ownership", label: "Propriedade", table: "accounts", type: "dimension", dataType: "string" },
      { id: "ac_currency", name: "currency", label: "Moeda", table: "accounts", type: "dimension", dataType: "string" },
      { id: "ac_rating", name: "rating", label: "Classificação", table: "accounts", type: "dimension", dataType: "string" },
      { id: "ac_origin", name: "origin", label: "Origem", table: "accounts", type: "dimension", dataType: "string" },
      { id: "ac_accountSite", name: "account_site", label: "Site da Conta", table: "accounts", type: "dimension", dataType: "string" },
      { id: "ac_accountType", name: "account_type", label: "Tipo de Conta", table: "accounts", type: "dimension", dataType: "string" },
      { id: "ac_parentAccount", name: "parent_account", label: "Conta Pai", table: "accounts", type: "dimension", dataType: "string" },
      { id: "ac_partnerAccount", name: "partner_account", label: "Conta Parceira", table: "accounts", type: "dimension", dataType: "boolean" },
      { id: "ac_sicCode", name: "sic_code", label: "Código SIC", table: "accounts", type: "dimension", dataType: "string" },
      { id: "ac_ticker", name: "ticker", label: "Ticker", table: "accounts", type: "dimension", dataType: "string" },
      // Endereço de cobrança
      { id: "ac_billStreet", name: "billing_street", label: "Rua (Cobrança)", table: "accounts", type: "dimension", dataType: "string" },
      { id: "ac_billCity", name: "billing_city", label: "Cidade (Cobrança)", table: "accounts", type: "dimension", dataType: "string" },
      { id: "ac_billState", name: "billing_state", label: "Estado (Cobrança)", table: "accounts", type: "dimension", dataType: "string" },
      { id: "ac_billZip", name: "billing_zip", label: "CEP (Cobrança)", table: "accounts", type: "dimension", dataType: "string" },
      { id: "ac_billCountry", name: "billing_country", label: "País (Cobrança)", table: "accounts", type: "dimension", dataType: "string" },
      // Endereço de entrega
      { id: "ac_shipStreet", name: "shipping_street", label: "Rua (Entrega)", table: "accounts", type: "dimension", dataType: "string" },
      { id: "ac_shipCity", name: "shipping_city", label: "Cidade (Entrega)", table: "accounts", type: "dimension", dataType: "string" },
      { id: "ac_shipState", name: "shipping_state", label: "Estado (Entrega)", table: "accounts", type: "dimension", dataType: "string" },
      { id: "ac_shipZip", name: "shipping_zip", label: "CEP (Entrega)", table: "accounts", type: "dimension", dataType: "string" },
      { id: "ac_shipCountry", name: "shipping_country", label: "País (Entrega)", table: "accounts", type: "dimension", dataType: "string" },
      // Dados pessoais (para contas pessoa física)
      { id: "ac_firstName", name: "first_name", label: "Primeiro Nome", table: "accounts", type: "dimension", dataType: "string" },
      { id: "ac_lastName", name: "last_name", label: "Sobrenome", table: "accounts", type: "dimension", dataType: "string" },
      { id: "ac_email", name: "email", label: "E-mail", table: "accounts", type: "dimension", dataType: "string" },
      { id: "ac_persPhone", name: "personal_phone", label: "Telefone Pessoal", table: "accounts", type: "dimension", dataType: "string" },
      { id: "ac_cpf", name: "cpf", label: "CPF", table: "accounts", type: "dimension", dataType: "string" },
      { id: "ac_persStreet", name: "personal_street", label: "Rua (Pessoal)", table: "accounts", type: "dimension", dataType: "string" },
      { id: "ac_persCity", name: "personal_city", label: "Cidade (Pessoal)", table: "accounts", type: "dimension", dataType: "string" },
      { id: "ac_persState", name: "personal_state", label: "Estado (Pessoal)", table: "accounts", type: "dimension", dataType: "string" },
      { id: "ac_persZip", name: "personal_zip", label: "CEP (Pessoal)", table: "accounts", type: "dimension", dataType: "string" },
      { id: "ac_persCountry", name: "personal_country", label: "País (Pessoal)", table: "accounts", type: "dimension", dataType: "string" },
      { id: "ac_prefContact", name: "preferred_contact", label: "Contato Preferido", table: "accounts", type: "dimension", dataType: "string" },
      { id: "ac_doNotContact", name: "do_not_contact", label: "Não Contactar", table: "accounts", type: "dimension", dataType: "boolean" },
      // Outros
      { id: "ac_tags", name: "tags", label: "Tags", table: "accounts", type: "dimension", dataType: "string" },
      { id: "ac_notes", name: "notes", label: "Notas", table: "accounts", type: "dimension", dataType: "string" },
      { id: "ac_lastActivity", name: "last_activity", label: "Última Atividade", table: "accounts", type: "dimension", dataType: "string" },
      { id: "ac_segment", name: "segment", label: "Segmento", table: "accounts", type: "dimension", dataType: "string" },
      { id: "ac_isDeleted", name: "is_deleted", label: "Excluído", table: "accounts", type: "dimension", dataType: "boolean" },
      { id: "ac_createdBy", name: "created_by", label: "Criado Por", table: "accounts", type: "dimension", dataType: "string" },
      { id: "ac_updatedBy", name: "updated_by", label: "Atualizado Por", table: "accounts", type: "dimension", dataType: "string" },
      // Marketing
      { id: "ac_mktCamp", name: "mkt_campanha", label: "Campanha", table: "accounts", type: "dimension", dataType: "string" },
      { id: "ac_mktGrupo", name: "mkt_grupo_anuncios", label: "Grupo de Anúncios", table: "accounts", type: "dimension", dataType: "string" },
      { id: "ac_mktAnuncio", name: "mkt_anuncio", label: "Anúncio", table: "accounts", type: "dimension", dataType: "string" },
      { id: "ac_mktCanal", name: "mkt_canal", label: "Canal", table: "accounts", type: "dimension", dataType: "string" },
      // Datas
      { id: "ac_birthDate", name: "birth_date", label: "Data de Nascimento", table: "accounts", type: "date", dataType: "date" },
      { id: "ac_lastActivityDate", name: "last_activity_date", label: "Data da Última Atividade", table: "accounts", type: "date", dataType: "date" },
      { id: "ac_lastViewed", name: "last_viewed_date", label: "Data da Última Visualização", table: "accounts", type: "date", dataType: "date" },
      { id: "ac_lastRef", name: "last_referenced_date", label: "Data da Última Referência", table: "accounts", type: "date", dataType: "date" },
      { id: "ac_systemMod", name: "system_modstamp", label: "Data de Modificação do Sistema", table: "accounts", type: "date", dataType: "date" },
      { id: "ac_createdAt", name: "created_at", label: "Data de Criação", table: "accounts", type: "date", dataType: "date" },
      { id: "ac_updatedAt", name: "updated_at", label: "Data de Atualização", table: "accounts", type: "date", dataType: "date" },
      { id: "ac_mktUltConv", name: "mkt_ultima_conversao", label: "Data da Última Conversão", table: "accounts", type: "date", dataType: "date" },
      // Medidas
      { id: "ac_annualRevenue", name: "annual_revenue", label: "Receita Anual", table: "accounts", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "ac_revenue", name: "revenue", label: "Receita", table: "accounts", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "ac_employees", name: "employees", label: "Funcionários", table: "accounts", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "ac_contacts", name: "contacts", label: "Contatos", table: "accounts", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "ac_comments", name: "comments", label: "Comentários", table: "accounts", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "ac_calls", name: "calls", label: "Ligações", table: "accounts", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "ac_count", name: "_count", label: "Contagem de Contas", table: "accounts", type: "measure", dataType: "number", aggregation: "COUNT" },
    ],
  },
  {
    id: "contacts", name: "Contatos", icon: <IdentificationCard size={14} weight="duotone" />, color: "#FF8C76", bg: "#FFEDEB",
    fields: [
      // ID
      { id: "c_id", name: "id", label: "ID do Contato", table: "contacts", type: "dimension", dataType: "string" },
      // Dimensões básicas
      { id: "ct_name", name: "name", label: "Nome", table: "contacts", type: "dimension", dataType: "string" },
      { id: "ct_lastName", name: "last_name", label: "Sobrenome", table: "contacts", type: "dimension", dataType: "string" },
      { id: "ct_role", name: "role", label: "Cargo", table: "contacts", type: "dimension", dataType: "string" },
      { id: "ct_department", name: "department", label: "Departamento", table: "contacts", type: "dimension", dataType: "string" },
      { id: "ct_company", name: "company", label: "Empresa", table: "contacts", type: "dimension", dataType: "string" },
      { id: "ct_account", name: "account", label: "Conta", table: "contacts", type: "dimension", dataType: "string" },
      { id: "ct_phone", name: "phone", label: "Telefone", table: "contacts", type: "dimension", dataType: "string" },
      { id: "ct_mobile", name: "mobile", label: "Celular", table: "contacts", type: "dimension", dataType: "string" },
      { id: "ct_email", name: "email", label: "E-mail", table: "contacts", type: "dimension", dataType: "string" },
      { id: "ct_linkedin", name: "linkedin", label: "LinkedIn", table: "contacts", type: "dimension", dataType: "string" },
      { id: "ct_website", name: "website", label: "Website", table: "contacts", type: "dimension", dataType: "string" },
      { id: "ct_address", name: "address", label: "Endereço", table: "contacts", type: "dimension", dataType: "string" },
      { id: "ct_stage", name: "stage", label: "Estágio", table: "contacts", type: "dimension", dataType: "string" },
      { id: "ct_owner", name: "owner", label: "Responsável", table: "contacts", type: "dimension", dataType: "string" },
      { id: "ct_origin", name: "origin", label: "Origem", table: "contacts", type: "dimension", dataType: "string" },
      { id: "ct_cpf", name: "cpf", label: "CPF", table: "contacts", type: "dimension", dataType: "string" },
      { id: "ct_prefContact", name: "preferred_contact", label: "Contato Preferido", table: "contacts", type: "dimension", dataType: "string" },
      { id: "ct_doNotContact", name: "do_not_contact", label: "Não Contactar", table: "contacts", type: "dimension", dataType: "boolean" },
      { id: "ct_tags", name: "tags", label: "Tags", table: "contacts", type: "dimension", dataType: "string" },
      { id: "ct_notes", name: "notes", label: "Notas", table: "contacts", type: "dimension", dataType: "string" },
      { id: "ct_lastActivityDateIso", name: "last_activity_date_iso", label: "Data da Última Atividade (ISO)", table: "contacts", type: "dimension", dataType: "string" },
      { id: "ct_avatar", name: "avatar", label: "Avatar", table: "contacts", type: "dimension", dataType: "string" },
      { id: "ct_isDeleted", name: "is_deleted", label: "Excluído", table: "contacts", type: "dimension", dataType: "boolean" },
      { id: "ct_createdBy", name: "created_by", label: "Criado Por", table: "contacts", type: "dimension", dataType: "string" },
      { id: "ct_updatedBy", name: "updated_by", label: "Atualizado Por", table: "contacts", type: "dimension", dataType: "string" },
      // Datas
      { id: "ct_birthDate", name: "birth_date", label: "Data de Nascimento", table: "contacts", type: "date", dataType: "date" },
      { id: "ct_lastActivityDate", name: "last_activity_date", label: "Data da Última Atividade", table: "contacts", type: "date", dataType: "date" },
      { id: "ct_lastViewed", name: "last_viewed_date", label: "Data da Última Visualização", table: "contacts", type: "date", dataType: "date" },
      { id: "ct_lastRef", name: "last_referenced_date", label: "Data da Última Referência", table: "contacts", type: "date", dataType: "date" },
      { id: "ct_systemMod", name: "system_modstamp", label: "Data de Modificação do Sistema", table: "contacts", type: "date", dataType: "date" },
      { id: "ct_createdAt", name: "created_at", label: "Data de Criação", table: "contacts", type: "date", dataType: "date" },
      { id: "ct_updatedAt", name: "updated_at", label: "Data de Atualização", table: "contacts", type: "date", dataType: "date" },
      // Medidas
      { id: "ct_comments", name: "comments", label: "Comentários", table: "contacts", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "ct_calls", name: "calls", label: "Ligações", table: "contacts", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "ct_count", name: "_count", label: "Contagem de Contatos", table: "contacts", type: "measure", dataType: "number", aggregation: "COUNT" },
    ],
  },
  {
    id: "proposals", name: "Propostas", icon: <ClipboardText size={14} weight="duotone" />, color: "#07ABDE", bg: "#FFE8E0",
    fields: [
      // Dimens��es básicas
      { id: "pr_clientName", name: "client_name", label: "Nome do Cliente", table: "proposals", type: "dimension", dataType: "string" },
      { id: "pr_status", name: "status", label: "Status", table: "proposals", type: "dimension", dataType: "string" },
      { id: "pr_notes", name: "notes", label: "Notas", table: "proposals", type: "dimension", dataType: "string" },
      { id: "pr_comboLabel", name: "combo_label", label: "Rótulo do Combo", table: "proposals", type: "dimension", dataType: "string" },
      { id: "pr_tag", name: "tag", label: "Tag", table: "proposals", type: "dimension", dataType: "string" },
      { id: "pr_account", name: "account", label: "Conta", table: "proposals", type: "dimension", dataType: "string" },
      { id: "pr_opportunity", name: "opportunity", label: "Oportunidade", table: "proposals", type: "dimension", dataType: "string" },
      { id: "pr_contact", name: "contact", label: "Contato", table: "proposals", type: "dimension", dataType: "string" },
      // Datas
      { id: "pr_createdAt", name: "created_at", label: "Data de Criação", table: "proposals", type: "date", dataType: "date" },
      { id: "pr_updatedAt", name: "updated_at", label: "Data de Atualização", table: "proposals", type: "date", dataType: "date" },
      // Medidas
      { id: "pr_globalDiscount", name: "global_discount", label: "Desconto Global", table: "proposals", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "pr_comboDiscount", name: "combo_discount_percent", label: "Desconto Combo (%)", table: "proposals", type: "measure", dataType: "number", aggregation: "AVG" },
      { id: "pr_totalMonthly", name: "total_monthly", label: "Total Mensal", table: "proposals", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "pr_totalImpl", name: "total_impl", label: "Total Implantação", table: "proposals", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "pr_grandTotal", name: "grand_total", label: "Total Geral", table: "proposals", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "pr_totalHours", name: "total_hours", label: "Total de Horas", table: "proposals", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "pr_count", name: "_count", label: "Contagem de Propostas", table: "proposals", type: "measure", dataType: "number", aggregation: "COUNT" },
    ],
  },
  {
    id: "proposal_services", name: "Serviços de Proposta", icon: <Package size={14} weight="duotone" />, color: "#4E6987", bg: "#E0E8F0",
    fields: [
      // ID
      { id: "ps_id", name: "id", label: "ID do Serviço de Proposta", table: "proposal_services", type: "dimension", dataType: "string" },
      // Dimensões
      { id: "ps_proposalId", name: "proposal_id", label: "ID da Proposta", table: "proposal_services", type: "dimension", dataType: "string" },
      { id: "ps_serviceId", name: "service_id", label: "ID do Serviço", table: "proposal_services", type: "dimension", dataType: "string" },
      { id: "ps_complexity", name: "complexity", label: "Complexidade", table: "proposal_services", type: "dimension", dataType: "string" },
      { id: "ps_recurrence", name: "recurrence", label: "Recorrência", table: "proposal_services", type: "dimension", dataType: "string" },
      { id: "ps_seniority", name: "seniority", label: "Senioridade", table: "proposal_services", type: "dimension", dataType: "string" },
      { id: "ps_allocation", name: "allocation", label: "Alocação", table: "proposal_services", type: "dimension", dataType: "string" },
      { id: "ps_includeImpl", name: "include_impl", label: "Incluir Implantação", table: "proposal_services", type: "dimension", dataType: "boolean" },
      // Medidas
      { id: "ps_quantity", name: "quantity", label: "Quantidade", table: "proposal_services", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "ps_compMonthly", name: "computed_monthly", label: "Valor Mensal Calculado", table: "proposal_services", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "ps_compImpl", name: "computed_impl", label: "Valor Implantação Calculado", table: "proposal_services", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "ps_compHours", name: "computed_hours", label: "Horas Calculadas", table: "proposal_services", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "ps_count", name: "_count", label: "Contagem de Serviços", table: "proposal_services", type: "measure", dataType: "number", aggregation: "COUNT" },
    ],
  },
  {
    id: "call_records", name: "Registros de Ligações", icon: <Phone size={14} weight="duotone" />, color: "#23E6B2", bg: "#D9F4FB",
    fields: [
      // ID
      { id: "cr_id", name: "id", label: "ID do Registro de Ligação", table: "call_records", type: "dimension", dataType: "string" },
      // Dimensões
      { id: "cr_phone", name: "phone", label: "Telefone", table: "call_records", type: "dimension", dataType: "string" },
      { id: "cr_avatarUrl", name: "avatar_url", label: "URL do Avatar", table: "call_records", type: "dimension", dataType: "string" },
      { id: "cr_entityType", name: "entity_type", label: "Tipo de Entidade", table: "call_records", type: "dimension", dataType: "string" },
      { id: "cr_entityId", name: "entity_id", label: "ID da Entidade", table: "call_records", type: "dimension", dataType: "string" },
      { id: "cr_activityId", name: "activity_id", label: "ID da Atividade", table: "call_records", type: "dimension", dataType: "string" },
      { id: "cr_direction", name: "direction", label: "Direção", table: "call_records", type: "dimension", dataType: "string" },
      { id: "cr_title", name: "title", label: "Título", table: "call_records", type: "dimension", dataType: "string" },
      { id: "cr_duration", name: "duration", label: "Duração", table: "call_records", type: "dimension", dataType: "string" },
      { id: "cr_notes", name: "notes", label: "Notas", table: "call_records", type: "dimension", dataType: "string" },
      // Datas
      { id: "cr_date", name: "date", label: "Data", table: "call_records", type: "date", dataType: "date" },
      { id: "cr_createdAt", name: "created_at", label: "Data de Criação", table: "call_records", type: "date", dataType: "date" },
      { id: "cr_updatedAt", name: "updated_at", label: "Data de Atualização", table: "call_records", type: "date", dataType: "date" },
      // Medidas
      { id: "cr_count", name: "_count", label: "Contagem de Ligações", table: "call_records", type: "measure", dataType: "number", aggregation: "COUNT" },
    ],
  },
  {
    id: "field_history", name: "Histórico de Campos", icon: <Textbox size={14} weight="duotone" />, color: "#8C8CD4", bg: "#D9F8EF",
    fields: [
      // ID
      { id: "fh_id", name: "id", label: "ID do Histórico", table: "field_history", type: "dimension", dataType: "string" },
      // Dimensões
      { id: "fh_entityType", name: "entity_type", label: "Tipo de Entidade", table: "field_history", type: "dimension", dataType: "string" },
      { id: "fh_entityId", name: "entity_id", label: "ID da Entidade", table: "field_history", type: "dimension", dataType: "string" },
      { id: "fh_fieldName", name: "field_name", label: "Nome do Campo", table: "field_history", type: "dimension", dataType: "string" },
      { id: "fh_oldValue", name: "old_value", label: "Valor Antigo", table: "field_history", type: "dimension", dataType: "string" },
      { id: "fh_newValue", name: "new_value", label: "Valor Novo", table: "field_history", type: "dimension", dataType: "string" },
      { id: "fh_changedBy", name: "changed_by", label: "Alterado Por", table: "field_history", type: "dimension", dataType: "string" },
      { id: "fh_changeSource", name: "change_source", label: "Fonte da Alteração", table: "field_history", type: "dimension", dataType: "string" },
      // Datas
      { id: "fh_changedAt", name: "changed_at", label: "Data da Alteração", table: "field_history", type: "date", dataType: "date" },
      // Medidas
      { id: "fh_count", name: "_count", label: "Contagem de Alterações", table: "field_history", type: "measure", dataType: "number", aggregation: "COUNT" },
    ],
  },
];

/* ── Sync Connector Tables (Zenite Sync — Fontes Externas) ── */
export const SYNC_TABLES: CrmTable[] = [
  {
    id: "sync_google_ads", name: "Google Ads", icon: <GoogleLogo size={14} weight="duotone" />, color: "#4285F4", bg: "#E8F0FE",
    fields: [
      { id: "ga_campaign", name: "campaign_name", label: "Campanha", table: "sync_google_ads", type: "dimension", dataType: "string" },
      { id: "ga_adGroup", name: "ad_group_name", label: "Grupo de Anúncios", table: "sync_google_ads", type: "dimension", dataType: "string" },
      { id: "ga_ad", name: "ad_name", label: "Anúncio", table: "sync_google_ads", type: "dimension", dataType: "string" },
      { id: "ga_keyword", name: "keyword", label: "Palavra-chave", table: "sync_google_ads", type: "dimension", dataType: "string" },
      { id: "ga_matchType", name: "match_type", label: "Tipo de Correspondência", table: "sync_google_ads", type: "dimension", dataType: "string" },
      { id: "ga_device", name: "device", label: "Dispositivo", table: "sync_google_ads", type: "dimension", dataType: "string" },
      { id: "ga_network", name: "network", label: "Rede", table: "sync_google_ads", type: "dimension", dataType: "string" },
      { id: "ga_campaignType", name: "campaign_type", label: "Tipo de Campanha", table: "sync_google_ads", type: "dimension", dataType: "string" },
      { id: "ga_campaignStatus", name: "campaign_status", label: "Status da Campanha", table: "sync_google_ads", type: "dimension", dataType: "string" },
      { id: "ga_location", name: "location", label: "Localização", table: "sync_google_ads", type: "dimension", dataType: "string" },
      { id: "ga_platform", name: "platform", label: "Plataforma", table: "sync_google_ads", type: "dimension", dataType: "string" },
      { id: "ga_accountName", name: "account_name", label: "Conta", table: "sync_google_ads", type: "dimension", dataType: "string" },
      { id: "ga_accountId", name: "account_id", label: "ID da Conta", table: "sync_google_ads", type: "dimension", dataType: "string" },
      { id: "ga_campaignId", name: "campaign_id", label: "ID da Campanha", table: "sync_google_ads", type: "dimension", dataType: "string" },
      { id: "ga_date", name: "date", label: "Data", table: "sync_google_ads", type: "date", dataType: "date" },
      { id: "ga_week", name: "week", label: "Semana", table: "sync_google_ads", type: "date", dataType: "date" },
      { id: "ga_month", name: "month", label: "Mês", table: "sync_google_ads", type: "date", dataType: "date" },
      { id: "ga_impressions", name: "impressions", label: "Impressões", table: "sync_google_ads", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "ga_clicks", name: "clicks", label: "Cliques", table: "sync_google_ads", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "ga_ctr", name: "ctr", label: "CTR", table: "sync_google_ads", type: "measure", dataType: "number", aggregation: "AVG" },
      { id: "ga_cpc", name: "cpc", label: "CPC", table: "sync_google_ads", type: "measure", dataType: "number", aggregation: "AVG" },
      { id: "ga_cpm", name: "cpm", label: "CPM", table: "sync_google_ads", type: "measure", dataType: "number", aggregation: "AVG" },
      { id: "ga_spend", name: "spend", label: "Investimento", table: "sync_google_ads", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "ga_conversions", name: "conversions", label: "Conversões", table: "sync_google_ads", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "ga_costPerConv", name: "cost_per_conversion", label: "Custo por Conversão", table: "sync_google_ads", type: "measure", dataType: "number", aggregation: "AVG" },
      { id: "ga_convRate", name: "conversion_rate", label: "Taxa de Conversão", table: "sync_google_ads", type: "measure", dataType: "number", aggregation: "AVG" },
      { id: "ga_allConversions", name: "all_conversions", label: "Todas as Conversões", table: "sync_google_ads", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "ga_searchImprShare", name: "search_impression_share", label: "Parcela de Impressões", table: "sync_google_ads", type: "measure", dataType: "number", aggregation: "AVG" },
      { id: "ga_qualityScore", name: "quality_score", label: "Índice de Qualidade", table: "sync_google_ads", type: "measure", dataType: "number", aggregation: "AVG" },
      { id: "ga_count", name: "_count", label: "Contagem de Registros", table: "sync_google_ads", type: "measure", dataType: "number", aggregation: "COUNT" },
    ],
  },
  {
    id: "sync_meta_ads", name: "Meta Ads", icon: <MetaLogo size={14} weight="duotone" />, color: "#0081FB", bg: "#E5F0FF",
    fields: [
      // Dimensões
      { id: "ma_campaign", name: "campaign_name", label: "Campanha", table: "sync_meta_ads", type: "dimension", dataType: "string" },
      { id: "ma_adSet", name: "ad_set_name", label: "Conjunto de Anúncios", table: "sync_meta_ads", type: "dimension", dataType: "string" },
      { id: "ma_ad", name: "ad_name", label: "Anúncio", table: "sync_meta_ads", type: "dimension", dataType: "string" },
      { id: "ma_placement", name: "placement", label: "Posicionamento", table: "sync_meta_ads", type: "dimension", dataType: "string" },
      { id: "ma_objective", name: "objective", label: "Objetivo", table: "sync_meta_ads", type: "dimension", dataType: "string" },
      { id: "ma_platformDetail", name: "publisher_platform", label: "Plataforma (FB/IG)", table: "sync_meta_ads", type: "dimension", dataType: "string" },
      { id: "ma_device", name: "device_platform", label: "Dispositivo", table: "sync_meta_ads", type: "dimension", dataType: "string" },
      { id: "ma_campaignStatus", name: "campaign_status", label: "Status da Campanha", table: "sync_meta_ads", type: "dimension", dataType: "string" },
      { id: "ma_accountName", name: "account_name", label: "Conta de Anúncios", table: "sync_meta_ads", type: "dimension", dataType: "string" },
      { id: "ma_accountId", name: "account_id", label: "ID da Conta", table: "sync_meta_ads", type: "dimension", dataType: "string" },
      { id: "ma_campaignId", name: "campaign_id", label: "ID da Campanha", table: "sync_meta_ads", type: "dimension", dataType: "string" },
      { id: "ma_ageRange", name: "age", label: "Faixa Etária", table: "sync_meta_ads", type: "dimension", dataType: "string" },
      { id: "ma_gender", name: "gender", label: "Gênero", table: "sync_meta_ads", type: "dimension", dataType: "string" },
      { id: "ma_country", name: "country", label: "País", table: "sync_meta_ads", type: "dimension", dataType: "string" },
      { id: "ma_region", name: "region", label: "Região", table: "sync_meta_ads", type: "dimension", dataType: "string" },
      { id: "ma_platform", name: "platform", label: "Plataforma", table: "sync_meta_ads", type: "dimension", dataType: "string" },
      { id: "ma_qualityRanking", name: "quality_ranking", label: "Ranking de Qualidade", table: "sync_meta_ads", type: "dimension", dataType: "string" },
      { id: "ma_engagementRateRanking", name: "engagement_rate_ranking", label: "Ranking de Engajamento", table: "sync_meta_ads", type: "dimension", dataType: "string" },
      { id: "ma_conversionRateRanking", name: "conversion_rate_ranking", label: "Ranking de Conversão", table: "sync_meta_ads", type: "dimension", dataType: "string" },
      // Datas
      { id: "ma_date", name: "date", label: "Data", table: "sync_meta_ads", type: "date", dataType: "date" },
      { id: "ma_week", name: "week", label: "Semana", table: "sync_meta_ads", type: "date", dataType: "date" },
      { id: "ma_month", name: "month", label: "Mês", table: "sync_meta_ads", type: "date", dataType: "date" },
      // Métricas Core
      { id: "ma_impressions", name: "impressions", label: "Impressões", table: "sync_meta_ads", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "ma_clicks", name: "clicks", label: "Cliques", table: "sync_meta_ads", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "ma_ctr", name: "ctr", label: "CTR", table: "sync_meta_ads", type: "measure", dataType: "number", aggregation: "AVG" },
      { id: "ma_cpc", name: "cpc", label: "CPC", table: "sync_meta_ads", type: "measure", dataType: "number", aggregation: "AVG" },
      { id: "ma_cpm", name: "cpm", label: "CPM", table: "sync_meta_ads", type: "measure", dataType: "number", aggregation: "AVG" },
      { id: "ma_spend", name: "spend", label: "Investimento", table: "sync_meta_ads", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "ma_conversions", name: "conversions", label: "Conversões", table: "sync_meta_ads", type: "measure", dataType: "number", aggregation: "SUM" },
      // Métricas Delivery
      { id: "ma_reach", name: "reach", label: "Alcance", table: "sync_meta_ads", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "ma_frequency", name: "frequency", label: "Frequência", table: "sync_meta_ads", type: "measure", dataType: "number", aggregation: "AVG" },
      { id: "ma_uniqueClicks", name: "unique_clicks", label: "Cliques Únicos", table: "sync_meta_ads", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "ma_uniqueCtr", name: "unique_ctr", label: "CTR Único", table: "sync_meta_ads", type: "measure", dataType: "number", aggregation: "AVG" },
      { id: "ma_costPerUniqueClick", name: "cost_per_unique_click", label: "Custo por Clique Único", table: "sync_meta_ads", type: "measure", dataType: "number", aggregation: "AVG" },
      { id: "ma_inlineLinkClicks", name: "inline_link_clicks", label: "Cliques Inline", table: "sync_meta_ads", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "ma_inlineLinkClickCtr", name: "inline_link_click_ctr", label: "CTR Inline", table: "sync_meta_ads", type: "measure", dataType: "number", aggregation: "AVG" },
      { id: "ma_socialSpend", name: "social_spend", label: "Gasto Social", table: "sync_meta_ads", type: "measure", dataType: "number", aggregation: "SUM" },
      // Métricas Actions
      { id: "ma_results", name: "results", label: "Resultados", table: "sync_meta_ads", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "ma_costPerResult", name: "cost_per_result", label: "Custo por Resultado", table: "sync_meta_ads", type: "measure", dataType: "number", aggregation: "AVG" },
      { id: "ma_leads", name: "leads", label: "Leads", table: "sync_meta_ads", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "ma_costPerLead", name: "cost_per_lead", label: "CPL (Custo por Lead)", table: "sync_meta_ads", type: "measure", dataType: "number", aggregation: "AVG" },
      { id: "ma_purchases", name: "purchases", label: "Compras", table: "sync_meta_ads", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "ma_costPerPurchase", name: "cost_per_purchase", label: "Custo por Compra", table: "sync_meta_ads", type: "measure", dataType: "number", aggregation: "AVG" },
      { id: "ma_addToCart", name: "add_to_cart", label: "Add to Cart", table: "sync_meta_ads", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "ma_costPerAddToCart", name: "cost_per_add_to_cart", label: "Custo por Add to Cart", table: "sync_meta_ads", type: "measure", dataType: "number", aggregation: "AVG" },
      { id: "ma_landingPageViews", name: "landing_page_views", label: "Views Landing Page", table: "sync_meta_ads", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "ma_costPerLPView", name: "cost_per_landing_page_view", label: "Custo por View LP", table: "sync_meta_ads", type: "measure", dataType: "number", aggregation: "AVG" },
      { id: "ma_linkClicks", name: "link_clicks", label: "Cliques no Link", table: "sync_meta_ads", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "ma_costPerLinkClick", name: "cost_per_link_click", label: "Custo por Clique Link", table: "sync_meta_ads", type: "measure", dataType: "number", aggregation: "AVG" },
      { id: "ma_videoViews", name: "video_views", label: "Visualizações de Vídeo", table: "sync_meta_ads", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "ma_postEngagement", name: "post_engagement", label: "Engajamento de Post", table: "sync_meta_ads", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "ma_pageEngagement", name: "page_engagement", label: "Engajamento de Página", table: "sync_meta_ads", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "ma_initiateCheckout", name: "initiate_checkout", label: "Início de Checkout", table: "sync_meta_ads", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "ma_completeRegistration", name: "complete_registration", label: "Registro Completo", table: "sync_meta_ads", type: "measure", dataType: "number", aggregation: "SUM" },
      // ⭐ Lead Breakdown
      { id: "ma_leadsOffline", name: "leads_offline", label: "Leads Offline", table: "sync_meta_ads", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "ma_costPerLeadOffline", name: "cost_per_lead_offline", label: "CPL Offline", table: "sync_meta_ads", type: "measure", dataType: "number", aggregation: "AVG" },
      { id: "ma_leadsWebsite", name: "leads_website", label: "Leads Website", table: "sync_meta_ads", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "ma_costPerLeadWebsite", name: "cost_per_lead_website", label: "CPL Website", table: "sync_meta_ads", type: "measure", dataType: "number", aggregation: "AVG" },
      { id: "ma_leadsOnMeta", name: "leads_on_meta", label: "Leads On-Platform", table: "sync_meta_ads", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "ma_costPerLeadOnMeta", name: "cost_per_lead_on_meta", label: "CPL On-Platform", table: "sync_meta_ads", type: "measure", dataType: "number", aggregation: "AVG" },
      // ROAS & Count
      { id: "ma_roas", name: "roas", label: "ROAS", table: "sync_meta_ads", type: "measure", dataType: "number", aggregation: "AVG" },
      { id: "ma_count", name: "_count", label: "Contagem de Registros", table: "sync_meta_ads", type: "measure", dataType: "number", aggregation: "COUNT" },
    ],
  },
  {
    id: "sync_linkedin_ads", name: "LinkedIn Ads", icon: <LinkedinLogo size={14} weight="duotone" />, color: "#0A66C2", bg: "#E1EEFF",
    fields: [
      // Dimensões
      { id: "la_campaign", name: "campaign_name", label: "Campanha", table: "sync_linkedin_ads", type: "dimension", dataType: "string" },
      { id: "la_campaignGroup", name: "campaign_group_name", label: "Grupo de Campanhas", table: "sync_linkedin_ads", type: "dimension", dataType: "string" },
      { id: "la_adFormat", name: "ad_format", label: "Formato do Anúncio", table: "sync_linkedin_ads", type: "dimension", dataType: "string" },
      { id: "la_objectiveType", name: "objective_type", label: "Tipo de Objetivo", table: "sync_linkedin_ads", type: "dimension", dataType: "string" },
      { id: "la_campaignStatus", name: "campaign_status", label: "Status da Campanha", table: "sync_linkedin_ads", type: "dimension", dataType: "string" },
      { id: "la_creative", name: "creative_name", label: "Criativo", table: "sync_linkedin_ads", type: "dimension", dataType: "string" },
      { id: "la_accountName", name: "account_name", label: "Conta de Anúncios", table: "sync_linkedin_ads", type: "dimension", dataType: "string" },
      { id: "la_accountId", name: "account_id", label: "ID da Conta", table: "sync_linkedin_ads", type: "dimension", dataType: "string" },
      { id: "la_campaignId", name: "campaign_id", label: "ID da Campanha", table: "sync_linkedin_ads", type: "dimension", dataType: "string" },
      { id: "la_industry", name: "industry", label: "Setor (Audiência)", table: "sync_linkedin_ads", type: "dimension", dataType: "string" },
      { id: "la_jobFunction", name: "job_function", label: "Função (Audiência)", table: "sync_linkedin_ads", type: "dimension", dataType: "string" },
      { id: "la_seniority", name: "seniority", label: "Senioridade (Audiência)", table: "sync_linkedin_ads", type: "dimension", dataType: "string" },
      { id: "la_companySize", name: "company_size", label: "Porte da Empresa", table: "sync_linkedin_ads", type: "dimension", dataType: "string" },
      { id: "la_platform", name: "platform", label: "Plataforma", table: "sync_linkedin_ads", type: "dimension", dataType: "string" },
      // Datas
      { id: "la_date", name: "date", label: "Data", table: "sync_linkedin_ads", type: "date", dataType: "date" },
      { id: "la_week", name: "week", label: "Semana", table: "sync_linkedin_ads", type: "date", dataType: "date" },
      { id: "la_month", name: "month", label: "Mês", table: "sync_linkedin_ads", type: "date", dataType: "date" },
      // Métricas Core
      { id: "la_impressions", name: "impressions", label: "Impressões", table: "sync_linkedin_ads", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "la_clicks", name: "clicks", label: "Cliques", table: "sync_linkedin_ads", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "la_ctr", name: "ctr", label: "CTR", table: "sync_linkedin_ads", type: "measure", dataType: "number", aggregation: "AVG" },
      { id: "la_cpc", name: "cpc", label: "CPC", table: "sync_linkedin_ads", type: "measure", dataType: "number", aggregation: "AVG" },
      { id: "la_cpm", name: "cpm", label: "CPM", table: "sync_linkedin_ads", type: "measure", dataType: "number", aggregation: "AVG" },
      { id: "la_spend", name: "spend", label: "Investimento", table: "sync_linkedin_ads", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "la_conversions", name: "conversions", label: "Conversões", table: "sync_linkedin_ads", type: "measure", dataType: "number", aggregation: "SUM" },
      // Métricas Leads
      { id: "la_leads", name: "leads", label: "Leads", table: "sync_linkedin_ads", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "la_costPerLead", name: "cost_per_lead", label: "CPL (Custo por Lead)", table: "sync_linkedin_ads", type: "measure", dataType: "number", aggregation: "AVG" },
      { id: "la_leadFormOpens", name: "lead_form_opens", label: "Aberturas de Formulário", table: "sync_linkedin_ads", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "la_leadFormCompletions", name: "lead_form_completions", label: "Formulários Preenchidos", table: "sync_linkedin_ads", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "la_oneClickLeads", name: "one_click_leads", label: "Leads One-Click", table: "sync_linkedin_ads", type: "measure", dataType: "number", aggregation: "SUM" },
      // Métricas Engajamento
      { id: "la_engagements", name: "engagements", label: "Engajamentos", table: "sync_linkedin_ads", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "la_totalEngagements", name: "total_engagements", label: "Engajamentos Totais", table: "sync_linkedin_ads", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "la_socialActions", name: "social_actions", label: "Ações Sociais", table: "sync_linkedin_ads", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "la_likes", name: "likes", label: "Curtidas", table: "sync_linkedin_ads", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "la_comments", name: "comments", label: "Comentários", table: "sync_linkedin_ads", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "la_shares", name: "shares", label: "Compartilhamentos", table: "sync_linkedin_ads", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "la_reactions", name: "reactions", label: "Reações", table: "sync_linkedin_ads", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "la_follows", name: "follows", label: "Novos Seguidores", table: "sync_linkedin_ads", type: "measure", dataType: "number", aggregation: "SUM" },
      // Métricas Vídeo & Navigation
      { id: "la_videoCompletions", name: "video_completions", label: "Vídeos Completos", table: "sync_linkedin_ads", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "la_landingPageClicks", name: "landing_page_clicks", label: "Cliques na LP", table: "sync_linkedin_ads", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "la_opens", name: "opens", label: "Aberturas", table: "sync_linkedin_ads", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "la_sends", name: "sends", label: "Envios", table: "sync_linkedin_ads", type: "measure", dataType: "number", aggregation: "SUM" },
      { id: "la_convRate", name: "conversion_rate", label: "Taxa de Conversão", table: "sync_linkedin_ads", type: "measure", dataType: "number", aggregation: "AVG" },
      { id: "la_count", name: "_count", label: "Contagem de Registros", table: "sync_linkedin_ads", type: "measure", dataType: "number", aggregation: "COUNT" },
    ],
  },
];

/* All tables (CRM + Sync) — static fallback */
export const ALL_TABLES = [...CRM_TABLES, ...SYNC_TABLES];

/* ── Sync Platform Definitions ── */
const SYNC_PLATFORM_META: Record<string, { id: string; name: string; prefix: string; color: string; bg: string; iconEl: ReactNode }> = {
  google_ads: { id: "sync_google_ads", name: "Google Ads", prefix: "ga", color: "#4285F4", bg: "#E8F0FE", iconEl: <GoogleLogo size={14} weight="duotone" /> },
  meta_ads:   { id: "sync_meta_ads",   name: "Meta Ads",   prefix: "ma", color: "#0081FB", bg: "#E5F0FF", iconEl: <MetaLogo size={14} weight="duotone" /> },
  linkedin_ads: { id: "sync_linkedin_ads", name: "LinkedIn Ads", prefix: "la", color: "#0A66C2", bg: "#E1EEFF", iconEl: <LinkedinLogo size={14} weight="duotone" /> },
};

/* Build CrmTable[] dynamically from API schema (Single Source of Truth) */
function buildSyncTablesFromSchema(schema: any): CrmTable[] {
  if (!schema?.fields?.length) return [];
  const platforms = Object.keys(SYNC_PLATFORM_META);
  const tables: CrmTable[] = [];

  // Helper: check if a field's platform_scope includes a given platform
  // Handles: string "all", string "meta_ads", array ["meta_ads","google_ads"],
  // comma-separated "meta_ads,google_ads", null/undefined → "all"
  // Also handles partial/alias naming: "google" matches "google_ads", "meta" matches "meta_ads", etc.
  const platformAliases: Record<string, string[]> = {
    google_ads: ["google_ads", "google", "gads", "adwords"],
    meta_ads: ["meta_ads", "meta", "facebook", "facebook_ads", "fb_ads", "instagram_ads"],
    linkedin_ads: ["linkedin_ads", "linkedin", "li_ads"],
  };
  const scopeMatchesPlatform = (scope: any, platformKey: string): boolean => {
    if (scope == null || scope === "" || scope === "all") return true;
    const aliases = platformAliases[platformKey] || [platformKey];
    const matchesAny = (val: string) => {
      const v = val.trim().toLowerCase();
      return v === "all" || aliases.includes(v);
    };
    if (Array.isArray(scope)) return scope.some((s: string) => matchesAny(String(s)));
    if (typeof scope === "string") {
      if (scope.includes(",")) {
        return scope.split(",").some((s: string) => matchesAny(s));
      }
      return matchesAny(scope);
    }
    return true; // unknown format → include
  };

  for (const platformKey of platforms) {
    const meta = SYNC_PLATFORM_META[platformKey];
    const tableId = meta.id;
    const prefix = meta.prefix;
    const platformFields = (schema.fields as any[]).filter((f: any) =>
      scopeMatchesPlatform(f.platform_scope, platformKey)
    );
    const fields: CrmField[] = platformFields.map((f: any) => {
      const schemaType = (f.type || "").toLowerCase();
      const fmt = (f.format || "").toLowerCase();
      const rawAgg = (f.aggregation || "").toUpperCase();
      const hasAggregation = ["SUM", "AVG", "COUNT", "MIN", "MAX", "COUNTD"].includes(rawAgg);

      // ── Determine fieldType (dimension | measure | date) ──
      // Priority: explicit "measure"/"date" from API > format signals > aggregation signal > default
      let fieldType: FieldType = "dimension";
      if (schemaType === "measure" || schemaType === "metric" || schemaType === "number") {
        fieldType = "measure";
      } else if (schemaType === "date") {
        fieldType = "date";
      } else if (fmt === "date") {
        fieldType = "date";
      } else if (["currency", "percent", "ratio", "number", "integer"].includes(fmt)) {
        // Fields with numeric formats are measures (e.g. spend, cpc, cpm, ctr, roas)
        fieldType = "measure";
      } else if (hasAggregation) {
        // Fields with explicit aggregation (SUM, AVG, etc.) are measures
        fieldType = "measure";
      }

      // ── Determine dataType ──
      let dataType: "string" | "number" | "date" | "boolean" = "string";
      if (fieldType === "measure") {
        dataType = "number";
      } else if (fieldType === "date") {
        dataType = "date";
      }

      // ── Aggregation: use explicit or derive default ──
      let aggregation: CrmField["aggregation"] = undefined;
      if (hasAggregation) {
        aggregation = rawAgg as CrmField["aggregation"];
      } else if (fieldType === "measure") {
        // Smart default: ratio/percent fields → AVG, others → SUM
        aggregation = ["percent", "ratio"].includes(fmt) ? "AVG" : "SUM";
      }

      const format = ["text", "currency", "percent", "ratio", "ranking", "json", "number", "date", "integer"].includes(fmt)
        ? fmt as CrmField["format"] : undefined;
      return {
        id: `${prefix}_${f.name}`,
        name: f.name,
        label: f.label || f.name,
        table: tableId,
        type: fieldType,
        dataType,
        ...(aggregation ? { aggregation } : {}),
        ...(format ? { format } : {}),
      };
    });
    if (!fields.some(f => f.name === "_count")) {
      fields.push({ id: `${prefix}__count`, name: "_count", label: "Contagem de Registros", table: tableId, type: "measure", dataType: "number", aggregation: "COUNT" });
    }
    // ── Merge with static fallback SYNC_TABLES to fill gaps ──
    // Any field in the fallback that isn't already covered by the schema gets added
    const fallbackTable = SYNC_TABLES.find(st => st.id === tableId);
    if (fallbackTable) {
      const existingNames = new Set(fields.map(f => f.name));
      const existingIds = new Set(fields.map(f => f.id));
      let mergedCount = 0;
      for (const fallbackField of fallbackTable.fields) {
        if (!existingNames.has(fallbackField.name) && !existingIds.has(fallbackField.id)) {
          fields.push(fallbackField);
          mergedCount++;
        }
      }
      if (mergedCount > 0) {
        console.log(`[Sync/Schema] ${meta.name}: merged ${mergedCount} extra fields from static fallback`);
      }
    }
    tables.push({ id: tableId, name: meta.name, icon: meta.iconEl, color: meta.color, bg: meta.bg, fields });
  }
  // Debug: log per-platform field breakdown
  for (const t of tables) {
    const dims = t.fields.filter(f => f.type === "dimension");
    const meas = t.fields.filter(f => f.type === "measure");
    const dates = t.fields.filter(f => f.type === "date");
    console.log(`[Sync/Schema] ${t.name}: ${dims.length} dims, ${meas.length} measures, ${dates.length} dates = ${t.fields.length} total`);
    // Log fields promoted to measure via format/aggregation heuristic (API didn't flag them as "measure")
    const promoted = meas.filter(mf => {
      const orig = (schema.fields as any[]).find((sf: any) => sf.name === mf.name);
      return orig && !["measure"].includes((orig.type || "").toLowerCase());
    });
    if (promoted.length > 0) {
      console.log(`  ↳ Promoted to measure (via format/agg heuristic): ${promoted.map(f => f.name).join(", ")}`);
    }
  }
  return tables;
}

/* ── Chart Type ── */
type ChartType = "bar" | "bar-h" | "line" | "area" | "pie" | "donut" | "scatter" | "treemap" | "radar" | "sankey" | "table" | "auto";
type PolarSubType = "spider" | "rose" | "polar-grid";
type ScatterSubType = "classic" | "matrix";
const POLAR_SUBTYPES: { type: PolarSubType; label: string; description: string }[] = [
  { type: "spider", label: "Spider", description: "Radar clássico com área preenchida" },
  { type: "rose", label: "Rose", description: "Nightingale / Coxcomb com setores variáveis" },
  { type: "polar-grid", label: "Polar Grid", description: "Pizza sobre grade polar concêntrica" },
];
const SCATTER_SUBTYPES: { type: ScatterSubType; label: string; description: string }[] = [
  { type: "classic", label: "Bolhas", description: "Scatter / Bubble clássico com círculos" },
  { type: "matrix", label: "Matriz", description: "Matriz de co-ocorrência com losangos (Rhombus Matrix)" },
];

interface ShelfItem {
  field: CrmField;
  sort?: "asc" | "desc";
}

interface MarkEncoding {
  color?: CrmField;
  size?: CrmField;
  label?: CrmField;
  detail?: CrmField;
  tooltip?: CrmField;
  shape?: CrmField;
  additionalFields?: CrmField[]; // Lista de campos extras arrastados para Marks
}

/* ── Show Me Chart Types ── */
const SHOW_ME_OPTIONS: { type: ChartType; label: string; icon: ReactNode; description: string }[] = [
  { type: "auto", label: "Automático", icon: <Atom size={16} weight="fill" />, description: "Escolha automática" },
  { type: "bar", label: "Barras", icon: <ChartBar size={16} weight="fill" />, description: "Comparar categorias" },
  { type: "bar-h", label: "Barras Horiz.", icon: <ChartBarHorizontal size={16} weight="fill" />, description: "Ranking horizontal" },
  { type: "line", label: "Linhas", icon: <ChartLineUp size={16} weight="fill" />, description: "Tendências temporais" },
  { type: "area", label: "Área", icon: <ChartLineUp size={16} weight="duotone" />, description: "Volume ao longo do tempo" },
  { type: "pie", label: "Pizza", icon: <ChartPieSlice size={16} weight="fill" />, description: "Proporções" },
  { type: "donut", label: "Donut", icon: <ChartDonut size={16} weight="fill" />, description: "Proporções com destaque" },
  { type: "scatter", label: "Dispersão", icon: <ChartScatter size={16} weight="fill" />, description: "Correlação entre medidas" },
  { type: "treemap", label: "Treemap", icon: <SquaresFour size={16} weight="fill" />, description: "Hierarquia de proporções" },
  { type: "radar", label: "Polar", icon: <ChartPolar size={16} weight="fill" />, description: "Gráficos polares / radar" },
  { type: "sankey", label: "Sankey", icon: <FunnelSimple size={16} weight="fill" />, description: "Fluxo entre categorias (funil de vendas)" },
  { type: "table", label: "Tabela", icon: <Table size={16} weight="fill" />, description: "Dados tabulares" },
];

/* ── Draggable Field Pill ── */
function FieldPill({ field, onRemove, compact, onClick, hasConfig, customLabel }: { 
  field: CrmField; 
  onRemove?: () => void; 
  compact?: boolean; 
  onClick?: () => void;
  hasConfig?: boolean;
  customLabel?: string;
}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ITEM_TYPE,
    item: { field },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }), [field]);

  const isMeasure = field.type === "measure";
  const isDate = field.type === "date";
  const pillBg = isMeasure ? "bg-[#D9F8EF]" : isDate ? "bg-[#DCF0FF]" : "bg-[#DCF0FF]";
  const pillText = isMeasure ? "text-[#135543]" : isDate ? "text-[#025E7B]" : "text-[#025E7B]";

  // Mapeamento de ícones baseado no Design System (mesmo do DataPaneField)
  const getFieldIcon = () => {
    const name = field.name.toLowerCase();
    const label = field.label.toLowerCase();

    // Medidas → Hash
    if (isMeasure) return <Hash size={10} weight="bold" />;

    // Data & Tempo
    if (isDate || name.includes("data") || name.includes("date")) return <Calendar size={10} weight="bold" />;
    if (name.includes("hora") || name.includes("time")) return <Timer size={10} weight="bold" />;
    if (name.includes("duracao") || name.includes("duration")) return <Timer size={10} weight="bold" />;

    // Texto & Comunicação
    if (name.includes("telefone") || name.includes("phone") || name.includes("celular") || name.includes("mobile")) return <Phone size={10} weight="bold" />;
    if (name.includes("email") || name.includes("mail")) return <EnvelopeSimple size={10} weight="bold" />;
    if (name.includes("url") || name.includes("link") || name.includes("website") || name.includes("site")) return <LinkSimpleHorizontal size={10} weight="bold" />;
    if (name.includes("descricao") || name.includes("description") || name.includes("obs") || name.includes("notes") || label.includes("longo")) return <TextAlignLeft size={10} weight="bold" />;

    // Numérico & Monetário
    if (name.includes("numero") || name.includes("number") || name.includes("quantidade") || name.includes("qty")) return <Hash size={10} weight="bold" />;
    if (name.includes("percentual") || name.includes("percent") || name.includes("taxa")) return <Percent size={10} weight="bold" />;
    if (name.includes("valor") || name.includes("preco") || name.includes("price") || name.includes("moeda") || name.includes("currency")) return <CurrencyDollar size={10} weight="bold" />;

    // Seleção & Listas
    if (name.includes("lista") || name.includes("list") || name.includes("picklist")) return <ListBullets size={10} weight="bold" />;
    if (name.includes("tags") || name.includes("multi")) return <Tag size={10} weight="bold" />;
    if (name.includes("combo") || name.includes("dropdown")) return <CaretCircleUpDown size={10} weight="bold" />;

    // Referência & Estrutura
    if (name.includes("usuario") || name.includes("user") || name.includes("proprietario") || name.includes("owner")) return <UserCircle size={10} weight="bold" />;
    if (name.includes("booleano") || name.includes("boolean") || name.includes("ativo") || name.includes("active")) return <ToggleLeft size={10} weight="bold" />;
    if (name.includes("endereco") || name.includes("address") || name.includes("localizacao") || name.includes("location")) return <MapPin size={10} weight="bold" />;
    if (name.includes("associacao") || name.includes("relation") || name.includes("ref")) return <LinkSimpleHorizontal size={10} weight="bold" />;

    // Sistema & Automação
    if (name.includes("contextual") || name.includes("dynamic")) return <Shapes size={10} weight="bold" />;
    if (name.includes("calculado") || name.includes("formula") || name.includes("computed")) return <Hash size={10} weight="bold" />;
    if (name.includes("id") || name === "id") return <Fingerprint size={10} weight="bold" />;

    // Default: Texto simples
    return <TextT size={10} weight="bold" />;
  };

  return (
    <div
      ref={drag as any}
      onClick={(e) => {
        // Only trigger onClick if we have a click handler (filter config)
        if (onClick) {
          e.stopPropagation();
          onClick();
        }
      }}
      className={`inline-flex items-center gap-1 h-[24px] px-2 rounded-full ${onClick ? 'cursor-pointer hover:ring-2 hover:ring-[#0483AB]/30' : 'cursor-grab active:cursor-grabbing'} select-none transition-all ${pillBg} ${pillText} ${isDragging ? "opacity-40 scale-95" : "opacity-100 hover:brightness-95"} ${hasConfig ? 'ring-1 ring-[#0483AB]' : ''}`}
      style={{ fontSize: compact ? 10 : 11, fontWeight: 600, letterSpacing: -0.3, ...ff }}
    >
      {getFieldIcon()}
      <span className="truncate max-w-[120px]">
        {customLabel || (isMeasure && field.aggregation ? `${field.aggregation}(${field.label})` : field.label)}
      </span>
      {hasConfig && (
        <Funnel size={10} weight="fill" className="text-[#0483AB]" />
      )}
      {onRemove && (
        <button onClick={(e) => { e.stopPropagation(); onRemove(); }} className="ml-0.5 hover:text-[#ED5200] transition-colors">
          <X size={10} weight="bold" />
        </button>
      )}
    </div>
  );
}

/* ── Filter Modal ── */
function FilterModal({ field, config, onSave, onClose }: {
  field: CrmField;
  config?: FilterConfig;
  onSave: (config: FilterConfig) => void;
  onClose: () => void;
}) {
  const [operator, setOperator] = useState<FilterOperator>(config?.operator || "equals");
  const [value, setValue] = useState<string>(config?.value?.toString() || "");
  const [isRelativeDate, setIsRelativeDate] = useState<boolean>(config?.isRelativeDate || false);
  const [relativeDateValue, setRelativeDateValue] = useState<RelativeDateValue>(
    config?.relativeDateValue || { type: "preset", preset: "ESTE MÊS" }
  );
  const [relativeDateText, setRelativeDateText] = useState<string>("");
  const [showRelativeDateGuide, setShowRelativeDateGuide] = useState<boolean>(false);

  // Parse text to RelativeDateValue
  const parseRelativeDateText = (text: string): RelativeDateValue | null => {
    const upper = text.toUpperCase().trim();
    
    // Check presets
    const presets: RelativeDatePreset[] = [
      "ONTEM", "HOJE", "AMANHÃ",
      "SEMANA PASSADA", "ESTA SEMANA", "PRÓXIMA SEMANA",
      "MÊS PASSADO", "ESTE MÊS", "PRÓXIMO MÊS",
      "TRIMESTRE PASSADO", "ESTE TRIMESTRE", "PRÓXIMO TRIMESTRE",
      "ANO PASSADO", "ESTE ANO", "PRÓXIMO ANO"
    ];
    
    if (presets.includes(upper as RelativeDatePreset)) {
      return { type: "preset", preset: upper as RelativeDatePreset };
    }
    
    // Check parametric patterns
    const parametricPatterns: Array<{ pattern: RelativeDateParametric; regex: RegExp }> = [
      { pattern: "ÚLTIMOS n DIAS", regex: /^ÚLTIMOS?\s+(\d+)\s+DIAS?$/i },
      { pattern: "PRÓXIMOS n DIAS", regex: /^PRÓXIMOS?\s+(\d+)\s+DIAS?$/i },
      { pattern: "HÁ n DIAS", regex: /^HÁ\s+(\d+)\s+DIAS?$/i },
      { pattern: "ÚLTIMAS n SEMANAS", regex: /^ÚLTIMAS?\s+(\d+)\s+SEMANAS?$/i },
      { pattern: "PRÓXIMAS n SEMANAS", regex: /^PRÓXIMAS?\s+(\d+)\s+SEMANAS?$/i },
      { pattern: "HÁ n SEMANAS", regex: /^HÁ\s+(\d+)\s+SEMANAS?$/i },
      { pattern: "ÚLTIMOS n MESES", regex: /^ÚLTIMOS?\s+(\d+)\s+(MESES?|MÊS)$/i },
      { pattern: "PRÓXIMOS n MESES", regex: /^PRÓXIMOS?\s+(\d+)\s+(MESES?|MÊS)$/i },
      { pattern: "HÁ n MESES", regex: /^HÁ\s+(\d+)\s+(MESES?|MÊS)$/i },
      { pattern: "ÚLTIMOS n TRIMESTRES", regex: /^ÚLTIMOS?\s+(\d+)\s+TRIMESTRES?$/i },
      { pattern: "PRÓXIMOS n TRIMESTRES", regex: /^PRÓXIMOS?\s+(\d+)\s+TRIMESTRES?$/i },
      { pattern: "HÁ n TRIMESTRES", regex: /^HÁ\s+(\d+)\s+TRIMESTRES?$/i },
      { pattern: "ÚLTIMOS n ANOS", regex: /^ÚLTIMOS?\s+(\d+)\s+ANOS?$/i },
      { pattern: "PRÓXIMOS n ANOS", regex: /^PRÓXIMOS?\s+(\d+)\s+ANOS?$/i },
      { pattern: "HÁ n ANOS", regex: /^HÁ\s+(\d+)\s+ANOS?$/i },
    ];
    
    for (const { pattern, regex } of parametricPatterns) {
      const match = upper.match(regex);
      if (match) {
        return {
          type: "parametric",
          parametric: { pattern, value: parseInt(match[1]) }
        };
      }
    }
    
    return null;
  };

  const getOperatorOptions = (): { value: FilterOperator; label: string }[] => {
    if (field.dataType === "boolean") {
      return [
        { value: "isTrue", label: "É verdadeiro" },
        { value: "isFalse", label: "É falso" },
      ];
    }
    if (field.dataType === "number") {
      return [
        { value: "equals", label: "Igual a" },
        { value: "notEquals", label: "Diferente de" },
        { value: "greaterThan", label: "Maior que" },
        { value: "lessThan", label: "Menor que" },
        { value: "greaterOrEqual", label: "Maior ou igual a" },
        { value: "lessOrEqual", label: "Menor ou igual a" },
        { value: "isEmpty", label: "Está vazio" },
        { value: "isNotEmpty", label: "Não está vazio" },
      ];
    }
    if (field.dataType === "date") {
      return [
        { value: "equals", label: "É igual a" },
        { value: "notEquals", label: "É diferente de" },
        { value: "greaterThan", label: "É depois de" },
        { value: "lessThan", label: "É antes de" },
        { value: "isEmpty", label: "Está vazio" },
        { value: "isNotEmpty", label: "Não está vazio" },
      ];
    }
    // string
    return [
      { value: "equals", label: "É igual a" },
      { value: "notEquals", label: "É diferente de" },
      { value: "contains", label: "Contém" },
      { value: "notContains", label: "Não contém" },
      { value: "isEmpty", label: "Está vazio" },
      { value: "isNotEmpty", label: "Não está vazio" },
    ];
  };

  const needsValue = !["isEmpty", "isNotEmpty", "isTrue", "isFalse"].includes(operator);

  const handleSave = () => {
    const baseConfig = { operator, value: needsValue && !isRelativeDate ? value : undefined };
    if (field.dataType === "date" && isRelativeDate) {
      // Parse text to RelativeDateValue
      const parsed = parseRelativeDateText(relativeDateText);
      if (parsed) {
        onSave({ ...baseConfig, isRelativeDate: true, relativeDateValue: parsed });
      } else {
        // Invalid text, show error or use fallback
        alert("Formato de data relativa inválido. Veja as opções disponíveis.");
        return;
      }
    } else {
      onSave(baseConfig);
    }
    onClose();
  };

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
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-[16px] p-6 border border-[#DDE3EC] w-[400px]"
        style={{ boxShadow: "0px 16px 48px rgba(18,34,50,0.16)", ...ff }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#122232] font-semibold" style={{ fontSize: 16, letterSpacing: -0.4 }}>
            Configurar Filtro
          </h3>
          <button onClick={onClose} className="text-[#98989D] hover:text-[#122232] transition-colors">
            <X size={20} weight="bold" />
          </button>
        </div>

        <div className="mb-4">
          <div className="text-[#4E6987] mb-2" style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.2 }}>
            Campo
          </div>
          <div className="px-3 py-2 rounded-[8px] bg-[#F6F7F9] border border-[#EEF1F6]">
            <span className="text-[#122232]" style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3 }}>
              {field.label}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-[#4E6987] mb-2" style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.2 }}>
            Operador
          </div>
          <select
            value={operator}
            onChange={(e) => setOperator(e.target.value as FilterOperator)}
            className="w-full px-3 py-2 rounded-[8px] border border-[#DDE3EC] bg-white text-[#122232] cursor-pointer transition-colors hover:border-[#0483AB] focus:outline-none focus:border-[#0483AB] focus:ring-2 focus:ring-[#0483AB]/20"
            style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3, ...ff }}
          >
            {getOperatorOptions().map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {needsValue && (
          <div className="mb-6">
            {/* Date Relative Toggle */}
            {field.dataType === "date" && (
              <div className="mb-3 flex gap-2">
                <button
                  onClick={() => setIsRelativeDate(false)}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    !isRelativeDate
                      ? "bg-[#0483AB] text-white"
                      : "bg-[#F6F7F9] text-[#4E6987] hover:bg-[#EEF1F6]"
                  }`}
                  style={ff}
                >
                  Data Específica
                </button>
                <button
                  onClick={() => setIsRelativeDate(true)}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isRelativeDate
                      ? "bg-[#0483AB] text-white"
                      : "bg-[#F6F7F9] text-[#4E6987] hover:bg-[#EEF1F6]"
                  }`}
                  style={ff}
                >
                  Data Relativa
                </button>
              </div>
            )}

            <div className="text-[#4E6987] mb-2" style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.2 }}>
              Valor
            </div>

            {field.dataType === "date" && isRelativeDate ? (
              <div>
                <input
                  type="text"
                  value={relativeDateText}
                  onChange={(e) => setRelativeDateText(e.target.value)}
                  placeholder="Ex: HOJE, ÚLTIMOS 7 DIAS, ESTE MÊS"
                  className="w-full px-3 py-2 rounded-[8px] border border-[#DDE3EC] bg-white text-[#122232] placeholder:text-[#C8CFDB] transition-colors hover:border-[#0483AB] focus:outline-none focus:border-[#0483AB] focus:ring-2 focus:ring-[#0483AB]/20"
                  style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3, ...ff }}
                />
                <button
                  onClick={() => setShowRelativeDateGuide(true)}
                  className="mt-2 text-[#0483AB] hover:text-[#025E7B] transition-colors flex items-center gap-1"
                  style={{ fontSize: 12, fontWeight: 500, letterSpacing: -0.2, ...ff }}
                >
                  <Info size={14} weight="fill" />
                  Ver opções de data relativa
                </button>
              </div>
            ) : (
              <input
                type={field.dataType === "number" ? "number" : field.dataType === "date" ? "date" : "text"}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Digite o valor..."
                className="w-full px-3 py-2 rounded-[8px] border border-[#DDE3EC] bg-white text-[#122232] placeholder:text-[#C8CFDB] transition-colors hover:border-[#0483AB] focus:outline-none focus:border-[#0483AB] focus:ring-2 focus:ring-[#0483AB]/20"
                style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3, ...ff }}
              />
            )}
          </div>
        )}

        <div className="flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-[8px] text-[#4E6987] hover:bg-[#F6F7F9] transition-colors"
            style={{ fontSize: 13, fontWeight: 600, letterSpacing: -0.3, ...ff }}
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-[8px] bg-[#0483AB] text-white hover:bg-[#025E7B] transition-colors"
            style={{ fontSize: 13, fontWeight: 600, letterSpacing: -0.3, ...ff }}
          >
            Aplicar Filtro
          </button>
        </div>
      </motion.div>

      {/* Relative Date Guide Modal */}
      <AnimatePresence>
        {showRelativeDateGuide && <RelativeDateGuideModal onClose={() => setShowRelativeDateGuide(false)} />}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Relative Date Guide Modal ── */
function RelativeDateGuideModal({ onClose }: { onClose: () => void }) {
  const presets: RelativeDatePreset[] = [
    "ONTEM", "HOJE", "AMANHÃ",
    "SEMANA PASSADA", "ESTA SEMANA", "PRÓXIMA SEMANA",
    "MÊS PASSADO", "ESTE MÊS", "PRÓXIMO MÊS",
    "TRIMESTRE PASSADO", "ESTE TRIMESTRE", "PRÓXIMO TRIMESTRE",
    "ANO PASSADO", "ESTE ANO", "PRÓXIMO ANO"
  ];

  const parametricExamples = [
    "ÚLTIMOS 7 DIAS",
    "PRÓXIMOS 30 DIAS",
    "HÁ 15 DIAS",
    "ÚLTIMAS 4 SEMANAS",
    "PRÓXIMAS 2 SEMANAS",
    "HÁ 3 SEMANAS",
    "ÚLTIMOS 6 MESES",
    "PRÓXIMOS 12 MESES",
    "HÁ 2 MESES",
    "ÚLTIMOS 4 TRIMESTRES",
    "PRÓXIMOS 2 TRIMESTRES",
    "HÁ 1 TRIMESTRE",
    "ÚLTIMOS 3 ANOS",
    "PRÓXIMOS 5 ANOS",
    "HÁ 1 ANO",
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ backgroundColor: "rgba(18,34,50,0.4)" }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-[16px] p-6 border border-[#DDE3EC] w-[600px] max-h-[80vh] overflow-y-auto"
        style={{ boxShadow: "0px 16px 48px rgba(18,34,50,0.16)", ...ff }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#122232] font-semibold" style={{ fontSize: 16, letterSpacing: -0.4 }}>
            Opções de Data Relativa
          </h3>
          <button onClick={onClose} className="text-[#98989D] hover:text-[#122232] transition-colors">
            <X size={20} weight="bold" />
          </button>
        </div>

        <p className="text-[#4E6987] mb-4" style={{ fontSize: 13, lineHeight: 1.5 }}>
          Digite qualquer uma das expressões abaixo no campo de data relativa:
        </p>

        {/* Presets */}
        <div className="mb-6">
          <h4 className="text-[#122232] font-semibold mb-2" style={{ fontSize: 14, letterSpacing: -0.3 }}>
            📅 Períodos Fixos
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {presets.map((preset) => (
              <div
                key={preset}
                className="px-3 py-2 bg-[#F6F7F9] rounded-lg text-[#122232]"
                style={{ fontSize: 12, fontWeight: 500, ...ff }}
              >
                {preset}
              </div>
            ))}
          </div>
        </div>

        {/* Parametric */}
        <div>
          <h4 className="text-[#122232] font-semibold mb-2" style={{ fontSize: 14, letterSpacing: -0.3 }}>
            🔢 Períodos Personalizados
          </h4>
          <p className="text-[#4E6987] mb-3" style={{ fontSize: 12, lineHeight: 1.5 }}>
            Substitua o número <span className="text-[#0483AB] font-semibold">n</span> pela quantidade desejada:
          </p>
          <div className="grid grid-cols-2 gap-2">
            {parametricExamples.map((example) => (
              <div
                key={example}
                className="px-3 py-2 bg-[#DCF0FF] border border-[#C5E7FF] rounded-lg text-[#0483AB]"
                style={{ fontSize: 12, fontWeight: 500, ...ff }}
              >
                {example}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-[8px] bg-[#0483AB] text-white hover:bg-[#025E7B] transition-colors"
            style={{ fontSize: 13, fontWeight: 600, letterSpacing: -0.3, ...ff }}
          >
            Fechar
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Aggregation Modal ── */
function AggregationModal({ field, currentAggregation, onSave, onClose }: {
  field: CrmField;
  currentAggregation?: string;
  onSave: (aggregation: string) => void;
  onClose: () => void;
}) {
  const [aggregation, setAggregation] = useState<string>(
    currentAggregation || (field.dataType === "number" ? "SUM" : "COUNT")
  );
  const [selectedCategory, setSelectedCategory] = useState<"basic" | "statistical" | "advanced">("basic");

  const aggregationCategories = {
    basic: [
      { value: "SUM", label: "Soma", icon: <Plus size={14} weight="bold" />, description: "Soma todos os valores", dataTypes: ["number"] },
      { value: "AVG", label: "Média", icon: <Hash size={14} weight="bold" />, description: "Calcula a média dos valores", dataTypes: ["number"] },
      { value: "COUNT", label: "Contagem", icon: <NumberCircleOne size={14} weight="bold" />, description: "Conta todas as linhas", dataTypes: ["all"] },
      { value: "COUNTD", label: "Contagem Distinta", icon: <Sparkle size={14} weight="bold" />, description: "Conta valores únicos", dataTypes: ["all"] },
      { value: "MIN", label: "Mínimo", icon: <SortAscending size={14} weight="bold" />, description: "Valor mínimo", dataTypes: ["number", "date"] },
      { value: "MAX", label: "Máximo", icon: <SortDescending size={14} weight="bold" />, description: "Valor máximo", dataTypes: ["number", "date"] },
    ],
    statistical: [
      { value: "MEDIAN", label: "Mediana", icon: <ChartLine size={14} weight="bold" />, description: "Valor central dos dados", dataTypes: ["number"] },
      { value: "STDEV", label: "Desvio Padrão", icon: <ChartLineUp size={14} weight="bold" />, description: "Dispersão dos valores (amostra)", dataTypes: ["number"] },
      { value: "STDEVP", label: "Desvio Padrão Pop.", icon: <ChartLineUp size={14} weight="bold" />, description: "Dispersão (população)", dataTypes: ["number"] },
      { value: "VAR", label: "Variância", icon: <ChartScatter size={14} weight="bold" />, description: "Variação dos valores (amostra)", dataTypes: ["number"] },
      { value: "VARP", label: "Variância Pop.", icon: <ChartScatter size={14} weight="bold" />, description: "Variação (população)", dataTypes: ["number"] },
    ],
    advanced: [
      { value: "ATTR", label: "Atributo", icon: <Tag size={14} weight="bold" />, description: "Valor único ou * se múltiplos", dataTypes: ["all"] },
      { value: "PERCENTILE_25", label: "Percentil 25", icon: <Percent size={14} weight="bold" />, description: "Primeiro quartil (Q1)", dataTypes: ["number"] },
      { value: "PERCENTILE_50", label: "Percentil 50", icon: <Percent size={14} weight="bold" />, description: "Mediana (Q2)", dataTypes: ["number"] },
      { value: "PERCENTILE_75", label: "Percentil 75", icon: <Percent size={14} weight="bold" />, description: "Terceiro quartil (Q3)", dataTypes: ["number"] },
      { value: "PERCENTILE_90", label: "Percentil 90", icon: <Percent size={14} weight="bold" />, description: "90º percentil", dataTypes: ["number"] },
      { value: "PERCENTILE_95", label: "Percentil 95", icon: <Percent size={14} weight="bold" />, description: "95º percentil", dataTypes: ["number"] },
    ],
  } as const;

  const handleSave = () => {
    onSave(aggregation);
    onClose();
  };

  // Filter options based on field data type
  const getAvailableOptions = () => {
    const category = aggregationCategories[selectedCategory];
    return category.filter(opt => {
      if (opt.dataTypes.includes("all")) return true;
      if (field.dataType === "number" && opt.dataTypes.includes("number")) return true;
      if (field.dataType === "date" && opt.dataTypes.includes("date")) return true;
      return false;
    });
  };

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
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-[16px] p-6 w-[520px] max-h-[85vh] overflow-y-auto border border-[#DDE3EC]"
        style={{ boxShadow: "0px 16px 48px rgba(18,34,50,0.16)", ...ff }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#122232] font-semibold" style={{ fontSize: 16, letterSpacing: -0.4 }}>
            Configurar Agregação
          </h3>
          <button onClick={onClose} className="text-[#98989D] hover:text-[#122232] transition-colors">
            <X size={20} weight="bold" />
          </button>
        </div>

        <div className="mb-4">
          <div className="text-[#4E6987] mb-2" style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.2 }}>
            Campo
          </div>
          <div className="px-3 py-2 rounded-[8px] bg-[#D9F8EF] border border-[#3CCEA7]/20">
            <div className="flex items-center gap-2">
              <Hash size={12} className="text-[#135543]" weight="bold" />
              <span className="text-[#135543]" style={{ fontSize: 13, fontWeight: 600, letterSpacing: -0.3 }}>
                {field.label}
              </span>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-4">
          <div className="flex gap-1 bg-[#F6F7F9] p-1 rounded-[10px]">
            <button
              onClick={() => setSelectedCategory("basic")}
              className={`flex-1 px-3 py-2 rounded-[8px] transition-all ${
                selectedCategory === "basic"
                  ? "bg-white text-[#122232] shadow-sm"
                  : "text-[#98989D] hover:text-[#122232]"
              }`}
              style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.2, ...ff }}
            >
              Básicas
            </button>
            <button
              onClick={() => setSelectedCategory("statistical")}
              className={`flex-1 px-3 py-2 rounded-[8px] transition-all ${
                selectedCategory === "statistical"
                  ? "bg-white text-[#122232] shadow-sm"
                  : "text-[#98989D] hover:text-[#122232]"
              }`}
              style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.2, ...ff }}
            >
              Estatísticas
            </button>
            <button
              onClick={() => setSelectedCategory("advanced")}
              className={`flex-1 px-3 py-2 rounded-[8px] transition-all ${
                selectedCategory === "advanced"
                  ? "bg-white text-[#122232] shadow-sm"
                  : "text-[#98989D] hover:text-[#122232]"
              }`}
              style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.2, ...ff }}
            >
              Avançadas
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className="text-[#4E6987] mb-3" style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.2 }}>
            Função de Agregação
          </div>
          <div className="grid gap-2">
            {getAvailableOptions().map((opt) => (
              <button
                key={opt.value}
                onClick={() => setAggregation(opt.value)}
                className={`flex items-start gap-3 p-3 rounded-[10px] border-2 transition-all text-left ${
                  aggregation === opt.value
                    ? "border-[#0483AB] bg-[#E5F4F9]"
                    : "border-[#EEF1F6] bg-white hover:border-[#DDE3EC] hover:bg-[#F6F7F9]"
                }`}
              >
                <div className={`mt-0.5 ${aggregation === opt.value ? "text-[#0483AB]" : "text-[#98989D]"}`}>
                  {opt.icon}
                </div>
                <div className="flex-1">
                  <div
                    className={aggregation === opt.value ? "text-[#0483AB]" : "text-[#122232]"}
                    style={{ fontSize: 13, fontWeight: 600, letterSpacing: -0.3, marginBottom: 2 }}
                  >
                    {opt.label}
                  </div>
                  <div className="text-[#98989D]" style={{ fontSize: 11, fontWeight: 400, letterSpacing: -0.2 }}>
                    {opt.description}
                  </div>
                </div>
                {aggregation === opt.value && (
                  <div className="mt-0.5">
                    <div className="w-4 h-4 rounded-full bg-[#0483AB] flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-[8px] text-[#4E6987] hover:bg-[#F6F7F9] transition-colors"
            style={{ fontSize: 13, fontWeight: 600, letterSpacing: -0.3, ...ff }}
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-[8px] bg-[#0483AB] text-white hover:bg-[#025E7B] transition-colors"
            style={{ fontSize: 13, fontWeight: 600, letterSpacing: -0.3, ...ff }}
          >
            Aplicar Agregação
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Data Pane Field Row ── */
function DataPaneField({ 
  field, 
  onContextMenu,
  isHidden,
  isHighlighted,
  customName,
  isRenaming,
  onRename,
  onDoubleClick,
}: { 
  field: CrmField;
  onContextMenu?: (e: React.MouseEvent, field: CrmField) => void;
  isHidden?: boolean;
  isHighlighted?: boolean;
  customName?: string;
  isRenaming?: boolean;
  onRename?: (newName: string) => void;
  onDoubleClick?: () => void;
}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ITEM_TYPE,
    item: { field },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }), [field]);
  
  const [editValue, setEditValue] = useState(customName || field.label);

  useEffect(() => {
    setEditValue(customName || field.label);
  }, [customName, field.label]);

  // Mapeamento de ícones baseado no Design System (Seção 8: Tipos de Campos)
  const getFieldIcon = () => {
    const name = field.name.toLowerCase();
    const label = field.label.toLowerCase();
    const isMeasure = field.type === "measure";
    const isDate = field.type === "date";

    // Medidas → Hash
    if (isMeasure) return <Hash size={12} className="text-[#3CCEA7]" />;

    // Data & Tempo
    if (isDate || name.includes("data") || name.includes("date")) return <Calendar size={12} weight="duotone" className="text-[#4E6987]" />;
    if (name.includes("hora") || name.includes("time")) return <Timer size={12} weight="duotone" className="text-[#4E6987]" />;
    if (name.includes("duracao") || name.includes("duration")) return <Timer size={12} weight="duotone" className="text-[#4E6987]" />;

    // Texto & Comunicação
    if (name.includes("telefone") || name.includes("phone") || name.includes("celular") || name.includes("mobile")) return <Phone size={12} weight="duotone" className="text-[#4E6987]" />;
    if (name.includes("email") || name.includes("mail")) return <EnvelopeSimple size={12} weight="duotone" className="text-[#4E6987]" />;
    if (name.includes("url") || name.includes("link") || name.includes("website") || name.includes("site")) return <LinkSimpleHorizontal size={12} weight="duotone" className="text-[#4E6987]" />;
    if (name.includes("descricao") || name.includes("description") || name.includes("obs") || name.includes("notes") || label.includes("longo")) return <TextAlignLeft size={12} weight="duotone" className="text-[#4E6987]" />;

    // Numérico & Monetário
    if (name.includes("numero") || name.includes("number") || name.includes("quantidade") || name.includes("qty")) return <Hash size={12} weight="duotone" className="text-[#4E6987]" />;
    if (name.includes("percentual") || name.includes("percent") || name.includes("taxa")) return <Percent size={12} weight="duotone" className="text-[#4E6987]" />;
    if (name.includes("valor") || name.includes("preco") || name.includes("price") || name.includes("moeda") || name.includes("currency")) return <CurrencyDollar size={12} weight="duotone" className="text-[#4E6987]" />;

    // Seleção & Listas
    if (name.includes("lista") || name.includes("list") || name.includes("picklist")) return <ListBullets size={12} weight="duotone" className="text-[#4E6987]" />;
    if (name.includes("tags") || name.includes("multi")) return <Tag size={12} weight="duotone" className="text-[#4E6987]" />;
    if (name.includes("combo") || name.includes("dropdown")) return <CaretCircleUpDown size={12} weight="duotone" className="text-[#4E6987]" />;

    // Referência & Estrutura
    if (name.includes("usuario") || name.includes("user") || name.includes("proprietario") || name.includes("owner")) return <UserCircle size={12} weight="duotone" className="text-[#4E6987]" />;
    if (name.includes("booleano") || name.includes("boolean") || name.includes("ativo") || name.includes("active")) return <ToggleLeft size={12} weight="duotone" className="text-[#4E6987]" />;
    if (name.includes("endereco") || name.includes("address") || name.includes("localizacao") || name.includes("location")) return <MapPin size={12} weight="duotone" className="text-[#4E6987]" />;
    if (name.includes("associacao") || name.includes("relation") || name.includes("ref")) return <LinkSimpleHorizontal size={12} weight="duotone" className="text-[#4E6987]" />;

    // Sistema & Automação
    if (name.includes("contextual") || name.includes("dynamic")) return <Shapes size={12} weight="duotone" className="text-[#4E6987]" />;
    if (name.includes("calculado") || name.includes("formula") || name.includes("computed")) return <Hash size={12} weight="duotone" className="text-[#3CCEA7]" />;
    if (name.includes("id") || name === "id") return <Fingerprint size={12} weight="duotone" className="text-[#4E6987]" />;

    // Default: Texto simples
    return <TextT size={12} weight="duotone" className="text-[#4E6987]" />;
  };

  if (isHidden) return null;

  return (
    <div
      ref={drag as any}
      data-field-id={field.id}
      onContextMenu={(e) => {
        e.preventDefault();
        onContextMenu?.(e, field);
      }}
      onDoubleClick={onDoubleClick}
      className={`flex items-center gap-2 px-3 py-[5px] rounded-[6px] cursor-grab active:cursor-grabbing select-none transition-all hover:bg-[#EBF1FA] ${isDragging ? "opacity-30" : ""} ${isHighlighted ? "bg-[#D9F4FB] ring-2 ring-[#0483AB]" : ""}`}
    >
      {/* Show = icon for calculated fields */}
      {(field as any).isCalculated && (
        <span className="text-[#0483AB] mr-[-4px]" style={{ fontSize: 10, fontWeight: 700 }}>
          =
        </span>
      )}
      {getFieldIcon()}
      {isRenaming ? (
        <input
          autoFocus
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={() => {
            onRename?.(editValue);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onRename?.(editValue);
            } else if (e.key === "Escape") {
              setEditValue(customName || field.label);
              onRename?.(customName || field.label);
            }
          }}
          className="flex-1 bg-white border border-[#0483AB] rounded px-1 outline-none text-[#28415C]"
          style={{ fontSize: 12, fontWeight: 500, letterSpacing: -0.3, ...ff }}
        />
      ) : (
        <span className={`text-[#28415C] truncate ${field.type === "measure" ? "italic" : ""}`}
          style={{ fontSize: 12, fontWeight: 500, letterSpacing: -0.3, ...ff }}>
          {customName || field.label}
        </span>
      )}
    </div>
  );
}

/* ── Drop Zone (Shelf) ── */
function DropShelf({ label, icon, items, onDrop, onRemove, className = "", emptyText, onItemClick, itemConfigs, customLabels, onItemContextMenu }: {
  label: string; icon: ReactNode; items: ShelfItem[];
  onDrop: (field: CrmField) => void; onRemove: (idx: number) => void;
  className?: string; emptyText?: string;
  onItemClick?: (idx: number) => void;
  itemConfigs?: Map<number, FilterConfig | string>;
  customLabels?: Map<number, string>;
  onItemContextMenu?: (e: React.MouseEvent, field: CrmField, idx: number) => void;
}) {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ITEM_TYPE,
    drop: (item: { field: CrmField }) => onDrop(item.field),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }), [onDrop]);

  return (
    <div
      ref={drop as any}
      className={`flex items-center gap-2 min-h-[40px] px-3 py-2 rounded-[12px] border transition-all ${
        isOver && canDrop
          ? "border-[#0483AB] bg-[#DCF0FF]/40"
          : canDrop
            ? "border-dashed border-[#C8CFDB] bg-white"
            : "border-[#EEF1F6] bg-white"
      } ${className}`}
    >
      <div className="flex items-center gap-1.5 shrink-0 text-[#98989d]">
        {icon}
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.3, textTransform: "uppercase", ...ff }}>{label}</span>
      </div>
      <div className="flex items-center gap-1.5 flex-wrap flex-1 min-w-0">
        {items.map((item, i) => (
          <div
            key={item.field.id + i}
            onContextMenu={(e) => {
              e.preventDefault();
              onItemContextMenu?.(e, item.field, i);
            }}
          >
            <FieldPill 
              field={item.field} 
              onRemove={() => onRemove(i)} 
              compact 
              onClick={onItemClick ? () => onItemClick(i) : undefined}
              hasConfig={itemConfigs?.has(i)}
              customLabel={customLabels?.get(i)}
            />
          </div>
        ))}
        {items.length === 0 && (
          <span className="text-[#C8CFDB] italic" style={{ fontSize: 11, fontWeight: 400, ...ff }}>
            {emptyText || "Arraste um campo aqui"}
          </span>
        )}
      </div>
    </div>
  );
}

/* ── Marks Property Button (Tableau style - button that accepts drops) ── */
function MarksPropertyButton({ label, icon, isActive, onClick, onDrop }: {
  label: string; icon: ReactNode; isActive?: boolean; onClick?: () => void; onDrop?: (field: CrmField) => void;
}) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ITEM_TYPE,
    drop: (item: { field: CrmField }) => {
      if (onDrop) onDrop(item.field);
    },
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  }), [onDrop]);

  return (
    <button
      ref={onDrop ? drop as any : undefined}
      onClick={onClick}
      className={`flex flex-col items-center gap-1 px-2 py-1.5 rounded-[8px] border-0 transition-all cursor-pointer ${
        isOver
          ? "bg-[#DCF0FF] scale-105"
          : isActive 
            ? "bg-[#07ABDE] text-[#DCF0FF]" 
            : "bg-[#F6F7F9] text-[#0483AB] hover:bg-[#DCF0FF]"
      }`}
    >
      <span className={isOver || isActive ? "text-[#DCF0FF]" : "text-[#0483AB]"}>{isActive && React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement, { weight: "fill" }) : icon}</span>
      <span className={`${isOver || isActive ? "text-[#DCF0FF]" : "text-[#0483AB]"} truncate max-w-full`} style={{ fontSize: 9, fontWeight: 600, letterSpacing: -0.2, ...ff }} title={label}>{label}</span>
    </button>
  );
}

/* ── Marks Card with Drop Zone ── */
function MarksCard({ onDrop, children }: { onDrop: (field: CrmField) => void; children: ReactNode }) {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ITEM_TYPE,
    drop: (item: { field: CrmField }) => onDrop(item.field),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }), [onDrop]);

  return (
    <div
      ref={drop as any}
      className={`flex flex-col gap-2.5 p-3 rounded-[12px] border transition-all ${
        isOver && canDrop
          ? "border-[#0483AB] bg-[#DCF0FF]/20"
          : "border-[#EEF1F6] bg-white"
      }`}
    >
      {children}
    </div>
  );
}

/* ── Tooltip for charts ── */
const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-[10px] px-3 py-2 border border-[#DDE3EC]" style={{ boxShadow: "0px 8px 24px rgba(18,34,50,0.12)", ...ff }}>
      {label && <p style={{ fontSize: 11, fontWeight: 700, color: "#122232", letterSpacing: -0.3 }}>{label}</p>}
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ fontSize: 11, fontWeight: 500, color: p.color || "#4E6987", letterSpacing: -0.3 }}>
          {p.name}: {typeof p.value === "number" && p.value > 1000 ? formatCurrency(p.value) : formatNumber(p.value)}
        </p>
      ))}
    </div>
  );
};

/* ── Rich Tooltip — dark pill style matching DashChartRenderer ── */
const RichChartTooltip = ({ active, payload, label, dimFieldLabel, extraFields }: any) => {
  if (!active || !payload?.length) return null;
  const rowData = payload[0]?.payload;
  return (
    <div className="px-[14px] py-[8px] rounded-[10px] min-w-[80px]"
      style={{ backgroundColor: DS_NEUTRAL_400, boxShadow: "0px 4px 12px rgba(18,34,50,0.25)", ...ff }}>
      {dimFieldLabel && dimFieldLabel !== "_category" && (
        <p className="text-[#C8CFDB] mb-[2px] truncate max-w-[180px]"
          style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.3, textTransform: "uppercase" }}>{dimFieldLabel}</p>
      )}
      {label && <p className="text-white mb-[3px]" style={{ fontSize: 12, fontWeight: 700, letterSpacing: -0.3 }}>{label}</p>}
      {rowData?._color && (
        <p style={{ fontSize: 10, fontWeight: 600, color: "#73D0FF", letterSpacing: -0.2, marginBottom: 2 }}>
          {rowData._color}
        </p>
      )}
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center gap-[6px]">
          <span className="w-[6px] h-[6px] rounded-full shrink-0" style={{ backgroundColor: p.color || p.fill }} />
          <span className="text-[#C8CFDB]" style={{ fontSize: 11, fontWeight: 500 }}>
            {p.name}:
          </span>
          <span className="text-white" style={{ fontSize: 12, fontWeight: 700, letterSpacing: -0.3 }}>
            {typeof p.value === "number" && p.value > 1000 ? formatCurrency(p.value) : formatNumber(p.value)}
          </span>
        </div>
      ))}
      {rowData?._tooltipLabel && rowData?._tooltipValue != null && (
        <p style={{ fontSize: 10, fontWeight: 500, color: "#C8CFDB", letterSpacing: -0.2, marginTop: 2, borderTop: "1px solid rgba(200,207,219,0.2)", paddingTop: 2 }}>
          {rowData._tooltipLabel}: {typeof rowData._tooltipValue === "number" && rowData._tooltipValue > 1000 ? formatCurrency(rowData._tooltipValue) : formatNumber(rowData._tooltipValue)}
        </p>
      )}
      {rowData?._detail && (
        <p style={{ fontSize: 10, fontWeight: 500, color: "#C8CFDB", letterSpacing: -0.2, marginTop: 1 }}>
          Detalhe: {rowData._detail}
        </p>
      )}
      {extraFields?.map((ef: any, i: number) => (
        <p key={`ef-${i}`} style={{ fontSize: 10, fontWeight: 500, color: "#C8CFDB", letterSpacing: -0.2 }}>
          {ef.label}: {rowData?.[ef.key] ?? "-"}
        </p>
      ))}
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════ */
/*  ANALYTICS ITEMS DATA                                              */
/* ══════════════════════════════════════════════════════════════════ */
const ANALYTICS_ITEMS: AnalyticsItemData[] = [
  // Summarize
  { type: "constant-line", label: "Linha Constante", icon: <ChartLineUp size={12} weight="duotone" />, category: "summarize" },
  { type: "average-line", label: "Linha Média", icon: <ChartLineUp size={12} weight="duotone" />, category: "summarize" },
  { type: "median-line", label: "Linha Mediana", icon: <ChartLineUp size={12} weight="duotone" />, category: "summarize" },
  { type: "average-ci", label: "Média com Intervalo", icon: <ChartBar size={12} weight="duotone" />, category: "summarize" },
  { type: "median-quartiles", label: "Mediana com Quartis", icon: <ChartBar size={12} weight="duotone" />, category: "summarize" },
  { type: "box-plot", label: "Box Plot", icon: <TreeStructure size={12} weight="duotone" />, category: "summarize" },
  { type: "totals", label: "Totais", icon: <Sparkle size={12} weight="duotone" />, category: "summarize" },
  // Model
  { type: "trend-line", label: "Linha de Tendência", icon: <ChartLineUp size={12} weight="duotone" />, category: "model" },
  { type: "average-95ci", label: "Média com IC 95%", icon: <ChartBar size={12} weight="duotone" />, category: "model" },
  { type: "median-95ci", label: "Mediana com IC 95%", icon: <ChartBar size={12} weight="duotone" />, category: "model" },
  // Custom
  { type: "reference-line", label: "Linha de Referência", icon: <ChartLineUp size={12} weight="duotone" />, category: "custom" },
  { type: "reference-band", label: "Banda de Referência", icon: <ChartBar size={12} weight="duotone" />, category: "custom" },
  { type: "distribution-band", label: "Banda de Distribuição", icon: <ChartScatter size={12} weight="duotone" />, category: "custom" },
];

/* ══════════════════════════════════════════════════════════════════ */
/*  CANVAS DROP ZONES                                                */
/* ══════════════════════════════════════════════════════════════════ */
interface CanvasDropZonesProps {
  onDropDimension: (field: CrmField) => void;
  onDropMeasure: (field: CrmField) => void;
}

function CanvasDropZones({ onDropDimension, onDropMeasure }: CanvasDropZonesProps) {
  // Drop zone for dimensions (blue)
  const [{ isOverDimension, isDragging: isDraggingDim }, dropDimension] = useDrop({
    accept: ITEM_TYPE,
    drop: (item: { field: CrmField }) => {
      if (item.field.type === "dimension" || item.field.type === "date") {
        onDropDimension(item.field);
      }
    },
    collect: (monitor) => ({
      isOverDimension: monitor.isOver() && monitor.canDrop(),
      isDragging: monitor.canDrop(),
    }),
  });

  // Drop zone for measures (green)
  const [{ isOverMeasure, isDragging: isDraggingMeas }, dropMeasure] = useDrop({
    accept: ITEM_TYPE,
    drop: (item: { field: CrmField }) => {
      if (item.field.type === "measure") {
        onDropMeasure(item.field);
      }
    },
    collect: (monitor) => ({
      isOverMeasure: monitor.isOver() && monitor.canDrop(),
      isDragging: monitor.canDrop(),
    }),
  });

  // Drop zone for "Show Me" auto-detect
  const [{ isOverAuto, isDragging: isDraggingAuto }, dropAuto] = useDrop({
    accept: ITEM_TYPE,
    drop: (item: { field: CrmField }) => {
      // Auto-detect: dimensions go to rows, measures go to columns
      if (item.field.type === "measure") {
        onDropMeasure(item.field);
      } else {
        onDropDimension(item.field);
      }
    },
    collect: (monitor) => ({
      isOverAuto: monitor.isOver() && monitor.canDrop(),
      isDragging: monitor.canDrop(),
    }),
  });

  const isDragging = isDraggingDim || isDraggingMeas || isDraggingAuto;

  return (
    <div className="absolute inset-0 grid grid-cols-3 gap-6 p-12">
      {/* Left: Blue dimension zone */}
      <motion.div
        ref={dropDimension}
        animate={{
          scale: isOverDimension ? 1.02 : isDragging ? 1 : 0.98,
          opacity: isDragging ? 1 : 0.7,
        }}
        transition={{ duration: 0.2 }}
        className={`border-2 border-dashed rounded-[16px] flex flex-col items-center justify-center gap-4 transition-colors ${
          isOverDimension
            ? "border-[#0483AB] bg-[#DCF0FF]/40 shadow-lg"
            : isDragging
            ? "border-[#0483AB] bg-[#DCF0FF]/20"
            : "border-[#C8CFDB] bg-[#F6F7F9]/50"
        }`}
      >
        <motion.div
          animate={{
            scale: isOverDimension ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
          className={`flex items-center justify-center w-[56px] h-[56px] rounded-[14px] transition-colors ${ isOverDimension ? "bg-[#DCF0FF]" : "bg-[#EBF1FA]" } bg-[#ebf1fa00]`}
        >
          <Rows
            size={28}
            weight="duotone"
            className={isOverDimension ? "text-[#0483AB]" : "text-[#4E6987]"}
          />
        </motion.div>
        <div className="text-center">
          <div
            className={`mb-1 ${isOverDimension ? "text-[#0483AB]" : "text-[#4E6987]"}`}
            style={{ fontSize: 13, fontWeight: 700, letterSpacing: -0.3, ...ff }}
          >
            Solte um campo aqui
          </div>
          <div
            className="text-[#98989d]"
            style={{ fontSize: 10, fontWeight: 500, letterSpacing: -0.2, ...ff }}
          >
            Dimensões e datas
          </div>
        </div>
      </motion.div>

      {/* Center: Green measure zone */}
      <motion.div
        ref={dropMeasure}
        animate={{
          scale: isOverMeasure ? 1.02 : isDragging ? 1 : 0.98,
          opacity: isDragging ? 1 : 0.7,
        }}
        transition={{ duration: 0.2 }}
        className={`border-2 border-dashed rounded-[16px] flex flex-col items-center justify-center gap-4 transition-colors ${
          isOverMeasure
            ? "border-[#3CCEA7] bg-[#D4F8EE]/40 shadow-lg"
            : isDragging
            ? "border-[#3CCEA7] bg-[#D4F8EE]/20"
            : "border-[#C8CFDB] bg-[#F6F7F9]/50"
        }`}
      >
        <motion.div
          animate={{
            scale: isOverMeasure ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
          className={`flex items-center justify-center w-[56px] h-[56px] rounded-[14px] transition-colors ${ isOverMeasure ? "bg-[#D4F8EE]" : "bg-[#EBF1FA]" } bg-[#ebf1fa00]`}
        >
          <Columns
            size={28}
            weight="duotone"
            className={isOverMeasure ? "text-[#3CCEA7]" : "text-[#4E6987]"}
          />
        </motion.div>
        <div className="text-center">
          <div
            className={`mb-1 ${isOverMeasure ? "text-[#0F5A40]" : "text-[#4E6987]"}`}
            style={{ fontSize: 13, fontWeight: 700, letterSpacing: -0.3, ...ff }}
          >
            Solte um campo aqui
          </div>
          <div
            className="text-[#98989d]"
            style={{ fontSize: 10, fontWeight: 500, letterSpacing: -0.2, ...ff }}
          >
            Medidas e métricas
          </div>
        </div>
      </motion.div>

      {/* Right: Auto-detect with Show Me */}
      <motion.div
        ref={dropAuto}
        animate={{
          scale: isOverAuto ? 1.02 : isDragging ? 1 : 0.98,
          opacity: isDragging ? 1 : 0.7,
        }}
        transition={{ duration: 0.2 }}
        className={`border-2 border-dashed rounded-[16px] flex flex-col items-center justify-center gap-4 transition-colors ${
          isOverAuto
            ? "border-[#6868B1] bg-[#EEEEFD]/40 shadow-lg"
            : isDragging
            ? "border-[#6868B1] bg-[#EEEEFD]/20"
            : "border-[#C8CFDB] bg-[#F6F7F9]/50"
        }`}
      >
        <motion.div
          animate={{
            scale: isOverAuto ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
          className={`flex items-center justify-center w-[56px] h-[56px] rounded-[14px] transition-colors ${ isOverAuto ? "bg-[#EEEEFD]" : "bg-[#EBF1FA]" } bg-[#ebf1fa00]`}
        >
          <Atom
            size={28}
            weight="duotone"
            className={isOverAuto ? "text-[#6868B1]" : "text-[#4E6987]"}
          />
        </motion.div>
        <div className="text-center">
          <div
            className={`mb-1 ${isOverAuto ? "text-[#6868B1]" : "text-[#4E6987]"}`}
            style={{ fontSize: 13, fontWeight: 700, letterSpacing: -0.3, ...ff }}
          >
            Solte um campo aqui
          </div>
          <div
            className="text-[#98989d]"
            style={{ fontSize: 10, fontWeight: 500, letterSpacing: -0.2, ...ff }}
          >O Turing te ajuda</div>
        </div>
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════ */
/*  CANVAS DROP OVERLAY — Active State (over existing viz)           */
/* ══════════════════════════════════════════════════════════════════ */
interface CanvasDropOverlayProps {
  onDropColumns: (field: CrmField) => void;
  onDropRows: (field: CrmField) => void;
  onDropShowMe: (field: CrmField) => void;
}

function CanvasDropOverlay({ onDropColumns, onDropRows, onDropShowMe }: CanvasDropOverlayProps) {
  // Drop zone for top area (Columns)
  const [{ isOverTop }, dropTop] = useDrop({
    accept: ITEM_TYPE,
    drop: (item: { field: CrmField }) => {
      onDropColumns(item.field);
    },
    collect: (monitor) => ({
      isOverTop: monitor.isOver() && monitor.canDrop(),
    }),
  });

  // Drop zone for left area (Rows)
  const [{ isOverLeft }, dropLeft] = useDrop({
    accept: ITEM_TYPE,
    drop: (item: { field: CrmField }) => {
      onDropRows(item.field);
    },
    collect: (monitor) => ({
      isOverLeft: monitor.isOver() && monitor.canDrop(),
    }),
  });

  // Drop zone for center area (Show Me)
  const [{ isOverCenter }, dropCenter] = useDrop({
    accept: ITEM_TYPE,
    drop: (item: { field: CrmField }) => {
      onDropShowMe(item.field);
    },
    collect: (monitor) => ({
      isOverCenter: monitor.isOver() && monitor.canDrop(),
    }),
  });

  // Check if anything is being dragged
  const [{ isDragging }, dropDetect] = useDrop({
    accept: ITEM_TYPE,
    collect: (monitor) => ({
      isDragging: monitor.getItem() !== null,
    }),
  });

  if (!isDragging) return null;

  return (
    <div ref={dropDetect} className="absolute inset-0 pointer-events-none">
      <div className="relative w-full h-full pointer-events-auto">
        {/* Top drop zone (Columns) */}
        <motion.div
          ref={dropTop}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`absolute top-0 left-0 right-0 h-[80px] border-2 border-dashed transition-all ${
            isOverTop
              ? "border-[#3CCEA7] bg-[#D4F8EE]/60"
              : "border-[#DDE3EC] bg-white/40"
          }`}
        >
          <div className="flex items-center justify-center h-full">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-[10px] ${
              isOverTop ? "bg-[#D4F8EE]" : "bg-white/80"
            }`}>
              <Columns size={20} weight="duotone" className={isOverTop ? "text-[#3CCEA7]" : "text-[#4E6987]"} />
              <span className={isOverTop ? "text-[#0F5A40]" : "text-[#4E6987]"}
                style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.3, ...ff }}>
                Solte um campo aqui
              </span>
            </div>
          </div>
        </motion.div>

        {/* Left drop zone (Rows) */}
        <motion.div
          ref={dropLeft}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className={`absolute top-[80px] bottom-0 left-0 w-[80px] border-2 border-dashed transition-all ${
            isOverLeft
              ? "border-[#0483AB] bg-[#DCF0FF]/60"
              : "border-[#DDE3EC] bg-white/40"
          }`}
        >
          <div className="flex items-center justify-center h-full">
            <div className={`flex flex-col items-center gap-2 px-2 py-4 rounded-[10px] ${
              isOverLeft ? "bg-[#DCF0FF]" : "bg-white/80"
            }`}>
              <Rows size={20} weight="duotone" className={isOverLeft ? "text-[#0483AB]" : "text-[#4E6987]"} />
              <span className={`text-center ${isOverLeft ? "text-[#0483AB]" : "text-[#4E6987]"}`}
                style={{ fontSize: 11, fontWeight: 600, letterSpacing: -0.3, writingMode: "vertical-rl", ...ff }}>
                Solte um campo aqui
              </span>
            </div>
          </div>
        </motion.div>

        {/* Center/Right drop zone (Show Me) */}
        <motion.div
          ref={dropCenter}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`absolute top-[50%] right-[20px] -translate-y-1/2 w-[140px] h-[100px] border-2 border-dashed rounded-[12px] transition-all ${
            isOverCenter
              ? "border-[#6868B1] bg-[#EEEEFD]/80"
              : "border-[#DDE3EC] bg-white/60"
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <div className={`flex items-center justify-center w-[40px] h-[40px] rounded-[10px] ${
              isOverCenter ? "bg-[#EEEEFD]" : "bg-white"
            }`}>
              <Sparkle size={20} weight="duotone" className={isOverCenter ? "text-[#6868B1]" : "text-[#4E6987]"} />
            </div>
            <span className={isOverCenter ? "text-[#6868B1]" : "text-[#4E6987]"}
              style={{ fontSize: 11, fontWeight: 600, letterSpacing: -0.3, ...ff }}>
              Show Me
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════ */
/*  MAIN COMPONENT                                                   */
/* ══════════════════════════════════════════════════════════════════ */
function VisualBuilderInner() {
  const navigate = useNavigate();
  const dashData = useDashData();
  const { matchesFilters } = useDashFilters();

  // State
  const [colShelf, setColShelf] = useState<ShelfItem[]>([]);
  const [rowShelf, setRowShelf] = useState<ShelfItem[]>([]);
  const [filterShelf, setFilterShelf] = useState<ShelfItem[]>([]);
  const [filterConfigs, setFilterConfigs] = useState<Map<number, FilterConfig>>(new Map());
  const [calculatedFields, setCalculatedFields] = useState<CalculatedField[]>([]);
  const [showCalcEditor, setShowCalcEditor] = useState(false);
  const [editingCalcField, setEditingCalcField] = useState<CalculatedField | null>(null);
  const [editingFilter, setEditingFilter] = useState<number | null>(null);
  const [colAggregations, setColAggregations] = useState<Map<number, string>>(new Map());
  const [rowAggregations, setRowAggregations] = useState<Map<number, string>>(new Map());
  const [colTableCalcs, setColTableCalcs] = useState<Map<number, TableCalculationConfig>>(new Map());
  const [rowTableCalcs, setRowTableCalcs] = useState<Map<number, TableCalculationConfig>>(new Map());
  const [editingTableCalc, setEditingTableCalc] = useState<{ shelf: "col" | "row"; idx: number } | null>(null);
  const [editingMeasure, setEditingMeasure] = useState<{ shelf: "col" | "row"; idx: number } | null>(null);
  const [marks, setMarks] = useState<MarkEncoding>({ additionalFields: [] });
  const [chartType, setChartType] = useState<ChartType>("auto");
  const [polarSubType, setPolarSubType] = useState<PolarSubType>("spider");
  const [scatterSubType, setScatterSubType] = useState<ScatterSubType>("classic");
  const [showChartTypes, setShowChartTypes] = useState(true);
  const [showMe, setShowMe] = useState(false);
  const [search, setSearch] = useState("");
  const [expandedTables, setExpandedTables] = useState<Set<string>>(new Set(["leads", "opportunities"]));
  const [sheetName, setSheetName] = useState("Sheet 1");
  const [sheets, setSheets] = useState<string[]>(["Sheet 1"]);
  const [activeSheet, setActiveSheet] = useState(0);
  const [agentOpen, setAgentOpen] = useState(false);
  const [agentQuery, setAgentQuery] = useState("");
  const [activePane, setActivePane] = useState<"data" | "analytics">("data");
  
  // Data Pane Organization & Folders
  const [groupByFolder, setGroupByFolder] = useState(false);
  const [sortBy, setSortBy] = useState<"name" | "dataSource">("dataSource");
  const [showHiddenFields, setShowHiddenFields] = useState(false);
  const [hiddenFields, setHiddenFields] = useState<Set<string>>(new Set());
  const [folders, setFolders] = useState<Map<string, string[]>>(new Map()); // folder name -> field IDs
  const [fieldRenames, setFieldRenames] = useState<Map<string, string>>(new Map()); // field id -> custom name
  const [contextMenuField, setContextMenuField] = useState<{ field: CrmField; x: number; y: number } | null>(null);
  const [dataPaneMenuOpen, setDataPaneMenuOpen] = useState(false);
  const [highlightedFieldId, setHighlightedFieldId] = useState<string | null>(null);
  const [renamingFieldId, setRenamingFieldId] = useState<string | null>(null);
  const [shelfContextMenu, setShelfContextMenu] = useState<{ field: CrmField; idx: number; shelf: "col" | "row" | "filter"; x: number; y: number } | null>(null);
  const [dataMenuOpen, setDataMenuOpen] = useState(false);
  const dataMenuRef = useRef<HTMLDivElement>(null);
  // Summary row state for tables
  const [showSummaryRow, setShowSummaryRow] = useState(false);
  const [summaryFunctions, setSummaryFunctions] = useState<Record<string, string>>({});
  const [editingSummaryCol, setEditingSummaryCol] = useState<string | null>(null);
  const [connectDataModal, setConnectDataModal] = useState(false);
  // Scatter interactive states
  const [hoveredBubbleIdx, setHoveredBubbleIdx] = useState<number | null>(null);
  const [scatterHiddenSeries, setScatterHiddenSeries] = useState<Set<string>>(new Set());
  const [scatterCrosshair, setScatterCrosshair] = useState<{ x: number; y: number } | null>(null);
  const [scatterZoomDomain, setScatterZoomDomain] = useState<{ x: [number, number]; y: [number, number] } | null>(null);
  const [scatterZoomStart, setScatterZoomStart] = useState<{ x: number; y: number } | null>(null);
  const [scatterZoomEnd, setScatterZoomEnd] = useState<{ x: number; y: number } | null>(null);
  const [syncConfigModal, setSyncConfigModalRaw] = useState(false);
  const [syncBaseUrl, setSyncBaseUrl] = useState("");
  const [syncApiKey, setSyncApiKey] = useState("");
  const [syncGatewayToken, setSyncGatewayToken] = useState("");
  const setSyncConfigModal = useCallback((open: boolean) => {
    if (open && dashData.syncConfig) {
      setSyncBaseUrl(dashData.syncConfig.baseUrl || "");
      setSyncApiKey(dashData.syncConfig.apiKey || "");
      setSyncGatewayToken(dashData.syncConfig.gatewayToken || "");
    }
    if (!open) {
      setSyncTestResult(null);
    }
    setSyncConfigModalRaw(open);
  }, [dashData.syncConfig]);
  const [syncSaving, setSyncSaving] = useState(false);
  const [syncTesting, setSyncTesting] = useState(false);
  const [syncTestResult, setSyncTestResult] = useState<{ ok: boolean; msg: string } | null>(null);
  const [syncDisconnecting, setSyncDisconnecting] = useState(false);
  const [saveModal, setSaveModal] = useState(false);
  const [dashboardName, setDashboardName] = useState("Meu Dashboard");
  const [dashboardDesc, setDashboardDesc] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveAsType, setSaveAsType] = useState<"dashboard" | "report">("dashboard");

  // ID do relatório/dashboard que estamos editando (null = novo)
  const [editingReportId, setEditingReportId] = useState<string | null>(null);

  // Load report from URL parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const loadId = params.get("load");
    const loadType = params.get("type");

    if (loadId && loadType === "report") {
      loadReportById(loadId);
    }
  }, []);

  const loadReportById = async (reportId: string) => {
    try {
      console.log("[Visual Builder] Loading report:", reportId);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d2ca3281/dash/visual-builder/get-report/${reportId}`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      console.log("[Visual Builder] Response status:", response.status);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      const report = data.report;
      console.log("[Visual Builder] Report data:", report);

      // Load report config into state
      if (report && report.config) {
        console.log("[Visual Builder] Loading config into state...");
        const cfg = report.config;
        setEditingReportId(report.id); // Guardar ID para update
        setSaveAsType("report"); // Já sabemos que estamos editando um relatório
        setDashboardName(report.name);
        setDashboardDesc(report.description || "");
        setIsPublic(report.isPublic);
        setSheetName(cfg.sheetName || "Sheet 1");
        setColShelf(cfg.colShelf || []);
        setRowShelf(cfg.rowShelf || []);
        setFilterShelf(cfg.filterShelf || []);
        setChartType(cfg.chartType || "auto");
        setPolarSubType(cfg.polarSubType || "spider");
        setScatterSubType(cfg.scatterSubType || "classic");
        setCalculatedFields(cfg.calculatedFields || []);
        // Restore summary row config
        setShowSummaryRow(cfg.showSummaryRow || false);
        setSummaryFunctions(cfg.summaryFunctions || {});
        // Restore marks encoding
        if (cfg.marks) setMarks(cfg.marks);
        // Restore aggregation Maps
        if (cfg.colAggregations) setColAggregations(new Map(Object.entries(cfg.colAggregations).map(([k, v]) => [Number(k), v as string])));
        if (cfg.rowAggregations) setRowAggregations(new Map(Object.entries(cfg.rowAggregations).map(([k, v]) => [Number(k), v as string])));
        // Restore filter configs Map
        if (cfg.filterConfigs) setFilterConfigs(new Map(Object.entries(cfg.filterConfigs).map(([k, v]) => [Number(k), v as any])));
        // Restore table calculation Maps
        if (cfg.colTableCalcs) setColTableCalcs(new Map(Object.entries(cfg.colTableCalcs).map(([k, v]) => [Number(k), v as any])));
        if (cfg.rowTableCalcs) setRowTableCalcs(new Map(Object.entries(cfg.rowTableCalcs).map(([k, v]) => [Number(k), v as any])));
        // Auto-expand sync tables if report uses sync fields
        const allReportFields = [...(cfg.colShelf || []), ...(cfg.rowShelf || []), ...(cfg.filterShelf || [])];
        const syncTables = new Set(allReportFields.map((s: any) => s.field?.table).filter((t: string) => t?.startsWith("sync_")));
        if (syncTables.size > 0) {
          setExpandedTables(prev => {
            const next = new Set(prev);
            syncTables.forEach((t: string) => next.add(t));
            return next;
          });
          console.log("[Visual Builder] Report uses sync tables:", Array.from(syncTables));
        }
        console.log("[Visual Builder] Config loaded successfully! Editing report:", report.id);
        toast.success(`Relatório "${report.name}" carregado para edição`);
      }
    } catch (err) {
      console.error("Error loading report:", err);
      toast.error("Erro ao carregar relatório");
    }
  };

  // Toggle table expansion
  const toggleTable = (id: string) => {
    setExpandedTables(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  // Filter fields by search
  const filteredTables = useMemo(() => {
    if (!search) return CRM_TABLES;
    const q = search.toLowerCase();
    return CRM_TABLES.map(t => ({
      ...t,
      fields: t.fields.filter(f => f.label.toLowerCase().includes(q) || f.name.toLowerCase().includes(q)),
    })).filter(t => t.fields.length > 0);
  }, [search]);

  // Dynamic Sync tables from API schema (Single Source of Truth) with fallback
  const syncTables = useMemo<CrmTable[]>(() => {
    if (dashData.syncSchema) {
      const fromSchema = buildSyncTablesFromSchema(dashData.syncSchema);
      if (fromSchema.length > 0) return fromSchema;
    }
    return SYNC_TABLES;
  }, [dashData.syncSchema]);

  // ALL tables (CRM + dynamic Sync)
  const allTables = useMemo(() => [...CRM_TABLES, ...syncTables], [syncTables]);

  // Filtered Sync tables
  const filteredSyncTables = useMemo(() => {
    if (!search) return syncTables;
    const q = search.toLowerCase();
    return syncTables.map(t => ({
      ...t,
      fields: t.fields.filter(f => f.label.toLowerCase().includes(q) || f.name.toLowerCase().includes(q)),
    })).filter(t => t.fields.length > 0);
  }, [search, syncTables]);

  // Get data for a table
  const getTableData = useCallback((tableId: string) => {
    switch (tableId) {
      case "leads": return dashData.leads;
      case "opportunities": return dashData.opportunities;
      case "activities": return dashData.activities;
      case "accounts": return dashData.accounts;
      case "contacts": return dashData.contacts;
      // Sync connector data
      case "sync_google_ads": return dashData.syncGoogleAds || [];
      case "sync_meta_ads": return dashData.syncMetaAds || [];
      case "sync_linkedin_ads": return dashData.syncLinkedinAds || [];
      default: return [];
    }
  }, [dashData]);

  // Sync record counts per connector
  const syncRecordCounts = useMemo<Record<string, number>>(() => ({
    sync_google_ads: dashData.syncGoogleAds?.length || 0,
    sync_meta_ads: dashData.syncMetaAds?.length || 0,
    sync_linkedin_ads: dashData.syncLinkedinAds?.length || 0,
  }), [dashData.syncGoogleAds, dashData.syncMetaAds, dashData.syncLinkedinAds]);

  // Refresh only sync data
  const [syncRefreshing, setSyncRefreshing] = useState(false);
  const refreshSyncData = useCallback(async () => {
    setSyncRefreshing(true);
    try {
      await dashData.refetch();
      toast.success("Dados do Sync atualizados!");
    } catch {
      toast.error("Erro ao atualizar dados do Sync");
    } finally {
      setSyncRefreshing(false);
    }
  }, [dashData]);

  // Save dashboard function
  const saveDashboard = async () => {
    if (!dashboardName.trim()) {
      toast.error(`Nome do ${saveAsType === "dashboard" ? "dashboard" : "relatório"} é obrigatório`);
      return;
    }

    // Defensive: se estamos editando um relatório existente, forçar saveAsType para "report"
    // para prevenir salvamento acidental no endpoint errado
    const effectiveSaveType = editingReportId && saveAsType === "dashboard" ? "report" : saveAsType;
    if (effectiveSaveType !== saveAsType) {
      console.warn(`[Save] Corrigindo saveAsType de "${saveAsType}" para "${effectiveSaveType}" (editingReportId: ${editingReportId})`);
      setSaveAsType(effectiveSaveType);
    }

    setIsSaving(true);
    try {
      const endpoint = effectiveSaveType === "dashboard" 
        ? "/dash/visual-builder/save" 
        : "/dash/visual-builder/save-report";
      
      console.log(`[Save] Saving ${effectiveSaveType} | editingId: ${editingReportId || "NEW"} | endpoint: ${endpoint} | name: "${dashboardName}"`);
      
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-d2ca3281${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          // Se estamos editando, enviar o ID para atualizar em vez de criar novo
          ...(editingReportId ? { id: editingReportId } : {}),
          name: dashboardName,
          description: dashboardDesc,
          isPublic: isPublic,
          userId: "default",
          config: {
            sheetName,
            colShelf,
            rowShelf,
            filterShelf,
            chartType,
            polarSubType,
            scatterSubType,
            calculatedFields,
            marks,
            showSummaryRow,
            summaryFunctions,
            colAggregations: Object.fromEntries(colAggregations),
            rowAggregations: Object.fromEntries(rowAggregations),
            filterConfigs: Object.fromEntries(
              Array.from(filterConfigs.entries()).map(([k, v]) => [k, v])
            ),
            colTableCalcs: Object.fromEntries(
              Array.from(colTableCalcs.entries()).map(([k, v]) => [k, v])
            ),
            rowTableCalcs: Object.fromEntries(
              Array.from(rowTableCalcs.entries()).map(([k, v]) => [k, v])
            ),
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => "");
        console.error(`[Save] HTTP ${response.status} — ${errorText}`);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log(`[Save] Response:`, data);
      // Guardar o ID retornado para futuros saves (evita duplicar)
      // Verifica tanto data.report (relatório) quanto data.dashboard (dashboard)
      const savedId = data.report?.id || data.dashboard?.id;
      if (savedId && effectiveSaveType === "report") {
        setEditingReportId(savedId);
      }
      const itemType = effectiveSaveType === "dashboard" ? "Dashboard" : "Relatório";
      const action = editingReportId ? "atualizado" : "criado";
      toast.success(`${itemType} "${dashboardName}" ${action} com sucesso!`);
      setSaveModal(false);
    } catch (err) {
      console.error(`Error saving ${effectiveSaveType}:`, err);
      const itemType = effectiveSaveType === "dashboard" ? "dashboard" : "relatório";
      toast.error(`Erro ao salvar ${itemType}: ${err}`);
    } finally {
      setIsSaving(false);
    }
  };

  // Save as new (duplicate) — força criação de um novo relatório/dashboard
  const saveAsNew = async () => {
    if (!dashboardName.trim()) {
      toast.error(`Nome do ${saveAsType === "dashboard" ? "dashboard" : "relatório"} é obrigatório`);
      return;
    }

    setIsSaving(true);
    try {
      const endpoint = saveAsType === "dashboard" 
        ? "/dash/visual-builder/save" 
        : "/dash/visual-builder/save-report";
      
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-d2ca3281${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          // NÃO envia id — força criação de novo
          name: dashboardName + " (Cópia)",
          description: dashboardDesc,
          isPublic: isPublic,
          userId: "default",
          config: {
            sheetName,
            colShelf,
            rowShelf,
            filterShelf,
            chartType,
            polarSubType,
            scatterSubType,
            calculatedFields,
            marks,
            showSummaryRow,
            summaryFunctions,
            colAggregations: Object.fromEntries(colAggregations),
            rowAggregations: Object.fromEntries(rowAggregations),
            filterConfigs: Object.fromEntries(
              Array.from(filterConfigs.entries()).map(([k, v]) => [k, v])
            ),
            colTableCalcs: Object.fromEntries(
              Array.from(colTableCalcs.entries()).map(([k, v]) => [k, v])
            ),
            rowTableCalcs: Object.fromEntries(
              Array.from(rowTableCalcs.entries()).map(([k, v]) => [k, v])
            ),
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      // Passa a editar a cópia — verifica tanto report quanto dashboard na resposta
      const savedId = data.report?.id || data.dashboard?.id;
      if (savedId && saveAsType === "report") {
        setEditingReportId(savedId);
      }
      const newName = dashboardName + " (Cópia)";
      setDashboardName(newName);
      const itemType = saveAsType === "dashboard" ? "Dashboard" : "Relatório";
      toast.success(`${itemType} duplicado como "${newName}"`);
      setSaveModal(false);
    } catch (err) {
      console.error(`Error saving as new ${saveAsType}:`, err);
      const itemType = saveAsType === "dashboard" ? "dashboard" : "relatório";
      toast.error(`Erro ao duplicar ${itemType}: ${err}`);
    } finally {
      setIsSaving(false);
    }
  };

  // Determine which table is active based on shelf fields
  const activeTable = useMemo(() => {
    const allFields = [...colShelf, ...rowShelf, ...filterShelf].map(s => s.field);
    if (marks.color) allFields.push(marks.color);
    if (marks.size) allFields.push(marks.size);
    if (marks.label) allFields.push(marks.label);
    if (marks.detail) allFields.push(marks.detail);
    if (allFields.length === 0) return null;
    // Most common table
    const counts: Record<string, number> = {};
    allFields.forEach(f => { counts[f.table] = (counts[f.table] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  }, [colShelf, rowShelf, filterShelf, marks]);

  // Close data menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dataMenuRef.current && !dataMenuRef.current.contains(event.target as Node)) {
        setDataMenuOpen(false);
      }
    };
    if (dataMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [dataMenuOpen]);

  // Build visualization data
  const vizData = useMemo(() => {
    if (!activeTable) return [];
    const rawData = getTableData(activeTable) as any[];
    if (!rawData.length) return [];

    // Inject calculated field values into raw data before processing
    let data0 = rawData;
    if (calculatedFields.length > 0) {
      const fMap = new Map<string, string>();
      Object.keys(rawData[0] || {}).forEach(k => fMap.set(k, k));
      calculatedFields.forEach(cf => { if (cf.label && cf.name) fMap.set(cf.label, cf.name); });
      const cNames = new Set(calculatedFields.map(cf => cf.name));
      const sortedCalcs = [...calculatedFields].sort((a, b) => {
        const aR = (a.formula.match(/\[([^\]]+)\]/g) || []).map((m: string) => m.slice(1, -1));
        const bR = (b.formula.match(/\[([^\]]+)\]/g) || []).map((m: string) => m.slice(1, -1));
        if (aR.some((r: string) => cNames.has(r)) && !bR.some((r: string) => cNames.has(r))) return 1;
        if (!aR.some((r: string) => cNames.has(r)) && bR.some((r: string) => cNames.has(r))) return -1;
        return 0;
      });
      data0 = rawData.map(row => {
        const nr = { ...row };
        sortedCalcs.forEach(cf => {
          try {
            let expr = cf.formula || "";
            expr = expr.replace(/\[([^\]]+)\]/g, (_: string, ref: string) => {
              const val = nr[ref] ?? nr[fMap.get(ref) || ref];
              const num = Number(val);
              return isNaN(num) ? "0" : String(num);
            });
            const r = new Function(`"use strict"; try { return (${expr}); } catch(e) { return null; }`)();
            nr[cf.name] = typeof r === "number" && isFinite(r) ? r : null;
          } catch { nr[cf.name] = null; }
        });
        return nr;
      });
    }

    const colDims = colShelf.filter(s => s.field.type === "dimension" || s.field.type === "date");
    const colMeasures = colShelf.filter(s => s.field.type === "measure");
    const rowDims = rowShelf.filter(s => s.field.type === "dimension" || s.field.type === "date");
    const rowMeasures = rowShelf.filter(s => s.field.type === "measure");

    const allDims = [...colDims, ...rowDims];
    const allMeasures = [...colMeasures, ...rowMeasures];

    if (allDims.length === 0 && allMeasures.length === 0) return [];

    // Helper to get aggregation for a measure
    const getAggregation = (measureShelfItem: ShelfItem, shelfType: "col" | "row", idx: number) => {
      const customAgg = shelfType === "col" ? colAggregations.get(idx) : rowAggregations.get(idx);
      return customAgg || measureShelfItem.field.aggregation || "SUM";
    };

    // Apply filter shelf
    let data = data0;
    filterShelf.forEach((sf, idx) => {
      const field = sf.field;
      const config = filterConfigs.get(idx);
      
      // If no config, skip this filter
      if (!config) return;
      
      data = data.filter(row => {
        const value = row[field.name];
        
        // Handle relative date filtering
        if (field.dataType === "date" && config.isRelativeDate && config.relativeDateValue) {
          const dateRange = relativeDateToRange(config.relativeDateValue);
          return isDateInRange(value, dateRange);
        }
        
        // Handle operator-based filtering
        switch (config.operator) {
          case "isEmpty":
            return value == null || value === "" || value === "null";
          case "isNotEmpty":
            return value != null && value !== "" && value !== "null";
          case "isTrue":
            return value === true;
          case "isFalse":
            return value === false || !value;
          case "equals":
            if (field.dataType === "number") {
              return Number(value) === Number(config.value);
            }
            if (field.dataType === "date") {
              return new Date(value).toDateString() === new Date(config.value as string).toDateString();
            }
            return String(value).toLowerCase() === String(config.value).toLowerCase();
          case "notEquals":
            if (field.dataType === "number") {
              return Number(value) !== Number(config.value);
            }
            if (field.dataType === "date") {
              return new Date(value).toDateString() !== new Date(config.value as string).toDateString();
            }
            return String(value).toLowerCase() !== String(config.value).toLowerCase();
          case "contains":
            return String(value).toLowerCase().includes(String(config.value).toLowerCase());
          case "notContains":
            return !String(value).toLowerCase().includes(String(config.value).toLowerCase());
          case "greaterThan":
            if (field.dataType === "number") {
              return Number(value) > Number(config.value);
            }
            if (field.dataType === "date") {
              return new Date(value) > new Date(config.value as string);
            }
            return false;
          case "lessThan":
            if (field.dataType === "number") {
              return Number(value) < Number(config.value);
            }
            if (field.dataType === "date") {
              return new Date(value) < new Date(config.value as string);
            }
            return false;
          case "greaterOrEqual":
            if (field.dataType === "number") {
              return Number(value) >= Number(config.value);
            }
            return false;
          case "lessOrEqual":
            if (field.dataType === "number") {
              return Number(value) <= Number(config.value);
            }
            return false;
          default:
            return true;
        }
      });
    });

    // If only measures, return single row totals
    if (allDims.length === 0 && allMeasures.length > 0) {
      const row: any = { _category: "Total" };
      allMeasures.forEach(m => {
        const field = m.field;
        if (field.name === "_count") {
          row[field.label] = data.length;
        } else {
          // Get custom aggregation if set, otherwise use field default
          const shelfType = colShelf.includes(m) ? "col" : "row";
          const idx = (shelfType === "col" ? colShelf : rowShelf).indexOf(m);
          const agg = getAggregation(m, shelfType, idx);
          const values = data.map(d => Number(d[field.name]) || 0);
          const validValues = values.filter(v => !isNaN(v) && v !== null);
          
          switch (agg) {
            case "SUM": 
              row[field.label] = values.reduce((a, b) => a + b, 0); 
              break;
            case "AVG": 
              row[field.label] = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0; 
              break;
            case "COUNT": 
              row[field.label] = data.length; 
              break;
            case "COUNTD": 
              row[field.label] = new Set(values.filter(v => v != null)).size; 
              break;
            case "MIN": 
              row[field.label] = validValues.length ? Math.min(...validValues) : 0; 
              break;
            case "MAX": 
              row[field.label] = validValues.length ? Math.max(...validValues) : 0; 
              break;
            case "MEDIAN":
              const sorted = [...validValues].sort((a, b) => a - b);
              const mid = Math.floor(sorted.length / 2);
              row[field.label] = sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
              break;
            case "STDEV":
              if (validValues.length > 1) {
                const mean = validValues.reduce((a, b) => a + b, 0) / validValues.length;
                const variance = validValues.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / (validValues.length - 1);
                row[field.label] = Math.sqrt(variance);
              } else {
                row[field.label] = 0;
              }
              break;
            case "STDEVP":
              if (validValues.length > 0) {
                const mean = validValues.reduce((a, b) => a + b, 0) / validValues.length;
                const variance = validValues.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / validValues.length;
                row[field.label] = Math.sqrt(variance);
              } else {
                row[field.label] = 0;
              }
              break;
            case "VAR":
              if (validValues.length > 1) {
                const mean = validValues.reduce((a, b) => a + b, 0) / validValues.length;
                row[field.label] = validValues.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / (validValues.length - 1);
              } else {
                row[field.label] = 0;
              }
              break;
            case "VARP":
              if (validValues.length > 0) {
                const mean = validValues.reduce((a, b) => a + b, 0) / validValues.length;
                row[field.label] = validValues.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / validValues.length;
              } else {
                row[field.label] = 0;
              }
              break;
            case "ATTR":
              const uniqueValues = new Set(data.map(d => d[field.name]));
              row[field.label] = uniqueValues.size === 1 ? Array.from(uniqueValues)[0] : "*";
              break;
            case "PERCENTILE_25":
            case "PERCENTILE_50":
            case "PERCENTILE_75":
            case "PERCENTILE_90":
            case "PERCENTILE_95":
              const sortedP = [...validValues].sort((a, b) => a - b);
              const percentile = parseInt(agg.split("_")[1]) / 100;
              const index = percentile * (sortedP.length - 1);
              const lower = Math.floor(index);
              const upper = Math.ceil(index);
              const weight = index - lower;
              row[field.label] = sortedP.length ? sortedP[lower] * (1 - weight) + sortedP[upper] * weight : 0;
              break;
            default: 
              row[field.label] = values.reduce((a, b) => a + b, 0);
          }
        }
      });
      return [row];
    }

    // Group by dimensions (+ marks.color/detail when they are dimensions not in shelf)
    const colorDimInShelf = marks.color && (marks.color.type === "dimension" || marks.color.type === "date")
      ? allDims.some(d => d.field.id === marks.color!.id) : true;
    const detailDimInShelf = marks.detail && (marks.detail.type === "dimension" || marks.detail.type === "date")
      ? allDims.some(d => d.field.id === marks.detail!.id) : true;

    const groupKey = (item: any) => {
      const parts = allDims.map(d => {
        const val = item[d.field.name];
        if (d.field.type === "date" && val) {
          try {
            const date = new Date(val);
            return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
          } catch { return val || "-"; }
        }
        return val || "-";
      });
      // Disaggregate by color dimension if not already in shelf
      if (marks.color && !colorDimInShelf) {
        parts.push(item[marks.color.name] || "-");
      }
      // Disaggregate by detail dimension if not already in shelf
      if (marks.detail && !detailDimInShelf) {
        parts.push(item[marks.detail.name] || "-");
      }
      return parts.join("|||");
    };

    const groups: Record<string, any[]> = {};
    data.forEach(item => {
      const key = groupKey(item);
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
    });

    return Object.entries(groups).map(([key, items]) => {
      const parts = key.split("|||");
      const row: any = {};
      allDims.forEach((d, i) => {
        row[d.field.label] = parts[i];
      });
      row._category = parts.join(" · ");

      // Aggregate measures
      allMeasures.forEach(m => {
        const field = m.field;
        if (field.name === "_count") {
          row[field.label] = items.length;
        } else {
          // Get custom aggregation if set, otherwise use field default
          const shelfType = colShelf.includes(m) ? "col" : "row";
          const idx = (shelfType === "col" ? colShelf : rowShelf).indexOf(m);
          const agg = getAggregation(m, shelfType, idx);
          const values = items.map(d => Number(d[field.name]) || 0);
          const validValues = values.filter(v => !isNaN(v) && v !== null);
          
          switch (agg) {
            case "SUM": 
              row[field.label] = values.reduce((a, b) => a + b, 0); 
              break;
            case "AVG": 
              row[field.label] = values.length ? Math.round(values.reduce((a, b) => a + b, 0) / values.length) : 0; 
              break;
            case "COUNT": 
              row[field.label] = items.length; 
              break;
            case "COUNTD": 
              row[field.label] = new Set(values).size; 
              break;
            case "MIN": 
              row[field.label] = validValues.length ? Math.min(...validValues) : 0; 
              break;
            case "MAX": 
              row[field.label] = validValues.length ? Math.max(...validValues) : 0; 
              break;
            case "MEDIAN":
              const sorted = [...validValues].sort((a, b) => a - b);
              const mid = Math.floor(sorted.length / 2);
              row[field.label] = sorted.length % 2 === 0 ? Math.round((sorted[mid - 1] + sorted[mid]) / 2) : sorted[mid];
              break;
            case "STDEV":
              if (validValues.length > 1) {
                const mean = validValues.reduce((a, b) => a + b, 0) / validValues.length;
                const variance = validValues.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / (validValues.length - 1);
                row[field.label] = Math.round(Math.sqrt(variance));
              } else {
                row[field.label] = 0;
              }
              break;
            case "STDEVP":
              if (validValues.length > 0) {
                const mean = validValues.reduce((a, b) => a + b, 0) / validValues.length;
                const variance = validValues.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / validValues.length;
                row[field.label] = Math.round(Math.sqrt(variance));
              } else {
                row[field.label] = 0;
              }
              break;
            case "VAR":
              if (validValues.length > 1) {
                const mean = validValues.reduce((a, b) => a + b, 0) / validValues.length;
                row[field.label] = Math.round(validValues.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / (validValues.length - 1));
              } else {
                row[field.label] = 0;
              }
              break;
            case "VARP":
              if (validValues.length > 0) {
                const mean = validValues.reduce((a, b) => a + b, 0) / validValues.length;
                row[field.label] = Math.round(validValues.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / validValues.length);
              } else {
                row[field.label] = 0;
              }
              break;
            case "ATTR":
              const uniqueValues = new Set(items.map(d => d[field.name]));
              row[field.label] = uniqueValues.size === 1 ? Array.from(uniqueValues)[0] : "*";
              break;
            case "PERCENTILE_25":
            case "PERCENTILE_50":
            case "PERCENTILE_75":
            case "PERCENTILE_90":
            case "PERCENTILE_95":
              const sortedP = [...validValues].sort((a, b) => a - b);
              const percentile = parseInt(agg.split("_")[1]) / 100;
              const index = percentile * (sortedP.length - 1);
              const lower = Math.floor(index);
              const upper = Math.ceil(index);
              const weight = index - lower;
              row[field.label] = sortedP.length ? Math.round(sortedP[lower] * (1 - weight) + sortedP[upper] * weight) : 0;
              break;
            default: 
              row[field.label] = values.reduce((a, b) => a + b, 0);
          }
        }
      });

      // ── Marks encoding ──
      // Color
      if (marks.color) {
        if (marks.color.name === "_count") {
          row._colorValue = items.length;
        } else if (marks.color.type === "measure") {
          const existingVal = row[marks.color.label];
          if (existingVal != null) {
            row._colorValue = existingVal;
          } else {
            const vals = items.map(d => Number(d[marks.color!.name]) || 0);
            row._colorValue = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
          }
        } else {
          row._color = items[0]?.[marks.color.name] || "-";
        }
      }
      // Size
      if (marks.size) {
        if (marks.size.name === "_count") {
          row._size = items.length;
        } else if (marks.size.type === "measure") {
          const existingVal = row[marks.size.label];
          if (existingVal != null) {
            row._size = existingVal;
          } else {
            const vals = items.map(d => Number(d[marks.size!.name]) || 0);
            row._size = vals.reduce((a, b) => a + b, 0);
          }
        } else {
          row._size = items[0]?.[marks.size.name] || "-";
        }
      }
      // Label
      if (marks.label) {
        if (marks.label.name === "_count") {
          row._labelValue = items.length;
        } else if (marks.label.type === "measure") {
          // If label measure matches a shelf measure, reuse its already-aggregated value
          const existingVal = row[marks.label.label];
          if (existingVal != null) {
            row._labelValue = existingVal;
          } else {
            const vals = items.map(d => Number(d[marks.label!.name]) || 0);
            row._labelValue = vals.reduce((a, b) => a + b, 0);
          }
        } else {
          row._labelValue = items[0]?.[marks.label.name] || "-";
        }
      }
      // Tooltip
      if (marks.tooltip) {
        if (marks.tooltip.name === "_count") {
          row._tooltipValue = items.length;
        } else if (marks.tooltip.type === "measure") {
          const existingVal = row[marks.tooltip.label];
          if (existingVal != null) {
            row._tooltipValue = existingVal;
          } else {
            const vals = items.map(d => Number(d[marks.tooltip!.name]) || 0);
            row._tooltipValue = vals.reduce((a, b) => a + b, 0);
          }
        } else {
          row._tooltipValue = items[0]?.[marks.tooltip.name] || "-";
        }
        row._tooltipLabel = marks.tooltip.label;
      }
      // Detail
      if (marks.detail) {
        row._detail = items[0]?.[marks.detail.name] || "-";
      }

      return row;
    }).sort((a, b) => {
      const catA = a._category || "";
      const catB = b._category || "";
      return catA.localeCompare(catB);
    });
  }, [activeTable, colShelf, rowShelf, filterShelf, filterConfigs, marks, getTableData, colAggregations, rowAggregations, calculatedFields]);

  // Auto-detect chart type
  const resolvedChartType = useMemo((): ChartType => {
    if (chartType !== "auto") return chartType;

    const colDims = colShelf.filter(s => s.field.type === "dimension");
    const colDates = colShelf.filter(s => s.field.type === "date");
    const colMeasures = colShelf.filter(s => s.field.type === "measure");
    const rowDims = rowShelf.filter(s => s.field.type === "dimension");
    const rowMeasures = rowShelf.filter(s => s.field.type === "measure");
    const allDims = [...colDims, ...rowDims];
    const allMeasures = [...colMeasures, ...rowMeasures];

    if (colDates.length > 0 && allMeasures.length > 0) return "line";
    if (allDims.length === 1 && allMeasures.length === 1 && vizData.length <= 10) return "bar";
    if (allDims.length === 1 && allMeasures.length === 1 && vizData.length > 10) return "bar-h";
    if (allDims.length === 0 && allMeasures.length >= 2) return "scatter";
    if (allDims.length === 1 && allMeasures.length === 0) return "bar";
    if (allDims.length >= 2) return "table";
    return "bar";
  }, [chartType, colShelf, rowShelf, vizData.length]);

  // Get measure and dimension labels
  const measureLabels = useMemo(() => {
    const labels = [...colShelf, ...rowShelf].filter(s => s.field.type === "measure").map(s => s.field.label);
    // Deduplicate: append index suffix if label repeats
    const seen = new Map<string, number>();
    return labels.map(l => {
      const count = seen.get(l) || 0;
      seen.set(l, count + 1);
      return count > 0 ? `${l} (${count + 1})` : l;
    });
  }, [colShelf, rowShelf]);

  const dimLabel = useMemo(() => {
    const dims = [...colShelf, ...rowShelf].filter(s => s.field.type === "dimension" || s.field.type === "date");
    return dims[0]?.field.label || "_category";
  }, [colShelf, rowShelf]);

  const dimLabels = useMemo(() => {
    return [...colShelf, ...rowShelf]
      .filter(s => s.field.type === "dimension" || s.field.type === "date")
      .map(s => s.field.label);
  }, [colShelf, rowShelf]);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input/textarea
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        // Allow Ctrl+F in search
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
          e.preventDefault();
          const searchInput = document.querySelector('input[placeholder="Buscar campos..."]') as HTMLInputElement;
          searchInput?.focus();
        }
        return;
      }

      // F2: Rename selected field (if highlighted)
      if (e.key === 'F2' && highlightedFieldId) {
        e.preventDefault();
        setRenamingFieldId(highlightedFieldId);
        return;
      }

      // Ctrl/Cmd+F: Focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        const searchInput = document.querySelector('input[placeholder="Buscar campos..."]') as HTMLInputElement;
        searchInput?.focus();
        return;
      }

      // Escape: Clear context menu, renaming, highlighting
      if (e.key === 'Escape') {
        setContextMenuField(null);
        setRenamingFieldId(null);
        setHighlightedFieldId(null);
        setShelfContextMenu(null);
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [highlightedFieldId]);
  
  // Auto-clear highlight after 3 seconds
  useEffect(() => {
    if (highlightedFieldId) {
      const timer = setTimeout(() => {
        setHighlightedFieldId(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [highlightedFieldId]);

  // Shelf handlers
  const addToShelf = (shelf: "col" | "row" | "filter") => (field: CrmField) => {
    const item: ShelfItem = { field };
    switch (shelf) {
      case "col": setColShelf(prev => [...prev, item]); break;
      case "row": setRowShelf(prev => [...prev, item]); break;
      case "filter": setFilterShelf(prev => [...prev, item]); break;
    }
  };

  const removeFromShelf = (shelf: "col" | "row" | "filter") => (idx: number) => {
    switch (shelf) {
      case "col": 
        setColShelf(prev => prev.filter((_, i) => i !== idx));
        // Re-index col aggregations
        setColAggregations(prev => {
          const next = new Map(prev);
          next.delete(idx);
          const reindexed = new Map<number, string>();
          Array.from(next.entries()).forEach(([key, val]) => {
            if (key > idx) {
              reindexed.set(key - 1, val);
            } else {
              reindexed.set(key, val);
            }
          });
          return reindexed;
        });
        break;
      case "row": 
        setRowShelf(prev => prev.filter((_, i) => i !== idx));
        // Re-index row aggregations
        setRowAggregations(prev => {
          const next = new Map(prev);
          next.delete(idx);
          const reindexed = new Map<number, string>();
          Array.from(next.entries()).forEach(([key, val]) => {
            if (key > idx) {
              reindexed.set(key - 1, val);
            } else {
              reindexed.set(key, val);
            }
          });
          return reindexed;
        });
        break;
      case "filter": 
        setFilterShelf(prev => prev.filter((_, i) => i !== idx));
        setFilterConfigs(prev => {
          const next = new Map(prev);
          next.delete(idx);
          // Re-index remaining configs
          const reindexed = new Map<number, FilterConfig>();
          Array.from(next.entries()).forEach(([key, val]) => {
            if (key > idx) {
              reindexed.set(key - 1, val);
            } else {
              reindexed.set(key, val);
            }
          });
          return reindexed;
        });
        break;
    }
  };

  // Reset
  const resetAll = () => {
    setColShelf([]); setRowShelf([]); setFilterShelf([]);
    setFilterConfigs(new Map());
    setColAggregations(new Map()); setRowAggregations(new Map());
    setMarks({}); setChartType("auto"); setPolarSubType("spider"); setScatterSubType("classic");
    setEditingReportId(null); // Limpar ID para que o próximo save crie um novo
    setDashboardName("Meu Dashboard"); setDashboardDesc("");
    toast.success("Workspace limpo");
  };

  // Add new sheet
  const addSheet = () => {
    const name = `Sheet ${sheets.length + 1}`;
    setSheets(prev => [...prev, name]);
    setActiveSheet(sheets.length);
    resetAll();
  };

  // Zenite Agent suggestions
  const agentSuggestions = [
    "Qual estágio tem mais oportunidades?",
    "Mostre a receita por responsável",
    "Quantos leads por origem?",
    "Evolução mensal de leads criados",
    "Comparar valor de oportunidades por estágio",
    "Top 10 contas por receita anual",
  ];

  const handleAgentSubmit = () => {
    if (!agentQuery.trim()) return;
    const q = agentQuery.toLowerCase();

    // Simple pattern matching for demo
    if (q.includes("estágio") && (q.includes("oportunidade") || q.includes("opp"))) {
      setColShelf([{ field: CRM_TABLES[1].fields[3] }]); // stage
      setRowShelf([{ field: CRM_TABLES[1].fields[14] }]); // count
      setChartType("bar");
    } else if (q.includes("receita") && q.includes("responsável")) {
      setColShelf([{ field: CRM_TABLES[1].fields[4] }]); // owner
      setRowShelf([{ field: CRM_TABLES[1].fields[11] }]); // value
      setChartType("bar");
    } else if (q.includes("leads") && q.includes("origem")) {
      setColShelf([{ field: CRM_TABLES[0].fields[4] }]); // source
      setRowShelf([{ field: CRM_TABLES[0].fields[11] }]); // count
      setChartType("bar");
    } else if (q.includes("evolução") || q.includes("mensal")) {
      setColShelf([{ field: CRM_TABLES[0].fields[7] }]); // createdAt
      setRowShelf([{ field: CRM_TABLES[0].fields[11] }]); // count
      setChartType("line");
    } else if (q.includes("funil") || q.includes("sankey") || q.includes("fluxo")) {
      setColShelf([{ field: CRM_TABLES[1].fields[10] }, { field: CRM_TABLES[1].fields[3] }]); // origin + stage (2 dims for sankey)
      setRowShelf([{ field: CRM_TABLES[1].fields[32] }]); // value (measure)
      setChartType("sankey");
    } else if (q.includes("top") && q.includes("conta")) {
      setColShelf([{ field: CRM_TABLES[3].fields[0] }]); // name
      setRowShelf([{ field: CRM_TABLES[3].fields[8] }]); // revenue
      setChartType("bar-h");
    } else {
      // Default: first dimension + count of that table
      setColShelf([{ field: CRM_TABLES[0].fields[2] }]); // stage
      setRowShelf([{ field: CRM_TABLES[0].fields[11] }]); // count
      setChartType("auto");
    }
    setAgentOpen(false);
    setAgentQuery("");
    toast.success("Visualização gerada pelo Agent");
  };

  /* ── Render Visualization ── */
  const renderViz = () => {
    if (vizData.length === 0) {
      return (
        <div className="flex-1 flex items-center justify-center relative">
          {/* Drop zones grid (Tableau style) */}
          <CanvasDropZones
            onDropDimension={(field) => {
              // Add to rows by default for dimensions
              setRowShelf(prev => [...prev, { field, dateLevel: field.type === "date" ? "year" : undefined }]);
              toast.success(`${field.label} adicionado às Linhas`);
            }}
            onDropMeasure={(field) => {
              // Add to columns by default for measures
              setColShelf(prev => [...prev, { field }]);
              toast.success(`${field.label} adicionado às Colunas`);
            }}
          />
        </div>
      );
    }

    const dataKey = dimLabel;
    const limitedData = vizData.slice(0, 50);

    // ── Marks: color dimension → pivot data for grouped/stacked series ──
    const hasColorDim = marks.color && marks.color.type !== "measure";
    const hasColorMeasure = marks.color && marks.color.type === "measure";
    let colorValues: string[] = [];
    let pivotedData = limitedData;
    let colorSeriesKeys: { key: string; colorValue: string; measure: string }[] = [];

    if (hasColorDim) {
      colorValues = [...new Set(limitedData.map((d: any) => d._color).filter(Boolean))];
      if (colorValues.length > 0 && colorValues.length <= 30) {
        const pivotMap = new Map<string, any>();
        limitedData.forEach((row: any) => {
          const dimVal = row[dataKey] || row._category;
          if (!pivotMap.has(dimVal)) {
            pivotMap.set(dimVal, { [dataKey]: dimVal, _category: dimVal });
          }
          const pRow = pivotMap.get(dimVal)!;
          measureLabels.forEach(m => {
            const seriesKey = `${m}·${row._color}`;
            pRow[seriesKey] = (pRow[seriesKey] || 0) + (row[m] || 0);
          });
          // carry forward tooltip/label marks
          if (row._tooltipLabel) pRow._tooltipLabel = row._tooltipLabel;
          if (row._tooltipValue != null) pRow._tooltipValue = row._tooltipValue;
          if (row._labelValue != null) {
            // Store per-color label and also a general _labelValue (last wins, for fallback)
            pRow[`_lbl·${row._color}`] = row._labelValue;
            pRow._labelValue = row._labelValue;
          }
        });
        pivotedData = Array.from(pivotMap.values());
        colorSeriesKeys = colorValues.flatMap(cv =>
          measureLabels.map(m => ({ key: `${m}·${cv}`, colorValue: cv, measure: m }))
        );
      }
    }

    // ── Marks: color measure → continuous color scale ──
    let colorScale: ((val: number) => string) | null = null;
    if (hasColorMeasure) {
      const cVals = limitedData.map((d: any) => d._colorValue || 0);
      const minC = Math.min(...cVals);
      const maxC = Math.max(...cVals);
      colorScale = (val: number) => {
        if (maxC === minC) return COLORS[0];
        const t = Math.max(0, Math.min(1, (val - minC) / (maxC - minC)));
        // Cool blue → warm orange gradient
        const r = Math.round(4 + t * 233);
        const g = Math.round(131 + t * (-49));
        const b = Math.round(171 + t * (-171));
        return `rgb(${r},${g},${b})`;
      };
    }

    // ── Marks: label → show value on bars/lines ──
    const showLabel = !!marks.label;
    const labelDataKey = "_labelValue";

    // Helper: render bars with marks support (3-layer depth, matching DashChartRenderer)
    const renderBars = (isHorizontal: boolean) => {
      if (colorSeriesKeys.length > 0) {
        return colorSeriesKeys.map((sk, ci) => (
          <Bar key={`vb-bar-c-${ci}`} dataKey={sk.key} name={measureLabels.length > 1 ? `${sk.measure} — ${sk.colorValue}` : sk.colorValue}
            fill={COLORS[ci % COLORS.length]}
            shape={isHorizontal ? <VBStackedBarShapeH /> : <VBStackedBarShape />}
            stackId={measureLabels.length === 1 ? "stack" : undefined}
            animationBegin={ci * 120}
            animationDuration={700}
            animationEasing="ease-out"
          >
            {showLabel && <LabelList dataKey={sk.key} position={isHorizontal ? "right" : "top"} style={{ fontSize: 9, fill: "#4E6987", fontWeight: 600 }} formatter={(v: number) => v > 1000 ? `${(v / 1000).toFixed(0)}k` : v} />}
          </Bar>
        ));
      }

      return measureLabels.map((m, i) => (
        <Bar key={`vb-bar-${i}`} dataKey={m} name={m}
          fill={COLORS[i % COLORS.length]}
          shape={isHorizontal ? <VBStackedBarShapeH /> : <VBStackedBarShape />}
          animationBegin={i * 120}
          animationDuration={700}
          animationEasing="ease-out"
        >
          {hasColorMeasure && limitedData.map((entry: any, idx: number) => (
            <Cell key={`vb-bar-cell-${idx}`} fill={colorScale!(entry._colorValue || 0)} />
          ))}
          {showLabel && <LabelList dataKey={labelDataKey} position={isHorizontal ? "right" : "top"} style={{ fontSize: 9, fill: "#4E6987", fontWeight: 600 }} formatter={(v: any) => typeof v === "number" && v > 1000 ? `${(v / 1000).toFixed(0)}k` : v} />}
        </Bar>
      ));
    };

    // Helper: render line-areas with marks support (AreaChart + gradient, matching DashChartRenderer)
    const renderLineAreas = () => {
      if (colorSeriesKeys.length > 0) {
        return colorSeriesKeys.map((sk, ci) => {
          const color = COLORS[ci % COLORS.length];
          return (
            <Area key={`vb-linearea-c-${ci}`} type="monotone" dataKey={sk.key}
              name={measureLabels.length > 1 ? `${sk.measure} — ${sk.colorValue}` : sk.colorValue}
              stroke={color} strokeWidth={2.5}
              fill={`url(#vb-lineGrad-${ci})`} fillOpacity={1}
              dot={<VBDot fill={color} />}
              activeDot={<VBActiveDot fill={color} />}
              animationDuration={900} animationEasing="ease-out"
            >
              {showLabel && <LabelList dataKey={sk.key} position="top" style={{ fontSize: 9, fill: "#4E6987", fontWeight: 600 }} formatter={(v: any) => typeof v === "number" && v > 1000 ? `${(v / 1000).toFixed(0)}k` : v} />}
            </Area>
          );
        });
      }
      return measureLabels.map((m, i) => {
        const color = COLORS[i % COLORS.length];
        return (
          <Area key={`vb-linearea-${i}`} type="monotone" dataKey={m} name={m}
            stroke={color} strokeWidth={2.5}
            fill={`url(#vb-lineGrad-${i})`} fillOpacity={1}
            dot={<VBDot fill={color} />}
            activeDot={<VBActiveDot fill={color} />}
            animationDuration={900} animationEasing="ease-out"
          >
            {showLabel && <LabelList dataKey={labelDataKey} position="top" style={{ fontSize: 9, fill: "#4E6987", fontWeight: 600 }} formatter={(v: any) => typeof v === "number" && v > 1000 ? `${(v / 1000).toFixed(0)}k` : v} />}
          </Area>
        );
      });
    };

    // Helper: render areas with marks support (matching DashChartRenderer)
    const renderAreas = () => {
      const keys = colorSeriesKeys.length > 0 ? colorSeriesKeys : measureLabels.map((m, i) => ({ key: m, colorValue: m, measure: m }));
      return keys.map((sk, i) => {
        const gradId = `vb-agrad-mk-${i}`;
        const color = COLORS[i % COLORS.length];
        const label = colorSeriesKeys.length > 0
          ? (measureLabels.length > 1 ? `${sk.measure} — ${sk.colorValue}` : sk.colorValue)
          : sk.key;
        return (
          <Area key={`vb-area-mk-${i}`} type="monotone" dataKey={sk.key} name={label}
            stroke={color} fill={`url(#${gradId})`} fillOpacity={1} strokeWidth={2.5}
            dot={<VBDot fill={color} />}
            activeDot={<VBActiveDot fill={color} />}
            animationDuration={900} animationEasing="ease-out"
          >
            {showLabel && <LabelList dataKey={colorSeriesKeys.length > 0 ? sk.key : labelDataKey} position="top" style={{ fontSize: 9, fill: "#4E6987", fontWeight: 600 }} formatter={(v: any) => typeof v === "number" && v > 1000 ? `${(v / 1000).toFixed(0)}k` : v} />}
          </Area>
        );
      });
    };

    const chartData = colorSeriesKeys.length > 0 ? pivotedData : limitedData;
    const areaGradientKeys = colorSeriesKeys.length > 0 ? colorSeriesKeys : measureLabels.map((m, i) => ({ key: m, colorValue: m, measure: m }));

    switch (resolvedChartType) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 16, right: 24, left: 8, bottom: 48 }} barCategoryGap="20%">
              <CartesianGrid key="vb-bar-grid" strokeDasharray="none" stroke={DS_NEUTRAL_BORDER} strokeOpacity={0.5} vertical={false} />
              <XAxis key="vb-bar-x" dataKey={dataKey} tick={<VBAxisTick angle={chartData.length > 8 ? -40 : 0} />}
                axisLine={{ stroke: DS_NEUTRAL_BORDER, strokeWidth: 1 }} tickLine={false}
                height={chartData.length > 8 ? 70 : 40} />
              <YAxis key="vb-bar-y" tick={<VBYAxisTick />} axisLine={false} tickLine={false} width={55} />
              <Tooltip key="vb-bar-tip" content={<RichChartTooltip dimFieldLabel={dataKey} />} cursor={{ fill: "rgba(7,171,222,0.06)", radius: 3 }} />
              <Legend key="vb-bar-leg" content={<VBLegend />} />
              {renderBars(false)}
            </BarChart>
          </ResponsiveContainer>
        );
      case "bar-h":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ top: 16, right: 24, left: 12, bottom: 16 }} barCategoryGap="18%">
              <CartesianGrid key="vb-barh-grid" strokeDasharray="none" stroke={DS_NEUTRAL_BORDER} strokeOpacity={0.5} horizontal={false} />
              <XAxis key="vb-barh-x" type="number" tick={<VBYAxisTick />}
                axisLine={{ stroke: DS_NEUTRAL_BORDER, strokeWidth: 1 }} tickLine={false} />
              <YAxis key="vb-barh-y" type="category" dataKey={dataKey}
                tick={({ x, y, payload }: any) => {
                  const val = typeof payload.value === "string" && payload.value.length > 16
                    ? payload.value.slice(0, 15) + "\u2026" : payload.value;
                  return (
                    <g transform={`translate(${x},${y})`}>
                      <text x={-8} y={0} dy={4} textAnchor="end" fill={DS_NEUTRAL_400}
                        style={{ fontSize: 11, fontWeight: 600, letterSpacing: -0.2, ...ff }}>{val}</text>
                    </g>
                  );
                }}
                axisLine={false} tickLine={false} width={100} />
              <Tooltip key="vb-barh-tip" content={<RichChartTooltip dimFieldLabel={dataKey} />} cursor={{ fill: "rgba(7,171,222,0.06)" }} />
              <Legend key="vb-barh-leg" content={<VBLegend />} />
              {renderBars(true)}
            </BarChart>
          </ResponsiveContainer>
        );
      case "line": {
        const lineGradKeys = colorSeriesKeys.length > 0 ? colorSeriesKeys : measureLabels.map((m, i) => ({ key: m, colorValue: m, measure: m }));
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 16, right: 24, left: 8, bottom: 48 }}>
              <defs key="vb-line-defs">
                {lineGradKeys.map((_sk, i) => (
                  <linearGradient key={`vb-lineGrad-def-${i}`} id={`vb-lineGrad-${i}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={COLORS[i % COLORS.length]} stopOpacity={0.28} />
                    <stop offset="85%" stopColor={COLORS[i % COLORS.length]} stopOpacity={0.04} />
                    <stop offset="100%" stopColor={COLORS[i % COLORS.length]} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid key="vb-line-grid" strokeDasharray="none" stroke={DS_NEUTRAL_BORDER} strokeOpacity={0.4} vertical={false} />
              <XAxis key="vb-line-x" dataKey={dataKey} tick={<VBAxisTick angle={chartData.length > 10 ? -40 : 0} />}
                axisLine={{ stroke: DS_NEUTRAL_BORDER, strokeWidth: 1 }} tickLine={false}
                height={chartData.length > 10 ? 70 : 40} />
              <YAxis key="vb-line-y" tick={<VBYAxisTick />} axisLine={false} tickLine={false} width={55} />
              <Tooltip key="vb-line-tip" content={<RichChartTooltip dimFieldLabel={dataKey} />} />
              <Legend key="vb-line-leg" content={<VBLegend />} />
              {renderLineAreas()}
            </AreaChart>
          </ResponsiveContainer>
        );
      }
      case "area":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 16, right: 24, left: 8, bottom: 48 }}>
              <defs key="vb-area-defs">
                {areaGradientKeys.map((sk, i) => {
                  const color = COLORS[i % COLORS.length];
                  return (
                    <linearGradient key={`vb-agrad-mk-${i}`} id={`vb-agrad-mk-${i}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={color} stopOpacity={0.35} />
                      <stop offset="90%" stopColor={color} stopOpacity={0.05} />
                    </linearGradient>
                  );
                })}
              </defs>
              <CartesianGrid key="vb-area-grid" strokeDasharray="none" stroke={DS_NEUTRAL_BORDER} strokeOpacity={0.4} vertical={false} />
              <XAxis key="vb-area-x" dataKey={dataKey} tick={<VBAxisTick angle={chartData.length > 10 ? -40 : 0} />}
                axisLine={{ stroke: DS_NEUTRAL_BORDER, strokeWidth: 1 }} tickLine={false}
                height={chartData.length > 10 ? 70 : 40} />
              <YAxis key="vb-area-y" tick={<VBYAxisTick />} axisLine={false} tickLine={false} width={55} />
              <Tooltip key="vb-area-tip" content={<RichChartTooltip dimFieldLabel={dataKey} />} />
              <Legend key="vb-area-leg" content={<VBLegend />} />
              {renderAreas()}
            </AreaChart>
          </ResponsiveContainer>
        );
      case "pie":
      case "donut": {
        // For pie/donut with color dimension, use _color as the name key and color each slice by its group
        const pieColorMap = new Map<string, string>();
        if (hasColorDim) {
          colorValues.forEach((cv, i) => pieColorMap.set(cv, COLORS[i % COLORS.length]));
        }

        // Sort data by value descending for pie opacity layering effect
        const pieMeasureKey = measureLabels[0] || "value";
        const sortedPieData = [...limitedData].sort((a: any, b: any) => {
          const aVal = typeof a[pieMeasureKey] === "number" ? a[pieMeasureKey] : 0;
          const bVal = typeof b[pieMeasureKey] === "number" ? b[pieMeasureKey] : 0;
          return bVal - aVal;
        });

        // Opacity layers for Figma depth effect (pie only)
        const PIE_OPACITIES = [0.88, 0.68, 0.52, 0.40, 0.30, 0.22];
        const isDonut = resolvedChartType === "donut";

        // Donut center total
        const donutTotal = limitedData.reduce((sum: number, row: any) => {
          const v = typeof row[pieMeasureKey] === "number" ? row[pieMeasureKey] : 0;
          return sum + v;
        }, 0);

        // Custom pie label with connector lines (Figma-style)
        const pieLabel = (props: any) => {
          const { cx, cy, midAngle, outerRadius, fill, name, value, percent } = props;
          const RAD = Math.PI / 180;
          const sin = Math.sin(-RAD * midAngle);
          const cos = Math.cos(-RAD * midAngle);
          const sx = cx + (outerRadius + 4) * cos;
          const sy = cy + (outerRadius + 4) * sin;
          const mx = cx + (outerRadius + 18) * cos;
          const my = cy + (outerRadius + 18) * sin;
          const ex = mx + (cos >= 0 ? 12 : -12);
          const ey = my;
          const anchor = cos >= 0 ? "start" : "end";
          const dName = typeof name === "string" && name.length > 10 ? name.slice(0, 9) + "\u2026" : name;
          const dVal = typeof value === "number" && value > 1000 ? formatCurrency(value) : formatNumber(value);
          return (
            <g>
              <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} strokeWidth={1.2} fill="none" opacity={0.45} />
              <circle cx={sx} cy={sy} r={2} fill={fill} />
              <text x={ex + (cos >= 0 ? 3 : -3)} y={ey - 5} textAnchor={anchor}
                fill="#28415C" style={{ fontSize: 10, fontWeight: 600, letterSpacing: -0.2, ...ff }}>
                {dName}
              </text>
              <text x={ex + (cos >= 0 ? 3 : -3)} y={ey + 7} textAnchor={anchor}
                fill="#98989d" style={{ fontSize: 9, fontWeight: 500, ...ff }}>
                {dVal} ({(percent * 100).toFixed(0)}%)
              </text>
            </g>
          );
        };

        const displayData = isDonut ? limitedData : sortedPieData;

        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              {/* Donut: gray track ring background */}
              {isDonut && (
                <Pie
                  key="vb-donut-bg"
                  data={[{ value: 1 }]}
                  dataKey="value"
                  cx="50%" cy="50%"
                  outerRadius="72%"
                  innerRadius="48%"
                  isAnimationActive={false}
                  stroke="none"
                >
                  <Cell fill="#DDE3EC" opacity={0.45} />
                </Pie>
              )}
              {/* Pie: subtle base circle */}
              {!isDonut && (
                <Pie
                  key="vb-pie-bg"
                  data={[{ value: 1 }]}
                  dataKey="value"
                  cx="50%" cy="50%"
                  outerRadius="72%"
                  innerRadius={0}
                  isAnimationActive={false}
                  stroke="none"
                >
                  <Cell fill="#F6F7F9" />
                </Pie>
              )}
              {/* Main data ring/pie */}
              <Pie
                key="vb-pie-main"
                data={displayData}
                cx="50%"
                cy="50%"
                innerRadius={isDonut ? "50%" : 0}
                outerRadius={isDonut ? "70%" : "68%"}
                dataKey={pieMeasureKey}
                nameKey={dataKey}
                paddingAngle={isDonut ? 3 : 0}
                stroke="none"
                strokeWidth={0}
                cornerRadius={isDonut ? 4 : 0}
                label={!isDonut ? pieLabel : false}
                labelLine={false}
                animationDuration={900}
                animationEasing="ease-out"
              >
                {displayData.map((entry: any, i: number) => {
                  let fill = COLORS[i % COLORS.length];
                  if (hasColorDim && entry._color) fill = pieColorMap.get(entry._color) || fill;
                  if (hasColorMeasure && colorScale) fill = colorScale(entry._colorValue || 0);
                  const opacity = !isDonut ? PIE_OPACITIES[Math.min(i, PIE_OPACITIES.length - 1)] : 1;
                  return <Cell key={`vb-pie-cell-${i}`} fill={fill} stroke="white" strokeWidth={isDonut ? 0 : 2} opacity={opacity} />;
                })}
              </Pie>
              {/* Donut center total text */}
              {isDonut && (
                <>
                  <text x="50%" y="47%" textAnchor="middle" dominantBaseline="central"
                    fill="#122232" style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5, ...ff }}>
                    {donutTotal > 1000 ? formatCurrency(donutTotal) : formatNumber(donutTotal)}
                  </text>
                  <text x="50%" y="56%" textAnchor="middle" dominantBaseline="central"
                    fill="#98989d" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", ...ff }}>
                    TOTAL
                  </text>
                </>
              )}
              <Tooltip key="vb-pie-tip" content={({ active, payload }: any) => {
                if (!active || !payload?.length) return null;
                const p = payload[0];
                const row = p.payload;
                const dimName = [...colShelf, ...rowShelf].find(s => s.field.type === "dimension" || s.field.type === "date")?.field.label;
                const measureName = measureLabels[0] || "Valor";
                return (
                  <div className="px-[12px] py-[7px] rounded-[10px] min-w-[80px]"
                    style={{ backgroundColor: "#28415C", boxShadow: "0px 4px 12px rgba(18,34,50,0.25)", ...ff }}>
                    {dimName && <p style={{ fontSize: 9, fontWeight: 700, color: "#C8CFDB", letterSpacing: 0.3, textTransform: "uppercase", marginBottom: 2 }}>{dimName}</p>}
                    <p style={{ fontSize: 12, fontWeight: 700, color: "white", letterSpacing: -0.3 }}>{p.name}</p>
                    {row?._color && <p style={{ fontSize: 10, fontWeight: 600, color: "#73D0FF", letterSpacing: -0.2 }}>{row._color}</p>}
                    <div className="flex items-center gap-[5px] mt-[2px]">
                      <span className="w-[5px] h-[5px] rounded-full" style={{ backgroundColor: p.payload?.fill || COLORS[0] }} />
                      <span style={{ fontSize: 11, fontWeight: 500, color: "#C8CFDB", letterSpacing: -0.3 }}>
                        {measureName}: {typeof p.value === "number" && p.value > 1000 ? formatCurrency(p.value) : formatNumber(p.value)}
                      </span>
                    </div>
                    {row?._tooltipLabel && row._tooltipValue != null && (
                      <p style={{ fontSize: 10, fontWeight: 500, color: "#C8CFDB", letterSpacing: -0.2, marginTop: 2, borderTop: "1px solid rgba(200,207,219,0.2)", paddingTop: 2 }}>
                        {row._tooltipLabel}: {typeof row._tooltipValue === "number" && row._tooltipValue > 1000 ? formatCurrency(row._tooltipValue) : formatNumber(row._tooltipValue)}
                      </p>
                    )}
                  </div>
                );
              }} />
              <Legend
                key="vb-pie-leg"
                wrapperStyle={{ fontSize: 11, ...ff }}
                formatter={(value: string) => <span style={{ color: "#4E6987", fontSize: 11, fontWeight: 500, letterSpacing: -0.3 }}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        );
      }
      case "scatter": {
        /* ── Rhombus Matrix sub-type ── */
        if (scatterSubType === "matrix") {
          const matMeasureKey = measureLabels[0] || "value";
          const dim1Key = dimLabels[0] || dataKey;
          const dim2Key = dimLabels[1] || null;

          // Build matrix: if 2 dimensions, cross-tabulate; if 1 dimension, use data as heatmap row
          const xCats = [...new Set(limitedData.map((d: any) => String(d[dim1Key] || "")))];
          const yCats = dim2Key
            ? [...new Set(limitedData.map((d: any) => String(d[dim2Key] || "")))]
            : [matMeasureKey];

          // Build value lookup
          const matrixMap = new Map<string, number>();
          let matMin = Infinity, matMax = -Infinity;
          limitedData.forEach((row: any) => {
            const xVal = String(row[dim1Key] || "");
            const yVal = dim2Key ? String(row[dim2Key] || "") : matMeasureKey;
            const v = typeof row[matMeasureKey] === "number" ? row[matMeasureKey] : 0;
            const key = `${xVal}__${yVal}`;
            matrixMap.set(key, (matrixMap.get(key) || 0) + v);
          });
          matrixMap.forEach(v => { if (v < matMin) matMin = v; if (v > matMax) matMax = v; });
          if (matMin === Infinity) matMin = 0;
          if (matMax === -Infinity) matMax = 1;
          const matRange = matMax - matMin || 1;

          // Layout constants
          const PAD_LEFT = 90;
          const PAD_TOP = 50;
          const PAD_RIGHT = 16;
          const PAD_BOTTOM = 60;
          const RHOMBUS_COLOR = "#28415C"; // DS neutral-400

          return (
            <RhombusMatrixChart
              xCats={xCats} yCats={yCats} matrixMap={matrixMap}
              matMin={matMin} matMax={matMax} matRange={matRange}
              padLeft={PAD_LEFT} padTop={PAD_TOP} padRight={PAD_RIGHT} padBottom={PAD_BOTTOM}
              cellSize={52} rhombusColor={RHOMBUS_COLOR}
              filterId="vb-mat-shadow" keyPrefix="vb"
              measureLabel={matMeasureKey}
              shadowColor="#122232" axisColor="#4E6987" gridColor="#DDE3EC"
            />
          );
        }

        // Size mark → bubble chart via ZAxis
        const hasSize = !!marks.size;

        /* ── DS Scatter Series Palette (Figma: 2 hero colors + accent) ── */
        const SCATTER_SERIES = ["#0483AB", "#EAC23D", "#3CCEA7", "#F56233", "#6868B1", "#07ABDE", "#917822", "#ED5200", "#135543", "#4E6987"];
        const scatterColorMap = new Map<string, string>();
        if (hasColorDim) {
          colorValues.forEach((cv, i) => scatterColorMap.set(cv, SCATTER_SERIES[i % SCATTER_SERIES.length]));
        }
        // When no color dim, group by dimension value for series coloring
        const dimSeriesMap = new Map<string, string>();
        const allDimVals: string[] = [];
        {
          const dimVals = [...new Set(limitedData.map((d: any) => String(d[dataKey] || d._category || "")))];
          dimVals.forEach((dv, i) => {
            dimSeriesMap.set(dv, SCATTER_SERIES[i % SCATTER_SERIES.length]);
            allDimVals.push(dv);
          });
        }
        // Use colorDim values if available for legend entries
        const seriesEntries: { name: string; color: string }[] = hasColorDim
          ? colorValues.map((cv, i) => ({ name: cv, color: SCATTER_SERIES[i % SCATTER_SERIES.length] }))
          : allDimVals.filter(Boolean).slice(0, 12).map(dv => ({ name: dv, color: dimSeriesMap.get(dv) || SCATTER_SERIES[0] }));

        // Normalize bubble sizes for visual display
        const sizeKey = hasSize ? "_size" : (measureLabels[0] || "x");
        const sizeVals = limitedData.map((d: any) => typeof d[sizeKey] === "number" ? d[sizeKey] : 0);
        const sMin = Math.min(...sizeVals);
        const sMax = Math.max(...sizeVals);
        const sRange = sMax - sMin || 1;

        // Format value for bubble label (Figma: numeric value inside)
        const fmtBubbleVal = (v: number) => {
          if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
          if (v >= 10_000) return `${(v / 1000).toFixed(0)}k`;
          if (v >= 1000) return `${(v / 1000).toFixed(1)}k`;
          return v % 1 === 0 ? String(Math.round(v)) : v.toFixed(1);
        };

        // Prepare bubble data with normalized sizes and value labels
        const xKey = measureLabels[0] || "x";
        const yKey = measureLabels[1] || "y";
        const allBubbleData = limitedData.map((row: any, idx: number) => {
          const sVal = typeof row[sizeKey] === "number" ? row[sizeKey] : 0;
          const normalizedR = 8 + ((sVal - sMin) / sRange) * 42;
          const dimLabel = row[dataKey] || row._category || "";
          const seriesKey = hasColorDim && row._color ? String(row._color) : String(dimLabel);
          return {
            ...row,
            _bubbleR: normalizedR,
            _bubbleLabel: String(dimLabel),
            _bubbleValueLabel: fmtBubbleVal(sVal),
            _bubbleRawSize: sVal,
            _bubbleIdx: idx,
            _seriesKey: seriesKey,
            _seriesColor: hasColorDim && row._color
              ? scatterColorMap.get(row._color)
              : dimSeriesMap.get(String(dimLabel)) || SCATTER_SERIES[idx % SCATTER_SERIES.length],
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
              cluster.forEach((idx, gi) => {
                if (gi === 0) return;
                const angle = gi * (2 * Math.PI / cluster.length);
                const layer = Math.ceil(gi / 6);
                bubbleData[idx][xKey] = (bubbleData[idx][xKey] || 0) + Math.cos(angle) * spreadX * layer;
                bubbleData[idx][yKey] = (bubbleData[idx][yKey] || 0) + Math.sin(angle) * spreadY * layer;
              });
            }
          }
        })();

        // Custom bubble shape: Figma-inspired with value inside, white stroke, 3-layer depth + hover dimming
        const BubbleDot = (props: any) => {
          const { cx, cy, payload, fill: cellFill } = props;
          if (cx == null || cy == null) return null;
          const r = payload?._bubbleR ?? 20;
          const valLabel = payload?._bubbleValueLabel || "";
          const idx = payload?._bubbleIdx ?? -1;
          const isHovered = hoveredBubbleIdx === idx;
          const isDimmed = hoveredBubbleIdx !== null && hoveredBubbleIdx !== idx;
          const canShowVal = r >= 12;
          const canShowSmallVal = r >= 8 && r < 12;
          const fs = r >= 30 ? Math.min(14, r / 2.8) : r >= 20 ? Math.min(12, r / 2.5) : Math.max(7, r / 2.2);
          const mainOpacity = isDimmed ? 0.22 : isHovered ? 0.95 : 0.82;
          const haloOpacity = isDimmed ? 0.02 : isHovered ? 0.16 : 0.08;
          const midOpacity = isDimmed ? 0.06 : isHovered ? 0.35 : 0.22;
          const strokeW = isHovered ? 2.4 : r > 16 ? 1.8 : 1;
          const strokeOp = isDimmed ? 0.2 : isHovered ? 1 : 0.7;
          const haloR = isHovered ? r + 8 : r + 5;
          return (
            <g>
              {/* Ghost halo (expands on hover) */}
              <circle cx={cx} cy={cy} r={haloR} fill={cellFill} opacity={haloOpacity}
                style={{ transition: "opacity 0.18s ease" }} />
              {/* Mid depth ring */}
              <circle cx={cx} cy={cy} r={r + 1.5} fill={cellFill} opacity={midOpacity}
                style={{ transition: "opacity 0.18s ease" }} />
              {/* Main bubble with white stroke */}
              <circle cx={cx} cy={cy} r={r} fill={cellFill} opacity={mainOpacity}
                stroke="white" strokeWidth={strokeW} strokeOpacity={strokeOp}
                style={{ transition: "opacity 0.18s ease, stroke-width 0.18s ease" }} />
              {/* Gloss highlight */}
              <ellipse cx={cx - r * 0.15} cy={cy - r * 0.2} rx={r * 0.45} ry={r * 0.3}
                fill="white" opacity={isDimmed ? 0.03 : 0.10} />
              {/* Value label inside */}
              {canShowVal && (
                <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central"
                  fill="white" opacity={isDimmed ? 0.3 : 1}
                  style={{ fontSize: fs, fontWeight: 700, letterSpacing: -0.3, transition: "opacity 0.18s ease", ...ff }}>
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

        /* ── Interactive Legend (click to toggle series) ── */
        const ScatterLegend = () => {
          if (seriesEntries.length < 2) return <VBLegend payload={seriesEntries.map(s => ({ value: s.name, color: s.color }))} />;
          return (
            <div className="flex items-center justify-center gap-[6px] flex-wrap mt-[4px] px-[8px]">
              {seriesEntries.map((s, i) => {
                const hidden = scatterHiddenSeries.has(s.name);
                return (
                  <button key={i} type="button"
                    className="flex items-center gap-[4px] rounded-full px-[8px] py-[2px] border transition-all duration-150"
                    style={{
                      borderColor: hidden ? "#DDE3EC" : s.color,
                      backgroundColor: hidden ? "transparent" : `${s.color}0D`,
                      opacity: hidden ? 0.45 : 1,
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setScatterHiddenSeries(prev => {
                        const next = new Set(prev);
                        if (next.has(s.name)) next.delete(s.name); else next.add(s.name);
                        // Don't allow hiding ALL series
                        if (next.size >= seriesEntries.length) return prev;
                        return next;
                      });
                    }}
                  >
                    <span className="w-[7px] h-[7px] rounded-full shrink-0"
                      style={{ backgroundColor: hidden ? "#C8CFDB" : s.color, transition: "background-color 0.15s ease" }} />
                    <span style={{
                      fontSize: 10, fontWeight: 600, letterSpacing: -0.2, color: hidden ? "#98989d" : "#4E6987",
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

        /* ── Zoom selection handlers ── */
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
            // Convert pixel coordinates to data coordinates using chart dimensions
            // We can approximate using data extent and chart area
            const allX = bubbleData.map((d: any) => d[xKey] || 0);
            const allY = bubbleData.map((d: any) => d[yKey] || 0);
            const dataXMin = Math.min(...allX), dataXMax = Math.max(...allX);
            const dataYMin = Math.min(...allY), dataYMax = Math.max(...allY);
            // chart area approx (margin: top:20 right:30 left:65 bottom:20, typical container ~600x400)
            const cLeft = 65, cRight = 30, cTop = 20, cBottom = 20;
            const areaW = Math.max(100, 600 - cLeft - cRight);
            const areaH = Math.max(100, 400 - cTop - cBottom);
            const pxToDataX = (px: number) => dataXMin + ((px - cLeft) / areaW) * (dataXMax - dataXMin);
            const pxToDataY = (px: number) => dataYMax - ((px - cTop) / areaH) * (dataYMax - dataYMin);
            let x1 = pxToDataX(Math.min(scatterZoomStart.x, scatterZoomEnd.x));
            let x2 = pxToDataX(Math.max(scatterZoomStart.x, scatterZoomEnd.x));
            let y1 = pxToDataY(Math.max(scatterZoomStart.y, scatterZoomEnd.y));
            let y2 = pxToDataY(Math.min(scatterZoomStart.y, scatterZoomEnd.y));
            // Only zoom if selection is meaningful
            if (Math.abs(x2 - x1) > (dataXMax - dataXMin) * 0.05 && Math.abs(y2 - y1) > (dataYMax - dataYMin) * 0.05) {
              setScatterZoomDomain({ x: [x1, x2], y: [y1, y2] });
            }
          }
          setScatterZoomStart(null);
          setScatterZoomEnd(null);
        };

        return (
          <div className="relative w-full h-full">
            {/* Zoom reset button */}
            {scatterZoomDomain && (
              <button
                type="button"
                className="absolute top-[4px] right-[8px] z-10 flex items-center gap-[3px] px-[8px] py-[3px] rounded-full border border-[#DDE3EC] bg-white hover:bg-[#F6F7F9] transition-colors"
                style={{ fontSize: 9, fontWeight: 600, color: "#4E6987", letterSpacing: -0.2, ...ff }}
                onClick={() => setScatterZoomDomain(null)}
              >
                <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M3 8l3-3M3 8l3 3" stroke="#4E6987" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Reset Zoom
              </button>
            )}
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
                onMouseDown={handleZoomMouseDown}
                onMouseMove={handleZoomMouseMove}
                onMouseUp={handleZoomMouseUp}
              >
                <CartesianGrid key="vb-scat-grid" strokeDasharray="none" stroke="#DDE3EC" strokeOpacity={0.3} vertical />
                <XAxis key="vb-scat-x" dataKey={xKey} name={measureLabels[0] || "X"} type="number"
                  tick={<VBAxisTick />} axisLine={{ stroke: "#DDE3EC", strokeWidth: 1 }} tickLine={false}
                  domain={scatterZoomDomain ? scatterZoomDomain.x : ["auto", "auto"]}
                  allowDataOverflow={!!scatterZoomDomain}
                />
                <YAxis key="vb-scat-y" dataKey={yKey} name={measureLabels[1] || "Y"} type="number"
                  tick={<VBYAxisTick />} axisLine={false} tickLine={false} width={55}
                  domain={scatterZoomDomain ? scatterZoomDomain.y : ["auto", "auto"]}
                  allowDataOverflow={!!scatterZoomDomain}
                />
                {hasSize && <ZAxis key="vb-scat-z" dataKey="_size" range={[60, 800]} name={marks.size!.label} />}
                {/* ── Crosshair guides (dashed lines to axes on hover) ── */}
                {scatterCrosshair && (
                  <>
                    <ReferenceLine key="vb-ch-x" x={scatterCrosshair.x} stroke="#4E6987" strokeDasharray="3 3" strokeOpacity={0.35} strokeWidth={1} />
                    <ReferenceLine key="vb-ch-y" y={scatterCrosshair.y} stroke="#4E6987" strokeDasharray="3 3" strokeOpacity={0.35} strokeWidth={1} />
                  </>
                )}
                {/* ── Zoom selection rect ── */}
                {scatterZoomStart && scatterZoomEnd && (() => {
                  // Draw reference area approximation — we use data coords
                  // Since we only have pixel coords during drag, render via customized layer
                  return null;
                })()}
                <Tooltip key="vb-scat-tip" cursor={false} content={({ active, payload }: any) => {
                  if (!active || !payload?.length) return null;
                  const p = payload[0]?.payload;
                  if (!p) return null;
                  const seriesColor = p._seriesColor || SCATTER_SERIES[0];
                  return (
                    <div className="px-[14px] py-[8px] rounded-[10px] min-w-[100px]"
                      style={{ backgroundColor: "#28415C", boxShadow: "0px 4px 16px rgba(18,34,50,0.30)", ...ff }}>
                      {p._bubbleLabel && (
                        <p style={{ fontSize: 10, fontWeight: 700, color: "#C8CFDB", letterSpacing: 0.3, textTransform: "uppercase", marginBottom: 3 }}>
                          {p._bubbleLabel}
                        </p>
                      )}
                      {measureLabels.map((m: string, mi: number) => (
                        <div key={mi} className="flex items-center gap-[6px]">
                          <span className="w-[6px] h-[6px] rounded-full shrink-0" style={{ backgroundColor: mi === 0 ? seriesColor : SCATTER_SERIES[mi % SCATTER_SERIES.length] }} />
                          <span style={{ fontSize: 11, fontWeight: 500, color: "#C8CFDB" }}>{m}:</span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: "white", letterSpacing: -0.3 }}>
                            {typeof p[m] === "number" && p[m] > 1000 ? formatCurrency(p[m]) : formatNumber(p[m])}
                          </span>
                        </div>
                      ))}
                      {hasSize && marks.size && (
                        <div className="flex items-center gap-[6px] mt-[2px]" style={{ borderTop: "1px solid rgba(200,207,219,0.15)", paddingTop: 3 }}>
                          <span style={{ fontSize: 10, fontWeight: 500, color: "#C8CFDB" }}>{marks.size.label}:</span>
                          <span style={{ fontSize: 12, fontWeight: 700, color: "white" }}>
                            {typeof p._size === "number" && p._size > 1000 ? formatCurrency(p._size) : formatNumber(p._size)}
                          </span>
                        </div>
                      )}
                      {p._tooltipLabel && p._tooltipValue != null && (
                        <p style={{ fontSize: 10, fontWeight: 500, color: "#C8CFDB", marginTop: 2, borderTop: "1px solid rgba(200,207,219,0.15)", paddingTop: 3 }}>
                          {p._tooltipLabel}: {typeof p._tooltipValue === "number" && p._tooltipValue > 1000 ? formatCurrency(p._tooltipValue) : formatNumber(p._tooltipValue)}
                        </p>
                      )}
                    </div>
                  );
                }} />
                <Legend key="vb-scat-leg" content={<ScatterLegend />} />
                <Scatter key="vb-scatter" data={bubbleData} fill="#0483AB" shape={<BubbleDot />}
                  animationDuration={800} animationEasing="ease-out"
                  onMouseEnter={handleBubbleEnter}
                  onMouseLeave={handleBubbleLeave}
                >
                  {bubbleData.map((entry: any, i: number) => {
                    let fill = entry._seriesColor || SCATTER_SERIES[i % SCATTER_SERIES.length];
                    if (hasColorDim && entry._color) fill = scatterColorMap.get(entry._color) || fill;
                    if (hasColorMeasure && colorScale) fill = colorScale(entry._colorValue || 0);
                    return <Cell key={`vb-scat-cell-${i}`} fill={fill} />;
                  })}
                  {showLabel && <LabelList dataKey="_bubbleLabel" position="top" style={{ fontSize: 9, fill: "#4E6987", fontWeight: 600, letterSpacing: -0.2, ...ff }} />}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        );
      }
      case "treemap": {
        const treeMeasureKey = measureLabels[0] || "value";
        const treeNameKey = dataKey || "_category";
        const treemapData = limitedData.map((row: any, idx: number) => ({
          name: String(row[treeNameKey] || `Item ${idx + 1}`),
          size: typeof row[treeMeasureKey] === "number" ? row[treeMeasureKey] : 0,
          fill: COLORS[idx % COLORS.length],
        }));

        const VBTreemapContent = (props: any) => {
          const { x, y, width, height, name, fill, index } = props;
          if (!width || !height || width < 30 || height < 20) return null;
          const opacities = [0.85, 0.65, 0.50, 0.38, 0.28, 0.20];
          const opacity = opacities[Math.min(index ?? 0, opacities.length - 1)];
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
          <ResponsiveContainer width="100%" height="100%">
            <RTreemap data={treemapData} dataKey="size" nameKey="name" stroke="#fff"
              content={<VBTreemapContent />} animationDuration={600}>
              <Tooltip key="vb-tree-tip" content={<RichChartTooltip dimFieldLabel={treeNameKey} />}
                formatter={(value: any) => [typeof value === "number" && value > 1000 ? formatCurrency(value) : formatNumber(value), treeMeasureKey]} />
            </RTreemap>
          </ResponsiveContainer>
        );
      }
      case "radar": {
        const radarMeasureKey = measureLabels[0] || "value";
        const radarDimKey = dataKey || "_category";
        const radarData = limitedData.map((row: any, idx: number) => ({
          category: String(row[radarDimKey] || `Item ${idx + 1}`),
          value: typeof row[radarMeasureKey] === "number" ? row[radarMeasureKey] : 0,
          fullMark: 100,
          _idx: idx,
        }));
        const radarMax = Math.max(...radarData.map(d => d.value), 1);
        const radarNormalized = radarData.map(d => ({ ...d, normalized: (d.value / radarMax) * 100, fullMark: 100 }));

        /* ── Spider (Classic Radar) — Figma polygon grid + 3-layer depth ── */
        if (polarSubType === "spider") {
          const spiderColor = COLORS[0];
          const spiderMax = radarMax;
          return (
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="68%" data={radarNormalized}>
                <PolarGrid key="vb-spider-pgrid" gridType="polygon" stroke={DS_NEUTRAL_BORDER} strokeOpacity={0.7} />
                <PolarAngleAxis
                  key="vb-spider-angle"
                  dataKey="category"
                  tick={({ x, y, payload, cx: acx, cy: acy }: any) => {
                    const label = typeof payload.value === "string" && payload.value.length > 12
                      ? payload.value.slice(0, 11) + "\u2026" : payload.value;
                    const dx = x - acx; const dy = y - acy;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const nudge = 12;
                    const nx = x + (dx / (dist || 1)) * nudge;
                    const ny = y + (dy / (dist || 1)) * nudge;
                    const anchor = Math.abs(dx) < 5 ? "middle" : dx > 0 ? "start" : "end";
                    return (
                      <text x={nx} y={ny} textAnchor={anchor} dominantBaseline="central"
                        fill="#4E6987" style={{ fontSize: 11, fontWeight: 600, letterSpacing: -0.2, ...ff }}>
                        {label}
                      </text>
                    );
                  }}
                />
                <PolarRadiusAxis key="vb-spider-radius" angle={90} domain={[0, 100]} axisLine={false}
                  tick={({ x, y, payload }: any) => {
                    if (payload.value === 0) return <g />;
                    const realVal = Math.round((payload.value / 100) * spiderMax);
                    return (
                      <g>
                        <rect x={x - 14} y={y - 8} width={28} height={16} rx={3} fill="white"
                          stroke={DS_NEUTRAL_BORDER} strokeWidth={0.8}
                          style={{ filter: "drop-shadow(0px 1px 3px rgba(84,110,122,0.15))" }} />
                        <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="central"
                          fill={DS_NEUTRAL_400} style={{ fontSize: 9, fontWeight: 600, letterSpacing: 0.2, ...ff }}>
                          {realVal > 999 ? `${(realVal / 1000).toFixed(0)}k` : realVal}
                        </text>
                      </g>
                    );
                  }}
                  tickCount={6}
                />
                {/* Layer 1 — light ghost fill (3-layer stacked depth) */}
                <Radar key="vb-spider-ghost" dataKey="normalized" name="_ghost"
                  stroke="none" fill={spiderColor} fillOpacity={0.08}
                  dot={false} isAnimationActive={false} legendType="none" />
                {/* Layer 2 — main fill + stroke + dots */}
                <Radar key="vb-spider-main" name={measureLabels[0] || "Valor"} dataKey="normalized"
                  stroke={spiderColor} strokeWidth={2} fill={spiderColor} fillOpacity={0.22}
                  dot={{ r: 4, fill: spiderColor, stroke: "#fff", strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: spiderColor, stroke: "#fff", strokeWidth: 2.5 }}
                  animationDuration={800} animationEasing="ease-out" />
                <Tooltip key="vb-spider-tip" content={({ active, payload }: any) => {
                  if (!active || !payload?.length) return null;
                  const p = payload.find((e: any) => e.name !== "_ghost")?.payload || payload[0]?.payload;
                  return (
                    <div className="px-[12px] py-[7px] rounded-[10px]"
                      style={{ backgroundColor: "#28415C", boxShadow: "0px 4px 12px rgba(18,34,50,0.25)" }}>
                      <p style={{ fontSize: 9, fontWeight: 700, color: "#C8CFDB", letterSpacing: 0.3, textTransform: "uppercase", marginBottom: 2, ...ff }}>
                        {p?.category}
                      </p>
                      <div className="flex items-center gap-[5px]">
                        <span className="w-[5px] h-[5px] rounded-full" style={{ backgroundColor: spiderColor }} />
                        <span style={{ fontSize: 11, fontWeight: 500, color: "#C8CFDB", ...ff }}>{measureLabels[0] || "Valor"}:</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: "white", letterSpacing: -0.3, ...ff }}>
                          {typeof p?.value === "number" && p.value > 1000 ? formatCurrency(p.value) : formatNumber(p?.value)}
                        </span>
                      </div>
                    </div>
                  );
                }} />
                <Legend key="vb-spider-leg" content={<VBLegend />} />
              </RadarChart>
            </ResponsiveContainer>
          );
        }

        /* ── Rose (Nightingale / Coxcomb) ── */
        if (polarSubType === "rose") {
          const roseMax = Math.max(...radarData.map(d => d.value), 1);
          const roseData = radarData.map((d, i) => ({
            ...d,
            fill: COLORS[i % COLORS.length],
            outerR: 20 + (d.value / roseMax) * 80,
          }));
          const angleStep = 360 / roseData.length;
          const svgCx = 200, svgCy = 200, svgMaxR = 140;
          const gridRings = [0.25, 0.5, 0.75, 1.0];

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
            <div className="flex items-center justify-center w-full h-full">
              <svg viewBox="0 0 400 400" width="100%" height="100%" style={{ maxWidth: 400, maxHeight: 400 }}>
                {gridRings.map((pct, i) => (
                  <circle key={`ring-${i}`} cx={svgCx} cy={svgCy} r={svgMaxR * pct}
                    fill="none" stroke={DS_NEUTRAL_BORDER} strokeWidth={1} strokeDasharray="3 3" strokeOpacity={0.5} />
                ))}
                {roseData.map((d, i) => {
                  const start = i * angleStep;
                  const end = start + angleStep - 1.5;
                  const r = (d.outerR / 100) * svgMaxR;
                  const opacities = [0.85, 0.72, 0.60, 0.50, 0.42, 0.35];
                  const opacity = opacities[Math.min(i, opacities.length - 1)];
                  return (
                    <g key={`rose-${i}`}>
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
                    <text key={`lbl-${i}`} x={lx} y={ly}
                      textAnchor={Math.abs(midAngle - 180) < 5 || Math.abs(midAngle) < 5 || midAngle > 355 ? "middle" : anchor}
                      dominantBaseline="central" fill={DS_NEUTRAL_MUTED}
                      style={{ fontSize: 9, fontWeight: 500, letterSpacing: -0.2, ...ff }}>
                      {label}
                    </text>
                  );
                })}
                <circle cx={svgCx} cy={svgCy} r={3} fill={DS_NEUTRAL_400} opacity={0.3} />
              </svg>
            </div>
          );
        }

        /* ── Polar Grid (Pie on polar concentric grid) ── */
        const polarMax = Math.max(...radarData.map(d => d.value), 1);
        const polarData = radarData.map((d, i) => ({
          ...d,
          fill: COLORS[i % COLORS.length],
          outerPct: 30 + (d.value / polarMax) * 70,
        }));

        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              {[0.25, 0.5, 0.75, 1.0].map((pct, i) => (
                <Pie key={`vb-pgrid-${i}`} data={[{ value: 1 }]} dataKey="value"
                  cx="50%" cy="50%" outerRadius={`${pct * 72}%`} innerRadius={`${Math.max(0, pct * 72 - 0.5)}%`}
                  isAnimationActive={false} stroke="none">
                  <Cell key={`vb-pgrid-cell-${i}`} fill={DS_NEUTRAL_BORDER} opacity={0.4} />
                </Pie>
              ))}
              <Pie key="vb-polar-data" data={polarData} cx="50%" cy="50%" innerRadius={0} outerRadius="68%"
                dataKey="value" nameKey="category" paddingAngle={0} stroke="none"
                label={({ cx: pcx, cy: pcy, midAngle, outerRadius: or, name, value, percent }: any) => {
                  const RAD = Math.PI / 180;
                  const sin = Math.sin(-RAD * midAngle);
                  const cos = Math.cos(-RAD * midAngle);
                  const sx = pcx + (or + 4) * cos;
                  const sy = pcy + (or + 4) * sin;
                  const ex = pcx + (or + 22) * cos;
                  const ey = pcy + (or + 22) * sin;
                  const anchor = cos >= 0 ? "start" : "end";
                  const dName = typeof name === "string" && name.length > 10 ? name.slice(0, 9) + "\u2026" : name;
                  return (
                    <g>
                      <path d={`M${sx},${sy}L${ex},${ey}`} stroke={DS_NEUTRAL_BORDER} strokeWidth={1} fill="none" opacity={0.6} />
                      <text x={ex + (cos >= 0 ? 3 : -3)} y={ey - 4} textAnchor={anchor}
                        fill={DS_NEUTRAL_400} style={{ fontSize: 10, fontWeight: 600, letterSpacing: -0.2, ...ff }}>
                        {dName}
                      </text>
                      <text x={ex + (cos >= 0 ? 3 : -3)} y={ey + 8} textAnchor={anchor}
                        fill={DS_NEUTRAL_MUTED} style={{ fontSize: 9, fontWeight: 500, ...ff }}>
                        {typeof value === "number" && value > 1000 ? formatCurrency(value) : formatNumber(value)} ({(percent * 100).toFixed(0)}%)
                      </text>
                    </g>
                  );
                }}
                labelLine={false}
                animationDuration={800} animationEasing="ease-out">
                {polarData.map((d, i) => {
                  const opacities = [0.85, 0.70, 0.55, 0.42, 0.32, 0.24];
                  return <Cell key={`vb-polar-cell-${i}`} fill={d.fill} stroke="white" strokeWidth={2}
                    opacity={opacities[Math.min(i, opacities.length - 1)]} />;
                })}
              </Pie>
              <Tooltip key="vb-polar-tip" content={({ active, payload }: any) => {
                if (!active || !payload?.length) return null;
                const p = payload[0];
                return (
                  <div className="px-[12px] py-[7px] rounded-[10px]"
                    style={{ backgroundColor: "#28415C", boxShadow: "0px 4px 12px rgba(18,34,50,0.25)" }}>
                    <p style={{ fontSize: 12, fontWeight: 700, color: "white", ...ff }}>{p.name}</p>
                    <div className="flex items-center gap-[5px] mt-[2px]">
                      <span className="w-[5px] h-[5px] rounded-full" style={{ backgroundColor: p.payload?.fill }} />
                      <span style={{ fontSize: 11, fontWeight: 500, color: "#C8CFDB", ...ff }}>
                        {measureLabels[0] || "Valor"}: {typeof p.value === "number" && p.value > 1000 ? formatCurrency(p.value) : formatNumber(p.value)}
                      </span>
                    </div>
                  </div>
                );
              }} />
              <Legend key="vb-polar-leg" wrapperStyle={{ fontSize: 11, ...ff }}
                formatter={(value: string) => <span style={{ color: "#4E6987", fontSize: 11, fontWeight: 500, letterSpacing: -0.3 }}>{value}</span>} />
            </PieChart>
          </ResponsiveContainer>
        );
      }
      case "sankey": {
        // Sankey needs 2 dimensions (source + target) + 1 measure (value)
        const sankeyDim1 = dimLabels[0] || dataKey;
        const sankeyDim2 = dimLabels[1] || null;
        const sankeyMeasure = measureLabels[0] || "value";

        if (!sankeyDim2) {
          return (
            <div className="flex flex-col items-center justify-center h-full gap-2 text-[#98989d]" style={{ ...ff }}>
              <FunnelSimple size={32} weight="duotone" />
              <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: -0.3 }}>
                Arraste 2 dimensões + 1 medida para gerar o Sankey
              </span>
              <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: -0.2 }}>
                Ex: Etapa Origem → Etapa Destino + Valor
              </span>
            </div>
          );
        }

        const sankeyLinks: SankeyLink[] = limitedData
          .filter((row: any) => row[sankeyDim1] && row[sankeyDim2])
          .map((row: any) => ({
            source: String(row[sankeyDim1]),
            target: String(row[sankeyDim2]),
            value: typeof row[sankeyMeasure] === "number" ? row[sankeyMeasure] : 1,
          }));

        return (
          <SankeyChart
            links={sankeyLinks}
            sourceLabel={sankeyDim1}
            targetLabel={sankeyDim2}
          />
        );
      }
      case "table": {
        const baseTableKeys = Object.keys(limitedData[0] || {}).filter(k => !k.startsWith("_"));
        // Marks: label → add extra column if label field is not already a visible column
        const labelColName = marks.label ? (marks.label.label || marks.label.name) : null;
        const labelAlreadyInTable = labelColName ? baseTableKeys.includes(labelColName) : false;
        const labelExtraCol = labelColName && !labelAlreadyInTable ? `${labelColName} (Rótulo)` : null;
        // Marks: label on existing column → we'll highlight it
        const labelHighlightCol = labelColName && labelAlreadyInTable ? labelColName : null;
        // Marks: tooltip → add extra column if not already visible, or highlight existing
        const tooltipFieldLabel = marks.tooltip ? (marks.tooltip.label || marks.tooltip.name) : null;
        const tooltipAlreadyInTable = tooltipFieldLabel ? baseTableKeys.includes(tooltipFieldLabel) : false;
        const tooltipExtraCol = tooltipFieldLabel && !tooltipAlreadyInTable ? `${tooltipFieldLabel} (Tooltip)` : null;
        const tooltipHighlightCol = tooltipFieldLabel && tooltipAlreadyInTable ? tooltipFieldLabel : null;
        const tooltipColName = tooltipExtraCol; // alias for summary remap
        const extraCols = [labelExtraCol, tooltipExtraCol].filter(Boolean) as string[];
        const tableKeys = [...baseTableKeys, ...extraCols];
        const SUMMARY_AGG_OPTIONS = [
          { value: "sum", label: "Soma" },
          { value: "avg", label: "Média" },
          { value: "count", label: "Contagem" },
          { value: "countd", label: "Distintos" },
          { value: "min", label: "Mínimo" },
          { value: "max", label: "Máximo" },
          { value: "median", label: "Mediana" },
          { value: "none", label: "Nenhum" },
        ];
        // Build label→format and label→name maps from shelf fields for correct summary formatting
        const CURRENCY_NAMES = new Set(["spend", "cost", "cpc", "cpm", "cpv", "cost_per_click", "cost_per_impression", "budget", "daily_budget", "cost_per_conversion", "cost_per_result", "cost_per_lead", "cost_per_purchase", "cost_per_add_to_cart", "cost_per_landing_page_view", "cost_per_link_click", "cost_per_unique_click", "cost_per_lead_offline", "cost_per_lead_website", "cost_per_lead_on_meta", "social_spend", "revenue"]);
        const PERCENT_NAMES = new Set(["ctr", "conversion_rate", "bounce_rate", "view_rate", "unique_ctr", "inline_link_click_ctr", "search_impression_share"]);
        const RATIO_NAMES = new Set(["roas", "frequency"]);
        const labelFormatMap = new Map<string, string>();
        const labelNameMap = new Map<string, string>();
        [...colShelf, ...rowShelf].forEach(s => {
          const f = s.field;
          labelNameMap.set(f.label, f.name);
          if (f.format) { labelFormatMap.set(f.label, f.format); }
          else if (CURRENCY_NAMES.has(f.name)) { labelFormatMap.set(f.label, "currency"); }
          else if (PERCENT_NAMES.has(f.name)) { labelFormatMap.set(f.label, "percent"); }
          else if (RATIO_NAMES.has(f.name)) { labelFormatMap.set(f.label, "ratio"); }
        });
        const isCurrencyCol = (k: string) => labelFormatMap.get(k) === "currency" || CURRENCY_NAMES.has(labelNameMap.get(k) || k);
        const isPercentCol = (k: string) => labelFormatMap.get(k) === "percent" || PERCENT_NAMES.has(labelNameMap.get(k) || k);
        const isRatioCol = (k: string) => labelFormatMap.get(k) === "ratio" || RATIO_NAMES.has(labelNameMap.get(k) || k);

        const computeSummary = (colKey: string, fn: string): string => {
          // For extra mark columns, remap to internal keys
          const effectiveKey = colKey === labelExtraCol ? "_labelValue" : colKey === tooltipColName ? "_tooltipValue" : colKey;
          const vals = limitedData
            .map(r => r[effectiveKey])
            .map(v => typeof v === "number" ? v : (typeof v === "string" && v !== "" && !isNaN(Number(v)) ? Number(v) : null))
            .filter((v): v is number => v !== null);
          if (vals.length === 0) return "-";
          let result: number;
          switch (fn) {
            case "sum": result = vals.reduce((a, b) => a + b, 0); break;
            case "avg": result = vals.reduce((a, b) => a + b, 0) / vals.length; break;
            case "count": return vals.length.toLocaleString("pt-BR");
            case "countd": return new Set(vals).size.toLocaleString("pt-BR");
            case "min": result = Math.min(...vals); break;
            case "max": result = Math.max(...vals); break;
            case "median": {
              const sorted = [...vals].sort((a, b) => a - b);
              const mid = Math.floor(sorted.length / 2);
              result = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
              break;
            }
            case "none": return "-";
            default: result = vals.reduce((a, b) => a + b, 0); break;
          }
          if (isCurrencyCol(colKey)) return `R$ ${result.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
          if (isPercentCol(colKey)) {
            const pct = result <= 1 && result >= 0 ? result * 100 : result;
            return `${pct.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`;
          }
          if (isRatioCol(colKey)) return `${result.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}x`;
          return result.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
        };

        const getDefaultFn = (colKey: string): string => {
          if (isPercentCol(colKey) || isRatioCol(colKey)) return "avg";
          if (isCurrencyCol(colKey)) {
            const name = labelNameMap.get(colKey) || colKey;
            if (name.startsWith("cost_per") || name === "cpc" || name === "cpm" || name === "cpv") return "avg";
            return "sum";
          }
          // For extra mark columns, remap to internal keys
          const effectiveKey = colKey === labelExtraCol ? "_labelValue" : colKey === tooltipColName ? "_tooltipValue" : colKey;
          const firstVal = limitedData[0]?.[effectiveKey];
          const isNumeric = typeof firstVal === "number" || (typeof firstVal === "string" && firstVal !== "" && !isNaN(Number(firstVal)));
          if (isNumeric) return "sum";
          return "count";
        };

        return (
          <div className="overflow-auto h-full relative" style={{ position: "relative" }}>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#DDE3EC]">
                  {tableKeys.map(key => {
                    const isLabelCol = key === labelHighlightCol || key === labelExtraCol;
                    const isTooltipCol = key === tooltipExtraCol || key === tooltipHighlightCol;
                    const isSpecialCol = isLabelCol || isTooltipCol;
                    return (
                      <th key={key} className={`px-3 py-2 sticky top-0 ${isSpecialCol ? "text-[#0483AB] bg-[#F0FAFF]" : "text-[#122232] bg-[#F6F7F9]"}`}
                        style={{ fontSize: 11, fontWeight: 700, letterSpacing: -0.3, ...ff }}>{key}</th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {limitedData.map((row, i) => {
                  // Color mark: compute row background tint for table
                  let rowBg: string | undefined;
                  if (hasColorDim && row._color) {
                    const cIdx = colorValues.indexOf(row._color);
                    if (cIdx >= 0) rowBg = `${COLORS[cIdx % COLORS.length]}10`;
                  }
                  if (hasColorMeasure && colorScale && row._colorValue != null) {
                    rowBg = `${colorScale(row._colorValue)}15`;
                  }
                  // Marks: tooltip text for this row
                  const tooltipText = marks.tooltip && row._tooltipLabel && row._tooltipValue != null
                    ? (() => {
                        const tv = row._tooltipValue;
                        let formatted: string;
                        if (typeof tv === "number") {
                          if (isCurrencyCol(row._tooltipLabel)) formatted = `R$ ${tv.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                          else if (isPercentCol(row._tooltipLabel)) {
                            const pct = tv <= 1 && tv >= 0 ? tv * 100 : tv;
                            formatted = `${pct.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`;
                          } else formatted = tv.toLocaleString("pt-BR");
                        } else formatted = String(tv);
                        return `${row._tooltipLabel}: ${formatted}`;
                      })()
                    : null;
                  return (
                  <tr key={i} className="border-b border-[#EEF1F6] hover:bg-[#F6F7F9] transition-colors group/row"
                    style={rowBg ? { backgroundColor: rowBg } : undefined}
                    title={tooltipText || undefined}>
                    {Object.entries(row).filter(([k]) => !k.startsWith("_")).map(([key, val], j) => {
                      const isHL = key === labelHighlightCol;
                      return (
                        <td key={j} className={`px-3 py-2 ${isHL ? "text-[#0483AB] bg-[#F0FAFF]/50" : "text-[#122232]"}`}
                          style={{ fontSize: 12, fontWeight: isHL ? 700 : 500, letterSpacing: -0.3, ...ff }}>
                          {(() => {
                            const num = typeof val === "number" ? val : (typeof val === "string" && val !== "" && !isNaN(Number(val)) ? Number(val) : null);
                            const isCurrency = isCurrencyCol(key);
                            const isPercent = isPercentCol(key);
                            if (num !== null && isCurrency) {
                              return `R$ ${num.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                            }
                            if (num !== null && isPercent) {
                              const pct = num <= 1 && num >= 0 ? num * 100 : num;
                              return `${pct.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`;
                            }
                            if (num !== null && typeof val === "number") {
                              return num.toLocaleString("pt-BR");
                            }
                            return String(val ?? "-");
                          })()}
                        </td>
                      );
                    })}
                    {/* Marks: label extra column — show _labelValue */}
                    {labelExtraCol && (
                      <td className="px-3 py-2 text-[#0483AB] bg-[#F0FAFF]/50"
                        style={{ fontSize: 12, fontWeight: 700, letterSpacing: -0.3, ...ff }}>
                        {(() => {
                          const lv = row._labelValue;
                          if (lv == null) return "-";
                          if (typeof lv === "number") {
                            if (isCurrencyCol(labelColName || "")) return `R$ ${lv.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                            if (isPercentCol(labelColName || "")) {
                              const pct = lv <= 1 && lv >= 0 ? lv * 100 : lv;
                              return `${pct.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`;
                            }
                            return lv.toLocaleString("pt-BR");
                          }
                          return String(lv);
                        })()}
                      </td>
                    )}
                    {/* Marks: tooltip extra column — show _tooltipValue */}
                    {tooltipColName && (
                      <td className="px-3 py-2 text-[#0483AB] bg-[#F0FAFF]/50"
                        style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.3, ...ff }}>
                        {(() => {
                          const tv = row._tooltipValue;
                          if (tv == null) return "-";
                          if (typeof tv === "number") {
                            const tLabel = marks.tooltip?.label || "";
                            if (isCurrencyCol(tLabel)) return `R$ ${tv.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                            if (isPercentCol(tLabel)) {
                              const pct = tv <= 1 && tv >= 0 ? tv * 100 : tv;
                              return `${pct.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`;
                            }
                            return tv.toLocaleString("pt-BR");
                          }
                          return String(tv);
                        })()}
                      </td>
                    )}
                  </tr>
                  );
                })}
              </tbody>
              {showSummaryRow && (
                <tfoot>
                  <tr className="border-t-2 border-[#07ABDE] bg-[#F0FAFF] sticky bottom-0">
                    {tableKeys.map(colKey => {
                      const fn = summaryFunctions[colKey] || getDefaultFn(colKey);
                      const fnLabel = SUMMARY_AGG_OPTIONS.find(o => o.value === fn)?.label || fn;
                      return (
                        <td key={`summary-${colKey}`} className="px-3 py-2 relative"
                          style={{ fontSize: 12, fontWeight: 700, letterSpacing: -0.3, ...ff }}>
                          <div className="flex flex-col gap-0.5">
                            <button
                              onClick={(e) => { e.stopPropagation(); setEditingSummaryCol(editingSummaryCol === colKey ? null : colKey); }}
                              className="text-[#07ABDE] hover:text-[#0590BD] text-left cursor-pointer flex items-center gap-1 transition-colors"
                              style={{ fontSize: 9, fontWeight: 600, letterSpacing: 0.3, textTransform: "uppercase" }}
                            >
                              {fnLabel}
                              <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M2 3L4 5L6 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </button>
                            <span className="text-[#122232]">{computeSummary(colKey, fn)}</span>
                          </div>
                          {editingSummaryCol === colKey && (
                            <div className="absolute bottom-full left-0 mb-1 bg-white rounded-lg shadow-lg border border-[#DDE3EC] py-1 z-50 min-w-[120px]"
                              onClick={(e) => e.stopPropagation()}>
                              {SUMMARY_AGG_OPTIONS.map(opt => (
                                <button key={opt.value}
                                  onClick={() => {
                                    setSummaryFunctions(prev => ({ ...prev, [colKey]: opt.value }));
                                    setEditingSummaryCol(null);
                                  }}
                                  className={`w-full text-left px-3 py-1.5 hover:bg-[#F0FAFF] transition-colors cursor-pointer flex items-center justify-between ${fn === opt.value ? "text-[#07ABDE] bg-[#F0FAFF]" : "text-[#122232]"}`}
                                  style={{ fontSize: 11, fontWeight: fn === opt.value ? 700 : 500, letterSpacing: -0.3, ...ff }}
                                >
                                  {opt.label}
                                  {fn === opt.value && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="#07ABDE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                                </button>
                              ))}
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        );
      }
      default:
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 16, right: 24, left: 8, bottom: 48 }} barCategoryGap="20%">
              <CartesianGrid key="vb-def-grid" strokeDasharray="none" stroke={DS_NEUTRAL_BORDER} strokeOpacity={0.5} vertical={false} />
              <XAxis key="vb-def-x" dataKey={dataKey} tick={<VBAxisTick angle={chartData.length > 8 ? -40 : 0} />}
                axisLine={{ stroke: DS_NEUTRAL_BORDER, strokeWidth: 1 }} tickLine={false}
                height={chartData.length > 8 ? 70 : 40} />
              <YAxis key="vb-def-y" tick={<VBYAxisTick />} axisLine={false} tickLine={false} width={55} />
              <Tooltip key="vb-def-tip" content={<RichChartTooltip dimFieldLabel={dataKey} />} cursor={{ fill: "rgba(7,171,222,0.06)", radius: 3 }} />
              <Legend key="vb-def-leg" content={<VBLegend />} />
              {renderBars(false)}
            </BarChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* ── Toolbar ── */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-4 py-2 bg-white border-b border-[#EEF1F6] shrink-0 rounded-t-[16px]">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-[31px] rounded-[8px] bg-[#DDE3EC]">
            <PresentationChart size={18} weight="duotone" className="text-[#28415C]" />
          </div>
          <input
            value={sheetName}
            onChange={e => setSheetName(e.target.value)}
            className="text-[#122232] bg-transparent border-none outline-none hover:bg-[#F6F7F9] focus:bg-[#F6F7F9] px-2 py-1 rounded-[8px] transition-colors"
            style={{ fontSize: 15, fontWeight: 700, letterSpacing: -0.5, ...ff }}
          />
          
        </div>
        <div className="flex items-center gap-[8px]">
          <button onClick={() => setAgentOpen(true)}
            className="group/turing flex items-center gap-[6px] h-[34px] px-[16px] rounded-[500px] bg-[#F6F7F9] text-[#4E6987] hover:bg-white hover:shadow-[0_2px_12px_rgba(140,140,212,0.35),0_4px_16px_rgba(7,171,222,0.2),0_6px_20px_rgba(60,206,167,0.15)] transition-all duration-200 cursor-pointer border border-transparent"
            title="Pergunte ao Turing">
            <Atom size={14} weight="bold" className="text-[#4E6987] group-hover/turing:animate-[turing-icon-hover_1.5s_linear_infinite]" />
            <span className="font-bold uppercase tracking-[0.5px] [-webkit-background-clip:text] [background-clip:text] [background-size:200%_100%] group-hover/turing:animate-[turing-text-hover_3s_linear_infinite] group-hover/turing:text-transparent transition-colors duration-300" style={{ fontSize: 10, backgroundImage: TURING_GRADIENT_LOOP, backgroundRepeat: "repeat", ...ff }}>
              Pergunte ao Turing
            </span>
          </button>
          <div className="flex items-center gap-[10px] bg-[#F6F7F9] rounded-[100px] h-[44px] px-[5px]">
            <button onClick={() => setSaveModal(true)}
              className="flex items-center justify-center size-[32px] rounded-full bg-transparent text-[#0483AB] hover:bg-[#DCF0FF] transition-colors cursor-pointer"
              title="Salvar">
              <FloppyDisk size={18} weight="bold" />
            </button>
            <button onClick={resetAll}
              className="flex items-center justify-center size-[32px] rounded-full bg-transparent text-[#0483AB] hover:bg-[#DCF0FF] transition-colors cursor-pointer"
              title="Limpar">
              <Broom size={18} weight="bold" />
            </button>
            <button onClick={() => {
                if (window.history.length > 1) {
                  navigate(-1);
                } else {
                  navigate("/estudio/dashboards/recentes");
                }
              }}
              className="flex items-center justify-center size-[32px] rounded-full bg-transparent text-[#0483AB] hover:bg-[#DCF0FF] transition-colors cursor-pointer"
              title="Fechar">
              <X size={18} weight="bold" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Area ── */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* ── LEFT COLUMN: Data Pane + Analytics ── */}
        <div className="w-[240px] min-w-[240px] bg-white border-r border-[#EEF1F6] flex flex-col overflow-hidden">
          {/* Tabs: Data / Analytics */}
          <div className="relative flex items-center gap-[4px] h-[44px] p-[4px] bg-[#F6F7F9] rounded-[100px] w-[216px] ml-3 my-2">
            <div 
              className="absolute inset-0 pointer-events-none rounded-[inherit]"
              style={{ 
                boxShadow: "inset 0px -0.5px 1px 0px rgba(255,255,255,0.3), inset 0px -0.5px 1px 0px rgba(255,255,255,0.25), inset 1px 1.5px 4px 0px rgba(0,0,0,0.08), inset 1px 1.5px 4px 0px rgba(0,0,0,0.1)" 
              }} 
            />
            <button 
              onClick={() => setActivePane("data")}
              className={`relative flex items-center justify-center gap-[3px] h-[36px] flex-1 rounded-[100px] transition-all cursor-pointer ${
                activePane === "data" 
                  ? "text-[#F6F7F9]" 
                  : "text-[#98989d] hover:text-[#4E6987] hover:bg-[#e8eaee]"
              }`}
            >
              {activePane === "data" && (
                <>
                  <div className="absolute inset-0 bg-[#28415c] rounded-[20px] backdrop-blur-[50px]" />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none rounded-[20px] border-[0.5px] border-solid border-[rgba(200,207,219,0.6)]"
                    style={{ boxShadow: "0px 2px 4px 0px rgba(18,34,50,0.3)" }}
                  />
                </>
              )}
              <span className="relative z-[1] font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...ff }}>
                Dados
              </span>
            </button>
            <button 
              onClick={() => setActivePane("analytics")}
              className={`relative flex items-center justify-center gap-[3px] h-[36px] flex-1 rounded-[100px] transition-all cursor-pointer ${
                activePane === "analytics" 
                  ? "text-[#F6F7F9]" 
                  : "text-[#98989d] hover:text-[#4E6987] hover:bg-[#e8eaee]"
              }`}
            >
              {activePane === "analytics" && (
                <>
                  <div className="absolute inset-0 bg-[#28415c] rounded-[20px] backdrop-blur-[50px]" />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none rounded-[20px] border-[0.5px] border-solid border-[rgba(200,207,219,0.6)]"
                    style={{ boxShadow: "0px 2px 4px 0px rgba(18,34,50,0.3)" }}
                  />
                </>
              )}
              <span className="relative z-[1] font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...ff }}>
                Análise
              </span>
            </button>
          </div>

          {/* Search */}
          {activePane === "data" && (
            <div className="px-3 py-2 shrink-0">
              <div className="flex items-center gap-2">
                <div
                  className="relative flex items-center gap-[10px] h-[32px] px-[12px] rounded-full bg-[#EEF1F6] flex-1"
                  style={{ boxShadow: "inset 0px 1px 3px 0px rgba(0,0,0,0.08), inset 0px 1px 2px 0px rgba(0,0,0,0.05)" }}
                >
                  <MagnifyingGlass size={14} weight="bold" className="text-[#98989d] shrink-0" />
                  <input value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Buscar campos..."
                    className="flex-1 bg-transparent outline-none text-[#122232] placeholder:text-[#C8CFDB]"
                    style={{ fontSize: 12, fontWeight: 500, letterSpacing: -0.3, ...ff }} />
                </div>
                {/* Data Pane Menu */}
                <div className="relative">
                  <button
                    onClick={() => setDataPaneMenuOpen(!dataPaneMenuOpen)}
                    className="flex items-center justify-center w-[32px] h-[32px] rounded-full hover:bg-[#EEF1F6] transition-colors"
                    title="Opções do Data Pane"
                  >
                    <DotsThreeVertical size={16} weight="bold" className="text-[#4E6987]" />
                  </button>
                  {dataPaneMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setDataPaneMenuOpen(false)} />
                      <div className="absolute right-0 top-full mt-1 w-[220px] bg-white rounded-[8px] shadow-lg border border-[#EEF1F6] py-1 z-50">
                        {/* Group by */}
                        <div className="px-2 py-1">
                          <p className="text-[#98989D] px-2 py-1" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", ...ff }}>
                            Agrupar por
                          </p>
                          <button
                            onClick={() => { setGroupByFolder(true); setDataPaneMenuOpen(false); }}
                            className="flex items-center gap-2 w-full px-2 py-1.5 rounded-[6px] hover:bg-[#F6F7F9] transition-colors"
                          >
                            <Folder size={14} weight="duotone" className="text-[#4E6987]" />
                            <span className="flex-1 text-left text-[#122232]" style={{ fontSize: 11, fontWeight: 500, ...ff }}>Pasta</span>
                            {groupByFolder && <Check size={14} weight="bold" className="text-[#0483AB]" />}
                          </button>
                          <button
                            onClick={() => { setGroupByFolder(false); setDataPaneMenuOpen(false); }}
                            className="flex items-center gap-2 w-full px-2 py-1.5 rounded-[6px] hover:bg-[#F6F7F9] transition-colors"
                          >
                            <Table size={14} weight="duotone" className="text-[#4E6987]" />
                            <span className="flex-1 text-left text-[#122232]" style={{ fontSize: 11, fontWeight: 500, ...ff }}>Tabela</span>
                            {!groupByFolder && <Check size={14} weight="bold" className="text-[#0483AB]" />}
                          </button>
                        </div>
                        
                        <div className="h-[1px] bg-[#EEF1F6] my-1" />
                        
                        {/* Sort by */}
                        <div className="px-2 py-1">
                          <p className="text-[#98989D] px-2 py-1" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", ...ff }}>
                            Ordenar por
                          </p>
                          <button
                            onClick={() => { setSortBy("name"); setDataPaneMenuOpen(false); }}
                            className="flex items-center gap-2 w-full px-2 py-1.5 rounded-[6px] hover:bg-[#F6F7F9] transition-colors"
                          >
                            <SortAscending size={14} weight="duotone" className="text-[#4E6987]" />
                            <span className="flex-1 text-left text-[#122232]" style={{ fontSize: 11, fontWeight: 500, ...ff }}>Nome</span>
                            {sortBy === "name" && <Check size={14} weight="bold" className="text-[#0483AB]" />}
                          </button>
                          <button
                            onClick={() => { setSortBy("dataSource"); setDataPaneMenuOpen(false); }}
                            className="flex items-center gap-2 w-full px-2 py-1.5 rounded-[6px] hover:bg-[#F6F7F9] transition-colors"
                          >
                            <Package size={14} weight="duotone" className="text-[#4E6987]" />
                            <span className="flex-1 text-left text-[#122232]" style={{ fontSize: 11, fontWeight: 500, ...ff }}>Ordem da Fonte</span>
                            {sortBy === "dataSource" && <Check size={14} weight="bold" className="text-[#0483AB]" />}
                          </button>
                        </div>

                        <div className="h-[1px] bg-[#EEF1F6] my-1" />
                        
                        {/* Actions */}
                        <button
                          onClick={() => {
                            setShowHiddenFields(!showHiddenFields);
                            setDataPaneMenuOpen(false);
                          }}
                          className="flex items-center gap-2 w-full px-3 py-1.5 rounded-[6px] hover:bg-[#F6F7F9] transition-colors"
                        >
                          {showHiddenFields ? <Eye size={14} weight="duotone" className="text-[#4E6987]" /> : <EyeSlash size={14} weight="duotone" className="text-[#4E6987]" />}
                          <span className="text-[#122232]" style={{ fontSize: 11, fontWeight: 500, ...ff }}>
                            {showHiddenFields ? "Ocultar campos ocultos" : "Mostrar campos ocultos"}
                          </span>
                        </button>
                        
                        <button
                          onClick={() => {
                            // Hide all unused fields
                            const usedFieldIds = new Set([
                              ...colShelf.map(s => s.field.id),
                              ...rowShelf.map(s => s.field.id),
                              ...filterShelf.map(s => s.field.id),
                              marks.color?.id,
                              marks.size?.id,
                              marks.label?.id,
                              marks.detail?.id,
                              marks.tooltip?.id,
                              ...(marks.additionalFields?.map(f => f.id) || []),
                            ].filter(Boolean) as string[]);
                            
                            const allFieldIds = CRM_TABLES.flatMap(t => t.fields.map(f => f.id));
                            const unusedFields = allFieldIds.filter(id => !usedFieldIds.has(id));
                            setHiddenFields(new Set(unusedFields));
                            setDataPaneMenuOpen(false);
                            toast.success(`${unusedFields.length} campos não utilizados foram ocultados`);
                          }}
                          className="flex items-center gap-2 w-full px-3 py-1.5 rounded-[6px] hover:bg-[#F6F7F9] transition-colors"
                        >
                          <EyeSlash size={14} weight="duotone" className="text-[#4E6987]" />
                          <span className="text-[#122232]" style={{ fontSize: 11, fontWeight: 500, ...ff }}>Ocultar não utilizados</span>
                        </button>

                        <div className="h-[1px] bg-[#EEF1F6] my-1" />
                        
                        <button
                          onClick={() => {
                            setExpandedTables(new Set(allTables.map(t => t.id)));
                            setDataPaneMenuOpen(false);
                          }}
                          className="flex items-center gap-2 w-full px-3 py-1.5 rounded-[6px] hover:bg-[#F6F7F9] transition-colors"
                        >
                          <ArrowsOutSimple size={14} weight="duotone" className="text-[#4E6987]" />
                          <span className="text-[#122232]" style={{ fontSize: 11, fontWeight: 500, ...ff }}>Expandir tudo</span>
                        </button>
                        
                        <button
                          onClick={() => {
                            setExpandedTables(new Set());
                            setDataPaneMenuOpen(false);
                          }}
                          className="flex items-center gap-2 w-full px-3 py-1.5 rounded-[6px] hover:bg-[#F6F7F9] transition-colors"
                        >
                          <ArrowsInSimple size={14} weight="duotone" className="text-[#4E6987]" />
                          <span className="text-[#122232]" style={{ fontSize: 11, fontWeight: 500, ...ff }}>Recolher tudo</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Tables (Data Pane) */}
          {activePane === "data" && (
            <div className="overflow-auto px-1 pb-3 flex-1">
              {/* Dimensions label */}
              <p className="px-2 pt-2 pb-1 text-[#4E6987]" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", ...ff }}>
                Tabelas
              </p>
              {filteredTables.map(table => {
                const expanded = expandedTables.has(table.id);
                const dims = table.fields.filter(f => f.type === "dimension" || f.type === "date");
                const measures = table.fields.filter(f => f.type === "measure");
                if (sortBy === "name") {
                  dims.sort((a, b) => a.label.localeCompare(b.label, "pt-BR"));
                  measures.sort((a, b) => a.label.localeCompare(b.label, "pt-BR"));
                }
                return (
                  <div key={table.id} className="mb-1">
                    <button
                      onClick={() => toggleTable(table.id)}
                      className="flex items-center gap-2 w-full px-2 py-1.5 rounded-[8px] hover:bg-[#F6F7F9] transition-colors cursor-pointer"
                    >
                      {expanded ? <CaretDown size={10} weight="bold" className="text-[#4E6987]" /> : <CaretRight size={10} weight="bold" className="text-[#4E6987]" />}
                      <span style={{ color: table.color }}>{table.icon}</span>
                      <span className="text-[#122232]" style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.3, ...ff }}>{table.name}</span>
                      <span className="text-[#C8CFDB] ml-auto" style={{ fontSize: 10, fontWeight: 500, ...ff }}>{table.fields.length}</span>
                    </button>
                    {expanded && (
                      <div className="ml-2">
                        {dims.length > 0 && (
                          <>
                            {dims.map(f => (
                              <DataPaneField 
                                key={f.id} 
                                field={f}
                                onContextMenu={(e, field) => {
                                  setContextMenuField({ field, x: e.clientX, y: e.clientY });
                                }}
                                isHidden={hiddenFields.has(f.id) && !showHiddenFields}
                                isHighlighted={highlightedFieldId === f.id}
                                customName={fieldRenames.get(f.id)}
                                isRenaming={renamingFieldId === f.id}
                                onRename={(newName) => {
                                  if (newName && newName !== f.label) {
                                    setFieldRenames(prev => new Map(prev).set(f.id, newName));
                                    toast.success(`Campo renomeado: ${newName}`);
                                  }
                                  setRenamingFieldId(null);
                                }}
                                onDoubleClick={() => {
                                  // Auto-add to sheet
                                  if (f.type === "measure") {
                                    setRowShelf(prev => [...prev, { field: f }]);
                                  } else {
                                    setColShelf(prev => [...prev, { field: f }]);
                                  }
                                  toast.success(`Campo adicionado: ${f.label}`);
                                }}
                              />
                            ))}
                          </>
                        )}
                        {measures.length > 0 && (
                          <>
                            <div className="h-[1px] bg-[#EEF1F6] mx-3 my-1" />
                            {measures.map(f => (
                              <DataPaneField 
                                key={f.id} 
                                field={f}
                                onContextMenu={(e, field) => {
                                  setContextMenuField({ field, x: e.clientX, y: e.clientY });
                                }}
                                isHidden={hiddenFields.has(f.id) && !showHiddenFields}
                                isHighlighted={highlightedFieldId === f.id}
                                customName={fieldRenames.get(f.id)}
                                isRenaming={renamingFieldId === f.id}
                                onRename={(newName) => {
                                  if (newName && newName !== f.label) {
                                    setFieldRenames(prev => new Map(prev).set(f.id, newName));
                                    toast.success(`Campo renomeado: ${newName}`);
                                  }
                                  setRenamingFieldId(null);
                                }}
                                onDoubleClick={() => {
                                  setRowShelf(prev => [...prev, { field: f }]);
                                  toast.success(`Campo adicionado: ${f.label}`);
                                }}
                              />
                            ))}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* ── Zenite Sync — Fontes Externas ── */}
              {filteredSyncTables.length > 0 && (
                <>
                  <div className="flex items-center gap-2 px-2 pt-4 pb-1">
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#3CCEA7]/40 to-transparent" />
                  </div>
                  <div className="flex items-center gap-1.5 px-2 pb-1.5">
                    <p className="text-[#3CCEA7]" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", ...ff }}>
                      Zenite Sync
                    </p>
                    {dashData.syncConnected ? (
                      <span className="ml-auto flex items-center gap-2">
                        <button
                          onClick={refreshSyncData}
                          disabled={syncRefreshing}
                          className="p-0.5 rounded hover:bg-[#3CCEA7]/15 text-[#3CCEA7] transition-colors cursor-pointer disabled:opacity-40"
                          title="Atualizar dados do Sync"
                        >
                          <ArrowsClockwise size={11} weight="bold" className={syncRefreshing ? "animate-spin" : ""} />
                        </button>
                        <button
                          onClick={() => setSyncConfigModal(true)}
                          className="p-0.5 rounded hover:bg-[#3CCEA7]/15 text-[#3CCEA7]/60 transition-colors cursor-pointer"
                          title="Configurações do Sync"
                        >
                          <DotsThreeVertical size={11} weight="bold" />
                        </button>
                        <span className="flex items-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#3CCEA7]" />
                          <span className="text-[#3CCEA7]" style={{ fontSize: 9, fontWeight: 600, ...ff }}>Ativo</span>
                        </span>
                      </span>
                    ) : (
                      <button
                        onClick={() => setSyncConfigModal(true)}
                        className="ml-auto flex items-center gap-1 px-1.5 py-0.5 rounded-[5px] bg-[#3CCEA7]/10 hover:bg-[#3CCEA7]/20 transition-colors cursor-pointer"
                      >
                        <span className="text-[#3CCEA7]" style={{ fontSize: 9, fontWeight: 700, ...ff }}>Conectar</span>
                      </button>
                    )}
                  </div>
                  {filteredSyncTables.map(table => {
                    const expanded = expandedTables.has(table.id);
                    const dims = table.fields.filter(f => f.type === "dimension" || f.type === "date");
                    const measures = table.fields.filter(f => f.type === "measure");
                    if (sortBy === "name") {
                      dims.sort((a, b) => a.label.localeCompare(b.label, "pt-BR"));
                      measures.sort((a, b) => a.label.localeCompare(b.label, "pt-BR"));
                    }
                    const recCount = syncRecordCounts[table.id] || 0;
                    return (
                      <div key={table.id} className="mb-1">
                        <button
                          onClick={() => toggleTable(table.id)}
                          className="flex items-center gap-2 w-full px-2 py-1.5 rounded-[8px] hover:bg-[#F6F7F9] transition-colors cursor-pointer"
                        >
                          {expanded ? <CaretDown size={10} weight="bold" className="text-[#4E6987]" /> : <CaretRight size={10} weight="bold" className="text-[#4E6987]" />}
                          <span style={{ color: table.color }}>{table.icon}</span>
                          <span className="text-[#122232]" style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.3, ...ff }}>{table.name}</span>
                          {dashData.syncConnected && recCount > 0 && (
                            <span className="px-1.5 py-0.5 rounded-[4px]" style={{ color: '#6BE0BE', fontSize: 9, fontWeight: 700, ...ff }}>
                              {recCount}
                            </span>
                          )}
                          <span className="text-[#C8CFDB] ml-auto" style={{ fontSize: 10, fontWeight: 500, ...ff }}>{table.fields.length}</span>
                        </button>
                        {expanded && (
                          <div className="ml-2">
                            {/* Empty state when no data */}
                            {dashData.syncConnected && recCount === 0 && (
                              <div className="px-3 py-2 mx-1 my-1 rounded-[8px] bg-[#FFF3E0]/50 border border-[#F5A623]/20">
                                <p className="text-[#8B6914]" style={{ fontSize: 10, fontWeight: 600, ...ff }}>
                                  Sem dados carregados
                                </p>
                                <p className="text-[#8B6914]/60 mt-0.5" style={{ fontSize: 9, fontWeight: 500, ...ff }}>
                                  Os campos estão disponíveis para uso. Os dados serão carregados do Sync quando disponíveis.
                                </p>
                              </div>
                            )}
                            {!dashData.syncConnected && (
                              <div className="px-3 py-2 mx-1 my-1 rounded-[8px] bg-[#F6F7F9] border border-[#EEF1F6]">
                                <p className="text-[#4E6987]/60" style={{ fontSize: 10, fontWeight: 500, ...ff }}>
                                  Conecte o Zenite Sync para carregar dados
                                </p>
                              </div>
                            )}
                            {dims.length > 0 && (
                              <>
                                <p className="px-3 pt-1 pb-0.5 text-[#4E6987]/60" style={{ fontSize: 9, fontWeight: 600, letterSpacing: 0.3, textTransform: "uppercase", ...ff }}>
                                  Dimensões
                                </p>
                                {dims.map(f => (
                                  <DataPaneField 
                                    key={f.id} 
                                    field={f}
                                    onContextMenu={(e, field) => {
                                      setContextMenuField({ field, x: e.clientX, y: e.clientY });
                                    }}
                                    isHidden={hiddenFields.has(f.id) && !showHiddenFields}
                                    isHighlighted={highlightedFieldId === f.id}
                                    customName={fieldRenames.get(f.id)}
                                    isRenaming={renamingFieldId === f.id}
                                    onRename={(newName) => {
                                      if (newName && newName !== f.label) {
                                        setFieldRenames(prev => new Map(prev).set(f.id, newName));
                                        toast.success(`Campo renomeado: ${newName}`);
                                      }
                                      setRenamingFieldId(null);
                                    }}
                                    onDoubleClick={() => {
                                      if (f.type === "measure") {
                                        setRowShelf(prev => [...prev, { field: f }]);
                                      } else {
                                        setColShelf(prev => [...prev, { field: f }]);
                                      }
                                      toast.success(`Campo adicionado: ${f.label}`);
                                    }}
                                  />
                                ))}
                              </>
                            )}
                            {measures.length > 0 && (
                              <>
                                <div className="h-[1px] bg-[#EEF1F6] mx-3 my-1" />
                                <p className="px-3 pt-0.5 pb-0.5 text-[#4E6987]/60" style={{ fontSize: 9, fontWeight: 600, letterSpacing: 0.3, textTransform: "uppercase", ...ff }}>
                                  Métricas
                                </p>
                                {measures.map(f => (
                                  <DataPaneField 
                                    key={f.id} 
                                    field={f}
                                    onContextMenu={(e, field) => {
                                      setContextMenuField({ field, x: e.clientX, y: e.clientY });
                                    }}
                                    isHidden={hiddenFields.has(f.id) && !showHiddenFields}
                                    isHighlighted={highlightedFieldId === f.id}
                                    customName={fieldRenames.get(f.id)}
                                    isRenaming={renamingFieldId === f.id}
                                    onRename={(newName) => {
                                      if (newName && newName !== f.label) {
                                        setFieldRenames(prev => new Map(prev).set(f.id, newName));
                                        toast.success(`Campo renomeado: ${newName}`);
                                      }
                                      setRenamingFieldId(null);
                                    }}
                                    onDoubleClick={() => {
                                      setRowShelf(prev => [...prev, { field: f }]);
                                      toast.success(`Campo adicionado: ${f.label}`);
                                    }}
                                  />
                                ))}
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          )}

          {/* Calculated Fields Section */}
          {activePane === "data" && (
            <div className="border-t border-[#EEF1F6] shrink-0">
              <div className="px-2 py-2">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[#4E6987]" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", ...ff }}>
                    Campos Calculados
                  </p>
                  <button
                    onClick={() => setShowCalcEditor(true)}
                    className="flex items-center gap-[6px] h-[34px] px-[16px] rounded-[500px] bg-[#F6F7F9] text-[#0483AB] hover:bg-[#DCF0FF] hover:text-[#0483AB] transition-colors cursor-pointer"
                    style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase" as const, ...ff }}
                    title="Criar Campo Calculado"
                  >
                    <Plus size={12} weight="bold" />
                    <span>Novo</span>
                  </button>
                </div>

                {calculatedFields.length === 0 ? (
                  <div className="px-2 py-3 text-center">
                    <p className="text-[#98989D] mb-2" style={{ fontSize: 11, letterSpacing: -0.2, ...ff }}>
                      Nenhum campo calculado
                    </p>
                    <button
                      onClick={() => setShowCalcEditor(true)}
                      className="text-[#0483AB] hover:underline text-center w-full"
                      style={{ fontSize: 10, fontWeight: 600, letterSpacing: -0.2, ...ff }}
                    >
                      + Criar o primeiro
                    </button>
                  </div>
                ) : (
                  <div className="space-y-0.5">
                    {calculatedFields.map((field) => (
                      <div
                        key={field.id}
                        className="group relative"
                        onContextMenu={(e) => {
                          e.preventDefault();
                          setEditingCalcField(field);
                          setShowCalcEditor(true);
                        }}
                      >
                        <DataPaneField field={field} />
                        <button
                          onClick={() => {
                            if (confirm(`Excluir campo calculado "${field.label}"?`)) {
                              setCalculatedFields(prev => prev.filter(f => f.id !== field.id));
                              toast.success(`Campo calculado excluído: ${field.label}`);
                            }
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1 rounded-[4px] bg-white border border-[#DDE3EC] hover:border-[#FF6B6B] hover:bg-[#FFF4F2] transition-all"
                          title="Excluir campo calculado"
                        >
                          <Trash size={10} className="text-[#FF6B6B]" weight="bold" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Analytics Pane */}
          {activePane === "analytics" && (
            <div className="overflow-auto px-1 pb-3 flex-1">
              <p className="px-2 pt-3 pb-1 text-[#4E6987]" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", ...ff }}>
                Objetos Analíticos
              </p>
              <p className="px-2 pb-2 text-[#98989d]" style={{ fontSize: 10, fontWeight: 500, letterSpacing: -0.2, ...ff }}>
                Arraste objetos para a visualização
              </p>

              {/* Summarize Section */}
              <div className="mb-3">
                <p className="px-2 pt-2 pb-1.5 text-[#28415C]" style={{ fontSize: 11, fontWeight: 600, letterSpacing: -0.3, ...ff }}>
                  Resumir
                </p>
                <div className="space-y-0.5">
                  {ANALYTICS_ITEMS.filter(item => item.category === "summarize").map((item) => (
                    <AnalyticsItem key={item.type} item={item} />
                  ))}
                </div>
              </div>

              {/* Model Section */}
              <div className="mb-3">
                <p className="px-2 pt-2 pb-1.5 text-[#28415C]" style={{ fontSize: 11, fontWeight: 600, letterSpacing: -0.3, ...ff }}>
                  Modelar
                </p>
                <div className="space-y-0.5">
                  {ANALYTICS_ITEMS.filter(item => item.category === "model").map((item) => (
                    <AnalyticsItem key={item.type} item={item} />
                  ))}
                </div>
              </div>

              {/* Custom Section */}
              <div className="mb-3">
                <p className="px-2 pt-2 pb-1.5 text-[#28415C]" style={{ fontSize: 11, fontWeight: 600, letterSpacing: -0.3, ...ff }}>
                  Personalizado
                </p>
                <div className="space-y-0.5">
                  {ANALYTICS_ITEMS.filter(item => item.category === "custom").map((item) => (
                    <AnalyticsItem key={item.type} item={item} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT COLUMN: Marks + Filters ── */}
        <div className="w-[220px] min-w-[220px] bg-white border-r border-[#EEF1F6] flex flex-col overflow-y-auto">
          {/* __ Marks Card ── */}
          <div className="px-2 py-2 border-b border-[#EEF1F6] shrink-0">
            <p className="flex items-center gap-1.5 text-[#98989d] mb-1.5 px-1" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", ...ff }}>
              <Highlighter size={12} weight="duotone" />
              Marcações
            </p>
            
            <MarksCard onDrop={(field) => setMarks(m => ({ ...m, additionalFields: [...(m.additionalFields || []), field] }))}>
              {/* Chart Type Selector — Icon Buttons (toggle via Gráficos button) */}
              <AnimatePresence initial={false}>
                {showChartTypes && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.18, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-5 gap-1 pb-1.5">
                      {SHOW_ME_OPTIONS.map(opt => (
                        <button
                          key={opt.type}
                          onClick={() => setChartType(opt.type)}
                          title={opt.label}
                          className={`flex items-center justify-center size-[30px] rounded-[8px] border-0 transition-all cursor-pointer ${
                            chartType === opt.type
                              ? "bg-[#07ABDE] text-[#DCF0FF]"
                              : "bg-[#F6F7F9] text-[#0483AB] hover:bg-[#DCF0FF]"
                          }`}
                        >
                          {React.cloneElement(opt.icon as React.ReactElement, { size: 14, weight: chartType === opt.type ? "fill" : "bold" })}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Polar Sub-Type Selector */}
              <AnimatePresence initial={false}>
                {chartType === "radar" && showChartTypes && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.18, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-center gap-1 pb-1.5">
                      {POLAR_SUBTYPES.map(sub => (
                        <button
                          key={sub.type}
                          onClick={() => setPolarSubType(sub.type)}
                          title={sub.description}
                          className={`flex items-center gap-1 px-2 py-[3px] rounded-[6px] border-0 transition-all cursor-pointer ${
                            polarSubType === sub.type
                              ? "bg-[#0483AB] text-white"
                              : "bg-[#F6F7F9] text-[#4E6987] hover:bg-[#DCF0FF]"
                          }`}
                        >
                          <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: -0.2, ...ff }}>{sub.label}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Scatter Sub-Type Selector */}
              <AnimatePresence initial={false}>
                {chartType === "scatter" && showChartTypes && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.18, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-center gap-1 pb-1.5">
                      {SCATTER_SUBTYPES.map(sub => (
                        <button
                          key={sub.type}
                          onClick={() => setScatterSubType(sub.type)}
                          title={sub.description}
                          className={`flex items-center gap-1 px-2 py-[3px] rounded-[6px] border-0 transition-all cursor-pointer ${
                            scatterSubType === sub.type
                              ? "bg-[#0483AB] text-white"
                              : "bg-[#F6F7F9] text-[#4E6987] hover:bg-[#DCF0FF]"
                          }`}
                        >
                          <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: -0.2, ...ff }}>{sub.label}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Visual Properties Grid (just buttons) */}
              <div className="grid grid-cols-3 gap-1.5">
                <MarksPropertyButton 
                  label={marks.color ? marks.color.label : "Cor"} 
                  icon={<Palette size={13} weight="bold" />} 
                  isActive={!!marks.color}
                  onClick={() => marks.color && setMarks(m => ({ ...m, color: undefined }))}
                  onDrop={f => setMarks(m => ({ ...m, color: f }))} 
                />
                <MarksPropertyButton 
                  label={marks.size ? marks.size.label : "Tamanho"} 
                  icon={<Resize size={13} weight="bold" />} 
                  isActive={!!marks.size}
                  onClick={() => marks.size && setMarks(m => ({ ...m, size: undefined }))}
                  onDrop={f => setMarks(m => ({ ...m, size: f }))} 
                />
                <MarksPropertyButton 
                  label={marks.label ? marks.label.label : "Rótulo"} 
                  icon={<TextT size={13} weight="bold" />} 
                  isActive={!!marks.label}
                  onClick={() => marks.label && setMarks(m => ({ ...m, label: undefined }))}
                  onDrop={f => setMarks(m => ({ ...m, label: f }))} 
                />
                <MarksPropertyButton 
                  label={marks.detail ? marks.detail.label : "Detalhe"} 
                  icon={<DotsThreeCircle size={13} weight="bold" />} 
                  isActive={!!marks.detail}
                  onClick={() => marks.detail && setMarks(m => ({ ...m, detail: undefined }))}
                  onDrop={f => setMarks(m => ({ ...m, detail: f }))} 
                />
                <MarksPropertyButton 
                  label={marks.tooltip ? marks.tooltip.label : "Tooltip"} 
                  icon={<ChatCircle size={13} weight="bold" />} 
                  isActive={!!marks.tooltip}
                  onClick={() => marks.tooltip && setMarks(m => ({ ...m, tooltip: undefined }))}
                  onDrop={f => setMarks(m => ({ ...m, tooltip: f }))} 
                />
                {/* Toggle Chart Types visibility */}
                <button
                  onClick={() => setShowChartTypes(v => !v)}
                  className={`flex flex-col items-center justify-center gap-1 px-2 py-1.5 rounded-[8px] border-0 transition-all cursor-pointer ${
                    showChartTypes
                      ? "bg-[#07ABDE] text-[#DCF0FF]"
                      : "bg-[#F6F7F9] text-[#0483AB] hover:bg-[#DCF0FF]"
                  }`}
                >
                  <GridNine size={13} weight={showChartTypes ? "fill" : "bold"} className={showChartTypes ? "text-[#DCF0FF]" : "text-[#0483AB]"} />
                  <span className={showChartTypes ? "text-[#DCF0FF]" : "text-[#0483AB]"} style={{ fontSize: 9, fontWeight: 600, letterSpacing: -0.2, ...ff }}>Gráficos</span>
                </button>
              </div>

              {/* Fields List (all fields below buttons) */}
              {marks.additionalFields && marks.additionalFields.length > 0 && (
                <div className="flex flex-col gap-1.5 pt-1.5 border-t border-[#EEF1F6]">
                  {marks.additionalFields.map((field, idx) => {
                    // Check which properties are using this field
                    const usesColor = marks.color?.id === field.id;
                    const usesSize = marks.size?.id === field.id;
                    const usesLabel = marks.label?.id === field.id;
                    const usesTooltip = marks.tooltip?.id === field.id;
                    const usesDetail = marks.detail?.id === field.id;
                    
                    return (
                      <div key={field.id + idx} className="flex items-center gap-1.5">
                        <FieldPill
                          field={field}
                          isMeasure={field.type === "measure"}
                          onRemove={() => setMarks(m => ({
                            ...m,
                            additionalFields: m.additionalFields?.filter((_, i) => i !== idx)
                          }))}
                        />
                        {/* Property indicators */}
                        {(usesColor || usesSize || usesLabel || usesTooltip || usesDetail) && (
                          <div className="flex items-center gap-1 ml-auto">
                            {usesColor && <div className="w-2 h-2 rounded-full bg-[#0483AB]" title="Cor" />}
                            {usesSize && <Resize size={10} weight="fill" className="text-[#0483AB]" />}
                            {usesLabel && <TextT size={10} weight="fill" className="text-[#0483AB]" />}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </MarksCard>
          </div>
          
          {/* ── Filters Shelf ── */}
          <div className="px-2 py-2 shrink-0">
            {/* Label externo */}
            <p className="flex items-center gap-1.5 text-[#98989d] mb-1.5 px-1" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", ...ff }}>
              <Funnel size={12} weight="duotone" />
              Filtros
            </p>
            
            <DropShelf
              label="" icon={<></>}
              items={filterShelf} onDrop={addToShelf("filter")} onRemove={removeFromShelf("filter")}
              emptyText="Arraste para filtrar"
              onItemClick={(idx) => setEditingFilter(idx)}
              itemConfigs={filterConfigs}
              customLabels={new Map(
                filterShelf.map((item, idx) => {
                  const config = filterConfigs.get(idx);
                  if (config?.isRelativeDate && config.relativeDateValue) {
                    return [idx, formatRelativeDate(config.relativeDateValue)];
                  }
                  return [idx, ""];
                }).filter(([_, label]) => label)
              )}
              onItemContextMenu={(e, field, idx) => {
                setShelfContextMenu({ field, idx, shelf: "filter", x: e.clientX, y: e.clientY });
              }}
            />
          </div>
        </div>

        {/* ── CENTER/RIGHT: Shelves + Canvas ── */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* ── Columns & Rows Shelves ── */}
          <div className="px-4 py-3 bg-[#F6F7F9] border-b border-[#EEF1F6] shrink-0">
            <div className="flex flex-col gap-2">
              {/* Columns */}
              <DropShelf
                label="Colunas" icon={<Columns size={12} weight="duotone" />}
                items={colShelf} onDrop={addToShelf("col")} onRemove={removeFromShelf("col")}
                onItemClick={(idx) => {
                  if (colShelf[idx].field.type === "measure") {
                    setEditingMeasure({ shelf: "col", idx });
                  }
                }}
                itemConfigs={colAggregations}
                customLabels={new Map(
                  colShelf.map((item, idx) => {
                    if (item.field.type === "measure") {
                      const agg = colAggregations.get(idx) || item.field.aggregation || "SUM";
                      return [idx, `${agg}(${item.field.label})`];
                    }
                    return [idx, ""];
                  }).filter(([_, label]) => label)
                )}
                onItemContextMenu={(e, field, idx) => {
                  setShelfContextMenu({ field, idx, shelf: "col", x: e.clientX, y: e.clientY });
                }}
              />
              {/* Rows */}
              <DropShelf
                label="Linhas" icon={<Rows size={12} weight="duotone" />}
                items={rowShelf} onDrop={addToShelf("row")} onRemove={removeFromShelf("row")}
                onItemClick={(idx) => {
                  if (rowShelf[idx].field.type === "measure") {
                    setEditingMeasure({ shelf: "row", idx });
                  }
                }}
                itemConfigs={rowAggregations}
                customLabels={new Map(
                  rowShelf.map((item, idx) => {
                    if (item.field.type === "measure") {
                      const agg = rowAggregations.get(idx) || item.field.aggregation || "SUM";
                      return [idx, `${agg}(${item.field.label})`];
                    }
                    return [idx, ""];
                  }).filter(([_, label]) => label)
                )}
                onItemContextMenu={(e, field, idx) => {
                  setShelfContextMenu({ field, idx, shelf: "row", x: e.clientX, y: e.clientY });
                }}
              />
            </div>
          </div>

          {/* ── Canvas ── */}
          <div className="flex-1 p-4 bg-white relative min-h-0" onClick={() => setEditingSummaryCol(null)}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${resolvedChartType}-${polarSubType}-${scatterSubType}-${vizData.length}-${measureLabels.join(",")}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="h-full flex flex-col relative"
              >
                {/* Chart title */}
                {vizData.length > 0 && (
                  <div className="flex items-center justify-between mb-3 shrink-0">
                    <div>
                      <span className="text-[#122232]" style={{ fontSize: 15, fontWeight: 700, letterSpacing: -0.5, ...ff }}>
                        {sheetName}
                      </span>
                      <span className="text-[#98989d] ml-2" style={{ fontSize: 11, fontWeight: 500, letterSpacing: -0.3, ...ff }}>
                        {vizData.length} registros · {resolvedChartType === "radar" ? `POLAR (${polarSubType.toUpperCase()})` : resolvedChartType === "scatter" ? `DISPERSÃO (${scatterSubType.toUpperCase()})` : resolvedChartType.toUpperCase()}
                      </span>
                    </div>
                    {resolvedChartType === "table" && (
                      <button
                        onClick={() => { setShowSummaryRow(prev => !prev); setEditingSummaryCol(null); }}
                        className={`h-[34px] px-[16px] rounded-[500px] flex items-center gap-[6px] transition-colors cursor-pointer ${
                          showSummaryRow
                            ? "bg-[#07ABDE] text-[#DCF0FF]"
                            : "bg-[#F6F7F9] text-[#0483AB] hover:bg-[#DCF0FF] hover:text-[#0483AB]"
                        }`}
                        style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase" as const, ...ff }}
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2 11H12M2 7.5H12M2 4H12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                          <rect x="1.5" y="9.5" width="11" height="3" rx="1" stroke="currentColor" strokeWidth="1" fill={showSummaryRow ? "rgba(255,255,255,0.25)" : "none"}/>
                        </svg>
                        Resumo
                      </button>
                    )}
                  </div>
                )}
                <div className="flex-1 min-h-0 relative">
                  {renderViz()}
                  {/* Drop overlay appears when dragging over existing viz */}
                  {vizData.length > 0 && (
                    <CanvasDropOverlay
                      onDropColumns={(field) => {
                        setColShelf(prev => [...prev, { field }]);
                        toast.success(`${field.label} adicionado às Colunas`);
                      }}
                      onDropRows={(field) => {
                        setRowShelf(prev => [...prev, { field, dateLevel: field.type === "date" ? "year" : undefined }]);
                        toast.success(`${field.label} adicionado às Linhas`);
                      }}
                      onDropShowMe={(field) => {
                        if (field.type === "measure") {
                          setColShelf(prev => [...prev, { field }]);
                        } else {
                          setRowShelf(prev => [...prev, { field, dateLevel: field.type === "date" ? "year" : undefined }]);
                        }
                        toast.success(`${field.label} adicionado via Show Me`);
                      }}
                    />
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Sheet tabs ── */}
          <div className="flex items-center gap-1 px-3 py-1.5 bg-[#F6F7F9] border-t border-[#DDE3EC] shrink-0">
            {sheets.map((name, i) => (
              <button key={i} onClick={() => setActiveSheet(i)}
                className={`h-[28px] px-3 rounded-[8px] transition-colors cursor-pointer ${
                  activeSheet === i ? "bg-white text-[#122232] shadow-sm" : "text-[#4E6987] hover:bg-white/60"
                }`}
                style={{ fontSize: 11, fontWeight: activeSheet === i ? 700 : 500, letterSpacing: -0.3, ...ff }}>
                {name}
              </button>
            ))}
            <button onClick={addSheet}
              className="flex items-center justify-center w-[28px] h-[28px] rounded-[8px] text-[#0483AB] hover:bg-white/80 transition-colors cursor-pointer">
              <Plus size={14} weight="bold" />
            </button>
          </div>
        </div>

        {/* ── RIGHT: Show Me Panel ── */}
        <AnimatePresence>
          {showMe && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 180, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white border-l border-[#EEF1F6] overflow-hidden shrink-0"
            >
              <div className="p-3">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#122232]" style={{ fontSize: 13, fontWeight: 700, letterSpacing: -0.3, ...ff }}>Show Me</span>
                  <button onClick={() => setShowMe(false)} className="text-[#C8CFDB] hover:text-[#4E6987] cursor-pointer">
                    <X size={14} weight="bold" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {SHOW_ME_OPTIONS.map(opt => (
                    <button
                      key={opt.type}
                      onClick={() => setChartType(opt.type)}
                      className={`flex flex-col items-center gap-1 p-2 rounded-[10px] border transition-all cursor-pointer ${
                        chartType === opt.type
                          ? "border-[#0483AB] bg-[#DCF0FF]/30"
                          : "border-[#EEF1F6] hover:border-[#DDE3EC] hover:bg-[#F6F7F9]"
                      }`}
                    >
                      <span className={chartType === opt.type ? "text-[#0483AB]" : "text-[#4E6987]"}>{opt.icon}</span>
                      <span className={chartType === opt.type ? "text-[#0483AB]" : "text-[#4E6987]"}
                        style={{ fontSize: 9, fontWeight: 600, letterSpacing: -0.2, ...ff }}>{opt.label}</span>
                    </button>
                  ))}
                </div>
                {/* Polar Sub-Types (mobile) */}
                {chartType === "radar" && (
                  <div className="flex items-center gap-1 mt-2">
                    {POLAR_SUBTYPES.map(sub => (
                      <button
                        key={sub.type}
                        onClick={() => setPolarSubType(sub.type)}
                        title={sub.description}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-[6px] border-0 transition-all cursor-pointer ${
                          polarSubType === sub.type
                            ? "bg-[#0483AB] text-white"
                            : "bg-[#F6F7F9] text-[#4E6987] hover:bg-[#DCF0FF]"
                        }`}
                      >
                        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: -0.2, ...ff }}>{sub.label}</span>
                      </button>
                    ))}
                  </div>
                )}
                {/* Scatter Sub-Types (Show Me panel) */}
                {chartType === "scatter" && (
                  <div className="flex items-center gap-1 mt-2">
                    {SCATTER_SUBTYPES.map(sub => (
                      <button
                        key={sub.type}
                        onClick={() => setScatterSubType(sub.type)}
                        title={sub.description}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-[6px] border-0 transition-all cursor-pointer ${
                          scatterSubType === sub.type
                            ? "bg-[#0483AB] text-white"
                            : "bg-[#F6F7F9] text-[#4E6987] hover:bg-[#DCF0FF]"
                        }`}
                      >
                        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: -0.2, ...ff }}>{sub.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Zenite Agent Modal ── */}
      <AnimatePresence>
        {agentOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-40" onClick={() => setAgentOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] max-w-[95vw] bg-white rounded-[20px] z-50 overflow-hidden flex"
              style={{ boxShadow: "0px 16px 48px rgba(18,34,50,0.16)" }}
            >
              {/* Lateral com mascote Turing */}
              <div className="w-[200px] flex flex-col p-4 relative bg-[#8c8cd4]">
                {/* Header com ícone e nome */}
                <div className="flex flex-col items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-[48px] h-[48px] rounded-[14px] bg-white/20">
                    <Atom size={26} weight="fill" className="text-white" />
                  </div>
                  <h2 className="text-white text-center" style={{ fontSize: 20, fontWeight: 700, letterSpacing: -0.5, ...ff }}>Turing</h2>
                </div>
                
                {/* Mascote no fundo */}
                <div className="flex-1 flex items-end justify-center">
                  <img src={turingMascot} alt="Turing" className="w-full h-auto object-contain" />
                </div>
              </div>

              {/* Conteúdo principal */}
              <div className="flex-1 p-6" style={{ background: "rgba(140,140,212,0.06)" }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-[6px]">
                    <Atom size={15} weight="duotone" className="text-[#8C8CD4]" />
                    <p className="text-[#122232]" style={{ fontSize: 14, fontWeight: 700, letterSpacing: -0.3, ...ff }}>Descreva a visualização que deseja criar</p>
                  </div>
                  <button onClick={() => setAgentOpen(false)} className="p-1.5 rounded-[8px] hover:bg-white/60 text-[#4E6987] cursor-pointer transition-colors">
                    <X size={16} weight="bold" />
                  </button>
                </div>

                <div className="flex items-center gap-2 h-[42px] px-4 bg-white rounded-[12px] border border-[#DDE3EC] mb-4" style={{ boxShadow: "0 1px 3px rgba(18,34,50,0.04)" }}>
                  <MagnifyingGlass size={16} weight="bold" className="text-[#C8CFDB]" />
                  <input
                    value={agentQuery}
                    onChange={e => setAgentQuery(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleAgentSubmit()}
                    placeholder="Ex: Quantos leads por estágio?"
                    className="flex-1 bg-transparent border-none outline-none text-[#122232] placeholder-[#C8CFDB]"
                    style={{ fontSize: 14, fontWeight: 500, letterSpacing: -0.3, ...ff }}
                    autoFocus
                  />
                  <button onClick={handleAgentSubmit}
                    className="group/turing flex items-center gap-[6px] h-[34px] px-[16px] rounded-[500px] bg-[#F6F7F9] text-[#4E6987] hover:bg-white hover:shadow-[0_2px_12px_rgba(140,140,212,0.35),0_4px_16px_rgba(7,171,222,0.2),0_6px_20px_rgba(60,206,167,0.15)] transition-all duration-200 cursor-pointer border border-transparent">
                    <Atom size={14} weight="bold" className="text-[#4E6987] group-hover/turing:animate-[turing-icon-hover_1.5s_linear_infinite]" />
                    <span className="font-bold uppercase tracking-[0.5px] [-webkit-background-clip:text] [background-clip:text] [background-size:200%_100%] group-hover/turing:animate-[turing-text-hover_3s_linear_infinite] group-hover/turing:text-transparent transition-colors duration-300" style={{ fontSize: 10, backgroundImage: TURING_GRADIENT_LOOP, backgroundRepeat: "repeat", ...ff }}>
                      Gerar
                    </span>
                  </button>
                </div>

                <p className="text-[#98989d] mb-[8px]" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", ...ff }}>
                  Sugestões
                </p>
                <div className="grid grid-cols-2 gap-[6px]">
                  {agentSuggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => { setAgentQuery(s); }}
                      className="text-left p-[10px] rounded-[10px] bg-white border border-[#DDE3EC] hover:border-[#8C8CD4] hover:shadow-[0_2px_8px_rgba(140,140,212,0.12)] transition-all duration-200 cursor-pointer"
                    >
                      <span className="text-[#122232]" style={{ fontSize: 12, fontWeight: 500, letterSpacing: -0.3, lineHeight: "17px", ...ff }}>{s}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Filter Configuration Modal */}
      <AnimatePresence>
        {editingFilter !== null && filterShelf[editingFilter] && (
          <FilterModal
            field={filterShelf[editingFilter].field}
            config={filterConfigs.get(editingFilter)}
            onSave={(config) => {
              setFilterConfigs(prev => {
                const next = new Map(prev);
                next.set(editingFilter, config);
                return next;
              });
              toast.success(`Filtro configurado: ${filterShelf[editingFilter].field.label}`);
            }}
            onClose={() => setEditingFilter(null)}
          />
        )}
      </AnimatePresence>

      {/* Aggregation Configuration Modal */}
      <AnimatePresence>
        {editingMeasure && (
          <AggregationModal
            field={(editingMeasure.shelf === "col" ? colShelf : rowShelf)[editingMeasure.idx].field}
            currentAggregation={(editingMeasure.shelf === "col" ? colAggregations : rowAggregations).get(editingMeasure.idx)}
            onSave={(aggregation) => {
              if (editingMeasure.shelf === "col") {
                setColAggregations(prev => {
                  const next = new Map(prev);
                  next.set(editingMeasure.idx, aggregation);
                  return next;
                });
              } else {
                setRowAggregations(prev => {
                  const next = new Map(prev);
                  next.set(editingMeasure.idx, aggregation);
                  return next;
                });
              }
              const field = (editingMeasure.shelf === "col" ? colShelf : rowShelf)[editingMeasure.idx].field;
              toast.success(`Agregação configurada: ${aggregation}(${field.label})`);
            }}
            onClose={() => setEditingMeasure(null)}
          />
        )}
      </AnimatePresence>

      {/* Calculated Field Editor */}
      <AnimatePresence>
        {showCalcEditor && (
          <CalculatedFieldEditor
            field={editingCalcField || undefined}
            onSave={(newField) => {
              setCalculatedFields(prev => {
                const existing = prev.findIndex(f => f.id === newField.id);
                if (existing >= 0) {
                  const updated = [...prev];
                  updated[existing] = { ...newField, isCalculated: true as const, table: "calculated", aggregation: newField.type === "measure" ? "SUM" : undefined };
                  return updated;
                } else {
                  return [...prev, { ...newField, isCalculated: true as const, table: "calculated", aggregation: newField.type === "measure" ? "SUM" : undefined }];
                }
              });
              setShowCalcEditor(false);
              setEditingCalcField(null);
              toast.success(`Campo calculado ${editingCalcField ? "atualizado" : "criado"}: ${newField.label}`);
            }}
            onClose={() => {
              setShowCalcEditor(false);
              setEditingCalcField(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* Table Calculation Modal */}
      <AnimatePresence>
        {editingTableCalc && (
          <TableCalculationModal
            fieldLabel={
              (editingTableCalc.shelf === "col" ? colShelf : rowShelf)[editingTableCalc.idx]?.field.label || "Field"
            }
            currentConfig={
              (editingTableCalc.shelf === "col" ? colTableCalcs : rowTableCalcs).get(editingTableCalc.idx)
            }
            onSave={(config) => {
              if (editingTableCalc.shelf === "col") {
                setColTableCalcs(prev => {
                  const next = new Map(prev);
                  next.set(editingTableCalc.idx, config);
                  return next;
                });
              } else {
                setRowTableCalcs(prev => {
                  const next = new Map(prev);
                  next.set(editingTableCalc.idx, config);
                  return next;
                });
              }
              const field = (editingTableCalc.shelf === "col" ? colShelf : rowShelf)[editingTableCalc.idx].field;
              toast.success(`Table calculation aplicado: ${field.label}`);
              setEditingTableCalc(null);
            }}
            onClear={() => {
              if (editingTableCalc.shelf === "col") {
                setColTableCalcs(prev => {
                  const next = new Map(prev);
                  next.delete(editingTableCalc.idx);
                  return next;
                });
              } else {
                setRowTableCalcs(prev => {
                  const next = new Map(prev);
                  next.delete(editingTableCalc.idx);
                  return next;
                });
              }
              toast.success("Table calculation removido");
              setEditingTableCalc(null);
            }}
            onClose={() => setEditingTableCalc(null)}
          />
        )}
      </AnimatePresence>

      {/* Connect to Data Modal */}
      <AnimatePresence>
        {connectDataModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-[90]"
              onClick={() => setConnectDataModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] max-w-[95vw] max-h-[90vh] bg-white rounded-[20px] z-[100] overflow-hidden flex flex-col"
              style={{ boxShadow: "0px 16px 48px rgba(18,34,50,0.16)" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#EEF1F6]">
                <div>
                  <h2 className="text-[#122232]" style={{ fontSize: 18, fontWeight: 700, letterSpacing: -0.5, ...ff }}>
                    Conectar aos Dados
                  </h2>
                  <p className="text-[#4E6987] mt-1" style={{ fontSize: 12, fontWeight: 500, letterSpacing: -0.3, ...ff }}>
                    Escolha uma fonte de dados para começar sua análise
                  </p>
                </div>
                <button
                  onClick={() => setConnectDataModal(false)}
                  className="p-2 rounded-full hover:bg-[#F6F7F9] text-[#4E6987] cursor-pointer"
                >
                  <X size={20} weight="bold" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {/* Zenite Sync Featured Card */}
                <button
                  onClick={() => {
                    setConnectDataModal(false);
                    setSyncConfigModal(true);
                  }}
                  className="w-full mb-5 p-4 rounded-[14px] border-2 border-[#3CCEA7]/30 bg-gradient-to-r from-[#D9F8EF]/50 to-[#E8F0FE]/50 hover:border-[#3CCEA7] transition-all cursor-pointer text-left group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-[14px] bg-[#3CCEA7]/15 flex items-center justify-center group-hover:bg-[#3CCEA7]/25 transition-colors">
                      <ArrowsClockwise size={24} weight="duotone" className="text-[#3CCEA7]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[#122232]" style={{ fontSize: 14, fontWeight: 700, letterSpacing: -0.3, ...ff }}>
                          Zenite Sync
                        </span>
                        {dashData.syncConnected && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#3CCEA7]/15">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#3CCEA7]" />
                            <span className="text-[#3CCEA7]" style={{ fontSize: 9, fontWeight: 700, ...ff }}>Conectado</span>
                          </span>
                        )}
                      </div>
                      <p className="text-[#4E6987]" style={{ fontSize: 11, fontWeight: 500, letterSpacing: -0.2, ...ff }}>
                        Dados de Google Ads, Meta Ads e LinkedIn Ads via Data Feed API
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {["#4285F4", "#0081FB", "#0A66C2"].map((c, i) => (
                        <div key={i} className="w-3 h-3 rounded-full" style={{ backgroundColor: c, opacity: 0.7 }} />
                      ))}
                    </div>
                  </div>
                </button>

                <div className="grid grid-cols-3 gap-4">
                  {/* Arquivos */}
                  <div>
                    <h3 className="text-[#98989d] mb-3" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', ...ff }}>
                      Arquivos
                    </h3>
                    {[
                      { icon: "📊", name: "Microsoft Excel", desc: "XLSX, XLS, XLSM" },
                      { icon: "📄", name: "Text File", desc: "CSV, TSV, TXT" },
                      { icon: "🔗", name: "JSON File", desc: "JSON, NDJSON" },
                      { icon: "📑", name: "Google Sheets", desc: "Planilhas online" },
                      { icon: "📋", name: "PDF File", desc: "Extrair tabelas" },
                    ].map((item, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          toast.info(`Conectar a ${item.name} em breve`);
                          setConnectDataModal(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px] hover:bg-[#F6F7F9] transition-colors cursor-pointer text-left mb-1"
                      >
                        <span style={{ fontSize: 20 }}>{item.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-[#122232]" style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.3, ...ff }}>
                            {item.name}
                          </div>
                          <div className="text-[#98989d] truncate" style={{ fontSize: 10, fontWeight: 500, letterSpacing: -0.2, ...ff }}>
                            {item.desc}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Bancos de Dados */}
                  <div>
                    <h3 className="text-[#98989d] mb-3" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', ...ff }}>
                      Bancos de Dados
                    </h3>
                    {[
                      { icon: "🐘", name: "PostgreSQL", desc: "Banco relacional" },
                      { icon: "🐬", name: "MySQL", desc: "Open-source SQL" },
                      { icon: "🔶", name: "MongoDB", desc: "NoSQL database" },
                      { icon: "🔷", name: "SQL Server", desc: "Microsoft" },
                      { icon: "🔴", name: "Oracle", desc: "Enterprise DB" },
                      { icon: "🟠", name: "MariaDB", desc: "MySQL fork" },
                    ].map((item, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          toast.info(`Conectar a ${item.name} em breve`);
                          setConnectDataModal(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px] hover:bg-[#F6F7F9] transition-colors cursor-pointer text-left mb-1"
                      >
                        <span style={{ fontSize: 20 }}>{item.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-[#122232]" style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.3, ...ff }}>
                            {item.name}
                          </div>
                          <div className="text-[#98989d] truncate" style={{ fontSize: 10, fontWeight: 500, letterSpacing: -0.2, ...ff }}>
                            {item.desc}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Cloud & Data Warehouses */}
                  <div>
                    <h3 className="text-[#98989d] mb-3" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', ...ff }}>
                      Cloud & Warehouses
                    </h3>
                    {[
                      { icon: "❄️", name: "Snowflake", desc: "Cloud data warehouse" },
                      { icon: "☁️", name: "BigQuery", desc: "Google Cloud" },
                      { icon: "📦", name: "Redshift", desc: "Amazon AWS" },
                      { icon: "🧱", name: "Databricks", desc: "Data lakehouse" },
                      { icon: "🔵", name: "Azure SQL", desc: "Microsoft Azure" },
                      { icon: "🌐", name: "Salesforce", desc: "CRM platform" },
                    ].map((item, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          toast.info(`Conectar a ${item.name} em breve`);
                          setConnectDataModal(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px] hover:bg-[#F6F7F9] transition-colors cursor-pointer text-left mb-1"
                      >
                        <span style={{ fontSize: 20 }}>{item.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-[#122232]" style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.3, ...ff }}>
                            {item.name}
                          </div>
                          <div className="text-[#98989d] truncate" style={{ fontSize: 10, fontWeight: 500, letterSpacing: -0.2, ...ff }}>
                            {item.desc}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Footer Info */}
                <div className="mt-6 p-4 bg-[#F6F7F9] rounded-[12px] border border-[#EEF1F6]">
                  <div className="flex items-start gap-3">
                    <Info size={20} weight="duotone" className="text-[#0483AB] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[#122232] mb-1" style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.3, ...ff }}>
                        Conectores Disponíveis
                      </h4>
                      <p className="text-[#4E6987]" style={{ fontSize: 11, fontWeight: 500, letterSpacing: -0.2, ...ff }}>
                        O Dash suporta mais de 48 conectores nativos incluindo arquivos locais, bancos de dados relacionais e NoSQL, 
                        data warehouses modernos, APIs REST, Google Analytics, e muito mais. Também é possível criar conectores personalizados 
                        usando ODBC, JDBC ou Web Data Connector.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Sync Config Modal */}
      <AnimatePresence>
        {syncConfigModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-[90]"
              onClick={() => setSyncConfigModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] max-w-[95vw] bg-white rounded-[20px] z-[100] overflow-hidden flex flex-col"
              style={{ boxShadow: "0px 16px 48px rgba(18,34,50,0.16)" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#EEF1F6]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[12px] bg-[#D9F8EF] flex items-center justify-center">
                    <ArrowsClockwise size={20} weight="duotone" className="text-[#3CCEA7]" />
                  </div>
                  <div>
                    <h2 className="text-[#122232]" style={{ fontSize: 18, fontWeight: 700, letterSpacing: -0.5, ...ff }}>
                      Conectar Zenite Sync
                    </h2>
                    <p className="text-[#4E6987]" style={{ fontSize: 12, fontWeight: 500, letterSpacing: -0.2, ...ff }}>
                      Configure a conexão com a Data Feed API
                    </p>
                  </div>
                </div>
                <button onClick={() => setSyncConfigModal(false)} className="p-2 rounded-full hover:bg-[#F6F7F9] text-[#4E6987] cursor-pointer">
                  <X size={20} weight="bold" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                {/* Connection status */}
                <div className={`flex items-center gap-2 px-3 py-2 rounded-[10px] ${dashData.syncConnected ? "bg-[#D9F8EF]" : "bg-[#FFF3E0]"}`}>
                  <div className={`w-2 h-2 rounded-full ${dashData.syncConnected ? "bg-[#3CCEA7]" : "bg-[#F5A623]"}`} />
                  <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.2, color: dashData.syncConnected ? "#135543" : "#8B6914", ...ff }}>
                    {dashData.syncConnected ? "Conectado ao Zenite Sync" : "Não conectado"}
                  </span>
                  {dashData.syncConnected && (
                    <span className="ml-auto text-[#3CCEA7]" style={{ fontSize: 10, fontWeight: 500, ...ff }}>
                      {(dashData.syncGoogleAds.length + dashData.syncMetaAds.length + dashData.syncLinkedinAds.length)} registros
                    </span>
                  )}
                </div>

                {/* Base URL */}
                <div>
                  <label className="block text-[#122232] mb-1.5" style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.2, ...ff }}>
                    Base URL da Data Feed API
                  </label>
                  <input
                    type="url"
                    value={syncBaseUrl}
                    onChange={(e) => setSyncBaseUrl(e.target.value)}
                    placeholder="https://xxxx.supabase.co/functions/v1/make-server-xxx/dash-api/v1"
                    className="w-full px-3 py-2.5 rounded-[10px] border border-[#E0E5EC] bg-[#FAFBFC] text-[#122232] placeholder:text-[#C8CFDB] focus:border-[#3CCEA7] focus:ring-1 focus:ring-[#3CCEA7]/20 outline-none transition-all"
                    style={{ fontSize: 12, fontWeight: 500, ...ff }}
                  />
                  <p className="mt-1 text-[#98989D]" style={{ fontSize: 10, fontWeight: 500, ...ff }}>
                    URL base dos endpoints REST do Zenite Sync (sem barra no final)
                  </p>
                </div>

                {/* API Key */}
                <div>
                  <label className="block text-[#122232] mb-1.5" style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.2, ...ff }}>
                    API Key (X-API-Key)
                  </label>
                  <input
                    type="password"
                    value={syncApiKey}
                    onChange={(e) => setSyncApiKey(e.target.value)}
                    placeholder="zs_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    className="w-full px-3 py-2.5 rounded-[10px] border border-[#E0E5EC] bg-[#FAFBFC] text-[#122232] placeholder:text-[#C8CFDB] focus:border-[#3CCEA7] focus:ring-1 focus:ring-[#3CCEA7]/20 outline-none transition-all"
                    style={{ fontSize: 12, fontWeight: 500, fontFamily: "monospace" }}
                  />
                  <p className="mt-1 text-[#98989D]" style={{ fontSize: 10, fontWeight: 500, ...ff }}>
                    Gere uma API Key na aba "API" do Zenite Sync
                  </p>
                </div>

                {/* Gateway Token */}
                <div>
                  <label className="block text-[#28415C] mb-1.5" style={{ fontSize: 12, fontWeight: 700, letterSpacing: -0.2, ...ff }}>
                    <span className="text-[#EAC23D] mr-1">&#9888;</span> Gateway Token <span className="text-[#EAC23D] ml-1" style={{ fontSize: 9, fontWeight: 700 }}>(OBRIGATÓRIO)</span>
                  </label>
                  <input
                    type="password"
                    value={syncGatewayToken}
                    onChange={(e) => setSyncGatewayToken(e.target.value)}
                    placeholder="eyJhbGci..."
                    className="w-full px-3 py-2.5 rounded-[10px] border border-[#E0E5EC] bg-[#FAFBFC] text-[#122232] placeholder:text-[#C8CFDB] focus:border-[#3CCEA7] focus:ring-1 focus:ring-[#3CCEA7]/20 outline-none transition-all"
                    style={{ fontSize: 12, fontWeight: 500, fontFamily: "monospace" }}
                  />
                  <p className="mt-1 text-[#917822] bg-[#FFF8E1] px-2 py-1.5 rounded-[6px] border border-[#EAC23D]/20" style={{ fontSize: 9, fontWeight: 500, lineHeight: 1.5, ...ff }}>
                    Supabase exige <code className="font-mono bg-[#EAC23D]/15 px-0.5 rounded">Authorization: Bearer &lt;token&gt;</code> no gateway. Copie da página Data Feed API do Sync.
                  </p>
                </div>

                {/* Test Connection (via server proxy to avoid CORS) */}
                {syncBaseUrl && syncApiKey && (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={async () => {
                          setSyncTesting(true);
                          setSyncTestResult(null);
                          try {
                            const res = await fetch(
                              `https://${projectId}.supabase.co/functions/v1/make-server-d2ca3281/dash/sync/test`,
                              {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json",
                                  Authorization: `Bearer ${publicAnonKey}`,
                                },
                                body: JSON.stringify({
                                  baseUrl: syncBaseUrl.replace(/\/$/, ""),
                                  apiKey: syncApiKey,
                                  gatewayToken: syncGatewayToken,
                                }),
                              }
                            );
                            const data = await res.json();
                            if (data.ok) {
                              setSyncTestResult({ ok: true, msg: data.message || `Conexão OK!` });
                            } else {
                              setSyncTestResult({ ok: false, msg: data.error || `Erro desconhecido` });
                            }
                          } catch (err: any) {
                            setSyncTestResult({ ok: false, msg: `Falha na conexão: ${err.message || err}` });
                          } finally {
                            setSyncTesting(false);
                          }
                        }}
                        disabled={syncTesting}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] border border-[#E0E5EC] bg-white hover:bg-[#F6F7F9] text-[#4E6987] transition-colors cursor-pointer disabled:opacity-50"
                        style={{ fontSize: 11, fontWeight: 600, ...ff }}
                      >
                        {syncTesting ? <Spinner size={12} className="animate-spin" /> : <Lightning size={12} weight="bold" />}
                        {syncTesting ? "Testando..." : "Testar Conexão"}
                      </button>
                      {syncTestResult && (
                        <span
                          className={`flex items-center gap-1 px-2 py-1 rounded-[6px] ${syncTestResult.ok ? "bg-[#D9F8EF] text-[#135543]" : "bg-[#FFEBEE] text-[#B71C1C]"}`}
                          style={{ fontSize: 10, fontWeight: 600, ...ff }}
                        >
                          {syncTestResult.ok ? <Check size={10} weight="bold" /> : <X size={10} weight="bold" />}
                          {syncTestResult.msg}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Connectors info */}
                <div className="p-3 bg-[#F6F7F9] rounded-[12px] border border-[#EEF1F6]">
                  <p className="text-[#4E6987] mb-2" style={{ fontSize: 11, fontWeight: 600, letterSpacing: -0.2, ...ff }}>
                    Conectores disponíveis:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { name: "Google Ads", color: "#4285F4", bg: "#E8F0FE" },
                      { name: "Meta Ads", color: "#0081FB", bg: "#E5F0FF" },
                      { name: "LinkedIn Ads", color: "#0A66C2", bg: "#E1EEFF" },
                    ].map(c => (
                      <span key={c.name} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[8px]" style={{ backgroundColor: c.bg }}>
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c.color }} />
                        <span style={{ color: c.color, fontSize: 11, fontWeight: 600, ...ff }}>{c.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-[#EEF1F6]">
                {/* Left side — Disconnect (only if already connected) */}
                <div>
                  {dashData.syncConnected && (
                    <button
                      onClick={async () => {
                        if (!confirm("Desconectar o Zenite Sync? Os campos Sync serão removidos do Data Pane.")) return;
                        setSyncDisconnecting(true);
                        const success = await dashData.disconnectSync();
                        setSyncDisconnecting(false);
                        if (success) {
                          toast.success("Zenite Sync desconectado");
                          setSyncConfigModal(false);
                          setSyncBaseUrl("");
                          setSyncApiKey("");
                          setSyncGatewayToken("");
                        } else {
                          toast.error("Erro ao desconectar o Sync");
                        }
                      }}
                      disabled={syncDisconnecting}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-[10px] text-[#B71C1C] bg-[#FFEBEE] hover:bg-[#FFCDD2] disabled:opacity-50 transition-colors cursor-pointer"
                      style={{ fontSize: 12, fontWeight: 600, ...ff }}
                    >
                      {syncDisconnecting ? <Spinner size={14} className="animate-spin" /> : <Plugs size={14} weight="bold" />}
                      {syncDisconnecting ? "Desconectando..." : "Desconectar"}
                    </button>
                  )}
                </div>
                {/* Right side — Cancel + Connect */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSyncConfigModal(false)}
                    className="px-4 py-2 rounded-[10px] text-[#4E6987] hover:bg-[#F6F7F9] transition-colors cursor-pointer"
                    style={{ fontSize: 12, fontWeight: 600, ...ff }}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={async () => {
                      if (!syncBaseUrl || !syncApiKey || !syncGatewayToken) {
                        toast.error("Preencha a URL, Gateway Token e API Key");
                        return;
                      }
                      setSyncSaving(true);
                      const success = await dashData.saveSyncConfig({
                        baseUrl: syncBaseUrl.replace(/\/$/, ""),
                        apiKey: syncApiKey,
                        gatewayToken: syncGatewayToken,
                        connectors: ["google_ads", "meta_ads", "linkedin_ads"],
                      });
                      setSyncSaving(false);
                      if (success) {
                        toast.success("Zenite Sync conectado com sucesso!");
                        setSyncConfigModal(false);
                      } else {
                        toast.error("Erro ao conectar. Verifique a URL e API Key.");
                      }
                    }}
                    disabled={syncSaving || !syncBaseUrl || !syncApiKey || !syncGatewayToken}
                    className="flex items-center gap-2 px-5 py-2 rounded-[10px] bg-[#3CCEA7] text-white hover:bg-[#2BB896] disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    style={{ fontSize: 12, fontWeight: 700, ...ff }}
                  >
                    {syncSaving ? <Spinner size={14} className="animate-spin" /> : <ArrowsClockwise size={14} weight="bold" />}
                    {syncSaving ? "Conectando..." : dashData.syncConnected ? "Reconectar" : "Conectar"}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Save Dashboard Modal */}
      <AnimatePresence>
        {saveModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-[90]"
              onClick={() => setSaveModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] max-w-[95vw] bg-white rounded-[20px] z-[100] overflow-hidden flex flex-col"
              style={{ boxShadow: "0px 16px 48px rgba(18,34,50,0.16)" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#EEF1F6]">
                <div>
                  <h2 className="text-[#122232]" style={{ fontSize: 18, fontWeight: 700, letterSpacing: -0.5, ...ff }}>
                    {editingReportId 
                      ? (saveAsType === "dashboard" ? "Editar Dashboard" : "Editar Relatório")
                      : (saveAsType === "dashboard" ? "Salvar Dashboard" : "Salvar Relatório")
                    }
                  </h2>
                  <p className="text-[#4E6987] mt-1" style={{ fontSize: 12, fontWeight: 500, letterSpacing: -0.3, ...ff }}>
                    {editingReportId 
                      ? "Atualize ou duplique como novo"
                      : "Configure o nome e as opções de compartilhamento"
                    }
                  </p>
                </div>
                <button
                  onClick={() => setSaveModal(false)}
                  className="p-2 rounded-full hover:bg-[#F6F7F9] text-[#4E6987] cursor-pointer transition-colors"
                >
                  <X size={20} weight="bold" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col gap-5">
                {/* Tipo (Dashboard ou Relatório) — travado quando editando existente */}
                <div>
                  <label className="text-[#98989d] uppercase block mb-3" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.5, ...ff }}>
                    Tipo {editingReportId && <span className="text-[#0483AB] normal-case" style={{ fontSize: 8, letterSpacing: 0 }}>(bloqueado ao editar)</span>}
                  </label>
                  
                  <div className="flex gap-2">
                    {/* Dashboard */}
                    <button
                      onClick={() => !editingReportId && setSaveAsType("dashboard")}
                      disabled={!!editingReportId}
                      className={`flex-1 flex items-center gap-3 p-3 rounded-[12px] border-2 transition-all ${
                        editingReportId ? "cursor-not-allowed opacity-60" : "cursor-pointer"
                      } ${
                        saveAsType === "dashboard" 
                          ? "border-[#0483AB] bg-[#DCF0FF]" 
                          : "border-[#DDE3EC] bg-white hover:bg-[#F6F7F9]"
                      }`}
                    >
                      <div className={`flex items-center justify-center w-[32px] h-[32px] rounded-[8px] shrink-0 ${
                        saveAsType === "dashboard" ? "bg-[#0483AB]" : "bg-[#F6F7F9]"
                      }`}>
                        <ChartBar size={16} weight={saveAsType === "dashboard" ? "fill" : "bold"} className={saveAsType === "dashboard" ? "text-white" : "text-[#4E6987]"} />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="text-[#122232]" style={{ fontSize: 13, fontWeight: 600, letterSpacing: -0.3, ...ff }}>
                          Dashboard
                        </div>
                      </div>
                      {saveAsType === "dashboard" && (
                        <Check size={16} weight="bold" className="text-[#0483AB]" />
                      )}
                    </button>
                    
                    {/* Relatório */}
                    <button
                      onClick={() => !editingReportId && setSaveAsType("report")}
                      disabled={!!editingReportId}
                      className={`flex-1 flex items-center gap-3 p-3 rounded-[12px] border-2 transition-all ${
                        editingReportId ? "cursor-not-allowed opacity-60" : "cursor-pointer"
                      } ${
                        saveAsType === "report" 
                          ? "border-[#0483AB] bg-[#DCF0FF]" 
                          : "border-[#DDE3EC] bg-white hover:bg-[#F6F7F9]"
                      }`}
                    >
                      <div className={`flex items-center justify-center w-[32px] h-[32px] rounded-[8px] shrink-0 ${
                        saveAsType === "report" ? "bg-[#0483AB]" : "bg-[#F6F7F9]"
                      }`}>
                        <FileText size={16} weight={saveAsType === "report" ? "fill" : "bold"} className={saveAsType === "report" ? "text-white" : "text-[#4E6987]"} />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="text-[#122232]" style={{ fontSize: 13, fontWeight: 600, letterSpacing: -0.3, ...ff }}>
                          Relatório
                        </div>
                      </div>
                      {saveAsType === "report" && (
                        <Check size={16} weight="bold" className="text-[#0483AB]" />
                      )}
                    </button>
                  </div>
                </div>
                
                {/* Nome do Dashboard */}
                <div>
                  <label className="text-[#98989d] uppercase block mb-2" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.5, ...ff }}>
                    Nome do {saveAsType === "dashboard" ? "Dashboard" : "Relatório"}
                  </label>
                  <input
                    type="text"
                    value={dashboardName}
                    onChange={e => setDashboardName(e.target.value)}
                    placeholder="Ex: Análise de Vendas Q4"
                    className="w-full h-[44px] px-4 rounded-[12px] border border-[#DDE3EC] text-[#122232] placeholder:text-[#98989d] focus:outline-none focus:border-[#0483AB] transition-colors"
                    style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3, ...ff }}
                  />
                </div>

                {/* Descrição (Opcional) */}
                <div>
                  <label className="text-[#98989d] uppercase block mb-2" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.5, ...ff }}>
                    Descrição (Opcional)
                  </label>
                  <textarea
                    value={dashboardDesc}
                    onChange={e => setDashboardDesc(e.target.value)}
                    placeholder="Adicione uma descrição para este dashboard..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-[12px] border border-[#DDE3EC] text-[#122232] placeholder:text-[#98989d] focus:outline-none focus:border-[#0483AB] transition-colors resize-none"
                    style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3, ...ff }}
                  />
                </div>

                {/* Opções de Privacidade */}
                <div>
                  <label className="text-[#98989d] uppercase block mb-3" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.5, ...ff }}>
                    Compartilhamento
                  </label>
                  
                  <div className="flex flex-col gap-2">
                    {/* Privado */}
                    <button
                      onClick={() => setIsPublic(false)}
                      className={`flex items-start gap-3 p-4 rounded-[12px] border-2 transition-all cursor-pointer ${
                        !isPublic 
                          ? "border-[#0483AB] bg-[#DCF0FF]" 
                          : "border-[#DDE3EC] bg-white hover:bg-[#F6F7F9]"
                      }`}
                    >
                      <div className={`flex items-center justify-center w-[40px] h-[40px] rounded-[10px] shrink-0 ${
                        !isPublic ? "bg-[#0483AB]" : "bg-[#F6F7F9]"
                      }`}>
                        <Lock size={20} weight={!isPublic ? "fill" : "bold"} className={!isPublic ? "text-white" : "text-[#4E6987]"} />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-[#122232]" style={{ fontSize: 14, fontWeight: 600, letterSpacing: -0.3, ...ff }}>
                            Privado
                          </h4>
                          {!isPublic && (
                            <div className="flex items-center gap-1 h-[20px] px-2 rounded-full bg-[#0483AB]">
                              <Check size={10} weight="bold" className="text-white" />
                              <span className="text-white uppercase" style={{ fontSize: 8, fontWeight: 700, letterSpacing: 0.5, ...ff }}>
                                Selecionado
                              </span>
                            </div>
                          )}
                        </div>
                        <p className="text-[#4E6987]" style={{ fontSize: 12, fontWeight: 500, letterSpacing: -0.2, ...ff }}>
                          Somente você pode visualizar e editar este dashboard
                        </p>
                      </div>
                    </button>

                    {/* Público */}
                    <button
                      onClick={() => setIsPublic(true)}
                      className={`flex items-start gap-3 p-4 rounded-[12px] border-2 transition-all cursor-pointer ${
                        isPublic 
                          ? "border-[#0483AB] bg-[#DCF0FF]" 
                          : "border-[#DDE3EC] bg-white hover:bg-[#F6F7F9]"
                      }`}
                    >
                      <div className={`flex items-center justify-center w-[40px] h-[40px] rounded-[10px] shrink-0 ${
                        isPublic ? "bg-[#0483AB]" : "bg-[#F6F7F9]"
                      }`}>
                        <Globe size={20} weight={isPublic ? "fill" : "bold"} className={isPublic ? "text-white" : "text-[#4E6987]"} />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-[#122232]" style={{ fontSize: 14, fontWeight: 600, letterSpacing: -0.3, ...ff }}>
                            Público
                          </h4>
                          {isPublic && (
                            <div className="flex items-center gap-1 h-[20px] px-2 rounded-full bg-[#0483AB]">
                              <Check size={10} weight="bold" className="text-white" />
                              <span className="text-white uppercase" style={{ fontSize: 8, fontWeight: 700, letterSpacing: 0.5, ...ff }}>
                                Selecionado
                              </span>
                            </div>
                          )}
                        </div>
                        <p className="text-[#4E6987]" style={{ fontSize: 12, fontWeight: 500, letterSpacing: -0.2, ...ff }}>
                          Todos os usuários da equipe podem visualizar este dashboard
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center gap-2 px-6 py-4 border-t border-[#EEF1F6] bg-[#F6F7F9]">
                <button
                  onClick={() => setSaveModal(false)}
                  className="flex items-center justify-center gap-2 h-[34px] px-4 rounded-full bg-[#F6F7F9] text-[#4E6987] hover:bg-[#ebedf0] transition-colors cursor-pointer"
                >
                  <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...ff }}>
                    Cancelar
                  </span>
                </button>
                <div className="flex-1" />
                {/* Botão "Salvar como novo" — só aparece quando estamos editando um existente */}
                {editingReportId && (
                  <button
                    onClick={saveAsNew}
                    disabled={isSaving || !dashboardName.trim()}
                    className={`flex items-center justify-center gap-1.5 h-[34px] px-4 rounded-full transition-colors cursor-pointer ${
                      isSaving || !dashboardName.trim()
                        ? "bg-[#D9D9D9] text-white cursor-not-allowed"
                        : "bg-white text-[#122232] border border-[#DDE3EC] hover:bg-[#F6F7F9] hover:border-[#c5cdd8]"
                    }`}
                  >
                    <Copy size={14} weight="bold" />
                    <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...ff }}>Salvar como novo</span>
                  </button>
                )}
                <button
                  onClick={saveDashboard}
                  disabled={isSaving || !dashboardName.trim()}
                  className={`flex items-center justify-center gap-2 h-[34px] px-4 rounded-full transition-colors cursor-pointer ${
                    isSaving || !dashboardName.trim()
                      ? "bg-[#D9D9D9] text-white cursor-not-allowed"
                      : "bg-[#3CCEA7] text-white hover:bg-[#30B893]"
                  }`}
                >
                  {isSaving ? (
                    <><Spinner size={14} className="animate-spin" /> <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...ff }}>Salvando...</span></>
                  ) : (
                    <><FloppyDisk size={14} weight="bold" /> <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...ff }}>{editingReportId ? "Atualizar" : "Salvar"}</span></>
                  )}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Field Context Menu */}
      {contextMenuField && (
        <>
          <div className="fixed inset-0 z-[60]" onClick={() => setContextMenuField(null)} />
          <div 
            className="fixed z-[70] w-[200px] bg-white rounded-[8px] shadow-xl border border-[#EEF1F6] py-1"
            style={{ 
              left: contextMenuField.x, 
              top: contextMenuField.y,
              maxHeight: 'calc(100vh - 40px)',
              overflowY: 'auto'
            }}
          >
            <button
              onClick={() => {
                const field = contextMenuField.field;
                if (field.type === "measure") {
                  setRowShelf(prev => [...prev, { field }]);
                } else {
                  setColShelf(prev => [...prev, { field }]);
                }
                toast.success(`Campo adicionado: ${field.label}`);
                setContextMenuField(null);
              }}
              className="flex items-center gap-2 w-full px-3 py-1.5 hover:bg-[#F6F7F9] transition-colors"
            >
              <Plus size={14} weight="duotone" className="text-[#4E6987]" />
              <span className="text-[#122232]" style={{ fontSize: 11, fontWeight: 500, ...ff }}>Adicionar à Sheet</span>
            </button>
            
            <button
              onClick={() => {
                const field = contextMenuField.field;
                // Duplicate field logic
                toast.info("Funcionalidade em desenvolvimento");
                setContextMenuField(null);
              }}
              className="flex items-center gap-2 w-full px-3 py-1.5 hover:bg-[#F6F7F9] transition-colors"
            >
              <Copy size={14} weight="duotone" className="text-[#4E6987]" />
              <span className="text-[#122232]" style={{ fontSize: 11, fontWeight: 500, ...ff }}>Duplicar</span>
            </button>
            
            <button
              onClick={() => {
                const fieldId = contextMenuField.field.id;
                setRenamingFieldId(fieldId);
                setContextMenuField(null);
              }}
              className="flex items-center gap-2 w-full px-3 py-1.5 hover:bg-[#F6F7F9] transition-colors"
            >
              <PencilSimple size={14} weight="duotone" className="text-[#4E6987]" />
              <span className="text-[#122232]" style={{ fontSize: 11, fontWeight: 500, ...ff }}>Renomear</span>
            </button>
            
            <div className="h-[1px] bg-[#EEF1F6] my-1" />
            
            <button
              onClick={() => {
                const fieldId = contextMenuField.field.id;
                setHiddenFields(prev => {
                  const next = new Set(prev);
                  if (next.has(fieldId)) {
                    next.delete(fieldId);
                    toast.success("Campo exibido");
                  } else {
                    next.add(fieldId);
                    toast.success("Campo ocultado");
                  }
                  return next;
                });
                setContextMenuField(null);
              }}
              className="flex items-center gap-2 w-full px-3 py-1.5 hover:bg-[#F6F7F9] transition-colors"
            >
              <EyeSlash size={14} weight="duotone" className="text-[#4E6987]" />
              <span className="text-[#122232]" style={{ fontSize: 11, fontWeight: 500, ...ff }}>
                {hiddenFields.has(contextMenuField.field.id) ? "Mostrar" : "Ocultar"}
              </span>
            </button>
            
            <div className="h-[1px] bg-[#EEF1F6] my-1" />
            
            <button
              onClick={() => {
                const fieldName = fieldRenames.get(contextMenuField.field.id) || contextMenuField.field.label;
                setFieldRenames(prev => {
                  const next = new Map(prev);
                  next.delete(contextMenuField.field.id);
                  return next;
                });
                toast.success(`Nome revertido para: ${contextMenuField.field.label}`);
                setContextMenuField(null);
              }}
              className="flex items-center gap-2 w-full px-3 py-1.5 hover:bg-[#F6F7F9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!fieldRenames.has(contextMenuField.field.id)}
            >
              <ArrowCounterClockwise size={14} weight="duotone" className="text-[#4E6987]" />
              <span className="text-[#122232]" style={{ fontSize: 11, fontWeight: 500, ...ff }}>Reverter Nome</span>
            </button>
          </div>
        </>
      )}
      
      {/* Shelf Item Context Menu (right-click on pills in shelves) */}
      {shelfContextMenu && (
        <>
          <div className="fixed inset-0 z-[60]" onClick={() => setShelfContextMenu(null)} />
          <div 
            className="fixed z-[70] w-[200px] bg-white rounded-[8px] shadow-xl border border-[#EEF1F6] py-1"
            style={{ 
              left: shelfContextMenu.x, 
              top: shelfContextMenu.y,
              maxHeight: 'calc(100vh - 40px)',
              overflowY: 'auto'
            }}
          >
            <button
              onClick={() => {
                const fieldId = shelfContextMenu.field.id;
                // Highlight field in Data Pane
                setHighlightedFieldId(fieldId);
                // Switch to Data pane if in Analytics
                setActivePane("data");
                // Expand the table containing this field
                const table = CRM_TABLES.find(t => t.fields.some(f => f.id === fieldId));
                if (table) {
                  setExpandedTables(prev => new Set(prev).add(table.id));
                }
                // Scroll to field (simple implementation)
                setTimeout(() => {
                  const fieldElement = document.querySelector(`[data-field-id="${fieldId}"]`);
                  fieldElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
                toast.success(`Campo destacado: ${shelfContextMenu.field.label}`);
                setShelfContextMenu(null);
              }}
              className="flex items-center gap-2 w-full px-3 py-1.5 hover:bg-[#F6F7F9] transition-colors"
            >
              <MagnifyingGlass size={14} weight="duotone" className="text-[#4E6987]" />
              <span className="text-[#122232]" style={{ fontSize: 11, fontWeight: 500, ...ff }}>Localizar no Data Pane</span>
            </button>
            
            <div className="h-[1px] bg-[#EEF1F6] my-1" />
            
            <button
              onClick={() => {
                const { field, idx, shelf } = shelfContextMenu;
                // Remove from shelf
                if (shelf === "col") {
                  setColShelf(prev => prev.filter((_, i) => i !== idx));
                } else if (shelf === "row") {
                  setRowShelf(prev => prev.filter((_, i) => i !== idx));
                }
                toast.success(`Campo removido: ${field.label}`);
                setShelfContextMenu(null);
              }}
              className="flex items-center gap-2 w-full px-3 py-1.5 hover:bg-[#F6F7F9] transition-colors"
            >
              <Trash size={14} weight="duotone" className="text-[#F56233]" />
              <span className="text-[#122232]" style={{ fontSize: 11, fontWeight: 500, ...ff }}>Remover da Shelf</span>
            </button>
            
            {shelfContextMenu.field.type === "measure" && (
              <>
                <div className="h-[1px] bg-[#EEF1F6] my-1" />
                <button
                  onClick={() => {
                    const { shelf, idx } = shelfContextMenu;
                    setEditingMeasure({ shelf: shelf as "col" | "row", idx });
                    setShelfContextMenu(null);
                  }}
                  className="flex items-center gap-2 w-full px-3 py-1.5 hover:bg-[#F6F7F9] transition-colors"
                >
                  <FunctionIcon size={14} weight="duotone" className="text-[#4E6987]" />
                  <span className="text-[#122232]" style={{ fontSize: 11, fontWeight: 500, ...ff }}>Alterar Agregação</span>
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

/* ── Export with DndProvider ── */
export function DashVisualBuilder() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="rounded-[16px] overflow-hidden h-full">
        <VisualBuilderInner />
      </div>
    </DndProvider>
  );
}
