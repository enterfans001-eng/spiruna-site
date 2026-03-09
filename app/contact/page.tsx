import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "お問い合わせ | Spiruna",
  description: "Spirunaへのお問い合わせ。法人・個人のお問い合わせフォームをご利用ください。",
};

export default function ContactPage() {
  return <ContactContent />;
}
