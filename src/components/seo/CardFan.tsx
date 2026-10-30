import type { Scan } from "@/content/games";

/* Real scans, fanned like a hand of cards. Sealed product (white product
   shots) sits in light art wells instead. Sizes are fixed by aspect ratio,
   so nothing shifts while the images load. */
export default function CardFan({ kind, items }: { kind: "cards" | "sealed"; items: Scan[] }) {
  return (
    <div className={`card-fan ${kind === "sealed" ? "card-fan--sealed" : ""}`}>
      {items.map((s, i) => (
        <figure key={s.src} className="card-fan__item">
          <div className={kind === "sealed" ? "card-fan__well" : "card-fan__card"}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.src}
              alt={s.alt}
              width={s.width}
              height={s.height}
              style={{ aspectRatio: `${s.width} / ${s.height}` }}
              /* the front card is the hero's largest image */
              fetchPriority={i === 1 || kind === "sealed" ? "high" : "auto"}
              decoding="async"
              draggable={false}
            />
          </div>
        </figure>
      ))}
    </div>
  );
}
