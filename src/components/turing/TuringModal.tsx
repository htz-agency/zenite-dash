import { useState, useRef, useEffect } from "react";
import { X, Atom, ThumbsUp, ThumbsDown, ArrowUp } from "@phosphor-icons/react";
import { useTuring } from "@/hooks/useTuring";

const SUGGESTIONS = ["Como esta o funil de vendas este mes?","Quais sao os leads mais quentes?","Ticket medio das oportunidades ganhas","Fontes de leads com mais conversao","Atividades da semana por responsavel","Compare MoM de receita"];
const GRADIENT = "linear-gradient(135deg, #8C8CD4, #07ABDE, #3CCEA7)";

interface TuringModalProps { isOpen: boolean; onClose: () => void; }

export function TuringModal({ isOpen, onClose }: TuringModalProps) {
  const { messages, isLoading, ask } = useTuring();
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isLoading]);
  useEffect(() => { if (isOpen) setTimeout(() => inputRef.current?.focus(), 100); }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const msg = input.trim(); setInput(""); await ask(msg);
  };
  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } };
  if (!isOpen) return null;

  return (
    <div style={{ position:"fixed",inset:0,zIndex:9999,background:"rgba(0,0,0,0.4)",backdropFilter:"blur(4px)",display:"flex",alignItems:"flex-end",justifyContent:"flex-end",padding:"24px" }} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={{ width:480,height:640,background:"#fff",borderRadius:16,display:"flex",flexDirection:"column",boxShadow:"0 24px 80px rgba(0,0,0,0.15)",overflow:"hidden" }}>
        <div style={{ padding:"16px 20px",borderBottom:"1px solid #F0F0F0",display:"flex",alignItems:"center",justifyContent:"space-between" }}>
          <div style={{ display:"flex",alignItems:"center",gap:10 }}>
            <div style={{ width:32,height:32,borderRadius:8,background:"#F6F7F9",display:"flex",alignItems:"center",justifyContent:"center" }}><Atom size={18} weight="duotone" className="text-[#8C8CD4]" /></div>
            <div><div style={{ fontSize:14,fontWeight:600,color:"#1A1A2E",fontFamily:"DM Sans" }}>Turing</div><div style={{ fontSize:11,color:"#9B9BAD",fontFamily:"DM Sans" }}>Agente IA · Zenite Dash</div></div>
          </div>
          <button onClick={onClose} style={{ border:"none",background:"none",cursor:"pointer",color:"#9B9BAD",padding:4 }}><X size={20} /></button>
        </div>
        <div style={{ flex:1,overflowY:"auto",padding:"16px 20px",display:"flex",flexDirection:"column",gap:16 }}>
          {messages.length === 0 ? (
            <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:20,paddingTop:24 }}>
              <div className="w-[64px] h-[64px] rounded-full bg-[#F6F7F9] flex items-center justify-center shadow-[0_2px_12px_rgba(140,140,212,0.35),0_4px_16px_rgba(7,171,222,0.2),0_6px_20px_rgba(60,206,167,0.15)]"><Atom size={28} weight="duotone" className="text-[#8C8CD4] animate-[turing-icon-hover_1.5s_linear_infinite]" /></div>
              <div style={{ textAlign:"center" }}>
                <div style={{ fontSize:16,fontWeight:600,color:"#1A1A2E",fontFamily:"DM Sans",marginBottom:4 }}>Ola! Sou o Turing</div>
                <div style={{ fontSize:13,color:"#9B9BAD",fontFamily:"DM Sans",lineHeight:1.5 }}>Analiso seus dados e respondo em linguagem natural.<br/>O que voce quer saber?</div>
              </div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,width:"100%" }}>
                {SUGGESTIONS.map((s) => (<button key={s} onClick={() => ask(s)} className="group cursor-pointer rounded-[18px] border-none bg-[#F6F7F9] px-3 py-2.5 text-left text-xs text-[#4E6987] font-[DM_Sans] leading-snug transition-all duration-200 hover:bg-white hover:shadow-[0_2px_12px_rgba(140,140,212,0.25),0_2px_8px_rgba(7,171,222,0.15),0_2px_6px_rgba(60,206,167,0.1)]">{s}</button>))}
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} style={{ display:"flex",flexDirection:msg.role==="user"?"row-reverse":"row",gap:8,alignItems:"flex-start" }}>
                {msg.role==="turing" && <div className="w-7 h-7 rounded-full bg-[#F6F7F9] shrink-0 flex items-center justify-center"><Atom size={14} weight="duotone" className="text-[#8C8CD4]" /></div>}
                <div style={{ maxWidth:"80%",padding:"10px 14px",borderRadius:12,color:msg.role==="user"?"#fff":"#1A1A2E",fontSize:13,fontFamily:"DM Sans",lineHeight:1.6,borderBottomRightRadius:msg.role==="user"?4:12,borderBottomLeftRadius:msg.role==="turing"?4:12,...(msg.role==="user"?{backgroundImage:GRADIENT}:{background:"#F6F7F9"}) }}>
                  <div>{msg.content}</div>
                  {msg.insight && msg.insight!==msg.content && <div style={{ marginTop:6,fontSize:12,opacity:0.8 }}>💡 {msg.insight}</div>}
                  {msg.explanation && <div style={{ marginTop:6,fontSize:12,opacity:0.75,borderTop:"1px solid rgba(0,0,0,0.08)",paddingTop:6 }}>{msg.explanation}</div>}
                  {msg.data && msg.data.length>0 && (
                    <div style={{ marginTop:8,background:"#fff",borderRadius:8,overflow:"auto",maxHeight:160,fontSize:11,border:"1px solid #EBEBF5" }}>
                      <table style={{ width:"100%",borderCollapse:"collapse" }}>
                        <thead><tr style={{ background:"#F6F7F9" }}>{Object.keys(msg.data[0]).map((k)=>(<th key={k} style={{ padding:"6px 10px",textAlign:"left",color:"#9B9BAD",fontWeight:500 }}>{k}</th>))}</tr></thead>
                        <tbody>{msg.data.slice(0,5).map((row,i)=>(<tr key={i} style={{ borderTop:"1px solid #F0F0F0" }}>{Object.values(row).map((v,j)=>(<td key={j} style={{ padding:"6px 10px",color:"#4A4A6A" }}>{String(v)}</td>))}</tr>))}</tbody>
                      </table>
                    </div>
                  )}
                  {msg.suggestions && msg.suggestions.length>0 && <div style={{ marginTop:8,display:"flex",flexWrap:"wrap",gap:4 }}>{msg.suggestions.map((s)=>(<button key={s} onClick={()=>ask(s)} className="cursor-pointer rounded-full border-none bg-[#F6F7F9] px-2 py-1 text-[11px] text-[#4E6987] font-[DM_Sans] transition-all duration-200 hover:bg-white hover:shadow-[0_1px_6px_rgba(140,140,212,0.2),0_1px_4px_rgba(7,171,222,0.12)]">{s}</button>))}</div>}
                  {msg.role==="turing" && <div style={{ marginTop:8,display:"flex",gap:4 }}><button style={{ border:"none",background:"none",cursor:"pointer",color:"#C0C0D0",padding:2 }}><ThumbsUp size={12} /></button><button style={{ border:"none",background:"none",cursor:"pointer",color:"#C0C0D0",padding:2 }}><ThumbsDown size={12} /></button></div>}
                </div>
              </div>
            ))
          )}
          {isLoading && <div style={{ display:"flex",gap:8,alignItems:"flex-start" }}><div className="w-7 h-7 rounded-full bg-[#F6F7F9] shrink-0 flex items-center justify-center"><Atom size={14} weight="duotone" className="text-[#8C8CD4] animate-[turing-icon-hover_1.5s_linear_infinite]" /></div><div style={{ padding:"12px 14px",background:"#F6F7F9",borderRadius:12,borderBottomLeftRadius:4 }}><div style={{ display:"flex",gap:4 }}>{[0,1,2].map((i)=>(<div key={i} style={{ width:6,height:6,borderRadius:"50%",background:"#8C8CD4",opacity:0.6,animation:`pulse 1.2s ease-in-out ${i*0.2}s infinite` }} />))}</div></div></div>}
          <div ref={bottomRef} />
        </div>
        <div style={{ padding:"12px 16px",borderTop:"1px solid #F0F0F0" }}>
          <div style={{ display:"flex",alignItems:"center",gap:10,background:"#DDE3EC",borderRadius:9999,padding:"4px 4px 4px 14px",height:40,boxShadow:"inset 0px 1px 3px 0px rgba(0,0,0,0.1), inset 0px 1px 2px 0px rgba(0,0,0,0.06)" }}>
            <Atom size={16} weight="duotone" className="text-[#8C8CD4] shrink-0" />
            <input ref={inputRef} value={input} onChange={(e)=>setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Pergunte sobre seus dados..." style={{ flex:1,border:"none",background:"transparent",outline:"none",fontSize:13,fontWeight:500,letterSpacing:-0.3,fontFamily:"DM Sans",color:"#28415C" }} />
            <button onClick={handleSend} disabled={!input.trim()||isLoading} style={{ width:32,height:32,borderRadius:16,border:"none",background:input.trim()?"#3CCEA7":"#EBEBF5",cursor:input.trim()?"pointer":"default",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}><ArrowUp size={16} color={input.trim()?"#fff":"#C0C0D0"} weight="bold" /></button>
          </div>
          <div style={{ textAlign:"center",marginTop:8,fontSize:10,color:"#C0C0D0",fontFamily:"DM Sans" }}>Turing analisa somente seus dados — nunca modifica registros</div>
        </div>
      </div>
    </div>
  );
}