import { notFound } from "next/navigation";
import { getNewsList, getNewsDetail, getAdjacentNews } from "@/lib/microcms";
import NewsDetail from "@/components/NewsDetail";

export const revalidate = 60;

export default async function NewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getNewsDetail(slug);
  if (!item) notFound();

  const { prev, next } = await getAdjacentNews(slug);
  return <NewsDetail item={item} prev={prev} next={next} />;
}

export async function generateStaticParams() {
  const newsItems = await getNewsList();
  return newsItems.map((n) => ({ slug: n.slug }));
}
