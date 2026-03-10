import clsx from "clsx";
import svgPaths from "./svg-ta863ympgb";
import { imgMiscIconsColorizer } from "./svg-yign5";

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute h-[24px] left-0">
      <div className="absolute bg-[#855cf8] inset-0" data-name="BG primary" />
      <div className="-translate-y-1/2 absolute h-[16px] left-[8px] right-[8px] top-1/2" data-name="12 sp • Caption">
        {children}
      </div>
    </div>
  );
}
type Histo3HorizontalLightTextProps = {
  text: string;
  additionalClassNames?: string;
};

function Histo3HorizontalLightText({ text, additionalClassNames = "" }: Histo3HorizontalLightTextProps) {
  return (
    <div className={clsx("absolute h-[24px] left-0", additionalClassNames)}>
      <div className="absolute inset-0 opacity-16 rounded-[8px]" data-name="🎨 Colors Dark">
        <div className="absolute bg-[#263238] inset-0" data-name="BG dark" />
      </div>
      <div className="-translate-y-1/2 absolute h-[16px] left-[8px] right-[8px] top-1/2" data-name="12 sp • Caption">
        <div className="absolute capitalize flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#263238] text-[12px] tracking-[0.4px]">
          <p className="leading-[16px]">{text}</p>
        </div>
      </div>
    </div>
  );
}
type Histo3HorizontalDarkTextProps = {
  text: string;
  additionalClassNames?: string;
};

function Histo3HorizontalDarkText({ text, additionalClassNames = "" }: Histo3HorizontalDarkTextProps) {
  return (
    <Wrapper additionalClassNames={additionalClassNames}>
      <div className="absolute capitalize flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[12px] text-white tracking-[0.4px]">
        <p className="leading-[16px]">{text}</p>
      </div>
    </Wrapper>
  );
}
type Helper12SpCaptionTextProps = {
  text: string;
};

function Helper12SpCaptionText({ text }: Helper12SpCaptionTextProps) {
  return (
    <div className="-translate-y-1/2 absolute h-[16px] left-[8px] right-[8px] top-1/2">
      <div className="absolute capitalize flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#263238] text-[12px] text-right tracking-[0.4px]">
        <p className="leading-[16px]">{text}</p>
      </div>
    </div>
  );
}
type Histo2HorizontalLightTextProps = {
  text: string;
  additionalClassNames?: string;
};

function Histo2HorizontalLightText({ text, additionalClassNames = "" }: Histo2HorizontalLightTextProps) {
  return (
    <div className={clsx("absolute h-[24px] left-0", additionalClassNames)}>
      <div className="absolute inset-0 opacity-16 rounded-[8px]" data-name="🎨 Colors Dark">
        <div className="absolute bg-[#263238] inset-0" data-name="BG dark" />
      </div>
      <Helper12SpCaptionText text={text} />
    </div>
  );
}
type Histo2HorizontalDarkTextProps = {
  text: string;
  additionalClassNames?: string;
};

function Histo2HorizontalDarkText({ text, additionalClassNames = "" }: Histo2HorizontalDarkTextProps) {
  return (
    <Wrapper additionalClassNames={additionalClassNames}>
      <div className="absolute capitalize flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[12px] text-right text-white tracking-[0.4px]">
        <p className="leading-[16px]">{text}</p>
      </div>
    </Wrapper>
  );
}
type Histo112SpCaptionTextProps = {
  text: string;
};

function Histo112SpCaptionText({ text }: Histo112SpCaptionTextProps) {
  return (
    <div className="absolute inset-[4px_0]">
      <div className="absolute capitalize flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-end leading-[0] not-italic text-[#263238] text-[12px] text-center tracking-[0.4px]">
        <p className="leading-[16px]">{text}</p>
      </div>
    </div>
  );
}

function Dropdown() {
  return (
    <div className="-translate-y-1/2 absolute right-[8px] size-[24px] top-1/2">
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
  );
}
type TextProps = {
  text: string;
};

function Text({ text }: TextProps) {
  return (
    <div className="absolute h-[24px] left-0 top-[4px] w-[248px]">
      <div className="absolute flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#263238] text-[16px] tracking-[0.44px]">
        <p className="leading-[24px]">{text}</p>
      </div>
    </div>
  );
}
type Helper16SpBodyTextProps = {
  text: string;
};

