/* ==================================================================== */
/*  Zenite Dash — Relative Date Picker Component                       */
/*  Date filter with relative date expressions (pt-BR)                 */
/* ==================================================================== */

import { useState } from "react";
import { Calendar, CaretDown } from "@phosphor-icons/react";

const ff = { fontFamily: "DM Sans, system-ui, sans-serif" };

/* ══════════════════════════════════════════════════════════════════ */
/*  RELATIVE DATE VALUES                                              */
/* ══════════════════════════════════════════════════════════════════ */

export type RelativeDatePreset =
  | "ONTEM"
  | "HOJE"
  | "AMANHÃ"
  | "SEMANA PASSADA"
  | "ESTA SEMANA"
  | "PRÓXIMA SEMANA"
  | "MÊS PASSADO"
  | "ESTE MÊS"
  | "PRÓXIMO MÊS"
  | "TRIMESTRE PASSADO"
  | "ESTE TRIMESTRE"
  | "PRÓXIMO TRIMESTRE"
  | "ANO PASSADO"
  | "ESTE ANO"
  | "PRÓXIMO ANO";

export type RelativeDateParametric =
  | "ÚLTIMOS n DIAS"
  | "PRÓXIMOS n DIAS"
  | "HÁ n DIAS"
  | "ÚLTIMAS n SEMANAS"
  | "PRÓXIMAS n SEMANAS"
  | "HÁ n SEMANAS"
  | "ÚLTIMOS n MESES"
  | "PRÓXIMOS n MESES"
  | "HÁ n MESES"
  | "ÚLTIMOS n TRIMESTRES"
  | "PRÓXIMOS n TRIMESTRES"
  | "HÁ n TRIMESTRES"
  | "ÚLTIMOS n ANOS"
  | "PRÓXIMOS n ANOS"
  | "HÁ n ANOS";

export interface RelativeDateValue {
  type: "preset" | "parametric";
  preset?: RelativeDatePreset;
  parametric?: {
    pattern: RelativeDateParametric;
    value: number;
  };
}

const PRESET_OPTIONS: { value: RelativeDatePreset; label: string; category: string }[] = [
  // Dias
  { value: "ONTEM", label: "Ontem", category: "Dias" },
  { value: "HOJE", label: "Hoje", category: "Dias" },
  { value: "AMANHÃ", label: "Amanhã", category: "Dias" },
  // Semanas
  { value: "SEMANA PASSADA", label: "Semana Passada", category: "Semanas" },
  { value: "ESTA SEMANA", label: "Esta Semana", category: "Semanas" },
  { value: "PRÓXIMA SEMANA", label: "Próxima Semana", category: "Semanas" },
  // Meses
  { value: "MÊS PASSADO", label: "Mês Passado", category: "Meses" },
  { value: "ESTE MÊS", label: "Este Mês", category: "Meses" },
  { value: "PRÓXIMO MÊS", label: "Próximo Mês", category: "Meses" },
  // Trimestres
  { value: "TRIMESTRE PASSADO", label: "Trimestre Passado", category: "Trimestres" },
  { value: "ESTE TRIMESTRE", label: "Este Trimestre", category: "Trimestres" },
  { value: "PRÓXIMO TRIMESTRE", label: "Próximo Trimestre", category: "Trimestres" },
  // Anos
  { value: "ANO PASSADO", label: "Ano Passado", category: "Anos" },
  { value: "ESTE ANO", label: "Este Ano", category: "Anos" },
  { value: "PRÓXIMO ANO", label: "Próximo Ano", category: "Anos" },
];

const PARAMETRIC_OPTIONS: { value: RelativeDateParametric; label: string; unit: string }[] = [
  { value: "ÚLTIMOS n DIAS", label: "Últimos", unit: "dias" },
  { value: "PRÓXIMOS n DIAS", label: "Próximos", unit: "dias" },
  { value: "HÁ n DIAS", label: "Há", unit: "dias" },
  { value: "ÚLTIMAS n SEMANAS", label: "Últimas", unit: "semanas" },
  { value: "PRÓXIMAS n SEMANAS", label: "Próximas", unit: "semanas" },
  { value: "HÁ n SEMANAS", label: "Há", unit: "semanas" },
  { value: "ÚLTIMOS n MESES", label: "Últimos", unit: "meses" },
  { value: "PRÓXIMOS n MESES", label: "Próximos", unit: "meses" },
  { value: "HÁ n MESES", label: "Há", unit: "meses" },
  { value: "ÚLTIMOS n TRIMESTRES", label: "Últimos", unit: "trimestres" },
  { value: "PRÓXIMOS n TRIMESTRES", label: "Próximos", unit: "trimestres" },
  { value: "HÁ n TRIMESTRES", label: "Há", unit: "trimestres" },
  { value: "ÚLTIMOS n ANOS", label: "Últimos", unit: "anos" },
  { value: "PRÓXIMOS n ANOS", label: "Próximos", unit: "anos" },
  { value: "HÁ n ANOS", label: "Há", unit: "anos" },
];

/* ══════════════════════════════════════════════════════════════════ */
/*  COMPONENT                                                         */
/* ══════════════════════════════════════════════════════════════════ */

interface RelativeDatePickerProps {
  value: RelativeDateValue;
  onChange: (value: RelativeDateValue) => void;
}

