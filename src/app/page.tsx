import Image from "next/image";
import Link from "next/link";
import { locations } from "@/data/site";

export default function Home() {
  return (
    <main>
      <section className="home-hero">
        <Image src="/media/hochzeit.jpeg" alt="Festlich gedeckte Tafel von Cooking and More" fill priority sizes="100vw" />
        <div className="hero-shade" />
        <div className="home-hero-content">
          <span className="kicker">Catering · Events · Locations</span>
          <h1>Innovative Ideen treffen auf kulinarische Begeisterung</h1>
          <p>Ihr Catering-Experte für unvergessliche Veranstaltungen in Köln und Umgebung.</p>
          <div className="hero-actions"><Link className="button" href="/kontakt/">Event planen</Link><Link className="text-link light" href="/business/">Unser Catering <span>→</span></Link></div>
        </div>
      </section>
      <section className="intro section">
        <span className="kicker gold">Cooking and More</span>
        <h2>Momente, die bleiben.<br />Genuss, der verbindet.</h2>
        <p>Entdecken Sie die Vielfalt unseres Catering-Angebots und lassen Sie sich von unserer Leidenschaft für gutes Essen inspirieren. Mit Cooking and More wird Ihre Veranstaltung zu einem kulinarischen Erfolg.</p>
      </section>
      <section className="service-grid">
        <Link className="service-card" href="/business/"><Image src="/media/weihnachten.jpg" alt="" fill sizes="(max-width: 800px) 100vw, 50vw" /><div><span>Für Unternehmen</span><h3>Business</h3><p>Meetings, Messen und Firmenfeste</p></div></Link>
        <Link className="service-card" href="/privat/"><Image src="/media/hochzeit.jpeg" alt="" fill sizes="(max-width: 800px) 100vw, 50vw" /><div><span>Für Sie</span><h3>Privat</h3><p>Hochzeiten und besondere Anlässe</p></div></Link>
      </section>
      <section className="section split">
        <div className="image-stack"><Image src="/media/dock2.jpg" alt="Cooking and More Event" fill sizes="(max-width: 800px) 100vw, 50vw" /></div>
        <div className="split-copy"><span className="kicker gold">Über uns</span><h2>Kreativ. Persönlich. Mit Leidenschaft.</h2><p>Bei cooking and more stehen Qualität und Kreativität im Mittelpunkt. Als erfahrener Catering-Service bieten wir maßgeschneiderte kulinarische Konzepte für jede Veranstaltung. Unser engagiertes Team sorgt dafür, dass Ihre Feier unvergesslich wird.</p><Link className="text-link" href="/about-us-2/">Mehr über uns <span>→</span></Link></div>
      </section>
      <section className="location-section section">
        <div className="section-heading"><div><span className="kicker gold">Besondere Orte</span><h2>Unsere Locations</h2></div><Link className="text-link" href="/locations/">Alle Locations <span>→</span></Link></div>
        <div className="location-grid">{locations.slice(0,3).map(location => <Link href={location.path} className="location-card" key={location.path}><div className="location-image"><Image src={location.image!} alt={location.title} fill sizes="(max-width: 800px) 100vw, 33vw" /></div><h3>{location.title}</h3><p>{location.description}</p></Link>)}</div>
      </section>
      <section className="cta"><div><span className="kicker">Ihre Idee. Unser Handwerk.</span><h2>Lassen Sie uns gemeinsam etwas Besonderes schaffen.</h2><Link className="button light-button" href="/kontakt/">Unverbindlich anfragen</Link></div></section>
    </main>
  );
}
