import Image from "next/image";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className = "", size = "md" }: LogoProps) {
  const config = {
    sm: { px: 20, textClass: "text-[14px]" },
    md: { px: 24, textClass: "text-[15px]" },
    lg: { px: 28, textClass: "text-[18px]" },
  }[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/brand/synq-icon.png"
        alt=""
        width={config.px}
        height={config.px}
        aria-hidden
        priority
      />
      <span
        className={`font-semibold ${config.textClass} tracking-[-0.02em] leading-none text-foreground`}
        style={{ fontFamily: "var(--font-sans, ui-sans-serif), sans-serif" }}
      >
        Synq
      </span>
    </div>
  );
}
