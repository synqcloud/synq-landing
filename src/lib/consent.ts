/* Analytics consent for synq.cards.

   Google Analytics sets cookies, so under Spain's LSSI (art. 22.2) and the
   GDPR it may only load after the visitor says yes. Until then nothing from
   Google is fetched. The choice itself is kept in localStorage: storing it is
   strictly necessary and needs no consent.

   A browser sending Global Privacy Control or Do Not Track has already said
   no: we treat that as "denied" and never show the banner. */

export type Consent = "granted" | "denied";

export const CONSENT_KEY = "synq-consent";
/** Fired on window when the choice changes (detail: Consent | null). */
export const CONSENT_CHANGE_EVENT = "synq:consent-change";
/** Fired on window to reopen the banner from the footer. */
export const CONSENT_OPEN_EVENT = "synq:consent-open";

/** The GA4 measurement ID of the synq.cards web stream. Without it there is
    no Google Analytics, no banner and no footer link. */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";
export const analyticsEnabled = GA_MEASUREMENT_ID.startsWith("G-");

export function browserOptedOut(): boolean {
  if (typeof navigator === "undefined") return false;
  const n = navigator as Navigator & { globalPrivacyControl?: boolean };
  return n.globalPrivacyControl === true || n.doNotTrack === "1";
}

export function readConsent(): Consent | null {
  if (browserOptedOut()) return "denied";
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    /* storage blocked: we can't remember a yes, so treat it as no */
    return "denied";
  }
}

export function writeConsent(value: Consent) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* the choice holds for this page only */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: value }));
}

/** True while the banner is waiting for an answer. */
export function consentPending(): boolean {
  return analyticsEnabled && readConsent() === null;
}

export function openCookieSettings() {
  window.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT));
}
