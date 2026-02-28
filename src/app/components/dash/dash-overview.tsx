import { useState, useMemo, type ReactNode } from "react";
import {
  UsersThree, Lightning, Handshake, TrendUp, ChartLineUp, FunnelSimple,
  ChartPieSlice, Target, CurrencyDollar, Percent, ArrowRight, Eye,
} from "@phosphor-icons/react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ComposedChart, Treemap,
} from "recharts";
import { motion, AnimatePresence } from "motion/react";
import { DashKpiCard } from "./dash-kpi-card";
import { DashChartCard } from "./dash-chart-card";
import { useDashData, formatCurrency, formatNumber } from "./dash-data-provider";
import { useDashFilters } from "./dash-filter-context";
import { DrillDownPanel, DrillRow } from "./dash-drill-down";

const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

const COLORS = ["#0483AB", "#3CCEA7", "#917822", "#ED5200", "#6868B1", "#07ABDE", "#EAC23D"];
const PIE_COLORS = ["#0483AB", "#07ABDE", "#3CCEA7", "#EAC23D", "#ED5200", "#6868B1"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="bg-white rounded-[10px] px-3 py-2 border border-[#DDE3EC]"
      style={{ boxShadow: "0px 8px 24px rgba(18,34,50,0.12)", ...ff }}
    >
      <p style={{ fontSize: 11, fontWeight: 700, color: "#122232", letterSpacing: -0.3 }}>{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ fontSize: 11, fontWeight: 500, color: p.color, letterSpacing: -0.3 }}>
          {p.name}: {typeof p.value === "number" && p.value > 1000 ? formatCurrency(p.value) : p.value}
        </p>
      ))}
    </div>
  );
};

