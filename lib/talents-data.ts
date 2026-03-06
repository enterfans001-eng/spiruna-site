export type Talent = {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  accent: string;
  gradient: string;
  tag: string;
  bio: string;
  fullImg: string;
  sdImg: string;
  birthday?: string;
  debutDate?: string;
  generation?: string;
  intro?: string;
  youtubeVideoId?: string;
  twitter?: string;
  youtube?: string;
  tiktok?: string;
};

export const talents: Talent[] = [
  {
    id: "LNR",
    slug: "linear",
    name: "リニア",
    nameEn: "LINEAR",
    accent: "#00f0ff",
    gradient: "linear-gradient(145deg, #060618 0%, #0a0020 100%)",
    tag: "Illustration · Creative · Design",
    bio: "二つの顔を持つクリエイティブの化身。ペンを握れば世界が色づく——SPIRUNAの公式キャラクター。白銀の髪に宿る青い光は、無限の創造性と可能性を象徴する。",
    fullImg: "/talent1-full.png",
    sdImg: "/talent1-sd.png",
    birthday: "1月15日",
    debutDate: "2025年2月1日",
    generation: "1期生",
    intro: "はじめまして、リニアです！絵を描くことが大好きで、みんなの心に残るようなイラストやデザインを届けたいと思っています。TikTokではクリエイティブな日常や制作過程をお見せしていきます。一緒に楽しい時間を過ごしましょう！",
    twitter: "https://twitter.com",
    youtube: "https://youtube.com",
    tiktok: "https://tiktok.com",
  },
  {
    id: "LNR-B",
    slug: "linear-alter",
    name: "リニア",
    nameEn: "LINEAR — ALTER",
    accent: "#ff0033",
    gradient: "linear-gradient(145deg, #180008 0%, #0a0012 100%)",
    tag: "Gaming · Music · Variety",
    bio: "もう一人のリニア。黒髪に宿る情熱と、青い閃光のような歌声で魅せるパフォーマー。ゲーム・音楽・バラエティ——あらゆるフィールドで才能を発揮する。",
    fullImg: "/talent2-full.png",
    sdImg: "/talent2-sd.png",
    birthday: "7月7日",
    debutDate: "2025年2月1日",
    generation: "1期生",
    intro: "リニアのもう一つの姿、ALTER（オルター）です。ゲーム実況や歌ってみた、雑談配信など幅広くやっていきます。熱い勝負と心に響く歌声で、みんなを楽しませたい。よろしくお願いします！",
    twitter: "https://twitter.com",
    youtube: "https://youtube.com",
    tiktok: "https://tiktok.com",
  },
  {
    id: "ZZ154",
    slug: "seraph",
    name: "セラフ",
    nameEn: "SERAPH",
    accent: "#cc0033",
    gradient: "linear-gradient(145deg, #1a0008 0%, #0a0004 100%)",
    tag: "Singing · Performance · Dark",
    bio: "堕天の翼を纏いし反逆者。赤と黒に染まった姿は、自由を求める魂の象徴。圧倒的な歌唱力とカリスマで、見る者すべてを魅了する。",
    fullImg: "/talent3-full.png",
    sdImg: "/talent3-sd.png",
    birthday: "10月31日",
    debutDate: "2025年3月1日",
    generation: "1期生",
    intro: "セラフです。歌うことが何よりも好き。ダークでかっこいいパフォーマンスを通じて、みんなの心を揺さぶりたい。一緒に最高のステージを作りましょう。",
    twitter: "https://twitter.com",
    youtube: "https://youtube.com",
    tiktok: "https://tiktok.com",
  },
];

export function getTalentBySlug(slug: string): Talent | undefined {
  return talents.find((t) => t.slug === slug);
}

export function getTalentIndex(slug: string): number {
  return talents.findIndex((t) => t.slug === slug);
}
