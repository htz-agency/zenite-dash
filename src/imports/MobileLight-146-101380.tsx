import clsx from "clsx";
import svgPaths from "./svg-2o9p08wcpa";
type MobileLightCaptionText1Props = {
  text: string;
  additionalClassNames?: string;
};

function MobileLightCaptionText1({ text, additionalClassNames = "" }: MobileLightCaptionText1Props) {
  return (
    <div className={clsx("absolute h-[48px] left-0 w-[64px]", additionalClassNames)}>
      <div className="absolute capitalize flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#78909c] text-[12px] tracking-[0.4px]">
        <p className="leading-[16px]">{text}</p>
      </div>
    </div>
  );
}
type MobileLightLineRegularProps = {
  additionalClassNames?: string;
};

function MobileLightLineRegular({ additionalClassNames = "" }: MobileLightLineRegularProps) {
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
type MobileLightCaptionTextProps = {
  text: string;
  additionalClassNames?: string;
};

function MobileLightCaptionText({ text, additionalClassNames = "" }: MobileLightCaptionTextProps) {
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
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 496 1">
          <line id="Line" stroke="var(--stroke-0, #263238)" x2="496" y1="0.5" y2="0.5" />
        </svg>
      </div>
    </div>
  );
}
type MobileLightHelperProps = {
  additionalClassNames?: string;
};

