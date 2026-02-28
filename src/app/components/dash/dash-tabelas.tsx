import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { MagnifyingGlass, SortAscending, SortDescending, Export, ArrowsLeftRight } from "@phosphor-icons/react";
import { useDashData, formatCurrency, formatNumber } from "./dash-data-provider";

const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };
type CrossTab = "leads-contas" | "opp-leads" | "atividades-leads";
const tabs: { id: CrossTab; label: string }[] = [
  { id: "leads-contas", label: "Leads x Contas" },
  { id: "opp-leads", label: "Oportunidades x Leads" },
  { id: "atividades-leads", label: "Atividades x Leads" },
];
const STAGE_COLORS: Record<string, string> = {
  "Prospecção": "#07ABDE", "Qualificação": "#0483AB", "Proposta": "#EAC23D",
  "Negociação": "#ED5200", "Fechado Ganho": "#3CCEA7", "Fechado Perdido": "#C8CFDB",
  "Fechada Ganha": "#3CCEA7", "Fechada Perdida": "#C8CFDB",
};

export function DashTabelas() {
  const [activeTab, setActiveTab] = useState<CrossTab>("leads-contas");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<string>("value");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const { leads, opportunities, accounts, activities, loading } = useDashData();

  const handleSort = (key: string) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
  };
  const SortIcon = sortDir === "asc" ? SortAscending : SortDescending;

  const { leadsContas, oppLeads, actLeads } = useMemo(() => {
    const leadsContas = leads.map(l => {
      const acc = accounts.find(a => a.name === l.company);
      return { leadId: l.id, leadName: l.name, company: l.company, stage: l.stage, leadValue: l.value, score: l.score, owner: l.owner, industry: acc?.industry || "-", revenue: acc?.revenue || 0, employees: acc?.employees || 0, city: acc?.city || "-", state: acc?.state || "-" };
    });
    const oppLeads = opportunities.map(o => {
      const rl = leads.filter(l => l.company === o.account || l.company === o.company);
      return { oppId: o.id, oppName: o.name, account: o.account, stage: o.stage, value: o.value, probability: o.probability, owner: o.owner, linkedLeads: rl.length, avgLeadScore: rl.length > 0 ? Math.round(rl.reduce((s, l) => s + l.score, 0) / rl.length) : 0, totalLeadValue: rl.reduce((s, l) => s + l.value, 0) };
    });
    const actLeads = activities.map(a => {
      const lead = leads.find(l => l.id === a.relatedTo);
      return { actId: a.id, actTitle: a.title, actType: a.type, actStatus: a.status, actDate: a.date, actOwner: a.owner, leadName: lead?.name || a.relatedToName || "-", leadStage: lead?.stage || "-", leadValue: lead?.value || 0, leadScore: lead?.score || 0 };
    });
    return { leadsContas, oppLeads, actLeads };
  }, [leads, opportunities, accounts, activities]);

  const filtered = (data: any[]) => { if (!search) return data; const q = search.toLowerCase(); return data.filter(row => Object.values(row).some(v => String(v).toLowerCase().includes(q))); };
  const sorted = (data: any[]) => [...data].sort((a, b) => { const av = a[sortKey], bv = b[sortKey]; if (typeof av === "number" && typeof bv === "number") return sortDir === "asc" ? av - bv : bv - av; return sortDir === "asc" ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av)); });
  const ThBtn = ({ label, colKey }: { label: string; colKey: string }) => (<button onClick={() => handleSort(colKey)} className="flex items-center gap-1 cursor-pointer hover:text-[#0483AB] transition-colors"><span>{label}</span>{sortKey === colKey && <SortIcon size={10} weight="bold" />}</button>);

  if (loading) return (<div className="flex items-center justify-center h-64 text-[#98989d]"><div className="flex flex-col items-center gap-3"><div className="w-8 h-8 border-2 border-[#0483AB] border-t-transparent rounded-full animate-spin" /><span style={{ fontSize: 13, fontWeight: 500, ...ff }}>Carregando dados do Supabase...</span></div></div>);

  return (
    <div className="max-w-[1400px] mx-auto px-2">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-6">
        <h1 className="text-[#122232]" style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5, ...ff }}>Tabelas Cruzadas</h1>
        <p className="text-[#4E6987] mt-1" style={{ fontSize: 14, letterSpacing: -0.3, ...ff }}>Cruzamento de dados entre objetos do CRM</p>
      </motion.div>
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {tabs.map(tab => (<button key={tab.id} onClick={() => { setActiveTab(tab.id); setSearch(""); setSortKey("value"); setSortDir("desc"); }} className={`flex items-center gap-1.5 h-[34px] px-4 rounded-full transition-all cursor-pointer ${activeTab === tab.id ? "bg-[#28415c] text-[#F6F7F9]" : "bg-white border border-[#DDE3EC] text-[#4E6987] hover:bg-[#F6F7F9]"}`} style={activeTab === tab.id ? { boxShadow: "0px 2px 4px rgba(18,34,50,0.3)", border: "0.7px solid rgba(200,207,219,0.6)", fontSize: 12, fontWeight: 700, letterSpacing: -0.3, ...ff } : { fontSize: 12, fontWeight: 500, letterSpacing: -0.3, ...ff }}><ArrowsLeftRight size={14} weight={activeTab === tab.id ? "bold" : "regular"} />{tab.label}</button>))}
      </div>
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-2 h-[36px] px-3 bg-white rounded-[10px] border border-[#DDE3EC] flex-1 max-w-[300px]"><MagnifyingGlass size={14} className="text-[#C8CFDB]" /><input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Filtrar dados..." className="flex-1 bg-transparent border-none outline-none text-[#122232] placeholder-[#C8CFDB]" style={{ fontSize: 12, fontWeight: 400, letterSpacing: -0.3, ...ff }} /></div>
        <button className="flex items-center gap-1.5 h-[34px] px-3 rounded-full bg-white border border-[#DDE3EC] text-[#4E6987] hover:bg-[#f6f7f9] transition-colors cursor-pointer" style={{ fontSize: 11, fontWeight: 600, letterSpacing: -0.3, ...ff }}><Export size={14} weight="duotone" />Exportar</button>
      </div>
      <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-white rounded-[16px] border border-[#DDE3EC] overflow-hidden" style={{ boxShadow: "0px 1px 3px rgba(18,34,50,0.04)" }}>
        <div className="overflow-x-auto">
          {activeTab === "leads-contas" && (<table className="w-full min-w-[900px]"><thead><tr className="border-b border-[#EEF1F6]">{[{ l: "Lead", k: "leadName" }, { l: "Empresa", k: "company" }, { l: "Estágio", k: "stage" }, { l: "Valor", k: "leadValue" }, { l: "Score", k: "score" }, { l: "Setor", k: "industry" }, { l: "Receita", k: "revenue" }, { l: "Func.", k: "employees" }, { l: "Cidade", k: "city" }].map(col => (<th key={col.k} className={`px-4 py-3 ${["leadValue", "score", "revenue", "employees"].includes(col.k) ? "text-right" : "text-left"}`} style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", color: "#28415c", ...ff }}><ThBtn label={col.l} colKey={col.k} /></th>))}</tr></thead><tbody>{sorted(filtered(leadsContas)).map((row, idx) => (<motion.tr key={row.leadId} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.02 }} className="border-t border-[#EEF1F6] hover:bg-[#F6F7F9] transition-colors"><td className="px-4 py-2.5 text-[#07ABDE]" style={{ fontSize: 12, fontWeight: 500, ...ff }}>{row.leadName}</td><td className="px-4 py-2.5 text-[#28415c]" style={{ fontSize: 12, fontWeight: 500, ...ff }}>{row.company}</td><td className="px-4 py-2.5"><span className="px-2 py-0.5 rounded-full" style={{ fontSize: 10, fontWeight: 700, backgroundColor: (STAGE_COLORS[row.stage] || "#4E6987") + "1A", color: STAGE_COLORS[row.stage] || "#4E6987", ...ff }}>{row.stage}</span></td><td className="px-4 py-2.5 text-right text-[#122232]" style={{ fontSize: 12, fontWeight: 700, ...ff }}>{formatCurrency(row.leadValue)}</td><td className="px-4 py-2.5 text-right" style={{ fontSize: 12, fontWeight: 700, color: row.score >= 70 ? "#3CCEA7" : row.score >= 50 ? "#EAC23D" : "#ED5200", ...ff }}>{row.score}</td><td className="px-4 py-2.5 text-[#4E6987]" style={{ fontSize: 12, fontWeight: 500, ...ff }}>{row.industry}</td><td className="px-4 py-2.5 text-right text-[#0483AB]" style={{ fontSize: 12, fontWeight: 600, ...ff }}>{formatCurrency(row.revenue)}</td><td className="px-4 py-2.5 text-right text-[#28415c]" style={{ fontSize: 12, fontWeight: 500, ...ff }}>{formatNumber(row.employees)}</td><td className="px-4 py-2.5 text-[#4E6987]" style={{ fontSize: 12, fontWeight: 500, ...ff }}>{row.city}/{row.state}</td></motion.tr>))}</tbody></table>)}
          {activeTab === "opp-leads" && (<table className="w-full min-w-[800px]"><thead><tr className="border-b border-[#EEF1F6]">{[{ l: "Oportunidade", k: "oppName" }, { l: "Conta", k: "account" }, { l: "Estágio", k: "stage" }, { l: "Valor", k: "value" }, { l: "Prob.", k: "probability" }, { l: "Leads", k: "linkedLeads" }, { l: "Score", k: "avgLeadScore" }, { l: "Valor Leads", k: "totalLeadValue" }].map(col => (<th key={col.k} className={`px-4 py-3 ${["value", "probability", "linkedLeads", "avgLeadScore", "totalLeadValue"].includes(col.k) ? "text-right" : "text-left"}`} style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", color: "#28415c", ...ff }}><ThBtn label={col.l} colKey={col.k} /></th>))}</tr></thead><tbody>{sorted(filtered(oppLeads)).map((row, idx) => (<motion.tr key={row.oppId} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.02 }} className="border-t border-[#EEF1F6] hover:bg-[#F6F7F9] transition-colors"><td className="px-4 py-2.5 text-[#07ABDE]" style={{ fontSize: 12, fontWeight: 500, ...ff }}>{row.oppName}</td><td className="px-4 py-2.5 text-[#28415c]" style={{ fontSize: 12, fontWeight: 500, ...ff }}>{row.account}</td><td className="px-4 py-2.5"><span className="px-2 py-0.5 rounded-full" style={{ fontSize: 10, fontWeight: 700, backgroundColor: (STAGE_COLORS[row.stage] || "#4E6987") + "1A", color: STAGE_COLORS[row.stage] || "#4E6987", ...ff }}>{row.stage}</span></td><td className="px-4 py-2.5 text-right text-[#122232]" style={{ fontSize: 12, fontWeight: 700, ...ff }}>{formatCurrency(row.value)}</td><td className="px-4 py-2.5 text-right" style={{ fontSize: 12, fontWeight: 700, color: row.probability >= 70 ? "#3CCEA7" : row.probability >= 40 ? "#EAC23D" : "#ED5200", ...ff }}>{row.probability}%</td><td className="px-4 py-2.5 text-right text-[#28415c]" style={{ fontSize: 12, fontWeight: 600, ...ff }}>{row.linkedLeads}</td><td className="px-4 py-2.5 text-right text-[#6868B1]" style={{ fontSize: 12, fontWeight: 700, ...ff }}>{row.avgLeadScore}pts</td><td className="px-4 py-2.5 text-right text-[#0483AB]" style={{ fontSize: 12, fontWeight: 600, ...ff }}>{formatCurrency(row.totalLeadValue)}</td></motion.tr>))}</tbody></table>)}
          {activeTab === "atividades-leads" && (<table className="w-full min-w-[800px]"><thead><tr className="border-b border-[#EEF1F6]">{[{ l: "Atividade", k: "actTitle" }, { l: "Tipo", k: "actType" }, { l: "Status", k: "actStatus" }, { l: "Data", k: "actDate" }, { l: "Responsável", k: "actOwner" }, { l: "Lead", k: "leadName" }, { l: "Estágio", k: "leadStage" }, { l: "Valor", k: "leadValue" }, { l: "Score", k: "leadScore" }].map(col => (<th key={col.k} className={`px-4 py-3 ${["leadValue", "leadScore"].includes(col.k) ? "text-right" : "text-left"}`} style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", color: "#28415c", ...ff }}><ThBtn label={col.l} colKey={col.k} /></th>))}</tr></thead><tbody>{sorted(filtered(actLeads)).map((row, idx) => { const sts: Record<string, { bg: string; text: string }> = { pendente: { bg: "#FEEDCA", text: "#917822" }, concluida: { bg: "#D9F8EF", text: "#135543" }, atrasada: { bg: "#FFEDEB", text: "#B13B00" } }; const st = sts[row.actStatus] || sts.pendente; return (<motion.tr key={row.actId} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.02 }} className="border-t border-[#EEF1F6] hover:bg-[#F6F7F9] transition-colors"><td className="px-4 py-2.5 text-[#122232]" style={{ fontSize: 12, fontWeight: 500, ...ff }}>{row.actTitle}</td><td className="px-4 py-2.5 text-[#4E6987] capitalize" style={{ fontSize: 11, fontWeight: 500, ...ff }}>{row.actType}</td><td className="px-4 py-2.5"><span className="px-2 py-0.5 rounded-full capitalize" style={{ fontSize: 10, fontWeight: 700, backgroundColor: st.bg, color: st.text, ...ff }}>{row.actStatus}</span></td><td className="px-4 py-2.5 text-[#4E6987]" style={{ fontSize: 12, fontWeight: 500, ...ff }}>{row.actDate}</td><td className="px-4 py-2.5 text-[#28415c]" style={{ fontSize: 12, fontWeight: 500, ...ff }}>{row.actOwner}</td><td className="px-4 py-2.5 text-[#07ABDE]" style={{ fontSize: 12, fontWeight: 500, ...ff }}>{row.leadName}</td><td className="px-4 py-2.5"><span className="px-2 py-0.5 rounded-full" style={{ fontSize: 10, fontWeight: 700, backgroundColor: (STAGE_COLORS[row.leadStage] || "#4E6987") + "1A", color: STAGE_COLORS[row.leadStage] || "#4E6987", ...ff }}>{row.leadStage}</span></td><td className="px-4 py-2.5 text-right text-[#122232]" style={{ fontSize: 12, fontWeight: 700, ...ff }}>{formatCurrency(row.leadValue)}</td><td className="px-4 py-2.5 text-right" style={{ fontSize: 12, fontWeight: 700, color: row.leadScore >= 70 ? "#3CCEA7" : row.leadScore >= 50 ? "#EAC23D" : "#ED5200", ...ff }}>{row.leadScore}</td></motion.tr>); })}</tbody></table>)}
        </div>
      </motion.div>
    </div>
  );
}
