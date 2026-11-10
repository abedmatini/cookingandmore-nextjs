"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(Object.fromEntries(form)),
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
      <button className="button" disabled={status === "sending"}>{status === "sending" ? "Wird gesendet …" : "Anfrage senden"}</button>
      {status === "sent" && <p className="form-success" role="status">Vielen Dank! Ihre Anfrage wurde angenommen.</p>}
      {status === "error" && <p className="form-error" role="alert">Bitte prüfen Sie Ihre Angaben und versuchen Sie es erneut.</p>}
    </form>
  );
}
