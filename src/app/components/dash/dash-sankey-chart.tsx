/* ================================================================== */
/*  Zenite Dash — Sankey Diagram Component (Shared Renderer)           */
/*  Figma-inspired alluvial flow with DS colors, 3-layer depth,        */
/*  dark pill tooltip, cubic bezier links & gradient fills              */
/* ================================================================== */

import React, { useState, useCallback, useRef, useMemo } from "react";

const ff: React.CSSProperties = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

/* ── DS Color Palette ── */
const SANKEY_PALETTE = [
  "#0483AB", // blueBerry-300
  "#07ABDE", // blueBerry-200
  "#3CCEA7", // greenMint-300
  "#23E6B2", // greenMint-200
  "#025E7B", // blueBerry-400
  "#EAC23D", // gold-200
  "#F56233", // redCherry-300
  "#135543", // greenMint-400
  "#917822", // gold-300
  "#4E6987", // neutral-300
];

const SANKEY_NODE_BAR_W = 14;

/* ── Types ── */
export interface SankeyLink {
  source: string;
  target: string;
  value: number;
}

interface SankeyNode {
  id: string;
  totalValue: number;
  color: string;
  y: number;
  height: number;
  side: "left" | "right";
  links: { target: string; value: number; y0: number; y1: number }[];
}

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  type: "node" | "link";
  source?: string;
  target?: string;
  value: number;
  displayValue: string;
  percentage?: string;
}

interface SankeyChartProps {
  links: SankeyLink[];
  sourceLabel?: string;
  targetLabel?: string;
  compact?: boolean; // mini-chart mode
  nodeBarColor?: string; // override for node bar color
  accentColor?: string; // DS accent override
}

