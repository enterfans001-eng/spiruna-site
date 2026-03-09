import { createClient } from "microcms-js-sdk";
import type { MicroCMSListContent } from "microcms-js-sdk";

// ---------- Client ----------
let _client: ReturnType<typeof createClient> | null = null;

function getClient() {
  if (_client) return _client;
  const domain = process.env.MICROCMS_SERVICE_DOMAIN;
  const key = process.env.MICROCMS_API_KEY;
  if (!domain || !key) return null;
  _client = createClient({ serviceDomain: domain, apiKey: key });
  return _client;
}

// ---------- Types ----------

/** microCMS 画像フィールドの型 */
export type MicroCMSImage = {
  url: string;
  width?: number;
  height?: number;
};

export type NewsItem = {
  title: string;
  slug: string;
  date: string;
  category: string;
  desc: string;
  accent: string;
  isNew: boolean;
  body: string;
  image?: MicroCMSImage;
} & MicroCMSListContent;

export type Talent = {
  talentId?: string;
  slug?: string;
  name: string;
  nameEn: string;
  accent?: string;
  gradient?: string;
  tag?: string;
  bio?: string;
  fullImg?: MicroCMSImage;
  sdImg?: MicroCMSImage;
  birthday?: string;
  debutDate?: string;
  generation?: string;
  intro?: string;
  youtubeVideoId?: string;
  twitter?: string;
  youtube?: string;
  tiktok?: string;
  tiktokFollowers?: number;
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
    const c = getClient();
    if (!c) return [];
    const data = await c.getList<NewsItem>({
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
    const c = getClient();
    if (!c) return null;
    const data = await c.getList<NewsItem>({
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

/** slug/talentId が未設定のタレントにフォールバック値を付与 */
function normalizeTalent(t: Talent): Talent {
  return {
    ...t,
    slug: t.slug || t.id,
    talentId: t.talentId || t.id,
  };
}

export async function getTalentsList() {
  try {
    const c = getClient();
    if (!c) return [];
    const data = await c.getList<Talent>({
      endpoint: "talent",
      queries: {
        limit: 100,
      },
    });
    return data.contents.map(normalizeTalent);
  } catch {
    return [];
  }
}

export async function getTalentBySlug(slug: string) {
  try {
    const c = getClient();
    if (!c) return null;

    // まず slug フィールドで検索
    const data = await c.getList<Talent>({
      endpoint: "talent",
      queries: {
        filters: `slug[equals]${slug}`,
        limit: 1,
      },
    });
    if (data.contents[0]) return normalizeTalent(data.contents[0]);

    // slug 未設定の場合、microCMS の id で直接取得
    try {
      const item = await c.get<Talent>({ endpoint: "talent", contentId: slug });
      return normalizeTalent(item);
    } catch {
      return null;
    }
  } catch {
    return null;
  }
}

// ---------- Pages ----------

export async function getPage(slug: string) {
  try {
    const c = getClient();
    if (!c) return null;
    const data = await c.getList<Page>({
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
