"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { NewsItem } from "@/lib/microcms";

type Props = {
  item: NewsItem;
  prev: NewsItem;
  next: NewsItem;
};

export default function NewsDetail({ item, prev, next }: Props) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)" }}>
      <style>{`
        .nd-nav-btn { transition: border-color 0.2s, color 0.2s, background 0.2s; }
        .nd-nav-btn:hover { border-color: var(--red) !important; color: var(--red) !important; background: rgba(255,0,51,0.06) !important; }
        .nd-back-link { transition: color 0.2s; }
        .nd-back-link:hover { color: var(--text) !important; }
        .nd-item { transition: transform 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.5s; }
        .nd-accent-line { transition: transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s; transform-origin: left; }
        .nd-adj-card { transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s; }
        .nd-adj-card:hover { border-color: rgba(255,0,51,0.4) !important; transform: translateY(-3px); box-shadow: 0 12px 40px rgba(0,0,0,0.3); }
        .nd-adj-card:hover .nd-adj-title { color: var(--red); }
        .nd-adj-title { transition: color 0.2s; }
      `}</style>

      {/* Header */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1rem 2rem",
        background: "rgba(6,6,8,0.85)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,0,51,0.12)",
      }}>
        <Link href="/#news" className="nd-back-link" style={{
          display: "flex", alignItems: "center", gap: "0.75rem",
          textDecoration: "none", color: "var(--text-muted)",
          fontSize: "0.75rem", letterSpacing: "0.15em",
        }}>
          <span style={{ fontSize: "1rem" }}>←</span> NEWS
        </Link>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Link href={`/news/${prev.slug}`} className="nd-nav-btn" style={{
            padding: "0.4rem 1rem", fontSize: "0.7rem", letterSpacing: "0.15em",
            border: "1px solid rgba(255,255,255,0.15)", color: "var(--text-muted)", textDecoration: "none",
          }}>← PREV</Link>
          <Link href={`/news/${next.slug}`} className="nd-nav-btn" style={{
            padding: "0.4rem 1rem", fontSize: "0.7rem", letterSpacing: "0.15em",
            border: "1px solid var(--red)", color: "var(--red)", textDecoration: "none",
          }}>NEXT →</Link>
        </div>
      </header>

      {/* Main content */}
      <div style={{ maxWidth: "48rem", margin: "0 auto", padding: "7rem 1.5rem 4rem" }}>

        {/* Category + Date */}
        <div className="nd-item" style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(20px)",
          transitionDelay: "0.1s",
          display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem",
        }}>
          <span style={{
            padding: "0.25rem 0.7rem",
            background: `${item.accent}20`,
            border: `1px solid ${item.accent}40`,
            color: item.accent,
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
          }}>
            {item.category}
          </span>
          {item.isNew && (
            <span style={{
              padding: "0.2rem 0.5rem",
              background: "var(--red)",
              color: "#fff",
              fontSize: "0.55rem",
              letterSpacing: "0.1em",
            }}>NEW</span>
          )}
          <span style={{ fontSize: "0.75rem", fontFamily: "monospace", color: "var(--text-muted)" }}>
            {item.date}
          </span>
        </div>

        {/* Title */}
        <div className="nd-item" style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(20px)",
          transitionDelay: "0.2s",
          marginBottom: "2rem",
        }}>
          <h1 style={{
            fontFamily: "var(--font-heading), serif",
            fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
            lineHeight: 1.5,
            fontWeight: 700,
          }}>
            {item.title}
          </h1>
        </div>

        {/* Main image */}
        {item.image?.url && (
          <div className="nd-item" style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "0.25s",
            marginBottom: "2.5rem",
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 9",
            overflow: "hidden",
            border: "1px solid var(--border)",
          }}>
            <Image src={item.image.url} alt={item.title} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 48rem" priority />
          </div>
        )}

        {/* Accent line */}
        <div className="nd-accent-line" style={{
          height: 2, marginBottom: "2.5rem",
          background: `linear-gradient(to right, ${item.accent}, ${item.accent}40, transparent)`,
          transform: loaded ? "scaleX(1)" : "scaleX(0)",
        }} />

        {/* Body */}
        <div className="nd-item" style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(20px)",
          transitionDelay: "0.4s",
          marginBottom: "4rem",
        }}>
          <div
            className="microcms-content"
            style={{ fontSize: "0.875rem", lineHeight: 2.2, color: "rgba(255,255,255,0.7)" }}
            dangerouslySetInnerHTML={{ __html: item.body }}
          />
        </div>

        {/* Share / Back */}
        <div className="nd-item" style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(20px)",
          transitionDelay: "0.5s",
          marginBottom: "4rem",
          display: "flex", justifyContent: "center",
        }}>
          <Link href="/#news" style={{
            display: "inline-block", padding: "0.7rem 2.5rem",
            border: "1px solid rgba(255,255,255,0.15)", color: "var(--text-muted)",
            fontSize: "0.75rem", letterSpacing: "0.2em", textDecoration: "none",
            transition: "border-color 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--red)"; e.currentTarget.style.color = "var(--red)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "var(--text-muted)"; }}
          >
            ← ニュース一覧に戻る
          </Link>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(255,0,51,0.1)", marginBottom: "2.5rem" }} />

        {/* Adjacent articles */}
        <div className="nd-item" style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(20px)",
          transitionDelay: "0.6s",
        }}>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: "var(--text-muted)", marginBottom: "1.25rem", textAlign: "center" }}>
            OTHER NEWS
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <Link href={`/news/${prev.slug}`} className="nd-adj-card" style={{
              display: "block", textDecoration: "none", padding: "1.25rem",
              background: "var(--surface)", border: "1px solid var(--border)",
            }}>
              <span style={{ fontSize: "0.6rem", letterSpacing: "0.15em", color: "var(--text-muted)", display: "block", marginBottom: "0.5rem" }}>
                ← PREV
              </span>
              <span style={{ fontSize: "0.65rem", fontFamily: "monospace", color: "var(--text-muted)", display: "block", marginBottom: "0.4rem" }}>
                {prev.date}
              </span>
              <span className="nd-adj-title" style={{ fontSize: "0.8rem", lineHeight: 1.5, color: "var(--text)" }}>
                {prev.title}
              </span>
            </Link>
            <Link href={`/news/${next.slug}`} className="nd-adj-card" style={{
              display: "block", textDecoration: "none", padding: "1.25rem",
              background: "var(--surface)", border: "1px solid var(--border)", textAlign: "right",
            }}>
              <span style={{ fontSize: "0.6rem", letterSpacing: "0.15em", color: "var(--text-muted)", display: "block", marginBottom: "0.5rem" }}>
                NEXT →
              </span>
              <span style={{ fontSize: "0.65rem", fontFamily: "monospace", color: "var(--text-muted)", display: "block", marginBottom: "0.4rem" }}>
                {next.date}
              </span>
              <span className="nd-adj-title" style={{ fontSize: "0.8rem", lineHeight: 1.5, color: "var(--text)" }}>
                {next.title}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
