"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const SHOPIFY_URL = "https://apps.shopify.com/synq-tcg-card-manager";

export function InstallRequestSection() {
  return (
    <section id="get-started" className="py-20">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="bg-primary rounded-2xl px-8 sm:px-14 py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-10"
        >
          <div className="max-w-lg">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary-foreground tracking-[-0.03em] leading-[1.2] mb-4">
              Stop leaving money on the table.
              <br />
              <span className="text-primary-foreground/60">Your prices should always be competitive.</span>
            </h2>
            <p className="text-sm text-primary-foreground/50 leading-relaxed">
              Join card shop owners already using Synq to automate their pricing.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 flex-shrink-0">
            <a
              href={SHOPIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary-foreground text-primary text-sm font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity shadow-sm"
            >
              <Image src="/shopify.svg" alt="" width={14} height={14} className="h-3.5 w-3.5 opacity-60" aria-hidden />
              Install on Shopify
            </a>
            <p className="text-xs text-primary-foreground/30">
              Free for 7 days
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
