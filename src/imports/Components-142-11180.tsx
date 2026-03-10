import clsx from "clsx";
import svgPaths from "./svg-2yazs6afzd";

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute inset-[0_0_0_58.02%]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32.7451 55">
        {children}
      </svg>
    </div>
  );
}

function Subtract() {
  return (
    <Wrapper>
      <path d={svgPaths.p54ed1c0} fill="var(--fill-0, #CFD8DC)" id="Subtract" />
    </Wrapper>
  );
}

function PieCircularHelper() {
  return (
    <div className="relative size-full">
      <Subtract />
    </div>
  );
}

function Helper1() {
  return (
    <svg fill="none" preserveAspectRatio="none" viewBox="0 0 78 55" className="absolute block size-full">
      <path d={svgPaths.p3972770} fill="var(--fill-0, #ACB9FF)" id="Fill" />
    </svg>
  );
}
type HelperProps = {
  additionalClassNames?: string;
};

function Helper({ additionalClassNames = "" }: HelperProps) {
  return (
    <div className={clsx("absolute bottom-1/2 flex items-center justify-center left-1/2 right-[14.74%] top-0", additionalClassNames)}>
      <div className="-rotate-90 -scale-y-100 flex-none h-[55px] w-[78px]">
        <div className="relative size-full" data-name="12,5%">
          <Helper1 />
        </div>
      </div>
    </div>
  );
}

