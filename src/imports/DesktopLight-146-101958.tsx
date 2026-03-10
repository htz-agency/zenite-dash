import clsx from "clsx";
type SegmentedDropdownProps = {
  additionalClassNames?: string;
};

function SegmentedDropdown({ children, additionalClassNames = "" }: React.PropsWithChildren<SegmentedDropdownProps>) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <div className="absolute bg-[#eceff1] inset-0 rounded-[8px]" data-name="BG light" />
      <div className="absolute inset-[6px_8px]" data-name="16 sp • Body 1">
        <div className="absolute flex flex-col font-['IBM_Plex_Sans:Bold',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#263238] text-[14px] text-center tracking-[0.1px]">
          <p className="leading-[24px]">{children}</p>
        </div>
      </div>
    </div>
  );
}
type DesktopLightCaptionText1Props = {
  text: string;
  additionalClassNames?: string;
};

function DesktopLightCaptionText1({ text, additionalClassNames = "" }: DesktopLightCaptionText1Props) {
  return (
    <div className={clsx("absolute h-[48px] left-0 w-[64px]", additionalClassNames)}>
      <div className="absolute capitalize flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#78909c] text-[12px] tracking-[0.4px]">
        <p className="leading-[16px]">{text}</p>
      </div>
    </div>
  );
}
type DesktopLightLineRegularProps = {
  additionalClassNames?: string;
};

function DesktopLightLineRegular({ additionalClassNames = "" }: DesktopLightLineRegularProps) {
  return (
    <div className={clsx("absolute h-0 left-0 right-0", additionalClassNames)}>
      <div className="absolute inset-[-1px_0_0_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1392 1">
          <line id="Line" stroke="var(--stroke-0, #263238)" x2="1392" y1="0.5" y2="0.5" />
        </svg>
      </div>
    </div>
  );
}
type DesktopLightCaptionTextProps = {
  text: string;
  additionalClassNames?: string;
};

function DesktopLightCaptionText({ text, additionalClassNames = "" }: DesktopLightCaptionTextProps) {
  return (
    <div className={clsx("absolute bottom-0 h-[16px] w-[48px]", additionalClassNames)}>
      <div className="absolute capitalize flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-end leading-[0] not-italic text-[#78909c] text-[12px] text-center tracking-[0.4px]">
        <p className="leading-[16px]">{text}</p>
      </div>
    </div>
  );
}
type LineRegularProps = {
  additionalClassNames?: string;
};

function LineRegular({ additionalClassNames = "" }: LineRegularProps) {
  return (
    <div className={clsx("relative size-full", additionalClassNames)}>
      <div className="absolute inset-[-1px_0_0_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 600 1">
          <line id="Line" stroke="var(--stroke-0, #263238)" x2="600" y1="0.5" y2="0.5" />
        </svg>
      </div>
    </div>
  );
}
type DesktopLightHelperProps = {
  additionalClassNames?: string;
};

function DesktopLightHelper({ additionalClassNames = "" }: DesktopLightHelperProps) {
  return (
    <div className={clsx("absolute bottom-[24px] flex items-center justify-center top-0 w-0", additionalClassNames)}>
      <div className="flex-none h-px rotate-90 w-[456px]">
        <LineRegular additionalClassNames="opacity-12" />
      </div>
    </div>
  );
}
type CellsAmberText1Props = {
  text: string;
  additionalClassNames?: string;
};

function CellsAmberText1({ text, additionalClassNames = "" }: CellsAmberText1Props) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <div className="absolute bg-[#feca57] inset-0 rounded-[99px]" data-name="BG" />
      <div className="absolute flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#1b314b] text-[14px] text-center tracking-[0.25px]">
        <p className="leading-[20px]">{text}</p>
      </div>
    </div>
  );
}
type BlueText3Props = {
  text: string;
  additionalClassNames?: string;
};

function BlueText3({ text, additionalClassNames = "" }: BlueText3Props) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <Bg additionalClassNames="bg-[#54a0ff]" />
      <div className="absolute flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[16px] text-center text-white tracking-[0.44px]">
        <p className="leading-[24px]">{text}</p>
      </div>
    </div>
  );
}
type AmberText3Props = {
  text: string;
  additionalClassNames?: string;
};

