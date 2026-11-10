import * as cheerio from "cheerio";
import pages from "../src/data/source-content.json" with { type: "json" };

const baseUrl = process.argv[2] ?? "http://127.0.0.1:43721";
const normalize = value => value.replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
const failures = [];

for (const page of pages) {
  const response = await fetch(new URL(page.route, baseUrl), { redirect: "follow" });
  if (!response.ok) {
    failures.push(`${page.route}: HTTP ${response.status}`);
    continue;
  }
  const $ = cheerio.load(await response.text());
  const renderedText = normalize($(".source-content").text());
  if (renderedText !== page.text) {
    failures.push(`${page.route}: main text differs (${renderedText.length} vs ${page.text.length} characters)`);
  }
  const remoteImages = $(".source-content img").filter((_, element) => /^https?:\/\//.test($(element).attr("src") ?? ""));
  if (remoteImages.length) failures.push(`${page.route}: ${remoteImages.length} remotely loaded images`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`Verified ${pages.length}/${pages.length} archived routes: exact main text and local image sources.`);
