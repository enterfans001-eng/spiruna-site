export type NewsItem = {
  slug: string;
  date: string;
  category: string;
  title: string;
  desc: string;
  accent: string;
  isNew: boolean;
  body: string;
  image?: string;
};

export const newsItems: NewsItem[] = [
  {
    slug: "yume-tiktok-120k",
    date: "2025.03.01",
    category: "Talent",
    title: "星奈ゆめ、TikTokフォロワー12万人突破のお知らせ",
    desc: "デビューから1年4ヶ月で達成。今後の活動についてのコメントも公開。",
    accent: "#ff0033",
    isNew: true,
    image: "/news/yume-tiktok-120k.svg",
    body: `SPIRUNAに所属するVTuber「星奈ゆめ」のTikTokアカウントが、フォロワー12万人を突破いたしました。

デビューから1年4ヶ月でのこの達成は、日頃より応援してくださるファンの皆さまのおかげです。心より感謝申し上げます。

星奈ゆめ本人からのコメント：
「みなさんの応援があったから、ここまで来れました！これからもたくさんの動画をお届けしていきます。次の目標は20万人！一緒に駆け抜けましょう！」

今後もSPIRUNAは、星奈ゆめの活動を全力でサポートしてまいります。引き続きの応援をよろしくお願いいたします。`,
  },
  {
    slug: "spring-audition-2025",
    date: "2025.02.18",
    category: "Audition",
    title: "2025年春期オーディション開催決定",
    desc: "VTuber・クリエイタートラックを含む春期オーディションの詳細を発表。3月31日締切。",
    accent: "#cc00ff",
    isNew: true,
    image: "/news/spring-audition-2025.svg",
    body: `SPIRUNAでは、2025年春期オーディションの開催が決定いたしました。

■ 募集トラック
【VTuber Track】
歌・ゲーム・雑談・ASMR——ジャンルを問わず、TikTokで輝きたいすべての方を募集します。
応募条件：15歳以上／配信意欲のある方／週3本以上の投稿が可能な方

【Creator Track】
動画編集・イラスト・3Dモデリング・マーケティングなど、V文化を裏から支えるスタッフを募集します。
応募条件：18歳以上／ポートフォリオ提出可能な方

■ スケジュール
エントリー締切：2025年3月31日
書類選考結果通知：応募から1週間以内
面接：オンラインにて実施
結果発表：4月下旬予定

たくさんのご応募をお待ちしております。`,
  },
  {
    slug: "spiruna-night-collab",
    date: "2025.02.05",
    category: "Event",
    title: "蒼月リン × 翠川ハル コラボ配信「SPIRUNAナイト」開催決定",
    desc: "SPIRUNA初の大型コラボイベントを3月15日に実施。TikTokライブ配信予定。",
    accent: "#ff6600",
    isNew: false,
    image: "/news/spiruna-night-collab.svg",
    body: `SPIRUNA所属タレントによる初の大型コラボイベント「SPIRUNAナイト」の開催が決定いたしました。

■ イベント概要
イベント名：SPIRUNAナイト vol.1
出演：蒼月リン × 翠川ハル
日時：2025年3月15日（土）20:00〜
配信プラットフォーム：TikTok LIVE

■ 内容
・トークコーナー
・ゲーム対決
・視聴者参加型企画
・サプライズゲスト（？）

SPIRUNAのタレントが一堂に会する特別な夜をお届けします。ぜひリアルタイムでご視聴ください！`,
  },
  {
    slug: "site-renewal",
    date: "2025.01.20",
    category: "Agency",
    title: "SPIRUNA公式サイトリニューアルのお知らせ",
    desc: "よりタレントの魅力を伝えるため、公式サイトを全面リニューアルしました。",
    accent: "#00ccff",
    isNew: false,
    image: "/news/site-renewal.svg",
    body: `いつもSPIRUNAを応援いただき、ありがとうございます。

この度、SPIRUNA公式サイトを全面リニューアルいたしました。

■ 主な変更点
・デザインを一新し、よりタレントの魅力が伝わるビジュアルに
・タレント個別ページの充実
・モバイル対応の強化
・ニュースセクションの追加

今後も定期的にコンテンツを更新してまいります。ブックマークへの登録をお願いいたします。

ご意見・ご要望がございましたら、お問い合わせフォームよりお気軽にご連絡ください。`,
  },
  {
    slug: "nana-asmr-series",
    date: "2025.01.08",
    category: "Talent",
    title: "紅葉ナナ、新シリーズ「深夜ASMRアーカイブ」スタート",
    desc: "毎週金曜深夜のASMR配信が定例化。TikTok・YouTubeの両方で配信予定。",
    accent: "#ff0033",
    isNew: false,
    image: "/news/nana-asmr-series.svg",
    body: `SPIRUNA所属の紅葉ナナが、新たな定例配信シリーズ「深夜ASMRアーカイブ」をスタートいたします。

■ 配信概要
シリーズ名：深夜ASMRアーカイブ
配信者：紅葉ナナ
配信日：毎週金曜日 23:00〜
プラットフォーム：TikTok / YouTube（同時配信）

■ 内容
・囁きASMR
・環境音ASMR
・ロールプレイASMR
・リクエスト回（月1回）

紅葉ナナからのコメント：
「金曜の夜、みなさんがリラックスして眠れるようなASMRをお届けします。一緒にゆっくり過ごしましょう。」

初回配信は1月10日（金）23:00〜を予定しております。ぜひご視聴ください。`,
  },
];

export function getNewsItem(slug: string): NewsItem | undefined {
  return newsItems.find((n) => n.slug === slug);
}

export function getAdjacentNews(slug: string): { prev: NewsItem; next: NewsItem } {
  const idx = newsItems.findIndex((n) => n.slug === slug);
  const len = newsItems.length;
  return {
    prev: newsItems[(idx - 1 + len) % len],
    next: newsItems[(idx + 1) % len],
  };
}
