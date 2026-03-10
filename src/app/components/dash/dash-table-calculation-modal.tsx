/* ==================================================================== */
/*  Zenite Dash — Table Calculation Modal                              */
/*  Configure table calculations like Tableau (Rank, Running Total,    */
/*  Percent of Total, Difference From, etc.)                           */
/* ==================================================================== */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Info, ChartLine } from "@phosphor-icons/react";

const ff = { fontFamily: "DM Sans, system-ui, sans-serif" };

export type TableCalculationType =
  | "rank"
  | "runningTotal"
  | "percentOfTotal"
  | "differenceFrom"
  | "percentDifferenceFrom"
  | "percentFrom"
  | "percentile"
  | "movingCalculation";

export type ComputeUsing =
  | "table-across"
  | "table-down"
  | "table-across-then-down"
  | "table-down-then-across"
  | "pane-down"
  | "pane-across-then-down"
  | "pane-down-then-across"
  | "cell"
  | "specific-dimensions";

export type RelativeTo = "previous" | "next" | "first" | "last";
export type RankType = "competition" | "modified-competition" | "dense" | "unique";
export type AggregationType = "sum" | "average" | "minimum" | "maximum";

export interface TableCalculationConfig {
  type: TableCalculationType;
  computeUsing: ComputeUsing;
  relativeTo?: RelativeTo; // For difference/percent calculations
  ascending?: boolean; // For rank/percentile
  rankType?: RankType; // For rank
  aggregationType?: AggregationType; // For running total/moving
  movingAverage?: number; // For moving calculation
}

interface TableCalculationModalProps {
  fieldLabel: string;
  currentConfig?: TableCalculationConfig;
  onSave: (config: TableCalculationConfig) => void;
  onClear: () => void;
  onClose: () => void;
}

const CALC_TYPES = [
  { value: "rank" as const, label: "Rank", description: "Ordena valores por posição" },
  { value: "runningTotal" as const, label: "Running Total", description: "Total acumulado" },
  { value: "percentOfTotal" as const, label: "Percent of Total", description: "% do total" },
  { value: "differenceFrom" as const, label: "Difference From", description: "Diferença absoluta" },
  { value: "percentDifferenceFrom" as const, label: "Percent Difference From", description: "Diferença %" },
  { value: "percentFrom" as const, label: "Percent From", description: "% de outro valor" },
  { value: "percentile" as const, label: "Percentile", description: "Ranking percentual" },
  { value: "movingCalculation" as const, label: "Moving Calculation", description: "Média móvel" },
];

const COMPUTE_USING_OPTIONS = [
  { value: "table-across" as const, label: "Table (across)", description: "Através das colunas" },
  { value: "table-down" as const, label: "Table (down)", description: "Através das linhas" },
  { value: "table-across-then-down" as const, label: "Table (across then down)", description: "Colunas depois linhas" },
  { value: "table-down-then-across" as const, label: "Table (down then across)", description: "Linhas depois colunas" },
  { value: "pane-down" as const, label: "Pane (down)", description: "Painel para baixo" },
  { value: "pane-across-then-down" as const, label: "Pane (across then down)", description: "Painel: colunas depois linhas" },
  { value: "pane-down-then-across" as const, label: "Pane (down then across)", description: "Painel: linhas depois colunas" },
  { value: "cell" as const, label: "Cell", description: "Célula individual" },
];

