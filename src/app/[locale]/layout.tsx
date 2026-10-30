import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { routing } from "@/i18n/routing";
import ContactModal from "@/components/contact/ContactModal";
import AttributionTracker from "@/components/analytics/AttributionTracker";
import { SITE_NAME, SITE_URL, TWITTER_HANDLE } from "@/lib/site";
import { bareTitle } from "@/lib/seo";
import "../globals.css";

/* message namespaces used by client components everywhere */
const CLIENT_NAMESPACES = ["nav", "hero", "footer", "landing", "contact"] as const;

function pick(all: Record<string, unknown>, keys: readonly string[]) {
  return Object.fromEntries(keys.filter((k) => k in all).map((k) => [k, all[k]])) as typeof all;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/* only the ten languages exist; anything else (e.g. /wp-login.php, which the
   middleware skips) is a plain 404 */
export const dynamicParams = false;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  /* the ink of the navbar and hero */
  themeColor: "#161413",
  colorScheme: "dark light",
};

/* Site-wide defaults only. Every page sets its own canonical, hreflang,
   openGraph and twitter (src/lib/seo.ts pageMetadata); nothing here may name
   a canonical, or pages without one would inherit it. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: bareTitle(t("title")), template: `%s | ${SITE_NAME}` },
    description: t("description"),
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "Business",
    formatDetection: { email: false, address: false, telephone: false },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    twitter: { card: "summary_large_image", site: TWITTER_HANDLE, creator: TWITTER_HANDLE },
    manifest: "/manifest.webmanifest",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  /* only what client components read: the help articles and legal text stay
     on the server (docs pages add their own namespace in docs/layout.tsx) */
  const all = await getMessages();
  const messages = pick(all, CLIENT_NAMESPACES);

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
          <ContactModal />
        </NextIntlClientProvider>
        <AttributionTracker />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
