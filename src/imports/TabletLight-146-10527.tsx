import clsx from "clsx";
import svgPaths from "./svg-pnr7tcu8w4";
import imgUserpic from "figma:asset/8a7d68fe92be1f29404445476407d81857a346d3.png";
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

function Wrapper1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute inset-[-1px_0_0_0]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1136 1">
        {children}
      </svg>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute inset-[-1px_0_0_0]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1358 1">
        {children}
      </svg>
    </div>
  );
}
type Text4Props = {
  text: string;
  additionalClassNames?: string;
};

function Text4({ text, additionalClassNames = "" }: Text4Props) {
  return (
    <div className={clsx("absolute size-[32px]", additionalClassNames)}>
      <Helper />
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <path d="M16 0L32 16L16 32L0 16L16 0Z" fill="var(--fill-0, #1B314B)" id="Polygon Fill" opacity="0.35" />
      </svg>
      <div className="absolute capitalize flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[12px] text-center text-white tracking-[0.4px]">
        <p className="leading-[16px]">{text}</p>
      </div>
    </div>
  );
}
type Text3Props = {
  text: string;
  additionalClassNames?: string;
};

function Text3({ text, additionalClassNames = "" }: Text3Props) {
  return (
    <div className={clsx("absolute size-[32px]", additionalClassNames)}>
      <Helper />
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <path d="M16 0L32 16L16 32L0 16L16 0Z" fill="var(--fill-0, #1B314B)" id="Polygon Fill" />
      </svg>
      <div className="absolute capitalize flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[12px] text-center text-white tracking-[0.4px]">
        <p className="leading-[16px]">{text}</p>
      </div>
    </div>
  );
}
type Text2Props = {
  text: string;
  additionalClassNames?: string;
};

function Text2({ text, additionalClassNames = "" }: Text2Props) {
  return (
    <div className={clsx("absolute size-[32px]", additionalClassNames)}>
      <Helper />
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <path d="M16 0L32 16L16 32L0 16L16 0Z" fill="var(--fill-0, #1B314B)" id="Polygon Fill" opacity="0.25" />
      </svg>
      <div className="absolute capitalize flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[12px] text-center text-white tracking-[0.4px]">
        <p className="leading-[16px]">{text}</p>
      </div>
    </div>
  );
}
type Text1Props = {
  text: string;
  additionalClassNames?: string;
};

function Text1({ text, additionalClassNames = "" }: Text1Props) {
  return (
    <div className={clsx("absolute size-[32px]", additionalClassNames)}>
      <Helper />
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <path d="M16 0L32 16L16 32L0 16L16 0Z" fill="var(--fill-0, #1B314B)" id="Polygon Fill" opacity="0.15" />
      </svg>
      <div className="absolute capitalize flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[12px] text-center text-white tracking-[0.4px]">
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
    <div className={clsx("absolute size-[32px]", additionalClassNames)}>
      <Helper />
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <path d="M16 0L32 16L16 32L0 16L16 0Z" fill="var(--fill-0, #1B314B)" id="Polygon Fill" opacity="0.7" />
      </svg>
      <div className="absolute capitalize flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[12px] text-center text-white tracking-[0.4px]">
        <p className="leading-[16px]">{text}</p>
      </div>
    </div>
  );
}

function Helper() {
  return (
    <svg fill="none" preserveAspectRatio="none" viewBox="0 0 32 32" className="absolute block size-full">
      <path d="M16 0L32 16L16 32L0 16L16 0Z" fill="var(--fill-0, white)" id="Polygon BG" />
    </svg>
  );
}
type TabletLightTextProps = {
  text: string;
  additionalClassNames?: string;
};

function TabletLightText({ text, additionalClassNames = "" }: TabletLightTextProps) {
  return (
    <div className={clsx("absolute size-[32px]", additionalClassNames)}>
      <Helper />
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <path d="M16 0L32 16L16 32L0 16L16 0Z" fill="var(--fill-0, #1B314B)" id="Polygon Fill" opacity="0.5" />
      </svg>
      <div className="absolute capitalize flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[12px] text-center text-white tracking-[0.4px]">
        <p className="leading-[16px]">{text}</p>
      </div>
    </div>
  );
}
type TabletLightCaptionText1Props = {
  text: string;
  additionalClassNames?: string;
};

function TabletLightCaptionText1({ text, additionalClassNames = "" }: TabletLightCaptionText1Props) {
  return (
    <div className={clsx("absolute left-0 w-[72px]", additionalClassNames)}>
      <div className="absolute capitalize flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#78909c] text-[12px] tracking-[0.4px]">
        <p className="leading-[16px]">{text}</p>
      </div>
    </div>
  );
}
type TabletLightLineRegular1Props = {
  additionalClassNames?: string;
};

function TabletLightLineRegular1({ additionalClassNames = "" }: TabletLightLineRegular1Props) {
  return (
    <div className={clsx("absolute h-0 left-0 opacity-12 right-0", additionalClassNames)}>
      <Wrapper>
        <line id="Line" stroke="var(--stroke-0, #263238)" x2="1358" y1="0.5" y2="0.5" />
      </Wrapper>
    </div>
  );
}
type TabletLight10SpOverlineTextProps = {
  text: string;
  additionalClassNames?: string;
};

function TabletLight10SpOverlineText({ text, additionalClassNames = "" }: TabletLight10SpOverlineTextProps) {
  return (
    <div className={clsx("absolute opacity-54 right-0 w-[80px]", additionalClassNames)}>
      <div className="absolute capitalize flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#263238] text-[12px] tracking-[0.4px]">
        <p className="leading-[16px]">{text}</p>
      </div>
    </div>
  );
}
type TabletLightCaptionTextProps = {
  text: string;
  additionalClassNames?: string;
};

function TabletLightCaptionText({ text, additionalClassNames = "" }: TabletLightCaptionTextProps) {
  return (
    <div className={clsx("absolute right-0 w-[80px]", additionalClassNames)}>
      <div className="absolute capitalize flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#78909c] text-[12px] text-right tracking-[0.4px]">
        <p className="leading-[16px]">{text}</p>
      </div>
    </div>
  );
}
type TabletLightLineRegularProps = {
  additionalClassNames?: string;
};

function TabletLightLineRegular({ additionalClassNames = "" }: TabletLightLineRegularProps) {
  return (
    <div className={clsx("absolute h-0 left-0 opacity-12 right-0", additionalClassNames)}>
      <Wrapper1>
        <line id="Line" stroke="var(--stroke-0, #263238)" x2="1136" y1="0.5" y2="0.5" />
      </Wrapper1>
    </div>
  );
}

