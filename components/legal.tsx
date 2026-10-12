"use client";

import { Nav } from "@/components/nav";
import { motion } from "framer-motion";

const SUPPORT_EMAIL = "help@trysynq.com";

// The legal holder behind synq. Shown only on /legal (Spain's LSSI art. 10
// requires name, tax id and address on the site); the policies say "synq".
export const LEGAL_HOLDER = {
  name: "Telmo Beroiz Bilbao",
  taxId: "73234079D",
  address: "20800 Zarautz (Gipuzkoa), Spain",
};

export type LegalSection = { id: string; title: string; body: React.ReactNode };

const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.25, 0, 1] },
  },
};

/** A policy page: title, a fixed "last updated" date, an index, then the sections. */
export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  /** Changed by hand when the text changes. Never `new Date()`: a moving date
   *  claims the text changed when it did not. */
  updated: string;
  intro: React.ReactNode;
  sections: LegalSection[];
}) {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="pt-32 pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <h1 className="text-3xl sm:text-4xl font-light tracking-[-0.01em] text-foreground mb-3">
              {title}
            </h1>
            <p className="text-sm text-muted-foreground">
              Last updated: {updated}
            </p>

            <div className="mt-8 text-body text-muted-foreground leading-relaxed space-y-4">
              {intro}
            </div>

            {sections.length > 1 && (
              <nav className="mt-8 rounded-lg border border-border p-5">
                <ol className="grid gap-1.5 text-sm sm:grid-cols-2">
                  {sections.map((s, i) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        {i + 1}. {s.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <div className="mt-10 space-y-10 text-sm text-muted-foreground leading-relaxed">
              {sections.map((s, i) => (
                <section key={s.id} id={s.id} className="scroll-mt-28">
                  <h2 className="text-section-heading">
                    {sections.length > 1 && `${i + 1}. `}
                    {s.title}
                  </h2>
                  <div className="space-y-3 text-body">{s.body}</div>
                </section>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

/** Bulleted list with the page's spacing. */
export function List({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="list-disc pl-5 space-y-1.5">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export function SupportEmail() {
  return (
    <a
      href={`mailto:${SUPPORT_EMAIL}`}
      className="text-blue-600 hover:text-blue-800"
    >
      {SUPPORT_EMAIL}
    </a>
  );
}

export function Link({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} className="text-blue-600 hover:text-blue-800">
      {children}
    </a>
  );
}
