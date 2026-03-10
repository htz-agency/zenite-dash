/**
 * Design System — Zenite Dash (HTZ Agency)
 *
 * Referência visual canônica de todos os padrões de UI do sistema.
 * Qualquer componente novo DEVE seguir estes padrões exatamente.
 */

import { useState } from "react";
import {
  Plus,
  Check,
  X,
  Trash,
  FunnelSimple,
  NotePencil,
  LinkSimpleHorizontal,
  ArrowsOutSimple,
  Columns,
  Copy,
  DotsThree,
  Kanban,
  Table,
  CalendarBlank,
  Clock,
  ChatCircle,
  Trophy,
  CheckCircle,
  XCircle,
  Sparkle,
  Swatches,
  Heart,
  Building,
  IdentificationCard,
  SketchLogo,
  Lightning,
  Phone,
  NoteBlank,
  Envelope,
  TextT,
  TextAlignLeft,
  EnvelopeSimple,
  Calendar,
  Timer,
  Hash,
  Percent,
  CurrencyDollar,
  ListBullets,
  Tag,
  CaretCircleUpDown,
  UserCircle,
  ToggleLeft,
  MapPin,
  Shapes,
  Function as FunctionIcon,
  Fingerprint,
  PencilSimple,
  MagnifyingGlass,
  ArrowSquareOut,
  LinkBreak,
  CaretDown,
  CaretUp,
  House,
  ChartBar,
  Database,
  PencilRuler,
  Presentation,
  Gauge,
  ChartLineUp,
  SelectionPlus,
  DotsNine,
  ArrowsClockwise,
  Sidebar as SidebarIcon,
  LockKey,
  Globe,
  User,
  Cube,
  Target,
  ChartDonut,
  Briefcase,
  UsersThree,
  Megaphone,
  TreeStructure,
  Invoice,
  Atom,
} from "@phosphor-icons/react";
import { TuringMascot } from "./TuringMascot";

const fontFeature = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

/* ── Turing gradient (Zenite palette: Purple → Cyan → Green) ── */
const TURING_GRADIENT = "linear-gradient(135deg, #8C8CD4 0%, #8C8CD4 35%, #07ABDE 65%, #3CCEA7 100%)";

/* Seamless looping gradient for hover animations (palindrome: ends = starts) */
const TURING_GRADIENT_LOOP = "linear-gradient(90deg, #8C8CD4, #8C8CD4, #07ABDE, #3CCEA7, #07ABDE, #8C8CD4, #8C8CD4)";

/* ================================================================== */
/*  Section title helpers                                              */
/* ================================================================== */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-[#122232] mb-[4px]"
      style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5, lineHeight: "28px", ...fontFeature }}
    >
      {children}
    </h2>
  );
}

