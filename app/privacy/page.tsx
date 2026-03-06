import type { Metadata } from "next";
import PrivacyContent from "./PrivacyContent";

export const metadata: Metadata = {
  title: "プライバシーポリシー | SPIRUNA",
  description: "Vクリエイター事務所スピルナのプライバシーポリシー・コンプライアンスに関するページです。",
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
