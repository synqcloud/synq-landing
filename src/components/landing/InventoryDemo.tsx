"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import "./inventory-demo.css";
import { artSize } from "@/lib/demo-art";

/* The Inventory screen, after the app's own: every card side by side with
   market, listed price, cost and margin, and the bulk bar at the bottom.
   When it comes into view it plays one bulk edit: two chase cards are
   selected and set to "Price by hand", the exception that keeps price rules
   off them. Replays on each visit. */

type Row = {
  name: string;
  set: string;
  art: string;
  stock: number;
  market: string;
  listed: string;
  cost: string;
  margin: string;
  pct: string;
  pick?: boolean;
};

const ROWS: Row[] = [
  { name: "Umbreon ex - 161/131", set: "SV: Prismatic Evolutions", art: "/demo/umbreon.webp", stock: 1, market: "$1,232.76", listed: "$1,357.00", cost: "$862.93", margin: "$494.07", pct: "36.4%", pick: true },
  { name: "Charizard ex - 199/165", set: "SV: Scarlet & Violet 151", art: "/demo/charizard-151.webp", stock: 2, market: "$309.65", listed: "$323.99", cost: "$216.76", margin: "$107.23", pct: "33.1%", pick: true },
  { name: "Charizard ex - 223/197", set: "SV03: Obsidian Flames", art: "/demo/charizard-obf.webp", stock: 2, market: "$90.99", listed: "$95.99", cost: "$63.69", margin: "$32.30", pct: "33.6%" },
  { name: "Mew ex - 205/165", set: "SV: Scarlet & Violet 151", art: "/demo/mew.webp", stock: 2, market: "$25.01", listed: "$25.99", cost: "$17.51", margin: "$8.48", pct: "32.6%" },
  { name: "Sylveon ex - 156/131", set: "SV: Prismatic Evolutions", art: "/demo/sylveon.webp", stock: 3, market: "$45.10", listed: "$47.99", cost: "$31.20", margin: "$16.79", pct: "35.0%" },
];

/* ms from the moment it's in view */
const T = { pick1: 500, pick2: 800, bar: 1200, open: 2000, choose: 2700, applied: 3000 };
type Phase = "idle" | "pick1" | "pick2" | "bar" | "open" | "choose" | "applied";
const ORDER: Phase[] = ["idle", "pick1", "pick2", "bar", "open", "choose", "applied"];

const REDUCED = "(prefers-reduced-motion: reduce)";
function subscribeReduced(onChange: () => void) {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export default function InventoryDemo() {
  const reduced = useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED).matches,
    () => false,
  );
  const root = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* one edit per visit; leaving resets it */
  useEffect(() => {
    if (!inView) {
      setPhase("idle");
      return;
    }
    if (reduced) {
      setPhase("applied");
      return;
    }
    const timers = (Object.keys(T) as (keyof typeof T)[]).map((k) =>
      setTimeout(() => setPhase(k), T[k]),
    );
    return () => timers.forEach(clearTimeout);
  }, [inView, reduced]);

  const at = (p: Phase) => ORDER.indexOf(phase) >= ORDER.indexOf(p);
  const picked = (k: number) => (k === 0 ? at("pick1") : k === 1 ? at("pick2") : false);
  const count = (at("pick1") ? 1 : 0) + (at("pick2") ? 1 : 0);

  return (
    <div ref={root} className="inv" aria-hidden="true" lang="en">
      <div className="inv-top">
        <span className="inv-tab" data-on>
          All
        </span>
        <span className="inv-tab">Magic: The Gathering</span>
        <span className="inv-tab">Pokémon</span>
        <span className="inv-tab">One Piece</span>
        <span className="inv-search">Search all products</span>
      </div>

      <div className="inv-table">
        <div className="inv-row inv-head">
          <span className="inv-check" data-on={count > 0 || undefined} data-some={count > 0 || undefined} />
          <span>Product</span>
          <span className="inv-num">Stock</span>
          <span>Exceptions</span>
          <span className="inv-num">Market</span>
          <span className="inv-num">Listed</span>
          <span className="inv-num">Cost</span>
          <span className="inv-num">Margin</span>
        </div>
        {ROWS.map((r, k) => {
          const on = picked(k);
          return (
            <div key={r.name} className="inv-row" data-on={on || undefined}>
              <span className="inv-check" data-on={on || undefined}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <span className="inv-product">
                <img src={r.art} {...artSize(r.art)} alt="" decoding="async" />
                <span>
                  <b>{r.name}</b>
                  <span>{r.set}</span>
                </span>
              </span>
              <span className="inv-num">{r.stock}</span>
              <span>
                {r.pick && (
                  <em className="inv-exc" data-on={at("applied") || undefined} style={{ "--k": k } as React.CSSProperties}>
                    By hand
                  </em>
                )}
              </span>
              <span className="inv-num inv-market">{r.market}</span>
              <span className="inv-num inv-listed">{r.listed}</span>
              <span className="inv-num">{r.cost}</span>
              <span className="inv-num inv-margin">
                <b>{r.margin}</b>
                <span>{r.pct}</span>
              </span>
            </div>
          );
        })}
      </div>

      {/* the bulk bar, as in the app */}
      <div className="inv-bar" data-on={at("bar") || undefined}>
        <span className="inv-bar-item">
          <b>{count} selected</b> ▾
        </span>
        <span className="inv-bar-sep" />
        <span className="inv-bar-item">Stock ▾</span>
        <span className="inv-bar-item">Cost ▾</span>
        <span className="inv-bar-item">Conditions ▾</span>
        <span className="inv-bar-item" data-on={(at("open") && !at("applied")) || undefined}>
          Exceptions ▾
          <span className="inv-menu" data-on={(at("open") && !at("applied")) || undefined}>
            <span className="inv-menu-item" data-on={at("choose") || undefined}>
              Price by hand
              <small>Price rules skip these cards</small>
            </span>
            <span className="inv-menu-item">Clear exceptions</span>
          </span>
        </span>
        <span className="inv-bar-item">···</span>
      </div>
    </div>
  );
}
