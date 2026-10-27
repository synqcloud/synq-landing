"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const SHOPIFY_URL = "https://apps.shopify.com/synq-tcg-card-manager";

const games = [
  { src: "/games/mtg.png", label: "Magic" },
  { src: "/games/pokemon.png", label: "Pokémon" },
  { src: "/games/lorcana.png", label: "Lorcana" },
  { src: "/games/onepiece.png", label: "One Piece" },
  { src: "/games/yugioh.png", label: "Yu-Gi-Oh!" },
];

const facts = ["Free 7-day trial", "No TCGplayer account needed", "Works with Shopify POS"];

export function HeroSection() {
  return (
    <section className="relative pt-16 sm:pt-24 pb-16 overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <span className="inline-block text-xs font-semibold text-subtle uppercase tracking-widest mb-5">
            Shopify app for trading card stores
          </span>

          <h1 className="text-[2.5rem] sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.05] tracking-[-0.035em] mb-6">
            <span className="text-foreground">Your card shop on Shopify,</span>{" "}
            <span className="text-muted-foreground">always priced to sell.</span>
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl">
            Add singles, sealed and decks from a catalog or your spreadsheet. Price rules keep
            every card in step with TCGplayer market prices, on a schedule you choose.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <a
              href={SHOPIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-5 py-3 rounded-lg hover:opacity-85 transition-opacity"
            >
              <Image src="/shopify.svg" alt="" width={14} height={14} aria-hidden />
              Install on Shopify
            </a>
            <a
              href="#price-rules"
              className="text-sm font-semibold text-foreground underline underline-offset-4 hover:opacity-60 transition-opacity"
            >
              See how pricing works
            </a>
          </div>

          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-muted-foreground">
            {facts.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span aria-hidden className="w-1 h-1 rounded-full bg-subtle" />
                {f}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="screenshot-frame mt-12 sm:mt-14"
        >
          <Image
            src="/screens/rule-preview-hero.webp"
            alt="A Synq price rule previewing each Pokémon card's new price, up or down, before it runs"
            width={2000}
            height={1272}
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="w-full h-auto"
            quality={90}
            priority
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="text-xs font-semibold text-subtle uppercase tracking-widest">Prices from</span>
            <Image src="/tcgplayer.svg" alt="" width={14} height={14} className="h-3.5 w-auto opacity-60" aria-hidden />
            TCGplayer
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {games.map((g) => (
              <span key={g.label} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Image src={g.src} alt="" width={16} height={16} className="h-4 w-4 object-contain" aria-hidden />
                {g.label}
              </span>
            ))}
            <a href="#games" className="text-sm text-foreground underline underline-offset-4 hover:opacity-60 transition-opacity">
              +14 more games
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
