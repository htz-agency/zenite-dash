import clsx from "clsx";
import svgPaths from "./svg-onmjos5mub";
type LineWaveMobileLightIconProps = {
  additionalClassNames?: string;
};

function LineWaveMobileLightIcon({ children, additionalClassNames = "" }: React.PropsWithChildren<LineWaveMobileLightIconProps>) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.1213 17.4142">
        {children}
      </svg>
    </div>
  );
}

function ChartBody({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute inset-[10.98%_0_0_0] opacity-24 overflow-clip">
      <div className="absolute bottom-0 left-0 top-0 w-[840px]" data-name="Chart Body">
        {children}
      </div>
    </div>
  );
}
type MasterProps = {
  additionalClassNames?: string;
};

function Master({ children, additionalClassNames = "" }: React.PropsWithChildren<MasterProps>) {
  return (
    <div className={clsx("-translate-y-1/2 absolute rounded-[20px] top-1/2", additionalClassNames)}>
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] h-full items-center relative">{children}</div>
      </div>
    </div>
  );
}

function LineWaveMobileLightMobileTabletHeaderLeftLabel({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute inset-[0_calc(66.67%+64px)_0_0]">
      <div className="absolute bg-white inset-0" data-name="Base" />
      <Master additionalClassNames="h-[30px] left-[8px]">{children}</Master>
    </div>
  );
}
type LineWaveMobileLight10SpOverlineTextProps = {
  text: string;
  additionalClassNames?: string;
};

function LineWaveMobileLight10SpOverlineText({ text, additionalClassNames = "" }: LineWaveMobileLight10SpOverlineTextProps) {
  return (
    <div className={clsx("absolute bottom-0 h-[16px] w-[48px]", additionalClassNames)}>
      <div className="absolute capitalize flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-end leading-[0] not-italic text-[#78909c] text-[12px] text-center tracking-[0.4px]">
        <p className="leading-[16px]">{text}</p>
      </div>
    </div>
  );
}
type LineWaveMobileLightHelperProps = {
  additionalClassNames?: string;
};

