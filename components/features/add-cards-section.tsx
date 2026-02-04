"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function AddCardsSection() {
  return (
    <section id="add-cards" className="py-24">
      <div className="max-w-5xl mx-auto px-6 border-t border-border pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="inline-block text-sm font-medium text-primary mb-4">
            Card Search & Product Creation
          </span>
          <h2 className="text-2xl sm:text-3xl font-medium text-foreground mb-4 max-w-2xl">
            Add cards to your Shopify store in seconds.
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
            Search our database, pick a card and its condition, and Synq creates
            a complete Shopify product with the right image, title, and
            description. That's it.
          </p>
        </motion.div>

        {/* Card Search Screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-xl border border-border overflow-hidden shadow-lg"
        >
          <Image
            src="/brand/add-magic-cards-to-shopify.png"
            alt="Synq card search interface"
            width={1200}
            height={700}
            className="w-full h-auto"
          />
        </motion.div>

        {/* How it works - condensed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 grid sm:grid-cols-3 gap-4"
        >
          <div className="flex items-start gap-3 p-4 bg-background rounded-lg border border-border">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-semibold text-primary">1</span>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Search</p>
              <p className="text-xs text-muted-foreground">
                Find any card by name or set
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-background rounded-lg border border-border">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-semibold text-primary">2</span>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Configure</p>
              <p className="text-xs text-muted-foreground">
                Pick finish, condition, price
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-background rounded-lg border border-border">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-semibold text-primary">3</span>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Publish</p>
              <p className="text-xs text-muted-foreground">
                Product ready in Shopify
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
