import { SourceContent } from "@/components/source-content";
import { getSourcePage } from "@/data/source";

export default function Home() {
  const page = getSourcePage("/");
  if (!page) throw new Error("The imported homepage content is missing.");
  return <SourceContent page={page} />;
}
