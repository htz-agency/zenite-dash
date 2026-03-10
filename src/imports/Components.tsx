import clsx from "clsx";
type TooltipTextProps = {
  text: string;
  additionalClassNames?: string;
};

function TooltipText({ text, additionalClassNames = "" }: TooltipTextProps) {
  return (
    <div className={clsx("absolute h-[32px] w-[100px]", additionalClassNames)}>
      <div className="-translate-x-1/2 absolute bottom-[-5.31px] flex items-center justify-center left-1/2 size-[11.314px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-45">
          <div className="relative rounded-[8px] size-[8px]" data-name="🎨 Colors Dark">
            <div className="absolute bg-[#263238] inset-0 rounded-[1px]" data-name="BG dark" />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 rounded-[8px]" data-name="🎨 Colors Dark">
        <div className="absolute bg-[#263238] inset-0 rounded-[3px]" data-name="BG dark" />
      </div>
      <div className="absolute inset-[18.75%_0]" data-name="12 sp • Caption">
        <div className="absolute capitalize flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[12px] text-center text-white tracking-[0.4px]">
          <p className="leading-[16px]">{text}</p>
        </div>
      </div>
    </div>
  );
}
type Helper2Props = {
  additionalClassNames?: string;
};

function Helper2({ additionalClassNames = "" }: Helper2Props) {
  return (
    <div className={clsx("absolute bottom-0 flex h-[17px] items-center justify-center w-[48px]", additionalClassNames)}>
      <div className="-scale-y-100 flex-none rotate-180">
        <Helper1 additionalClassNames="h-[17px] relative w-[48px]" />
      </div>
    </div>
  );
}
type Helper1Props = {
  additionalClassNames?: string;
};

function Helper1({ additionalClassNames = "" }: Helper1Props) {
  return (
    <div className={additionalClassNames}>
      <div className="absolute inset-0 rounded-[8px]" data-name="🎨 Colors Dark">
        <div className="absolute bg-[#263238] inset-0 rounded-[2px]" data-name="BG dark" />
      </div>
    </div>
  );
}
type BarDarkProps = {
  additionalClassNames?: string;
};

function BarDark({ additionalClassNames = "" }: BarDarkProps) {
  return <Helper1 additionalClassNames={clsx("absolute bottom-0 w-[48px]", additionalClassNames)} />;
}
type HelperProps = {
  additionalClassNames?: string;
};

function Helper({ additionalClassNames = "" }: HelperProps) {
  return (
    <div className={additionalClassNames}>
      <div className="absolute inset-0 opacity-80" data-name="🎨 Colors Primary">
        <div className="absolute bg-[#855cf8] inset-0 rounded-[2px]" data-name="BG primary" />
      </div>
    </div>
  );
}
type BarBlueProps = {
  additionalClassNames?: string;
};

function BarBlue({ additionalClassNames = "" }: BarBlueProps) {
  return <Helper additionalClassNames={clsx("absolute bottom-0 w-[48px]", additionalClassNames)} />;
}
type Vertical48DpDowntrendHelperProps = {
  additionalClassNames?: string;
};

function Vertical48DpDowntrendHelper({ additionalClassNames = "" }: Vertical48DpDowntrendHelperProps) {
  return (
    <div className={clsx("-scale-y-100 flex-none rotate-180 w-[48px]", additionalClassNames)}>
      <Helper additionalClassNames="opacity-40 relative size-full" />
    </div>
  );
}

