import { talents } from "@/lib/talents-data";
import TalentsList from "@/components/TalentsList";

export const metadata = {
  title: "CREATORS | SPIRUNA",
  description: "SPIRUNA所属クリエイターの一覧ページ。",
};

export default function TalentsPage() {
  return <TalentsList talents={talents} />;
}
