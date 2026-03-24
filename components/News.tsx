"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { NewsItem } from "@/lib/microcms";

type Props = { newsItems: NewsItem[] };

const categoryColors: Record<string, string> = {
  "お知らせ": "#3366ff",
  "イベント": "#cc00ff",
  "リリース": "#00cc88",
  "メディア": "#ff6600",
  "オーディション": "#ff0033",
};

function getCategoryColor(category?: string, accent?: string): string {
  if (accent) return accent;
  if (category && categoryColors[category]) return categoryColors[category];
  return "#ff0033";
}

export default function News({ newsItems }: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal,.reveal-left,.reveal-right").forEach((el) => el.classList.add("visible"));
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="news" ref={sectionRef} className="relative overflow-hidden" style={{ background: "var(--bg)", padding: "6rem 0" }}>
      <style>{`
        .news-item { transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s; }
        .news-item:hover { border-color: rgba(255,0,51,0.4); transform: translateY(-3px); box-shadow: 0 12px 40px rgba(0,0,0,0.3); }
        .news-item:hover .news-arrow { opacity: 1; transform: translateX(0); }
        .news-item:hover .news-title { color: var(--red); }
        .news-arrow { opacity: 0; transform: translateX(-8px); transition: opacity 0.3s, transform 0.3s; }
        .news-title { transition: color 0.2s; }
        .news-thumb { position: relative; overflow: hidden; flex-shrink: 0; width: 7rem; height: 5rem; background: var(--surface); }
        .news-thumb img { transition: transform 0.4s; }
        .news-item:hover .news-thumb img { transform: scale(1.05); }
        @media (max-width: 640px) {
          .news-item { flex-direction: column !important; align-items: flex-start !important; gap: 0.75rem !important; padding: 1rem !important; }
          .news-date-col { width: auto !important; }
          .news-divider { display: none !important; }
          .news-arrow { display: none !important; }
          .news-thumb { width: 100% !important; height: 10rem !important; }
        }
      `}</style>

      <div className="absolute left-0 top-0 pointer-events-none" style={{
        width: 400, height: 500,
        background: "radial-gradient(ellipse at top left, rgba(255,0,51,0.05) 0%, transparent 65%)",
      }} />

      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "3.5rem" }}>
          <div>
            <p className="section-label reveal">Latest News</p>
            <h2 className="heading-serif reveal delay-1" style={{ fontSize: "clamp(2.5rem,5vw,4rem)" }}>ニュース</h2>
          </div>
          <Link href="/news" className="btn-ghost reveal delay-2" style={{ fontSize: "0.75rem" }}>
            全ニュースを見る →
          </Link>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {newsItems.map((item, i) => (
            <Link
              key={item.slug}
              href={`/news/${item.slug}`}
              className={`news-item card-cyber reveal delay-${(i % 3) + 1}`}
              style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "1.5rem", padding: "1.25rem 1.5rem" }}
            >
              {/* Thumbnail */}
              {item.image?.url && (
                <div className="news-thumb">
                  <Image src={item.image.url} alt={item.title} fill style={{ objectFit: "cover" }} sizes="(max-width: 640px) 100vw, 112px" />
                </div>
              )}

              {/* Date + category */}
              <div className="news-date-col" style={{ flexShrink: 0, width: "10rem" }}>
                <span style={{ fontSize: "0.75rem", fontFamily: "monospace", color: "var(--text-muted)", display: "block", marginBottom: "0.4rem" }}>
                  {item.date}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{
                    padding: "0.2rem 0.5rem",
                    background: `${getCategoryColor(item.category, item.accent)}20`,
                    color: getCategoryColor(item.category, item.accent),
                    fontSize: "0.6rem",
                    letterSpacing: "0.15em",
                  }}>
                    {item.category}
                  </span>
                  {i === 0 && (
                    <span style={{
                      padding: "0.15rem 0.4rem",
                      background: "var(--red)",
                      color: "#fff",
                      fontSize: "0.55rem",
                      letterSpacing: "0.1em",
                    }}>NEW</span>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className="news-divider" style={{ width: 1, alignSelf: "stretch", background: "rgba(255,0,51,0.12)", flexShrink: 0 }} />

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 className="news-title" style={{ fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.3rem", lineHeight: 1.5 }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "0.75rem", lineHeight: 1.6, color: "var(--text-muted)" }}>{item.desc}</p>
              </div>

              {/* Arrow */}
              <div className="news-arrow" style={{ flexShrink: 0, color: "var(--red)", fontSize: "0.875rem" }}>
                →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
