/* Intrinsic sizes of the demo pictures in /public, so every <img> states its
   width and height (the CSS still sizes them; this only reserves the box). */
const SIZES: Record<string, [number, number]> = {
  "/synq-icon.png": [64, 64],
  "/demo/charizard-151.webp": [560, 782],
  "/demo/charizard-obf.webp": [560, 782],
  "/demo/mew.webp": [320, 447],
  "/demo/more-1.webp": [360, 495],
  "/demo/more-2.webp": [360, 502],
  "/demo/more-3.webp": [360, 502],
  "/demo/more-4.webp": [360, 502],
  "/demo/one-ring.webp": [320, 446],
  "/demo/pack-151.webp": [320, 579],
  "/demo/ragavan.webp": [320, 446],
  "/demo/sheoldred.webp": [320, 446],
  "/demo/sylveon.webp": [320, 447],
  "/demo/umbreon.webp": [320, 447],
  "/stores/collection-house.webp": [156, 96],
  "/stores/dbt.webp": [146, 120],
  "/stores/greendoor.webp": [81, 120],
  "/stores/mint.webp": [210, 96],
};

/* Every demo sits below the hero, so its pictures load lazily. Without it
   React preloads each <img> in <head>, ahead of the hero (LCP went 8s+). */
export function artSize(src: string): { width?: number; height?: number; loading: "lazy" } {
  const s = SIZES[src];
  return s ? { width: s[0], height: s[1], loading: "lazy" } : { loading: "lazy" };
}
