import { INSTALL_URL } from "@/lib/blog";

/* The closing call to action: an ink card with the page's one lime button.
   Also usable inside MDX as <CtaBox />, which the old posts could call. */
export default function CtaCard({
  title = "Put your cards on Shopify with market prices",
  description = "Synq adds cards to your store with their photo, set and condition, and keeps every price in line with TCGplayer market data. Paid plans start with a 7-day free trial. Free stays free up to 100 cards.",
  buttonText = "Add to Shopify",
  href = INSTALL_URL,
}: {
  title?: string;
  description?: string;
  buttonText?: string;
  href?: string;
}) {
  return (
    <aside className="blog-cta not-prose relative overflow-hidden rounded-[20px] bg-[var(--color-ink)] p-7 text-white sm:p-10">
      <div className="relative z-10 max-w-[46ch]">
        <p className="text-[24px] font-[650] leading-[1.15] tracking-[-0.02em] [text-wrap:balance] sm:text-[30px]">
          {title}
        </p>
        <p className="mt-3 text-[15px] leading-[1.6] text-white/65">{description}</p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 text-[14px] font-semibold text-[var(--color-accent-ink)] transition-[filter,transform] duration-150 hover:brightness-95 active:scale-[0.985] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <img src="/shopify.svg" alt="" width={16} height={16} className="h-4 w-4" />
          {buttonText}
          <span className="sr-only">(opens the Shopify App Store)</span>
        </a>
      </div>
      <div className="blog-cta-art" aria-hidden="true">
        {["pk-charizard-ex", "mtg-elesh-norn", "lor-stitch"].map((c, i) => (
          <img key={c} src={`/wall/${c}.webp`} alt="" width={300} height={419} loading="lazy" style={{ "--i": i - 1 } as React.CSSProperties} />
        ))}
      </div>
    </aside>
  );
}
