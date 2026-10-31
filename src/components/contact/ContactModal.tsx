"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { CONTACT_EVENT } from "./open";
import { track } from "@/lib/ga";
import { getAttribution } from "@/lib/attribution";
import "./contact.css";

/* Write to us without leaving the page: a native <dialog> (focus trap,
   Escape and the backdrop for free), sent through /api/contact. */

const TOPICS = ["before", "app", "billing", "other"] as const;
type Topic = (typeof TOPICS)[number];
type State = "idle" | "sending" | "sent" | "error";

export const SUPPORT_EMAIL = "help@synq.cards";

export default function ContactModal() {
  const t = useTranslations("contact");
  const dialog = useRef<HTMLDialogElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const [topic, setTopic] = useState<Topic>("before");
  const [state, setState] = useState<State>("idle");

  useEffect(() => {
    const open = (e: Event) => {
      const next = (e as CustomEvent<{ topic?: Topic }>).detail?.topic;
      if (next) setTopic(next);
      if (state === "sent") {
        form.current?.reset();
        setState("idle");
      }
      dialog.current?.showModal();
    };
    window.addEventListener(CONTACT_EVENT, open);
    return () => window.removeEventListener(CONTACT_EVENT, open);
  }, [state]);

  /* arriving from the old /contact page (?contact): open straight away */
  useEffect(() => {
    const url = new URL(window.location.href);
    if (!url.searchParams.has("contact")) return;
    url.searchParams.delete("contact");
    window.history.replaceState(null, "", url);
    dialog.current?.showModal();
  }, []);

  const close = () => dialog.current?.close();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        /* where the visit came from, like the old contact form sent */
        body: JSON.stringify({ ...data, topic, attribution: getAttribution() }),
      });
      setState(res.ok ? "sent" : "error");
      /* GA4's lead event; the topic only, never what the person wrote */
      if (res.ok) track("generate_lead", { topic });
    } catch {
      setState("error");
    }
  };

  return (
    <dialog
      ref={dialog}
      className="contact-modal"
      aria-labelledby="contact-title"
      onClick={(e) => {
        /* a click on the backdrop (the dialog itself, outside the panel) closes */
        if (e.target === dialog.current) close();
      }}
      onClose={() => {
        if (state === "error") setState("idle");
      }}
    >
      <div className="contact-panel">
        <button type="button" className="contact-close" onClick={close} aria-label={t("close")}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        {state === "sent" ? (
          <div className="contact-sent" role="status">
            <span className="contact-sent-mark" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3.5 8.5 3 3 6-7" />
              </svg>
            </span>
            <h2 id="contact-title" className="contact-title">
              {t("sent.title")}
            </h2>
            <p className="contact-lede">{t("sent.body")}</p>
            <button type="button" className="contact-submit" onClick={close}>
              {t("sent.done")}
            </button>
          </div>
        ) : (
          <form ref={form} onSubmit={onSubmit} noValidate={false}>
            <span className="contact-avatar" aria-hidden="true">
              <img src="/synq-icon.png" alt="" width={20} height={20} />
            </span>
            <h2 id="contact-title" className="contact-title">
              {t("title")}
            </h2>
            <p className="contact-lede">{t("body")}</p>

            <fieldset className="contact-topics">
              <legend className="contact-label">{t("topic")}</legend>
              <div>
                {TOPICS.map((k) => (
                  <label key={k} className="contact-chip" data-on={topic === k || undefined}>
                    <input
                      type="radio"
                      name="topic-choice"
                      value={k}
                      checked={topic === k}
                      onChange={() => setTopic(k)}
                    />
                    {t(`topics.${k}`)}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="contact-row">
              <label className="contact-field">
                <span className="contact-label">{t("name")}</span>
                <input name="name" required autoComplete="name" maxLength={120} autoFocus />
              </label>
              <label className="contact-field">
                <span className="contact-label">{t("email")}</span>
                <input name="email" type="email" required autoComplete="email" maxLength={200} />
              </label>
            </div>
            <label className="contact-field">
              <span className="contact-label">
                {t("store")} <i>{t("optional")}</i>
              </span>
              <input name="store" placeholder={t("storePlaceholder")} maxLength={200} />
            </label>
            <label className="contact-field">
              <span className="contact-label">{t("message")}</span>
              <textarea name="message" required rows={5} maxLength={5000} placeholder={t(`placeholders.${topic}`)} />
            </label>
            {/* for bots only */}
            <input name="hp_x9" tabIndex={-1} autoComplete="new-password" className="contact-trap" aria-hidden="true" />

            {state === "error" && (
              <p className="contact-error" role="alert">
                {t.rich("error", {
                  mail: (chunks) => <a href={`mailto:${SUPPORT_EMAIL}`}>{chunks}</a>,
                  email: SUPPORT_EMAIL,
                })}
              </p>
            )}

            <div className="contact-foot">
              <p>
                {t.rich("direct", {
                  mail: (chunks) => <a href={`mailto:${SUPPORT_EMAIL}`}>{chunks}</a>,
                  email: SUPPORT_EMAIL,
                })}
              </p>
              <button type="submit" className="contact-submit" disabled={state === "sending"}>
                {state === "sending" ? t("sending") : t("send")}
              </button>
            </div>
          </form>
        )}
      </div>
    </dialog>
  );
}
