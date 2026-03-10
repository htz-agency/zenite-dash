import { useState } from "react";
import { Atom } from "@phosphor-icons/react";
import { TuringModal } from "./TuringModal";

const TURING_GRADIENT_LOOP = "linear-gradient(90deg, #8C8CD4, #8C8CD4, #07ABDE, #3CCEA7, #07ABDE, #8C8CD4, #8C8CD4)";
const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

export function TuringButton() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group/turing fixed bottom-6 right-6 z-[9998] flex items-center gap-[8px] h-[40px] pl-[14px] pr-[18px] rounded-[500px] bg-[#F6F7F9] text-[#4E6987] hover:bg-white hover:shadow-[0_2px_12px_rgba(140,140,212,0.35),0_4px_16px_rgba(7,171,222,0.2),0_6px_20px_rgba(60,206,167,0.15)] transition-all duration-200 cursor-pointer border border-transparent"
      >
        <Atom
          size={16}
          weight="bold"
          className="text-[#4E6987] group-hover/turing:animate-[turing-icon-hover_1.5s_linear_infinite]"
        />
        <span
          className="font-semibold [-webkit-background-clip:text] [background-clip:text] [background-size:200%_100%] group-hover/turing:animate-[turing-text-hover_3s_linear_infinite] group-hover/turing:text-transparent transition-colors duration-300"
          style={{ fontSize: 13, letterSpacing: -0.3, backgroundImage: TURING_GRADIENT_LOOP, backgroundRepeat: "repeat", ...ff }}
        >
          Turing
        </span>
      </button>
      <TuringModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
