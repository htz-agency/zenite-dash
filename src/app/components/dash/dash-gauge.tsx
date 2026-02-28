/* ================================================================== */
/*  Zenite Dash — Gauge (Medidor de Meta)                              */
/* ================================================================== */

import { motion } from "motion/react";

const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

interface GaugeProps {
  value: number;      // current value
  max: number;        // target/max value
  label: string;
  unit?: string;      // "R$", "%", etc
  color?: string;
  size?: number;
  formatValue?: (v: number) => string;
}

export function DashGauge({ value, max, label, unit = "", color = "#0483AB", size = 160, formatValue }: GaugeProps) {
  const pct = Math.min(Math.max(value / (max || 1), 0), 1);
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = Math.PI * radius; // half circle
  const offset = circumference * (1 - pct);

  const displayValue = formatValue ? formatValue(value) : `${unit}${value.toLocaleString("pt-BR")}`;
  const displayMax = formatValue ? formatValue(max) : `${unit}${max.toLocaleString("pt-BR")}`;

  const getColor = () => {
    if (pct >= 1) return "#3CCEA7";
    if (pct >= 0.7) return color;
    if (pct >= 0.4) return "#EAC23D";
    return "#ED5200";
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size / 2 + 20 }}>
        <svg width={size} height={size / 2 + strokeWidth} viewBox={`0 0 ${size} ${size / 2 + strokeWidth}`}>
          {/* Background arc */}
          <path
            d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
            fill="none"
            stroke="#EEF1F6"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Value arc */}
          <motion.path
            d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
            fill="none"
            stroke={getColor()}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-[#122232]"
            style={{ fontSize: size * 0.15, fontWeight: 700, letterSpacing: -0.5, lineHeight: 1, ...ff }}
          >
            {displayValue}
          </motion.span>
          <span className="text-[#98989d]" style={{ fontSize: 10, fontWeight: 500, ...ff }}>
            de {displayMax}
          </span>
        </div>
      </div>
      <span className="text-[#4E6987] mt-1" style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.3, ...ff }}>
        {label}
      </span>
      <span
        className="mt-0.5 px-2 py-0.5 rounded-full"
        style={{
          fontSize: 10,
          fontWeight: 700,
          backgroundColor: getColor() + "1A",
          color: getColor(),
          ...ff,
        }}
      >
        {(pct * 100).toFixed(0)}% da meta
      </span>
    </div>
  );
}
