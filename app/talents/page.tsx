import { getTalentsList } from "@/lib/microcms";
import TalentsList from "@/components/TalentsList";

export const metadata = {
  title: "CREATORS | Spiruna",
  description: "Spiruna所属クリエイターの一覧ページ。",
};

export const revalidate = 60;

export default async function TalentsPage() {
  const talents = await getTalentsList();
  return <TalentsList talents={talents} />;
}
