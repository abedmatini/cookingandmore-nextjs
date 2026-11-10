import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <Image src="/media/logo-white.png" alt="Cooking and More" width={202} height={68} />
          <p>Bei cooking and more stehen Qualität und Kreativität im Mittelpunkt. Maßgeschneiderte kulinarische Konzepte für jede Veranstaltung.</p>
        </div>
        <div>
          <h3>Entdecken</h3>
          <Link href="/business/">Business Catering</Link>
          <Link href="/privat/">Private Feiern</Link>
          <Link href="/locations/">Locations</Link>
          <Link href="/about-us-2/">Nachhaltigkeit</Link>
        </div>
        <div>
          <h3>Kontakt</h3>
          <p>Hafenstraße 7<br />51063 Köln Mülheim</p>
          <a href="tel:+4922175944444">0221 – 7594 4444</a>
          <a href="mailto:welcome@cookingandmore.de">welcome@cookingandmore.de</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Cooking and More GmbH</span>
        <div><Link href="/impressum/">Impressum</Link><Link href="/datenschutzerklarung/">Datenschutz</Link></div>
      </div>
    </footer>
  );
}
