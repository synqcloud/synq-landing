"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const parts = [
  { label: "Which cards", desc: "A game, sets, rarities, printings or conditions. The most specific rule wins." },
  { label: "The price", desc: "TCGplayer market, plus or minus a percentage and a dollar amount." },
  { label: "Each condition", desc: "Its own market price, or Near Mint minus a percentage you set." },
  { label: "A minimum", desc: "A fixed amount, or your cost plus a margin. Then round to .49, .99 or .00." },
  { label: "When it runs", desc: "Every day, on the days you pick, or by hand. Included on every plan." },
];

const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

export function PriceRulesSection() {
  return (
    <section id="price-rules" className="py-10 bg-muted">
      <div className="max-w-5xl mx-auto px-6 border-t border-border pt-16">
        <motion.div {...reveal} transition={{ duration: 0.5 }} className="mb-10">
          <span className="inline-block text-xs font-semibold text-subtle uppercase tracking-widest mb-3">
            Price rules
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-[-0.02em] mb-3 max-w-xl">
            Automated card pricing from TCGplayer market data.
          </h2>
          <p className="text-base text-muted-foreground max-w-lg leading-relaxed">
            Set your pricing once with rules. A rule says which cards it prices and how; before it
            runs, its preview shows every price that would move, and each run is kept in the
            activity log. More in{" "}
            <Link href="/blog/automate-card-pricing-shopify" className="text-foreground underline underline-offset-4">
              how to automate card pricing on Shopify
            </Link>
            .
          </p>
        </motion.div>

        <motion.div {...reveal} transition={{ duration: 0.5, delay: 0.08 }} className="screenshot-frame">
          <Image
            src="/screens/price-rules.webp"
            alt="Four Synq price rules with their formulas and schedules, next to the activity of their latest runs"
            width={2000}
            height={597}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
            className="w-full h-auto"
            quality={90}
          />
        </motion.div>

        <div className="mt-12 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div {...reveal} transition={{ duration: 0.5 }}>
            <h3 className="text-lg font-semibold text-foreground mb-4">What a price rule decides</h3>
            <div className="bg-card rounded-[14px] overflow-hidden shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04),0_10px_28px_-16px_rgba(0,0,0,0.18)]">
              {parts.map((p, i) => (
                <div
                  key={p.label}
                  className={`px-4 py-3 ${i < parts.length - 1 ? "border-b border-border" : ""}`}
                >
                  <p className="text-sm font-semibold text-foreground">{p.label}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{p.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mt-5">
              A card you want to handle yourself gets its own formula or minimum, or stays out of
              rules altogether. Select the cards and pick what changes.
            </p>
          </motion.div>

          <motion.div {...reveal} transition={{ duration: 0.5, delay: 0.1 }} className="screenshot-frame">
            <Image
              src="/screens/exceptions.webp"
              alt="Setting exceptions to their price rules for four selected cards in Synq's inventory"
              width={1800}
              height={1034}
              sizes="(max-width: 768px) 100vw, 600px"
              className="w-full h-auto"
              quality={90}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