function Helper16SpBodyText({ text }: Helper16SpBodyTextProps) {
  return (
    <div className="absolute inset-[6px_8px]">
      <div className="absolute flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#263238] text-[16px] tracking-[0.44px]">
        <p className="leading-[24px]">{text}</p>
      </div>
    </div>
  );
}
type DropdownTextProps = {
  text: string;
};

function DropdownText({ text }: DropdownTextProps) {
  return (
    <div className="absolute h-[32px] left-0 top-[220px] w-[112px]">
      <div className="absolute inset-0 opacity-32" data-name="Stroke Dark">
        <div className="absolute border border-[#263238] border-solid inset-0 rounded-[3px]" data-name="BG outline" />
      </div>
      <Helper16SpBodyText text={text} />
      <Dropdown />
    </div>
  );
}
type Helper24SpH5HeadlineTextProps = {
  text: string;
};

function Helper24SpH5HeadlineText({ text }: Helper24SpH5HeadlineTextProps) {
  return (
    <div className="absolute h-[29px] left-0 right-0 top-0">
      <p className="absolute font-['IBM_Plex_Sans:Bold',sans-serif] inset-0 leading-[normal] not-italic text-[#263238] text-[24px]">{text}</p>
    </div>
  );
}
type HistoVerticalLightProps = {
  additionalClassNames?: string;
};

function HistoVerticalLight({ additionalClassNames = "" }: HistoVerticalLightProps) {
  return (
    <div className={clsx("absolute h-[4px] top-[200px]", additionalClassNames)}>
      <div className="absolute inset-0 opacity-16 rounded-[8px]" data-name="🎨 Colors Dark">
        <div className="absolute bg-[#263238] inset-0" data-name="BG dark" />
      </div>
    </div>
  );
}
type Histo12SpCaptionTextProps = {
  text: string;
};

function Histo12SpCaptionText({ text }: Histo12SpCaptionTextProps) {
  return (
    <div className="absolute inset-[4px_0]">
      <p className="absolute capitalize font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 leading-[16px] not-italic text-[#263238] text-[12px] text-center tracking-[0.4px]">{text}</p>
    </div>
  );
}

