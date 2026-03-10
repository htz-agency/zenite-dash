import clsx from "clsx";
import svgPaths from "./svg-a72o8s3p6g";
type Wrapper2Props = {
  additionalClassNames?: string;
};

function Wrapper2({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper2Props>) {
  return (
    <div className={additionalClassNames}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 78 55">
        {children}
      </svg>
    </div>
  );
}

function Wrapper1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute inset-[0_0_0_58.02%]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32.7451 55">
        {children}
      </svg>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute bottom-1/2 flex items-center justify-center left-1/2 right-[14.74%] top-0">
      <div className="-rotate-90 -scale-y-100 flex-none h-[55px] w-[78px]">
        <div className="relative size-full" data-name="12,5%">
          {children}
        </div>
      </div>
    </div>
  );
}

function PieChartsMobileDarkSubtract() {
  return (
    <Wrapper1>
      <path d={svgPaths.p54ed1c0} fill="var(--fill-0, white)" id="Subtract" />
    </Wrapper1>
  );
}

function PieChartsMobileDarkHelper() {
  return (
    <div className="relative size-full">
      <Wrapper1>
        <path d={svgPaths.p54ed1c0} fill="var(--fill-0, #58585E)" id="Subtract" />
      </Wrapper1>
    </div>
  );
}
type PieChartsMobileDark16SpBodyTextProps = {
  text: string;
  additionalClassNames?: string;
};

function PieChartsMobileDark16SpBodyText({ text, additionalClassNames = "" }: PieChartsMobileDark16SpBodyTextProps) {
  return (
    <div className={clsx("-translate-x-1/2 -translate-y-1/2 absolute h-[24px] opacity-80 w-[156px]", additionalClassNames)}>
      <div className="absolute flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[16px] text-center text-white tracking-[0.44px]">
        <p className="leading-[24px]">{text}</p>
      </div>
    </div>
  );
}

function PieChartsMobileDarkFill() {
  return (
    <Wrapper2 additionalClassNames="absolute inset-0 mix-blend-difference">
      <g id="Fill" style={{ mixBlendMode: "difference" }}>
        <path d={svgPaths.p3972770} fill="var(--fill-0, #58585E)" />
      </g>
    </Wrapper2>
  );
}
type PieChartsMobileDarkTextProps = {
  text: string;
  additionalClassNames?: string;
};

