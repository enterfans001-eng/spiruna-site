import type { Metadata } from "next";
import { getPage } from "@/lib/microcms";
import GuidelinesContent from "./GuidelinesContent";

export const metadata: Metadata = {
  title: "二次創作ガイドライン | SPIRUNA",
  description: "Vクリエイター事務所スピルナの二次創作ガイドライン。全般ガイドライン、切り抜き動画、応援広告、音楽利用に関するガイドラインを掲載しています。",
};

export const revalidate = 60;

export default async function GuidelinesPage() {
  const page = await getPage("guidelines");
  return <GuidelinesContent page={page} />;
}
