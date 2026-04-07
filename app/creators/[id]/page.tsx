import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTalentsList, getTalentBySlug } from "@/lib/microcms";
import TalentDetail from "@/components/TalentDetail";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const talent = await getTalentBySlug(id);
  if (!talent) return {};

  const name = talent.name;
  const nameEn = talent.nameEn;
  const title = `${name}（${nameEn}）| Vクリエイター事務所Spiruna`;
  const description = talent.bio
    ? `${talent.bio.slice(0, 120)}`
    : `${name}のプロフィール。Spiruna所属のバーチャルクリエイター。`;
  const ogImage = talent.fullImgs?.[0]?.url || talent.fullImg?.url || talent.sdImg?.url;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://spiruna.jp/creators/${talent.slug}`,
      ...(ogImage ? { images: [{ url: ogImage, width: 800, height: 1200 }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function TalentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const talent = await getTalentBySlug(id);
  if (!talent) notFound();

  const allTalents = await getTalentsList();
  const idx = allTalents.findIndex((t) => t.slug === id);
  const len = allTalents.length;
  const prev = allTalents[(idx - 1 + len) % len];
  const next = allTalents[(idx + 1) % len];

  return <TalentDetail talent={talent} prev={prev} next={next} index={idx} />;
}

export async function generateStaticParams() {
  const talents = await getTalentsList();
  return talents.filter((t) => t.slug).map((t) => ({ id: t.slug }));
}
