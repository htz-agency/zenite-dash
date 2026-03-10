import clsx from "clsx";
import svgPaths from "./svg-4fhpf0n55z";

function Wrapper3({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute flex inset-[22.15%_13.49%_28.73%_13.82%] items-center justify-center">
      <div className="-scale-y-100 flex-none h-[224px] rotate-180 w-[331.5px]">{children}</div>
    </div>
  );
}
type FillProps = {
  additionalClassNames?: string;
};

function Fill({ children, additionalClassNames = "" }: React.PropsWithChildren<FillProps>) {
  return (
    <div className={additionalClassNames}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 331.5 224">
        {children}
      </svg>
    </div>
  );
}
type Wrapper2Props = {
  additionalClassNames?: string;
};

function Wrapper2({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper2Props>) {
  return (
    <div className={additionalClassNames}>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[12px] top-1/2" data-name="Dot Body">
        {children}
      </div>
    </div>
  );
}

function Wrapper1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties} className="-translate-x-1/2 absolute bottom-[-5.31px] flex items-center justify-center left-1/2 size-[11.314px]">
      <div className="flex-none rotate-45">
        <div className="relative rounded-[8px] size-[8px]" data-name="🎨 Colors Dark">
          {children}
        </div>
      </div>
    </div>
  );
}
type StrokeProps = {
  additionalClassNames?: string;
};

function Stroke({ children, additionalClassNames = "" }: React.PropsWithChildren<StrokeProps>) {
  return (
    <div className={additionalClassNames}>
      <div className="absolute inset-[-0.48%_-0.58%_-0.79%_-0.55%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 335.232 226.834">
          {children}
        </svg>
      </div>
    </div>
  );
}
type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = "" }: React.PropsWithChildren<WrapperProps>) {
  return (
    <Wrapper2 additionalClassNames={additionalClassNames}>
      <div className="absolute inset-[16.67%]" data-name="🎨 Colors Primary">
        {children}
      </div>
    </Wrapper2>
  );
}
type Filled8Dp5Props = {
  additionalClassNames?: string;
};

function Filled8Dp5({ additionalClassNames = "" }: Filled8Dp5Props) {
  return (
    <Wrapper additionalClassNames={clsx("absolute", additionalClassNames)}>
      <BgPrimary additionalClassNames="bg-[#ff8a65]" />
    </Wrapper>
  );
}
type Filled8Dp4Props = {
  additionalClassNames?: string;
};

function Filled8Dp4({ additionalClassNames = "" }: Filled8Dp4Props) {
  return (
    <Wrapper additionalClassNames={clsx("absolute", additionalClassNames)}>
      <BgPrimary additionalClassNames="bg-[#90a4ae]" />
    </Wrapper>
  );
}
type HelperProps = {
  additionalClassNames?: string;
};

function Helper({ additionalClassNames = "" }: HelperProps) {
  return (
    <div className={clsx("absolute flex items-center justify-center", additionalClassNames)}>
      <div className="-scale-y-100 flex-none rotate-180 size-[24px]">
        <Wrapper additionalClassNames="relative size-full">
          <BgPrimary additionalClassNames="bg-[#855cf8]" />
        </Wrapper>
      </div>
    </div>
  );
}
type Filled8Dp3Props = {
  additionalClassNames?: string;
};

function Filled8Dp3({ additionalClassNames = "" }: Filled8Dp3Props) {
  return (
    <Wrapper additionalClassNames={clsx("absolute", additionalClassNames)}>
      <BgPrimary additionalClassNames="bg-[#607d8b]" />
    </Wrapper>
  );
}
type Filled8Dp2Props = {
  additionalClassNames?: string;
};

function Filled8Dp2({ additionalClassNames = "" }: Filled8Dp2Props) {
  return (
    <Wrapper additionalClassNames={clsx("absolute", additionalClassNames)}>
      <BgPrimary additionalClassNames="bg-[#e289f2]" />
    </Wrapper>
  );
}
type Filled8Dp1Props = {
  additionalClassNames?: string;
};

function Filled8Dp1({ additionalClassNames = "" }: Filled8Dp1Props) {
  return (
    <Wrapper additionalClassNames={clsx("absolute", additionalClassNames)}>
      <BgPrimary additionalClassNames="bg-[#2db6f5]" />
    </Wrapper>
  );
}
type Filled8DpProps = {
  additionalClassNames?: string;
};

function Filled8Dp({ additionalClassNames = "" }: Filled8DpProps) {
  return (
    <Wrapper additionalClassNames={clsx("absolute", additionalClassNames)}>
      <BgPrimary additionalClassNames="bg-[#f5c324]" />
    </Wrapper>
  );
}
type BgPrimaryProps = {
  additionalClassNames?: string;
};

function BgPrimary({ additionalClassNames = "" }: BgPrimaryProps) {
  return (
    <div className={clsx("absolute inset-0 rounded-[12px]", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border border-solid border-white inset-[-1px] pointer-events-none rounded-[13px]" />
    </div>
  );
}
type RadarV4Filled8DpProps = {
  additionalClassNames?: string;
};

function RadarV4Filled8Dp({ additionalClassNames = "" }: RadarV4Filled8DpProps) {
  return (
    <Wrapper additionalClassNames={clsx("absolute", additionalClassNames)}>
      <BgPrimary additionalClassNames="bg-[#39c86a]" />
    </Wrapper>
  );
}
type Square12DpProps = {
  additionalClassNames?: string;
};

function Square12Dp({ additionalClassNames = "" }: Square12DpProps) {
  return (
    <Wrapper2 additionalClassNames={clsx("absolute shadow-[0px_4px_8px_0px_rgba(124,77,255,0.16)]", additionalClassNames)}>
      <div className="absolute bg-[#607d8b] inset-0 rounded-[3px]" data-name="BG primary" />
      <div className="absolute inset-[8.33%]" data-name="🎨 Colors Light">
        <div className="absolute bg-white inset-0 rounded-[2px]" data-name="BG light" />
      </div>
    </Wrapper2>
  );
}
type NumberText1Props = {
  text: string;
  additionalClassNames?: string;
};

function NumberText1({ text, additionalClassNames = "" }: NumberText1Props) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <div className="absolute bg-white border border-[#78909c] border-solid inset-0 rounded-[2px] shadow-[0px_4px_8px_0px_rgba(84,110,122,0.24)]" data-name="Numb Badge BG" />
      <div className="absolute flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#263238] text-[10px] text-center tracking-[0.3px]">
        <p className="leading-[14px]">{text}</p>
      </div>
    </div>
  );
}
type NumberTextProps = {
  text: string;
  additionalClassNames?: string;
};

