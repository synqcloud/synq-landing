import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import Section from "@/components/landing/Section";
import { Label } from "@/components/seo/ui";
import type { AppEntry } from "@/content/compare/apps";
import { COLUMNS } from "@/content/compare/apps";
import { SOURCES, type SourceId } from "@/content/compare/sources";
import type { Block, Cell, PageLink, VsRow } from "@/content/compare/types";

/* The comparison cluster's building blocks. Same cards, labels and table
   as the other SEO pages; every competitor fact carries a small numbered
   link down to its source. */

export type SourceIndex = Map<SourceId, number>;

const H2 = "mt-4 max-w-[26ch] text-[28px] font-[650] leading-[1.1] tracking-[-0.02em] [text-wrap:balance] lg:text-[36px]";

/* ---------- source marks ---------- */

export function Marks({ ids, index }: { ids?: readonly SourceId[]; index: SourceIndex }) {
  if (!ids || ids.length === 0) return null;
  return (
    <sup className="ml-0.5 whitespace-nowrap text-[10.5px] font-semibold text-[var(--color-ink-3)]">
      {ids.map((id, i) => (
        <span key={id}>
          {i > 0 && ","}
          <a
            href={`#src-${id}`}
            className="underline decoration-black/15 underline-offset-2 hover:text-[var(--color-ink)]"
            aria-label={`Source ${index.get(id)}: ${SOURCES[id].label}`}
          >
            {index.get(id)}
          </a>
        </span>
      ))}
    </sup>
  );
}

function CellText({ cell, index }: { cell: Cell; index: SourceIndex }) {
  const quiet = cell.tone === "unknown" || cell.tone === "no";
  return (
    <span className={quiet ? "text-[var(--color-ink-3)]" : undefined}>
      {cell.v}
      <Marks ids={cell.s} index={index} />
    </span>
  );
}

/* "Bold the first words of a bullet": the part before the first ". " or ": " */
function Bullet({ text }: { text: string }) {
  const m = text.match(/^(.{3,48}?)([.:]) (.+)$/);
  return (
    <li className="flex items-start gap-3 text-[15px] leading-[1.6]">
      <span className="mt-[10px] h-[5px] w-[5px] flex-none rounded-full bg-[var(--color-ink)]" aria-hidden="true" />
      <span>
        {m ? (
          <>
            <b className="font-[650]">
              {m[1]}
              {m[2]}
            </b>{" "}
            <span className="text-[var(--color-ink-2)]">{m[3]}</span>
          </>
        ) : (
          <span className="text-[var(--color-ink-2)]">{text}</span>
        )}
      </span>
    </li>
  );
}

function Wrap({ id, children, tight = false }: { id?: string; children: ReactNode; tight?: boolean }) {
  return (
    <section id={id} className="w-full scroll-mt-24">
      <Section as="div" innerClassName={tight ? "py-10 lg:py-14" : "py-14 lg:py-20"}>
        {children}
      </Section>
    </section>
  );
}

/* ---------- blocks ---------- */

function Prose({ b, index }: { b: Extract<Block, { kind: "prose" }>; index: SourceIndex }) {
  return (
    <Wrap id={b.id}>
      <div className="max-w-[760px]">
        {b.label && <Label>{b.label}</Label>}
        <h2 className={H2}>{b.title}</h2>
        {b.paragraphs.map((p, i) => (
          <p key={i} className="mt-5 text-[16px] leading-[1.7] text-[var(--color-ink-2)]">
            {p}
            {i === b.paragraphs.length - 1 && !b.bullets && <Marks ids={b.sources} index={index} />}
          </p>
        ))}
        {b.bullets && (
          <ul className="mt-6 flex flex-col gap-3">
            {b.bullets.map((t) => (
              <Bullet key={t} text={t} />
            ))}
          </ul>
        )}
        {b.bullets && b.sources && (
          <p className="mt-4 text-[12.5px] text-[var(--color-ink-3)]">
            Sources
            <Marks ids={b.sources} index={index} />
          </p>
        )}
      </div>
    </Wrap>
  );
}

