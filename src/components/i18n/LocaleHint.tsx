"use client";

import { useEffect, useState, useTransition } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { isEnglishOnly } from "@/lib/site";

/* The site never redirects by browser language (crawlers must get the URL
   they asked for). Instead, when the browser prefers another language we
   have, a small card offers it, written in that language. Once taken or
   dismissed it never shows again; picking a language in the navbar counts. */

export const HINT_KEY = "synq-locale-hint";

const COPY: Record<string, { text: string; cta: string; close: string }> = {
  en: { text: "Synq is also available in English.", cta: "View in English", close: "Close" },
  es: { text: "Synq también está en español.", cta: "Ver en español", close: "Cerrar" },
  ca: { text: "Synq també és en català.", cta: "Veure en català", close: "Tanca" },
  fr: { text: "Synq existe aussi en français.", cta: "Voir en français", close: "Fermer" },
  de: { text: "Synq gibt es auch auf Deutsch.", cta: "Auf Deutsch ansehen", close: "Schließen" },
  pt: { text: "O Synq também está em português.", cta: "Ver em português", close: "Fechar" },
  it: { text: "Synq è disponibile anche in italiano.", cta: "Vedi in italiano", close: "Chiudi" },
  ja: { text: "Synqは日本語でもご覧いただけます。", cta: "日本語で見る", close: "閉じる" },
  ko: { text: "Synq를 한국어로도 볼 수 있어요.", cta: "한국어로 보기", close: "닫기" },
  eu: { text: "Synq euskaraz ere badago.", cta: "Ikusi euskaraz", close: "Itxi" },
};

/** The first of the browser's languages that the site has, by base code. */
function preferredLocale(): string | null {
  const langs = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const l of langs) {
    const base = l?.toLowerCase().split("-")[0];
    if (base && (routing.locales as readonly string[]).includes(base)) return base;
  }
  return null;
}

export function rememberLocaleChoice() {
  try {
    localStorage.setItem(HINT_KEY, "done");
  } catch {}
}

export default function LocaleHint() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [target, setTarget] = useState<string | null>(null);

  useEffect(() => {
    /* English-only pages (blog, games, legal…) have nothing to switch to */
    if (isEnglishOnly(pathname)) return setTarget(null);
    try {
      if (localStorage.getItem(HINT_KEY)) return;
    } catch {
      return;
    }
    const want = preferredLocale();
    if (!want || want === locale || !COPY[want]) return;
    const id = setTimeout(() => setTarget(want), 1200);
    return () => clearTimeout(id);
  }, [locale, pathname]);

  if (!target) return null;
  const copy = COPY[target];

  const dismiss = () => {
    rememberLocaleChoice();
    setTarget(null);
  };
  const go = () => {
    rememberLocaleChoice();
    setTarget(null);
    startTransition(() => router.replace(pathname, { locale: target }));
  };

  return (
    <div
      role="region"
      aria-label={copy.text}
      lang={target}
      className="locale-hint fixed bottom-4 left-4 right-4 z-50 flex items-center gap-3 rounded-[14px] bg-white py-2.5 pl-4 pr-2.5 text-[14px] text-[var(--color-ink)] sm:right-auto sm:max-w-[420px]"
    >
      <p className="min-w-0 flex-1 leading-snug">{copy.text}</p>
      <button
        type="button"
        onClick={go}
        className="h-9 flex-none rounded-full bg-[var(--color-ink)] px-4 text-[13.5px] font-semibold text-white"
      >
        {copy.cta}
      </button>
      <button
        type="button"
        onClick={dismiss}
        aria-label={copy.close}
        className="grid size-9 flex-none place-items-center rounded-full text-[var(--color-ink-2)] hover:bg-[var(--color-well)]"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>
    </div>
  );
}
