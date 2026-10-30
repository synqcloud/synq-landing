"use client";

import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import "./search-demo.css";
import { artSize } from "@/lib/demo-art";

/* Card art is cropped from the real Add products screenshot, so every card,
   set, price and stock count here is what Synq showed. */
const QUERY = "charizard ex";
/* a human cadence: quick runs, a pause before the space */
const KEY_MS = [120, 70, 65, 85, 60, 75, 70, 95, 150, 80, 70, 60];
/* one add, one condition: the one the card in hand is in */
const CONDITION = "Near Mint";

const CUES = [
  { cue: "idle", ms: 400 },
  { cue: "type", ms: KEY_MS.reduce((a, b) => a + b, 0) },
  { cue: "settle", ms: 250 },
  { cue: "results", ms: 600 },
  { cue: "read", ms: 600 },
  { cue: "travel", ms: 650 },
  { cue: "hover", ms: 220 },
  { cue: "press", ms: 200 },
  { cue: "added", ms: 600 },
  { cue: "hold", ms: 1900 },
  { cue: "select", ms: 180 },
  { cue: "clear", ms: 320 },
] as const;

type Cue = (typeof CUES)[number]["cue"];
const AT = Object.fromEntries(CUES.map((c, i) => [c.cue, i])) as Record<Cue, number>;

/* the three steps the section lists: find, tap, it's on Shopify; -1 while the loop resets */
function stepOf(i: number) {
  if (i <= AT.read) return 0;
  if (i <= AT.press) return 1;
  if (i <= AT.hold) return 2;
  return -1;
}
const STEP_MS = [0, 1, 2].map((s) =>
  CUES.reduce((sum, c, i) => (stepOf(i) === s ? sum + c.ms : sum), 0),
);

