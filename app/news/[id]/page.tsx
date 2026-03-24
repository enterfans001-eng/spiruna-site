import { notFound } from "next/navigation";
import { getNewsDetail, getNewsList } from "@/lib/microcms";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 60;

type Props = { params: Promise<{ id: string }> };

const categoryColors: Record<string, string> = {
  "お知らせ": "#3366ff",
  "イベント": "#cc00ff",
  "リリース": "#00cc88",
  "メディア": "#ff6600",
  "オーディション": "#ff0033",
};

function getColor(category?: string, accent?: string): string {
  if (accent) return accent;
  if (category && categoryColors[category]) return categoryColors[category];
  return "#ff0033";
}

export default async function NewsDetailPage({ params }: Props) {
  const { id } = await params;
  const news = await getNewsDetail(id);
  if (!news) notFound();

  const ac = getColor(news.category, news.accent);

  return (
    <>
      <Header />
      <main style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)", paddingTop: "6rem" }}>
        <div style={{ maxWidth: "48rem", margin: "0 auto", padding: "2rem 1.5rem 4rem" }}>
          {/* Back link */}
          <Link
            href="/news"
            style={{ fontSize: "0.8rem", color: "var(--text-muted)", textDecoration: "none", display: "inline-block", marginBottom: "2rem" }}
          >
            <span>←</span> NEWS一覧
          </Link>

          {/* Category + Date */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <span style={{
              padding: "0.25rem 0.6rem", background: `${ac}20`, color: ac,
              fontSize: "0.65rem", letterSpacing: "0.15em",
            }}>
              {news.category}
            </span>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "monospace" }}>
              {news.date}
            </span>
          </div>

          {/* Title */}
          <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 700, marginBottom: "2rem", lineHeight: 1.5 }}>
            {news.title}
          </h1>

          {/* Image */}
          {news.image?.url && (
            <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", marginBottom: "2rem", overflow: "hidden", borderRadius: "4px" }}>
              <Image src={news.image.url} alt={news.title} fill style={{ objectFit: "cover" }} />
            </div>
          )}

          {/* Body */}
          {news.body && (
            <div
              className="news-body"
              style={{ fontSize: "0.9rem", lineHeight: 2, color: "rgba(255,255,255,0.8)" }}
              dangerouslySetInnerHTML={{ __html: news.body }}
            />
          )}

          {/* Description fallback */}
          {!news.body && news.desc && (
            <p style={{ fontSize: "0.9rem", lineHeight: 2, color: "rgba(255,255,255,0.8)" }}>
              {news.desc}
            </p>
          )}

          {/* Back to list */}
          <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.1)", textAlign: "center" }}>
            <Link
              href="/news"
              style={{
                display: "inline-block", padding: "0.75rem 2rem",
                border: `1px solid ${ac}40`, color: ac,
                fontSize: "0.75rem", letterSpacing: "0.15em", textDecoration: "none",
              }}
            >
              ← NEWS一覧に戻る
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export async function generateStaticParams() {
  const news = await getNewsList();
  return news.map((n) => ({ id: n.slug || n.id }));
}
