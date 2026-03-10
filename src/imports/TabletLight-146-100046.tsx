import clsx from "clsx";
import svgPaths from "./svg-f9a5pmjfev";
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

export default function TabletLight() {
  return (
    <div className="bg-white overflow-clip relative rounded-[8px] shadow-[0px_16px_32px_0px_rgba(176,190,197,0.24),0px_4px_8px_0px_rgba(176,190,197,0.48)] size-full" data-name="Tablet Light">
      <div className="absolute h-[854px] left-[35px] right-[35px] top-[258px]" data-name="Charts">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 698 854">
          <g id="Charts">
            <path d={svgPaths.p39082180} fill="url(#paint0_linear_146_100756)" id="Chart" opacity="0.5" />
            <path d={svgPaths.p15b38100} fill="url(#paint1_linear_146_100756)" id="Chart_2" opacity="0.5" />
            <path d={svgPaths.p13f85a00} fill="url(#paint2_linear_146_100756)" id="Chart_3" opacity="0.5" />
            <path d={svgPaths.p34aa9a00} fill="url(#paint3_linear_146_100756)" id="Chart_4" opacity="0.5" />
            <path d={svgPaths.p21bc6400} fill="url(#paint4_linear_146_100756)" id="Chart_5" opacity="0.5" />
            <path d={svgPaths.p2bff7400} fill="url(#paint5_linear_146_100756)" id="Chart_6" opacity="0.5" />
            <path d={svgPaths.pb419000} fill="url(#paint6_linear_146_100756)" id="Chart_7" opacity="0.5" />
            <path d={svgPaths.p358d2880} fill="url(#paint7_linear_146_100756)" id="Chart_8" opacity="0.5" />
            <path d={svgPaths.p2e9fa580} fill="url(#paint8_linear_146_100756)" id="Chart_9" opacity="0.5" />
            <path d={svgPaths.p1ae3fc00} fill="url(#paint9_linear_146_100756)" id="Chart_10" opacity="0.5" />
            <path d={svgPaths.pb54e500} fill="url(#paint10_linear_146_100756)" id="Chart_11" opacity="0.5" />
            <path d={svgPaths.p273542f0} fill="url(#paint11_linear_146_100756)" id="Chart_12" opacity="0.5" />
            <path d={svgPaths.pccb5180} fill="url(#paint12_linear_146_100756)" id="Chart_13" opacity="0.5" />
            <path d={svgPaths.p787a80} fill="url(#paint13_linear_146_100756)" id="Chart_14" opacity="0.5" />
            <path d={svgPaths.p1f7b9200} fill="url(#paint14_linear_146_100756)" id="Chart_15" opacity="0.5" />
            <path d={svgPaths.pacfd200} fill="url(#paint15_linear_146_100756)" id="Chart_16" opacity="0.5" />
            <path d={svgPaths.p25324180} fill="url(#paint16_linear_146_100756)" id="Chart_17" opacity="0.5" />
            <path d={svgPaths.p3ed21732} fill="url(#paint17_linear_146_100756)" id="Chart_18" opacity="0.5" />
            <path d={svgPaths.p31149a00} fill="url(#paint18_linear_146_100756)" id="Chart_19" opacity="0.5" />
            <path d={svgPaths.p36228300} fill="url(#paint19_linear_146_100756)" id="Chart_20" opacity="0.5" />
            <path d={svgPaths.p23cf0dc0} fill="url(#paint20_linear_146_100756)" id="Chart_21" opacity="0.5" />
            <path d={svgPaths.p3f2d0a31} fill="url(#paint21_linear_146_100756)" id="Chart_22" opacity="0.5" />
            <path d={svgPaths.p3f77f780} fill="url(#paint22_linear_146_100756)" id="Chart_23" opacity="0.5" />
            <path d={svgPaths.p124f8c00} fill="url(#paint23_linear_146_100756)" id="Chart_24" opacity="0.5" />
            <path d={svgPaths.p2f2bc000} fill="url(#paint24_linear_146_100756)" id="Chart_25" opacity="0.5" />
            <path d={svgPaths.p3a3ff300} fill="url(#paint25_linear_146_100756)" id="Chart_26" opacity="0.5" />
            <path d={svgPaths.p1ca4e4c0} fill="url(#paint26_linear_146_100756)" id="Chart_27" opacity="0.5" />
            <path d={svgPaths.p30de0880} fill="url(#paint27_linear_146_100756)" id="Chart_28" opacity="0.5" />
            <path d={svgPaths.p10af1280} fill="url(#paint28_linear_146_100756)" id="Chart_29" opacity="0.5" />
            <path d={svgPaths.p2c985880} fill="url(#paint29_linear_146_100756)" id="Chart_30" opacity="0.5" />
            <path d={svgPaths.p214a7f00} fill="url(#paint30_linear_146_100756)" id="Chart_31" opacity="0.5" />
            <path d={svgPaths.p2cb4f600} fill="url(#paint31_linear_146_100756)" id="Chart_32" opacity="0.5" />
            <path d={svgPaths.p3d3cfa70} fill="url(#paint32_linear_146_100756)" id="Chart_33" opacity="0.5" />
            <path d={svgPaths.p12ce2b00} fill="url(#paint33_linear_146_100756)" id="Chart_34" opacity="0.5" />
            <path d={svgPaths.p3873b380} fill="url(#paint34_linear_146_100756)" id="Chart_35" opacity="0.5" />
            <path d={svgPaths.p2d8dba00} fill="url(#paint35_linear_146_100756)" id="Chart_36" opacity="0.5" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_146_100756" x1="1.09174" x2="695.398" y1="33.8971" y2="66.4611">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_146_100756" x1="1.09188" x2="697.182" y1="255.46" y2="267.987">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_146_100756" x1="1.09165" x2="696.15" y1="288.736" y2="298.982">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint3_linear_146_100756" x1="1.09174" x2="696.847" y1="342.388" y2="349.793">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint4_linear_146_100756" x1="1.09174" x2="695.127" y1="117.234" y2="152.561">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint5_linear_146_100756" x1="1.09182" x2="689.26" y1="228.527" y2="303.902">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint6_linear_146_100756" x1="1.09174" x2="694.625" y1="299.602" y2="339.548">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint7_linear_146_100756" x1="1.09161" x2="694.598" y1="366.318" y2="396.633">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint8_linear_146_100756" x1="1.09174" x2="696.422" y1="446.078" y2="464.79">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint9_linear_146_100756" x1="1.09161" x2="695.146" y1="407.456" y2="430.674">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint10_linear_146_100756" x1="1.09161" x2="695.712" y1="544.038" y2="556.151">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint11_linear_146_100756" x1="1.09161" x2="695.464" y1="640.741" y2="658.596">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint12_linear_146_100756" x1="1.09174" x2="696.138" y1="695.214" y2="718.618">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint13_linear_146_100756" x1="1.09161" x2="690.51" y1="789.917" y2="851.003">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint14_linear_146_100756" x1="1.09174" x2="696.618" y1="501.542" y2="516.18">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint15_linear_146_100756" x1="1.09161" x2="695.113" y1="610.509" y2="634.213">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint16_linear_146_100756" x1="1.09161" x2="642.124" y1="760.46" y2="946.165">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint17_linear_146_100756" x1="1.09161" x2="555.014" y1="844.148" y2="1123.53">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint18_linear_146_100756" x1="1.09161" x2="689.132" y1="792.98" y2="861.333">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint19_linear_146_100756" x1="1.09174" x2="695.009" y1="669.309" y2="705.778">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint20_linear_146_100756" x1="1.09187" x2="693.783" y1="493.58" y2="547.168">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint21_linear_146_100756" x1="1.09187" x2="693.446" y1="576.817" y2="632.527">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint22_linear_146_100756" x1="1.09161" x2="692.179" y1="573.482" y2="624.345">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint23_linear_146_100756" x1="1.09161" x2="694.743" y1="518.497" y2="547.102">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint24_linear_146_100756" x1="1.09161" x2="694.96" y1="596.592" y2="622.437">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint25_linear_146_100756" x1="1.09161" x2="695.383" y1="544.852" y2="564.218">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint26_linear_146_100756" x1="1.09161" x2="695.641" y1="572.207" y2="586.192">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint27_linear_146_100756" x1="1.09161" x2="695.474" y1="625.467" y2="643.114">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint28_linear_146_100756" x1="1.09174" x2="695.825" y1="421.95" y2="449.597">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint29_linear_146_100756" x1="1.09161" x2="693.889" y1="665.297" y2="702.838">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint30_linear_146_100756" x1="1.09161" x2="694.879" y1="707.919" y2="734.836">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint31_linear_146_100756" x1="1.09174" x2="696.625" y1="476.515" y2="490.966">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint32_linear_146_100756" x1="1.09174" x2="696.468" y1="334.983" y2="352.819">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint33_linear_146_100756" x1="0.0918655" x2="696.688" y1="364.705" y2="377.644">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint34_linear_146_100756" x1="0.0917475" x2="695.747" y1="384.275" y2="395.416">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint35_linear_146_100756" x1="1.09191" x2="698.174" y1="188.836" y2="196.822">
              <stop stopColor="#54A0FF" />
              <stop offset="1" stopColor="#10AC84" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute contents left-[24px] top-[160px]" data-name="Left Elements">
        <div className="absolute flex h-[100px] items-center justify-center left-[28px] top-[208px] w-px">
          <div className="-scale-y-100 flex-none rotate-180">
            <div className="h-[100px] relative w-px" data-name="Line">
              <div aria-hidden="true" className="absolute border-2 border-[#263238] border-dashed inset-[-1px] pointer-events-none" />
            </div>
          </div>
        </div>
        <SankeyMaster additionalClassNames="h-[78px] left-[24px] top-[965px]">
          <Body additionalClassNames="bg-[#98c6ff]" />
          <Helper text="Poland" text1="26,253" />
        </SankeyMaster>
        <SankeyMaster additionalClassNames="h-[100px] left-[24px] top-[845px]">
          <Body additionalClassNames="bg-[#54a0ff]" />
          <Helper text="Czech Republic" text1="30,903" />
        </SankeyMaster>
        <SankeyMaster additionalClassNames="h-[43px] left-[24px] top-[782px]">
          <Body additionalClassNames="bg-[#2e86de]" />
          <LabelRText text="Italy" />
        </SankeyMaster>
        <SankeyMaster additionalClassNames="h-[58px] left-[24px] top-[703px]">
          <Body additionalClassNames="bg-[#256bb2]" />
          <Helper text="Britain" text1="70,770" />
        </SankeyMaster>
        <SankeyMaster additionalClassNames="h-[104px] left-[24px] top-[579px]">
          <Body additionalClassNames="bg-[#1c5085]" />
          <Helper text="France" text1="72,638" />
        </SankeyMaster>
        <SankeyMaster additionalClassNames="h-[82px] left-[24px] top-[477px]">
          <Body additionalClassNames="bg-[#364b63]" />
          <Helper text="Sweden" text1="86,811" />
        </SankeyMaster>
        <SankeyMaster additionalClassNames="h-[112px] left-[24px] top-[345px]">
          <Body additionalClassNames="bg-[#364b63]" />
          <Helper text="Switzerland" text1="94,236" />
        </SankeyMaster>
        <SankeyMaster additionalClassNames="h-[66px] left-[24px] top-[259px]">
          <Body additionalClassNames="bg-[#263238]" />
          <Helper text="Germany" text1="100,897" />
        </SankeyMaster>
        <SankeyMaster additionalClassNames="h-[50px] left-[24px] top-[1063px]">
          <Body additionalClassNames="bg-[#cce3ff]" />
          <LabelRText text="Belgium" />
        </SankeyMaster>
        <p className="absolute font-['IBM_Plex_Sans:Bold',sans-serif] leading-[0] left-[45px] not-italic text-[#263238] text-[0px] text-[20px] top-[208px] tracking-[0.15px] w-[66px]">
          <span className="leading-[28px]">Origin</span>
          <span className="leading-[28px]">{` `}</span>
        </p>
        <div className="absolute h-[32px] left-[24px] top-[160px] w-[95px]" data-name="Badge">
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
      <div className="absolute contents right-[24px] top-[208px]" data-name="Right Elements">
        <div className="absolute h-[165px] right-[28px] top-[208px] w-px" data-name="Line">
          <div aria-hidden="true" className="absolute border-2 border-[#263238] border-dashed inset-[-1px] pointer-events-none" />
        </div>
        <SankeyMaster additionalClassNames="h-[53px] right-[24px] top-[1060px]">
          <Helper text="Russia" text1="3,959" additionalClassNames="text-right" />
          <Body additionalClassNames="bg-[#bbf1e3]" />
        </SankeyMaster>
        <SankeyMaster additionalClassNames="h-[99px] right-[24px] top-[941px]">
          <Helper text="Pakistan" text1="8,123" additionalClassNames="text-right" />
          <Body additionalClassNames="bg-[#77e3c7]" />
        </SankeyMaster>
        <SankeyMaster additionalClassNames="h-[54px] right-[24px] top-[867px]">
          <Helper text="Afghanistan" text1="15,447" additionalClassNames="text-right" />
          <Body additionalClassNames="bg-[#1dd1a1]" />
        </SankeyMaster>
        <SankeyMaster additionalClassNames="h-[96px] right-[24px] top-[751px]">
          <Helper text="Syria" text1="21,546" additionalClassNames="text-right" />
          <Body additionalClassNames="bg-[#10ac84]" />
        </SankeyMaster>
        <SankeyMaster additionalClassNames="h-[386px] right-[24px] top-[345px]">
          <Helper text="Serbia" text1="29,265" additionalClassNames="text-right" />
          <Body additionalClassNames="bg-[#0d8a6a]" />
        </SankeyMaster>
        <div className="absolute font-['IBM_Plex_Sans:Bold',sans-serif] leading-[28px] not-italic right-[45px] text-[#263238] text-[20px] text-right top-[208px] tracking-[0.15px] w-[104px]">
          <p className="mb-0">Decisions</p>
          <p>by origin</p>
        </div>
      </div>
      <div className="absolute h-[24px] right-[24px] top-[136px] w-[200px]" data-name="Badge">
        <div className="absolute inset-0 rounded-[8px]" data-name="🎨 Colors Dark">
          <div className="absolute bg-[#bbf1e3] inset-0 rounded-[8px]" data-name="BG dark" />
        </div>
        <div className="absolute inset-[0_8px]" data-name="Label">
          <div className="absolute flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#0a674f] text-[16px] tracking-[0.44px]">
            <p className="leading-[24px]">373,094</p>
          </div>
        </div>
      </div>
      <div className="absolute h-[24px] right-[24px] top-[104px] w-[126px]" data-name="Badge">
        <div className="absolute inset-0 rounded-[8px]" data-name="🎨 Colors Dark">
          <div className="absolute bg-[#ffd3d3] inset-0 rounded-[8px]" data-name="BG dark" />
        </div>
        <div className="absolute inset-[0_8px]" data-name="Label">
          <div className="absolute flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#8f3132] text-[16px] tracking-[0.44px]">
            <p className="leading-[24px]">220,699</p>
          </div>
        </div>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic right-[24px] text-[#263238] text-[16px] text-right top-[84px] tracking-[0.44px] whitespace-nowrap">
        <p className="leading-[24px]">Total asylym decisions</p>
      </div>
      <p className="absolute font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] left-[24px] not-italic text-[#78909c] text-[16px] top-[108px] tracking-[0.44px] whitespace-nowrap">Main origin and destination countries</p>
      <p className="absolute font-['IBM_Plex_Sans:Bold',sans-serif] leading-[28px] left-[24px] not-italic text-[#263238] text-[20px] top-[72px] tracking-[0.15px] whitespace-nowrap">European asylum seeker application decisions</p>
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
                <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#2e86de] text-[16px] tracking-[0.44px] whitespace-nowrap">2020</p>
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
    </div>
  );
}