import type { ReactNode } from "react";
import { SHOPIFY_URL } from "@/content/games";
import { SITE_URL } from "@/lib/site";

/* The one lime button per view. */
export function AddToShopify({ size = "md" }: { size?: "md" | "lg" }) {
  return (
    <a
      href={SHOPIFY_URL}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] font-semibold text-[var(--color-accent-ink)] transition-colors hover:bg-[var(--color-accent)]/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
        size === "lg" ? "h-12 px-6 text-[15px]" : "h-11 px-5 text-[14px]"
      }`}
    >
      Add to Shopify
    </a>
  );
}

/* provenance label, like the app's section captions */
export function Label({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={`text-[12px] font-semibold uppercase tracking-[0.04em] ${
        dark ? "text-white/50" : "text-[var(--color-ink-3)]"
      }`}
    >
      {children}
    </p>
  );
}

/* 20px single-stroke glyph on a well square */
export function Glyph({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-[10px] bg-[var(--color-well)] text-[var(--color-ink)]">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {children}
      </svg>
    </span>
  );
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      /* JSON.stringify never emits "</script>" from our own copy, but escape "<" anyway */
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/* the same app node as the home's graph (same @id), so the pages link up */
export const softwareApp = {
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#software`,
  name: "Synq",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Shopify",
  url: SITE_URL,
};
