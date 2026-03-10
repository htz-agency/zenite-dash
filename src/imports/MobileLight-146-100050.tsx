import clsx from "clsx";
import svgPaths from "./svg-jco4o48ks6";
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

function Wrapper2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
      <div className="content-stretch flex gap-[8px] h-full items-center relative">{children}</div>
    </div>
  );
}
type Wrapper1Props = {
  additionalClassNames?: string;
};

function Wrapper1({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper1Props>) {
  return (
    <div className={clsx("absolute right-[8px]", additionalClassNames)}>
      <Wrapper2>{children}</Wrapper2>
    </div>
  );
}
type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = "" }: React.PropsWithChildren<WrapperProps>) {
  return (
    <div className={clsx("absolute left-[8px]", additionalClassNames)}>
      <Wrapper2>{children}</Wrapper2>
    </div>
  );
}
type LabelLTextProps = {
  text: string;
};

function LabelLText({ text }: LabelLTextProps) {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[196px]">
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#263238] text-[16px] text-right tracking-[0.44px] w-full">{text}</p>
    </div>
  );
}
type BodyProps = {
  additionalClassNames?: string;
};

function Body({ additionalClassNames = "" }: BodyProps) {
  return (
    <div className={clsx("h-full relative rounded-[2px] shrink-0 w-[16px]", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[2px]" />
    </div>
  );
}
type HelperProps = {
  text: string;
  text1: string;
  additionalClassNames?: string;
};

function Helper({ text, text1, additionalClassNames = "" }: HelperProps) {
  return (
    <div className={clsx("content-stretch flex flex-col items-start not-italic overflow-clip relative shrink-0 w-[196px]", additionalClassNames)}>
      <p className="font-['IBM_Plex_Sans:Medium',sans-serif] leading-[1.28] relative shrink-0 text-[#263238] text-[20px] tracking-[0.15px] w-full">{text}</p>
      <p className="capitalize font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] relative shrink-0 text-[#607080] text-[12px] tracking-[0.4px] w-full">{text1}</p>
    </div>
  );
}
type LabelRTextProps = {
  text: string;
};

function LabelRText({ text }: LabelRTextProps) {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[196px]">
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#263238] text-[16px] tracking-[0.44px] w-full">{text}</p>
    </div>
  );
}

export default function MobileLight() {
  return (
    <div className="bg-white overflow-clip relative rounded-[8px] shadow-[0px_16px_32px_0px_rgba(176,190,197,0.24),0px_4px_8px_0px_rgba(176,190,197,0.48)] size-full" data-name="Mobile Light">
      <div className="absolute h-[566.002px] left-[19px] right-[19px] top-[114px]" data-name="Charts">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 322 566">
          <g id="Charts">
            <path d={svgPaths.p1ab66180} fill="url(#paint0_linear_146_100794)" id="Chart" opacity="0.5" />
            <path d={svgPaths.p10f7c80} fill="url(#paint1_linear_146_100794)" id="Chart_2" opacity="0.5" />
            <path d={svgPaths.p3308e800} fill="url(#paint2_linear_146_100794)" id="Chart_3" opacity="0.5" />
            <path d={svgPaths.p21c60480} fill="url(#paint3_linear_146_100794)" id="Chart_4" opacity="0.5" />
            <path d={svgPaths.p1e45a500} fill="url(#paint4_linear_146_100794)" id="Chart_5" opacity="0.5" />
            <path d={svgPaths.p1daa8180} fill="url(#paint5_linear_146_100794)" id="Chart_6" opacity="0.5" />
            <path d={svgPaths.p30815080} fill="url(#paint6_linear_146_100794)" id="Chart_7" opacity="0.5" />
            <path d={svgPaths.p1382aa0} fill="url(#paint7_linear_146_100794)" id="Chart_8" opacity="0.5" />
            <path d={svgPaths.peb4ac00} fill="url(#paint8_linear_146_100794)" id="Chart_9" opacity="0.5" />
            <path d={svgPaths.pdc6340} fill="url(#paint9_linear_146_100794)" id="Chart_10" opacity="0.5" />
            <path d={svgPaths.p157bc900} fill="url(#paint10_linear_146_100794)" id="Chart_11" opacity="0.5" />
            <path d={svgPaths.p2858e800} fill="url(#paint11_linear_146_100794)" id="Chart_12" opacity="0.5" />
            <path d={svgPaths.pfcf2380} fill="url(#paint12_linear_146_100794)" id="Chart_13" opacity="0.5" />
            <path d={svgPaths.p2a76a980} fill="url(#paint13_linear_146_100794)" id="Chart_14" opacity="0.5" />
            <path d={svgPaths.p3efc6500} fill="url(#paint14_linear_146_100794)" id="Chart_15" opacity="0.5" />
            <path d={svgPaths.p2dd32d00} fill="url(#paint15_linear_146_100794)" id="Chart_16" opacity="0.5" />
            <path d={svgPaths.p3d515b00} fill="url(#paint16_linear_146_100794)" id="Chart_17" opacity="0.5" />
            <path d={svgPaths.p19c811e0} fill="url(#paint17_linear_146_100794)" id="Chart_18" opacity="0.5" />
            <path d={svgPaths.p2dd76000} fill="url(#paint18_linear_146_100794)" id="Chart_19" opacity="0.5" />
            <path d={svgPaths.p3645a300} fill="url(#paint19_linear_146_100794)" id="Chart_20" opacity="0.5" />
            <path d={svgPaths.p30190180} fill="url(#paint20_linear_146_100794)" id="Chart_21" opacity="0.5" />
            <path d={svgPaths.p1c07f550} fill="url(#paint21_linear_146_100794)" id="Chart_22" opacity="0.5" />
            <path d={svgPaths.p34e18c00} fill="url(#paint22_linear_146_100794)" id="Chart_23" opacity="0.5" />
            <path d={svgPaths.p268da300} fill="url(#paint23_linear_146_100794)" id="Chart_24" opacity="0.5" />
            <path d={svgPaths.p36f51800} fill="url(#paint24_linear_146_100794)" id="Chart_25" opacity="0.5" />
            <path d={svgPaths.p3f00c9c0} fill="url(#paint25_linear_146_100794)" id="Chart_26" opacity="0.5" />
            <path d={svgPaths.pabe000} fill="url(#paint26_linear_146_100794)" id="Chart_27" opacity="0.5" />
            <path d={svgPaths.p32e95b20} fill="url(#paint27_linear_146_100794)" id="Chart_28" opacity="0.5" />
            <path d={svgPaths.ped53e00} fill="url(#paint28_linear_146_100794)" id="Chart_29" opacity="0.5" />
            <path d={svgPaths.p2ce24900} fill="url(#paint29_linear_146_100794)" id="Chart_30" opacity="0.5" />
            <path d={svgPaths.p18f4e7f0} fill="url(#paint30_linear_146_100794)" id="Chart_31" opacity="0.5" />
            <path d={svgPaths.p25c4e000} fill="url(#paint31_linear_146_100794)" id="Chart_32" opacity="0.5" />
            <path d={svgPaths.p2e33ca00} fill="url(#paint32_linear_146_100794)" id="Chart_33" opacity="0.5" />
            <path d={svgPaths.p333ccd00} fill="url(#paint33_linear_146_100794)" id="Chart_34" opacity="0.5" />
            <path d={svgPaths.p1893a240} fill="url(#paint34_linear_146_100794)" id="Chart_35" opacity="0.5" />
            <path d={svgPaths.pe844d00} fill="url(#paint35_linear_146_100794)" id="Chart_36" opacity="0.5" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_146_100794" x1="1.04204" x2="319.547" y1="22.4657" y2="32.7937">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_146_100794" x1="1.04215" x2="320.596" y1="169.311" y2="173.294">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_146_100794" x1="1.042" x2="319.563" y1="191.363" y2="194.61">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint3_linear_146_100794" x1="1.04204" x2="319.865" y1="226.923" y2="229.269">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint4_linear_146_100794" x1="1.04204" x2="319.488" y1="77.6982" y2="88.9047">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint5_linear_146_100794" x1="1.04207" x2="318.333" y1="151.46" y2="175.487">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint6_linear_146_100794" x1="1.04203" x2="319.378" y1="198.565" y2="211.242">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint7_linear_146_100794" x1="1.0419" x2="318.591" y1="242.783" y2="252.363">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint8_linear_146_100794" x1="1.04203" x2="319.772" y1="295.644" y2="301.575">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint9_linear_146_100794" x1="1.0419" x2="318.71" y1="270.047" y2="277.381">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint10_linear_146_100794" x1="1.04191" x2="318.834" y1="360.568" y2="364.393">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint11_linear_146_100794" x1="1.0419" x2="318.78" y1="424.66" y2="430.299">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint12_linear_146_100794" x1="1.04204" x2="319.71" y1="460.762" y2="468.181">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint13_linear_146_100794" x1="1.0419" x2="317.695" y1="523.528" y2="542.893">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint14_linear_146_100794" x1="1.04204" x2="319.815" y1="332.404" y2="337.042">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint15_linear_146_100794" x1="1.0419" x2="318.703" y1="404.623" y2="412.111">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint16_linear_146_100794" x1="1.0419" x2="306.661" y1="504.005" y2="565.112">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint17_linear_146_100794" x1="1.04191" x2="284.527" y1="559.47" y2="658.153">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint18_linear_146_100794" x1="1.04192" x2="317.392" y1="525.558" y2="547.249">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint19_linear_146_100794" x1="1.04204" x2="319.462" y1="443.594" y2="455.163">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint20_linear_146_100794" x1="1.04217" x2="319.97" y1="327.127" y2="344.214">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint21_linear_146_100794" x1="1.04217" x2="319.895" y1="382.293" y2="400.062">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint22_linear_146_100794" x1="1.0419" x2="318.062" y1="380.083" y2="396.186">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint23_linear_146_100794" x1="1.0419" x2="318.622" y1="343.641" y2="352.68">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint24_linear_146_100794" x1="1.0419" x2="318.67" y1="395.399" y2="403.565">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint25_linear_146_100794" x1="1.0419" x2="318.762" y1="361.108" y2="367.225">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint26_linear_146_100794" x1="1.0419" x2="318.818" y1="379.239" y2="383.655">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint27_linear_146_100794" x1="1.04192" x2="318.782" y1="414.536" y2="420.109">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint28_linear_146_100794" x1="1.04204" x2="319.641" y1="279.653" y2="288.419">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint29_linear_146_100794" x1="1.0419" x2="318.436" y1="440.935" y2="452.805">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint30_linear_146_100794" x1="1.04188" x2="318.652" y1="469.183" y2="477.688">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint31_linear_146_100794" x1="1.04204" x2="319.817" y1="315.816" y2="320.395">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint32_linear_146_100794" x1="1.04204" x2="319.782" y1="222.015" y2="227.667">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint33_linear_146_100794" x1="0.0421629" x2="319.832" y1="241.713" y2="245.827">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint34_linear_146_100794" x1="0.0420335" x2="318.843" y1="255.343" y2="258.873">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint35_linear_146_100794" x1="1.04237" x2="322.102" y1="125.148" y2="127.704">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute contents left-[8px] top-[64px]" data-name="Left Elements">
        <div className="absolute flex h-[92px] items-center justify-center left-[12px] top-[64px] w-px">
          <div className="-scale-y-100 flex-none rotate-180">
            <div className="h-[92px] relative w-px" data-name="Line">
              <div aria-hidden="true" className="absolute border border-[#263238] border-dashed inset-[-0.5px] pointer-events-none" />
            </div>
          </div>
        </div>
        <Wrapper additionalClassNames="h-[33px] top-[647px]">
          <Body additionalClassNames="bg-[#cce3ff]" />
          <LabelRText text="Belgium" />
        </Wrapper>
        <Wrapper additionalClassNames="h-[52px] top-[582px]">
          <Body additionalClassNames="bg-[#98c6ff]" />
          <Helper text="Poland" text1="26,253" />
        </Wrapper>
        <Wrapper additionalClassNames="h-[66px] top-[503px]">
          <Body additionalClassNames="bg-[#54a0ff]" />
          <Helper text="Czech Republic" text1="30,903" />
        </Wrapper>
        <Wrapper additionalClassNames="h-[30px] top-[460px]">
          <Body additionalClassNames="bg-[#2e86de]" />
          <LabelRText text="Italy" />
        </Wrapper>
        <Wrapper additionalClassNames="h-[38px] top-[409px]">
          <Body additionalClassNames="bg-[#256bb2]" />
          <Helper text="Britain" text1="70,770" />
        </Wrapper>
        <Wrapper additionalClassNames="h-[69px] top-[327px]">
          <Body additionalClassNames="bg-[#1c5085]" />
          <Helper text="France" text1="72,638" />
        </Wrapper>
        <Wrapper additionalClassNames="h-[55px] top-[259px]">
          <Body additionalClassNames="bg-[#364b63]" />
          <Helper text="Sweden" text1="86,811" />
        </Wrapper>
        <Wrapper additionalClassNames="h-[75px] top-[171px]">
          <Body additionalClassNames="bg-[#364b63]" />
          <Helper text="Switzerland" text1="94,236" />
        </Wrapper>
        <Wrapper additionalClassNames="h-[44px] top-[114px]">
          <Body additionalClassNames="bg-[#263238]" />
          <Helper text="Germany" text1="100,897" />
        </Wrapper>
        <p className="absolute font-['IBM_Plex_Sans:Regular',sans-serif] leading-[0] left-[21px] not-italic text-[#263238] text-[0px] text-[16px] top-[64px] tracking-[0.44px] w-[66px]">
          <span className="leading-[24px]">Origin</span>
          <span className="leading-[24px]">{` `}</span>
        </p>
      </div>
      <div className="absolute contents right-[8px] top-[64px]" data-name="Right Elements">
        <div className="absolute h-[165px] right-[12px] top-[64px] w-px" data-name="Line">
          <div aria-hidden="true" className="absolute border border-[#263238] border-dashed inset-[-0.5px] pointer-events-none" />
        </div>
        <Wrapper1 additionalClassNames="h-[34px] top-[646px]">
          <LabelLText text="Russia" />
          <Body additionalClassNames="bg-[#bbf1e3]" />
        </Wrapper1>
        <Wrapper1 additionalClassNames="h-[67px] top-[566px]">
          <Helper text="Pakistan" text1="8,123" additionalClassNames="text-right" />
          <Body additionalClassNames="bg-[#77e3c7]" />
        </Wrapper1>
        <Wrapper1 additionalClassNames="h-[36px] top-[517px]">
          <LabelLText text="Afghanistan" />
          <Body additionalClassNames="bg-[#1dd1a1]" />
        </Wrapper1>
        <Wrapper1 additionalClassNames="h-[63px] top-[441px]">
          <Helper text="Syria" text1="21,546" additionalClassNames="text-right" />
          <Body additionalClassNames="bg-[#10ac84]" />
        </Wrapper1>
        <Wrapper1 additionalClassNames="h-[256px] top-[171px]">
          <Helper text="Serbia" text1="29,265" additionalClassNames="text-right" />
          <Body additionalClassNames="bg-[#0d8a6a]" />
        </Wrapper1>
        <div className="absolute font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic right-[21px] text-[#263238] text-[16px] text-right top-[64px] tracking-[0.44px] w-[104px]">
          <p className="mb-0">Decisions</p>
          <p>by origin</p>
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
            <Wrapper2>
              <div className="relative shrink-0 size-[24px]" data-name="Left Icon">
                <MobileLightIcon additionalClassNames="inset-[13.72%_30.39%_13.72%_27.44%]">
                  <path clipRule="evenodd" d={svgPaths.p25748980} fill="var(--fill-0, #607080)" fillRule="evenodd" id="icon" />
                </MobileLightIcon>
              </div>
              <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#2e86de] text-[16px] tracking-[0.44px] whitespace-nowrap">2020</p>
              <div className="relative shrink-0 size-[24px]" data-name="Right Icon">
                <MobileLightIcon additionalClassNames="inset-[13.72%_27.44%_13.72%_30.39%]">
                  <path clipRule="evenodd" d={svgPaths.p1458aa00} fill="var(--fill-0, #607080)" fillRule="evenodd" id="icon" />
                </MobileLightIcon>
              </div>
            </Wrapper2>
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