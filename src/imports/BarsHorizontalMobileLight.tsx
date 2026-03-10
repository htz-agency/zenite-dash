import clsx from "clsx";
import svgPaths from "./svg-2dvorit6yy";
import imgUserpic from "figma:asset/8a7d68fe92be1f29404445476407d81857a346d3.png";
type BarsHorizontalMobileLightTextProps = {
  text: string;
  additionalClassNames?: string;
};

function BarsHorizontalMobileLightText({ text, additionalClassNames = "" }: BarsHorizontalMobileLightTextProps) {
  return (
    <div className={clsx("absolute bottom-0 h-[16px] w-[48px]", additionalClassNames)}>
      <div className="absolute capitalize flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-end leading-[0] not-italic text-[#78909c] text-[12px] text-center tracking-[0.4px]">
        <p className="leading-[16px]">{text}</p>
      </div>
    </div>
  );
}
type BarsHorizontalMobileLightHelperProps = {
  additionalClassNames?: string;
};

function BarsHorizontalMobileLightHelper({ additionalClassNames = "" }: BarsHorizontalMobileLightHelperProps) {
  return (
    <div className={clsx("absolute bottom-[24px] flex items-center justify-center top-0 w-0", additionalClassNames)}>
      <div className="flex-none h-px rotate-90 w-[456px]">
        <div className="opacity-12 relative size-full" data-name="Line Regular">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 426 1">
              <line id="Line" stroke="var(--stroke-0, #263238)" x2="426" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
type Caption10SpOverlineTextProps = {
  text: string;
  additionalClassNames?: string;
};

function Caption10SpOverlineText({ text, additionalClassNames = "" }: Caption10SpOverlineTextProps) {
  return (
    <div className={clsx("absolute h-[24px] left-[8px] w-[168px]", additionalClassNames)}>
      <div className="absolute flex flex-col font-['IBM_Plex_Sans:Bold',sans-serif] inset-0 justify-center leading-[0] not-italic text-[10px] text-white tracking-[1.5px] uppercase">
        <p className="leading-[16px]">{text}</p>
      </div>
    </div>
  );
}
type BarBlueProps = {
  additionalClassNames?: string;
};

function BarBlue({ additionalClassNames = "" }: BarBlueProps) {
  return (
    <div className={clsx("absolute h-[24px] left-0", additionalClassNames)}>
      <div className="absolute inset-0 opacity-80" data-name="🎨 Colors Primary">
        <div className="absolute bg-[#855cf8] inset-0 rounded-[2px]" data-name="BG primary" />
      </div>
    </div>
  );
}

export default function BarsHorizontalMobileLight() {
  return (
    <div className="overflow-clip relative rounded-[8px] shadow-[0px_16px_32px_0px_rgba(176,190,197,0.24),0px_4px_8px_0px_rgba(176,190,197,0.48)] size-full" data-name="Bars Horizontal Mobile Light">
      <div className="absolute inset-0 shadow-[0px_16px_32px_0px_rgba(176,190,197,0.24),0px_4px_8px_0px_rgba(176,190,197,0.48)]" data-name="Background Card">
        <div className="absolute bg-white inset-0 rounded-[8px]" data-name="BG light" />
      </div>
      <div className="absolute inset-[104px_16px_86px_16px] overflow-clip" data-name="Bottom · 56dp">
        <BarsHorizontalMobileLightHelper additionalClassNames="left-[24px]" />
        <BarsHorizontalMobileLightHelper additionalClassNames="left-[80px]" />
        <BarsHorizontalMobileLightHelper additionalClassNames="left-[136px]" />
        <BarsHorizontalMobileLightHelper additionalClassNames="left-[192px]" />
        <BarsHorizontalMobileLightHelper additionalClassNames="left-[248px]" />
        <BarsHorizontalMobileLightHelper additionalClassNames="left-[304px]" />
        <BarsHorizontalMobileLightHelper additionalClassNames="left-[360px]" />
        <BarsHorizontalMobileLightHelper additionalClassNames="left-[416px]" />
        <BarsHorizontalMobileLightHelper additionalClassNames="left-[472px]" />
        <BarsHorizontalMobileLightHelper additionalClassNames="left-[528px]" />
        <BarsHorizontalMobileLightHelper additionalClassNames="left-[584px]" />
        <BarsHorizontalMobileLightHelper additionalClassNames="left-[640px]" />
        <BarsHorizontalMobileLightHelper additionalClassNames="left-[696px]" />
        <BarsHorizontalMobileLightHelper additionalClassNames="left-[752px]" />
        <BarsHorizontalMobileLightHelper additionalClassNames="left-[808px]" />
        <BarsHorizontalMobileLightHelper additionalClassNames="left-[864px]" />
        <BarsHorizontalMobileLightHelper additionalClassNames="left-[920px]" />
        <BarsHorizontalMobileLightHelper additionalClassNames="left-[976px]" />
        <BarsHorizontalMobileLightHelper additionalClassNames="left-[1032px]" />
        <BarsHorizontalMobileLightHelper additionalClassNames="left-[1088px]" />
        <BarsHorizontalMobileLightHelper additionalClassNames="left-[1144px]" />
        <BarsHorizontalMobileLightHelper additionalClassNames="left-[1200px]" />
        <BarsHorizontalMobileLightHelper additionalClassNames="left-[1256px]" />
        <BarsHorizontalMobileLightHelper additionalClassNames="left-[1312px]" />
        <BarsHorizontalMobileLightHelper additionalClassNames="left-[1368px]" />
        <BarsHorizontalMobileLightText text="aug" additionalClassNames="left-[392px]" />
        <BarsHorizontalMobileLightText text="sep" additionalClassNames="left-[448px]" />
        <BarsHorizontalMobileLightText text="oct" additionalClassNames="left-[504px]" />
        <BarsHorizontalMobileLightText text="nov" additionalClassNames="left-[560px]" />
        <BarsHorizontalMobileLightText text="dec" additionalClassNames="left-[616px]" />
        <BarsHorizontalMobileLightText text="jan" additionalClassNames="left-[672px]" />
        <BarsHorizontalMobileLightText text="feb" additionalClassNames="left-[728px]" />
        <BarsHorizontalMobileLightText text="mar" additionalClassNames="left-[784px]" />
        <BarsHorizontalMobileLightText text="jul" additionalClassNames="left-[840px]" />
        <BarsHorizontalMobileLightText text="aug" additionalClassNames="left-[896px]" />
        <BarsHorizontalMobileLightText text="sep" additionalClassNames="left-[952px]" />
        <BarsHorizontalMobileLightText text="oct" additionalClassNames="left-[1008px]" />
        <BarsHorizontalMobileLightText text="nov" additionalClassNames="left-[1064px]" />
        <BarsHorizontalMobileLightText text="dec" additionalClassNames="left-[1120px]" />
        <BarsHorizontalMobileLightText text="jan" additionalClassNames="left-[1176px]" />
        <BarsHorizontalMobileLightText text="feb" additionalClassNames="left-[1232px]" />
        <BarsHorizontalMobileLightText text="mar" additionalClassNames="left-[1288px]" />
        <BarsHorizontalMobileLightText text="jan" additionalClassNames="left-0" />
        <BarsHorizontalMobileLightText text="feb" additionalClassNames="left-[56px]" />
        <BarsHorizontalMobileLightText text="mar" additionalClassNames="left-[112px]" />
        <BarsHorizontalMobileLightText text="apr" additionalClassNames="left-[168px]" />
        <BarsHorizontalMobileLightText text="may" additionalClassNames="left-[224px]" />
        <BarsHorizontalMobileLightText text="jun" additionalClassNames="left-[280px]" />
        <BarsHorizontalMobileLightText text="jul" additionalClassNames="left-[336px]" />
      </div>
      <div className="absolute h-[24px] left-[16px] opacity-80 right-[16px] top-[64px]" data-name="16 sp • Body 1">
        <div className="absolute flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#263238] text-[16px] tracking-[0.44px]">
          <p className="leading-[24px]">Optional subcaption</p>
        </div>
      </div>
      <div className="absolute inset-[104px_16px_120px_16px] overflow-clip" data-name="Horizontal 24dp/Desc ↓">
        <div className="absolute contents left-0 right-0 top-0" data-name="Lighter bars">
          <BarBlue additionalClassNames="opacity-24 right-0 top-0" />
          <BarBlue additionalClassNames="opacity-24 right-[31px] top-[32px]" />
          <BarBlue additionalClassNames="opacity-24 right-[54px] top-[64px]" />
          <BarBlue additionalClassNames="opacity-24 right-[79.52px] top-[96px]" />
          <BarBlue additionalClassNames="opacity-24 right-[120.48px] top-[128px]" />
          <BarBlue additionalClassNames="opacity-24 right-[143.64px] top-[160px]" />
          <BarBlue additionalClassNames="opacity-24 right-[149.88px] top-[192px]" />
          <BarBlue additionalClassNames="opacity-24 right-[167.69px] top-[224px]" />
          <BarBlue additionalClassNames="opacity-24 right-[189.95px] top-[256px]" />
          <BarBlue additionalClassNames="opacity-24 right-[196.19px] top-[288px]" />
          <BarBlue additionalClassNames="opacity-24 right-[211.33px] top-[320px]" />
          <BarBlue additionalClassNames="opacity-24 right-[229px] top-[352px]" />
          <BarBlue additionalClassNames="opacity-24 right-[237.16px] top-[384px]" />
          <BarBlue additionalClassNames="opacity-24 right-[245px] top-[416px]" />
          <BarBlue additionalClassNames="opacity-24 right-[259px] top-[448px]" />
          <BarBlue additionalClassNames="opacity-24 right-[267px] top-[480px]" />
          <BarBlue additionalClassNames="opacity-24 right-[281px] top-[512px]" />
        </div>
        <div className="absolute contents left-0 right-[18.6%] top-0" data-name="Darker bars">
          <BarBlue additionalClassNames="opacity-40 right-[18.6%] top-0" />
          <BarBlue additionalClassNames="opacity-40 right-[39.72%] top-[32px]" />
          <BarBlue additionalClassNames="opacity-40 right-[51.4%] top-[64px]" />
          <BarBlue additionalClassNames="opacity-40 right-[60.08%] top-[96px]" />
          <BarBlue additionalClassNames="opacity-40 right-[62.8%] top-[128px]" />
          <BarBlue additionalClassNames="opacity-40 right-[67.42%] top-[160px]" />
          <BarBlue additionalClassNames="opacity-40 right-[69.86%] top-[192px]" />
          <BarBlue additionalClassNames="opacity-40 right-[72.58%] top-[224px]" />
          <BarBlue additionalClassNames="opacity-40 right-[83.44%] top-[256px]" />
          <BarBlue additionalClassNames="opacity-40 right-[88.6%] top-[288px]" />
          <BarBlue additionalClassNames="opacity-40 right-[91.04%] top-[320px]" />
          <BarBlue additionalClassNames="opacity-40 right-[92.68%] top-[352px]" />
          <BarBlue additionalClassNames="opacity-40 right-[93.6%] top-[384px]" />
          <BarBlue additionalClassNames="opacity-40 right-[94.57%] top-[416px]" />
          <BarBlue additionalClassNames="opacity-40 right-[96.34%] top-[448px]" />
          <BarBlue additionalClassNames="opacity-40 right-[97.26%] top-[480px]" />
          <BarBlue additionalClassNames="opacity-40 right-[97.87%] top-[512px]" />
        </div>
        <div className="absolute contents left-[8px] top-0" data-name="Caption">
          <Caption10SpOverlineText text="united states" additionalClassNames="top-0" />
          <Caption10SpOverlineText text="russia" additionalClassNames="top-[32px]" />
          <Caption10SpOverlineText text="ukraine" additionalClassNames="top-[64px]" />
          <Caption10SpOverlineText text="india" additionalClassNames="top-[96px]" />
          <Caption10SpOverlineText text="china" additionalClassNames="top-[128px]" />
          <Caption10SpOverlineText text="nigeria" additionalClassNames="top-[160px]" />
        </div>
      </div>
      <div className="absolute bottom-0 h-[48px] left-0 right-0" data-name="Mobile & Tablet / Bars / Tab">
        <div className="absolute bg-white inset-0" data-name="Base" />
        <div className="-translate-y-1/2 absolute h-[48px] left-[8px] overflow-clip right-[8px] top-1/2" data-name="Tabs">
          <div className="absolute bg-[#e9f0f7] inset-[8.33%_40.7%] overflow-clip rounded-[4px]" data-name="Tab">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[20px] top-[calc(50%-8px)]" data-name="basic / bar-chart">
              <div className="absolute inset-[12.5%_4.17%]" data-name="icon">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 15">
                  <path clipRule="evenodd" d={svgPaths.p30ce4b00} fill="var(--fill-0, #54A0FF)" fillRule="evenodd" id="icon" />
                </svg>
              </div>
            </div>
            <p className="-translate-x-1/2 absolute capitalize font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] left-1/2 not-italic text-[#2e86de] text-[12px] text-center top-[calc(50%+2px)] tracking-[0.4px] whitespace-nowrap">Charts</p>
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
        <div className="absolute inset-[0_calc(33.33%-64px)]" data-name="Mobile & Tablet / Header / Center / Empty">
          <div className="absolute bg-white inset-0" data-name="Base" />
        </div>
        <div className="absolute inset-[0_0_0_calc(66.67%+64px)]" data-name="Mobile & Tablet / Header / Right / Userpic & Label">
          <div className="absolute bg-white inset-0" data-name="Base" />
          <div className="absolute h-[48px] overflow-clip right-0 top-0 w-[192px]" data-name="Userpic & Labels">
            <div className="absolute content-stretch flex gap-[8px] items-center overflow-clip right-[8px] top-[4px]" data-name="Userpic & Labels">
              <div className="font-['IBM_Plex_Sans:Regular',sans-serif] h-[34.003px] not-italic overflow-clip relative shrink-0 w-[64px] whitespace-nowrap" data-name="Labels">
                <p className="absolute inset-[52.95%_14.06%_5.88%_0] leading-[14px] text-[#94a3b3] text-[10px] tracking-[0.3px]">@patty4life</p>
                <div className="absolute bottom-1/2 capitalize flex flex-col justify-center leading-[0] left-0 right-0 text-[#263238] text-[12px] top-[2.94%] tracking-[0.4px]">
                  <p className="leading-[16px]">Pat Cooper</p>
                </div>
              </div>
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
        </div>
        <div className="absolute inset-[0_calc(66.67%+64px)_0_0]" data-name="Mobile & Tablet / Header / Left / Label">
          <div className="absolute bg-white inset-0" data-name="Base" />
          <div className="-translate-y-1/2 absolute h-[30px] left-[8px] rounded-[20px] top-1/2" data-name="Master">
            <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex gap-[8px] h-full items-center relative">
                <p className="font-['IBM_Plex_Sans:Medium',sans-serif] leading-[1.28] not-italic relative shrink-0 text-[#263238] text-[20px] tracking-[0.15px] whitespace-nowrap">Growth</p>
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