/* ── Helpers ── */
function formatVal(val: number): string {
  if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(1)}M`;
  if (val >= 1000) return `${(val / 1000).toFixed(1)}k`;
  return val % 1 === 0 ? String(val) : val.toFixed(1);
}

/* ── Cubic bezier path for a link band ── */
function linkPath(
  x0: number, y0Top: number, y0Bot: number,
  x1: number, y1Top: number, y1Bot: number,
): string {
  const mx = (x0 + x1) / 2;
  return [
    `M ${x0} ${y0Top}`,
    `C ${mx} ${y0Top}, ${mx} ${y1Top}, ${x1} ${y1Top}`,
    `L ${x1} ${y1Bot}`,
    `C ${mx} ${y1Bot}, ${mx} ${y0Bot}, ${x0} ${y0Bot}`,
    "Z",
  ].join(" ");
}

/* ================================================================== */
/*  MAIN COMPONENT                                                      */
/* ================================================================== */

export function SankeyChart({
  links,
  sourceLabel = "Origem",
  targetLabel = "Destino",
  compact = false,
}: SankeyChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false, x: 0, y: 0, type: "node", value: 0, displayValue: "",
  });
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  /* ── Layout computation ── */
  const layout = useMemo(() => {
    if (!links.length) return null;

    // Aggregate links
    const aggMap = new Map<string, number>();
    links.forEach(l => {
      const key = `${l.source}__${l.target}`;
      aggMap.set(key, (aggMap.get(key) || 0) + l.value);
    });
    const aggLinks: SankeyLink[] = [];
    aggMap.forEach((value, key) => {
      const [source, target] = key.split("__");
      aggLinks.push({ source, target, value });
    });

    // Sort links by value descending for better visual
    aggLinks.sort((a, b) => b.value - a.value);

    // Compute node totals
    const sourceMap = new Map<string, number>();
    const targetMap = new Map<string, number>();
    aggLinks.forEach(l => {
      sourceMap.set(l.source, (sourceMap.get(l.source) || 0) + l.value);
      targetMap.set(l.target, (targetMap.get(l.target) || 0) + l.value);
    });

    // Sort nodes by total value descending
    const sourceNodes = [...sourceMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, compact ? 8 : 20);
    const targetNodes = [...targetMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, compact ? 6 : 16);

    const sourceIds = new Set(sourceNodes.map(n => n[0]));
    const targetIds = new Set(targetNodes.map(n => n[0]));

    // Filter links to only visible nodes
    const visibleLinks = aggLinks.filter(l => sourceIds.has(l.source) && targetIds.has(l.target));

    // Recalculate totals for visible
    const srcTotals = new Map<string, number>();
    const tgtTotals = new Map<string, number>();
    visibleLinks.forEach(l => {
      srcTotals.set(l.source, (srcTotals.get(l.source) || 0) + l.value);
      tgtTotals.set(l.target, (tgtTotals.get(l.target) || 0) + l.value);
    });

    // Layout dimensions
    const PAD_TOP = compact ? 4 : 40;
    const PAD_BOTTOM = compact ? 4 : 20;
    const PAD_LEFT = compact ? 4 : 130;
    const PAD_RIGHT = compact ? 4 : 130;
    const NODE_GAP = compact ? 3 : 8;
    const W = compact ? 240 : 800;
    const chartH = compact
      ? Math.max(120, sourceNodes.length * 20)
      : Math.max(350, Math.max(sourceNodes.length, targetNodes.length) * 52);
    const H = PAD_TOP + chartH + PAD_BOTTOM;

    const nodeX0 = PAD_LEFT;
    const nodeX1 = W - PAD_RIGHT - SANKEY_NODE_BAR_W;

    // Compute source node positions
    const srcTotalVal = sourceNodes.reduce((s, n) => s + (srcTotals.get(n[0]) || 0), 0);
    const availH = chartH - NODE_GAP * Math.max(0, sourceNodes.length - 1);
    let srcY = PAD_TOP;
    const srcNodeMap = new Map<string, SankeyNode>();
    sourceNodes.forEach((n, i) => {
      const val = srcTotals.get(n[0]) || 0;
      const h = Math.max(compact ? 4 : 8, (val / (srcTotalVal || 1)) * availH);
      srcNodeMap.set(n[0], {
        id: n[0],
        totalValue: val,
        color: SANKEY_PALETTE[i % SANKEY_PALETTE.length],
        y: srcY,
        height: h,
        side: "left",
        links: [],
      });
      srcY += h + NODE_GAP;
    });

    // Compute target node positions
    const tgtTotalVal = targetNodes.reduce((s, n) => s + (tgtTotals.get(n[0]) || 0), 0);
    const tgtAvailH = chartH - NODE_GAP * Math.max(0, targetNodes.length - 1);
    let tgtY = PAD_TOP;
    const tgtNodeMap = new Map<string, SankeyNode>();
    targetNodes.forEach((n, i) => {
      const val = tgtTotals.get(n[0]) || 0;
      const h = Math.max(compact ? 4 : 8, (val / (tgtTotalVal || 1)) * tgtAvailH);
      tgtNodeMap.set(n[0], {
        id: n[0],
        totalValue: val,
        color: SANKEY_PALETTE[(sourceNodes.length + i) % SANKEY_PALETTE.length],
        y: tgtY,
        height: h,
        side: "right",
        links: [],
      });
      tgtY += h + NODE_GAP;
    });

    // Sort visible links per source node: by target position for nice flow
    const sortedLinks = [...visibleLinks].sort((a, b) => {
      const tA = tgtNodeMap.get(a.target);
      const tB = tgtNodeMap.get(b.target);
      return (tA?.y || 0) - (tB?.y || 0);
    });

    // Compute link positions within each node
    const srcCursor = new Map<string, number>();
    const tgtCursor = new Map<string, number>();
    srcNodeMap.forEach((n, k) => srcCursor.set(k, n.y));
    tgtNodeMap.forEach((n, k) => tgtCursor.set(k, n.y));

    // Group links by source for proper ordering
    const linksBySource = new Map<string, SankeyLink[]>();
    sortedLinks.forEach(l => {
      if (!linksBySource.has(l.source)) linksBySource.set(l.source, []);
      linksBySource.get(l.source)!.push(l);
    });

    const computedLinks: {
      source: string; target: string; value: number;
      srcColor: string; tgtColor: string;
      x0: number; y0Top: number; y0Bot: number;
      x1: number; y1Top: number; y1Bot: number;
      key: string;
    }[] = [];

    // Process source-by-source
    sourceNodes.forEach(([srcId]) => {
      const sNode = srcNodeMap.get(srcId);
      if (!sNode) return;
      const sLinks = linksBySource.get(srcId) || [];
      // Sort by target position
      sLinks.sort((a, b) => {
        const tA = tgtNodeMap.get(a.target);
        const tB = tgtNodeMap.get(b.target);
        return (tA?.y || 0) - (tB?.y || 0);
      });

      sLinks.forEach(l => {
        const tNode = tgtNodeMap.get(l.target);
        if (!sNode || !tNode) return;

        const srcVal = srcTotals.get(l.source) || 1;
        const tgtVal = tgtTotals.get(l.target) || 1;
        const srcBandH = (l.value / srcVal) * sNode.height;
        const tgtBandH = (l.value / tgtVal) * tNode.height;

        const y0Top = srcCursor.get(l.source) || 0;
        const y0Bot = y0Top + srcBandH;
        const y1Top = tgtCursor.get(l.target) || 0;
        const y1Bot = y1Top + tgtBandH;

        srcCursor.set(l.source, y0Bot);
        tgtCursor.set(l.target, y1Bot);

        computedLinks.push({
          source: l.source, target: l.target, value: l.value,
          srcColor: sNode.color, tgtColor: tNode.color,
          x0: nodeX0 + SANKEY_NODE_BAR_W, y0Top, y0Bot,
          x1: nodeX1, y1Top, y1Bot,
          key: `${l.source}__${l.target}`,
        });
      });
    });

    return {
      sourceNodes: srcNodeMap,
      targetNodes: tgtNodeMap,
      links: computedLinks,
      W, H, nodeX0, nodeX1,
      PAD_LEFT, PAD_RIGHT, PAD_TOP,
      grandTotal: srcTotalVal,
    };
  }, [links, compact]);

  /* ── Event handlers ── */
  const handleLinkMouseMove = useCallback((e: React.MouseEvent, link: typeof layout extends null ? never : NonNullable<typeof layout>["links"][0]) => {
    if (compact) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltip({
      visible: true,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      type: "link",
      source: link.source,
      target: link.target,
      value: link.value,
      displayValue: formatVal(link.value),
      percentage: layout ? `${((link.value / layout.grandTotal) * 100).toFixed(1)}%` : "",
    });
    setHoveredLink(link.key);
  }, [compact, layout]);

  const handleNodeMouseMove = useCallback((e: React.MouseEvent, node: SankeyNode) => {
    if (compact) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltip({
      visible: true,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      type: "node",
      source: node.id,
      value: node.totalValue,
      displayValue: formatVal(node.totalValue),
      percentage: layout ? `${((node.totalValue / layout.grandTotal) * 100).toFixed(1)}%` : "",
    });
    setHoveredNode(node.id);
  }, [compact, layout]);

  const handleMouseLeave = useCallback(() => {
    setTooltip(prev => prev.visible ? { ...prev, visible: false } : prev);
    setHoveredLink(null);
    setHoveredNode(null);
  }, []);

  if (!layout) {
    return (
      <div className="flex items-center justify-center h-full text-[#98989d]" style={{ fontSize: 13, ...ff }}>
        Necessita 2 dimensoes e 1 medida para Sankey
      </div>
    );
  }

  const { sourceNodes, targetNodes, links: computedLinks, W, H, nodeX0, nodeX1 } = layout;

  /* ── Compact / Mini-chart mode ── */
  if (compact) {
    return (
      <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet"
        style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
        {/* Links */}
        {computedLinks.map(l => (
          <path key={`ml-${l.key}`}
            d={linkPath(l.x0, l.y0Top, l.y0Bot, l.x1, l.y1Top, l.y1Bot)}
            fill={l.srcColor} opacity={0.25} />
        ))}
        {/* Source nodes */}
        {[...sourceNodes.values()].map(n => (
          <rect key={`ms-${n.id}`} x={nodeX0} y={n.y} width={SANKEY_NODE_BAR_W * 0.7} height={n.height}
            rx={1.5} fill={n.color} opacity={0.85} />
        ))}
        {/* Target nodes */}
        {[...targetNodes.values()].map(n => (
          <rect key={`mt-${n.id}`} x={nodeX1} y={n.y} width={SANKEY_NODE_BAR_W * 0.7} height={n.height}
            rx={1.5} fill={n.color} opacity={0.85} />
        ))}
      </svg>
    );
  }

  /* ── Full render ── */
  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
      <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ fontFamily: "Inter, system-ui, sans-serif" }}
        onMouseLeave={handleMouseLeave}
      >
        <defs>
          {/* Gradient for each link: source color → target color */}
          {computedLinks.map(l => (
            <linearGradient key={`grad-${l.key}`} id={`sg-${l.key.replace(/[^a-zA-Z0-9]/g, "_")}`}
              x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={l.srcColor} stopOpacity={0.55} />
              <stop offset="50%" stopColor={l.srcColor} stopOpacity={0.3} />
              <stop offset="100%" stopColor={l.tgtColor} stopOpacity={0.45} />
            </linearGradient>
          ))}
          {/* Drop shadow for nodes */}
          <filter id="sk-node-shadow" x="-20%" y="-10%" width="140%" height="120%">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#122232" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Column headers */}
        <text x={nodeX0 + SANKEY_NODE_BAR_W / 2} y={24}
          textAnchor="middle" fill="#98989d"
          style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase" as const, ...ff }}>
          {sourceLabel}
        </text>
        {/* Dotted line under source header */}
        <line x1={nodeX0 - 4} y1={30} x2={nodeX0 + SANKEY_NODE_BAR_W + 4} y2={30}
          stroke="#DDE3EC" strokeWidth={1.5} strokeDasharray="2 3" />

        <text x={nodeX1 + SANKEY_NODE_BAR_W / 2} y={24}
          textAnchor="middle" fill="#98989d"
          style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase" as const, ...ff }}>
          {targetLabel}
        </text>
        <line x1={nodeX1 - 4} y1={30} x2={nodeX1 + SANKEY_NODE_BAR_W + 4} y2={30}
          stroke="#DDE3EC" strokeWidth={1.5} strokeDasharray="2 3" />

        {/* ── Links (bands) ── */}
        {computedLinks.map(l => {
          const isHighlighted = hoveredLink === l.key;
          const isDimmed = (hoveredLink && hoveredLink !== l.key) ||
            (hoveredNode && hoveredNode !== l.source && hoveredNode !== l.target);
          const gradId = `sg-${l.key.replace(/[^a-zA-Z0-9]/g, "_")}`;

          return (
            <g key={`link-${l.key}`}>
              {/* Ghost glow layer */}
              <path
                d={linkPath(l.x0, l.y0Top - 1, l.y0Bot + 1, l.x1, l.y1Top - 1, l.y1Bot + 1)}
                fill={l.srcColor}
                opacity={isDimmed ? 0.02 : isHighlighted ? 0.12 : 0.06}
                style={{ transition: "opacity 0.15s ease" }}
              />
              {/* Main band */}
              <path
                d={linkPath(l.x0, l.y0Top, l.y0Bot, l.x1, l.y1Top, l.y1Bot)}
                fill={`url(#${gradId})`}
                opacity={isDimmed ? 0.12 : isHighlighted ? 1 : 0.7}
                stroke={isHighlighted ? l.srcColor : "none"}
                strokeWidth={isHighlighted ? 1 : 0}
                strokeOpacity={0.3}
                style={{ cursor: "pointer", transition: "opacity 0.15s ease" }}
                onMouseMove={(e) => handleLinkMouseMove(e, l)}
                onMouseLeave={handleMouseLeave}
              />
            </g>
          );
        })}

        {/* ── Source Nodes ── */}
        {[...sourceNodes.values()].map(node => {
          const isActive = hoveredNode === node.id;
          const isDimmed = hoveredNode && hoveredNode !== node.id;
          const hasLinkedHover = hoveredLink && computedLinks.some(l => l.key === hoveredLink && l.source === node.id);

          return (
            <g key={`src-${node.id}`}
              onMouseMove={(e) => handleNodeMouseMove(e, node)}
              onMouseLeave={handleMouseLeave}
              style={{ cursor: "pointer" }}
            >
              {/* 3-layer depth: ghost */}
              <rect x={nodeX0 - 2} y={node.y - 1} width={SANKEY_NODE_BAR_W + 4} height={node.height + 2}
                rx={4} fill={node.color} opacity={(isActive || hasLinkedHover) ? 0.12 : 0.06}
                style={{ transition: "opacity 0.15s ease" }} />
              {/* 3-layer depth: mid */}
              <rect x={nodeX0 - 1} y={node.y} width={SANKEY_NODE_BAR_W + 2} height={node.height}
                rx={3} fill={node.color} opacity={(isActive || hasLinkedHover) ? 0.35 : 0.2}
                style={{ transition: "opacity 0.15s ease" }} />
              {/* Main bar */}
              <rect x={nodeX0} y={node.y} width={SANKEY_NODE_BAR_W} height={node.height}
                rx={2.5} fill={node.color}
                opacity={isDimmed ? 0.3 : 1}
                filter="url(#sk-node-shadow)"
                style={{ transition: "opacity 0.15s ease" }} />
              {/* Highlight shine */}
              <rect x={nodeX0 + 1} y={node.y + 1} width={3} height={Math.max(4, node.height - 2)}
                rx={1.5} fill="white" opacity={0.12} />

              {/* Label (left side) */}
              <text x={nodeX0 - 8} y={node.y + node.height / 2 - 6}
                textAnchor="end" fill={isDimmed ? "#C8CFDB" : "#28415C"}
                style={{ fontSize: 12, fontWeight: 700, letterSpacing: -0.3, transition: "fill 0.15s ease", ...ff }}>
                {node.id.length > 16 ? node.id.slice(0, 15) + "\u2026" : node.id}
              </text>
              <text x={nodeX0 - 8} y={node.y + node.height / 2 + 9}
                textAnchor="end" fill={isDimmed ? "#DDE3EC" : "#98989d"}
                style={{ fontSize: 10, fontWeight: 500, letterSpacing: -0.2, transition: "fill 0.15s ease", ...ff }}>
                {formatVal(node.totalValue)}
              </text>
            </g>
          );
        })}

        {/* ── Target Nodes ── */}
        {[...targetNodes.values()].map(node => {
          const isActive = hoveredNode === node.id;
          const isDimmed = hoveredNode && hoveredNode !== node.id;
          const hasLinkedHover = hoveredLink && computedLinks.some(l => l.key === hoveredLink && l.target === node.id);

          return (
            <g key={`tgt-${node.id}`}
              onMouseMove={(e) => handleNodeMouseMove(e, node)}
              onMouseLeave={handleMouseLeave}
              style={{ cursor: "pointer" }}
            >
              {/* 3-layer depth: ghost */}
              <rect x={nodeX1 - 2} y={node.y - 1} width={SANKEY_NODE_BAR_W + 4} height={node.height + 2}
                rx={4} fill={node.color} opacity={(isActive || hasLinkedHover) ? 0.12 : 0.06}
                style={{ transition: "opacity 0.15s ease" }} />
              {/* 3-layer depth: mid */}
              <rect x={nodeX1 - 1} y={node.y} width={SANKEY_NODE_BAR_W + 2} height={node.height}
                rx={3} fill={node.color} opacity={(isActive || hasLinkedHover) ? 0.35 : 0.2}
                style={{ transition: "opacity 0.15s ease" }} />
              {/* Main bar */}
              <rect x={nodeX1} y={node.y} width={SANKEY_NODE_BAR_W} height={node.height}
                rx={2.5} fill={node.color}
                opacity={isDimmed ? 0.3 : 1}
                filter="url(#sk-node-shadow)"
                style={{ transition: "opacity 0.15s ease" }} />
              {/* Highlight shine */}
              <rect x={nodeX1 + 1} y={node.y + 1} width={3} height={Math.max(4, node.height - 2)}
                rx={1.5} fill="white" opacity={0.12} />

              {/* Label (right side) */}
              <text x={nodeX1 + SANKEY_NODE_BAR_W + 8} y={node.y + node.height / 2 - 6}
                textAnchor="start" fill={isDimmed ? "#C8CFDB" : "#28415C"}
                style={{ fontSize: 12, fontWeight: 700, letterSpacing: -0.3, transition: "fill 0.15s ease", ...ff }}>
                {node.id.length > 16 ? node.id.slice(0, 15) + "\u2026" : node.id}
              </text>
              <text x={nodeX1 + SANKEY_NODE_BAR_W + 8} y={node.y + node.height / 2 + 9}
                textAnchor="start" fill={isDimmed ? "#DDE3EC" : "#98989d"}
                style={{ fontSize: 10, fontWeight: 500, letterSpacing: -0.2, transition: "fill 0.15s ease", ...ff }}>
                {formatVal(node.totalValue)}
              </text>
            </g>
          );
        })}
      </svg>

      {/* ── Dark Pill Tooltip ── */}
      {tooltip.visible && (
        <div
          className="pointer-events-none absolute z-50"
          style={{
            left: tooltip.x + 14,
            top: tooltip.y - 70,
            transform: tooltip.x > (containerRef.current?.clientWidth || 600) * 0.65 ? "translateX(-120%)" : undefined,
          }}
        >
          <div className="px-[14px] py-[8px] rounded-[10px] min-w-[120px]"
            style={{
              backgroundColor: "#28415C",
              boxShadow: "0px 4px 16px rgba(18,34,50,0.30)",
              ...ff,
            }}>
            {tooltip.type === "link" ? (
              <>
                {/* Link tooltip */}
                <p className="text-[#C8CFDB] mb-[2px]"
                  style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.3, textTransform: "uppercase" }}>
                  FLUXO
                </p>
                <div className="flex items-center gap-[6px] mb-[3px]">
                  <span className="text-[#73D0FF]" style={{ fontSize: 11, fontWeight: 600, letterSpacing: -0.2 }}>
                    {tooltip.source}
                  </span>
                  <svg width={12} height={8} viewBox="0 0 12 8">
                    <path d="M0 4H9M9 4L6 1M9 4L6 7" stroke="#C8CFDB" strokeWidth={1.2} fill="none" />
                  </svg>
                  <span className="text-[#73D0FF]" style={{ fontSize: 11, fontWeight: 600, letterSpacing: -0.2 }}>
                    {tooltip.target}
                  </span>
                </div>
                <div className="flex items-center gap-[6px]">
                  <span className="text-white" style={{ fontSize: 14, fontWeight: 700, letterSpacing: -0.3 }}>
                    {tooltip.displayValue}
                  </span>
                  {tooltip.percentage && (
                    <span className="text-[#C8CFDB]" style={{ fontSize: 10, fontWeight: 500 }}>
                      ({tooltip.percentage})
                    </span>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Node tooltip */}
                <p className="text-[#C8CFDB] mb-[2px]"
                  style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.3, textTransform: "uppercase" }}>
                  {sourceNodes.has(tooltip.source || "") ? sourceLabel : targetLabel}
                </p>
                <p className="text-white mb-[3px]" style={{ fontSize: 12, fontWeight: 700, letterSpacing: -0.3 }}>
                  {tooltip.source}
                </p>
                <div className="flex items-center gap-[6px]">
                  <span className="w-[6px] h-[6px] rounded-full shrink-0"
                    style={{ backgroundColor: "#07ABDE" }} />
                  <span className="text-[#C8CFDB]" style={{ fontSize: 11, fontWeight: 500 }}>Total:</span>
                  <span className="text-white" style={{ fontSize: 13, fontWeight: 700, letterSpacing: -0.3 }}>
                    {tooltip.displayValue}
                  </span>
                  {tooltip.percentage && (
                    <span className="text-[#C8CFDB]" style={{ fontSize: 10, fontWeight: 500 }}>
                      ({tooltip.percentage})
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}