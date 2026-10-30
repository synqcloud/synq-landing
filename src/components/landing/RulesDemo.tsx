"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "./rules-demo.css";
import { artSize } from "@/lib/demo-art";

/* The Price rules screen, drawn after the app's own: summary line, tabs, rule
   cards with their cards fanned, formula and schedule, and the Activity list.
   The run shown is "Pokémon singles", the rule that prices chapter 1's
   Charizard.

   Scrubbed by the reader's scroll (progress 0..1), filmed like a camera so
   there is one thing to look at at a time:
   overview → zoom on the rule, the cursor taps Run → pan to Activity, the run
   lands on top and its counts tick up → back out to the overview. */

type Rule = {
  name: string;
  scope: string;
  formula: string;
  schedule: string;
  art: string[];
};

const RULES: Rule[] = [
  {
    name: "Pokémon singles",
    scope: "Pokémon · 9 products",
    formula: "5% above market · min Your cost + 20% · Round up to x.99",
    schedule: "Every day at 6:00 AM",
    art: ["/demo/charizard-obf.webp", "/demo/charizard-151.webp", "/demo/mew.webp"],
  },
  {
    name: "Prismatic Evolutions chase",
    scope: "Pokémon · 1 product",
    formula: "10% above market · min Your cost + 25% · Round up to x.00",
    schedule: "Mon, Wed, Fri at 9:00 AM",
    art: ["/demo/umbreon.webp"],
  },
  {
    name: "Magic singles",
    scope: "Magic: The Gathering · 5 products",
    formula: "3% above market · min Your cost + 15% · Round up to x.49",
    schedule: "Every day at 6:30 AM",
    art: ["/demo/sheoldred.webp", "/demo/one-ring.webp", "/demo/ragavan.webp"],
  },
  {
    name: "Played conditions",
    scope: "Every game · 9 products",
    formula: "Market price · min $0.25 · Round up to x.49",
    schedule: "Sun at 8:00 AM",
    art: ["/demo/more-2.webp", "/demo/sylveon.webp", "/demo/more-1.webp"],
  },
];

const HISTORY = [
  { name: "Prismatic Evolutions chase", when: "Oct 27, 5:54 PM", up: 1, down: 0 },
  { name: "Magic singles", when: "Oct 27, 5:24 PM", up: 3, down: 1 },
  { name: "Played conditions", when: "Oct 27, 5:24 PM", up: 9, down: 0 },
  { name: "Pokémon singles", when: "Oct 27, 5:22 PM", up: 4, down: 3 },
];
const RESULT = { up: 5, down: 2 };

/* where each beat sits on the scroll */
const AT = {
  zoomIn: [0.04, 0.16],
  cursorIn: 0.12,
  travel: [0.16, 0.28],
  press: [0.32, 0.35],
  /* a beat on the tapped button, then a slow move over to Activity */
  pan: [0.44, 0.64],
  row: 0.6,
  count: [0.64, 0.76],
  zoomOut: [0.88, 0.98],
} as const;

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const span = (p: number, [a, b]: readonly [number, number]) => ease(clamp((p - a) / (b - a)));

type Box = { x: number; y: number; w: number; h: number };
type Cam = { s: number; x: number; y: number };
const ID: Cam = { s: 1, x: 0, y: 0 };
const mix = (a: Cam, b: Cam, t: number): Cam => ({
  s: a.s + (b.s - a.s) * t,
  x: a.x + (b.x - a.x) * t,
  y: a.y + (b.y - a.y) * t,
});

type Note = { title: string; body: string };

