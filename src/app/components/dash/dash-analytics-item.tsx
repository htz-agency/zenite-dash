/* ==================================================================== */
/*  Zenite Dash — Analytics Item Component                             */
/*  Draggable analytics objects (reference lines, bands, etc.)         */
/* ==================================================================== */

import { useDrag } from "react-dnd";
import type { ReactNode } from "react";

const ff = { fontFamily: "DM Sans, system-ui, sans-serif" };

export const ANALYTICS_ITEM_TYPE = "ANALYTICS_ITEM";

export type AnalyticsItemType =
  | "constant-line"
  | "average-line"
  | "median-line"
  | "average-ci"
  | "median-quartiles"
  | "box-plot"
  | "totals"
  | "trend-line"
  | "average-95ci"
  | "median-95ci"
  | "reference-line"
  | "reference-band"
  | "distribution-band";

export interface AnalyticsItemData {
  type: AnalyticsItemType;
  label: string;
  icon: ReactNode;
  category: "summarize" | "model" | "custom";
}

interface AnalyticsItemProps {
  item: AnalyticsItemData;
}

export function AnalyticsItem({ item }: AnalyticsItemProps) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ANALYTICS_ITEM_TYPE,
      item: { analyticsItem: item },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [item]
  );

  const bgColor =
    item.category === "summarize"
      ? "bg-[#DCF0FF] group-hover:bg-[#C5E7FF]"
      : item.category === "model"
      ? "bg-[#D9F8EF] group-hover:bg-[#C0F0E3]"
      : "bg-[#FFF4E6] group-hover:bg-[#FFE8CC]";

  const iconColor =
    item.category === "summarize"
      ? "text-[#0483AB]"
      : item.category === "model"
      ? "text-[#3CCEA7]"
      : "text-[#FF9500]";

  return (
    <div
      ref={drag as any}
      className={`flex items-center gap-2 w-full px-2 py-2 rounded-[8px] hover:bg-[#F6F7F9] transition-all text-left group cursor-grab active:cursor-grabbing ${
        isDragging ? "opacity-30" : ""
      }`}
    >
      <div
        className={`flex items-center justify-center w-5 h-5 rounded transition-colors ${bgColor}`}
      >
        <span className={iconColor}>{item.icon}</span>
      </div>
      <span
        className="text-[#122232]"
        style={{ fontSize: 11, fontWeight: 500, letterSpacing: -0.3, ...ff }}
      >
        {item.label}
      </span>
    </div>
  );
}
