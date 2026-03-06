import { notFound } from "next/navigation";
import { getTalentsList, getTalentBySlug } from "@/lib/microcms";
import TalentDetail from "@/components/TalentDetail";

export const revalidate = 60;

export default async function TalentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const talent = await getTalentBySlug(id);
  if (!talent) notFound();

  const allTalents = await getTalentsList();
  const idx = allTalents.findIndex((t) => t.slug === id);
  const len = allTalents.length;
  const prev = allTalents[(idx - 1 + len) % len];
  const next = allTalents[(idx + 1) % len];

  return <TalentDetail talent={talent} prev={prev} next={next} />;
}

export async function generateStaticParams() {
  const talents = await getTalentsList();
  return talents.map((t) => ({ id: t.slug }));
}
