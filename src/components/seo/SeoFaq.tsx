"use client";

import { useState } from "react";
import Section from "@/components/landing/Section";
import type { Faq } from "@/content/games";

/* The home's FAQ accordion, fed from the page's own questions. Answers stay
   in the DOM when closed (they only collapse), so they are readable without
   a click. */

const SUPPORT = "help@synq.cards";

export default function SeoFaq({ title, body, items }: { title: string; body: string; items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-title" className="w-full scroll-mt-24 bg-[var(--color-canvas)] text-[var(--color-ink)]">
      <Section as="div" innerClassName="pb-24 pt-4 lg:pb-32 lg:pt-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2
              id="faq-title"
              className="max-w-[16ch] text-[32px] font-[650] leading-[1.05] tracking-[-0.025em] [text-wrap:balance] lg:text-[44px]"
            >
              {title}
            </h2>
            <p className="mt-5 max-w-[38ch] text-[16px] leading-[1.6] text-[var(--color-ink-2)]">{body}</p>
            <a href={`mailto:${SUPPORT}`} className="synq-card synq-card-hover group mt-8 flex items-center gap-4 p-5">
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-[var(--color-ink)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/synq-icon.png" alt="" width={20} height={20} className="h-5 w-5 object-contain" style={{ filter: "brightness(0) invert(1)" }} />
              </span>
              <span className="flex min-w-0 flex-col leading-[1.35]">
                <b className="text-[15px] font-[650]">Write to us.</b>
                <span className="text-[14px] text-[var(--color-ink-2)]">The founder answers, usually the same day.</span>
                <span className="mt-1 text-[14px] font-semibold underline decoration-black/20 underline-offset-4 transition-colors group-hover:decoration-[var(--color-ink)]">
                  {SUPPORT}
                </span>
              </span>
            </a>
          </div>

          <ul className="synq-card flex flex-col p-2">
            {items.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.q} className="faq-item" data-open={isOpen || undefined}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${i}`}
                      id={`faq-q-${i}`}
                      className="flex w-full items-center justify-between gap-6 rounded-[12px] px-4 py-4 text-left text-[16px] font-[600] tracking-[-0.01em] transition-colors hover:bg-[var(--color-well)] focus-visible:outline-2 focus-visible:outline-[var(--color-ink)] lg:px-5 lg:text-[17px]"
                    >
                      <span>{item.q}</span>
                      <span
                        className={`faq-icon flex h-7 w-7 flex-none items-center justify-center rounded-full ${
                          isOpen ? "bg-[var(--color-ink)] text-white" : "bg-[var(--color-well)] text-[var(--color-ink-2)]"
                        }`}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-a-${i}`}
                    role="region"
                    aria-labelledby={`faq-q-${i}`}
                    className="faq-answer grid"
                    /* collapsed: still in the HTML for crawlers, but out of the
                       accessibility tree and the tab order */
                    aria-hidden={!isOpen || undefined}
                    inert={!isOpen}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p className="max-w-[60ch] px-4 pb-5 text-[15px] leading-[1.65] text-[var(--color-ink-2)] lg:px-5">{item.a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </Section>
    </section>
  );
}
