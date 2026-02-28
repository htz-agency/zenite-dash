import { useMemo } from "react";
import { motion } from "motion/react";
import { ChartDonut, Percent, ArrowDown, TrendUp, Target, FunnelSimple } from "@phosphor-icons/react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";
import { DashKpiCard } from "./dash-kpi-card";
import { DashChartCard } from "./dash-chart-card";
import { useDashData, formatNumber, formatCurrency } from "./dash-data-provider";

const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };
const COLORS = ["#0483AB", "#07ABDE", "#3CCEA7", "#EAC23D", "#ED5200", "#6868B1"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-[10px] px-3 py-2 border border-[#DDE3EC]" style={{ boxShadow: "0px 8px 24px rgba(18,34,50,0.12)", ...ff }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: "#122232", letterSpacing: -0.3 }}>{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ fontSize: 11, fontWeight: 500, color: p.color, letterSpacing: -0.3 }}>
          {p.name}: {typeof p.value === "number" && p.value > 100 ? formatNumber(p.value) : `${p.value}%`}
        </p>
      ))}
    </div>
  );
};

export function DashConversao() {
  const { conversionFunnel, leadsBySource, monthlyRevenue, loading } = useDashData();

  const { funnelData, overallConversion, mqlToSql, sqlToOpp } = useMemo(() => {
    const funnelData = conversionFunnel.map((item, i, arr) => ({
      ...item,
      rate: i > 0 ? ((item.value / (arr[i - 1].value || 1)) * 100).toFixed(1) : "100",
      dropoff: i > 0 ? arr[i - 1].value - item.value : 0,
    }));

    const lastVal = conversionFunnel[conversionFunnel.length - 1]?.value || 0;
    const firstVal = conversionFunnel[0]?.value || 1;
    const overallConversion = ((lastVal / firstVal) * 100).toFixed(1);

    const mqlStage = conversionFunnel.find(s => s.stage === "MQLs");
    const sqlStage = conversionFunnel.find(s => s.stage === "SQLs");
    const oppStage = conversionFunnel.find(s => s.stage === "Oportunidades");
    const mqlToSql = mqlStage && sqlStage ? ((sqlStage.value / (mqlStage.value || 1)) * 100).toFixed(1) : "0";
    const sqlToOpp = sqlStage && oppStage ? ((oppStage.value / (sqlStage.value || 1)) * 100).toFixed(1) : "0";

    return { funnelData, overallConversion, mqlToSql, sqlToOpp };
  }, [conversionFunnel]);

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
        <h1 className="text-[#122232]" style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5, ...ff }}>Conversão</h1>
        <p className="text-[#4E6987] mt-1" style={{ fontSize: 14, letterSpacing: -0.3, ...ff }}>Taxas de conversão e análise de funil completo</p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <DashKpiCard label="Conversão Geral" value={`${overallConversion}%`} change={2} icon={<ChartDonut size={20} weight="duotone" />} iconBg="#DCF0FF" iconColor="#0483AB" delay={0} />
        <DashKpiCard label="MQL para SQL" value={`${mqlToSql}%`} change={5} icon={<Percent size={20} weight="duotone" />} iconBg="#D9F8EF" iconColor="#3CCEA7" delay={0.05} />
        <DashKpiCard label="SQL para Opp" value={`${sqlToOpp}%`} change={8} icon={<Target size={20} weight="duotone" />} iconBg="#FEEDCA" iconColor="#917822" delay={0.1} />
        <DashKpiCard label="Clientes/Mês" value={String(conversionFunnel[conversionFunnel.length - 1]?.value || 0)} change={15} icon={<TrendUp size={20} weight="duotone" />} iconBg="#E8E8FD" iconColor="#6868B1" delay={0.15} />
      </div>

      <DashChartCard title="Funil de Conversão Detalhado" subtitle="Do tráfego ao cliente" icon={<FunnelSimple size={18} weight="duotone" />} delay={0.1} className="mb-3">
        <div className="flex flex-col items-center gap-1.5 py-4">
          {funnelData.map((item, i) => {
            const maxValue = funnelData[0]?.value || 1;
            const widthPct = Math.max((item.value / maxValue) * 100, 15);
            return (
              <div key={item.stage} className="w-full flex flex-col items-center">
                <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.08, ease: [0.4, 0, 0.2, 1] }}
                  className="relative rounded-[10px] flex items-center justify-between px-5 py-3 text-white"
                  style={{ width: `${widthPct}%`, minWidth: "260px", backgroundColor: COLORS[i % COLORS.length], boxShadow: "0px 2px 6px rgba(18,34,50,0.1)" }}>
                  <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: -0.3, ...ff }}>{item.stage}</span>
                  <div className="text-right">
                    <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: -0.3, ...ff }}>{formatNumber(item.value)}</span>
                    {i > 0 && <span className="block" style={{ fontSize: 10, fontWeight: 500, opacity: 0.8, ...ff }}>Taxa: {item.rate}%</span>}
                  </div>
                </motion.div>
                {i < funnelData.length - 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + i * 0.1 }} className="flex items-center gap-1 py-0.5">
                    <ArrowDown size={12} className="text-[#C8CFDB]" />
                    <span className="text-[#ED5200]" style={{ fontSize: 10, fontWeight: 700, letterSpacing: -0.3, ...ff }}>
                      -{formatNumber(Number(funnelData[i + 1]?.dropoff || 0))} ({(100 - Number(funnelData[i + 1]?.rate || 0)).toFixed(1)}%)
                    </span>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </DashChartCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
        <DashChartCard title="Tendência de Conversão" subtitle="Evolução mensal %" icon={<TrendUp size={18} weight="duotone" />} delay={0.2}>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenue} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="convGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0483AB" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#0483AB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF1F6" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#4E6987", fontWeight: 500 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#98989d" }} axisLine={false} tickLine={false} unit="%" />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="conversao" name="Conversão" fill="url(#convGrad)" stroke="#0483AB" strokeWidth={2.5} dot={{ r: 4, fill: "#0483AB", stroke: "#fff", strokeWidth: 2 }} animationDuration={1200} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </DashChartCard>

        <DashChartCard title="Conversão por Origem" subtitle="Performance de cada canal" icon={<ChartDonut size={18} weight="duotone" />} delay={0.25}>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leadsBySource} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF1F6" vertical={false} />
                <XAxis dataKey="source" tick={{ fontSize: 10, fill: "#4E6987", fontWeight: 500 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#98989d" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" name="Valor" radius={[8, 8, 0, 0]} barSize={32} animationDuration={1000}>
                  {leadsBySource.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </DashChartCard>
      </div>
    </div>
  );
}