function PieChartsMobileDarkText({ text, additionalClassNames = "" }: PieChartsMobileDarkTextProps) {
  return (
    <div className={clsx("absolute bottom-[70px] h-[16px] opacity-56", additionalClassNames)}>
      <div className="absolute flex flex-col font-['IBM_Plex_Sans:Bold',sans-serif] inset-0 justify-center leading-[0] not-italic text-[10px] text-center text-white tracking-[1.5px] uppercase">
        <p className="leading-[16px]">{text}</p>
      </div>
    </div>
  );
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

function PieCaptions1Helper1() {
  return (
    <svg fill="none" preserveAspectRatio="none" viewBox="0 0 78 55" className="absolute block size-full">
      <path d={svgPaths.p3972770} fill="var(--fill-0, white)" id="Fill" />
    </svg>
  );
}

function PieCaptions1Helper() {
  return (
    <Wrapper2 additionalClassNames="relative size-full">
      <path d={svgPaths.p3972770} fill="var(--fill-0, #58585E)" id="Fill" />
    </Wrapper2>
  );
}
type Helper14SpSubtitleTextProps = {
  text: string;
  additionalClassNames?: string;
};

function Helper14SpSubtitleText({ text, additionalClassNames = "" }: Helper14SpSubtitleTextProps) {
  return (
    <div className={clsx("-translate-x-1/2 -translate-y-1/2 absolute h-[24px] w-[62px]", additionalClassNames)}>
      <div className="absolute flex flex-col font-['IBM_Plex_Sans:Bold',sans-serif] inset-0 justify-center leading-[0] not-italic text-[14px] text-center text-white tracking-[0.1px]">
        <p className="leading-[24px]">{text}</p>
      </div>
    </div>
  );
}

function Helper() {
  return (
    <svg fill="none" preserveAspectRatio="none" viewBox="0 0 78 55" className="absolute block size-full">
      <path d={svgPaths.p3972770} fill="var(--fill-0, #CFBEF0)" id="Fill" />
    </svg>
  );
}

function PieCaptionsHelper() {
  return (
    <div className="relative size-full">
      <Helper />
    </div>
  );
}

export default function PieChartsMobileDark() {
  return (
    <div className="overflow-clip relative rounded-[8px] size-full" data-name="Pie Charts Mobile Dark">
      <div className="absolute inset-0 shadow-[0px_16px_32px_0px_rgba(176,190,197,0.24),0px_4px_8px_0px_rgba(176,190,197,0.48)]" data-name="Background Card">
        <div className="absolute bg-[#2e2e33] inset-0 rounded-[8px]" data-name="BG light" />
      </div>
      <PieChartsMobileDarkText text="omg!" additionalClassNames="left-[73.89%] right-[4.44%]" />
      <PieChartsMobileDarkText text="Fast" additionalClassNames="left-[50.83%] right-[27.5%]" />
      <PieChartsMobileDarkText text="med" additionalClassNames="left-[27.5%] right-[50.83%]" />
      <PieChartsMobileDarkText text="low" additionalClassNames="left-[4.44%] right-[73.89%]" />
      <div className="absolute bottom-[90px] h-[16px] left-[73.89%] right-[4.44%]" data-name="Heatmap 75-100%">
        <div className="absolute bg-white inset-0" data-name="BG primary" />
      </div>
      <div className="absolute bottom-[90px] h-[16px] left-[50.83%] right-[27.5%]" data-name="Heatmap 50-75%">
        <div className="absolute bg-[#855cf8] inset-0" data-name="BG primary" />
      </div>
      <div className="absolute bottom-[90px] h-[16px] left-[27.5%] right-[50.83%]" data-name="Heatmap 25-50%">
        <div className="absolute inset-0 opacity-48" data-name="🎨 Colors Primary">
          <div className="absolute bg-[#855cf8] inset-0" data-name="BG primary" />
        </div>
      </div>
      <div className="absolute bottom-[90px] h-[16px] left-[4.44%] right-[73.89%]" data-name="Heatmap 0-25%">
        <div className="absolute inset-0 opacity-16" data-name="🎨 Colors Primary">
          <div className="absolute bg-white inset-0" data-name="BG primary" />
        </div>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(75%-4px)] size-[156px] top-[calc(50%-159px)]" data-name="Pie Gray">
        <div className="absolute inset-0 opacity-24 rounded-[8px]" data-name="🎨 Colors Dark">
          <div className="absolute bg-white inset-0 rounded-[99px]" data-name="BG dark" />
        </div>
        <div className="absolute bottom-1/2 left-1/2 mix-blend-difference opacity-24 right-0 top-[14.74%]" data-name="25,0 %">
          <PieChartsMobileDarkFill />
        </div>
        <div className="absolute bottom-1/2 flex items-center justify-center left-1/2 mix-blend-difference right-[14.74%] top-0">
          <div className="-rotate-90 -scale-y-100 flex-none h-[55px] w-[78px]">
            <div className="opacity-24 relative size-full" data-name="12,5%">
              <PieChartsMobileDarkFill />
            </div>
          </div>
        </div>
      </div>
      <PieChartsMobileDark16SpBodyText text="Filled exclusion" additionalClassNames="left-[calc(25%+4px)] top-[calc(50%-53px)]" />
      <PieChartsMobileDark16SpBodyText text="Color play" additionalClassNames="left-[calc(25%+4px)] top-[calc(50%+175px)]" />
      <PieChartsMobileDark16SpBodyText text="Toggle blending" additionalClassNames="left-[calc(75%-4px)] top-[calc(50%-53px)]" />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[175px] left-[calc(25%+8px)] overflow-clip top-[calc(50%-168.5px)] w-[164px]" data-name="Pie & Captions">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%-4px)] size-[156px] top-[calc(50%+9.5px)]" data-name="Pie Purple">
          <div className="absolute inset-0 opacity-48" data-name="🎨 Colors Primary">
            <div className="absolute bg-[#855cf8] inset-0 rounded-[999px]" data-name="BG primary" />
          </div>
          <div className="absolute bottom-[14.74%] flex items-center justify-center left-1/2 mix-blend-overlay right-0 top-1/2">
            <div className="-scale-y-100 flex-none h-[55px] w-[78px]">
              <PieCaptionsHelper />
            </div>
          </div>
          <div className="absolute bottom-1/2 left-1/2 mix-blend-hard-light right-0 top-[14.74%]" data-name="25,0 %">
            <Helper />
          </div>
          <div className="absolute bottom-1/2 flex items-center justify-center left-1/2 mix-blend-multiply right-[14.74%] top-0">
            <div className="-rotate-90 -scale-y-100 flex-none h-[55px] w-[78px]">
              <PieCaptionsHelper />
            </div>
          </div>
        </div>
        <Helper14SpSubtitleText text="Salary" additionalClassNames="left-[calc(50%-36px)] top-[calc(50%+45.5px)]" />
        <Helper14SpSubtitleText text="Sales" additionalClassNames="left-[calc(50%+35px)] top-[calc(50%+9.5px)]" />
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[24px] left-[calc(50%+51px)] top-[calc(50%-75.5px)] w-[62px]" data-name="14 sp • Subtitle 2">
          <div className="absolute flex flex-col font-['IBM_Plex_Sans:Bold',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#9f7de1] text-[14px] text-center tracking-[0.1px]">
            <p className="leading-[24px]">Other</p>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(25%+4px)] overflow-clip size-[156px] top-[calc(50%+69px)]" data-name="Pie & Captions">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[156px] top-1/2" data-name="Pie Blue">
          <div className="absolute bg-[#855cf8] inset-0 rounded-[999px]" data-name="BG primary" />
          <div className="absolute bottom-0 flex items-center justify-center left-[14.74%] right-1/2 top-1/2">
            <div className="-scale-y-100 flex-none h-[55px] rotate-90 w-[78px]">
              <PieCaptions1Helper />
            </div>
          </div>
          <div className="absolute bottom-0 flex items-center justify-center left-1/2 right-[14.74%] top-1/2">
            <div className="flex-none h-[55px] rotate-90 w-[78px]">
              <PieCaptions1Helper />
            </div>
          </div>
          <div className="absolute bottom-[14.74%] flex items-center justify-center left-1/2 right-0 top-1/2">
            <div className="-scale-y-100 flex-none h-[55px] w-[78px]">
              <Wrapper2 additionalClassNames="relative size-full">
                <path d={svgPaths.p3972770} fill="var(--fill-0, #45454C)" id="Fill" />
              </Wrapper2>
            </div>
          </div>
          <div className="absolute bottom-1/2 left-1/2 right-0 top-[14.74%]" data-name="25,0 %">
            <PieCaptions1Helper1 />
          </div>
          <Wrapper>
            <PieCaptions1Helper1 />
          </Wrapper>
        </div>
        <Helper14SpSubtitleText text="Sketch" additionalClassNames="left-[calc(50%-32px)] top-[calc(50%-22px)]" />
        <Helper14SpSubtitleText text="Figma" additionalClassNames="left-1/2 top-[calc(50%+56px)]" />
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[24px] left-[calc(50%+31px)] top-[calc(50%-41px)] w-[62px]" data-name="14 sp • Subtitle 2">
          <div className="absolute flex flex-col font-['IBM_Plex_Sans:Bold',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#263238] text-[14px] text-center tracking-[0.1px]">
            <p className="leading-[24px]">XD</p>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(75%-4px)] size-[156px] top-[calc(50%+69px)]" data-name="Pie Circular">
        <div className="absolute bottom-1/2 flex items-center justify-center left-[14.74%] right-1/2 top-0">
          <div className="-rotate-90 flex-none h-[55px] w-[78px]">
            <PieChartsMobileDarkHelper />
          </div>
        </div>
        <div className="absolute bottom-1/2 flex items-center justify-center left-0 right-1/2 top-[14.74%]">
          <div className="-scale-y-100 flex-none h-[55px] rotate-180 w-[78px]">
            <PieChartsMobileDarkHelper />
          </div>
        </div>
        <div className="absolute bottom-[14.74%] flex items-center justify-center left-0 right-1/2 top-1/2">
          <div className="flex-none h-[55px] rotate-180 w-[78px]">
            <PieChartsMobileDarkHelper />
          </div>
        </div>
        <div className="absolute bottom-0 flex items-center justify-center left-[14.74%] right-1/2 top-1/2">
          <div className="-scale-y-100 flex-none h-[55px] rotate-90 w-[78px]">
            <PieChartsMobileDarkHelper />
          </div>
        </div>
        <div className="absolute bottom-0 flex items-center justify-center left-1/2 right-[14.74%] top-1/2">
          <div className="flex-none h-[55px] rotate-90 w-[78px]">
            <PieChartsMobileDarkHelper />
          </div>
        </div>
        <div className="absolute bottom-[14.74%] flex items-center justify-center left-1/2 right-0 top-1/2">
          <div className="-scale-y-100 flex-none h-[55px] w-[78px]">
            <PieChartsMobileDarkHelper />
          </div>
        </div>
        <div className="absolute bottom-1/2 left-1/2 right-0 top-[14.74%]" data-name="25,0 %">
          <PieChartsMobileDarkSubtract />
        </div>
        <Wrapper>
          <PieChartsMobileDarkSubtract />
        </Wrapper>
        <div className="-translate-y-1/2 absolute h-[56px] left-0 right-0 top-[calc(50%-10px)]" data-name="34 sp • H4 Headline">
          <div className="absolute flex flex-col font-['IBM_Plex_Sans:Bold',sans-serif] inset-0 justify-center leading-[0] not-italic text-[34px] text-center text-white tracking-[-0.34px]">
            <p className="leading-[normal]">25,0%</p>
          </div>
        </div>
        <div className="-translate-y-1/2 absolute h-[32px] left-0 right-0 top-[calc(50%+22px)]" data-name="10 sp • OVERLINE">
          <div className="absolute flex flex-col font-['IBM_Plex_Sans:Bold',sans-serif] inset-0 justify-center leading-[0] not-italic text-[10px] text-center text-white tracking-[1.5px] uppercase">
            <p className="leading-[16px]">progress</p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 h-[48px] left-0 right-0" data-name="Mobile & Tablet / Bars / Tab">
        <div className="absolute bg-[#393940] inset-0" data-name="Base" />
        <div className="-translate-y-1/2 absolute h-[48px] left-[8px] overflow-clip right-[8px] top-1/2" data-name="Tabs">
          <div className="absolute inset-[8.33%_40.7%] overflow-clip rounded-[4px]" data-name="Tab">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[20px] top-[calc(50%-8px)]" data-name="basic / bar-chart">
              <div className="absolute inset-[12.5%_4.17%]" data-name="icon">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 15">
                  <path clipRule="evenodd" d={svgPaths.p30ce4b00} fill="var(--fill-0, #94A3B3)" fillRule="evenodd" id="icon" />
                </svg>
              </div>
            </div>
            <p className="-translate-x-1/2 absolute capitalize font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] left-1/2 not-italic text-[#94a3b3] text-[12px] text-center top-[calc(50%+2px)] tracking-[0.4px] whitespace-nowrap">Charts</p>
          </div>
          <div className="absolute inset-[8.33%_61.05%_8.33%_20.35%] overflow-clip rounded-[4px]" data-name="Tab">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[20px] top-[calc(50%-8px)]" data-name="basic / search">
              <div className="absolute inset-[8.33%_9.55%_9.55%_8.33%]" data-name="icon">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.4226 16.4226">
                  <path clipRule="evenodd" d={svgPaths.p2ce76330} fill="var(--fill-0, #94A3B3)" fillRule="evenodd" id="icon" />
                </svg>
              </div>
            </div>
            <p className="-translate-x-1/2 absolute capitalize font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] left-1/2 not-italic text-[#94a3b3] text-[12px] text-center top-[calc(50%+2px)] tracking-[0.4px] whitespace-nowrap">Search</p>
          </div>
          <div className="absolute inset-[8.33%_20.35%_8.33%_61.05%] overflow-clip rounded-[4px]" data-name="Tab">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[20px] top-[calc(50%-8px)]" data-name="finance / wallet">
              <div className="absolute inset-[5.52%_8.33%_12.5%_8.33%]" data-name="icon">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 16.3957">
                  <path clipRule="evenodd" d={svgPaths.p20826500} fill="var(--fill-0, #94A3B3)" fillRule="evenodd" id="icon" />
                </svg>
              </div>
            </div>
            <p className="-translate-x-1/2 absolute capitalize font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] left-1/2 not-italic text-[#94a3b3] text-[12px] text-center top-[calc(50%+2px)] tracking-[0.4px] whitespace-nowrap">Balance</p>
          </div>
          <div className="absolute bg-[#e9f0f7] inset-[8.33%_81.4%_8.33%_0] overflow-clip rounded-[4px]" data-name="Tab">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[20px] top-[calc(50%-8px)]" data-name="basic / home">
              <div className="absolute inset-[8.33%_5.08%_8.33%_4.17%]" data-name="icon">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.15 16.6667">
                  <path clipRule="evenodd" d={svgPaths.p1cd82b00} fill="var(--fill-0, #FECA57)" fillRule="evenodd" id="icon" />
                </svg>
              </div>
            </div>
            <p className="-translate-x-1/2 absolute capitalize font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] left-1/2 not-italic text-[#feca57] text-[12px] text-center top-[calc(50%+2px)] tracking-[0.4px] whitespace-nowrap">Home</p>
          </div>
          <div className="absolute inset-[8.33%_0_8.33%_81.4%] overflow-clip rounded-[4px]" data-name="Tab">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[20px] top-[calc(50%-8px)]" data-name="basic / settings">
              <div className="absolute inset-[4.17%]" data-name="icon">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.334 18.333">
                  <path clipRule="evenodd" d={svgPaths.p1d748000} fill="var(--fill-0, #94A3B3)" fillRule="evenodd" id="icon" />
                </svg>
              </div>
            </div>
            <p className="-translate-x-1/2 absolute capitalize font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] left-1/2 not-italic text-[#94a3b3] text-[12px] text-center top-[calc(50%+2px)] tracking-[0.4px] whitespace-nowrap">Settings</p>
          </div>
        </div>
        <div className="absolute bg-[#171719] h-px left-0 right-0 top-0" data-name="Divider" />
      </div>
      <div className="absolute h-[48px] left-0 right-0 top-0" data-name="Header / Mobile & Tablet">
        <div className="absolute bg-[#263238] inset-0" data-name="Base" />
        <div className="absolute inset-[0_calc(33.33%-64px)]" data-name="Mobile & Tablet / Header / Center / Empty">
          <div className="absolute bg-[#393940] inset-0" data-name="Base" />
        </div>
        <div className="absolute inset-[0_0_0_calc(66.67%+64px)]" data-name="Mobile & Tablet / Header / Right / Icons & Userpic">
          <div className="absolute bg-[#393940] inset-0" data-name="Base" />
          <div className="-translate-y-1/2 absolute content-stretch flex gap-[16px] items-center overflow-clip right-[8px] top-1/2" data-name="Icons & Userpic">
            <div className="overflow-clip relative shrink-0 size-[24px]" data-name="more-horizontal">
              <IconsUserpicVector additionalClassNames="inset-[46.43%]" />
              <IconsUserpicVector additionalClassNames="inset-[46.43%_21.43%_46.43%_71.43%]" />
              <IconsUserpicVector additionalClassNames="inset-[46.43%_71.43%_46.43%_21.43%]" />
            </div>
          </div>
        </div>
        <div className="absolute inset-[0_calc(66.67%+64px)_0_0]" data-name="Mobile & Tablet / Header / Left / Label">
          <div className="absolute bg-[#393940] inset-0" data-name="Base" />
          <div className="-translate-y-1/2 absolute h-[30px] left-[8px] rounded-[20px] top-1/2" data-name="Master">
            <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex gap-[8px] h-full items-center relative">
                <p className="font-['IBM_Plex_Sans:Medium',sans-serif] leading-[1.28] not-italic relative shrink-0 text-[20px] text-white tracking-[0.15px] whitespace-nowrap">Income</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute contents left-0 right-full top-0" data-name="Dividers">
          <div className="absolute bg-[#171719] bottom-0 h-px left-0 right-0" data-name="Divider Bottom" />
        </div>
      </div>
    </div>
  );
}