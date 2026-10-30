import type { Metadata } from "next";
import NotFoundView from "@/components/landing/NotFoundView";
import SynqLogo from "@/components/landing/SynqLogo";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

/* The site's 404 for any URL no page matches (/nope, /es/nope,
   /something.php): prerendered, English, with its own <html lang="en"> since
   the pass-through root layout has none. */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Page not found | Synq",
  robots: { index: false, follow: true },
};

export default function RootNotFound() {
  return (
    <html lang="en">
      <body>
        <main className="relative min-h-svh bg-[var(--color-ink)] text-white">
          <div className="mx-auto w-full max-w-[1240px] px-6 py-5">
            <a href="/" aria-label="Synq Home" className="inline-flex text-white transition-opacity hover:opacity-80">
              <SynqLogo className="h-7 lg:h-8" invert />
            </a>
          </div>
          <NotFoundView />
        </main>
      </body>
    </html>
  );
}
