"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import "./pos-demo.css";
import { artSize } from "@/lib/demo-art";

/* At the counter, after the app's Point of Sale settings: a single card wears
   the label Synq's code prints on (one code per card and condition), a sealed
   box carries its own barcode. When it comes into view both are scanned and
   ring up in the Shopify POS cart, and the stock updates online too.
   Replays on each visit. */

/* bars from a code: deterministic, so the label looks the same every time */
function bars(code: string) {
  const out: number[] = [];
  for (const ch of code) {
    const n = ch.charCodeAt(0);
    out.push(1 + (n % 3), 1 + ((n >> 2) % 2), 1 + ((n >> 1) % 3), 1 + (n % 2));
  }
  return out;
}
function Barcode({ code, className = "" }: { code: string; className?: string }) {
  const w = bars(code);
  let x = 0;
  const rects = w.map((bw, k) => {
    const r = k % 2 === 0 ? <rect key={k} x={x} y={0} width={bw} height={30} /> : null;
    x += bw;
    return r;
  });
  return (
    <svg className={`pos-code ${className}`} viewBox={`0 0 ${x} 30`} preserveAspectRatio="none">
      {rects}
    </svg>
  );
}

/* ms from the moment it's in view */
const T = { scan1: 500, ring1: 1200, scan2: 2300, ring2: 3000 };
type Phase = "idle" | keyof typeof T;
const ORDER: Phase[] = ["idle", "scan1", "ring1", "scan2", "ring2"];

const REDUCED = "(prefers-reduced-motion: reduce)";
function subscribeReduced(onChange: () => void) {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export default function PosDemo() {
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

  useEffect(() => {
    if (!inView) {
      setPhase("idle");
      return;
    }
    if (reduced) {
      setPhase("ring2");
      return;
    }
    const timers = (Object.keys(T) as (keyof typeof T)[]).map((k) =>
      setTimeout(() => setPhase(k), T[k]),
    );
    return () => timers.forEach(clearTimeout);
  }, [inView, reduced]);

  const at = (p: Phase) => ORDER.indexOf(phase) >= ORDER.indexOf(p);
  const total = at("ring2") ? "$329.98" : at("ring1") ? "$323.99" : "$0.00";

  return (
    <div ref={root} className="pos" aria-hidden="true" lang="en">
      <div className="pos-items">
        {/* the single, in its toploader, with Synq's label */}
        <div className="pos-single" data-scan={phase === "scan1" || undefined} data-done={at("ring1") || undefined}>
          <div className="pos-loader">
            <img src="/demo/charizard-151.webp" {...artSize("/demo/charizard-151.webp")} alt="" decoding="async" />
          </div>
          <div className="pos-label">
            <span className="pos-label-name">Charizard ex 199/165</span>
            <span className="pos-label-meta">
              NM · <b>$323.99</b>
            </span>
            <span className="pos-laser-wrap">
              <Barcode code="SYNQ199165NM" />
              <i className="pos-laser" />
            </span>
          </div>
        </div>

        {/* sealed: the barcode printed on the box */}
        <div className="pos-sealed" data-scan={phase === "scan2" || undefined} data-done={at("ring2") || undefined}>
          {/* the real pack, as it comes out of the case */}
          <span className="pos-pack">
            <img src="/demo/pack-151.webp" {...artSize("/demo/pack-151.webp")} alt="" decoding="async" />
          </span>
          <span className="pos-box-code pos-laser-wrap">
            <Barcode code="0820650853" />
            <i className="pos-laser" />
          </span>
        </div>
      </div>

      {/* the Shopify POS cart */}
      <div className="pos-cart">
        <span className="pos-cart-head">
          <b>Cart</b> Shopify POS
        </span>
        <ul>
          <li data-on={at("ring1") || undefined}>
            <img src="/demo/charizard-151.webp" {...artSize("/demo/charizard-151.webp")} alt="" />
            <span>
              <b>Charizard ex - 199/165</b>
              <span>Near Mint</span>
            </span>
            <b>$323.99</b>
          </li>
          <li data-on={at("ring2") || undefined}>
            <img src="/demo/pack-151.webp" {...artSize("/demo/pack-151.webp")} alt="" />
            <span>
              <b>151 Booster Pack</b>
              <span>SV: Scarlet & Violet 151 · sealed</span>
            </span>
            <b>$5.99</b>
          </li>
        </ul>
        <span className="pos-stock" data-on={at("ring1") || undefined}>
          Charizard ex · NM <b>2 → 1 in stock</b> · online too
        </span>
        <span className="pos-total">
          Total <b>{total}</b>
        </span>
      </div>
    </div>
  );
}
