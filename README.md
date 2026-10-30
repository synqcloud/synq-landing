# synq-landing

The marketing site for [Synq](https://synq.cards), the Shopify app for trading card shops. Served at https://synq.cards.

Next.js 15 (App Router), next-intl (10 locales), Tailwind v4.

```bash
corepack pnpm install
corepack pnpm dev
corepack pnpm build
```

- Copy lives in `messages/<locale>.json` (English is the source).
- Blog posts: `src/content/blog/*.mdx`. Games, compare pages and guides: `src/content/`.
- The site URL comes from `src/lib/site.ts` (`NEXT_PUBLIC_SITE_URL`, defaults to https://synq.cards).
- Contact form: `src/app/api/contact/route.ts`, sent with Resend (`RESEND_API_KEY`).
- Any host other than synq.cards is served with `X-Robots-Tag: noindex`.
