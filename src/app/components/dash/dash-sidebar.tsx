import { NavLink, useLocation, useNavigate } from "react-router";
import {
  House, ChartBar, Table, FunnelSimple, Gear, CaretDown, CaretUp, X,
  SelectionPlus, Sidebar as SidebarIcon, ChartLineUp, ChartPieSlice,
  UsersThree, Lightning, Briefcase, Target, TreeStructure, Megaphone,
  ArrowsClockwise, Invoice, DotsNine, ChartDonut, Database, Cube,
  Crosshair, Gauge, Rows, Presentation, PencilRuler, Plus, Clock,
  User, LockKey, Globe, ListBullets,
} from "@phosphor-icons/react";
import { useState, useEffect, useRef, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PillButton } from "../pill-button";
import LogoZeniteDash from "../../../imports/LogoZeniteDash";
import { AppDrawer } from "../app-drawer";

interface RailItem { id: string; icon: ReactNode; activeIcon: ReactNode; label: string; directTo?: string; sections?: PanelSection[]; }
interface PanelSection { title?: string; items: PanelItem[]; }
interface PanelItem { to: string; icon: ReactNode; activeIcon: ReactNode; label: string; }

const dashRailItems: RailItem[] = [
  { id: "inicio", icon: <House size={20} weight="duotone" />, activeIcon: <House size={20} weight="fill" />, label: "Início", directTo: "/" },
  {
    id: "dashboards", icon: <ChartBar size={20} weight="duotone" />, activeIcon: <ChartBar size={20} weight="fill" />, label: "Dashboards",
    sections: [
      { title: "Visões", items: [
        { to: "/dashboards/overview", icon: <Gauge size={18} weight="duotone" />, activeIcon: <Gauge size={18} weight="fill" />, label: "Visão Geral" },
        { to: "/dashboards/vendas", icon: <ChartLineUp size={18} weight="duotone" />, activeIcon: <ChartLineUp size={18} weight="fill" />, label: "Vendas" },
        { to: "/dashboards/pipeline", icon: <FunnelSimple size={18} weight="duotone" />, activeIcon: <FunnelSimple size={18} weight="fill" />, label: "Pipeline" },
        { to: "/dashboards/atividades", icon: <Lightning size={18} weight="duotone" />, activeIcon: <Lightning size={18} weight="fill" />, label: "Atividades" },
      ]},
      { title: "Análises", items: [
        { to: "/dashboards/performance", icon: <Target size={18} weight="duotone" />, activeIcon: <Target size={18} weight="fill" />, label: "Performance" },
        { to: "/dashboards/conversao", icon: <ChartDonut size={18} weight="duotone" />, activeIcon: <ChartDonut size={18} weight="fill" />, label: "Conversão" },
      ]},
      { title: "Personalizado", items: [
        { to: "/dashboards/builder", icon: <SelectionPlus size={18} weight="duotone" />, activeIcon: <SelectionPlus size={18} weight="fill" />, label: "Builder" },
      ]},
    ],
  },
  {
    id: "explorador", icon: <Database size={20} weight="duotone" />, activeIcon: <Database size={20} weight="fill" />, label: "Dados",
    sections: [
      { title: "Explorador", items: [
        { to: "/explorador/tabelas", icon: <Table size={18} weight="duotone" />, activeIcon: <Table size={18} weight="fill" />, label: "Tabelas Cruzadas" },
        { to: "/explorador/objetos", icon: <Cube size={18} weight="duotone" />, activeIcon: <Cube size={18} weight="fill" />, label: "Objetos CRM" },
      ]},
    ],
  },
  {
    id: "estudio", icon: <PencilRuler size={20} weight="duotone" />, activeIcon: <PencilRuler size={20} weight="fill" />, label: "Estúdio",
    sections: [
      { title: "Relatórios", items: [
        { to: "/estudio/relatorios/recentes", icon: <Clock size={18} weight="duotone" />, activeIcon: <Clock size={18} weight="fill" />, label: "Recentes" },
        { to: "/estudio/relatorios/criados-por-mim", icon: <User size={18} weight="duotone" />, activeIcon: <User size={18} weight="fill" />, label: "Criados por mim" },
        { to: "/estudio/relatorios/privados", icon: <LockKey size={18} weight="duotone" />, activeIcon: <LockKey size={18} weight="fill" />, label: "Relatórios privados" },
        { to: "/estudio/relatorios/publicos", icon: <Globe size={18} weight="duotone" />, activeIcon: <Globe size={18} weight="fill" />, label: "Relatórios Públicos" },
        { to: "/estudio/relatorios/todos", icon: <ListBullets size={18} weight="duotone" />, activeIcon: <ListBullets size={18} weight="fill" />, label: "Todos Relatórios" },
      ]},
      { title: "Dashboards", items: [
        { to: "/estudio/dashboards/recentes", icon: <Clock size={18} weight="duotone" />, activeIcon: <Clock size={18} weight="fill" />, label: "Recentes" },
        { to: "/estudio/dashboards/criados-por-mim", icon: <User size={18} weight="duotone" />, activeIcon: <User size={18} weight="fill" />, label: "Criados por mim" },
        { to: "/estudio/dashboards/privados", icon: <LockKey size={18} weight="duotone" />, activeIcon: <LockKey size={18} weight="fill" />, label: "Dashboards privados" },
        { to: "/estudio/dashboards/publicos", icon: <Globe size={18} weight="duotone" />, activeIcon: <Globe size={18} weight="fill" />, label: "Dashboards Públicos" },
        { to: "/estudio/dashboards/todos", icon: <ListBullets size={18} weight="duotone" />, activeIcon: <ListBullets size={18} weight="fill" />, label: "Todos Dashboards" },
      ]},
    ],
  },
  { id: "relatorios", icon: <Presentation size={20} weight="duotone" />, activeIcon: <Presentation size={20} weight="fill" />, label: "Relatórios", directTo: "/relatorios" },
];

