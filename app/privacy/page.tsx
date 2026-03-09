import type { Metadata } from "next";
import { getPage } from "@/lib/microcms";
import PrivacyContent from "./PrivacyContent";

export const metadata: Metadata = {
  title: "プライバシーポリシー | Spiruna",
  description: "Vクリエイター事務所スピルナのプライバシーポリシー・コンプライアンスに関するページです。",
};

export const revalidate = 60;

export default async function PrivacyPage() {
  const page = await getPage("privacy");
  return <PrivacyContent page={page} />;
}