function NumberText({ text, additionalClassNames = "" }: NumberTextProps) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <div className="absolute bg-white inset-0 rounded-[2px] shadow-[0px_4px_8px_0px_rgba(84,110,122,0.24)]" data-name="Numb Badge BG" />
      <div className="absolute flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#263238] text-[10px] text-center tracking-[0.3px]">
        <p className="leading-[14px]">{text}</p>
      </div>
    </div>
  );
}

export default function Components() {
  return (
    <div className="relative size-full" data-name="Components">
      <div className="-translate-x-1/2 absolute h-[415px] left-[calc(50%-314px)] top-0 w-[434px]" data-name="Radar v1">
        <div className="absolute inset-[1.33%_1.15%]" data-name="Rays">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 424.307 404.294">
            <path d={svgPaths.pf48ae00} id="Rays" stroke="var(--stroke-0, #CFD8DC)" />
          </svg>
        </div>
        <div className="absolute contents inset-[1.2%_-1.61%_-9.16%_-1.61%]" data-name="Web">
          <div className="absolute inset-[47.47%_42.63%_37.11%_42.63%]" data-name="Radar Scale 5">
            <div className="absolute inset-[0_2.45%_9.55%_2.45%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60.8676 57.8885">
                <path d={svgPaths.p2dac0b80} id="Radar Scale" stroke="var(--stroke-0, #CFD8DC)" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-[39.76%_35.25%_29.4%_35.25%]" data-name="Radar Scale 5">
            <div className="absolute inset-[0_2.45%_9.55%_2.45%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 121.735 115.777">
                <path d={svgPaths.p1ad35000} id="Radar Scale" stroke="var(--stroke-0, #CFD8DC)" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-[32.05%_27.88%_21.69%_27.88%]" data-name="Radar Scale 5">
            <div className="absolute inset-[0_2.45%_9.55%_2.45%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 182.603 173.666">
                <path d={svgPaths.pe5d8780} id="Radar Scale" stroke="var(--stroke-0, #CFD8DC)" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-[24.34%_20.51%_13.98%_20.51%]" data-name="Radar Scale 5">
            <div className="absolute inset-[0_2.45%_9.55%_2.45%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 243.47 231.554">
                <path d={svgPaths.p301def00} id="Radar Scale" stroke="var(--stroke-0, #CFD8DC)" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-[16.63%_13.13%_6.27%_13.13%]" data-name="Radar Scale 5">
            <div className="absolute inset-[0_2.45%_9.55%_2.45%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 304.338 289.443">
                <path d={svgPaths.p1d2f3f80} id="Radar Scale" stroke="var(--stroke-0, #CFD8DC)" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-[8.92%_5.76%_-1.45%_5.76%]" data-name="Radar Scale 5">
            <div className="absolute inset-[0_2.45%_9.55%_2.45%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 365.206 347.331">
                <path d={svgPaths.p2e538d00} id="Radar Scale" stroke="var(--stroke-0, #CFD8DC)" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-[1.2%_-1.61%_-9.16%_-1.61%]" data-name="Radar Scale 5">
            <div className="absolute inset-[0_2.45%_9.55%_2.45%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 426.073 405.22">
                <path d={svgPaths.p31e19731} id="Radar Scale" stroke="var(--stroke-0, #CFD8DC)" />
              </svg>
            </div>
          </div>
        </div>
        <div className="absolute contents inset-[0_47.24%_49.88%_47.24%]" data-name="Numbers">
          <NumberText text="5" additionalClassNames="inset-[46.27%_47.24%_49.88%_47.24%]" />
          <NumberText text="10" additionalClassNames="inset-[38.55%_47.24%_57.59%_47.24%]" />
          <NumberText text="15" additionalClassNames="inset-[30.84%_47.24%_65.3%_47.24%]" />
          <NumberText text="20" additionalClassNames="inset-[23.13%_47.24%_73.01%_47.24%]" />
          <NumberText text="25" additionalClassNames="inset-[15.42%_47.24%_80.72%_47.24%]" />
          <NumberText text="30" additionalClassNames="inset-[7.71%_47.24%_88.43%_47.24%]" />
          <NumberText1 text="35" additionalClassNames="inset-[0_47.24%_96.14%_47.24%]" />
        </div>
        <div className="absolute contents left-[-6px] top-[148px]" data-name="Dots">
          <Square12Dp additionalClassNames="inset-[35.66%_-1.38%_58.55%_95.85%]" />
          <Square12Dp additionalClassNames="inset-[95.66%_16.59%_-1.45%_77.88%]" />
          <Square12Dp additionalClassNames="inset-[95.66%_77.88%_-1.45%_16.59%]" />
          <Square12Dp additionalClassNames="inset-[35.66%_95.85%_58.55%_-1.38%]" />
        </div>
        <div className="absolute contents inset-[11.57%_17.74%_1.45%_5.53%]" data-name="Data Green">
          <div className="absolute inset-[14.46%_20.39%_4.34%_8.18%]" data-name="Stroke">
            <div className="absolute inset-[-0.37%_-0.33%_-0.38%_-0.43%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 312.353 339.532">
                <path d={svgPaths.p3ce66b00} id="Stroke" stroke="var(--stroke-0, #90A4AE)" strokeWidth="2" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-[14.46%_20.39%_4.34%_8.18%]" data-name="Fill">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 310 337">
              <path d={svgPaths.pa623000} fill="var(--fill-0, #90A4AE)" id="Fill" opacity="0.24" />
            </svg>
          </div>
          <Filled8Dp4 additionalClassNames="inset-[11.57%_47.24%_82.65%_47.24%]" />
          <Filled8Dp4 additionalClassNames="inset-[38.07%_88.94%_56.14%_5.53%]" />
          <Filled8Dp4 additionalClassNames="inset-[80.24%_66.82%_13.98%_27.65%]" />
          <Filled8Dp4 additionalClassNames="inset-[92.77%_19.12%_1.45%_75.35%]" />
          <Filled8Dp4 additionalClassNames="inset-[42.17%_17.74%_52.05%_76.73%]" />
        </div>
        <div className="absolute contents inset-[32.53%_32.49%_3.61%_17.51%]" data-name="Data Red">
          <div className="absolute inset-[35.42%_35.25%_6.51%_20.28%]" data-name="Fill">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 193 241">
              <path d={svgPaths.p2e7d42f0} fill="var(--fill-0, #FF8A65)" id="Fill" opacity="0.24" />
            </svg>
          </div>
          <div className="absolute inset-[35.42%_35.25%_6.51%_20.28%]" data-name="Stroke">
            <div className="absolute inset-[-0.47%_-0.56%_-0.69%_-0.54%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 195.13 243.785">
                <path d={svgPaths.p31d93080} id="Stroke" stroke="var(--stroke-0, #FF8A65)" strokeWidth="2" />
              </svg>
            </div>
          </div>
          <Filled8Dp5 additionalClassNames="inset-[32.53%_47.24%_61.69%_47.24%]" />
          <Wrapper additionalClassNames="absolute inset-[42.17%_76.96%_52.05%_17.51%]">
            <div className="absolute bg-[#263238] inset-0 rounded-[12px]" data-name="BG primary">
              <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-2px] pointer-events-none rounded-[14px]" />
            </div>
          </Wrapper>
          <Filled8Dp5 additionalClassNames="inset-[90.6%_73.96%_3.61%_20.51%]" />
          <Filled8Dp5 additionalClassNames="inset-[68.19%_36.18%_26.02%_58.29%]" />
          <Filled8Dp5 additionalClassNames="inset-[47.23%_32.49%_46.99%_61.98%]" />
        </div>
        <div className="absolute contents font-['IBM_Plex_Sans:Regular',sans-serif] inset-[-9.16%_-17.97%_-9.4%_-19.12%] leading-[0] not-italic text-[#607d8b] text-[16px] tracking-[0.44px] whitespace-nowrap" data-name="Caption">
          <div className="absolute flex flex-col inset-[-9.16%_43.09%_103.37%_43.09%] justify-center text-center">
            <p className="leading-[24px]">Monday</p>
          </div>
          <div className="absolute flex flex-col inset-[35.42%_-17.97%_58.8%_103.46%] justify-center">
            <p className="leading-[24px]">Tuesday</p>
          </div>
          <div className="absolute flex flex-col inset-[35.42%_103.46%_58.8%_-19.12%] justify-center text-right">
            <p className="leading-[24px]">Saturday</p>
          </div>
          <div className="absolute flex flex-col inset-[103.61%_3%_-9.4%_80.65%] justify-center">
            <p className="leading-[24px]">Thursday</p>
          </div>
          <div className="absolute flex flex-col inset-[103.61%_80.41%_-9.4%_8.76%] justify-center text-right">
            <p className="leading-[24px]">Friday</p>
          </div>
        </div>
        <div className="absolute inset-[33.25%_70.97%_59.04%_11.52%]" data-name="Tooltip">
          <Wrapper1>
            <div className="absolute bg-[#ff8a65] inset-0 rounded-[1px]" data-name="BG dark" />
          </Wrapper1>
          <div className="absolute inset-0 rounded-[8px]" data-name="🎨 Colors Dark">
            <div className="absolute bg-[#ff8a65] inset-0 rounded-[3px]" data-name="BG dark" />
          </div>
          <div className="absolute inset-[18.75%_0]" data-name="12 sp • Caption">
            <div className="absolute flex flex-col font-['IBM_Plex_Sans:Bold',sans-serif] inset-0 justify-center leading-[0] not-italic text-[14px] text-center text-white tracking-[0.1px]">
              <p className="leading-[24px]">Onhover</p>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute left-[calc(50%+303px)] size-[456px] top-0" data-name="Radar v2">
        <div className="absolute inset-[1.21%_0.99%]" data-name="Rays">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 447 445">
            <path d={svgPaths.p2df15300} id="Rays" stroke="var(--stroke-0, #CFD8DC)" />
          </svg>
        </div>
        <div className="absolute contents inset-[1.1%_0.88%_0.66%_0.88%]" data-name="Web">
          <div className="absolute inset-[43.2%_42.98%_42.76%_42.98%]" data-name="Radar Scale 12">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 64 64">
              <path d={svgPaths.p38138f00} id="Radar Scale" stroke="var(--stroke-0, #CFD8DC)" />
            </svg>
          </div>
          <div className="absolute inset-[36.18%_35.96%_35.75%_35.96%]" data-name="Radar Scale 12">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 128 128">
              <path d={svgPaths.p28f34000} id="Radar Scale" stroke="var(--stroke-0, #CFD8DC)" />
            </svg>
          </div>
          <div className="absolute inset-[29.17%_28.95%_28.73%_28.95%]" data-name="Radar Scale 12">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 192 192">
              <path d={svgPaths.p37d48c00} id="Radar Scale" stroke="var(--stroke-0, #CFD8DC)" />
            </svg>
          </div>
          <div className="absolute inset-[22.15%_21.93%_21.71%_21.93%]" data-name="Radar Scale 12">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 256 256">
              <path d={svgPaths.p2b8e0b80} id="Radar Scale" stroke="var(--stroke-0, #CFD8DC)" />
            </svg>
          </div>
          <div className="absolute inset-[15.13%_14.91%_14.69%_14.91%]" data-name="Radar Scale 12">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 320 320">
              <path d={svgPaths.p29520380} id="Radar Scale" stroke="var(--stroke-0, #CFD8DC)" />
            </svg>
          </div>
          <div className="absolute inset-[8.11%_7.89%_7.68%_7.89%]" data-name="Radar Scale 12">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 384 384">
              <path d={svgPaths.p2d7e3ff2} id="Radar Scale" stroke="var(--stroke-0, #CFD8DC)" />
            </svg>
          </div>
          <div className="absolute inset-[1.1%_0.88%_0.66%_0.88%]" data-name="Radar Scale 12">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 448 448">
              <path d={svgPaths.p2a370700} id="Radar Scale" stroke="var(--stroke-0, #CFD8DC)" />
            </svg>
          </div>
        </div>
        <div className="absolute contents inset-[0_47.37%_54.39%_47.37%]" data-name="Numbers">
          <NumberText text="5" additionalClassNames="inset-[42.11%_47.37%_54.39%_47.37%]" />
          <NumberText text="10" additionalClassNames="inset-[35.09%_47.37%_61.4%_47.37%]" />
          <NumberText text="15" additionalClassNames="inset-[28.07%_47.37%_68.42%_47.37%]" />
          <NumberText text="20" additionalClassNames="inset-[21.05%_47.37%_75.44%_47.37%]" />
          <NumberText text="25" additionalClassNames="inset-[14.04%_47.37%_82.46%_47.37%]" />
          <NumberText text="30" additionalClassNames="inset-[7.02%_47.37%_89.47%_47.37%]" />
          <NumberText1 text="35" additionalClassNames="inset-[0_47.37%_96.49%_47.37%]" />
        </div>
        <div className="absolute contents left-[-6px] top-[23px]" data-name="Dots">
          <Square12Dp additionalClassNames="inset-[22.59%_4.82%_72.15%_89.91%]" />
          <Square12Dp additionalClassNames="inset-[47.59%_-1.32%_47.15%_96.05%]" />
          <Square12Dp additionalClassNames="inset-[47.59%_96.05%_47.15%_-1.32%]" />
          <Square12Dp additionalClassNames="inset-[72.59%_4.82%_22.15%_89.91%]" />
          <Square12Dp additionalClassNames="inset-[72.59%_89.91%_22.15%_4.82%]" />
          <Square12Dp additionalClassNames="inset-[22.59%_89.91%_72.15%_4.82%]" />
          <Square12Dp additionalClassNames="inset-[5.04%_22.37%_89.69%_72.37%]" />
          <Square12Dp additionalClassNames="inset-[5.04%_72.37%_89.69%_22.37%]" />
          <Square12Dp additionalClassNames="inset-[90.13%_22.37%_4.61%_72.37%]" />
          <Square12Dp additionalClassNames="inset-[90.13%_72.37%_4.61%_22.37%]" />
          <Square12Dp additionalClassNames="inset-[96.05%_47.37%_-1.32%_47.37%]" />
        </div>
        <div className="absolute contents inset-[10.53%_0.22%_9.43%_12.28%]" data-name="Data Gray">
          <div className="absolute inset-[13.16%_2.74%_12.06%_14.8%]" data-name="Fill">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 376 341">
              <path d={svgPaths.p1732080} fill="var(--fill-0, #90A4AE)" id="Fill" opacity="0.24" />
            </svg>
          </div>
          <div className="absolute inset-[13.16%_2.74%_12.06%_14.8%]" data-name="Stroke">
            <div className="absolute inset-[-0.44%_-0.3%_-0.43%_-0.5%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 379.014 343.964">
                <path d={svgPaths.p11e16940} id="Stroke" stroke="var(--stroke-0, #90A4AE)" strokeWidth="2" />
              </svg>
            </div>
          </div>
          <Filled8Dp3 additionalClassNames="inset-[36.18%_47.37%_58.55%_47.37%]" />
          <Filled8Dp3 additionalClassNames="inset-[31.36%_74.78%_63.38%_19.96%]" />
          <Filled8Dp3 additionalClassNames="inset-[47.37%_63.6%_47.37%_31.14%]" />
          <Filled8Dp3 additionalClassNames="inset-[26.1%_59.65%_68.64%_35.09%]" />
          <Filled8Dp3 additionalClassNames="inset-[10.53%_25.88%_84.21%_68.86%]" />
          <Filled8Dp3 additionalClassNames="inset-[67.98%_82.46%_26.75%_12.28%]" />
          <Filled8Dp3 additionalClassNames="inset-[73.25%_62.28%_21.49%_32.46%]" />
          <Filled8Dp3 additionalClassNames="inset-[66.45%_47.37%_28.29%_47.37%]" />
          <Filled8Dp3 additionalClassNames="inset-[85.31%_25.44%_9.43%_69.3%]" />
          <Filled8Dp3 additionalClassNames="inset-[67.76%_12.28%_26.97%_82.46%]" />
          <Filled8Dp3 additionalClassNames="inset-[47.59%_0.22%_47.15%_94.52%]" />
          <Filled8Dp3 additionalClassNames="inset-[26.54%_11.18%_68.2%_83.55%]" />
        </div>
        <div className="absolute contents inset-[19.52%_10.96%_26.1%_11.18%]" data-name="Data Accent">
          <Wrapper3>
            <Fill additionalClassNames="relative size-full">
              <path d={svgPaths.p34268f80} fill="var(--fill-0, #855CF8)" id="Fill" opacity="0.24" />
            </Fill>
          </Wrapper3>
          <Wrapper3>
            <Stroke additionalClassNames="relative size-full">
              <path d={svgPaths.p8bc5780} id="Stroke" stroke="var(--stroke-0, #855CF8)" strokeWidth="2" />
            </Stroke>
          </Wrapper3>
          <Helper additionalClassNames="inset-[19.52%_47.15%_75.22%_47.59%]" />
          <Helper additionalClassNames="inset-[26.54%_10.96%_68.2%_83.77%]" />
          <Helper additionalClassNames="inset-[55.26%_33.99%_39.47%_60.75%]" />
          <Helper additionalClassNames="inset-[55.26%_47.15%_39.47%_47.59%]" />
          <Helper additionalClassNames="inset-[68.64%_83.55%_26.1%_11.18%]" />
          <Helper additionalClassNames="inset-[35.31%_68.2%_59.43%_26.54%]" />
          <Helper additionalClassNames="inset-[28.29%_58.55%_66.45%_36.18%]" />
          <Helper additionalClassNames="inset-[22.15%_32.68%_72.59%_62.06%]" />
          <Helper additionalClassNames="inset-[47.59%_27.63%_47.15%_67.11%]" />
          <Helper additionalClassNames="inset-[57.46%_53.07%_37.28%_41.67%]" />
          <Helper additionalClassNames="inset-[55.26%_42.98%_39.47%_51.75%]" />
          <Helper additionalClassNames="inset-[47.59%_73.68%_47.15%_21.05%]" />
        </div>
        <div className="absolute contents font-['IBM_Plex_Sans:Regular',sans-serif] inset-[-8.77%_-11.18%_-8.55%_-16.67%] leading-[0] not-italic text-[#607d8b] text-[16px] tracking-[0.44px] whitespace-nowrap" data-name="Caption">
          <div className="absolute flex flex-col inset-[103.29%_46.49%_-8.55%_46.49%] justify-center text-center">
            <p className="leading-[24px]">July</p>
          </div>
          <div className="absolute flex flex-col inset-[-8.77%_43.2%_103.51%_43.42%] justify-center text-center">
            <p className="leading-[24px]">January</p>
          </div>
          <div className="absolute flex flex-col inset-[15.57%_-2.85%_79.17%_92.54%] justify-center">
            <p className="leading-[24px]">March</p>
          </div>
          <div className="absolute flex flex-col inset-[15.57%_92.54%_79.17%_-9.87%] justify-center text-right">
            <p className="leading-[24px]">November</p>
          </div>
          <div className="absolute flex flex-col inset-[47.59%_-11.18%_47.15%_103.29%] justify-center">
            <p className="leading-[24px]">April</p>
          </div>
          <div className="absolute flex flex-col inset-[47.59%_103.29%_47.15%_-16.67%] justify-center text-right">
            <p className="leading-[24px]">October</p>
          </div>
          <div className="absolute flex flex-col inset-[79.82%_92.54%_14.91%_-10.96%] justify-center text-right">
            <p className="leading-[24px]">September</p>
          </div>
          <div className="absolute flex flex-col inset-[79.82%_0.66%_14.91%_92.54%] justify-center">
            <p className="leading-[24px]">May</p>
          </div>
          <div className="absolute flex flex-col inset-[-2.19%_74.78%_96.93%_8.11%] justify-center text-right">
            <p className="leading-[24px]">December</p>
          </div>
        </div>
        <div className="absolute bottom-[96.93%] flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] left-3/4 not-italic right-[10.09%] text-[#607d8b] text-[16px] top-[-2.19%] tracking-[0.44px] whitespace-nowrap">
          <p className="leading-[24px]">Fubruary</p>
        </div>
        <div className="absolute flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-[97.59%_74.78%_-2.85%_13.6%] justify-center leading-[0] not-italic text-[#607d8b] text-[16px] text-right tracking-[0.44px] whitespace-nowrap">
          <p className="leading-[24px]">August</p>
        </div>
        <div className="absolute bottom-[-2.85%] flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] left-3/4 not-italic right-[16.89%] text-[#607d8b] text-[16px] top-[97.59%] tracking-[0.44px] whitespace-nowrap">
          <p className="leading-[24px]">June</p>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute h-[436px] left-[calc(50%-308px)] top-[575px] w-[446px]" data-name="Radar v3">
        <div className="absolute inset-[1.26%_1.12%]" data-name="Rays">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 436.226 425.216">
            <path d={svgPaths.p18200e80} id="Rays" stroke="var(--stroke-0, #CFD8DC)" />
          </svg>
        </div>
        <div className="absolute contents inset-[1.15%_-0.22%_-3.9%_-0.22%]" data-name="Web">
          <div className="absolute inset-[45.18%_42.83%_40.14%_42.83%]" data-name="Radar Scale 7">
            <div className="absolute inset-[0_1.25%_4.95%_1.25%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 62.3954 60.831">
                <path d={svgPaths.p320fc300} id="Radar Scale" stroke="var(--stroke-0, #CFD8DC)" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-[37.84%_35.65%_32.8%_35.65%]" data-name="Radar Scale 7">
            <div className="absolute inset-[0_1.25%_4.95%_1.25%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 124.791 121.662">
                <path d={svgPaths.p97b8ef0} id="Radar Scale" stroke="var(--stroke-0, #CFD8DC)" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-[30.5%_28.48%_25.46%_28.48%]" data-name="Radar Scale 7">
            <div className="absolute inset-[0_1.25%_4.95%_1.25%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 187.186 182.493">
                <path d={svgPaths.p1c3dab00} id="Radar Scale" stroke="var(--stroke-0, #CFD8DC)" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-[23.17%_21.3%_18.12%_21.3%]" data-name="Radar Scale 7">
            <div className="absolute inset-[0_1.25%_4.95%_1.25%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 249.582 243.324">
                <path d={svgPaths.p1b6f480} id="Radar Scale" stroke="var(--stroke-0, #CFD8DC)" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-[15.83%_14.13%_10.78%_14.13%]" data-name="Radar Scale 7">
            <div className="absolute inset-[0_1.25%_4.95%_1.25%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 311.977 304.155">
                <path d={svgPaths.p4a26780} id="Radar Scale" stroke="var(--stroke-0, #CFD8DC)" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-[8.49%_6.95%_3.44%_6.95%]" data-name="Radar Scale 7">
            <div className="absolute inset-[0_1.25%_4.95%_1.25%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 374.372 364.986">
                <path d={svgPaths.p606eb00} id="Radar Scale" stroke="var(--stroke-0, #CFD8DC)" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-[1.15%_-0.22%_-3.9%_-0.22%]" data-name="Radar Scale 7">
            <div className="absolute inset-[0_1.25%_4.95%_1.25%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 436.768 425.817">
                <path d={svgPaths.pf0a2c80} id="Radar Scale" stroke="var(--stroke-0, #CFD8DC)" />
              </svg>
            </div>
          </div>
        </div>
        <div className="absolute contents inset-[0_47.31%_52.29%_47.31%]" data-name="Numbers">
          <NumberText text="5" additionalClassNames="inset-[44.04%_47.31%_52.29%_47.31%]" />
          <NumberText text="10" additionalClassNames="inset-[36.7%_47.31%_59.63%_47.31%]" />
          <NumberText text="15" additionalClassNames="inset-[29.36%_47.31%_66.97%_47.31%]" />
          <NumberText text="20" additionalClassNames="inset-[22.02%_47.31%_74.31%_47.31%]" />
          <NumberText text="25" additionalClassNames="inset-[14.68%_47.31%_81.65%_47.31%]" />
          <NumberText text="30" additionalClassNames="inset-[7.34%_47.31%_88.99%_47.31%]" />
          <NumberText1 text="35" additionalClassNames="inset-[0_47.31%_96.33%_47.31%]" />
        </div>
        <div className="absolute contents left-[-6px] top-[77px]" data-name="Dots">
          <Square12Dp additionalClassNames="inset-[17.66%_8.07%_76.83%_86.55%]" />
          <Square12Dp additionalClassNames="inset-[61.01%_-1.35%_33.49%_95.96%]" />
          <Square12Dp additionalClassNames="inset-[61.01%_95.96%_33.49%_-1.35%]" />
          <Square12Dp additionalClassNames="inset-[95.87%_69.06%_-1.38%_25.56%]" />
          <Square12Dp additionalClassNames="inset-[95.87%_25.78%_-1.38%_68.83%]" />
          <Square12Dp additionalClassNames="inset-[17.66%_86.55%_76.83%_8.07%]" />
        </div>
        <div className="absolute contents inset-[20.41%_2.24%_10.78%_14.57%]" data-name="Data Blue">
          <div className="absolute inset-[23.17%_4.93%_13.65%_17.26%]" data-name="Fill">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 347 275.5">
              <path d={svgPaths.p1610c900} fill="var(--fill-0, #2DB6F5)" id="Fill" opacity="0.24" />
            </svg>
          </div>
          <div className="absolute inset-[23.17%_4.93%_13.65%_17.26%]" data-name="Stroke">
            <div className="absolute inset-[-0.37%_-0.44%_-0.52%_-0.49%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 350.225 277.963">
                <path d={svgPaths.p362b6c00} id="Stroke" stroke="var(--stroke-0, #2DB6F5)" strokeWidth="2" />
              </svg>
            </div>
          </div>
          <Filled8Dp1 additionalClassNames="inset-[20.41%_47.31%_74.08%_47.31%]" />
          <Filled8Dp1 additionalClassNames="inset-[23.17%_80.04%_71.33%_14.57%]" />
          <Filled8Dp1 additionalClassNames="inset-[53.21%_62.11%_41.28%_32.51%]" />
          <Filled8Dp1 additionalClassNames="inset-[55.96%_50.22%_38.53%_44.39%]" />
          <Filled8Dp1 additionalClassNames="inset-[83.72%_31.39%_10.78%_63.23%]" />
          <Filled8Dp1 additionalClassNames="inset-[60.32%_2.24%_34.17%_92.38%]" />
          <Filled8Dp1 additionalClassNames="inset-[34.4%_28.48%_60.09%_66.14%]" />
        </div>
        <div className="absolute contents inset-[22.25%_10.31%_5.96%_0]" data-name="Data Pink">
          <div className="absolute inset-[24.89%_13%_8.6%_2.69%]" data-name="Fill">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 376 290">
              <path d={svgPaths.p1b678000} fill="var(--fill-0, #E289F2)" id="Fill" opacity="0.24" />
            </svg>
          </div>
          <div className="absolute inset-[24.89%_13%_8.6%_2.69%]" data-name="Stroke">
            <div className="absolute inset-[-0.52%_-0.29%_-0.48%_-0.37%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 378.459 292.899">
                <path d={svgPaths.p2fe38100} id="Stroke" stroke="var(--stroke-0, #E289F2)" strokeWidth="2" />
              </svg>
            </div>
          </div>
          <Filled8Dp2 additionalClassNames="inset-[37.84%_47.31%_56.65%_47.31%]" />
          <Filled8Dp2 additionalClassNames="inset-[31.19%_69.96%_63.3%_24.66%]" />
          <Filled8Dp2 additionalClassNames="inset-[60.78%_94.62%_33.72%_0]" />
          <Filled8Dp2 additionalClassNames="inset-[88.53%_65.7%_5.96%_28.92%]" />
          <Filled8Dp2 additionalClassNames="inset-[62.61%_41.26%_31.88%_53.36%]" />
          <Filled8Dp2 additionalClassNames="inset-[58.49%_10.31%_36.01%_84.3%]" />
          <Filled8Dp2 additionalClassNames="inset-[22.25%_13.45%_72.25%_81.17%]" />
        </div>
        <div className="absolute contents font-['IBM_Plex_Sans:Regular',sans-serif] inset-[-8.72%_-22.65%_-8.94%_-20.18%] leading-[0] not-italic text-[#607d8b] text-[16px] tracking-[0.44px] whitespace-nowrap" data-name="Caption">
          <div className="absolute flex flex-col inset-[-8.72%_36.77%_103.21%_49.78%] justify-center">
            <p className="leading-[24px]">Monday</p>
          </div>
          <div className="absolute flex flex-col inset-[10.09%_-3.36%_84.4%_89.24%] justify-center">
            <p className="leading-[24px]">Tuesday</p>
          </div>
          <div className="absolute flex flex-col inset-[61.01%_-22.65%_33.49%_104.93%] justify-center">
            <p className="leading-[24px]">Wendsday</p>
          </div>
          <div className="absolute flex flex-col inset-[61.01%_104.93%_33.49%_-20.18%] justify-center text-right">
            <p className="leading-[24px]">Saturday</p>
          </div>
          <div className="absolute flex flex-col inset-[10.09%_89.24%_84.4%_-4.48%] justify-center text-right">
            <p className="leading-[24px]">Saturday</p>
          </div>
          <div className="absolute flex flex-col inset-[103.44%_12.78%_-8.94%_71.3%] justify-center">
            <p className="leading-[24px]">Thursday</p>
          </div>
          <div className="absolute flex flex-col inset-[103.44%_71.75%_-8.94%_17.71%] justify-center text-right">
            <p className="leading-[24px]">Friday</p>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute h-[456px] left-[calc(50%+303px)] top-[616px] w-[400px]" data-name="Radar v4">
        <div className="absolute inset-[1.21%_1.5%]" data-name="Rays">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 388.501 445">
            <path d={svgPaths.p39a27c80} id="Rays" stroke="var(--stroke-0, #CFD8DC)" />
          </svg>
        </div>
        <div className="absolute contents inset-[1.1%_-6%_0.66%_-6%]" data-name="Web">
          <div className="absolute inset-[43.2%_42%_42.76%_42%]" data-name="Radar Scale 6">
            <div className="absolute inset-[0_6.7%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 55.4256 64">
                <path d={svgPaths.p6d3d700} id="Radar Scale" stroke="var(--stroke-0, #CFD8DC)" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-[36.18%_34%_35.75%_34%]" data-name="Radar Scale 6">
            <div className="absolute inset-[0_6.7%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 110.851 128">
                <path d={svgPaths.p38994fc0} id="Radar Scale" stroke="var(--stroke-0, #CFD8DC)" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-[29.17%_26%_28.73%_26%]" data-name="Radar Scale 6">
            <div className="absolute inset-[0_6.7%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 166.277 192">
                <path d={svgPaths.p23676332} id="Radar Scale" stroke="var(--stroke-0, #CFD8DC)" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-[22.15%_18%_21.71%_18%]" data-name="Radar Scale 6">
            <div className="absolute inset-[0_6.7%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 221.703 256">
                <path d={svgPaths.p7169e00} id="Radar Scale" stroke="var(--stroke-0, #CFD8DC)" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-[15.13%_10%_14.69%_10%]" data-name="Radar Scale 6">
            <div className="absolute inset-[0_6.7%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 277.128 320">
                <path d={svgPaths.p12da580} id="Radar Scale" stroke="var(--stroke-0, #CFD8DC)" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-[8.11%_2%_7.68%_2%]" data-name="Radar Scale 6">
            <div className="absolute inset-[0_6.7%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 332.554 384">
                <path d={svgPaths.p2ad03200} id="Radar Scale" stroke="var(--stroke-0, #CFD8DC)" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-[1.1%_-6%_0.66%_-6%]" data-name="Radar Scale 6">
            <div className="absolute inset-[0_6.7%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 387.979 448">
                <path d={svgPaths.p2d134930} id="Radar Scale" stroke="var(--stroke-0, #CFD8DC)" />
              </svg>
            </div>
          </div>
        </div>
        <div className="absolute contents inset-[0_47%_54.39%_47%]" data-name="Numbers">
          <NumberText text="5" additionalClassNames="inset-[42.11%_47%_54.39%_47%]" />
          <NumberText text="10" additionalClassNames="inset-[35.09%_47%_61.4%_47%]" />
          <NumberText text="15" additionalClassNames="inset-[28.07%_47%_68.42%_47%]" />
          <NumberText text="20" additionalClassNames="inset-[21.05%_47%_75.44%_47%]" />
          <NumberText text="25" additionalClassNames="inset-[14.04%_47%_82.46%_47%]" />
          <NumberText text="30" additionalClassNames="inset-[7.02%_47%_89.47%_47%]" />
          <NumberText1 text="35" additionalClassNames="inset-[0_47%_96.49%_47%]" />
        </div>
        <div className="absolute contents left-[-6px] top-[103px]" data-name="Dots">
          <Square12Dp additionalClassNames="inset-[22.59%_-1.5%_72.15%_95.5%]" />
          <Square12Dp additionalClassNames="inset-[72.59%_-1.5%_22.15%_95.5%]" />
          <Square12Dp additionalClassNames="inset-[72.59%_95.5%_22.15%_-1.5%]" />
          <Square12Dp additionalClassNames="inset-[22.59%_95.5%_72.15%_-1.5%]" />
          <Square12Dp additionalClassNames="inset-[96.05%_47%_-1.32%_47%]" />
        </div>
        <div className="absolute contents inset-[26.54%_5.75%_26.75%_7%]" data-name="Data Green">
          <div className="absolute inset-[29.17%_8.63%_29.39%_9.88%]" data-name="Fill">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 326 189">
              <path d={svgPaths.p11110d80} fill="var(--fill-0, #39C86A)" id="Fill" opacity="0.24" />
            </svg>
          </div>
          <div className="absolute inset-[29.17%_8.63%_29.39%_9.88%]" data-name="Stroke">
            <div className="absolute inset-[-0.69%_-0.32%_-0.56%_-0.38%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 328.287 191.365">
                <path d={svgPaths.p3515e800} id="Stroke" stroke="var(--stroke-0, #39C86A)" strokeWidth="2" />
              </svg>
            </div>
          </div>
          <RadarV4Filled8Dp additionalClassNames="inset-[36.18%_47%_58.55%_47%]" />
          <RadarV4Filled8Dp additionalClassNames="inset-[31.36%_78.25%_63.38%_15.75%]" />
          <RadarV4Filled8Dp additionalClassNames="inset-[67.98%_87%_26.75%_7%]" />
          <RadarV4Filled8Dp additionalClassNames="inset-[66.45%_47%_28.29%_47%]" />
          <RadarV4Filled8Dp additionalClassNames="inset-[67.76%_7%_26.97%_87%]" />
          <RadarV4Filled8Dp additionalClassNames="inset-[26.54%_5.75%_68.2%_88.25%]" />
        </div>
        <div className="absolute contents inset-[19.52%_5.5%_26.1%_5.75%]" data-name="Data Amber">
          <Fill additionalClassNames="absolute inset-[22.15%_8.5%_28.73%_8.63%]">
            <path d={svgPaths.p34268f80} fill="var(--fill-0, #F5C324)" id="Fill" opacity="0.24" />
          </Fill>
          <Stroke additionalClassNames="absolute inset-[22.15%_8.5%_28.73%_8.63%]">
            <path d={svgPaths.p8bc5780} id="Stroke" stroke="var(--stroke-0, #F5C324)" strokeWidth="2" />
          </Stroke>
          <Filled8Dp additionalClassNames="inset-[19.52%_47%_75.22%_47%]" />
          <Filled8Dp additionalClassNames="inset-[26.54%_88.25%_68.2%_5.75%]" />
          <Filled8Dp additionalClassNames="inset-[55.26%_62%_39.47%_32%]" />
          <Filled8Dp additionalClassNames="inset-[55.26%_47%_39.47%_47%]" />
          <Wrapper additionalClassNames="absolute inset-[68.64%_5.5%_26.1%_88.5%] shadow-[0px_4px_8px_0px_rgba(84,110,122,0.24)]">
            <div className="absolute bg-[#f5c324] inset-0 rounded-[12px]" data-name="BG primary">
              <div aria-hidden="true" className="absolute border-5 border-solid border-white inset-[-5px] pointer-events-none rounded-[17px]" />
            </div>
          </Wrapper>
          <Filled8Dp additionalClassNames="inset-[35.31%_23%_59.43%_71%]" />
        </div>
        <div className="absolute contents font-['IBM_Plex_Sans:Regular',sans-serif] inset-[-8.77%_-8.75%_-8.55%_-8.75%] leading-[0] not-italic text-[#607d8b] text-[16px] tracking-[0.44px] whitespace-nowrap" data-name="Caption">
          <div className="absolute flex flex-col inset-[103.29%_44.75%_-8.55%_45%] justify-center text-center">
            <p className="leading-[24px]">2016</p>
          </div>
          <div className="absolute flex flex-col inset-[-8.77%_44.75%_103.51%_45%] justify-center text-center">
            <p className="leading-[24px]">2020</p>
          </div>
          <div className="absolute flex flex-col inset-[15.57%_-8.75%_79.17%_98.5%] justify-center">
            <p className="leading-[24px]">2019</p>
          </div>
          <div className="absolute flex flex-col inset-[15.57%_98.5%_79.17%_-8.75%] justify-center text-right">
            <p className="leading-[24px]">2014</p>
          </div>
          <div className="absolute flex flex-col inset-[79.82%_98.5%_14.91%_-8.75%] justify-center text-right">
            <p className="leading-[24px]">2015</p>
          </div>
          <div className="absolute flex flex-col inset-[79.82%_-8.75%_14.91%_98.5%] justify-center">
            <p className="leading-[24px]">2017</p>
          </div>
        </div>
        <div className="absolute inset-[58.77%_0_32.46%_83%] shadow-[0px_4px_8px_0px_rgba(84,110,122,0.24)]" data-name="Tooltip">
          <Wrapper1>
            <div className="absolute bg-white inset-0 rounded-[1px]" data-name="BG dark" />
          </Wrapper1>
          <div className="absolute inset-0 rounded-[8px]" data-name="🎨 Colors Dark">
            <div className="absolute bg-white inset-0 rounded-[3px]" data-name="BG dark" />
          </div>
          <div className="absolute inset-[18.75%_0]" data-name="12 sp • Caption">
            <div className="absolute flex flex-col font-['IBM_Plex_Sans:Bold',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#607d8b] text-[14px] text-center tracking-[0.75px] uppercase">
              <p className="leading-[normal]">52,6%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}