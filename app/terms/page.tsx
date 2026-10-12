"use client";

import {
  LegalPage,
  Link,
  List,
  SupportEmail,
  type LegalSection,
} from "@/components/legal";

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <p>
        Synq (&quot;we&quot;, &quot;us&quot;) makes a Shopify app for trading
        card stores (&quot;Synq ‑ TCG Card Manager&quot;). These terms cover the
        app, this website and any related service (the &quot;Service&quot;). Our
        legal details are in the <Link href="/legal">legal notice</Link>, and
        you can always reach us at <SupportEmail />.
      </p>
    ),
  },
  {
    id: "using-synq",
    title: "What Synq does",
    body: (
      <p>
        Synq helps you find cards and sealed products in a catalog, add them to
        your Shopify store, keep their stock in sync and, if you want, keep
        their prices in step with the market. It only does what the permissions
        you approve at install allow. If you use Synq for a business, these
        terms apply to that business.
      </p>
    ),
  },
  {
    id: "your-store",
    title: "Your store is yours",
    body: (
      <>
        <p>
          Your products, stock, prices and store data belong to you. We only use
          them to run Synq for you. If you uninstall, we delete them as
          described in our <Link href="/privacy">Privacy Policy</Link>, and the
          products in your Shopify store stay exactly where they are.
        </p>
        <p>
          You know your store best, so what it sells and publishes is your call,
          along with the laws and platform rules that apply to your business.
        </p>
      </>
    ),
  },
  {
    id: "prices",
    title: "Prices: you stay in control",
    body: (
      <>
        <p>
          Market prices in Synq come from third parties, mainly TCGplayer. They
          can be late or wrong, and card markets move
          fast.
        </p>
        <p>
          Automatic price updates follow the rules you set: strategy, rounding,
          minimum prices and which products are included. Because you choose
          those rules, the prices they produce are yours, and we can&apos;t take
          responsibility for a sale made at one of them, even when the market
          data behind it was off. A minimum price and a quick look at price
          changes now and then go a long way; if something looks wrong, tell us
          and we&apos;ll look into it.
        </p>
      </>
    ),
  },
  {
    id: "images",
    title: "Card images and trademarks",
    body: (
      <>
        <p>
          Card images, names and set symbols belong to their publishers, such as
          The Pokémon Company, Wizards of the Coast and Konami. Synq isn&apos;t
          affiliated with or endorsed by any of them, or by TCGplayer.
        </p>
        <p>
          The images Synq adds to your products are there so shoppers can see
          which card they&apos;re buying. They come mainly from TCGplayer&apos;s
          public catalog and community card databases. They aren&apos;t ours, so
          we can&apos;t license them to you, and how you use them is up to you.
          You can swap any of them for your own photos whenever you like.
        </p>
      </>
    ),
  },
  {
    id: "plans",
    title: "Plans and billing",
    body: (
      <List
        items={[
          "Synq has a free plan and paid plans, billed monthly or yearly through Shopify. Charges appear on your Shopify invoice.",
          "You can change or cancel your plan at any time from the app, and uninstalling cancels it too.",
          "Payments already made aren't refunded, except where the law says otherwise. If you think we charged you by mistake, write to us and we'll put it right.",
          "If our prices change, we'll tell you at least 30 days ahead, and the new price starts with your next billing period.",
        ]}
      />
    ),
  },
  {
    id: "fair-use",
    title: "Fair use",
    body: (
      <>
        <p>To keep Synq working well for every store, please don&apos;t:</p>
        <List
          items={[
            "use it for anything unlawful;",
            "use it or its catalog data to build a competing product or database, or resell access to it;",
            "access it by automated means outside the app, or put unusual load on it;",
            "try to get into systems or data that aren't yours.",
          ]}
        />
      </>
    ),
  },
  {
    id: "the-service",
    title: "Keeping Synq running",
    body: (
      <p>
        We work hard to keep Synq up and accurate, but it depends on Shopify and
        other providers, so we can&apos;t promise it will never be down or never
        make a mistake. We keep improving it, which means features can change;
        if we ever remove one your paid plan relies on, we&apos;ll tell you in
        advance.
      </p>
    ),
  },
  {
    id: "our-property",
    title: "What belongs to us",
    body: (
      <p>
        The Synq software, website, name and design are ours. While you have the
        app installed, you&apos;re free to use them through the Service.
      </p>
    ),
  },
  {
    id: "liability",
    title: "The legal part",
    body: (
      <>
        <p>
          Every software company needs this section. Here is ours, as plainly as
          we can put it:
        </p>
        <List
          items={[
            <>
              Synq is provided &quot;as is&quot;. As far as the law allows, we
              don&apos;t give warranties beyond what these terms say, including
              about the accuracy of catalog or price data.
            </>,
            <>
              As far as the law allows, we aren&apos;t liable for indirect
              losses such as lost profits, sales or data, and our total
              liability for any claim is limited to what you paid us in the 12
              months before it. Nothing here limits what the law doesn&apos;t
              allow to be limited.
            </>,
            <>
              If someone makes a claim against us because of something in your
              store, such as your listings or your use of images, or because
              these terms were broken, that claim is yours to handle.
            </>,
          ]}
        />
      </>
    ),
  },
  {
    id: "termination",
    title: "If things end",
    body: (
      <p>
        You can stop using Synq any time by uninstalling it. We would only
        suspend an account if these terms are broken or the Service is being
        harmed, and unless it&apos;s urgent we&apos;ll talk to you first and
        give you a chance to sort it out.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: (
      <p>
        If we update these terms, we change the date at the top. For anything
        that matters, we&apos;ll let you know by email or in the app at least 15
        days before it applies. Continuing to use Synq after that means you
        accept the update.
      </p>
    ),
  },
  {
    id: "law",
    title: "Governing law",
    body: (
      <p>
        These terms are governed by Spanish law, and disputes go to the courts
        of Spain, unless the law gives you the right to bring them elsewhere.
      </p>
    ),
  },
];

export default function TermsOfService() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="October 12, 2026"
      intro={
        <p>
          The short version: your store and your data are yours, you stay in
          control of your prices, and you can leave whenever you want. The
          details are below; if anything isn&apos;t clear, write to us at{" "}
          <SupportEmail />.
        </p>
      }
      sections={sections}
    />
  );
}
