import { NavLink, useLocation, useNavigate } from "react-router";
import {
  House, ChartBar, Table, FunnelSimple, Gear, CaretDown, CaretUp, X,
  SelectionPlus, Sidebar as SidebarIcon, ChartLineUp, ChartPieSlice,
  UsersThree, Lightning, Briefcase, Target, TreeStructure, Megaphone,
  ArrowsClockwise, Invoice, DotsNine, ChartDonut, Database, Cube,
  Crosshair, Gauge, Rows, Presentation,
} from "@phosphor-icons/react";
import { useState, useEffect, useRef, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";

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
  { id: "relatorios", icon: <Presentation size={20} weight="duotone" />, activeIcon: <Presentation size={20} weight="fill" />, label: "Relatórios", directTo: "/relatorios" },
];

interface ZeniteModule { id: string; name: string; abbr: string; icon: React.ComponentType<{ size?: number; weight?: string; style?: React.CSSProperties }>; bg: string; color: string; }
const zeniteModules: ZeniteModule[] = [
  { id: "prc", name: "Price", abbr: "PRC", icon: Invoice, bg: "#DCF0FF", color: "#07ABDE" },
  { id: "crm", name: "CRM", abbr: "CRM", icon: UsersThree, bg: "#DCF0FF", color: "#0483AB" },
  { id: "mkt", name: "Marketing", abbr: "MKT", icon: Megaphone, bg: "#FEEDCA", color: "#917822" },
  { id: "syc", name: "Sync", abbr: "SYC", icon: ArrowsClockwise, bg: "#D9F8EF", color: "#3CCEA7" },
  { id: "dsh", name: "Dashboard", abbr: "DSH", icon: ChartBar, bg: "#EBF1FA", color: "#4E6987" },
  { id: "flw", name: "Flow", abbr: "FLW", icon: TreeStructure, bg: "#FFEDEB", color: "#ED5200" },
  { id: "pjt", name: "Projects", abbr: "PJT", icon: Briefcase, bg: "#E8E8FD", color: "#6868B1" },
];

function getFirstRoute(item: RailItem): string | null {
  if (item.directTo) return item.directTo;
  if (item.sections) for (const s of item.sections) if (s.items.length > 0) return s.items[0].to;
  return null;
}

function railOwnsPath(item: RailItem, pathname: string): boolean {
  if (item.directTo !== undefined) return item.directTo === "/" ? pathname === "/" : pathname.startsWith(item.directTo);
  if (item.sections) return item.sections.some(s => s.items.some(i => pathname === i.to || pathname.startsWith(i.to + "/")));
  return false;
}

export function DashSidebar({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
  const location = useLocation();
  const navigate = useNavigate();
  const appDrawerRef = useRef<HTMLDivElement>(null);
  const [showAppDrawer, setShowAppDrawer] = useState(false);
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
    if (item.directTo) { navigate(item.directTo); setExpandedRail(null); }
    else { setExpandedRail(item.id); if (!railOwnsPath(item, location.pathname)) { const r = getFirstRoute(item); if (r) navigate(r); } }
  };
  const toggleSection = (key: string) => setCollapsedSections(prev => { const next = new Set(prev); if (next.has(key)) next.delete(key); else next.add(key); return next; });

  const expandedItem = dashRailItems.find(r => r.id === expandedRail);
  const showPanel = !!expandedItem?.sections;

  const rail = (
    <div className="flex flex-col items-center w-[72px] min-w-[72px] h-screen bg-[#EBF1FA] py-3 gap-1 z-20">
      <button onClick={() => { if (location.pathname === "/") return; setExpandedRail(expandedRail ? null : (dashRailItems.find(r => r.sections) || dashRailItems[0]).id); }}
        className={`flex items-center justify-center w-10 h-10 rounded-xl transition-colors mb-4 mt-1 shrink-0 ${location.pathname === "/" ? "text-[#98989d] cursor-default" : "text-[#4E6987] hover:bg-[#28415C]/10 hover:text-[#28415C] cursor-pointer"}`}
        disabled={location.pathname === "/"}>
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
              <motion.div initial={{ opacity: 0, y: 8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                className="absolute bottom-0 left-[calc(100%+12px)] w-[264px] bg-white rounded-[16px] p-4 z-50"
                style={{ boxShadow: "0px 12px 32px rgba(18,34,50,0.12), 0px 2px 8px rgba(18,34,50,0.06)", border: "0.7px solid rgba(200,207,219,0.4)" }}>
                <p className="text-[#98989d] px-1 mb-3" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", lineHeight: "20px" }}>Aplicativos</p>
                <div className="grid grid-cols-3 gap-1">
                  {zeniteModules.map(app => {
                    const Icon = app.icon;
                    const isAct = app.id === "dsh";
                    return (
                      <motion.button key={app.id} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-[12px] cursor-pointer transition-colors ${isAct ? "bg-[#F6F7F9] hover:bg-[#DDE3EC]" : "hover:bg-[#F6F7F9]"}`}>
                        <div className="flex items-center justify-center w-[40px] h-[40px] rounded-[10px]" style={{ backgroundColor: app.bg }}>
                          <Icon size={22} weight="duotone" style={{ color: app.color }} />
                        </div>
                        <div className="flex flex-col items-center">
                          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: -0.3, lineHeight: "14px", color: "#122232" }}>{app.abbr}</span>
                          <span style={{ fontSize: 9, fontWeight: 500, letterSpacing: -0.2, lineHeight: "13px", color: "#98989d" }}>{app.name}</span>
                        </div>
                        {isAct && <div className="w-[4px] h-[4px] rounded-full bg-[#4E6987] -mt-0.5" />}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );

  const panel = showPanel && expandedItem ? (
    <div className="flex flex-col w-[224px] min-w-[224px] h-screen bg-[#F6F7F9] z-10">
      <div className="px-5 py-5">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-[28px] h-[28px] rounded-[8px] bg-[#EBF1FA]"><ChartBar size={16} weight="fill" className="text-[#4E6987]" /></div>
          <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: -0.5, color: "#122232" }}>Zenite Dash</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-3">
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
                    <NavLink key={subItem.to} to={subItem.to} end
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
    </div>
  ) : null;

  const minimalPanel = !showPanel ? (
    <div className="flex flex-col w-[224px] min-w-[224px] h-screen bg-[#F6F7F9] z-10">
      <div className="px-5 py-5"><div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-[28px] h-[28px] rounded-[8px] bg-[#EBF1FA]"><ChartBar size={16} weight="fill" className="text-[#4E6987]" /></div>
        <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: -0.5, color: "#122232" }}>Zenite Dash</span>
      </div></div>
    </div>
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