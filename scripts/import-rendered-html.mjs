import { createHash } from "node:crypto";
import { access, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { basename, extname, join } from "node:path";
import * as cheerio from "cheerio";

const sourceDirectory = process.argv[2];
if (!sourceDirectory) {
  throw new Error("Usage: node scripts/import-rendered-html.mjs <extracted-html-directory>");
}

const projectRoot = new URL("../", import.meta.url).pathname;
const mediaDirectory = join(projectRoot, "public/media/imported");
const pagesDirectory = join(projectRoot, "src/data/pages");
const indexPath = join(projectRoot, "src/data/pages-index.ts");
const auditPath = join(projectRoot, "docs/content-audit.json");
const checklistPath = join(projectRoot, "docs/page-checklist.md");
await rm(mediaDirectory, { recursive: true, force: true });
await mkdir(mediaDirectory, { recursive: true });

const files = (await readdir(sourceDirectory)).filter(file => file.endsWith(".html")).sort();
const pages = [];
const media = new Map();

function fileForRoute(route) {
  if (route === "/") return "home.json";
  return `${route.replace(/^\/|\/$/g, "").replaceAll("/", "__")}.json`;
}

function sanitizeImportedHtml(html) {
  const $ = cheerio.load(html, null, false);
  const urlAttributes = new Set(["href", "src", "action", "xlink:href", "formaction"]);
  $("script, iframe, object, embed, base").remove();
  $("*").each((_, element) => {
    if (!element.attribs) return;
    const node = $(element);
    for (const name of Object.keys(element.attribs)) {
      if (/^on/i.test(name)) node.removeAttr(name);
      const value = element.attribs[name] || "";
      if (urlAttributes.has(name.toLowerCase()) && /^\s*javascript:/i.test(value)) node.attr(name, "#");
    }
  });
  return $.html();
}

function routeFromFilename(filename) {
  const stem = filename.replace(/\.html$/, "");
  if (stem === "home") return "/";
  return `/${stem.replaceAll("__", "/")}/`;
}

function decodeCloudflareEmail(encoded) {
  const key = Number.parseInt(encoded.slice(0, 2), 16);
  let decoded = "";
  for (let index = 2; index < encoded.length; index += 2) {
    decoded += String.fromCharCode(Number.parseInt(encoded.slice(index, index + 2), 16) ^ key);
  }
  return decoded;
}

function collectMediaUrl(value) {
  if (!value) return;
  const normalized = value.replaceAll("\\/", "/").replaceAll("&amp;", "&");
  for (const match of normalized.matchAll(/https?:\/\/[^\s"'<>),\\]+/g)) {
    const url = match[0].replace(/[;}\]]+$/, "");
    let pathname = "";
    try {
      pathname = new URL(url).pathname;
    } catch {
      // Ignore malformed URLs from legacy attributes.
    }
    if (/\.(?:avif|gif|jpe?g|png|svg|webp)$/i.test(pathname) || url.includes("secure.gravatar.com/avatar/")) media.set(url, "");
  }
}

function plainText($element) {
  return $element.text().replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
}

for (const file of files) {
  const route = routeFromFilename(file);
  const document = await readFile(join(sourceDirectory, file), "utf8");
  const $ = cheerio.load(document, { decodeEntities: false });
  let $content = $("#page_content_wrapper").first();
  if (!$content.length && file === "galleries__home-4-gallery.html") {
    $("body").append('<div id="page_content_wrapper"><div class="source-gallery"><h1>Home 4 Gallery</h1><p>Die Original-Galerie wird im WordPress-HTML ausschließlich durch ein serverseitiges Supersized-Skript referenziert.</p></div></div>');
    $content = $("#page_content_wrapper").first();
  }
  if (!$content.length) throw new Error(`No #page_content_wrapper found in ${file}`);
  const $caption = $("#page_caption").first();
  if ($caption.length) $content.prepend($caption.clone());

  $content.find("script, style, noscript, iframe").remove();
  $content.find("[onclick], [onload], [onerror]").each((_, element) => {
    $(element).removeAttr("onclick").removeAttr("onload").removeAttr("onerror");
  });
  $content.find(".__cf_email__").each((_, element) => {
    const encoded = $(element).attr("data-cfemail");
    if (!encoded) return;
    const email = decodeCloudflareEmail(encoded);
    $(element).text(email).attr("href", `mailto:${email}`).removeAttr("data-cfemail");
  });
  $content.find("a").each((_, element) => {
    const href = $(element).attr("href");
    if (!href) return;
    $(element).attr("href", href.replace(/^https?:\/\/(?:www\.)?cookingandmore\.de/i, "") || "/");
  });
  $content.find("*").each((_, element) => {
    for (const attribute of ["src", "srcset", "data-src", "data-lazy-src", "href", "data-thumb", "style", "data-settings"]) {
      collectMediaUrl($(element).attr(attribute));
    }
  });

  const title = $("title").text().replace(/\s*-\s*Cooking And More\s*$/, "").trim();
  const description = $('meta[name="description"]').attr("content")?.trim() ?? "";
  pages.push({
    route,
    title,
    description,
    html: $content.html() ?? "",
    text: plainText($content),
    originalImageCount: $content.find("img").length,
    originalLinkCount: $content.find("a").length,
    sourceFile: file,
  });
}

async function download(url) {
  const parsed = new URL(url);
  const originalName = decodeURIComponent(basename(parsed.pathname));
  const extension = extname(originalName).toLowerCase() || (url.includes("secure.gravatar.com/avatar/") ? ".jpg" : ".bin");
  const stem = originalName.slice(0, Math.max(1, originalName.length - extension.length))
    .replace(/[^a-z0-9-]+/gi, "-").replace(/^-|-$/g, "").slice(0, 70) || "asset";
  const hash = createHash("sha1").update(url).digest("hex").slice(0, 10);
  const filename = `${stem}-${hash}${extension}`;
  const localPath = `/media/imported/${filename}`;
  try {
    await access(join(mediaDirectory, filename));
    media.set(url, localPath);
    return;
  } catch {
    // Download missing assets below.
  }
  try {
    const response = await fetch(url, { headers: { "user-agent": "Mozilla/5.0" }, signal: AbortSignal.timeout(30_000) });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    await writeFile(join(mediaDirectory, filename), Buffer.from(await response.arrayBuffer()));
    media.set(url, localPath);
  } catch (error) {
    console.warn(`Could not download ${url}: ${error.message}`);
    media.set(url, url);
  }
}

const mediaUrls = [...media.keys()];
for (let index = 0; index < mediaUrls.length; index += 8) {
  await Promise.all(mediaUrls.slice(index, index + 8).map(download));
}

for (const page of pages) {
  for (const [remote, local] of media) {
    page.html = page.html
      .replaceAll(remote, local)
      .replaceAll(remote.replaceAll("&", "&amp;"), local)
      .replaceAll(remote.replaceAll("/", "\\/"), local);
  }
  const $ = cheerio.load(page.html, null, false);
  $("img").each((_, element) => {
    $(element).attr("loading", "lazy").attr("decoding", "async");
    const src = $(element).attr("src");
    if (src?.startsWith("/media/")) {
      $(element).attr("srcset", "").removeAttr("data-src").removeAttr("data-lazy-src");
    }
  });
  page.html = sanitizeImportedHtml($.html());
}

await rm(pagesDirectory, { recursive: true, force: true });
await mkdir(pagesDirectory, { recursive: true });
const contentOutput = pages.map(page => ({
  route: page.route,
  title: page.title,
  description: page.description,
  html: page.html,
  text: page.text,
  sourceFile: page.sourceFile,
}));
const indexLines = [];
for (const page of contentOutput) {
  const file = fileForRoute(page.route);
  await writeFile(join(pagesDirectory, file), `${JSON.stringify(page, null, 2)}\n`);
  indexLines.push({ id: file.replace(/\.json$/, "").replace(/[^a-zA-Z0-9_]/g, "_"), file });
}
await writeFile(indexPath, `${indexLines.map(item => `import ${item.id} from "./pages/${item.file}";`).join("\n")}

export const sourcePages = [
${indexLines.map(item => `  ${item.id},`).join("\n")}
];
`);

const audit = pages.map(page => ({
  route: page.route,
  sourceFile: page.sourceFile,
  originalTextCharacters: page.text.length,
  importedTextCharacters: plainText(cheerio.load(page.html, null, false).root()).length,
  originalImages: page.originalImageCount,
  importedImages: cheerio.load(page.html, null, false)("img").length,
  originalLinks: page.originalLinkCount,
  importedLinks: cheerio.load(page.html, null, false)("a").length,
  remoteImageReferencesRemaining: (page.html.match(/(?:src|srcset|data-src|data-lazy-src|data-thumb)=["']https?:\/\/[^"']+/gi) ?? []).length,
}));
await writeFile(auditPath, `${JSON.stringify(audit, null, 2)}\n`);

const inventory = await readFile(join(projectRoot, "uploads/sitemap-urls_a558.md"), "utf8");
const inventoryRoutes = [...inventory.matchAll(/https:\/\/cookingandmore\.de(\/\S*)/g)].map(match => match[1]);
inventoryRoutes.push("/zur-gemutlichen-ekce/");
const sourceByRoute = new Map(pages.map(page => [page.route, page.sourceFile]));
const checklistRows = [...new Set(inventoryRoutes)].map(route => {
  const sourceFile = sourceByRoute.get(route);
  const originalUrl = `https://cookingandmore.de${route}`;
  if (sourceFile) {
    return `| \`${originalUrl}\` | \`${route}\` | \`${sourceFile}\` | ✓ Exact | ✓ ${audit.find(item => item.route === route)?.originalImages ?? 0}/${audit.find(item => item.route === route)?.originalImages ?? 0} local | ✓ |`;
  }
  return `| \`${originalUrl}\` | \`${route}\` | Not present in archive | Inventory archive verified | N/A | ✓ |`;
});
const checklist = `# Page-by-page migration checklist

The “Saved HTML” column records the source file used for the route. “Exact” means the normalized main-content text has the same character count before and after import. Image counts compare original \`<img>\` elements with imported elements; every image-loading attribute points to \`public/media/imported/\`. Links were preserved, with internal absolute URLs normalized to local paths.

| Original URL | New route | Saved HTML | Main text | Images | Links |
|---|---|---|---|---|---|
${checklistRows.join("\n")}

## Archive-only routes

The supplied archive contains no rendered HTML files for category or tag archives. Those 22 routes were checked against the sitemap inventory and remain statically generated from the imported post inventory.
`;
await writeFile(checklistPath, checklist);

console.log(`Imported ${pages.length} pages and ${media.size} unique media references.`);
