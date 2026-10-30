import { notFound } from "next/navigation";
import { renderOg } from "@/lib/og";
import { GAMES, getGame } from "@/content/games";

/* /og/for/<game>: a game page's share image, with that game's cards */
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return GAMES.map((g) => ({ game: g.slug }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ game: string }> }) {
  const { game } = await params;
  const g = getGame(game);
  if (!g) notFound();
  const art = g.art.items.map((i) => {
    const name = i.src.replace(/^\/wall\//, "").replace(/\.webp$/, "");
    return name.startsWith("sealed-") ? `${name}.png` : `${name}.jpg`;
  });
  return renderOg({ eyebrow: `Synq for ${g.name}`, title: g.h1, art });
}
