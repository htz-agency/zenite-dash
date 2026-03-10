import clsx from "clsx";
import svgPaths from "./svg-gei46o8xxw";
type BackgroundImage3Props = {
  additionalClassNames?: string;
};

function BackgroundImage3({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage3Props>) {
  return (
    <div style={{ fontVariationSettings: "'wdth' 100" }} className={clsx("-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] left-1/2 size-[32px] text-center top-1/2", additionalClassNames)}>
      <p className="leading-[22px]">{children}</p>
    </div>
  );
}
type ButtonTextBackgroundImageProps = {
  additionalClassNames?: string;
};

function ButtonTextBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<ButtonTextBackgroundImageProps>) {
  return (
    <div className={clsx("col-1 h-[24px] mt-[26px] relative rounded-[500px] row-1", additionalClassNames)}>
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex h-full items-center justify-center leading-[0] pl-[6px] pr-[12px] relative text-center">{children}</div>
      </div>
    </div>
  );
}

function BackgroundImage2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[12px] py-[10px] relative w-full">{children}</div>
      </div>
    </div>
  );
}

function Frame246BackgroundImage() {
  return (
    <div style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties} className="flex h-[20px] items-center justify-center relative shrink-0 w-[1.5px]">
      <div className="-rotate-90 flex-none">
        <div className="h-[1.5px] relative w-[20px]" data-name="Divider">
          <div className="absolute inset-[0_-1.08%_0_-3.75%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.9651 1.5">
              <path d="M0.75 0.75H20.2151" id="Divider" stroke="var(--stroke-0, #DDE3EC)" strokeLinecap="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
type MenuDeAcoesTabelaDefaultButtonBackgroundImageAndTextProps = {
  text: string;
};

function MenuDeAcoesTabelaDefaultButtonBackgroundImageAndText({ text }: MenuDeAcoesTabelaDefaultButtonBackgroundImageAndTextProps) {
  return (
    <div className="relative shrink-0 size-[32px]">
      <div className="absolute inset-0 overflow-clip rounded-[500px]" data-name="Button - Symbol">
        <BackgroundImage3 additionalClassNames="text-[#28415c] text-[15px]">{text}</BackgroundImage3>
      </div>
    </div>
  );
}
type ToggleBackgroundImageProps = {
  additionalClassNames?: string;
};

function ToggleBackgroundImage({ additionalClassNames = "" }: ToggleBackgroundImageProps) {
  return (
    <button className={clsx("backdrop-blur-[50px] bg-[#3ccea7] col-1 cursor-pointer h-[19px] mt-0 relative rounded-[100px] row-1", additionalClassNames)}>
      <div className="flex flex-row items-center justify-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-end px-[2px] py-[4px] relative size-full">
          <div className="backdrop-blur-[50px] bg-[#f6f7f9] relative rounded-[100px] shrink-0 size-[15px]">
            <div aria-hidden="true" className="absolute border border-[rgba(200,207,219,0.6)] border-solid inset-0 pointer-events-none rounded-[100px] shadow-[0px_2px_4px_0px_rgba(18,34,50,0.3)]" />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_2px_3px_0px_rgba(0,0,0,0.25)]" />
      <div aria-hidden="true" className="absolute border-0 border-[rgba(200,207,219,0.6)] border-solid inset-0 pointer-events-none rounded-[100px]" />
    </button>
  );
}
type BackgroundImageAndText2Props = {
  text: string;
  additionalClassNames?: string;
};