function SectionSubtitle({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[#4E6987] mb-[20px]"
      style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3, lineHeight: "18px", ...fontFeature }}
    >
      {children}
    </p>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-[15px] p-[24px] ${className}`}>
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="text-[#98989d] uppercase block mb-[8px]"
      style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.5, ...fontFeature }}
    >
      {children}
    </span>
  );
}

function Divider() {
  return <div className="h-[1px] bg-[#DDE3EC] my-[16px]" />;
}

/* ================================================================== */
/*  Main export                                                        */
/* ================================================================== */

export function DashDesignSystem() {
  const [segmentedActive, setSegmentedActive] = useState<"cards" | "tabela">("cards");
  const [filterActive, setFilterActive] = useState(false);
  const [toggleOn, setToggleOn] = useState(true);

  return (
    <div className="flex-1 overflow-y-auto bg-[#F6F7F9]">
      {/* ─── Header ─── */}
      <div className="px-[32px] pt-[28px] pb-[16px]">
        <p
          className="text-[#98989d] uppercase"
          style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, ...fontFeature }}
        >
          Referência Interna
        </p>
        <h1
          className="text-[#122232]"
          style={{ fontSize: 29, fontWeight: 700, letterSpacing: -0.5, lineHeight: "38px", ...fontFeature }}
        >
          Design System
        </h1>
        <p
          className="text-[#4E6987] mt-[4px]"
          style={{ fontSize: 14, fontWeight: 500, letterSpacing: -0.3, ...fontFeature }}
        >
          Padrões canônicos do Zenite Dash — todos os componentes devem seguir esta referência.
        </p>
      </div>

      <div className="px-[32px] pb-[40px] flex flex-col gap-[24px]">
        {/* ═══════════════════════════════════════════════════════════════ */}
        {/*  1. PALETA DE CORES                                            */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <Card>
          <SectionTitle>Paleta de Cores</SectionTitle>
          <SectionSubtitle>Seis famílias cromáticas com background, 6 tonalidades cada, e neutrals.</SectionSubtitle>

          {/* Blue Berry */}
          <Label>Blue Berry — Brand / Info / Utilitário</Label>
          <div className="flex gap-[6px] mb-[16px]">
            {[
              { hex: "#DCF0FF", label: "bg", dark: false },
              { hex: "#73D0FF", label: "100", dark: false },
              { hex: "#07ABDE", label: "200", dark: false },
              { hex: "#0483AB", label: "300", dark: true },
              { hex: "#025E7B", label: "400", dark: true },
              { hex: "#013B4F", label: "500", dark: true },
              { hex: "#001B26", label: "600", dark: true },
            ].map((c) => (
              <div key={c.hex} className="flex flex-col items-center gap-[4px]">
                <div
                  className="w-[48px] h-[48px] rounded-[10px] flex items-center justify-center"
                  style={{ backgroundColor: c.hex }}
                >
                  <span style={{ fontSize: 8, fontWeight: 700, color: c.dark ? "#fff" : "#0483AB", ...fontFeature }}>
                    {c.label}
                  </span>
                </div>
                <span className="text-[#98989d] font-mono" style={{ fontSize: 9 }}>{c.hex}</span>
              </div>
            ))}
          </div>

          {/* Green Mint */}
          <Label>Green Mint — Success / Primário de Confirmação</Label>
          <div className="flex gap-[6px] mb-[16px]">
            {[
              { hex: "#D9F8EF", label: "bg", dark: false },
              { hex: "#4BFACB", label: "100", dark: false },
              { hex: "#23E6B2", label: "200", dark: false },
              { hex: "#3CCEA7", label: "300", dark: false },
              { hex: "#135543", label: "400", dark: true },
              { hex: "#083226", label: "500", dark: true },
              { hex: "#02140E", label: "600", dark: true },
            ].map((c) => (
              <div key={c.hex} className="flex flex-col items-center gap-[4px]">
                <div
                  className="w-[48px] h-[48px] rounded-[10px] flex items-center justify-center"
                  style={{ backgroundColor: c.hex }}
                >
                  <span style={{ fontSize: 8, fontWeight: 700, color: c.dark ? "#fff" : "#135543", ...fontFeature }}>
                    {c.label}
                  </span>
                </div>
                <span className="text-[#98989d] font-mono" style={{ fontSize: 9 }}>{c.hex}</span>
              </div>
            ))}
          </div>

          {/* Red Cherry */}
          <Label>Red Cherry — Danger / Destrutivo / Compromisso</Label>
          <div className="flex gap-[6px] mb-[16px]">
            {[
              { hex: "#FFEDEB", label: "bg", dark: false },
              { hex: "#FFC6BE", label: "100", dark: false },
              { hex: "#FF8C76", label: "200", dark: false },
              { hex: "#ED5200", label: "300", dark: true },
              { hex: "#B13B00", label: "400", dark: true },
              { hex: "#782500", label: "500", dark: true },
              { hex: "#431100", label: "600", dark: true },
            ].map((c) => (
              <div key={c.hex} className="flex flex-col items-center gap-[4px]">
                <div
                  className="w-[48px] h-[48px] rounded-[10px] flex items-center justify-center"
                  style={{ backgroundColor: c.hex }}
                >
                  <span style={{ fontSize: 8, fontWeight: 700, color: c.dark ? "#fff" : "#B13B00", ...fontFeature }}>
                    {c.label}
                  </span>
                </div>
                <span className="text-[#98989d] font-mono" style={{ fontSize: 9 }}>{c.hex}</span>
              </div>
            ))}
          </div>

          {/* Yellow Mustard */}
          <Label>Yellow Mustard — Warning / Nota</Label>
          <div className="flex gap-[6px] mb-[16px]">
            {[
              { hex: "#FEEDCA", label: "bg", dark: false },
              { hex: "#F5DA82", label: "100", dark: false },
              { hex: "#EAC23D", label: "200", dark: false },
              { hex: "#C4990D", label: "300", dark: true },
              { hex: "#685516", label: "400", dark: true },
              { hex: "#42350A", label: "500", dark: true },
              { hex: "#1F1803", label: "600", dark: true },
            ].map((c) => (
              <div key={c.hex} className="flex flex-col items-center gap-[4px]">
                <div
                  className="w-[48px] h-[48px] rounded-[10px] flex items-center justify-center"
                  style={{ backgroundColor: c.hex }}
                >
                  <span style={{ fontSize: 8, fontWeight: 700, color: c.dark ? "#fff" : "#685516", ...fontFeature }}>
                    {c.label}
                  </span>
                </div>
                <span className="text-[#98989d] font-mono" style={{ fontSize: 9 }}>{c.hex}</span>
              </div>
            ))}
          </div>

          {/* Purple Pie */}
          <Label>Purple Pie — Accent / Tarefa</Label>
          <div className="flex gap-[6px] mb-[16px]">
            {[
              { hex: "#E8E8FD", label: "bg", dark: false },
              { hex: "#B0B0D6", label: "100", dark: false },
              { hex: "#8C8CD4", label: "200", dark: false },
              { hex: "#6868B1", label: "300", dark: true },
              { hex: "#4E4E91", label: "400", dark: true },
              { hex: "#31315C", label: "500", dark: true },
              { hex: "#14142C", label: "600", dark: true },
            ].map((c) => (
              <div key={c.hex} className="flex flex-col items-center gap-[4px]">
                <div
                  className="w-[48px] h-[48px] rounded-[10px] flex items-center justify-center"
                  style={{ backgroundColor: c.hex }}
                >
                  <span style={{ fontSize: 8, fontWeight: 700, color: c.dark ? "#fff" : "#4E4E91", ...fontFeature }}>
                    {c.label}
                  </span>
                </div>
                <span className="text-[#98989d] font-mono" style={{ fontSize: 9 }}>{c.hex}</span>
              </div>
            ))}
          </div>

          {/* Neutrals */}
          <Label>Cloud & Navy — Neutrals</Label>
          <div className="flex gap-[6px]">
            {[
              { hex: "#FFFFFF", label: "white", dark: false, border: true },
              { hex: "#F6F7F9", label: "bg", dark: false },
              { hex: "#DDE3EC", label: "border", dark: false },
              { hex: "#C8CFDB", label: "100", dark: false },
              { hex: "#D9D9D9", label: "200", dark: false },
              { hex: "#98989d", label: "muted", dark: true },
              { hex: "#4E6987", label: "300", dark: true },
              { hex: "#28415C", label: "400", dark: true },
              { hex: "#122232", label: "500", dark: true },
            ].map((c) => (
              <div key={c.hex} className="flex flex-col items-center gap-[4px]">
                <div
                  className={`w-[48px] h-[48px] rounded-[10px] flex items-center justify-center ${"border" in c && c.border ? "border border-[#DDE3EC]" : ""}`}
                  style={{ backgroundColor: c.hex }}
                >
                  <span style={{ fontSize: 8, fontWeight: 700, color: c.dark ? "#fff" : "#4E6987", ...fontFeature }}>
                    {c.label}
                  </span>
                </div>
                <span className="text-[#98989d] font-mono" style={{ fontSize: 9 }}>{c.hex}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/*  2. TIPOGRAFIA                                                 */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <Card>
          <SectionTitle>Tipografia</SectionTitle>
          <SectionSubtitle>Font: DM Sans · Feature settings: ss01, ss04, ss05, ss07 · Mono: DM Mono</SectionSubtitle>

          <div className="flex flex-col gap-[12px]">
            {[
              { cls: "text-xltitle1", label: "XL Title 1", spec: "48px / 700 / -0.5" },
              { cls: "text-xltitle2", label: "XL Title 2", spec: "38px / 700 / -0.5" },
              { cls: "text-largetitle", label: "Large Title", spec: "29px / 700 / -0.5" },
              { cls: "text-title1", label: "Title 1", spec: "24px / 700 / -0.5" },
              { cls: "text-title2", label: "Title 2", spec: "22px / 700 / -0.5" },
              { cls: "text-title3", label: "Title 3", spec: "19px / 700 / -0.5" },
              { cls: "text-headline", label: "Headline", spec: "18px / 500 / -0.5" },
              { cls: "text-body", label: "Body", spec: "15px / 500 / -0.5" },
              { cls: "text-callout", label: "Callout", spec: "12px / 500 / -0.5" },
              { cls: "text-callout-bold", label: "Callout Bold", spec: "12px / 700 / -0.5" },
              { cls: "text-subheadline", label: "Subheadline", spec: "15px / 400 / -0.5" },
              { cls: "text-label-lg", label: "LABEL LG", spec: "13px / 700 / 1px uppercase" },
              { cls: "text-label-sm", label: "LABEL SM", spec: "10px / 700 / 0.5px uppercase" },
            ].map((t) => (
              <div key={t.cls} className="flex items-baseline gap-[16px]">
                <span className={`${t.cls} text-[#122232] min-w-[200px]`}>{t.label}</span>
                <span className="text-[#98989d] font-mono" style={{ fontSize: 10 }}>
                  .{t.cls} — {t.spec}
                </span>
              </div>
            ))}
          </div>

          <Divider />

          <Label>Labels de Componentes (inline style)</Label>
          <div className="flex flex-col gap-[8px]">
            <div className="flex flex-col gap-[4px]">
              <span
                className="text-[#98989d] uppercase"
                style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.5, ...fontFeature }}
              >
                Micro Label 9px
              </span>
              <span className="text-[#98989d] font-mono" style={{ fontSize: 10 }}>
                9px / 700 / 0.5px uppercase — usado em badges, status pills
              </span>
            </div>
            <div className="flex flex-col gap-[4px]">
              <span
                className="text-[#4E6987] uppercase"
                style={{ fontSize: 8, fontWeight: 700, letterSpacing: 0.5, ...fontFeature }}
              >
                Micro Label 8px
              </span>
              <span className="text-[#98989d] font-mono" style={{ fontSize: 10 }}>
                8px / 700 / 0.5px uppercase — usado em status pills pequenos
              </span>
            </div>
          </div>
        </Card>

        {/* ════════════════════════════════════════════════���══════════════ */}
        {/*  3. BOTÕES                                                     */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <Card>
          <SectionTitle>Botões</SectionTitle>
          <SectionSubtitle>
            Todos os botões usam rounded-[500px] (full pill), uppercase, font-bold, tracking-[0.5px], fontSize 10.
          </SectionSubtitle>

          {/* Primário Criação de Registro */}
          <Label>Primário Criação de Registro — PillButton (Novo Lead, Nova Conta, Novo Contato…)</Label>
          <div className="flex items-center gap-[10px] mb-[12px]">
            <button className="group/pill relative flex items-center gap-[3px] h-[40px] pl-[16px] pr-[20px] rounded-[100px] bg-[#dcf0ff] text-[#28415c] hover:bg-[#bcdaf1] hover:shadow-[0px_2px_4px_0px_rgba(18,34,50,0.3)] transition-all duration-150 cursor-pointer">
              <Plus size={16} weight="bold" />
              <span className="font-semibold" style={{ fontSize: 15, letterSpacing: -0.5, lineHeight: "22px" }}>
                Novo Dashboard
              </span>
            </button>
            <button className="group/pill relative flex items-center gap-[3px] h-[40px] pl-[16px] pr-[20px] rounded-[100px] bg-[#dcf0ff] text-[#28415c] hover:bg-[#bcdaf1] hover:shadow-[0px_2px_4px_0px_rgba(18,34,50,0.3)] transition-all duration-150 cursor-pointer">
              <Plus size={16} weight="bold" />
              <span className="font-semibold" style={{ fontSize: 15, letterSpacing: -0.5, lineHeight: "22px" }}>Adicionar Worksheet</span>
            </button>
          </div>
          <span className="text-[#98989d] font-mono block mb-[20px]" style={{ fontSize: 10 }}>
            bg-[#dcf0ff] text-[#28415c] · h-[40px] rounded-[100px] · font-semibold fontSize 15 · hover: bg-[#bcdaf1] + shadow · active: radial-gradient overlay
          </span>

          {/* Primário Ação */}
          <Label>Primário Ação — Aplicar, Salvar, Confirmar</Label>
          <div className="flex flex-col gap-[8px] mb-[20px]">
            <div className="flex items-center gap-[10px]">
              <button className="flex items-center gap-[6px] h-[34px] px-[16px] rounded-[500px] bg-[#3CCEA7] text-white hover:bg-[#30B893] transition-colors cursor-pointer">
                <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...fontFeature }}>
                  Aplicar
                </span>
              </button>
              <button className="flex items-center gap-[6px] h-[34px] px-[16px] rounded-[500px] bg-[#3CCEA7] text-white hover:bg-[#30B893] transition-colors cursor-pointer">
                <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...fontFeature }}>
                  Salvar
                </span>
              </button>
            </div>
            <span className="text-[#98989d] font-mono" style={{ fontSize: 10 }}>
              bg-[#3CCEA7] text-white — Salvar, Aplicar, Confirmar (sempre green)
            </span>
          </div>

          {/* Primário Ação — Check icon */}
          <Label>Primário Ação — Icon-only (Confirmar view)</Label>
          <div className="flex flex-col gap-[8px] mb-[20px]">
            <button className="flex items-center justify-center size-[34px] rounded-full bg-[#3CCEA7] text-white hover:bg-[#30B893] transition-colors cursor-pointer">
              <Check size={16} weight="bold" />
            </button>
            <span className="text-[#98989d] font-mono" style={{ fontSize: 10 }}>
              size-[34px] rounded-full bg-[#3CCEA7] — confirmar view/ação
            </span>
          </div>

          {/* Utilitário Azul */}
          <Label>Utilitário Azul — Ações secundárias (Salvar, Gerar link, Entrar)</Label>
          <div className="flex flex-col gap-[8px] mb-[20px]">
            <div className="flex items-center gap-[10px]">
              <button className="flex items-center gap-[6px] h-[34px] px-[16px] rounded-[500px] bg-[#F6F7F9] text-[#0483AB] hover:bg-[#DCF0FF] hover:text-[#0483AB] transition-colors cursor-pointer">
                <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...fontFeature }}>
                  Salvar
                </span>
              </button>
              <button className="flex items-center gap-[6px] h-[34px] px-[16px] rounded-[500px] bg-[#DCF0FF] text-[#0483AB] hover:bg-[#c5e5f7] transition-colors cursor-pointer">
                <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...fontFeature }}>
                  Exportar
                </span>
              </button>
            </div>
            <span className="text-[#98989d] font-mono" style={{ fontSize: 10 }}>
              bg-[#F6F7F9] / bg-[#DCF0FF] text-[#0483AB]
            </span>
          </div>

          {/* Neutro / Descartar */}
          <Label>Neutro — Cancelar, Descartar, Voltar</Label>
          <div className="flex flex-col gap-[8px] mb-[20px]">
            <div className="flex items-center gap-[10px]">
              <button className="flex items-center gap-[6px] h-[34px] px-[16px] rounded-[500px] bg-[#F6F7F9] text-[#4E6987] hover:bg-[#ebedf0] transition-colors cursor-pointer">
                <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...fontFeature }}>
                  Descartar
                </span>
              </button>
              <button className="flex items-center gap-[6px] h-[34px] px-[16px] rounded-[500px] bg-[#F6F7F9] text-[#4E6987] hover:bg-[#ebedf0] transition-colors cursor-pointer">
                <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...fontFeature }}>
                  Cancelar
                </span>
              </button>
            </div>
            <span className="text-[#98989d] font-mono" style={{ fontSize: 10 }}>
              bg-[#F6F7F9] text-[#4E6987] hover:bg-[#ebedf0]
            </span>
          </div>

          {/* Destrutivo */}
          <Label>Destrutivo — Cancelar view, Excluir, Remover</Label>
          <div className="flex flex-col gap-[8px] mb-[20px]">
            <div className="flex items-center gap-[10px]">
              <button className="flex items-center justify-center size-[34px] rounded-full bg-[#F6F7F9] text-[#F56233] hover:bg-[#FFEDEB] transition-colors cursor-pointer">
                <X size={16} weight="bold" />
              </button>
              <button className="flex items-center gap-[6px] h-[34px] px-[16px] rounded-[500px] bg-[#F6F7F9] text-[#F56233] hover:bg-[#FFEDEB] transition-colors cursor-pointer">
                <Trash size={14} weight="bold" />
                <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...fontFeature }}>
                  Excluir
                </span>
              </button>
            </div>
            <span className="text-[#98989d] font-mono" style={{ fontSize: 10 }}>
              bg-[#F6F7F9] text-[#F56233] · hover: bg-[#FFEDEB]
            </span>
          </div>

          {/* Filtro */}
          <Label>Botão Filtro — Toggle com estado ativo</Label>
          <div className="flex flex-col gap-[8px] mb-[20px]">
            <div className="flex items-center gap-[10px]">
            <button
              onClick={() => setFilterActive(!filterActive)}
              className={`relative flex items-center justify-center w-[34px] h-[34px] rounded-full transition-colors cursor-pointer ${
                filterActive
                  ? "bg-[#07ABDE] text-[#DCF0FF]"
                  : "bg-[#F6F7F9] text-[#0483AB] hover:bg-[#DCF0FF] hover:text-[#0483AB]"
              }`}
            >
              {filterActive ? <X size={14} weight="bold" /> : <FunnelSimple size={16} weight="bold" />}
            </button>
            {filterActive && (
              <div className="flex items-center gap-[4px] h-[28px] px-[10px] rounded-[500px] bg-[#DCF0FF] text-[#28415c]">
                <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 9, ...fontFeature }}>
                  2 filtros
                </span>
                <X size={10} weight="bold" />
              </div>
            )}
            </div>
            <span className="text-[#98989d] font-mono" style={{ fontSize: 10 }}>
              Inativo: bg-[#F6F7F9] text-[#0483AB] · Ativo: bg-[#07ABDE] text-[#DCF0FF]
            </span>
          </div>

          <Divider />

          {/* Footer pair pattern */}
          <Label>Par de Botões Footer — Painel lateral (Descartar + Salvar)</Label>
          <div className="flex items-center gap-[6px] max-w-[300px] mb-[12px]">
            <button className="flex items-center justify-center gap-[6px] h-[34px] px-[14px] rounded-[500px] bg-[#F6F7F9] text-[#4E6987] hover:bg-[#ebedf0] transition-colors cursor-pointer flex-1">
              <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...fontFeature }}>
                Descartar
              </span>
            </button>
            <button className="flex items-center justify-center gap-[6px] h-[34px] px-[14px] rounded-[500px] bg-[#3CCEA7] text-white hover:bg-[#30B893] transition-colors cursor-pointer flex-1">
              <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...fontFeature }}>
                Salvar
              </span>
            </button>
          </div>
          <span className="text-[#98989d] font-mono" style={{ fontSize: 10 }}>
            flex-1 cada · h-[34px] · Salvar sempre Primário Green · Sem ícone (exceto Spinner quando saving)
          </span>

          <Divider />

          {/* Disabled */}
          <Label>Desativado — Disabled state (cloud 200, cursor-not-allowed)</Label>
          <div className="flex flex-col gap-[8px] mb-[20px]">
            <div className="flex items-center gap-[10px]">
              <button disabled className="flex items-center gap-[6px] h-[34px] px-[16px] rounded-[500px] bg-[#D9D9D9] text-white cursor-not-allowed opacity-100">
                <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...fontFeature }}>
                  Salvar
                </span>
              </button>
              <button disabled className="flex items-center gap-[6px] h-[34px] px-[16px] rounded-[500px] bg-[#D9D9D9] text-white cursor-not-allowed opacity-100">
                <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...fontFeature }}>
                  Aplicar
                </span>
              </button>
              <button disabled className="flex items-center gap-[6px] h-[34px] px-[16px] rounded-[500px] bg-[#D9D9D9] text-white cursor-not-allowed opacity-100">
                <Trash size={14} weight="bold" />
                <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...fontFeature }}>
                  Excluir
                </span>
              </button>
            </div>
            <span className="text-[#98989d] font-mono" style={{ fontSize: 10 }}>
              bg-[#D9D9D9] text-white · cursor-not-allowed · sem hover · cloud 200
            </span>
          </div>

        </Card>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/*  IA & Agent Turing                                             */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <Card>
          <div className="flex items-center gap-[12px] mb-[4px]">
            <Atom size={22} weight="duotone" className="text-[#8C8CD4]" />
            <SectionTitle>IA & Agent Turing</SectionTitle>
          </div>
          <SectionSubtitle>
            Turing é a IA do Zenite Cloud Suite. Ícone oficial: Atom (Phosphor). Base neutra com efeito rainbow gradient no hover usando a paleta Zenite.
          </SectionSubtitle>

          {/* Mascote */}
          <Label>Mascote Oficial — Turing (Funko Pop)</Label>
          <div className="flex items-start gap-[24px] mb-[20px]">
            <TuringMascot size={120} showUpload className="shrink-0" />
            <div className="flex flex-col gap-[6px] pt-[4px]">
              <span className="text-[#122232]" style={{ fontSize: 14, fontWeight: 700, letterSpacing: -0.3, ...fontFeature }}>
                Agent Turing
              </span>
              <span className="text-[#4E6987]" style={{ fontSize: 12, fontWeight: 500, letterSpacing: -0.2, lineHeight: "17px", ...fontFeature }}>
                Assistente IA do Zenite Cloud. Usado em estados de onboarding,
                <br />empty states, dicas contextuais e ações de IA.
              </span>
              <div
                className="inline-flex items-center gap-[5px] px-[10px] py-[3px] rounded-full mt-[4px] w-fit"
                style={{ background: TURING_GRADIENT }}
              >
                <Atom size={12} weight="bold" className="text-white" />
                <span className="text-white" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", ...fontFeature }}>
                  Turing AI
                </span>
              </div>
            </div>
          </div>

          <Divider />

          {/* Botão Turing — Neutro com rainbow hover */}
          <Label>Botão Turing — Base neutra, hover rainbow gradient (texto + ícone)</Label>
          <div className="flex flex-col gap-[8px] mb-[20px]">
            <div className="flex items-center gap-[10px]">
              {/* Default state */}
              <button className="group/turing flex items-center gap-[6px] h-[34px] px-[16px] rounded-[500px] bg-[#F6F7F9] text-[#4E6987] hover:bg-white hover:shadow-[0_2px_12px_rgba(140,140,212,0.35),0_4px_16px_rgba(7,171,222,0.2),0_6px_20px_rgba(60,206,167,0.15)] transition-all duration-200 cursor-pointer border border-transparent">
                <Atom size={14} weight="bold" className="text-[#4E6987] group-hover/turing:animate-[turing-icon-hover_1.5s_linear_infinite]" />
                <span className="font-bold uppercase tracking-[0.5px] [-webkit-background-clip:text] [background-clip:text] [background-size:200%_100%] group-hover/turing:animate-[turing-text-hover_3s_linear_infinite] group-hover/turing:text-transparent transition-colors duration-300" style={{ fontSize: 10, backgroundImage: TURING_GRADIENT_LOOP, backgroundRepeat: "repeat", ...fontFeature }}>
                  Pergunte ao Turing
                </span>
              </button>

              {/* Hover preview (always showing animated gradient) */}
              <button className="flex items-center gap-[6px] h-[34px] px-[16px] rounded-[500px] bg-white shadow-[0_2px_12px_rgba(140,140,212,0.35),0_4px_16px_rgba(7,171,222,0.2),0_6px_20px_rgba(60,206,167,0.15)] cursor-pointer border border-transparent">
                <Atom size={14} weight="bold" className="animate-[turing-icon-hover_1.5s_linear_infinite]" />
                <span className="font-bold uppercase tracking-[0.5px] [-webkit-background-clip:text] [background-clip:text] [background-size:200%_100%] text-transparent animate-[turing-text-hover_3s_linear_infinite]" style={{ fontSize: 10, backgroundImage: TURING_GRADIENT_LOOP, backgroundRepeat: "repeat", ...fontFeature }}>
                  Pergunte ao Turing
                </span>
              </button>
            </div>
            <div className="flex items-center gap-[6px]">
              <span className="text-[#98989d] font-mono" style={{ fontSize: 10 }}>
                Normal: bg-[#F6F7F9] text-[#4E6987]
              </span>
              <span className="text-[#DDE3EC]">→</span>
              <span className="text-[#98989d] font-mono" style={{ fontSize: 10 }}>
                Hover: bg-white + border + shadow + rainbow walk text + icon spin+color
              </span>
            </div>
          </div>

          {/* Botão Turing com Sparkle */}
          <Label>Botão Turing — Variantes de tamanho</Label>
          <div className="flex flex-col gap-[8px] mb-[20px]">
            <div className="flex items-center gap-[10px]">
              {/* Large */}
              <button className="group/turing flex items-center gap-[6px] h-[40px] pl-[16px] pr-[20px] rounded-[100px] bg-[#F6F7F9] text-[#4E6987] hover:bg-white hover:shadow-[0_2px_12px_rgba(140,140,212,0.35),0_4px_16px_rgba(7,171,222,0.2),0_6px_20px_rgba(60,206,167,0.15)] transition-all duration-200 cursor-pointer border border-transparent">
                <Atom size={16} weight="bold" className="text-[#4E6987] group-hover/turing:animate-[turing-icon-hover_1.5s_linear_infinite]" />
                <span className="font-semibold [-webkit-background-clip:text] [background-clip:text] [background-size:200%_100%] group-hover/turing:animate-[turing-text-hover_3s_linear_infinite] group-hover/turing:text-transparent transition-colors duration-300" style={{ fontSize: 15, letterSpacing: -0.5, lineHeight: "22px", backgroundImage: TURING_GRADIENT_LOOP, backgroundRepeat: "repeat" }}>
                  Analisar com Turing
                </span>
              </button>

              {/* Small */}
              <button className="group/turing flex items-center gap-[5px] h-[28px] px-[12px] rounded-[500px] bg-[#F6F7F9] text-[#4E6987] hover:bg-white hover:shadow-[0_2px_12px_rgba(140,140,212,0.35),0_4px_16px_rgba(7,171,222,0.2),0_6px_20px_rgba(60,206,167,0.15)] transition-all duration-200 cursor-pointer border border-transparent">
                <Atom size={12} weight="bold" className="text-[#4E6987] group-hover/turing:animate-[turing-icon-hover_1.5s_linear_infinite]" />
                <span className="font-bold uppercase tracking-[0.5px] [-webkit-background-clip:text] [background-clip:text] [background-size:200%_100%] group-hover/turing:animate-[turing-text-hover_3s_linear_infinite] group-hover/turing:text-transparent transition-colors duration-300" style={{ fontSize: 9, backgroundImage: TURING_GRADIENT_LOOP, backgroundRepeat: "repeat", ...fontFeature }}>
                  Turing
                </span>
              </button>

              {/* Icon only */}
              <button className="group/turing flex items-center justify-center size-[34px] rounded-full bg-[#F6F7F9] text-[#4E6987] hover:bg-white hover:shadow-[0_2px_12px_rgba(140,140,212,0.35),0_4px_16px_rgba(7,171,222,0.2),0_6px_20px_rgba(60,206,167,0.15)] transition-all duration-200 cursor-pointer border border-transparent">
                <Atom size={16} weight="bold" className="text-[#4E6987] group-hover/turing:animate-[turing-icon-hover_1.5s_linear_infinite]" />
              </button>
            </div>
            <span className="text-[#98989d] font-mono" style={{ fontSize: 10 }}>
              Large h-[40px] · Default h-[34px] · Small h-[28px] · Icon-only size-[34px] rounded-full
            </span>
          </div>

          {/* Turing Rainbow Badge */}
          <Label>Turing Badge — Rainbow gradient pill (indicador de recurso IA)</Label>
          <div className="flex flex-col gap-[8px] mb-[20px]">
            <div className="flex items-center gap-[10px]">
              <span
                className="inline-flex items-center gap-[5px] px-[10px] h-[22px] rounded-full text-white"
                style={{ background: TURING_GRADIENT }}
              >
                <Atom size={11} weight="bold" />
                <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 8, ...fontFeature }}>
                  Turing AI
                </span>
              </span>
              <span
                className="inline-flex items-center gap-[4px] px-[8px] h-[18px] rounded-full text-white"
                style={{ background: TURING_GRADIENT }}
              >
                <Atom size={9} weight="fill" />
                <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 7, ...fontFeature }}>
                  IA
                </span>
              </span>
              <span
                className="inline-flex items-center gap-[5px] px-[10px] h-[22px] rounded-full"
                style={{ background: "rgba(140,140,212,0.10)" }}
              >
                <Atom size={11} weight="bold" style={{ color: "#8C8CD4" }} />
                <span className="font-bold uppercase tracking-[0.5px] [-webkit-background-clip:text] [background-clip:text] text-transparent" style={{ fontSize: 8, backgroundImage: TURING_GRADIENT, ...fontFeature }}>
                  Turing AI
                </span>
              </span>
            </div>
            <span className="text-[#98989d] font-mono" style={{ fontSize: 10 }}>
              Sólido: gradient bg + text-white · Sutil: gradient bg 12% opacity + gradient text
            </span>
          </div>

          {/* Turing Rainbow Palette */}
          <Label>Paleta Rainbow — Cores do gradiente Turing (paleta Zenite)</Label>
          <div className="flex flex-col gap-[8px] mb-[6px]">
            <div className="flex items-center gap-[4px]">
              {[
                { color: "#8C8CD4", label: "Purple" },
                { color: "#07ABDE", label: "Cyan" },
                { color: "#3CCEA7", label: "Green" },
              ].map((c) => (
                <div key={c.color} className="flex flex-col items-center gap-[4px]">
                  <div className="w-[40px] h-[28px] rounded-[8px]" style={{ backgroundColor: c.color }} />
                  <span className="text-[#98989d] font-mono" style={{ fontSize: 8 }}>{c.color}</span>
                  <span className="text-[#4E6987]" style={{ fontSize: 8, fontWeight: 600, ...fontFeature }}>{c.label}</span>
                </div>
              ))}
              <div className="flex flex-col items-center gap-[4px] ml-[8px]">
                <div className="w-[100px] h-[28px] rounded-[8px]" style={{ background: TURING_GRADIENT }} />
                <span className="text-[#98989d] font-mono" style={{ fontSize: 8 }}>135deg gradient</span>
                <span className="text-[#4E6987]" style={{ fontSize: 8, fontWeight: 600, ...fontFeature }}>Rainbow</span>
              </div>
            </div>
            <span className="text-[#98989d] font-mono" style={{ fontSize: 10 }}>
              linear-gradient(135deg, #8C8CD4 0%, #8C8CD4 35%, #07ABDE 65%, #3CCEA7 100%)
            </span>
          </div>
        </Card>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/*  4. ACTION PILL & ICON BUTTONS                                 */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <Card>
          <SectionTitle>Action Pill & Icon Buttons</SectionTitle>
          <SectionSubtitle>Agrupamento de ações em pill container arredondado. Ícones Phosphor, weight="bold" dentro da pill.</SectionSubtitle>

          <Label>Action Pill — Container</Label>
          <div className="flex flex-col gap-[8px] mb-[20px]">
            <div className="flex items-center gap-[10px] bg-[#F6F7F9] rounded-[100px] h-[44px] px-[5px] w-fit">
              <button className="flex items-center justify-center size-[32px] rounded-full bg-transparent text-[#0483AB] hover:bg-[#DCF0FF] transition-colors cursor-pointer">
                <LinkSimpleHorizontal size={18} weight="bold" />
              </button>
              <button className="flex items-center justify-center size-[32px] rounded-full bg-transparent text-[#0483AB] hover:bg-[#DCF0FF] transition-colors cursor-pointer">
                <ArrowsOutSimple size={18} weight="bold" />
              </button>
              <button className="flex items-center justify-center size-[32px] rounded-full bg-transparent text-[#0483AB] hover:bg-[#DCF0FF] transition-colors cursor-pointer">
                <Columns size={18} weight="bold" />
              </button>
              <button className="flex items-center justify-center size-[32px] rounded-full bg-transparent text-[#0483AB] hover:bg-[#DCF0FF] transition-colors cursor-pointer">
                <NotePencil size={18} weight="bold" />
              </button>
              <button className="flex items-center justify-center size-[32px] rounded-full bg-transparent text-[#0483AB] hover:bg-[#DCF0FF] transition-colors cursor-pointer">
                <X size={18} weight="bold" />
              </button>
            </div>
            <span className="text-[#98989d] font-mono" style={{ fontSize: 10 }}>
              bg-[#F6F7F9] h-[44px] px-[5px] rounded-[100px] · ActionButton: size-[32px] text-[#0483AB] hover:bg-[#DCF0FF]
            </span>
          </div>

          <Label>Action Pill — Painel de detalhe (Editar + Fechar)</Label>
          <div className="flex items-center gap-[16px] mb-[20px]">
            <div className="flex items-center gap-[10px] bg-[#F6F7F9] rounded-[100px] h-[44px] px-[5px]">
              <button className="flex items-center justify-center size-[32px] rounded-full bg-transparent text-[#0483AB] hover:bg-[#DCF0FF] transition-colors cursor-pointer">
                <NotePencil size={18} weight="bold" />
              </button>
              <button className="flex items-center justify-center size-[32px] rounded-full bg-transparent text-[#0483AB] hover:bg-[#DCF0FF] transition-colors cursor-pointer">
                <X size={18} weight="bold" />
              </button>
            </div>
          </div>

          <Label>Action Pill — Botão único</Label>
          <div className="flex items-center gap-[16px] mb-[20px]">
            <div className="flex items-center bg-[#F6F7F9] rounded-[100px] h-[44px] px-[5px]">
              <button className="flex items-center justify-center size-[32px] rounded-full bg-transparent text-[#0483AB] hover:bg-[#DCF0FF] transition-colors cursor-pointer">
                <X size={18} weight="bold" />
              </button>
            </div>
          </div>

          <Label>Double Action Pill — Duas pills separadas com divider entre elas</Label>
          <div className="flex flex-col gap-[8px] mb-[8px]">
            <div className="flex items-center gap-[16px]">
            {/* Pill esquerda — 3 botões */}
            <div className="flex items-center gap-[10px] bg-[#f6f7f9] rounded-[100px] h-[44px] px-[5px] py-[0px]">
              <button className="flex items-center justify-center size-[32px] rounded-full bg-transparent text-[#0483AB] hover:bg-[#DCF0FF] transition-colors cursor-pointer">
                <LinkSimpleHorizontal size={18} weight="bold" />
              </button>
              <button className="flex items-center justify-center size-[32px] rounded-full bg-transparent text-[#0483AB] hover:bg-[#DCF0FF] transition-colors cursor-pointer">
                <ArrowsOutSimple size={18} weight="bold" />
              </button>
              <button className="flex items-center justify-center size-[32px] rounded-full bg-transparent text-[#0483AB] hover:bg-[#DCF0FF] transition-colors cursor-pointer">
                <Columns size={18} weight="bold" />
              </button>
            </div>

            {/* Divider entre pills */}
            <div className="w-[1.5px] h-[20px] bg-[#DDE3EC] rounded-full" />

            {/* Pill direita — 5 botões */}
            <div className="flex items-center gap-[10px] bg-[#f6f7f9] rounded-[100px] h-[44px] px-[5px] py-[0px]">
              <button className="flex items-center justify-center size-[32px] rounded-full bg-transparent text-[#0483AB] hover:bg-[#DCF0FF] transition-colors cursor-pointer">
                <NotePencil size={18} weight="bold" />
              </button>
              <button className="flex items-center justify-center size-[32px] rounded-full bg-transparent text-[#0483AB] hover:bg-[#DCF0FF] transition-colors cursor-pointer">
                <Trash size={18} weight="bold" />
              </button>
              <button className="flex items-center justify-center size-[32px] rounded-full bg-transparent text-[#0483AB] hover:bg-[#DCF0FF] transition-colors cursor-pointer">
                <Copy size={18} weight="bold" />
              </button>
              <button className="flex items-center justify-center size-[32px] rounded-full bg-transparent text-[#0483AB] hover:bg-[#DCF0FF] transition-colors cursor-pointer">
                <DotsThree size={18} weight="bold" />
              </button>
              <button className="flex items-center justify-center size-[32px] rounded-full bg-transparent text-[#0483AB] hover:bg-[#DCF0FF] transition-colors cursor-pointer">
                <X size={18} weight="bold" />
              </button>
            </div>
            </div>

            <span className="text-[#98989d] font-mono" style={{ fontSize: 10 }}>
              gap-[16px] entre elementos · Divider: w-[1.5px] h-[20px] bg-[#DDE3EC] rounded-full
            </span>
          </div>
        </Card>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/*  5. SEGMENTED CONTROL                                          */}
        {/* ══════════════════════════════��════════════════════════════════ */}
        <Card>
          <SectionTitle>Segmented Control</SectionTitle>
          <SectionSubtitle>Toggle de view (Cards/Tabela, Mês/Semana/Dia, etc). Efeito dark glossy no item selecionado.</SectionSubtitle>

          <Label>Segmented Control — Dark Glossy</Label>
          <div className="flex flex-col gap-[8px] mb-[20px]">
            <div className="relative flex items-center gap-[4px] h-[44px] p-[4px] bg-[#F6F7F9] rounded-[100px] w-fit">
              <div 
                className="absolute inset-0 pointer-events-none rounded-[inherit]"
                style={{ 
                  boxShadow: "inset 0px -0.5px 1px 0px rgba(255,255,255,0.3), inset 0px -0.5px 1px 0px rgba(255,255,255,0.25), inset 1px 1.5px 4px 0px rgba(0,0,0,0.08), inset 1px 1.5px 4px 0px rgba(0,0,0,0.1)" 
                }} 
              />
              {(["cards", "tabela"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setSegmentedActive(mode)}
                  className={`relative flex items-center gap-[3px] h-[36px] px-[16px] rounded-[100px] transition-all cursor-pointer ${
                    segmentedActive === mode
                      ? "text-[#F6F7F9]"
                      : "text-[#98989d] hover:text-[#4E6987] hover:bg-[#e8eaee]"
                  }`}
                >
                  {segmentedActive === mode && (
                    <>
                      <div className="absolute inset-0 bg-[#28415c] rounded-[20px] backdrop-blur-[50px]" />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 pointer-events-none rounded-[20px] border-[0.5px] border-solid border-[rgba(200,207,219,0.6)]"
                        style={{ boxShadow: "0px 2px 4px 0px rgba(18,34,50,0.3)" }}
                      />
                    </>
                  )}
                  {mode === "cards" ? (
                    <Kanban size={14} weight={segmentedActive === mode ? "fill" : "regular"} className="relative z-[1]" />
                  ) : (
                    <Table size={14} weight={segmentedActive === mode ? "fill" : "regular"} className="relative z-[1]" />
                  )}
                  <span className="relative z-[1] font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...fontFeature }}>
                    {mode === "cards" ? "Cards" : "Tabela"}
                  </span>
                </button>
              ))}
            </div>
            <span className="text-[#98989d] font-mono" style={{ fontSize: 10 }}>
              Ativo: bg-[#28415c] text-[#F6F7F9] + shadow glossy · Inativo: text-[#98989d] · Ícone ativo: weight="fill" · Ícone inativo: weight="regular"
            </span>
          </div>

          <Label>Segmented Control — Exemplo Métricas/Análises</Label>
          <div className="relative flex items-center gap-[4px] h-[44px] p-[4px] bg-[#F6F7F9] rounded-[100px] overflow-clip w-fit">
            <button className="relative flex items-center gap-[3px] h-[36px] px-[16px] rounded-[100px] text-[#F6F7F9] cursor-pointer">
              <div className="absolute inset-0 bg-[#28415c] rounded-[20px] backdrop-blur-[50px]" />
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none rounded-[20px] border-[0.5px] border-solid border-[rgba(200,207,219,0.6)]"
                style={{ boxShadow: "0px 2px 4px 0px rgba(18,34,50,0.3)" }}
              />
              <span className="relative z-[1] font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...fontFeature }}>
                Métricas
              </span>
            </button>
            <button className="relative flex items-center gap-[3px] h-[36px] px-[16px] rounded-[100px] text-[#98989d] hover:text-[#4E6987] hover:bg-[#e8eaee] cursor-pointer">
              <span className="font-bold uppercase tracking-[0.5px]" style={{ fontSize: 10, ...fontFeature }}>
                Análises
              </span>
            </button>
          </div>
        </Card>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/*  6. STATUS PILLS & BADGES                                      */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <Card>
          <SectionTitle>Status Pills & Badges</SectionTitle>
          <SectionSubtitle>Indicadores de estado com ícone + label uppercase. h-[24px], rounded-[500px], fontSize 8.</SectionSubtitle>

          <Label>Status — Worksheets</Label>
          <div className="flex items-center gap-[8px] flex-wrap mb-[16px]">
            {[
              { label: "Rascunho", color: "#4E6987", bg: "#DDE3EC" },
              { label: "Publicado", color: "#135543", bg: "#D9F8EF", icon: Check },
              { label: "Arquivado", color: "#98989d", bg: "#F6F7F9" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-[4px] h-[24px] px-[10px] rounded-[500px]" style={{ backgroundColor: s.bg }}>
                {s.icon && <s.icon size={10} weight="fill" style={{ color: s.color }} />}
                <span className="uppercase whitespace-nowrap" style={{ fontSize: 8, fontWeight: 700, letterSpacing: 0.5, color: s.color, ...fontFeature }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          <Label>Status — Dashboards</Label>
          <div className="flex items-center gap-[8px] flex-wrap mb-[16px]">
            {[
              { label: "Ativo", color: "#135543", bg: "#D9F8EF", icon: CheckCircle },
              { label: "Desativado", color: "#B13B00", bg: "#FFEDEB", icon: XCircle },
              { label: "Agendado", color: "#07ABDE", bg: "#DCF0FF", icon: CalendarBlank },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-[4px] h-[24px] px-[10px] rounded-[500px]" style={{ backgroundColor: s.bg }}>
                <s.icon size={10} weight="fill" style={{ color: s.color }} />
                <span className="uppercase whitespace-nowrap" style={{ fontSize: 8, fontWeight: 700, letterSpacing: 0.5, color: s.color, ...fontFeature }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          <Label>Status — Data Sources</Label>
          <div className="flex items-center gap-[8px] flex-wrap mb-[16px]">
            {[
              { label: "Conectado", color: "#135543", bg: "#D9F8EF", icon: Check },
              { label: "Erro", color: "#B13B00", bg: "#FFEDEB", icon: X },
              { label: "Sincronizando", color: "#07ABDE", bg: "#DCF0FF", icon: Clock },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-[4px] h-[24px] px-[10px] rounded-[500px]" style={{ backgroundColor: s.bg }}>
                <s.icon size={10} weight="fill" style={{ color: s.color }} />
                <span className="uppercase whitespace-nowrap" style={{ fontSize: 8, fontWeight: 700, letterSpacing: 0.5, color: s.color, ...fontFeature }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/*  7. ÍCONES DE ENTIDADES & ATIVIDADES                           */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <Card>
          <SectionTitle>Ícones de Entidades & Atividades</SectionTitle>
          <SectionSubtitle>Phosphor Icons, weight="duotone" para padrão, "fill" para ativo/selecionado, "bold" dentro de ActionButtons.</SectionSubtitle>

          <Label>Entidades do CRM</Label>
          <div className="flex items-center gap-[20px] mb-[20px]">
            {[
              { icon: Heart, label: "Lead", color: "#EAC23D", bg: "#FEEDCA" },
              { icon: Building, label: "Conta", color: "#3CCEA7", bg: "#D9F8EF" },
              { icon: IdentificationCard, label: "Contato", color: "#FF8C76", bg: "#FFEDEB" },
              { icon: SketchLogo, label: "Oportunidade", color: "#07ABDE", bg: "#DCF0FF" },
              { icon: Lightning, label: "Atividade", color: "#4E6987", bg: "#DDE3EC" },
            ].map((e) => (
              <div key={e.label} className="flex flex-col items-center gap-[6px]">
                <div
                  className="flex items-center justify-center size-[40px] rounded-[10px]"
                  style={{ backgroundColor: e.bg }}
                >
                  <e.icon size={20} weight="duotone" style={{ color: e.color }} />
                </div>
                <span className="text-[#4E6987]" style={{ fontSize: 10, fontWeight: 600, ...fontFeature }}>
                  {e.label}
                </span>
              </div>
            ))}
          </div>

          <Label>Tipos de Atividade (6 cores canônicas)</Label>
          <div className="flex items-center gap-[20px] mb-[8px]">
            {[
              { icon: CalendarBlank, label: "Compromisso", color: "#FF8C76", bg: "#FFEDEB" },
              { icon: CheckCircle, label: "Tarefa", color: "#8C8CD4", bg: "#E8E8FD" },
              { icon: Phone, label: "Ligação", color: "#3CCEA7", bg: "#D9F8EF" },
              { icon: NoteBlank, label: "Nota", color: "#EAC23D", bg: "#FEEDCA" },
              { icon: ChatCircle, label: "Mensagem", color: "#07ABDE", bg: "#DCF0FF" },
              { icon: Envelope, label: "Email", color: "#4E6987", bg: "#DDE3EC" },
            ].map((a) => (
              <div key={a.label} className="flex flex-col items-center gap-[6px]">
                <div
                  className="flex items-center justify-center size-[40px] rounded-[10px]"
                  style={{ backgroundColor: a.bg }}
                >
                  <a.icon size={20} weight="duotone" style={{ color: a.color }} />
                </div>
                <span className="text-[#4E6987]" style={{ fontSize: 10, fontWeight: 600, ...fontFeature }}>
                  {a.label}
                </span>
                <span className="text-[#98989d] font-mono" style={{ fontSize: 8 }}>{a.color}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/*  8. TIPOS DE CAMPOS                                            */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <Card>
          <SectionTitle>Tipos de Campos</SectionTitle>
          <SectionSubtitle>Catálogo completo dos tipos de campo disponíveis no editor de campos do CRM. Cada tipo possui ícone, cor e fundo próprios — agrupados por categoria funcional.</SectionSubtitle>

          {/* Texto & Comunicação */}
          <span className="text-[#98989d] uppercase block mb-[8px]" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.8, ...fontFeature }}>
            Texto & Comunicação
          </span>
          <div className="flex flex-wrap gap-[8px] mb-[16px]">
            {([
              { icon: TextT, label: "Texto", color: "#4e6987", bg: "#f0f2f5", desc: "Campo de texto simples" },
              { icon: TextAlignLeft, label: "Texto Longo", color: "#4e6987", bg: "#f0f2f5", desc: "Múltiplas linhas / rich text" },
              { icon: Phone, label: "Telefone", color: "#3ccea7", bg: "#d9f8ef", desc: "Formatação automática BR" },
              { icon: EnvelopeSimple, label: "Email", color: "#07abde", bg: "#dcf0ff", desc: "Validação de e-mail" },
              { icon: LinkSimpleHorizontal, label: "Link", color: "#07abde", bg: "#dcf0ff", desc: "URL com validação" },
            ] as const).map((f) => (
              <div key={f.label} className="flex items-center gap-[8px] p-[6px] pr-[10px] rounded-[10px] border border-[#eceef1] min-w-[160px]">
                <div className="flex items-center justify-center size-[26px] rounded-[7px] shrink-0" style={{ backgroundColor: f.bg }}>
                  <f.icon size={14} weight="duotone" style={{ color: f.color }} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#28415c]" style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.2, lineHeight: "15px", ...fontFeature }}>{f.label}</span>
                  <span className="text-[#98989d]" style={{ fontSize: 9, fontWeight: 500, lineHeight: "12px", ...fontFeature }}>{f.desc}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Data & Tempo */}
          <span className="text-[#98989d] uppercase block mb-[8px]" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.8, ...fontFeature }}>
            Data & Tempo
          </span>
          <div className="flex flex-wrap gap-[8px] mb-[16px]">
            {([
              { icon: Calendar, label: "Data", color: "#eac23d", bg: "#feedca", desc: "Seletor de data" },
              { icon: Timer, label: "Hora", color: "#eac23d", bg: "#feedca", desc: "Campo de hora (12h/24h)" },
              { icon: Calendar, label: "Data e Hora", color: "#eac23d", bg: "#feedca", desc: "Data e hora combinados" },
              { icon: Timer, label: "Duração", color: "#eac23d", bg: "#feedca", desc: "Tempo em min/h/dias" },
            ] as const).map((f, idx) => (
              <div key={f.label + idx} className="flex items-center gap-[8px] p-[6px] pr-[10px] rounded-[10px] border border-[#eceef1] min-w-[160px]">
                <div className="flex items-center justify-center size-[26px] rounded-[7px] shrink-0" style={{ backgroundColor: f.bg }}>
                  <f.icon size={14} weight="duotone" style={{ color: f.color }} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#28415c]" style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.2, lineHeight: "15px", ...fontFeature }}>{f.label}</span>
                  <span className="text-[#98989d]" style={{ fontSize: 9, fontWeight: 500, lineHeight: "12px", ...fontFeature }}>{f.desc}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Numérico & Monetário */}
          <span className="text-[#98989d] uppercase block mb-[8px]" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.8, ...fontFeature }}>
            Numérico & Monetário
          </span>
          <div className="flex flex-wrap gap-[8px] mb-[16px]">
            {([
              { icon: Hash, label: "Número", color: "#8c8cd4", bg: "#e8e8fd", desc: "Casas decimais, mín/máx" },
              { icon: Percent, label: "Porcentagem", color: "#8c8cd4", bg: "#e8e8fd", desc: "Precisão configurável" },
              { icon: CurrencyDollar, label: "Moeda", color: "#3ccea7", bg: "#d9f8ef", desc: "Valor monetário com símbolo" },
            ] as const).map((f) => (
              <div key={f.label} className="flex items-center gap-[8px] p-[6px] pr-[10px] rounded-[10px] border border-[#eceef1] min-w-[160px]">
                <div className="flex items-center justify-center size-[26px] rounded-[7px] shrink-0" style={{ backgroundColor: f.bg }}>
                  <f.icon size={14} weight="duotone" style={{ color: f.color }} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#28415c]" style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.2, lineHeight: "15px", ...fontFeature }}>{f.label}</span>
                  <span className="text-[#98989d]" style={{ fontSize: 9, fontWeight: 500, lineHeight: "12px", ...fontFeature }}>{f.desc}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Seleção & Listas */}
          <span className="text-[#98989d] uppercase block mb-[8px]" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.8, ...fontFeature }}>
            Seleção & Listas
          </span>
          <div className="flex flex-wrap gap-[8px] mb-[16px]">
            {([
              { icon: ListBullets, label: "Lista", color: "#ff8c76", bg: "#ffedeb", desc: "Seleção única (picklist)" },
              { icon: Tag, label: "Multi-seleção", color: "#ff8c76", bg: "#ffedeb", desc: "Seleção múltipla" },
              { icon: CaretCircleUpDown, label: "Combobox", color: "#ff8c76", bg: "#ffedeb", desc: "Dropdown com busca" },
            ] as const).map((f) => (
              <div key={f.label} className="flex items-center gap-[8px] p-[6px] pr-[10px] rounded-[10px] border border-[#eceef1] min-w-[160px]">
                <div className="flex items-center justify-center size-[26px] rounded-[7px] shrink-0" style={{ backgroundColor: f.bg }}>
                  <f.icon size={14} weight="duotone" style={{ color: f.color }} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#28415c]" style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.2, lineHeight: "15px", ...fontFeature }}>{f.label}</span>
                  <span className="text-[#98989d]" style={{ fontSize: 9, fontWeight: 500, lineHeight: "12px", ...fontFeature }}>{f.desc}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Referência & Estrutura */}
          <span className="text-[#98989d] uppercase block mb-[8px]" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.8, ...fontFeature }}>
            Referência & Estrutura
          </span>
          <div className="flex flex-wrap gap-[8px] mb-[16px]">
            {([
              { icon: UserCircle, label: "Usuário", color: "#07abde", bg: "#dcf0ff", desc: "Referência a usuário do sistema" },
              { icon: ToggleLeft, label: "Booleano", color: "#3ccea7", bg: "#d9f8ef", desc: "Toggle sim/não" },
              { icon: MapPin, label: "Endereço", color: "#4e6987", bg: "#f0f2f5", desc: "Endereço completo com sub-campos" },
              { icon: LinkSimpleHorizontal, label: "Associação", color: "#07abde", bg: "#dcf0ff", desc: "Referência a outro objeto CRM" },
            ] as const).map((f) => (
              <div key={f.label + f.desc} className="flex items-center gap-[8px] p-[6px] pr-[10px] rounded-[10px] border border-[#eceef1] min-w-[160px]">
                <div className="flex items-center justify-center size-[26px] rounded-[7px] shrink-0" style={{ backgroundColor: f.bg }}>
                  <f.icon size={14} weight="duotone" style={{ color: f.color }} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#28415c]" style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.2, lineHeight: "15px", ...fontFeature }}>{f.label}</span>
                  <span className="text-[#98989d]" style={{ fontSize: 9, fontWeight: 500, lineHeight: "12px", ...fontFeature }}>{f.desc}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Sistema & Automação */}
          <span className="text-[#98989d] uppercase block mb-[8px]" style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.8, ...fontFeature }}>
            Sistema & Automação
          </span>
          <div className="flex flex-wrap gap-[8px] mb-[16px]">
            {([
              { icon: Shapes, label: "Contextual", color: "#8C8CD4", bg: "#e8e8fd", desc: "Opções dinâmicas por contexto" },
              { icon: FunctionIcon, label: "Calculado", color: "#8C8CD4", bg: "#e8e8fd", desc: "Valor gerado por fórmula" },
              { icon: Fingerprint, label: "ID", color: "#98989d", bg: "#f0f2f5", desc: "Identificador único do registro" },
            ] as const).map((f) => (
              <div key={f.label} className="flex items-center gap-[8px] p-[6px] pr-[10px] rounded-[10px] border border-[#eceef1] min-w-[160px]">
                <div className="flex items-center justify-center size-[26px] rounded-[7px] shrink-0" style={{ backgroundColor: f.bg }}>
                  <f.icon size={14} weight="duotone" style={{ color: f.color }} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#28415c]" style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.2, lineHeight: "15px", ...fontFeature }}>{f.label}</span>
                  <span className="text-[#98989d]" style={{ fontSize: 9, fontWeight: 500, lineHeight: "12px", ...fontFeature }}>{f.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <span className="text-[#98989d] font-mono block mb-[4px]" style={{ fontSize: 10 }}>
            card: h-[38px] rounded-[10px] border-[#eceef1] · ícone: size-[26px] rounded-[7px] bg=tipo.bg · icon: size=14 duotone color=tipo.color · label: 12px/600 · desc: 9px/500
          </span>

        </Card>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/*  9. TOGGLE / SWITCH                                            */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <Card>
          <SectionTitle>Toggle / Switch</SectionTitle>
          <SectionSubtitle>Toggle binário para configurações. Cores: ativo #07ABDE, inativo #C8CFDB.</SectionSubtitle>

          <div className="flex flex-col gap-[8px]">
            <div className="flex items-center gap-[16px]">
              <button
                onClick={() => setToggleOn(!toggleOn)}
                className="relative w-[40px] h-[22px] rounded-full transition-colors cursor-pointer"
                style={{ backgroundColor: toggleOn ? "#07ABDE" : "#C8CFDB" }}
              >
                <div
                  className="absolute top-[2px] w-[18px] h-[18px] rounded-full bg-white transition-all"
                  style={{ left: toggleOn ? 20 : 2, boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }}
                />
              </button>
              <span className="text-[#28415c]" style={{ fontSize: 13, fontWeight: 600, ...fontFeature }}>
                {toggleOn ? "Ativado" : "Desativado"}
              </span>
            </div>
            <span className="text-[#98989d] font-mono" style={{ fontSize: 10 }}>
              Ativo: bg-[#07ABDE] · Inativo: bg-[#C8CFDB]
            </span>
          </div>
        </Card>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/*  10. REGRAS GERAIS                                             */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <Card>
          <SectionTitle>Regras Gerais</SectionTitle>
          <SectionSubtitle>Convenções que devem ser seguidas em todo componente novo.</SectionSubtitle>

          <div className="flex flex-col gap-[12px]">
            {[
              { title: "Font", desc: "DM Sans com fontFeatureSettings: 'ss01', 'ss04', 'ss05', 'ss07'" },
              { title: "Mono", desc: "DM Mono — para IDs, códigos, valores técnicos" },
              { title: "Border radius", desc: "Cards: rounded-[15px] · Botões/pills: rounded-[500px] · Inputs: rounded-[10px] · Dropdowns: rounded-[10px]" },
              { title: "Alturas padrão", desc: "Botão primário: h-[34px] · Segmented: h-[44px] container, h-[36px] item · Input modal: h-[38px] · Badge: h-[24px] ou h-[28px]" },
              { title: "Ícones Phosphor", desc: "Sidebar/integrações: weight=\"duotone\" · ActionPill/botões: weight=\"bold\" · Status pills: weight=\"fill\" · Ativo: weight=\"fill\"" },
              { title: "Cores de texto", desc: "Títulos: #122232 ou #28415c · Corpo: #4E6987 · Muted: #98989d · Placeholder: #C8CFDB · Links: #07ABDE" },
              { title: "Acentuação", desc: "Sempre em português correto — Concluído, Não, Ligação, Descrição, Próximo" },
              { title: "Labels", desc: "Sempre UPPERCASE com letterSpacing 0.3–0.5px · fontSize 8–11px dependendo do contexto" },
              { title: "Transições", desc: "transition-colors em todos os elementos interativos · transition-all para mudanças de layout" },
              { title: "Cursor", desc: "cursor-pointer em todos os botões e links · disabled:opacity-50 disabled:cursor-not-allowed" },
              { title: "Dividers", desc: "bg-[#F0F2F5] para separadores leves internos · bg-[#DDE3EC] para separadores de seção fortes" },
              { title: "Botão sem ícone", desc: "Salvar, Descartar, Cancelar — texto only. Ícone apenas em: loading (Spinner), ação específica (Plus, Trash)" },
            ].map((rule) => (
              <div key={rule.title} className="flex items-start gap-[12px]">
                <div className="flex items-center justify-center h-[22px] px-[8px] rounded-[500px] bg-[#F6F7F9] shrink-0">
                  <span className="text-[#0483AB] font-bold uppercase" style={{ fontSize: 9, letterSpacing: 0.3, ...fontFeature }}>
                    {rule.title}
                  </span>
                </div>
                <span className="text-[#4E6987]" style={{ fontSize: 12, fontWeight: 500, letterSpacing: -0.3, lineHeight: "18px", ...fontFeature }}>
                  {rule.desc}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* ═══════════════════════════════════════��═══════════════════════ */}
        {/*  11. PAGINAÇÃO                                                 */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <Card>
          <SectionTitle>Paginação</SectionTitle>
          <SectionSubtitle>Indicadores de página da tabela.</SectionSubtitle>

          <div className="flex items-center gap-[4px]">
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`flex items-center justify-center w-[28px] h-[28px] rounded-full transition-colors ${
                  page === 2
                    ? "bg-[#28415C] text-white"
                    : "text-[#28415C] hover:bg-[#F6F7F9]"
                }`}
                style={{ fontSize: 12, fontWeight: page === 2 ? 700 : 500, ...fontFeature }}
              >
                {page}
              </button>
            ))}
          </div>
          <span className="text-[#98989d] font-mono block mt-[8px]" style={{ fontSize: 10 }}>
            size w-[28px] h-[28px] rounded-full · Ativo: bg-[#28415C] text-white · Inativo: text-[#28415C]
          </span>
        </Card>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/*  12. INPUTS & FORMS                                             */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <Card>
          <SectionTitle>Inputs & Forms</SectionTitle>
          <SectionSubtitle>Campos de formulário padrão — modais, painéis de edição, e campos editáveis em telas de detalhe com 5 estados (idle, hover, editing, unsaved, error).</SectionSubtitle>

          <Label>Input Padrão (Modal)</Label>
          <div className="flex flex-col gap-[6px] max-w-[320px] mb-[16px]">
            <label className="text-[#4E6987] uppercase" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.3, ...fontFeature }}>
              Assunto
            </label>
            <input
              type="text"
              placeholder="Ex: Reunião com cliente Alpha"
              defaultValue="Reunião de alinhamento"
              className="w-full h-[38px] px-[12px] rounded-[10px] border border-[#DDE3EC] bg-white text-[#28415c] outline-none focus:border-[#07ABDE] transition-colors"
              style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3, ...fontFeature }}
            />
          </div>
          <span className="text-[#98989d] font-mono block mb-[16px]" style={{ fontSize: 10 }}>
            h-[38px] rounded-[10px] border-[#DDE3EC] focus:border-[#07ABDE] · Label: 11px/700 uppercase
          </span>

          <Label>Input Inline (Títulos — Painel lateral)</Label>
          <div className="max-w-[280px] mb-[16px]">
            <input
              type="text"
              defaultValue="Reunião semanal"
              className="w-full bg-transparent border-b border-[#07ABDE] outline-none text-[#28415c]"
              style={{ fontSize: 18, fontWeight: 700, letterSpacing: -0.5, lineHeight: "22px", ...fontFeature }}
            />
          </div>
          <span className="text-[#98989d] font-mono block mb-[16px]" style={{ fontSize: 10 }}>
            bg-transparent border-b border-[#07ABDE] — edição inline de títulos
          </span>

          <Label>Search Input (com ícone)</Label>
          <div className="max-w-[320px] mb-[16px]">
            <div
              className="relative flex items-center gap-[10px] h-[40px] px-[14px] rounded-full bg-[#DDE3EC] flex-1 min-w-[140px] max-w-[280px]"
              style={{ boxShadow: "inset 0px 1px 3px 0px rgba(0,0,0,0.1), inset 0px 1px 2px 0px rgba(0,0,0,0.06)" }}
            >
              <MagnifyingGlass size={16} weight="bold" className="text-[#98989d] shrink-0" />
              <input
                type="text"
                placeholder="Buscar..."
                className="flex-1 bg-transparent outline-none text-[#28415c] placeholder:text-[#c8cfdb]"
                style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.3, ...fontFeature }}
              />
            </div>
          </div>
          <span className="text-[#98989d] font-mono block mb-[16px]" style={{ fontSize: 10 }}>
            rounded-full bg-[#DDE3EC] h-[40px] · inner shadow inset · ícone weight="bold"
          </span>

          <Divider />

          <Label>EditableField — 5 Estados Visuais</Label>
          <p className="text-[#4E6987] mb-[16px]" style={{ fontSize: 12, fontWeight: 500, letterSpacing: -0.3, lineHeight: "17px", ...fontFeature }}>
            Componente usado em telas de detalhe (Lead, Conta, Contato, Oportunidade) com estados visuais distintos.
          </p>

          {/* Estado: Inativo (Idle) */}
          <Label>Estado: Inativo (idle)</Label>
          <div className="flex items-start gap-[16px] mb-[6px]">
            <div className="group relative flex flex-col gap-0 rounded-[8px] p-[6px] border border-transparent hover:bg-[#f6f7f9] cursor-pointer transition-all min-w-[180px]">
              <span className="text-[#98989d] uppercase block" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, lineHeight: "20px", ...fontFeature }}>
                Nome do Lead
              </span>
              <span className="text-[#4e6987]" style={{ fontSize: 15, fontWeight: 500, letterSpacing: -0.5, lineHeight: "22px", ...fontFeature }}>
                Alpha Tecnologia
              </span>
              <div className="absolute right-[5px] top-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="hidden group-hover:flex items-center justify-center size-[16px] rounded-full bg-[#dde3ec] text-[#4e6987]">
                  <PencilSimple size={9} weight="bold" />
                </span>
              </div>
            </div>
          </div>
          <span className="text-[#98989d] font-mono block mb-[16px]" style={{ fontSize: 10 }}>
            border-transparent hover:bg-[#f6f7f9] · pencil aparece no hover: bg-[#dde3ec]
          </span>

          {/* Estado: Editando */}
          <Label>Estado: Editando (editing)</Label>
          <div className="flex items-start gap-[16px] mb-[6px]">
            <div className="relative flex flex-col gap-0 rounded-[8px] p-[5px] border border-[#07abde] cursor-text transition-all min-w-[180px]">
              <span className="text-[#07abde] uppercase block" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, lineHeight: "20px", ...fontFeature }}>
                Nome do Lead
              </span>
              <input
                type="text"
                defaultValue="Alpha Tecnologia"
                className="flex-1 bg-transparent outline-none text-[#4e6987] min-w-0"
                style={{ fontSize: 15, fontWeight: 500, letterSpacing: -0.5, lineHeight: "22px", ...fontFeature }}
              />
              <div className="absolute right-[5px] top-[10px]">
                <span className="flex items-center justify-center size-[16px] rounded-full bg-[#dcf0ff] text-[#07abde] cursor-pointer">
                  <X size={9} weight="bold" />
                </span>
              </div>
            </div>
          </div>
          <span className="text-[#98989d] font-mono block mb-[16px]" style={{ fontSize: 10 }}>
            label: text-[#07abde] · border-[#07abde] · botão: bg-[#dcf0ff] text-[#07abde] (X cancelar)
          </span>

          {/* Estado: Não salvo */}
          <Label>Estado: Não salvo (unsaved)</Label>
          <div className="flex items-start gap-[16px] mb-[6px]">
            <div className="relative flex flex-col gap-0 rounded-[8px] p-[5px] border border-[#C4990D] cursor-pointer transition-all min-w-[180px]">
              <span className="text-[#C4990D] uppercase block" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, lineHeight: "20px", ...fontFeature }}>
                Nome do Lead
              </span>
              <span className="text-[#C4990D]" style={{ fontSize: 15, fontWeight: 500, letterSpacing: -0.5, lineHeight: "22px", ...fontFeature }}>
                Alpha Tech LTDA
              </span>
              <div className="absolute right-[5px] top-[10px]">
                <span className="flex items-center justify-center size-[16px] rounded-full bg-[#feedca] text-[#C4990D] cursor-pointer" title="Salvar">
                  <Check size={9} weight="bold" />
                </span>
              </div>
            </div>
          </div>
          <span className="text-[#98989d] font-mono block mb-[16px]" style={{ fontSize: 10 }}>
            label + value: text-[#C4990D] · border-[#C4990D] · botão: bg-[#feedca] (Check salvar)
          </span>

          {/* Estado: Erro */}
          <Label>Estado: Erro (error)</Label>
          <div className="flex items-start gap-[16px] mb-[6px]">
            <div className="relative flex flex-col gap-0 rounded-[8px] p-[5px] border border-[#f56233] transition-all min-w-[180px]">
              <span className="text-[#f56233] uppercase block" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, lineHeight: "20px", ...fontFeature }}>
                Email<span className="ml-[2px]">*</span>
              </span>
              <span className="text-[#f56233]" style={{ fontSize: 15, fontWeight: 500, letterSpacing: -0.5, lineHeight: "22px", ...fontFeature }}>
                email-invalido
              </span>
              <div className="absolute right-[5px] top-[10px]">
                <span className="flex items-center justify-center size-[16px] rounded-full bg-[#ffedeb] text-[#ff8c76] cursor-pointer">
                  <X size={9} weight="bold" />
                </span>
              </div>
            </div>
          </div>
          <span className="text-[#98989d] font-mono block mb-[16px]" style={{ fontSize: 10 }}>
            label + value: text-[#f56233] · border-[#f56233] · botão: bg-[#ffedeb] text-[#ff8c76]
          </span>

          <Divider />

          <Label>Campos de Vínculo (Relacionamento com Entidades)</Label>
          <p className="text-[#4E6987] mb-[16px]" style={{ fontSize: 12, fontWeight: 500, letterSpacing: -0.3, lineHeight: "17px", ...fontFeature }}>
            Campos que vinculam um registro a outra entidade CRM. Usam ícone <code className="bg-[#f6f7f9] px-[4px] rounded-[4px] text-[#0483AB]">LinkSimpleHorizontal</code> como indicador.
          </p>

          <div className="flex items-start gap-[16px] flex-wrap mb-[6px]">
            {/* Conta */}
            <div className="group relative flex flex-col gap-0 rounded-[8px] p-[6px] border border-transparent hover:bg-[#f6f7f9] cursor-pointer transition-all min-w-[180px]">
              <div className="flex items-center gap-[4px]">
                <span className="text-[#98989d] uppercase block" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, lineHeight: "20px", ...fontFeature }}>
                  Conta
                </span>
                <LinkSimpleHorizontal size={10} weight="bold" className="text-[#98989d]" />
              </div>
              <div className="flex items-center gap-[6px] min-h-[22px]">
                <Building size={14} weight="duotone" className="text-[#3CCEA7] shrink-0" />
                <span className="text-[#0483AB]" style={{ fontSize: 15, fontWeight: 500, letterSpacing: -0.5, lineHeight: "22px", ...fontFeature }}>
                  Alpha Tecnologia
                </span>
              </div>
            </div>

            {/* Oportunidade */}
            <div className="group relative flex flex-col gap-0 rounded-[8px] p-[6px] border border-transparent hover:bg-[#f6f7f9] cursor-pointer transition-all min-w-[180px]">
              <div className="flex items-center gap-[4px]">
                <span className="text-[#98989d] uppercase block" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, lineHeight: "20px", ...fontFeature }}>
                  Oportunidade
                </span>
                <LinkSimpleHorizontal size={10} weight="bold" className="text-[#98989d]" />
              </div>
              <div className="flex items-center gap-[6px] min-h-[22px]">
                <SketchLogo size={14} weight="duotone" className="text-[#07ABDE] shrink-0" />
                <span className="text-[#0483AB]" style={{ fontSize: 15, fontWeight: 500, letterSpacing: -0.5, lineHeight: "22px", ...fontFeature }}>
                  Projeto ERP 2026
                </span>
              </div>
            </div>
          </div>
          <span className="text-[#98989d] font-mono block mb-[4px]" style={{ fontSize: 10 }}>
            ícone label: LinkSimpleHorizontal 10px bold · ícone entidade: 14px duotone cor da entidade · valor: text-[#0483AB] clicável
          </span>

        </Card>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/*  13. MENU LATERAL DE CONTEXTO (SIDEBAR)                        */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <Card>
          <SectionTitle>Menu Lateral de Contexto</SectionTitle>
          <SectionSubtitle>
            Sidebar composta por Rail (72px, ícones) + Painel contextual (224px, seções colapsáveis com NavLinks).
            O Rail usa bg-[#EBF1FA], o Painel bg-[#F6F7F9]. Ícones Phosphor: weight="duotone" inativo, "fill" ativo.
          </SectionSubtitle>

          {/* ── Rail Items ── */}
          <Label>Rail Items — Ativo vs Inativo</Label>
          <p className="text-[#4E6987] mb-[12px]" style={{ fontSize: 12, fontWeight: 500, letterSpacing: -0.3, lineHeight: "17px", ...fontFeature }}>
            Coluna fixa de 72px com ícones de navegação principal. Item ativo: pill bg-[#28415C] com ícone fill branco e sombra. Inativo: icon duotone text-[#4E6987], hover expande para pill transparente.
          </p>
          <div className="flex items-end gap-[24px] mb-[8px] p-[16px] rounded-[12px] bg-[#EBF1FA]">
            {/* Rail item — Ativo */}
            <div className="flex flex-col items-center gap-0.5">
              <div className="relative flex items-center justify-center h-[32px] w-[42px] rounded-full bg-[#28415C] text-[#F6F7F9]"
                style={{ boxShadow: "0px 2px 4px 0px rgba(18,34,50,0.3)" }}>
                <ChartBar size={20} weight="fill" />
                <div className="absolute inset-0 rounded-full pointer-events-none" style={{ border: "0.7px solid rgba(200,207,219,0.6)" }} />
              </div>
              <span className="text-[#28415C]" style={{ fontSize: 11, fontWeight: 700, letterSpacing: -0.5, lineHeight: "22px", ...fontFeature }}>Dashboards</span>
            </div>
            {/* Rail item — Inativo */}
            <div className="flex flex-col items-center gap-0.5">
              <div className="flex items-center justify-center h-[32px] w-[32px] rounded-full text-[#4E6987]">
                <Database size={20} weight="duotone" />
              </div>
              <span className="text-[#4E6987]" style={{ fontSize: 11, fontWeight: 500, letterSpacing: -0.5, lineHeight: "22px", ...fontFeature }}>Dados</span>
            </div>
            {/* Rail item — Inativo */}
            <div className="flex flex-col items-center gap-0.5">
              <div className="flex items-center justify-center h-[32px] w-[32px] rounded-full text-[#4E6987]">
                <PencilRuler size={20} weight="duotone" />
              </div>
              <span className="text-[#4E6987]" style={{ fontSize: 11, fontWeight: 500, letterSpacing: -0.5, lineHeight: "22px", ...fontFeature }}>Estúdio</span>
            </div>
            {/* Rail item — Inativo (directTo) */}
            <div className="flex flex-col items-center gap-0.5">
              <div className="flex items-center justify-center h-[32px] w-[32px] rounded-full text-[#4E6987]">
                <Presentation size={20} weight="duotone" />
              </div>
              <span className="text-[#4E6987]" style={{ fontSize: 11, fontWeight: 500, letterSpacing: -0.5, lineHeight: "22px", ...fontFeature }}>Relatórios</span>
            </div>
            {/* Sidebar toggle button */}
            <div className="flex flex-col items-center gap-0.5">
              <div className="flex items-center justify-center h-[32px] w-[32px] rounded-full text-[#4E6987]">
                <SidebarIcon size={20} weight="duotone" />
              </div>
              <span className="text-[#98989d]" style={{ fontSize: 9, fontWeight: 500, letterSpacing: -0.3, ...fontFeature }}>Toggle</span>
            </div>
          </div>
          <span className="text-[#98989d] font-mono block mb-[20px]" style={{ fontSize: 10 }}>
            Rail: w-[72px] bg-[#EBF1FA] · Ativo: w-[42px] h-[32px] bg-[#28415C] rounded-full shadow · Inativo: w-[32px] text-[#4E6987] · Hover: w-[42px] bg-[#28415C]/10 · Label: 11px/500 (ativo: 700)
          </span>

          <Divider />

          {/* ── Section Headers ── */}
          <Label>Section Headers — Painel Contextual</Label>
          <p className="text-[#4E6987] mb-[12px]" style={{ fontSize: 12, fontWeight: 500, letterSpacing: -0.3, lineHeight: "17px", ...fontFeature }}>
            Títulos de seção colapsáveis dentro do painel lateral. Clique alterna caret (CaretUp/CaretDown). Cor: text-[#122232], hover: bg-[#F6F7F9].
          </p>
          <div className="flex flex-col gap-[4px] mb-[8px] p-[12px] rounded-[12px] bg-[#F6F7F9] max-w-[224px]">
            {/* Expandido */}
            <div className="flex items-center justify-between w-full px-5 py-2 text-[#122232] rounded-[8px] hover:bg-white transition-colors cursor-pointer">
              <span style={{ fontSize: 18, fontWeight: 400, letterSpacing: -0.5, ...fontFeature }}>Visões</span>
              <CaretUp size={14} className="text-[#4E6987]" />
            </div>
            {/* Colapsado */}
            <div className="flex items-center justify-between w-full px-5 py-2 text-[#122232] rounded-[8px] hover:bg-white transition-colors cursor-pointer">
              <span style={{ fontSize: 18, fontWeight: 400, letterSpacing: -0.5, ...fontFeature }}>Análises</span>
              <CaretDown size={14} className="text-[#4E6987]" />
            </div>
            {/* Expandido */}
            <div className="flex items-center justify-between w-full px-5 py-2 text-[#122232] rounded-[8px] hover:bg-white transition-colors cursor-pointer">
              <span style={{ fontSize: 18, fontWeight: 400, letterSpacing: -0.5, ...fontFeature }}>Personalizado</span>
              <CaretUp size={14} className="text-[#4E6987]" />
            </div>
          </div>
          <span className="text-[#98989d] font-mono block mb-[20px]" style={{ fontSize: 10 }}>
            Título: 18px/400 text-[#122232] letterSpacing -0.5 · Caret: size=14 text-[#4E6987] · Expandido: CaretUp · Colapsado: CaretDown · hover:bg-[#F6F7F9]
          </span>

          <Divider />

          {/* ── Nav Items ── */}
          <Label>Nav Items — Ativo vs Inativo</Label>
          <p className="text-[#4E6987] mb-[12px]" style={{ fontSize: 12, fontWeight: 500, letterSpacing: -0.3, lineHeight: "17px", ...fontFeature }}>
            Links de navegação dentro das seções do painel. Item ativo: pill arredondado bg-[#28415c] com ícone fill e texto brancos + sombra + border sutil. Inativo: rounded-[8px] com hover → rounded-[100px] bg-[#dde3ec].
          </p>
          <div className="flex flex-col gap-[2px] p-[12px] rounded-[12px] bg-[#F6F7F9] max-w-[224px] mb-[8px]">
            {/* Item Ativo */}
            <div className="group/item relative flex items-center gap-[10px] pl-[6px] py-[6px] pr-[22px] rounded-[100px] bg-[#28415c] cursor-pointer"
              style={{ backdropFilter: "blur(50px)" }}>
              <div aria-hidden="true" className="absolute inset-0 rounded-[100px] pointer-events-none" style={{ border: "0.7px solid rgba(200,207,219,0.6)", boxShadow: "0px 2px 4px 0px rgba(18,34,50,0.3)" }} />
              <span className="flex items-center justify-center size-[28px] rounded-[6px] shrink-0 text-[#f6f7f9]">
                <Gauge size={18} weight="fill" />
              </span>
              <span className="flex-1 text-[#f6f7f9]" style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.5, lineHeight: "22px", ...fontFeature }}>Visão Geral</span>
            </div>
            {/* Item Inativo */}
            <div className="flex items-center gap-[10px] pl-[6px] py-[6px] pr-[22px] rounded-[8px] cursor-pointer hover:rounded-[100px] hover:bg-[#dde3ec] transition-all">
              <span className="flex items-center justify-center size-[28px] rounded-[6px] shrink-0 text-[#4e6987]">
                <ChartLineUp size={18} weight="duotone" />
              </span>
              <span className="flex-1 text-[#4e6987]" style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.5, lineHeight: "22px", ...fontFeature }}>Vendas</span>
            </div>
            {/* Item Inativo */}
            <div className="flex items-center gap-[10px] pl-[6px] py-[6px] pr-[22px] rounded-[8px] cursor-pointer hover:rounded-[100px] hover:bg-[#dde3ec] transition-all">
              <span className="flex items-center justify-center size-[28px] rounded-[6px] shrink-0 text-[#4e6987]">
                <FunnelSimple size={18} weight="duotone" />
              </span>
              <span className="flex-1 text-[#4e6987]" style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.5, lineHeight: "22px", ...fontFeature }}>Pipeline</span>
            </div>
            {/* Item Inativo */}
            <div className="flex items-center gap-[10px] pl-[6px] py-[6px] pr-[22px] rounded-[8px] cursor-pointer hover:rounded-[100px] hover:bg-[#dde3ec] transition-all">
              <span className="flex items-center justify-center size-[28px] rounded-[6px] shrink-0 text-[#4e6987]">
                <Lightning size={18} weight="duotone" />
              </span>
              <span className="flex-1 text-[#4e6987]" style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.5, lineHeight: "22px", ...fontFeature }}>Atividades</span>
            </div>
          </div>
          <span className="text-[#98989d] font-mono block mb-[20px]" style={{ fontSize: 10 }}>
            Ativo: rounded-[100px] bg-[#28415c] backdrop-blur-[50px] · border: 0.7px rgba(200,207,219,0.6) · shadow: 0px 2px 4px rgba(18,34,50,0.3) · Ícone: size=18 fill text-[#f6f7f9] · Texto: 13px/500 text-[#f6f7f9]{"\n"}
            Inativo: rounded-[8px] hover:rounded-[100px] hover:bg-[#dde3ec] · Ícone: size=18 duotone text-[#4e6987] · Texto: 13px/500 text-[#4e6987]{"\n"}
            Container ícone: size-[28px] rounded-[6px] · Gap: 10px · Padding: pl-[6px] py-[6px] pr-[22px]
          </span>

          <Divider />

          {/* ── Painel Completo Simulado ── */}
          <Label>Painel Completo — Composição Rail + Panel</Label>
          <p className="text-[#4E6987] mb-[12px]" style={{ fontSize: 12, fontWeight: 500, letterSpacing: -0.3, lineHeight: "17px", ...fontFeature }}>
            Exemplo visual do sidebar completo com rail + painel contextual expandido.
            O painel anima com width 0→224px via Motion. Inclui logo, botão de ação e seções colapsáveis.
          </p>
          <div className="flex rounded-[12px] overflow-hidden border border-[#DDE3EC] mb-[8px]" style={{ height: 420 }}>
            {/* Rail mini */}
            <div className="flex flex-col items-center w-[72px] min-w-[72px] bg-[#EBF1FA] py-3 gap-1">
              {/* Toggle */}
              <div className="flex items-center justify-center w-10 h-10 rounded-xl text-[#4E6987] mb-4 mt-1 shrink-0 cursor-pointer hover:bg-[#28415C]/10 transition-colors">
                <SidebarIcon size={20} weight="duotone" />
              </div>
              {/* Items */}
              {([
                { icon: House, label: "Início", active: false },
                { icon: ChartBar, label: "Dashboards", active: true },
                { icon: Database, label: "Dados", active: false },
                { icon: PencilRuler, label: "Estúdio", active: false },
                { icon: Presentation, label: "Relatórios", active: false },
                { icon: ArrowsClockwise, label: "Sync", active: false },
              ] as const).map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-0.5 cursor-pointer">
                  <div className={`relative flex items-center justify-center h-[32px] rounded-full transition-all ${item.active ? "w-[42px] bg-[#28415C] text-[#F6F7F9]" : "w-[32px] text-[#4E6987]"}`}
                    style={item.active ? { boxShadow: "0px 2px 4px 0px rgba(18,34,50,0.3)" } : undefined}>
                    <item.icon size={20} weight={item.active ? "fill" : "duotone"} />
                    {item.active && <div className="absolute inset-0 rounded-full pointer-events-none" style={{ border: "0.7px solid rgba(200,207,219,0.6)" }} />}
                  </div>
                  <span className={item.active ? "text-[#28415C]" : "text-[#4E6987]"}
                    style={{ fontSize: 11, fontWeight: item.active ? 700 : 500, letterSpacing: -0.5, lineHeight: "22px", ...fontFeature }}>{item.label}</span>
                </div>
              ))}
              {/* Footer */}
              <div className="mt-auto pt-3 flex flex-col items-center gap-2">
                <div className="flex items-center justify-center w-[32px] h-[32px] rounded-full bg-[#0483AB] text-white" style={{ fontSize: 12, fontWeight: 700, ...fontFeature }}>HZ</div>
                <div className="flex items-center justify-center w-[32px] h-[32px] rounded-full text-[#4E6987] cursor-pointer">
                  <DotsNine size={20} weight="duotone" />
                </div>
              </div>
            </div>
            {/* Panel */}
            <div className="flex flex-col w-[224px] bg-[#F6F7F9] overflow-y-auto">
              {/* Logo */}
              <div className="px-5 py-5">
                <span className="text-[#28415C]" style={{ fontSize: 16, fontWeight: 700, letterSpacing: -0.5, ...fontFeature }}>Zenite Dash</span>
              </div>
              {/* Section: Visões */}
              <div className="mb-2">
                <div className="flex items-center justify-between w-full px-5 py-2 text-[#122232]">
                  <span style={{ fontSize: 18, fontWeight: 400, letterSpacing: -0.5, ...fontFeature }}>Visões</span>
                  <CaretUp size={14} className="text-[#4E6987]" />
                </div>
                <div className="flex flex-col gap-[2px] mt-0.5 px-3">
                  {([
                    { icon: Gauge, label: "Visão Geral", active: true },
                    { icon: ChartLineUp, label: "Vendas", active: false },
                    { icon: FunnelSimple, label: "Pipeline", active: false },
                    { icon: Lightning, label: "Atividades", active: false },
                  ] as const).map((item) => (
                    <div key={item.label}
                      className={`relative flex items-center gap-[10px] pl-[6px] py-[6px] pr-[22px] cursor-pointer transition-all ${item.active ? "rounded-[100px] bg-[#28415c]" : "rounded-[8px]"}`}>
                      {item.active && <div aria-hidden="true" className="absolute inset-0 rounded-[100px] pointer-events-none" style={{ border: "0.7px solid rgba(200,207,219,0.6)", boxShadow: "0px 2px 4px 0px rgba(18,34,50,0.3)" }} />}
                      <span className={`flex items-center justify-center size-[28px] rounded-[6px] shrink-0 ${item.active ? "text-[#f6f7f9]" : "text-[#4e6987]"}`}>
                        <item.icon size={18} weight={item.active ? "fill" : "duotone"} />
                      </span>
                      <span className={`flex-1 ${item.active ? "text-[#f6f7f9]" : "text-[#4e6987]"}`}
                        style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.5, lineHeight: "22px", ...fontFeature }}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Section: Análises (colapsado) */}
              <div className="mb-2">
                <div className="flex items-center justify-between w-full px-5 py-2 text-[#122232]">
                  <span style={{ fontSize: 18, fontWeight: 400, letterSpacing: -0.5, ...fontFeature }}>Análises</span>
                  <CaretDown size={14} className="text-[#4E6987]" />
                </div>
              </div>
              {/* Section: Personalizado */}
              <div className="mb-2">
                <div className="flex items-center justify-between w-full px-5 py-2 text-[#122232]">
                  <span style={{ fontSize: 18, fontWeight: 400, letterSpacing: -0.5, ...fontFeature }}>Personalizado</span>
                  <CaretUp size={14} className="text-[#4E6987]" />
                </div>
                <div className="flex flex-col gap-[2px] mt-0.5 px-3">
                  <div className="flex items-center gap-[10px] pl-[6px] py-[6px] pr-[22px] rounded-[8px] cursor-pointer">
                    <span className="flex items-center justify-center size-[28px] rounded-[6px] shrink-0 text-[#4e6987]">
                      <SelectionPlus size={18} weight="duotone" />
                    </span>
                    <span className="flex-1 text-[#4e6987]" style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.5, lineHeight: "22px", ...fontFeature }}>Builder</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <span className="text-[#98989d] font-mono block mb-[20px]" style={{ fontSize: 10 }}>
            Rail: w-[72px] bg-[#EBF1FA] · Panel: w-[224px] bg-[#F6F7F9] · Avatar: w-[32px] h-[32px] rounded-full bg-[#0483AB] text-white 12px/700 · AppDrawer: DotsNine duotone
          </span>

          <Divider />

          {/* ── App Drawer ── */}
          <Label>App Drawer — Módulos Zenite</Label>
          <p className="text-[#4E6987] mb-[12px]" style={{ fontSize: 12, fontWeight: 500, letterSpacing: -0.3, lineHeight: "17px", ...fontFeature }}>
            Dropdown de aplicativos do ecossistema Zenite. Acionado pelo ícone DotsNine no rodapé do Rail. Grid 3 colunas, cada módulo com ícone 40×40 em bg de entidade + sigla + nome.
          </p>
          <div className="p-[16px] rounded-[16px] bg-white max-w-[264px] mb-[8px]"
            style={{ boxShadow: "0px 12px 32px rgba(18,34,50,0.12), 0px 2px 8px rgba(18,34,50,0.06)", border: "0.7px solid rgba(200,207,219,0.4)" }}>
            <p className="text-[#98989d] px-1 mb-3" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", lineHeight: "20px", ...fontFeature }}>Aplicativos</p>
            <div className="grid grid-cols-3 gap-1">
              {([
                { abbr: "PRC", name: "Price", icon: Invoice, bg: "#DCF0FF", color: "#07ABDE", active: false },
                { abbr: "CRM", name: "CRM", icon: UsersThree, bg: "#DCF0FF", color: "#0483AB", active: false },
                { abbr: "MKT", name: "Marketing", icon: Megaphone, bg: "#FEEDCA", color: "#917822", active: false },
                { abbr: "SYC", name: "Sync", icon: ArrowsClockwise, bg: "#D9F8EF", color: "#3CCEA7", active: false },
                { abbr: "DSH", name: "Dashboard", icon: ChartBar, bg: "#EBF1FA", color: "#4E6987", active: true },
                { abbr: "FLW", name: "Flow", icon: TreeStructure, bg: "#FFEDEB", color: "#ED5200", active: false },
                { abbr: "PJT", name: "Projects", icon: Briefcase, bg: "#E8E8FD", color: "#6868B1", active: false },
              ] as const).map((app) => (
                <div key={app.abbr} className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-[12px] cursor-pointer transition-colors ${app.active ? "bg-[#F6F7F9]" : "hover:bg-[#F6F7F9]"}`}>
                  <div className="flex items-center justify-center w-[40px] h-[40px] rounded-[10px]" style={{ backgroundColor: app.bg }}>
                    <app.icon size={22} weight="duotone" style={{ color: app.color }} />
                  </div>
                  <div className="flex flex-col items-center">
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: -0.3, lineHeight: "14px", color: "#122232", ...fontFeature }}>{app.abbr}</span>
                    <span style={{ fontSize: 9, fontWeight: 500, letterSpacing: -0.2, lineHeight: "13px", color: "#98989d", ...fontFeature }}>{app.name}</span>
                  </div>
                  {app.active && <div className="w-[4px] h-[4px] rounded-full bg-[#4E6987] -mt-0.5" />}
                </div>
              ))}
            </div>
          </div>
          <span className="text-[#98989d] font-mono block mb-[20px]" style={{ fontSize: 10 }}>
            Container: w-[264px] rounded-[16px] bg-white · Shadow: 12px/32px rgba(18,34,50,0.12) · Border: 0.7px rgba(200,207,219,0.4) · Grid: 3col gap-1 · Ícone: 40×40 rounded-[10px] bg=módulo.bg · Sigla: 11px/700 #122232 · Nome: 9px/500 #98989d · Ativo: bg-[#F6F7F9] + dot 4px bg-[#4E6987]
          </span>

          <Divider />

          {/* ── Estúdio Panel — Relatórios & Dashboards ── */}
          <Label>Estúdio — Seções Relatórios & Dashboards</Label>
          <p className="text-[#4E6987] mb-[12px]" style={{ fontSize: 12, fontWeight: 500, letterSpacing: -0.3, lineHeight: "17px", ...fontFeature }}>
            Painel do Estúdio com duas seções: Relatórios e Dashboards. Cada uma tem itens com ícones contextuais (Clock, User, LockKey, Globe, ListBullets).
          </p>
          <div className="flex flex-col gap-[2px] p-[12px] rounded-[12px] bg-[#F6F7F9] max-w-[224px] mb-[8px]">
            {([
              { icon: Clock, label: "Recentes" },
              { icon: User, label: "Criados por mim" },
              { icon: LockKey, label: "Relatórios privados" },
              { icon: Globe, label: "Relatórios Públicos" },
              { icon: ListBullets, label: "Todos Relatórios" },
            ] as const).map((item, i) => (
              <div key={item.label}
                className={`relative flex items-center gap-[10px] pl-[6px] py-[6px] pr-[22px] cursor-pointer transition-all ${i === 0 ? "rounded-[100px] bg-[#28415c]" : "rounded-[8px]"}`}>
                {i === 0 && <div aria-hidden="true" className="absolute inset-0 rounded-[100px] pointer-events-none" style={{ border: "0.7px solid rgba(200,207,219,0.6)", boxShadow: "0px 2px 4px 0px rgba(18,34,50,0.3)" }} />}
                <span className={`flex items-center justify-center size-[28px] rounded-[6px] shrink-0 ${i === 0 ? "text-[#f6f7f9]" : "text-[#4e6987]"}`}>
                  <item.icon size={18} weight={i === 0 ? "fill" : "duotone"} />
                </span>
                <span className={`flex-1 ${i === 0 ? "text-[#f6f7f9]" : "text-[#4e6987]"}`}
                  style={{ fontSize: 13, fontWeight: 500, letterSpacing: -0.5, lineHeight: "22px", ...fontFeature }}>{item.label}</span>
              </div>
            ))}
          </div>
          <span className="text-[#98989d] font-mono block mb-[20px]" style={{ fontSize: 10 }}>
            Ícones contextuais: Clock (Recentes) · User (Criados por mim) · LockKey (Privados) · Globe (Públicos) · ListBullets (Todos) — size=18 duotone/fill
          </span>

          <Divider />

          {/* ── Specs resumo ── */}
          <Label>Especificações Técnicas — Resumo</Label>
          <div className="flex flex-col gap-[12px]">
            {[
              { title: "Rail", desc: "w-[72px] bg-[#EBF1FA] · flex-col items-center · gap-4 entre items · py-3" },
              { title: "Panel", desc: "w-[224px] bg-[#F6F7F9] · animação Motion width 0↔224 ease [0.4,0,0.2,1] 250ms · overflow-hidden" },
              { title: "Rail Ativo", desc: "w-[42px] h-[32px] bg-[#28415C] rounded-full · shadow 0px 2px 4px rgba(18,34,50,0.3) · border 0.7px rgba(200,207,219,0.6) · ícone: fill text-[#F6F7F9]" },
              { title: "Rail Inativo", desc: "w-[32px] h-[32px] text-[#4E6987] · hover: w-[42px] bg-[#28415C]/10 text-[#28415C] · ícone: duotone" },
              { title: "Nav Ativo", desc: "rounded-[100px] bg-[#28415c] backdrop-blur-[50px] · border 0.7px rgba(200,207,219,0.6) · shadow · text-[#f6f7f9] · icon fill size=18" },
              { title: "Nav Inativo", desc: "rounded-[8px] hover:rounded-[100px] hover:bg-[#dde3ec] · text-[#4e6987] · icon duotone size=18" },
              { title: "Section Title", desc: "18px/400 text-[#122232] letterSpacing -0.5 · px-5 py-2 · CaretUp/CaretDown size=14 text-[#4E6987]" },
              { title: "Avatar", desc: "w-[32px] h-[32px] rounded-full bg-[#0483AB] text-white · 12px/700 · iniciais do usuário" },
              { title: "App Drawer", desc: "w-[264px] rounded-[16px] bg-white · grid 3col · posição: absolute bottom-0 left-[calc(100%+12px)] · Motion: opacity+y+scale" },
            ].map((rule) => (
              <div key={rule.title} className="flex items-start gap-[12px]">
                <div className="flex items-center justify-center h-[22px] px-[8px] rounded-[500px] bg-[#F6F7F9] shrink-0">
                  <span className="text-[#0483AB] font-bold uppercase" style={{ fontSize: 9, letterSpacing: 0.3, ...fontFeature }}>
                    {rule.title}
                  </span>
                </div>
                <span className="text-[#4E6987]" style={{ fontSize: 12, fontWeight: 500, letterSpacing: -0.3, lineHeight: "18px", ...fontFeature }}>
                  {rule.desc}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}