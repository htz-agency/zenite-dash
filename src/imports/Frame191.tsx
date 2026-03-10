import svgPaths from "./svg-vfw7l2tgwf";

export default function Frame() {
  return (
    <div className="content-stretch flex gap-[9px] items-end relative size-full">
      <div className="relative shrink-0 size-[16px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
          <g id="Group 211">
            <rect fill="var(--fill-0, #29A86B)" height="16" id="Rectangle 94" rx="2" width="16" />
            <path d={svgPaths.pd021b00} fill="var(--fill-0, white)" id="Union" />
          </g>
        </svg>
      </div>
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4e6987] text-[12px] tracking-[-0.5px] whitespace-nowrap" style={{ fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" }}>
        <p className="leading-[17px]">Nome da Planilha</p>
      </div>
    </div>
  );
}