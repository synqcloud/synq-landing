import { CONDITIONS, CONDITION_NAMES, type GamePage } from "@/content/games";

/* Hero art for games with no card scans: no card art, only what the game
   becomes in Shopify, set in type. One product per card and printing, a
   variant per condition, sealed as Unopened. Two blank cards behind give
   the hand-of-cards depth of the scan fan. */
export default function GameMark({ game }: { game: GamePage }) {
  const printings = game.printings.names.length > 0 ? game.printings.names : ["Each printing"];

  return (
    <div className="relative mx-auto aspect-[5/6] w-full max-w-[400px]" aria-hidden="true">
      <div className="absolute inset-x-[10%] top-[6%] bottom-[2%] rotate-[-7deg] rounded-[22px] border border-white/[0.06] bg-white/[0.03]" />
      <div className="absolute inset-x-[8%] top-[4%] bottom-[3%] rotate-[5deg] rounded-[22px] border border-white/[0.07] bg-white/[0.045]" />

      <div className="absolute inset-0 flex flex-col rounded-[22px] border border-white/10 bg-[#211e1c] p-5 shadow-[0_30px_80px_-20px_rgb(0_0_0/60%)] sm:p-6">
        <div className="flex items-center gap-3.5">
          {game.icon ? (
            <span className="flex h-12 w-12 flex-none items-center justify-center rounded-[12px] bg-white/[0.06]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={game.icon} alt="" width={30} height={30} className="h-[30px] w-[30px] object-contain" />
            </span>
          ) : (
            <span className="flex h-12 w-12 flex-none items-center justify-center rounded-[12px] bg-[var(--color-accent)] text-[15px] font-[750] tracking-[-0.02em] text-[var(--color-accent-ink)]">
              {game.monogram}
            </span>
          )}
          <span className="min-w-0">
            <span className="block truncate text-[17px] font-[650] leading-tight tracking-[-0.01em] text-white">
              {game.name}
            </span>
            <span className="block truncate text-[12.5px] text-white/45">{game.publisher}</span>
          </span>
        </div>

        <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.06em] text-white/40">
          One Shopify product per card and printing
        </p>
        <ul className="mt-2.5 flex flex-wrap gap-1.5">
          {printings.map((p) => (
            <li key={p} className="rounded-[8px] bg-white/[0.07] px-2.5 py-1 text-[12px] font-semibold text-white/80">
              {p}
            </li>
          ))}
        </ul>

        <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.06em] text-white/40">A variant per condition</p>
        <ul className="mt-2 flex-1 divide-y divide-white/[0.06]">
          {CONDITIONS.map((c) => (
            <li key={c} className="flex items-center gap-3 py-[7px] text-[13px]">
              <span className="w-10 flex-none rounded-[6px] bg-white/[0.07] py-0.5 text-center text-[11.5px] font-[650] text-white/85">
                {c}
              </span>
              <span className="flex-1 truncate text-white/70">{CONDITION_NAMES[c]}</span>
              <span className="flex-none text-[11.5px] text-white/35">own price · own stock</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-center justify-between rounded-[12px] bg-white/[0.05] px-3.5 py-2.5 text-[12.5px]">
          <span className="text-white/70">Sealed product</span>
          <span className="font-semibold text-white/85">Unopened</span>
        </div>
      </div>
    </div>
  );
}
