import type { Metadata } from "next";
import { Playfair_Display, Space_Grotesk, Orbitron } from "next/font/google";
import CursorEffect from "@/components/CursorEffect";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-cyber",
  display: "swap",
});

const SITE_URL = "https://spiruna.jp";
const SITE_NAME = "Spiruna";
const SITE_TITLE = "Vクリエイター事務所Spiruna | TikTokV公認提携ライブ配信事務所";
const SITE_DESC =
  "Vクリエイター事務所Spirunaは、次世代バーチャルクリエイターの発掘・育成・マネジメントを行うTikTok公認提携エージェンシー(1次代理店)のVクリエイター事務所です。株式会社エンターファンズが運営。";

export const metadata: Metadata = {
  // ---------- 基本 ----------
  title: {
    default: SITE_TITLE,
    template: "%s | Spiruna",
  },
  description: SITE_DESC,
  metadataBase: new URL(SITE_URL),

  // ---------- OGP ----------
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESC,
    url: SITE_URL,
    locale: "ja_JP",
    images: [
      {
        url: "/ogp-spiruna.png",
        width: 1200,
        height: 630,
        alt: "Vクリエイター事務所Spiruna",
      },
    ],
  },

  // ---------- Twitter (X) ----------
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESC,
    images: ["/ogp-spiruna.png"],
  },

  // ---------- ファビコン ----------
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },

  // ---------- Google Search Console ----------
  verification: {
    google: "mUZFtyJsT_QwUvG98hZN9sP13e3tiFbLM1G0z3zCYZk",
  },

  // ---------- その他SEO ----------
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// ---------- JSON-LD 構造化データ ----------
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo-spiruna.png`,
  description: SITE_DESC,
  foundingDate: "2025",
  parentOrganization: {
    "@type": "Organization",
    name: "株式会社エンターファンズ",
  },
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${playfair.variable} ${spaceGrotesk.variable} ${orbitron.variable}`}>
      <head>
        <GoogleAnalytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <div className="scanline" />
        <CursorEffect />
        {children}
      </body>
    </html>
  );
}
