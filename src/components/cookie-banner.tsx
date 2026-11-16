"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const COOKIE = "cam_consent";
const SIX_MONTHS = 60 * 60 * 24 * 180;
type Choice = "necessary" | "all";

function readChoice(): Choice | null {
  const match = document.cookie.match(/(?:^|; )cam_consent=(necessary|all)(?:;|$)/);
  return match?.[1] === "all" || match?.[1] === "necessary" ? match[1] : null;
}

function writeChoice(choice: Choice) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE}=${choice}; Path=/; Max-Age=${SIX_MONTHS}; SameSite=Lax${secure}`;
}

function loadYoutube() {
  document.querySelectorAll<HTMLElement>("[data-youtube-id]").forEach(slot => {
    if (slot.querySelector("iframe")) return;
    const id = slot.dataset.youtubeId ?? "";
    if (!/^[A-Za-z0-9_-]{11}$/.test(id)) return;
    const frame = document.createElement("iframe");
    frame.title = "Cooking and More Film";
    frame.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&start=5&rel=0&playsinline=1&modestbranding=1`;
    frame.allow = "autoplay; encrypted-media; picture-in-picture";
    frame.referrerPolicy = "strict-origin-when-cross-origin";
    frame.tabIndex = -1;
    slot.append(frame);
  });
}

function unloadYoutube() {
  document.querySelectorAll("[data-youtube-id] iframe").forEach(frame => frame.remove());
}

function applyChoice(choice: Choice) {
  document.documentElement.dataset.consent = choice;
  if (choice === "all") loadYoutube();
  else unloadYoutube();
}

export function syncConsentMedia() {
  const saved = typeof document === "undefined" ? null : readChoice();
  if (saved) applyChoice(saved);
}

export function openCookieSettings() {
  window.dispatchEvent(new Event("cam-consent-open"));
}

export function CookieSettingsButton() {
  return (
    <button type="button" className="cookie-settings" onClick={openCookieSettings}>
      Cookie-Einstellungen
    </button>
  );
}

export function CookieBanner() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const saved = readChoice();
    if (saved) {
      applyChoice(saved);
      setOpen(false);
    }
    const reopen = () => setOpen(true);
    window.addEventListener("cam-consent-open", reopen);
    return () => window.removeEventListener("cam-consent-open", reopen);
  }, []);

  function choose(choice: Choice) {
    writeChoice(choice);
    applyChoice(choice);
    setOpen(false);
  }

  if (!open) return null;

  return (
    <aside className="cookie-banner" role="dialog" aria-labelledby="cookie-banner-title">
      <p id="cookie-banner-title">Cookies</p>
      <p>
        Wir verwenden notwendige Cookies, um Ihre Auswahl sechs Monate zu speichern und das Kontaktformular vor Missbrauch zu schützen.
        Der YouTube-Film im Seitenkopf wird erst geladen, wenn Sie zustimmen. Sie können die Auswahl jederzeit ändern.
      </p>
      <Link href="/datenschutzerklarung/#cookies">Mehr in der Datenschutzerklärung</Link>
      <div className="cookie-banner-actions">
        <button type="button" onClick={() => choose("necessary")}>Nur notwendige</button>
        <button type="button" onClick={() => choose("all")}>Alle akzeptieren</button>
      </div>
    </aside>
  );
}
