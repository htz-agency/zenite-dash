import { type ReactNode, type ButtonHTMLAttributes } from "react";

interface PillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  children: ReactNode;
  variant?: "default" | "primary" | "secondary";
  size?: "sm" | "default";
}

export function PillButton({
  icon,
  children,
  variant = "default",
  size = "default",
  className = "",
  disabled,
  ...props
}: PillButtonProps) {
  // Variantes de cor
  const variantStyles = {
    default: {
      normal: "bg-[#dcf0ff] text-[#28415c]",
      hover: "hover:bg-[#bcdaf1]",
    },
    primary: {
      normal: "bg-[#3CCEA7] text-white",
      hover: "hover:bg-[#2fb893]",
    },
    secondary: {
      normal: "bg-[#f0f2f5] text-[#4E6987]",
      hover: "hover:bg-[#e0e3e8]",
    },
  };

  // Tamanhos
  const sizeStyles = {
    default: {
      height: "h-[40px]",
      padding: icon ? "px-4" : "px-5",
      gap: "gap-[3px]",
      fontSize: 15,
      letterSpacing: -0.5,
      fontWeight: 500,
    },
    sm: {
      height: "h-[30px]",
      padding: icon ? "px-3" : "px-[14px]",
      gap: "gap-1",
      fontSize: 11,
      letterSpacing: -0.3,
      fontWeight: 600,
    },
  };

  const styles = sizeStyles[size];
  const colors = variantStyles[variant];

  return (
    <button
      className={`group/pill relative inline-flex items-center justify-center rounded-[100px] transition-all duration-150 ${styles.height} ${styles.padding} ${styles.gap} ${colors.normal} ${!disabled ? `${colors.hover} hover:shadow-[0_2px_4px_rgba(18,34,50,0.3)] hover:backdrop-blur-[50px]` : "opacity-50 cursor-not-allowed"} ${className}`}
      style={{
        fontSize: styles.fontSize,
        fontWeight: styles.fontWeight,
        letterSpacing: styles.letterSpacing,
        ...(size === "sm" ? { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" } : {}),
      }}
      disabled={disabled}
      {...props}
    >
      {/* Overlay de active state */}
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-0 group-active/pill:opacity-100 transition-opacity duration-100"
        style={{
          backgroundImage: "radial-gradient(ellipse at 50% 100%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.215) 100%)",
        }}
      />
      
      {/* Conteúdo */}
      {icon && <span className="relative z-10 flex items-center justify-center">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
