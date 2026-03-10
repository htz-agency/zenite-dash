import { useState } from "react";
import { motion } from "motion/react";
import { Heart, SketchLogo, Building, Lightning, Users, MagnifyingGlass } from "@phosphor-icons/react";
import { useDashData, formatCurrency, formatNumber } from "./dash-data-provider";

const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };
type ObjType = "leads" | "oportunidades" | "contas" | "atividades" | "contatos";

export function DashObjetos() {
  const [active, setActive] = useState<ObjType>("leads");
  const [search, setSearch] = useState("");
  const { leads, opportunities, accounts, activities, contacts, loading } = useDashData();

  const objTabs: { id: ObjType; label: string; icon: React.ReactNode; color: string; bg: string; count: number }[] = [
    { id: "leads", label: "Leads", icon: <Heart size={16} weight="fill" />, color: "#ED5200", bg: "#FFEDEB", count: leads.length },
    { id: "oportunidades", label: "Oportunidades", icon: <SketchLogo size={16} weight="fill" />, color: "#6868B1", bg: "#E8E8FD", count: opportunities.length },
    { id: "contas", label: "Contas", icon: <Building size={16} weight="fill" />, color: "#0483AB", bg: "#DCF0FF", count: accounts.length },
    { id: "atividades", label: "Atividades", icon: <Lightning size={16} weight="fill" />, color: "#3CCEA7", bg: "#D9F8EF", count: activities.length },
    { id: "contatos", label: "Contatos", icon: <Users size={16} weight="fill" />, color: "#917822", bg: "#FEEDCA", count: contacts.length },
  ];

  const filter = (data: any[]) => { if (!search) return data; const q = search.toLowerCase(); return data.filter(row => Object.values(row).some(v => String(v).toLowerCase().includes(q))); };

  if (loading) return (<div className="flex items-center justify-center h-64 text-[#98989d]"><div className="flex flex-col items-center gap-3"><div className="w-8 h-8 border-2 border-[#0483AB] border-t-transparent rounded-full animate-spin" /><span style={{ fontSize: 13, fontWeight: 500, ...ff }}>Carregando dados do Supabase...</span></div></div>);

  return (
    <div className="max-w-[1400px] mx-auto px-2">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-6">
        <h1 className="text-[#122232]" style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5, ...ff }}>Objetos CRM</h1>
        <p className="text-[#4E6987] mt-1" style={{ fontSize: 14, letterSpacing: -0.3, ...ff }}>Explorar dados brutos de cada objeto</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-5">
        {objTabs.map(tab => (
          <motion.button key={tab.id} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} onClick={() => { setActive(tab.id); setSearch(""); }}
            className={`flex items-center gap-3 p-4 rounded-[14px] border transition-all cursor-pointer ${active === tab.id ? "bg-white border-[#0483AB]/30" : "bg-white border-[#DDE3EC] hover:border-[#C8CFDB]"}`}
            style={active === tab.id ? { boxShadow: "0px 2px 8px rgba(4,131,171,0.12)" } : { boxShadow: "0px 1px 3px rgba(18,34,50,0.04)" }}>
            <div className="flex items-center justify-center w-[36px] h-[36px] rounded-[10px]" style={{ backgroundColor: tab.bg }}><span style={{ color: tab.color }}>{tab.icon}</span></div>
            <div className="text-left">
              <span className="text-[#122232] block" style={{ fontSize: 14, fontWeight: 700, letterSpacing: -0.3, ...ff }}>{tab.label}</span>
              <span className="text-[#4E6987]" style={{ fontSize: 11, fontWeight: 500, letterSpacing: -0.3, ...ff }}>{tab.count} registros</span>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="flex items-center gap-2 h-[36px] px-3 bg-white rounded-[10px] border border-[#DDE3EC] max-w-[300px] mb-4">
        <MagnifyingGlass size={14} className="text-[#C8CFDB]" />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder={`Buscar ${objTabs.find(t => t.id === active)?.label}...`} className="flex-1 bg-transparent border-none outline-none text-[#122232] placeholder-[#C8CFDB]" style={{ fontSize: 12, fontWeight: 400, letterSpacing: -0.3, ...ff }} />
      </div>

      <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-white rounded-[16px] border border-[#DDE3EC] overflow-hidden" style={{ boxShadow: "0px 1px 3px rgba(18,34,50,0.04)" }}>
        <div className="overflow-x-auto">
          {active === "leads" && (
            <table className="w-full min-w-[700px]"><thead><tr className="border-b border-[#EEF1F6]">
              {["Nome", "Empresa", "Estágio", "Valor", "Score", "Responsável", "Origem", "Segmento", "Criado"].map(h => (<th key={h} className={`px-4 py-3 ${["Valor", "Score"].includes(h) ? "text-right" : "text-left"}`} style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", color: "#28415c", ...ff }}>{h}</th>))}
            </tr></thead><tbody>
              {filter(leads).slice(0, 50).map(l => (<tr key={l.id} className="border-t border-[#EEF1F6] hover:bg-[#F6F7F9] transition-colors">
                <td className="px-4 py-2 text-[#07ABDE]" style={{ fontSize: 12, fontWeight: 500, ...ff }}>{l.name}</td>
                <td className="px-4 py-2 text-[#28415c]" style={{ fontSize: 12, fontWeight: 500, ...ff }}>{l.company}</td>
                <td className="px-4 py-2"><span className="px-2 py-0.5 rounded-full" style={{ fontSize: 10, fontWeight: 700, backgroundColor: "#0483AB1A", color: "#0483AB", ...ff }}>{l.stage}</span></td>
                <td className="px-4 py-2 text-right text-[#122232]" style={{ fontSize: 12, fontWeight: 700, ...ff }}>{formatCurrency(l.value)}</td>
                <td className="px-4 py-2 text-right" style={{ fontSize: 12, fontWeight: 700, color: l.score >= 70 ? "#3CCEA7" : l.score >= 50 ? "#EAC23D" : "#ED5200", ...ff }}>{l.score}</td>
                <td className="px-4 py-2 text-[#4E6987]" style={{ fontSize: 12, fontWeight: 500, ...ff }}>{l.owner}</td>
                <td className="px-4 py-2 text-[#4E6987]" style={{ fontSize: 12, fontWeight: 500, ...ff }}>{l.source}</td>
                <td className="px-4 py-2 text-[#4E6987]" style={{ fontSize: 12, fontWeight: 500, ...ff }}>{l.segment}</td>
                <td className="px-4 py-2 text-[#98989d]" style={{ fontSize: 11, fontWeight: 500, ...ff }}>{l.createdAt}</td>
              </tr>))}
            </tbody></table>
          )}
          {active === "oportunidades" && (
            <table className="w-full min-w-[700px]"><thead><tr className="border-b border-[#EEF1F6]">
              {["Nome", "Conta", "Estágio", "Valor", "Prob.", "Responsável", "Origem", "Previsão"].map(h => (<th key={h} className={`px-4 py-3 ${["Valor", "Prob."].includes(h) ? "text-right" : "text-left"}`} style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", color: "#28415c", ...ff }}>{h}</th>))}
            </tr></thead><tbody>
              {filter(opportunities).slice(0, 50).map(o => (<tr key={o.id} className="border-t border-[#EEF1F6] hover:bg-[#F6F7F9] transition-colors">
                <td className="px-4 py-2 text-[#07ABDE]" style={{ fontSize: 12, fontWeight: 500, ...ff }}>{o.name}</td>
                <td className="px-4 py-2 text-[#28415c]" style={{ fontSize: 12, fontWeight: 500, ...ff }}>{o.account}</td>
                <td className="px-4 py-2"><span className="px-2 py-0.5 rounded-full" style={{ fontSize: 10, fontWeight: 700, backgroundColor: "#6868B11A", color: "#6868B1", ...ff }}>{o.stage}</span></td>
                <td className="px-4 py-2 text-right text-[#122232]" style={{ fontSize: 12, fontWeight: 700, ...ff }}>{formatCurrency(o.value)}</td>
                <td className="px-4 py-2 text-right" style={{ fontSize: 12, fontWeight: 700, color: o.probability >= 70 ? "#3CCEA7" : o.probability >= 40 ? "#EAC23D" : "#ED5200", ...ff }}>{o.probability}%</td>
                <td className="px-4 py-2 text-[#4E6987]" style={{ fontSize: 12, fontWeight: 500, ...ff }}>{o.owner}</td>
                <td className="px-4 py-2 text-[#4E6987]" style={{ fontSize: 12, fontWeight: 500, ...ff }}>{o.origin}</td>
                <td className="px-4 py-2 text-[#4E6987]" style={{ fontSize: 12, fontWeight: 500, ...ff }}>{o.closeDate}</td>
              </tr>))}
            </tbody></table>
          )}
          {active === "contas" && (
            <table className="w-full min-w-[700px]"><thead><tr className="border-b border-[#EEF1F6]">
              {["Nome", "Setor", "Receita", "Funcionários", "Responsável", "Cidade", "Estado", "CNPJ"].map(h => (<th key={h} className={`px-4 py-3 ${["Receita", "Funcionários"].includes(h) ? "text-right" : "text-left"}`} style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", color: "#28415c", ...ff }}>{h}</th>))}
            </tr></thead><tbody>
              {filter(accounts).slice(0, 50).map(a => (<tr key={a.id} className="border-t border-[#EEF1F6] hover:bg-[#F6F7F9] transition-colors">
                <td className="px-4 py-2 text-[#07ABDE]" style={{ fontSize: 12, fontWeight: 500, ...ff }}>{a.name}</td>
                <td className="px-4 py-2 text-[#4E6987]" style={{ fontSize: 12, fontWeight: 500, ...ff }}>{a.industry}</td>
                <td className="px-4 py-2 text-right text-[#0483AB]" style={{ fontSize: 12, fontWeight: 700, ...ff }}>{formatCurrency(a.revenue)}</td>
                <td className="px-4 py-2 text-right text-[#28415c]" style={{ fontSize: 12, fontWeight: 500, ...ff }}>{formatNumber(a.employees)}</td>
                <td className="px-4 py-2 text-[#4E6987]" style={{ fontSize: 12, fontWeight: 500, ...ff }}>{a.owner}</td>
                <td className="px-4 py-2 text-[#4E6987]" style={{ fontSize: 12, fontWeight: 500, ...ff }}>{a.city}</td>
                <td className="px-4 py-2 text-[#28415c]" style={{ fontSize: 12, fontWeight: 500, ...ff }}>{a.state}</td>
                <td className="px-4 py-2 text-[#98989d]" style={{ fontSize: 11, fontWeight: 500, ...ff }}>{a.cnpj}</td>
              </tr>))}
            </tbody></table>
          )}
          {active === "atividades" && (
            <table className="w-full min-w-[700px]"><thead><tr className="border-b border-[#EEF1F6]">
              {["Título", "Tipo", "Status", "Relacionado", "Responsável", "Data", "Prioridade"].map(h => (<th key={h} className="px-4 py-3 text-left" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", color: "#28415c", ...ff }}>{h}</th>))}
            </tr></thead><tbody>
              {filter(activities).slice(0, 50).map(a => {
                const st: Record<string, { bg: string; text: string }> = { pendente: { bg: "#FEEDCA", text: "#917822" }, concluida: { bg: "#D9F8EF", text: "#135543" }, atrasada: { bg: "#FFEDEB", text: "#B13B00" } };
                const s = st[a.status] || st.pendente;
                return (<tr key={a.id} className="border-t border-[#EEF1F6] hover:bg-[#F6F7F9] transition-colors">
                  <td className="px-4 py-2 text-[#122232]" style={{ fontSize: 12, fontWeight: 500, ...ff }}>{a.title}</td>
                  <td className="px-4 py-2 text-[#4E6987] capitalize" style={{ fontSize: 11, fontWeight: 500, ...ff }}>{a.type}</td>
                  <td className="px-4 py-2"><span className="px-2 py-0.5 rounded-full capitalize" style={{ fontSize: 10, fontWeight: 700, backgroundColor: s.bg, color: s.text, ...ff }}>{a.status}</span></td>
                  <td className="px-4 py-2 text-[#07ABDE]" style={{ fontSize: 11, fontWeight: 600, ...ff }}>{a.relatedToName !== "-" ? a.relatedToName : a.relatedTo}</td>
                  <td className="px-4 py-2 text-[#4E6987]" style={{ fontSize: 12, fontWeight: 500, ...ff }}>{a.owner}</td>
                  <td className="px-4 py-2 text-[#4E6987]" style={{ fontSize: 12, fontWeight: 500, ...ff }}>{a.date}</td>
                  <td className="px-4 py-2 text-[#4E6987] capitalize" style={{ fontSize: 11, fontWeight: 500, ...ff }}>{a.priority}</td>
                </tr>);
              })}
            </tbody></table>
          )}
          {active === "contatos" && (
            <table className="w-full min-w-[700px]"><thead><tr className="border-b border-[#EEF1F6]">
              {["Nome", "Cargo", "Empresa", "Email", "Telefone", "Estágio", "Responsável", "Origem"].map(h => (<th key={h} className="px-4 py-3 text-left" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", color: "#28415c", ...ff }}>{h}</th>))}
            </tr></thead><tbody>
              {filter(contacts).slice(0, 50).map(ct => (<tr key={ct.id} className="border-t border-[#EEF1F6] hover:bg-[#F6F7F9] transition-colors">
                <td className="px-4 py-2 text-[#07ABDE]" style={{ fontSize: 12, fontWeight: 500, ...ff }}>{ct.name}</td>
                <td className="px-4 py-2 text-[#28415c]" style={{ fontSize: 12, fontWeight: 500, ...ff }}>{ct.role}</td>
                <td className="px-4 py-2 text-[#4E6987]" style={{ fontSize: 12, fontWeight: 500, ...ff }}>{ct.company}</td>
                <td className="px-4 py-2 text-[#4E6987]" style={{ fontSize: 12, fontWeight: 500, ...ff }}>{ct.email}</td>
                <td className="px-4 py-2 text-[#4E6987]" style={{ fontSize: 12, fontWeight: 500, ...ff }}>{ct.phone}</td>
                <td className="px-4 py-2"><span className="px-2 py-0.5 rounded-full" style={{ fontSize: 10, fontWeight: 700, backgroundColor: "#3CCEA71A", color: "#3CCEA7", ...ff }}>{ct.stage}</span></td>
                <td className="px-4 py-2 text-[#4E6987]" style={{ fontSize: 12, fontWeight: 500, ...ff }}>{ct.owner}</td>
                <td className="px-4 py-2 text-[#4E6987]" style={{ fontSize: 12, fontWeight: 500, ...ff }}>{ct.origin}</td>
              </tr>))}
            </tbody></table>
          )}
        </div>
      </motion.div>
    </div>
  );
}
