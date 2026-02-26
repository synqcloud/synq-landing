"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@synq/ui/component";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.25, 0, 1] },
  },
};

const GAMES = [
  "Pokémon TCG",
  "Magic: The Gathering",
  "Yu-Gi-Oh!",
  "One Piece TCG",
  "Disney Lorcana",
  "Flesh and Blood",
  "Other",
];

const REGIONS = [
  "North America",
  "Europe",
  "Latin America",
  "Asia Pacific",
  "Other",
];

const INVENTORY_SIZES = [
  "Under 500 cards",
  "500 – 2,000 cards",
  "2,000 – 10,000 cards",
  "10,000+ cards",
];

export function InstallRequestForm() {
  const [email, setEmail] = useState("");
  const [games, setGames] = useState<string[]>([]);
  const [region, setRegion] = useState("");
  const [inventorySize, setInventorySize] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleGame = (game: string) => {
    setGames((prev) =>
      prev.includes(game) ? prev.filter((g) => g !== game) : [...prev, game]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !region) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          storeType: "waitlist",
          role: region,
          frustration: games.length > 0 ? games.join(", ") : "Not specified",
          inventorySize: inventorySize || "Not specified",
          wantsUpdates: true,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit");

      setIsSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className="flex items-center justify-center w-14 h-14 mx-auto rounded-full bg-primary/10 border border-primary/20 mb-4">
          <CheckCircle className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-xl font-medium text-foreground mb-2">
          You're on the list!
        </h3>
        <p className="text-muted-foreground text-sm">
          We'll notify you as soon as the app is available to install on your store.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-5 max-w-md mx-auto"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div>
        <Label htmlFor="waitlist-email">Email</Label>
        <Input
          id="waitlist-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          disabled={isLoading}
          className="mt-1.5"
        />
      </div>

      <div>
        <Label>Games you carry</Label>
        <div className="flex flex-wrap gap-2 mt-1.5">
          {GAMES.map((game) => (
            <button
              key={game}
              type="button"
              disabled={isLoading}
              onClick={() => toggleGame(game)}
              className={`px-3 py-1.5 rounded-md text-sm border transition-colors ${
                games.includes(game)
                  ? "bg-primary/10 text-primary border-primary/40"
                  : "border-border text-muted-foreground hover:border-muted-foreground"
              }`}
            >
              {game}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="waitlist-region">Store region</Label>
        <Select value={region} onValueChange={setRegion} disabled={isLoading} required>
          <SelectTrigger id="waitlist-region" className="mt-1.5 w-full">
            <SelectValue placeholder="Select your region" />
          </SelectTrigger>
          <SelectContent>
            {REGIONS.map((r) => (
              <SelectItem key={r} value={r}>{r}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="waitlist-inventory">How many cards do you carry?</Label>
        <Select value={inventorySize} onValueChange={setInventorySize} disabled={isLoading}>
          <SelectTrigger id="waitlist-inventory" className="mt-1.5 w-full">
            <SelectValue placeholder="Select a range" />
          </SelectTrigger>
          <SelectContent>
            {INVENTORY_SIZES.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        type="submit"
        disabled={isLoading || !email || !region}
        className="w-full"
      >
        {isLoading ? "Joining..." : "Join Waitlist"}
      </Button>

      {error && (
        <p className="text-sm text-destructive text-center">{error}</p>
      )}

      <p className="text-xs text-muted-foreground text-center">
        We'll notify you as soon as the app is available to install on your store.
      </p>
    </motion.form>
  );
}
