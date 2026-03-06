import type { Metadata } from "next";
import { getNewsList } from "@/lib/microcms";
import NewsListContent from "./NewsListContent";

export const metadata: Metadata = {
  title: "NEWS | SPIRUNA",
  description: "SPIRUNA最新ニュース一覧。タレント情報、イベント、オーディション情報をお届けします。",
};

export const revalidate = 60;

export default async function NewsListPage() {
  const newsItems = await getNewsList();
  return <NewsListContent newsItems={newsItems} />;
}
