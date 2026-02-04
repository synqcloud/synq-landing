import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.trysynq.com";

  return {
    rules: [
      // Default rule for all crawlers
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/", "/_next/"],
      },
      // Google bots
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        userAgent: "Googlebot-Image",
        allow: "/",
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
      // OpenAI / ChatGPT
      {
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
      },
      // Anthropic / Claude
      {
        userAgent: "ClaudeBot",
        allow: "/",
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
      },
      // Perplexity
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
      // Microsoft / Bing / Copilot
      {
        userAgent: "Bingbot",
        allow: "/",
      },
      {
        userAgent: "msnbot",
        allow: "/",
      },
      // Meta
      {
        userAgent: "Meta-ExternalAgent",
        allow: "/",
      },
      {
        userAgent: "FacebookBot",
        allow: "/",
      },
      // Apple
      {
        userAgent: "Applebot",
        allow: "/",
      },
      // Other AI crawlers
      {
        userAgent: "Bytespider",
        allow: "/",
      },
      {
        userAgent: "cohere-ai",
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
