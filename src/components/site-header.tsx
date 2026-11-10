"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { navigation } from "@/data/site";

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
          {navigation.map(item => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
          <Link className="nav-cta" href="/kontakt/" onClick={() => setOpen(false)}>Angebot anfragen</Link>
        </nav>
      </div>
    </header>
  );
}
