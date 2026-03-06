import { createClient } from "microcms-js-sdk";
import type { MicroCMSListContent } from "microcms-js-sdk";

// ---------- Client ----------
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICROCMS_API_KEY!,
});

// ---------- Types ----------

export type NewsItem = {
  title: string;
  slug: string;
  date: string;
  category: string;
  desc: string;
  accent: string;
  isNew: boolean;
  body: string;
  image?: string;
} & MicroCMSListContent;

export type Talent = {
  talentId: string;
  slug: string;
  name: string;
  nameEn: string;
  accent: string;
  gradient: string;
  tag: string;
  bio: string;
  fullImg: string;
  sdImg: string;
  birthday?: string;
  debutDate?: string;
  generation?: string;
  intro?: string;
  youtubeVideoId?: string;
  twitter?: string;
  youtube?: string;
  tiktok?: string;
} & MicroCMSListContent;

export type Page = {
  slug: string;
  title: string;
  titleEn: string;
  body: string;
} & MicroCMSListContent;

// ---------- Helpers ----------

function formatDate(iso: string): string {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

function formatNews(items: NewsItem[]): NewsItem[] {
  return items.map((item) => ({
    ...item,
    date: item.date?.includes("T") ? formatDate(item.date) : item.date,
  }));
}

// ---------- News ----------

export async function getNewsList() {
  try {
    const data = await client.getList<NewsItem>({
      endpoint: "news",
      queries: {
        orders: "-date",
        limit: 100,
      },
    });
    return formatNews(data.contents);
  } catch {
    return [];
  }
}

export async function getNewsDetail(slug: string) {
  try {
    const data = await client.getList<NewsItem>({
      endpoint: "news",
      queries: {
        filters: `slug[equals]${slug}`,
        limit: 1,
      },
    });
    const item = data.contents[0] ?? null;
    return item ? formatNews([item])[0] : null;
  } catch {
    return null;
  }
}

export async function getAdjacentNews(slug: string) {
  const all = await getNewsList();
  const idx = all.findIndex((n) => n.slug === slug);
  const len = all.length;
  return {
    prev: all[(idx - 1 + len) % len],
    next: all[(idx + 1) % len],
  };
}

// ---------- Talents ----------

export async function getTalentsList() {
  try {
    const data = await client.getList<Talent>({
      endpoint: "talent",
      queries: {
        limit: 100,
      },
    });
    return data.contents;
  } catch {
    return [];
  }
}

export async function getTalentBySlug(slug: string) {
  try {
    const data = await client.getList<Talent>({
      endpoint: "talent",
      queries: {
        filters: `slug[equals]${slug}`,
        limit: 1,
      },
    });
    return data.contents[0] ?? null;
  } catch {
    return null;
  }
}

// ---------- Pages ----------

export async function getPage(slug: string) {
  try {
    const data = await client.getList<Page>({
      endpoint: "pages",
      queries: {
        filters: `slug[equals]${slug}`,
        limit: 1,
      },
    });
    return data.contents[0] ?? null;
  } catch {
    return null;
  }
}