export default function Components() {
  return (
    <div className="relative size-full" data-name="Components">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['IBM_Plex_Sans:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] left-[59px] not-italic text-[#607080] text-[16px] text-center top-[12px] tracking-[0.44px] whitespace-nowrap">
        <p className="leading-[24px]">❖ Components</p>
      </div>
      <div className="absolute h-[55px] left-[110px] top-[48px] w-[78px]" data-name="Pie Piece Purple">
        <Helper1 />
      </div>
      <div className="absolute h-[55px] left-[110px] top-[135px] w-[78px]" data-name="Pie Piece Gray">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 78 55">
          <path d={svgPaths.p3972770} fill="var(--fill-0, #CFD8DC)" id="Fill" />
        </svg>
      </div>
      <div className="absolute h-[55px] left-[110px] top-[222px] w-[78px]" data-name="Pie Piece Dark">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 78 55">
          <path d={svgPaths.p3972770} fill="var(--fill-0, #263238)" id="Fill" />
        </svg>
      </div>
      <div className="absolute h-[55px] left-[110px] top-[309px] w-[78px]" data-name="Pie Piece Blue">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 78 55">
          <path d={svgPaths.p3972770} fill="var(--fill-0, #7C4DFF)" id="Fill" />
        </svg>
      </div>
      <div className="absolute h-[55px] left-0 top-[135px] w-[78px]" data-name="Outline Piece Gray">
        <Subtract />
      </div>
      <div className="absolute h-[55px] left-0 top-[48px] w-[78px]" data-name="Outline Piece Purple">
        <Wrapper>
          <path d={svgPaths.p54ed1c0} fill="var(--fill-0, #9FADF1)" id="Subtract" />
        </Wrapper>
      </div>
      <div className="absolute h-[55px] left-0 top-[222px] w-[78px]" data-name="Outline Piece Dark">
        <Wrapper>
          <path d={svgPaths.p54ed1c0} fill="var(--fill-0, #263238)" id="Subtract" />
        </Wrapper>
      </div>
      <div className="absolute h-[55px] left-0 top-[309px] w-[78px]" data-name="Outline Piece Blue">
        <Wrapper>
          <path d={svgPaths.p54ed1c0} fill="var(--fill-0, #7C4DFF)" id="Subtract" />
        </Wrapper>
      </div>
      <div className="absolute left-[220px] size-[156px] top-[48px]" data-name="Pie Gray">
        <div className="absolute inset-0 opacity-24 rounded-[8px]" data-name="🎨 Colors Dark">
          <div className="absolute bg-[#263238] inset-0 rounded-[99px]" data-name="BG dark" />
        </div>
        <Helper />
      </div>
      <div className="absolute left-[220px] size-[156px] top-[236px]" data-name="Pie Circular">
        <div className="absolute bottom-1/2 flex items-center justify-center left-[14.74%] right-1/2 top-0">
          <div className="-rotate-90 flex-none h-[55px] w-[78px]">
            <PieCircularHelper />
          </div>
        </div>
        <div className="absolute bottom-1/2 flex items-center justify-center left-0 right-1/2 top-[14.74%]">
          <div className="-scale-y-100 flex-none h-[55px] rotate-180 w-[78px]">
            <PieCircularHelper />
          </div>
        </div>
        <div className="absolute bottom-[14.74%] flex items-center justify-center left-0 right-1/2 top-1/2">
          <div className="flex-none h-[55px] rotate-180 w-[78px]">
            <PieCircularHelper />
          </div>
        </div>
        <div className="absolute bottom-0 flex items-center justify-center left-[14.74%] right-1/2 top-1/2">
          <div className="-scale-y-100 flex-none h-[55px] rotate-90 w-[78px]">
            <PieCircularHelper />
          </div>
        </div>
        <div className="absolute bottom-0 flex items-center justify-center left-1/2 right-[14.74%] top-1/2">
          <div className="flex-none h-[55px] rotate-90 w-[78px]">
            <PieCircularHelper />
          </div>
        </div>
        <div className="absolute bottom-[14.74%] flex items-center justify-center left-1/2 right-0 top-1/2">
          <div className="-scale-y-100 flex-none h-[55px] w-[78px]">
            <PieCircularHelper />
          </div>
        </div>
        <div className="absolute bottom-1/2 left-1/2 right-0 top-[14.74%]" data-name="25,0 %">
          <Subtract />
        </div>
        <div className="absolute bottom-1/2 flex items-center justify-center left-1/2 right-[14.74%] top-0">
          <div className="-rotate-90 -scale-y-100 flex-none h-[55px] w-[78px]">
            <PieCircularHelper />
          </div>
        </div>
        <div className="-translate-y-1/2 absolute h-[56px] left-0 right-0 top-[calc(50%-10px)]" data-name="34 sp • H4 Headline">
          <div className="absolute flex flex-col font-['IBM_Plex_Sans:Bold',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#263238] text-[34px] text-center tracking-[-0.34px]">
            <p className="leading-[normal]">25,0%</p>
          </div>
        </div>
        <div className="-translate-y-1/2 absolute h-[32px] left-0 right-0 top-[calc(50%+22px)]" data-name="10 sp • OVERLINE">
          <div className="absolute flex flex-col font-['IBM_Plex_Sans:Bold',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#263238] text-[10px] text-center tracking-[1.5px] uppercase">
            <p className="leading-[16px]">progress</p>
          </div>
        </div>
      </div>
      <div className="absolute left-[408px] size-[156px] top-[48px]" data-name="Pie Dark">
        <div className="absolute inset-0 opacity-64 rounded-[8px]" data-name="🎨 Colors Dark">
          <div className="absolute bg-[#263238] inset-0 rounded-[99px]" data-name="BG dark" />
        </div>
        <Helper />
      </div>
      <div className="absolute left-[408px] size-[156px] top-[236px]" data-name="Pie Blue">
        <div className="absolute bg-[#855cf8] inset-0 rounded-[999px]" data-name="BG primary" />
        <Helper />
      </div>
      <div className="absolute left-[408px] size-[156px] top-[424px]" data-name="Pie Purple">
        <div className="absolute inset-0 opacity-48" data-name="🎨 Colors Primary">
          <div className="absolute bg-[#855cf8] inset-0 rounded-[999px]" data-name="BG primary" />
        </div>
        <Helper additionalClassNames="mix-blend-multiply" />
      </div>
    </div>
  );
}