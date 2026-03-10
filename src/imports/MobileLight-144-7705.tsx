import clsx from "clsx";
import svgPaths from "./svg-t3u9ab1fg5";
import imgUserpic from "figma:asset/a15caf2b768e1fd07d1e6f6f92fbf31a27e58f06.png";
type MobileLightIconProps = {
  additionalClassNames?: string;
};

function MobileLightIcon({ children, additionalClassNames = "" }: React.PropsWithChildren<MobileLightIconProps>) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.1213 17.4142">
        {children}
      </svg>
    </div>
  );
}
type DotBody2Props = {
  additionalClassNames?: string;
};

function DotBody2({ additionalClassNames = "" }: DotBody2Props) {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[12px] top-1/2">
      <div className="absolute inset-[16.67%]" data-name="🎨 Colors Primary">
        <BgPrimary additionalClassNames="bg-[#f5c324]" />
      </div>
    </div>
  );
}
type BgPrimaryProps = {
  additionalClassNames?: string;
};

function BgPrimary({ additionalClassNames = "" }: BgPrimaryProps) {
  return (
    <div className={clsx("absolute inset-0 rounded-[12px]", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border border-solid border-white inset-[-1px] pointer-events-none rounded-[13px]" />
    </div>
  );
}

function DotBody1() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[12px] top-1/2">
      <div className="absolute inset-[16.67%]" data-name="🎨 Colors Primary">
        <BgPrimary additionalClassNames="bg-[#39c86a]" />
      </div>
    </div>
  );
}

function DotBody() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[12px] top-1/2">
      <div className="absolute bg-[#607d8b] inset-0 rounded-[3px]" data-name="BG primary" />
      <div className="absolute inset-[8.33%]" data-name="🎨 Colors Light">
        <div className="absolute bg-white inset-0 rounded-[2px]" data-name="BG light" />
      </div>
    </div>
  );
}
type NumbersNumberTextProps = {
  text: string;
  additionalClassNames?: string;
};

function NumbersNumberText({ text, additionalClassNames = "" }: NumbersNumberTextProps) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <div className="absolute bg-white inset-0 rounded-[2px] shadow-[0px_4px_8px_0px_rgba(84,110,122,0.24)]" data-name="Numb Badge BG" />
      <div className="absolute flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#263238] text-[10px] text-center tracking-[0.3px]">
        <p className="leading-[14px]">{text}</p>
      </div>
    </div>
  );
}

