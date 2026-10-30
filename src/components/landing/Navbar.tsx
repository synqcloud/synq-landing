"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname, Link } from "@/i18n/navigation";
import SynqLogo from "./SynqLogo";
import { isEnglishOnly } from "@/lib/site";
import { rememberLocaleChoice } from "@/components/i18n/LocaleHint";
import { localePath } from "@/lib/site";

/* each language in its own name, so a reader finds theirs at a glance */
const LANGUAGES = [
  { code: "en", label: "EN", name: "English" },
  { code: "es", label: "ES", name: "Español" },
  { code: "ca", label: "CA", name: "Català" },
  { code: "fr", label: "FR", name: "Français" },
  { code: "de", label: "DE", name: "Deutsch" },
  { code: "pt", label: "PT", name: "Português" },
  { code: "it", label: "IT", name: "Italiano" },
  { code: "ja", label: "JA", name: "日本語" },
  { code: "ko", label: "KO", name: "한국어" },
  { code: "eu", label: "EU", name: "Euskara" },
] as const;

function LanguageSelector() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [focus, setFocus] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const current = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];

  const choose = (code: string) => {
    setOpen(false);
    button.current?.focus();
    /* pages only in English (blog, games, legal…) have no other language:
       switching goes to that language's home instead of bouncing back */
    const target = code !== "en" && isEnglishOnly(pathname) ? "/" : pathname;
    rememberLocaleChoice();
    if (code !== locale) startTransition(() => router.replace(target, { locale: code }));
  };

  /* opening puts focus on the current language; a click outside closes */
  useEffect(() => {
    if (!open) return;
    setFocus(Math.max(0, LANGUAGES.findIndex((l) => l.code === locale)));
    list.current?.focus();
    const away = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", away);
    return () => document.removeEventListener("pointerdown", away);
  }, [open, locale]);

  const onKey = (e: React.KeyboardEvent) => {
    const n = LANGUAGES.length;
    if (e.key === "ArrowDown") setFocus((f) => (f + 1) % n);
    else if (e.key === "ArrowUp") setFocus((f) => (f - 1 + n) % n);
    else if (e.key === "Home") setFocus(0);
    else if (e.key === "End") setFocus(n - 1);
    else if (e.key === "Enter" || e.key === " ") choose(LANGUAGES[focus].code);
    else if (e.key === "Escape" || e.key === "Tab") {
      setOpen(false);
      if (e.key === "Escape") button.current?.focus();
      return;
    } else return;
    e.preventDefault();
  };

  return (
    <div ref={root} className="relative hidden lg:block">
      <button
        ref={button}
        type="button"
        aria-label={`${t("langAria")}: ${current.name}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        className={`inline-flex h-10 items-center gap-2 rounded-full pl-3 pr-3 text-[14px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
          open ? "bg-white/10 text-white" : "text-white/80 hover:bg-white/10 hover:text-white"
        }`}
      >
        <svg className="h-4 w-4 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        {current.label}
        <svg
          className={`h-3 w-3 opacity-60 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 4.5 6 7.5 9 4.5" />
        </svg>
      </button>

      <ul
        ref={list}
        role="listbox"
        tabIndex={-1}
        aria-label={t("langAria")}
        aria-activedescendant={open ? `lang-${LANGUAGES[focus].code}` : undefined}
        onKeyDown={onKey}
        className={`lang-menu absolute right-0 top-[calc(100%+10px)] w-[208px] rounded-[16px] bg-[#1c1b1a] p-1.5 outline-none ${
          open ? "is-open" : ""
        }`}
      >
        {LANGUAGES.map((l, i) => {
          const active = l.code === locale;
          return (
            <li
              key={l.code}
              id={`lang-${l.code}`}
              role="option"
              aria-selected={active}
              lang={l.code}
              onPointerEnter={() => setFocus(i)}
              onClick={() => choose(l.code)}
              className={`flex h-9 cursor-pointer items-center gap-3 rounded-[10px] px-3 text-[14px] transition-colors ${
                i === focus ? "bg-white/[0.08] text-white" : "text-white/75"
              }`}
            >
              <span className="flex-1">{l.name}</span>
              {active ? (
                <svg className="h-3.5 w-3.5 text-[var(--color-accent)]" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m3.5 8.5 3 3 6-7" />
                </svg>
              ) : (
                <span className="text-[11.5px] font-semibold tracking-[0.04em] text-white/35">{l.label}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const navLinks = [
    { key: "features", hash: "#new-stock", anchor: true },
    { key: "pricing", hash: "#pricing", anchor: true },
    { key: "docs", href: "/docs", anchor: false },
  ] as const;

  return (
    <nav
      aria-label={t("ariaMain")}
      className="pointer-events-none fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`pointer-events-auto relative z-10 mx-auto w-full transition-[background-color,backdrop-filter,border-color,border-radius,max-width,margin] duration-300 ${
          scrolled
            ? "mt-3 max-w-[1280px] rounded-full border border-white/10 bg-[rgb(28_26_25/0.86)] shadow-[0_12px_32px_-16px_rgb(0_0_0/0.45)] backdrop-blur-xl"
            : "mt-0 max-w-none rounded-none border border-transparent bg-transparent"
        }`}
      >
        <div className="relative mx-auto flex w-full max-w-[1240px] items-center justify-between px-6 py-4 lg:py-5">
          <Link
            href="/"
            aria-label={t("logoAria")}
            className="text-white outline-none transition-opacity hover:opacity-80"
          >
            <SynqLogo className="h-7 lg:h-8" invert />
          </Link>

          <ul className="absolute left-1/2 hidden -translate-x-1/2 flex-row items-center gap-1 lg:flex">
            {navLinks.map((item) =>
              item.anchor ? (
                <li key={item.key}>
                  <a
                    href={localePath(locale, item.hash)}
                    className="inline-flex h-10 cursor-pointer items-center gap-1 rounded-full bg-transparent px-4 text-[15px] text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {t(`links.${item.key}`)}
                  </a>
                </li>
              ) : (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="inline-flex h-10 cursor-pointer items-center gap-1 rounded-full bg-transparent px-4 text-[15px] text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {t(`links.${item.key}`)}
                  </Link>
                </li>
              ),
            )}
          </ul>

          <div className="flex items-center gap-2">
            <LanguageSelector />

            <button
              type="button"
              aria-label={t("menu")}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="relative ml-1 flex h-10 w-10 flex-col items-center justify-center rounded-lg lg:hidden"
            >
              <span
                className={`absolute h-[2px] w-5 rounded-full bg-white/90 transition-transform duration-300 ${
                  open ? "rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span
                className={`absolute h-[2px] w-5 rounded-full bg-white/90 transition-transform duration-300 ${
                  open ? "-rotate-45" : "translate-y-1.5"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`pointer-events-auto fixed inset-x-0 top-0 z-0 origin-top overflow-hidden bg-neutral-950/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 lg:hidden ${
          open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="flex h-screen flex-col px-6 pb-8 pt-24">
          <ul className="flex flex-col gap-1">
            {navLinks.map((item) =>
              item.anchor ? (
                <li key={item.key}>
                  <a
                    href={localePath(locale, item.hash)}
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center rounded-2xl px-4 py-4 text-[18px] font-medium text-white/90 transition-colors hover:bg-white/5"
                  >
                    {t(`links.${item.key}`)}
                  </a>
                </li>
              ) : (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center rounded-2xl px-4 py-4 text-[18px] font-medium text-white/90 transition-colors hover:bg-white/5"
                  >
                    {t(`links.${item.key}`)}
                  </Link>
                </li>
              ),
            )}
          </ul>

          <div className="mt-auto flex flex-col gap-4 pt-6">
            <MobileLanguageSelector />
          </div>
        </div>
      </div>
    </nav>
  );
}

function MobileLanguageSelector() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  return (
    <div className="flex flex-wrap gap-2">
      {LANGUAGES.map((l) => {
        const active = l.code === locale;
        return (
          <button
            key={l.code}
            type="button"
            aria-label={`${t("langAria")}: ${l.name}`}
            aria-pressed={active}
            lang={l.code}
            onClick={() =>
              startTransition(() => {
                rememberLocaleChoice();
                router.replace(l.code !== "en" && isEnglishOnly(pathname) ? "/" : pathname, { locale: l.code });
              })
            }
            className={`h-10 rounded-full px-4 text-[14px] transition-colors ${
              active
                ? "bg-white text-black"
                : "bg-white/10 text-white/80 hover:bg-white/20"
            }`}
          >
            {l.name}
          </button>
        );
      })}
    </div>
  );
}
