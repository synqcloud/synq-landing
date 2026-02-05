"use client";

import { Button } from "@synq/ui/component";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="pt-24 sm:pt-32 pb-12 sm:pb-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-12 sm:mb-16 animate-fade-in">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {/* Built for Shopify Badge */}
            <div className="flex items-center gap-2 rounded-full bg-background px-4 py-2 shadow-sm border border-border">
              <Image
                src="/shopify.svg"
                alt="Shopify"
                width={20}
                height={20}
                className="h-5 w-5"
                priority
              />
              <span className="text-sm font-medium text-foreground">
                Built for Shopify
              </span>
            </div>

            {/* Built for Local Card Shops Badge */}
            <div className="flex items-center gap-2 rounded-full bg-background px-4 py-2 shadow-sm border border-border">
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Storefront icon with fill */}
                <path
                  d="M3 21V10L1 8L4 3H20L23 8L21 10V21H3Z"
                  className="fill-amber-500/20 stroke-amber-600 dark:fill-amber-400/20 dark:stroke-amber-400"
                  strokeWidth={1.5}
                  strokeLinejoin="round"
                />
                <path
                  d="M9 21V14H15V21"
                  className="stroke-amber-600 dark:stroke-amber-400"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 8H23"
                  className="stroke-amber-600 dark:stroke-amber-400"
                  strokeWidth={1.5}
                />
                <path
                  d="M7 8V10C7 11.1 6.1 12 5 12C3.9 12 3 11.1 3 10V8"
                  className="stroke-amber-600 dark:stroke-amber-400"
                  strokeWidth={1.5}
                />
                <path
                  d="M12 8V10C12 11.1 11.1 12 10 12C8.9 12 8 11.1 8 10V8"
                  className="stroke-amber-600 dark:stroke-amber-400"
                  strokeWidth={1.5}
                />
                <path
                  d="M17 8V10C17 11.1 16.1 12 15 12C13.9 12 13 11.1 13 10V8"
                  className="stroke-amber-600 dark:stroke-amber-400"
                  strokeWidth={1.5}
                />
                <path
                  d="M21 8V10C21 11.1 20.1 12 19 12C17.9 12 17 11.1 17 10V8"
                  className="stroke-amber-600 dark:stroke-amber-400"
                  strokeWidth={1.5}
                />
              </svg>
              <span className="text-sm font-medium text-foreground">
                Built for Local Card Shops
              </span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-[-0.02em] text-foreground mb-6 leading-[1.15] max-w-3xl">
            Keep your card shop competitive{" "}
            <span className="text-primary">without the busywork.</span>
          </h1>
          {/* SEO: Visible summary for users and AI crawlers */}
          <p className="hero-description text-lg text-muted-foreground mb-6 max-w-2xl leading-relaxed">
            Synq automatically syncs your Shopify card prices with market data every 24 hours. Add cards with one click, manage condition-based pricing, and update prices in bulk.
          </p>
          <div className="flex items-center gap-2 text-base text-muted-foreground mb-4 max-w-2xl flex-wrap">
            <span>For</span>
            <span className="inline-flex items-center gap-1.5">
              <Image
                src="/games/mtg.png"
                alt="Magic: The Gathering"
                width={20}
                height={20}
                className="w-5 h-5 object-contain"
                loading="eager"
              />
              <span>Magic: The Gathering,</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Image
                src="/games/pokemon.png"
                alt="Pokemon"
                width={20}
                height={20}
                className="w-5 h-5 object-contain"
                loading="eager"
              />
              <span>Pokemon,</span>
            </span>
            <span>and more.</span>
          </div>
          <div className="flex items-center gap-2 text-base text-muted-foreground mb-8 max-w-2xl flex-wrap">
            <span>Prices from</span>
            <span className="inline-flex items-center gap-1.5">
              <Image
                src="/tcgplayer.svg"
                alt="TCGPlayer"
                width={18}
                height={18}
                className="w-[18px] h-[18px] object-contain"
              />
              <span>TCGPlayer</span>
            </span>
            <span>and</span>
            <span className="inline-flex items-center gap-1.5">
              <Image
                src="/cardmarket.svg"
                alt="Cardmarket"
                width={18}
                height={18}
                className="w-[18px] h-[18px] object-contain"
              />
              <span>Cardmarket.</span>
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild>
              <a href="#get-started">Get started</a>
            </Button>
            <Button asChild variant="outline">
              <a href="#features">See how it works</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
