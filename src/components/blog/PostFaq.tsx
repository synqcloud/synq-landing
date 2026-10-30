import type { FaqItem } from "@/lib/blog";

/* The post's questions, from its frontmatter. Native <details> so every
   answer is in the HTML (they also feed the FAQPage JSON-LD). */
export default function PostFaq({ items }: { items?: FaqItem[] }) {
  if (!items || items.length === 0) return null;
  return (
    <section aria-labelledby="faq" className="not-prose">
      <h2 id="faq" className="scroll-mt-28 text-[26px] font-[650] leading-[1.2] tracking-[-0.02em] text-[var(--color-ink)]">
        Frequently asked questions
      </h2>
      <div className="synq-card mt-6 flex flex-col p-2">
        {items.map((item) => (
          <details key={item.question} className="blog-faq group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-[12px] px-4 py-4 text-left text-[16px] font-[600] tracking-[-0.01em] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-well)] lg:px-5">
              <span>{item.question}</span>
              <span className="blog-faq-icon flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[var(--color-well)] text-[var(--color-ink-2)]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </summary>
            <p className="max-w-[62ch] px-4 pb-5 text-[15px] leading-[1.65] text-[var(--color-ink-2)] lg:px-5">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
