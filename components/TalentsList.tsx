"use client";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Talent } from "@/lib/microcms";

type Props = { talents: Talent[] };
type SortKey = "default" | "name" | "nameEn" | "debut";

export default function TalentsList({ talents }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("default");

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    let result = talents;
    if (q) {
      result = talents.filter((t) =>
        t.name.toLowerCase().includes(q) ||
        t.nameEn.toLowerCase().includes(q) ||
        (t.tag || "").toLowerCase().includes(q) ||
        (t.talentId || "").toLowerCase().includes(q)
      );
    }
    if (sort === "name") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name, "ja"));
    } else if (sort === "nameEn") {
      result = [...result].sort((a, b) => a.nameEn.localeCompare(b.nameEn));
    } else if (sort === "debut") {
      result = [...result].sort((a, b) => (a.debutDate || "").localeCompare(b.debutDate || ""));
    }
    return result;
  }, [talents, search, sort]);

  return (
    <>
      <Header />
      <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)" }}>
      <style>{`
        .tl-card {
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s, border-color 0.3s;
          border: 1px solid rgba(255,255,255,0.06);
        }
        .tl-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
          border-color: rgba(255,0,51,0.3) !important;
        }
        .tl-card:hover .tl-name { color: var(--red); }
        .tl-card:hover .tl-img { transform: scale(1.05); }
        .tl-name { transition: color 0.3s; }
        .tl-img { transition: transform 0.5s cubic-bezier(0.16,1,0.3,1); }
        .tl-item { transition: transform 0.7s cubic-bezier(0.16,1,0.3,1), opacity 0.6s; }
        @media (max-width: 640px) {
          .tl-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 0.75rem !important; }
        }
        @media (min-width: 641px) and (max-width: 1024px) {
          .tl-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        .tl-search:focus { border-color: var(--red) !important; }
        .tl-search::placeholder { color: var(--text-muted); font-size: 0.8rem; }
        .tl-sort-btn { transition: background 0.2s, color 0.2s, border-color 0.2s; cursor: pointer; }
        .tl-sort-btn:hover { border-color: var(--red) !important; }
      `}</style>

      {/* Main */}
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "8rem 1.5rem 4rem" }}>

        {/* Back to top */}
        <div style={{
          marginBottom: "1.5rem",
          opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(10px)",
          transition: "opacity 0.6s, transform 0.6s",
        }}>
          <Link
            href="/#talents"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              fontSize: "0.75rem", letterSpacing: "0.15em",
              color: "var(--text-muted)", textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            <span>←</span> TOP
          </Link>
        </div>

        {/* Title */}
        <div style={{ marginBottom: "2rem", textAlign: "center" }}>
          <p style={{
            fontSize: "0.7rem", letterSpacing: "0.3em", color: "var(--red)",
            marginBottom: "0.75rem", textTransform: "uppercase" as const,
            opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(10px)",
            transition: "opacity 0.6s, transform 0.6s",
          }}>
            OUR CREATORS
          </p>
          <h1 style={{
            fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800,
            opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(15px)",
            transition: "opacity 0.6s 0.1s, transform 0.6s 0.1s",
          }}>
            CREATORS
          </h1>
          <p style={{
            fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "1rem",
            opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(10px)",
            transition: "opacity 0.6s 0.2s, transform 0.6s 0.2s",
          }}>
            Spirunaに所属するクリエイターをご紹介します。
          </p>
        </div>

        {/* Search & Sort */}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center",
          justifyContent: "space-between", marginBottom: "2rem",
          opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(10px)",
          transition: "opacity 0.6s 0.3s, transform 0.6s 0.3s",
        }}>
          <input
            className="tl-search"
            type="text"
            placeholder="名前・タグで検索..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: "1 1 200px", maxWidth: "320px",
              padding: "0.6rem 1rem",
              background: "var(--surface)", border: "1px solid var(--border)",
              color: "var(--text)", fontSize: "0.8rem",
              outline: "none", transition: "border-color 0.2s",
            }}
          />
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {([
              { key: "default", label: "デフォルト" },
              { key: "name", label: "名前順" },
              { key: "debut", label: "デビュー順" },
            ] as { key: SortKey; label: string }[]).map((s) => (
              <button
                key={s.key}
                className="tl-sort-btn"
                onClick={() => setSort(s.key)}
                style={{
                  padding: "0.45rem 1rem",
                  fontSize: "0.7rem", letterSpacing: "0.1em",
                  background: sort === s.key ? "var(--red)" : "transparent",
                  color: sort === s.key ? "#fff" : "var(--text-muted)",
                  border: sort === s.key ? "1px solid var(--red)" : "1px solid rgba(255,255,255,0.15)",
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Result count */}
        {search && (
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
            {filtered.length}件のクリエイターが見つかりました
          </p>
        )}

        {/* Grid */}
        <div className="tl-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem",
        }}>
          {filtered.map((t, i) => {
            const defaultColors = ["#ff0033", "#3366ff"];
            const ac = t.accent || defaultColors[i % 2];
            const grad = t.gradient || `linear-gradient(135deg, ${ac}18 0%, rgba(6,6,8,0.95) 100%)`;
            const tags = t.tag ? t.tag.split(" · ") : [];
            return (
            <Link
              key={t.slug}
              href={`/talents/${t.slug}`}
              className="tl-card tl-item"
              style={{
                textDecoration: "none", color: "inherit",
                borderRadius: "8px", overflow: "hidden",
                background: grad,
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(30px)",
                transitionDelay: `${0.1 + i * 0.08}s`,
              }}
            >
              {/* Image */}
              <div style={{
                position: "relative", paddingBottom: "120%", overflow: "hidden",
              }}>
                {(t.fullImg?.url || t.fullImgs?.[0]?.url) && (
                <img
                  src={(t.fullImg?.url || t.fullImgs?.[0]?.url)!}
                  alt={t.name}
                  className="tl-img"
                  style={{
                    position: "absolute", bottom: 0, left: "50%",
                    transform: "translateX(-50%)", height: "90%",
                    objectFit: "contain", objectPosition: "bottom center",
                  }}
                />
                )}
              </div>

              {/* Info */}
              <div style={{
                padding: "1.25rem", textAlign: "center",
                background: "rgba(6,6,8,0.6)",
                borderTop: `1px solid ${ac}22`,
              }}>
                <h3 className="tl-name" style={{
                  fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.25rem",
                }}>
                  {t.name}
                </h3>
                <p style={{
                  fontSize: "0.65rem", letterSpacing: "0.15em",
                  color: "var(--text-muted)", marginBottom: tags.length > 0 ? "0.75rem" : 0,
                }}>
                  {t.nameEn}
                </p>
                {tags.length > 0 && (
                <div style={{ display: "flex", gap: "0.4rem", justifyContent: "center", flexWrap: "wrap" }}>
                  {tags.map((tag) => (
                    <span key={tag} style={{
                      fontSize: "0.6rem", padding: "0.2rem 0.6rem",
                      border: `1px solid ${ac}40`, borderRadius: "2px",
                      color: ac, letterSpacing: "0.05em",
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
                )}
              </div>
            </Link>
            );
          })}
        </div>

        {/* No results */}
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
              該当するクリエイターが見つかりませんでした
            </p>
          </div>
        )}

      </div>
      </div>
      <Footer />
    </>
  );
}
