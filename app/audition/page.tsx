import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import AuditionLP from "@/components/AuditionLP";
import { getTalentsList } from "@/lib/microcms";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "オーディション | Spiruna — TikTok V Creator Agency",
  description:
    "Spirunaでは新たなバーチャルクリエイターを募集中。TikTok特化の支援体制で、あなたの才能を最大限に活かします。経験不問、今すぐエントリー。",
  openGraph: {
    title: "オーディション | Spiruna",
    description:
      "TikTok V専門事務所Spirunaがオーディション開催中。キャラデザ提供・収益化サポート・コンテンツ戦略で全面バックアップ。",
    url: "https://spiruna.jp/audition",
    images: [{ url: "https://spiruna.jp/audition-hero.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "オーディション | Spiruna",
    description: "TikTok V専門事務所Spirunaがオーディション開催中。",
  },
};

export default async function AuditionPage() {
  const talents = await getTalentsList();

  return (
    <>
      {/* Meta Pixel Base Code */}
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1206955967737546');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=1206955967737546&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
      <Header />
      <FloatingCTA href="https://lin.ee/Xj5yngP" external />
      <main>
        <AuditionLP talents={talents} />
      </main>
      <Footer />
    </>
  );
}
