"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

export function PosSection() {
  return (
    <section id="point-of-sale" className="py-10">
      <div className="max-w-5xl mx-auto px-6 border-t border-border pt-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div {...reveal} transition={{ duration: 0.5 }}>
            <span className="inline-block text-xs font-semibold text-subtle uppercase tracking-widest mb-3">
              Point of Sale
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-[-0.02em] mb-4">
              Scan a card at the counter.
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-4">
              Singles have no barcode of their own, so Synq gives each card and condition a unique
              code. Sealed product gets the barcode printed on its box.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              Print labels with Shopify&apos;s free Retail Barcode Labels app. A scan in Shopify POS
              rings up the exact card and condition, and the stock updates online too.
            </p>
          </motion.div>

          <motion.div {...reveal} transition={{ duration: 0.5, delay: 0.1 }} className="screenshot-frame">
            <Image
              src="/screens/pos-settings.webp"
              alt="Synq's Point of Sale settings: barcodes for sealed products and single cards, and TCGplayer SKUs"
              width={1959}
              height={1325}
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
