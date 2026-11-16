"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const cateringLinks = [
  ["Messe- & Crewcatering", "/perfektes-business-catering-fur-messen-und-crew-events-mit-cooking-and-more/"],
  ["Gala Event", "/verleihen-sie-ihrem-gala-event-glanz-mit-dem-business-catering-von-cooking-and-more/"],
  ["Sommerfest", "/feiern-sie-ihre-sommerfest-mit-dem-business-catering-von-cooking-and-more/"],
  ["Weihnachtsfeier", "/feiern-sie-ihre-weihnachtsfeier-mit-dem-business-catering-von-cooking-and-more/"],
  ["Foodtrucks", "/entdecken-sie-business-catering-streetfood/"],
  ["Streetfood", "/streetfooentdecken-sie-business-catering-streetfood/"],
  ["Jubiläum", "/junilaumscatering/"],
  ["Hochzeit", "/hochzeitscaterig/"],
];

const locationLinks = [
  ["Zur gemütlichen Ecke", "/zur-gemutlichen-ekce-2/"],
  ["Palladium", "/e-palladium/"],
  ["E-Werk", "/e-werk/"],
  ["DOCK2", "/doc2/"],
  ["Hafen 12", "/hafen12/"],
  ["Alte Giesserei", "/alte-giesserei/"],
  ["Lokschuppen", "/lokschuppen/"],
  ["Goldener Pflug", "/goldenerpflug/"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="Cooking and More Startseite">
          <Image src="/media/logo-white.png" alt="Cooking and More" width={202} height={68} priority />
        </Link>
        <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Menü öffnen">
          <span /><span /><span />
        </button>
        <nav className={open ? "nav open" : "nav"} aria-label="Hauptnavigation">
          <Link className="mobile-only" href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/about-us/" onClick={() => setOpen(false)}>Über uns</Link>
          <div className="nav-group">
            <button type="button">Entdecke unser Catering</button>
            <div className="mega-menu catering-menu">
              <div><strong>Business</strong><Link href="/business/" onClick={() => setOpen(false)}>Business Catering</Link>{cateringLinks.slice(0, 6).map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}</div>
              <div><strong>Privat</strong><Link href="/privat/" onClick={() => setOpen(false)}>Privat Catering</Link>{cateringLinks.slice(6).map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}</div>
            </div>
          </div>
          <div className="nav-group">
            <Link href="/locations/" onClick={() => setOpen(false)}>Unsere Locations</Link>
            <div className="mega-menu location-menu">{locationLinks.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}</div>
          </div>
          <Link className="nav-cta" href="/kontakt/" onClick={() => setOpen(false)}>Kontakt</Link>
        </nav>
      </div>
    </header>
  );
}
