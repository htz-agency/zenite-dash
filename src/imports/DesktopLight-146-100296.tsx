import clsx from "clsx";
import svgPaths from "./svg-nzcrydp0dq";
import imgUserpic from "figma:asset/a15caf2b768e1fd07d1e6f6f92fbf31a27e58f06.png";
type IconProps = {
  additionalClassNames?: string;
};

function Icon({ children, additionalClassNames = "" }: React.PropsWithChildren<IconProps>) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.70711 5.06066">
        {children}
      </svg>
    </div>
  );
}
type SankeyMasterProps = {
  additionalClassNames?: string;
};

function SankeyMaster({ children, additionalClassNames = "" }: React.PropsWithChildren<SankeyMasterProps>) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[16px] h-full items-center relative">{children}</div>
      </div>
    </div>
  );
}
type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = "" }: React.PropsWithChildren<WrapperProps>) {
  return (
    <div className={clsx("h-[16px] relative rounded-[16px] shrink-0", additionalClassNames)}>
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[2px] h-full items-center px-[4px] relative">{children}</div>
      </div>
    </div>
  );
}

function DesktopLightHelper() {
  return (
    <div style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties} className="-translate-y-1/2 absolute flex h-[48px] items-center justify-center left-0 top-1/2 w-0">
      <div className="flex-none rotate-90">
        <div className="h-0 relative w-[48px]" data-name="Divider">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 1">
              <line id="Divider" stroke="var(--stroke-0, #D3DDE7)" x2="48" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
type Helper2Props = {
  text: string;
  text1: string;
};

function Helper2({ text, text1 }: Helper2Props) {
  return (
    <p className="font-['IBM_Plex_Sans:Bold',sans-serif] leading-[0] not-italic relative shrink-0 text-[#263238] text-[0px] whitespace-nowrap">
      <span className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] text-[16px] tracking-[0.44px]">{text}</span>
      <span className="leading-[28px] text-[20px] tracking-[0.15px]">{text1}</span>
    </p>
  );
}
type BadgeText1Props = {
  text: string;
};

function BadgeText1({ text }: BadgeText1Props) {
  return (
    <Wrapper additionalClassNames="bg-[#ff6b6b]">
      <div className="relative shrink-0 size-[12px]" data-name="arrows / chevron-bottom">
        <Icon additionalClassNames="inset-[30.39%_13.72%_27.44%_13.72%]">
          <path clipRule="evenodd" d={svgPaths.p3fda3300} fill="var(--fill-0, white)" fillRule="evenodd" id="icon" />
        </Icon>
      </div>
      <p className="font-['IBM_Plex_Sans:Bold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[10px] text-center text-white tracking-[1.5px] uppercase whitespace-nowrap">{text}</p>
    </Wrapper>
  );
}
type BadgeTextProps = {
  text: string;
};

function BadgeText({ text }: BadgeTextProps) {
  return (
    <Wrapper additionalClassNames="bg-[#54a0ff]">
      <div className="relative shrink-0 size-[12px]" data-name="arrows / chevron-top">
        <Icon additionalClassNames="inset-[27.44%_13.72%_30.39%_13.72%]">
          <path clipRule="evenodd" d={svgPaths.p30d79d00} fill="var(--fill-0, white)" fillRule="evenodd" id="icon" />
        </Icon>
      </div>
      <p className="font-['IBM_Plex_Sans:Bold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[10px] text-center text-white tracking-[1.5px] uppercase whitespace-nowrap">{text}</p>
    </Wrapper>
  );
}
type Helper1Props = {
  text: string;
  text1: string;
};

function Helper1({ text, text1 }: Helper1Props) {
  return (
    <p className="font-['IBM_Plex_Sans:Bold',sans-serif] leading-[0] not-italic relative shrink-0 text-[#263238] text-[0px] whitespace-nowrap">
      <span className="leading-[28px] text-[20px] tracking-[0.15px]">{text}</span>
      <span className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] text-[16px] tracking-[0.44px]">{text1}</span>
    </p>
  );
}
type LabelRTextProps = {
  text: string;
};

