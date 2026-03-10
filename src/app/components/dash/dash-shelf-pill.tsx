/* ==================================================================== */
/*  Zenite Dash — Shelf Pill Component                                 */
/*  Pill component for fields in shelves with context menu             */
/* ==================================================================== */

import { useState, useRef, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X, CaretDown, CaretRight, FunnelSimple, ArrowsDownUp, PaintBrush,
  Eye, ChartLine, Calendar, Hash, TextAa, Check,
} from "@phosphor-icons/react";
import type { TableCalculationConfig } from "./dash-table-calculation-modal";

const ff = { fontFamily: "DM Sans, system-ui, sans-serif" };

export type DateLevel = "year" | "quarter" | "month" | "day" | "week" | "weekday" | "hour" | "minute";

interface ShelfPillProps {
  icon?: ReactNode;
  label: string;
  aggregation?: string;
  tableCalc?: TableCalculationConfig;
  isDate?: boolean;
  dateLevel?: DateLevel;
  onRemove: () => void;
  onAggregationClick?: () => void;
  onTableCalcClick?: () => void;
  onDateLevelChange?: (level: DateLevel) => void;
  onFilterClick?: () => void;
  onSortClick?: () => void;
  onFormatClick?: () => void;
  onShowHeaderToggle?: () => void;
  onIncludeInTooltipToggle?: () => void;
  showHeader?: boolean;
  includeInTooltip?: boolean;
}

const DATE_LEVELS: Array<{ value: DateLevel; label: string }> = [
  { value: "year", label: "Year" },
  { value: "quarter", label: "Quarter" },
  { value: "month", label: "Month" },
  { value: "week", label: "Week" },
  { value: "weekday", label: "Weekday" },
  { value: "day", label: "Day" },
];

const MORE_DATE_LEVELS: Array<{ value: DateLevel; label: string }> = [
  { value: "hour", label: "Hour" },
  { value: "minute", label: "Minute" },
];

