/* ================================================================== */
/*  Zenite Dash — Drill-Down Panel                                     */
/*  Shows progressively granular data layers                           */
/* ================================================================== */

import { type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowLeft, CaretRight, MagnifyingGlass } from "@phosphor-icons/react";
import { useDashFilters, type DrillLevel } from "./dash-filter-context";

const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

interface DrillDownPanelProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function DrillDownPanel({ open, onClose, title, children }: DrillDownPanelProps) {
  const { drillPath, popDrill, clearDrill } = useDashFilters();

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-40"
            onClick={onClose}
          />
          {/* Panel */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-[720px] bg-white z-50 flex flex-col"
            style={{ boxShadow: "-8px 0 32px rgba(18,34,50,0.12)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#EEF1F6]">
              <div className="flex items-center gap-3 min-w-0">
                {drillPath.length > 0 && (
                  <button
                    onClick={popDrill}
                    className="flex items-center justify-center w-[32px] h-[32px] rounded-full bg-[#F6F7F9] text-[#4E6987] hover:bg-[#DDE3EC] transition-colors cursor-pointer shrink-0"
                  >
                    <ArrowLeft size={16} weight="bold" />
                  </button>
                )}
                <div className="min-w-0">
                  <h2 className="text-[#122232] truncate" style={{ fontSize: 18, fontWeight: 700, letterSpacing: -0.5, ...ff }}>
                    {title}
                  </h2>
                  {/* Breadcrumb */}
                  {drillPath.length > 0 && (
                    <div className="flex items-center gap-1 mt-0.5">
                      <button onClick={clearDrill} className="text-[#07ABDE] cursor-pointer hover:underline" style={{ fontSize: 11, fontWeight: 500, ...ff }}>
                        Início
                      </button>
                      {drillPath.map((level, i) => (
                        <span key={i} className="flex items-center gap-1">
                          <CaretRight size={10} className="text-[#C8CFDB]" />
                          <span className={i === drillPath.length - 1 ? "text-[#122232]" : "text-[#07ABDE] cursor-pointer hover:underline"}
                            style={{ fontSize: 11, fontWeight: 500, ...ff }}>
                            {level.label}
                          </span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="flex items-center justify-center w-[32px] h-[32px] rounded-full bg-[#F6F7F9] text-[#4E6987] hover:bg-[#DDE3EC] transition-colors cursor-pointer shrink-0"
              >
                <X size={16} weight="bold" />
              </button>
            </div>
            {/* Content */}
            <div className="flex-1 overflow-auto p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={drillPath.length}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ── Drill-down clickable row helper ── */
export function DrillRow({ label, value, sublabel, onClick, color }: {
  label: string;
  value: string | number;
  sublabel?: string;
  onClick?: () => void;
  color?: string;
}) {
  return (
    <motion.div
      whileHover={{ x: 4, backgroundColor: "#F6F7F9" }}
      onClick={onClick}
      className={`flex items-center justify-between px-4 py-3 rounded-[12px] border border-transparent hover:border-[#DDE3EC] transition-all ${onClick ? "cursor-pointer" : ""}`}
    >
      <div className="min-w-0">
        <span className="text-[#122232] block truncate" style={{ fontSize: 14, fontWeight: 600, letterSpacing: -0.3, ...ff }}>
          {label}
        </span>
        {sublabel && (
          <span className="text-[#98989d] block" style={{ fontSize: 11, fontWeight: 500, ...ff }}>
            {sublabel}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: -0.3, color: color || "#0483AB", ...ff }}>
          {value}
        </span>
        {onClick && <CaretRight size={14} className="text-[#C8CFDB]" />}
      </div>
    </motion.div>
  );
}
