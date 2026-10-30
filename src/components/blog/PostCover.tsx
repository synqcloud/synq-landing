/* A post's cover, drawn instead of photographed: real card scans fanned on a
   tinted well, with one piece of Synq UI that says what the post is about.
   Purely decorative, so it is hidden from assistive tech. */

type Chip =
  | { kind: "price"; label: string; value: string }
  | { kind: "pill"; label: string; pill: string }
  | { kind: "code"; label: string; code: string };

type Cover = { tone: string; cards: string[]; chip: Chip };

const COVERS: Record<string, Cover> = {
  "automate-card-pricing-shopify": {
    tone: "amber",
    cards: ["pk-umbreon-vmax", "pk-charizard-ex", "mtg-atraxa"],
    chip: { kind: "price", label: "Price rule · Market + 10%", value: "$42.50" },
  },
  "complete-guide-card-shop-shopify": {
    tone: "sage",
    cards: ["mtg-jace", "lor-elsa", "pk-pikachu-151", "ygo-dark-magician-girl"],
    chip: { kind: "pill", label: "Near Mint", pill: "3 in stock" },
  },
  "synq-vs-manual-card-management": {
    tone: "slate",
    cards: ["ygo-blue-eyes", "mtg-bolt", "pk-eevee-ex"],
    chip: { kind: "pill", label: "Scheduled rule", pill: "Ran today" },
  },
  "write-product-titles-that-rank": {
    tone: "stone",
    cards: ["mtg-ugin", "mtg-urzas-saga", "mtg-fable"],
    chip: { kind: "code", label: "Title", code: "{name} · {set_name} · {collector_number}" },
  },
  "avoid-thin-or-duplicate-descriptions": {
    tone: "sage",
    cards: ["pk-bulbasaur-151", "pk-psyduck-151", "pk-venusaur-ex"],
    chip: { kind: "code", label: "Description", code: "{card_text}" },
  },
};

const FALLBACK: Cover = {
  tone: "stone",
  cards: ["pk-charizard-ex", "mtg-bolt", "lor-mickey"],
  chip: { kind: "pill", label: "Synq", pill: "In your store" },
};

export default function PostCover({
  slug,
  size = "card",
  priority = false,
}: {
  slug: string;
  size?: "card" | "featured" | "hero";
  priority?: boolean;
}) {
  const cover = COVERS[slug] ?? FALLBACK;
  const n = cover.cards.length;

  return (
    <div className="blog-cover" data-tone={cover.tone} data-size={size} aria-hidden="true">
      <div className="blog-cover-fan" style={{ "--n": n } as React.CSSProperties}>
        {cover.cards.map((c, i) => (
          <img
            key={c}
            src={`/wall/${c}.webp`}
            alt=""
            width={300}
            height={419}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="blog-cover-card"
            style={{ "--i": i - (n - 1) / 2 } as React.CSSProperties}
          />
        ))}
      </div>
      <CoverChip chip={cover.chip} />
    </div>
  );
}

function CoverChip({ chip }: { chip: Chip }) {
  return (
    <div className="blog-cover-chip">
      <span className="blog-cover-chip-label">{chip.label}</span>
      {chip.kind === "price" && <b className="blog-cover-chip-price">{chip.value}</b>}
      {chip.kind === "pill" && <span className="blog-cover-chip-pill">{chip.pill}</span>}
      {chip.kind === "code" && <code className="blog-cover-chip-code">{chip.code}</code>}
    </div>
  );
}
