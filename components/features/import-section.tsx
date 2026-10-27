"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const points = [
  { label: "Any sheet", desc: "CSV, Excel or a TCGplayer export. You tell Synq which column is which." },
  { label: "Every match reviewed", desc: "New cards, cards already in your store, and the rows that need an answer." },
  { label: "Nothing lost", desc: "Rows you skip come back to you as a file." },
];

const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

export function ImportSection() {
  return (
    <section id="import" className="py-10">
      <div className="max-w-5xl mx-auto px-6 border-t border-border pt-16">
        <div className="grid lg:grid-cols-[5fr,7fr] gap-12 lg:gap-14 items-center">
          <motion.div {...reveal} transition={{ duration: 0.5 }}>
            <span className="inline-block text-xs font-semibold text-subtle uppercase tracking-widest mb-3">
              Import
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-[-0.02em] mb-4">
              Bring the inventory you already have.
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-7">
              Import a spreadsheet and Synq matches each row to the catalog. When a name fits
              several printings, it shows you the cards and you pick the one on your shelf.
            </p>
            <ul className="space-y-4">
              {points.map((p) => (
                <li key={p.label}>
                  <p className="text-sm font-semibold text-foreground">{p.label}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{p.desc}</p>
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground leading-relaxed mt-6">
              Products already in your Shopify store can be linked to Synq too.
            </p>
          </motion.div>

          <motion.div {...reveal} transition={{ duration: 0.5, delay: 0.1 }} className="screenshot-frame">
            <Image
              src="/screens/import-review.webp"
              alt="Reviewing a spreadsheet import in Synq: ten rows ready and Lightning Bolt asking which printing is on the shelf"
              width={1937}
              height={1650}
              sizes="(max-width: 768px) 100vw, 620px"
              className="w-full h-auto"
              quality={90}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
