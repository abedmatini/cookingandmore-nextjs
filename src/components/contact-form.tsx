"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

export function ContactForm({ turnstileSiteKey = "" }: { turnstileSiteKey?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const slotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slot = slotRef.current;
    if (!slot || slot.dataset.mounted === "1") return;
    slot.dataset.mounted = "1";
    if (!turnstileSiteKey) {
      slot.textContent = "Die Sicherheitsprüfung ist noch nicht eingerichtet.";
      return;
    }
    const render = () => {
      const turnstile = (window as Window & { turnstile?: { render: (element: HTMLElement, options: { sitekey: string }) => void } }).turnstile;
      if (!turnstile) return false;
      turnstile.render(slot, { sitekey: turnstileSiteKey });
      return true;
    };
    if (render()) return;
    let script = document.querySelector<HTMLScriptElement>('script[data-turnstile="1"]');
    if (!script) {
      script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.dataset.turnstile = "1";
      document.head.append(script);
    }
    const widgetScript = script;
    widgetScript.addEventListener("load", () => render(), { once: true });
  }, [turnstileSiteKey]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const turnstileToken = String(form.get("cf-turnstile-response") ?? "");
    if (!turnstileToken) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...Object.fromEntries(form), turnstileToken }),
    });
    setStatus(response.ok ? "sent" : "error");
    if (response.ok) event.currentTarget.reset();
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="field-row">
        <label>Vor- und Nachname<input name="name" minLength={2} required autoComplete="name" /></label>
        <label>E-Mail-Adresse<input name="email" type="email" required autoComplete="email" /></label>
      </div>
      <div className="field-row">
        <label>Telefon<input name="phone" type="tel" autoComplete="tel" /></label>
        <label>Art der Veranstaltung<select name="eventType" defaultValue=""><option value="" disabled>Bitte wählen</option><option>Business</option><option>Privat</option><option>Hochzeit</option><option>Sonstiges</option></select></label>
      </div>
      <label>Ihre Nachricht<textarea name="message" minLength={10} rows={6} required /></label>
      <label className="consent"><input name="consent" type="checkbox" required /> Ich habe die Datenschutzerklärung gelesen und stimme der Verarbeitung meiner Angaben zu.</label>
      <div ref={slotRef} className="cf-turnstile" />
      <button className="button" disabled={status === "sending"}>{status === "sending" ? "Wird gesendet …" : "Anfrage senden"}</button>
      {status === "sent" && <p className="form-success" role="status">Vielen Dank! Ihre Anfrage wurde angenommen.</p>}
      {status === "error" && <p className="form-error" role="alert">Bitte prüfen Sie Ihre Angaben und versuchen Sie es erneut.</p>}
    </form>
  );
}