function LineWaveMobileLightHelper({ additionalClassNames = "" }: LineWaveMobileLightHelperProps) {
  return (
    <div className={clsx("absolute bottom-[24px] flex items-center justify-center top-0 w-0", additionalClassNames)}>
      <div className="flex-none h-px rotate-90 w-[456px]">
        <div className="opacity-12 relative size-full" data-name="Line Regular">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 175 1">
              <line id="Line" stroke="var(--stroke-0, #263238)" x2="175" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function LineWaveMobileLightDropdown() {
  return (
    <div className="-translate-y-1/2 absolute right-[8px] size-[24px] top-1/2">
      <div className="absolute flex inset-[42.5%_37.5%_45%_37.5%] items-center justify-center">
        <div className="-rotate-90 flex-none h-[10px] w-[5px]">
          <div className="relative size-full" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 6">
              <path d="M3 0L0 3L3 6V0Z" fill="var(--fill-0, #94A3B3)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
type TextProps = {
  text: string;
  additionalClassNames?: string;
};

function Text({ text, additionalClassNames = "" }: TextProps) {
  return (
    <div className={additionalClassNames}>
      <div className="absolute flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#263238] text-[16px] tracking-[0.44px]">
        <p className="leading-[24px]">{text}</p>
      </div>
    </div>
  );
}
type LineWaveMobileLight16SpBodyTextProps = {
  text: string;
  additionalClassNames?: string;
};

function LineWaveMobileLight16SpBodyText({ text, additionalClassNames = "" }: LineWaveMobileLight16SpBodyTextProps) {
  return <Text text={text} additionalClassNames={clsx("absolute h-[24px] left-[16px] opacity-80 w-[156px]", additionalClassNames)} />;
}
type IconsUserpicVectorProps = {
  additionalClassNames?: string;
};

function IconsUserpicVector({ additionalClassNames = "" }: IconsUserpicVectorProps) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <div className="absolute inset-[-58.33%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.71429 3.71429">
          <path d={svgPaths.pba2da80} id="Vector" stroke="var(--stroke-0, #94A3B3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}

function DotBody() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[12px] top-1/2">
      <div className="absolute inset-[16.67%]" data-name="🎨 Colors Primary">
        <div className="absolute bg-[#855cf8] inset-0 rounded-[12px]" data-name="BG primary">
          <div aria-hidden="true" className="absolute border border-solid border-white inset-[-1px] pointer-events-none rounded-[13px]" />
        </div>
      </div>
    </div>
  );
}

export default function LineWaveMobileLight() {
  return (
    <div className="overflow-clip relative rounded-[8px] shadow-[0px_16px_32px_0px_rgba(176,190,197,0.24),0px_4px_8px_0px_rgba(176,190,197,0.48)] size-full" data-name="Line Wave Mobile Light">
      <div className="absolute inset-0 shadow-[0px_16px_32px_0px_rgba(176,190,197,0.24),0px_4px_8px_0px_rgba(176,190,197,0.48)]" data-name="Background Card">
        <div className="absolute bg-white inset-0 rounded-[8px]" data-name="BG light" />
      </div>
      <LineWaveMobileLight16SpBodyText text="Unique visitors" additionalClassNames="top-[64px]" />
      <div className="absolute h-[24px] right-[16px] top-[64px] w-[102px]" data-name="Dropdown">
        <Text text="Monthly" additionalClassNames="absolute inset-[6px_8px]" />
        <LineWaveMobileLightDropdown />
      </div>
      <LineWaveMobileLight16SpBodyText text="Bounce ratio" additionalClassNames="top-[327px]" />
      <div className="absolute h-[24px] right-[16px] top-[327px] w-[84px]" data-name="Dropdown">
        <Text text="Yearly" additionalClassNames="absolute inset-[6px_8px]" />
        <LineWaveMobileLightDropdown />
      </div>
      <div className="absolute bg-white h-[199px] left-[16px] overflow-clip right-0 top-[104px]" data-name="Bottom · 24dp">
        <LineWaveMobileLightHelper additionalClassNames="left-[24px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[48px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[72px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[96px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[120px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[144px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[168px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[192px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[216px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[240px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[264px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[288px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[312px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[336px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[360px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[408px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[384px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[432px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[456px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[480px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[504px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[528px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[552px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[576px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[600px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[624px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[648px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[672px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[696px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[720px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[744px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[768px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[792px]" />
        <LineWaveMobileLight10SpOverlineText text="..." additionalClassNames="left-[768px]" />
        <LineWaveMobileLight10SpOverlineText text="jan" additionalClassNames="left-0" />
        <LineWaveMobileLight10SpOverlineText text="apr" additionalClassNames="left-[720px]" />
        <LineWaveMobileLight10SpOverlineText text="oct" additionalClassNames="left-[432px]" />
        <LineWaveMobileLight10SpOverlineText text="nov" additionalClassNames="left-[480px]" />
        <LineWaveMobileLight10SpOverlineText text="dec" additionalClassNames="left-[528px]" />
        <LineWaveMobileLight10SpOverlineText text="jan" additionalClassNames="left-[576px]" />
        <LineWaveMobileLight10SpOverlineText text="feb" additionalClassNames="left-[624px]" />
        <LineWaveMobileLight10SpOverlineText text="mar" additionalClassNames="left-[672px]" />
        <LineWaveMobileLight10SpOverlineText text="aug" additionalClassNames="left-[336px]" />
        <LineWaveMobileLight10SpOverlineText text="sep" additionalClassNames="left-[384px]" />
        <LineWaveMobileLight10SpOverlineText text="feb" additionalClassNames="left-[48px]" />
        <LineWaveMobileLight10SpOverlineText text="mar" additionalClassNames="left-[96px]" />
        <LineWaveMobileLight10SpOverlineText text="apr" additionalClassNames="left-[144px]" />
        <LineWaveMobileLight10SpOverlineText text="may" additionalClassNames="left-[192px]" />
        <LineWaveMobileLight10SpOverlineText text="jun" additionalClassNames="left-[240px]" />
        <LineWaveMobileLight10SpOverlineText text="jul" additionalClassNames="left-[288px]" />
      </div>
      <div className="absolute bg-white inset-[367px_0_74px_16px] overflow-clip" data-name="Bottom · 24dp">
        <LineWaveMobileLightHelper additionalClassNames="left-[24px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[48px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[72px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[96px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[120px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[144px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[168px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[192px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[216px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[240px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[264px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[288px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[312px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[336px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[360px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[408px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[384px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[432px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[456px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[480px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[504px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[528px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[552px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[576px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[600px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[624px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[648px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[672px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[696px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[720px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[744px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[768px]" />
        <LineWaveMobileLightHelper additionalClassNames="left-[792px]" />
        <LineWaveMobileLight10SpOverlineText text="..." additionalClassNames="left-[768px]" />
        <LineWaveMobileLight10SpOverlineText text="jan" additionalClassNames="left-0" />
        <LineWaveMobileLight10SpOverlineText text="apr" additionalClassNames="left-[720px]" />
        <LineWaveMobileLight10SpOverlineText text="oct" additionalClassNames="left-[432px]" />
        <LineWaveMobileLight10SpOverlineText text="nov" additionalClassNames="left-[480px]" />
        <LineWaveMobileLight10SpOverlineText text="dec" additionalClassNames="left-[528px]" />
        <LineWaveMobileLight10SpOverlineText text="jan" additionalClassNames="left-[576px]" />
        <LineWaveMobileLight10SpOverlineText text="feb" additionalClassNames="left-[624px]" />
        <LineWaveMobileLight10SpOverlineText text="mar" additionalClassNames="left-[672px]" />
        <LineWaveMobileLight10SpOverlineText text="aug" additionalClassNames="left-[336px]" />
        <LineWaveMobileLight10SpOverlineText text="sep" additionalClassNames="left-[384px]" />
        <LineWaveMobileLight10SpOverlineText text="feb" additionalClassNames="left-[48px]" />
        <LineWaveMobileLight10SpOverlineText text="mar" additionalClassNames="left-[96px]" />
        <LineWaveMobileLight10SpOverlineText text="apr" additionalClassNames="left-[144px]" />
        <LineWaveMobileLight10SpOverlineText text="may" additionalClassNames="left-[192px]" />
        <LineWaveMobileLight10SpOverlineText text="jun" additionalClassNames="left-[240px]" />
        <LineWaveMobileLight10SpOverlineText text="jul" additionalClassNames="left-[288px]" />
      </div>
      <div className="absolute h-[175px] left-[16px] right-0 top-[104px]" data-name="⤭ Mixed • 24dp">
        <ChartBody>
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 840 155.785">
            <path d={svgPaths.p1237fa00} fill="var(--fill-0, #FF6B6B)" id="Chart Body" />
          </svg>
        </ChartBody>
        <div className="absolute inset-[10.98%_0_11.25%_0] overflow-clip" data-name="Chart Line">
          <div className="absolute bottom-0 left-0 top-0 w-[840px]" data-name="Chart Line">
            <div className="absolute inset-[-0.37%_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 840 137.098">
                <path d={svgPaths.p35b5e600} id="Chart Line" stroke="var(--stroke-0, #855CF8)" />
              </svg>
            </div>
          </div>
        </div>
        <div className="absolute bottom-[72.81%] left-[12px] top-[19.69%] w-[24px]" data-name="Filled 8dp">
          <DotBody />
        </div>
        <div className="absolute bottom-[53.13%] left-[36px] top-[39.38%] w-[24px]" data-name="Filled 8dp">
          <DotBody />
        </div>
        <div className="absolute bottom-[62.5%] left-[60px] top-[30%] w-[24px]" data-name="Filled 8dp">
          <DotBody />
        </div>
        <div className="absolute bottom-[26.25%] left-[84px] top-[66.25%] w-[24px]" data-name="Filled 8dp">
          <DotBody />
        </div>
        <div className="absolute bottom-[85.63%] left-[-12px] top-[6.88%] w-[24px]" data-name="Filled 8dp">
          <DotBody />
        </div>
        <div className="absolute bottom-[75.94%] left-[132px] top-[16.56%] w-[24px]" data-name="Filled 8dp">
          <DotBody />
        </div>
        <div className="absolute bottom-[54.38%] left-[156px] top-[38.13%] w-[24px]" data-name="Filled 8dp">
          <DotBody />
        </div>
        <div className="absolute bottom-[63.75%] left-[180px] top-[28.75%] w-[24px]" data-name="Filled 8dp">
          <DotBody />
        </div>
        <div className="absolute bottom-[40.31%] left-[204px] top-[52.19%] w-[24px]" data-name="Filled 8dp">
          <DotBody />
        </div>
        <div className="absolute bottom-[43.44%] left-[108px] top-[49.06%] w-[24px]" data-name="Filled 8dp">
          <DotBody />
        </div>
        <div className="absolute bottom-[9.69%] left-[252px] top-[82.81%] w-[24px]" data-name="Filled 8dp">
          <DotBody />
        </div>
        <div className="absolute bottom-[29.38%] left-[276px] top-[63.13%] w-[24px]" data-name="Filled 8dp">
          <DotBody />
        </div>
        <div className="absolute bottom-[54.38%] left-[300px] top-[38.13%] w-[24px]" data-name="Filled 8dp">
          <DotBody />
        </div>
        <div className="absolute bottom-[20.63%] left-[324px] top-[71.88%] w-[24px]" data-name="Filled 8dp">
          <DotBody />
        </div>
        <div className="absolute bottom-[47.19%] left-[228px] top-[45.31%] w-[24px]" data-name="Filled 8dp">
          <DotBody />
        </div>
      </div>
      <div className="absolute inset-[351px_0_98px_16px]" data-name="↘ Downtrend • 24dp">
        <ChartBody>
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 840 170.029">
            <path d={svgPaths.p2dee0e80} fill="var(--fill-0, #1DD1A1)" id="Chart Body" />
          </svg>
        </ChartBody>
        <div className="absolute inset-[10.94%_0_0_0] overflow-clip" data-name="Chart Line">
          <div className="absolute bottom-[4.21%] left-0 top-[0.05%] w-[840px]" data-name="Chart Line">
            <div className="absolute inset-[-0.31%_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 840 163.866">
                <path d={svgPaths.p3de7cd00} id="Chart Line" stroke="var(--stroke-0, #855CF8)" />
              </svg>
            </div>
          </div>
        </div>
        <div className="absolute bottom-[72.81%] left-[12px] top-[19.69%] w-[24px]" data-name="Filled 8dp">
          <DotBody />
        </div>
        <div className="absolute bottom-[78.13%] left-[36px] top-[14.37%] w-[24px]" data-name="Filled 8dp">
          <DotBody />
        </div>
        <div className="absolute bottom-[62.5%] left-[60px] top-[30%] w-[24px]" data-name="Filled 8dp">
          <DotBody />
        </div>
        <div className="absolute bottom-[68.75%] left-[84px] top-[23.75%] w-[24px]" data-name="Filled 8dp">
          <DotBody />
        </div>
        <div className="absolute bottom-[85.63%] left-[-12px] top-[6.88%] w-[24px]" data-name="Filled 8dp">
          <DotBody />
        </div>
        <div className="absolute bottom-[75.94%] left-[132px] top-[16.56%] w-[24px]" data-name="Filled 8dp">
          <DotBody />
        </div>
        <div className="absolute bottom-[59.38%] left-[156px] top-[33.13%] w-[24px]" data-name="Filled 8dp">
          <DotBody />
        </div>
        <div className="absolute bottom-[63.75%] left-[180px] top-[28.75%] w-[24px]" data-name="Filled 8dp">
          <DotBody />
        </div>
        <div className="absolute bottom-[52.81%] left-[204px] top-[39.69%] w-[24px]" data-name="Filled 8dp">
          <DotBody />
        </div>
        <div className="absolute bottom-[53.44%] left-[108px] top-[39.06%] w-[24px]" data-name="Filled 8dp">
          <DotBody />
        </div>
        <div className="absolute bottom-[59.69%] left-[252px] top-[32.81%] w-[24px]" data-name="Filled 8dp">
          <DotBody />
        </div>
        <div className="absolute bottom-[46.88%] left-[276px] top-[45.63%] w-[24px]" data-name="Filled 8dp">
          <DotBody />
        </div>
        <div className="absolute bottom-[54.38%] left-[300px] top-[38.13%] w-[24px]" data-name="Filled 8dp">
          <DotBody />
        </div>
        <div className="absolute bottom-[63.13%] left-[324px] top-[29.38%] w-[24px]" data-name="Filled 8dp">
          <DotBody />
        </div>
        <div className="absolute bottom-[43.44%] left-[348px] top-[49.06%] w-[24px]" data-name="Filled 8dp" />
        <div className="absolute bottom-[47.19%] left-[228px] top-[45.31%] w-[24px]" data-name="Filled 8dp">
          <DotBody />
        </div>
      </div>
      <div className="absolute h-[32px] left-[calc(50%-2px)] shadow-[0px_4px_8px_0px_rgba(84,110,122,0.24)] top-[111px] w-[60px]" data-name="Tooltip">
        <div className="-translate-x-1/2 absolute bottom-[-5.31px] flex items-center justify-center left-1/2 size-[11.314px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
          <div className="flex-none rotate-45">
            <div className="relative rounded-[8px] size-[8px]" data-name="🎨 Colors Dark">
              <div className="absolute bg-[#263238] inset-0 rounded-[1px]" data-name="BG dark" />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 rounded-[8px]" data-name="🎨 Colors Dark">
          <div className="absolute bg-[#263238] inset-0 rounded-[3px]" data-name="BG dark" />
        </div>
        <div className="absolute inset-[18.75%_0]" data-name="12 sp • Caption">
          <div className="absolute capitalize flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[12px] text-center text-white tracking-[0.4px]">
            <p className="leading-[16px]">12 832</p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 h-[48px] left-0 right-0" data-name="Header / Mobile & Tablet">
        <div className="absolute bg-[#263238] inset-0" data-name="Base" />
        <div className="absolute inset-[0_calc(33.33%-64px)]" data-name="Mobile & Tablet / Header / Center / Label">
          <div className="absolute bg-white inset-0" data-name="Base" />
          <Master additionalClassNames="-translate-x-1/2 h-[40px] left-[calc(50%-6px)]">
            <div className="relative shrink-0 size-[24px]" data-name="Left Icon">
              <LineWaveMobileLightIcon additionalClassNames="inset-[13.72%_30.39%_13.72%_27.44%]">
                <path clipRule="evenodd" d={svgPaths.p25748980} fill="var(--fill-0, #607080)" fillRule="evenodd" id="icon" />
              </LineWaveMobileLightIcon>
            </div>
            <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#2e86de] text-[16px] tracking-[0.44px] whitespace-nowrap">yourdomain.com</p>
            <div className="relative shrink-0 size-[24px]" data-name="Right Icon">
              <LineWaveMobileLightIcon additionalClassNames="inset-[13.72%_27.44%_13.72%_30.39%]">
                <path clipRule="evenodd" d={svgPaths.p1458aa00} fill="var(--fill-0, #607080)" fillRule="evenodd" id="icon" />
              </LineWaveMobileLightIcon>
            </div>
          </Master>
        </div>
        <div className="absolute inset-[0_0_0_calc(66.67%+64px)]" data-name="Mobile & Tablet / Header / Right / Label">
          <div className="absolute bg-white inset-0" data-name="Base" />
          <Master additionalClassNames="h-[30px] right-[-25px]">
            <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#263238] text-[16px] text-right tracking-[0.44px] whitespace-nowrap">Details</p>
          </Master>
        </div>
        <LineWaveMobileLightMobileTabletHeaderLeftLabel>
          <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#263238] text-[16px] tracking-[0.44px] whitespace-nowrap">Back</p>
        </LineWaveMobileLightMobileTabletHeaderLeftLabel>
        <div className="absolute contents left-0 right-full top-0" data-name="Dividers">
          <div className="absolute bg-[#cfd8dc] h-px left-0 right-0 top-0" data-name="Divider Top" />
        </div>
      </div>
      <div className="absolute h-[48px] left-0 right-0 top-0" data-name="Header / Mobile & Tablet">
        <div className="absolute bg-[#263238] inset-0" data-name="Base" />
        <div className="absolute inset-[0_calc(33.33%-64px)]" data-name="Mobile & Tablet / Header / Center / Empty">
          <div className="absolute bg-white inset-0" data-name="Base" />
        </div>
        <div className="absolute inset-[0_0_0_calc(66.67%+64px)]" data-name="Mobile & Tablet / Header / Right / Icons & Userpic">
          <div className="absolute bg-white inset-0" data-name="Base" />
          <div className="-translate-y-1/2 absolute content-stretch flex gap-[16px] items-center overflow-clip right-[8px] top-1/2" data-name="Icons & Userpic">
            <div className="overflow-clip relative shrink-0 size-[24px]" data-name="more-horizontal">
              <IconsUserpicVector additionalClassNames="inset-[46.43%]" />
              <IconsUserpicVector additionalClassNames="inset-[46.43%_21.43%_46.43%_71.43%]" />
              <IconsUserpicVector additionalClassNames="inset-[46.43%_71.43%_46.43%_21.43%]" />
            </div>
          </div>
        </div>
        <LineWaveMobileLightMobileTabletHeaderLeftLabel>
          <p className="font-['IBM_Plex_Sans:Medium',sans-serif] leading-[1.28] not-italic relative shrink-0 text-[#263238] text-[20px] tracking-[0.15px] whitespace-nowrap">Site Statistics</p>
        </LineWaveMobileLightMobileTabletHeaderLeftLabel>
        <div className="absolute contents left-0 right-full top-0" data-name="Dividers">
          <div className="absolute bg-[#cfd8dc] bottom-0 h-px left-0 right-0" data-name="Divider Bottom" />
        </div>
      </div>
    </div>
  );
}