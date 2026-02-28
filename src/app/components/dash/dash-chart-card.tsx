import { motion } from "motion/react";
import { type ReactNode } from "react";

const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

interface DashChartCardProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  delay?: number;
  action?: ReactNode;
}

export function DashChartCard({ title, subtitle, icon, children, className = "", delay = 0, action }: DashChartCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
      className={`bg-white rounded-[16px] border border-[#DDE3EC] overflow-hidden ${className}`}
      style={{ boxShadow: "0px 1px 3px rgba(18,34,50,0.04)" }}
    >
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <div className="flex items-center gap-2.5">
          {icon && <span className="text-[#0483AB]">{icon}</span>}
          <div>
            <span className="text-[#122232] block" style={{ fontSize: 15, fontWeight: 700, letterSpacing: -0.5, ...ff }}>
              {title}
            </span>
            {subtitle && (
              <span className="text-[#4E6987] block" style={{ fontSize: 11, fontWeight: 500, letterSpacing: -0.3, ...ff }}>
                {subtitle}
              </span>
            )}
          </div>
        </div>
        {action}
      </div>
      <div className="px-5 pb-5">{children}</div>
    </motion.div>
  );
}