export function ShelfPill({
  icon,
  label,
  aggregation,
  tableCalc,
  isDate,
  dateLevel,
  onRemove,
  onAggregationClick,
  onTableCalcClick,
  onDateLevelChange,
  onFilterClick,
  onSortClick,
  onFormatClick,
  onShowHeaderToggle,
  onIncludeInTooltipToggle,
  showHeader = true,
  includeInTooltip = true,
}: ShelfPillProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showMoreDates, setShowMoreDates] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        pillRef.current &&
        !pillRef.current.contains(e.target as Node)
      ) {
        setShowMenu(false);
        setShowMoreDates(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowMenu(true);
  };

  const handleMenuItemClick = (action: () => void) => {
    action();
    setShowMenu(false);
    setShowMoreDates(false);
  };

  // Display label with aggregation
  const displayLabel = aggregation ? `${aggregation}(${label})` : label;
  const hasTableCalc = !!tableCalc;

  return (
    <>
      <div
        ref={pillRef}
        onContextMenu={handleContextMenu}
        className={`group relative inline-flex items-center h-[28px] px-[10px] gap-[6px] rounded-[100px] cursor-pointer select-none transition-all ${
          hasTableCalc
            ? "bg-[#E5F4F9] text-[#0483AB] border-2 border-[#0483AB]"
            : "bg-[#dcf0ff] text-[#28415c] hover:bg-[#bcdaf1]"
        }`}
        style={{ fontSize: 11, fontWeight: 600, letterSpacing: -0.3, ...ff }}
        onClick={() => setShowMenu(!showMenu)}
      >
        {/* Icon */}
        {icon && <span className="flex items-center justify-center">{icon}</span>}

        {/* Label */}
        <span className={hasTableCalc ? "italic" : ""}>{displayLabel}</span>

        {/* Dropdown indicator */}
        <CaretDown size={10} weight="bold" className="opacity-60" />

        {/* Remove button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity hover:text-[#FF6B6B]"
        >
          <X size={12} weight="bold" />
        </button>

        {/* Table calc indicator */}
        {hasTableCalc && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#0483AB] rounded-full flex items-center justify-center">
            <ChartLine size={8} className="text-white" weight="bold" />
          </div>
        )}
      </div>

      {/* Context Menu */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15 }}
            className="fixed bg-white rounded-[12px] border border-[#DDE3EC] shadow-[0_8px_24px_rgba(18,34,50,0.15)] py-2 min-w-[200px] z-[10002]"
            style={{
              left: pillRef.current?.getBoundingClientRect().left || 0,
              top: (pillRef.current?.getBoundingClientRect().bottom || 0) + 4,
              ...ff,
            }}
          >
            {/* Filter */}
            {onFilterClick && (
              <button
                onClick={() => handleMenuItemClick(onFilterClick)}
                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-[#F6F7F9] transition-colors text-left"
              >
                <FunnelSimple size={14} className="text-[#4E6987]" weight="duotone" />
                <span className="text-[#122232]" style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3 }}>
                  Filter...
                </span>
              </button>
            )}

            {/* Show Filter (placeholder) */}
            <button
              className="w-full flex items-center gap-2 px-3 py-2 hover:bg-[#F6F7F9] transition-colors text-left opacity-60 cursor-not-allowed"
              disabled
            >
              <span className="text-[#98989D]" style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3 }}>
                Show Filter
              </span>
            </button>

            <div className="h-[1px] bg-[#EEF1F6] my-1" />

            {/* Sort */}
            {onSortClick && (
              <button
                onClick={() => handleMenuItemClick(onSortClick)}
                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-[#F6F7F9] transition-colors text-left"
              >
                <ArrowsDownUp size={14} className="text-[#4E6987]" weight="duotone" />
                <span className="text-[#122232]" style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3 }}>
                  Sort...
                </span>
              </button>
            )}

            {/* Format */}
            {onFormatClick && (
              <button
                onClick={() => handleMenuItemClick(onFormatClick)}
                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-[#F6F7F9] transition-colors text-left"
              >
                <PaintBrush size={14} className="text-[#4E6987]" weight="duotone" />
                <span className="text-[#122232]" style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3 }}>
                  Format...
                </span>
              </button>
            )}

            <div className="h-[1px] bg-[#EEF1F6] my-1" />

            {/* Show Header */}
            {onShowHeaderToggle && (
              <button
                onClick={() => handleMenuItemClick(onShowHeaderToggle)}
                className="w-full flex items-center justify-between px-3 py-2 hover:bg-[#F6F7F9] transition-colors text-left"
              >
                <span className="text-[#122232]" style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3 }}>
                  Show Header
                </span>
                {showHeader && <Check size={14} className="text-[#0483AB]" weight="bold" />}
              </button>
            )}

            {/* Include in Tooltip */}
            {onIncludeInTooltipToggle && (
              <button
                onClick={() => handleMenuItemClick(onIncludeInTooltipToggle)}
                className="w-full flex items-center justify-between px-3 py-2 hover:bg-[#F6F7F9] transition-colors text-left"
              >
                <span className="text-[#122232]" style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3 }}>
                  Include in Tooltip
                </span>
                {includeInTooltip && <Check size={14} className="text-[#0483AB]" weight="bold" />}
              </button>
            )}

            {/* Aggregation (for measures) */}
            {onAggregationClick && (
              <>
                <div className="h-[1px] bg-[#EEF1F6] my-1" />
                <button
                  onClick={() => handleMenuItemClick(onAggregationClick)}
                  className="w-full flex items-center gap-2 px-3 py-2 hover:bg-[#F6F7F9] transition-colors text-left"
                >
                  <Hash size={14} className="text-[#3CCEA7]" weight="bold" />
                  <span className="text-[#122232]" style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3 }}>
                    Aggregation...
                  </span>
                </button>
              </>
            )}

            {/* Table Calculation */}
            {onTableCalcClick && (
              <>
                {!onAggregationClick && <div className="h-[1px] bg-[#EEF1F6] my-1" />}
                <button
                  onClick={() => handleMenuItemClick(onTableCalcClick)}
                  className="w-full flex items-center gap-2 px-3 py-2 hover:bg-[#F6F7F9] transition-colors text-left"
                >
                  <ChartLine size={14} className="text-[#0483AB]" weight="duotone" />
                  <span className="text-[#122232]" style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3 }}>
                    {hasTableCalc ? "Edit Table Calculation..." : "Add Table Calculation..."}
                  </span>
                </button>
              </>
            )}

            {/* Date Level Navigation */}
            {isDate && onDateLevelChange && (
              <>
                <div className="h-[1px] bg-[#EEF1F6] my-1" />
                {DATE_LEVELS.map((level) => (
                  <button
                    key={level.value}
                    onClick={() => handleMenuItemClick(() => onDateLevelChange(level.value))}
                    className="w-full flex items-center justify-between px-3 py-2 hover:bg-[#F6F7F9] transition-colors text-left"
                  >
                    <span className="text-[#122232]" style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3 }}>
                      {level.label}
                    </span>
                    {dateLevel === level.value && (
                      <Check size={14} className="text-[#0483AB]" weight="bold" />
                    )}
                  </button>
                ))}

                {/* More submenu */}
                <div className="relative">
                  <button
                    onClick={() => setShowMoreDates(!showMoreDates)}
                    className="w-full flex items-center justify-between px-3 py-2 hover:bg-[#F6F7F9] transition-colors text-left"
                  >
                    <span className="text-[#122232]" style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3 }}>
                      More
                    </span>
                    <CaretRight size={14} className="text-[#4E6987]" weight="bold" />
                  </button>

                  {showMoreDates && (
                    <div
                      className="absolute left-full top-0 ml-1 bg-white rounded-[12px] border border-[#DDE3EC] shadow-[0_8px_24px_rgba(18,34,50,0.15)] py-2 min-w-[160px]"
                      style={{ ...ff }}
                    >
                      {MORE_DATE_LEVELS.map((level) => (
                        <button
                          key={level.value}
                          onClick={() => {
                            handleMenuItemClick(() => onDateLevelChange(level.value));
                          }}
                          className="w-full flex items-center justify-between px-3 py-2 hover:bg-[#F6F7F9] transition-colors text-left"
                        >
                          <span className="text-[#122232]" style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3 }}>
                            {level.label}
                          </span>
                          {dateLevel === level.value && (
                            <Check size={14} className="text-[#0483AB]" weight="bold" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