export default function Components() {
  return (
    <div className="relative size-full" data-name="Components">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['IBM_Plex_Sans:Regular','Noto_Sans:Regular',sans-serif] justify-center leading-[0] left-[59px] text-[#607080] text-[16px] text-center top-[12px] tracking-[0.44px] whitespace-nowrap" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
        <p className="leading-[24px]">❖ Components</p>
      </div>
      <div className="absolute h-[320px] left-0 overflow-clip top-[368px] w-[832px]" data-name="Vertical 48dp · Mixed 1 ⤭">
        <div className="absolute bottom-0 contents left-0 top-0" data-name="Light bars">
          <BarBlue additionalClassNames="left-0 opacity-40 top-[190px]" />
          <BarBlue additionalClassNames="left-[56px] opacity-40 top-[52px]" />
          <BarBlue additionalClassNames="left-[112px] opacity-40 top-0" />
          <BarBlue additionalClassNames="left-[168px] opacity-40 top-[101px]" />
          <BarBlue additionalClassNames="left-[224px] opacity-40 top-[220px]" />
          <BarBlue additionalClassNames="left-[280px] opacity-40 top-[275px]" />
          <BarBlue additionalClassNames="left-[336px] opacity-40 top-[190px]" />
          <BarBlue additionalClassNames="left-[392px] opacity-40 top-[69px]" />
          <BarBlue additionalClassNames="left-[448px] opacity-40 top-[52px]" />
          <BarBlue additionalClassNames="left-[672px] opacity-40 top-[275px]" />
          <BarBlue additionalClassNames="left-[728px] opacity-40 top-[178px]" />
          <BarBlue additionalClassNames="left-[784px] opacity-40 top-[101px]" />
          <BarBlue additionalClassNames="left-[504px] opacity-40 top-[128px]" />
          <BarBlue additionalClassNames="left-[560px] opacity-40 top-[201px]" />
          <BarBlue additionalClassNames="left-[616px] opacity-40 top-[245px]" />
        </div>
        <div className="absolute bottom-0 contents left-0 top-[40%]" data-name="Mid bars">
          <BarBlue additionalClassNames="left-0 top-[78.13%]" />
          <BarBlue additionalClassNames="left-[56px] top-[47.81%]" />
          <BarBlue additionalClassNames="left-[112px] top-[40%]" />
          <BarBlue additionalClassNames="left-[168px] top-[55.94%]" />
          <BarBlue additionalClassNames="left-[224px] top-[88.13%]" />
          <BarBlue additionalClassNames="left-[280px] top-[93.44%]" />
          <BarBlue additionalClassNames="left-[336px] top-[76.56%]" />
          <BarBlue additionalClassNames="left-[392px] top-[50.94%]" />
          <BarBlue additionalClassNames="left-[448px] top-[41.88%]" />
          <BarBlue additionalClassNames="left-[672px] top-[91.56%]" />
          <BarBlue additionalClassNames="left-[728px] top-[86.88%]" />
          <BarBlue additionalClassNames="left-[784px] top-[79.69%]" />
          <BarBlue additionalClassNames="left-[504px] top-[59.38%]" />
          <BarBlue additionalClassNames="left-[560px] top-[70.31%]" />
          <BarBlue additionalClassNames="left-[616px] top-[88.13%]" />
        </div>
        <div className="absolute bottom-0 contents left-0" data-name="Dark bars">
          <BarDark additionalClassNames="h-[32px] left-0" />
          <BarDark additionalClassNames="h-[27px] left-[56px]" />
          <BarDark additionalClassNames="h-[42px] left-[112px]" />
          <BarDark additionalClassNames="h-[27px] left-[168px]" />
          <BarDark additionalClassNames="h-[17px] left-[224px]" />
          <BarDark additionalClassNames="h-[6px] left-[280px]" />
          <BarDark additionalClassNames="h-[32px] left-[336px]" />
          <BarDark additionalClassNames="h-[50px] left-[392px]" />
          <BarDark additionalClassNames="h-[42px] left-[448px]" />
          <BarDark additionalClassNames="h-[9px] left-[672px]" />
          <BarDark additionalClassNames="h-[17px] left-[728px]" />
          <BarDark additionalClassNames="h-[27px] left-[784px]" />
          <BarDark additionalClassNames="h-[17px] left-[504px]" />
          <BarDark additionalClassNames="h-[58px] left-[560px]" />
          <BarDark additionalClassNames="h-[27px] left-[616px]" />
        </div>
        <TooltipText text="Top tooltip" additionalClassNames="left-[422px] top-0" />
      </div>
      <div className="absolute h-[320px] left-0 overflow-clip top-[48px] w-[832px]" data-name="Vertical 48dp · Mixed 2 ⤭">
        <div className="absolute bottom-0 contents left-0 top-0" data-name="Light bars">
          <BarBlue additionalClassNames="left-0 opacity-40 top-[125px]" />
          <BarBlue additionalClassNames="left-[56px] opacity-40 top-[52px]" />
          <BarBlue additionalClassNames="left-[112px] opacity-40 top-[20px]" />
          <BarBlue additionalClassNames="left-[168px] opacity-40 top-[69px]" />
          <BarBlue additionalClassNames="left-[224px] opacity-40 top-[155px]" />
          <BarBlue additionalClassNames="left-[280px] opacity-40 top-[195px]" />
          <BarBlue additionalClassNames="left-[336px] opacity-40 top-[101px]" />
          <BarBlue additionalClassNames="left-[392px] opacity-40 top-[69px]" />
          <BarBlue additionalClassNames="left-[448px] opacity-40 top-0" />
          <BarBlue additionalClassNames="left-[672px] opacity-40 top-[190px]" />
          <BarBlue additionalClassNames="left-[728px] opacity-40 top-[82px]" />
          <BarBlue additionalClassNames="left-[784px] opacity-40 top-[69px]" />
          <BarBlue additionalClassNames="left-[504px] opacity-40 top-[82px]" />
          <BarBlue additionalClassNames="left-[560px] opacity-40 top-[172px]" />
          <BarBlue additionalClassNames="left-[616px] opacity-40 top-[128px]" />
        </div>
        <div className="absolute bottom-0 contents left-0 top-[25.62%]" data-name="Mid bars">
          <BarBlue additionalClassNames="left-0 top-[81.88%]" />
          <BarBlue additionalClassNames="left-[56px] top-[56.25%]" />
          <BarBlue additionalClassNames="left-[112px] top-[34.69%]" />
          <BarBlue additionalClassNames="left-[168px] top-[50.94%]" />
          <BarBlue additionalClassNames="left-[224px] top-[75.31%]" />
          <BarBlue additionalClassNames="left-[280px] top-[81.88%]" />
          <BarBlue additionalClassNames="left-[336px] top-[70.94%]" />
          <BarBlue additionalClassNames="left-[392px] top-[46.56%]" />
          <BarBlue additionalClassNames="left-[448px] top-[25.62%]" />
          <BarBlue additionalClassNames="left-[672px] top-[78.75%]" />
          <BarBlue additionalClassNames="left-[728px] top-[70.94%]" />
          <BarBlue additionalClassNames="left-[784px] top-[64.69%]" />
          <BarBlue additionalClassNames="left-[504px] top-[59.38%]" />
          <BarBlue additionalClassNames="left-[560px] top-[69.38%]" />
          <BarBlue additionalClassNames="left-[616px] top-[66.56%]" />
        </div>
        <div className="absolute bottom-0 contents left-0" data-name="Dark bars">
          <BarDark additionalClassNames="h-[32px] left-0" />
          <BarDark additionalClassNames="h-[27px] left-[56px]" />
          <BarDark additionalClassNames="h-[42px] left-[112px]" />
          <BarDark additionalClassNames="h-[32px] left-[168px]" />
          <BarDark additionalClassNames="h-[27px] left-[224px]" />
          <BarDark additionalClassNames="h-[17px] left-[280px]" />
          <BarDark additionalClassNames="h-[32px] left-[336px]" />
          <BarDark additionalClassNames="h-[79px] left-[392px]" />
          <BarDark additionalClassNames="h-[56px] left-[448px]" />
          <BarDark additionalClassNames="h-[32px] left-[672px]" />
          <BarDark additionalClassNames="h-[42px] left-[728px]" />
          <BarDark additionalClassNames="h-[56px] left-[784px]" />
          <BarDark additionalClassNames="h-[32px] left-[504px]" />
          <BarDark additionalClassNames="h-[42px] left-[560px]" />
          <BarDark additionalClassNames="h-[27px] left-[616px]" />
        </div>
        <div className="absolute bottom-0 contents left-[840px] top-0" data-name="Light bars">
          <BarBlue additionalClassNames="left-[840px] opacity-40 top-[125px]" />
          <BarBlue additionalClassNames="left-[896px] opacity-40 top-[52px]" />
          <BarBlue additionalClassNames="left-[952px] opacity-40 top-[20px]" />
          <BarBlue additionalClassNames="left-[1008px] opacity-40 top-[69px]" />
          <BarBlue additionalClassNames="left-[1064px] opacity-40 top-[155px]" />
          <BarBlue additionalClassNames="left-[1120px] opacity-40 top-[195px]" />
          <BarBlue additionalClassNames="left-[1176px] opacity-40 top-[101px]" />
          <BarBlue additionalClassNames="left-[1232px] opacity-40 top-[69px]" />
          <BarBlue additionalClassNames="left-[1288px] opacity-40 top-0" />
          <BarBlue additionalClassNames="left-[1512px] opacity-40 top-[190px]" />
          <BarBlue additionalClassNames="left-[1568px] opacity-40 top-[82px]" />
          <BarBlue additionalClassNames="left-[1624px] opacity-40 top-[69px]" />
          <BarBlue additionalClassNames="left-[1344px] opacity-40 top-[82px]" />
          <BarBlue additionalClassNames="left-[1400px] opacity-40 top-[172px]" />
          <BarBlue additionalClassNames="left-[1456px] opacity-40 top-[128px]" />
        </div>
        <div className="absolute bottom-0 contents left-[840px] top-[25.62%]" data-name="Mid bars">
          <BarBlue additionalClassNames="left-[840px] top-[81.88%]" />
          <BarBlue additionalClassNames="left-[896px] top-[56.25%]" />
          <BarBlue additionalClassNames="left-[952px] top-[34.69%]" />
          <BarBlue additionalClassNames="left-[1008px] top-[50.94%]" />
          <BarBlue additionalClassNames="left-[1064px] top-[75.31%]" />
          <BarBlue additionalClassNames="left-[1120px] top-[81.88%]" />
          <BarBlue additionalClassNames="left-[1176px] top-[70.94%]" />
          <BarBlue additionalClassNames="left-[1232px] top-[46.56%]" />
          <BarBlue additionalClassNames="left-[1288px] top-[25.62%]" />
          <BarBlue additionalClassNames="left-[1512px] top-[78.75%]" />
          <BarBlue additionalClassNames="left-[1568px] top-[70.94%]" />
          <BarBlue additionalClassNames="left-[1624px] top-[64.69%]" />
          <BarBlue additionalClassNames="left-[1344px] top-[59.38%]" />
          <BarBlue additionalClassNames="left-[1400px] top-[69.38%]" />
          <BarBlue additionalClassNames="left-[1456px] top-[66.56%]" />
        </div>
        <div className="absolute bottom-0 contents left-[840px]" data-name="Dark bars">
          <BarDark additionalClassNames="h-[32px] left-[840px]" />
          <BarDark additionalClassNames="h-[27px] left-[896px]" />
          <BarDark additionalClassNames="h-[42px] left-[952px]" />
          <BarDark additionalClassNames="h-[32px] left-[1008px]" />
          <BarDark additionalClassNames="h-[27px] left-[1064px]" />
          <BarDark additionalClassNames="h-[17px] left-[1120px]" />
          <BarDark additionalClassNames="h-[32px] left-[1176px]" />
          <BarDark additionalClassNames="h-[79px] left-[1232px]" />
          <BarDark additionalClassNames="h-[56px] left-[1288px]" />
          <BarDark additionalClassNames="h-[32px] left-[1512px]" />
          <BarDark additionalClassNames="h-[42px] left-[1568px]" />
          <BarDark additionalClassNames="h-[56px] left-[1624px]" />
          <BarDark additionalClassNames="h-[32px] left-[1344px]" />
          <BarDark additionalClassNames="h-[42px] left-[1400px]" />
          <BarDark additionalClassNames="h-[27px] left-[1456px]" />
        </div>
        <TooltipText text="Top tooltip" additionalClassNames="left-[254px] top-[143px]" />
      </div>
      <div className="absolute h-[320px] left-[896px] overflow-clip top-[368px] w-[832px]" data-name="Vertical 48dp · Uptrend ↗">
        <div className="absolute bottom-0 contents left-0 top-0" data-name="Light bars">
          <BarBlue additionalClassNames="left-0 opacity-40 top-[278px]" />
          <BarBlue additionalClassNames="left-[56px] opacity-40 top-[260px]" />
          <BarBlue additionalClassNames="left-[112px] opacity-40 top-[267px]" />
          <BarBlue additionalClassNames="left-[168px] opacity-40 top-[231px]" />
          <BarBlue additionalClassNames="left-[224px] opacity-40 top-[172px]" />
          <BarBlue additionalClassNames="left-[280px] opacity-40 top-[184px]" />
          <BarBlue additionalClassNames="left-[336px] opacity-40 top-[107px]" />
          <BarBlue additionalClassNames="left-[392px] opacity-40 top-[69px]" />
          <BarBlue additionalClassNames="left-[448px] opacity-40 top-[32px]" />
          <BarBlue additionalClassNames="left-[672px] opacity-40 top-[60px]" />
          <BarBlue additionalClassNames="left-[728px] opacity-40 top-[20px]" />
          <BarBlue additionalClassNames="left-[784px] opacity-40 top-0" />
          <BarBlue additionalClassNames="left-[504px] opacity-40 top-[62px]" />
          <BarBlue additionalClassNames="left-[560px] opacity-40 top-[41px]" />
          <BarBlue additionalClassNames="left-[616px] opacity-40 top-[52px]" />
        </div>
        <div className="absolute bottom-0 contents left-0 top-[45.63%]" data-name="Mid bars">
          <BarBlue additionalClassNames="left-0 top-[89.38%]" />
          <BarBlue additionalClassNames="left-[56px] top-[86.88%]" />
          <BarBlue additionalClassNames="left-[112px] top-[89.38%]" />
          <BarBlue additionalClassNames="left-[168px] top-[79.69%]" />
          <BarBlue additionalClassNames="left-[224px] top-[75.63%]" />
          <BarBlue additionalClassNames="left-[280px] top-[79.69%]" />
          <BarBlue additionalClassNames="left-[336px] top-[68.75%]" />
          <BarBlue additionalClassNames="left-[392px] top-[61.88%]" />
          <BarBlue additionalClassNames="left-[448px] top-[47.81%]" />
          <BarBlue additionalClassNames="left-[672px] top-[64.69%]" />
          <BarBlue additionalClassNames="left-[728px] top-[50.63%]" />
          <BarBlue additionalClassNames="left-[784px] top-[45.63%]" />
          <BarBlue additionalClassNames="left-[504px] top-[58.75%]" />
          <BarBlue additionalClassNames="left-[560px] top-[64.69%]" />
          <BarBlue additionalClassNames="left-[616px] top-[61.88%]" />
        </div>
        <div className="absolute bottom-0 contents left-0" data-name="Dark bars">
          <BarDark additionalClassNames="h-[17px] left-0" />
          <BarDark additionalClassNames="h-[27px] left-[56px]" />
          <BarDark additionalClassNames="h-[27px] left-[112px]" />
          <BarDark additionalClassNames="h-[34px] left-[168px]" />
          <BarDark additionalClassNames="h-[27px] left-[224px]" />
          <BarDark additionalClassNames="h-[17px] left-[280px]" />
          <BarDark additionalClassNames="h-[42px] left-[336px]" />
          <BarDark additionalClassNames="h-[61px] left-[392px]" />
          <BarDark additionalClassNames="h-[72px] left-[448px]" />
          <BarDark additionalClassNames="h-[87px] left-[672px]" />
          <BarDark additionalClassNames="h-[101px] left-[728px]" />
          <BarDark additionalClassNames="h-[108px] left-[784px]" />
          <BarDark additionalClassNames="h-[56px] left-[504px]" />
          <BarDark additionalClassNames="h-[79px] left-[560px]" />
          <BarDark additionalClassNames="h-[66px] left-[616px]" />
        </div>
      </div>
      <div className="absolute h-[320px] left-[896px] overflow-clip top-[48px] w-[832px]" data-name="Vertical 48dp · Downtrend ↘">
        <div className="absolute bottom-0 contents left-0 top-0" data-name="Light bars">
          <div className="absolute bottom-0 flex items-center justify-center left-[784px] top-[290px] w-[48px]">
            <Vertical48DpDowntrendHelper additionalClassNames="h-[30px]" />
          </div>
          <div className="absolute bottom-0 flex items-center justify-center left-[728px] top-[283px] w-[48px]">
            <Vertical48DpDowntrendHelper additionalClassNames="h-[37px]" />
          </div>
          <div className="absolute bottom-0 flex items-center justify-center left-[672px] top-[267px] w-[48px]">
            <Vertical48DpDowntrendHelper additionalClassNames="h-[53px]" />
          </div>
          <div className="absolute bottom-0 flex items-center justify-center left-[616px] top-[244px] w-[48px]">
            <Vertical48DpDowntrendHelper additionalClassNames="h-[76px]" />
          </div>
          <div className="absolute bottom-0 flex items-center justify-center left-[560px] top-[215px] w-[48px]">
            <Vertical48DpDowntrendHelper additionalClassNames="h-[105px]" />
          </div>
          <div className="absolute bottom-0 flex items-center justify-center left-[504px] top-[231px] w-[48px]">
            <Vertical48DpDowntrendHelper additionalClassNames="h-[89px]" />
          </div>
          <div className="absolute bottom-0 flex items-center justify-center left-[448px] top-[177px] w-[48px]">
            <Vertical48DpDowntrendHelper additionalClassNames="h-[143px]" />
          </div>
          <div className="absolute bottom-0 flex items-center justify-center left-[392px] top-[116px] w-[48px]">
            <Vertical48DpDowntrendHelper additionalClassNames="h-[204px]" />
          </div>
          <div className="absolute bottom-0 flex items-center justify-center left-[336px] top-[45px] w-[48px]">
            <Vertical48DpDowntrendHelper additionalClassNames="h-[275px]" />
          </div>
          <div className="absolute bottom-0 flex items-center justify-center left-[112px] top-[32px] w-[48px]">
            <Vertical48DpDowntrendHelper additionalClassNames="h-[288px]" />
          </div>
          <div className="absolute bottom-0 flex items-center justify-center left-[56px] top-[14px] w-[48px]">
            <Vertical48DpDowntrendHelper additionalClassNames="h-[306px]" />
          </div>
          <div className="absolute bottom-0 flex items-center justify-center left-0 top-0 w-[48px]">
            <Vertical48DpDowntrendHelper additionalClassNames="h-[320px]" />
          </div>
          <div className="absolute bottom-0 flex items-center justify-center left-[280px] top-[62px] w-[48px]">
            <Vertical48DpDowntrendHelper additionalClassNames="h-[258px]" />
          </div>
          <div className="absolute bottom-0 flex items-center justify-center left-[224px] top-[69px] w-[48px]">
            <Vertical48DpDowntrendHelper additionalClassNames="h-[251px]" />
          </div>
          <div className="absolute bottom-0 flex items-center justify-center left-[168px] top-[52px] w-[48px]">
            <Vertical48DpDowntrendHelper additionalClassNames="h-[268px]" />
          </div>
        </div>
        <div className="absolute bottom-0 contents left-0 top-[48.75%]" data-name="Mid bars">
          <div className="absolute bottom-0 flex items-center justify-center left-[784px] top-[95%] w-[48px]">
            <div className="-scale-y-100 flex-none h-[16px] rotate-180 w-[48px]">
              <Helper additionalClassNames="relative size-full" />
            </div>
          </div>
          <div className="absolute bottom-0 flex items-center justify-center left-[728px] top-[90.63%] w-[48px]">
            <div className="-scale-y-100 flex-none h-[30px] rotate-180 w-[48px]">
              <Helper additionalClassNames="relative size-full" />
            </div>
          </div>
          <div className="absolute bottom-0 flex items-center justify-center left-[672px] top-[86.88%] w-[48px]">
            <div className="-scale-y-100 flex-none h-[42px] rotate-180 w-[48px]">
              <Helper additionalClassNames="relative size-full" />
            </div>
          </div>
          <div className="absolute bottom-0 flex items-center justify-center left-[616px] top-[85.63%] w-[48px]">
            <div className="-scale-y-100 flex-none h-[46px] rotate-180 w-[48px]">
              <Helper additionalClassNames="relative size-full" />
            </div>
          </div>
          <div className="absolute bottom-0 flex items-center justify-center left-[560px] top-[79.38%] w-[48px]">
            <div className="-scale-y-100 flex-none h-[66px] rotate-180 w-[48px]">
              <Helper additionalClassNames="relative size-full" />
            </div>
          </div>
          <div className="absolute bottom-0 flex items-center justify-center left-[504px] top-[83.75%] w-[48px]">
            <div className="-scale-y-100 flex-none h-[52px] rotate-180 w-[48px]">
              <Helper additionalClassNames="relative size-full" />
            </div>
          </div>
          <div className="absolute bottom-0 flex items-center justify-center left-[448px] top-[72.81%] w-[48px]">
            <div className="-scale-y-100 flex-none h-[87px] rotate-180 w-[48px]">
              <Helper additionalClassNames="relative size-full" />
            </div>
          </div>
          <div className="absolute bottom-0 flex items-center justify-center left-[392px] top-[57.81%] w-[48px]">
            <div className="-scale-y-100 flex-none h-[135px] rotate-180 w-[48px]">
              <Helper additionalClassNames="relative size-full" />
            </div>
          </div>
          <div className="absolute bottom-0 flex items-center justify-center left-[336px] top-[61.88%] w-[48px]">
            <div className="-scale-y-100 flex-none h-[122px] rotate-180 w-[48px]">
              <Helper additionalClassNames="relative size-full" />
            </div>
          </div>
          <div className="absolute bottom-0 flex items-center justify-center left-[112px] top-[65%] w-[48px]">
            <div className="-scale-y-100 flex-none h-[112px] rotate-180 w-[48px]">
              <Helper additionalClassNames="relative size-full" />
            </div>
          </div>
          <div className="absolute bottom-0 flex items-center justify-center left-[56px] top-[51.56%] w-[48px]">
            <div className="-scale-y-100 flex-none h-[155px] rotate-180 w-[48px]">
              <Helper additionalClassNames="relative size-full" />
            </div>
          </div>
          <div className="absolute bottom-0 flex items-center justify-center left-0 top-[48.75%] w-[48px]">
            <div className="-scale-y-100 flex-none h-[164px] rotate-180 w-[48px]">
              <Helper additionalClassNames="relative size-full" />
            </div>
          </div>
          <div className="absolute bottom-0 flex items-center justify-center left-[280px] top-[59.38%] w-[48px]">
            <div className="-scale-y-100 flex-none h-[130px] rotate-180 w-[48px]">
              <Helper additionalClassNames="relative size-full" />
            </div>
          </div>
          <div className="absolute bottom-0 flex items-center justify-center left-[224px] top-[68.44%] w-[48px]">
            <div className="-scale-y-100 flex-none h-[101px] rotate-180 w-[48px]">
              <Helper additionalClassNames="relative size-full" />
            </div>
          </div>
          <div className="absolute bottom-0 flex items-center justify-center left-[168px] top-[63.44%] w-[48px]">
            <div className="-scale-y-100 flex-none h-[117px] rotate-180 w-[48px]">
              <Helper additionalClassNames="relative size-full" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 contents left-0" data-name="Dark bars">
          <div className="absolute bottom-0 flex h-[9px] items-center justify-center left-[784px] w-[48px]">
            <div className="-scale-y-100 flex-none rotate-180">
              <Helper1 additionalClassNames="h-[9px] relative w-[48px]" />
            </div>
          </div>
          <Helper2 additionalClassNames="left-[728px]" />
          <div className="absolute bottom-0 flex h-[24px] items-center justify-center left-[672px] w-[48px]">
            <div className="-scale-y-100 flex-none rotate-180">
              <Helper1 additionalClassNames="h-[24px] relative w-[48px]" />
            </div>
          </div>
          <div className="absolute bottom-0 flex h-[26px] items-center justify-center left-[616px] w-[48px]">
            <div className="-scale-y-100 flex-none rotate-180">
              <Helper1 additionalClassNames="h-[26px] relative w-[48px]" />
            </div>
          </div>
          <div className="absolute bottom-0 flex h-[27px] items-center justify-center left-[560px] w-[48px]">
            <div className="-scale-y-100 flex-none rotate-180">
              <Helper1 additionalClassNames="h-[27px] relative w-[48px]" />
            </div>
          </div>
          <Helper2 additionalClassNames="left-[504px]" />
          <div className="absolute bottom-0 flex h-[42px] items-center justify-center left-[448px] w-[48px]">
            <div className="-scale-y-100 flex-none rotate-180">
              <Helper1 additionalClassNames="h-[42px] relative w-[48px]" />
            </div>
          </div>
          <div className="absolute bottom-0 flex h-[61px] items-center justify-center left-[392px] w-[48px]">
            <div className="-scale-y-100 flex-none rotate-180">
              <Helper1 additionalClassNames="h-[61px] relative w-[48px]" />
            </div>
          </div>
          <div className="absolute bottom-0 flex h-[72px] items-center justify-center left-[336px] w-[48px]">
            <div className="-scale-y-100 flex-none rotate-180">
              <Helper1 additionalClassNames="h-[72px] relative w-[48px]" />
            </div>
          </div>
          <div className="absolute bottom-0 flex h-[87px] items-center justify-center left-[112px] w-[48px]">
            <div className="-scale-y-100 flex-none rotate-180">
              <Helper1 additionalClassNames="h-[87px] relative w-[48px]" />
            </div>
          </div>
          <div className="absolute bottom-0 flex h-[101px] items-center justify-center left-[56px] w-[48px]">
            <div className="-scale-y-100 flex-none rotate-180">
              <Helper1 additionalClassNames="h-[101px] relative w-[48px]" />
            </div>
          </div>
          <div className="absolute bottom-0 flex h-[108px] items-center justify-center left-0 w-[48px]">
            <div className="-scale-y-100 flex-none rotate-180">
              <Helper1 additionalClassNames="h-[108px] relative w-[48px]" />
            </div>
          </div>
          <div className="absolute bottom-0 flex h-[56px] items-center justify-center left-[280px] w-[48px]">
            <div className="-scale-y-100 flex-none rotate-180">
              <Helper1 additionalClassNames="h-[56px] relative w-[48px]" />
            </div>
          </div>
          <div className="absolute bottom-0 flex h-[79px] items-center justify-center left-[224px] w-[48px]">
            <div className="-scale-y-100 flex-none rotate-180">
              <Helper1 additionalClassNames="h-[79px] relative w-[48px]" />
            </div>
          </div>
          <div className="absolute bottom-0 flex h-[66px] items-center justify-center left-[168px] w-[48px]">
            <div className="-scale-y-100 flex-none rotate-180">
              <Helper1 additionalClassNames="h-[66px] relative w-[48px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}