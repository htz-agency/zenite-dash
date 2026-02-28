import { motion } from "motion/react";
import { TrendUp, TrendDown } from "@phosphor-icons/react";
import { type ReactNode } from "react";

const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

interface DashKpiCardProps {
  label: string;
  value: string;
  change?: number;
  icon: ReactNode;
  iconBg: string;
  iconColor: string;
  delay?: number;
  sparkline?: number[];
}

export function DashKpiCard({ label, value, change, icon, iconBg, iconColor, delay = 0, sparkline }: DashKpiCardProps) {
  const isPositive = (change ?? 0) >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
      className="bg-white rounded-[16px] p-5 border border-[#DDE3EC] relative overflow-hidden group hover:border-[#0483AB]/30 transition-colors"
      style={{ boxShadow: "0px 1px 3px rgba(18,34,50,0.04)" }}
    >
      {/* Sparkline background */}
      {sparkline && (
        <svg className="absolute bottom-0 left-0 right-0 h-[40px] opacity-10" viewBox={`0 0 ${sparkline.length * 20} 40`} preserveAspectRatio="none">
          <polyline
            fill="none"
            stroke={iconColor}
            strokeWidth="2"
            points={sparkline.map((v, i) => `${i * 20},${40 - (v / Math.max(...sparkline)) * 35}`).join(" ")}
          />
        </svg>
      )}

      <div className="flex items-start justify-between mb-3 relative">
        <div
          className="flex items-center justify-center w-[40px] h-[40px] rounded-[10px]"
          style={{ backgroundColor: iconBg }}
        >
          <span style={{ color: iconColor }}>{icon}</span>
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${isPositive ? "bg-[#D9F8EF]" : "bg-[#FFEDEB]"}`}>
            {isPositive ? (
              <TrendUp size={12} weight="bold" className="text-[#3CCEA7]" />
            ) : (
              <TrendDown size={12} weight="bold" className="text-[#ED5200]" />
            )}
            <span
              className={isPositive ? "text-[#135543]" : "text-[#B13B00]"}
              style={{ fontSize: 11, fontWeight: 700, letterSpacing: -0.3, ...ff }}
            >
              {isPositive ? "+" : ""}{change}%
            </span>
          </div>
        )}
      </div>

      <p className="text-[#4E6987] relative" style={{ fontSize: 12, fontWeight: 500, letterSpacing: -0.3, ...ff }}>
        {label}
      </p>
      <motion.p
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: delay + 0.2, ease: [0.4, 0, 0.2, 1] }}
        className="text-[#122232] mt-1 relative"
        style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5, lineHeight: "32px", ...ff }}
      >
        {value}
      </motion.p>
    </motion.div>
  );
}
