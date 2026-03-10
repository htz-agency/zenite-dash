import clsx from "clsx";
import svgPaths from "./svg-kk64c4mntr";
import { imgMiscIconsColorizer } from "./svg-kun1a";

function Wrapper4({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute bottom-1/2 flex items-center justify-center left-1/2 right-[14.74%] top-0">
      <div className="-rotate-90 -scale-y-100 flex-none h-[63.462px] w-[90px]">{children}</div>
    </div>
  );
}
type ColorInfoBarDarkProps = {
  additionalClassNames?: string;
};

function ColorInfoBarDark({ children, additionalClassNames = "" }: React.PropsWithChildren<ColorInfoBarDarkProps>) {
  return (
    <div className={clsx("absolute bottom-0 size-[24px]", additionalClassNames)}>
      <div className="absolute inset-0 rounded-[8px]" data-name="🎨 Colors Dark">
        {children}
      </div>
    </div>
  );
}

function Wrapper3({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute inset-[0_0_0_58.02%]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 37.7832 63.4619">
        {children}
      </svg>
    </div>
  );
}
type Wrapper2Props = {
  additionalClassNames?: string;
};

function Wrapper2({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper2Props>) {
  return (
    <div className={additionalClassNames}>
      <div className="absolute flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[16px] text-white tracking-[0.44px]">{children}</div>
    </div>
  );
}
type Wrapper1Props = {
  additionalClassNames?: string;
};

function Wrapper1({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper1Props>) {
  return (
    <Wrapper2 additionalClassNames={additionalClassNames}>
      <p>{children}</p>
    </Wrapper2>
  );
}
type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = "" }: React.PropsWithChildren<WrapperProps>) {
  return <Wrapper1 additionalClassNames={clsx("absolute h-[24px] opacity-56 top-[125px]", additionalClassNames)}>{children}</Wrapper1>;
}

function Helper6() {
  return (
    <svg fill="none" preserveAspectRatio="none" viewBox="0 0 56 39.4872" className="absolute block size-full">
      <path d={svgPaths.p3d2dcf00} fill="var(--fill-0, #58585E)" id="Fill" />
    </svg>
  );
}

function PieChartsDarkHelper3() {
  return (
    <div className="opacity-24 relative size-full">
      <Helper6 />
    </div>
  );
}

function Helper5() {
  return (
    <svg fill="none" preserveAspectRatio="none" viewBox="0 0 56 39.4872" className="absolute block size-full">
      <path d={svgPaths.p3d2dcf00} fill="var(--fill-0, #ACB9FF)" id="Fill" />
    </svg>
  );
}

function Helper4() {
  return (
    <div className="relative size-full">
      <Helper5 />
    </div>
  );
}
type PieChartsDarkHelper2Props = {
  additionalClassNames?: string;
};

function PieChartsDarkHelper2({ additionalClassNames = "" }: PieChartsDarkHelper2Props) {
  return (
    <div className={clsx("absolute bottom-1/2 flex items-center justify-center left-1/2 right-[14.74%] top-0", additionalClassNames)}>
      <div className="-rotate-90 -scale-y-100 flex-none h-[39.487px] w-[56px]">
        <Helper4 />
      </div>
    </div>
  );
}
type PieChartsDark10SpOverlineTextProps = {
  text: string;
};

function PieChartsDark10SpOverlineText({ text }: PieChartsDark10SpOverlineTextProps) {
  return (
    <div className="-translate-y-1/2 absolute h-[36.923px] left-0 right-0 top-[calc(50%+25.38px)]">
      <div className="absolute flex flex-col font-['IBM_Plex_Sans:Bold',sans-serif] inset-0 justify-center leading-[0] not-italic text-[11.54px] text-center text-white tracking-[1.5px] uppercase">
        <p className="leading-[18.462px]">{text}</p>
      </div>
    </div>
  );
}
type PieChartsDark34SpH4HeadlineTextProps = {
  text: string;
};

function PieChartsDark34SpH4HeadlineText({ text }: PieChartsDark34SpH4HeadlineTextProps) {
  return (
    <div className="-translate-y-1/2 absolute h-[64.615px] left-0 right-0 top-[calc(50%-11.54px)]">
      <div className="absolute flex flex-col font-['IBM_Plex_Sans:Bold',sans-serif] inset-0 justify-center leading-[0] not-italic text-[39.23px] text-center text-white tracking-[-0.3923px]">
        <p className="leading-[normal]">{text}</p>
      </div>
    </div>
  );
}

function Subtract1() {
  return (
    <Wrapper3>
      <path d={svgPaths.p198ae872} fill="var(--fill-0, #7C4DFF)" id="Subtract" />
    </Wrapper3>
  );
}

