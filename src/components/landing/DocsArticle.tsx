"use client";

import { Fragment, useState, type ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import Section from "./Section";
import { localePath } from "@/lib/site";

type SectionData = {
  id: string;
  title: string;
  paragraphs?: string[];
  steps?: string[];
  list?: string[];
  table?: { head: string[]; rows: string[][] };
  note?: { title?: string; body: string };
};

export default function DocsArticle({
  articleKey,
  prev,
  next,
}: {
  articleKey: string;
  prev: string | null;
  next: string | null;
}) {
  const t = useTranslations("docs");
  const ui = useTranslations("docs.article");
  const locale = useLocale();
  const raw = (key: string) => t.raw(`articles.${articleKey}.${key}`);
  const sections = raw("sections") as SectionData[];
  const category = t.raw(
    `categories.${raw("category") as string}.title`,
  ) as string;
  const r = (text: string) => rich(text, locale);

  return (
    <article className="w-full bg-[var(--color-ink)] text-white">
      <Section innerClassName="pt-28 pb-20 lg:pt-32 lg:pb-24">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-[13px] text-white/55"
        >
          <a
            href={localePath(locale, "/docs")}
            className="transition-colors hover:text-[var(--color-accent)]"
          >
            {ui("home")}
          </a>
          <span className="text-white/30">/</span>
          <span className="text-white/40">{category}</span>
        </nav>

        <header className="mt-6 max-w-[820px]">
          <p className="font-mono text-[12px] tracking-[0.12em] text-[var(--color-accent)]">
            {category}
          </p>
          <h1 className="mt-4 text-[32px] font-medium leading-[1.1] tracking-[-0.02em] lg:text-[44px]">
            {raw("title") as string}
          </h1>
          <p className="mt-5 text-[16px] leading-[1.6] text-white/65 lg:text-[18px]">
            {r(raw("intro") as string)}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-[12px] uppercase tracking-[0.12em] text-white/40">
            <span>{ui("updated")}</span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>{raw("readTime") as string}</span>
          </div>
        </header>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_240px] lg:gap-16">
          <div className="flex flex-col gap-12 lg:max-w-[720px]">
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="text-[22px] font-medium leading-[1.25] tracking-[-0.01em] lg:text-[26px]">
                  {s.title}
                </h2>
                {s.paragraphs && (
                  <div className="mt-4 flex flex-col gap-4 text-[15px] leading-[1.7] text-white/75 lg:text-[16px]">
                    {s.paragraphs.map((p, i) => (
                      <p key={i}>{r(p)}</p>
                    ))}
                  </div>
                )}
                {s.steps && (
                  <ol className="mt-5 flex flex-col gap-3 text-[15px] leading-[1.6] text-white/75">
                    {s.steps.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-px flex h-6 w-6 flex-none items-center justify-center rounded-full bg-white/[0.06] font-mono text-[12px] text-[var(--color-accent)] ring-1 ring-inset ring-white/10">
                          {i + 1}
                        </span>
                        <span>{r(item)}</span>
                      </li>
                    ))}
                  </ol>
                )}
                {s.list && (
                  <ul className="mt-4 flex flex-col gap-2 text-[15px] leading-[1.6] text-white/75">
                    {s.list.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-[9px] h-1.5 w-1.5 flex-none rounded-full bg-[var(--color-accent)]" />
                        <span>{r(item)}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {s.table && (
                  <div className="mt-5 overflow-x-auto rounded-2xl ring-1 ring-inset ring-white/10">
                    <table className="w-full border-collapse text-left text-[14px] leading-[1.5]">
                      <thead>
                        <tr className="bg-white/[0.04]">
                          {s.table.head.map((h, i) => (
                            <th
                              key={i}
                              scope="col"
                              className="px-4 py-3 text-[11px] font-medium uppercase tracking-[0.12em] text-white/50"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {s.table.rows.map((row, i) => (
                          <tr key={i} className="border-t border-white/10">
                            {row.map((cell, j) => (
                              <td
                                key={j}
                                className={`px-4 py-3 align-top ${
                                  j === 0 ? "font-medium text-white/90" : "text-white/70"
                                }`}
                              >
                                {r(cell)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {s.note && (
                  <div className="mt-5 flex items-start gap-3 rounded-2xl bg-[var(--color-accent)]/[0.08] px-5 py-4 ring-1 ring-inset ring-[var(--color-accent)]/30">
                    <svg
                      className="mt-0.5 h-4 w-4 flex-none text-[var(--color-accent)]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4M12 8h.01" />
                    </svg>
                    <div className="text-[14px] leading-[1.6]">
                      {s.note.title && (
                        <p className="font-medium text-white">{s.note.title}</p>
                      )}
                      <p className="text-white/75">{r(s.note.body)}</p>
                    </div>
                  </div>
                )}
              </section>
            ))}

            <Feedback />
            <ArticleNav prev={prev} next={next} />
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/40">
                {ui("tocLabel")}
              </p>
              <ul className="mt-4 flex flex-col gap-2">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="text-[13px] leading-[1.5] text-white/65 transition-colors hover:text-[var(--color-accent)]"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>
    </article>
  );
}

// Renders **bold**, `code` and [label](href) inside article strings.
// Internal links ("/docs/...") get the current locale in front.
const TOKEN = /\*\*(.+?)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)/g;

function rich(text: string, locale: string): ReactNode {
  const out: ReactNode[] = [];
  let last = 0;
  let k = 0;
  for (const m of text.matchAll(TOKEN)) {
    const i = m.index ?? 0;
    if (i > last) out.push(text.slice(last, i));
    if (m[1] !== undefined) {
      out.push(
        <strong key={k++} className="font-medium text-white">
          {rich(m[1], locale)}
        </strong>,
      );
    } else if (m[2] !== undefined) {
      out.push(
        <code
          key={k++}
          className="rounded-md bg-white/[0.08] px-1.5 py-0.5 font-mono text-[0.9em] text-white/90"
        >
          {m[2]}
        </code>,
      );
    } else {
      const href = m[4];
      const external = href.startsWith("http");
      out.push(
        <a
          key={k++}
          href={localePath(locale, href)}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="text-[var(--color-accent)] underline decoration-[var(--color-accent)]/40 underline-offset-4 transition-colors hover:decoration-[var(--color-accent)]"
        >
          {m[3]}
        </a>,
      );
    }
    last = i + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out.map((n, i) => <Fragment key={i}>{n}</Fragment>);
}

function Feedback() {
  const t = useTranslations("docs.article.feedback");
  const [vote, setVote] = useState<"yes" | "no" | null>(null);

  return (
    <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-white/[0.04] p-6 ring-1 ring-inset ring-white/10 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-[15px] font-medium text-white/90">{t("question")}</p>
      {vote ? (
        <p className="text-[13px] text-white/55">
          {vote === "yes" ? t("thanks") : t("sorry")}
        </p>
      ) : (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setVote("yes")}
            className="inline-flex h-9 items-center gap-2 rounded-full bg-[var(--color-accent)] px-4 text-[13px] font-semibold text-[var(--color-accent-ink)] transition-colors hover:bg-[var(--color-accent)]/85"
          >
            {t("yes")}
          </button>
          <button
            type="button"
            onClick={() => setVote("no")}
            className="inline-flex h-9 items-center gap-2 rounded-full border border-white/15 px-4 text-[13px] font-medium text-white/85 transition-colors hover:bg-white/10"
          >
            {t("no")}
          </button>
        </div>
      )}
    </div>
  );
}

function ArticleNav({ prev, next }: { prev: string | null; next: string | null }) {
  const t = useTranslations("docs");
  const locale = useLocale();
  if (!prev && !next) return null;
  const title = (slug: string) => t.raw(`articles.${slug}.title`) as string;
  return (
    <div className="mt-6 grid grid-cols-1 gap-3 border-t border-white/10 pt-8 sm:grid-cols-2">
      <div>
        {prev && (
          <a
            href={localePath(locale, `/docs/${prev}`)}
            className="group flex flex-col gap-1 rounded-2xl p-5 ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/[0.04]"
          >
            <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/40">
              ← {t("article.prev")}
            </span>
            <span className="text-[15px] font-medium text-white group-hover:text-[var(--color-accent)]">
              {title(prev)}
            </span>
          </a>
        )}
      </div>
      <div>
        {next && (
          <a
            href={localePath(locale, `/docs/${next}`)}
            className="group flex flex-col gap-1 rounded-2xl p-5 text-right ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/[0.04]"
          >
            <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/40">
              {t("article.next")} →
            </span>
            <span className="text-[15px] font-medium text-white group-hover:text-[var(--color-accent)]">
              {title(next)}
            </span>
          </a>
        )}
      </div>
    </div>
  );
}
