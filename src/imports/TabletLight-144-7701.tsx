import clsx from "clsx";
import svgPaths from "./svg-73k95lw9rw";
import imgUserpic from "figma:asset/a15caf2b768e1fd07d1e6f6f92fbf31a27e58f06.png";
type TabletLightIconProps = {
  additionalClassNames?: string;
};

function TabletLightIcon({ children, additionalClassNames = "" }: React.PropsWithChildren<TabletLightIconProps>) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.1213 17.4142">
        {children}
      </svg>
    </div>
  );
}

function DataAccentHelper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute flex inset-[22.15%_13.49%_28.73%_13.82%] items-center justify-center">
      <div className="-scale-y-100 flex-none h-[224px] rotate-180 w-[331.5px]">{children}</div>
    </div>
  );
}
type HelperProps = {
  additionalClassNames?: string;
};

function Helper({ additionalClassNames = "" }: HelperProps) {
  return (
    <div className={clsx("absolute flex items-center justify-center", additionalClassNames)}>
      <div className="-scale-y-100 flex-none rotate-180 size-[24px]">
        <div className="relative size-full" data-name="Filled 8dp">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[12px] top-1/2">
            <div className="absolute inset-[16.67%]" data-name="🎨 Colors Primary">
              <BgPrimary additionalClassNames="bg-[#855cf8]" />
            </div>
          </div>
        </div>
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
        <BgPrimary additionalClassNames="bg-[#607d8b]" />
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

export default function TabletLight() {
  return (
    <div className="bg-white overflow-clip relative rounded-[8px] shadow-[0px_16px_32px_0px_rgba(176,190,197,0.24),0px_4px_8px_0px_rgba(176,190,197,0.48)] size-full" data-name="Tablet Light">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[560px] top-1/2" data-name="Radar v2">
        <div className="absolute inset-[1.21%_0.99%]" data-name="Rays">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 548.947 546.491">
            <path d={svgPaths.p2570f580} id="Rays" stroke="var(--stroke-0, #CFD8DC)" />
          </svg>
        </div>
        <div className="absolute contents inset-[1.1%_0.88%_0.66%_0.88%]" data-name="Web">
          <div className="absolute inset-[43.2%_42.98%_42.76%_42.98%]" data-name="Radar Scale 12">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 78.5965 78.5965">
              <path d={svgPaths.p3ffdd140} id="Radar Scale" stroke="var(--stroke-0, #CFD8DC)" />
            </svg>
          </div>
          <div className="absolute inset-[36.18%_35.96%_35.75%_35.96%]" data-name="Radar Scale 12">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 157.193 157.193">
              <path d={svgPaths.p25525f80} id="Radar Scale" stroke="var(--stroke-0, #CFD8DC)" />
            </svg>
          </div>
          <div className="absolute inset-[29.17%_28.95%_28.73%_28.95%]" data-name="Radar Scale 12">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 235.789 235.789">
              <path d={svgPaths.p10bbc00} id="Radar Scale" stroke="var(--stroke-0, #CFD8DC)" />
            </svg>
          </div>
          <div className="absolute inset-[22.15%_21.93%_21.71%_21.93%]" data-name="Radar Scale 12">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 314.386 314.386">
              <path d={svgPaths.p1bf7bb00} id="Radar Scale" stroke="var(--stroke-0, #CFD8DC)" />
            </svg>
          </div>
          <div className="absolute inset-[15.13%_14.91%_14.69%_14.91%]" data-name="Radar Scale 12">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 392.982 392.982">
              <path d={svgPaths.pb8ea400} id="Radar Scale" stroke="var(--stroke-0, #CFD8DC)" />
            </svg>
          </div>
          <div className="absolute inset-[8.11%_7.89%_7.68%_7.89%]" data-name="Radar Scale 12">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 471.579 471.579">
              <path d={svgPaths.pd8eb070} id="Radar Scale" stroke="var(--stroke-0, #CFD8DC)" />
            </svg>
          </div>
          <div className="absolute inset-[1.1%_0.88%_0.66%_0.88%]" data-name="Radar Scale 12">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 550.175 550.175">
              <path d={svgPaths.p3fd2c300} id="Radar Scale" stroke="var(--stroke-0, #CFD8DC)" />
            </svg>
          </div>
        </div>
        <div className="absolute contents inset-[0_47.37%_54.39%_47.37%]" data-name="Numbers">
          <NumbersNumberText text="5" additionalClassNames="inset-[42.11%_47.37%_54.39%_47.37%]" />
          <NumbersNumberText text="10" additionalClassNames="inset-[35.09%_47.37%_61.4%_47.37%]" />
          <NumbersNumberText text="15" additionalClassNames="inset-[28.07%_47.37%_68.42%_47.37%]" />
          <NumbersNumberText text="20" additionalClassNames="inset-[21.05%_47.37%_75.44%_47.37%]" />
          <NumbersNumberText text="25" additionalClassNames="inset-[14.04%_47.37%_82.46%_47.37%]" />
          <NumbersNumberText text="30" additionalClassNames="inset-[7.02%_47.37%_89.47%_47.37%]" />
          <div className="absolute inset-[0_47.37%_96.49%_47.37%]" data-name="Number">
            <div className="absolute bg-white border border-[#78909c] border-solid inset-0 rounded-[2px] shadow-[0px_4px_8px_0px_rgba(84,110,122,0.24)]" data-name="Numb Badge BG" />
            <div className="absolute flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#263238] text-[10px] text-center tracking-[0.3px]">
              <p className="leading-[14px]">35</p>
            </div>
          </div>
        </div>
        <div className="absolute contents left-[-6px] top-[23px]" data-name="Dots">
          <div className="absolute inset-[22.59%_4.82%_72.15%_89.91%] shadow-[0px_4px_8px_0px_rgba(124,77,255,0.16)]" data-name="Square 12dp">
            <DotBody />
          </div>
          <div className="absolute inset-[47.59%_-1.32%_47.15%_96.05%] shadow-[0px_4px_8px_0px_rgba(124,77,255,0.16)]" data-name="Square 12dp">
            <DotBody />
          </div>
          <div className="absolute inset-[47.59%_96.05%_47.15%_-1.32%] shadow-[0px_4px_8px_0px_rgba(124,77,255,0.16)]" data-name="Square 12dp">
            <DotBody />
          </div>
          <div className="absolute inset-[72.59%_4.82%_22.15%_89.91%] shadow-[0px_4px_8px_0px_rgba(124,77,255,0.16)]" data-name="Square 12dp">
            <DotBody />
          </div>
          <div className="absolute inset-[72.59%_89.91%_22.15%_4.82%] shadow-[0px_4px_8px_0px_rgba(124,77,255,0.16)]" data-name="Square 12dp">
            <DotBody />
          </div>
          <div className="absolute inset-[22.59%_89.91%_72.15%_4.82%] shadow-[0px_4px_8px_0px_rgba(124,77,255,0.16)]" data-name="Square 12dp">
            <DotBody />
          </div>
          <div className="absolute inset-[5.04%_22.37%_89.69%_72.37%] shadow-[0px_4px_8px_0px_rgba(124,77,255,0.16)]" data-name="Square 12dp">
            <DotBody />
          </div>
          <div className="absolute inset-[5.04%_72.37%_89.69%_22.37%] shadow-[0px_4px_8px_0px_rgba(124,77,255,0.16)]" data-name="Square 12dp">
            <DotBody />
          </div>
          <div className="absolute inset-[90.13%_22.37%_4.61%_72.37%] shadow-[0px_4px_8px_0px_rgba(124,77,255,0.16)]" data-name="Square 12dp">
            <DotBody />
          </div>
          <div className="absolute inset-[90.13%_72.37%_4.61%_22.37%] shadow-[0px_4px_8px_0px_rgba(124,77,255,0.16)]" data-name="Square 12dp">
            <DotBody />
          </div>
          <div className="absolute inset-[96.05%_47.37%_-1.32%_47.37%] shadow-[0px_4px_8px_0px_rgba(124,77,255,0.16)]" data-name="Square 12dp">
            <DotBody />
          </div>
        </div>
        <div className="absolute contents inset-[10.53%_0.22%_9.43%_12.28%]" data-name="Data Gray">
          <div className="absolute inset-[13.16%_2.74%_12.06%_14.8%]" data-name="Fill">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 461.754 418.772">
              <path d={svgPaths.p18e2c770} fill="var(--fill-0, #90A4AE)" id="Fill" opacity="0.24" />
            </svg>
          </div>
          <div className="absolute inset-[13.16%_2.74%_12.06%_14.8%]" data-name="Stroke">
            <div className="absolute inset-[-0.36%_-0.25%_-0.35%_-0.4%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 464.769 421.736">
                <path d={svgPaths.p16cac700} id="Stroke" stroke="var(--stroke-0, #90A4AE)" strokeWidth="2" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-[36.18%_47.37%_58.55%_47.37%]" data-name="Filled 8dp">
            <DotBody1 />
          </div>
          <div className="absolute inset-[31.36%_74.78%_63.38%_19.96%]" data-name="Filled 8dp">
            <DotBody1 />
          </div>
          <div className="absolute inset-[47.37%_63.6%_47.37%_31.14%]" data-name="Filled 8dp">
            <DotBody1 />
          </div>
          <div className="absolute inset-[26.1%_59.65%_68.64%_35.09%]" data-name="Filled 8dp">
            <DotBody1 />
          </div>
          <div className="absolute inset-[10.53%_25.88%_84.21%_68.86%]" data-name="Filled 8dp">
            <DotBody1 />
          </div>
          <div className="absolute inset-[67.98%_82.46%_26.75%_12.28%]" data-name="Filled 8dp">
            <DotBody1 />
          </div>
          <div className="absolute inset-[73.25%_62.28%_21.49%_32.46%]" data-name="Filled 8dp">
            <DotBody1 />
          </div>
          <div className="absolute inset-[66.45%_47.37%_28.29%_47.37%]" data-name="Filled 8dp">
            <DotBody1 />
          </div>
          <div className="absolute inset-[85.31%_25.44%_9.43%_69.3%]" data-name="Filled 8dp">
            <DotBody1 />
          </div>
          <div className="absolute inset-[67.76%_12.28%_26.97%_82.46%]" data-name="Filled 8dp">
            <DotBody1 />
          </div>
          <div className="absolute inset-[47.59%_0.22%_47.15%_94.52%]" data-name="Filled 8dp">
            <DotBody1 />
          </div>
          <div className="absolute inset-[26.54%_11.18%_68.2%_83.55%]" data-name="Filled 8dp">
            <DotBody1 />
          </div>
        </div>
        <div className="absolute contents inset-[19.52%_10.96%_26.1%_11.18%]" data-name="Data Accent">
          <DataAccentHelper>
            <div className="relative size-full" data-name="Fill">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 407.105 275.088">
                <path d={svgPaths.p1e63c6c0} fill="var(--fill-0, #855CF8)" id="Fill" opacity="0.24" />
              </svg>
            </div>
          </DataAccentHelper>
          <DataAccentHelper>
            <div className="relative size-full" data-name="Stroke">
              <div className="absolute inset-[-0.39%_-0.47%_-0.64%_-0.45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 410.837 277.922">
                  <path d={svgPaths.p2cb10900} id="Stroke" stroke="var(--stroke-0, #855CF8)" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </DataAccentHelper>
          <Helper additionalClassNames="inset-[19.52%_47.15%_75.22%_47.59%]" />
          <Helper additionalClassNames="inset-[26.54%_10.96%_68.2%_83.77%]" />
          <Helper additionalClassNames="inset-[55.26%_33.99%_39.47%_60.75%]" />
          <Helper additionalClassNames="inset-[55.26%_47.15%_39.47%_47.59%]" />
          <Helper additionalClassNames="inset-[68.64%_83.55%_26.1%_11.18%]" />
          <Helper additionalClassNames="inset-[35.31%_68.2%_59.43%_26.54%]" />
          <Helper additionalClassNames="inset-[28.29%_58.55%_66.45%_36.18%]" />
          <Helper additionalClassNames="inset-[22.15%_32.68%_72.59%_62.06%]" />
          <Helper additionalClassNames="inset-[47.59%_27.63%_47.15%_67.11%]" />
          <Helper additionalClassNames="inset-[57.46%_53.07%_37.28%_41.67%]" />
          <Helper additionalClassNames="inset-[55.26%_42.98%_39.47%_51.75%]" />
          <Helper additionalClassNames="inset-[47.59%_73.68%_47.15%_21.05%]" />
        </div>
        <div className="absolute contents font-['IBM_Plex_Sans:Regular',sans-serif] inset-[-8.77%_-11.18%_-8.55%_-16.67%] leading-[0] not-italic text-[#607d8b] text-[16px] tracking-[0.44px] whitespace-nowrap" data-name="Caption">
          <div className="absolute flex flex-col inset-[103.29%_46.49%_-8.55%_46.49%] justify-center text-center">
            <p className="leading-[24px]">July</p>
          </div>
          <div className="absolute flex flex-col inset-[-8.77%_43.2%_103.51%_43.42%] justify-center text-center">
            <p className="leading-[24px]">January</p>
          </div>
          <div className="absolute flex flex-col inset-[15.57%_-2.85%_79.17%_92.54%] justify-center">
            <p className="leading-[24px]">March</p>
          </div>
          <div className="absolute flex flex-col inset-[15.57%_92.54%_79.17%_-9.87%] justify-center text-right">
            <p className="leading-[24px]">November</p>
          </div>
          <div className="absolute flex flex-col inset-[47.59%_-11.18%_47.15%_103.29%] justify-center">
            <p className="leading-[24px]">April</p>
          </div>
          <div className="absolute flex flex-col inset-[47.59%_103.29%_47.15%_-16.67%] justify-center text-right">
            <p className="leading-[24px]">October</p>
          </div>
          <div className="absolute flex flex-col inset-[79.82%_92.54%_14.91%_-10.96%] justify-center text-right">
            <p className="leading-[24px]">September</p>
          </div>
          <div className="absolute flex flex-col inset-[79.82%_0.66%_14.91%_92.54%] justify-center">
            <p className="leading-[24px]">May</p>
          </div>
          <div className="absolute flex flex-col inset-[-2.19%_74.78%_96.93%_8.11%] justify-center text-right">
            <p className="leading-[24px]">December</p>
          </div>
        </div>
        <div className="absolute bottom-[96.93%] flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] left-3/4 not-italic right-[10.09%] text-[#607d8b] text-[16px] top-[-2.19%] tracking-[0.44px] whitespace-nowrap">
          <p className="leading-[24px]">Fubruary</p>
        </div>
        <div className="absolute flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-[97.59%_74.78%_-2.85%_13.6%] justify-center leading-[0] not-italic text-[#607d8b] text-[16px] text-right tracking-[0.44px] whitespace-nowrap">
          <p className="leading-[24px]">August</p>
        </div>
        <div className="absolute bottom-[-2.85%] flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] left-3/4 not-italic right-[16.89%] text-[#607d8b] text-[16px] top-[97.59%] tracking-[0.44px] whitespace-nowrap">
          <p className="leading-[24px]">June</p>
        </div>
      </div>
      <div className="absolute h-[48px] left-0 right-0 top-0" data-name="Header / Mobile & Tablet">
        <div className="absolute bg-[#263238] inset-0" data-name="Base" />
        <div className="absolute inset-[0_calc(33.33%-64px)]" data-name="Mobile & Tablet / Header / Center / Label">
          <div className="absolute bg-white inset-0" data-name="Base" />
          <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[40px] left-[calc(50%-6px)] rounded-[20px] top-1/2" data-name="Master">
            <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex gap-[8px] h-full items-center relative">
                <div className="relative shrink-0 size-[24px]" data-name="Left Icon">
                  <TabletLightIcon additionalClassNames="inset-[13.72%_30.39%_13.72%_27.44%]">
                    <path clipRule="evenodd" d={svgPaths.p25748980} fill="var(--fill-0, #607080)" fillRule="evenodd" id="icon" />
                  </TabletLightIcon>
                </div>
                <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#2e86de] text-[16px] tracking-[0.44px] whitespace-nowrap">Monthly</p>
                <div className="relative shrink-0 size-[24px]" data-name="Right Icon">
                  <TabletLightIcon additionalClassNames="inset-[13.72%_27.44%_13.72%_30.39%]">
                    <path clipRule="evenodd" d={svgPaths.p1458aa00} fill="var(--fill-0, #607080)" fillRule="evenodd" id="icon" />
                  </TabletLightIcon>
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
      <div className="absolute bottom-0 h-[48px] left-px right-0" data-name="Mobile & Tablet / Bars / Tab">
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
    </div>
  );
}