function AmberText3({ text, additionalClassNames = "" }: AmberText3Props) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <Bg additionalClassNames="bg-[#feca57]" />
      <div className="absolute flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#1b314b] text-[16px] text-center tracking-[0.44px]">
        <p className="leading-[24px]">{text}</p>
      </div>
    </div>
  );
}
type CellsBlueTextProps = {
  text: string;
  additionalClassNames?: string;
};

function CellsBlueText({ text, additionalClassNames = "" }: CellsBlueTextProps) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <div className="absolute bg-[#54a0ff] inset-0 rounded-[99px]" data-name="BG" />
      <div className="absolute flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[10px] text-center text-white tracking-[0.3px]">
        <p className="leading-[14px]">{text}</p>
      </div>
    </div>
  );
}
type BlueText2Props = {
  text: string;
  additionalClassNames?: string;
};

function BlueText2({ text, additionalClassNames = "" }: BlueText2Props) {
  return (
    <div className={clsx("absolute size-[16px]", additionalClassNames)}>
      <Bg additionalClassNames="bg-[#54a0ff]" />
      <div className="absolute flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[10px] text-center text-white tracking-[0.3px]">
        <p className="leading-[14px]">{text}</p>
      </div>
    </div>
  );
}
type AmberText2Props = {
  text: string;
  additionalClassNames?: string;
};

function AmberText2({ text, additionalClassNames = "" }: AmberText2Props) {
  return (
    <div className={clsx("absolute size-[16px]", additionalClassNames)}>
      <Bg additionalClassNames="bg-[#feca57]" />
      <div className="absolute flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#1b314b] text-[10px] text-center tracking-[0.3px]">
        <p className="leading-[14px]">{text}</p>
      </div>
    </div>
  );
}
type BlueText1Props = {
  text: string;
  additionalClassNames?: string;
};

function BlueText1({ text, additionalClassNames = "" }: BlueText1Props) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <Bg additionalClassNames="bg-[#54a0ff]" />
      <div className="absolute capitalize flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[12px] text-center text-white tracking-[0.4px]">
        <p className="leading-[16px]">{text}</p>
      </div>
    </div>
  );
}
type AmberText1Props = {
  text: string;
  additionalClassNames?: string;
};

function AmberText1({ text, additionalClassNames = "" }: AmberText1Props) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <Bg additionalClassNames="bg-[#feca57]" />
      <div className="absolute capitalize flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#1b314b] text-[12px] text-center tracking-[0.4px]">
        <p className="leading-[16px]">{text}</p>
      </div>
    </div>
  );
}
type BlueTextProps = {
  text: string;
  additionalClassNames?: string;
};

function BlueText({ text, additionalClassNames = "" }: BlueTextProps) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <Bg additionalClassNames="bg-[#54a0ff]" />
      <div className="absolute flex flex-col font-['IBM_Plex_Sans:Bold',sans-serif] inset-0 justify-center leading-[0] not-italic text-[14px] text-center text-white tracking-[0.1px]">
        <p className="leading-[24px]">{text}</p>
      </div>
    </div>
  );
}
type AmberTextProps = {
  text: string;
  additionalClassNames?: string;
};

function AmberText({ text, additionalClassNames = "" }: AmberTextProps) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <Bg additionalClassNames="bg-[#feca57]" />
      <p className="absolute font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 leading-[14px] not-italic text-[#1b314b] text-[10px] text-center tracking-[0.3px]">{text}</p>
    </div>
  );
}
type BgProps = {
  additionalClassNames?: string;
};

function Bg({ additionalClassNames = "" }: BgProps) {
  return (
    <div className={clsx("absolute inset-0 rounded-[99px]", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border border-solid border-white inset-[-0.5px] pointer-events-none rounded-[99.5px]" />
    </div>
  );
}
type CellsAmberTextProps = {
  text: string;
  additionalClassNames?: string;
};

function CellsAmberText({ text, additionalClassNames = "" }: CellsAmberTextProps) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <Bg additionalClassNames="bg-[#feca57]" />
      <div className="absolute flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#1b314b] text-[14px] text-center tracking-[0.25px]">
        <p className="leading-[20px]">{text}</p>
      </div>
    </div>
  );
}