export function TableCalculationModal({
  fieldLabel,
  currentConfig,
  onSave,
  onClear,
  onClose,
}: TableCalculationModalProps) {
  const [calcType, setCalcType] = useState<TableCalculationType>(
    currentConfig?.type || "rank"
  );
  const [computeUsing, setComputeUsing] = useState<ComputeUsing>(
    currentConfig?.computeUsing || "table-across"
  );
  const [relativeTo, setRelativeTo] = useState<RelativeTo>(
    currentConfig?.relativeTo || "previous"
  );
  const [ascending, setAscending] = useState(currentConfig?.ascending ?? false);
  const [rankType, setRankType] = useState<RankType>(
    currentConfig?.rankType || "competition"
  );
  const [aggregationType, setAggregationType] = useState<AggregationType>(
    currentConfig?.aggregationType || "sum"
  );
  const [movingAverage, setMovingAverage] = useState(
    currentConfig?.movingAverage || 3
  );

  const handleSave = () => {
    const config: TableCalculationConfig = {
      type: calcType,
      computeUsing,
      ...(["differenceFrom", "percentDifferenceFrom", "percentFrom"].includes(calcType) && {
        relativeTo,
      }),
      ...(["rank", "percentile"].includes(calcType) && { ascending }),
      ...(calcType === "rank" && { rankType }),
      ...(["runningTotal", "movingCalculation"].includes(calcType) && { aggregationType }),
      ...(calcType === "movingCalculation" && { movingAverage }),
    };
    onSave(config);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-[10001]"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-[16px] w-[520px] flex flex-col border border-[#DDE3EC]"
        style={{ boxShadow: "0px 20px 60px rgba(18,34,50,0.2)", maxHeight: "90vh", ...ff }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EEF1F6]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[8px] bg-[#E5F4F9] flex items-center justify-center">
              <ChartLine size={16} className="text-[#0483AB]" weight="bold" />
            </div>
            <div>
              <h3 className="text-[#122232] font-semibold" style={{ fontSize: 16, letterSpacing: -0.4 }}>
                Table Calculation
              </h3>
              <p className="text-[#98989D]" style={{ fontSize: 12, letterSpacing: -0.2 }}>
                {fieldLabel}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#98989D] hover:text-[#122232] transition-colors">
            <X size={20} weight="bold" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* Calculation Type */}
          <div>
            <label className="block text-[#4E6987] mb-2" style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.2 }}>
              Calculation Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {CALC_TYPES.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setCalcType(type.value)}
                  className={`p-3 rounded-[10px] border-2 transition-all text-left ${
                    calcType === type.value
                      ? "border-[#0483AB] bg-[#E5F4F9]"
                      : "border-[#EEF1F6] hover:border-[#DDE3EC]"
                  }`}
                >
                  <div
                    className={calcType === type.value ? "text-[#0483AB]" : "text-[#122232]"}
                    style={{ fontSize: 13, fontWeight: 600, letterSpacing: -0.3, marginBottom: 2 }}
                  >
                    {type.label}
                  </div>
                  <div className="text-[#98989D]" style={{ fontSize: 11, letterSpacing: -0.2 }}>
                    {type.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Type-specific options */}
          {(calcType === "rank" || calcType === "percentile") && (
            <div>
              <label className="block text-[#4E6987] mb-2" style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.2 }}>
                Order
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setAscending(false)}
                  className={`flex-1 px-4 py-2.5 rounded-[8px] border-2 transition-all ${
                    !ascending
                      ? "border-[#0483AB] bg-[#E5F4F9] text-[#0483AB]"
                      : "border-[#EEF1F6] text-[#4E6987] hover:border-[#DDE3EC]"
                  }`}
                  style={{ fontSize: 13, fontWeight: 600, letterSpacing: -0.3 }}
                >
                  Descending
                </button>
                <button
                  onClick={() => setAscending(true)}
                  className={`flex-1 px-4 py-2.5 rounded-[8px] border-2 transition-all ${
                    ascending
                      ? "border-[#0483AB] bg-[#E5F4F9] text-[#0483AB]"
                      : "border-[#EEF1F6] text-[#4E6987] hover:border-[#DDE3EC]"
                  }`}
                  style={{ fontSize: 13, fontWeight: 600, letterSpacing: -0.3 }}
                >
                  Ascending
                </button>
              </div>
            </div>
          )}

          {calcType === "rank" && (
            <div>
              <label className="block text-[#4E6987] mb-2" style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.2 }}>
                Rank Type
              </label>
              <select
                value={rankType}
                onChange={(e) => setRankType(e.target.value as RankType)}
                className="w-full px-3 py-2.5 rounded-[8px] border border-[#DDE3EC] text-[#122232] focus:outline-none focus:ring-2 focus:ring-[#0483AB]/20"
                style={{ fontSize: 13, letterSpacing: -0.3, ...ff }}
              >
                <option value="competition">Competition (1, 2, 2, 4)</option>
                <option value="modified-competition">Modified Competition (1, 3, 3, 4)</option>
                <option value="dense">Dense (1, 2, 2, 3)</option>
                <option value="unique">Unique (1, 2, 3, 4)</option>
              </select>
            </div>
          )}

          {["differenceFrom", "percentDifferenceFrom", "percentFrom"].includes(calcType) && (
            <div>
              <label className="block text-[#4E6987] mb-2" style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.2 }}>
                Relative to
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: "previous" as const, label: "Previous" },
                  { value: "next" as const, label: "Next" },
                  { value: "first" as const, label: "First" },
                  { value: "last" as const, label: "Last" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setRelativeTo(opt.value)}
                    className={`px-4 py-2.5 rounded-[8px] border-2 transition-all ${
                      relativeTo === opt.value
                        ? "border-[#0483AB] bg-[#E5F4F9] text-[#0483AB]"
                        : "border-[#EEF1F6] text-[#4E6987] hover:border-[#DDE3EC]"
                    }`}
                    style={{ fontSize: 13, fontWeight: 600, letterSpacing: -0.3 }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {["runningTotal", "movingCalculation"].includes(calcType) && (
            <div>
              <label className="block text-[#4E6987] mb-2" style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.2 }}>
                Aggregation Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: "sum" as const, label: "Sum" },
                  { value: "average" as const, label: "Average" },
                  { value: "minimum" as const, label: "Minimum" },
                  { value: "maximum" as const, label: "Maximum" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setAggregationType(opt.value)}
                    className={`px-4 py-2.5 rounded-[8px] border-2 transition-all ${
                      aggregationType === opt.value
                        ? "border-[#0483AB] bg-[#E5F4F9] text-[#0483AB]"
                        : "border-[#EEF1F6] text-[#4E6987] hover:border-[#DDE3EC]"
                    }`}
                    style={{ fontSize: 13, fontWeight: 600, letterSpacing: -0.3 }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {calcType === "movingCalculation" && (
            <div>
              <label className="block text-[#4E6987] mb-2" style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.2 }}>
                Moving Average (periods)
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={movingAverage}
                onChange={(e) => setMovingAverage(parseInt(e.target.value) || 3)}
                className="w-full px-3 py-2.5 rounded-[8px] border border-[#DDE3EC] text-[#122232] focus:outline-none focus:ring-2 focus:ring-[#0483AB]/20"
                style={{ fontSize: 13, letterSpacing: -0.3, ...ff }}
              />
            </div>
          )}

          {/* Compute Using */}
          <div>
            <label className="block text-[#4E6987] mb-2" style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.2 }}>
              Compute Using
            </label>
            <div className="space-y-1">
              {COMPUTE_USING_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setComputeUsing(opt.value)}
                  className={`w-full px-3 py-2.5 rounded-[8px] border-2 transition-all text-left flex items-start gap-2 ${
                    computeUsing === opt.value
                      ? "border-[#0483AB] bg-[#E5F4F9]"
                      : "border-[#EEF1F6] hover:border-[#DDE3EC]"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center ${
                      computeUsing === opt.value
                        ? "border-[#0483AB] bg-[#0483AB]"
                        : "border-[#C8CFDB]"
                    }`}
                  >
                    {computeUsing === opt.value && (
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div
                      className={computeUsing === opt.value ? "text-[#0483AB]" : "text-[#122232]"}
                      style={{ fontSize: 13, fontWeight: 600, letterSpacing: -0.3 }}
                    >
                      {opt.label}
                    </div>
                    <div className="text-[#98989D]" style={{ fontSize: 11, letterSpacing: -0.2 }}>
                      {opt.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Info box */}
          <div className="flex items-start gap-2 p-3 rounded-[10px] bg-[#F6F7F9] border border-[#EEF1F6]">
            <Info size={16} className="text-[#0483AB] mt-0.5 flex-shrink-0" weight="bold" />
            <div className="flex-1 text-[#4E6987]" style={{ fontSize: 11, letterSpacing: -0.2 }}>
              Table calculations são aplicados aos valores já agregados na visualização. Eles não afetam a consulta aos dados.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-2 justify-between px-6 py-4 border-t border-[#EEF1F6]">
          <button
            onClick={onClear}
            className="px-4 py-2.5 rounded-[8px] text-[#FF6B6B] hover:bg-[#FFF4F2] transition-colors"
            style={{ fontSize: 13, fontWeight: 600, letterSpacing: -0.3, ...ff }}
          >
            Clear Calculation
          </button>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-[8px] text-[#4E6987] hover:bg-[#F6F7F9] transition-colors"
              style={{ fontSize: 13, fontWeight: 600, letterSpacing: -0.3, ...ff }}
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2.5 rounded-[8px] bg-[#0483AB] text-white hover:bg-[#025E7B] transition-colors"
              style={{ fontSize: 13, fontWeight: 600, letterSpacing: -0.3, ...ff }}
            >
              Apply
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