export function DashOverview() {
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);
  const { leads, opportunities, activities, accounts, monthlyRevenue, pipelineByStage, leadsBySource, activityByType, weeklyActivities, conversionFunnel, loading } = useDashData();
  const { setCrossFilter, crossFilter } = useDashFilters();

  /* ── Drill-down state ── */
  const [drillOpen, setDrillOpen] = useState(false);
  const [drillTitle, setDrillTitle] = useState("");
  const [drillContent, setDrillContent] = useState<ReactNode>(null);

  const openStageDrill = (stage: string) => {
    const stageOpps = opportunities.filter(o => o.stage === stage);
    setDrillTitle(`Pipeline — ${stage}`);
    setDrillContent(
      <div className="space-y-1">
        {stageOpps.map((o, i) => (
          <DrillRow key={o.id} label={o.name} value={formatCurrency(o.value)}
            sublabel={`${o.owner} · ${o.probability}%`} color={COLORS[i % COLORS.length]} />
        ))}
        {stageOpps.length === 0 && <p className="text-[#98989d] text-center py-8" style={{ fontSize: 13, ...ff }}>Nenhuma oportunidade neste estágio</p>}
      </div>
    );
    setDrillOpen(true);
  };

  const openSourceDrill = (source: string) => {
    const sourceLeads = leads.filter(l => l.source === source);
    setDrillTitle(`Leads — ${source}`);
    setDrillContent(
      <div className="space-y-1">
        {sourceLeads.map((l, i) => (
          <DrillRow key={l.id} label={l.name} value={formatCurrency(l.value)}
            sublabel={`${l.company} · Score ${l.score}`} color={COLORS[i % COLORS.length]} />
        ))}
        {sourceLeads.length === 0 && <p className="text-[#98989d] text-center py-8" style={{ fontSize: 13, ...ff }}>Nenhum lead desta origem</p>}
      </div>
    );
    setDrillOpen(true);
  };

  const openOwnerDrill = (owner: string) => {
    const ownerOpps = opportunities.filter(o => o.owner === owner);
    const ownerLeads = leads.filter(l => l.owner === owner);
    setDrillTitle(`Vendedor — ${owner}`);
    setDrillContent(
      <div>
        <p className="text-[#98989d] mb-3" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", ...ff }}>Oportunidades ({ownerOpps.length})</p>
        <div className="space-y-1 mb-4">
          {ownerOpps.slice(0, 10).map((o, i) => (
            <DrillRow key={o.id} label={o.name} value={formatCurrency(o.value)}
              sublabel={`${o.stage} · ${o.probability}%`} color={COLORS[i % COLORS.length]} />
          ))}
        </div>
        <p className="text-[#98989d] mb-3" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", ...ff }}>Leads ({ownerLeads.length})</p>
        <div className="space-y-1">
          {ownerLeads.slice(0, 10).map((l, i) => (
            <DrillRow key={l.id} label={l.name} value={`Score ${l.score}`}
              sublabel={`${l.company} · ${l.stage}`} color={COLORS[(i + 3) % COLORS.length]} />
          ))}
        </div>
      </div>
    );
    setDrillOpen(true);
  };

  const { totalPipeline, wonValue, activeLeads, avgScore, pendingActivities, ownerPerformance, funnelData } = useMemo(() => {
    const isWon = (s: string) => { const low = s.toLowerCase(); return low.includes("ganho") || low.includes("ganha") || low.includes("won"); };
    const isClosed = (s: string) => { const low = s.toLowerCase(); return low.includes("fechad") || low.includes("perdid") || low.includes("ganho") || low.includes("ganha") || low.includes("won") || low.includes("lost"); };

    const totalPipeline = opportunities.filter(o => !isClosed(o.stage)).reduce((s, o) => s + o.value, 0);
    const wonValue = opportunities.filter(o => isWon(o.stage)).reduce((s, o) => s + o.value, 0);
    const activeLeads = leads.filter(l => !isClosed(l.stage)).length;
    const avgScore = leads.length > 0 ? Math.round(leads.reduce((s, l) => s + l.score, 0) / leads.length) : 0;
    const pendingActivities = activities.filter(a => a.status === "pendente" || a.status === "atrasada").length;

    const OWNERS = [...new Set(leads.map(l => l.owner).concat(opportunities.map(o => o.owner)))].filter(o => o !== "-");
    const ownerPerformance = OWNERS.map((owner) => {
      const ownerLeads = leads.filter((l) => l.owner === owner);
      const ownerOpps = opportunities.filter((o) => o.owner === owner);
      const won = ownerOpps.filter((o) => isWon(o.stage));
      return {
        owner,
        leads: ownerLeads.length,
        opportunities: ownerOpps.length,
        wonValue: won.reduce((s, o) => s + o.value, 0),
        totalPipeline: ownerOpps.filter((o) => !isClosed(o.stage)).reduce((s, o) => s + o.value, 0),
        avgScore: ownerLeads.length > 0 ? Math.round(ownerLeads.reduce((s, l) => s + l.score, 0) / ownerLeads.length) : 0,
      };
    });

    const funnelData = conversionFunnel.map((item, i, arr) => ({
      ...item,
      rate: i > 0 ? Math.round((item.value / (arr[i - 1].value || 1)) * 100) : 100,
    }));

    return { totalPipeline, wonValue, activeLeads, avgScore, pendingActivities, ownerPerformance, funnelData };
  }, [leads, opportunities, activities, conversionFunnel]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-[#98989d]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#0483AB] border-t-transparent rounded-full animate-spin" />
          <span style={{ fontSize: 13, fontWeight: 500, ...ff }}>Carregando dados do Supabase...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-2">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6"
      >
        <div>
          <h1 className="text-[#122232]" style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5, ...ff }}>
            Visão Geral
          </h1>
          <p className="text-[#4E6987] mt-1" style={{ fontSize: 14, letterSpacing: -0.3, ...ff }}>
            Panorama completo do CRM - Fevereiro 2026
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 h-[30px] px-3 rounded-full bg-[#D9F8EF] text-[#135543]" style={{ fontSize: 11, fontWeight: 700, letterSpacing: -0.3, ...ff }}>
            <span className="w-[6px] h-[6px] rounded-full bg-[#3CCEA7] animate-pulse" />
            Dados em tempo real
          </span>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
        <DashKpiCard label="Pipeline Ativo" value={formatCurrency(totalPipeline)} change={12} icon={<CurrencyDollar size={20} weight="duotone" />} iconBg="#DCF0FF" iconColor="#0483AB" delay={0} sparkline={[30, 45, 35, 55, 48, 65, 72]} />
        <DashKpiCard label="Receita Fechada" value={formatCurrency(wonValue)} change={28} icon={<TrendUp size={20} weight="duotone" />} iconBg="#D9F8EF" iconColor="#3CCEA7" delay={0.05} sparkline={[20, 25, 40, 35, 50, 60, 80]} />
        <DashKpiCard label="Leads Ativos" value={String(activeLeads)} change={8} icon={<UsersThree size={20} weight="duotone" />} iconBg="#FEEDCA" iconColor="#917822" delay={0.1} sparkline={[8, 10, 9, 12, 11, 13, 13]} />
        <DashKpiCard label="Score Médio" value={`${avgScore}pts`} change={5} icon={<Target size={20} weight="duotone" />} iconBg="#E8E8FD" iconColor="#6868B1" delay={0.15} sparkline={[60, 62, 58, 65, 68, 70, 69]} />
        <DashKpiCard label="Atividades Pendentes" value={String(pendingActivities)} change={-15} icon={<Lightning size={20} weight="duotone" />} iconBg="#FFEDEB" iconColor="#ED5200" delay={0.2} sparkline={[12, 10, 8, 9, 7, 6, 5]} />
      </div>

      {/* Main charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-3">
        {/* Revenue trend */}
        <DashChartCard
          title="Evolução de Receita"
          subtitle="Últimos 6 meses"
          icon={<ChartLineUp size={18} weight="duotone" />}
          className="lg:col-span-2"
          delay={0.1}
        >
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={monthlyRevenue} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0483AB" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#0483AB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF1F6" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#4E6987", fontWeight: 500 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#98989d", fontWeight: 500 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="receita" name="Receita" fill="url(#revenueGrad)" stroke="#0483AB" strokeWidth={2.5} dot={false} animationDuration={1200} />
                <Bar dataKey="leads" name="Leads" fill="#07ABDE" radius={[4, 4, 0, 0]} barSize={20} opacity={0.7} animationDuration={1000} />
                <Line type="monotone" dataKey="conversao" name="Conversão %" stroke="#3CCEA7" strokeWidth={2} dot={{ r: 3, fill: "#3CCEA7" }} animationDuration={1400} yAxisId={0} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </DashChartCard>

        {/* Pipeline by stage (donut) */}
        <DashChartCard
          title="Pipeline por Estágio"
          subtitle="Valor total por fase"
          icon={<FunnelSimple size={18} weight="duotone" />}
          delay={0.15}
        >
          <div className="h-[280px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pipelineByStage}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  dataKey="value"
                  nameKey="stage"
                  onClick={(data) => openStageDrill(data.stage)}
                  onMouseEnter={(_, i) => setHoveredStage(pipelineByStage[i].stage)}
                  onMouseLeave={() => setHoveredStage(null)}
                  animationBegin={200}
                  animationDuration={1200}
                  style={{ cursor: "pointer" }}
                >
                  {pipelineByStage.map((_, i) => (
                    <Cell
                      key={i}
                      fill={COLORS[i]}
                      opacity={hoveredStage === null || hoveredStage === pipelineByStage[i].stage ? 1 : 0.3}
                      stroke="white"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  formatter={(value) => <span style={{ fontSize: 10, color: "#4E6987", fontWeight: 500, letterSpacing: -0.3 }}>{value}</span>}
                  iconSize={8}
                  wrapperStyle={{ paddingTop: 8 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </DashChartCard>
      </div>

      {/* Second row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
        {/* Leads by source */}
        <DashChartCard
          title="Leads por Origem"
          subtitle="Distribuição de captação"
          icon={<ChartPieSlice size={18} weight="duotone" />}
          delay={0.2}
        >
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leadsBySource} layout="vertical" margin={{ top: 5, right: 10, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF1F6" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10, fill: "#98989d" }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="source" tick={{ fontSize: 11, fill: "#4E6987", fontWeight: 500 }} axisLine={false} tickLine={false} width={70} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" name="Leads" fill="#07ABDE" radius={[0, 6, 6, 0]} barSize={16} animationDuration={1000}
                  onClick={(data: any) => openSourceDrill(data.source)}>
                  {leadsBySource.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} style={{ cursor: "pointer" }} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </DashChartCard>

        {/* Activity heatmap (weekly) */}
        <DashChartCard
          title="Atividades Semanais"
          subtitle="Volume por dia e tipo"
          icon={<Lightning size={18} weight="duotone" />}
          delay={0.25}
        >
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyActivities} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF1F6" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#4E6987", fontWeight: 500 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#98989d" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="tarefas" name="Tarefas" stackId="a" fill="#0483AB" radius={[0, 0, 0, 0]} animationDuration={800} />
                <Bar dataKey="compromissos" name="Compromissos" stackId="a" fill="#3CCEA7" animationDuration={900} />
                <Bar dataKey="ligacoes" name="Ligações" stackId="a" fill="#EAC23D" animationDuration={1000} />
                <Bar dataKey="emails" name="Emails" stackId="a" fill="#ED5200" radius={[4, 4, 0, 0]} animationDuration={1100} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </DashChartCard>

        {/* Conversion Funnel */}
        <DashChartCard
          title="Funil de Conversão"
          subtitle="Do tráfego ao cliente"
          icon={<Target size={18} weight="duotone" />}
          delay={0.3}
        >
          <div className="space-y-2 mt-1">
            {funnelData.map((item, i) => {
              const maxValue = funnelData[0].value;
              const widthPct = Math.max((item.value / maxValue) * 100, 12);
              return (
                <motion.div
                  key={item.stage}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-[90px] shrink-0">
                    <span className="text-[#28415c] block" style={{ fontSize: 11, fontWeight: 600, letterSpacing: -0.3, ...ff }}>{item.stage}</span>
                  </div>
                  <div className="flex-1 relative h-[24px] bg-[#F6F7F9] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${widthPct}%` }}
                      transition={{ duration: 0.8, delay: 0.4 + i * 0.1, ease: [0.4, 0, 0.2, 1] }}
                      className="h-full rounded-full flex items-center justify-end pr-2"
                      style={{ backgroundColor: COLORS[i % COLORS.length] }}
                    >
                      <span className="text-white" style={{ fontSize: 9, fontWeight: 700, ...ff }}>{formatNumber(item.value)}</span>
                    </motion.div>
                  </div>
                  {i > 0 && (
                    <span className="w-[36px] text-right shrink-0 text-[#4E6987]" style={{ fontSize: 10, fontWeight: 700, ...ff }}>{item.rate}%</span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </DashChartCard>
      </div>

      {/* Owner performance table */}
      <DashChartCard
        title="Performance por Vendedor"
        subtitle="Ranking de equipe comercial"
        icon={<UsersThree size={18} weight="duotone" />}
        delay={0.35}
        className="mb-3"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr>
                {["#", "Vendedor", "Leads", "Oportunidades", "Pipeline Ativo", "Receita Ganha", "Score Médio"].map((h, i) => (
                  <th
                    key={h}
                    className={`pb-3 ${i === 0 ? "w-[32px] text-right pr-3" : i === 1 ? "text-left" : "text-right"}`}
                    style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", color: "#28415c", ...ff }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ownerPerformance
                .sort((a, b) => b.wonValue - a.wonValue)
                .map((op, idx) => (
                  <motion.tr
                    key={op.owner}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + idx * 0.05 }}
                    className="border-t border-[#EEF1F6] hover:bg-[#F6F7F9] transition-colors cursor-pointer"
                    onClick={() => openOwnerDrill(op.owner)}
                  >
                    <td className="py-2.5 text-right pr-3" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, color: "#28415c", ...ff }}>{idx + 1}</td>
                    <td className="py-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-[28px] h-[28px] rounded-full bg-[#0483AB] flex items-center justify-center text-white shrink-0" style={{ fontSize: 10, fontWeight: 700 }}>
                          {op.owner.split(" ").map(w => w[0]).join("")}
                        </div>
                        <span className="text-[#122232]" style={{ fontSize: 13, fontWeight: 600, letterSpacing: -0.3, ...ff }}>{op.owner}</span>
                      </div>
                    </td>
                    <td className="py-2.5 text-right text-[#28415c]" style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3, ...ff }}>{op.leads}</td>
                    <td className="py-2.5 text-right text-[#28415c]" style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3, ...ff }}>{op.opportunities}</td>
                    <td className="py-2.5 text-right text-[#0483AB]" style={{ fontSize: 13, fontWeight: 600, letterSpacing: -0.3, ...ff }}>{formatCurrency(op.totalPipeline)}</td>
                    <td className="py-2.5 text-right text-[#3CCEA7]" style={{ fontSize: 13, fontWeight: 700, letterSpacing: -0.3, ...ff }}>{formatCurrency(op.wonValue)}</td>
                    <td className="py-2.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-[60px] h-[6px] bg-[#F6F7F9] rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${op.avgScore}%` }}
                            transition={{ duration: 0.6, delay: 0.5 + idx * 0.08 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: op.avgScore >= 70 ? "#3CCEA7" : op.avgScore >= 50 ? "#EAC23D" : "#ED5200" }}
                          />
                        </div>
                        <span className="text-[#28415c] w-[28px]" style={{ fontSize: 12, fontWeight: 700, letterSpacing: -0.3, ...ff }}>{op.avgScore}</span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
            </tbody>
          </table>
        </div>
      </DashChartCard>

      {/* Drill-down panel */}
      <DrillDownPanel
        open={drillOpen}
        title={drillTitle}
        onClose={() => setDrillOpen(false)}
      >
        {drillContent}
      </DrillDownPanel>
    </div>
  );
}