function getFirstRoute(item: RailItem): string | null {
  if (item.directTo) return item.directTo;
  if (item.sections) for (const s of item.sections) if (s.items.length > 0) return s.items[0].to;
  return null;
}

function railOwnsPath(item: RailItem, pathname: string): boolean {
  if (item.directTo !== undefined) return item.directTo === "/" ? pathname === "/" : pathname.startsWith(item.directTo);
  // Para o estúdio, aceitar qualquer rota que comece com /estudio
  if (item.id === "estudio" && pathname.startsWith("/estudio")) return true;
  if (item.sections) return item.sections.some(s => s.items.some(i => pathname === i.to || pathname.startsWith(i.to + "/")));
  return false;
}

export function DashSidebar({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
  const location = useLocation();
  const navigate = useNavigate();
  const appDrawerRef = useRef<HTMLDivElement>(null);
  const [showAppDrawer, setShowAppDrawer] = useState(false);
  const [panelCollapsed, setPanelCollapsed] = useState(false);
  const [expandedRail, setExpandedRail] = useState<string | null>(() => {
    for (const item of dashRailItems) if (!item.directTo && railOwnsPath(item, location.pathname)) return item.id;
    return null;
  });
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());

  useEffect(() => { for (const item of dashRailItems) if (!item.directTo && railOwnsPath(item, location.pathname)) { setExpandedRail(item.id); return; } }, [location.pathname]);
  useEffect(() => { if (onClose) onClose(); setShowAppDrawer(false); }, [location.pathname]);
  useEffect(() => {
    if (!showAppDrawer) return;
    const h1 = (e: MouseEvent) => { if (appDrawerRef.current && !appDrawerRef.current.contains(e.target as Node)) setShowAppDrawer(false); };
    const h2 = (e: KeyboardEvent) => { if (e.key === "Escape") setShowAppDrawer(false); };
    document.addEventListener("mousedown", h1); document.addEventListener("keydown", h2);
    return () => { document.removeEventListener("mousedown", h1); document.removeEventListener("keydown", h2); };
  }, [showAppDrawer]);

  const handleRailClick = (item: RailItem) => {
    if (panelCollapsed) setPanelCollapsed(false);
    if (item.directTo) { navigate(item.directTo); setExpandedRail(null); }
    else { setExpandedRail(item.id); if (!railOwnsPath(item, location.pathname)) { const r = getFirstRoute(item); if (r) navigate(r); } }
  };
  const toggleSection = (key: string) => setCollapsedSections(prev => { const next = new Set(prev); if (next.has(key)) next.delete(key); else next.add(key); return next; });

  const expandedItem = dashRailItems.find(r => r.id === expandedRail);
  const showPanel = !!expandedItem?.sections;

  const rail = (
    <div className="flex flex-col items-center w-[72px] min-w-[72px] h-screen bg-[#EBF1FA] py-3 gap-1 z-20">
      <button onClick={() => { setPanelCollapsed(v => !v); }}
        className={`flex items-center justify-center w-10 h-10 rounded-xl transition-colors mb-4 mt-1 shrink-0 text-[#4E6987] hover:bg-[#28415C]/10 hover:text-[#28415C] cursor-pointer`}>
        <SidebarIcon size={20} weight="duotone" />
      </button>
      <div className="flex flex-col items-center gap-4 flex-1">
        {dashRailItems.map(item => {
          const ownsPath = railOwnsPath(item, location.pathname);
          const firstOwner = dashRailItems.find(ri => railOwnsPath(ri, location.pathname));
          const isActive = ownsPath && firstOwner?.id === item.id;
          const isExpanded = expandedRail === item.id;
          const hl = isActive || isExpanded;
          return (
            <button key={item.id} onClick={() => handleRailClick(item)} className="flex flex-col items-center gap-0.5 transition-all group cursor-pointer">
              <div className={`relative flex items-center justify-center h-[32px] rounded-full transition-all ${hl ? "w-[42px] bg-[#28415C] text-[#F6F7F9] backdrop-blur-[50px]" : "w-[32px] text-[#4E6987] group-hover:w-[42px] group-hover:bg-[#28415C]/10 group-hover:text-[#28415C]"}`}
                style={hl ? { boxShadow: "0px 2px 4px 0px rgba(18,34,50,0.3)" } : undefined}>
                <span className="flex items-center justify-center">{hl ? item.activeIcon : item.icon}</span>
                {hl && <div className="absolute inset-0 rounded-full pointer-events-none" style={{ border: "0.7px solid rgba(200,207,219,0.6)" }} />}
              </div>
              <span className={`transition-colors ${hl ? "text-[#28415C]" : "text-[#4E6987] group-hover:text-[#28415C]"}`}
                style={{ fontSize: 11, fontWeight: hl ? 700 : 500, letterSpacing: -0.5, lineHeight: "22px" }}>{item.label}</span>
            </button>
          );
        })}

        {/* Sync button */}
        {(() => {
          const isSyncActive = location.pathname === "/sync-config";
          return (
            <button onClick={() => { setExpandedRail(null); navigate("/sync-config"); }} className="flex flex-col items-center gap-0.5 transition-all group cursor-pointer">
              <div className={`relative flex items-center justify-center h-[32px] rounded-full transition-all ${isSyncActive ? "w-[42px] bg-[#28415C] text-[#F6F7F9] backdrop-blur-[50px]" : "w-[32px] text-[#4E6987] group-hover:w-[42px] group-hover:bg-[#28415C]/10 group-hover:text-[#28415C]"}`}
                style={isSyncActive ? { boxShadow: "0px 2px 4px 0px rgba(18,34,50,0.3)" } : undefined}>
                <span className="flex items-center justify-center"><ArrowsClockwise size={20} weight={isSyncActive ? "fill" : "duotone"} /></span>
                {isSyncActive && <div className="absolute inset-0 rounded-full pointer-events-none" style={{ border: "0.7px solid rgba(200,207,219,0.6)" }} />}
              </div>
              <span className={`transition-colors ${isSyncActive ? "text-[#28415C]" : "text-[#4E6987] group-hover:text-[#28415C]"}`}
                style={{ fontSize: 11, fontWeight: isSyncActive ? 700 : 500, letterSpacing: -0.5, lineHeight: "22px" }}>Sync</span>
            </button>
          );
        })()}
      </div>
      <div className="mt-auto pt-3">
        <div className="flex items-center justify-center w-[32px] h-[32px] rounded-full bg-[#0483AB] text-white mb-3" style={{ fontSize: 12, fontWeight: 700 }}>HZ</div>
        <div className="relative" ref={appDrawerRef}>
          <div onClick={() => setShowAppDrawer(v => !v)}
            className={`relative flex items-center justify-center h-[32px] rounded-full cursor-pointer transition-all ${showAppDrawer ? "w-[42px] bg-[#28415C] text-[#F6F7F9] backdrop-blur-[50px]" : "w-[32px] text-[#4E6987] hover:w-[42px] hover:bg-[#28415C]/10 hover:text-[#28415C]"}`}
            style={showAppDrawer ? { boxShadow: "0px 2px 4px 0px rgba(18,34,50,0.3)" } : undefined}>
            <DotsNine size={20} weight={showAppDrawer ? "fill" : "duotone"} />
            {showAppDrawer && <div className="absolute inset-0 rounded-full pointer-events-none" style={{ border: "0.7px solid rgba(200,207,219,0.6)" }} />}
          </div>
          <AnimatePresence>
            {showAppDrawer && (
              <AppDrawer
                currentAppId="dsh"
                onNavigate={(route) => navigate(route)}
                onClose={() => setShowAppDrawer(false)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );

  const panel = showPanel && expandedItem ? (
    <motion.div
      initial={false}
      animate={{ width: panelCollapsed ? 0 : 224, opacity: panelCollapsed ? 0 : 1 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col h-screen bg-[#F6F7F9] z-10 overflow-hidden"
      style={{ minWidth: 0 }}
    >
      <div className="px-5 py-5">
        <div className="relative w-[130px] h-[24px]">
          <LogoZeniteDash />
        </div>
      </div>
      {/* Botão Criar Relatório - aparece apenas na seção Estúdio */}
      {expandedItem.id === "estudio" && (
        <div className="px-5 pb-4" style={{ minWidth: 224 }}>
          {location.pathname.startsWith("/estudio/dashboards") ? (
            <PillButton
              variant="default"
              icon={<Plus size={16} weight="bold" />}
              onClick={() => navigate("/estudio/painel")}
              className="w-full"
            >
              Criar Dash
            </PillButton>
          ) : (
            <PillButton
              variant="default"
              icon={<Plus size={16} weight="bold" />}
              onClick={() => navigate("/estudio/visual")}
              className="w-full"
            >
              Criar Relatório
            </PillButton>
          )}
        </div>
      )}
      <div className="flex-1 overflow-y-auto py-3" style={{ minWidth: 224 }}>
        {expandedItem.sections!.map((section, si) => {
          const sectionKey = `${expandedItem.id}-${si}`;
          const isCollapsed = collapsedSections.has(sectionKey);
          return (
            <div key={sectionKey} className="mb-2">
              {section.title && (
                <button onClick={() => toggleSection(sectionKey)} className="flex items-center justify-between w-full px-5 py-2 text-[#122232] hover:bg-[#F6F7F9] transition-colors">
                  <span style={{ fontSize: 18, fontWeight: 400, letterSpacing: -0.5 }}>{section.title}</span>
                  {isCollapsed ? <CaretDown size={14} className="text-[#4E6987]" /> : <CaretUp size={14} className="text-[#4E6987]" />}
                </button>
              )}
              {!isCollapsed && (
                <div className="flex flex-col gap-[2px] mt-0.5 px-3">
                  {section.items.map(subItem => (
                    <NavLink key={subItem.to} to={subItem.to}
                      className={({ isActive }) => `group/item relative flex items-center gap-[10px] pl-[6px] py-[6px] transition-all cursor-pointer ${isActive ? "rounded-[100px] bg-[#28415c] backdrop-blur-[50px] pr-[22px]" : "rounded-[8px] hover:rounded-[100px] hover:bg-[#dde3ec] pr-[22px]"}`}>
                      {({ isActive }) => (<>
                        {isActive && <div aria-hidden="true" className="absolute inset-0 rounded-[100px] pointer-events-none" style={{ border: "0.7px solid rgba(200,207,219,0.6)", boxShadow: "0px 2px 4px 0px rgba(18,34,50,0.3)" }} />}
                        <span className={`flex items-center justify-center size-[28px] rounded-[6px] shrink-0 ${isActive ? "text-[#f6f7f9]" : "text-[#4e6987]"}`}>
                          {isActive ? subItem.activeIcon : subItem.icon}
                        </span>
                        <span className={`flex-1 ${isActive ? "text-[#f6f7f9]" : "text-[#4e6987]"}`}
                          style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.5, lineHeight: "22px" }}>{subItem.label}</span>
                      </>)}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  ) : null;

  const minimalPanel = !showPanel ? (
    <motion.div
      initial={false}
      animate={{ width: panelCollapsed ? 0 : 224, opacity: panelCollapsed ? 0 : 1 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col h-screen bg-[#F6F7F9] z-10 overflow-hidden"
      style={{ minWidth: 0 }}
    >
      <div className="px-5 py-5">
        <div className="relative w-[130px] h-[24px]">
          <LogoZeniteDash />
        </div>
      </div>
    </motion.div>
  ) : null;

  const sidebarContent = (<div className="flex h-screen">{rail}{panel}{minimalPanel}</div>);

  return (<>
    <div className="hidden lg:flex">{sidebarContent}</div>
    {isOpen && (
      <div className="fixed inset-0 z-50 lg:hidden">
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />
        <div className="relative z-10 h-full flex">
          {sidebarContent}
          <button onClick={onClose} className="absolute top-3 right-3 p-2 rounded-lg bg-white/90 text-[#4E6987] hover:text-[#122232] shadow-md z-20"><X size={18} /></button>
        </div>
      </div>
    )}
  </>);
}