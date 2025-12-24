import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/data/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const now = new Date();

  const articleEntries: MetadataRoute.Sitemap = getAllArticles().map((a) => ({
    url: `${baseUrl}/articles/${a.slug}`,
    lastModified: a.updatedAt ? new Date(a.updatedAt) : now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...articleEntries,
  ];
}


