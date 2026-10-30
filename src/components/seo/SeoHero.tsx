import type { ReactNode } from "react";
import Section from "@/components/landing/Section";
import { AddToShopify } from "./ui";

/* The dark top band: sits under the fixed navbar like the home's hero, with
   the promise on the left and the product (or the cards) on the right. */
export default function SeoHero({
  eyebrow,
  icon,
  title,
  intro,
  secondary,
  aside,
}: {
  eyebrow: string;
  icon?: string;
  title: string;
  intro: string;
  secondary?: { href: string; label: string };
  aside?: ReactNode;
}) {
  return (
    <header className="seo-hero text-white">
      <Section
        as="div"
        innerClassName={`grid grid-cols-1 items-center gap-12 pt-28 pb-14 lg:gap-16 lg:pt-36 lg:pb-24 ${
          aside ? "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]" : ""
        }`}
      >
        <div className="hero-rise">
          <p className="inline-flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.06em] text-white/55">
            {icon ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={icon} alt="" width={20} height={20} className="h-5 w-5 object-contain" />
            ) : (
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" aria-hidden="true" />
            )}
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-[17ch] text-[38px] font-[650] leading-[1.04] tracking-[-0.028em] [text-wrap:balance] sm:text-[48px] lg:text-[60px]">
            {title}
          </h1>
          <p className="mt-6 max-w-[56ch] text-[16px] leading-[1.65] text-white/70 lg:text-[17px]">{intro}</p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <AddToShopify size="lg" />
            {secondary && (
              <a
                href={secondary.href}
                className="text-[14.5px] font-medium text-white/80 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
              >
                {secondary.label}
              </a>
            )}
          </div>
          <p className="mt-5 text-[13px] text-white/50">7 days free on every paid plan. Free up to 100 cards.</p>
        </div>
        {aside && <div className="mx-auto w-full max-w-[340px] sm:max-w-[400px] lg:max-w-none">{aside}</div>}
      </Section>
    </header>
  );
}
