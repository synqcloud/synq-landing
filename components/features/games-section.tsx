"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ContactModal } from "@/components/contact-modal";

const allGames = [
  { name: "Magic: The Gathering", logo: "/games/mtg.png", active: true },
  { name: "Pokemon TCG",          logo: "/games/pokemon.png", active: true, beta: true },
  { name: "Disney Lorcana",       logo: "/games/lorcana.png", active: true },
  { name: "Riftbound",            logo: "/games/riftbound.png", active: true },
  { name: "Flesh and Blood",      logo: "/games/fab.png", active: true },
  { name: "One Piece",            logo: "/games/onepiece.png", active: true },
  { name: "Yu-Gi-Oh!",           logo: "/games/yugioh.png", active: false },
  { name: "Star Wars: Unlimited", logo: "/games/swu.webp", active: false },
  { name: "Digimon Card Game",    logo: "/games/digimon.png", active: false },
];

export function GamesSection() {
  const [contactOpen, setContactOpen] = useState(false);
  const doubled = [...allGames, ...allGames];
  return (
    <section id="games" className="py-16 bg-muted">
      <div className="max-w-5xl mx-auto px-6 border-t border-border pt-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="inline-block text-xs font-semibold text-subtle uppercase tracking-widest mb-2">
            Supported Games
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-[-0.02em]">
            Works with the games your customers love
          </h2>
        </motion.div>

        <div className="relative overflow-hidden rounded-xl border border-border bg-card py-5">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none" />
          <motion.div
            className="flex items-center gap-10"
            animate={{ x: [0, -54 * allGames.length] }}
            transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 30, ease: "linear" } }}
          >
            {doubled.map((game, idx) => (
              <div key={`${game.name}-${idx}`} className="flex items-center gap-2.5 flex-shrink-0">
                <div className={`w-8 h-8 flex items-center justify-center ${!game.active ? "opacity-25" : "opacity-90"}`}>
                  <Image src={game.logo} alt={game.name} width={32} height={32} className={`w-full h-full object-contain ${!game.active ? "grayscale" : ""}`} />
                </div>
                <span className={`text-sm whitespace-nowrap font-medium ${game.active ? "text-foreground" : "text-subtle"}`}>
                  {game.name}
                </span>
                {game.active && !game.beta && (
                  <span className="px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold">
                    Live
                  </span>
                )}
                {game.beta && (
                  <span className="px-1.5 py-0.5 rounded-full border border-border text-subtle text-[10px] font-semibold">
                    Beta
                  </span>
                )}
              </div>
            ))}
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm text-subtle mt-4"
        >
          Selling a game we don't support yet?{" "}
          <button onClick={() => setContactOpen(true)} className="text-foreground underline underline-offset-2 hover:opacity-60 transition-opacity">
            Let us know — we prioritize by demand.
          </button>
          <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
        </motion.p>
      </div>
    </section>
  );
}
