import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/contact-form";
import { SourceContent } from "@/components/source-content";
import { allPages, getPage, locations, posts } from "@/data/site";
import { getSourcePage } from "@/data/source";
import { repairContentHtml } from "@/lib/repair-content-links";

type Props = { params: Promise<{ slug: string[] }> };

export function generateStaticParams() {
  return allPages.map(page => ({ slug: page.path.split("/").filter(Boolean) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const path = `/${slug.join("/")}/`;
  const source = getSourcePage(path);
  const page = getPage(path);
  if (!page && !source) {
    return {
      title: "Seite nicht gefunden",
      robots: { index: false, follow: false },
    };
  }
  const title = source?.title ?? page!.title;
  const description = source?.description ?? page?.description ?? "Cooking and More – Catering, Events und Locations in Köln.";
  return {
    title: `${title} - Cooking And More`,
    description,
    alternates: { canonical: `https://cookingandmore.de${path}` },
    openGraph: { title: `${title} - Cooking And More`, description, type: page?.kind === "post" ? "article" : "website", images: page?.image ? [page.image] : ["/media/hochzeit.jpeg"] },
  };
}

function ContactPage() {
  return (
    <>
      <Hero title="Kontakt" description="Wir freuen uns auf deine Nachricht." image="/media/contact-original.jpg" />
      <section className="section contact-layout">
        <div><span className="kicker gold">Kontaktiere uns</span><h2>Wir freuen uns auf Ihre Anfrage.</h2><p>Erzählen Sie uns von Ihrem Anlass. Gemeinsam entwickeln wir ein Catering-Konzept, das zu Ihnen und Ihren Gästen passt.</p>
          <div className="contact-details"><div><small>Adresse</small><p>Hafenstraße 7<br />51063 Köln Mülheim</p></div><div><small>Kontakt</small><p><a href="tel:+4922175944444">0221 – 7594 4444</a><br /><a href="mailto:welcome@cookingandmore.de">welcome@cookingandmore.de</a></p></div></div>
        </div>
        <ContactForm />
      </section>
    </>
  );
}

function LegalPage({ privacy = false }: { privacy?: boolean }) {
  return (
    <>
      <div className="simple-hero"><span className="kicker">Cooking and More</span><h1>{privacy ? "Datenschutz­erklärung" : "Impressum"}</h1></div>
      <article className="legal section">
        {privacy ? <>
          <h2>1. Datenschutz auf einen Blick</h2><h3>Allgemeine Hinweise</h3><p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.</p>
          <h3>Datenerfassung auf dieser Website</h3><p>Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen, zum Beispiel über das Kontaktformular. Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst.</p>
          <h2>2. Hosting</h2><h3>IONOS</h3><p>Anbieter ist die IONOS SE, Elgendorfer Str. 57, 56410 Montabaur. Wenn Sie unsere Website besuchen, erfasst IONOS verschiedene Logfiles inklusive Ihrer IP-Adressen.</p>
          <h2>3. Allgemeine Hinweise und Pflichtinformationen</h2><h3>Hinweis zur verantwortlichen Stelle</h3><p>Cooking &amp; More GmbH<br />Hafenstraße 7<br />51063 Köln Mülheim<br />Telefon: 0221 – 7594 – 4444<br />E-Mail: welcome@cookingandmore.de</p>
          <h3>Ihre Rechte</h3><p>Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten sowie ein Recht auf Berichtigung oder Löschung. Außerdem können Sie Einwilligungen jederzeit widerrufen und die Einschränkung der Verarbeitung verlangen.</p>
          <h2>4. Datenerfassung auf dieser Website</h2><h3>Kontaktformular</h3><p>Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p>
          <h2>5. Soziale Medien</h2><p>Auf dieser Website können Elemente von Facebook und Instagram integriert sein. Die Nutzung erfolgt auf Grundlage Ihrer Einwilligung.</p>
          <h2>6. Analyse-Tools und Werbung</h2><h3>IONOS WebAnalytics</h3><p>Diese Website kann die Analysedienste von IONOS WebAnalytics nutzen. Die Datenerfassung erfolgt laut IONOS vollständig anonymisiert.</p>
          <h2>7. Plugins und Tools</h2><h3>Google Fonts und Font Awesome</h3><p>Diese Seite nutzt Schriftarten zur einheitlichen Darstellung. Font Awesome wird lokal gehostet.</p>
        </> : <>
          <p>Cooking and More GmbH<br />Hafenstraße 7<br />51063 Köln Mülheim</p>
          <h2>Handelsregister</h2><p>Handelsregister: 64469<br />Registergericht: Köln Porz</p>
          <h2>Vertreten durch</h2><p>Domenik Gallinat, Hans-Herrmann Klein</p>
          <h2>Kontakt</h2><p>Telefon: 0221 – 7594 4444<br />E-Mail: welcome@cookingandmore.de</p>
          <h2>Umsatzsteuer-ID</h2><p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: DE 258201208</p>
          <h2>EU-Streitschlichtung</h2><p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
        </>}
      </article>
    </>
  );
}

function Hero({ title, description, image }: { title: string; description?: string; image?: string }) {
  return <section className="page-hero">{image && <Image src={image} alt="" fill priority sizes="100vw" />}<div className="hero-shade" /><div><span className="hero-script">Cooking and More</span><h1>{title}</h1>{description && <p>{description}</p>}</div></section>;
}

export default async function ContentPage({ params }: Props) {
  const { slug } = await params;
  const path = `/${slug.join("/")}/`;
  const source = getSourcePage(path);
  if (source) return <SourceContent page={{ ...source, html: repairContentHtml(source.html) }} />;
  if (path === "/kontakt/") return <ContactPage />;
  if (path === "/impressum/") return <LegalPage />;
  if (path === "/datenschutzerklarung/") return <LegalPage privacy />;
  const page = getPage(path);
  if (!page) notFound();

  if (page.kind === "archive") return (
    <><div className="simple-hero"><span className="kicker">Archiv</span><h1>{page.title}</h1></div><section className="section"><div className="location-grid">{posts.slice(0,6).map(post => <Link href={post.path} className="location-card" key={post.path}><div className="location-image"><Image src={post.image!} alt={post.title} fill sizes="33vw" /></div><h3>{post.title}</h3><p>{post.description}</p></Link>)}</div></section></>
  );

  const isLocations = path === "/locations/";
  return (
    <>
      <Hero title={page.title} description={page.description} image={page.image ?? "/media/dock2.jpg"} />
      <article className="content section">
        <div className="content-main">
          {page.eyebrow && <span className="kicker gold">{page.eyebrow}</span>}
          {page.description && <h2>{page.description}</h2>}
          {(page.body ?? ["Diese Seite stammt aus dem früheren Theme- und Inhaltsarchiv von Cooking and More. Der ursprüngliche URL-Pfad bleibt für bestehende Links erhalten."]).map((text, index) => <p key={index}>{text}</p>)}
        </div>
        <aside className="content-aside"><h3>Ihr Event in besten Händen</h3><p>Wir beraten Sie persönlich und entwickeln ein passendes Konzept.</p><Link className="button" href="/kontakt/">Jetzt anfragen</Link></aside>
      </article>
      {isLocations && <section className="section pt-none"><div className="location-grid">{locations.map(location => <Link href={location.path} className="location-card" key={location.path}><div className="location-image"><Image src={location.image!} alt={location.title} fill sizes="33vw" /></div><h3>{location.title}</h3><p>{location.description}</p></Link>)}</div></section>}
    </>
  );
}
