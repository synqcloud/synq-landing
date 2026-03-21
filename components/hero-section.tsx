"use client";

import { Button } from "@synq/ui/component";
import Image from "next/image";
import { Check } from "lucide-react";

const highlights = [
  "Prices that stay current with the market",
  "Add any card to your store in seconds",
  "Automatic discounts by condition",
  "Update thousands of cards at once",
];

export function HeroSection() {
  return (
    <section className="relative pt-20 sm:pt-28 pb-16 sm:pb-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-5%,hsl(var(--primary)/0.08),transparent_70%)]" />
      </div>

      <div className="max-w-5xl mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-medium text-muted-foreground mb-8 shadow-sm">
            <Image
              src="/shopify.svg"
              alt=""
              width={12}
              height={12}
              className="h-3 w-3"
              priority
              aria-hidden="true"
            />
            <span>Shopify App</span>
            <span className="text-border mx-0.5">·</span>
            <span className="text-primary font-semibold">Now on Shopify</span>
          </div>

          {/* Headline — what it is, who it's for, outcome */}
          <h1 className="hero-description text-[2.5rem] sm:text-5xl lg:text-[3.25rem] font-semibold tracking-[-0.03em] leading-[1.1] mb-5">
            <span className="text-foreground">Your Shopify card shop,</span>
            <br />
            <span className="text-primary">always priced to sell.</span>
          </h1>

          {/* Sub — short, positive, no jargon */}
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg mx-auto">
            Synq automatically syncs your Shopify card prices with market data every 24 hours. Add cards with one click, manage condition-based pricing, and update prices in bulk.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <Button asChild>
              <a href="https://apps.shopify.com/synq-tcg-card-manager" target="_blank" rel="noopener noreferrer">Install on Shopify</a>
            </Button>
            <Button asChild variant="outline">
              <a href="#features">See how it works</a>
            </Button>
          </div>

          {/* Benefit highlights — problems solved, not feature names */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-x-6 gap-y-2.5">
            {highlights.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <Check
                  className="h-3.5 w-3.5 text-primary shrink-0"
                  aria-hidden="true"
                />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Trust bar — names + logos, readable */}
        <div className="mt-14 pt-7 border-t border-border">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2.5">
              <Image
                src="/tcgplayer.svg"
                alt=""
                width={16}
                height={16}
                className="h-4 w-4 opacity-50"
                aria-hidden="true"
              />
              <span>TCGPlayer</span>
            </div>
            <div className="flex items-center gap-2.5 opacity-40">
              <Image
                src="/cardmarket.svg"
                alt=""
                width={16}
                height={16}
                className="h-4 w-4 grayscale"
                aria-hidden="true"
              />
              <span>Cardmarket <span className="text-xs">(coming soon)</span></span>
            </div>
            <div className="hidden sm:block h-4 w-px bg-border" />
            <div className="flex items-center gap-2.5">
              <Image
                src="/games/mtg.png"
                alt=""
                width={18}
                height={18}
                className="h-[18px] w-[18px] object-contain opacity-60"
                loading="eager"
                aria-hidden="true"
              />
              <span>Magic: The Gathering</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Image
                src="/games/pokemon.png"
                alt=""
                width={18}
                height={18}
                className="h-[18px] w-[18px] object-contain opacity-60"
                loading="eager"
                aria-hidden="true"
              />
              <span>Pokemon TCG</span>
            </div>
            <span className="text-muted-foreground/50">Yu-Gi-Oh & more coming soon</span>
          </div>
        </div>
      </div>
    </section>
  );
}