export default function TabletLight() {
  return (
    <div className="bg-white overflow-clip relative rounded-[8px] shadow-[0px_16px_32px_0px_rgba(176,190,197,0.24),0px_4px_8px_0px_rgba(176,190,197,0.48)] size-full" data-name="Tablet Light">
      <div className="absolute flex inset-[128px_-582px_-240px_54px] items-center justify-center">
        <div className="-rotate-90 flex-none h-[1296px] w-[1136px]">
          <div className="bg-white overflow-clip relative size-full" data-name="Right · 32dp">
            <TabletLightLineRegular additionalClassNames="top-[32px]" />
            <TabletLightLineRegular additionalClassNames="top-[64px]" />
            <TabletLightLineRegular additionalClassNames="top-[96px]" />
            <TabletLightLineRegular additionalClassNames="top-[128px]" />
            <TabletLightLineRegular additionalClassNames="top-[160px]" />
            <TabletLightLineRegular additionalClassNames="top-[192px]" />
            <TabletLightLineRegular additionalClassNames="top-[288px]" />
            <TabletLightLineRegular additionalClassNames="top-[320px]" />
            <TabletLightLineRegular additionalClassNames="top-[352px]" />
            <TabletLightLineRegular additionalClassNames="top-[384px]" />
            <TabletLightLineRegular additionalClassNames="top-[416px]" />
            <div className="absolute h-0 left-0 opacity-48 right-0 top-[224px]" data-name="Line Regular">
              <Wrapper1>
                <line id="Line" stroke="var(--stroke-0, #855CF8)" x2="1136" y1="0.5" y2="0.5" />
              </Wrapper1>
            </div>
            <TabletLightLineRegular additionalClassNames="top-[256px]" />
            <TabletLightLineRegular additionalClassNames="top-[448px]" />
            <TabletLightLineRegular additionalClassNames="top-[480px]" />
            <TabletLightLineRegular additionalClassNames="top-[512px]" />
            <TabletLightLineRegular additionalClassNames="top-[544px]" />
            <TabletLightLineRegular additionalClassNames="top-[576px]" />
            <TabletLightLineRegular additionalClassNames="top-[608px]" />
            <TabletLightLineRegular additionalClassNames="top-[640px]" />
            <TabletLightLineRegular additionalClassNames="top-[672px]" />
            <TabletLightLineRegular additionalClassNames="top-[704px]" />
            <TabletLightLineRegular additionalClassNames="top-[736px]" />
            <TabletLightLineRegular additionalClassNames="top-[832px]" />
            <TabletLightLineRegular additionalClassNames="top-[864px]" />
            <TabletLightLineRegular additionalClassNames="top-[896px]" />
            <TabletLightLineRegular additionalClassNames="top-[928px]" />
            <TabletLightLineRegular additionalClassNames="top-[960px]" />
            <TabletLightLineRegular additionalClassNames="top-[768px]" />
            <TabletLightLineRegular additionalClassNames="top-[800px]" />
            <TabletLightLineRegular additionalClassNames="top-[992px]" />
            <TabletLightLineRegular additionalClassNames="top-[1024px]" />
            <TabletLightLineRegular additionalClassNames="top-[1056px]" />
            <TabletLightLineRegular additionalClassNames="top-[1088px]" />
            <TabletLightCaptionText text="UI design" additionalClassNames="h-[24px] top-[4px]" />
            <TabletLightCaptionText text="Animation" additionalClassNames="h-[24px] top-[36px]" />
            <TabletLightCaptionText text="Prototyping" additionalClassNames="h-[24px] top-[68px]" />
            <TabletLightCaptionText text="Sketch" additionalClassNames="h-[24px] top-[100px]" />
            <TabletLightCaptionText text="Axure" additionalClassNames="h-[24px] top-[132px]" />
            <TabletLightCaptionText text="Collaboration" additionalClassNames="h-[24px] top-[164px]" />
            <TabletLightCaptionText text="Tasks" additionalClassNames="h-[24px] top-[196px]" />
            <TabletLightCaptionText text="Animation" additionalClassNames="h-[24px] top-[388px]" />
            <TabletLightCaptionText text="Prototyping" additionalClassNames="h-[24px] top-[420px]" />
            <TabletLightCaptionText text="Sketch" additionalClassNames="h-[24px] top-[452px]" />
            <TabletLightCaptionText text="Axure" additionalClassNames="h-[24px] top-[484px]" />
            <TabletLightCaptionText text="Collaboration" additionalClassNames="h-[25px] top-[516px]" />
            <TabletLightCaptionText text="Productivity" additionalClassNames="h-[24px] top-[228px]" />
            <TabletLightCaptionText text="Success" additionalClassNames="h-[24px] top-[260px]" />
            <TabletLightCaptionText text="Prosperity" additionalClassNames="h-[24px] top-[292px]" />
            <TabletLightCaptionText text="Usability" additionalClassNames="h-[24px] top-[324px]" />
            <TabletLightCaptionText text="UI design" additionalClassNames="h-[24px] top-[356px]" />
            <TabletLightCaptionText text="Productivity" additionalClassNames="h-[24px] top-[548px]" />
            <TabletLightCaptionText text="Success" additionalClassNames="h-[24px] top-[580px]" />
            <TabletLightCaptionText text="Prosperity" additionalClassNames="h-[24px] top-[612px]" />
            <TabletLightCaptionText text="Usability" additionalClassNames="h-[24px] top-[644px]" />
            <TabletLightCaptionText text="UI design" additionalClassNames="h-[24px] top-[676px]" />
            <TabletLightCaptionText text="125" additionalClassNames="h-[24px] top-[708px]" />
            <TabletLightCaptionText text="75" additionalClassNames="h-[24px] top-[740px]" />
            <TabletLightCaptionText text="put" additionalClassNames="h-[24px] top-[932px]" />
            <TabletLightCaptionText text="here" additionalClassNames="h-[24px] top-[964px]" />
            <TabletLightCaptionText text="your" additionalClassNames="h-[24px] top-[996px]" />
            <TabletLightCaptionText text="any" additionalClassNames="h-[24px] top-[1028px]" />
            <TabletLightCaptionText text="value" additionalClassNames="h-[25px] top-[1060px]" />
            <TabletLightCaptionText text="50" additionalClassNames="h-[24px] opacity-54 top-[772px]" />
            <TabletLightCaptionText text="25" additionalClassNames="h-[24px] top-[804px]" />
            <TabletLightCaptionText text="15" additionalClassNames="h-[24px] top-[836px]" />
            <TabletLightCaptionText text="10" additionalClassNames="h-[24px] top-[868px]" />
            <TabletLightCaptionText text="5" additionalClassNames="h-[24px] top-[900px]" />
            <TabletLightLineRegular additionalClassNames="top-[1152px]" />
            <TabletLightLineRegular additionalClassNames="top-[1184px]" />
            <TabletLightLineRegular additionalClassNames="top-[1216px]" />
            <TabletLightLineRegular additionalClassNames="top-[1248px]" />
            <TabletLightLineRegular additionalClassNames="top-[1280px]" />
            <TabletLightLineRegular additionalClassNames="top-[1120px]" />
            <TabletLightLineRegular additionalClassNames="top-[1312px]" />
            <TabletLightLineRegular additionalClassNames="top-[1344px]" />
            <TabletLightLineRegular additionalClassNames="top-[1376px]" />
            <TabletLightLineRegular additionalClassNames="top-[1408px]" />
            <TabletLight10SpOverlineText text="Tasks" additionalClassNames="h-[24px] top-[1252px]" />
            <TabletLight10SpOverlineText text="Home" additionalClassNames="h-[24px] top-[1284px]" />
            <TabletLight10SpOverlineText text="Restaurants" additionalClassNames="h-[24px] top-[1316px]" />
            <TabletLight10SpOverlineText text="Friends" additionalClassNames="h-[24px] top-[1348px]" />
            <TabletLight10SpOverlineText text="Settings" additionalClassNames="h-[25px] top-[1380px]" />
            <TabletLight10SpOverlineText text="Value" additionalClassNames="h-[24px] top-[1092px]" />
            <TabletLight10SpOverlineText text="Whatever" additionalClassNames="h-[24px] top-[1124px]" />
            <TabletLight10SpOverlineText text="Hotels" additionalClassNames="h-[24px] top-[1156px]" />
            <TabletLight10SpOverlineText text="Activity" additionalClassNames="h-[24px] top-[1188px]" />
            <TabletLight10SpOverlineText text="Dashboard" additionalClassNames="h-[24px] top-[1220px]" />
          </div>
        </div>
      </div>
      <div className="absolute inset-[184px_-614px_-217px_24px] overflow-clip" data-name="Left · 32dp">
        <TabletLightLineRegular1 additionalClassNames="top-[32px]" />
        <TabletLightLineRegular1 additionalClassNames="top-[64px]" />
        <TabletLightLineRegular1 additionalClassNames="top-[96px]" />
        <TabletLightLineRegular1 additionalClassNames="top-[128px]" />
        <TabletLightLineRegular1 additionalClassNames="top-[160px]" />
        <TabletLightLineRegular1 additionalClassNames="top-[192px]" />
        <TabletLightLineRegular1 additionalClassNames="top-[288px]" />
        <TabletLightLineRegular1 additionalClassNames="top-[320px]" />
        <TabletLightLineRegular1 additionalClassNames="top-[352px]" />
        <TabletLightLineRegular1 additionalClassNames="top-[384px]" />
        <TabletLightLineRegular1 additionalClassNames="top-[416px]" />
        <TabletLightLineRegular1 additionalClassNames="top-[224px]" />
        <TabletLightLineRegular1 additionalClassNames="top-[256px]" />
        <TabletLightLineRegular1 additionalClassNames="top-[448px]" />
        <TabletLightLineRegular1 additionalClassNames="top-[480px]" />
        <TabletLightLineRegular1 additionalClassNames="top-[512px]" />
        <TabletLightLineRegular1 additionalClassNames="top-[544px]" />
        <TabletLightLineRegular1 additionalClassNames="top-[576px]" />
        <TabletLightLineRegular1 additionalClassNames="top-[608px]" />
        <TabletLightLineRegular1 additionalClassNames="top-[640px]" />
        <div className="absolute h-0 left-0 opacity-48 right-0 top-[672px]" data-name="Line Regular">
          <Wrapper>
            <line id="Line" stroke="var(--stroke-0, #855CF8)" x2="1358" y1="0.5" y2="0.5" />
          </Wrapper>
        </div>
        <TabletLightLineRegular1 additionalClassNames="top-[704px]" />
        <TabletLightLineRegular1 additionalClassNames="top-[736px]" />
        <TabletLightLineRegular1 additionalClassNames="top-[832px]" />
        <TabletLightLineRegular1 additionalClassNames="top-[864px]" />
        <TabletLightLineRegular1 additionalClassNames="top-[896px]" />
        <TabletLightLineRegular1 additionalClassNames="top-[928px]" />
        <TabletLightLineRegular1 additionalClassNames="top-[960px]" />
        <TabletLightLineRegular1 additionalClassNames="top-[768px]" />
        <TabletLightLineRegular1 additionalClassNames="top-[800px]" />
        <TabletLightLineRegular1 additionalClassNames="top-[992px]" />
        <TabletLightLineRegular1 additionalClassNames="top-[1024px]" />
        <TabletLightLineRegular1 additionalClassNames="top-[1056px]" />
        <TabletLightLineRegular1 additionalClassNames="top-[1088px]" />
        <TabletLightLineRegular1 additionalClassNames="top-[1152px]" />
        <TabletLightLineRegular1 additionalClassNames="top-[1184px]" />
        <TabletLightLineRegular1 additionalClassNames="top-[1216px]" />
        <TabletLightLineRegular1 additionalClassNames="top-[1248px]" />
        <TabletLightLineRegular1 additionalClassNames="top-[1280px]" />
        <TabletLightLineRegular1 additionalClassNames="top-[1120px]" />
        <TabletLightLineRegular1 additionalClassNames="top-[1312px]" />
        <TabletLightLineRegular1 additionalClassNames="top-[1344px]" />
        <TabletLightLineRegular1 additionalClassNames="top-[1376px]" />
        <TabletLightCaptionText1 text="10 k" additionalClassNames="h-[24px] top-[4px]" />
        <TabletLightCaptionText1 text="5 k" additionalClassNames="h-[24px] top-[36px]" />
        <TabletLightCaptionText1 text="1 k" additionalClassNames="h-[24px] top-[68px]" />
        <TabletLightCaptionText1 text="500" additionalClassNames="h-[24px] top-[100px]" />
        <TabletLightCaptionText1 text="250" additionalClassNames="h-[24px] top-[132px]" />
        <TabletLightCaptionText1 text="125" additionalClassNames="h-[24px] top-[164px]" />
        <TabletLightCaptionText1 text="75" additionalClassNames="h-[24px] top-[196px]" />
        <TabletLightCaptionText1 text="put" additionalClassNames="h-[24px] top-[388px]" />
        <TabletLightCaptionText1 text="here" additionalClassNames="h-[24px] top-[420px]" />
        <TabletLightCaptionText1 text="your" additionalClassNames="h-[24px] top-[452px]" />
        <TabletLightCaptionText1 text="any" additionalClassNames="h-[24px] top-[484px]" />
        <TabletLightCaptionText1 text="value" additionalClassNames="h-[25px] top-[516px]" />
        <TabletLightCaptionText1 text="50" additionalClassNames="h-[24px] top-[228px]" />
        <TabletLightCaptionText1 text="25" additionalClassNames="h-[24px] top-[260px]" />
        <TabletLightCaptionText1 text="15" additionalClassNames="h-[24px] top-[292px]" />
        <TabletLightCaptionText1 text="10" additionalClassNames="h-[24px] top-[324px]" />
        <TabletLightCaptionText1 text="5" additionalClassNames="h-[24px] top-[356px]" />
        <TabletLightCaptionText1 text="10 k" additionalClassNames="h-[24px] top-[548px]" />
        <TabletLightCaptionText1 text="5 k" additionalClassNames="h-[24px] top-[580px]" />
        <TabletLightCaptionText1 text="1 k" additionalClassNames="h-[24px] top-[612px]" />
        <TabletLightCaptionText1 text="500" additionalClassNames="h-[24px] top-[644px]" />
        <TabletLightCaptionText1 text="250" additionalClassNames="h-[24px] top-[676px]" />
        <TabletLightCaptionText1 text="125" additionalClassNames="h-[24px] top-[708px]" />
        <TabletLightCaptionText1 text="75" additionalClassNames="h-[24px] top-[740px]" />
        <TabletLightCaptionText1 text="put" additionalClassNames="h-[24px] top-[932px]" />
        <TabletLightCaptionText1 text="here" additionalClassNames="h-[24px] top-[964px]" />
        <TabletLightCaptionText1 text="your" additionalClassNames="h-[24px] top-[996px]" />
        <TabletLightCaptionText1 text="any" additionalClassNames="h-[24px] top-[1028px]" />
        <TabletLightCaptionText1 text="value" additionalClassNames="h-[25px] top-[1060px]" />
        <TabletLightCaptionText1 text="50" additionalClassNames="h-[24px] opacity-54 top-[772px]" />
        <TabletLightCaptionText1 text="25" additionalClassNames="h-[24px] top-[804px]" />
        <TabletLightCaptionText1 text="15" additionalClassNames="h-[24px] top-[836px]" />
        <TabletLightCaptionText1 text="10" additionalClassNames="h-[24px] top-[868px]" />
        <TabletLightCaptionText1 text="5" additionalClassNames="h-[24px] top-[900px]" />
        <TabletLightCaptionText1 text="put" additionalClassNames="h-[24px] top-[1252px]" />
        <TabletLightCaptionText1 text="here" additionalClassNames="h-[24px] top-[1284px]" />
        <TabletLightCaptionText1 text="your" additionalClassNames="h-[24px] top-[1316px]" />
        <TabletLightCaptionText1 text="any" additionalClassNames="h-[24px] top-[1348px]" />
        <TabletLightCaptionText1 text="value" additionalClassNames="h-[25px] top-[1380px]" />
        <TabletLightCaptionText1 text="50" additionalClassNames="h-[24px] top-[1092px]" />
        <TabletLightCaptionText1 text="25" additionalClassNames="h-[24px] top-[1124px]" />
        <TabletLightCaptionText1 text="15" additionalClassNames="h-[24px] top-[1156px]" />
        <TabletLightCaptionText1 text="10" additionalClassNames="h-[24px] top-[1188px]" />
        <TabletLightCaptionText1 text="5" additionalClassNames="h-[24px] top-[1220px]" />
      </div>
      <div className="absolute contents left-[70px] top-[202px]" data-name="Rhombuses">
        <TabletLightText text="3" additionalClassNames="left-[70px] top-[202px]" />
        <Text text="4" additionalClassNames="left-[86px] top-[218px]" />
        <TabletLightText text="3" additionalClassNames="left-[102px] top-[234px]" />
        <Text1 text="0" additionalClassNames="left-[118px] top-[250px]" />
        <Text1 text="0" additionalClassNames="left-[214px] top-[346px]" />
        <Text text="4" additionalClassNames="left-[230px] top-[362px]" />
        <Text1 text="0" additionalClassNames="left-[246px] top-[378px]" />
        <TabletLightText text="3" additionalClassNames="left-[246px] top-[346px]" />
        <TabletLightText text="3" additionalClassNames="left-[214px] top-[378px]" />
        <Text1 text="0" additionalClassNames="left-[166px] top-[298px]" />
        <Text1 text="0" additionalClassNames="left-[198px] top-[330px]" />
        <Text2 text="1" additionalClassNames="left-[230px] top-[330px]" />
        <Text1 text="0" additionalClassNames="left-[294px] top-[330px]" />
        <TabletLightText text="3" additionalClassNames="left-[310px] top-[314px]" />
        <Text1 text="0" additionalClassNames="left-[310px] top-[282px]" />
        <Text1 text="0" additionalClassNames="left-[326px] top-[330px]" />
        <Text2 text="1" additionalClassNames="left-[198px] top-[362px]" />
        <TabletLightText text="3" additionalClassNames="left-[294px] top-[426px]" />
        <TabletLightText text="3" additionalClassNames="left-[310px] top-[442px]" />
        <Text1 text="0" additionalClassNames="left-[310px] top-[410px]" />
        <Text1 text="0" additionalClassNames="left-[278px] top-[442px]" />
        <Text2 text="1" additionalClassNames="left-[262px] top-[394px]" />
        <Text2 text="1" additionalClassNames="left-[294px] top-[394px]" />
        <Text1 text="0" additionalClassNames="left-[326px] top-[394px]" />
        <Text2 text="1" additionalClassNames="left-[262px] top-[426px]" />
        <Text1 text="0" additionalClassNames="left-[262px] top-[458px]" />
        <Text1 text="0" additionalClassNames="left-[198px] top-[426px]" />
        <Text1 text="0" additionalClassNames="left-[198px] top-[458px]" />
        <TabletLightText text="3" additionalClassNames="left-[182px] top-[442px]" />
        <Text1 text="0" additionalClassNames="left-[150px] top-[442px]" />
        <Text1 text="0" additionalClassNames="left-[166px] top-[202px]" />
        <Text1 text="0" additionalClassNames="left-[262px] top-[202px]" />
        <Text2 text="1" additionalClassNames="left-[70px] top-[234px]" />
        <Text1 text="0" additionalClassNames="left-[70px] top-[298px]" />
        <Text2 text="1" additionalClassNames="left-[86px] top-[282px]" />
        <Text1 text="0" additionalClassNames="left-[70px] top-[394px]" />
        <Text2 text="1" additionalClassNames="left-[102px] top-[202px]" />
        <Text2 text="1" additionalClassNames="left-[150px] top-[218px]" />
        <Text1 text="0" additionalClassNames="left-[342px] top-[474px]" />
        <Text text="4" additionalClassNames="left-[358px] top-[490px]" />
        <TabletLightText text="3" additionalClassNames="left-[374px] top-[474px]" />
        <Text1 text="0" additionalClassNames="left-[406px] top-[394px]" />
        <TabletLightText text="3" additionalClassNames="left-[438px] top-[474px]" />
        <Text2 text="1" additionalClassNames="left-[374px] top-[602px]" />
        <Text1 text="0" additionalClassNames="left-[438px] top-[602px]" />
        <Text2 text="1" additionalClassNames="left-[470px] top-[474px]" />
        <TabletLightText text="3" additionalClassNames="left-[342px] top-[506px]" />
        <Text3 text="5" additionalClassNames="left-[374px] top-[506px]" />
        <Text text="4" additionalClassNames="left-[390px] top-[490px]" />
        <Text1 text="0" additionalClassNames="left-[422px] top-[490px]" />
        <Text1 text="0" additionalClassNames="left-[406px] top-[426px]" />
        <Text text="4" additionalClassNames="left-[358px] top-[522px]" />
        <Text1 text="0" additionalClassNames="left-[294px] top-[538px]" />
        <Text1 text="0" additionalClassNames="left-[390px] top-[522px]" />
        <Text1 text="0" additionalClassNames="left-[358px] top-[554px]" />
        <Text1 text="0" additionalClassNames="left-[294px] top-[570px]" />
        <Text2 text="1" additionalClassNames="left-[310px] top-[554px]" />
        <Text2 text="1" additionalClassNames="left-[358px] top-[586px]" />
        <TabletLightText text="3" additionalClassNames="left-[406px] top-[570px]" />
        <TabletLightText text="3" additionalClassNames="left-[422px] top-[554px]" />
        <TabletLightText text="3" additionalClassNames="left-[438px] top-[538px]" />
        <Text1 text="0" additionalClassNames="left-[454px] top-[522px]" />
        <Text1 text="0" additionalClassNames="left-[406px] top-[538px]" />
        <Text2 text="1" additionalClassNames="left-[422px] top-[442px]" />
        <Text1 text="0" additionalClassNames="left-[438px] top-[426px]" />
        <Text2 text="1" additionalClassNames="left-[454px] top-[490px]" />
        <Text1 text="0" additionalClassNames="left-[390px] top-[586px]" />
        <Text3 text="5" additionalClassNames="left-[438px] top-[570px]" />
        <Text text="4" additionalClassNames="left-[454px] top-[554px]" />
        <Text text="4" additionalClassNames="left-[422px] top-[586px]" />
        <Text1 text="0" additionalClassNames="left-[262px] top-[538px]" />
        <TabletLightText text="3" additionalClassNames="left-[342px] top-[570px]" />
        <Text2 text="1" additionalClassNames="left-[342px] top-[602px]" />
        <Text2 text="1" additionalClassNames="left-[470px] top-[506px]" />
        <Text1 text="0" additionalClassNames="left-[470px] top-[570px]" />
        <Text1 text="0" additionalClassNames="left-[470px] top-[602px]" />
        <Text text="4" additionalClassNames="left-[454px] top-[586px]" />
        <Text2 text="1" additionalClassNames="left-[342px] top-[682px]" />
        <Text4 text="2" additionalClassNames="left-[358px] top-[698px]" />
        <Text1 text="0" additionalClassNames="left-[374px] top-[682px]" />
        <Text1 text="0" additionalClassNames="left-[310px] top-[682px]" />
        <Text text="4" additionalClassNames="left-[438px] top-[906px]" />
        <Text2 text="1" additionalClassNames="left-[374px] top-[874px]" />
        <Text1 text="0" additionalClassNames="left-[406px] top-[810px]" />
        <Text1 text="0" additionalClassNames="left-[438px] top-[874px]" />
        <Text1 text="0" additionalClassNames="left-[470px] top-[906px]" />
        <Text1 text="0" additionalClassNames="left-[342px] top-[714px]" />
        <Text text="4" additionalClassNames="left-[374px] top-[714px]" />
        <Text4 text="2" additionalClassNames="left-[390px] top-[698px]" />
        <Text2 text="1" additionalClassNames="left-[422px] top-[698px]" />
        <TabletLightText text="3" additionalClassNames="left-[406px] top-[714px]" />
        <Text4 text="2" additionalClassNames="left-[358px] top-[730px]" />
        <TabletLightText text="3" additionalClassNames="left-[374px] top-[746px]" />
        <Text text="4" additionalClassNames="left-[390px] top-[730px]" />
        <Text2 text="1" additionalClassNames="left-[358px] top-[762px]" />
        <Text2 text="1" additionalClassNames="left-[374px] top-[778px]" />
        <Text4 text="2" additionalClassNames="left-[390px] top-[762px]" />
        <Text1 text="0" additionalClassNames="left-[358px] top-[794px]" />
        <Text2 text="1" additionalClassNames="left-[406px] top-[778px]" />
        <TabletLightText text="3" additionalClassNames="left-[422px] top-[762px]" />
        <Text2 text="1" additionalClassNames="left-[438px] top-[746px]" />
        <Text2 text="1" additionalClassNames="left-[470px] top-[682px]" />
        <Text text="4" additionalClassNames="left-[406px] top-[746px]" />
        <Text4 text="2" additionalClassNames="left-[422px] top-[730px]" />
        <Text1 text="0" additionalClassNames="left-[438px] top-[938px]" />
        <Text4 text="2" additionalClassNames="left-[454px] top-[922px]" />
        <Text1 text="0" additionalClassNames="left-[390px] top-[794px]" />
        <Text1 text="0" additionalClassNames="left-[438px] top-[778px]" />
        <Text1 text="0" additionalClassNames="left-[454px] top-[762px]" />
        <Text1 text="0" additionalClassNames="left-[422px] top-[794px]" />
        <Text1 text="0" additionalClassNames="left-[246px] top-[746px]" />
        <Text1 text="0" additionalClassNames="left-[342px] top-[778px]" />
        <Text1 text="0" additionalClassNames="left-[342px] top-[874px]" />
        <Text2 text="1" additionalClassNames="left-[374px] top-[1034px]" />
        <Text1 text="0" additionalClassNames="left-[454px] top-[1082px]" />
        <Text1 text="0" additionalClassNames="left-[342px] top-[1034px]" />
        <Text2 text="1" additionalClassNames="left-[310px] top-[842px]" />
        <div className="absolute left-[262px] size-[32px] top-[842px]" data-name="Rho 0">
          <Helper />
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <path d="M16 0L32 16L16 32L0 16L16 0Z" fill="var(--fill-0, #855CF8)" id="Polygon Fill" opacity="0.9" />
          </svg>
          <div className="absolute capitalize flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[12px] text-center text-white tracking-[0.4px]">
            <p className="leading-[16px]">0</p>
          </div>
        </div>
        <Text1 text="0" additionalClassNames="left-[470px] top-[938px]" />
        <Text1 text="0" additionalClassNames="left-[486px] top-[698px]" />
        <Text1 text="0" additionalClassNames="left-[518px] top-[714px]" />
        <Text1 text="0" additionalClassNames="left-[470px] top-[778px]" />
        <Text1 text="0" additionalClassNames="left-[502px] top-[778px]" />
        <Text1 text="0" additionalClassNames="left-[470px] top-[810px]" />
        <Text2 text="1" additionalClassNames="left-[454px] top-[794px]" />
        <Text2 text="1" additionalClassNames="left-[550px] top-[474px]" />
        <Text4 text="2" additionalClassNames="left-[566px] top-[490px]" />
        <Text4 text="2" additionalClassNames="left-[895px] top-[620px]" />
        <Text4 text="2" additionalClassNames="left-[902px] top-[404px]" />
        <Text1 text="0" additionalClassNames="left-[582px] top-[474px]" />
        <Text1 text="0" additionalClassNames="left-[614px] top-[378px]" />
        <Text1 text="0" additionalClassNames="left-[943px] top-[508px]" />
        <Text1 text="0" additionalClassNames="left-[646px] top-[474px]" />
        <Text1 text="0" additionalClassNames="left-[806px] top-[602px]" />
        <Text1 text="0" additionalClassNames="left-[566px] top-[618px]" />
        <Text1 text="0" additionalClassNames="left-[895px] top-[748px]" />
        <Text1 text="0" additionalClassNames="left-[582px] top-[650px]" />
        <Text1 text="0" additionalClassNames="left-[646px] top-[602px]" />
        <Text1 text="0" additionalClassNames="left-[646px] top-[634px]" />
        <Text1 text="0" additionalClassNames="left-[742px] top-[474px]" />
        <Text1 text="0" additionalClassNames="left-[1071px] top-[604px]" />
        <Text2 text="1" additionalClassNames="left-[710px] top-[442px]" />
        <Text1 text="0" additionalClassNames="left-[710px] top-[394px]" />
        <Text1 text="0" additionalClassNames="left-[1039px] top-[524px]" />
        <Text1 text="0" additionalClassNames="left-[550px] top-[506px]" />
        <Text text="4" additionalClassNames="left-[582px] top-[506px]" />
        <Text4 text="2" additionalClassNames="left-[598px] top-[490px]" />
        <Text2 text="1" additionalClassNames="left-[630px] top-[490px]" />
        <TabletLightText text="3" additionalClassNames="left-[614px] top-[506px]" />
        <Text4 text="2" additionalClassNames="left-[566px] top-[522px]" />
        <Text4 text="2" additionalClassNames="left-[895px] top-[652px]" />
        <Text4 text="2" additionalClassNames="left-[902px] top-[436px]" />
        <TabletLightText text="3" additionalClassNames="left-[582px] top-[538px]" />
        <TabletLightText text="3" additionalClassNames="left-[911px] top-[668px]" />
        <TabletLightText text="3" additionalClassNames="left-[950px] top-[568px]" />
        <Text text="4" additionalClassNames="left-[598px] top-[522px]" />
        <Text text="4" additionalClassNames="left-[934px] top-[793px]" />
        <Text2 text="1" additionalClassNames="left-[566px] top-[554px]" />
        <Text1 text="0" additionalClassNames="left-[806px] top-[570px]" />
        <Text1 text="0" additionalClassNames="left-[1135px] top-[700px]" />
        <Text4 text="2" additionalClassNames="left-[598px] top-[554px]" />
        <Text4 text="2" additionalClassNames="left-[790px] top-[586px]" />
        <Text4 text="2" additionalClassNames="left-[1119px] top-[716px]" />
        <Text2 text="1" additionalClassNames="left-[614px] top-[570px]" />
        <Text2 text="1" additionalClassNames="left-[943px] top-[700px]" />
        <TabletLightText text="3" additionalClassNames="left-[630px] top-[554px]" />
        <Text2 text="1" additionalClassNames="left-[646px] top-[538px]" />
        <Text1 text="0" additionalClassNames="left-[662px] top-[522px]" />
        <Text text="4" additionalClassNames="left-[614px] top-[538px]" />
        <Text4 text="2" additionalClassNames="left-[630px] top-[522px]" />
        <Text4 text="2" additionalClassNames="left-[959px] top-[652px]" />
        <Text2 text="1" additionalClassNames="left-[646px] top-[506px]" />
        <Text1 text="0" additionalClassNames="left-[662px] top-[490px]" />
        <Text1 text="0" additionalClassNames="left-[991px] top-[620px]" />
        <Text2 text="1" additionalClassNames="left-[550px] top-[602px]" />
        <Text2 text="1" additionalClassNames="left-[879px] top-[732px]" />
        <Text1 text="0" additionalClassNames="left-[646px] top-[570px]" />
        <Text1 text="0" additionalClassNames="left-[662px] top-[554px]" />
        <Text1 text="0" additionalClassNames="left-[630px] top-[586px]" />
        <Text1 text="0" additionalClassNames="left-[550px] top-[442px]" />
        <Text text="4" additionalClassNames="left-[774px] top-[570px]" />
        <Text1 text="0" additionalClassNames="left-[774px] top-[602px]" />
        <Text2 text="1" additionalClassNames="left-[742px] top-[506px]" />
        <Text1 text="0" additionalClassNames="left-[1158px] top-[474px]" />
        <Text1 text="0" additionalClassNames="left-[1206px] top-[586px]" />
        <Text2 text="1" additionalClassNames="left-[1158px] top-[506px]" />
        <Text1 text="0" additionalClassNames="left-[678px] top-[538px]" />
        <Text1 text="0" additionalClassNames="left-[742px] top-[570px]" />
        <Text1 text="0" additionalClassNames="left-[678px] top-[602px]" />
        <Text2 text="1" additionalClassNames="left-[662px] top-[586px]" />
        <Text2 text="1" additionalClassNames="left-[991px] top-[716px]" />
        <Text1 text="0" additionalClassNames="left-[510px] top-[642px]" />
        <Text1 text="0" additionalClassNames="left-[839px] top-[772px]" />
        <Text1 text="0" additionalClassNames="left-[526px] top-[658px]" />
        <Text2 text="1" additionalClassNames="left-[582px] top-[682px]" />
        <Text text="4" additionalClassNames="left-[614px] top-[682px]" />
        <Text1 text="0" additionalClassNames="left-[742px] top-[650px]" />
        <Text1 text="0" additionalClassNames="left-[550px] top-[906px]" />
        <Text1 text="0" additionalClassNames="left-[614px] top-[810px]" />
        <Text1 text="0" additionalClassNames="left-[646px] top-[810px]" />
        <Text text="4" additionalClassNames="left-[614px] top-[874px]" />
        <Text1 text="0" additionalClassNames="left-[646px] top-[874px]" />
        <Text4 text="2" additionalClassNames="left-[774px] top-[650px]" />
        <Text2 text="1" additionalClassNames="left-[550px] top-[714px]" />
        <Text text="4" additionalClassNames="left-[582px] top-[714px]" />
        <Text3 text="5" additionalClassNames="left-[598px] top-[698px]" />
        <Text4 text="2" additionalClassNames="left-[630px] top-[698px]" />
        <Text text="4" additionalClassNames="left-[614px] top-[714px]" />
        <Text3 text="5" additionalClassNames="left-[566px] top-[730px]" />
        <Text text="4" additionalClassNames="left-[582px] top-[746px]" />
        <Text3 text="5" additionalClassNames="left-[598px] top-[730px]" />
        <Text4 text="2" additionalClassNames="left-[566px] top-[762px]" />
        <Text2 text="1" additionalClassNames="left-[582px] top-[778px]" />
        <Text4 text="2" additionalClassNames="left-[598px] top-[762px]" />
        <Text1 text="0" additionalClassNames="left-[566px] top-[794px]" />
        <TabletLightText text="3" additionalClassNames="left-[614px] top-[778px]" />
        <Text1 text="0" additionalClassNames="left-[630px] top-[762px]" />
        <TabletLightText text="3" additionalClassNames="left-[646px] top-[746px]" />
        <Text1 text="0" additionalClassNames="left-[662px] top-[730px]" />
        <TabletLightText text="3" additionalClassNames="left-[614px] top-[746px]" />
        <Text4 text="2" additionalClassNames="left-[630px] top-[730px]" />
        <Text2 text="1" additionalClassNames="left-[646px] top-[714px]" />
        <Text1 text="0" additionalClassNames="left-[662px] top-[698px]" />
        <Text1 text="0" additionalClassNames="left-[598px] top-[794px]" />
        <Text3 text="5" additionalClassNames="left-[646px] top-[778px]" />
        <Text text="4" additionalClassNames="left-[662px] top-[762px]" />
        <Text text="4" additionalClassNames="left-[630px] top-[794px]" />
        <Text text="4" additionalClassNames="left-[550px] top-[746px]" />
        <Text1 text="0" additionalClassNames="left-[518px] top-[874px]" />
        <Text4 text="2" additionalClassNames="left-[518px] top-[906px]" />
        <Text1 text="0" additionalClassNames="left-[774px] top-[682px]" />
        <Text1 text="0" additionalClassNames="left-[678px] top-[746px]" />
        <Text1 text="0" additionalClassNames="left-[678px] top-[778px]" />
        <Text text="4" additionalClassNames="left-[742px] top-[746px]" />
        <Text1 text="0" additionalClassNames="left-[742px] top-[778px]" />
        <Text1 text="0" additionalClassNames="left-[678px] top-[810px]" />
        <Text text="4" additionalClassNames="left-[662px] top-[794px]" />
        <TabletLightText text="3" additionalClassNames="left-[694px] top-[826px]" />
        <Text3 text="5" additionalClassNames="left-[710px] top-[842px]" />
        <Text text="4" additionalClassNames="left-[726px] top-[826px]" />
        <Text1 text="0" additionalClassNames="left-[1190px] top-[856px]" />
        <Text1 text="0" additionalClassNames="left-[1174px] top-[770px]" />
        <Text2 text="1" additionalClassNames="left-[1206px] top-[698px]" />
        <Text2 text="1" additionalClassNames="left-[726px] top-[1114px]" />
        <Text1 text="0" additionalClassNames="left-[758px] top-[954px]" />
        <Text1 text="0" additionalClassNames="left-[790px] top-[954px]" />
        <Text text="4" additionalClassNames="left-[694px] top-[858px]" />
        <Text text="4" additionalClassNames="left-[726px] top-[858px]" />
        <Text4 text="2" additionalClassNames="left-[742px] top-[842px]" />
        <Text1 text="0" additionalClassNames="left-[774px] top-[842px]" />
        <Text2 text="1" additionalClassNames="left-[758px] top-[794px]" />
        <Text4 text="2" additionalClassNames="left-[710px] top-[874px]" />
        <Text2 text="1" additionalClassNames="left-[662px] top-[890px]" />
        <TabletLightText text="3" additionalClassNames="left-[742px] top-[874px]" />
        <Text1 text="0" additionalClassNames="left-[710px] top-[906px]" />
        <Text3 text="5" additionalClassNames="left-[726px] top-[922px]" />
        <Text text="4" additionalClassNames="left-[742px] top-[906px]" />
        <Text1 text="0" additionalClassNames="left-[710px] top-[938px]" />
        <Text2 text="1" additionalClassNames="left-[758px] top-[922px]" />
        <Text2 text="1" additionalClassNames="left-[774px] top-[906px]" />
        <Text2 text="1" additionalClassNames="left-[790px] top-[890px]" />
        <Text1 text="0" additionalClassNames="left-[806px] top-[810px]" />
        <Text3 text="5" additionalClassNames="left-[758px] top-[890px]" />
        <Text text="4" additionalClassNames="left-[774px] top-[874px]" />
        <Text3 text="5" additionalClassNames="left-[790px] top-[858px]" />
        <Text1 text="0" additionalClassNames="left-[806px] top-[842px]" />
        <Text1 text="0" additionalClassNames="left-[678px] top-[938px]" />
        <Text text="4" additionalClassNames="left-[790px] top-[922px]" />
        <TabletLightText text="3" additionalClassNames="left-[806px] top-[906px]" />
        <TabletLightText text="3" additionalClassNames="left-[774px] top-[938px]" />
        <Text1 text="0" additionalClassNames="left-[694px] top-[1050px]" />
        <Text2 text="1" additionalClassNames="left-[694px] top-[1082px]" />
        <Text4 text="2" additionalClassNames="left-[694px] top-[1114px]" />
        <Text1 text="0" additionalClassNames="left-[646px] top-[1162px]" />
        <Text1 text="0" additionalClassNames="left-[614px] top-[1162px]" />
        <Text2 text="1" additionalClassNames="left-[1239px] top-[793px]" />
        <Text1 text="0" additionalClassNames="left-[1286px] top-[778px]" />
        <Text1 text="0" additionalClassNames="left-[822px] top-[890px]" />
        <Text1 text="0" additionalClassNames="left-[822px] top-[922px]" />
        <Text4 text="2" additionalClassNames="left-[822px] top-[954px]" />
        <TabletLightText text="3" additionalClassNames="left-[806px] top-[938px]" />
        <Text2 text="1" additionalClassNames="left-[1110px] top-[984px]" />
        <Text2 text="1" additionalClassNames="left-[870px] top-[1002px]" />
        <Text3 text="5" additionalClassNames="left-[1110px] top-[1032px]" />
        <Text3 text="5" additionalClassNames="left-[886px] top-[1018px]" />
        <Text1 text="0" additionalClassNames="left-[1046px] top-[920px]" />
        <Text1 text="0" additionalClassNames="left-[918px] top-[984px]" />
        <Text1 text="0" additionalClassNames="left-[1270px] top-[920px]" />
        <Text1 text="0" additionalClassNames="left-[1126px] top-[1048px]" />
        <Text1 text="0" additionalClassNames="left-[950px] top-[984px]" />
        <Text1 text="0" additionalClassNames="left-[1238px] top-[954px]" />
        <Text1 text="0" additionalClassNames="left-[982px] top-[920px]" />
        <Text4 text="2" additionalClassNames="left-[1126px] top-[1144px]" />
        <TabletLightText text="3" additionalClassNames="left-[1190px] top-[1176px]" />
        <Text1 text="0" additionalClassNames="left-[1222px] top-[1176px]" />
        <Text1 text="0" additionalClassNames="left-[1254px] top-[1048px]" />
        <Text1 text="0" additionalClassNames="left-[1062px] top-[1016px]" />
        <Text1 text="0" additionalClassNames="left-[1094px] top-[1048px]" />
        <Text1 text="0" additionalClassNames="left-[870px] top-[1034px]" />
        <Text text="4" additionalClassNames="left-[1110px] top-[1064px]" />
        <Text2 text="1" additionalClassNames="left-[1094px] top-[968px]" />
        <Text2 text="1" additionalClassNames="left-[1270px] top-[1176px]" />
        <Text2 text="1" additionalClassNames="left-[1238px] top-[1128px]" />
        <Text2 text="1" additionalClassNames="left-[1142px] top-[1064px]" />
        <Text2 text="1" additionalClassNames="left-[934px] top-[1000px]" />
        <TabletLightText text="3" additionalClassNames="left-[1174px] top-[968px]" />
        <TabletLightText text="3" additionalClassNames="left-[966px] top-[936px]" />
        <Text4 text="2" additionalClassNames="left-[950px] top-[1016px]" />
        <Text2 text="1" additionalClassNames="left-[1094px] top-[1080px]" />
        <Text4 text="2" additionalClassNames="left-[1110px] top-[1096px]" />
        <Text text="4" additionalClassNames="left-[1126px] top-[1080px]" />
        <Text text="4" additionalClassNames="left-[934px] top-[1032px]" />
        <TabletLightText text="3" additionalClassNames="left-[838px] top-[1098px]" />
        <Text4 text="2" additionalClassNames="left-[1126px] top-[1112px]" />
        <TabletLightText text="3" additionalClassNames="left-[1142px] top-[1096px]" />
        <Text1 text="0" additionalClassNames="left-[1110px] top-[1128px]" />
        <Text text="4" additionalClassNames="left-[1158px] top-[1112px]" />
        <Text text="4" additionalClassNames="left-[950px] top-[1080px]" />
        <Text3 text="5" additionalClassNames="left-[1174px] top-[1096px]" />
        <Text3 text="5" additionalClassNames="left-[966px] top-[1064px]" />
        <Text text="4" additionalClassNames="left-[1238px] top-[1082px]" />
        <Text text="4" additionalClassNames="left-[982px] top-[1048px]" />
        <TabletLightText text="3" additionalClassNames="left-[1206px] top-[1064px]" />
        <TabletLightText text="3" additionalClassNames="left-[998px] top-[1032px]" />
        <div className="absolute left-[838px] size-[32px] top-[970px]" data-name="Rho 0">
          <Helper />
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <path d="M16 0L32 16L16 32L0 16L16 0Z" fill="var(--fill-0, #855CF8)" id="Polygon Fill" opacity="0.15" />
          </svg>
          <div className="absolute capitalize flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[12px] text-center text-white tracking-[0.4px]">
            <p className="leading-[16px]">0</p>
          </div>
        </div>
        <TabletLightText text="3" additionalClassNames="left-[1174px] top-[1064px]" />
        <Text4 text="2" additionalClassNames="left-[1207px] top-[984px]" />
        <Text4 text="2" additionalClassNames="left-[982px] top-[1016px]" />
        <Text1 text="0" additionalClassNames="left-[1206px] top-[1032px]" />
        <Text1 text="0" additionalClassNames="left-[998px] top-[1000px]" />
        <TabletLightText text="3" additionalClassNames="left-[1142px] top-[1128px]" />
        <Text1 text="0" additionalClassNames="left-[1110px] top-[952px]" />
        <Text1 text="0" additionalClassNames="left-[1206px] top-[1096px]" />
        <Text1 text="0" additionalClassNames="left-[998px] top-[1064px]" />
        <Text1 text="0" additionalClassNames="left-[1174px] top-[1128px]" />
        <Text1 text="0" additionalClassNames="left-[966px] top-[1096px]" />
        <Text1 text="0" additionalClassNames="left-[1078px] top-[1096px]" />
        <Text1 text="0" additionalClassNames="left-[822px] top-[1114px]" />
        <Text1 text="0" additionalClassNames="left-[1126px] top-[1176px]" />
        <Text4 text="2" additionalClassNames="left-[1222px] top-[1048px]" />
        <TabletLightText text="3" additionalClassNames="left-[1254px] top-[1112px]" />
        <TabletLightText text="3" additionalClassNames="left-[1270px] top-[1128px]" />
        <Text1 text="0" additionalClassNames="left-[1254px] top-[1144px]" />
        <Text1 text="0" additionalClassNames="left-[1286px] top-[1144px]" />
        <Text1 text="0" additionalClassNames="left-[1302px] top-[1176px]" />
        <Text1 text="0" additionalClassNames="left-[1222px] top-[1144px]" />
        <Text3 text="5" additionalClassNames="left-[1206px] top-[1128px]" />
        <Text3 text="5" additionalClassNames="left-[998px] top-[1096px]" />
        <Text3 text="5" additionalClassNames="left-[1014px] top-[1112px]" />
      </div>
      <div className="absolute h-[32px] right-[24px] top-[72px] w-[180px]" data-name="Dropdown">
        <div className="absolute bg-[#e9f0f7] inset-0 rounded-[8px]" data-name="BG outline" />
        <div className="absolute inset-[6px_8px]" data-name="16 sp • Body 1">
          <div className="absolute flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#263238] text-[16px] tracking-[0.44px]">
            <p className="leading-[24px]">Order by cluster</p>
          </div>
        </div>
        <div className="-translate-y-1/2 absolute right-[8px] size-[24px] top-1/2" data-name="dropdown">
          <div className="absolute flex inset-[42.5%_37.5%_45%_37.5%] items-center justify-center">
            <div className="-rotate-90 flex-none h-[10px] w-[5px]">
              <div className="relative size-full" data-name="Vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 6">
                  <path d="M3 0L0 3L3 6V0Z" fill="var(--fill-0, #94A3B3)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute h-[32px] left-[24px] top-[72px] w-[400px]" data-name="Typography Component">
        <div className="absolute flex flex-col font-['IBM_Plex_Sans:Bold',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#263238] text-[24px]">
          <p className="leading-[normal]">Co-occurence rhombus matrix</p>
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
            <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex gap-[8px] h-full items-center relative">
                <div className="relative shrink-0 size-[24px]" data-name="Left Icon">
                  <TabletLightIcon additionalClassNames="inset-[13.72%_30.39%_13.72%_27.44%]">
                    <path clipRule="evenodd" d={svgPaths.p25748980} fill="var(--fill-0, #607080)" fillRule="evenodd" id="icon" />
                  </TabletLightIcon>
                </div>
                <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#2e86de] text-[16px] tracking-[0.44px] whitespace-nowrap">September 2021</p>
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
            <div className="relative shrink-0 size-[24px]" data-name="basic / search">
              <div className="absolute inset-[8.33%_9.55%_9.55%_8.33%]" data-name="icon">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.7071 19.7071">
                  <path clipRule="evenodd" d={svgPaths.p3bd16800} fill="var(--fill-0, #607080)" fillRule="evenodd" id="icon" />
                </svg>
              </div>
            </div>
            <div className="relative shrink-0 size-[24px]" data-name="basic / share">
              <div className="absolute inset-[8.33%]" data-name="icon">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                  <path clipRule="evenodd" d={svgPaths.pea1bc00} fill="var(--fill-0, #607080)" fillRule="evenodd" id="icon" />
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
        <div className="absolute inset-[0_calc(66.67%+64px)_0_0]" data-name="Mobile & Tablet / Header / Left / Logo">
          <div className="absolute bg-white inset-0" data-name="Base" />
          <div className="-translate-y-1/2 absolute content-stretch flex gap-[8px] items-center left-[8px] overflow-clip top-1/2" data-name="Logo & Title">
            <div className="overflow-clip relative shrink-0 size-[40px]" data-name="Logo">
              <div className="absolute bg-gradient-to-b from-[#feb692] from-[32.143%] inset-0 rounded-[99px] to-[#ea5455] to-[112.5%]" data-name="Logo" />
              <div className="absolute flex flex-col font-['IBM_Plex_Sans:Bold',sans-serif] inset-0 justify-center leading-[0] not-italic text-[24px] text-center text-white">
                <p className="leading-[normal]">R</p>
              </div>
            </div>
            <p className="font-['IBM_Plex_Sans:Bold',sans-serif] leading-[28px] not-italic relative shrink-0 text-[#263238] text-[20px] tracking-[0.15px] whitespace-nowrap">Rhombus Matrix</p>
          </div>
        </div>
        <div className="absolute contents left-0 right-full top-0" data-name="Dividers">
          <div className="absolute bg-[#cfd8dc] bottom-0 h-px left-0 right-0" data-name="Divider Bottom" />
        </div>
      </div>
    </div>
  );
}