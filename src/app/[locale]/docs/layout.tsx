import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

/* the help center's client components read the docs namespace; only these
   pages ship it (with the shared chrome) */
export default async function DocsLayout({ children }: { children: React.ReactNode }) {
  const all = await getMessages();
  const messages = Object.fromEntries(
    ["nav", "footer", "contact", "docs"].filter((k) => k in all).map((k) => [k, all[k]]),
  ) as typeof all;
  return <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>;
}
