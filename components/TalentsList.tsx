"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { Talent } from "@/lib/talents-data";

type Props = { talents: Talent[] };

export default function TalentsList({ talents }: Props) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
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
          .tl-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 641px) and (max-width: 1024px) {
          .tl-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      {/* Header */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1rem 2rem",
        background: "rgba(6,6,8,0.85)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,0,51,0.12)",
      }}>
        <Link href="/#talents" style={{
          display: "flex", alignItems: "center", gap: "0.75rem",
          textDecoration: "none", color: "var(--text-muted)",
          fontSize: "0.75rem", letterSpacing: "0.15em",
          transition: "color 0.2s",
        }}>
          <span style={{ fontSize: "1rem" }}>←</span> TOP
        </Link>
        <span style={{
          fontSize: "0.7rem", letterSpacing: "0.2em",
          color: "var(--text-muted)", textTransform: "uppercase" as const,
        }}>
          CREATORS
        </span>
      </header>

      {/* Main */}
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "7rem 1.5rem 4rem" }}>

        {/* Title */}
        <div style={{ marginBottom: "3rem", textAlign: "center" }}>
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
            SPIRUNAに所属するクリエイターをご紹介します。
          </p>
        </div>

        {/* Grid */}
        <div className="tl-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem",
        }}>
          {talents.map((t, i) => (
            <Link
              key={t.slug}
              href={`/talents/${t.slug}`}
              className="tl-card tl-item"
              style={{
                textDecoration: "none", color: "inherit",
                borderRadius: "8px", overflow: "hidden",
                background: t.gradient,
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(30px)",
                transitionDelay: `${0.1 + i * 0.08}s`,
              }}
            >
              {/* Image */}
              <div style={{
                position: "relative", paddingBottom: "120%", overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", top: "0.5rem", right: "0.75rem",
                  fontSize: "0.6rem", letterSpacing: "0.15em",
                  color: t.accent, opacity: 0.7,
                }}>
                  {t.id}
                </div>
                <img
                  src={t.fullImg}
                  alt={t.name}
                  className="tl-img"
                  style={{
                    position: "absolute", bottom: 0, left: "50%",
                    transform: "translateX(-50%)", height: "90%",
                    objectFit: "contain", objectPosition: "bottom center",
                  }}
                />
              </div>

              {/* Info */}
              <div style={{
                padding: "1.25rem", textAlign: "center",
                background: "rgba(6,6,8,0.6)",
                borderTop: `1px solid ${t.accent}22`,
              }}>
                <h3 className="tl-name" style={{
                  fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.25rem",
                }}>
                  {t.name}
                </h3>
                <p style={{
                  fontSize: "0.65rem", letterSpacing: "0.15em",
                  color: "var(--text-muted)", marginBottom: "0.75rem",
                }}>
                  {t.nameEn}
                </p>
                <div style={{ display: "flex", gap: "0.4rem", justifyContent: "center", flexWrap: "wrap" }}>
                  {t.tag.split(" · ").map((tag) => (
                    <span key={tag} style={{
                      fontSize: "0.6rem", padding: "0.2rem 0.6rem",
                      border: `1px solid ${t.accent}40`, borderRadius: "2px",
                      color: t.accent, letterSpacing: "0.05em",
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Audition CTA */}
        <div style={{
          textAlign: "center", marginTop: "4rem",
          opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)",
          transition: "opacity 0.6s 0.5s, transform 0.6s 0.5s",
        }}>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
            あなたも SPIRUNAの一員になりませんか？
          </p>
          <Link href="/#audition" style={{
            display: "inline-block", padding: "0.8rem 2.5rem",
            background: "var(--red)", color: "#fff",
            fontSize: "0.75rem", letterSpacing: "0.15em",
            textDecoration: "none", fontWeight: 600,
            transition: "opacity 0.2s",
          }}>
            ✦ AUDITION
          </Link>
        </div>
      </div>
    </div>
  );
}
