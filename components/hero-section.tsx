"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const SHOPIFY_URL = "https://apps.shopify.com/synq-tcg-card-manager";

const games = [
  { src: "/games/mtg.png",       label: "MTG" },
  { src: "/games/pokemon.png",   label: "Pokémon" },
  { src: "/games/lorcana.png",   label: "Lorcana" },
  { src: "/games/riftbound.png", label: "Riftbound" },
];

export function HeroSection() {
  return (
    <section className="relative pt-20 sm:pt-28 pb-0 overflow-hidden">

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="grid lg:grid-cols-[5fr,7fr] gap-10 lg:gap-14 items-center">

          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-[2.4rem] sm:text-[2.75rem] lg:text-5xl font-bold leading-[1.1] tracking-[-0.03em] mb-5">
              <span className="text-foreground">Your card shop,</span>
              <br />
              <span className="text-primary">always priced to sell.</span>
            </h1>

            <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-sm">
              Synq pulls live prices from TCGPlayer every 24 hours and
              keeps your entire Shopify inventory up to date — automatically.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={SHOPIFY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-lg hover:opacity-80 transition-opacity shadow-sm"
              >
                <Image src="/shopify.svg" alt="" width={13} height={13} className="opacity-90" aria-hidden />
                Install on Shopify
              </a>
              <span className="text-xs text-muted-foreground">Free 7-day trial</span>
            </div>
          </motion.div>

          {/* Right — screenshot, bleeds slightly to the right edge */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.12 }}
            className="screenshot-frame lg:-mr-6"
          >
            <Image
              src="/brand/dashboard.png"
              alt="Synq dashboard — manage card inventory and update prices in bulk"
              width={1400}
              height={820}
              sizes="(max-width: 768px) 100vw, 65vw"
              className="w-full h-auto"
              quality={92}
              priority
            />
          </motion.div>
        </div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-10 pt-6 pb-10 border-t border-border"
        >
          <div className="flex flex-wrap items-center gap-5 sm:gap-8">
            <span className="text-xs text-subtle font-medium uppercase tracking-widest">
              Pricing powered by
            </span>
            <div className="flex items-center gap-1.5 text-sm text-subtle">
              <Image src="/tcgplayer.svg" alt="" width={14} height={14} className="h-3.5 w-auto opacity-40" aria-hidden />
              TCGPlayer
            </div>
            <div className="hidden sm:block w-px h-4 bg-border" />
            <div className="flex items-center gap-4">
              {games.map((g) => (
                <div key={g.label} className="flex items-center gap-1.5 text-sm text-subtle">
                  <Image src={g.src} alt="" width={16} height={16} className="h-4 w-4 object-contain" aria-hidden loading="eager" />
                  {g.label}
                </div>
              ))}
              <span className="text-xs text-subtle">and more</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
