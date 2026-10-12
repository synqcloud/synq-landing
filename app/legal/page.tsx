"use client";

import { LEGAL_HOLDER, LegalPage, Link, SupportEmail } from "@/components/legal";

// The identification Spain's LSSI (art. 10) requires of any site with an
// economic activity. The policies link here instead of naming the holder.
export default function LegalNotice() {
  return (
    <LegalPage
      title="Legal Notice"
      updated="October 12, 2026"
      intro={<p>Synq is operated by:</p>}
      sections={[
        {
          id: "holder",
          title: "Service provider",
          body: (
            <>
              <p>
                <strong>Holder</strong>: {LEGAL_HOLDER.name}, sole trader
              </p>
              <p>
                <strong>Tax ID (NIF)</strong>: {LEGAL_HOLDER.taxId}
              </p>
              <p>
                <strong>Address</strong>: {LEGAL_HOLDER.address}
              </p>
              <p>
                <strong>Email</strong>: <SupportEmail />
              </p>
              <p>
                <strong>Activity</strong>: software for online stores (the Synq Shopify app)
              </p>
              <p>
                Use of Synq is governed by our <Link href="/terms">Terms of Service</Link> and{" "}
                <Link href="/privacy">Privacy Policy</Link>.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
