import { SourceContent } from "@/components/source-content";
import { getSourcePage } from "@/data/source";
import { repairContentHtml } from "@/lib/repair-content-links";
import { readTurnstileSiteKey } from "@/lib/turnstile";

export default function Home() {
  const page = getSourcePage("/");
  if (!page) throw new Error("The imported homepage content is missing.");
  return <SourceContent page={{ ...page, html: repairContentHtml(page.html) }} turnstileSiteKey={readTurnstileSiteKey()} />;
}
