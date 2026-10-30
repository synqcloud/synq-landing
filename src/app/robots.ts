import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/* Everyone may crawl everything public, AI crawlers included (named
   explicitly, as on the old site, so a blanket rule elsewhere can't shut them
   out by accident). Previews on Vercel are closed to all. */

const SEARCH = ["Googlebot", "Googlebot-Image", "Bingbot", "msnbot", "DuckDuckBot", "Applebot", "YandexBot"];

const AI = [
  // OpenAI
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "Claude-Web",
  "anthropic-ai",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Google, Apple (AI training opt-ins)
  "Google-Extended",
  "Applebot-Extended",
  // Meta
  "Meta-ExternalAgent",
  "Meta-ExternalFetcher",
  "FacebookBot",
  // others
  "CCBot",
  "Amazonbot",
  "Bytespider",
  "cohere-ai",
  "DuckAssistBot",
  "MistralAI-User",
  "YouBot",
];

const DISALLOW = ["/api/"];

export default function robots(): MetadataRoute.Robots {
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      { userAgent: SEARCH, allow: "/", disallow: DISALLOW },
      { userAgent: AI, allow: "/", disallow: DISALLOW },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
