import { useMemo } from "react";
import { motion } from "motion/react";
import {
  Lightning, CheckCircle, CalendarBlank, Phone, NoteBlank, ChatCircle, Envelope,
  Clock, Warning, TrendUp,
} from "@phosphor-icons/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadialBarChart, RadialBar, Legend } from "recharts";
import { DashKpiCard } from "./dash-kpi-card";
import { DashChartCard } from "./dash-chart-card";
import { useDashData, formatNumber } from "./dash-data-provider";

const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };
const TYPE_ICON: Record<string, React.ReactNode> = {
  tarefa: <CheckCircle size={14} weight="fill" className="text-[#0483AB]" />,
  compromisso: <CalendarBlank size={14} weight="fill" className="text-[#3CCEA7]" />,
  ligacao: <Phone size={14} weight="fill" className="text-[#917822]" />,
  nota: <NoteBlank size={14} weight="fill" className="text-[#6868B1]" />,
  mensagem: <ChatCircle size={14} weight="fill" className="text-[#07ABDE]" />,
  email: <Envelope size={14} weight="fill" className="text-[#ED5200]" />,
};
const STATUS_STYLE: Record<string, { bg: string; text: string; label: string }> = {
  pendente: { bg: "#FEEDCA", text: "#917822", label: "Pendente" },
  concluida: { bg: "#D9F8EF", text: "#135543", label: "Concluída" },
  atrasada: { bg: "#FFEDEB", text: "#B13B00", label: "Atrasada" },
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-[10px] px-3 py-2 border border-[#DDE3EC]" style={{ boxShadow: "0px 8px 24px rgba(18,34,50,0.12)", ...ff }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: "#122232", letterSpacing: -0.3 }}>{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ fontSize: 11, fontWeight: 500, color: p.color || p.fill, letterSpacing: -0.3 }}>{p.name}: {p.value}</p>
      ))}
    </div>
  );
};

export function DashAtividades() {
  const { activities, weeklyActivities, loading } = useDashData();

  const { total, completed, pending, overdue, completionRate, statusData } = useMemo(() => {
    const total = activities.length;
    const completed = activities.filter(a => a.status === "concluida").length;
    const pending = activities.filter(a => a.status === "pendente").length;
    const overdue = activities.filter(a => a.status === "atrasada").length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    const statusData = [
      { name: "Concluídas", value: completed, fill: "#3CCEA7" },
      { name: "Pendentes", value: pending, fill: "#EAC23D" },
      { name: "Atrasadas", value: overdue, fill: "#ED5200" },
    ];
    return { total, completed, pending, overdue, completionRate, statusData };
  }, [activities]);

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
        <h1 className="text-[#122232]" style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5, ...ff }}>Atividades</h1>
        <p className="text-[#4E6987] mt-1" style={{ fontSize: 14, letterSpacing: -0.3, ...ff }}>Produtividade e acompanhamento da equipe</p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <DashKpiCard label="Total Atividades" value={String(total)} change={12} icon={<Lightning size={20} weight="duotone" />} iconBg="#DCF0FF" iconColor="#0483AB" delay={0} />
        <DashKpiCard label="Concluídas" value={String(completed)} change={18} icon={<CheckCircle size={20} weight="duotone" />} iconBg="#D9F8EF" iconColor="#3CCEA7" delay={0.05} />
        <DashKpiCard label="Taxa de Conclusão" value={`${completionRate}%`} change={5} icon={<TrendUp size={20} weight="duotone" />} iconBg="#FEEDCA" iconColor="#917822" delay={0.1} />
        <DashKpiCard label="Atrasadas" value={String(overdue)} change={-30} icon={<Warning size={20} weight="duotone" />} iconBg="#FFEDEB" iconColor="#ED5200" delay={0.15} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-3">
        <DashChartCard title="Volume Semanal" subtitle="Atividades por dia e tipo" icon={<Lightning size={18} weight="duotone" />} className="lg:col-span-2" delay={0.1}>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyActivities} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF1F6" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#4E6987", fontWeight: 500 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#98989d" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend formatter={(v) => <span style={{ fontSize: 10, color: "#4E6987", fontWeight: 500 }}>{v}</span>} iconSize={8} />
                <Bar dataKey="tarefas" name="Tarefas" stackId="a" fill="#0483AB" animationDuration={800} />
                <Bar dataKey="compromissos" name="Compromissos" stackId="a" fill="#3CCEA7" animationDuration={900} />
                <Bar dataKey="ligacoes" name="Ligações" stackId="a" fill="#EAC23D" animationDuration={1000} />
                <Bar dataKey="emails" name="Emails" stackId="a" fill="#ED5200" radius={[4, 4, 0, 0]} animationDuration={1100} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </DashChartCard>

        <DashChartCard title="Status das Atividades" subtitle="Distribuição atual" icon={<CheckCircle size={18} weight="duotone" />} delay={0.15}>
          <div className="h-[280px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" animationDuration={1200}>
                  {statusData.map((s, i) => <Cell key={i} fill={s.fill} stroke="white" strokeWidth={3} />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend formatter={(v) => <span style={{ fontSize: 10, color: "#4E6987", fontWeight: 500 }}>{v}</span>} iconSize={8} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </DashChartCard>
      </div>

      <DashChartCard title="Atividades Recentes" subtitle="Últimas atividades do CRM" icon={<Lightning size={18} weight="duotone" />} delay={0.2} className="mb-3">
        <div className="space-y-1">
          {activities.map((act, idx) => {
            const statusStyle = STATUS_STYLE[act.status];
            return (
              <motion.div
                key={act.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.25 + idx * 0.03 }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] hover:bg-[#F6F7F9] transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-center w-[30px] h-[30px] rounded-[8px] bg-[#F6F7F9] shrink-0">
                  {TYPE_ICON[act.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[#122232] block truncate" style={{ fontSize: 13, fontWeight: 600, letterSpacing: -0.3, ...ff }}>{act.title}</span>
                  <span className="text-[#4E6987] block" style={{ fontSize: 11, fontWeight: 500, letterSpacing: -0.3, ...ff }}>{act.owner} · {act.date}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full shrink-0" style={{ fontSize: 10, fontWeight: 700, backgroundColor: statusStyle.bg, color: statusStyle.text, ...ff }}>
                  {statusStyle.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </DashChartCard>
    </div>
  );
}