function PieChartsDarkHelper1() {
  return (
    <div className="relative size-full">
      <Subtract1 />
    </div>
  );
}

function Helper3() {
  return (
    <div className="absolute bottom-0 flex items-center justify-center left-[14.74%] right-1/2 top-1/2">
      <div className="-scale-y-100 flex-none h-[63.462px] rotate-90 w-[90px]">
        <Helper1 />
      </div>
    </div>
  );
}

function Helper2() {
  return (
    <div className="absolute bottom-1/2 flex items-center justify-center left-0 right-1/2 top-[14.74%]">
      <div className="-scale-y-100 flex-none h-[63.462px] rotate-180 w-[90px]">
        <Helper1 />
      </div>
    </div>
  );
}

function Subtract() {
  return (
    <Wrapper3>
      <path d={svgPaths.p198ae872} fill="var(--fill-0, #58585E)" id="Subtract" />
    </Wrapper3>
  );
}

function Helper1() {
  return (
    <div className="relative size-full">
      <Subtract />
    </div>
  );
}

function PieChartsDarkHelper() {
  return (
    <div className="absolute bottom-1/2 flex items-center justify-center left-[14.74%] right-1/2 top-0">
      <div className="-rotate-90 flex-none h-[63.462px] w-[90px]">
        <Helper1 />
      </div>
    </div>
  );
}
type PieChartsDark24SpH5HeadlineTextProps = {
  text: string;
  additionalClassNames?: string;
};

function PieChartsDark24SpH5HeadlineText({ text, additionalClassNames = "" }: PieChartsDark24SpH5HeadlineTextProps) {
  return (
    <div className={clsx("absolute h-[29px] top-[88px]", additionalClassNames)}>
      <p className="absolute font-['IBM_Plex_Sans:Bold',sans-serif] inset-0 leading-[normal] not-italic text-[#94a3b3] text-[24px]">{text}</p>
    </div>
  );
}
type PieChartsDark16SpBodyTextProps = {
  text: string;
  additionalClassNames?: string;
};

function PieChartsDark16SpBodyText({ text, additionalClassNames = "" }: PieChartsDark16SpBodyTextProps) {
  return (
    <Wrapper1 additionalClassNames={clsx("-translate-x-1/2 absolute h-[24px] opacity-56 top-[125px] w-[112px]", additionalClassNames)}>
      <span className="font-['Roboto:Bold',sans-serif] font-bold leading-[24px] text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
        {text}
      </span>
      <span className="leading-[24px]">{` lower`}</span>
    </Wrapper1>
  );
}

function Helper() {
  return (
    <svg fill="none" preserveAspectRatio="none" viewBox="0 0 192 135.385" className="absolute block size-full">
      <path d={svgPaths.p2b8c4d00} fill="var(--fill-0, #ACB9FF)" id="Fill" />
    </svg>
  );
}

function PieLabelsHelper() {
  return (
    <div className="opacity-75 relative size-full">
      <Helper />
    </div>
  );
}
type Emoji24SpH5HeadlineTextProps = {
  text: string;
  additionalClassNames?: string;
};

function Emoji24SpH5HeadlineText({ text, additionalClassNames = "" }: Emoji24SpH5HeadlineTextProps) {
  return (
    <div className={clsx("absolute size-[64px]", additionalClassNames)}>
      <div className="absolute flex flex-col font-['IBM_Plex_Sans:Bold',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#263238] text-[48px] text-center tracking-[-0.6px]">
        <p className="leading-[normal]">{text}</p>
      </div>
    </div>
  );
}
type ColorInfoBarBlueProps = {
  additionalClassNames?: string;
};

function ColorInfoBarBlue({ additionalClassNames = "" }: ColorInfoBarBlueProps) {
  return (
    <div className={clsx("absolute bottom-0 size-[24px]", additionalClassNames)}>
      <div className="absolute inset-0 opacity-80" data-name="🎨 Colors Primary">
        <div className="absolute bg-[#855cf8] inset-0 rounded-[99px]" data-name="BG primary" />
      </div>
    </div>
  );
}
type ColorInfo16SpBodyTextProps = {
  text: string;
  additionalClassNames?: string;
};

function ColorInfo16SpBodyText({ text, additionalClassNames = "" }: ColorInfo16SpBodyTextProps) {
  return (
    <Wrapper2 additionalClassNames={clsx("absolute bottom-0 h-[24px] opacity-80 w-[72px]", additionalClassNames)}>
      <p className="leading-[24px]">{text}</p>
    </Wrapper2>
  );
}

