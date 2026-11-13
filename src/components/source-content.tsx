"use client";

import { FormEvent, MouseEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { SourcePage } from "@/data/source";

type ViewerImage = { src: string; alt: string };
type ViewerState = { images: ViewerImage[]; index: number };

const GALLERY_SELECTOR = ".grandrestaurant-gallery-grid-content-wrapper, .portfolio_filter_wrapper, .gallery";

function readImage(anchor: HTMLAnchorElement): ViewerImage | null {
  const href = anchor.getAttribute("href") || "";
  const image = anchor.querySelector("img");
  const src = /\.(?:jpe?g|png|gif|webp|avif|svg)(?:$|[?#])/i.test(href)
    ? href
    : image?.currentSrc || image?.getAttribute("src") || "";
  if (!src) return null;
  const alt = image?.getAttribute("alt")?.trim()
    || anchor.getAttribute("data-title")?.trim()
    || anchor.closest(".one_fourth, .gallery-grid-item, .portfolio-item, figure")?.querySelector("img")?.getAttribute("alt")?.trim()
    || "";
  return { src, alt };
}

type TurnstileApi = { render: (element: HTMLElement, options: { sitekey: string }) => void };

function mountTurnstile(form: HTMLFormElement, siteKey: string) {
  if (form.querySelector(".cf-turnstile")) return;
  const slot = document.createElement("div");
  slot.className = "cf-turnstile";
  const submit = form.querySelector<HTMLElement>('[type="submit"]');
  if (submit?.parentElement) submit.parentElement.before(slot);
  else form.append(slot);
  if (!siteKey) {
    slot.textContent = "Die Sicherheitsprüfung ist noch nicht eingerichtet.";
    return;
  }
  const render = () => {
    const turnstile = (window as Window & { turnstile?: TurnstileApi }).turnstile;
    if (!turnstile) return false;
    turnstile.render(slot, { sitekey: siteKey });
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
  widgetScript.addEventListener("load", () => {
    widgetScript.dataset.loaded = "1";
    render();
  }, { once: true });
  if (widgetScript.dataset.loaded === "1") render();
}

export function SourceContent({ page, turnstileSiteKey = "" }: { page: SourcePage; turnstileSiteKey?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [statusText, setStatusText] = useState("");
  const [viewer, setViewer] = useState<ViewerState | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formDraft = useRef<{ fields: Record<string, string>; consent: boolean } | null>(null);

  useLayoutEffect(() => {
    const root = contentRef.current;
    if (!root) return;
    if (page.route === "/business/" || page.route === "/locations/") {
      for (const card of root.querySelectorAll<HTMLElement>(".blog-posts-grid_no_space")) {
        if (card.querySelector(":scope > a.business-card-link")) continue;
        const titleLink = card.querySelector<HTMLAnchorElement>(".post-header-title a");
        const href = titleLink?.getAttribute("href");
        if (!href) continue;
        const anchor = document.createElement("a");
        anchor.className = "business-card-link";
        anchor.href = href;
        while (card.firstChild) anchor.appendChild(card.firstChild);
        card.appendChild(anchor);
        for (const inner of anchor.querySelectorAll("a")) {
          const span = document.createElement("span");
          span.textContent = inner.textContent;
          inner.replaceWith(span);
        }
      }
    }
    for (const form of root.querySelectorAll<HTMLFormElement>(".wpcf7-form")) {
      if (!form.querySelector('input[name="consent"]')) {
        const label = document.createElement("label");
        label.className = "consent";
        const input = document.createElement("input");
        input.type = "checkbox";
        input.name = "consent";
        input.value = "on";
        input.required = true;
        const text = document.createElement("span");
        text.append("Ich habe die ");
        const link = document.createElement("a");
        link.href = "/datenschutzerklarung/";
        link.textContent = "Datenschutzerklärung";
        text.append(link, " gelesen und stimme der Verarbeitung meiner Angaben zu.");
        label.append(input, text);
        const submit = form.querySelector<HTMLElement>('[type="submit"]');
        if (submit?.parentElement) submit.parentElement.before(label);
        else form.append(label);
      }
      mountTurnstile(form, turnstileSiteKey);
    }
    const draft = formDraft.current;
    const form = root.querySelector<HTMLFormElement>(".wpcf7-form");
    if (!draft || !form) return;
    for (const [key, value] of Object.entries(draft.fields)) {
      const field = form.elements.namedItem(key);
      if (field instanceof RadioNodeList || (field instanceof HTMLInputElement && field.type === "radio")) {
        const match = form.querySelector<HTMLInputElement>(`input[type="radio"][name="${CSS.escape(key)}"][value="${CSS.escape(value)}"]`);
        if (match) match.checked = true;
      } else if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement || field instanceof HTMLSelectElement) {
        field.value = value;
      }
    }
    const box = form.querySelector<HTMLInputElement>('input[name="consent"]');
    if (box) box.checked = draft.consent;
  }, [page.html, page.route, status, viewer, turnstileSiteKey]);

  useEffect(() => {
    const root = contentRef.current;
    if (!root || page.route !== "/") return;

    const carousel = root.querySelector<HTMLElement>(".owce-carousel");
    if (carousel && carousel.dataset.looped !== "true") {
      for (const item of [...carousel.children]) {
        const clone = item.cloneNode(true) as HTMLElement;
        clone.setAttribute("aria-hidden", "true");
        clone.querySelectorAll("a, button").forEach(node => node.setAttribute("tabindex", "-1"));
        carousel.appendChild(clone);
      }
      carousel.dataset.looped = "true";
    }

    const icon = root.querySelector<HTMLElement>(".elementor > section:first-child .elementor-widget-icon");
    if (!icon) return;
    icon.setAttribute("role", "button");
    icon.tabIndex = 0;
    icon.setAttribute("aria-label", "Nach unten scrollen");
    const scrollDown = () => {
      root.querySelector('[data-id="5f53fd4"]')?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    const onClick = () => scrollDown();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      scrollDown();
    };
    icon.addEventListener("click", onClick);
    icon.addEventListener("keydown", onKeyDown);
    return () => {
      icon.removeEventListener("click", onClick);
      icon.removeEventListener("keydown", onKeyDown);
    };
  }, [page.route, page.html, status, viewer]);

  useEffect(() => {
    if (!viewer) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setViewer(null);
        returnFocus.current?.focus();
        return;
      }
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      const direction = event.key === "ArrowRight" ? 1 : -1;
      setViewer(current => current
        ? { ...current, index: (current.index + direction + current.images.length) % current.images.length }
        : current);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [viewer]);

  function closeViewer() {
    setViewer(null);
    returnFocus.current?.focus();
  }

  function openViewer(event: MouseEvent<HTMLDivElement>) {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const anchor = target.closest("a");
    if (!(anchor instanceof HTMLAnchorElement) || !event.currentTarget.contains(anchor)) return;
    if (anchor.getAttribute("data-lightbox") !== "1") return;
    const scope = anchor.closest(GALLERY_SELECTOR) ?? anchor;
    const anchors = scope === anchor
      ? [anchor]
      : [...scope.querySelectorAll<HTMLAnchorElement>("a[data-lightbox]")];
    const images = anchors.map(readImage).filter((image): image is ViewerImage => image !== null);
    if (!images.length) return;
    event.preventDefault();
    returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const index = Math.max(0, anchors.indexOf(anchor));
    setViewer({ images, index: Math.min(index, images.length - 1) });
  }

  function step(direction: number) {
    setViewer(current => current
      ? { ...current, index: (current.index + direction + current.images.length) % current.images.length }
      : current);
  }

  async function submit(event: FormEvent<HTMLDivElement>) {
    const form = event.target;
    if (!(form instanceof HTMLFormElement) || !form.matches(".wpcf7-form")) return;
    event.preventDefault();
    const values = new FormData(form);
    const consentGiven = form.querySelector<HTMLInputElement>('input[name="consent"]')?.checked === true;
    formDraft.current = {
      fields: Object.fromEntries([...values.entries()].filter((entry): entry is [string, string] => typeof entry[1] === "string" && entry[0] !== "consent")),
      consent: consentGiven,
    };
    const turnstileToken = String(values.get("cf-turnstile-response") ?? "");
    if (!consentGiven || !turnstileToken) {
      setStatus("error");
      return;
    }
    const payload = {
      name: String(values.get("your-name") ?? values.get("name") ?? ""),
      email: String(values.get("your-email") ?? values.get("email") ?? ""),
      phone: String(values.get("phone") ?? ""),
      eventType: String(values.get("BusinessorPrivat") ?? values.get("eventType") ?? ""),
      message: String(values.get("your-message") ?? values.get("message") ?? ""),
      consent: "on" as const,
      turnstileToken,
    };
    setStatus("sending");
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json().catch(() => null) as { error?: string } | null;
    if (response.ok) formDraft.current = null;
    setStatusText(response.ok ? "Vielen Dank! Ihre Anfrage wurde an welcome@cookingandmore.de gesendet." : result?.error || "Bitte prüfen Sie Ihre Angaben und versuchen Sie es erneut.");
    setStatus(response.ok ? "sent" : "error");
  }

  const current = viewer?.images[viewer.index];

  return (
    <div className="source-page" data-route={page.route} onSubmit={submit} onClick={openViewer}>
      <div ref={contentRef} className="source-content" dangerouslySetInnerHTML={{ __html: page.html }} />
      {status === "sending" && <p className="source-form-status">Ihre Anfrage wird gesendet …</p>}
      {status === "sent" && <p className="source-form-status success" role="status">{statusText}</p>}
      {status === "error" && <p className="source-form-status error" role="alert">{statusText}</p>}
      {viewer && current && (
        <div className="image-lightbox" onClick={event => { if (event.target === event.currentTarget) closeViewer(); }}>
          <div className="image-lightbox-dialog" role="dialog" aria-modal="true" aria-label={current.alt || "Bildansicht"}>
            <button ref={closeRef} type="button" className="image-lightbox-close" aria-label="Schließen" onClick={closeViewer}>×</button>
            {viewer.images.length > 1 && (
              <>
                <button type="button" className="image-lightbox-nav prev" aria-label="Vorheriges Bild" onClick={() => step(-1)}>‹</button>
                <button type="button" className="image-lightbox-nav next" aria-label="Nächstes Bild" onClick={() => step(1)}>›</button>
              </>
            )}
            <figure>
              {/* The source is chosen per click from imported gallery files, so the optimizer cannot size it ahead of time. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={current.src} alt={current.alt} />
              {current.alt && <figcaption>{current.alt}</figcaption>}
            </figure>
            {viewer.images.length > 1 && <p className="image-lightbox-count">{viewer.index + 1} / {viewer.images.length}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
