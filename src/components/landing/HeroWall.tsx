"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { useTranslations } from "next-intl";
import HeroCopy from "./HeroCopy";
import "./hero-wall.css";

/* Variant D, the wall of cards: the "everything" of the headline made
   visible. Real scans from Pokémon, Magic, Lorcana and Yu-Gi-Oh! in tilted
   columns that drift past, the way a shop's wall reads from the counter.

   The words sit on the left, not centered: a centered block would need a
   dark hole in the middle of the wall, while a left block lets the scrim
   fall off left to right, so the right half of the wall stays bright, away
   from the headline.
   It also keeps the same reading line as the chapters below. */

/* the wall's stock, interleaved by game so no column reads as one game */
const CARDS = [
  "wall/pk-charizard-ex",
  "wall/mtg-bowmasters",
  "wall/lor-elsa",
  "wall/pk-umbreon-vmax",
  "wall/ygo-blue-eyes",
  "wall/mtg-atraxa",
  "wall/pk-pikachu-151",
  "demo/sheoldred",
  "wall/pk-espeon-ex",
  "wall/lor-stitch",
  "wall/mtg-jace",
  "wall/pk-giratina-gg",
  "wall/ygo-ash-blossom",
  "demo/one-ring",
  "wall/pk-blastoise-ex",
  "wall/mtg-doubling-season",
  "wall/pk-sv2-269",
  "wall/lor-maleficent",
  "demo/umbreon",
  "wall/mtg-ur-dragon",
  "wall/pk-greninja-ex",
  "wall/ygo-dark-magician",
  "wall/mtg-liliana",
  "wall/pk-glaceon-ex",
  "demo/mew",
  "wall/mtg-wrenn-six",
  "wall/pk-terapagos-ex",
  "wall/lor-mickey",
  "wall/mtg-elesh-norn",
  "wall/pk-venusaur-ex",
  "wall/ygo-dark-magician-girl",
  "demo/ragavan",
  "wall/pk-rayquaza-vmax",
  "wall/mtg-fable",
  "wall/pk-eevee-ex",
  "wall/mtg-urzas-saga",
  "demo/sylveon",
  "wall/pk-mewtwo-gg",
  "wall/mtg-ugin",
  "wall/pk-alakazam-ex",
  "wall/mtg-edgar",
  "wall/pk-sv8-238",
  "wall/mtg-mana-crypt",
  "wall/pk-leafeon-ex",
  "wall/pk-zapdos-ex",
  "wall/mtg-bolt",
  "wall/pk-swsh11-186",
  "wall/pk-bulbasaur-151",
  "wall/pk-sv5-209",
  "wall/pk-charizard-paf",
  "wall/pk-psyduck-151",
  "wall/pk-sv6pt5-86",
] as const;

const COLUMNS = 11;
const PER_COLUMN = 8;
/* seconds for one full run; uneven so the columns never line up */
const DURATIONS = [154, 125, 172, 135, 161, 120, 166, 140, 156, 130, 177];

/* columns still in the frame on a phone; the rest are hidden there */
const MOBILE_COLS = 5;

type Column = { cards: (typeof CARDS)[number][]; style: CSSProperties; up: boolean };

const COLUMN_DATA: Column[] = Array.from({ length: COLUMNS }, (_, c) => {
  const dur = DURATIONS[c % DURATIONS.length];
  return {
    cards: Array.from({ length: PER_COLUMN }, (_, r) => CARDS[(c * PER_COLUMN + r) % CARDS.length]),
    up: c % 2 === 0,
    style: {
      "--wall-dur": `${dur}s`,
      /* start each column part way through its run */
      "--wall-delay": `-${((c * 0.37) % 1) * dur}s`,
    } as CSSProperties,
  };
});

export default function HeroWall() {
  const t = useTranslations("hero");
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = header.current;
    if (!root) return;

    /* the wall fades in once its first cards have decoded, so no card pops
       in mid-fade; never held back longer than 700ms */
    const first = Array.from(
      root.querySelectorAll<HTMLImageElement>(".wall-col:nth-child(-n+8) .wall-item:nth-child(-n+5) img"),
    );
    let gone = false;
    Promise.race([
      Promise.allSettled(first.map((img) => img.decode())),
      new Promise((r) => setTimeout(r, 700)),
    ]).then(() => {
      if (!gone) root.setAttribute("data-ready", "");
    });

    /* the drift stops when the hero is offscreen, the tab is hidden, or the
       next chapter has covered half of it */
    let onScreen = true;
    let sheetHalf = false;
    let hidden = document.hidden;
    const sync = () => root.toggleAttribute("data-paused", !(onScreen && !sheetHalf && !hidden));
    const watch = (target: Element, margin: string, set: (v: boolean) => void) => {
      const io = new IntersectionObserver(
        ([e]) => {
          set(e.isIntersecting);
          sync();
        },
        { rootMargin: margin },
      );
      io.observe(target);
      return io;
    };
    const sheet = document.getElementById("new-stock");
    const ios = [
      watch(root, "0px", (v) => (onScreen = v)),
      ...(sheet ? [watch(sheet, "0px 0px -50% 0px", (v) => (sheetHalf = v))] : []),
    ];
    const onVis = () => {
      hidden = document.hidden;
      sync();
    };
    document.addEventListener("visibilitychange", onVis);
    sync();

    return () => {
      gone = true;
      ios.forEach((io) => io.disconnect());
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <header
      ref={header}
      className="hero hero-wall relative block h-svh min-h-[640px] w-full overflow-hidden text-white"
    >
      <div className="hero-scene" aria-hidden="true">
        <div className="wall-tilt">
          {COLUMN_DATA.map((col, c) => (
            <div key={c} className={`wall-col ${col.up ? "is-up" : "is-down"}`} style={col.style}>
              <div className="wall-track">
                {[0, 1].map((run) =>
                  col.cards.map((src, r) => (
                    <div key={`${run}-${r}`} className="wall-item">
                      <div className="wall-card">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`/${src}.webp`}
                          alt=""
                          width={300}
                          height={419}
                          /* drifting columns defeat lazy loading; the phone-hidden ones stay lazy */
                          loading={c >= MOBILE_COLS ? "lazy" : "eager"}
                          fetchPriority="low"
                          decoding="async"
                          draggable={false}
                        />
                      </div>
                    </div>
                  )),
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="wall-scrim" aria-hidden="true" />
            <div className="wall-grain" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1240px] flex-col justify-end px-6 pb-[max(40px,calc(env(safe-area-inset-bottom)+24px))] pt-28 md:pb-20 lg:justify-center lg:pb-0 lg:pt-20">
        <HeroCopy className="lg:max-w-[min(760px,50vw)]" />
        {/* what stops the click: the cost of trying it */}
        <p className="wall-proof animate-fade-up" style={{ animationDelay: "420ms" }}>
          <i aria-hidden="true" />
          {t("note")}
        </p>
      </div>
    </header>
  );
}
