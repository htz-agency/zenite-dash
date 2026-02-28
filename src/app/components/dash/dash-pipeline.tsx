import { useMemo } from "react";
import { motion } from "motion/react";
import { FunnelSimple, CurrencyDollar, Clock, TrendUp } from "@phosphor-icons/react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { DashChartCard } from "./dash-chart-card";
import { DashKpiCard } from "./dash-kpi-card";
import { useDashData, formatCurrency, formatNumber } from "./dash-data-provider";

const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };
const COLORS = ["#07ABDE", "#0483AB", "#EAC23D", "#ED5200", "#3CCEA7"];

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-[10px] px-3 py-2 border border-[#DDE3EC]" style={{ boxShadow: "0px 8px 24px rgba(18,34,50,0.12)", ...ff }}>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ fontSize: 11, fontWeight: 600, color: p.payload?.fill || p.color || "#122232", letterSpacing: -0.3 }}>
          {p.name}: {typeof p.value === "number" && p.value > 1000 ? formatCurrency(p.value) : formatNumber(p.value)}
        </p>
      ))}
    </div>
  );
};

export function DashPipeline() {
  const { opportunities, pipelineByStage, loading } = useDashData();

  const { activeOpps, totalPipeline, avgProbability } = useMemo(() => {
    const activeOpps = opportunities.filter(o => {
      const s = o.stage.toLowerCase();
      return !s.includes("fechad") && !s.includes("perdid") && !s.includes("ganho") && !s.includes("ganha");
    });
    const totalPipeline = activeOpps.reduce((s, o) => s + o.value, 0);
    const avgProbability = Math.round(activeOpps.reduce((s, o) => s + o.probability, 0) / (activeOpps.length || 1));
    return { activeOpps, totalPipeline, avgProbability };
  }, [opportunities]);

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
        <h1 className="text-[#122232]" style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5, ...ff }}>Pipeline</h1>
        <p className="text-[#4E6987] mt-1" style={{ fontSize: 14, letterSpacing: -0.3, ...ff }}>Análise visual do funil de vendas e estágios</p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <DashKpiCard label="Pipeline Total" value={formatCurrency(totalPipeline)} change={12} icon={<CurrencyDollar size={20} weight="duotone" />} iconBg="#DCF0FF" iconColor="#0483AB" delay={0} />
        <DashKpiCard label="Oportunidades Ativas" value={String(activeOpps.length)} change={5} icon={<FunnelSimple size={20} weight="duotone" />} iconBg="#FEEDCA" iconColor="#917822" delay={0.05} />
        <DashKpiCard label="Probabilidade Média" value={`${avgProbability}%`} change={3} icon={<TrendUp size={20} weight="duotone" />} iconBg="#D9F8EF" iconColor="#3CCEA7" delay={0.1} />
        <DashKpiCard label="Dias para Fechar" value="32d" change={-10} icon={<Clock size={20} weight="duotone" />} iconBg="#E8E8FD" iconColor="#6868B1" delay={0.15} />
      </div>

      <DashChartCard title="Funil Visual de Pipeline" subtitle="Largura proporcional ao valor" icon={<FunnelSimple size={18} weight="duotone" />} delay={0.1} className="mb-3">
        <div className="flex flex-col items-center gap-2 py-4">
          {pipelineByStage.map((stage, i) => {
            const maxVal = pipelineByStage[0]?.value || 1;
            const pct = Math.max((stage.value / maxVal) * 100, 25);
            return (
              <motion.div key={stage.stage} initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: [0.4, 0, 0.2, 1] }}
                className="relative rounded-[12px] flex items-center justify-between px-5 py-3 text-white cursor-pointer hover:brightness-110 transition-all"
                style={{ width: `${pct}%`, minWidth: "200px", backgroundColor: COLORS[i % COLORS.length], boxShadow: "0px 2px 8px rgba(18,34,50,0.12)" }}>
                <div>
                  <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: -0.3, ...ff }}>{stage.stage}</span>
                  <span className="block" style={{ fontSize: 11, fontWeight: 500, opacity: 0.8, ...ff }}>{stage.count} oportunidades</span>
                </div>
                <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: -0.3, ...ff }}>{formatCurrency(stage.value)}</span>
              </motion.div>
            );
          })}
        </div>
      </DashChartCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
        <DashChartCard title="Distribuição de Valor" subtitle="Pipeline por estágio" icon={<CurrencyDollar size={18} weight="duotone" />} delay={0.2}>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pipelineByStage} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" nameKey="stage" animationDuration={1200}>
                  {pipelineByStage.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="white" strokeWidth={3} />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            {pipelineByStage.map((s, i) => (
              <div key={s.stage} className="flex items-center gap-1.5">
                <div className="w-[8px] h-[8px] rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                <span className="text-[#4E6987]" style={{ fontSize: 11, fontWeight: 500, letterSpacing: -0.3, ...ff }}>{s.stage}</span>
              </div>
            ))}
          </div>
        </DashChartCard>

        <DashChartCard title="Oportunidades por Estágio" subtitle="Contagem de deals" icon={<FunnelSimple size={18} weight="duotone" />} delay={0.25}>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pipelineByStage} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF1F6" vertical={false} />
                <XAxis dataKey="stage" tick={{ fontSize: 10, fill: "#4E6987", fontWeight: 500 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#98989d" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" name="Oportunidades" radius={[8, 8, 0, 0]} barSize={36} animationDuration={1000}>
                  {pipelineByStage.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </DashChartCard>
      </div>

      <DashChartCard title="Oportunidades Ativas" subtitle="Pipeline detalhado" icon={<FunnelSimple size={18} weight="duotone" />} delay={0.3} className="mb-3">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr>
                {["Nome", "Conta", "Estágio", "Valor", "Probabilidade", "Responsável", "Previsão"].map((h, i) => (
                  <th key={h} className={`pb-3 ${i === 0 ? "text-left" : i >= 3 ? "text-right" : "text-left"}`}
                    style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", color: "#28415c", ...ff }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {activeOpps.slice(0, 20).map((opp, idx) => (
                <motion.tr key={opp.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.35 + idx * 0.04 }}
                  className="border-t border-[#EEF1F6] hover:bg-[#F6F7F9] transition-colors">
                  <td className="py-2.5 text-[#07ABDE]" style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3, ...ff }}>{opp.name}</td>
                  <td className="py-2.5 text-[#28415c]" style={{ fontSize: 12, fontWeight: 500, letterSpacing: -0.3, ...ff }}>{opp.account}</td>
                  <td className="py-2.5">
                    <span className="px-2 py-0.5 rounded-full" style={{ fontSize: 10, fontWeight: 700, backgroundColor: "#0483AB1A", color: "#0483AB", ...ff }}>{opp.stage}</span>
                  </td>
                  <td className="py-2.5 text-right text-[#122232]" style={{ fontSize: 13, fontWeight: 700, letterSpacing: -0.3, ...ff }}>{formatCurrency(opp.value)}</td>
                  <td className="py-2.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-[50px] h-[5px] bg-[#F6F7F9] rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${opp.probability}%`, backgroundColor: opp.probability >= 70 ? "#3CCEA7" : opp.probability >= 40 ? "#EAC23D" : "#ED5200" }} />
                      </div>
                      <span className="text-[#28415c] w-[28px]" style={{ fontSize: 11, fontWeight: 700, ...ff }}>{opp.probability}%</span>
                    </div>
                  </td>
                  <td className="py-2.5 text-right text-[#4E6987]" style={{ fontSize: 12, fontWeight: 500, letterSpacing: -0.3, ...ff }}>{opp.owner.split(" ")[0]}</td>
                  <td className="py-2.5 text-right text-[#4E6987]" style={{ fontSize: 12, fontWeight: 500, letterSpacing: -0.3, ...ff }}>
                    {opp.closeDate !== "-" ? new Date(opp.closeDate).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" }) : "-"}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashChartCard>
    </div>
  );
}
