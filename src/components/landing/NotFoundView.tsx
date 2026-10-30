import Section from "./Section";
import { localePath } from "@/lib/site";

/* The 404, on the hero's ground: say plainly that the page isn't here and
   offer the three places most people were looking for. The headline is
   English in every language (no translation key yet); the links use each
   language's own labels. */
export default function NotFoundView({
  locale = "en",
  labels = { home: "Home", docs: "Help center", blog: "Blog", title: "This page isn't here.", body: "The link may be old or mistyped. These are the pages most people are looking for:" },
}: {
  locale?: string;
  labels?: { home: string; docs: string; blog: string; title?: string; body?: string };
}) {
  const links = [
    { href: localePath(locale, "/"), label: labels.home, primary: true },
    { href: localePath(locale, "/docs"), label: labels.docs },
    { href: "/blog", label: labels.blog, lang: "en" },
  ];
  return (
    <section className="w-full bg-[var(--color-ink)] text-white">
      <Section as="div" innerClassName="flex min-h-[70svh] flex-col justify-center pb-24 pt-36 lg:pt-44">
        <p className="font-mono text-[12px] tracking-[0.12em] text-[var(--color-accent)]">404</p>
        <h1 className="mt-4 max-w-[18ch] text-[36px] font-medium leading-[1.06] tracking-[-0.02em] [text-wrap:balance] lg:text-[56px]">
          {labels.title ?? "This page isn't here."}
        </h1>
        <p className="mt-5 max-w-[48ch] text-[16px] leading-[1.6] text-white/65 lg:text-[18px]">
          {labels.body ?? "The link may be old or mistyped. These are the pages most people are looking for:"}
        </p>
        <ul className="mt-10 flex flex-wrap gap-3">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                hrefLang={l.lang}
                className={
                  l.primary
                    ? "inline-flex h-11 items-center rounded-full bg-[var(--color-accent)] px-5 text-[14px] font-semibold text-[var(--color-accent-ink)] transition-colors hover:bg-[var(--color-accent)]/85"
                    : "inline-flex h-11 items-center rounded-full border border-white/15 px-5 text-[14px] font-medium text-white/85 transition-colors hover:bg-white/10"
                }
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </section>
  );
}
