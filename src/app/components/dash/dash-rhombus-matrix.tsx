import React, { useState, useCallback, useRef } from "react";

const ff: React.CSSProperties = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

interface RhombusMatrixProps {
  xCats: string[];
  yCats: string[];
  matrixMap: Map<string, number>;
  matMin: number;
  matMax: number;
  matRange: number;
  padLeft?: number;
  padTop?: number;
  padRight?: number;
  padBottom?: number;
  cellSize?: number;
  rhombusColor?: string;
  filterId?: string;
  keyPrefix?: string;
  measureLabel?: string;
  shadowColor?: string;
  axisColor?: string;
  gridColor?: string;
  compact?: boolean; // mini-chart mode (no labels/tooltips/legend)
}

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  xCat: string;
  yCat: string;
  value: string;
  rawValue: number;
  norm: number;
}

export function RhombusMatrixChart({
  xCats,
  yCats,
  matrixMap,
  matMin,
  matMax,
  matRange,
  padLeft = 90,
  padTop = 50,
  padRight = 16,
  padBottom = 60,
  cellSize = 52,
  rhombusColor = "#28415C",
  filterId = "rmat-shadow",
  keyPrefix = "rm",
  measureLabel = "Valor",
  shadowColor = "#122232",
  axisColor = "#4E6987",
  gridColor = "#DDE3EC",
  compact = false,
}: RhombusMatrixProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false, x: 0, y: 0, xCat: "", yCat: "", value: "", rawValue: 0, norm: 0,
  });

  const half = cellSize / 2;
  const svgW = padLeft + xCats.length * cellSize + padRight;
  const svgH = padTop + yCats.length * cellSize + padBottom;

  const formatVal = useCallback((val: number) => {
    if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(1)}M`;
    if (val >= 1000) return `${(val / 1000).toFixed(1)}k`;
    return val % 1 === 0 ? String(val) : val.toFixed(1);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGElement>) => {
    if (compact) return;
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const scaleX = svgW / rect.width;
    const scaleY = svgH / rect.height;
    const svgX = (e.clientX - rect.left) * scaleX;
    const svgY = (e.clientY - rect.top) * scaleY;

    // Check which cell we're hovering
    const xi = Math.floor((svgX - padLeft) / cellSize);
    const yi = Math.floor((svgY - padTop) / cellSize);

    if (xi >= 0 && xi < xCats.length && yi >= 0 && yi < yCats.length) {
      const xc = xCats[xi];
      const yc = yCats[yi];
      const key = `${xc}__${yc}`;
      const val = matrixMap.get(key) || 0;
      const norm = matRange > 0 ? (val - matMin) / matRange : 0;

      setTooltip({
        visible: true,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        xCat: xc,
        yCat: yc,
        value: formatVal(val),
        rawValue: val,
        norm,
      });
    } else {
      setTooltip(prev => prev.visible ? { ...prev, visible: false } : prev);
    }
  }, [compact, svgW, svgH, padLeft, padTop, cellSize, xCats, yCats, matrixMap, matMin, matRange, formatVal]);

  const handleMouseLeave = useCallback(() => {
    setTooltip(prev => prev.visible ? { ...prev, visible: false } : prev);
  }, []);

  if (compact) {
    // Mini-chart: simplified diamonds only
    const C = cellSize;
    const PL = 8, PT = 8, PR = 4, PB = 4;
    const w = PL + xCats.length * C + PR;
    const h = PT + yCats.length * C + PB;

    return (
      <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid meet"
        style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
        {yCats.map((yc, yi) =>
          xCats.map((xc, xi) => {
            const val = matrixMap.get(`${xc}__${yc}`) || 0;
            const norm = matRange > 0 ? (val - matMin) / matRange : 0;
            const op = val === 0 ? 0.08 : 0.15 + norm * 0.75;
            const cx = PL + xi * C + C / 2;
            const cy = PT + yi * C + C / 2;
            const s = val === 0 ? C * 0.22 : C * 0.25 + norm * C * 0.18;
            return (
              <g key={`${keyPrefix}-${xi}-${yi}`}>
                <path d={`M ${cx} ${cy - s * 1.1} L ${cx + s * 1.1} ${cy} L ${cx} ${cy + s * 1.1} L ${cx - s * 1.1} ${cy} Z`}
                  fill={rhombusColor} opacity={op * 0.2} />
                <path d={`M ${cx} ${cy - s} L ${cx + s} ${cy} L ${cx} ${cy + s} L ${cx - s} ${cy} Z`}
                  fill={rhombusColor} opacity={op} stroke="white" strokeWidth={0.5} />
              </g>
            );
          })
        )}
      </svg>
    );
  }

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
      <svg width="100%" height="100%" viewBox={`0 0 ${svgW} ${svgH}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ fontFamily: "Inter, system-ui, sans-serif" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Defs */}
        <defs>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor={shadowColor} floodOpacity="0.12" />
          </filter>
        </defs>

        {/* Grid lines */}
        {xCats.map((_, xi) => (
          <line key={`${keyPrefix}-gx-${xi}`}
            x1={padLeft + xi * cellSize + half} y1={padTop - 4}
            x2={padLeft + xi * cellSize + half} y2={padTop + yCats.length * cellSize}
            stroke={gridColor} strokeWidth={0.5} strokeDasharray="3 3" opacity={0.5} />
        ))}
        {yCats.map((_, yi) => (
          <line key={`${keyPrefix}-gy-${yi}`}
            x1={padLeft - 4} y1={padTop + yi * cellSize + half}
            x2={padLeft + xCats.length * cellSize} y2={padTop + yi * cellSize + half}
            stroke={gridColor} strokeWidth={0.5} strokeDasharray="3 3" opacity={0.5} />
        ))}

        {/* Y-axis labels */}
        {yCats.map((yc, yi) => (
          <text key={`${keyPrefix}-yl-${yi}`} x={padLeft - 8} y={padTop + yi * cellSize + half}
            textAnchor="end" dominantBaseline="central" fill={axisColor}
            style={{ fontSize: 10, fontWeight: 600, letterSpacing: -0.2, ...ff }}>
            {yc.length > 10 ? yc.slice(0, 9) + "\u2026" : yc}
          </text>
        ))}

        {/* X-axis labels (rotated) */}
        {xCats.map((xc, xi) => {
          const lx = padLeft + xi * cellSize + half;
          const ly = padTop + yCats.length * cellSize + 12;
          return (
            <text key={`${keyPrefix}-xl-${xi}`} x={lx} y={ly}
              textAnchor="end" dominantBaseline="central"
              transform={`rotate(-45, ${lx}, ${ly})`}
              fill={axisColor}
              style={{ fontSize: 10, fontWeight: 600, letterSpacing: -0.2, ...ff }}>
              {xc.length > 10 ? xc.slice(0, 9) + "\u2026" : xc}
            </text>
          );
        })}

        {/* Rhombus diamonds */}
        {yCats.map((yc, yi) =>
          xCats.map((xc, xi) => {
            const key = `${xc}__${yc}`;
            const val = matrixMap.get(key) || 0;
            const norm = matRange > 0 ? (val - matMin) / matRange : 0;
            const opacity = val === 0 ? 0.08 : 0.15 + norm * 0.75;
            const cx = padLeft + xi * cellSize + half;
            const cy = padTop + yi * cellSize + half;
            const s = val === 0 ? 12 : 14 + norm * 8;
            const dPath = `M ${cx} ${cy - s} L ${cx + s} ${cy} L ${cx} ${cy + s} L ${cx - s} ${cy} Z`;
            const fs = Math.max(7, Math.min(10, s / 1.8));
            const displayVal = formatVal(val);
            const isHovered = tooltip.visible && tooltip.xCat === xc && tooltip.yCat === yc;

            return (
              <g key={`${keyPrefix}-d-${xi}-${yi}`}
                style={{ transition: "opacity 0.12s ease" }}
                opacity={tooltip.visible && !isHovered ? 0.6 : 1}
              >
                {/* Ghost glow layer */}
                <path d={`M ${cx} ${cy - s * 1.18} L ${cx + s * 1.18} ${cy} L ${cx} ${cy + s * 1.18} L ${cx - s * 1.18} ${cy} Z`}
                  fill={rhombusColor} opacity={opacity * 0.15} />
                {/* Mid depth layer */}
                <path d={`M ${cx} ${cy - s * 1.06} L ${cx + s * 1.06} ${cy} L ${cx} ${cy + s * 1.06} L ${cx - s * 1.06} ${cy} Z`}
                  fill={rhombusColor} opacity={opacity * 0.35} />
                {/* Main diamond */}
                <path d={dPath} fill={rhombusColor} opacity={isHovered ? Math.min(opacity + 0.15, 1) : opacity}
                  stroke={isHovered ? "#07ABDE" : "white"} strokeWidth={isHovered ? 2 : 1.2}
                  filter={`url(#${filterId})`} style={{ cursor: "pointer" }} />
                {/* Highlight */}
                <path d={`M ${cx} ${cy - s * 0.55} L ${cx + s * 0.35} ${cy - s * 0.05} L ${cx} ${cy + s * 0.1} L ${cx - s * 0.35} ${cy - s * 0.05} Z`}
                  fill="white" opacity={0.06} />
                {/* Value label */}
                {s >= 12 && (
                  <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central"
                    fill={opacity > 0.5 ? "white" : rhombusColor}
                    style={{ fontSize: fs, fontWeight: 700, letterSpacing: -0.3, pointerEvents: "none", ...ff }}>
                    {displayVal}
                  </text>
                )}
              </g>
            );
          })
        )}

        {/* Legend scale (inside SVG) */}
        {(() => {
          const legY = padTop + yCats.length * cellSize + padBottom - 16;
          const legStartX = svgW / 2 - 80;
          return (
            <g>
              <text x={legStartX - 4} y={legY + 8} textAnchor="end" fill="#98989d"
                style={{ fontSize: 9, fontWeight: 500, letterSpacing: 0.3, ...ff }}>BAIXO</text>
              {[0.15, 0.25, 0.35, 0.50, 0.70, 0.90].map((op, i) => (
                <path key={`${keyPrefix}-leg-${i}`}
                  d={`M ${legStartX + i * 22 + 8} ${legY} L ${legStartX + i * 22 + 16} ${legY + 8} L ${legStartX + i * 22 + 8} ${legY + 16} L ${legStartX + i * 22} ${legY + 8} Z`}
                  fill={rhombusColor} opacity={op} stroke="white" strokeWidth={0.8} />
              ))}
              <text x={legStartX + 6 * 22 + 4} y={legY + 8} textAnchor="start" dominantBaseline="central" fill="#98989d"
                style={{ fontSize: 9, fontWeight: 500, letterSpacing: 0.3, ...ff }}>ALTO</text>
            </g>
          );
        })()}
      </svg>

      {/* Dark pill tooltip overlay */}
      {tooltip.visible && (
        <div
          className="pointer-events-none absolute z-50"
          style={{
            left: tooltip.x + 12,
            top: tooltip.y - 60,
            transform: tooltip.x > (containerRef.current?.clientWidth || 400) * 0.7 ? "translateX(-120%)" : undefined,
          }}
        >
          <div className="px-[14px] py-[8px] rounded-[10px] min-w-[100px]"
            style={{
              backgroundColor: "#28415C",
              boxShadow: "0px 4px 16px rgba(18,34,50,0.30)",
              ...ff,
            }}>
            {/* Dimension labels */}
            <p className="text-[#C8CFDB] mb-[2px] truncate max-w-[180px]"
              style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.3, textTransform: "uppercase" }}>
              {measureLabel}
            </p>
            <div className="flex items-center gap-[6px] mb-[2px]">
              <span className="text-[#73D0FF]" style={{ fontSize: 11, fontWeight: 600, letterSpacing: -0.2 }}>
                {tooltip.xCat}
              </span>
              <span className="text-[#C8CFDB]" style={{ fontSize: 9 }}>×</span>
              <span className="text-[#73D0FF]" style={{ fontSize: 11, fontWeight: 600, letterSpacing: -0.2 }}>
                {tooltip.yCat}
              </span>
            </div>
            <div className="flex items-center gap-[6px]">
              {/* Intensity diamond */}
              <svg width={12} height={12} viewBox="0 0 12 12">
                <path d="M6 1L11 6L6 11L1 6Z" fill="white"
                  opacity={0.15 + tooltip.norm * 0.75} />
              </svg>
              <span className="text-white" style={{ fontSize: 13, fontWeight: 700, letterSpacing: -0.3 }}>
                {tooltip.value}
              </span>
              <span className="text-[#C8CFDB]" style={{ fontSize: 9, fontWeight: 500 }}>
                ({Math.round(tooltip.norm * 100)}%)
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