function MobileLightHelper({ additionalClassNames = "" }: MobileLightHelperProps) {
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

export default function MobileLight() {
  return (
    <div className="bg-white overflow-clip relative rounded-[8px] shadow-[0px_16px_32px_0px_rgba(176,190,197,0.24),0px_4px_8px_0px_rgba(176,190,197,0.48)] size-full" data-name="Mobile Light">
      <div className="absolute inset-[64px_-1032px_56px_32px] overflow-clip" data-name="Bottom · 56dp">
        <MobileLightHelper additionalClassNames="left-[24px]" />
        <div className="absolute bottom-[24px] flex items-center justify-center left-[80px] top-0 w-0">
          <div className="flex-none h-px rotate-90 w-[456px]">
            <LineRegular additionalClassNames="opacity-32" />
          </div>
        </div>
        <MobileLightHelper additionalClassNames="left-[136px]" />
        <MobileLightHelper additionalClassNames="left-[192px]" />
        <MobileLightHelper additionalClassNames="left-[248px]" />
        <MobileLightHelper additionalClassNames="left-[304px]" />
        <MobileLightHelper additionalClassNames="left-[360px]" />
        <MobileLightHelper additionalClassNames="left-[416px]" />
        <MobileLightHelper additionalClassNames="left-[472px]" />
        <MobileLightHelper additionalClassNames="left-[528px]" />
        <MobileLightHelper additionalClassNames="left-[584px]" />
        <MobileLightHelper additionalClassNames="left-[640px]" />
        <MobileLightHelper additionalClassNames="left-[696px]" />
        <MobileLightHelper additionalClassNames="left-[752px]" />
        <MobileLightHelper additionalClassNames="left-[808px]" />
        <MobileLightHelper additionalClassNames="left-[864px]" />
        <MobileLightHelper additionalClassNames="left-[920px]" />
        <MobileLightHelper additionalClassNames="left-[976px]" />
        <MobileLightHelper additionalClassNames="left-[1032px]" />
        <MobileLightHelper additionalClassNames="left-[1088px]" />
        <MobileLightHelper additionalClassNames="left-[1144px]" />
        <MobileLightHelper additionalClassNames="left-[1200px]" />
        <MobileLightHelper additionalClassNames="left-[1256px]" />
        <MobileLightHelper additionalClassNames="left-[1312px]" />
        <MobileLightHelper additionalClassNames="left-[1368px]" />
        <MobileLightCaptionText text="aug" additionalClassNames="left-[392px]" />
        <MobileLightCaptionText text="sep" additionalClassNames="left-[448px]" />
        <MobileLightCaptionText text="oct" additionalClassNames="left-[504px]" />
        <MobileLightCaptionText text="nov" additionalClassNames="left-[560px]" />
        <MobileLightCaptionText text="dec" additionalClassNames="left-[616px]" />
        <MobileLightCaptionText text="jan" additionalClassNames="left-[672px]" />
        <MobileLightCaptionText text="feb" additionalClassNames="left-[728px]" />
        <MobileLightCaptionText text="mar" additionalClassNames="left-[784px]" />
        <MobileLightCaptionText text="jul" additionalClassNames="left-[840px]" />
        <MobileLightCaptionText text="aug" additionalClassNames="left-[896px]" />
        <MobileLightCaptionText text="sep" additionalClassNames="left-[952px]" />
        <MobileLightCaptionText text="oct" additionalClassNames="left-[1008px]" />
        <MobileLightCaptionText text="nov" additionalClassNames="left-[1064px]" />
        <MobileLightCaptionText text="dec" additionalClassNames="left-[1120px]" />
        <MobileLightCaptionText text="jan" additionalClassNames="left-[1176px]" />
        <MobileLightCaptionText text="feb" additionalClassNames="left-[1232px]" />
        <MobileLightCaptionText text="mar" additionalClassNames="left-[1288px]" />
        <MobileLightCaptionText text="jan" additionalClassNames="left-0" />
        <div className="absolute bottom-0 h-[16px] left-[56px] w-[48px]" data-name="Caption">
          <div className="absolute capitalize flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-end leading-[0] not-italic text-[#020203] text-[12px] text-center tracking-[0.4px]">
            <p className="leading-[16px]">feb</p>
          </div>
        </div>
        <MobileLightCaptionText text="mar" additionalClassNames="left-[112px] opacity-54" />
        <MobileLightCaptionText text="apr" additionalClassNames="left-[168px] opacity-54" />
        <MobileLightCaptionText text="may" additionalClassNames="left-[224px] opacity-54" />
        <MobileLightCaptionText text="jun" additionalClassNames="left-[280px] opacity-54" />
        <MobileLightCaptionText text="jul" additionalClassNames="left-[336px] opacity-54" />
      </div>
      <div className="absolute inset-[64px_-1040px_56px_8px] overflow-clip" data-name="Left · 56dp">
        <MobileLightLineRegular additionalClassNames="opacity-12 top-[56px]" />
        <MobileLightLineRegular additionalClassNames="opacity-12 top-[112px]" />
        <MobileLightLineRegular additionalClassNames="opacity-12 top-[168px]" />
        <MobileLightLineRegular additionalClassNames="opacity-32 top-[224px]" />
        <MobileLightLineRegular additionalClassNames="opacity-12 top-[280px]" />
        <MobileLightLineRegular additionalClassNames="opacity-12 top-[336px]" />
        <MobileLightLineRegular additionalClassNames="opacity-12 top-[560px]" />
        <MobileLightLineRegular additionalClassNames="opacity-12 top-[616px]" />
        <MobileLightLineRegular additionalClassNames="opacity-12 top-[672px]" />
        <MobileLightLineRegular additionalClassNames="opacity-12 top-[728px]" />
        <MobileLightLineRegular additionalClassNames="opacity-12 top-[392px]" />
        <MobileLightLineRegular additionalClassNames="opacity-12 top-[448px]" />
        <MobileLightLineRegular additionalClassNames="opacity-12 top-[840px]" />
        <MobileLightLineRegular additionalClassNames="opacity-12 top-[896px]" />
        <MobileLightLineRegular additionalClassNames="opacity-12 top-[952px]" />
        <MobileLightLineRegular additionalClassNames="opacity-12 top-[1008px]" />
        <MobileLightLineRegular additionalClassNames="opacity-12 top-[1064px]" />
        <MobileLightLineRegular additionalClassNames="opacity-12 top-[784px]" />
        <MobileLightCaptionText1 text="10 k" additionalClassNames="top-[4px]" />
        <MobileLightCaptionText1 text="5 k" additionalClassNames="top-[60px]" />
        <MobileLightCaptionText1 text="1 k" additionalClassNames="top-[116px]" />
        <div className="absolute h-[48px] left-0 top-[172px] w-[64px]" data-name="Caption">
          <div className="absolute capitalize flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#020203] text-[12px] tracking-[0.4px]">
            <p className="leading-[16px]">500</p>
          </div>
        </div>
        <MobileLightCaptionText1 text="250" additionalClassNames="opacity-54 top-[228px]" />
        <MobileLightCaptionText1 text="125" additionalClassNames="top-[284px]" />
        <MobileLightCaptionText1 text="75" additionalClassNames="top-[340px]" />
        <MobileLightCaptionText1 text="0" additionalClassNames="top-[676px]" />
        <MobileLightCaptionText1 text="50" additionalClassNames="top-[396px]" />
        <MobileLightCaptionText1 text="25" additionalClassNames="top-[452px]" />
        <MobileLightCaptionText1 text="15" additionalClassNames="top-[508px]" />
        <MobileLightCaptionText1 text="10" additionalClassNames="top-[564px]" />
        <MobileLightCaptionText1 text="5" additionalClassNames="top-[620px]" />
        <MobileLightCaptionText1 text="0" additionalClassNames="top-[956px]" />
        <MobileLightCaptionText1 text="0" additionalClassNames="top-[1012px]" />
        <MobileLightCaptionText1 text="25" additionalClassNames="top-[732px]" />
        <MobileLightCaptionText1 text="15" additionalClassNames="top-[788px]" />
        <MobileLightCaptionText1 text="10" additionalClassNames="top-[844px]" />
        <MobileLightCaptionText1 text="5" additionalClassNames="top-[900px]" />
      </div>
      <div className="absolute contents left-[40px] top-[52px]" data-name="Cells">
        <CellsAmberText text="56" additionalClassNames="left-[372px] size-[40px] top-[436px]" />
        <CellsAmberText text="56" additionalClassNames="left-[428px] size-[40px] top-[324px]" />
        <CellsAmberText text="56" additionalClassNames="left-[148px] size-[40px] top-[324px]" />
        <CellsAmberText text="40" additionalClassNames="left-[318px] size-[36px] top-[438px]" />
        <CellsAmberText text="56" additionalClassNames="left-[208px] size-[36px] top-[438px]" />
        <AmberText text="40" additionalClassNames="left-[150px] size-[36px] top-[214px]" />
        <CellsAmberText text="40" additionalClassNames="left-[430px] size-[36px] top-[270px]" />
        <BlueText text="56" additionalClassNames="left-[373px] size-[40px] top-[100px]" />
        <BlueText text="56" additionalClassNames="left-[484px] size-[40px] top-[100px]" />
        <CellsAmberText text="32" additionalClassNames="left-[96px] size-[32px] top-[440px]" />
        <BlueText text="32" additionalClassNames="left-[433px] size-[32px] top-[216px]" />
        <CellsAmberText text="32" additionalClassNames="left-[712px] size-[32px] top-[272px]" />
        <BlueText text="32" additionalClassNames="left-[433px] size-[32px] top-[52px]" />
        <CellsAmberText text="32" additionalClassNames="left-[376px] size-[32px] top-[328px]" />
        <CellsAmberText text="56" additionalClassNames="left-[596px] size-[40px] top-[212px]" />
        <div className="absolute left-[96px] shadow-[0px_4px_8px_0px_rgba(84,110,122,0.24)] size-[32px] top-[272px]" data-name="Amber">
          <Bg additionalClassNames="bg-[#263238]" />
          <div className="absolute flex flex-col font-['IBM_Plex_Sans:Bold',sans-serif] inset-0 justify-center leading-[0] not-italic text-[14px] text-center text-white tracking-[0.1px]">
            <p className="leading-[24px]">32</p>
          </div>
        </div>
        <AmberText text="32" additionalClassNames="left-[152px] size-[32px] top-[272px]" />
        <BlueText text="32" additionalClassNames="left-[40px] size-[32px] top-[216px]" />
        <BlueText text="32" additionalClassNames="left-[40px] size-[32px] top-[328px]" />
        <BlueText text="40" additionalClassNames="left-[40px] size-[36px] top-[160px]" />
        <BlueText text="40" additionalClassNames="left-[94px] size-[36px] top-[326px]" />
        <AmberText1 text="12" additionalClassNames="left-[44px] size-[24px] top-[444px]" />
        <AmberText1 text="16" additionalClassNames="left-[380px] size-[24px] top-[500px]" />
        <AmberText1 text="16" additionalClassNames="left-[100px] size-[24px] top-[500px]" />
        <AmberText1 text="16" additionalClassNames="left-[268px] size-[24px] top-[444px]" />
        <AmberText1 text="16" additionalClassNames="left-[324px] size-[24px] top-[332px]" />
        <AmberText1 text="16" additionalClassNames="left-[214px] size-[24px] top-[332px]" />
        <AmberText1 text="8" additionalClassNames="left-[158px] size-[20px] top-[502px]" />
        <AmberText1 text="8" additionalClassNames="left-[326px] size-[20px] top-[502px]" />
        <BlueText1 text="8" additionalClassNames="left-[215px] size-[20px] top-[110px]" />
        <BlueText1 text="8" additionalClassNames="left-[718px] size-[20px] top-[334px]" />
        <BlueText1 text="8" additionalClassNames="left-[438px] size-[20px] top-[110px]" />
        <AmberText1 text="8" additionalClassNames="left-[382px] size-[20px] top-[278px]" />
        <BlueText1 text="8" additionalClassNames="left-[271px] size-[20px] top-[278px]" />
        <BlueText1 text="8" additionalClassNames="left-[102px] size-[20px] top-[222px]" />
        <BlueText1 text="8" additionalClassNames="left-[102px] size-[20px] top-[390px]" />
        <BlueText1 text="12" additionalClassNames="left-[156px] size-[24px] top-[164px]" />
        <BlueText1 text="12" additionalClassNames="left-[325px] size-[24px] top-[108px]" />
        <BlueText1 text="12" additionalClassNames="left-[269px] size-[24px] top-[332px]" />
        <BlueText1 text="16" additionalClassNames="left-[325px] size-[24px] top-[220px]" />
        <AmberText2 text="1" additionalClassNames="left-[48px] top-[504px]" />
        <AmberText2 text="1" additionalClassNames="left-[216px] top-[504px]" />
        <BlueText2 text="1" additionalClassNames="left-[776px] top-[336px]" />
        <BlueText2 text="1" additionalClassNames="left-[329px] top-[280px]" />
        <BlueText2 text="1" additionalClassNames="left-[48px] top-[280px]" />
        <BlueText2 text="1" additionalClassNames="left-[104px] top-[108px]" />
        <CellsBlueText text="1" additionalClassNames="left-[160px] size-[16px] top-[280px]" />
        <BlueText2 text="2" additionalClassNames="left-[1168px] top-[168px]" />
        <BlueText2 text="3" additionalClassNames="left-[776px] top-[224px]" />
        <BlueText2 text="3" additionalClassNames="left-[48px] top-[392px]" />
        <BlueText2 text="2" additionalClassNames="left-[217px] top-[168px]" />
        <CellsBlueText text="3" additionalClassNames="left-[159px] size-[18px] top-[223px]" />
        <AmberText2 text="1" additionalClassNames="left-[496px] top-[280px]" />
        <AmberText2 text="1" additionalClassNames="left-[216px] top-[280px]" />
        <AmberText2 text="2" additionalClassNames="left-[272px] top-[392px]" />
        <AmberText2 text="2" additionalClassNames="left-[160px] top-[392px]" />
        <AmberText2 text="2" additionalClassNames="left-[160px] top-[448px]" />
        <AmberText2 text="1" additionalClassNames="left-[664px] top-[392px]" />
        <CellsAmberText text="88" additionalClassNames="left-[424px] size-[48px] top-[432px]" />
        <CellsAmberText text="88" additionalClassNames="left-[200px] size-[48px] top-[376px]" />
        <CellsAmberText text="104" additionalClassNames="left-[311px] size-[56px] top-[372px]" />
        <CellsAmberText text="56" additionalClassNames="left-[596px] size-[40px] top-[324px]" />
        <CellsAmberText text="40" additionalClassNames="left-[542px] size-[36px] top-[326px]" />
        <BlueText1 text="16" additionalClassNames="left-[44px] size-[24px] top-[108px]" />
        <BlueText1 text="16" additionalClassNames="left-[1276px] size-[24px] top-[108px]" />
        <AmberText1 text="8" additionalClassNames="left-[494px] size-[20px] top-[390px]" />
        <CellsAmberText text="104" additionalClassNames="left-[588px] size-[56px] top-[260px]" />
        <CellsAmberText text="112" additionalClassNames="left-[253px] size-[56px] top-[484px]" />
        <AmberText3 text="128" additionalClassNames="left-[416px] size-[64px] top-[368px]" />
        <div className="absolute left-[319px] size-[36px] top-[158px]" data-name="Blue">
          <Bg additionalClassNames="bg-[#54a0ff]" />
          <p className="absolute font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 leading-[14px] not-italic text-[10px] text-center text-white tracking-[0.3px]">40</p>
        </div>
        <BlueText text="32" additionalClassNames="left-[265px] size-[32px] top-[160px]" />
        <BlueText text="104" additionalClassNames="left-[140px] size-[56px] top-[92px]" />
        <div className="absolute left-[246px] size-[68px] top-[86px]" data-name="Blue">
          <Bg additionalClassNames="bg-[#54a0ff]" />
          <div className="absolute flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[16px] text-center text-white tracking-[0.44px]">
            <p className="leading-[24px]">128</p>
          </div>
        </div>
        <AmberText3 text="128" additionalClassNames="left-[640px] size-[64px] top-[200px]" />
        <BlueText text="104" additionalClassNames="left-[477px] size-[56px] top-[148px]" />
        <AmberText3 text="168" additionalClassNames="left-[464px] size-[80px] top-[416px]" />
        <div className="absolute left-[181px] size-[88px] top-[188px]" data-name="Blue">
          <Bg additionalClassNames="bg-[#54a0ff]" />
          <p className="absolute font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 leading-[24px] not-italic text-[16px] text-center text-white tracking-[0.44px]">192</p>
        </div>
        <AmberText text="88" additionalClassNames="left-[704px] size-[48px] top-[208px]" />
        <div className="absolute left-[253px] size-[56px] top-[204px]" data-name="Blue">
          <Bg additionalClassNames="bg-[#54a0ff]" />
          <p className="absolute capitalize font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 leading-[16px] not-italic text-[12px] text-center text-white tracking-[0.4px]">112</p>
        </div>
        <BlueText text="88" additionalClassNames="left-[369px] size-[48px] top-[152px]" />
        <div className="absolute left-[716px] size-[24px] top-[220px]" data-name="Blue">
          <div className="absolute bg-[#54a0ff] inset-0 rounded-[99px]" data-name="BG" />
          <div className="absolute capitalize flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[12px] text-center text-white tracking-[0.4px]">
            <p className="leading-[16px]">16</p>
          </div>
        </div>
        <CellsAmberText1 text="104" additionalClassNames="left-[197px] size-[56px] top-[206px]" />
        <CellsAmberText1 text="32" additionalClassNames="left-[265px] size-[32px] top-[216px]" />
        <div className="absolute left-[329px] size-[16px] top-[168px]" data-name="Amber">
          <div className="absolute bg-[#feca57] inset-0 rounded-[99px]" data-name="BG" />
          <div className="absolute flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#1b314b] text-[10px] text-center tracking-[0.3px]">
            <p className="leading-[14px]">2</p>
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
        <div className="absolute inset-[0_calc(33.33%-64px)]" data-name="Mobile & Tablet / Header / Center / Empty">
          <div className="absolute bg-white inset-0" data-name="Base" />
        </div>
        <div className="absolute inset-[0_0_0_calc(66.67%+64px)]" data-name="Mobile & Tablet / Header / Right / Icons & Userpic">
          <div className="absolute bg-white inset-0" data-name="Base" />
          <div className="-translate-y-1/2 absolute content-stretch flex gap-[16px] items-center overflow-clip right-[8px] top-1/2" data-name="Icons & Userpic">
            <div className="relative shrink-0 size-[24px]" data-name="basic / menu">
              <div className="absolute inset-[20.83%_8.33%]" data-name="icon">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 14">
                  <path clipRule="evenodd" d={svgPaths.p1296aa80} fill="var(--fill-0, #607080)" fillRule="evenodd" id="icon" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-[0_calc(66.67%+64px)_0_0]" data-name="Mobile & Tablet / Header / Left / Label">
          <div className="absolute bg-white inset-0" data-name="Base" />
          <div className="-translate-y-1/2 absolute h-[30px] left-[8px] rounded-[20px] top-1/2" data-name="Master">
            <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex gap-[8px] h-full items-center relative">
                <p className="font-['IBM_Plex_Sans:Medium',sans-serif] leading-[1.28] not-italic relative shrink-0 text-[#263238] text-[20px] tracking-[0.15px] whitespace-nowrap">Women directors distribution</p>
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