const REDUCED = "(prefers-reduced-motion: reduce)";
function subscribeReduced(onChange: () => void) {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

type Point = { x: number; y: number };

/* Scroll as playback: the frame for a reading position p (0..3, one unit per
   step). Each beat owns a stretch of its step, so the progress bar and the
   mock always agree, forwards and backwards. */
type Frame = { i: number; typed: number; along: number };
function frameAt(p: number): Frame {
  const full = QUERY.length;
  if (p < 1) {
    if (p < 0.08) return { i: AT.idle, typed: 0, along: 0 };
    if (p < 0.62) return { i: AT.type, typed: Math.ceil(((p - 0.08) / 0.54) * full), along: 0 };
    if (p < 0.72) return { i: AT.settle, typed: full, along: 0 };
    if (p < 0.85) return { i: AT.results, typed: full, along: 0 };
    return { i: AT.read, typed: full, along: 0 };
  }
  if (p < 2) {
    const t = p - 1;
    if (t < 0.1) return { i: AT.read, typed: full, along: 0 };
    if (t < 0.5) return { i: AT.travel, typed: full, along: (t - 0.1) / 0.4 };
    if (t < 0.6) return { i: AT.hover, typed: full, along: 1 };
    if (t < 0.68) return { i: AT.press, typed: full, along: 1 };
    return { i: AT.added, typed: full, along: 1 };
  }
  return { i: AT.hold, typed: full, along: 1 };
}
/* each step's action starts and ends inside its own bar: "Added" lands in
   the last third of step 2, and the store opens step 3 */
const STORE_AT = 2.02;
/* a third into step 3, the page is published: the burst */
const PUBLISHED_AT = 2.3;
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

/* Two modes.
   Loop (no progress): plays on its own; playing: false holds it at the first
   frame, onStep lets a step list follow along.
   Scrubbed (progress, from the reader's scroll): shows the frame for that
   position, no timers. Past STORE_AT the app window gives way to the card's
   page in the store. */
export default function SearchDemo({
  playing = true,
  onStep,
  progress,
}: {
  playing?: boolean;
  onStep?: (step: number, ms: number, loop: number) => void;
  progress?: number;
}) {
  const scrubbed = progress !== undefined;
  const reduced = useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED).matches,
    () => false,
  );
  const [li, setI] = useState(0);
  const [ltyped, setTyped] = useState(0);
  const [loop, setLoop] = useState(0);
  const frame: Frame | null = scrubbed
    ? progress < 0
      ? { i: AT.idle, typed: 0, along: 0 }
      : frameAt(progress)
    : null;
  const i = frame ? frame.i : li;
  const typed = frame ? frame.typed : ltyped;
  const cue = CUES[i].cue;

  /* loop: one timer to the next cue; typing advances key by key */
  useEffect(() => {
    if (scrubbed || reduced || !playing) return;
    const t =
      cue === "type" && ltyped < QUERY.length
        ? setTimeout(() => setTyped((n) => n + 1), KEY_MS[ltyped])
        : setTimeout(
            () => {
              if (li === CUES.length - 1) {
                setI(0);
                setTyped(0);
                setLoop((l) => l + 1);
              } else setI(li + 1);
            },
            cue === "type" ? 0 : CUES[li].ms,
          );
    return () => clearTimeout(t);
  }, [li, cue, ltyped, playing, reduced, scrubbed]);

  /* back to the first keystroke whenever it stops playing */
  useEffect(() => {
    if (playing || scrubbed) return;
    setI(0);
    setTyped(0);
  }, [playing, scrubbed]);

  const step = reduced && !scrubbed ? 2 : stepOf(i);
  useEffect(() => {
    onStep?.(step, step < 0 ? 0 : STEP_MS[step], loop);
  }, [step, loop, onStep]);

  /* cursor: rests bottom right, goes to the target's + */
  const win = useRef<HTMLDivElement>(null);
  const plus = useRef<HTMLSpanElement>(null);
  const [rest, setRest] = useState<Point>({ x: 0, y: 0 });
  const [target, setTarget] = useState<Point>({ x: 0, y: 0 });
  const measure = useCallback(() => {
    const w = win.current?.getBoundingClientRect();
    const p = plus.current?.getBoundingClientRect();
    if (!w || !p) return;
    setRest({ x: w.width * 0.84, y: w.height * 0.9 });
    setTarget({ x: p.left - w.left + p.width / 2, y: p.top - w.top + p.height / 2 });
  }, []);
  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (win.current) ro.observe(win.current);
    return () => ro.disconnect();
  }, [measure]);
  /* measure the real spot once the results have settled */
  useEffect(() => {
    if (cue === "read" || cue === "travel") measure();
  }, [cue, measure]);

  /* the loop without motion shows its last frame */
  const done = reduced && !scrubbed;
  const query = done
    ? QUERY
    : cue === "idle" || cue === "clear"
      ? ""
      : i > AT.type
        ? QUERY
        : QUERY.slice(0, typed);
  const showResults = done || (i >= AT.results && i <= AT.select);
  const added = done || i >= AT.added;
  const hover = !reduced && (cue === "hover" || cue === "press");
  const press = !reduced && cue === "press";
  const store = scrubbed && progress >= STORE_AT;
  const toast = done || (!store && (cue === "added" || cue === "hold"));
  const cursorOn = !reduced && !store && i >= (scrubbed ? AT.read : AT.travel) && i <= AT.hold;
  let cursor: Point;
  if (frame) {
    const k = ease(Math.min(1, Math.max(0, frame.along)));
    cursor = { x: rest.x + (target.x - rest.x) * k, y: rest.y + (target.y - rest.y) * k };
  } else {
    const p = i >= AT.travel ? target : rest;
    cursor = cue === "hold" ? { x: p.x + 10, y: p.y + 12 } : p;
  }

  /* a picture of the English app and store: declared as English on every locale */
  return (
    <div className="demo-host" aria-hidden="true" lang="en">
      <div className="demo">
        <div
          className="demo-window"
          ref={win}
          data-away={store || undefined}
          data-scrub={scrubbed || undefined}
        >
          <div className="demo-header">
            <span className="demo-back">←</span>
            <span className="demo-title">
              <span className="demo-mark">
                <img src="/synq-icon.png" {...artSize("/synq-icon.png")} alt="" />
              </span>
              Add products
            </span>
            <span className="demo-close">×</span>
          </div>
          <div className="demo-panel">
            <div className="demo-field" data-select={cue === "select" || undefined}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <span className="demo-query">
                {query ? (
                  <span className="demo-typed">{query}</span>
                ) : (
                  <span className="demo-placeholder">Search by name or number</span>
                )}
                <span className="demo-caret" data-typing={cue === "type" || undefined} />
              </span>
            </div>

            <Results show={showResults} added={added} hover={hover} press={press} plusRef={plus} />
          </div>

          <div className="demo-toast" data-show={toast || undefined}>
            <span className="demo-toast-check">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <span className="demo-toast-text">
              <b>Added to Shopify</b>
              <span>Charizard ex · Scarlet & Violet 151</span>
            </span>
            <span className="demo-toast-chips">
              <span>{CONDITION}</span>
            </span>
          </div>

          <div
            className="demo-cursor-x"
            data-on={cursorOn || undefined}
            style={{ transform: `translateX(${cursor.x}px)` }}
          >
            <div className="demo-cursor-y" style={{ transform: `translateY(${cursor.y}px)` }}>
              <span className="demo-cursor" data-press={press || undefined}>
                <svg viewBox="0 0 20 20">
                  <path d="M3.5 2.2 16 9.2l-5.6 1.4-2.6 5.4Z" />
                </svg>
                <span className="demo-touch" />
              </span>
            </div>
          </div>
        </div>
        {scrubbed && <Storefront show={store} published={progress >= PUBLISHED_AT} />}
      </div>
    </div>
  );
}

/* 18 pieces around the card: evenly spread, nudged so it doesn't look
   mechanical; every third one is a short dash */
const BURST = Array.from({ length: 18 }, (_, n) => ({
  a: n * 20 + ((n * 37) % 13) - 6,
  d: 6.5 + ((n * 53) % 30) / 10,
  s: 0.7 + ((n * 29) % 5) / 10,
  t: (n % 4) * 25,
  dash: n % 3 === 0,
}));