export default function PieChartsDark() {
  return (
    <div className="overflow-clip relative rounded-[8px] size-full" data-name="Pie Charts Dark">
      <div className="absolute inset-[0_-0.15px_0_0] shadow-[0px_16px_32px_0px_rgba(176,190,197,0.24),0px_4px_8px_0px_rgba(176,190,197,0.48)]" data-name="Background Card">
        <div className="absolute bg-[#2e2e33] inset-0 rounded-[8px]" data-name="BG light" />
      </div>
      <div className="-translate-x-1/2 absolute bottom-[271px] h-[29px] left-[calc(75%-6px)] w-[384px]" data-name="24 sp • H5 Headline">
        <p className="absolute font-['IBM_Plex_Sans:Bold',sans-serif] inset-0 leading-[normal] not-italic text-[#94a3b3] text-[24px] text-center">Production status</p>
      </div>
      <PieChartsDark16SpBodyText text="15%" additionalClassNames="left-[calc(58.33%-2px)]" />
      <Wrapper additionalClassNames="-translate-x-1/2 left-[calc(75%-6px)] w-[112px]">
        <span className="font-['Roboto:Bold',sans-serif] font-bold leading-[24px] text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
          19%
        </span>
        <span className="leading-[24px]">{` higher`}</span>
      </Wrapper>
      <PieChartsDark24SpH5HeadlineText text="🍏 Food" additionalClassNames="-translate-x-1/2 left-[calc(58.33%-2px)] w-[112px]" />
      <PieChartsDark24SpH5HeadlineText text="⛱ Travel" additionalClassNames="-translate-x-1/2 left-[calc(75%-6px)] w-[112px]" />
      <PieChartsDark16SpBodyText text="86%" additionalClassNames="left-[calc(91.67%-10px)]" />
      <PieChartsDark24SpH5HeadlineText text="🏡 Rent" additionalClassNames="-translate-x-1/2 left-[calc(91.67%-10px)] w-[112px]" />
      <div className="-translate-x-1/2 absolute bottom-[67px] left-[calc(62.5%-3px)] size-[180px]" data-name="Pie Circular">
        <PieChartsDarkHelper />
        <Helper2 />
        <div className="absolute bottom-[14.74%] flex items-center justify-center left-0 right-1/2 top-1/2">
          <div className="flex-none h-[63.462px] rotate-180 w-[90px]">
            <Helper1 />
          </div>
        </div>
        <Helper3 />
        <div className="absolute bottom-0 flex items-center justify-center left-1/2 right-[14.74%] top-1/2">
          <div className="flex-none h-[63.462px] rotate-90 w-[90px]">
            <Helper1 />
          </div>
        </div>
        <div className="absolute bottom-[14.74%] flex items-center justify-center left-1/2 right-0 top-1/2">
          <div className="-scale-y-100 flex-none h-[63.462px] w-[90px]">
            <PieChartsDarkHelper1 />
          </div>
        </div>
        <div className="absolute bottom-1/2 left-1/2 right-0 top-[14.74%]" data-name="25,0 %">
          <Subtract1 />
        </div>
        <Wrapper4>
          <PieChartsDarkHelper1 />
        </Wrapper4>
        <PieChartsDark34SpH4HeadlineText text="36%" />
        <PieChartsDark10SpOverlineText text="progress" />
      </div>
      <div className="-translate-x-1/2 absolute bottom-[67px] left-[calc(87.5%-9px)] size-[180px]" data-name="Pie Circular">
        <PieChartsDarkHelper />
        <Helper2 />
        <div className="absolute bottom-[14.74%] flex items-center justify-center left-0 right-1/2 top-1/2">
          <div className="flex-none h-[63.462px] rotate-180 w-[90px]">
            <Helper1 />
          </div>
        </div>
        <Helper3 />
        <div className="absolute bottom-0 flex items-center justify-center left-1/2 right-[14.74%] top-1/2">
          <div className="flex-none h-[63.462px] rotate-90 w-[90px]">
            <Helper1 />
          </div>
        </div>
        <div className="absolute bottom-[14.74%] flex items-center justify-center left-1/2 right-0 top-1/2">
          <div className="-scale-y-100 flex-none h-[63.462px] w-[90px]">
            <Helper1 />
          </div>
        </div>
        <div className="absolute bottom-1/2 left-1/2 right-0 top-[14.74%]" data-name="25,0 %">
          <Subtract />
        </div>
        <Wrapper4>
          <div className="relative size-full" data-name="12,5%">
            <Wrapper3>
              <path d={svgPaths.p198ae872} fill="var(--fill-0, white)" id="Subtract" />
            </Wrapper3>
          </div>
        </Wrapper4>
        <PieChartsDark34SpH4HeadlineText text="14%" />
        <PieChartsDark10SpOverlineText text="finished" />
      </div>
      <div className="-translate-x-1/2 absolute left-[calc(58.33%-2px)] size-[112px] top-[173px]" data-name="Pie Purple">
        <div className="absolute inset-0 opacity-48" data-name="🎨 Colors Primary">
          <div className="absolute bg-[#855cf8] inset-0 rounded-[999px]" data-name="BG primary" />
        </div>
        <PieChartsDarkHelper2 additionalClassNames="mix-blend-hard-light" />
      </div>
      <div className="-translate-x-1/2 absolute left-[calc(91.67%-10px)] size-[112px] top-[173px]" data-name="Pie Purple">
        <div className="absolute inset-0 opacity-48" data-name="🎨 Colors Primary">
          <div className="absolute bg-[#855cf8] inset-0 rounded-[999px]" data-name="BG primary" />
        </div>
        <div className="absolute bottom-0 flex items-center justify-center left-[14.74%] mix-blend-hard-light right-1/2 top-1/2">
          <div className="-scale-y-100 flex-none h-[39.487px] rotate-90 w-[56px]">
            <Helper4 />
          </div>
        </div>
        <div className="absolute bottom-0 flex items-center justify-center left-1/2 mix-blend-hard-light right-[14.74%] top-1/2">
          <div className="flex-none h-[39.487px] rotate-90 w-[56px]">
            <Helper4 />
          </div>
        </div>
        <div className="absolute bottom-[14.74%] flex items-center justify-center left-1/2 mix-blend-hard-light right-0 top-1/2">
          <div className="-scale-y-100 flex-none h-[39.487px] w-[56px]">
            <Helper4 />
          </div>
        </div>
        <div className="absolute bottom-1/2 left-1/2 mix-blend-soft-light right-0 top-[14.74%]" data-name="25,0 %">
          <Helper5 />
        </div>
        <PieChartsDarkHelper2 additionalClassNames="mix-blend-soft-light" />
      </div>
      <div className="-translate-x-1/2 absolute left-[calc(75%-6px)] size-[112px] top-[173px]" data-name="Pie Gray">
        <div className="absolute inset-0 opacity-24 rounded-[8px]" data-name="🎨 Colors Dark">
          <div className="absolute bg-white inset-0 rounded-[99px]" data-name="BG dark" />
        </div>
        <div className="absolute bottom-[14.74%] flex items-center justify-center left-1/2 mix-blend-difference right-0 top-1/2">
          <div className="-scale-y-100 flex-none h-[39.487px] w-[56px]">
            <PieChartsDarkHelper3 />
          </div>
        </div>
        <div className="absolute bottom-1/2 left-1/2 mix-blend-difference opacity-24 right-0 top-[14.74%]" data-name="25,0 %">
          <Helper6 />
        </div>
        <div className="absolute bottom-1/2 flex items-center justify-center left-1/2 mix-blend-difference right-[14.74%] top-0">
          <div className="-rotate-90 -scale-y-100 flex-none h-[39.487px] w-[56px]">
            <PieChartsDarkHelper3 />
          </div>
        </div>
      </div>
      <div className="absolute bottom-[271px] right-[24px] size-[32px]" data-name="Settings • ⚙/more_horiz">
        <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[12px_18px] mask-size-[16px_4px]" data-name="Misc …/Icons Colorizer" style={{ maskImage: `url('${imgMiscIconsColorizer}')` }}>
          <div className="absolute bg-[#94a3b3] inset-0" data-name="Icons Colorizer" />
        </div>
      </div>
      <div className="-translate-x-1/2 absolute bottom-[35px] h-[24px] left-[calc(29.17%-1px)] overflow-clip w-[440px]" data-name="Color info">
        <ColorInfo16SpBodyText text="Total" additionalClassNames="left-[32px]" />
        <ColorInfo16SpBodyText text="Gross" additionalClassNames="left-[144px]" />
        <ColorInfo16SpBodyText text="Spent" additionalClassNames="left-[256px]" />
        <ColorInfoBarBlue additionalClassNames="left-0 opacity-40" />
        <ColorInfoBarBlue additionalClassNames="left-[112px]" />
        <ColorInfoBarDark additionalClassNames="left-[224px]">
          <div className="absolute bg-white inset-0 rounded-[99px]" data-name="BG dark" />
        </ColorInfoBarDark>
        <ColorInfo16SpBodyText text="Net" additionalClassNames="left-[368px]" />
        <ColorInfoBarDark additionalClassNames="left-[336px]">
          <div className="absolute bg-[#e289f2] inset-0 rounded-[99px]" data-name="BG dark" />
        </ColorInfoBarDark>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute contents left-[calc(25%+6px)] top-[calc(50%+45px)]" data-name="Pie & Labels">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(25%+6px)] size-[384px] top-[calc(50%+45px)]" data-name="Pie Purple">
          <div className="absolute inset-0 opacity-48" data-name="🎨 Colors Primary">
            <div className="absolute bg-[#855cf8] inset-0 rounded-[999px]" data-name="BG primary" />
          </div>
          <div className="absolute bottom-[14.74%] flex items-center justify-center left-1/2 mix-blend-hard-light right-0 top-1/2">
            <div className="-scale-y-100 flex-none h-[135.385px] w-[192px]">
              <PieLabelsHelper />
            </div>
          </div>
          <div className="absolute bottom-1/2 left-1/2 mix-blend-hard-light opacity-75 right-0 top-[14.74%]" data-name="25,0 %">
            <Helper />
          </div>
          <div className="absolute bottom-1/2 flex items-center justify-center left-1/2 mix-blend-multiply right-[14.74%] top-0">
            <div className="-rotate-90 -scale-y-100 flex-none h-[135.385px] w-[192px]">
              <PieLabelsHelper />
            </div>
          </div>
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[206px] left-[calc(25%+14px)] overflow-clip top-[calc(50%-20px)] w-[296px]" data-name="Emoji">
          <Emoji24SpH5HeadlineText text="💼" additionalClassNames="left-0 top-[142px]" />
          <Emoji24SpH5HeadlineText text="💵" additionalClassNames="left-[158px] top-0" />
          <Emoji24SpH5HeadlineText text="⚙" additionalClassNames="left-[232px] top-[122px]" />
        </div>
      </div>
      <div className="absolute h-[64px] left-0 right-0 top-0" data-name="Header / Desktop">
        <div className="absolute bg-[#171719] bottom-[-1px] h-px left-0 right-0" data-name="Divider" />
        <div className="absolute bottom-0 left-0 top-0 w-[360px]" data-name="Left / Logo">
          <div className="absolute bg-[#393940] inset-0" data-name="Base" />
          <div className="-translate-y-1/2 absolute content-stretch flex gap-[16px] items-center left-[24px] overflow-clip top-1/2" data-name="Logo & Title">
            <div className="overflow-clip relative shrink-0 size-[48px]" data-name="Logo">
              <div className="absolute bg-gradient-to-b from-[#ce9ffc] from-[17.857%] inset-0 rounded-[99px] to-[#7367f0] to-[108.93%]" data-name="Logo" />
              <div className="absolute flex flex-col font-['IBM_Plex_Sans:Bold',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#393940] text-[24px] text-center">
                <p className="leading-[normal]">C</p>
              </div>
            </div>
            <p className="font-['IBM_Plex_Sans:Bold',sans-serif] h-[44px] leading-[normal] not-italic relative shrink-0 text-[34px] text-white tracking-[-0.34px] w-[240px]">Caption Bars</p>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 top-0 w-[360px]" data-name="Right / Pagination">
          <div className="absolute bg-[#393940] inset-0" data-name="Base" />
          <div className="-translate-y-1/2 absolute content-stretch flex gap-[16px] items-center overflow-clip right-[24px] top-1/2" data-name="Label & Pagination">
            <div className="bg-[#45454c] h-[40px] relative rounded-[32px] shrink-0" data-name="Master">
              <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                <div className="content-stretch flex gap-[8px] h-full items-center px-[16px] relative">
                  <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#d3dde7] text-[16px] tracking-[0.44px] whitespace-nowrap">Last 7 Days</p>
                  <div className="relative shrink-0 size-[24px]" data-name="Right Icon">
                    <div className="absolute inset-[30.39%_13.72%_27.44%_13.72%]" data-name="icon">
                      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.4142 10.1213">
                        <path clipRule="evenodd" d={svgPaths.p22263c00} fill="var(--fill-0, #D3DDE7)" fillRule="evenodd" id="icon" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-[0_360px]" data-name="Center / Empty">
          <div className="absolute bg-[#393940] inset-0" data-name="Base" />
        </div>
      </div>
      <PieChartsDark24SpH5HeadlineText text="Spent this month" additionalClassNames="left-[24px] w-[384px]" />
      <Wrapper additionalClassNames="left-[24px] w-[384px]">
        <span className="font-['Roboto:Bold',sans-serif] font-bold leading-[24px] text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
          357%
        </span>
        <span className="leading-[24px]">{` higher than last week`}</span>
      </Wrapper>
    </div>
  );
}