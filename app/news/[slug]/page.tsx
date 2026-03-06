import { notFound } from "next/navigation";
import { newsItems, getNewsItem, getAdjacentNews } from "@/lib/news-data";
import NewsDetail from "@/components/NewsDetail";

export default async function NewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getNewsItem(slug);
  if (!item) notFound();

  const { prev, next } = getAdjacentNews(slug);

  return <NewsDetail item={item} prev={prev} next={next} />;
}

export function generateStaticParams() {
  return newsItems.map((n) => ({ slug: n.slug }));
}
