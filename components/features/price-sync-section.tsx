"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function PriceSyncSection() {
  return (
    <section id="price-sync" className="py-24 bg-muted/30">
      <div className="max-w-5xl mx-auto px-6 border-t border-border pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="inline-block text-sm font-medium text-primary mb-4">
            Automatic Price Synchronization
          </span>
          <h2 className="text-2xl sm:text-3xl font-medium text-foreground mb-4 max-w-2xl">
            Your card prices, synced with the market every 24 hours
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
            Card prices change daily. A $5 card today might be $15 tomorrow
            after a tournament result. Synq shows you exactly which products
            need updating and lets you sync all prices with one click.
          </p>
        </motion.div>

        {/* Price Sync Screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-xl border border-border overflow-hidden shadow-lg mb-10"
        >
          <Image
            src="/brand/update-shopify-magic-the-gathering-card-prices.png"
            alt="Synq price sync dashboard"
            width={1200}
            height={700}
            className="w-full h-auto"
          />
        </motion.div>

        {/* Two markets section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid sm:grid-cols-2 gap-4 mb-8"
        >
          <div className="p-5 bg-background rounded-lg border border-border">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🇺🇸</span>
              <div>
                <span className="font-medium text-foreground">US Region</span>
                <div className="flex items-center gap-2 mt-1">
                  <Image
                    src="/tcgplayer.svg"
                    alt="TCGPlayer"
                    width={14}
                    height={14}
                    className="h-3.5 w-3.5"
                  />
                  <p className="text-xs text-muted-foreground">
                    Prices from TCGPlayer
                  </p>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Conditions: NM, LP, MP, HP, DMG
            </p>
          </div>
          <div className="p-5 bg-background rounded-lg border border-border">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🇪🇺</span>
              <div>
                <span className="font-medium text-foreground">EU Region</span>
                <div className="flex items-center gap-2 mt-1">
                  <Image
                    src="/cardmarket.svg"
                    alt="Cardmarket"
                    width={14}
                    height={14}
                    className="h-3.5 w-3.5"
                  />
                  <p className="text-xs text-muted-foreground">
                    Prices from Cardmarket
                  </p>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Conditions: M, NM, EX, GD, LP, PL, PO
            </p>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-3 gap-4"
        >
          <div className="p-4 bg-background rounded-lg border border-border text-center">
            <p className="text-2xl font-semibold text-foreground">24h</p>
            <p className="text-xs text-muted-foreground mt-1">Auto-sync</p>
          </div>
          <div className="p-4 bg-background rounded-lg border border-border text-center">
            <p className="text-2xl font-semibold text-foreground">1-click</p>
            <p className="text-xs text-muted-foreground mt-1">Bulk update</p>
          </div>
          <div className="p-4 bg-background rounded-lg border border-border text-center">
            <p className="text-2xl font-semibold text-foreground">$0.01</p>
            <p className="text-xs text-muted-foreground mt-1">Min threshold</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
