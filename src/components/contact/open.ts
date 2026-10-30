/* Opens the contact modal from anywhere: a button calls openContact(), the
   one modal mounted in the layout listens. */
export const CONTACT_EVENT = "synq:contact";

export function openContact(topic?: "before" | "app" | "billing" | "other") {
  window.dispatchEvent(new CustomEvent(CONTACT_EVENT, { detail: { topic } }));
}