export default function DesktopLight() {
  return (
    <div className="overflow-clip relative rounded-[8px] shadow-[0px_16px_32px_0px_rgba(176,190,197,0.24),0px_4px_8px_0px_rgba(176,190,197,0.48)] size-full" data-name="Desktop Light">
      <div className="absolute inset-0 shadow-[0px_16px_32px_0px_rgba(176,190,197,0.24),0px_4px_8px_0px_rgba(176,190,197,0.48)]" data-name="Background Card">
        <div className="absolute bg-white inset-0 rounded-[3px]" data-name="BG light" />
      </div>
      <div className="absolute inset-[96px_32px_24px_48px] overflow-clip" data-name="Bottom · 56dp">
        <DesktopLightHelper additionalClassNames="left-[24px]" />
        <DesktopLightHelper additionalClassNames="left-[80px]" />
        <DesktopLightHelper additionalClassNames="left-[136px]" />
        <DesktopLightHelper additionalClassNames="left-[192px]" />
        <DesktopLightHelper additionalClassNames="left-[248px]" />
        <DesktopLightHelper additionalClassNames="left-[304px]" />
        <DesktopLightHelper additionalClassNames="left-[360px]" />
        <DesktopLightHelper additionalClassNames="left-[416px]" />
        <DesktopLightHelper additionalClassNames="left-[472px]" />
        <div className="absolute bottom-[24px] flex items-center justify-center left-[528px] top-0 w-0">
          <div className="flex-none h-px rotate-90 w-[456px]">
            <LineRegular additionalClassNames="opacity-32" />
          </div>
        </div>
        <DesktopLightHelper additionalClassNames="left-[584px]" />
        <DesktopLightHelper additionalClassNames="left-[640px]" />
        <DesktopLightHelper additionalClassNames="left-[696px]" />
        <DesktopLightHelper additionalClassNames="left-[752px]" />
        <DesktopLightHelper additionalClassNames="left-[808px]" />
        <DesktopLightHelper additionalClassNames="left-[864px]" />
        <DesktopLightHelper additionalClassNames="left-[920px]" />
        <DesktopLightHelper additionalClassNames="left-[976px]" />
        <DesktopLightHelper additionalClassNames="left-[1032px]" />
        <DesktopLightHelper additionalClassNames="left-[1088px]" />
        <DesktopLightHelper additionalClassNames="left-[1144px]" />
        <DesktopLightHelper additionalClassNames="left-[1200px]" />
        <DesktopLightHelper additionalClassNames="left-[1256px]" />
        <DesktopLightHelper additionalClassNames="left-[1312px]" />
        <DesktopLightHelper additionalClassNames="left-[1368px]" />
        <DesktopLightCaptionText text="aug" additionalClassNames="left-[392px]" />
        <DesktopLightCaptionText text="sep" additionalClassNames="left-[448px]" />
        <div className="absolute bottom-0 h-[16px] left-[504px] w-[48px]" data-name="Caption">
          <div className="absolute capitalize flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-end leading-[0] not-italic text-[#020203] text-[12px] text-center tracking-[0.4px]">
            <p className="leading-[16px]">oct</p>
          </div>
        </div>
        <DesktopLightCaptionText text="nov" additionalClassNames="left-[560px]" />
        <DesktopLightCaptionText text="dec" additionalClassNames="left-[616px]" />
        <DesktopLightCaptionText text="jan" additionalClassNames="left-[672px]" />
        <DesktopLightCaptionText text="feb" additionalClassNames="left-[728px]" />
        <DesktopLightCaptionText text="mar" additionalClassNames="left-[784px]" />
        <DesktopLightCaptionText text="jul" additionalClassNames="left-[840px]" />
        <DesktopLightCaptionText text="aug" additionalClassNames="left-[896px]" />
        <DesktopLightCaptionText text="sep" additionalClassNames="left-[952px]" />
        <DesktopLightCaptionText text="oct" additionalClassNames="left-[1008px]" />
        <DesktopLightCaptionText text="nov" additionalClassNames="left-[1064px]" />
        <DesktopLightCaptionText text="dec" additionalClassNames="left-[1120px]" />
        <DesktopLightCaptionText text="jan" additionalClassNames="left-[1176px]" />
        <DesktopLightCaptionText text="feb" additionalClassNames="left-[1232px]" />
        <DesktopLightCaptionText text="mar" additionalClassNames="left-[1288px]" />
        <DesktopLightCaptionText text="jan" additionalClassNames="left-0" />
        <DesktopLightCaptionText text="feb" additionalClassNames="left-[56px]" />
        <DesktopLightCaptionText text="mar" additionalClassNames="left-[112px]" />
        <DesktopLightCaptionText text="apr" additionalClassNames="left-[168px]" />
        <DesktopLightCaptionText text="may" additionalClassNames="left-[224px]" />
        <DesktopLightCaptionText text="jun" additionalClassNames="left-[280px]" />
        <DesktopLightCaptionText text="jul" additionalClassNames="left-[336px]" />
      </div>
      <div className="absolute inset-[96px_24px_48px_24px] overflow-clip" data-name="Left · 56dp">
        <DesktopLightLineRegular additionalClassNames="opacity-12 top-[56px]" />
        <DesktopLightLineRegular additionalClassNames="opacity-12 top-[112px]" />
        <DesktopLightLineRegular additionalClassNames="opacity-12 top-[168px]" />
        <DesktopLightLineRegular additionalClassNames="opacity-12 top-[224px]" />
        <DesktopLightLineRegular additionalClassNames="opacity-32 top-[280px]" />
        <DesktopLightLineRegular additionalClassNames="opacity-12 top-[336px]" />
        <DesktopLightLineRegular additionalClassNames="opacity-12 top-[504px]" />
        <DesktopLightLineRegular additionalClassNames="opacity-12 top-[560px]" />
        <DesktopLightLineRegular additionalClassNames="opacity-12 top-[616px]" />
        <DesktopLightLineRegular additionalClassNames="opacity-12 top-[672px]" />
        <DesktopLightLineRegular additionalClassNames="opacity-12 top-[728px]" />
        <DesktopLightLineRegular additionalClassNames="opacity-12 top-[392px]" />
        <DesktopLightLineRegular additionalClassNames="opacity-12 top-[448px]" />
        <DesktopLightLineRegular additionalClassNames="opacity-12 top-[840px]" />
        <DesktopLightLineRegular additionalClassNames="opacity-12 top-[896px]" />
        <DesktopLightLineRegular additionalClassNames="opacity-12 top-[952px]" />
        <DesktopLightLineRegular additionalClassNames="opacity-12 top-[1008px]" />
        <DesktopLightLineRegular additionalClassNames="opacity-12 top-[1064px]" />
        <DesktopLightLineRegular additionalClassNames="opacity-12 top-[784px]" />
        <DesktopLightCaptionText1 text="10 k" additionalClassNames="top-[4px]" />
        <DesktopLightCaptionText1 text="5 k" additionalClassNames="top-[60px]" />
        <DesktopLightCaptionText1 text="1 k" additionalClassNames="top-[116px]" />
        <DesktopLightCaptionText1 text="500" additionalClassNames="top-[172px]" />
        <div className="absolute h-[48px] left-0 top-[228px] w-[64px]" data-name="Caption">
          <div className="absolute capitalize flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#020203] text-[12px] tracking-[0.4px]">
            <p className="leading-[16px]">250</p>
          </div>
        </div>
        <DesktopLightCaptionText1 text="125" additionalClassNames="top-[284px]" />
        <DesktopLightCaptionText1 text="75" additionalClassNames="top-[340px]" />
        <DesktopLightCaptionText1 text="0" additionalClassNames="top-[676px]" />
        <DesktopLightCaptionText1 text="50" additionalClassNames="top-[396px]" />
        <DesktopLightCaptionText1 text="25" additionalClassNames="top-[452px]" />
        <DesktopLightCaptionText1 text="15" additionalClassNames="top-[508px]" />
        <DesktopLightCaptionText1 text="5" additionalClassNames="top-[620px]" />
        <DesktopLightCaptionText1 text="0" additionalClassNames="top-[956px]" />
        <DesktopLightCaptionText1 text="0" additionalClassNames="top-[1012px]" />
        <DesktopLightCaptionText1 text="25" additionalClassNames="top-[732px]" />
        <DesktopLightCaptionText1 text="15" additionalClassNames="top-[788px]" />
        <DesktopLightCaptionText1 text="10" additionalClassNames="top-[844px]" />
        <DesktopLightCaptionText1 text="5" additionalClassNames="top-[900px]" />
      </div>
      <div className="absolute contents left-[60px] top-[120px]" data-name="Cells">
        <CellsAmberText text="56" additionalClassNames="left-[388px] size-[40px] top-[580px]" />
        <CellsAmberText text="56" additionalClassNames="left-[444px] size-[40px] top-[468px]" />
        <CellsAmberText text="40" additionalClassNames="left-[334px] size-[36px] top-[582px]" />
        <CellsAmberText text="56" additionalClassNames="left-[224px] size-[36px] top-[582px]" />
        <CellsAmberText text="40" additionalClassNames="left-[166px] size-[36px] top-[526px]" />
        <AmberText text="40" additionalClassNames="left-[670px] size-[36px] top-[414px]" />
        <CellsAmberText text="40" additionalClassNames="left-[446px] size-[36px] top-[414px]" />
        <BlueText text="56" additionalClassNames="left-[948px] size-[40px] top-[188px]" />
        <BlueText text="56" additionalClassNames="left-[1172px] size-[40px] top-[188px]" />
        <BlueText text="40" additionalClassNames="left-[950px] size-[36px] top-[134px]" />
        <CellsAmberText text="32" additionalClassNames="left-[112px] size-[32px] top-[584px]" />
        <BlueText text="32" additionalClassNames="left-[1344px] size-[32px] top-[136px]" />
        <BlueText text="32" additionalClassNames="left-[1176px] size-[32px] top-[248px]" />
        <CellsAmberText text="32" additionalClassNames="left-[728px] size-[32px] top-[416px]" />
        <BlueText text="32" additionalClassNames="left-[1008px] size-[32px] top-[192px]" />
        <CellsAmberText text="32" additionalClassNames="left-[392px] size-[32px] top-[472px]" />
        <CellsAmberText text="56" additionalClassNames="left-[612px] size-[40px] top-[356px]" />
        <div className="absolute left-[560px] shadow-[0px_4px_8px_0px_rgba(84,110,122,0.24)] size-[32px] top-[360px]" data-name="Amber">
          <Bg additionalClassNames="bg-[#263238]" />
          <div className="absolute flex flex-col font-['IBM_Plex_Sans:Bold',sans-serif] inset-0 justify-center leading-[0] not-italic text-[14px] text-center text-white tracking-[0.1px]">
            <p className="leading-[24px]">32</p>
          </div>
        </div>
        <AmberText text="32" additionalClassNames="left-[672px] size-[32px] top-[472px]" />
        <BlueText text="32" additionalClassNames="left-[896px] size-[32px] top-[360px]" />
        <AmberText1 text="12" additionalClassNames="left-[60px] size-[24px] top-[588px]" />
        <AmberText1 text="16" additionalClassNames="left-[396px] size-[24px] top-[644px]" />
        <AmberText1 text="16" additionalClassNames="left-[284px] size-[24px] top-[588px]" />
        <AmberText1 text="16" additionalClassNames="left-[340px] size-[24px] top-[476px]" />
        <AmberText1 text="16" additionalClassNames="left-[230px] size-[24px] top-[476px]" />
        <BlueText1 text="16" additionalClassNames="left-[956px] size-[24px] top-[364px]" />
        <AmberText1 text="8" additionalClassNames="left-[118px] size-[20px] top-[646px]" />
        <BlueText1 text="8" additionalClassNames="left-[958px] size-[20px] top-[422px]" />
        <BlueText1 text="8" additionalClassNames="left-[734px] size-[20px] top-[478px]" />
        <BlueText1 text="8" additionalClassNames="left-[1126px] size-[20px] top-[198px]" />
        <AmberText1 text="8" additionalClassNames="left-[398px] size-[20px] top-[422px]" />
        <BlueText1 text="8" additionalClassNames="left-[846px] size-[20px] top-[198px]" />
        <AmberText2 text="1" additionalClassNames="left-[64px] top-[648px]" />
        <BlueText2 text="1" additionalClassNames="left-[960px] top-[480px]" />
        <BlueText2 text="1" additionalClassNames="left-[736px] top-[144px]" />
        <CellsBlueText text="1" additionalClassNames="left-[680px] size-[16px] top-[480px]" />
        <BlueText2 text="2" additionalClassNames="left-[1184px] top-[312px]" />
        <BlueText2 text="3" additionalClassNames="left-[1016px] top-[368px]" />
        <CellsBlueText text="3" additionalClassNames="left-[679px] size-[18px] top-[423px]" />
        <AmberText2 text="1" additionalClassNames="left-[512px] top-[424px]" />
        <AmberText2 text="2" additionalClassNames="left-[344px] top-[536px]" />
        <AmberText2 text="2" additionalClassNames="left-[234px] top-[536px]" />
        <AmberText2 text="2" additionalClassNames="left-[176px] top-[592px]" />
        <AmberText2 text="1" additionalClassNames="left-[680px] top-[536px]" />
        <CellsAmberText text="88" additionalClassNames="left-[440px] size-[48px] top-[576px]" />
        <CellsAmberText text="88" additionalClassNames="left-[272px] size-[48px] top-[520px]" />
        <CellsAmberText text="104" additionalClassNames="left-[380px] size-[56px] top-[516px]" />
        <CellsAmberText text="56" additionalClassNames="left-[612px] size-[40px] top-[468px]" />
        <CellsAmberText text="40" additionalClassNames="left-[558px] size-[36px] top-[470px]" />
        <BlueText1 text="16" additionalClassNames="left-[900px] size-[24px] top-[140px]" />
        <BlueText1 text="16" additionalClassNames="left-[1068px] size-[24px] top-[252px]" />
        <BlueText1 text="16" additionalClassNames="left-[1292px] size-[24px] top-[252px]" />
        <AmberText1 text="8" additionalClassNames="left-[510px] size-[20px] top-[534px]" />
        <CellsAmberText text="104" additionalClassNames="left-[604px] size-[56px] top-[404px]" />
        <CellsAmberText text="112" additionalClassNames="left-[324px] size-[56px] top-[628px]" />
        <AmberText3 text="128" additionalClassNames="left-[432px] size-[64px] top-[512px]" />
        <BlueText text="56" additionalClassNames="left-[948px] size-[40px] top-[300px]" />
        <div className="absolute left-[894px] size-[36px] top-[302px]" data-name="Blue">
          <Bg additionalClassNames="bg-[#54a0ff]" />
          <p className="absolute font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 leading-[14px] not-italic text-[10px] text-center text-white tracking-[0.3px]">40</p>
        </div>
        <BlueText text="32" additionalClassNames="left-[840px] size-[32px] top-[304px]" />
        <BlueText text="104" additionalClassNames="left-[940px] size-[56px] top-[236px]" />
        <BlueText3 text="128" additionalClassNames="left-[990px] size-[68px] top-[230px]" />
        <AmberText3 text="128" additionalClassNames="left-[656px] size-[64px] top-[344px]" />
        <BlueText text="88" additionalClassNames="left-[1280px] size-[48px] top-[128px]" />
        <BlueText text="104" additionalClassNames="left-[1052px] size-[56px] top-[180px]" />
        <BlueText text="104" additionalClassNames="left-[1332px] size-[56px] top-[180px]" />
        <BlueText3 text="128" additionalClassNames="left-[1216px] size-[64px] top-[120px]" />
        <AmberText3 text="168" additionalClassNames="left-[480px] size-[80px] top-[560px]" />
        <div className="absolute left-[752px] size-[96px] top-[326px]" data-name="Blue">
          <Bg additionalClassNames="bg-[#54a0ff]" />
          <p className="absolute font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 leading-[24px] not-italic text-[16px] text-center text-white tracking-[0.44px]">192</p>
        </div>
        <AmberText text="88" additionalClassNames="left-[720px] size-[48px] top-[352px]" />
        <div className="absolute left-[828px] size-[56px] top-[348px]" data-name="Blue">
          <Bg additionalClassNames="bg-[#54a0ff]" />
          <p className="absolute capitalize font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 leading-[16px] not-italic text-[12px] text-center text-white tracking-[0.4px]">112</p>
        </div>
        <BlueText text="88" additionalClassNames="left-[1000px] size-[48px] top-[296px]" />
        <div className="absolute left-[732px] size-[24px] top-[364px]" data-name="Blue">
          <div className="absolute bg-[#54a0ff] inset-0 rounded-[99px]" data-name="BG" />
          <div className="absolute capitalize flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[12px] text-center text-white tracking-[0.4px]">
            <p className="leading-[16px]">16</p>
          </div>
        </div>
        <CellsAmberText1 text="104" additionalClassNames="left-[772px] size-[56px] top-[348px]" />
        <CellsAmberText1 text="32" additionalClassNames="left-[840px] size-[32px] top-[360px]" />
        <div className="absolute left-[904px] size-[16px] top-[312px]" data-name="Amber">
          <div className="absolute bg-[#feca57] inset-0 rounded-[99px]" data-name="BG" />
          <div className="absolute flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#1b314b] text-[10px] text-center tracking-[0.3px]">
            <p className="leading-[14px]">2</p>
          </div>
        </div>
      </div>
      <div className="absolute h-[64px] left-0 right-0 top-0" data-name="Header / Desktop">
        <div className="absolute bg-[#cfd8dc] bottom-[-1px] h-px left-0 right-0" data-name="Divider" />
        <div className="absolute bottom-0 left-0 top-0 w-[360px]" data-name="Left / Logo">
          <div className="absolute bg-white inset-0" data-name="Base" />
          <div className="-translate-y-1/2 absolute content-stretch flex gap-[16px] items-center left-[24px] overflow-clip top-1/2" data-name="Logo & Title">
            <div className="overflow-clip relative shrink-0 size-[48px]" data-name="Logo">
              <div className="absolute bg-gradient-to-b from-[#fccf31] from-[45.833%] inset-0 rounded-[99px] to-[#f55555] to-[120.83%]" data-name="Logo" />
              <div className="absolute flex flex-col font-['IBM_Plex_Sans:Bold',sans-serif] inset-0 justify-center leading-[0] not-italic text-[24px] text-center text-white">
                <p className="leading-[normal]">S</p>
              </div>
            </div>
            <p className="font-['IBM_Plex_Sans:Bold',sans-serif] h-[44px] leading-[normal] not-italic relative shrink-0 text-[#263238] text-[34px] tracking-[-0.34px] w-[240px]">Scatter</p>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 top-0 w-[360px]" data-name="Right / Segmented">
          <div className="absolute bg-white inset-0" data-name="Base" />
          <div className="absolute bottom-1/4 left-[9.17%] overflow-clip right-[9.17%] rounded-[8px] top-1/4" data-name="Segmented">
            <div className="absolute bg-[#eceff1] inset-0 rounded-[8px]" data-name="Base" />
            <SegmentedDropdown additionalClassNames="inset-[0_65.99%_0_0]">{`S&P 100`}</SegmentedDropdown>
            <SegmentedDropdown additionalClassNames="inset-[0_32.99%]">SV 150</SegmentedDropdown>
            <div className="absolute inset-[0_0_0_65.99%]" data-name="Dropdown">
              <div className="absolute bg-[#364b63] inset-0 rounded-[8px]" data-name="BG light" />
              <div className="absolute inset-[6px_8px]" data-name="16 sp • Body 1">
                <div className="absolute flex flex-col font-['IBM_Plex_Sans:Bold',sans-serif] inset-0 justify-center leading-[0] not-italic text-[14px] text-center text-white tracking-[0.1px]">
                  <p className="leading-[24px]">Both</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-[0_360px]" data-name="Center / Month">
          <div className="absolute bg-white inset-0" data-name="Base" />
          <div className="-translate-x-1/2 absolute content-stretch flex gap-[8px] items-center left-1/2 overflow-clip top-[16px]" data-name="Month Selector">
            <p className="font-['IBM_Plex_Sans:Bold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#263238] text-[24px] whitespace-nowrap">Women directors distribution</p>
          </div>
        </div>
      </div>
    </div>
  );
}