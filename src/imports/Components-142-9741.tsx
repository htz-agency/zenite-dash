import clsx from "clsx";
type CaptionText1Props = {
  text: string;
};

function CaptionText1({ text }: CaptionText1Props) {
  return (
    <div className="absolute inset-[5.13%] overflow-clip">
      <div className="absolute capitalize flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[12px] text-center text-white tracking-[0.4px]">
        <p className="leading-[16px]">{text}</p>
      </div>
    </div>
  );
}
type BubbleAccentProps = {
  additionalClassNames?: string;
};

function BubbleAccent({ additionalClassNames = "" }: BubbleAccentProps) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <div className="absolute inset-0 opacity-24" data-name="🎨 Colors Accent">
        <div className="absolute bg-[#ff6b6b] inset-0 rounded-[99px]" data-name="BG accent" />
      </div>
      <CaptionText text="Value" />
    </div>
  );
}
type CaptionTextProps = {
  text: string;
};

function CaptionText({ text }: CaptionTextProps) {
  return (
    <div className="absolute inset-[5.13%] overflow-clip">
      <div className="absolute capitalize flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#263238] text-[12px] text-center tracking-[0.4px]">
        <p className="leading-[16px]">{text}</p>
      </div>
    </div>
  );
}
type TextProps = {
  text: string;
  additionalClassNames?: string;
};

function Text({ text, additionalClassNames = "" }: TextProps) {
  return (
    <div className={additionalClassNames}>
      <div className="absolute inset-0 opacity-56" data-name="🎨 Colors Primary">
        <div className="absolute bg-[#1dd1a1] inset-0 rounded-[99px]" data-name="BG primary" />
      </div>
      <CaptionText text={text} />
    </div>
  );
}
type BubbleGroupBubblePurpleTextProps = {
  text: string;
  additionalClassNames?: string;
};

function BubbleGroupBubblePurpleText({ text, additionalClassNames = "" }: BubbleGroupBubblePurpleTextProps) {
  return <Text text={text} additionalClassNames={clsx("absolute bottom-1/2", additionalClassNames)} />;
}

export default function Components() {
  return (
    <div className="relative size-full" data-name="Components">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['IBM_Plex_Sans:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] left-[59px] not-italic text-[#607080] text-[16px] text-center top-[12px] tracking-[0.44px] whitespace-nowrap">
        <p className="leading-[24px]">❖ Components</p>
      </div>
      <div className="absolute left-[188px] size-[156px] top-[48px]" data-name="Bubble Black">
        <div className="absolute inset-0 rounded-[8px]" data-name="🎨 Colors Dark">
          <div className="absolute bg-[#78909c] inset-0 rounded-[99px]" data-name="BG dark" />
        </div>
        <CaptionText1 text="Value" />
      </div>
      <div className="absolute left-0 size-[156px] top-[48px]" data-name="Bubble Accent">
        <div className="absolute inset-0 opacity-24" data-name="🎨 Colors Accent">
          <div className="absolute bg-[#ff6b6b] inset-0 rounded-[99px]" data-name="BG accent" />
        </div>
        <CaptionText text="Value" />
      </div>
      <div className="absolute left-[376px] size-[156px] top-[236px]" data-name="Bubble Blue">
        <div className="absolute bg-[#54a0ff] inset-0 rounded-[999px]" data-name="BG primary" />
        <CaptionText1 text="Value" />
      </div>
      <div className="absolute left-[376px] size-[156px] top-[48px]" data-name="Bubble Purple">
        <div className="absolute inset-0 opacity-56" data-name="🎨 Colors Primary">
          <div className="absolute bg-[#1dd1a1] inset-0 rounded-[99px]" data-name="BG primary" />
        </div>
        <CaptionText text="Value" />
      </div>
      <div className="absolute left-[188px] size-[156px] top-[236px]" data-name="Bubble Gray">
        <div className="absolute inset-0 opacity-16 rounded-[8px]" data-name="🎨 Colors Dark">
          <div className="absolute bg-[#263238] inset-0 rounded-[99px]" data-name="BG dark" />
        </div>
        <CaptionText text="Value" />
      </div>
      <div className="absolute h-[280px] left-[172px] overflow-clip top-[408px] w-[360px]" data-name="Bubble Group">
        <BubbleGroupBubblePurpleText text="Value" additionalClassNames="left-[11.76%] right-[66.67%] top-[22.5%]" />
        <Text text="Value" additionalClassNames="absolute inset-[52.5%_66.67%_15%_7.84%]" />
        <BubbleAccent additionalClassNames="inset-[67.5%_39.22%_0_35.29%]" />
        <Text text="Value" additionalClassNames="absolute inset-[0_23.53%_72.5%_54.9%]" />
        <BubbleAccent additionalClassNames="inset-[22.5%_47.06%_55%_35.29%]" />
        <Text text="Value" additionalClassNames="absolute inset-[47.5%_33.33%_32.5%_50.98%]" />
        <Text text="Value" additionalClassNames="absolute inset-[30%_33.33%_55%_54.9%]" />
        <Text text="Value" additionalClassNames="absolute inset-[67.5%_23.53%_15%_62.75%]" />
        <Text text="Value" additionalClassNames="absolute inset-[72.5%_11.76%_15%_78.43%]" />
        <BubbleGroupBubblePurpleText text="Value" additionalClassNames="left-0 right-[90.2%] top-[37.5%]" />
        <div className="absolute inset-[30%_0_30%_68.63%]" data-name="Bubble Blue">
          <div className="absolute bg-[#54a0ff] inset-0 rounded-[999px]" data-name="BG primary" />
          <CaptionText1 text="Value" />
        </div>
        <BubbleAccent additionalClassNames="inset-[47.5%_50.98%_35%_35.29%]" />
      </div>
    </div>
  );
}