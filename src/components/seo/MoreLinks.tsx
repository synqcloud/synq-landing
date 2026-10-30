import Section from "@/components/landing/Section";
import { GAMES } from "@/content/games";
import { Label } from "./ui";

/* Links between the SEO pages: the other games and the comparison. */
export default function MoreLinks({ current }: { current?: string }) {
  const links = [
    ...GAMES.filter((g) => g.slug !== current).map((g) => ({
      href: `/for/${g.slug}`,
      label: g.name,
      icon: g.icon as string | undefined,
    })),
    ...(current === "synq-vs-spreadsheets"
      ? []
      : [{ href: "/synq-vs-spreadsheets", label: "Synq vs spreadsheets", icon: undefined }]),
  ];

  return (
    <nav aria-labelledby="more-title" className="w-full bg-[var(--color-canvas)] text-[var(--color-ink)]">
      <Section as="div" innerClassName="py-16 lg:py-20">
        <div id="more-title">
          <Label>{current && current !== "synq-vs-spreadsheets" ? "Synq for other games" : "Synq for your game"}</Label>
        </div>
        <ul className="mt-5 flex flex-wrap gap-2.5">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="synq-card synq-card-hover inline-flex h-11 items-center gap-2.5 rounded-full px-4 text-[14.5px] font-[600] tracking-[-0.01em]"
              >
                {l.icon && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={l.icon} alt="" width={18} height={18} className="h-[18px] w-[18px] object-contain" />
                )}
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </nav>
  );
}
