import clsx from "clsx";
import img3DAvatars29 from "figma:asset/d5fb6bc139a3da5bc43ab0601942a4cf33722fa1.png";
import svgPaths from "./svg-5a2p46roq8";
type TabBackgroundImageProps = {
  additionalClassNames?: string;
  text: string;
  additionalClassNames1?: string;
};

function TabBackgroundImage({ children, additionalClassNames = "", text, additionalClassNames1 = "" }: React.PropsWithChildren<TabBackgroundImageProps>) {
  return (
    <div className={clsx("h-[36px] relative rounded-br-[100px] rounded-tr-[100px] shrink-0 w-[198px]", additionalClassNames)}>
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center pl-[14px] pr-[28px] py-[10px] relative size-full">
          <p style={{ fontVariationSettings: "'opsz' 14", fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" }} className={clsx("font-['DM_Sans:Medium',sans-serif] font-medium leading-[22px] overflow-hidden relative shrink-0 text-[15px] text-ellipsis tracking-[-0.5px] whitespace-nowrap", additionalClassNames)}>
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}
type LeadBackgroundImageProps = {
  additionalClassNames?: string;
};

function LeadBackgroundImage({ additionalClassNames = "" }: LeadBackgroundImageProps) {
  return (
    <div style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties} className={clsx("absolute flex h-[0.89px] items-center justify-center left-[267px] w-[799px]", additionalClassNames)}>
      <div className="flex-none rotate-[-0.06deg] skew-x-[-0.06deg]">
        <div className="h-0 relative w-[799.001px]">
          <div className="absolute inset-[-1.5px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 799.001 1.5">
              <line id="Line 20" stroke="var(--stroke-0, #DDE3EC)" strokeWidth="1.5" x2="799.001" y1="0.75" y2="0.75" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame204BackgroundImage() {
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
type ButtonSymbolBackgroundImageAndTextProps = {
  text: string;
};

function ButtonSymbolBackgroundImageAndText({ text }: ButtonSymbolBackgroundImageAndTextProps) {
  return (
    <div className="absolute inset-0 overflow-clip rounded-[500px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] left-1/2 size-[32px] text-[#28415c] text-[15px] text-center top-1/2" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px]">{text}</p>
      </div>
    </div>
  );
}
type BackgroundImageAndText5Props = {
  text: string;
};

function BackgroundImageAndText5({ text }: BackgroundImageAndText5Props) {
  return (
    <div className="col-1 ml-0 mt-0 relative row-1 size-[26px]">
      <ButtonSymbolBackgroundImageAndText text={text} />
    </div>
  );
}
type BackgroundImageAndText4Props = {
  text: string;
  additionalClassNames?: string;
};

function BackgroundImageAndText4({ text, additionalClassNames = "" }: BackgroundImageAndText4Props) {
  return (
    <div style={{ fontVariationSettings: "'opsz' 14", fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" }} className={additionalClassNames}>
      <p className="leading-[17px]">{text}</p>
    </div>
  );
}
type BackgroundImageAndText3Props = {
  text: string;
  additionalClassNames?: string;
};

function BackgroundImageAndText3({ text, additionalClassNames = "" }: BackgroundImageAndText3Props) {
  return <BackgroundImageAndText4 text={text} additionalClassNames={clsx("flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] text-[#07abde] text-[12px] tracking-[-0.5px]", additionalClassNames)} />;
}
type BackgroundImageAndText2Props = {
  text: string;
  additionalClassNames?: string;
};

function BackgroundImageAndText2({ text, additionalClassNames = "" }: BackgroundImageAndText2Props) {
  return <BackgroundImageAndText4 text={text} additionalClassNames={clsx("col-1 flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium h-[26px] justify-center mt-0 relative row-1 text-[#28415c] text-[12px] tracking-[-0.5px]", additionalClassNames)} />;
}
type BackgroundImageAndText1Props = {
  text: string;
  additionalClassNames?: string;
};

function BackgroundImageAndText1({ text, additionalClassNames = "" }: BackgroundImageAndText1Props) {
  return <BackgroundImageAndText4 text={text} additionalClassNames={clsx("absolute flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] text-[#28415c] text-[12px] tracking-[-0.5px]", additionalClassNames)} />;
}
type BackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function BackgroundImageAndText({ text, additionalClassNames = "" }: BackgroundImageAndTextProps) {
  return (
    <div className={clsx("absolute content-stretch flex gap-[8px] items-center", additionalClassNames)}>
      <div className="relative shrink-0 size-[18px]" data-name="3D Avatars / 29">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img3DAvatars29} />
      </div>
      <BackgroundImageAndText3 text={text} additionalClassNames="relative shrink-0 whitespace-nowrap" />
    </div>
  );
}
type Frame229BackgroundImageAndText1Props = {
  text: string;
  additionalClassNames?: string;
};

function Frame229BackgroundImageAndText1({ text, additionalClassNames = "" }: Frame229BackgroundImageAndText1Props) {
  return (
    <div style={{ fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" }} className={clsx("flex flex-col font-['DM_Sans:Bold',sans-serif] justify-center not-italic overflow-hidden relative shrink-0 text-[10px] tracking-[0.5px] uppercase", additionalClassNames)}>
      <p className="leading-[20px] overflow-hidden">{text}</p>
    </div>
  );
}
type Frame229BackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function Frame229BackgroundImageAndText({ text, additionalClassNames = "" }: Frame229BackgroundImageAndTextProps) {
  return (
    <div style={{ fontVariationSettings: "'wdth' 100" }} className={clsx("flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center overflow-hidden relative shrink-0 text-[15px]", additionalClassNames)}>
      <p className="leading-[20px] overflow-hidden">{text}</p>
    </div>
  );
}
type BackgroundImage2Props = {
  text: string;
  text1: string;
  additionalClassNames?: string;
};

function BackgroundImage2({ text, text1, additionalClassNames = "" }: BackgroundImage2Props) {
  return (
    <div className={clsx("content-stretch flex gap-[4px] items-center pr-[28px] py-[10px] relative size-full", additionalClassNames)}>
      <div className="flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] h-full justify-center leading-[0] relative shrink-0 text-[19px] text-center w-[44px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px]">{text}</p>
      </div>
      <p style={{ fontVariationSettings: "'opsz' 14", fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" }} className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[22px] overflow-hidden relative shrink-0 text-[15px] text-ellipsis tracking-[-0.5px] whitespace-nowrap ">
        {text1}
      </p>
    </div>
  );
}
type Frame241TabBackgroundImageProps = {
  text: string;
  text1: string;
};

function Frame241TabBackgroundImage({ text, text1 }: Frame241TabBackgroundImageProps) {
  return (
    <div className="h-[36px] relative rounded-[100px] shrink-0 w-[227px]">
      <div className="flex flex-row items-center size-full">
        <BackgroundImage2 text={text} text1={text1} additionalClassNames="text-[#4e6987]" />
      </div>
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
type CheckboxProps = {
  className?: string;
  selected?: boolean;
  state?: "Idle" | "Hover";
};

function Checkbox({ className, selected = false, state = "Idle" }: CheckboxProps) {
  const isIdleAndSelected = state === "Idle" && selected;
  const isNotSelectedAndIsHoverOrIdle = !selected && ["Hover", "Idle"].includes(state);
  const isSelectedAndIsHoverOrIdle = selected && ["Hover", "Idle"].includes(state);
  return (
    <div className={className || `overflow-clip relative rounded-[100px] size-[16px] ${state === "Idle" && !selected ? "backdrop-blur-[20px]" : isIdleAndSelected ? "backdrop-blur-[20px] bg-[#3ccea7]" : ""}`} style={state === "Hover" && !selected ? { backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 16 16\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'0.4000000059604645\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(-3.6556e-9 -1.2571 1.2571 -3.6556e-9 8 16)\\'><stop stop-color=\\'rgba(60,206,167,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(109,218,189,0.75)\\' offset=\\'0.25\\'/><stop stop-color=\\'rgba(158,231,211,0.5)\\' offset=\\'0.5\\'/><stop stop-color=\\'rgba(255,255,255,0)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" } : state === "Hover" && selected ? { backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 16 16\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'0.20000000298023224\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(-3.6556e-9 -1.2571 1.2571 -3.6556e-9 8 16)\\'><stop stop-color=\\'rgba(255,255,255,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(255,255,255,0)\\' offset=\\'1\\'/></radialGradient></defs></svg>'), linear-gradient(90deg, rgb(60, 206, 167) 0%, rgb(60, 206, 167) 100%)" } : undefined}>
      <div aria-hidden={isNotSelectedAndIsHoverOrIdle ? "true" : undefined} className={`absolute ${isNotSelectedAndIsHoverOrIdle ? "border-[#28415c] border-[1.5px] border-solid inset-0 pointer-events-none rounded-[100px]" : isIdleAndSelected ? '-translate-x-1/2 -translate-y-1/2 flex flex-col font-["SF_Pro:Bold",sans-serif] font-bold justify-center leading-[0] left-1/2 size-[28px] text-[#fefefe] text-[10px] text-center top-1/2' : 'flex flex-col font-["SF_Pro:Bold",sans-serif] font-bold inset-0 justify-center leading-[0] text-[#fefefe] text-[10px] text-center'}`} style={isSelectedAndIsHoverOrIdle ? { fontVariationSettings: "'wdth' 100" } : undefined}>
        {isSelectedAndIsHoverOrIdle && <p className="leading-[22px]">􀆅</p>}
      </div>
    </div>
  );
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
          <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] left-1/2 size-[32px] text-[#f6f7f9] text-[15px] text-center top-1/2" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[22px]">􀱋</p>
          </div>
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
      <p className="absolute font-['DM_Sans:Bold',sans-serif] leading-[24px] left-[24px] not-italic text-[#28415c] text-[19px] top-[17px] tracking-[-0.5px] whitespace-nowrap" style={{ fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" }}>
        Todos Relatórios
      </p>
      <p className="absolute font-['DM_Sans:Bold',sans-serif] leading-[20px] left-[24px] not-italic text-[#98989d] text-[8px] top-[43px] tracking-[0.5px] uppercase whitespace-nowrap" style={{ fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" }}>
        VISUALIZANDO AGORA: 4 RELATÓRIOS
      </p>
      <div className="absolute backdrop-blur-[50px] bg-[#28415c] h-[36px] left-[19px] rounded-[100px] top-[94px] w-[227px]" data-name="Tab 1">
        <div aria-hidden="true" className="absolute border-0 border-[rgba(200,207,219,0.6)] border-solid inset-0 pointer-events-none rounded-[100px] shadow-[0px_2px_4px_0px_rgba(18,34,50,0.3)]" />
        <div className="flex flex-row items-center size-full">
          <BackgroundImage2 text="􀌉" text1="Filtros Rápidos" additionalClassNames="text-[#f6f7f9]" />
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col items-start left-[19px] top-[350px]">
        <Frame241TabBackgroundImage text="􀈕" text1="Pastas" />
        <Frame241TabBackgroundImage text="􀊴" text1="Favoritos" />
        <Frame241TabBackgroundImage text="􀣋" text1="Configurações" />
      </div>
      <div className="absolute content-stretch flex flex-col gap-[8px] items-start left-[48px] top-[138px]">
        <TabBackgroundImage additionalClassNames="bg-[#dde3ec]" text="Recentes" additionalClassNames1="text-[#28415c]" />
        <TabBackgroundImage text="Criados por mim" additionalClassNames1="text-[#4e6987]" />
        <TabBackgroundImage text="Relatórios privados" additionalClassNames1="text-[#4e6987]" />
        <TabBackgroundImage text="Relatórios compartilhados" additionalClassNames1="text-[#4e6987]" />
        <TabBackgroundImage text="Todos os relatórios" additionalClassNames1="text-[#4e6987]" />
      </div>
      <div className="absolute bottom-[441px] flex h-[212px] items-center justify-center right-[1055px] w-0" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <div className="h-0 relative w-[212px]" data-name="Divider">
            <div className="absolute inset-[-0.75px_-0.35%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 213.5 1.50023">
                <path d={svgPaths.p360cce00} id="Divider" stroke="var(--stroke-0, #DDE3EC)" strokeLinecap="square" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute h-0 left-0 top-[72.06px] w-[1096px]">
        <div className="absolute inset-[-1.5px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1096 1.5">
            <line id="Line 1" stroke="var(--stroke-0, #DDE3EC)" strokeWidth="1.5" x2="1096" y1="0.75" y2="0.75" />
          </svg>
        </div>
      </div>
      <div className="absolute bg-[#f6f7f9] left-[930px] rounded-[100px] top-[15px]" data-name="Menu de ações - Tabela/Default">
        <div className="content-stretch flex gap-[10px] items-start px-[10px] relative">
          <Button1 className="relative shrink-0 size-[32px]" />
          <Button className="relative shrink-0 size-[32px]" />
          <div className="relative shrink-0 size-[32px]" data-name="Button - 􀏟">
            <ButtonSymbolBackgroundImageAndText text="􀈙" />
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex items-center left-[878px] top-[89px]">
        <div className="bg-[#f6f7f9] relative rounded-[100px] shrink-0 w-[188px]" data-name="Segmented Control">
          <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex gap-[4px] items-center justify-center p-[4px] relative w-full">
              <div className="backdrop-blur-[50px] bg-[#28415c] flex-[1_0_0] h-[36px] min-h-px min-w-px relative rounded-[20px]" data-name="Button 1">
                <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex gap-[3px] items-center justify-center leading-[0] px-[8px] relative size-full text-center text-ellipsis whitespace-nowrap">
                    <Frame229BackgroundImageAndText text="􀏤" additionalClassNames="text-[rgba(255,255,255,0.96)]" />
                    <Frame229BackgroundImageAndText1 text="TABELA" additionalClassNames="text-[#f6f7f9]" />
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[0.5px] border-[rgba(200,207,219,0.6)] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_2px_4px_0px_rgba(18,34,50,0.3)]" />
              </div>
              <div className="flex-[1_0_0] h-[36px] min-h-px min-w-px relative rounded-[100px]" data-name="Button 2">
                <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex gap-[3px] items-center justify-center leading-[0] px-[8px] relative size-full text-[#98989d] text-center text-ellipsis whitespace-nowrap">
                    <Frame229BackgroundImageAndText text="􀇷" />
                    <Frame229BackgroundImageAndText1 text="PASTA" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-0.5px_1px_0px_rgba(255,255,255,0.3),inset_0px_-0.5px_1px_0px_rgba(255,255,255,0.25),inset_1px_1.5px_4px_0px_rgba(0,0,0,0.08),inset_1px_1.5px_4px_0px_rgba(0,0,0,0.1)]" />
        </div>
      </div>
      <div className="absolute h-[26px] left-[261px] rounded-[16px] top-[148px] w-[121px]" />
      <LeadBackgroundImage additionalClassNames="top-[196px]" />
      <LeadBackgroundImage additionalClassNames="top-[230.94px]" />
      <LeadBackgroundImage additionalClassNames="top-[265.88px]" />
      <LeadBackgroundImage additionalClassNames="top-[300.83px]" />
      <LeadBackgroundImage additionalClassNames="top-[335.77px]" />
      <div className="absolute contents inset-[25.41%_6.11%_71.3%_25.09%]">
        <BackgroundImageAndText1 text="Há 20 dias" additionalClassNames="inset-[25.41%_6.11%_71.3%_86.59%]" />
        <BackgroundImageAndText text="Nome Sobrenome" additionalClassNames="inset-[25.41%_18.33%_71.3%_70.8%]" />
        <BackgroundImageAndText1 text="Leads com Atividades" additionalClassNames="inset-[25.41%_32.74%_71.3%_56.66%]" />
        <BackgroundImageAndText1 text="Nome da pasta" additionalClassNames="inset-[25.41%_45.55%_71.3%_42.43%]" />
        <BackgroundImageAndText3 text="Nome do Relatório" additionalClassNames="absolute inset-[25.41%_59.33%_71.3%_27.13%]" />
        <Checkbox className="absolute backdrop-blur-[20px] inset-[26.04%_73.48%_71.93%_25.09%] rounded-[100px]" />
      </div>
      <div className="absolute contents inset-[29.84%_6.11%_66.88%_25.09%]">
        <BackgroundImageAndText1 text="Há 20 dias" additionalClassNames="inset-[29.84%_6.11%_66.88%_86.59%]" />
        <BackgroundImageAndText text="Nome Sobrenome" additionalClassNames="inset-[29.84%_18.33%_66.88%_70.8%]" />
        <BackgroundImageAndText1 text="Oportunidades" additionalClassNames="inset-[29.84%_32.74%_66.88%_56.66%]" />
        <BackgroundImageAndText1 text="Nome da pasta" additionalClassNames="inset-[29.84%_45.55%_66.88%_42.43%]" />
        <BackgroundImageAndText3 text="Nome do Relatório" additionalClassNames="absolute inset-[29.84%_59.33%_66.88%_27.13%]" />
        <Checkbox className="absolute backdrop-blur-[20px] inset-[30.47%_73.48%_67.51%_25.09%] rounded-[100px]" />
      </div>
      <div className="absolute contents inset-[34.26%_6.11%_62.45%_25.09%]">
        <BackgroundImageAndText1 text="Há 20 dias" additionalClassNames="inset-[34.26%_6.11%_62.45%_86.59%]" />
        <BackgroundImageAndText text="Nome Sobrenome" additionalClassNames="inset-[34.26%_18.33%_62.45%_70.8%]" />
        <BackgroundImageAndText1 text="Contas com Contatos" additionalClassNames="inset-[34.26%_32.74%_62.45%_56.66%]" />
        <BackgroundImageAndText1 text="Nome da pasta" additionalClassNames="inset-[34.26%_45.55%_62.45%_42.43%]" />
        <BackgroundImageAndText3 text="Nome do Relatório" additionalClassNames="absolute inset-[34.26%_59.33%_62.45%_27.13%]" />
        <Checkbox className="absolute backdrop-blur-[20px] inset-[34.89%_73.48%_63.08%_25.09%] rounded-[100px]" />
      </div>
      <div className="absolute contents inset-[38.69%_6.11%_58.03%_25.09%]">
        <BackgroundImageAndText1 text="Há 20 dias" additionalClassNames="inset-[38.69%_6.11%_58.03%_86.59%]" />
        <BackgroundImageAndText text="Nome Sobrenome" additionalClassNames="inset-[38.69%_18.33%_58.03%_70.8%]" />
        <BackgroundImageAndText1 text="Contas com Oportuni..." additionalClassNames="inset-[38.69%_31.93%_58.03%_56.66%]" />
        <BackgroundImageAndText1 text="Nome da pasta" additionalClassNames="inset-[38.69%_45.55%_58.03%_42.43%]" />
        <BackgroundImageAndText3 text="Nome do Relatório" additionalClassNames="absolute inset-[38.69%_59.33%_58.03%_27.13%]" />
        <Checkbox className="absolute backdrop-blur-[20px] inset-[39.32%_73.48%_58.66%_25.09%] rounded-[100px]" />
      </div>
      <div className="absolute content-stretch flex gap-[8px] items-center left-[270px] top-[156px]">
        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
          <BackgroundImageAndText2 text="Nome do Relatório" additionalClassNames="ml-[29px] w-[145px]" />
          <BackgroundImageAndText5 text="􀑀" />
        </div>
        <Frame204BackgroundImage />
        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
          <BackgroundImageAndText2 text="Nome da Pasta" additionalClassNames="ml-[29px] w-[113px]" />
          <BackgroundImageAndText5 text="􀈕" />
        </div>
        <Frame204BackgroundImage />
        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
          <BackgroundImageAndText2 text="Tipo de Relatório" additionalClassNames="ml-[29px] w-[105px]" />
          <BackgroundImageAndText5 text="􀬒" />
        </div>
        <Frame204BackgroundImage />
        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
          <BackgroundImageAndText2 text="Criado por" additionalClassNames="ml-[29.5px] w-[125px]" />
          <BackgroundImageAndText5 text="􀓣" />
        </div>
        <Frame204BackgroundImage />
        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
          <BackgroundImageAndText2 text="Criado em" additionalClassNames="ml-[29px] w-[92px]" />
          <BackgroundImageAndText5 text="􀐫" />
        </div>
      </div>
    </div>
  );
}