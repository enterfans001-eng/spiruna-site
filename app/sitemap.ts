import type { MetadataRoute } from "next";
import { getNewsList, getTalentsList } from "@/lib/microcms";

const BASE = "https://spiruna.jp";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 固定ページ
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/news`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/talents`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/guidelines`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/privacy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
  ];

  // 動的ページ: ニュース
  const news = await getNewsList();
  const newsPages: MetadataRoute.Sitemap = news.map((item) => ({
    url: `${BASE}/news/${item.slug}`,
    lastModified: item.updatedAt ? new Date(item.updatedAt) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // 動的ページ: タレント
  const talents = await getTalentsList();
  const talentPages: MetadataRoute.Sitemap = talents.map((t) => ({
    url: `${BASE}/talents/${t.slug}`,
    lastModified: t.updatedAt ? new Date(t.updatedAt) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...newsPages, ...talentPages];
}
