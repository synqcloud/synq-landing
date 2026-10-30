import Section from "@/components/landing/Section";
import { FIGURES, FIGURES_NOTE } from "@/content/games";
import { AddToShopify } from "./ui";

/* The close: the home's dark payoff band (.result-band), with the real
   figures and the one call to action. Figures are static here: no count-up,
   nothing to wait for. */
export default function ClosingBand({ title, body }: { title: string; body: string }) {
  return (
    <div className="bg-[var(--color-canvas)]">
      <section aria-labelledby="close-title" className="result-band relative w-full overflow-hidden text-white">
        <Section as="div" innerClassName="relative pt-20 pb-20 lg:pt-28 lg:pb-24">
          <div className="mx-auto flex max-w-[860px] flex-col items-center text-center">
            <h2
              id="close-title"
              className="text-[36px] font-[650] leading-[1.02] tracking-[-0.03em] [text-wrap:balance] lg:text-[60px]"
            >
              {title}
            </h2>
            <p className="mt-5 max-w-[46ch] text-[16px] leading-[1.6] text-white/65 lg:text-[18px]">{body}</p>
            <div className="mt-9">
              <AddToShopify size="lg" />
            </div>
          </div>

          <dl className="mx-auto mt-14 grid max-w-[960px] grid-cols-1 gap-y-8 sm:grid-cols-3 lg:mt-16">
            {FIGURES.map((f, k) => (
              <div
                key={f.label}
                className={`flex flex-col-reverse items-center px-4 text-center ${k > 0 ? "sm:border-l sm:border-white/10" : ""}`}
              >
                <dt className="mt-2.5 max-w-[26ch] text-[14px] font-medium leading-[1.4] text-white/65">{f.label}</dt>
                <dd className="text-[40px] font-[650] leading-none tracking-[-0.03em] tabular-nums lg:text-[52px]">{f.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-center text-[12.5px] text-white/40">{FIGURES_NOTE}</p>
        </Section>
      </section>
    </div>
  );
}
