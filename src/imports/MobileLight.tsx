import clsx from "clsx";
import svgPaths from "./svg-k2d7yw0c0s";
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
type MobileLightPolarScaleProps = {
  additionalClassNames?: string;
};

function MobileLightPolarScale({ additionalClassNames = "" }: MobileLightPolarScaleProps) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <div className="absolute border border-[#b0bec5] border-dashed inset-0 rounded-[999px]" data-name="Polar Scale" />
    </div>
  );
}
type ScaleBottomTextProps = {
  text: string;
  additionalClassNames?: string;
};

function ScaleBottomText({ text, additionalClassNames = "" }: ScaleBottomTextProps) {
  return (
    <div className={clsx("-translate-x-1/2 absolute left-1/2 opacity-64 w-[44px]", additionalClassNames)}>
      <div className="absolute inset-0 rounded-[8px]" data-name="🎨 Colors Dark">
        <div className="absolute bg-[#eceff1] inset-0 rounded-[99px]" data-name="BG dark" />
      </div>
      <div className="absolute inset-[0_8px]" data-name="Label">
        <div className="absolute flex flex-col font-['IBM_Plex_Sans:Bold',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#607d8b] text-[10px] text-center tracking-[1.5px] uppercase">
          <p className="leading-[16px]">{text}</p>
        </div>
      </div>
    </div>
  );
}
type CaptionHelper1Props = {
  text: string;
  text1: string;
  additionalClassNames?: string;
};

function CaptionHelper1({ text, text1, additionalClassNames = "" }: CaptionHelper1Props) {
  return (
    <div className={clsx("flex flex-col font-['IBM_Plex_Sans:Bold',sans-serif] justify-center leading-[0] not-italic relative text-[0px] text-center tracking-[0.15px] w-full", additionalClassNames)}>
      <p className="text-[20px]">
        <span className="leading-[28px]">{text}</span>
        <span className="leading-[28px] text-white">{text1}</span>
      </p>
    </div>
  );
}
type CaptionHelperProps = {
  text: string;
  text1: string;
  additionalClassNames?: string;
};

function CaptionHelper({ text, text1, additionalClassNames = "" }: CaptionHelperProps) {
  return (
    <div className={clsx("flex flex-col font-['IBM_Plex_Sans:Bold',sans-serif] justify-center leading-[0] not-italic relative text-[0px] text-center tracking-[0.15px] w-full", additionalClassNames)}>
      <p className="text-[20px]">
        <span className="leading-[28px] text-white">{text}</span>
        <span className="leading-[28px]">{text1}</span>
      </p>
    </div>
  );
}

