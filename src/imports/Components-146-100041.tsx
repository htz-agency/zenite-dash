import clsx from "clsx";
type SankeyMasterHelperProps = {
  text: string;
  text1: string;
  additionalClassNames?: string;
};

function SankeyMasterHelper({ text, text1, additionalClassNames = "" }: SankeyMasterHelperProps) {
  return (
    <div className={clsx("content-stretch flex flex-col items-start not-italic overflow-clip relative shrink-0 w-[196px]", additionalClassNames)}>
      <p className="font-['IBM_Plex_Sans:Medium',sans-serif] leading-[1.28] relative shrink-0 text-[#263238] text-[20px] tracking-[0.15px] w-full">{text}</p>
      <p className="font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] relative shrink-0 text-[#607080] text-[16px] tracking-[0.44px] w-full">{text1}</p>
    </div>
  );
}

export default function Components() {
  return (
    <div className="relative size-full" data-name="Components">
      <div className="absolute left-0 top-[48px]" data-name="Sankey Master">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center relative">
            <SankeyMasterHelper text="Chartovshina" text1="Create charts painlessly" additionalClassNames="text-right" />
            <div className="flex flex-row items-center self-stretch">
              <div className="bg-[#f368e0] h-full rounded-[2px] shrink-0 w-[16px]" data-name="Body" />
            </div>
            <SankeyMasterHelper text="Chartovshina" text1="Create charts painlessly" />
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['IBM_Plex_Sans:Regular','Noto_Sans_Symbols2:Regular',sans-serif] justify-center leading-[0] left-[59px] not-italic text-[#607080] text-[16px] text-center top-[12px] tracking-[0.44px] whitespace-nowrap">
        <p className="leading-[24px]">❖ Components</p>
      </div>
    </div>
  );
}