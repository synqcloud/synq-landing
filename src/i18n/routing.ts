import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es", "ca", "fr", "de", "pt", "ja", "ko", "it", "eu"],
  defaultLocale: "en",
  /* English lives at "/" with the old synq.cards URLs (/blog/x, /for/x...);
     the other languages under "/es", "/fr"... */
  localePrefix: "as-needed",
  /* never redirect by Accept-Language: crawlers must get the URL they asked for */
  localeDetection: false,
  /* hreflang is emitted per page, only where a translation exists
     (src/lib/seo.ts); next-intl's Link header would list every locale for
     every page, including English-only ones that 404 elsewhere */
  alternateLinks: false,
});
