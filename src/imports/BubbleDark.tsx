import clsx from "clsx";

function ColorInfoBarBlue({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute left-0 size-[18px] top-[3px]">
      <div className="absolute inset-0 opacity-80" data-name="🎨 Colors Primary">
        {children}
      </div>
    </div>
  );
}
type BubbleDarkTextProps = {
  text: string;
  additionalClassNames?: string;
};

function BubbleDarkText({ text, additionalClassNames = "" }: BubbleDarkTextProps) {
  return (
    <div className={clsx("absolute bottom-0 h-[16px] w-[48px]", additionalClassNames)}>
      <div className="absolute capitalize flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-end leading-[0] not-italic text-[#78909c] text-[12px] text-center tracking-[0.4px]">
        <p className="leading-[16px]">{text}</p>
      </div>
    </div>
  );
}
type BubbleDarkHelperProps = {
  additionalClassNames?: string;
};

function BubbleDarkHelper({ additionalClassNames = "" }: BubbleDarkHelperProps) {
  return (
    <div className={clsx("absolute bottom-[24px] flex items-center justify-center top-0 w-0", additionalClassNames)}>
      <div className="flex-none h-px rotate-90 w-[456px]">
        <div className="opacity-12 relative size-full" data-name="Line Regular">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 578 1">
              <line id="Line" stroke="var(--stroke-0, white)" x2="578" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
type ColorInfo16SpBodyTextProps = {
  text: string;
};

function ColorInfo16SpBodyText({ text }: ColorInfo16SpBodyTextProps) {
  return (
    <div className="absolute h-[24px] left-[26px] opacity-80 right-0 top-0">
      <div className="absolute flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[16px] text-white tracking-[0.44px]">
        <p className="leading-[24px]">{text}</p>
      </div>
    </div>
  );
}
type BubbleAccent4Props = {
  additionalClassNames?: string;
};

function BubbleAccent4({ additionalClassNames = "" }: BubbleAccent4Props) {
  return (
    <div className={clsx("-translate-x-1/2 -translate-y-1/2 absolute size-[26px]", additionalClassNames)}>
      <div className="absolute bg-[#ff6b6b] inset-0 rounded-[99px]" data-name="BG accent" />
      <CaptionText text="15" />
    </div>
  );
}
type BubbleBlue1Props = {
  additionalClassNames?: string;
};

function BubbleBlue1({ additionalClassNames = "" }: BubbleBlue1Props) {
  return (
    <div className={clsx("-translate-x-1/2 -translate-y-1/2 absolute opacity-80 size-[45px]", additionalClassNames)}>
      <div className="absolute bg-[#54a0ff] inset-0 rounded-[999px]" data-name="BG primary" />
      <CaptionText text="200" />
    </div>
  );
}
type BubbleAccent3Props = {
  additionalClassNames?: string;
};

function BubbleAccent3({ additionalClassNames = "" }: BubbleAccent3Props) {
  return (
    <div className={clsx("-translate-x-1/2 -translate-y-1/2 absolute size-[26px]", additionalClassNames)}>
      <div className="absolute bg-[#ff6b6b] inset-0 rounded-[99px]" data-name="BG accent" />
      <CaptionText text="10" />
    </div>
  );
}
type BubbleGray3Props = {
  additionalClassNames?: string;
};

function BubbleGray3({ additionalClassNames = "" }: BubbleGray3Props) {
  return (
    <div className={clsx("-translate-x-1/2 -translate-y-1/2 absolute opacity-80 size-[41px]", additionalClassNames)}>
      <div className="absolute inset-0 opacity-16 rounded-[8px]" data-name="🎨 Colors Dark">
        <div className="absolute bg-white inset-0 rounded-[99px]" data-name="BG dark" />
      </div>
      <CaptionText text="150" />
    </div>
  );
}
type BubbleGray2Props = {
  additionalClassNames?: string;
};

function BubbleGray2({ additionalClassNames = "" }: BubbleGray2Props) {
  return (
    <div className={clsx("-translate-x-1/2 -translate-y-1/2 absolute opacity-80 size-[45px]", additionalClassNames)}>
      <div className="absolute inset-0 opacity-16 rounded-[8px]" data-name="🎨 Colors Dark">
        <div className="absolute bg-white inset-0 rounded-[99px]" data-name="BG dark" />
      </div>
      <CaptionText text="200" />
    </div>
  );
}
type BubblePurple3Props = {
  additionalClassNames?: string;
};

function BubblePurple3({ additionalClassNames = "" }: BubblePurple3Props) {
  return (
    <div className={clsx("-translate-x-1/2 -translate-y-1/2 absolute opacity-80 size-[38px]", additionalClassNames)}>
      <div className="absolute inset-0 opacity-56" data-name="🎨 Colors Primary">
        <div className="absolute bg-[#1dd1a1] inset-0 rounded-[99px]" data-name="BG primary" />
      </div>
      <CaptionText text="100" />
    </div>
  );
}
type BubblePurple2Props = {
  additionalClassNames?: string;
};

function BubblePurple2({ additionalClassNames = "" }: BubblePurple2Props) {
  return (
    <div className={clsx("-translate-x-1/2 -translate-y-1/2 absolute opacity-80 size-[58px]", additionalClassNames)}>
      <div className="absolute inset-0 opacity-56" data-name="🎨 Colors Primary">
        <div className="absolute bg-[#1dd1a1] inset-0 rounded-[99px]" data-name="BG primary" />
      </div>
      <CaptionText text="7 000" />
    </div>
  );
}
type BubbleAccent2Props = {
  additionalClassNames?: string;
};

function BubbleAccent2({ additionalClassNames = "" }: BubbleAccent2Props) {
  return (
    <div className={clsx("-translate-x-1/2 -translate-y-1/2 absolute size-[68px]", additionalClassNames)}>
      <div className="absolute inset-0 opacity-24" data-name="🎨 Colors Accent">
        <div className="absolute bg-[#ff6b6b] inset-0 rounded-[99px]" data-name="BG accent" />
      </div>
      <CaptionText text="8 000" />
    </div>
  );
}
type BubbleGray1Props = {
  additionalClassNames?: string;
};

function BubbleGray1({ additionalClassNames = "" }: BubbleGray1Props) {
  return (
    <div className={clsx("-translate-x-1/2 -translate-y-1/2 absolute opacity-80 size-[85px]", additionalClassNames)}>
      <div className="absolute inset-0 opacity-16 rounded-[8px]" data-name="🎨 Colors Dark">
        <div className="absolute bg-white inset-0 rounded-[99px]" data-name="BG dark" />
      </div>
      <CaptionText text="12 000" />
    </div>
  );
}
type BubbleAccent1Props = {
  additionalClassNames?: string;
};

function BubbleAccent1({ additionalClassNames = "" }: BubbleAccent1Props) {
  return (
    <div className={clsx("-translate-x-1/2 -translate-y-1/2 absolute size-[26px]", additionalClassNames)}>
      <div className="absolute bg-[#ff6b6b] inset-0 rounded-[99px]" data-name="BG accent" />
      <CaptionText text="20" />
    </div>
  );
}
type BubbleBlack2Props = {
  additionalClassNames?: string;
};

function BubbleBlack2({ additionalClassNames = "" }: BubbleBlack2Props) {
  return (
    <div className={clsx("-translate-x-1/2 -translate-y-1/2 absolute opacity-80 size-[41px]", additionalClassNames)}>
      <div className="absolute inset-0 rounded-[8px]" data-name="🎨 Colors Dark">
        <div className="absolute bg-[#78909c] inset-0 rounded-[99px]" data-name="BG dark" />
      </div>
      <CaptionText text="150" />
    </div>
  );
}
type BubbleBlueProps = {
  additionalClassNames?: string;
};

function BubbleBlue({ additionalClassNames = "" }: BubbleBlueProps) {
  return (
    <div className={clsx("-translate-x-1/2 -translate-y-1/2 absolute opacity-80 size-[64px]", additionalClassNames)}>
      <div className="absolute bg-[#54a0ff] inset-0 rounded-[999px]" data-name="BG primary" />
      <CaptionText text="300" />
    </div>
  );
}
type BubbleBlack1Props = {
  additionalClassNames?: string;
};

function BubbleBlack1({ additionalClassNames = "" }: BubbleBlack1Props) {
  return (
    <div className={clsx("-translate-x-1/2 -translate-y-1/2 absolute opacity-80 size-[45px]", additionalClassNames)}>
      <div className="absolute inset-0 rounded-[8px]" data-name="🎨 Colors Dark">
        <div className="absolute bg-[#78909c] inset-0 rounded-[99px]" data-name="BG dark" />
      </div>
      <CaptionText text="200" />
    </div>
  );
}
type BubblePurple1Props = {
  additionalClassNames?: string;
};

function BubblePurple1({ additionalClassNames = "" }: BubblePurple1Props) {
  return (
    <div className={clsx("-translate-x-1/2 -translate-y-1/2 absolute opacity-80 size-[64px]", additionalClassNames)}>
      <div className="absolute inset-0 opacity-56" data-name="🎨 Colors Primary">
        <div className="absolute bg-[#1dd1a1] inset-0 rounded-[99px]" data-name="BG primary" />
      </div>
      <CaptionText text="1 000" />
    </div>
  );
}
type BubblePurpleProps = {
  additionalClassNames?: string;
};

function BubblePurple({ additionalClassNames = "" }: BubblePurpleProps) {
  return (
    <div className={clsx("-translate-x-1/2 -translate-y-1/2 absolute opacity-80", additionalClassNames)}>
      <div className="absolute inset-0 opacity-56" data-name="🎨 Colors Primary">
        <div className="absolute bg-[#1dd1a1] inset-0 rounded-[99px]" data-name="BG primary" />
      </div>
      <CaptionText text="5 000" />
    </div>
  );
}
type BubbleGrayProps = {
  additionalClassNames?: string;
};

function BubbleGray({ additionalClassNames = "" }: BubbleGrayProps) {
  return (
    <div className={clsx("-translate-x-1/2 -translate-y-1/2 absolute opacity-80 size-[156px]", additionalClassNames)}>
      <div className="absolute inset-0 opacity-16 rounded-[8px]" data-name="🎨 Colors Dark">
        <div className="absolute bg-white inset-0 rounded-[99px]" data-name="BG dark" />
      </div>
      <CaptionText text="120 000" />
    </div>
  );
}
type BubbleAccentProps = {
  additionalClassNames?: string;
};

function BubbleAccent({ additionalClassNames = "" }: BubbleAccentProps) {
  return (
    <div className={clsx("-translate-x-1/2 -translate-y-1/2 absolute size-[126px]", additionalClassNames)}>
      <div className="absolute inset-0 opacity-24" data-name="🎨 Colors Accent">
        <div className="absolute bg-[#ff6b6b] inset-0 rounded-[99px]" data-name="BG accent" />
      </div>
      <CaptionText text="80 000" />
    </div>
  );
}
type BubbleBlackProps = {
  additionalClassNames?: string;
};

function BubbleBlack({ additionalClassNames = "" }: BubbleBlackProps) {
  return (
    <div className={clsx("-translate-x-1/2 -translate-y-1/2 absolute opacity-80 size-[85px]", additionalClassNames)}>
      <div className="absolute inset-0 rounded-[8px]" data-name="🎨 Colors Dark">
        <div className="absolute bg-[#78909c] inset-0 rounded-[99px]" data-name="BG dark" />
      </div>
      <CaptionText text="12 000" />
    </div>
  );
}
type CaptionTextProps = {
  text: string;
};

function CaptionText({ text }: CaptionTextProps) {
  return (
    <div className="absolute inset-[5.13%] overflow-clip">
      <div className="absolute capitalize flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[12px] text-center text-white tracking-[0.4px]">
        <p className="leading-[16px]">{text}</p>
      </div>
    </div>
  );
}

export default function BubbleDark() {
  return (
    <div className="overflow-clip relative rounded-[8px] size-full" data-name="Bubble Dark">
      <div className="absolute inset-[0_-0.15px_0_0] shadow-[0px_16px_32px_0px_rgba(176,190,197,0.24),0px_4px_8px_0px_rgba(176,190,197,0.48)]" data-name="Background Card">
        <div className="absolute bg-[#2e2e33] inset-0 rounded-[8px]" data-name="BG light" />
      </div>
      <div className="absolute inset-[88px_24px_70px_24px] overflow-clip" data-name="Bottom · 56dp">
        <BubbleDarkHelper additionalClassNames="left-[80px]" />
        <BubbleDarkHelper additionalClassNames="left-[192px]" />
        <BubbleDarkHelper additionalClassNames="left-[304px]" />
        <BubbleDarkHelper additionalClassNames="left-[416px]" />
        <BubbleDarkHelper additionalClassNames="left-[528px]" />
        <BubbleDarkHelper additionalClassNames="left-[640px]" />
        <BubbleDarkHelper additionalClassNames="left-[752px]" />
        <BubbleDarkHelper additionalClassNames="left-[808px]" />
        <BubbleDarkHelper additionalClassNames="left-[864px]" />
        <BubbleDarkHelper additionalClassNames="left-[920px]" />
        <BubbleDarkHelper additionalClassNames="left-[976px]" />
        <BubbleDarkHelper additionalClassNames="left-[1032px]" />
        <BubbleDarkHelper additionalClassNames="left-[1088px]" />
        <BubbleDarkHelper additionalClassNames="left-[1144px]" />
        <BubbleDarkHelper additionalClassNames="left-[1200px]" />
        <BubbleDarkHelper additionalClassNames="left-[1256px]" />
        <BubbleDarkHelper additionalClassNames="left-[1312px]" />
        <BubbleDarkHelper additionalClassNames="left-[1368px]" />
        <BubbleDarkText text="aug" additionalClassNames="left-[392px]" />
        <BubbleDarkText text="oct" additionalClassNames="left-[504px]" />
        <BubbleDarkText text="dec" additionalClassNames="left-[616px]" />
        <BubbleDarkText text="feb" additionalClassNames="left-[728px]" />
        <BubbleDarkText text="mar" additionalClassNames="left-[784px]" />
        <BubbleDarkText text="jul" additionalClassNames="left-[840px]" />
        <BubbleDarkText text="aug" additionalClassNames="left-[896px]" />
        <BubbleDarkText text="sep" additionalClassNames="left-[952px]" />
        <BubbleDarkText text="oct" additionalClassNames="left-[1008px]" />
        <BubbleDarkText text="nov" additionalClassNames="left-[1064px]" />
        <BubbleDarkText text="dec" additionalClassNames="left-[1120px]" />
        <BubbleDarkText text="jan" additionalClassNames="left-[1176px]" />
        <BubbleDarkText text="feb" additionalClassNames="left-[1232px]" />
        <BubbleDarkText text="mar" additionalClassNames="left-[1288px]" />
        <BubbleDarkText text="feb" additionalClassNames="left-[56px]" />
        <BubbleDarkText text="apr" additionalClassNames="left-[168px]" />
        <BubbleDarkText text="jun" additionalClassNames="left-[280px]" />
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute contents left-[calc(12.5%-1px)] top-[calc(50%+15.5px)]" data-name="Group">
        <BubbleBlack additionalClassNames="left-[calc(12.5%-1.5px)] top-[calc(50%+59.5px)]" />
        <BubbleAccent additionalClassNames="left-[calc(12.5%-1px)] top-[calc(50%-49px)]" />
        <BubbleGray additionalClassNames="left-[calc(12.5%-1px)] top-[calc(50%-135px)]" />
        <BubblePurple additionalClassNames="left-[calc(12.5%-1px)] size-[102px] top-[calc(50%+161px)]" />
        <BubblePurple1 additionalClassNames="left-[calc(12.5%-1px)] top-[calc(50%-195px)]" />
        <BubbleBlack1 additionalClassNames="left-[calc(12.5%-1.5px)] top-[calc(50%+235.5px)]" />
        <BubbleBlue additionalClassNames="left-[calc(12.5%-1px)] top-[calc(50%+204px)]" />
        <BubbleBlack2 additionalClassNames="left-[calc(12.5%-1.5px)] top-[calc(50%-92.5px)]" />
        <BubbleAccent1 additionalClassNames="left-[calc(12.5%-1px)] top-[calc(50%+91px)]" />
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute contents left-[calc(79.17%-1px)] top-[calc(50%+6.5px)]" data-name="Group">
        <BubbleBlack additionalClassNames="left-[calc(79.17%-1.5px)] top-[calc(50%+79.5px)]" />
        <BubbleAccent additionalClassNames="left-[calc(79.17%-1px)] top-[calc(50%-14px)]" />
        <BubbleGray additionalClassNames="left-[calc(79.17%-1px)] top-[calc(50%+169px)]" />
        <BubblePurple additionalClassNames="left-[calc(79.17%-1px)] size-[102px] top-[calc(50%-147px)]" />
        <BubblePurple1 additionalClassNames="left-[calc(79.17%-1px)] top-[calc(50%-93px)]" />
        <BubbleBlack1 additionalClassNames="left-[calc(79.17%-1.5px)] top-[calc(50%+43.5px)]" />
        <BubbleBlue additionalClassNames="left-[calc(79.17%-1px)] top-[calc(50%-202px)]" />
        <BubbleBlack2 additionalClassNames="left-[calc(79.17%-1.5px)] top-[calc(50%-68.5px)]" />
        <BubbleAccent1 additionalClassNames="left-[calc(79.17%-1px)] top-[calc(50%+107px)]" />
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute contents left-[calc(54.17%-15.5px)] top-[calc(50%+15.5px)]" data-name="Group">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(54.17%-15px)] size-[126px] top-[calc(50%-49px)]" data-name="Bubble Purple">
          <div className="absolute inset-0 opacity-56" data-name="🎨 Colors Primary">
            <div className="absolute bg-[#1dd1a1] inset-0 rounded-[99px]" data-name="BG primary" />
          </div>
          <CaptionText text="80 000" />
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(54.17%-15px)] size-[44px] top-[calc(50%-135px)]" data-name="Bubble Purple">
          <div className="absolute inset-0 opacity-56" data-name="🎨 Colors Primary">
            <div className="absolute bg-[#1dd1a1] inset-0 rounded-[99px]" data-name="BG primary" />
          </div>
          <CaptionText text="800" />
        </div>
        <BubblePurple additionalClassNames="left-[calc(54.17%-15px)] size-[102px] top-[calc(50%-106px)]" />
        <BubblePurple1 additionalClassNames="left-[calc(54.17%-15px)] top-[calc(50%-195px)]" />
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(54.17%-15.5px)] size-[45px] top-[calc(50%+235.5px)]" data-name="Bubble Purple">
          <div className="absolute inset-0 opacity-56" data-name="🎨 Colors Primary">
            <div className="absolute bg-[#1dd1a1] inset-0 rounded-[99px]" data-name="BG primary" />
          </div>
          <CaptionText text="200" />
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(54.17%-15px)] size-[64px] top-[calc(50%+204px)]" data-name="Bubble Gray">
          <div className="absolute inset-0 opacity-16 rounded-[8px]" data-name="🎨 Colors Dark">
            <div className="absolute bg-white inset-0 rounded-[99px]" data-name="BG dark" />
          </div>
          <CaptionText text="300" />
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(54.17%-15.5px)] opacity-80 size-[161px] top-[calc(50%+119.5px)]" data-name="Bubble Black">
          <div className="absolute inset-0 rounded-[8px]" data-name="🎨 Colors Dark">
            <div className="absolute bg-[#78909c] inset-0 rounded-[99px]" data-name="BG dark" />
          </div>
          <CaptionText text="130 000" />
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(54.17%-15px)] size-[58px] top-[calc(50%+58px)]" data-name="Bubble Accent">
          <div className="absolute bg-[#ff6b6b] inset-0 rounded-[99px]" data-name="BG accent" />
          <CaptionText text="8 000" />
        </div>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute contents left-[calc(25%+5.5px)] top-[calc(50%-63.5px)]" data-name="Group">
        <BubbleGray1 additionalClassNames="left-[calc(25%+5.5px)] top-[calc(50%-173.5px)]" />
        <BubbleAccent2 additionalClassNames="left-[calc(25%+6px)] top-[calc(50%-49px)]" />
        <BubblePurple2 additionalClassNames="left-[calc(25%+6px)] top-[calc(50%+69px)]" />
        <BubblePurple3 additionalClassNames="left-[calc(25%+6px)] top-[calc(50%+102px)]" />
        <BubbleGray2 additionalClassNames="left-[calc(25%+5.5px)] top-[calc(50%-123.5px)]" />
        <BubbleBlue additionalClassNames="left-[calc(25%+6px)] top-[calc(50%-11px)]" />
        <BubbleGray3 additionalClassNames="left-[calc(25%+5.5px)] top-[calc(50%-92.5px)]" />
        <BubbleAccent3 additionalClassNames="left-[calc(25%+6px)] top-[calc(50%-235px)]" />
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute contents left-[calc(66.67%-8.5px)] top-[calc(50%+15px)]" data-name="Group">
        <BubbleGray1 additionalClassNames="left-[calc(66.67%-8.5px)] top-[calc(50%+106.5px)]" />
        <BubbleAccent2 additionalClassNames="left-[calc(66.67%-8px)] top-[calc(50%-16px)]" />
        <BubblePurple2 additionalClassNames="left-[calc(66.67%-8px)] top-[calc(50%+139px)]" />
        <BubblePurple3 additionalClassNames="left-[calc(66.67%-8px)] top-[calc(50%+201px)]" />
        <BubbleGray2 additionalClassNames="left-[calc(66.67%-8.5px)] top-[calc(50%-167.5px)]" />
        <BubbleBlue additionalClassNames="left-[calc(66.67%-8px)] top-[calc(50%+64px)]" />
        <BubbleGray3 additionalClassNames="left-[calc(66.67%-8.5px)] top-[calc(50%+18.5px)]" />
        <BubbleAccent3 additionalClassNames="left-[calc(66.67%-8px)] top-[calc(50%+170px)]" />
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute contents left-[calc(37.5%+13px)] top-[calc(50%+18.5px)]" data-name="Group">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(37.5%+13px)] opacity-80 size-[130px] top-[calc(50%+115px)]" data-name="Bubble Blue">
          <div className="absolute bg-[#54a0ff] inset-0 rounded-[999px]" data-name="BG primary" />
          <CaptionText text="90 000" />
        </div>
        <BubblePurple additionalClassNames="left-[calc(37.5%+13px)] size-[102px] top-[calc(50%+7px)]" />
        <BubblePurple1 additionalClassNames="left-[calc(37.5%+13px)] top-[calc(50%+225px)]" />
        <BubbleBlue1 additionalClassNames="left-[calc(37.5%+12.5px)] top-[calc(50%+142.5px)]" />
        <BubbleBlue additionalClassNames="left-[calc(37.5%+13px)] top-[calc(50%+183px)]" />
        <BubbleBlack2 additionalClassNames="left-[calc(37.5%+12.5px)] top-[calc(50%-166.5px)]" />
        <BubbleAccent4 additionalClassNames="left-[calc(37.5%+13px)] top-[calc(50%-70px)]" />
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(37.5%+13px)] size-[12px] top-[calc(50%-214px)]" data-name="Bubble Accent">
          <div className="absolute bg-[#ff6b6b] inset-0 rounded-[99px]" data-name="BG accent" />
        </div>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute contents left-[calc(95.83%-29px)] top-[calc(50%+17.5px)]" data-name="Group">
        <BubblePurple additionalClassNames="left-[calc(95.83%-29px)] size-[74px] top-[calc(50%-10px)]" />
        <BubblePurple1 additionalClassNames="left-[calc(95.83%-29px)] top-[calc(50%+32px)]" />
        <BubbleBlue1 additionalClassNames="left-[calc(95.83%-29.5px)] top-[calc(50%+217.5px)]" />
        <BubbleBlue additionalClassNames="left-[calc(95.83%-29px)] top-[calc(50%+183px)]" />
        <BubbleBlack2 additionalClassNames="left-[calc(95.83%-29.5px)] top-[calc(50%-136.5px)]" />
        <BubbleAccent4 additionalClassNames="left-[calc(95.83%-29px)] top-[calc(50%-192px)]" />
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(95.83%-29px)] size-[12px] top-[calc(50%-106px)]" data-name="Bubble Accent">
          <div className="absolute bg-[#ff6b6b] inset-0 rounded-[99px]" data-name="BG accent" />
        </div>
      </div>
      <div className="absolute h-[64px] left-0 right-0 top-0" data-name="Header / Desktop">
        <div className="absolute bg-[#171719] bottom-[-1px] h-px left-0 right-0" data-name="Divider" />
        <div className="absolute bottom-0 left-0 top-0 w-[360px]" data-name="Left / Empty">
          <div className="absolute bg-[#393940] inset-0" data-name="Base" />
        </div>
        <div className="absolute bottom-0 right-0 top-0 w-[360px]" data-name="Right / Empty">
          <div className="absolute bg-[#393940] inset-0" data-name="Base" />
        </div>
        <div className="absolute inset-[0_360px]" data-name="Center / Color Info">
          <div className="absolute bg-[#393940] inset-0" data-name="Base" />
          <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex items-center left-1/2 overflow-clip top-1/2" data-name="Color Info">
            <div className="h-[24px] overflow-clip relative shrink-0 w-[112px]" data-name="🔶 Items/Color info Double">
              <ColorInfo16SpBodyText text="Food" />
              <ColorInfoBarBlue>
                <div className="absolute bg-[#855cf8] inset-0 opacity-40 rounded-[99px]" data-name="BG primary" />
              </ColorInfoBarBlue>
            </div>
            <div className="h-[24px] overflow-clip relative shrink-0 w-[112px]" data-name="🔶 Items/Color info Double">
              <ColorInfo16SpBodyText text="Fuel" />
              <ColorInfoBarBlue>
                <div className="absolute bg-[#855cf8] inset-0 rounded-[99px]" data-name="BG primary" />
              </ColorInfoBarBlue>
            </div>
            <div className="h-[24px] overflow-clip relative shrink-0 w-[112px]" data-name="🔶 Items/Color info Double">
              <ColorInfo16SpBodyText text="Pets" />
              <ColorInfoBarBlue>
                <div className="absolute bg-white inset-0 rounded-[99px]" data-name="BG primary" />
              </ColorInfoBarBlue>
            </div>
            <div className="h-[24px] overflow-clip relative shrink-0 w-[112px]" data-name="🔶 Items/Color info Double">
              <ColorInfo16SpBodyText text="Shops" />
              <ColorInfoBarBlue>
                <div className="absolute bg-[#feca57] inset-0 rounded-[99px]" data-name="BG primary" />
              </ColorInfoBarBlue>
            </div>
            <div className="h-[24px] overflow-clip relative shrink-0 w-[176px]" data-name="🔶 Items/Color info Double">
              <ColorInfo16SpBodyText text="Other little things" />
              <ColorInfoBarBlue>
                <div className="absolute bg-[#ff6b6b] inset-0 rounded-[99px]" data-name="BG primary" />
              </ColorInfoBarBlue>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}