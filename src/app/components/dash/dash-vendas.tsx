import { useMemo, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import {
  CurrencyDollar, TrendUp, ChartLineUp, Percent, Handshake,
} from "@phosphor-icons/react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, ComposedChart,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell,
} from "recharts";
import { DashKpiCard } from "./dash-kpi-card";
import { DashChartCard } from "./dash-chart-card";
import { useDashData, formatCurrency } from "./dash-data-provider";
import { DrillDownPanel, DrillRow } from "./dash-drill-down";

const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-[10px] px-3 py-2 border border-[#DDE3EC]" style={{ boxShadow: "0px 8px 24px rgba(18,34,50,0.12)", ...ff }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: "#122232", letterSpacing: -0.3 }}>{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ fontSize: 11, fontWeight: 500, color: p.color, letterSpacing: -0.3 }}>
          {p.name}: {typeof p.value === "number" && p.value > 1000 ? formatCurrency(p.value) : p.value}
        </p>
      ))}
    </div>
  );
};

export function DashVendas() {
  const { opportunities, monthlyRevenue, loading } = useDashData();
  const [drillOpen, setDrillOpen] = useState(false);
  const [drillTitle, setDrillTitle] = useState("");
  const [drillContent, setDrillContent] = useState<ReactNode>(null);
  const COLORS = ["#0483AB", "#3CCEA7", "#917822", "#ED5200", "#6868B1", "#07ABDE", "#EAC23D"];

  const openOwnerDrill = (ownerShort: string) => {
    const ownerOpps = opportunities.filter(o => o.owner.split(" ")[0] === ownerShort);
    setDrillTitle(`Vendedor — ${ownerShort}`);
    setDrillContent(
      <div className="space-y-1">
        {ownerOpps.map((o, i) => (
          <DrillRow key={o.id} label={o.name} value={formatCurrency(o.value)}
            sublabel={`${o.stage} · ${o.probability}%`} color={COLORS[i % COLORS.length]} />
        ))}
        {ownerOpps.length === 0 && <p className="text-[#98989d] text-center py-8" style={{ fontSize: 13, ...ff }}>Nenhuma oportunidade</p>}
      </div>
    );
    setDrillOpen(true);
  };

  const { totalWon, avgDealSize, weightedPipeline, winRate, velocityData, forecastData, ownerRevenue } = useMemo(() => {
    const wonOpps = opportunities.filter(o => {
      const s = o.stage.toLowerCase();
      return s.includes("ganho") || s.includes("ganha") || s.includes("won");
    });
    const totalWon = wonOpps.reduce((s, o) => s + o.value, 0);
    const avgDealSize = Math.round(totalWon / (wonOpps.length || 1));
    const activeOpps = opportunities.filter(o => {
      const s = o.stage.toLowerCase();
      return !s.includes("fechad") && !s.includes("perdid") && !s.includes("ganho") && !s.includes("ganha");
    });
    const weightedPipeline = activeOpps.reduce((s, o) => s + o.value * (o.probability / 100), 0);
    const winRate = opportunities.length > 0 ? Math.round((wonOpps.length / opportunities.length) * 100) : 0;

    const velocityData = [
      { month: "Set", dias: 45, deals: 3 },
      { month: "Out", dias: 38, deals: 5 },
      { month: "Nov", dias: 42, deals: 4 },
      { month: "Dez", dias: 35, deals: 7 },
      { month: "Jan", dias: 30, deals: 8 },
      { month: "Fev", dias: 28, deals: 6 },
    ];

    const forecastData = monthlyRevenue.map((m, i) => ({
      ...m,
      previsao: Math.round(m.receita * (1.05 + i * 0.03)),
      meta: 450000 + i * 50000,
    }));

    const OWNERS = [...new Set(opportunities.map(o => o.owner).filter(o => o !== "-"))];
    const ownerRevenue = OWNERS.map(owner => {
      const ownerOpps = opportunities.filter(o => o.owner === owner);
      const won = ownerOpps.filter(o => {
        const s = o.stage.toLowerCase();
        return s.includes("ganho") || s.includes("ganha");
      }).reduce((s, o) => s + o.value, 0);
      const pipeline = ownerOpps.filter(o => {
        const s = o.stage.toLowerCase();
        return !s.includes("fechad") && !s.includes("perdid") && !s.includes("ganho") && !s.includes("ganha");
      }).reduce((s, o) => s + o.value, 0);
      return { owner: owner.split(" ")[0], ganho: won, pipeline };
    }).sort((a, b) => (b.ganho + b.pipeline) - (a.ganho + a.pipeline)).slice(0, 10);

    return { totalWon, avgDealSize, weightedPipeline, winRate, velocityData, forecastData, ownerRevenue };
  }, [opportunities, monthlyRevenue]);

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
        <h1 className="text-[#122232]" style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5, ...ff }}>Vendas</h1>
        <p className="text-[#4E6987] mt-1" style={{ fontSize: 14, letterSpacing: -0.3, ...ff }}>Análise de receita, pipeline e performance comercial</p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <DashKpiCard label="Receita Fechada" value={formatCurrency(totalWon)} change={28} icon={<CurrencyDollar size={20} weight="duotone" />} iconBg="#D9F8EF" iconColor="#3CCEA7" delay={0} sparkline={[20, 35, 30, 50, 45, 80]} />
        <DashKpiCard label="Pipeline Ponderado" value={formatCurrency(Math.round(weightedPipeline))} change={15} icon={<TrendUp size={20} weight="duotone" />} iconBg="#DCF0FF" iconColor="#0483AB" delay={0.05} sparkline={[40, 45, 50, 48, 55, 62]} />
        <DashKpiCard label="Ticket Médio" value={formatCurrency(avgDealSize)} change={8} icon={<Handshake size={20} weight="duotone" />} iconBg="#FEEDCA" iconColor="#917822" delay={0.1} sparkline={[250, 280, 260, 310, 300, 360]} />
        <DashKpiCard label="Win Rate" value={`${winRate}%`} change={3} icon={<Percent size={20} weight="duotone" />} iconBg="#E8E8FD" iconColor="#6868B1" delay={0.15} sparkline={[15, 18, 16, 20, 19, 20]} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-3">
        <DashChartCard title="Receita vs Meta" subtitle="Realizado x previsto" icon={<ChartLineUp size={18} weight="duotone" />} className="lg:col-span-2" delay={0.1}>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={forecastData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="receitaGrad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3CCEA7" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#3CCEA7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF1F6" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#4E6987", fontWeight: 500 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#98989d" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend formatter={(v) => <span style={{ fontSize: 11, color: "#4E6987", fontWeight: 500 }}>{v}</span>} iconSize={8} />
                <Area type="monotone" dataKey="receita" name="Receita" fill="url(#receitaGrad2)" stroke="#3CCEA7" strokeWidth={2.5} dot={{ r: 3, fill: "#3CCEA7" }} animationDuration={1200} />
                <Line type="monotone" dataKey="meta" name="Meta" stroke="#DDE3EC" strokeWidth={2} strokeDasharray="6 4" dot={false} animationDuration={1000} />
                <Line type="monotone" dataKey="previsao" name="Previsão" stroke="#0483AB" strokeWidth={2} strokeDasharray="3 3" dot={false} animationDuration={1100} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </DashChartCard>

        <DashChartCard title="Velocidade de Venda" subtitle="Dias médios por deal" icon={<TrendUp size={18} weight="duotone" />} delay={0.15}>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={velocityData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF1F6" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#4E6987", fontWeight: 500 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#98989d" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="deals" name="Deals" fill="#07ABDE" radius={[4, 4, 0, 0]} barSize={24} opacity={0.5} animationDuration={1000} />
                <Line type="monotone" dataKey="dias" name="Dias" stroke="#ED5200" strokeWidth={2.5} dot={{ r: 4, fill: "#ED5200", stroke: "#fff", strokeWidth: 2 }} animationDuration={1200} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </DashChartCard>
      </div>

      <DashChartCard title="Receita por Vendedor" subtitle="Ganho vs pipeline ativo" icon={<CurrencyDollar size={18} weight="duotone" />} delay={0.2} className="mb-3">
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ownerRevenue} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
              onClick={(data: any) => { if (data?.activePayload?.[0]) openOwnerDrill(data.activePayload[0].payload.owner); }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF1F6" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: "#98989d" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
              <YAxis type="category" dataKey="owner" tick={{ fontSize: 12, fill: "#28415c", fontWeight: 600 }} axisLine={false} tickLine={false} width={70} />
              <Tooltip content={<CustomTooltip />} />
              <Legend formatter={(v) => <span style={{ fontSize: 11, color: "#4E6987", fontWeight: 500 }}>{v}</span>} iconSize={8} />
              <Bar dataKey="ganho" name="Ganho" fill="#3CCEA7" radius={[0, 4, 4, 0]} barSize={14} stackId="a" animationDuration={1000} style={{ cursor: "pointer" }} />
              <Bar dataKey="pipeline" name="Pipeline" fill="#07ABDE" radius={[0, 4, 4, 0]} barSize={14} stackId="a" animationDuration={1100} style={{ cursor: "pointer" }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </DashChartCard>

      <DrillDownPanel open={drillOpen} title={drillTitle} onClose={() => setDrillOpen(false)}>
        {drillContent}
      </DrillDownPanel>
    </div>
  );
}