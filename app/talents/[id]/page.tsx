import { notFound } from "next/navigation";
import { talents, getTalentBySlug, getTalentIndex } from "@/lib/talents-data";
import TalentDetail from "@/components/TalentDetail";

export default async function TalentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const talent = getTalentBySlug(id);
  if (!talent) notFound();

  const idx = getTalentIndex(id);
  const prev = talents[(idx - 1 + talents.length) % talents.length];
  const next = talents[(idx + 1) % talents.length];

  return <TalentDetail talent={talent} prev={prev} next={next} />;
}

export function generateStaticParams() {
  return talents.map((t) => ({ id: t.slug }));
}
