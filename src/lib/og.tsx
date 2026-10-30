import fs from "fs";
import path from "path";
import { ImageResponse } from "next/og";

/* Share images (1200x630) in the site's look: the hero's warm dark ground,
   white type, the lime only on the small mark, and optionally a fan of real
   card scans on the right. Rendered once at build (the routes are static). */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const GROUND = "#161413";
const LIME = "#c8ff3a";

const ART_DIR = path.join(process.cwd(), "src/assets/og");

function dataUri(file: string): string | null {
  try {
    const buf = fs.readFileSync(path.join(ART_DIR, file));
    const type = file.endsWith(".png") ? "image/png" : "image/jpeg";
    return `data:${type};base64,${buf.toString("base64")}`;
  } catch {
    return null;
  }
}

/** The five dots of the Synq mark, drawn (no font or file needed). */
function Mark({ size = 44 }: { size?: number }) {
  const d = size * 0.15;
  const dot = (x: number, y: number) => (
    <div
      style={{
        position: "absolute",
        left: x * size - d / 2,
        top: y * size - d / 2,
        width: d,
        height: d,
        borderRadius: d,
        background: GROUND,
      }}
    />
  );
  return (
    <div style={{ position: "relative", display: "flex", width: size, height: size, borderRadius: size, background: LIME }}>
      {dot(0.5, 0.28)}
      {dot(0.33, 0.42)}
      {dot(0.67, 0.42)}
      {dot(0.33, 0.62)}
      {dot(0.67, 0.62)}
    </div>
  );
}

export function renderOg({
  eyebrow,
  title,
  subtitle,
  art = [],
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** file names in src/assets/og (jpg/png), up to three */
  art?: string[];
}) {
  /* card scans are jpg (rounded, with a shadow); sealed product is a cut-out png */
  const cards = art
    .slice(0, 3)
    .map((file) => ({ src: dataUri(file), cutout: file.endsWith(".png") }))
    .filter((x): x is { src: string; cutout: boolean } => !!x.src);
  const withArt = cards.length > 0;
  const titleSize = title.length > 70 ? 50 : title.length > 44 ? 60 : 72;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: `radial-gradient(70% 90% at 82% 30%, #2a2420 0%, ${GROUND} 70%)`,
          color: "white",
          fontFamily: "sans-serif",
          overflow: "hidden",
        }}
      >
        {withArt && (
          <div style={{ position: "absolute", right: 40, top: 70, width: 470, height: 520, display: "flex" }}>
            {cards.map(({ src, cutout }, i) => {
              const rot = [-12, 0, 12][cards.length === 1 ? 1 : cards.length === 2 ? i * 2 : i];
              const left = cards.length === 1 ? 120 : [10, 120, 230][cards.length === 2 ? i * 2 : i];
              const top = [40, 0, 40][cards.length === 2 ? i * 2 : i] ?? 0;
              return (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={src}
                  width={230}
                  height={321}
                  style={{
                    position: "absolute",
                    left,
                    top: top + 60,
                    width: 230,
                    height: 321,
                    objectFit: "contain",
                    transform: `rotate(${rot}deg)`,
                    ...(cutout ? {} : { borderRadius: 12, boxShadow: "0 24px 48px rgba(0,0,0,0.55)" }),
                  }}
                />
              );
            })}
          </div>
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 72px",
            width: withArt ? 720 : "100%",
            height: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Mark />
            <div style={{ fontSize: 34, fontWeight: 600, letterSpacing: -0.5 }}>Synq</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {eyebrow && (
              <div style={{ fontSize: 22, color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: 2, marginBottom: 18 }}>
                {eyebrow}
              </div>
            )}
            <div style={{ fontSize: titleSize, fontWeight: 600, lineHeight: 1.06, letterSpacing: -1.5 }}>{title}</div>
            {subtitle && (
              <div style={{ marginTop: 22, fontSize: 26, lineHeight: 1.4, color: "rgba(255,255,255,0.65)" }}>{subtitle}</div>
            )}
          </div>

          <div style={{ fontSize: 22, color: "rgba(255,255,255,0.5)" }}>synq.cards</div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