export default function MobileLight() {
  return (
    <div className="bg-white overflow-clip relative rounded-[8px] shadow-[0px_16px_32px_0px_rgba(176,190,197,0.24),0px_4px_8px_0px_rgba(176,190,197,0.48)] size-full" data-name="Mobile Light">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[302px] left-1/2 top-1/2 w-[264px]" data-name="Radar v4">
        <div className="absolute inset-[1.21%_1.5%]" data-name="Rays">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 256.582 294.715">
            <path d={svgPaths.p6fad440} id="Rays" stroke="var(--stroke-0, #CFD8DC)" />
          </svg>
        </div>
        <div className="absolute contents inset-[1.1%_-6%_0.66%_-6%]" data-name="Web">
          <div className="absolute inset-[43.2%_42%_42.76%_42%]" data-name="Radar Scale 6">
            <div className="absolute inset-[0_6.7%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36.5809 42.386">
                <path d={svgPaths.p32bec180} id="Radar Scale" stroke="var(--stroke-0, #CFD8DC)" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-[36.18%_34%_35.75%_34%]" data-name="Radar Scale 6">
            <div className="absolute inset-[0_6.7%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 73.1618 84.7719">
                <path d={svgPaths.p1c37580} id="Radar Scale" stroke="var(--stroke-0, #CFD8DC)" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-[29.17%_26%_28.73%_26%]" data-name="Radar Scale 6">
            <div className="absolute inset-[0_6.7%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 109.743 127.158">
                <path d={svgPaths.p2e04a280} id="Radar Scale" stroke="var(--stroke-0, #CFD8DC)" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-[22.15%_18%_21.71%_18%]" data-name="Radar Scale 6">
            <div className="absolute inset-[0_6.7%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 146.324 169.544">
                <path d={svgPaths.p1b3440c0} id="Radar Scale" stroke="var(--stroke-0, #CFD8DC)" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-[15.13%_10%_14.69%_10%]" data-name="Radar Scale 6">
            <div className="absolute inset-[0_6.7%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 182.905 211.93">
                <path d={svgPaths.pe8d4800} id="Radar Scale" stroke="var(--stroke-0, #CFD8DC)" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-[8.11%_2%_7.68%_2%]" data-name="Radar Scale 6">
            <div className="absolute inset-[0_6.7%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 219.485 254.316">
                <path d={svgPaths.p3aefc800} id="Radar Scale" stroke="var(--stroke-0, #CFD8DC)" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-[1.1%_-6%_0.66%_-6%]" data-name="Radar Scale 6">
            <div className="absolute inset-[0_6.7%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 256.066 296.702">
                <path d={svgPaths.p2ee35200} id="Radar Scale" stroke="var(--stroke-0, #CFD8DC)" />
              </svg>
            </div>
          </div>
        </div>
        <div className="absolute contents inset-[0_47%_54.39%_47%]" data-name="Numbers">
          <NumbersNumberText text="5" additionalClassNames="inset-[42.11%_47%_54.39%_47%]" />
          <NumbersNumberText text="10" additionalClassNames="inset-[35.09%_47%_61.4%_47%]" />
          <NumbersNumberText text="15" additionalClassNames="inset-[28.07%_47%_68.42%_47%]" />
          <NumbersNumberText text="20" additionalClassNames="inset-[21.05%_47%_75.44%_47%]" />
          <NumbersNumberText text="25" additionalClassNames="inset-[14.04%_47%_82.46%_47%]" />
          <NumbersNumberText text="30" additionalClassNames="inset-[7.02%_47%_89.47%_47%]" />
          <div className="absolute inset-[0_47%_96.49%_47%]" data-name="Number">
            <div className="absolute bg-white border border-[#78909c] border-solid inset-0 rounded-[2px] shadow-[0px_4px_8px_0px_rgba(84,110,122,0.24)]" data-name="Numb Badge BG" />
            <div className="absolute flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#263238] text-[10px] text-center tracking-[0.3px]">
              <p className="leading-[14px]">35</p>
            </div>
          </div>
        </div>
        <div className="absolute contents left-[-6px] top-[103px]" data-name="Dots">
          <div className="absolute inset-[22.59%_-1.5%_72.15%_95.5%] shadow-[0px_4px_8px_0px_rgba(124,77,255,0.16)]" data-name="Square 12dp">
            <DotBody />
          </div>
          <div className="absolute inset-[72.59%_-1.5%_22.15%_95.5%] shadow-[0px_4px_8px_0px_rgba(124,77,255,0.16)]" data-name="Square 12dp">
            <DotBody />
          </div>
          <div className="absolute inset-[72.59%_95.5%_22.15%_-1.5%] shadow-[0px_4px_8px_0px_rgba(124,77,255,0.16)]" data-name="Square 12dp">
            <DotBody />
          </div>
          <div className="absolute inset-[22.59%_95.5%_72.15%_-1.5%] shadow-[0px_4px_8px_0px_rgba(124,77,255,0.16)]" data-name="Square 12dp">
            <DotBody />
          </div>
          <div className="absolute inset-[96.05%_47%_-1.32%_47%] shadow-[0px_4px_8px_0px_rgba(124,77,255,0.16)]" data-name="Square 12dp">
            <DotBody />
          </div>
        </div>
        <div className="absolute contents inset-[26.54%_5.75%_26.75%_7%]" data-name="Data Green">
          <div className="absolute inset-[29.17%_8.63%_29.39%_9.88%]" data-name="Fill">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 215.16 125.171">
              <path d={svgPaths.p18a30180} fill="var(--fill-0, #39C86A)" id="Fill" opacity="0.24" />
            </svg>
          </div>
          <div className="absolute inset-[29.17%_8.63%_29.39%_9.88%]" data-name="Stroke">
            <div className="absolute inset-[-1.05%_-0.48%_-0.84%_-0.58%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 217.446 127.538">
                <path d={svgPaths.p2c889580} id="Stroke" stroke="var(--stroke-0, #39C86A)" strokeWidth="2" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-[36.18%_47%_58.55%_47%]" data-name="Filled 8dp">
            <DotBody1 />
          </div>
          <div className="absolute inset-[31.36%_78.25%_63.38%_15.75%]" data-name="Filled 8dp">
            <DotBody1 />
          </div>
          <div className="absolute inset-[67.98%_87%_26.75%_7%]" data-name="Filled 8dp">
            <DotBody1 />
          </div>
          <div className="absolute inset-[66.45%_47%_28.29%_47%]" data-name="Filled 8dp">
            <DotBody1 />
          </div>
          <div className="absolute inset-[67.76%_7%_26.97%_87%]" data-name="Filled 8dp">
            <DotBody1 />
          </div>
          <div className="absolute inset-[26.54%_5.75%_68.2%_88.25%]" data-name="Filled 8dp">
            <DotBody1 />
          </div>
        </div>
        <div className="absolute contents inset-[19.52%_5.5%_26.1%_5.75%]" data-name="Data Amber">
          <div className="absolute inset-[22.15%_8.5%_28.73%_8.63%]" data-name="Fill">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 218.79 148.351">
              <path d={svgPaths.p2e8cfd00} fill="var(--fill-0, #F5C324)" id="Fill" opacity="0.24" />
            </svg>
          </div>
          <div className="absolute inset-[22.15%_8.5%_28.73%_8.63%]" data-name="Stroke">
            <div className="absolute inset-[-0.72%_-0.87%_-1.19%_-0.83%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 222.516 151.188">
                <path d={svgPaths.p2f728700} id="Stroke" stroke="var(--stroke-0, #F5C324)" strokeWidth="2" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-[19.52%_47%_75.22%_47%]" data-name="Filled 8dp">
            <DotBody2 />
          </div>
          <div className="absolute inset-[26.54%_88.25%_68.2%_5.75%]" data-name="Filled 8dp">
            <DotBody2 />
          </div>
          <div className="absolute inset-[55.26%_62%_39.47%_32%]" data-name="Filled 8dp">
            <DotBody2 />
          </div>
          <div className="absolute inset-[55.26%_47%_39.47%_47%]" data-name="Filled 8dp">
            <DotBody2 />
          </div>
          <div className="absolute inset-[68.64%_5.5%_26.1%_88.5%] shadow-[0px_4px_8px_0px_rgba(84,110,122,0.24)]" data-name="Filled 8dp">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[12px] top-1/2" data-name="Dot Body">
              <div className="absolute inset-[16.67%]" data-name="🎨 Colors Primary">
                <div className="absolute bg-[#f5c324] inset-0 rounded-[12px]" data-name="BG primary">
                  <div aria-hidden="true" className="absolute border-5 border-solid border-white inset-[-5px] pointer-events-none rounded-[17px]" />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-[35.31%_23%_59.43%_71%]" data-name="Filled 8dp">
            <DotBody2 />
          </div>
        </div>
        <div className="absolute contents font-['IBM_Plex_Sans:Regular',sans-serif] inset-[-8.77%_-8.75%_-8.55%_-8.75%] leading-[0] not-italic text-[#607d8b] text-[16px] tracking-[0.44px] whitespace-nowrap" data-name="Caption">
          <div className="absolute flex flex-col inset-[103.29%_44.75%_-8.55%_45%] justify-center text-center">
            <p className="leading-[24px]">2016</p>
          </div>
          <div className="absolute flex flex-col inset-[-8.77%_44.75%_103.51%_45%] justify-center text-center">
            <p className="leading-[24px]">2020</p>
          </div>
          <div className="absolute flex flex-col inset-[15.57%_-8.75%_79.17%_98.5%] justify-center">
            <p className="leading-[24px]">2019</p>
          </div>
          <div className="absolute flex flex-col inset-[15.57%_98.5%_79.17%_-8.75%] justify-center text-right">
            <p className="leading-[24px]">2014</p>
          </div>
          <div className="absolute flex flex-col inset-[79.82%_98.5%_14.91%_-8.75%] justify-center text-right">
            <p className="leading-[24px]">2015</p>
          </div>
          <div className="absolute flex flex-col inset-[79.82%_-8.75%_14.91%_98.5%] justify-center">
            <p className="leading-[24px]">2017</p>
          </div>
        </div>
        <div className="absolute inset-[58.77%_0_32.46%_83%] shadow-[0px_4px_8px_0px_rgba(84,110,122,0.24)]" data-name="Tooltip">
          <div className="-translate-x-1/2 absolute bottom-[-5.31px] flex items-center justify-center left-1/2 size-[11.314px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
            <div className="flex-none rotate-45">
              <div className="relative rounded-[8px] size-[8px]" data-name="🎨 Colors Dark">
                <div className="absolute bg-white inset-0 rounded-[1px]" data-name="BG dark" />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 rounded-[8px]" data-name="🎨 Colors Dark">
            <div className="absolute bg-white inset-0 rounded-[3px]" data-name="BG dark" />
          </div>
          <div className="absolute inset-[18.75%_0]" data-name="12 sp • Caption">
            <div className="absolute flex flex-col font-['IBM_Plex_Sans:Bold',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#607d8b] text-[10px] text-center tracking-[1.5px] uppercase whitespace-nowrap">
              <p className="leading-[16px]">52,6%</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 h-[48px] left-0 right-0" data-name="Mobile & Tablet / Bars / Tab">
        <div className="absolute bg-white inset-0" data-name="Base" />
        <div className="-translate-y-1/2 absolute h-[48px] left-[8px] overflow-clip right-[8px] top-1/2" data-name="Tabs">
          <div className="absolute inset-[8.33%_40.7%] overflow-clip rounded-[4px]" data-name="Tab">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[20px] top-[calc(50%-8px)]" data-name="basic / bar-chart">
              <div className="absolute inset-[12.5%_4.17%]" data-name="icon">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 15">
                  <path clipRule="evenodd" d={svgPaths.p30ce4b00} fill="var(--fill-0, #607080)" fillRule="evenodd" id="icon" />
                </svg>
              </div>
            </div>
            <p className="-translate-x-1/2 absolute capitalize font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] left-1/2 not-italic text-[#263238] text-[12px] text-center top-[calc(50%+2px)] tracking-[0.4px] whitespace-nowrap">Charts</p>
          </div>
          <div className="absolute inset-[8.33%_61.05%_8.33%_20.35%] overflow-clip rounded-[4px]" data-name="Tab">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[20px] top-[calc(50%-8px)]" data-name="basic / search">
              <div className="absolute inset-[8.33%_9.55%_9.55%_8.33%]" data-name="icon">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.4226 16.4226">
                  <path clipRule="evenodd" d={svgPaths.p2ce76330} fill="var(--fill-0, #607080)" fillRule="evenodd" id="icon" />
                </svg>
              </div>
            </div>
            <p className="-translate-x-1/2 absolute capitalize font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] left-1/2 not-italic text-[#263238] text-[12px] text-center top-[calc(50%+2px)] tracking-[0.4px] whitespace-nowrap">Search</p>
          </div>
          <div className="absolute inset-[8.33%_20.35%_8.33%_61.05%] overflow-clip rounded-[4px]" data-name="Tab">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[20px] top-[calc(50%-8px)]" data-name="finance / wallet">
              <div className="absolute inset-[5.52%_8.33%_12.5%_8.33%]" data-name="icon">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 16.3957">
                  <path clipRule="evenodd" d={svgPaths.p20826500} fill="var(--fill-0, #607080)" fillRule="evenodd" id="icon" />
                </svg>
              </div>
            </div>
            <p className="-translate-x-1/2 absolute capitalize font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] left-1/2 not-italic text-[#263238] text-[12px] text-center top-[calc(50%+2px)] tracking-[0.4px] whitespace-nowrap">Balance</p>
          </div>
          <div className="absolute bg-[#e9f0f7] inset-[8.33%_81.4%_8.33%_0] overflow-clip rounded-[4px]" data-name="Tab">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[20px] top-[calc(50%-8px)]" data-name="basic / home">
              <div className="absolute inset-[8.33%_5.08%_8.33%_4.17%]" data-name="icon">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.15 16.6667">
                  <path clipRule="evenodd" d={svgPaths.p1cd82b00} fill="var(--fill-0, #1C5085)" fillRule="evenodd" id="icon" />
                </svg>
              </div>
            </div>
            <p className="-translate-x-1/2 absolute capitalize font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] left-1/2 not-italic text-[#1c5085] text-[12px] text-center top-[calc(50%+2px)] tracking-[0.4px] whitespace-nowrap">Home</p>
          </div>
          <div className="absolute inset-[8.33%_0_8.33%_81.4%] overflow-clip rounded-[4px]" data-name="Tab">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[20px] top-[calc(50%-8px)]" data-name="basic / settings">
              <div className="absolute inset-[4.17%]" data-name="icon">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.334 18.333">
                  <path clipRule="evenodd" d={svgPaths.p1d748000} fill="var(--fill-0, #607080)" fillRule="evenodd" id="icon" />
                </svg>
              </div>
            </div>
            <p className="-translate-x-1/2 absolute capitalize font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] left-1/2 not-italic text-[#263238] text-[12px] text-center top-[calc(50%+2px)] tracking-[0.4px] whitespace-nowrap">Settings</p>
          </div>
        </div>
        <div className="absolute bg-[#cfd8dc] h-px left-0 right-0 top-0" data-name="Divider" />
      </div>
      <div className="absolute h-[48px] left-0 right-0 top-0" data-name="Header / Mobile & Tablet">
        <div className="absolute bg-[#263238] inset-0" data-name="Base" />
        <div className="absolute inset-[0_calc(33.33%-64px)]" data-name="Mobile & Tablet / Header / Center / Label">
          <div className="absolute bg-white inset-0" data-name="Base" />
          <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[40px] left-[calc(50%-6px)] rounded-[20px] top-1/2" data-name="Master">
            <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex gap-[8px] h-full items-center relative">
                <div className="relative shrink-0 size-[24px]" data-name="Left Icon">
                  <MobileLightIcon additionalClassNames="inset-[13.72%_30.39%_13.72%_27.44%]">
                    <path clipRule="evenodd" d={svgPaths.p25748980} fill="var(--fill-0, #607080)" fillRule="evenodd" id="icon" />
                  </MobileLightIcon>
                </div>
                <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#2e86de] text-[16px] tracking-[0.44px] whitespace-nowrap">Yearly</p>
                <div className="relative shrink-0 size-[24px]" data-name="Right Icon">
                  <MobileLightIcon additionalClassNames="inset-[13.72%_27.44%_13.72%_30.39%]">
                    <path clipRule="evenodd" d={svgPaths.p1458aa00} fill="var(--fill-0, #607080)" fillRule="evenodd" id="icon" />
                  </MobileLightIcon>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-[0_0_0_calc(66.67%+64px)]" data-name="Mobile & Tablet / Header / Right / Icons & Userpic">
          <div className="absolute bg-white inset-0" data-name="Base" />
          <div className="-translate-y-1/2 absolute content-stretch flex gap-[16px] items-center overflow-clip right-[8px] top-1/2" data-name="Icons & Userpic">
            <div className="relative shrink-0 size-[40px]" data-name="Userpic mobile">
              <div className="absolute inset-0 rounded-[99px]" data-name="Userpic">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[99px] size-full" src={imgUserpic} />
              </div>
              <div className="absolute inset-[70%_0_0_70%]" data-name="Status">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                  <circle cx="6" cy="6" fill="var(--fill-0, #1DD1A1)" id="Status" r="5" stroke="var(--stroke-0, white)" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-[0_calc(66.67%+64px)_0_0]" data-name="Mobile & Tablet / Header / Left / Icons & Userpic">
          <div className="absolute bg-white inset-0" data-name="Base" />
          <div className="-translate-y-1/2 absolute content-stretch flex gap-[16px] items-center left-[8px] overflow-clip top-1/2" data-name="Icons & Userpic">
            <div className="relative shrink-0 size-[24px]" data-name="basic / search">
              <div className="absolute inset-[8.33%_9.55%_9.55%_8.33%]" data-name="icon">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.7071 19.7071">
                  <path clipRule="evenodd" d={svgPaths.p3bd16800} fill="var(--fill-0, #607080)" fillRule="evenodd" id="icon" />
                </svg>
              </div>
            </div>
            <div className="relative shrink-0 size-[24px]" data-name="basic / box">
              <div className="absolute inset-[12.5%_8.33%]" data-name="icon">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 18">
                  <path clipRule="evenodd" d={svgPaths.p1dae0c00} fill="var(--fill-0, #607080)" fillRule="evenodd" id="icon" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute contents left-0 right-full top-0" data-name="Dividers">
          <div className="absolute bg-[#cfd8dc] bottom-0 h-px left-0 right-0" data-name="Divider Bottom" />
        </div>
      </div>
    </div>
  );
}