import fs from "node:fs";
import path from "node:path";
import * as cheerio from "cheerio";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const IMAGE_FILE = /\.(jpe?g|png|gif|webp|avif|svg)$/i;

const CATEGORY_PAGES: Record<string, string> = {
  "/category/messe-crewcatering/": "/perfektes-business-catering-fur-messen-und-crew-events-mit-cooking-and-more/",
  "/category/gala/": "/verleihen-sie-ihrem-gala-event-glanz-mit-dem-business-catering-von-cooking-and-more/",
  "/category/sommerfest/": "/feiern-sie-ihre-sommerfest-mit-dem-business-catering-von-cooking-and-more/",
  "/category/weihnachtsfeier/": "/feiern-sie-ihre-weihnachtsfeier-mit-dem-business-catering-von-cooking-and-more/",
  "/category/foodtrucks/": "/entdecken-sie-business-catering-streetfood/",
  "/category/streetfood/": "/streetfooentdecken-sie-business-catering-streetfood/",
  "/category/zur-gemutlichen-ekce/": "/zur-gemutlichen-ekce-2/",
  "/category/e-palladium/": "/e-palladium/",
  "/category/e-werk/": "/e-werk/",
  "/category/doc2/": "/doc2/",
  "/category/hochzeit/": "/hochzeitscaterig/",
  "/category/jubilaum/": "/junilaumscatering/",
  "/category/alte-giesserei/": "/alte-giesserei/",
  "/category/goldener-pflug/": "/goldenerpflug/",
  "/category/cooking/": "/",
  "/category/modern-fusion/": "/",
  "/category/uncategorized/": "/",
  "/zur-gemutlichen-ekce/": "/zur-gemutlichen-ekce-2/",
};

type IndexedImage = { href: string; size: number };

let imageIndex: Map<string, IndexedImage> | undefined;
let routeSet: Set<string> | undefined;
const cache = new Map<string, string>();

export type LinkRepairStats = {
  brokenImageLinks: number;
  uniqueBrokenImages: Set<string>;
  brokenPageLinks: number;
  uniqueBrokenPages: Set<string>;
  unresolved: string[];
};

export function createLinkRepairStats(): LinkRepairStats {
  return {
    brokenImageLinks: 0,
    uniqueBrokenImages: new Set(),
    brokenPageLinks: 0,
    uniqueBrokenPages: new Set(),
    unresolved: [],
  };
}

function routes() {
  if (routeSet) return routeSet;
  const pages = JSON.parse(fs.readFileSync(path.join(process.cwd(), "src/data/source-content.json"), "utf8")) as { route: string }[];
  routeSet = new Set(pages.map(page => page.route));
  return routeSet;
}

function imageKey(filename: string) {
  const base = path.posix.basename(filename.split(/[?#]/)[0])
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[_\s.]+/g, "-")
    .replace(/-+/g, "-");
  return base.replace(/-\d+x\d+-[a-f0-9]{8,12}$/, "").replace(/-scaled$/, "");
}

function images() {
  if (imageIndex) return imageIndex;
  imageIndex = new Map();
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }
      if (!IMAGE_FILE.test(entry.name)) continue;
      const key = imageKey(entry.name);
      const size = fs.statSync(full).size;
      const href = `/${path.relative(PUBLIC_DIR, full).split(path.sep).join("/")}`;
      const current = imageIndex.get(key);
      if (!current || size > current.size) imageIndex.set(key, { href, size });
    }
  };
  walk(PUBLIC_DIR);
  return imageIndex;
}

function localImage(reference: string) {
  return images().get(imageKey(reference))?.href;
}

function fileExists(urlPath: string) {
  const clean = urlPath.split(/[?#]/)[0];
  if (!clean.startsWith("/") || clean.includes("..")) return false;
  return fs.existsSync(path.join(PUBLIC_DIR, clean));
}

function routeExists(pathname: string) {
  if (pathname === "/") return true;
  const withSlash = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return routes().has(pathname) || routes().has(withSlash);
}

function pathnameOf(href: string) {
  const trimmed = href.trim();
  if (!trimmed || /^(javascript:|mailto:|tel:|#)/i.test(trimmed)) return null;
  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const url = new URL(trimmed);
      const owned = /(^|\.)cookingandmore\.de$/i.test(url.hostname) || /(^|\.)w2s\.d22\.mytemp\.website$/i.test(url.hostname);
      if (!owned) return null;
      return { pathname: url.pathname || "/", legacyHost: url.hostname.includes("mytemp.website") };
    } catch {
      return null;
    }
  }
  if (!trimmed.startsWith("/")) return null;
  return { pathname: trimmed.split(/[?#]/)[0], legacyHost: false };
}

function pageReplacement(pathname: string, legacyHost: boolean) {
  const mapped = CATEGORY_PAGES[pathname];
  if (mapped) return mapped;
  if (!legacyHost) return null;
  if (pathname === "/comtact" || pathname === "/comtact/") return "/kontakt/";
  if (pathname.startsWith("/wp-admin")) return "/";
  if (pathname === "/shop") return "/shop/";
  if (routeExists(pathname)) return pathname.endsWith("/") ? pathname : `${pathname}/`;
  return "/";
}

function remember(stats: LinkRepairStats | undefined, kind: "image" | "page", href: string) {
  if (!stats) return;
  if (kind === "image") {
    stats.brokenImageLinks += 1;
    stats.uniqueBrokenImages.add(href);
  } else {
    stats.brokenPageLinks += 1;
    stats.uniqueBrokenPages.add(href);
  }
}

export function repairContentHtml(html: string, stats?: LinkRepairStats) {
  if (!stats) {
    const cached = cache.get(html);
    if (cached) return cached;
  }
  const $ = cheerio.load(html, null, false);
  $("a[href]").each((_, element) => {
    const anchor = $(element);
    const href = anchor.attr("href")?.trim() ?? "";
    const parsed = pathnameOf(href);
    if (!parsed) return;
    const { pathname, legacyHost } = parsed;
    const classes = anchor.attr("class") ?? "";
    const imageLink = IMAGE_FILE.test(pathname)
      || pathname.includes("/wp-content/uploads/")
      || pathname.includes("/wp-includes/images/")
      || classes.includes("lightbox")
      || classes.includes("fancy-gallery");
    if (imageLink) {
      if (!legacyHost && fileExists(pathname)) {
        anchor.attr("data-lightbox", "1");
        return;
      }
      const displayed = anchor.find("img").attr("src")
        ?? anchor.closest(".one_fourth, .gallery-grid-item, .portfolio-item, figure").find("img").first().attr("src")
        ?? "";
      const replacement = localImage(pathname) ?? localImage(displayed) ?? (fileExists(displayed) ? displayed.split(/[?#]/)[0] : undefined);
      if (!replacement) {
        stats?.unresolved.push(href);
        return;
      }
      remember(stats, "image", href);
      anchor.attr("href", replacement);
      anchor.attr("data-lightbox", "1");
      return;
    }
    const replacement = pageReplacement(pathname, legacyHost);
    if (!replacement || replacement === href) return;
    remember(stats, "page", href);
    anchor.attr("href", replacement);
  });
  const repaired = $.html();
  if (!stats) cache.set(html, repaired);
  return repaired;
}
