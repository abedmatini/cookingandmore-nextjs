"use client";

import { FormEvent, useState } from "react";
import type { SourcePage } from "@/data/source";

export function SourceContent({ page }: { page: SourcePage }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(event: FormEvent<HTMLDivElement>) {
    const form = event.target;
    if (!(form instanceof HTMLFormElement) || !form.matches(".wpcf7-form")) return;
    event.preventDefault();
    const values = new FormData(form);
    const payload = {
      name: String(values.get("your-name") ?? values.get("name") ?? ""),
      email: String(values.get("your-email") ?? values.get("email") ?? ""),
      phone: String(values.get("phone") ?? ""),
      eventType: String(values.get("BusinessorPrivat") ?? values.get("eventType") ?? ""),
      message: String(values.get("your-message") ?? values.get("message") ?? ""),
      consent: "on",
    };
    setStatus("sending");
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    setStatus(response.ok ? "sent" : "error");
    if (response.ok) form.reset();
  }

  return (
    <div className="source-page" data-route={page.route} onSubmit={submit}>
      <div className="source-content" dangerouslySetInnerHTML={{ __html: page.html }} />
      {status === "sending" && <p className="source-form-status">Ihre Anfrage wird gesendet …</p>}
      {status === "sent" && <p className="source-form-status success" role="status">Vielen Dank! Ihre Anfrage wurde angenommen.</p>}
      {status === "error" && <p className="source-form-status error" role="alert">Bitte prüfen Sie Ihre Angaben und versuchen Sie es erneut.</p>}
    </div>
  );
}
