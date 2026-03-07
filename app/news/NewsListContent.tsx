"use client";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { NewsItem } from "@/lib/microcms";

type Props = { newsItems: NewsItem[] };

export default function NewsListContent({ newsItems }: Props) {
  return (
    <>
      <Header />
      <main style={{ background: "var(--bg)", minHeight: "100vh", paddingTop: "8rem", paddingBottom: "5rem" }}>
        <div style={{ maxWidth: "48rem", margin: "0 auto", padding: "0 1.5rem" }}>
          <Link
            href="/"
            style={{
              display: "inline-block", fontSize: "0.75rem", color: "var(--text-muted)",
              textDecoration: "none", marginBottom: "2rem", transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            ← トップページに戻る
          </Link>

          <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: "var(--red)", marginBottom: "0.75rem" }}>
            NEWS
          </p>
          <h1 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, marginBottom: "3rem",
          }}>
            ニュース
          </h1>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {newsItems.map((item) => (
              <Link
                key={item.slug}
                href={`/news/${item.slug}`}
                style={{
                  display: "flex", gap: "1.25rem", alignItems: "center",
                  padding: "1.25rem", textDecoration: "none",
                  background: "var(--surface)", border: "1px solid var(--border)",
                  transition: "border-color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,0,51,0.3)";
                  e.currentTarget.style.background = "rgba(255,0,51,0.03)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.background = "var(--surface)";
                }}
              >
                {/* Image */}
                {item.image?.url && (
                  <div style={{
                    flexShrink: 0, width: 100, height: 70, overflow: "hidden",
                    background: `linear-gradient(135deg, ${item.accent}22, ${item.accent}08)`,
                  }}>
                    <img
                      src={item.image.url}
                      alt=""
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                )}

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>{item.date}</span>
                    <span style={{
                      fontSize: "0.6rem", padding: "0.15rem 0.5rem",
                      border: `1px solid ${item.accent}40`, color: item.accent,
                    }}>
                      {item.category}
                    </span>
                    {item.isNew && (
                      <span style={{
                        fontSize: "0.55rem", padding: "0.1rem 0.4rem",
                        background: "var(--red)", color: "#fff", fontWeight: 700,
                      }}>
                        NEW
                      </span>
                    )}
                  </div>
                  <p style={{
                    fontSize: "0.85rem", fontWeight: 600, color: "var(--text)",
                    marginBottom: "0.25rem",
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>
                    {item.title}
                  </p>
                  <p style={{
                    fontSize: "0.7rem", color: "var(--text-muted)",
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>
                    {item.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