export default function CaptionBarsLight() {
  return (
    <div className="overflow-clip relative rounded-[8px] shadow-[0px_16px_32px_0px_rgba(176,190,197,0.24),0px_4px_8px_0px_rgba(176,190,197,0.48)] size-full" data-name="Caption Bars Light">
      <div className="absolute inset-[0_-0.15px_0_0] shadow-[0px_16px_32px_0px_rgba(176,190,197,0.24),0px_4px_8px_0px_rgba(176,190,197,0.48)]" data-name="Background Card">
        <div className="absolute bg-white inset-0 rounded-[8px]" data-name="BG light" />
      </div>
      <div className="absolute h-[252px] left-[2.86%] overflow-clip right-[35.24%] top-[88px]" data-name="Left">
        <Helper24SpH5HeadlineText text="Throughput today" />
        <DropdownText text="Hourly" />
        <div className="absolute h-[56px] left-0 right-0 top-[37px]" data-name="48 sp • H3 Headline">
          <p className="absolute font-['IBM_Plex_Sans:Bold',sans-serif] inset-0 leading-[0] not-italic text-[#263238] text-[0px] tracking-[-0.6px]">
            <span className="leading-[normal] text-[48px]">{`512 `}</span>
            <span className="leading-[normal] text-[34px] tracking-[-0.34px]">🔩</span>
          </p>
        </div>
        <div className="absolute contents left-0 right-0 top-[109px]" data-name="Histo">
          <div className="absolute h-[48px] left-0 right-[94.03%] top-[156px]" data-name="Vertical Light">
            <div className="absolute inset-0 opacity-16 rounded-[8px]" data-name="🎨 Colors Dark">
              <div className="absolute bg-[#263238] inset-0" data-name="BG dark" />
            </div>
            <Histo12SpCaptionText text="32" />
          </div>
          <div className="absolute h-[95px] left-[6.72%] right-[87.31%] top-[109px]" data-name="Vertical Light">
            <div className="absolute inset-0 opacity-16 rounded-[8px]" data-name="🎨 Colors Dark">
              <div className="absolute bg-[#263238] inset-0" data-name="BG dark" />
            </div>
            <Histo12SpCaptionText text="256" />
          </div>
          <div className="absolute h-[73px] left-[13.43%] right-[80.6%] top-[131px]" data-name="Vertical Light">
            <div className="absolute inset-0 opacity-16 rounded-[8px]" data-name="🎨 Colors Dark">
              <div className="absolute bg-[#263238] inset-0" data-name="BG dark" />
            </div>
            <Histo12SpCaptionText text="144" />
          </div>
          <div className="absolute h-[32px] left-[20.15%] right-[73.88%] top-[172px]" data-name="Vertical Light">
            <div className="absolute inset-0 rounded-[8px]" data-name="🎨 Colors Dark">
              <div className="absolute bg-[#ff6b6b] inset-0" data-name="BG dark" />
            </div>
            <Histo12SpCaptionText text="24" />
          </div>
          <div className="absolute h-[87px] left-[26.87%] right-[67.16%] top-[117px]" data-name="Vertical Light">
            <div className="absolute inset-0 opacity-16 rounded-[8px]" data-name="🎨 Colors Dark">
              <div className="absolute bg-[#263238] inset-0" data-name="BG dark" />
            </div>
            <Histo12SpCaptionText text="168" />
          </div>
          <div className="absolute h-[92px] left-[33.58%] right-[60.45%] top-[112px]" data-name="Vertical Light">
            <div className="absolute inset-0 opacity-16 rounded-[8px]" data-name="🎨 Colors Dark">
              <div className="absolute bg-[#263238] inset-0" data-name="BG dark" />
            </div>
            <Histo12SpCaptionText text="248" />
          </div>
          <div className="absolute h-[61px] left-[40.3%] right-[53.73%] top-[143px]" data-name="Vertical Light">
            <div className="absolute inset-0 opacity-16 rounded-[8px]" data-name="🎨 Colors Dark">
              <div className="absolute bg-[#263238] inset-0" data-name="BG dark" />
            </div>
            <Histo12SpCaptionText text="96" />
          </div>
          <div className="absolute h-[45px] left-[47.01%] right-[47.01%] top-[159px]" data-name="Vertical Light">
            <div className="absolute inset-0 opacity-16 rounded-[8px]" data-name="🎨 Colors Dark">
              <div className="absolute bg-[#263238] inset-0" data-name="BG dark" />
            </div>
            <Histo12SpCaptionText text="80" />
          </div>
          <div className="absolute h-[76px] left-[53.73%] right-[40.3%] top-[128px]" data-name="Vertical Light">
            <div className="absolute inset-0 opacity-16 rounded-[8px]" data-name="🎨 Colors Dark">
              <div className="absolute bg-[#263238] inset-0" data-name="BG dark" />
            </div>
            <Histo12SpCaptionText text="144" />
          </div>
          <div className="absolute h-[84px] left-[60.45%] right-[33.58%] top-[120px]" data-name="Vertical Light">
            <div className="absolute inset-0 opacity-16 rounded-[8px]" data-name="🎨 Colors Dark">
              <div className="absolute bg-[#263238] inset-0" data-name="BG dark" />
            </div>
            <Histo12SpCaptionText text="168" />
          </div>
          <div className="absolute h-[54px] left-[67.16%] right-[26.87%] top-[150px]" data-name="Vertical Dark">
            <div className="absolute bg-[#855cf8] inset-0 shadow-[0px_4px_8px_0px_rgba(124,77,255,0.16)]" data-name="BG primary" />
            <div className="absolute inset-[4px_0_5px_0]" data-name="12 sp • Caption">
              <p className="absolute capitalize font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 leading-[16px] not-italic text-[12px] text-center text-white tracking-[0.4px]">40</p>
            </div>
          </div>
          <HistoVerticalLight additionalClassNames="left-[73.88%] right-[20.15%]" />
          <HistoVerticalLight additionalClassNames="left-[80.6%] right-[13.43%]" />
          <HistoVerticalLight additionalClassNames="left-[87.31%] right-[6.72%]" />
          <HistoVerticalLight additionalClassNames="left-[94.03%] right-0" />
        </div>
      </div>
      <div className="absolute h-[252px] left-[67.62%] overflow-clip right-[2.86%] top-[88px]" data-name="Right">
        <Helper24SpH5HeadlineText text="Delays in hours" />
        <DropdownText text="Weekly" />
        <div className="absolute h-[56px] left-0 right-0 top-[37px]" data-name="48 sp • H3 Headline">
          <p className="absolute font-['IBM_Plex_Sans:Bold',sans-serif] inset-0 leading-[0] not-italic text-[#ff5722] text-[0px] tracking-[-0.6px]">
            <span className="leading-[normal] text-[48px]">{`56 `}</span>
            <span className="leading-[normal] text-[34px] tracking-[-0.34px]">⌛</span>
          </p>
        </div>
        <div className="absolute contents left-0 right-0 top-[93px]" data-name="Histo">
          <div className="absolute h-[32px] left-0 right-[87.1%] top-[172px]" data-name="Vertical Light">
            <div className="absolute inset-0 opacity-16 rounded-[8px]" data-name="🎨 Colors Dark">
              <div className="absolute bg-[#263238] inset-0" data-name="BG dark" />
            </div>
            <Histo112SpCaptionText text="5" />
          </div>
          <div className="absolute h-[42px] left-[14.52%] right-[72.58%] top-[162px]" data-name="Vertical Light">
            <div className="absolute inset-0 opacity-16 rounded-[8px]" data-name="🎨 Colors Dark">
              <div className="absolute bg-[#263238] inset-0" data-name="BG dark" />
            </div>
            <Histo112SpCaptionText text="8" />
          </div>
          <div className="absolute h-[27px] left-[29.03%] right-[58.06%] top-[177px]" data-name="Vertical Light">
            <div className="absolute inset-0 opacity-16 rounded-[8px]" data-name="🎨 Colors Dark">
              <div className="absolute bg-[#263238] inset-0" data-name="BG dark" />
            </div>
            <Histo112SpCaptionText text="3" />
          </div>
          <div className="absolute h-[111px] left-[43.55%] right-[43.55%] shadow-[0px_4px_8px_0px_rgba(84,110,122,0.24)] top-[93px]" data-name="Vertical Dark">
            <div className="absolute bg-[#263238] inset-0 rounded-[2px]" data-name="BG accent" />
            <div className="absolute inset-[4px_0_5px_0]" data-name="12 sp • Caption">
              <div className="absolute capitalize flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-end leading-[0] not-italic text-[12px] text-center text-white tracking-[0.4px]">
                <p className="leading-[16px]">24</p>
              </div>
            </div>
          </div>
          <div className="absolute h-[61px] left-[58.06%] right-[29.03%] top-[143px]" data-name="Vertical Light">
            <div className="absolute inset-0 opacity-16 rounded-[8px]" data-name="🎨 Colors Dark">
              <div className="absolute bg-[#263238] inset-0" data-name="BG dark" />
            </div>
            <Histo112SpCaptionText text="11" />
          </div>
          <div className="absolute h-[47px] left-[72.58%] right-[14.52%] top-[157px]" data-name="Vertical Light">
            <div className="absolute inset-0 opacity-16 rounded-[8px]" data-name="🎨 Colors Dark">
              <div className="absolute bg-[#263238] inset-0" data-name="BG dark" />
            </div>
            <Histo112SpCaptionText text="9" />
          </div>
          <div className="absolute h-[69px] left-[87.1%] right-0 top-[135px]" data-name="Vertical Light">
            <div className="absolute inset-0 opacity-16 rounded-[8px]" data-name="🎨 Colors Dark">
              <div className="absolute bg-[#263238] inset-0" data-name="BG dark" />
            </div>
            <Histo112SpCaptionText text="14" />
          </div>
        </div>
        <div className="absolute overflow-clip right-0 size-[32px] top-0" data-name="Settings • ⚙/more_vert">
          <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[18px_12px] mask-size-[4px_16px]" data-name="Misc …/Icons Colorizer" style={{ maskImage: `url('${imgMiscIconsColorizer}')` }}>
            <div className="absolute bg-[#94a3b3] inset-0" data-name="Icons Colorizer" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-[26px] h-[236px] left-[67.62%] overflow-clip right-[2.86%]" data-name="Bottom Right">
        <div className="absolute contents left-0 right-0 top-[44px]" data-name="Histo">
          <Histo2HorizontalDarkText text="Machine 8" additionalClassNames="right-0 top-[44px]" />
          <Histo2HorizontalDarkText text="Slicer BH100" additionalClassNames="opacity-80 right-[16.54%] top-[68px]" />
          <Histo2HorizontalDarkText text="Packer5000" additionalClassNames="opacity-64 right-[24.81%] top-[92px]" />
          <Histo2HorizontalDarkText text="Machine 2" additionalClassNames="opacity-56 right-[56.39%] top-[116px]" />
          <Histo2HorizontalDarkText text="BOBST" additionalClassNames="opacity-48 right-[66.17%] top-[140px]" />
          <Histo2HorizontalDarkText text="PH8" additionalClassNames="opacity-40 right-[74.44%] top-[164px]" />
          <Histo2HorizontalLightText text="Roto..." additionalClassNames="right-[77.44%] top-[188px]" />
          <Histo2HorizontalLightText text="Ma..." additionalClassNames="opacity-64 right-[80.67%] top-[212px]" />
        </div>
        <Text text="Top produced" />
        <div className="absolute h-[24px] opacity-40 right-0 top-[4px] w-[80px]" data-name="Dropdown">
          <Helper16SpBodyText text="Desc." />
          <Dropdown />
        </div>
      </div>
      <div className="absolute bottom-[26px] h-[236px] left-[2.86%] overflow-clip right-[67.62%]" data-name="Bottom Left">
        <div className="absolute contents left-0 right-0 top-[44px]" data-name="Histo">
          <Histo3HorizontalDarkText text="Thursday" additionalClassNames="right-0 top-[212px]" />
          <Histo3HorizontalDarkText text="Monday" additionalClassNames="opacity-80 right-[6.85%] top-[188px]" />
          <Histo3HorizontalDarkText text="Wednesday" additionalClassNames="opacity-64 right-[38.71%] top-[164px]" />
          <Histo3HorizontalDarkText text="Tuesday" additionalClassNames="opacity-56 right-[56.39%] top-[140px]" />
          <Histo3HorizontalDarkText text="Friday" additionalClassNames="opacity-48 right-[59.68%] top-[116px]" />
          <Histo3HorizontalDarkText text="Monday" additionalClassNames="opacity-40 right-[68.15%] top-[92px]" />
          <Histo3HorizontalLightText text="Sunday" additionalClassNames="right-[74.6%] top-[68px]" />
          <Histo3HorizontalLightText text="Satur..." additionalClassNames="opacity-64 right-[76.61%] top-[44px]" />
        </div>
        <Text text="Produced weekly" />
        <div className="absolute h-[24px] opacity-40 right-0 top-[4px] w-[80px]" data-name="Dropdown">
          <Helper16SpBodyText text="Desc." />
          <Dropdown />
        </div>
      </div>
      <div className="absolute bottom-[26px] h-[236px] left-[35.24%] overflow-clip right-[35.24%]" data-name="Bottom Center">
        <Text text="Mixed bars" />
        <div className="absolute h-[24px] opacity-40 right-0 top-[4px] w-[88px]" data-name="Dropdown">
          <Helper16SpBodyText text="Sort by" />
          <Dropdown />
        </div>
        <div className="absolute contents left-0 top-[44px]" data-name="Histo">
          <div className="absolute h-[24px] left-0 top-[44px] w-[113.371px]" data-name="Horizontal Light">
            <div className="absolute inset-0 opacity-16 rounded-[8px]" data-name="🎨 Colors Dark">
              <div className="absolute bg-[#607d8b] inset-0" data-name="BG dark" />
            </div>
            <Helper12SpCaptionText text="48" />
          </div>
          <div className="absolute h-[24px] left-0 top-[92px] w-[196.038px]" data-name="Horizontal Light">
            <div className="absolute inset-0 opacity-16 rounded-[8px]" data-name="🎨 Colors Dark">
              <div className="absolute bg-[#607d8b] inset-0" data-name="BG dark" />
            </div>
            <Helper12SpCaptionText text="144" />
          </div>
          <div className="absolute h-[24px] left-0 opacity-72 top-[68px] w-[170.057px]" data-name="Horizontal Light">
            <div className="absolute inset-0 opacity-16 rounded-[8px]" data-name="🎨 Colors Dark">
              <div className="absolute bg-[#90a4ae] inset-0" data-name="BG dark" />
            </div>
            <Helper12SpCaptionText text="96" />
          </div>
          <div className="absolute h-[24px] left-0 opacity-72 top-[116px] w-[120.457px]" data-name="Horizontal Light">
            <div className="absolute inset-0 opacity-16 rounded-[8px]" data-name="🎨 Colors Dark">
              <div className="absolute bg-[#90a4ae] inset-0" data-name="BG dark" />
            </div>
            <Helper12SpCaptionText text="56" />
          </div>
          <div className="absolute h-[24px] left-0 top-[140px] w-[248px]" data-name="Horizontal Light">
            <div className="absolute inset-0 opacity-16 rounded-[8px]" data-name="🎨 Colors Dark">
              <div className="absolute bg-[#607d8b] inset-0" data-name="BG dark" />
            </div>
            <Helper12SpCaptionText text="256" />
          </div>
          <div className="absolute h-[24px] left-0 top-[188px] w-[203.124px]" data-name="Horizontal Light">
            <div className="absolute inset-0 opacity-16 rounded-[8px]" data-name="🎨 Colors Dark">
              <div className="absolute bg-[#607d8b] inset-0" data-name="BG dark" />
            </div>
            <Helper12SpCaptionText text="168" />
          </div>
          <div className="absolute h-[24px] left-0 opacity-72 top-[164px] w-[167px]" data-name="Horizontal Light">
            <div className="absolute inset-0 opacity-16 rounded-[8px]" data-name="🎨 Colors Dark">
              <div className="absolute bg-[#90a4ae] inset-0" data-name="BG dark" />
            </div>
            <Helper12SpCaptionText text="80" />
          </div>
          <div className="absolute h-[24px] left-0 opacity-72 top-[212px] w-[152.386px]" data-name="Horizontal Light">
            <div className="absolute inset-0 opacity-16 rounded-[8px]" data-name="🎨 Colors Dark">
              <div className="absolute bg-[#90a4ae] inset-0" data-name="BG dark" />
            </div>
            <Helper12SpCaptionText text="72" />
          </div>
        </div>
      </div>
      <div className="absolute h-[64px] left-0 right-0 top-0" data-name="Header / Desktop">
        <div className="absolute bg-[#cfd8dc] bottom-[-1px] h-px left-0 right-0" data-name="Divider" />
        <div className="absolute bottom-0 left-0 top-0 w-[360px]" data-name="Left / Logo">
          <div className="absolute bg-white inset-0" data-name="Base" />
          <div className="-translate-y-1/2 absolute content-stretch flex gap-[16px] items-center left-[24px] overflow-clip top-1/2" data-name="Logo & Title">
            <div className="overflow-clip relative shrink-0 size-[48px]" data-name="Logo">
              <div className="absolute bg-gradient-to-b from-[#ce9ffc] from-[17.857%] inset-0 rounded-[99px] to-[#7367f0] to-[108.93%]" data-name="Logo" />
              <div className="absolute flex flex-col font-['IBM_Plex_Sans:Bold',sans-serif] inset-0 justify-center leading-[0] not-italic text-[24px] text-center text-white">
                <p className="leading-[normal]">C</p>
              </div>
            </div>
            <p className="font-['IBM_Plex_Sans:Bold',sans-serif] h-[44px] leading-[normal] not-italic relative shrink-0 text-[#263238] text-[34px] tracking-[-0.34px] w-[240px]">Caption Bars</p>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 top-0 w-[360px]" data-name="Right / Pagination">
          <div className="absolute bg-white inset-0" data-name="Base" />
          <div className="-translate-y-1/2 absolute content-stretch flex gap-[16px] items-center overflow-clip right-[24px] top-1/2" data-name="Label & Pagination">
            <div className="bg-white h-[40px] relative rounded-[32px] shrink-0" data-name="Master">
              <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                <div className="content-stretch flex gap-[8px] h-full items-center px-[16px] relative">
                  <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#607080] text-[16px] tracking-[0.44px] whitespace-nowrap">Select Machine</p>
                  <div className="relative shrink-0 size-[24px]" data-name="Right Icon">
                    <div className="absolute inset-[30.39%_13.72%_27.44%_13.72%]" data-name="icon">
                      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.4142 10.1213">
                        <path clipRule="evenodd" d={svgPaths.p22263c00} fill="var(--fill-0, #607080)" fillRule="evenodd" id="icon" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div aria-hidden="true" className="absolute border-2 border-[#d3dde7] border-solid inset-0 pointer-events-none rounded-[32px]" />
            </div>
          </div>
        </div>
        <div className="absolute inset-[0_360px]" data-name="Center / Empty">
          <div className="absolute bg-white inset-0" data-name="Base" />
        </div>
      </div>
    </div>
  );
}