import type { ReactNode } from "react";
import Section from "@/components/landing/Section";
import { CONDITIONS, CONDITIONS_BODY, type GamePage } from "@/content/games";
import { Glyph, Label } from "./ui";

/* What Synq does for this game: four white cards with the game's own
   specifics (sets, printings, conditions, sealed), then how a price is set,
   in three steps. */
export default function GameFeatures({ game }: { game: GamePage }) {
  const cards: { title: string; body: string; glyph: ReactNode; chips?: string[] }[] = [
    {
      title: "Every set, by name or number",
      body: `${game.sets} Synq creates the Shopify product with its photo, ready to publish.`,
      glyph: (
        <>
          <circle cx="11" cy="11" r="6.5" />
          <path d="m20 20-4.2-4.2" />
        </>
      ),
    },
    {
      title: "Each printing priced on its own",
      body: game.printings.body,
      chips: game.printings.names,
      glyph: (
        <>
          <rect x="4" y="5" width="11" height="15" rx="2" />
          <path d="M9 3.5h8.5a2 2 0 0 1 2 2V17" />
        </>
      ),
    },
    {
      title: "A variant per condition",
      body: CONDITIONS_BODY,
      chips: CONDITIONS,
      glyph: (
        <>
          <path d="M4 6h16M4 12h16M4 18h10" />
        </>
      ),
    },
    {
      title: "Sealed product too",
      body: game.sealed,
      glyph: (
        <>
          <path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5v-9Z" />
          <path d="M3.5 7.5 12 12l8.5-4.5M12 12v9" />
        </>
      ),
    },
  ];

  const steps = [
    {
      title: "The market price",
      body: "TCGplayer's market price for that exact card and printing, brought in every day and converted to your store's currency.",
    },
    {
      title: "Your rule",
      body: "The market price plus your margin, a minimum based on your cost, and how to round. Each rule previews the prices that would move before it runs.",
    },
    {
      title: "Your Shopify price",
      body: "Synq runs the rule on your schedule and updates the price in Shopify. Set a card's price by hand in Synq and rules leave it alone.",
    },
  ];

  return (
    <section aria-labelledby="what-title" className="w-full bg-[var(--color-canvas)] text-[var(--color-ink)]">
      <Section as="div" innerClassName="py-20 lg:py-28">
        <div className="max-w-[760px]">
          <Label>{`Synq for ${game.name}`}</Label>
          <h2
            id="what-title"
            className="mt-4 text-[30px] font-[650] leading-[1.08] tracking-[-0.02em] [text-wrap:balance] lg:text-[40px]"
          >
            {`What Synq does with your ${game.noun}`}
          </h2>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-14 lg:gap-4">
          {cards.map((c) => (
            <li key={c.title} className="synq-card flex flex-col gap-4 p-6 lg:p-7">
              <Glyph>{c.glyph}</Glyph>
              <div>
                <h3 className="text-[17px] font-[650] leading-[1.3] tracking-[-0.01em]">{c.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-[var(--color-ink-2)]">{c.body}</p>
              </div>
              {c.chips && c.chips.length > 0 && (
                <ul className="mt-auto flex flex-wrap gap-1.5 pt-1">
                  {c.chips.map((chip) => (
                    <li
                      key={chip}
                      className="rounded-[8px] bg-[var(--color-well)] px-2.5 py-1 text-[12.5px] font-semibold text-[var(--color-set)]"
                    >
                      {chip}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* how a price is set */}
        <div className="mt-16 lg:mt-24">
          <Label>How a price is set</Label>
          <h2 className="mt-4 max-w-[22ch] text-[26px] font-[650] leading-[1.1] tracking-[-0.02em] [text-wrap:balance] lg:text-[32px]">
            Prices move. Yours keep up.
          </h2>
          <ol className="synq-card mt-8 grid grid-cols-1 md:grid-cols-3">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className={`flex flex-col gap-3 p-6 lg:p-7 ${
                  i > 0 ? "border-t border-black/[0.06] md:border-l md:border-t-0" : ""
                }`}
              >
                <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[var(--color-ink)] text-[12.5px] font-[650] text-white tabular-nums">
                  {i + 1}
                </span>
                <h3 className="text-[16px] font-[650] tracking-[-0.01em]">{s.title}</h3>
                <p className="text-[14.5px] leading-[1.6] text-[var(--color-ink-2)]">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>
    </section>
  );
}
