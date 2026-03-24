import { notFound } from "next/navigation";
import { getNewsDetail, getNewsList } from "@/lib/microcms";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import CopyButton from "./CopyButton";

export const revalidate = 60;
export const dynamicParams = true;

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

          {/* Share buttons */}
          <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: "var(--text-muted)", marginBottom: "1rem", textTransform: "uppercase" as const }}>
              SHARE
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "2rem" }}>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(news.title)}&url=${encodeURIComponent(`https://spiruna.jp/news/${id}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.5rem 1.25rem", background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.15)", color: "#fff",
                  fontSize: "0.7rem", letterSpacing: "0.1em", textDecoration: "none",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                X
              </a>
              <a
                href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(`https://spiruna.jp/news/${id}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.5rem 1.25rem", background: "rgba(6,199,85,0.1)",
                  border: "1px solid rgba(6,199,85,0.3)", color: "#06c755",
                  fontSize: "0.7rem", letterSpacing: "0.1em", textDecoration: "none",
                }}
              >
                LINE
              </a>
              <CopyButton url={`https://spiruna.jp/news/${id}`} />
            </div>

            {/* Back to list */}
            <div style={{ textAlign: "center" }}>
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
