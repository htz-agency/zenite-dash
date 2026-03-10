import clsx from "clsx";
import svgPaths from "./svg-a51u13ow2a";
type BubbleMobileLightIconProps = {
  additionalClassNames?: string;
};

function BubbleMobileLightIcon({ children, additionalClassNames = "" }: React.PropsWithChildren<BubbleMobileLightIconProps>) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.1213 17.4142">
        {children}
      </svg>
    </div>
  );
}
type MasterProps = {
  additionalClassNames?: string;
};

function Master({ children, additionalClassNames = "" }: React.PropsWithChildren<MasterProps>) {
  return (
    <div className={clsx("-translate-y-1/2 absolute rounded-[20px] top-1/2", additionalClassNames)}>
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] h-full items-center relative">{children}</div>
      </div>
    </div>
  );
}

function BubbleMobileLightMobileTabletHeaderLeftLabel({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute inset-[0_calc(66.67%+64px)_0_0]">
      <div className="absolute bg-white inset-0" data-name="Base" />
      <Master additionalClassNames="h-[30px] left-[8px]">{children}</Master>
    </div>
  );
}
type BubbleMobileLightTextProps = {
  text: string;
  additionalClassNames?: string;
};

function BubbleMobileLightText({ text, additionalClassNames = "" }: BubbleMobileLightTextProps) {
  return (
    <div className={clsx("absolute h-[48px] right-0 w-[96px]", additionalClassNames)}>
      <div className="absolute capitalize flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#78909c] text-[12px] text-right tracking-[0.4px]">
        <p className="leading-[16px]">{text}</p>
      </div>
    </div>
  );
}
type BubbleMobileLightLineRegularProps = {
  additionalClassNames?: string;
};

function BubbleMobileLightLineRegular({ additionalClassNames = "" }: BubbleMobileLightLineRegularProps) {
  return (
    <div className={clsx("absolute h-0 left-0 opacity-12 right-0", additionalClassNames)}>
      <div className="absolute inset-[-1px_0_0_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 328 1">
          <line id="Line" stroke="var(--stroke-0, #263238)" x2="328" y1="0.5" y2="0.5" />
        </svg>
      </div>
    </div>
  );
}
type IconsUserpicVectorProps = {
  additionalClassNames?: string;
};

function IconsUserpicVector({ additionalClassNames = "" }: IconsUserpicVectorProps) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <div className="absolute inset-[-58.33%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.71429 3.71429">
          <path d={svgPaths.pba2da80} id="Vector" stroke="var(--stroke-0, #94A3B3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}
type BubblesBubbleGrayProps = {
  additionalClassNames?: string;
};

function BubblesBubbleGray({ additionalClassNames = "" }: BubblesBubbleGrayProps) {
  return (
    <div className={clsx("-translate-x-1/2 -translate-y-1/2 absolute", additionalClassNames)}>
      <div className="absolute inset-0 opacity-16 rounded-[8px]" data-name="🎨 Colors Dark">
        <div className="absolute bg-[#263238] inset-0 rounded-[99px]" data-name="BG dark" />
      </div>
    </div>
  );
}
type BubblesBubblePurpleProps = {
  additionalClassNames?: string;
};

