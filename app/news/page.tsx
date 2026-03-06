import type { Metadata } from "next";
import NewsListContent from "./NewsListContent";

export const metadata: Metadata = {
  title: "NEWS | SPIRUNA",
  description: "SPIRUNA最新ニュース一覧。タレント情報、イベント、オーディション情報をお届けします。",
};

export default function NewsListPage() {
  return <NewsListContent />;
}
