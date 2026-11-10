import type { MetadataRoute } from "next";
import { allPages } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://cookingandmore.de";
  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    ...allPages.map(page => ({
      url: `${base}${page.path}`,
      changeFrequency: (page.kind === "post" ? "monthly" : "yearly") as "monthly" | "yearly",
      priority: page.kind === "company" ? 0.8 : 0.5,
    })),
  ];
}