/* the payoff: the card as a customer sees it in the shop's own store */
function Storefront({ show, published }: { show: boolean; published: boolean }) {
  return (
    <div
      className="demo-store"
      data-show={show || undefined}
      data-published={published || undefined}
    >
      <div className="demo-store-bar">
        <span className="demo-store-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="demo-store-url">northsidecards.com/products/charizard-ex-199-165</span>
      </div>
      <div className="demo-store-nav">
        <b>Northside Cards</b>
        <span>Singles</span>
        <span>Sealed</span>
        <span>Accessories</span>
        <span className="demo-store-cart">Cart</span>
      </div>
      <div className="demo-store-body">
        <div className="demo-store-img">
          <img src={NEW_CARD.art} {...artSize(NEW_CARD.art)} alt="" decoding="async" />
          {/* published: a short burst of ink out of the card */}
          <span className="demo-burst">
            {BURST.map((b, n) => (
              <i
                key={n}
                data-dash={b.dash || undefined}
                style={
                  {
                    "--a": `${b.a}deg`,
                    "--d": `${b.d}`,
                    "--s": `${b.s}`,
                    "--t": `${b.t}ms`,
                  } as React.CSSProperties
                }
              />
            ))}
          </span>
        </div>
        <div className="demo-store-info">
          <span className="demo-store-crumb">Pokémon · SV: Scarlet & Violet 151</span>
          <b className="demo-store-name">{NEW_CARD.name}</b>
          <span className="demo-store-price">{NEW_CARD.price}</span>
          <span className="demo-store-label">Condition</span>
          <span className="demo-store-conds">
            <span data-on>{CONDITION}</span>
          </span>
          <span className="demo-store-stock">In stock</span>
          <span className="demo-store-btn">Add to cart</span>
          <span className="demo-store-specs">
            <span>
              Set <b>Scarlet & Violet 151</b>
            </span>
            <span>
              Number <b>199/165</b>
            </span>
            <span>
              Printing <b>Holofoil</b>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

const IN_STORE = {
  name: "Charizard ex - 223/197",
  set: "SV03: Obsidian Flames",
  id: "#223/197 · Special Illustration Rare",
  price: "$90.99",
  art: "/demo/charizard-obf.webp",
};
/* the card being added: the one from the box */
const NEW_CARD = {
  name: "Charizard ex - 199/165",
  set: "SV: Scarlet & Violet 151",
  id: "#199/165 · Special Illustration Rare",
  price: "$309.65",
  art: "/demo/charizard-151.webp",
};
const MORE = ["/demo/more-1.webp", "/demo/more-2.webp", "/demo/more-3.webp", "/demo/more-4.webp"];

/* memoised: typing re-renders only the field, not the tiles */
const Results = memo(function Results({
  show,
  added,
  hover,
  press,
  plusRef,
}: {
  show: boolean;
  added: boolean;
  hover: boolean;
  press: boolean;
  plusRef: React.RefObject<HTMLSpanElement | null>;
}) {
  return (
    <div className="demo-results" data-show={show || undefined}>
      <div className="demo-count" style={{ "--d": "0ms" } as React.CSSProperties}>
        <b>90</b> results
      </div>
      <div className="demo-tiles">
        <Tile card={IN_STORE} stock={2} delay={80} />
        <Tile
          card={NEW_CARD}
          stock={added ? 1 : 0}
          delay={140}
          target
          hover={hover}
          press={press}
          plusRef={plusRef}
        />
      </div>
      <div className="demo-label" style={{ "--d": "200ms" } as React.CSSProperties}>
        More results
      </div>
      <div className="demo-more">
        {MORE.map((src, n) => (
          <div key={src} className="demo-well" style={{ "--d": `${240 + n * 50}ms` } as React.CSSProperties}>
            <img className="demo-art" src={src} {...artSize(src)} alt="" decoding="async" />
          </div>
        ))}
      </div>
    </div>
  );
});

function Tile({
  card,
  stock,
  delay,
  target,
  hover,
  press,
  plusRef,
}: {
  card: typeof IN_STORE;
  stock: number;
  delay: number;
  target?: boolean;
  hover?: boolean;
  press?: boolean;
  plusRef?: React.RefObject<HTMLSpanElement | null>;
}) {
  return (
    <div
      className="demo-tile"
      data-target={target || undefined}
      data-hover={hover || undefined}
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
    >
      <div className="demo-well">
        <img className="demo-art" src={card.art} {...artSize(card.art)} alt="" decoding="async" />
      </div>
      <div className="demo-name">{card.name}</div>
      <div className="demo-set">{card.set}</div>
      <div className="demo-id">{card.id}</div>
      <div className="demo-row" data-hover={hover || undefined} data-press={press || undefined}>
        <span className="demo-printing">Holofoil</span>
        {stock > 0 && (
          <span className="demo-stock" data-new={target || undefined}>
            {stock} in stock
          </span>
        )}
        <span className="demo-price">{card.price}</span>
        <span className="demo-plus" ref={plusRef}>
          +
        </span>
      </div>
    </div>
  );
}
