/**
 * AppDrawer — Gaveta de apps do Zenite Cloud.
 *
 * Componente reutilizavel em todos os apps do Zenite Cloud.
 * Basta passar o `currentAppId` correspondente ao app host.
 *
 * Exemplo de uso:
 *   <AppDrawer currentAppId="prc" onNavigate={(route) => navigate(route)} onClose={() => setOpen(false)} />
 *
 * IDs disponiveis: prc, crm, mkt, syc, dsh, flw, pjt, tsk
 */
import {
  Invoice,
  UsersThree,
  Megaphone,
  ArrowsClockwise,
  ChartBar,
  TreeStructure,
  ProjectorScreenChart,
  CheckFat,
  MicrosoftExcelLogo,
  Envelope,
} from "@phosphor-icons/react";
import { motion } from "motion/react";
import LogoZeniteCloud from "../../imports/LogoZeniteCloud";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ZeniteModule {
  id: string;
  name: string;
  abbr: string;
  icon: React.ComponentType<{ size?: number; weight?: string; style?: React.CSSProperties }>;
  bg: string;
  color: string;
  route?: string;
}

interface ZeniteAddon {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number; weight?: string; style?: React.CSSProperties }>;
  bg: string;
  color: string;
  route?: string;
}

export interface AppDrawerProps {
  /** ID do app atual — determina qual app aparece como selecionado. */
  currentAppId: string;
  /** Callback de navegacao interna (react-router navigate). */
  onNavigate?: (route: string) => void;
  /** Chamado apos qualquer clique que deva fechar a gaveta. */
  onClose?: () => void;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const zeniteModules: ZeniteModule[] = [
  { id: "prc", name: "Price",     abbr: "PRC", icon: Invoice,              bg: "#DCF0FF", color: "#07ABDE", route: "https://price.htz.agency" },
  { id: "crm", name: "CRM",       abbr: "CRM", icon: UsersThree,           bg: "#DCF0FF", color: "#07ABDE", route: "https://zenite.htz.agency" },
  { id: "mkt", name: "Marketing", abbr: "MKT", icon: Megaphone,            bg: "#D9F8EF", color: "#23E6B2" },
  { id: "syc", name: "Sync",      abbr: "SYC", icon: ArrowsClockwise,      bg: "#D9F8EF", color: "#23E6B2", route: "https://sync.htz.agency" },
  { id: "dsh", name: "Dash",      abbr: "DSH", icon: ChartBar,             bg: "#FFEDEB", color: "#FF8C76", route: "https://dash.htz.agency" },
  { id: "flw", name: "Flow",      abbr: "FLW", icon: TreeStructure,        bg: "#FFEDEB", color: "#FF8C76" },
  { id: "pjt", name: "Projects",  abbr: "PJT", icon: ProjectorScreenChart, bg: "#E8E8FD", color: "#8C8CD4" },
  { id: "tsk", name: "Tasks",     abbr: "TSK", icon: CheckFat,             bg: "#E8E8FD", color: "#8C8CD4" },
];

const zeniteAddons: ZeniteAddon[] = [
  { id: "sfs", name: "Sync for Sheets", icon: MicrosoftExcelLogo, bg: "#D9F8EF", color: "#23E6B2" },
  { id: "cfg", name: "CRM for Gmail",   icon: Envelope,           bg: "#DCF0FF", color: "#07ABDE" },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function AppDrawer({ currentAppId, onNavigate, onClose }: AppDrawerProps) {
  const handleAppClick = (app: ZeniteModule) => {
    const isCurrent = app.id === currentAppId;
    if (isCurrent || !app.route) return;

    const isExternal = app.route.startsWith("http");
    if (isExternal) {
      window.open(app.route, "_blank", "noopener,noreferrer");
    } else {
      onNavigate?.(app.route);
    }
    onClose?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.96 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className="absolute bottom-0 left-[calc(100%+12px)] w-[340px] bg-white rounded-[16px] p-4 z-50"
      style={{
        boxShadow: "0px 12px 32px rgba(18,34,50,0.12), 0px 2px 8px rgba(18,34,50,0.06)",
        border: "0.7px solid rgba(200,207,219,0.4)",
      }}
    >
      {/* Logo */}
      <div className="relative w-[98px] h-[15px] mb-3">
        <LogoZeniteCloud />
      </div>

      {/* Aplicativos */}
      <p
        className="text-[#98989d] px-1 mb-3"
        style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", lineHeight: "20px" }}
      >
        Aplicativos
      </p>

      <div className="grid grid-cols-4 gap-1">
        {zeniteModules.map((app, index) => {
          const Icon = app.icon;
          const isCurrent = app.id === currentAppId;
          const isDisabled = !app.route && !isCurrent;

          return (
            <motion.button
              key={app.id}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: isDisabled ? 0.5 : 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 25, delay: index * 0.04 }}
              whileHover={{ scale: isCurrent ? 1 : 1.06 }}
              whileTap={{ scale: isCurrent ? 1 : 0.94 }}
              className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-[12px] transition-colors ${
                isCurrent ? "bg-[#F6F7F9] cursor-default" : "cursor-pointer hover:bg-[#F6F7F9]"
              }`}
              onClick={() => handleAppClick(app)}
              disabled={isDisabled}
              style={isDisabled ? { cursor: "default" } : undefined}
            >
              <div
                className="flex items-center justify-center w-[40px] h-[40px] rounded-[10px]"
                style={{ backgroundColor: app.bg }}
              >
                <Icon size={22} weight="duotone" style={{ color: app.color }} />
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: -0.3, lineHeight: "14px", color: "#122232" }}>
                {app.abbr}
              </span>
              <span style={{ fontSize: 9, fontWeight: 500, letterSpacing: -0.2, lineHeight: "13px", color: "#98989d" }}>
                {app.name}
              </span>
              {isCurrent && (
                <div className="w-[4px] h-[4px] rounded-full -mt-0.5" style={{ backgroundColor: app.color }} />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Ads-on */}
      <p
        className="text-[#98989d] px-1 mt-4 mb-3"
        style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", lineHeight: "20px" }}
      >
        Ads-on
      </p>

      <div className="grid grid-cols-4 gap-1">
        {zeniteAddons.map((addon, index) => {
          const Icon = addon.icon;
          const isDisabled = !addon.route;

          return (
            <motion.button
              key={addon.id}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: isDisabled ? 0.5 : 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.32 + index * 0.04 }}
              whileHover={{ scale: isDisabled ? 1 : 1.06 }}
              whileTap={{ scale: isDisabled ? 1 : 0.94 }}
              className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-[12px] cursor-pointer transition-colors hover:bg-[#F6F7F9]"
              disabled={isDisabled}
              style={isDisabled ? { cursor: "default" } : undefined}
            >
              <div
                className="flex items-center justify-center w-[40px] h-[40px] rounded-[10px]"
                style={{ backgroundColor: addon.bg }}
              >
                <Icon size={22} weight="duotone" style={{ color: addon.color }} />
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: -0.3, lineHeight: "14px", color: "#122232" }}>
                {addon.name}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