function BackgroundImageAndText2({ text, additionalClassNames = "" }: BackgroundImageAndText2Props) {
  return (
    <div style={{ fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" }} className={clsx("col-1 flex flex-col font-['DM_Sans:Medium',sans-serif] justify-center mt-0 not-italic relative row-1 text-[#4e6987] text-[12px] tracking-[-0.5px]", additionalClassNames)}>
      <p className="leading-[17px]">{text}</p>
    </div>
  );
}

function RowBackgroundImage() {
  return (
    <div className="bg-white content-stretch flex h-[31px] items-start overflow-clip relative shrink-0 w-full">
      <CellBackgroundImage />
      <CellBackgroundImage1 />
      <CellBackgroundImage2 />
      <CellBackgroundImage3 />
      <div className="bg-white content-stretch flex flex-[1_0_0] flex-col h-full items-start justify-center min-h-px min-w-px relative">
        <div aria-hidden="true" className="absolute border-[#dde3ec] border-l border-solid border-t inset-0 pointer-events-none" />
        <ContentBackgroundImageAndText text="Qualificação" />
      </div>
    </div>
  );
}

function CellBackgroundImage3() {
  return (
    <div className="bg-white content-stretch flex flex-col h-full items-start justify-center relative shrink-0 w-[114px]">
      <div aria-hidden="true" className="absolute border-[#dde3ec] border-l border-solid border-t inset-0 pointer-events-none" />
      <ContentBackgroundImageAndText text="40" />
    </div>
  );
}

function CellBackgroundImage2() {
  return (
    <div className="bg-white content-stretch flex flex-col h-full items-start justify-center relative shrink-0 w-[135px]">
      <div aria-hidden="true" className="absolute border-[#dde3ec] border-l border-solid border-t inset-0 pointer-events-none" />
      <ContentBackgroundImageAndText text="Há 30 dias" />
    </div>
  );
}

function CellBackgroundImage1() {
  return (
    <div className="bg-white content-stretch flex flex-col h-full items-start justify-center relative shrink-0 w-[132px]">
      <div aria-hidden="true" className="absolute border-[#dde3ec] border-l border-solid border-t inset-0 pointer-events-none" />
      <ContentBackgroundImageAndText text="Nome do Lead" />
    </div>
  );
}

function CellBackgroundImage() {
  return (
    <div className="bg-white content-stretch flex flex-col h-full items-start justify-center relative shrink-0 w-[155px]">
      <div aria-hidden="true" className="absolute border-[#dde3ec] border-l border-solid border-t inset-0 pointer-events-none" />
      <ContentBackgroundImageAndText text="Nome do Proprietário" />
    </div>
  );
}
type ContentBackgroundImageAndTextProps = {
  text: string;
};

function ContentBackgroundImageAndText({ text }: ContentBackgroundImageAndTextProps) {
  return (
    <BackgroundImage2>
      <p className="flex-[1_0_0] font-['DM_Sans:Medium',sans-serif] leading-[17px] min-h-px min-w-px not-italic relative text-[#28415c] text-[12px] tracking-[-0.5px]" style={{ fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" }}>
        {text}
      </p>
    </BackgroundImage2>
  );
}
type BackgroundImageAndText1Props = {
  text: string;
};

function BackgroundImageAndText1({ text }: BackgroundImageAndText1Props) {
  return (
    <div style={{ fontVariationSettings: "'wdth' 100", fontFeatureSettings: "'ss15'" }} className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 size-[28px] text-[14px] text-center">
      <p className="leading-[22px]">{text}</p>
    </div>
  );
}
type ButtonSymbolBackgroundImageAndTextProps = {
  text: string;
};

function ButtonSymbolBackgroundImageAndText({ text }: ButtonSymbolBackgroundImageAndTextProps) {
  return (
    <div className="overflow-clip relative rounded-[500px] shrink-0 size-[28px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] left-1/2 size-[28px] text-[#28415c] text-[14px] text-center top-1/2" style={{ fontVariationSettings: "'wdth' 100", fontFeatureSettings: "'ss15'" }}>
        <p className="leading-[22px]">{text}</p>
      </div>
    </div>
  );
}
type BackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function BackgroundImageAndText({ text, additionalClassNames = "" }: BackgroundImageAndTextProps) {
  return (
    <div style={{ fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" }} className={clsx("flex flex-col font-['DM_Sans:Bold',sans-serif] justify-center not-italic relative shrink-0 text-[10px] tracking-[0.5px] uppercase whitespace-nowrap", additionalClassNames)}>
      <p className="leading-[20px]">{text}</p>
    </div>
  );
}
type BackgroundImage1Props = {
  symbol: string;
  additionalClassNames?: string;
};

function BackgroundImage1({ symbol, additionalClassNames = "" }: BackgroundImage1Props) {
  return (
    <div style={{ fontVariationSettings: "'wdth' 100" }} className={additionalClassNames}>
      <p className="leading-[22px]">{symbol}</p>
    </div>
  );
}
type BackgroundImageProps = {
  symbol: string;
  additionalClassNames?: string;
};

function BackgroundImage({ symbol, additionalClassNames = "" }: BackgroundImageProps) {
  return <BackgroundImage1 additionalClassNames={clsx("-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] left-1/2 size-[28px] text-[13px] text-center top-1/2", additionalClassNames)} symbol={symbol} />;
}
type ButtonSymbolBackgroundImageProps = {
  symbol: string;
  additionalClassNames?: string;
};

function ButtonSymbolBackgroundImage({ symbol, additionalClassNames = "" }: ButtonSymbolBackgroundImageProps) {
  return <BackgroundImage1 additionalClassNames={clsx("-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] left-1/2 text-center top-1/2", additionalClassNames)} symbol={symbol} />;
}
type ButtonSymbolProps = {
  className?: string;
  size?: "Mini" | "Small" | "Standard" | "Large" | "Extra Large";
  state?: "Idle (No Platter)" | "Idle (Platter)" | "Hover" | "Selected" | "Disabled";
  symbol?: string;
};

function ButtonSymbol({ className, size = "Mini", state = "Idle (No Platter)", symbol = "􀻒" }: ButtonSymbolProps) {
  const isExtraLargeAndHover = size === "Extra Large" && state === "Hover";
  const isExtraLargeAndSelected = size === "Extra Large" && state === "Selected";
  const isLargeAndHover = size === "Large" && state === "Hover";
  const isLargeAndSelected = size === "Large" && state === "Selected";
  const isMiniAndHover = size === "Mini" && state === "Hover";
  const isMiniAndSelected = size === "Mini" && state === "Selected";
  const isSmallAndHover = size === "Small" && state === "Hover";
  const isSmallAndSelected = size === "Small" && state === "Selected";
  const isStandardAndHover = size === "Standard" && state === "Hover";
  const isStandardAndSelected = size === "Standard" && state === "Selected";
  return (
    <div className={className || `overflow-clip relative ${size === "Mini" && state === "Idle (Platter)" ? "bg-[#dde3ec] rounded-[500px] size-[28px]" : isMiniAndHover ? "rounded-[100px] size-[28px]" : isMiniAndSelected ? "bg-[#07abde] rounded-[500px] size-[28px]" : size === "Mini" && ["Disabled", "Idle (No Platter)"].includes(state) ? "rounded-[500px] size-[28px]" : size === "Small" && state === "Idle (Platter)" ? "bg-[#dde3ec] rounded-[500px] size-[32px]" : isSmallAndHover ? "rounded-[100px] size-[32px]" : isSmallAndSelected ? "bg-[#07abde] rounded-[500px] size-[32px]" : size === "Small" && ["Disabled", "Idle (No Platter)"].includes(state) ? "rounded-[500px] size-[32px]" : size === "Standard" && state === "Idle (Platter)" ? "bg-[#dde3ec] rounded-[500px] size-[44px]" : isStandardAndHover ? "rounded-[100px] size-[44px]" : isStandardAndSelected ? "bg-[#07abde] rounded-[500px] size-[44px]" : size === "Standard" && ["Disabled", "Idle (No Platter)"].includes(state) ? "rounded-[500px] size-[44px]" : size === "Large" && state === "Idle (Platter)" ? "bg-[#dde3ec] rounded-[500px] size-[52px]" : isLargeAndHover ? "rounded-[100px] size-[52px]" : isLargeAndSelected ? "bg-[#07abde] rounded-[500px] size-[52px]" : size === "Large" && ["Disabled", "Idle (No Platter)"].includes(state) ? "rounded-[500px] size-[52px]" : size === "Extra Large" && state === "Idle (Platter)" ? "bg-[#dde3ec] rounded-[500px] size-[64px]" : isExtraLargeAndHover ? "rounded-[100px] size-[64px]" : isExtraLargeAndSelected ? "bg-[#07abde] rounded-[500px] size-[64px]" : "rounded-[500px] size-[64px]"}`} style={isMiniAndHover ? { backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 28 28\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'0.20000000298023224\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(-6.3973e-9 -2.2 2.2 -6.3973e-9 14 28)\\'><stop stop-color=\\'rgba(255,255,255,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(255,255,255,0)\\' offset=\\'1\\'/></radialGradient></defs></svg>'), linear-gradient(90deg, rgb(220, 240, 255) 0%, rgb(220, 240, 255) 100%)" } : isSmallAndHover ? { backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 32 32\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'0.20000000298023224\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(-7.3112e-9 -2.5143 2.5143 -7.3112e-9 16 32)\\'><stop stop-color=\\'rgba(255,255,255,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(255,255,255,0)\\' offset=\\'1\\'/></radialGradient></defs></svg>'), linear-gradient(90deg, rgb(220, 240, 255) 0%, rgb(220, 240, 255) 100%)" } : isStandardAndHover ? { backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 44 44\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'0.20000000298023224\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(-1.0053e-8 -3.4571 3.4571 -1.0053e-8 22 44)\\'><stop stop-color=\\'rgba(255,255,255,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(255,255,255,0)\\' offset=\\'1\\'/></radialGradient></defs></svg>'), linear-gradient(90deg, rgb(220, 240, 255) 0%, rgb(220, 240, 255) 100%)" } : isLargeAndHover ? { backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 52 52\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'0.20000000298023224\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(-1.1881e-8 -4.0857 4.0857 -1.1881e-8 26 52)\\'><stop stop-color=\\'rgba(255,255,255,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(255,255,255,0)\\' offset=\\'1\\'/></radialGradient></defs></svg>'), linear-gradient(90deg, rgb(220, 240, 255) 0%, rgb(220, 240, 255) 100%)" } : isExtraLargeAndHover ? { backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 64 64\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'0.20000000298023224\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(-1.4622e-8 -5.0286 5.0286 -1.4622e-8 32 64)\\'><stop stop-color=\\'rgba(255,255,255,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(255,255,255,0)\\' offset=\\'1\\'/></radialGradient></defs></svg>'), linear-gradient(90deg, rgb(220, 240, 255) 0%, rgb(220, 240, 255) 100%)" } : undefined}>
      {state === "Disabled" && ["Extra Large", "Large", "Standard", "Small", "Mini"].includes(size) && (
        <div className={`-translate-x-1/2 -translate-y-1/2 absolute flex flex-col justify-center leading-[0] left-1/2 text-[#d9d9d9] text-center top-1/2 ${size === "Mini" && state === "Disabled" ? 'font-["SF_Pro:Semibold",sans-serif] font-[590] size-[28px] text-[13px]' : size === "Small" && state === "Disabled" ? 'font-["SF_Pro:Medium",sans-serif] font-[510] size-[32px] text-[15px]' : size === "Standard" && state === "Disabled" ? 'font-["SF_Pro:Medium",sans-serif] font-[510] size-[44px] text-[19px]' : size === "Large" && state === "Disabled" ? 'font-["SF_Pro:Medium",sans-serif] font-[510] size-[50px] text-[24px]' : 'font-["SF_Pro:Medium",sans-serif] font-[510] size-[50px] text-[29px]'}`} style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[22px]">􀻒</p>
        </div>
      )}
      {size === "Extra Large" && ["Hover", "Idle (Platter)", "Idle (No Platter)"].includes(state) && <ButtonSymbolBackgroundImage additionalClassNames="size-[50px] text-[#28415c] text-[29px]" symbol={symbol} />}
      {size === "Large" && ["Hover", "Idle (Platter)", "Idle (No Platter)"].includes(state) && <ButtonSymbolBackgroundImage additionalClassNames="size-[50px] text-[#28415c] text-[24px]" symbol={symbol} />}
      {size === "Standard" && ["Hover", "Idle (Platter)", "Idle (No Platter)"].includes(state) && <ButtonSymbolBackgroundImage additionalClassNames="size-[44px] text-[#28415c] text-[19px]" symbol={symbol} />}
      {size === "Small" && ["Hover", "Idle (Platter)", "Idle (No Platter)"].includes(state) && <ButtonSymbolBackgroundImage additionalClassNames="size-[32px] text-[#28415c] text-[15px]" symbol={symbol} />}
      {size === "Mini" && ["Hover", "Idle (Platter)", "Idle (No Platter)"].includes(state) && <BackgroundImage additionalClassNames="text-[#28415c]" symbol={symbol} />}
      {isExtraLargeAndSelected && <ButtonSymbolBackgroundImage additionalClassNames="size-[50px] text-[#f6f7f9] text-[29px]" symbol={symbol} />}
      {isLargeAndSelected && <ButtonSymbolBackgroundImage additionalClassNames="size-[50px] text-[#f6f7f9] text-[24px]" symbol={symbol} />}
      {isStandardAndSelected && <ButtonSymbolBackgroundImage additionalClassNames="size-[44px] text-[#f6f7f9] text-[19px]" symbol={symbol} />}
      {isSmallAndSelected && <ButtonSymbolBackgroundImage additionalClassNames="size-[32px] text-[#f6f7f9] text-[15px]" symbol={symbol} />}
      {isMiniAndSelected && <BackgroundImage additionalClassNames="text-[#f6f7f9]" symbol={symbol} />}
    </div>
  );
}
type ButtonProps = {
  className?: string;
  property1?: "Default" | "Variant2" | "Variant3";
};

function Button({ className, property1 = "Default" }: ButtonProps) {
  if (property1 === "Variant2") {
    return (
      <button className={className || "block cursor-pointer relative size-[32px]"} data-name="Property 1=Variant2">
        <ButtonSymbol className="absolute inset-0 overflow-clip rounded-[100px]" size="Small" state="Hover" symbol="􀱋" />
      </button>
    );
  }
  if (property1 === "Variant3") {
    return (
      <button className={className || "block cursor-pointer relative size-[32px]"} data-name="Property 1=Variant3">
        <div className="absolute bg-[#07abde] inset-0 overflow-clip rounded-[500px]" data-name="Button - Symbol">
          <BackgroundImage3 additionalClassNames="text-[#f6f7f9] text-[15px]">􀱋</BackgroundImage3>
        </div>
      </button>
    );
  }
  return (
    <div className={className || "relative size-[32px]"} data-name="Property 1=Default">
      <ButtonSymbol className="absolute inset-0 overflow-clip rounded-[500px]" size="Small" symbol="􀱋" />
    </div>
  );
}
type Button1Props = {
  className?: string;
  property1?: "Default" | "Variant2" | "Variant3";
};

function Button1({ className, property1 = "Default" }: Button1Props) {
  if (property1 === "Variant2") {
    return (
      <button className={className || "block cursor-pointer relative size-[32px]"} data-name="Property 1=Variant2">
        <ButtonSymbol className="absolute inset-0 overflow-clip rounded-[100px]" size="Small" state="Hover" symbol="􀉣" />
      </button>
    );
  }
  if (property1 === "Variant3") {
    return (
      <button className={className || "block cursor-pointer relative size-[32px]"} data-name="Property 1=Variant3">
        <ButtonSymbol className="absolute bg-[#07abde] inset-0 overflow-clip rounded-[500px]" size="Small" state="Selected" symbol="􀉣" />
      </button>
    );
  }
  return (
    <div className={className || "relative size-[32px]"} data-name="Property 1=Default">
      <ButtonSymbol className="absolute inset-0 overflow-clip rounded-[500px]" size="Small" symbol="􀉣" />
    </div>
  );
}

export default function Lead() {
  return (
    <div className="relative size-full" data-name="Lead">
      <div className="absolute bg-white h-[791px] left-0 rounded-[15px] top-0 w-[1093px]" data-name="Lead Background" />
      <div className="absolute h-0 left-0 top-[55px] w-[1096px]">
        <div className="absolute inset-[-1.5px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1096 1.5">
            <line id="Line 1" stroke="var(--stroke-0, #DDE3EC)" strokeWidth="1.5" x2="1096" y1="0.75" y2="0.75" />
          </svg>
        </div>
      </div>
      <div className="absolute h-[26px] left-[261px] rounded-[16px] top-[148px] w-[121px]" />
      <div className="absolute left-0 rounded-[100px] top-0 w-[246px]" data-name="H1 Pipes">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[10px] items-center p-[12px] relative w-full">
            <div className="bg-[#dde3ec] overflow-clip relative rounded-[8px] shrink-0 size-[31px]" data-name="Button - Symbol">
              <BackgroundImage3 additionalClassNames="text-[#28415c] text-[18px]">􀑀</BackgroundImage3>
            </div>
            <div className="content-stretch flex flex-col h-[30px] items-start justify-end relative shrink-0 w-[167px]">
              <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] h-[8px] justify-center leading-[0] not-italic relative shrink-0 text-[#64676c] text-[10px] tracking-[0.5px] uppercase w-[150px]" style={{ fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" }}>
                <p className="leading-[20px]">RELATÓRIO</p>
              </div>
              <div className="content-stretch flex h-[20px] items-center relative shrink-0 w-[157px]">
                <p className="font-['DM_Sans:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#28415c] text-[19px] tracking-[-0.5px] whitespace-nowrap" style={{ fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" }}>
                  Nome do Relatório
                </p>
                <div className="overflow-clip rounded-[500px] shrink-0 size-[28px]" data-name="Button - Symbol" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute h-[379px] left-[12px] top-[136px] w-[633px]" data-name="Table 1">
        <div className="absolute left-0 rounded-[4px] top-0 w-[633px]" data-name="Table">
          <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
            <div className="content-stretch flex h-[38px] items-center overflow-clip relative shrink-0 w-[633px]" data-name="Row">
              <div className="bg-[#f6f7f9] content-stretch flex flex-col h-[38px] items-start justify-center relative shrink-0 w-[155px]" data-name="Cell">
                <div aria-hidden="true" className="absolute border-[#dde3ec] border-l border-solid border-t inset-0 pointer-events-none" />
                <BackgroundImage2>
                  <div className="content-stretch flex items-center relative shrink-0">
                    <p className="font-['DM_Sans:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#28415c] text-[12px] tracking-[-0.5px] w-[111px]" style={{ fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" }}>
                      Proprietário do lead
                    </p>
                    <ButtonSymbolBackgroundImageAndText text="􀆈" />
                  </div>
                </BackgroundImage2>
              </div>
              <div className="bg-[#f6f7f9] content-stretch flex flex-col h-full items-start justify-center relative shrink-0 w-[132px]" data-name="Cell">
                <div aria-hidden="true" className="absolute border-[#dde3ec] border-l border-solid border-t inset-0 pointer-events-none" />
                <BackgroundImage2>
                  <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative">
                    <p className="font-['DM_Sans:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#28415c] text-[12px] tracking-[-0.5px] w-[92px]" style={{ fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" }}>
                      Nome do Lead
                    </p>
                    <ButtonSymbolBackgroundImageAndText text="􀆈" />
                  </div>
                </BackgroundImage2>
              </div>
              <div className="bg-[#f6f7f9] content-stretch flex flex-col h-full items-start justify-center relative shrink-0 w-[135px]" data-name="Cell">
                <div aria-hidden="true" className="absolute border-[#dde3ec] border-l border-solid border-t inset-0 pointer-events-none" />
                <BackgroundImage2>
                  <div className="content-stretch flex items-center relative shrink-0 text-[#28415c] w-[123px]">
                    <p className="font-['DM_Sans:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] tracking-[-0.5px] w-[95px]" style={{ fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" }}>
                      Última atividade
                    </p>
                    <BackgroundImageAndText1 text="􀆈" />
                  </div>
                </BackgroundImage2>
              </div>
              <div className="bg-[#f6f7f9] content-stretch flex flex-col h-full items-start justify-center relative shrink-0 w-[114px]" data-name="Cell">
                <div aria-hidden="true" className="absolute border-[#dde3ec] border-l border-solid border-t inset-0 pointer-events-none" />
                <BackgroundImage2>
                  <div className="content-stretch flex items-center relative shrink-0 text-[#28415c] w-[102px]">
                    <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.3] not-italic relative shrink-0 text-[12px] w-[74px]">Lead Score</p>
                    <BackgroundImageAndText1 text="􀆈" />
                  </div>
                </BackgroundImage2>
              </div>
              <div className="bg-[#f6f7f9] content-stretch flex flex-col h-full items-start justify-center relative shrink-0 w-[97px]" data-name="Cell">
                <div aria-hidden="true" className="absolute border-[#dde3ec] border-l border-solid border-t inset-0 pointer-events-none" />
                <BackgroundImage2>
                  <div className="content-stretch flex items-center relative shrink-0 text-[#28415c] w-[85px]">
                    <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.3] not-italic relative shrink-0 text-[12px] w-[57px]">Status</p>
                    <BackgroundImageAndText1 text="􀆈" />
                  </div>
                </BackgroundImage2>
              </div>
            </div>
            <div className="bg-white content-stretch flex h-[31px] items-start overflow-clip relative shrink-0 w-full" data-name="Row">
              <CellBackgroundImage />
              <CellBackgroundImage1 />
              <CellBackgroundImage2 />
              <CellBackgroundImage3 />
              <div className="bg-white content-stretch flex flex-[1_0_0] flex-col h-full items-start justify-center min-h-px min-w-px relative" data-name="Cell">
                <div aria-hidden="true" className="absolute border-[#dde3ec] border-l border-solid border-t inset-0 pointer-events-none" />
                <ContentBackgroundImageAndText text="Novo" />
              </div>
            </div>
            <div className="bg-white content-stretch flex h-[31px] items-start overflow-clip relative shrink-0 w-full" data-name="Row">
              <CellBackgroundImage />
              <CellBackgroundImage1 />
              <CellBackgroundImage2 />
              <CellBackgroundImage3 />
              <div className="bg-white content-stretch flex flex-[1_0_0] flex-col h-full items-start justify-center min-h-px min-w-px relative" data-name="Cell">
                <div aria-hidden="true" className="absolute border-[#dde3ec] border-l border-solid border-t inset-0 pointer-events-none" />
                <ContentBackgroundImageAndText text="Em contato" />
              </div>
            </div>
            <RowBackgroundImage />
            <RowBackgroundImage />
            <RowBackgroundImage />
            <RowBackgroundImage />
            <RowBackgroundImage />
            <RowBackgroundImage />
            <RowBackgroundImage />
            <RowBackgroundImage />
            <RowBackgroundImage />
          </div>
          <div aria-hidden="true" className="absolute border border-[#dde3ec] border-solid inset-0 pointer-events-none rounded-[4px]" />
        </div>
      </div>
      <div className="absolute content-stretch flex gap-[15px] items-center left-[454px] top-[7px]">
        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
          <div className="col-1 ml-0 mt-px relative row-1 size-[16px]" data-name="icon_1_spreadsheet_x16 1 [Vectorized]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
              <g clipPath="url(#clip0_74_727)" id="icon_1_spreadsheet_x16 1 [Vectorized]">
                <path d={svgPaths.p4f35140} fill="var(--fill-0, #29A86B)" id="Vector" />
                <path d={svgPaths.pc02cb80} fill="var(--fill-0, white)" id="Vector_2" />
                <path d={svgPaths.p12f4c580} fill="var(--fill-0, #29A86B)" id="Vector_3" />
                <path d={svgPaths.pcd11e00} fill="var(--fill-0, white)" id="Vector_4" />
                <path d={svgPaths.p10a564b0} fill="var(--fill-0, white)" id="Vector_5" />
                <path d={svgPaths.pa390780} fill="var(--fill-0, white)" id="Vector_6" />
                <path d={svgPaths.pf158000} fill="var(--fill-0, white)" id="Vector_7" />
                <path d={svgPaths.p2e37a200} fill="var(--fill-0, white)" id="Vector_8" />
                <path d={svgPaths.p37ad3c80} fill="var(--fill-0, #29A86B)" id="Vector_9" />
                <path d={svgPaths.p1e376af0} fill="var(--fill-0, #29A86B)" id="Vector_10" />
                <path d={svgPaths.p3f8c8000} fill="var(--fill-0, #29A86B)" id="Vector_11" />
                <path d={svgPaths.p3a70e00} fill="var(--fill-0, white)" id="Vector_12" />
                <path d={svgPaths.p36298c0} fill="var(--fill-0, white)" id="Vector_13" />
                <path d={svgPaths.p2b554f00} fill="var(--fill-0, #29A86B)" id="Vector_14" />
                <path d={svgPaths.p18abb580} fill="var(--fill-0, #29A86B)" id="Vector_15" />
                <path d={svgPaths.p2f65a200} fill="var(--fill-0, #29A86B)" id="Vector_16" />
                <path d={svgPaths.p25cd8c80} fill="var(--fill-0, #29A86B)" id="Vector_17" />
                <path d={svgPaths.p2b276900} fill="var(--fill-0, #29A86B)" id="Vector_18" />
                <path d={svgPaths.p247a6600} fill="var(--fill-0, #29A86B)" id="Vector_19" />
                <path d={svgPaths.p1ef25b30} fill="var(--fill-0, #29A86B)" id="Vector_20" />
                <path d={svgPaths.p3b43ca00} fill="var(--fill-0, #29A86B)" id="Vector_21" />
                <path d={svgPaths.p4712280} fill="var(--fill-0, #29A86B)" id="Vector_22" />
                <path d={svgPaths.p394a3580} fill="var(--fill-0, #29A86B)" id="Vector_23" />
                <path d={svgPaths.p434ab00} fill="var(--fill-0, #29A86B)" id="Vector_24" />
                <path d={svgPaths.p307a2800} fill="var(--fill-0, #29A86B)" id="Vector_25" />
                <path d={svgPaths.p9881180} fill="var(--fill-0, #29A86B)" id="Vector_26" />
                <path d={svgPaths.pdc9a080} fill="var(--fill-0, #29A86B)" id="Vector_27" />
                <path d={svgPaths.pb4ade00} fill="var(--fill-0, #29A86B)" id="Vector_28" />
              </g>
              <defs>
                <clipPath id="clip0_74_727">
                  <rect fill="white" height="16" width="16" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <BackgroundImageAndText2 text="Nome da Planilha" additionalClassNames="ml-[25px] whitespace-nowrap" />
        </div>
        <Frame246BackgroundImage />
        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
          <BackgroundImageAndText2 text="Sincronização" additionalClassNames="ml-0 whitespace-nowrap" />
          <ToggleBackgroundImage additionalClassNames="ml-[89px] w-[34px]" />
        </div>
        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
          <BackgroundImageAndText2 text="Relatório Público" additionalClassNames="ml-0 w-[97.256px]" />
          <ToggleBackgroundImage additionalClassNames="ml-[99.49px] w-[38.008px]" />
        </div>
        <Frame246BackgroundImage />
        <div className="bg-[#f6f7f9] content-stretch flex gap-[10px] h-[40px] items-center px-[10px] relative rounded-[100px] shrink-0" data-name="Menu de ações - Tabela/Default">
          <MenuDeAcoesTabelaDefaultButtonBackgroundImageAndText text="􀈎" />
          <Button1 className="relative shrink-0 size-[32px]" />
          <Button className="relative shrink-0 size-[32px]" />
          <MenuDeAcoesTabelaDefaultButtonBackgroundImageAndText text="􀆄" />
        </div>
      </div>
      <div className="absolute content-stretch flex gap-[25px] items-start leading-[0] left-[12px] top-[69px]">
        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
          <BackgroundImageAndText2 text="Tipo de relatório" additionalClassNames="ml-0 whitespace-nowrap" />
          <ButtonTextBackgroundImage additionalClassNames="bg-[#dde3ec] ml-[103px]">
            <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center relative shrink-0 text-[#4e6987] text-[12px] w-[22px]" style={{ fontVariationSettings: "'wdth' 100", fontFeatureSettings: "'ss15'" }}>
              <p className="leading-[22px]">􀣔</p>
            </div>
            <BackgroundImageAndText text="atividades" additionalClassNames="text-[#28415c]" />
          </ButtonTextBackgroundImage>
          <div className="col-1 h-0 ml-[52px] mt-[38px] relative row-1 w-[51px]">
            <div className="absolute inset-[-5.52px_-1.47%_-5.52px_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 51.75 11.0459">
                <path d={svgPaths.p1d20ee80} fill="var(--stroke-0, #98989D)" id="Arrow 1" />
              </svg>
            </div>
          </div>
          <ButtonTextBackgroundImage additionalClassNames="bg-[#feedca] ml-0">
            <div className="flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center relative shrink-0 text-[#eac23d] text-[12px] w-[22px]" style={{ fontVariationSettings: "'wdth' 100" }}>
              <p className="leading-[22px]">􀊴</p>
            </div>
            <BackgroundImageAndText text="LEADS" additionalClassNames="text-[#42350a]" />
          </ButtonTextBackgroundImage>
        </div>
        <div className="font-['DM_Sans:Medium',sans-serif] grid-cols-[max-content] grid-rows-[max-content] inline-grid not-italic place-items-start relative shrink-0 text-[#4e6987] tracking-[-0.5px] whitespace-nowrap">
          <div className="col-1 flex flex-col justify-center ml-0 mt-0 relative row-1 text-[12px]" style={{ fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" }}>
            <p className="leading-[17px]">Número de registros</p>
          </div>
          <div className="col-1 flex flex-col justify-center ml-0 mt-[27px] relative row-1 text-[18px]" style={{ fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" }}>
            <p className="leading-[22px]">11</p>
          </div>
        </div>
      </div>
    </div>
  );
}