import { useMemo } from "react";
import { motion } from "motion/react";
import { Target, Trophy, Medal, Crown, TrendUp, UsersThree } from "@phosphor-icons/react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { DashKpiCard } from "./dash-kpi-card";
import { DashChartCard } from "./dash-chart-card";
import { useDashData, formatCurrency } from "./dash-data-provider";

const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };
const COLORS = ["#0483AB", "#3CCEA7", "#917822", "#ED5200", "#6868B1", "#07ABDE", "#EAC23D"];
const MEDAL_COLORS = ["#EAC23D", "#C8CFDB", "#ED5200"];

export function DashPerformance() {
  const { leads, opportunities, loading } = useDashData();

  const { sorted, topPerformer, radarData, radarMetrics, avgRevenue, totalTeamLeads } = useMemo(() => {
    const OWNERS = [...new Set(leads.map(l => l.owner).concat(opportunities.map(o => o.owner)))].filter(o => o !== "-");
    const ownerPerformance = OWNERS.map((owner) => {
      const ownerLeads = leads.filter((l) => l.owner === owner);
      const ownerOpps = opportunities.filter((o) => o.owner === owner);
      const won = ownerOpps.filter((o) => { const s = o.stage.toLowerCase(); return s.includes("ganho") || s.includes("ganha"); });
      return {
        owner,
        leads: ownerLeads.length,
        opportunities: ownerOpps.length,
        wonValue: won.reduce((s, o) => s + o.value, 0),
        totalPipeline: ownerOpps.filter((o) => { const s = o.stage.toLowerCase(); return !s.includes("fechad") && !s.includes("perdid") && !s.includes("ganho") && !s.includes("ganha"); }).reduce((s, o) => s + o.value, 0),
        avgScore: ownerLeads.length > 0 ? Math.round(ownerLeads.reduce((s, l) => s + l.score, 0) / ownerLeads.length) : 0,
      };
    });

    const sorted = [...ownerPerformance].sort((a, b) => b.wonValue + b.totalPipeline - (a.wonValue + a.totalPipeline));
    const topPerformer = sorted[0] || { owner: "-", wonValue: 0, totalPipeline: 0, leads: 0, opportunities: 0, avgScore: 0 };

    const radarMetrics = sorted.slice(0, 5).map(op => ({
      owner: op.owner.split(" ")[0],
      leads: (op.leads / Math.max(...sorted.map(s => s.leads), 1)) * 100,
      oportunidades: (op.opportunities / Math.max(...sorted.map(s => s.opportunities), 1)) * 100,
      receita: (op.wonValue / Math.max(...sorted.map(s => s.wonValue), 1)) * 100,
      pipeline: (op.totalPipeline / Math.max(...sorted.map(s => s.totalPipeline), 1)) * 100,
      score: op.avgScore,
    }));

    const radarData = [
      { metric: "Leads", ...Object.fromEntries(radarMetrics.map(r => [r.owner, r.leads])) },
      { metric: "Opps", ...Object.fromEntries(radarMetrics.map(r => [r.owner, r.oportunidades])) },
      { metric: "Receita", ...Object.fromEntries(radarMetrics.map(r => [r.owner, r.receita])) },
      { metric: "Pipeline", ...Object.fromEntries(radarMetrics.map(r => [r.owner, r.pipeline])) },
      { metric: "Score", ...Object.fromEntries(radarMetrics.map(r => [r.owner, r.score])) },
    ];

    const avgRevenue = sorted.length > 0 ? Math.round(sorted.reduce((s, o) => s + o.wonValue, 0) / sorted.length) : 0;
    const totalTeamLeads = sorted.reduce((s, o) => s + o.leads, 0);

    return { sorted, topPerformer, radarData, radarMetrics, avgRevenue, totalTeamLeads };
  }, [leads, opportunities]);

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
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-6">
        <h1 className="text-[#122232]" style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5, ...ff }}>Performance</h1>
        <p className="text-[#4E6987] mt-1" style={{ fontSize: 14, letterSpacing: -0.3, ...ff }}>Ranking, metas e performance individual da equipe</p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <DashKpiCard label="Top Vendedor" value={topPerformer.owner.split(" ")[0]} icon={<Crown size={20} weight="duotone" />} iconBg="#FEEDCA" iconColor="#917822" delay={0} />
        <DashKpiCard label="Receita Média" value={formatCurrency(avgRevenue)} change={12} icon={<Target size={20} weight="duotone" />} iconBg="#DCF0FF" iconColor="#0483AB" delay={0.05} />
        <DashKpiCard label="Leads do Time" value={String(totalTeamLeads)} change={8} icon={<UsersThree size={20} weight="duotone" />} iconBg="#D9F8EF" iconColor="#3CCEA7" delay={0.1} />
        <DashKpiCard label="Score Médio" value={`${sorted.length > 0 ? Math.round(sorted.reduce((s, o) => s + o.avgScore, 0) / sorted.length) : 0}pts`} change={5} icon={<TrendUp size={20} weight="duotone" />} iconBg="#E8E8FD" iconColor="#6868B1" delay={0.15} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
        <DashChartCard title="Comparativo de Performance" subtitle="Top 5 vendedores" icon={<Target size={18} weight="duotone" />} delay={0.1}>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#EEF1F6" />
                <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: "#4E6987", fontWeight: 500 }} />
                <PolarRadiusAxis tick={{ fontSize: 9, fill: "#98989d" }} axisLine={false} />
                {radarMetrics.map((r, i) => (
                  <Radar key={r.owner} name={r.owner} dataKey={r.owner} stroke={COLORS[i]} fill={COLORS[i]} fillOpacity={0.15} strokeWidth={2} animationDuration={1200} />
                ))}
                <Legend formatter={(v) => <span style={{ fontSize: 10, color: "#4E6987", fontWeight: 500 }}>{v}</span>} iconSize={8} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </DashChartCard>

        <DashChartCard title="Ranking de Vendedores" subtitle="Por receita total gerada" icon={<Trophy size={18} weight="duotone" />} delay={0.15}>
          <div className="space-y-2 mt-2">
            {sorted.slice(0, 10).map((op, idx) => {
              const totalVal = op.wonValue + op.totalPipeline;
              const maxVal = (sorted[0]?.wonValue || 0) + (sorted[0]?.totalPipeline || 0) || 1;
              const pct = Math.max((totalVal / maxVal) * 100, 8);
              return (
                <motion.div key={op.owner} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + idx * 0.06 }} className="flex items-center gap-3">
                  <div className="w-[24px] flex items-center justify-center shrink-0">
                    {idx < 3 ? <Medal size={18} weight="fill" style={{ color: MEDAL_COLORS[idx] }} /> :
                      <span className="text-[#98989d]" style={{ fontSize: 12, fontWeight: 700, ...ff }}>{idx + 1}</span>}
                  </div>
                  <div className="w-[28px] h-[28px] rounded-full flex items-center justify-center text-white shrink-0"
                    style={{ backgroundColor: COLORS[idx % COLORS.length], fontSize: 10, fontWeight: 700 }}>
                    {op.owner.split(" ").map(w => w[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[#122232] truncate" style={{ fontSize: 13, fontWeight: 600, letterSpacing: -0.3, ...ff }}>{op.owner}</span>
                      <span className="text-[#0483AB] shrink-0" style={{ fontSize: 12, fontWeight: 700, letterSpacing: -0.3, ...ff }}>{formatCurrency(totalVal)}</span>
                    </div>
                    <div className="w-full h-[6px] bg-[#F6F7F9] rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.7, delay: 0.3 + idx * 0.08 }}
                        className="h-full rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </DashChartCard>
      </div>
    </div>
  );
}
