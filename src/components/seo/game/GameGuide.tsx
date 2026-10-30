import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import Section from "@/components/landing/Section";
import { CONDITIONS, CONDITION_NAMES, STANDARD_OFF, type GamePage } from "@/content/games";
import { Label } from "../ui";

/* The long read of a game page: what the game's shops sell, how its
   printings work, how conditions are priced, a worked example with real
   arithmetic, the counter, the import, and where to read more. Every Synq
   behaviour here is the app's own (rule editor, POS settings, import). */

const usd = (n: number) => `$${n.toFixed(2)}`;

/* "Round up to x.99" from the rule editor */
function roundUp99(v: number): number {
  const r = Math.floor(v) + 0.99;
  return Math.round((r < v ? r + 1 : r) * 100) / 100;
}

function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="text-[26px] font-[650] leading-[1.1] tracking-[-0.02em] [text-wrap:balance] lg:text-[32px]"
    >
      {children}
    </h2>
  );
}

const P = ({ children }: { children: ReactNode }) => (
  <p className="text-[16px] leading-[1.7] text-[var(--color-ink-2)]">{children}</p>
);

const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <Link
    href={href}
    className="font-medium text-[var(--color-ink)] underline decoration-black/20 underline-offset-4 transition-colors hover:decoration-[var(--color-ink)]"
  >
    {children}
  </Link>
);