function BubblesBubblePurple({ additionalClassNames = "" }: BubblesBubblePurpleProps) {
  return (
    <div className={clsx("-translate-x-1/2 -translate-y-1/2 absolute", additionalClassNames)}>
      <div className="absolute inset-0 opacity-56" data-name="🎨 Colors Primary">
        <div className="absolute bg-[#1dd1a1] inset-0 rounded-[99px]" data-name="BG primary" />
      </div>
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
type ColorInfo16SpBodyTextProps = {
  text: string;
  additionalClassNames?: string;
};

function ColorInfo16SpBodyText({ text, additionalClassNames = "" }: ColorInfo16SpBodyTextProps) {
  return (
    <div className={clsx("absolute bottom-0 h-[24px] opacity-80 w-[72px]", additionalClassNames)}>
      <div className="absolute flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#263238] text-[16px] tracking-[0.44px]">
        <p className="leading-[24px]">{text}</p>
      </div>
    </div>
  );
}

export default function BubbleMobileLight() {
  return (
    <div className="overflow-clip relative rounded-[8px] shadow-[0px_16px_32px_0px_rgba(176,190,197,0.24),0px_4px_8px_0px_rgba(176,190,197,0.48)] size-full" data-name="Bubble Mobile Light">
      <div className="absolute inset-0 shadow-[0px_16px_32px_0px_rgba(176,190,197,0.24),0px_4px_8px_0px_rgba(176,190,197,0.48)]" data-name="Background Card">
        <div className="absolute bg-white inset-0 rounded-[8px]" data-name="BG light" />
      </div>
      <div className="absolute bg-white inset-[56px_16px_110px_16px] overflow-clip" data-name="Right · 56dp">
        <BubbleMobileLightLineRegular additionalClassNames="top-[56px]" />
        <BubbleMobileLightLineRegular additionalClassNames="top-[112px]" />
        <BubbleMobileLightLineRegular additionalClassNames="top-[168px]" />
        <BubbleMobileLightLineRegular additionalClassNames="top-[224px]" />
        <BubbleMobileLightLineRegular additionalClassNames="top-[280px]" />
        <BubbleMobileLightLineRegular additionalClassNames="top-[336px]" />
        <BubbleMobileLightLineRegular additionalClassNames="top-[504px]" />
        <BubbleMobileLightLineRegular additionalClassNames="top-[560px]" />
        <BubbleMobileLightLineRegular additionalClassNames="top-[616px]" />
        <BubbleMobileLightLineRegular additionalClassNames="top-[672px]" />
        <BubbleMobileLightLineRegular additionalClassNames="top-[728px]" />
        <BubbleMobileLightLineRegular additionalClassNames="top-[392px]" />
        <BubbleMobileLightLineRegular additionalClassNames="top-[448px]" />
        <BubbleMobileLightLineRegular additionalClassNames="top-[840px]" />
        <BubbleMobileLightLineRegular additionalClassNames="top-[896px]" />
        <BubbleMobileLightLineRegular additionalClassNames="top-[952px]" />
        <BubbleMobileLightLineRegular additionalClassNames="top-[1008px]" />
        <BubbleMobileLightLineRegular additionalClassNames="top-[1064px]" />
        <BubbleMobileLightLineRegular additionalClassNames="top-[784px]" />
        <BubbleMobileLightText text="10 k" additionalClassNames="top-[4px]" />
        <BubbleMobileLightText text="5 k" additionalClassNames="top-[60px]" />
        <BubbleMobileLightText text="1 k" additionalClassNames="top-[116px]" />
        <BubbleMobileLightText text="500" additionalClassNames="top-[172px]" />
        <BubbleMobileLightText text="250" additionalClassNames="top-[228px]" />
        <BubbleMobileLightText text="125" additionalClassNames="top-[284px]" />
        <BubbleMobileLightText text="75" additionalClassNames="top-[340px]" />
        <BubbleMobileLightText text="0" additionalClassNames="top-[676px]" />
        <BubbleMobileLightText text="50" additionalClassNames="top-[396px]" />
        <BubbleMobileLightText text="25" additionalClassNames="top-[452px]" />
        <BubbleMobileLightText text="15" additionalClassNames="top-[508px]" />
        <BubbleMobileLightText text="10" additionalClassNames="top-[564px]" />
        <BubbleMobileLightText text="5" additionalClassNames="top-[620px]" />
        <BubbleMobileLightText text="0" additionalClassNames="top-[956px]" />
        <BubbleMobileLightText text="0" additionalClassNames="top-[1012px]" />
        <BubbleMobileLightText text="25" additionalClassNames="top-[732px]" />
        <BubbleMobileLightText text="15" additionalClassNames="top-[788px]" />
        <BubbleMobileLightText text="10" additionalClassNames="top-[844px]" />
        <BubbleMobileLightText text="5" additionalClassNames="top-[900px]" />
      </div>
      <div className="absolute bottom-[84px] h-[24px] left-[16px] overflow-clip w-[328px]" data-name="Color Info">
        <ColorInfo16SpBodyText text="2021" additionalClassNames="left-[32px]" />
        <ColorInfo16SpBodyText text="2020" additionalClassNames="left-[144px]" />
        <ColorInfo16SpBodyText text="2019" additionalClassNames="left-[256px]" />
        <div className="absolute bottom-0 left-0 opacity-40 size-[24px]" data-name="Bar Blue">
          <div className="absolute inset-0 opacity-80 rounded-[8px]" data-name="🎨 Colors Dark">
            <div className="absolute bg-[#263238] inset-0 rounded-[99px]" data-name="BG dark" />
          </div>
        </div>
        <div className="absolute bottom-0 left-[112px] size-[24px]" data-name="Bar Blue">
          <div className="absolute inset-0 opacity-40" data-name="🎨 Colors Primary">
            <div className="absolute bg-[#855cf8] inset-0 rounded-[99px]" data-name="BG primary" />
          </div>
        </div>
        <div className="absolute bottom-0 left-[224px] size-[24px]" data-name="Bar Dark">
          <div className="absolute bg-[#ff6b6b] inset-0 rounded-[99px]" data-name="BG accent" />
        </div>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute contents left-[calc(37.5%+37px)] top-[calc(50%-15px)]" data-name="Bubbles">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(12.5%+39px)] size-[104px] top-[calc(50%+136px)]" data-name="Bubble Purple">
          <div className="absolute inset-0 opacity-56" data-name="🎨 Colors Primary">
            <div className="absolute bg-[#1dd1a1] inset-0 rounded-[99px]" data-name="BG primary" />
          </div>
          <CaptionText text="Danielle Bechtelar" />
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(12.5%+7px)] size-[48px] top-[calc(50%+156px)]" data-name="Bubble Purple">
          <div className="absolute inset-0 opacity-56" data-name="🎨 Colors Primary">
            <div className="absolute bg-[#1dd1a1] inset-0 rounded-[99px]" data-name="BG primary" />
          </div>
          <CaptionText text="H. Si..." />
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%-1px)] mix-blend-multiply size-[64px] top-[calc(50%+91px)]" data-name="Bubble Purple">
          <div className="absolute inset-0 opacity-56" data-name="🎨 Colors Primary">
            <div className="absolute bg-[#1dd1a1] inset-0 rounded-[99px]" data-name="BG primary" />
          </div>
          <CaptionText text="Jeanne Upton" />
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(62.5%+12px)] size-[70px] top-[calc(50%-84px)]" data-name="Bubble Purple">
          <div className="absolute inset-0 opacity-56" data-name="🎨 Colors Primary">
            <div className="absolute bg-[#1dd1a1] inset-0 rounded-[99px]" data-name="BG primary" />
          </div>
          <CaptionText text="Genoveva Leannon" />
        </div>
        <BubblesBubblePurple additionalClassNames="left-[calc(62.5%-29.5px)] size-[35px] top-[calc(50%-200.5px)]" />
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(37.5%+12px)] size-[78px] top-[calc(50%+135px)]" data-name="Bubble Purple">
          <div className="absolute inset-0 opacity-56" data-name="🎨 Colors Primary">
            <div className="absolute bg-[#1dd1a1] inset-0 rounded-[99px]" data-name="BG primary" />
          </div>
          <CaptionText text="Mae Hayes" />
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-3/4 size-[100px] top-[calc(50%+124px)]" data-name="Bubble Gray">
          <div className="absolute inset-0 opacity-16 rounded-[8px]" data-name="🎨 Colors Dark">
            <div className="absolute bg-[#263238] inset-0 rounded-[99px]" data-name="BG dark" />
          </div>
          <CaptionText text="Adam Zulauf" />
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(12.5%+28.5px)] size-[77px] top-[calc(50%+19.5px)]" data-name="Bubble Gray">
          <div className="absolute inset-0 opacity-16 rounded-[8px]" data-name="🎨 Colors Dark">
            <div className="absolute bg-[#263238] inset-0 rounded-[99px]" data-name="BG dark" />
          </div>
          <CaptionText text="Gerard Parisian" />
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(62.5%+32px)] size-[74px] top-[calc(50%+35px)]" data-name="Bubble Gray">
          <div className="absolute inset-0 opacity-16 rounded-[8px]" data-name="🎨 Colors Dark">
            <div className="absolute bg-[#263238] inset-0 rounded-[99px]" data-name="BG dark" />
          </div>
          <CaptionText text="Gage Ullrich" />
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(12.5%+5px)] mix-blend-multiply size-[52px] top-[calc(50%+84px)]" data-name="Bubble Gray">
          <div className="absolute inset-0 opacity-16 rounded-[8px]" data-name="🎨 Colors Dark">
            <div className="absolute bg-[#263238] inset-0 rounded-[99px]" data-name="BG dark" />
          </div>
          <CaptionText text="Javon Borer" />
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(12.5%+21px)] size-[52px] top-[calc(50%-126px)]" data-name="Bubble Gray">
          <div className="absolute inset-0 opacity-16 rounded-[8px]" data-name="🎨 Colors Dark">
            <div className="absolute bg-[#263238] inset-0 rounded-[99px]" data-name="BG dark" />
          </div>
          <CaptionText text="Keven Feil" />
        </div>
        <BubblesBubbleGray additionalClassNames="left-[calc(12.5%+13px)] size-[20px] top-[calc(50%-87px)]" />
        <BubblesBubbleGray additionalClassNames="left-[calc(12.5%+4.5px)] size-[27px] top-[calc(50%-156.5px)]" />
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(62.5%-14.5px)] size-[73px] top-[calc(50%+126.5px)]" data-name="Bubble Gray">
          <div className="absolute inset-0 opacity-16 rounded-[8px]" data-name="🎨 Colors Dark">
            <div className="absolute bg-[#263238] inset-0 rounded-[99px]" data-name="BG dark" />
          </div>
          <CaptionText text="Orin Friesen" />
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(62.5%-15px)] size-[124px] top-[calc(50%+40px)]" data-name="Bubble Accent">
          <div className="absolute inset-0 opacity-24" data-name="🎨 Colors Accent">
            <div className="absolute bg-[#ff6b6b] inset-0 rounded-[99px]" data-name="BG accent" />
          </div>
          <CaptionText text="Bethany Kertzmann" />
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%-1.5px)] size-[57px] top-[calc(50%+156.5px)]" data-name="Bubble Accent">
          <div className="absolute inset-0 opacity-24" data-name="🎨 Colors Accent">
            <div className="absolute bg-[#ff6b6b] inset-0 rounded-[99px]" data-name="BG accent" />
          </div>
          <CaptionText text="Viola Bauch" />
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(62.5%+9.5px)] size-[37px] top-[calc(50%+154.5px)]" data-name="Bubble Accent">
          <div className="absolute inset-0 opacity-24" data-name="🎨 Colors Accent">
            <div className="absolute bg-[#ff6b6b] inset-0 rounded-[99px]" data-name="BG accent" />
          </div>
          <CaptionText text="P. R." />
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(62.5%-22.5px)] size-[37px] top-[calc(50%-53.5px)]" data-name="Bubble Accent">
          <div className="absolute inset-0 opacity-24" data-name="🎨 Colors Accent">
            <div className="absolute bg-[#ff6b6b] inset-0 rounded-[99px]" data-name="BG accent" />
          </div>
          <CaptionText text="J. Gr..." />
        </div>
        <BubblesBubblePurple additionalClassNames="left-[calc(87.5%-20.5px)] size-[31px] top-[calc(50%+166.5px)]" />
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(25%+3.5px)] shadow-[0px_4px_8px_0px_rgba(84,110,122,0.24)] size-[53px] top-[calc(50%+59.5px)]" data-name="Bubble Purple">
          <div className="absolute bg-[#855cf8] inset-0 rounded-[99px]" data-name="BG primary" />
          <div className="absolute inset-[5.13%] overflow-clip" data-name="Caption">
            <div className="absolute capitalize flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[12px] text-center text-white tracking-[0.4px]">
              <p className="leading-[16px]">On hover!</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 h-[48px] left-0 right-0" data-name="Header / Mobile & Tablet">
        <div className="absolute bg-[#263238] inset-0" data-name="Base" />
        <div className="absolute inset-[0_calc(33.33%-64px)]" data-name="Mobile & Tablet / Header / Center / Label">
          <div className="absolute bg-white inset-0" data-name="Base" />
          <Master additionalClassNames="-translate-x-1/2 h-[40px] left-[calc(50%-6px)]">
            <div className="relative shrink-0 size-[24px]" data-name="Left Icon">
              <BubbleMobileLightIcon additionalClassNames="inset-[13.72%_30.39%_13.72%_27.44%]">
                <path clipRule="evenodd" d={svgPaths.p25748980} fill="var(--fill-0, #607080)" fillRule="evenodd" id="icon" />
              </BubbleMobileLightIcon>
            </div>
            <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#2e86de] text-[16px] tracking-[0.44px] whitespace-nowrap">Yearly Bubbles</p>
            <div className="relative shrink-0 size-[24px]" data-name="Right Icon">
              <BubbleMobileLightIcon additionalClassNames="inset-[13.72%_27.44%_13.72%_30.39%]">
                <path clipRule="evenodd" d={svgPaths.p1458aa00} fill="var(--fill-0, #607080)" fillRule="evenodd" id="icon" />
              </BubbleMobileLightIcon>
            </div>
          </Master>
        </div>
        <div className="absolute inset-[0_0_0_calc(66.67%+64px)]" data-name="Mobile & Tablet / Header / Right / Label">
          <div className="absolute bg-white inset-0" data-name="Base" />
          <Master additionalClassNames="h-[30px] right-[-25px]">
            <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#263238] text-[16px] text-right tracking-[0.44px] whitespace-nowrap">Details</p>
          </Master>
        </div>
        <BubbleMobileLightMobileTabletHeaderLeftLabel>
          <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#263238] text-[16px] tracking-[0.44px] whitespace-nowrap">Back</p>
        </BubbleMobileLightMobileTabletHeaderLeftLabel>
        <div className="absolute contents left-0 right-full top-0" data-name="Dividers">
          <div className="absolute bg-[#cfd8dc] h-px left-0 right-0 top-0" data-name="Divider Top" />
        </div>
      </div>
      <div className="absolute h-[48px] left-0 right-0 top-0" data-name="Header / Mobile & Tablet">
        <div className="absolute bg-[#263238] inset-0" data-name="Base" />
        <div className="absolute inset-[0_calc(33.33%-64px)]" data-name="Mobile & Tablet / Header / Center / Empty">
          <div className="absolute bg-white inset-0" data-name="Base" />
        </div>
        <div className="absolute inset-[0_0_0_calc(66.67%+64px)]" data-name="Mobile & Tablet / Header / Right / Icons & Userpic">
          <div className="absolute bg-white inset-0" data-name="Base" />
          <div className="-translate-y-1/2 absolute content-stretch flex gap-[16px] items-center overflow-clip right-[8px] top-1/2" data-name="Icons & Userpic">
            <div className="overflow-clip relative shrink-0 size-[24px]" data-name="more-horizontal">
              <IconsUserpicVector additionalClassNames="inset-[46.43%]" />
              <IconsUserpicVector additionalClassNames="inset-[46.43%_21.43%_46.43%_71.43%]" />
              <IconsUserpicVector additionalClassNames="inset-[46.43%_71.43%_46.43%_21.43%]" />
            </div>
          </div>
        </div>
        <BubbleMobileLightMobileTabletHeaderLeftLabel>
          <p className="font-['IBM_Plex_Sans:Medium',sans-serif] leading-[1.28] not-italic relative shrink-0 text-[#263238] text-[20px] tracking-[0.15px] whitespace-nowrap">Top reposters</p>
        </BubbleMobileLightMobileTabletHeaderLeftLabel>
        <div className="absolute contents left-0 right-full top-0" data-name="Dividers">
          <div className="absolute bg-[#cfd8dc] bottom-0 h-px left-0 right-0" data-name="Divider Bottom" />
        </div>
      </div>
    </div>
  );
}