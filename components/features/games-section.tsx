"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const allGames = [
  { name: "Magic: The Gathering", logo: "/games/mtg.png", active: true },
  { name: "Pokemon TCG", logo: "/games/pokemon.png", active: false },
  { name: "Yu-Gi-Oh!", logo: "/games/yugioh.png", active: false },
  { name: "Flesh and Blood", logo: "/games/fab.png", active: false },
  { name: "One Piece Card Game", logo: "/games/onepiece.png", active: false },
  { name: "Disney Lorcana", logo: "/games/lorcana.avif", active: false },
  { name: "Star Wars: Unlimited", logo: "/games/swu.webp", active: false },
  { name: "Digimon Card Game", logo: "/games/digimon.png", active: false },
];

export function GamesSection() {
  // Duplicate for seamless loop
  const duplicatedGames = [...allGames, ...allGames];

  return (
    <section id="games" className="py-16">
      <div className="max-w-5xl mx-auto px-6 border-t border-border pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-sm text-muted-foreground mb-2">
            Supporting the games you sell
          </p>
          <h2 className="text-lg font-medium text-foreground">
            Magic available now • More games coming soon
          </h2>
        </motion.div>

        {/* Scrolling logo marquee */}
        <div className="relative overflow-hidden">
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

          {/* Scrolling container */}
          <motion.div
            className="flex items-center gap-12"
            animate={{
              x: [0, -50 * allGames.length],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
          >
            {duplicatedGames.map((game, idx) => (
              <div
                key={`${game.name}-${idx}`}
                className={`flex items-center gap-3 flex-shrink-0 ${
                  game.active ? "" : "opacity-40 grayscale"
                }`}
              >
                <div className="w-10 h-10 flex items-center justify-center">
                  <Image
                    src={game.logo}
                    alt={game.name}
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span
                  className={`text-sm font-medium whitespace-nowrap ${
                    game.active ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {game.name}
                </span>
                {game.active && (
                  <span className="px-1.5 py-0.5 bg-primary/10 text-primary text-[10px] font-medium rounded">
                    LIVE
                  </span>
                )}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Request game link */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          Want a specific game prioritized?{" "}
          <a href="#contact" className="text-primary hover:underline">
            Let us know
          </a>
        </motion.p>
      </div>
    </section>
  );
}
