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
        Synq (&quot;we&quot;, &quot;us&quot;) makes a Shopify app that helps
        trading card stores list cards, keep stock in sync and price them from
        market data. This policy covers the app and this website. Our legal
        details are in the <Link href="/legal">legal notice</Link>. For anything
        about your data, write to <SupportEmail />.
      </p>
    ),
  },
  {
    id: "what-we-collect",
    title: "What we collect",
    body: (
      <>
        <p>We collect only what we need to run the app:</p>
        <List
          items={[
            <>
              <strong>Store details</strong>: your shop&apos;s domain, name,
              contact email, currency and timezone, from Shopify when you
              install.
            </>,
            <>
              <strong>Staff details</strong>: the name and email of the people
              who open the app.
            </>,
            <>
              <strong>Catalog data</strong>: the products, variants, inventory,
              locations and sales channels Synq manages for you.
            </>,
            <>
              <strong>Analytics</strong>: how the app is used (pages opened,
              clicks, browser and device), so we can see where it gets in your
              way. This covers Synq&apos;s pages only, never the rest of your
              Shopify admin or your screen.
            </>,
            <>
              <strong>Messages</strong>: what you send us by email, the contact
              form or Shopify&apos;s support channel.
            </>,
          ]}
        />
        <p>
          We don&apos;t collect your customers&apos; data. Synq does not ask
          Shopify for access to orders or customers, and passwords and payment
          details never pass through it.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-it",
    title: "How we use it",
    body: (
      <>
        <List
          items={[
            "To run the app: create and update your products, sync stock and prices, run imports and bill your plan.",
            "To help you when you write to us, and to send service emails such as job results or billing notices.",
            "To find and fix problems and decide what to build next.",
            "To keep the service secure and prevent abuse.",
            "To keep the billing and tax records the law requires.",
          ]}
        />
        <p>We never sell your data or use it for advertising.</p>
        <p>
          If you are in the EU or UK: we rely on our contract with you to run
          the app, on our legitimate interest to improve and secure it, and on
          legal obligation for billing records.
        </p>
      </>
    ),
  },
  {
    id: "who-we-share-it-with",
    title: "Who we share it with",
    body: (
      <>
        <p>
          Only with the providers that run parts of Synq for us (hosting,
          database, background jobs, image storage, email and analytics), under
          contracts that limit them to our instructions. Ask us at{" "}
          <SupportEmail /> and we&apos;ll send you the current list.
        </p>
        <p>
          We may also disclose data when the law requires it, or to a buyer if
          Synq is ever sold, under this same policy.
        </p>
      </>
    ),
  },
  {
    id: "shopify-and-merchants",
    title: "Shopify and merchants",
    body: (
      <>
        <p>
          Synq works through the permissions you approve when you install it:
          products, inventory, locations and sales channels. For the data in
          your store, Synq acts on your behalf.
        </p>
        <p>
          Shopify sends us its privacy requests and we answer them. When you
          uninstall, Shopify asks us to erase your store&apos;s data 48 hours
          later and we delete it. The products in your store stay there; they
          are yours.
        </p>
        <p>
          If you shop at a store that uses Synq, your data is held by that store
          and Shopify, not by us. Please contact the store.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "How long we keep it",
    body: (
      <List
        items={[
          "Store, staff and catalog data: while the app is installed, then deleted after uninstall as above.",
          "Analytics: for the retention period of our analytics plan, then deleted.",
          "Messages: as long as needed to help you.",
          "Billing records: as long as tax law requires.",
        ]}
      />
    ),
  },
  {
    id: "security",
    title: "Security",
    body: (
      <p>
        Data is encrypted in transit, access to production systems is limited to
        the people who run Synq, and every read and write is scoped to a single
        store. No system is perfectly secure; if a breach affects your data, we
        will tell you and the authorities as the law requires.
      </p>
    ),
  },
  {
    id: "international-transfers",
    title: "International transfers",
    body: (
      <p>
        Several of our providers are in the United States. Those transfers rely
        on the EU–US Data Privacy Framework where the provider is certified, and
        otherwise on the European Commission&apos;s Standard Contractual
        Clauses.
      </p>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    body: (
      <p>
        The app keeps a small analytics identifier in your browser&apos;s local
        storage, and Shopify uses its own cookies to sign you in. This website
        uses privacy-friendly analytics and no advertising cookies.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <>
        <p>
          You can ask us to access, correct, delete or export your personal
          data, or object to how we use it. Write to <SupportEmail /> and we
          will answer within a month.
        </p>
        <p>
          In the EU you can also complain to your data protection authority;
          ours is Spain&apos;s Agencia Española de Protección de Datos
          (aepd.es).
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        When we change this policy we update the date at the top. If a change
        matters, we tell you by email or in the app first.
      </p>
    ),
  },
];

export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="October 12, 2026"
      intro={
        <p>
          Our rule is simple: collect only what Synq needs to do its job, and
          never sell it. Here is what that means in practice.
        </p>
      }
      sections={sections}
    />
  );
}