function LabelRText({ text }: LabelRTextProps) {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[196px]">
      <p className="font-['IBM_Plex_Sans:Medium',sans-serif] leading-[1.28] not-italic relative shrink-0 text-[#263238] text-[20px] tracking-[0.15px] w-full">{text}</p>
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
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] relative shrink-0 text-[#607080] text-[16px] tracking-[0.44px] w-full">{text1}</p>
    </div>
  );
}

export default function DesktopLight() {
  return (
    <div className="bg-white overflow-clip relative rounded-[8px] shadow-[0px_16px_32px_0px_rgba(176,190,197,0.24),0px_4px_8px_0px_rgba(176,190,197,0.48)] size-full" data-name="Desktop Light">
      <div className="absolute inset-[26.79%_91px_5.18%_91px]" data-name="Charts">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1258 853">
          <g id="Charts">
            <path d={svgPaths.p9ff480} fill="url(#paint0_linear_146_100840)" id="Chart" opacity="0.5" />
            <path d={svgPaths.p1eae9f80} fill="url(#paint1_linear_146_100840)" id="Chart_2" opacity="0.5" />
            <path d={svgPaths.p2aeb9b00} fill="url(#paint2_linear_146_100840)" id="Chart_3" opacity="0.5" />
            <path d={svgPaths.p2291a180} fill="url(#paint3_linear_146_100840)" id="Chart_4" opacity="0.5" />
            <path d={svgPaths.pf887e00} fill="url(#paint4_linear_146_100840)" id="Chart_5" opacity="0.5" />
            <path d={svgPaths.p25326500} fill="url(#paint5_linear_146_100840)" id="Chart_6" opacity="0.5" />
            <path d={svgPaths.p17002780} fill="url(#paint6_linear_146_100840)" id="Chart_7" opacity="0.5" />
            <path d={svgPaths.p2254dff0} fill="url(#paint7_linear_146_100840)" id="Chart_8" opacity="0.5" />
            <path d={svgPaths.p2669da80} fill="url(#paint8_linear_146_100840)" id="Chart_9" opacity="0.5" />
            <path d={svgPaths.p29ec0080} fill="url(#paint9_linear_146_100840)" id="Chart_10" opacity="0.5" />
            <path d={svgPaths.p3204a00} fill="url(#paint10_linear_146_100840)" id="Chart_11" opacity="0.5" />
            <path d={svgPaths.p3d71eb00} fill="url(#paint11_linear_146_100840)" id="Chart_12" opacity="0.5" />
            <path d={svgPaths.p2e88fe00} fill="url(#paint12_linear_146_100840)" id="Chart_13" opacity="0.5" />
            <path d={svgPaths.p1a00e880} fill="url(#paint13_linear_146_100840)" id="Chart_14" opacity="0.5" />
            <path d={svgPaths.p4ed1f00} fill="url(#paint14_linear_146_100840)" id="Chart_15" opacity="0.5" />
            <path d={svgPaths.p6915800} fill="url(#paint15_linear_146_100840)" id="Chart_16" opacity="0.5" />
            <path d={svgPaths.p3c46a500} fill="url(#paint16_linear_146_100840)" id="Chart_17" opacity="0.5" />
            <path d={svgPaths.p381c780} fill="url(#paint17_linear_146_100840)" id="Chart_18" opacity="0.5" />
            <path d={svgPaths.p1f9bf780} fill="url(#paint18_linear_146_100840)" id="Chart_19" opacity="0.5" />
            <path d={svgPaths.p12f9e170} fill="url(#paint19_linear_146_100840)" id="Chart_20" opacity="0.5" />
            <path d={svgPaths.p1bfece00} fill="url(#paint20_linear_146_100840)" id="Chart_21" opacity="0.5" />
            <path d={svgPaths.p381ada70} fill="url(#paint21_linear_146_100840)" id="Chart_22" opacity="0.5" />
            <path d={svgPaths.p26c6bf80} fill="url(#paint22_linear_146_100840)" id="Chart_23" opacity="0.5" />
            <path d={svgPaths.p2c475480} fill="url(#paint23_linear_146_100840)" id="Chart_24" opacity="0.5" />
            <path d={svgPaths.p29afae00} fill="url(#paint24_linear_146_100840)" id="Chart_25" opacity="0.5" />
            <path d={svgPaths.p224e1500} fill="url(#paint25_linear_146_100840)" id="Chart_26" opacity="0.5" />
            <path d={svgPaths.p1da7ba80} fill="url(#paint26_linear_146_100840)" id="Chart_27" opacity="0.5" />
            <path d={svgPaths.p1776c7f0} fill="url(#paint27_linear_146_100840)" id="Chart_28" opacity="0.5" />
            <path d={svgPaths.p17ef5600} fill="url(#paint28_linear_146_100840)" id="Chart_29" opacity="0.5" />
            <path d={svgPaths.p1b580c00} fill="url(#paint29_linear_146_100840)" id="Chart_30" opacity="0.5" />
            <path d={svgPaths.p1a7c2980} fill="url(#paint30_linear_146_100840)" id="Chart_31" opacity="0.5" />
            <path d={svgPaths.p3d4e00} fill="url(#paint31_linear_146_100840)" id="Chart_32" opacity="0.5" />
            <path d={svgPaths.p2baf2900} fill="url(#paint32_linear_146_100840)" id="Chart_33" opacity="0.5" />
            <path d={svgPaths.p28bb6b00} fill="url(#paint33_linear_146_100840)" id="Chart_34" opacity="0.5" />
            <path d={svgPaths.p28a7c000} fill="url(#paint34_linear_146_100840)" id="Chart_35" opacity="0.5" />
            <path d={svgPaths.p15a91f80} fill="url(#paint35_linear_146_100840)" id="Chart_36" opacity="0.5" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_146_100840" x1="1.16577" x2="1249.51" y1="33.8971" y2="139.691">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_146_100840" x1="1.16591" x2="1257.21" y1="255.46" y2="296.277">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_146_100840" x1="1.1656" x2="1256.46" y1="288.736" y2="322.173">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint3_linear_146_100840" x1="1.16577" x2="1258.01" y1="342.388" y2="366.557">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint4_linear_146_100840" x1="1.16577" x2="1247.93" y1="117.234" y2="231.904">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint5_linear_146_100840" x1="1.16591" x2="1212.11" y1="228.527" y2="468.188">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint6_linear_146_100840" x1="1.16577" x2="1245.01" y1="299.602" y2="429.055">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint7_linear_146_100840" x1="1.16563" x2="1249.68" y1="366.318" y2="464.994">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint8_linear_146_100840" x1="1.16577" x2="1255.51" y1="446.078" y2="507.071">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint9_linear_146_100840" x1="1.16564" x2="1252.9" y1="407.456" y2="483.167">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint10_linear_146_100840" x1="1.16564" x2="1256.23" y1="544.038" y2="583.609">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint11_linear_146_100840" x1="1.16562" x2="1254.77" y1="640.742" y2="699.024">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint12_linear_146_100840" x1="1.16577" x2="1253.84" y1="695.214" y2="771.432">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint13_linear_146_100840" x1="1.16564" x2="1226.04" y1="789.917" y2="986.148">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint14_linear_146_100840" x1="1.16577" x2="1256.66" y1="501.542" y2="549.286">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint15_linear_146_100840" x1="1.16563" x2="1252.7" y1="610.509" y2="687.797">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint16_linear_146_100840" x1="1.16563" x2="987" y1="760.46" y2="1276.84">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint17_linear_146_100840" x1="1.16562" x2="728.258" y1="844.365" y2="1464.68">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint18_linear_146_100840" x1="1.16563" x2="1218.21" y1="792.98" y2="1011.59">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint19_linear_146_100840" x1="1.16577" x2="1247.24" y1="669.309" y2="787.638">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint20_linear_146_100840" x1="1.1659" x2="1235.4" y1="493.58" y2="665.996">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint21_linear_146_100840" x1="1.1659" x2="1233.47" y1="576.817" y2="755.87">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint22_linear_146_100840" x1="1.16563" x2="1235.62" y1="573.482" y2="737.753">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint23_linear_146_100840" x1="1.16563" x2="1250.53" y1="518.497" y2="611.651">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint24_linear_146_100840" x1="1.16563" x2="1251.8" y1="596.592" y2="680.819">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint25_linear_146_100840" x1="1.16563" x2="1254.29" y1="544.852" y2="608.051">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint26_linear_146_100840" x1="1.16563" x2="1255.81" y1="572.207" y2="617.884">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint27_linear_146_100840" x1="1.16564" x2="1254.83" y1="625.467" y2="683.073">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint28_linear_146_100840" x1="1.16577" x2="1252.01" y1="421.95" y2="511.894">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint29_linear_146_100840" x1="1.16563" x2="1245.53" y1="665.297" y2="787.215">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint30_linear_146_100840" x1="1.16563" x2="1251.32" y1="707.919" y2="795.616">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint31_linear_146_100840" x1="1.16577" x2="1256.71" y1="476.515" y2="523.652">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint32_linear_146_100840" x1="1.16577" x2="1255.78" y1="334.983" y2="393.13">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint33_linear_146_100840" x1="0.165887" x2="1257.07" y1="364.705" y2="406.863">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint34_linear_146_100840" x1="0.16578" x2="1256.43" y1="384.275" y2="420.629">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint35_linear_146_100840" x1="1.16577" x2="1257.94" y1="188.835" y2="214.804">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute bottom-[5.1%] contents right-[80px] top-[22.81%]" data-name="Right Elements">
        <div className="absolute bottom-[64.04%] right-[84px] top-[22.81%] w-px" data-name="Line">
          <div aria-hidden="true" className="absolute border-2 border-[#263238] border-dashed inset-[-1px] pointer-events-none" />
        </div>
        <SankeyMaster additionalClassNames="bottom-[5.1%] right-[80px] top-[90.75%]">
          <Helper text="Russia" text1="3,959" additionalClassNames="text-right" />
          <Body additionalClassNames="bg-[#bbf1e3]" />
        </SankeyMaster>
        <SankeyMaster additionalClassNames="bottom-[10.85%] right-[80px] top-[81.26%]">
          <Helper text="Pakistan" text1="8,123" additionalClassNames="text-right" />
          <Body additionalClassNames="bg-[#77e3c7]" />
        </SankeyMaster>
        <SankeyMaster additionalClassNames="bottom-[20.33%] right-[80px] top-[75.36%]">
          <Helper text="Afghanistan" text1="15,447" additionalClassNames="text-right" />
          <Body additionalClassNames="bg-[#1dd1a1]" />
        </SankeyMaster>
        <SankeyMaster additionalClassNames="bottom-[26.24%] right-[80px] top-[66.11%]">
          <Helper text="Syria" text1="21,546" additionalClassNames="text-right" />
          <Body additionalClassNames="bg-[#10ac84]" />
        </SankeyMaster>
        <SankeyMaster additionalClassNames="bottom-[35.49%] right-[80px] top-[33.73%]">
          <Helper text="Serbia" text1="29,265" additionalClassNames="text-right" />
          <Body additionalClassNames="bg-[#0d8a6a]" />
        </SankeyMaster>
        <div className="absolute bottom-[72.73%] font-['IBM_Plex_Sans:Bold',sans-serif] leading-[28px] not-italic right-[101px] text-[#263238] text-[20px] text-right top-[22.81%] tracking-[0.15px] w-[104px]">
          <p className="mb-0">Decisions</p>
          <p>by origin</p>
        </div>
      </div>
      <div className="absolute bottom-[5.1%] contents left-[80px] top-[18.98%]" data-name="Left Elements">
        <div className="absolute bottom-[69.23%] flex items-center justify-center left-[84px] top-[22.8%] w-px">
          <div className="-scale-y-100 flex-none h-[99.895px] rotate-180 w-px">
            <div className="relative size-full" data-name="Line">
              <div aria-hidden="true" className="absolute border-2 border-[#263238] border-dashed inset-[-1px] pointer-events-none" />
            </div>
          </div>
        </div>
        <SankeyMaster additionalClassNames="bottom-[5.1%] left-[80px] top-[90.91%]">
          <Body additionalClassNames="bg-[#cce3ff]" />
          <LabelRText text="Belgium" />
        </SankeyMaster>
        <SankeyMaster additionalClassNames="bottom-[10.68%] left-[80px] top-[83.11%]">
          <Body additionalClassNames="bg-[#98c6ff]" />
          <Helper text="Poland" text1="26,253" />
        </SankeyMaster>
        <SankeyMaster additionalClassNames="bottom-[18.49%] left-[80px] top-[73.55%]">
          <Body additionalClassNames="bg-[#54a0ff]" />
          <Helper text="Czech Republic" text1="30,903" />
        </SankeyMaster>
        <SankeyMaster additionalClassNames="bottom-[28.05%] left-[80px] top-[68.53%]">
          <Body additionalClassNames="bg-[#2e86de]" />
          <LabelRText text="Italy" />
        </SankeyMaster>
        <SankeyMaster additionalClassNames="bottom-[33.14%] left-[80px] top-[62.24%]">
          <Body additionalClassNames="bg-[#256bb2]" />
          <Helper text="Britain" text1="70,770" />
        </SankeyMaster>
        <SankeyMaster additionalClassNames="bottom-[39.36%] left-[80px] top-[52.36%]">
          <Body additionalClassNames="bg-[#1c5085]" />
          <Helper text="France" text1="72,638" />
        </SankeyMaster>
        <SankeyMaster additionalClassNames="bottom-[49.24%] left-[80px] top-[44.23%]">
          <Body additionalClassNames="bg-[#364b63]" />
          <Helper text="Sweden" text1="86,811" />
        </SankeyMaster>
        <SankeyMaster additionalClassNames="bottom-[57.36%] left-[80px] top-[33.72%]">
          <Body additionalClassNames="bg-[#364b63]" />
          <Helper text="Switzerland" text1="94,236" />
        </SankeyMaster>
        <SankeyMaster additionalClassNames="bottom-[67.88%] left-[80px] top-[26.87%]">
          <Body additionalClassNames="bg-[#1b314b]" />
          <Helper text="Germany" text1="100,897" />
        </SankeyMaster>
        <p className="absolute bottom-[74.97%] font-['IBM_Plex_Sans:Bold',sans-serif] leading-[0] left-[101px] not-italic text-[#263238] text-[0px] text-[20px] top-[22.8%] tracking-[0.15px] w-[66px]">
          <span className="leading-[28px]">Origin</span>
          <span className="leading-[28px]">{` `}</span>
        </p>
        <div className="absolute bottom-[78.47%] left-[80px] top-[18.98%] w-[95px]" data-name="Badge">
          <div className="absolute inset-0 rounded-[8px]" data-name="🎨 Colors Dark">
            <div className="absolute bg-[#58585e] inset-0 rounded-[8px]" data-name="BG dark" />
          </div>
          <div className="absolute inset-[0_8px]" data-name="Label">
            <div className="absolute flex flex-col font-['IBM_Plex_Sans:Bold',sans-serif] inset-0 justify-center leading-[0] not-italic text-[20px] text-center text-white tracking-[0.15px]">
              <p className="leading-[28px]">2020</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute h-[32px] right-[80px] top-[182px] w-[280px]" data-name="Badge">
        <div className="absolute inset-0 rounded-[8px]" data-name="🎨 Colors Dark">
          <div className="absolute bg-[#bbf1e3] inset-0 rounded-[8px]" data-name="BG dark" />
        </div>
        <div className="absolute inset-[0_8px]" data-name="Label">
          <div className="absolute flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#0a674f] text-[16px] tracking-[0.44px]">
            <p className="leading-[24px]">373,094</p>
          </div>
        </div>
      </div>
      <div className="absolute h-[32px] right-[80px] top-[138px] w-[177px]" data-name="Badge">
        <div className="absolute inset-0 rounded-[8px]" data-name="🎨 Colors Dark">
          <div className="absolute bg-[#ffd3d3] inset-0 rounded-[8px]" data-name="BG dark" />
        </div>
        <div className="absolute inset-[0_8px]" data-name="Label">
          <div className="absolute flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#8f3132] text-[16px] tracking-[0.44px]">
            <p className="leading-[24px]">220,699</p>
          </div>
        </div>
      </div>
      <p className="absolute font-['IBM_Plex_Sans:Medium',sans-serif] leading-[1.28] not-italic right-[80px] text-[#263238] text-[20px] text-right top-[96px] tracking-[0.15px] whitespace-nowrap">Total asylym decisions</p>
      <p className="absolute font-['IBM_Plex_Sans:Medium',sans-serif] leading-[1.28] left-[80px] not-italic text-[#78909c] text-[20px] top-[148px] tracking-[0.15px] whitespace-nowrap">Main origin and destination countries</p>
      <p className="absolute font-['IBM_Plex_Sans:Bold',sans-serif] leading-[normal] left-[80px] not-italic text-[#263238] text-[34px] top-[96px] tracking-[-0.34px] whitespace-nowrap">European asylum seeker application decisions</p>
      <div className="absolute h-[64px] left-0 right-0 top-0" data-name="Header / Desktop">
        <div className="absolute bg-[#cfd8dc] bottom-[-1px] h-px left-0 right-0" data-name="Divider" />
        <div className="absolute bottom-0 left-0 top-0 w-[360px]" data-name="Left / Logo">
          <div className="absolute bg-white inset-0" data-name="Base" />
          <div className="-translate-y-1/2 absolute content-stretch flex gap-[16px] items-center left-[24px] overflow-clip top-1/2" data-name="Logo & Title">
            <div className="overflow-clip relative shrink-0 size-[48px]" data-name="Logo">
              <div className="absolute bg-gradient-to-b from-[#97abff] from-[35.417%] inset-0 rounded-[99px] to-[#123597] to-[185.42%]" data-name="Logo" />
              <div className="absolute flex flex-col font-['IBM_Plex_Sans:Bold',sans-serif] inset-0 justify-center leading-[0] not-italic text-[24px] text-center text-white">
                <p className="leading-[normal]">S</p>
              </div>
            </div>
            <p className="font-['IBM_Plex_Sans:Bold',sans-serif] h-[44px] leading-[normal] not-italic relative shrink-0 text-[#263238] text-[34px] tracking-[-0.34px] w-[240px]">Sankey</p>
          </div>
        </div>
        <div className="absolute bottom-0 overflow-clip right-0 top-0 w-[360px]" data-name="Right / Icons">
          <div className="absolute bg-white inset-0" data-name="Base" />
          <div className="-translate-y-1/2 absolute content-stretch flex gap-[24px] items-center overflow-clip right-[24px] top-1/2" data-name="Userpic & Icons">
            <div className="relative shrink-0 size-[24px]" data-name="finance / wallet">
              <div className="absolute inset-[5.52%_8.33%_12.5%_8.33%]" data-name="icon">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 19.6748">
                  <path clipRule="evenodd" d={svgPaths.p177cf700} fill="var(--fill-0, #607080)" fillRule="evenodd" id="icon" />
                </svg>
              </div>
            </div>
            <div className="relative shrink-0 size-[24px]" data-name="notifications / bell">
              <div className="absolute inset-[4.17%_8.33%_4.13%_8.33%]" data-name="icon">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 22.0093">
                  <path clipRule="evenodd" d={svgPaths.p10096700} fill="var(--fill-0, #607080)" fillRule="evenodd" id="icon" />
                </svg>
              </div>
            </div>
            <div className="relative shrink-0 size-[24px]" data-name="basic / settings">
              <div className="absolute inset-[4.17%]" data-name="icon">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 21.999">
                  <path clipRule="evenodd" d={svgPaths.p1a2ac280} fill="var(--fill-0, #607080)" fillRule="evenodd" id="icon" />
                </svg>
              </div>
            </div>
            <div className="relative shrink-0 size-[48px]" data-name="Userpic">
              <div className="absolute inset-0 rounded-[99px]" data-name="Userpic">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[99px] size-full" src={imgUserpic} />
              </div>
              <div className="absolute bottom-0 right-0 size-[12px]" data-name="Status">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                  <circle cx="6" cy="6" fill="var(--fill-0, #1DD1A1)" id="Status" r="5" stroke="var(--stroke-0, white)" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-[0_360px]" data-name="Center / Data">
          <div className="absolute bg-white inset-0" data-name="Base" />
          <div className="absolute inset-[12.5%_76.67%_12.5%_0]" data-name="Data">
            <div className="-translate-y-1/2 absolute content-stretch flex gap-[8px] items-center left-[16px] overflow-clip top-[calc(50%+7px)]" data-name="Stats">
              <Helper1 text="2077" text1="h" />
              <BadgeText text="10%" />
            </div>
            <p className="absolute capitalize font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] left-[16px] not-italic text-[#263238] text-[12px] top-[calc(50%-24px)] tracking-[0.4px] whitespace-nowrap">Forecast Hours</p>
          </div>
          <div className="absolute inset-[12.5%_51.11%_12.5%_25.56%]" data-name="Data">
            <DesktopLightHelper />
            <div className="-translate-y-1/2 absolute content-stretch flex gap-[8px] items-center left-[16px] overflow-clip top-[calc(50%+7px)]" data-name="Stats">
              <Helper1 text="100" text1="h" />
              <BadgeText1 text="8%" />
            </div>
            <p className="absolute capitalize font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] left-[16px] not-italic text-[#263238] text-[12px] top-[calc(50%-24px)] tracking-[0.4px] whitespace-nowrap">Workflow hours</p>
          </div>
          <div className="absolute inset-[12.5%_25.56%_12.5%_51.11%]" data-name="Data">
            <DesktopLightHelper />
            <div className="-translate-y-1/2 absolute content-stretch flex gap-[8px] items-center left-[16px] overflow-clip top-[calc(50%+7px)]" data-name="Stats">
              <Helper2 text="$" text1="256 489" />
              <BadgeText text="28%" />
            </div>
            <p className="absolute capitalize font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] left-[16px] not-italic text-[#263238] text-[12px] top-[calc(50%-24px)] tracking-[0.4px] whitespace-nowrap">Forecast income</p>
          </div>
          <div className="absolute inset-[12.5%_0_12.5%_76.67%]" data-name="Data">
            <DesktopLightHelper />
            <div className="-translate-y-1/2 absolute content-stretch flex gap-[8px] items-center left-[16px] overflow-clip top-[calc(50%+7px)]" data-name="Stats">
              <Helper2 text="$" text1="17 420" />
              <BadgeText1 text="44%" />
            </div>
            <p className="absolute capitalize font-['IBM_Plex_Sans:Regular',sans-serif] leading-[16px] left-[16px] not-italic text-[#263238] text-[12px] top-[calc(50%-24px)] tracking-[0.4px] whitespace-nowrap">Workflow income</p>
          </div>
        </div>
      </div>
    </div>
  );
}