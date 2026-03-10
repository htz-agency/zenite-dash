/* ================================================================== */
/*  Dash Report View — Visualização de relatório salvo                */
/* ================================================================== */

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { 
  ArrowLeft, 
  Spinner, 
  Warning, 
  PresentationChart,
  Heart,
  Building,
  IdentificationCard,
  SketchLogo,
  Lightning,
  PencilSimple,
  DotsThree,
  CaretUp,
  CaretDown,
  X,
  GoogleLogo,
  MetaLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";
import { toast } from "sonner";
import { projectId, publicAnonKey } from "/utils/supabase/info";
import { useDashData, formatNumber } from "./dash-data-provider";
import { processDashData } from "../../hooks/use-dash-data-processor";
import { DashChartRenderer } from "./dash-chart-renderer";
import { relativeDateToRange, isDateInRange } from "./dash-relative-date-utils";
import Frame191 from "../../../imports/Frame191";

const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

interface ReportConfig {
  sheetName: string;
  colShelf: any[];
  rowShelf: any[];
  filterShelf: any[];
  chartType: string;
  polarSubType?: string;
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

interface Report {
  id: string;
  name: string;
  description: string;
  isPublic: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
  config: ReportConfig;
}

// Tabela de ícones e cores para cada tipo de tabela
const TABLE_META: Record<string, { label: string; icon: React.ReactNode; color: string; bg: string }> = {
  leads: { label: "LEADS", icon: <Heart size={12} weight="fill" />, color: "#EAC23D", bg: "#FEEDCA" },
  opportunities: { label: "OPORTUNIDADES", icon: <SketchLogo size={12} weight="fill" />, color: "#07ABDE", bg: "#DCF0FF" },
  activities: { label: "ATIVIDADES", icon: <Lightning size={12} weight="fill" />, color: "#4E6987", bg: "#DDE3EC" },
  accounts: { label: "CONTAS", icon: <Building size={12} weight="fill" />, color: "#3CCEA7", bg: "#D9F8EF" },
  contacts: { label: "CONTATOS", icon: <IdentificationCard size={12} weight="fill" />, color: "#FF8C76", bg: "#FFEDEB" },
  monthlyRevenue: { label: "RECEITA MENSAL", icon: <SketchLogo size={12} weight="fill" />, color: "#07ABDE", bg: "#DCF0FF" },
  pipelineByStage: { label: "PIPELINE", icon: <SketchLogo size={12} weight="fill" />, color: "#07ABDE", bg: "#DCF0FF" },
  leadsBySource: { label: "LEADS POR ORIGEM", icon: <Heart size={12} weight="fill" />, color: "#EAC23D", bg: "#FEEDCA" },
  activityByType: { label: "ATIVIDADES POR TIPO", icon: <Lightning size={12} weight="fill" />, color: "#4E6987", bg: "#DDE3EC" },
  // Sync connector tables
  sync_google_ads: { label: "GOOGLE ADS", icon: <GoogleLogo size={12} weight="duotone" />, color: "#4285F4", bg: "#E8F0FE" },
  sync_meta_ads: { label: "META ADS", icon: <MetaLogo size={12} weight="duotone" />, color: "#0668E1", bg: "#E7F3FF" },
  sync_linkedin_ads: { label: "LINKEDIN ADS", icon: <LinkedinLogo size={12} weight="duotone" />, color: "#0A66C2", bg: "#E8F1FA" },
};

export function DashReportView() {
  const { id: reportId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  
  // Estado para redimensionamento de colunas
  const [columnWidths, setColumnWidths] = useState<Record<number, number>>({});
  const [resizingColumn, setResizingColumn] = useState<number | null>(null);
  const resizeStartX = useRef<number>(0);
  const resizeStartWidth = useRef<number>(0);

  // Contador que força reload mesmo quando reportId e location.key são iguais
  const [reloadCounter, setReloadCounter] = useState(0);

  // Buscar dados do provider
  const dashData = useDashData();

  // Get data for a table
  const getTableData = useCallback((tableId: string) => {
    switch (tableId) {
      case "leads": return dashData.leads;
      case "opportunities": return dashData.opportunities;
      case "activities": return dashData.activities;
      case "accounts": return dashData.accounts;
      case "contacts": return dashData.contacts;
      case "monthlyRevenue": return dashData.monthlyRevenue;
      case "pipelineByStage": return dashData.pipelineByStage;
      case "leadsBySource": return dashData.leadsBySource;
      case "activityByType": return dashData.activityByType;
      // Sync connector data
      case "sync_google_ads": return dashData.syncGoogleAds || [];
      case "sync_meta_ads": return dashData.syncMetaAds || [];
      case "sync_linkedin_ads": return dashData.syncLinkedinAds || [];
      default: return [];
    }
  }, [dashData]);

  // Carregar relatório — recarrega ao mudar reportId, location.key ou reloadCounter
  useEffect(() => {
    if (!reportId) {
      setError("ID do relatório não fornecido");
      setLoading(false);
      return;
    }

    let cancelled = false;

    console.log(`[DashReportView] Loading report (id=${reportId}, locationKey=${location.key}, reload=${reloadCounter})`);
    
    const doLoad = async () => {
      setLoading(true);
      setError(null);

      try {
        // Cache-bust: append timestamp para evitar resposta cacheada pelo browser
        const cacheBust = `_t=${Date.now()}`;
        const url = `https://${projectId}.supabase.co/functions/v1/make-server-d2ca3281/dash/visual-builder/get-report/${reportId}?${cacheBust}`;
        console.log("[DashReportView] Fetching:", url);
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
          cache: "no-store",
        });

        if (cancelled) return;

        console.log("[DashReportView] Response status:", response.status);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        if (cancelled) return;

        console.log("[DashReportView] Report loaded:", data);
        console.log("[DashReportView] Report updatedAt:", data.report?.updatedAt);
        console.log("[DashReportView] Report config.chartType:", data.report?.config?.chartType);
        console.log("[DashReportView] Report rowShelf length:", data.report?.config?.rowShelf?.length);
        console.log("[DashReportView] Report colShelf length:", data.report?.config?.colShelf?.length);
        setReport(data.report);
        setLoading(false);
      } catch (err) {
        if (cancelled) return;
        // Fallback: criar relatório demo quando servidor estiver offline
        if (err instanceof TypeError && err.message.includes("Failed to fetch")) {
          console.warn("[DashReportView] Server unavailable, using demo report");
          
          // Criar relatório demo básico
          const demoReport: Report = {
            id: reportId || "demo",
            name: "Relatório de Demonstração",
            description: "Relatório de exemplo (servidor indisponível)",
            isPublic: false,
            userId: "demo",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            config: {
              sheetName: "Planilha 1",
              colShelf: [],
              rowShelf: [
                {
                  field: {
                    id: "lead_name",
                    name: "name",
                    label: "Nome do Lead",
                    table: "leads",
                    type: "dimension",
                    dataType: "string"
                  },
                  aggFunc: null
                },
                {
                  field: {
                    id: "lead_company",
                    name: "company",
                    label: "Empresa",
                    table: "leads",
                    type: "dimension",
                    dataType: "string"
                  },
                  aggFunc: null
                },
                {
                  field: {
                    id: "lead_value",
                    name: "value",
                    label: "Valor",
                    table: "leads",
                    type: "measure",
                    dataType: "number"
                  },
                  aggFunc: "SUM"
                }
              ],
              filterShelf: [],
              chartType: "table",
              calculatedFields: []
            }
          };
          
          setReport(demoReport);
          setError(null);
          toast.info("📊 Usando dados de demonstração", { 
            description: "Servidor offline - visualizando relatório exemplo"
          });
        } else {
          console.error("[DashReportView] Error loading report:", err);
          setError("Erro ao carregar relatório");
          toast.error("Erro ao carregar relatório");
        }
        setLoading(false);
      }
    };

    doLoad();

    return () => { cancelled = true; };
  }, [reportId, location.key, reloadCounter]);

  // Processar dados do relatório usando hook compartilhado
  const processedData = useMemo(() => {
    if (!report || !report.config || dashData.loading) {
      return [];
    }

    const { rowShelf, colShelf, filterShelf, filterConfigs } = report.config;
    const allFields = [...rowShelf, ...colShelf];
    
    if (allFields.length === 0) {
      return [];
    }

    // Determinar tabela principal
    const primaryField = allFields[0];
    const rawSourceData = getTableData(primaryField.field.table);

    // ── Aplicar filtros (replica lógica do Visual Builder) ──────────
    let sourceData = rawSourceData;
    const filters = filterShelf || [];
    const fConfigs: Record<string, any> = filterConfigs || {};

    if (filters.length > 0) {
      console.log("[DashReportView] Applying", filters.length, "filter(s), filterConfigs:", fConfigs);

      filters.forEach((sf: any, idx: number) => {
        const field = sf.field;
        // filterConfigs pode ser indexado por número (como string) pois vem serializado de Object.fromEntries(Map)
        const config = fConfigs[String(idx)] || fConfigs[idx];

        // Sem config → pular este filtro
        if (!config) {
          console.log(`[DashReportView] Filter #${idx} (${field.label}): no config, skipping`);
          return;
        }

        const beforeCount = sourceData.length;
        sourceData = sourceData.filter((row: any) => {
          const value = row[field.name];

          // Filtro de data relativa
          if (field.dataType === "date" && config.isRelativeDate && config.relativeDateValue) {
            try {
              const dateRange = relativeDateToRange(config.relativeDateValue);
              return isDateInRange(value, dateRange);
            } catch (e) {
              console.warn("[DashReportView] Relative date filter error:", e);
              return true;
            }
          }

          // Filtro baseado em operador
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
              if (field.dataType === "number") return Number(value) > Number(config.value);
              if (field.dataType === "date") return new Date(value) > new Date(config.value as string);
              return false;
            case "lessThan":
              if (field.dataType === "number") return Number(value) < Number(config.value);
              if (field.dataType === "date") return new Date(value) < new Date(config.value as string);
              return false;
            case "greaterOrEqual":
              if (field.dataType === "number") return Number(value) >= Number(config.value);
              return false;
            case "lessOrEqual":
              if (field.dataType === "number") return Number(value) <= Number(config.value);
              return false;
            default:
              return true;
          }
        });
        console.log(`[DashReportView] Filter #${idx} (${field.label}, op=${config.operator}, val=${config.value}): ${beforeCount} → ${sourceData.length} rows`);
      });
    }

    return processDashData({
      rowShelf,
      colShelf,
      filterShelf: filters,
      sourceData,
      calculatedFields: report.config.calculatedFields || [],
    });
  }, [report, dashData]);

  // Dados ordenados
  const sortedData = useMemo(() => {
    if (!sortColumn) return processedData;

    return [...processedData].sort((a, b) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];

      if (aVal == null) return 1;
      if (bVal == null) return -1;

      const comparison = typeof aVal === "number" 
        ? aVal - bVal 
        : String(aVal).localeCompare(String(bVal));

      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [processedData, sortColumn, sortDirection]);

  // Handler de clique na coluna
  const handleColumnClick = (fieldName: string) => {
    if (sortColumn === fieldName) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(fieldName);
      setSortDirection("asc");
    }
  };

  // Handlers de redimensionamento de colunas
  const handleResizeStart = (e: React.MouseEvent, colIdx: number) => {
    e.preventDefault();
    e.stopPropagation();
    setResizingColumn(colIdx);
    resizeStartX.current = e.clientX;
    resizeStartWidth.current = columnWidths[colIdx] || 150;
  };

  useEffect(() => {
    if (resizingColumn === null) return;

    const handleMouseMove = (e: MouseEvent) => {
      const diff = e.clientX - resizeStartX.current;
      const newWidth = Math.max(80, resizeStartWidth.current + diff);
      setColumnWidths(prev => ({ ...prev, [resizingColumn]: newWidth }));
    };

    const handleMouseUp = () => {
      setResizingColumn(null);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [resizingColumn]);

  // Detectar tabela principal do relatório
  const primaryTable = useMemo(() => {
    if (!report?.config) return null;
    const allFields = [...report.config.rowShelf, ...report.config.colShelf];
    if (allFields.length === 0) return null;
    return allFields[0].field.table;
  }, [report]);

  const tableMeta = primaryTable ? TABLE_META[primaryTable] : null;

  // Calcular contagem real de registros da fonte (não agrupados)
  const actualRecordCount = useMemo(() => {
    if (!report?.config || !primaryTable) return 0;
    const sourceData = getTableData(primaryTable);
    return sourceData.length;
  }, [report, primaryTable, dashData]);

  // Contagem após filtros (para exibir na barra de metadados)
  const filteredRecordCount = useMemo(() => {
    if (!report?.config || !primaryTable) return 0;
    const rawData = getTableData(primaryTable);
    const filters = report.config.filterShelf || [];
    const fConfigs: Record<string, any> = report.config.filterConfigs || {};
    if (filters.length === 0) return rawData.length;

    let data = rawData;
    filters.forEach((sf: any, idx: number) => {
      const field = sf.field;
      const config = fConfigs[String(idx)] || fConfigs[idx];
      if (!config) return;
      data = data.filter((row: any) => {
        const value = row[field.name];
        if (field.dataType === "date" && config.isRelativeDate && config.relativeDateValue) {
          try {
            const dateRange = relativeDateToRange(config.relativeDateValue);
            return isDateInRange(value, dateRange);
          } catch { return true; }
        }
        switch (config.operator) {
          case "isEmpty": return value == null || value === "" || value === "null";
          case "isNotEmpty": return value != null && value !== "" && value !== "null";
          case "isTrue": return value === true;
          case "isFalse": return value === false || !value;
          case "equals":
            if (field.dataType === "number") return Number(value) === Number(config.value);
            if (field.dataType === "date") return new Date(value).toDateString() === new Date(config.value as string).toDateString();
            return String(value).toLowerCase() === String(config.value).toLowerCase();
          case "notEquals":
            if (field.dataType === "number") return Number(value) !== Number(config.value);
            if (field.dataType === "date") return new Date(value).toDateString() !== new Date(config.value as string).toDateString();
            return String(value).toLowerCase() !== String(config.value).toLowerCase();
          case "contains": return String(value).toLowerCase().includes(String(config.value).toLowerCase());
          case "notContains": return !String(value).toLowerCase().includes(String(config.value).toLowerCase());
          case "greaterThan":
            if (field.dataType === "number") return Number(value) > Number(config.value);
            if (field.dataType === "date") return new Date(value) > new Date(config.value as string);
            return false;
          case "lessThan":
            if (field.dataType === "number") return Number(value) < Number(config.value);
            if (field.dataType === "date") return new Date(value) < new Date(config.value as string);
            return false;
          case "greaterOrEqual":
            if (field.dataType === "number") return Number(value) >= Number(config.value);
            return false;
          case "lessOrEqual":
            if (field.dataType === "number") return Number(value) <= Number(config.value);
            return false;
          default: return true;
        }
      });
    });
    return data.length;
  }, [report, primaryTable, dashData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner size={32} weight="bold" className="text-[#0483AB] animate-spin" />
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Warning size={64} weight="duotone" className="text-[#F56233] mb-4" />
        <p className="text-[#122232] mb-2" style={{ fontSize: 18, fontWeight: 600, ...ff }}>
          {error || "Relatório não encontrado"}
        </p>
        <button
          onClick={() => navigate("/estudio/relatorios/todos")}
          className="flex items-center gap-2 h-[36px] px-4 rounded-full bg-[#0483AB] text-white hover:bg-[#025E7B] transition-colors mt-4"
          style={{ fontSize: 13, fontWeight: 600, ...ff }}
        >
          <ArrowLeft size={16} weight="bold" />
          Voltar para Relatórios
        </button>
      </div>
    );
  }

  const allFields = [...report.config.rowShelf, ...report.config.colShelf];

  console.log("[DashReportView] Report config:", report.config);
  console.log("[DashReportView] Chart type:", report.config.chartType);
  console.log("[DashReportView] All fields:", allFields);
  console.log("[DashReportView] Sorted data length:", sortedData.length);
  console.log("[DashReportView] First 3 rows:", sortedData.slice(0, 3));

  return (
    <div className="flex flex-col h-full bg-[#F6F7F9]">
      {/* Header */}
      <div className="bg-white border-b border-[#DDE3EC] px-[12px] py-[12px] rounded-t-[16px] rounded-b-[0px]">
        <div className="flex items-center gap-[10px]">
          {/* Back Button + Icon */}
          <button
            onClick={() => navigate("/estudio/relatorios/todos")}
            className="flex items-center justify-center bg-[#DDE3EC] rounded-[8px] shrink-0 size-[31px] text-[#28415C] hover:bg-[#C8CFD7] transition-colors"
          >
            <PresentationChart size={18} weight="duotone" />
          </button>

          {/* Title Area */}
          <div className="flex flex-col h-[30px] justify-end">
            <div
              className="text-[#64676C] uppercase h-[8px] flex items-center"
              style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, ...ff }}
            >
              RELATÓRIO
            </div>
            <div className="flex items-center h-[20px]">
              <p
                className="text-[#28415C] whitespace-nowrap"
                style={{ fontSize: 19, fontWeight: 700, letterSpacing: -0.5, ...ff }}
              >
                {report.name}
              </p>
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Action Buttons */}
          <div className="flex items-center gap-[8px]">
            {/* Sheet Selector */}
            <Frame191 />

            {/* Divider */}
            <div className="w-[1.5px] h-[20px] bg-[#DDE3EC]" />

            {/* Sync Toggle Group */}
            <div className="flex items-center gap-[8px]">
              <button 
                className="relative w-[40px] h-[22px] rounded-full transition-colors cursor-pointer shrink-0"
                style={{ backgroundColor: "#07ABDE" }}
              >
                <div
                  className="absolute top-[2px] w-[18px] h-[18px] rounded-full bg-white transition-all"
                  style={{ left: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }}
                />
              </button>

              <span className="text-[#4E6987] whitespace-nowrap" style={{ fontSize: 12, letterSpacing: -0.5, ...ff }}>
                Sincronizar
              </span>
            </div>

            {/* Divider */}
            <div className="w-[1.5px] h-[20px] bg-[#DDE3EC]" />

            {/* Publish Toggle Group */}
            <div className="flex items-center gap-[8px]">
              <button 
                className="relative w-[40px] h-[22px] rounded-full transition-colors cursor-pointer shrink-0"
                style={{ backgroundColor: "#C8CFDB" }}
              >
                <div
                  className="absolute top-[2px] w-[18px] h-[18px] rounded-full bg-white transition-all"
                  style={{ left: 2, boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }}
                />
              </button>

              <span className="text-[#4E6987] whitespace-nowrap" style={{ fontSize: 12, letterSpacing: -0.5, ...ff }}>
                Publicar
              </span>
            </div>

            {/* Divider */}
            <div className="w-[1.5px] h-[20px] bg-[#DDE3EC]" />

            {/* Action Pill — Design System compliant */}
            <div className="flex items-center gap-[10px] bg-[#F6F7F9] rounded-[100px] h-[44px] px-[5px]">
              <button
                onClick={() => navigate(`/estudio/visual?load=${reportId}&type=report`)}
                className="flex items-center justify-center size-[32px] rounded-full bg-transparent text-[#0483AB] hover:bg-[#DCF0FF] transition-colors cursor-pointer"
              >
                <PencilSimple size={18} weight="bold" />
              </button>
              <button 
                onClick={() => navigate("/estudio/relatorios/todos")}
                className="flex items-center justify-center size-[32px] rounded-full bg-transparent text-[#0483AB] hover:bg-[#DCF0FF] transition-colors cursor-pointer"
              >
                <X size={18} weight="bold" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Metadata Bar */}
      {tableMeta && (
        <div className="bg-white border-b border-[#DDE3EC] px-[12px] py-[8px] flex items-center gap-[16px]">
          <div className="flex items-center gap-[8px]">
            <span className="text-[#98989D] uppercase" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, ...ff }}>
              Tipo de relatório
            </span>
            {/* Detectar todas as tabelas únicas usadas no relatório */}
            {(() => {
              const allFields = [...report.config.rowShelf, ...report.config.colShelf];
              const uniqueTables = Array.from(new Set(allFields.map((item: any) => item.field.table)));
              
              return uniqueTables.map((table, idx) => {
                const meta = TABLE_META[table];
                if (!meta) return null;
                
                return (
                  <div key={table} className="flex items-center gap-[8px]">
                    {/* Etiqueta da tabela com cor específica */}
                    <div
                      className="rounded-full px-[10px] h-[22px] flex items-center gap-[6px]"
                      style={{ backgroundColor: meta.bg }}
                    >
                      <span style={{ fontSize: 12, color: meta.color, fontWeight: 600 }}>
                        {meta.icon}
                      </span>
                      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: -0.3, color: meta.color, ...ff }}>
                        {meta.label}
                      </span>
                    </div>
                    
                    {/* Seta entre tabelas (se houver mais de uma) */}
                    {idx < uniqueTables.length - 1 && (
                      <span className="text-[#98989D]" style={{ fontSize: 13 }}>→</span>
                    )}
                  </div>
                );
              });
            })()}
          </div>

          <div className="w-[1.5px] h-[20px] bg-[#DDE3EC]" />

          <div className="flex items-center gap-[8px]">
            <span className="text-[#98989D] uppercase" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, ...ff }}>
              Número de registros
            </span>
            <span className="text-[#28415C]" style={{ fontSize: 13, fontWeight: 600, ...ff }}>
              {filteredRecordCount !== actualRecordCount 
                ? `${filteredRecordCount} de ${actualRecordCount}`
                : actualRecordCount}
            </span>
          </div>

          {/* Filtros ativos indicator */}
          {(report.config.filterShelf?.length || 0) > 0 && (
            <>
              <div className="w-[1.5px] h-[20px] bg-[#DDE3EC]" />
              <div className="flex items-center gap-[6px]">
                <span className="text-[#98989D] uppercase" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, ...ff }}>
                  Filtros
                </span>
                <div className="flex items-center gap-[4px]">
                  {report.config.filterShelf.map((sf: any, idx: number) => {
                    const fConfig = report.config.filterConfigs?.[String(idx)] || report.config.filterConfigs?.[idx];
                    const label = sf.field?.label || sf.field?.name || "Filtro";
                    const op = fConfig?.operator || "?";
                    const val = fConfig?.isRelativeDate ? "data relativa" : (fConfig?.value ?? "");
                    return (
                      <div
                        key={idx}
                        className="rounded-full px-[8px] h-[20px] flex items-center gap-[4px] bg-[#DCF0FF]"
                        title={`${label} ${op} ${val}`}
                      >
                        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: -0.3, color: "#0483AB", ...ff }}>
                          {label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-[12px] bg-[#ffffff]">
        <div className="bg-white rounded-[15px] overflow-hidden border border-[#DDE3EC]">
          {allFields.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-[#98989D]" style={{ fontSize: 14, ...ff }}>
                Este relatório ainda não possui campos configurados.
              </p>
            </div>
          ) : report.config.chartType === "table" ? (
            /* ======== TABELA ======== */
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#F6F7F9]">
                    {allFields.map((item: any, idx: number) => (
                      <th
                        key={idx}
                        className="relative text-left px-[12px] py-[10px] border-t border-l border-[#DDE3EC] cursor-pointer hover:bg-[#EEF1F6] transition-colors"
                        style={{ width: columnWidths[idx] || 150 }}
                        onClick={() => handleColumnClick(item.field.name)}
                      >
                        <div className="flex items-center gap-[4px]">
                          <span
                            className="text-[#28415C]"
                            style={{ fontSize: 12, fontWeight: 700, letterSpacing: -0.5, ...ff }}
                          >
                            {item.field.label}
                          </span>
                          {sortColumn === item.field.name ? (
                            sortDirection === "asc" ? (
                              <CaretUp size={12} weight="bold" className="text-[#28415C]" />
                            ) : (
                              <CaretDown size={12} weight="bold" className="text-[#28415C]" />
                            )
                          ) : (
                            <CaretDown size={12} weight="regular" className="text-[#98989D]" />
                          )}
                        </div>
                        
                        {/* Resize Handle */}
                        <div
                          onMouseDown={(e) => handleResizeStart(e, idx)}
                          className="absolute top-0 right-0 w-[4px] h-full cursor-col-resize hover:bg-[#0483AB] transition-colors z-10"
                          style={{ 
                            backgroundColor: resizingColumn === idx ? '#0483AB' : 'transparent'
                          }}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedData.length === 0 ? (
                    <tr>
                      <td
                        colSpan={allFields.length}
                        className="px-[12px] py-8 text-center text-[#98989D]"
                        style={{ fontSize: 14, ...ff }}
                      >
                        {dashData.loading ? "Carregando dados..." : "Nenhum dado disponível"}
                      </td>
                    </tr>
                  ) : (
                    sortedData.map((row: any, rowIdx: number) => (
                      <tr
                        key={rowIdx}
                        className="hover:bg-[#F6F7F9] transition-colors"
                      >
                        {allFields.map((item: any, colIdx: number) => {
                          const value = row[item.field.name];
                          const isNumeric = item.field.type === "measure";

                          return (
                            <td
                              key={colIdx}
                              className={`px-[12px] py-[10px] text-[#28415C] border-t border-l border-[#DDE3EC] ${
                                isNumeric ? "text-right" : "text-left"
                              }`}
                              style={{ fontSize: 12, letterSpacing: -0.5, ...ff }}
                            >
                              {isNumeric ? formatNumber(value) : String(value || "-")}
                            </td>
                          );
                        })}
                      </tr>
                    ))
                  )}
                </tbody>
                {/* Summary Row — rendered if saved in report config */}
                {report.config.showSummaryRow && sortedData.length > 0 && (() => {
                  const SUMMARY_AGG_OPTIONS: Record<string, string> = {
                    sum: "Soma", avg: "Média", count: "Contagem", countd: "Distintos",
                    min: "Mínimo", max: "Máximo", median: "Mediana", none: "Nenhum",
                  };
                  // Build format lookup from field metadata (field.format, or fallback to name-based detection)
                  const CURRENCY_NAMES = new Set(["spend","cost","cpc","cpm","cpv","cost_per_click","cost_per_impression","budget","daily_budget","cost_per_conversion","cost_per_result","cost_per_lead","cost_per_purchase","cost_per_add_to_cart","cost_per_landing_page_view","cost_per_link_click","cost_per_unique_click","cost_per_lead_offline","cost_per_lead_website","cost_per_lead_on_meta","social_spend","revenue"]);
                  const PERCENT_NAMES = new Set(["ctr","conversion_rate","bounce_rate","view_rate","unique_ctr","inline_link_click_ctr","search_impression_share"]);
                  const RATIO_NAMES = new Set(["roas","frequency"]);
                  const isCurrency = (f: any) => f.format === "currency" || CURRENCY_NAMES.has(f.name);
                  const isPercent = (f: any) => f.format === "percent" || PERCENT_NAMES.has(f.name);
                  const isRatio = (f: any) => f.format === "ratio" || RATIO_NAMES.has(f.name);
                  const summaryFns = report.config.summaryFunctions || {};

                  const computeSummary = (field: any, fn: string): string => {
                    const vals = sortedData.map(r => r[field.name])
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
                    if (isCurrency(field)) return `R$ ${result.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                    if (isPercent(field)) {
                      const pct = result <= 1 && result >= 0 ? result * 100 : result;
                      return `${pct.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`;
                    }
                    if (isRatio(field)) return `${result.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}x`;
                    return result.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
                  };

                  const getDefaultFn = (field: any): string => {
                    if (isPercent(field) || isRatio(field)) return "avg";
                    if (isCurrency(field)) {
                      if (field.name.startsWith("cost_per") || field.name === "cpc" || field.name === "cpm" || field.name === "cpv") return "avg";
                      return "sum";
                    }
                    if (field.type === "measure") return "sum";
                    return "count";
                  };

                  return (
                    <tfoot>
                      <tr className="border-t-2 border-[#07ABDE] bg-[#F0FAFF] sticky bottom-0">
                        {allFields.map((item: any, idx: number) => {
                          // summaryFunctions may be keyed by label (from visual builder) or name
                          const fn = summaryFns[item.field.label] || summaryFns[item.field.name] || getDefaultFn(item.field);
                          const fnLabel = SUMMARY_AGG_OPTIONS[fn] || fn;
                          return (
                            <td key={`summary-rv-${idx}`}
                              className={`px-[12px] py-[10px] border-t border-l border-[#07ABDE]/20 ${item.field.type === "measure" ? "text-right" : "text-left"}`}
                              style={{ fontSize: 12, fontWeight: 700, letterSpacing: -0.5, ...ff }}>
                              <div className="flex flex-col gap-0.5">
                                <span className="text-[#07ABDE] uppercase" style={{ fontSize: 9, fontWeight: 600, letterSpacing: 0.3 }}>{fnLabel}</span>
                                <span className="text-[#122232]">{computeSummary(item.field, fn)}</span>
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    </tfoot>
                  );
                })()}
              </table>
            </div>
          ) : (
            /* ======== GRÁFICOS ======== */
            <div className="p-8">
              {sortedData.length === 0 ? (
                <div className="text-center text-[#98989D]" style={{ fontSize: 14, ...ff }}>
                  {dashData.loading ? "Carregando dados..." : "Nenhum dado disponível"}
                </div>
              ) : (
                <DashChartRenderer
                  data={sortedData}
                  config={report.config}
                  tableMeta={tableMeta}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}