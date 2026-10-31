"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import {
  CONSENT_OPEN_EVENT,
  analyticsEnabled,
  browserOptedOut,
  readConsent,
  writeConsent,
} from "@/lib/consent";

/* Asks once whether Google Analytics may run. Accept and reject are the same
   size and weight (the AEPD guide asks for rejecting to be as easy as
   accepting), and nothing from Google loads before an answer. The footer's
   "Cookie settings" reopens it. Legal pages are English only, so the policy
   link always goes to /cookies. */

const COPY: Record<string, { text: string; accept: string; reject: string; policy: string; label: string }> = {
  en: { label: "Cookies", text: "We'd like to use Google Analytics cookies to see how visitors find and use Synq. They load only if you agree.", accept: "Accept", reject: "Reject", policy: "Cookies policy" },
  es: { label: "Cookies", text: "Queremos usar cookies de Google Analytics para ver cómo llegan y usan Synq los visitantes. Solo se cargan si aceptas.", accept: "Aceptar", reject: "Rechazar", policy: "Política de cookies" },
  ca: { label: "Galetes", text: "Volem fer servir galetes de Google Analytics per veure com arriben i fan servir Synq els visitants. Només es carreguen si acceptes.", accept: "Acceptar", reject: "Rebutjar", policy: "Política de galetes" },
  eu: { label: "Cookieak", text: "Google Analyticsen cookieak erabili nahi ditugu bisitariek Synq nola aurkitzen eta erabiltzen duten ikusteko. Onartzen baduzu bakarrik kargatzen dira.", accept: "Onartu", reject: "Ukatu", policy: "Cookie politika" },
  fr: { label: "Cookies", text: "Nous aimerions utiliser les cookies de Google Analytics pour voir comment les visiteurs trouvent et utilisent Synq. Ils ne se chargent qu'avec votre accord.", accept: "Accepter", reject: "Refuser", policy: "Politique de cookies" },
  de: { label: "Cookies", text: "Wir möchten Cookies von Google Analytics verwenden, um zu sehen, wie Besucher Synq finden und nutzen. Sie werden nur mit deiner Zustimmung geladen.", accept: "Akzeptieren", reject: "Ablehnen", policy: "Cookie-Richtlinie" },
  pt: { label: "Cookies", text: "Gostaríamos de usar cookies do Google Analytics para ver como os visitantes encontram e usam o Synq. Só são carregados se aceitares.", accept: "Aceitar", reject: "Rejeitar", policy: "Política de cookies" },
  it: { label: "Cookie", text: "Vorremmo usare i cookie di Google Analytics per capire come i visitatori trovano e usano Synq. Vengono caricati solo se accetti.", accept: "Accetta", reject: "Rifiuta", policy: "Cookie policy" },
  ja: { label: "Cookie", text: "訪問者がSynqをどのように見つけて使っているかを知るため、Google AnalyticsのCookieを使用したいと考えています。同意いただいた場合のみ読み込まれます。", accept: "同意する", reject: "拒否する", policy: "Cookieポリシー" },
  ko: { label: "쿠키", text: "방문자가 Synq를 어떻게 찾고 사용하는지 알기 위해 Google Analytics 쿠키를 사용하고자 합니다. 동의하신 경우에만 로드됩니다.", accept: "동의", reject: "거부", policy: "쿠키 정책" },
};

export default function CookieBanner() {
  const locale = useLocale();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!analyticsEnabled) return;
    if (readConsent() === null) setOpen(true);
    const reopen = () => {
      /* GPC/DNT is a standing "no"; there is nothing to ask */
      if (!browserOptedOut()) setOpen(true);
    };
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  if (!open) return null;
  const copy = COPY[locale] ?? COPY.en;

  const choose = (value: "granted" | "denied") => {
    writeConsent(value);
    setOpen(false);
  };

  const button =
    "h-9 flex-1 rounded-full px-4 text-[13.5px] font-semibold sm:flex-none";

  return (
    <div
      role="region"
      aria-label={copy.label}
      className="locale-hint fixed bottom-4 left-4 right-4 z-50 flex flex-col gap-3 rounded-[14px] bg-white p-4 text-[14px] text-[var(--color-ink)] sm:right-auto sm:max-w-[440px]"
    >
      <p className="leading-snug">
        {copy.text}{" "}
        <a href="/cookies" hrefLang="en" className="underline underline-offset-2">
          {copy.policy}
        </a>
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => choose("denied")}
          className={`${button} bg-[var(--color-ink)] text-white`}
        >
          {copy.reject}
        </button>
        <button
          type="button"
          onClick={() => choose("granted")}
          className={`${button} bg-[var(--color-ink)] text-white`}
        >
          {copy.accept}
        </button>
      </div>
    </div>
  );
}