export default function GameGuide({ game }: { game: GamePage }) {
  const { example: ex, short } = game;
  const factor = 1 + ex.markup / 100;
  const rows = CONDITIONS.map((c) => {
    const base = ex.market * (1 - STANDARD_OFF[c] / 100);
    const modified = Math.round(base * factor * 100) / 100;
    return { c, off: STANDARD_OFF[c], base, modified, listed: roundUp99(modified) };
  });
  const markupWords =
    ex.markup === 0 ? "keeps the market price (Modify by 0%)" : `modifies it by ${ex.markup > 0 ? "+" : ""}${ex.markup}%`;

  const docs = [
    { href: "/docs/add-cards", label: "Add cards from the catalog" },
    { href: "/docs/conditions-printings", label: "Conditions and printings" },
    { href: "/docs/price-rules", label: "Price rules" },
    { href: "/docs/import", label: "Import a spreadsheet or TCGplayer export" },
    { href: "/docs/pos", label: "Shopify POS and barcodes" },
    { href: "/compare", label: "How Synq compares" },
    { href: "/synq-vs-spreadsheets", label: "Synq vs spreadsheets" },
  ];

  return (
    <div className="w-full bg-[var(--color-canvas)] text-[var(--color-ink)]">
      <Section as="div" innerClassName="pb-20 lg:pb-28">
        <div className="mx-auto flex max-w-[760px] flex-col gap-16 lg:gap-20">
          {/* what the shops sell */}
          <section aria-labelledby="shelf-title" className="flex flex-col gap-5">
            <Label>On the shelf</Label>
            <H2 id="shelf-title">{`What ${short} shops sell`}</H2>
            <P>{game.shelf.singles}</P>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {game.shelf.sealed.map((s) => (
                <li key={s.name} className="synq-card p-5">
                  <h3 className="text-[15.5px] font-[650] tracking-[-0.01em]">{s.name}</h3>
                  <p className="mt-1.5 text-[14.5px] leading-[1.55] text-[var(--color-ink-2)]">{s.note}</p>
                </li>
              ))}
            </ul>
            <P>
              In Synq, singles and sealed live apart. A single is one Shopify product per card and printing, with a
              variant for each condition. A sealed product is one product with a single Unopened variant. Each game can
              send its singles and its sealed product to their own Shopify collections.
            </P>
          </section>

          {/* printings */}
          <section aria-labelledby="printings-title" className="flex flex-col gap-5">
            <Label>Printings and versions</Label>
            <H2 id="printings-title">{`How ${short} printings, foils and versions work`}</H2>
            {game.printingNotes.map((p) => (
              <P key={p.slice(0, 32)}>{p}</P>
            ))}
            <div className="synq-card p-5 lg:p-6">
              <h3 className="text-[15.5px] font-[650] tracking-[-0.01em]">A title that tells versions apart</h3>
              <p className="mt-1.5 text-[14.5px] leading-[1.6] text-[var(--color-ink-2)]">
                {game.titleTip} Product titles come from templates you set per game and per kind in Synq&apos;s Online
                Store settings; by default a title is just the card name.
              </p>
            </div>
          </section>

          {/* conditions */}
          <section aria-labelledby="conditions-title" className="flex flex-col gap-5">
            <Label>Conditions</Label>
            <H2 id="conditions-title">{`How condition pricing works for ${game.noun}`}</H2>
            <P>
              {`Every ${short} single can carry five conditions, each its own Shopify variant with its own price and stock. Sealed product has one, Unopened. Your price rule prices each condition in one of two ways.`}
            </P>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <li className="synq-card p-5">
                <h3 className="text-[15.5px] font-[650] tracking-[-0.01em]">Each condition&apos;s market price</h3>
                <p className="mt-1.5 text-[14.5px] leading-[1.55] text-[var(--color-ink-2)]">
                  The default. Each condition follows its own TCGplayer market price. A played condition with no market
                  price of its own uses Near Mint&apos;s, less the percent you set for it.
                </p>
              </li>
              <li className="synq-card p-5">
                <h3 className="text-[15.5px] font-[650] tracking-[-0.01em]">Near Mint&apos;s, less a percent</h3>
                <p className="mt-1.5 text-[14.5px] leading-[1.55] text-[var(--color-ink-2)]">
                  Every condition is priced from Near Mint&apos;s market price, less its own percent. Useful where played
                  copies rarely sell.
                </p>
              </li>
            </ul>
            <div className="synq-card overflow-hidden">
              <table className="w-full text-left text-[14.5px]">
                <caption className="sr-only">Default percent below Near Mint for each condition; each can be changed</caption>
                <thead className="bg-[var(--color-well)] text-[12.5px] uppercase tracking-[0.04em] text-[var(--color-ink-3)]">
                  <tr>
                    <th scope="col" className="px-5 py-3 font-semibold">Condition</th>
                    <th scope="col" className="px-5 py-3 text-right font-semibold">Default, below Near Mint</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.06]">
                  {CONDITIONS.map((c) => (
                    <tr key={c}>
                      <td className="px-5 py-2.5">
                        <span className="font-[650]">{c}</span>{" "}
                        <span className="text-[var(--color-ink-2)]">{CONDITION_NAMES[c]}</span>
                      </td>
                      <td className="px-5 py-2.5 text-right tabular-nums">{c === "NM" ? "Market" : `-${STANDARD_OFF[c]}%`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* worked example */}
          <section aria-labelledby="example-title" className="flex flex-col gap-5">
            <Label>A worked example</Label>
            <H2 id="example-title">{`Pricing ${ex.what}, condition by condition`}</H2>
            <P>
              {`Say ${ex.what} has a Near Mint market price of ${usd(ex.market)}. Your ${short} rule uses "Near Mint's, less a percent" with the default percents, ${markupWords}, and rounds up to x.99. Here is what each condition would list at.`}
            </P>
            <div className="synq-card overflow-x-auto">
              <table className="w-full min-w-[480px] text-left text-[14.5px]">
                <caption className="sr-only">{`Example prices for ${ex.what}`}</caption>
                <thead className="bg-[var(--color-well)] text-[12.5px] uppercase tracking-[0.04em] text-[var(--color-ink-3)]">
                  <tr>
                    <th scope="col" className="px-5 py-3 font-semibold">Condition</th>
                    <th scope="col" className="px-5 py-3 text-right font-semibold">From Near Mint</th>
                    <th scope="col" className="px-5 py-3 text-right font-semibold">
                      {ex.markup === 0 ? "Modify 0%" : `${ex.markup > 0 ? "+" : ""}${ex.markup}%`}
                    </th>
                    <th scope="col" className="px-5 py-3 text-right font-semibold">Listed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.06] tabular-nums">
                  {rows.map((r) => (
                    <tr key={r.c}>
                      <td className="px-5 py-2.5 font-[650]">{r.c}</td>
                      <td className="px-5 py-2.5 text-right text-[var(--color-ink-2)]">
                        {r.off === 0 ? usd(r.base) : `${usd(r.base)} (-${r.off}%)`}
                      </td>
                      <td className="px-5 py-2.5 text-right text-[var(--color-ink-2)]">{usd(r.modified)}</td>
                      <td className="px-5 py-2.5 text-right font-[650]">{usd(r.listed)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[13.5px] leading-[1.6] text-[var(--color-ink-3)]">
              Example numbers in US dollars, not live prices. Synq converts market prices to your store&apos;s currency
              and rounds in that currency.
            </p>
            <P>
              A rule can also set a minimum, a fixed amount or your cost plus a margin, so no condition lists below it.
              Before anything changes on Shopify, the rule&apos;s preview shows the original and updated price of every
              product and condition.
            </P>
          </section>

          {/* POS */}
          <section aria-labelledby="pos-title" className="flex flex-col gap-5">
            <Label>At the counter</Label>
            <H2 id="pos-title">{`Ring up ${game.noun} with Shopify POS`}</H2>
            <P>
              {`With the Shopify POS app installed, Synq can add new ${short} products to Point of Sale with scannable barcodes. Each single gets its own code per condition, so scanning a Lightly Played copy rings up the Lightly Played price, and sealed product gets the box UPC from the catalog, or a Synq code when there isn't one. Synq doesn't print labels; Shopify's free Retail Barcode Labels app does, if you skip its option to create barcodes.`}
            </P>
          </section>

          {/* import */}
          <section aria-labelledby="import-title" className="flex flex-col gap-5">
            <Label>Moving in</Label>
            <H2 id="import-title">{`Bring the ${game.noun} you already have`}</H2>
            <P>
              A TCGplayer export is recognized on upload and read as exact SKUs, so card, printing and condition match.
              Your own CSV can have any columns; Synq matches each row by TCGplayer SKU, TCGplayer ID, barcode or name,
              and you review the matches before anything is created. Products already in Shopify can be linked one at a
              time, and Synq takes over their price and stock from the next rule run.
            </P>
            <P>
              {`${game.importNote} Each import takes up to 5,000 products.`}
            </P>
          </section>

          {/* read more */}
          <nav aria-labelledby="read-title" className="flex flex-col gap-4">
            <Label>Read more</Label>
            <h2 id="read-title" className="text-[20px] font-[650] tracking-[-0.01em]">
              {`Guides for selling ${short}`}
            </h2>
            <ul className="grid grid-cols-1 gap-x-8 gap-y-2.5 text-[15px] sm:grid-cols-2">
              {docs.map((d) => (
                <li key={d.href}>
                  <A href={d.href}>{d.label}</A>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Section>
    </div>
  );
}
