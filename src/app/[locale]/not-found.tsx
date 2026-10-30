import { getLocale, getTranslations } from "next-intl/server";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import NotFoundView from "@/components/landing/NotFoundView";

/* 404 raised while rendering a page in a language (e.g. /es/docs/<unknown>):
   the site's chrome in that language. Next sends it with status 404 and
   noindex. URLs no route matches at all get app/not-found.tsx. */
export default async function LocaleNotFound() {
  const locale = await getLocale();
  const docs = await getTranslations({ locale, namespace: "docs.article" });
  const footer = await getTranslations({ locale, namespace: "footer.columns.company.links" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const nf = await getTranslations({ locale, namespace: "notFound" });
  return (
    <main className="relative bg-[var(--color-ink)] text-white">
      <Navbar />
      <NotFoundView
        locale={locale}
        labels={{ home: nav("logoAria"), docs: docs("home"), blog: footer("blog"), title: nf("title"), body: nf("body") }}
      />
      <Footer />
    </main>
  );
}
