function Helper() {
  return (
    <svg fill="none" preserveAspectRatio="none" viewBox="0 0 32 32" className="absolute block size-full">
      <path d="M16 0L32 16L16 32L0 16L16 0Z" fill="var(--fill-0, white)" id="Polygon BG" />
    </svg>
  );
}

export default function Components() {
  return (
    <div className="relative size-full" data-name="Components">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['IBM_Plex_Sans:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] left-[59px] not-italic text-[#607080] text-[16px] text-center top-[12px] tracking-[0.44px] whitespace-nowrap">
        <p className="leading-[24px]">❖ Components</p>
      </div>
      <div className="absolute left-0 size-[32px] top-[48px]" data-name="Rho 5">
        <Helper />
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <path d="M16 0L32 16L16 32L0 16L16 0Z" fill="var(--fill-0, #1B314B)" id="Polygon Fill" />
        </svg>
        <div className="absolute capitalize flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[12px] text-center text-white tracking-[0.4px]">
          <p className="leading-[16px]">5</p>
        </div>
      </div>
      <div className="absolute left-0 size-[32px] top-[88px]" data-name="Rho 4">
        <Helper />
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <path d="M16 0L32 16L16 32L0 16L16 0Z" fill="var(--fill-0, #1B314B)" id="Polygon Fill" opacity="0.7" />
        </svg>
        <div className="absolute capitalize flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[12px] text-center text-white tracking-[0.4px]">
          <p className="leading-[16px]">4</p>
        </div>
      </div>
      <div className="absolute left-0 size-[32px] top-[130px]" data-name="Rho 3">
        <Helper />
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <path d="M16 0L32 16L16 32L0 16L16 0Z" fill="var(--fill-0, #1B314B)" id="Polygon Fill" opacity="0.5" />
        </svg>
        <div className="absolute capitalize flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[12px] text-center text-white tracking-[0.4px]">
          <p className="leading-[16px]">3</p>
        </div>
      </div>
      <div className="absolute left-0 size-[32px] top-[170px]" data-name="Rho 2">
        <Helper />
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <path d="M16 0L32 16L16 32L0 16L16 0Z" fill="var(--fill-0, #1B314B)" id="Polygon Fill" opacity="0.35" />
        </svg>
        <div className="absolute capitalize flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[12px] text-center text-white tracking-[0.4px]">
          <p className="leading-[16px]">2</p>
        </div>
      </div>
      <div className="absolute left-0 size-[32px] top-[210px]" data-name="Rho 1">
        <Helper />
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <path d="M16 0L32 16L16 32L0 16L16 0Z" fill="var(--fill-0, #1B314B)" id="Polygon Fill" opacity="0.25" />
        </svg>
        <div className="absolute capitalize flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[12px] text-center text-white tracking-[0.4px]">
          <p className="leading-[16px]">1</p>
        </div>
      </div>
      <div className="absolute left-0 size-[32px] top-[248px]" data-name="Rho 0">
        <Helper />
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <path d="M16 0L32 16L16 32L0 16L16 0Z" fill="var(--fill-0, #1B314B)" id="Polygon Fill" opacity="0.15" />
        </svg>
        <div className="absolute capitalize flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[12px] text-center text-white tracking-[0.4px]">
          <p className="leading-[16px]">0</p>
        </div>
      </div>
    </div>
  );
}