export default function MobileLight() {
  return (
    <div className="bg-white overflow-clip relative rounded-[8px] shadow-[0px_16px_32px_0px_rgba(176,190,197,0.24),0px_4px_8px_0px_rgba(176,190,197,0.48)] size-full" data-name="Mobile Light">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex items-center justify-center left-1/2 size-[452.548px] top-[calc(50%+0.27px)]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "285" } as React.CSSProperties}>
        <div className="flex-none rotate-45">
          <div className="relative size-[320px]" data-name="Polar v1">
            <MobileLightPolarScale additionalClassNames="inset-[46.67%]" />
            <MobileLightPolarScale additionalClassNames="inset-[40%]" />
            <MobileLightPolarScale additionalClassNames="inset-[33.33%]" />
            <MobileLightPolarScale additionalClassNames="inset-[26.67%]" />
            <MobileLightPolarScale additionalClassNames="inset-[20%]" />
            <MobileLightPolarScale additionalClassNames="inset-[13.33%]" />
            <MobileLightPolarScale additionalClassNames="inset-[6.67%]" />
            <div className="absolute border border-[#b0bec5] border-dashed inset-0 rounded-[999px]" data-name="Polar Scale" />
            <div className="absolute bottom-1/2 left-1/2 opacity-80 right-[20%] top-[20%]" data-name="25%">
              <div className="absolute inset-[-0.52%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 97 97">
                  <path d={svgPaths.p18f7f400} fill="var(--fill-0, #FF6B6B)" id="1 â 4" stroke="var(--stroke-0, white)" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-1/2 flex items-center justify-center left-[24.17%] right-1/2 top-[24.17%]">
              <div className="-scale-y-100 flex-none rotate-180 size-[124px]">
                <div className="opacity-80 relative size-full" data-name="75%">
                  <div className="absolute inset-[-0.6%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 83.6667 83.6667">
                      <path d={svgPaths.p2f357070} fill="var(--fill-0, #1DD1A1)" id="1 â 4" stroke="var(--stroke-0, white)" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-[4.37%] flex items-center justify-center left-[4.38%] right-1/2 top-1/2">
              <div className="-scale-y-100 flex-none rotate-90 size-[219px]">
                <div className="opacity-80 relative size-full" data-name="100%">
                  <div className="absolute inset-[-0.34%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 147 147">
                      <path d={svgPaths.p1bc31300} fill="var(--fill-0, #9F7DE1)" id="1 â 4" stroke="var(--stroke-0, white)" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute flex inset-[50.09%_10.26%_10.37%_50.21%] items-center justify-center">
              <div className="flex-none rotate-90 size-[189.785px]">
                <div className="opacity-80 relative size-full" data-name="1 ∕ 4">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 126.523 126.523">
                    <path d={svgPaths.p12d0a470} fill="var(--fill-0, #54A0FF)" id="1 â 4" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="absolute contents inset-[-4.12%_-4.05%_-3.93%_-4.06%]" data-name="Caption">
              <div className="absolute flex inset-[-4.12%_-4.05%_49.68%_49.62%] items-center justify-center">
                <div className="-rotate-45 flex-none h-[45px] w-[324.492px]">
                  <CaptionHelper text="Te" text1="legram" additionalClassNames="text-[#ff6b6b]" />
                </div>
              </div>
              <div className="absolute flex inset-[49.5%_49.4%_-3.93%_-3.84%] items-center justify-center">
                <div className="-rotate-45 flex-none h-[45px] w-[324.492px]">
                  <CaptionHelper1 text="Sn" text1="apChat" additionalClassNames="text-[#9f7de1]" />
                </div>
              </div>
              <div className="absolute flex inset-[49.42%_-3.98%_-3.85%_49.55%] items-center justify-center">
                <div className="flex-none h-[45px] rotate-45 w-[324.492px]">
                  <CaptionHelper text="Vib" text1="er" additionalClassNames="text-[#54a0ff]" />
                </div>
              </div>
              <div className="absolute flex inset-[-4.04%_49.63%_49.61%_-4.06%] items-center justify-center">
                <div className="flex-none h-[45px] rotate-45 w-[324.492px]">
                  <CaptionHelper1 text="WhatsAp" text1="p" additionalClassNames="text-[#1dd1a1]" />
                </div>
              </div>
            </div>
            <div className="-translate-x-1/2 absolute bottom-[-2.5%] contents left-1/2 top-[57.5%]" data-name="Scale Bottom">
              <ScaleBottomText text="100" additionalClassNames="bottom-[37.5%] top-[57.5%]" />
              <ScaleBottomText text="200" additionalClassNames="bottom-[30.83%] top-[64.17%]" />
              <ScaleBottomText text="300" additionalClassNames="bottom-[24.17%] top-[70.83%]" />
              <ScaleBottomText text="400" additionalClassNames="bottom-[17.5%] top-[77.5%]" />
              <ScaleBottomText text="500" additionalClassNames="bottom-[10.83%] top-[84.17%]" />
              <ScaleBottomText text="600" additionalClassNames="bottom-[4.17%] top-[90.83%]" />
              <ScaleBottomText text="700" additionalClassNames="bottom-[-2.5%] top-[97.5%]" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 h-[48px] left-0 right-0" data-name="Mobile & Tablet / Bars / Tab">
        <div className="absolute bg-white inset-0" data-name="Base" />
        <div className="-translate-y-1/2 absolute h-[48px] left-[8px] overflow-clip right-[8px] top-1/2" data-name="Tabs">
          <div className="absolute bg-[#e9f0f7] inset-[8.33%_40.7%] overflow-clip rounded-[4px]" data-name="Tab">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[20px] top-[calc(50%-8px)]" data-name="basic / bar-chart">
              <div className="absolute inset-[12.5%_4.17%]" data-name="icon">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 15">
                  <path clipRule="evenodd" d={svgPaths.p30ce4b00} fill="var(--fill-0, #1C5085)" fillRule="evenodd" id="icon" />
                </svg>
              </div>
            </div>
            <p className="-translate-x-1/2 absolute capitalize font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] left-1/2 not-italic text-[#1c5085] text-[12px] text-center top-[calc(50%+2px)] tracking-[0.4px] whitespace-nowrap">Charts</p>
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
          <div className="absolute inset-[8.33%_81.4%_8.33%_0] overflow-clip rounded-[4px]" data-name="Tab">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[20px] top-[calc(50%-8px)]" data-name="basic / home">
              <div className="absolute inset-[8.33%_5.08%_8.33%_4.17%]" data-name="icon">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.15 16.6667">
                  <path clipRule="evenodd" d={svgPaths.p1cd82b00} fill="var(--fill-0, #607080)" fillRule="evenodd" id="icon" />
                </svg>
              </div>
            </div>
            <p className="-translate-x-1/2 absolute capitalize font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] left-1/2 not-italic text-[#263238] text-[12px] text-center top-[calc(50%+2px)] tracking-[0.4px] whitespace-nowrap">Home</p>
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
                <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#2e86de] text-[16px] tracking-[0.44px] whitespace-nowrap">Messengers</p>
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
            <div className="relative shrink-0 size-[24px]" data-name="basic / settings">
              <div className="absolute inset-[4.17%]" data-name="icon">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 21.999">
                  <path clipRule="evenodd" d={svgPaths.p1a2ac280} fill="var(--fill-0, #607080)" fillRule="evenodd" id="icon" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-[0_calc(66.67%+64px)_0_0]" data-name="Mobile & Tablet / Header / Left / Icons & Userpic">
          <div className="absolute bg-white inset-0" data-name="Base" />
          <div className="-translate-y-1/2 absolute content-stretch flex gap-[16px] items-center left-[8px] overflow-clip top-1/2" data-name="Icons & Userpic">
            <div className="relative shrink-0 size-[24px]" data-name="basic / bookmarks">
              <div className="absolute inset-[4.17%_12.5%_5.76%_12.5%]" data-name="icon">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 21.618">
                  <path clipRule="evenodd" d={svgPaths.pb115800} fill="var(--fill-0, #607080)" fillRule="evenodd" id="icon" />
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