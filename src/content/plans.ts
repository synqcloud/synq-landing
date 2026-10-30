/* The plans, as on the Shopify App Store listing. One source for the pricing
   section, the home's JSON-LD offers and llms.txt. */

export type Plan = {
  key: "free" | "starter" | "pro" | "scale";
  /** display name (the same in every language, as on the App Store) */
  name: string;
  cards: number;
  monthly: number;
  yearly: number;
};

/* every plan has every feature; plans differ only in how many products fit */

export const PLANS: Plan[] = [
  { key: "free", name: "Free", cards: 100, monthly: 0, yearly: 0 },
  { key: "starter", name: "Starter", cards: 2000, monthly: 29, yearly: 232 },
  { key: "pro", name: "Pro", cards: 15000, monthly: 79, yearly: 632 },
  { key: "scale", name: "Scale", cards: 50000, monthly: 149, yearly: 1192 },
];

export const TRIAL_DAYS = 7;
