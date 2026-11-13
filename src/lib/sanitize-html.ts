import * as cheerio from "cheerio";

const URL_ATTRIBUTES = new Set(["href", "src", "action", "xlink:href", "formaction"]);

export function sanitizeImportedHtml(html: string) {
  const $ = cheerio.load(html, null, false);
  $("script, iframe, object, embed, base").remove();
  $("*").each((_, element) => {
    if (!("attribs" in element)) return;
    const node = $(element);
    for (const name of Object.keys(element.attribs)) {
      if (/^on/i.test(name)) node.removeAttr(name);
      const value = element.attribs[name] ?? "";
      if (URL_ATTRIBUTES.has(name.toLowerCase()) && /^\s*javascript:/i.test(value)) node.attr(name, "#");
    }
  });
  return $.html();
}
