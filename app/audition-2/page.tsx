import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import AuditionLP from "@/components/AuditionLP";
import { getTalentsList } from "@/lib/microcms";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "1期生大募集！！TikV事務所専門オーディション | Spiruna",
  description: "TikTok V専門事務所Spirunaがオーディション開催中！",
  openGraph: {
    title: "1期生大募集！！TikV事務所専門オーディション | Spiruna",
    description: "TikTok V専門事務所Spirunaがオーディション開催中！",
    url: "https://spiruna.jp/audition-2",
    images: [{ url: "https://spiruna.jp/lp-kv2.png", width: 1200, height: 1200 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "1期生大募集！！TikV事務所専門オーディション | Spiruna",
    description: "TikTok V専門事務所Spirunaがオーディション開催中！",
  },
};

export default async function Audition2Page() {
  const talents = await getTalentsList();

  return (
    <>
      {/* Meta Pixel Base Code */}
      <Script id="meta-pixel-2" strategy="afterInteractive">
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
      {/* X conversion tracking base code */}
      <Script id="x-pixel-2" strategy="afterInteractive">
        {`
          !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
          },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
          a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
          twq('config','rbrrj');
        `}
      </Script>
      <Header />
      <FloatingCTA />
      <main>
        <AuditionLP talents={talents} lineUrl="https://lin.ee/otetko2" />
      </main>
      <Footer />
    </>
  );
}
