import type { Metadata } from "next";
import { Playfair_Display, Space_Grotesk, Orbitron } from "next/font/google";
import CursorEffect from "@/components/CursorEffect";
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

export const metadata: Metadata = {
  title: "SPIRUNA | TikTok V Virtual Agency",
  description: "次世代バーチャルタレントの発掘・育成・マネジメントを行うTikTok V事務所 SPIRUNA。",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${playfair.variable} ${spaceGrotesk.variable} ${orbitron.variable}`}>
      <body className="antialiased">
        <div className="scanline" />
        <CursorEffect />
        {children}
      </body>
    </html>
  );
}
