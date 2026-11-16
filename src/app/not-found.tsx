import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Seite nicht gefunden",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="not-found-page">
      <section className="not-found-hero">
        <Image
          src="/media/interior-hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
        />
        <div className="not-found-shade" />
        <div className="not-found-content">
          <span className="not-found-code">404</span>
          <span className="hero-script">Cooking and More</span>
          <h1>Seite nicht gefunden</h1>
          <p>
            Die gewünschte Seite ist leider nicht verfügbar. Entdecken Sie unsere
            Catering-Angebote oder kehren Sie zur Startseite zurück.
          </p>
          <div className="not-found-actions">
            <Link className="button" href="/">Zur Startseite</Link>
            <Link className="not-found-link" href="/kontakt/">Kontakt aufnehmen</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
