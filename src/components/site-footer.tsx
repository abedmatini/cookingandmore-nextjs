import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <Image src="/media/logo-white.png" alt="Cooking and More" width={202} height={68} />
          <p>Bei cooking and more stehen Qualität und Kreativität im Mittelpunkt. Maßgeschneiderte kulinarische Konzepte für jede Veranstaltung.</p>
          <div className="footer-social"><a href="https://facebook.com/cookingandmoregmbh">Facebook</a><a href="https://www.instagram.com/cookingandmore_catering/?hl=de">Instagram</a></div>
        </div>
        <div>
          <h3>Übersicht</h3>
          <Link href="/">Home</Link>
          <Link href="/business/">Business</Link>
          <Link href="/privat/">Privat</Link>
          <Link href="/about-us/">Über uns</Link>
          <Link href="/locations/">Unsere Locations</Link>
          <Link href="/impressum/">Impressum</Link>
          <Link href="/datenschutzerklarung/">Datenschutzerklärung</Link>
        </div>
        <div>
          <h3>Kontakt</h3>
          <a href="tel:+4922175944444">0221 – 75944444</a>
          <a href="mailto:welcome@cookingandmore.de">info@cookingandmore.de</a>
          <a href="https://cookingandmore.de">https://cookingandmore.de</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Cooking and More GmbH</span>
      </div>
    </footer>
  );
}
