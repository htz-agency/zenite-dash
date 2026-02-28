/* ================================================================== */
/*  Zenite Dash — Global Filter Context                                */
/*  Cross-filtering, date ranges, owner/stage/source filters           */
/* ================================================================== */

import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from "react";

export interface DashFilters {
  /* Period */
  dateRange: { from: Date; to: Date };
  period: "7d" | "30d" | "90d" | "6m" | "1y" | "ytd" | "all" | "custom";
  /* Dimensional filters */
  owners: string[];
  stages: string[];
  sources: string[];
  segments: string[];
  /* Cross-filter (from chart interactions) */
  crossFilter: { dimension: string; value: string } | null;
  /* Drill-down */
  drillPath: DrillLevel[];
}

export interface DrillLevel {
  label: string;
  dimension: string;
  value: string;
}

interface FilterCtx extends DashFilters {
  setPeriod: (p: DashFilters["period"]) => void;
  setDateRange: (from: Date, to: Date) => void;
  toggleOwner: (owner: string) => void;
  toggleStage: (stage: string) => void;
  toggleSource: (source: string) => void;
  toggleSegment: (seg: string) => void;
  setCrossFilter: (dim: string, val: string) => void;
  clearCrossFilter: () => void;
  pushDrill: (level: DrillLevel) => void;
  popDrill: () => void;
  clearDrill: () => void;
  clearAll: () => void;
  activeFilterCount: number;
  /* Helper: does a date pass the filter? */
  inDateRange: (dateStr: string | null | undefined) => boolean;
  /* Helper: does an entity pass all filters? */
  matchesFilters: (entity: { owner?: string; stage?: string; source?: string; origin?: string; segment?: string; createdAt?: string }) => boolean;
}

function periodToRange(p: DashFilters["period"]): { from: Date; to: Date } {
  const now = new Date();
  const to = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
  let from: Date;
  switch (p) {
    case "7d": from = new Date(to.getTime() - 7 * 864e5); break;
    case "30d": from = new Date(to.getTime() - 30 * 864e5); break;
    case "90d": from = new Date(to.getTime() - 90 * 864e5); break;
    case "6m": from = new Date(to.getFullYear(), to.getMonth() - 6, to.getDate()); break;
    case "1y": from = new Date(to.getFullYear() - 1, to.getMonth(), to.getDate()); break;
    case "ytd": from = new Date(to.getFullYear(), 0, 1); break;
    case "all": from = new Date(2020, 0, 1); break;
    default: from = new Date(to.getTime() - 30 * 864e5);
  }
  return { from, to };
}

const defaults: DashFilters = {
  dateRange: periodToRange("all"),
  period: "all",
  owners: [],
  stages: [],
  sources: [],
  segments: [],
  crossFilter: null,
  drillPath: [],
};

const FilterContext = createContext<FilterCtx>({
  ...defaults,
  setPeriod: () => {},
  setDateRange: () => {},
  toggleOwner: () => {},
  toggleStage: () => {},
  toggleSource: () => {},
  toggleSegment: () => {},
  setCrossFilter: () => {},
  clearCrossFilter: () => {},
  pushDrill: () => {},
  popDrill: () => {},
  clearDrill: () => {},
  clearAll: () => {},
  activeFilterCount: 0,
  inDateRange: () => true,
  matchesFilters: () => true,
});

export function useDashFilters() {
  return useContext(FilterContext);
}

function toggleInArray(arr: string[], val: string): string[] {
  return arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val];
}

export function DashFilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<DashFilters>(defaults);

  const setPeriod = useCallback((p: DashFilters["period"]) => {
    setFilters(f => ({ ...f, period: p, dateRange: periodToRange(p) }));
  }, []);

  const setDateRange = useCallback((from: Date, to: Date) => {
    setFilters(f => ({ ...f, period: "custom", dateRange: { from, to } }));
  }, []);

  const toggleOwner = useCallback((o: string) => setFilters(f => ({ ...f, owners: toggleInArray(f.owners, o) })), []);
  const toggleStage = useCallback((s: string) => setFilters(f => ({ ...f, stages: toggleInArray(f.stages, s) })), []);
  const toggleSource = useCallback((s: string) => setFilters(f => ({ ...f, sources: toggleInArray(f.sources, s) })), []);
  const toggleSegment = useCallback((s: string) => setFilters(f => ({ ...f, segments: toggleInArray(f.segments, s) })), []);

  const setCrossFilter = useCallback((dimension: string, value: string) => {
    setFilters(f => {
      if (f.crossFilter?.dimension === dimension && f.crossFilter?.value === value) {
        return { ...f, crossFilter: null };
      }
      return { ...f, crossFilter: { dimension, value } };
    });
  }, []);

  const clearCrossFilter = useCallback(() => setFilters(f => ({ ...f, crossFilter: null })), []);

  const pushDrill = useCallback((level: DrillLevel) => {
    setFilters(f => ({ ...f, drillPath: [...f.drillPath, level] }));
  }, []);

  const popDrill = useCallback(() => {
    setFilters(f => ({ ...f, drillPath: f.drillPath.slice(0, -1) }));
  }, []);

  const clearDrill = useCallback(() => {
    setFilters(f => ({ ...f, drillPath: [] }));
  }, []);

  const clearAll = useCallback(() => setFilters(defaults), []);

  const activeFilterCount = useMemo(() => {
    let c = 0;
    if (filters.period !== "all") c++;
    c += filters.owners.length;
    c += filters.stages.length;
    c += filters.sources.length;
    c += filters.segments.length;
    if (filters.crossFilter) c++;
    return c;
  }, [filters]);

  const inDateRange = useCallback((dateStr: string | null | undefined) => {
    if (!dateStr || filters.period === "all") return true;
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return true;
    return d >= filters.dateRange.from && d <= filters.dateRange.to;
  }, [filters.dateRange, filters.period]);

  const matchesFilters = useCallback((entity: { owner?: string; stage?: string; source?: string; origin?: string; segment?: string; createdAt?: string }) => {
    if (!inDateRange(entity.createdAt)) return false;
    if (filters.owners.length > 0 && entity.owner && !filters.owners.includes(entity.owner)) return false;
    if (filters.stages.length > 0 && entity.stage && !filters.stages.includes(entity.stage)) return false;
    if (filters.sources.length > 0) {
      const src = entity.source || entity.origin || "";
      if (src && !filters.sources.includes(src)) return false;
    }
    if (filters.segments.length > 0 && entity.segment && !filters.segments.includes(entity.segment)) return false;
    if (filters.crossFilter) {
      const dim = filters.crossFilter.dimension;
      const val = filters.crossFilter.value;
      const entityVal = (entity as any)[dim];
      if (entityVal && entityVal !== val) return false;
    }
    return true;
  }, [filters, inDateRange]);

  return (
    <FilterContext.Provider value={{
      ...filters,
      setPeriod, setDateRange,
      toggleOwner, toggleStage, toggleSource, toggleSegment,
      setCrossFilter, clearCrossFilter,
      pushDrill, popDrill, clearDrill,
      clearAll, activeFilterCount,
      inDateRange, matchesFilters,
    }}>
      {children}
    </FilterContext.Provider>
  );
}

/* ── Period options for UI ── */
export const PERIOD_OPTIONS: { value: DashFilters["period"]; label: string }[] = [
  { value: "7d", label: "7 dias" },
  { value: "30d", label: "30 dias" },
  { value: "90d", label: "90 dias" },
  { value: "6m", label: "6 meses" },
  { value: "1y", label: "1 ano" },
  { value: "ytd", label: "Ano atual" },
  { value: "all", label: "Todos" },
];
