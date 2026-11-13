"use client";

import { FormEvent, MouseEvent, useEffect, useRef, useState } from "react";
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

export function SourceContent({ page }: { page: SourcePage }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [viewer, setViewer] = useState<ViewerState | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

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

  const current = viewer?.images[viewer.index];

  return (
    <div className="source-page" data-route={page.route} onSubmit={submit} onClick={openViewer}>
      <div className="source-content" dangerouslySetInnerHTML={{ __html: page.html }} />
      {status === "sending" && <p className="source-form-status">Ihre Anfrage wird gesendet …</p>}
      {status === "sent" && <p className="source-form-status success" role="status">Vielen Dank! Ihre Anfrage wurde angenommen.</p>}
      {status === "error" && <p className="source-form-status error" role="alert">Bitte prüfen Sie Ihre Angaben und versuchen Sie es erneut.</p>}
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
