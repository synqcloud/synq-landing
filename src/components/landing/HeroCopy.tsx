"use client";

import { useTranslations } from "next-intl";

/* The hero's words and buttons, shared by every hero layout so the copy
   stays one thing. align: where the block sits; tone: on a dark or light ground */
export default function HeroCopy({
  align = "left",
  tone = "dark",
  className = "",
}: {
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  const t = useTranslations("hero");
  const tl = useTranslations("landing");
  const tn = useTranslations("nav");
  const center = align === "center";
  const dark = tone === "dark";

  const scrollToContent = () => {
    const next = document.getElementById("new-stock");
    if (!next) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    next.scrollIntoView({ behavior: calm ? "auto" : "smooth" });
  };

  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-[640px] ${className}`}>
      <h1
        className={`mb-5 text-4xl font-medium leading-[1.08] tracking-[-0.02em] hero-rise md:text-[56px] lg:text-[clamp(56px,4.6vw,76px)] lg:leading-[1.02] lg:tracking-[-0.032em] ${
          dark ? "text-white" : "text-[var(--color-ink)]"
        }`}
      >
        {t("title")}
      </h1>
      <p
        className={`mb-8 max-w-[440px] text-[16px] leading-relaxed animate-fade-up lg:text-[17px] ${center ? "mx-auto" : ""} ${
          dark ? "text-white/72" : "text-[var(--color-ink-2)]"
        }`}
        style={{ animationDelay: "70ms" }}
      >
        {t("subtitle")}
      </p>
      <div
        className={`flex flex-wrap items-center gap-3 animate-fade-up ${center ? "justify-center" : ""}`}
        style={{ animationDelay: "140ms" }}
      >
        <a
          href="https://apps.shopify.com/synq-tcg-card-manager"
          target="_blank"
          rel="noreferrer"
          className={`inline-flex h-11 items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 text-[14px] font-semibold text-[var(--color-accent-ink)] transition-colors hover:bg-[#b8ec2a] focus-visible:outline-2 focus-visible:outline-offset-2 ${
            dark ? "focus-visible:outline-white" : "focus-visible:outline-[var(--color-ink)]"
          }`}
        >
          {tn("cta")}
          <span className="sr-only"> ({tl("newTab")})</span>
        </a>
        <button
          type="button"
          onClick={scrollToContent}
          className={`inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${
            dark
              ? "focus-visible:outline-white border border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
              : "focus-visible:outline-[var(--color-ink)] bg-white text-[var(--color-ink)] shadow-[inset_0_0_0_1.5px_rgb(0_0_0/0.14)] hover:shadow-[inset_0_0_0_1.5px_var(--color-ink)]"
          }`}
        >
          {t("cta")}
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
