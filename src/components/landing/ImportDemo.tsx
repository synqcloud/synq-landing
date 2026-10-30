"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import "./import-demo.css";
import { artSize } from "@/lib/demo-art";

/* Import, after the app's own review screen: a spreadsheet comes in, each row
   is matched to the catalog, and the one name that fits two printings asks
   which is on the shelf. When it comes into view it plays one import.
   Replays on each visit. */

type Row = {
  name: string;
  art: string;
  status: "new" | "store" | "ask";
  note: string;
};

const ROWS: Row[] = [
  { name: "Sylveon ex - 156/131", art: "/demo/sylveon.webp", status: "new", note: "New · 2" },
  { name: "Umbreon ex - 161/131", art: "/demo/umbreon.webp", status: "store", note: "In your store · 1 → 2" },
  { name: "Charizard ex", art: "/demo/charizard-151.webp", status: "ask", note: "2 printings fit" },
  { name: "Mew ex - 205/165", art: "/demo/mew.webp", status: "new", note: "New · 2" },
  { name: "The One Ring", art: "/demo/one-ring.webp", status: "new", note: "New · 1" },
  { name: "Ragavan, Nimble Pilferer", art: "/demo/ragavan.webp", status: "new", note: "New · 1" },
];
const ASK = ROWS.findIndex((r) => r.status === "ask");

/* ms from the moment it's in view */
const ROW_IN = 180;
const T = { file: 300, rows: 700, ask: 2100, pick: 3000, done: 3400 };

const REDUCED = "(prefers-reduced-motion: reduce)";
function subscribeReduced(onChange: () => void) {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export default function ImportDemo() {
  const reduced = useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED).matches,
    () => false,
  );
  const root = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [file, setFile] = useState(false);
  const [shown, setShown] = useState(0);
  const [ask, setAsk] = useState(false);
  const [pick, setPick] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* one import per visit; leaving resets it */
  useEffect(() => {
    const all = (v: boolean) => {
      setFile(v);
      setShown(v ? ROWS.length : 0);
      setAsk(v);
      setPick(v);
      setDone(v);
    };
    if (!inView) {
      all(false);
      return;
    }
    if (reduced) {
      all(true);
      return;
    }
    const timers = [
      setTimeout(() => setFile(true), T.file),
      ...ROWS.map((_, k) => setTimeout(() => setShown(k + 1), T.rows + k * ROW_IN)),
      setTimeout(() => setAsk(true), T.ask),
      setTimeout(() => setPick(true), T.pick),
      setTimeout(() => setDone(true), T.done),
    ];
    return () => timers.forEach(clearTimeout);
  }, [inView, reduced]);

  const ready = Math.min(shown, ROWS.length - 1) + (done ? 1 : 0);

  return (
    <div ref={root} className="imp" aria-hidden="true" lang="en">
      <div className="imp-head">
        <span className="imp-title">← Import a spreadsheet</span>
        <span className="imp-file" data-on={file || undefined}>
          <em>CSV</em> buylist-october.csv · {ROWS.length} rows
        </span>
      </div>

      <div className="imp-summary">
        <b>
          {ready} of {ROWS.length}
        </b>{" "}
        products are ready
        <span className="imp-go" data-on={done || undefined}>
          Import {ROWS.length} products
        </span>
      </div>

      <div className="imp-body">
        <ul className="imp-rows">
          {ROWS.map((r, k) => {
            const asking = k === ASK && !done;
            const status = k === ASK && done ? "store" : r.status;
            const note = k === ASK && done ? "In your store · 2 → 3" : r.note;
            return (
              <li
                key={r.name}
                data-on={k < shown || undefined}
                data-ask={(asking && ask) || undefined}
                style={{ "--k": k } as React.CSSProperties}
              >
                <img src={r.art} {...artSize(r.art)} alt="" decoding="async" />
                <span>
                  <b>{k === ASK && done ? "Charizard ex - 199/165" : r.name}</b>
                  <span className="imp-note" data-s={status}>
                    <i />
                    {note}
                  </span>
                </span>
                <span className="imp-rowno">Row {k + 2}</span>
              </li>
            );
          })}
        </ul>

        {/* the one row that needs an answer */}
        <div className="imp-ask" data-on={(ask && !done) || undefined}>
          <span className="imp-ask-q">
            2 printings fit <b>Charizard ex</b>. Which one is on your shelf?
          </span>
          <div className="imp-picks">
            <span className="imp-pick" data-on={pick || undefined}>
              <img src="/demo/charizard-151.webp" {...artSize("/demo/charizard-151.webp")} alt="" />
              <b>Scarlet & Violet 151</b>
              <span>#199/165</span>
            </span>
            <span className="imp-pick">
              <img src="/demo/charizard-obf.webp" {...artSize("/demo/charizard-obf.webp")} alt="" />
              <b>Obsidian Flames</b>
              <span>#223/197</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