/* notes: what each close-up is about, set in the room beside it */
export default function RulesDemo({
  progress,
  notes,
}: {
  progress: number;
  notes: { rule: Note; activity: Note };
}) {
  const frame = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const run = useRef<HTMLSpanElement>(null);
  const activity = useRef<HTMLDivElement>(null);
  /* the shots frame only what matters: the rule from its name down to Run,
     and the top of Activity where the run lands */
  const cardText = useRef<HTMLElement>(null);
  const firstPast = useRef<HTMLLIElement>(null);
  const [geo, setGeo] = useState<{ frame: Box; card: Box; activity: Box; run: Box } | null>(null);

  /* measure everything in the stage's own (unzoomed) coordinates */
  const measure = useCallback(() => {
    const st = stage.current;
    const f = frame.current;
    if (
      !st ||
      !f ||
      !card.current ||
      !run.current ||
      !activity.current ||
      !cardText.current ||
      !firstPast.current
    )
      return;
    /* without the camera, and without its smoothing (or the box is read
       halfway through the transition) */
    const keep = st.style.transform;
    st.style.transition = "none";
    st.style.transform = "none";
    const o = st.getBoundingClientRect();
    const box = (el: Element): Box => {
      const r = el.getBoundingClientRect();
      return { x: r.left - o.left, y: r.top - o.top, w: r.width, h: r.height };
    };
    const fr = f.getBoundingClientRect();
    const c = box(card.current);
    const name = box(cardText.current);
    const a = box(activity.current);
    const row = box(firstPast.current);
    /* the run's row opens above the first past row: leave room for it */
    const landing = 64;
    setGeo({
      frame: { x: 0, y: 0, w: fr.width, h: fr.height },
      card: { x: c.x, y: name.y - 14, w: c.w, h: c.y + c.h - name.y + 14 },
      activity: { x: a.x, y: a.y, w: a.w, h: row.y + row.h - a.y + landing + 10 },
      run: box(run.current),
    });
    st.style.transform = keep;
    void st.offsetWidth;
    st.style.transition = "";
  }, []);
  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (frame.current) ro.observe(frame.current);
    return () => ro.disconnect();
  }, [measure]);

  const p = progress;
  const zIn = span(p, AT.zoomIn);
  const pan = span(p, AT.pan);
  const zOut = span(p, AT.zoomOut);

  /* a shot that frames a box on the left of the window, leaving the right
     for its note (on narrow windows, centred with no note) */
  const wide = !!geo && geo.frame.w >= 760;
  const shot = (b: Box): Cam => {
    if (!geo) return ID;
    const room = wide ? 0.46 : 0.9;
    const s = Math.min((geo.frame.w * room) / b.w, (geo.frame.h * 0.84) / b.h, 2.6);
    const cx = wide ? geo.frame.w * 0.28 : geo.frame.w / 2;
    return {
      s,
      x: cx - (b.x + b.w / 2) * s,
      y: geo.frame.h / 2 - (b.y + b.h / 2) * s,
    };
  };
  const onCard = geo ? shot(geo.card) : ID;
  const onActivity = geo ? shot(geo.activity) : ID;
  const cam = mix(mix(mix(ID, onCard, zIn), onActivity, pan), ID, zOut);

  /* what's lit: the rule while the camera is on it, Activity after */
  const onRule = zIn * (1 - pan);
  const onAct = pan * (1 - zOut);
  /* gone in a close-up, so the note beside it reads on clean canvas */
  const dim = (v: number) => 1 - v;

  /* the cursor: in from below the card, to Run, tap */
  const travel = span(p, AT.travel);
  const runC = geo ? { x: geo.run.x + geo.run.w * 0.4, y: geo.run.y + geo.run.h * 0.6 } : { x: 0, y: 0 };
  const from = geo ? { x: geo.card.x + geo.card.w * 0.5, y: geo.card.y + geo.card.h + 30 } : runC;
  const cursor = { x: from.x + (runC.x - from.x) * travel, y: from.y + (runC.y - from.y) * travel };
  const cursorOn = p >= AT.cursorIn && p < AT.pan[0] + 0.03;
  const pressed = p >= AT.press[0] && p < AT.press[1];
  const tapped = p >= AT.press[0];

  const rowIn = p >= AT.row;
  const c = span(p, AT.count);
  const up = Math.round(RESULT.up * c);
  const down = Math.round(RESULT.down * c);
  const settled = p >= AT.count[1];

  return (
    <div ref={frame} className="rd" aria-hidden="true">
      {wide && (
        <>
          <div className="rd-note" style={{ opacity: clamp(onRule * 1.6 - 0.6) }}>
            <span className="rd-note-k">1</span>
            <b>{notes.rule.title}</b>
            <span>{notes.rule.body}</span>
          </div>
          <div className="rd-note" style={{ opacity: clamp(onAct * 1.6 - 0.6) }}>
            <span className="rd-note-k">2</span>
            <b>{notes.activity.title}</b>
            <span>{notes.activity.body}</span>
          </div>
        </>
      )}
      <div
        ref={stage}
        className="rd-stage"
        /* the app's own (English) Price rules screen; the notes beside it are
           translated */
        lang="en"
        style={{ transform: `translate(${cam.x}px, ${cam.y}px) scale(${cam.s})` }}
      >
        <div className="rd-head" style={{ opacity: dim(Math.max(onRule, onAct)) }}>
          <p className="rd-summary">
            <b>24</b> products priced by a rule <span>·</span> <b>7</b> with no rule
          </p>
          <div className="rd-bar">
            <span className="rd-label">
              Rules <span>4 of 50</span>
            </span>
            <span className="rd-tab" data-on>
              All 4
            </span>
            <span className="rd-tab">Scheduled 4</span>
            <span className="rd-tab">Paused 0</span>
            <span className="rd-tab">By hand 0</span>
            <span className="rd-add">+ Add rule</span>
          </div>
        </div>

        <div className="rd-body">
          <div className="rd-rules">
            {RULES.map((r, k) => {
              const target = k === 0;
              return (
                <div
                  key={r.name}
                  ref={target ? card : undefined}
                  className="rd-rule"
                  data-hover={(target && p >= AT.travel[1] && p < AT.pan[1]) || undefined}
                  style={{ opacity: target ? dim(onAct) : dim(Math.max(onRule, onAct)) }}
                >
                  <div className="rd-art" data-fan={r.art.length > 1 || undefined}>
                    {r.art.map((src) => (
                      <img key={src} src={src} {...artSize(src)} alt="" decoding="async" />
                    ))}
                  </div>
                  <b className="rd-name" ref={target ? cardText : undefined}>
                    {r.name}
                  </b>
                  <span className="rd-scope">{r.scope}</span>
                  <span className="rd-formula">{r.formula}</span>
                  <div className="rd-foot">
                    <span className="rd-when">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 7v5l3 2" />
                      </svg>
                      {r.schedule}
                    </span>
                    <span
                      className="rd-run"
                      ref={target ? run : undefined}
                      data-press={(target && pressed) || undefined}
                      data-tapped={(target && tapped && p < AT.pan[1]) || undefined}
                    >
                      ▷ Run
                    </span>
                    <span className="rd-more">···</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div ref={activity} className="rd-activity" style={{ opacity: dim(onRule) }}>
            <span className="rd-label">Activity</span>
            <ul>
              {/* the run lands on top of the list and pushes the rest down */}
              <li className="rd-slot" data-open={rowIn || undefined}>
                <div className="rd-new" data-settled={settled || undefined}>
                  <b>Pokémon singles</b>
                  <span>
                    <em className="rd-state">Complete</em>
                    Just now
                    <i className="rd-up">▲ {up}</i>
                    <i className="rd-down">▼ {down}</i>
                  </span>
                </div>
              </li>
              {HISTORY.map((h, k) => (
                <li key={h.name + h.when} ref={k === 0 ? firstPast : undefined}>
                  <b>{h.name}</b>
                  <span>
                    <em className="rd-state">Complete</em>
                    {h.when}
                    {h.up > 0 && <i className="rd-up">▲ {h.up}</i>}
                    {h.down > 0 && <i className="rd-down">▼ {h.down}</i>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="rd-cursor"
          data-on={cursorOn || undefined}
          data-press={pressed || undefined}
          style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }}
        >
          <svg viewBox="0 0 20 20">
            <path d="M3.5 2.2 16 9.2l-5.6 1.4-2.6 5.4Z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