function SplitCard({
  title,
  body,
  points,
  level = 3,
}: {
  title: string;
  body?: string;
  points: string[];
  /* h2 when the split has no heading of its own, so the outline doesn't skip */
  level?: 2 | 3;
}) {
  const H = level === 2 ? "h2" : "h3";
  return (
    <div className="synq-card flex flex-col p-6 lg:p-8">
      <H className="text-[20px] font-[650] leading-[1.2] tracking-[-0.015em] lg:text-[22px]">{title}</H>
      {body && <p className="mt-3 text-[15px] leading-[1.6] text-[var(--color-ink-2)]">{body}</p>}
      <ul className="mt-5 flex flex-col gap-2.5">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-3 text-[14.5px] leading-[1.55]">
            <span className="mt-[8px] h-[5px] w-[5px] flex-none rounded-full bg-[var(--color-ink)]" aria-hidden="true" />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Split({ b }: { b: Extract<Block, { kind: "split" }> }) {
  return (
    <Wrap>
      {b.label && <Label>{b.label}</Label>}
      {b.title && <h2 className={H2}>{b.title}</h2>}
      <div className={`grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-4 ${b.label || b.title ? "mt-8" : ""}`}>
        <SplitCard {...b.left} level={b.title ? 3 : 2} />
        <SplitCard {...b.right} level={b.title ? 3 : 2} />
      </div>
    </Wrap>
  );
}

function VsTable({ them, rows, index }: { them: string; rows: VsRow[]; index: SourceIndex }) {
  return (
    <div className="synq-card overflow-hidden">
      <table className="compare-table text-[14.5px] leading-[1.55]">
        <caption className="sr-only">{`${them} compared with Synq`}</caption>
        <thead>
          <tr className="border-b border-black/[0.06] bg-[#fafafa]">
            {["Topic", them, "Synq"].map((h, i) => (
              <th
                key={h}
                scope="col"
                className={`${i === 0 ? "w-[20%]" : "w-[40%]"} text-[11.5px] font-semibold uppercase tracking-[0.04em] ${
                  i === 2 ? "text-[var(--color-ink)]" : "text-[var(--color-ink-3)]"
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.topic}>
              <th scope="row" className="text-[15px] font-[650] tracking-[-0.01em] text-[var(--color-ink)]">
                {r.topic}
              </th>
              <td data-label={them} className="text-[var(--color-ink-2)]">
                <CellText cell={r.them} index={index} />
                {r.themWins && (
                  <span className="ml-2 inline-flex translate-y-[-1px] items-center rounded-full bg-[#f0f0f0] px-2 py-0.5 text-[11px] font-semibold text-[var(--color-set)] max-md:ml-0 max-md:mt-1.5 max-md:flex max-md:w-fit max-md:translate-y-0">
                    {`${them} does more`}
                  </span>
                )}
              </td>
              <td data-label="Synq" className="text-[var(--color-ink)]">
                <CellText cell={r.synq} index={index} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Vs({ b, index }: { b: Extract<Block, { kind: "vs" }>; index: SourceIndex }) {
  return (
    <Wrap>
      {b.label && <Label>{b.label}</Label>}
      <h2 className={H2}>{b.title}</h2>
      <div className="mt-8">
        <VsTable them={b.them} rows={b.rows} index={index} />
      </div>
      {b.note && <p className="mt-4 max-w-[70ch] text-[13px] leading-[1.55] text-[var(--color-ink-3)]">{b.note}</p>}
    </Wrap>
  );
}

export function Matrix({ apps, index, columns }: { apps: AppEntry[]; index: SourceIndex; columns?: string[] }) {
  const cols = columns ? COLUMNS.filter((c) => columns.includes(c.key)) : COLUMNS;
  return (
    <div className="synq-card overflow-hidden">
      {/* the table scrolls inside its card; the page never scrolls sideways */}
      <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Comparison table, scrolls sideways">
        <table
          className={`w-full border-collapse text-left text-[13px] leading-[1.5] ${cols.length > 7 ? "min-w-[1480px]" : "min-w-[960px]"}`}
        >
          <caption className="sr-only">Shopify apps and platforms for card shops, compared</caption>
          <thead>
            <tr className="border-b border-black/[0.06] bg-[#fafafa]">
              <th
                scope="col"
                className="sticky left-0 z-10 w-[150px] bg-[#fafafa] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.04em] text-[var(--color-ink-3)]"
              >
                Tool
              </th>
              {cols.map((c) => (
                <th
                  key={c.key}
                  scope="col"
                  className="px-4 py-3 align-bottom text-[11px] font-semibold uppercase tracking-[0.04em] text-[var(--color-ink-3)]"
                >
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {apps.map((a) => (
              <tr key={a.id} className="border-t border-black/[0.06] first:border-t-0">
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-white px-4 py-4 align-top text-[14px] font-[650] tracking-[-0.01em] text-[var(--color-ink)]"
                >
                  {a.page && a.page !== "/" ? (
                    <Link href={a.page} className="underline decoration-black/20 underline-offset-4 hover:decoration-[var(--color-ink)]">
                      {a.name}
                    </Link>
                  ) : (
                    a.name
                  )}
                  <span className="mt-1 block text-[11.5px] font-medium text-[var(--color-ink-3)]">{a.kind}</span>
                </th>
                {cols.map((c) => (
                  <td key={c.key} className="px-4 py-4 align-top text-[var(--color-ink-2)]">
                    <CellText cell={a.cells[c.key]} index={index} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MatrixBlock({ b, apps, index }: { b: Extract<Block, { kind: "matrix" }>; apps: AppEntry[]; index: SourceIndex }) {
  return (
    <section id="matrix" className="w-full scroll-mt-24">
      <Section as="div" innerClassName="py-14 lg:py-20">
        {b.label && <Label>{b.label}</Label>}
        <h2 className={H2}>{b.title}</h2>
        {b.intro && <p className="mt-4 max-w-[70ch] text-[15px] leading-[1.6] text-[var(--color-ink-2)]">{b.intro}</p>}
        <div className="mt-8">
          <Matrix apps={apps} index={index} columns={b.columns} />
        </div>
        <p className="mt-4 text-[13px] text-[var(--color-ink-3)]">
          Synq&apos;s cells come from the app itself. Every other cell links to its source.
        </p>
      </Section>
    </section>
  );
}

function Steps({ b }: { b: Extract<Block, { kind: "steps" }> }) {
  return (
    <Wrap>
      {b.label && <Label>{b.label}</Label>}
      <h2 className={H2}>{b.title}</h2>
      {b.intro && <p className="mt-4 max-w-[64ch] text-[16px] leading-[1.65] text-[var(--color-ink-2)]">{b.intro}</p>}
      <ol className="synq-card mt-8 flex flex-col">
        {b.steps.map((s, i) => (
          <li key={s.title} className={`flex gap-4 p-6 lg:gap-5 lg:p-7 ${i > 0 ? "border-t border-black/[0.06]" : ""}`}>
            <span className="flex h-[26px] w-[26px] flex-none items-center justify-center rounded-full bg-[var(--color-ink)] text-[12.5px] font-[650] text-white tabular-nums">
              {i + 1}
            </span>
            <div>
              <h3 className="text-[16px] font-[650] tracking-[-0.01em]">{s.title}</h3>
              <p className="mt-1.5 max-w-[70ch] text-[15px] leading-[1.6] text-[var(--color-ink-2)]">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </Wrap>
  );
}

function AppsBlock({ b, apps, index }: { b: Extract<Block, { kind: "apps" }>; apps: AppEntry[]; index: SourceIndex }) {
  return (
    <Wrap>
      {b.label && <Label>{b.label}</Label>}
      <h2 className={H2}>{b.title}</h2>
      {b.intro && <p className="mt-4 max-w-[64ch] text-[16px] leading-[1.65] text-[var(--color-ink-2)]">{b.intro}</p>}
      <ol className="mt-8 flex flex-col gap-3 lg:gap-4">
        {apps.map((a, i) => (
          <li key={a.id} id={`app-${a.id}`} className="synq-card scroll-mt-24 p-6 lg:p-8">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-[13px] font-[650] tabular-nums text-[var(--color-ink-3)]">{i + 1}.</span>
              <h3 className="text-[22px] font-[650] leading-[1.2] tracking-[-0.015em]">{a.name}</h3>
              <span className="rounded-[8px] bg-[var(--color-well)] px-2.5 py-1 text-[12px] font-semibold text-[var(--color-set)]">
                {a.kind}
              </span>
              {a.id === "synq" && (
                <span className="rounded-[8px] bg-[var(--color-well)] px-2.5 py-1 text-[12px] font-semibold text-[var(--color-set)]">
                  Our app
                </span>
              )}
            </div>
            <p className="mt-4 text-[15.5px] leading-[1.65] text-[var(--color-ink)]">
              <b className="font-[650]">Best for:</b> {a.bestFor}
            </p>
            <p className="mt-3 text-[15px] leading-[1.65] text-[var(--color-ink-2)]">
              {a.summary}
              <Marks ids={a.sources} index={index} />
            </p>
            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[var(--color-ink-3)]">Good at</p>
                <ul className="mt-2.5 flex flex-col gap-2">
                  {a.strengths.slice(0, 2).map((s) => (
                    <li key={s} className="flex items-start gap-3 text-[14.5px] leading-[1.55]">
                      <span className="mt-[8px] h-[5px] w-[5px] flex-none rounded-full bg-[var(--color-ink)]" aria-hidden="true" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[var(--color-ink-3)]">Know before you install</p>
                <ul className="mt-2.5 flex flex-col gap-2">
                  {a.limits.slice(0, 2).map((s) => (
                    <li key={s} className="flex items-start gap-3 text-[14.5px] leading-[1.55] text-[var(--color-ink-2)]">
                      <span className="mt-[8px] h-[5px] w-[5px] flex-none rounded-full bg-[var(--color-ink-4)]" aria-hidden="true" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[14px] font-semibold">
              {a.page && a.page !== "/" && (
                <Link href={a.page} className="underline decoration-black/20 underline-offset-4 hover:decoration-[var(--color-ink)]">
                  {a.kind === "Platform" ? `${a.name.replace(/ \(.*\)$/, "")} alternative` : `${a.name} vs Synq`}
                </Link>
              )}
              <a
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-black/20 underline-offset-4 hover:decoration-[var(--color-ink)]"
              >
                {a.kind === "Shopify app" ? "App Store listing" : "Their site"}
              </a>
            </p>
          </li>
        ))}
      </ol>
    </Wrap>
  );
}

export function LinkChips({ links }: { links: PageLink[] }) {
  return (
    <ul className="flex flex-wrap gap-2.5">
      {links.map((l) => (
        <li key={l.href}>
          <Link
            href={l.href}
            className="synq-card synq-card-hover inline-flex h-11 items-center rounded-full px-4 text-[14.5px] font-[600] tracking-[-0.01em]"
          >
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Links({ b }: { b: Extract<Block, { kind: "links" }> }) {
  return (
    <Wrap tight>
      {b.label && <Label>{b.label}</Label>}
      <h2 className={H2}>{b.title}</h2>
      {b.intro && <p className="mt-4 max-w-[64ch] text-[16px] leading-[1.65] text-[var(--color-ink-2)]">{b.intro}</p>}
      <div className="mt-6">
        <LinkChips links={b.links} />
      </div>
    </Wrap>
  );
}

export function BlockView({ b, apps, index }: { b: Block; apps: AppEntry[]; index: SourceIndex }) {
  switch (b.kind) {
    case "prose":
      return <Prose b={b} index={index} />;
    case "split":
      return <Split b={b} />;
    case "vs":
      return <Vs b={b} index={index} />;
    case "matrix":
      return <MatrixBlock b={b} apps={apps} index={index} />;
    case "steps":
      return <Steps b={b} />;
    case "apps":
      return <AppsBlock b={b} apps={apps} index={index} />;
    case "links":
      return <Links b={b} />;
  }
}