export function RelativeDatePicker({ value, onChange }: RelativeDatePickerProps) {
  const [mode, setMode] = useState<"preset" | "parametric">(value.type);
  const [selectedPreset, setSelectedPreset] = useState<RelativeDatePreset>(
    value.preset || "ESTE MÊS"
  );
  const [selectedParametric, setSelectedParametric] = useState<RelativeDateParametric>(
    value.parametric?.pattern || "ÚLTIMOS n DIAS"
  );
  const [parametricValue, setParametricValue] = useState<number>(
    value.parametric?.value || 7
  );

  const handleModeChange = (newMode: "preset" | "parametric") => {
    setMode(newMode);
    if (newMode === "preset") {
      onChange({ type: "preset", preset: selectedPreset });
    } else {
      onChange({
        type: "parametric",
        parametric: { pattern: selectedParametric, value: parametricValue },
      });
    }
  };

  const handlePresetChange = (preset: RelativeDatePreset) => {
    setSelectedPreset(preset);
    onChange({ type: "preset", preset });
  };

  const handleParametricChange = (pattern: RelativeDateParametric, num: number) => {
    setSelectedParametric(pattern);
    setParametricValue(num);
    onChange({ type: "parametric", parametric: { pattern, value: num } });
  };

  // Group presets by category
  const groupedPresets = PRESET_OPTIONS.reduce((acc, opt) => {
    if (!acc[opt.category]) acc[opt.category] = [];
    acc[opt.category].push(opt);
    return acc;
  }, {} as Record<string, typeof PRESET_OPTIONS>);

  return (
    <div className="flex flex-col gap-4">
      {/* Mode Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => handleModeChange("preset")}
          className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
            mode === "preset"
              ? "bg-[#0483AB] text-white"
              : "bg-[#F6F7F9] text-[#4E6987] hover:bg-[#EEF1F6]"
          }`}
          style={ff}
        >
          <Calendar size={14} weight="duotone" className="inline-block mr-1.5 -mt-0.5" />
          Períodos Comuns
        </button>
        <button
          onClick={() => handleModeChange("parametric")}
          className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
            mode === "parametric"
              ? "bg-[#0483AB] text-white"
              : "bg-[#F6F7F9] text-[#4E6987] hover:bg-[#EEF1F6]"
          }`}
          style={ff}
        >
          Personalizado
        </button>
      </div>

      {/* Preset Mode */}
      {mode === "preset" && (
        <div className="flex flex-col gap-3">
          {Object.entries(groupedPresets).map(([category, options]) => (
            <div key={category}>
              <p
                className="text-[#4E6987] mb-1.5 px-1"
                style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", ...ff }}
              >
                {category}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handlePresetChange(opt.value)}
                    className={`px-3 py-2.5 rounded-lg text-left text-sm transition-all ${
                      selectedPreset === opt.value
                        ? "bg-[#DCF0FF] text-[#0483AB] font-semibold border-2 border-[#0483AB]"
                        : "bg-[#F6F7F9] text-[#122232] hover:bg-[#EEF1F6] border-2 border-transparent"
                    }`}
                    style={ff}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Parametric Mode */}
      {mode === "parametric" && (
        <div className="flex flex-col gap-3">
          {/* Pattern Selector */}
          <div>
            <label
              className="block text-[#4E6987] mb-1.5 px-1"
              style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", ...ff }}
            >
              Tipo
            </label>
            <div className="relative">
              <select
                value={selectedParametric}
                onChange={(e) =>
                  handleParametricChange(e.target.value as RelativeDateParametric, parametricValue)
                }
                className="w-full px-3 py-2.5 pr-8 rounded-lg bg-[#F6F7F9] text-[#122232] text-sm border-2 border-transparent hover:border-[#C8CFD8] focus:border-[#0483AB] focus:outline-none transition-all appearance-none cursor-pointer"
                style={ff}
              >
                {PARAMETRIC_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label} {opt.unit}
                  </option>
                ))}
              </select>
              <CaretDown
                size={12}
                weight="bold"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4E6987] pointer-events-none"
              />
            </div>
          </div>

          {/* Value Input */}
          <div>
            <label
              className="block text-[#4E6987] mb-1.5 px-1"
              style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", ...ff }}
            >
              Quantidade
            </label>
            <input
              type="number"
              min="1"
              max="999"
              value={parametricValue}
              onChange={(e) => {
                const val = Math.max(1, Math.min(999, parseInt(e.target.value) || 1));
                handleParametricChange(selectedParametric, val);
              }}
              className="w-full px-3 py-2.5 rounded-lg bg-[#F6F7F9] text-[#122232] text-sm border-2 border-transparent hover:border-[#C8CFD8] focus:border-[#0483AB] focus:outline-none transition-all"
              style={ff}
            />
          </div>

          {/* Preview */}
          <div className="px-3 py-2.5 rounded-lg bg-[#DCF0FF] border border-[#C5E7FF]">
            <p className="text-[#0483AB] text-sm font-medium" style={ff}>
              {PARAMETRIC_OPTIONS.find((o) => o.value === selectedParametric)?.label}{" "}
              {parametricValue}{" "}
              {PARAMETRIC_OPTIONS.find((o) => o.value === selectedParametric)?.unit}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════ */
/*  HELPER: FORMAT RELATIVE DATE TO STRING                           */
/* ══════════════════════════════════════════════════════════════════ */

export function formatRelativeDate(value: RelativeDateValue): string {
  if (value.type === "preset") {
    const opt = PRESET_OPTIONS.find((o) => o.value === value.preset);
    return opt?.label || value.preset || "";
  } else if (value.parametric) {
    const opt = PARAMETRIC_OPTIONS.find((o) => o.value === value.parametric!.pattern);
    return `${opt?.label} ${value.parametric.value} ${opt?.unit}`;
  }
  return "";
}
