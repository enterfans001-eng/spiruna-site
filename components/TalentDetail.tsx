"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { Talent } from "@/lib/microcms";

type Props = {
  talent: Talent;
  prev: Talent;
  next: Talent;
  index?: number;
};

export default function TalentDetail({ talent, prev, next, index = 0 }: Props) {
  const defaultColors = ["#ff0033", "#3366ff"];
  const ac = talent.accent || defaultColors[index % 2];
  const grad = talent.gradient || `linear-gradient(135deg, ${ac}18 0%, rgba(6,6,8,0.95) 100%)`;
  const tags = talent.generation ? [talent.generation] : [];
  const [loaded, setLoaded] = useState(false);

  // Extract YouTube video ID from URL or raw ID
  const extractYoutubeId = (input?: string) => {
    if (!input) return null;
    const match = input.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : input.length === 11 ? input : null;
  };
  const ytId = extractYoutubeId(talent.youtubeVideoId);
  const [slideIdx, setSlideIdx] = useState(0);
  const allImages = talent.fullImgs?.length
    ? talent.fullImgs
    : talent.fullImg?.url
      ? [talent.fullImg]
      : [];
  const hasMultiple = allImages.length > 1;

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Auto-slide every 4 seconds
  useEffect(() => {
    if (!hasMultiple) return;
    const interval = setInterval(() => {
      setSlideIdx((p) => (p + 1) % allImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [hasMultiple, allImages.length]);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)", position: "relative", overflow: "hidden" }}>
      <style>{`
        .td-nav-btn { transition: border-color 0.2s, color 0.2s, background 0.2s; }
        .td-nav-btn:hover { border-color: ${ac} !important; color: ${ac} !important; background: ${ac}10 !important; }
        .td-social-btn { transition: border-color 0.2s, color 0.2s, background 0.2s; }
        .td-social-btn:hover { border-color: ${ac} !important; color: ${ac} !important; background: ${ac}10 !important; }
        .td-back-link { transition: color 0.2s; }
        .td-back-link:hover { color: var(--text) !important; }
        .td-info-item { transition: transform 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.5s; }
        .td-accent-line { transition: transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s; transform-origin: left; }

        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes pulse-glow { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.8; } }
        @keyframes diagonal-sweep { 0% { transform: translateX(-100%) skewX(-20deg); } 100% { transform: translateX(200%) skewX(-20deg); } }
        @keyframes scan-line { 0% { top: -2px; } 100% { top: 100%; } }
        @keyframes particle-float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
        }

        /* Diagonal character section */
        .td-diagonal-bg {
          clip-path: polygon(0 0, 65% 0, 50% 100%, 0 100%);
          transition: clip-path 1s cubic-bezier(0.16,1,0.3,1);
        }
        .td-diagonal-bg.loaded {
          clip-path: polygon(0 0, 65% 0, 50% 100%, 0 100%);
        }
        .td-diagonal-bg.initial {
          clip-path: polygon(0 0, 0% 0, 0% 100%, 0 100%);
        }

        /* Character image entrance */
        .td-char-main {
          transition: transform 1.2s cubic-bezier(0.16,1,0.3,1), opacity 0.8s, filter 0.8s;
        }

        /* SD character */
        .td-char-sd-wrap {
          transition: transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s, opacity 0.6s 0.5s;
        }

        /* Background name */
        .td-bg-name-large {
          transition: transform 1.5s cubic-bezier(0.16,1,0.3,1), opacity 1.2s;
        }

        /* Diagonal edge glow */
        .td-diagonal-edge {
          transition: opacity 1s 0.3s;
        }

        @media (max-width: 768px) {
          .td-diagonal-bg {
            clip-path: polygon(0 0, 100% 0, 100% 80%, 0 95%) !important;
            width: 100% !important;
            height: 65vh !important;
            position: relative !important;
          }
          .td-diagonal-bg.initial {
            clip-path: polygon(0 0, 100% 0, 100% 0%, 0 0%) !important;
          }
          .td-info-panel {
            padding: 2rem 1.5rem 3rem !important;
            position: relative !important;
            right: auto !important;
            width: 100% !important;
            max-width: 100% !important;
            top: auto !important;
            bottom: auto !important;
          }
          .td-hero-layout {
            min-height: auto !important;
            display: flex !important;
            flex-direction: column !important;
          }
          .td-char-main {
            left: 50% !important;
            transform: translateX(-50%) scale(1) !important;
            height: 80% !important;
            bottom: 3rem !important;
          }
          .td-char-sd-wrap {
            left: auto !important;
            right: 0.5rem !important;
            bottom: 36rem !important;
          }
          .td-char-sd-wrap img {
            height: 130px !important;
          }
          .td-diagonal-edge {
            display: none !important;
          }
          .td-bg-name-vertical {
            display: none !important;
          }
          .td-header-nav {
            gap: 0.25rem !important;
          }
          .td-header-nav a {
            padding: 0.3rem 0.6rem !important;
            font-size: 0.6rem !important;
          }
        }
      `}</style>

      {/* ─── Header ─── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1rem 2rem",
        background: "rgba(6,6,8,0.85)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,0,51,0.12)",
      }}>
        <Link href="/talents" className="td-back-link" style={{
          display: "flex", alignItems: "center", gap: "0.75rem",
          textDecoration: "none", color: "var(--text-muted)",
          fontSize: "0.75rem", letterSpacing: "0.15em",
        }}>
          <span style={{ fontSize: "1rem" }}>←</span> CREATOR
        </Link>
        <div className="td-header-nav" style={{ display: "flex", gap: "0.5rem" }}>
          <Link href={`/talents/${prev.slug}`} className="td-nav-btn" style={{
            padding: "0.4rem 1rem", fontSize: "0.7rem", letterSpacing: "0.15em",
            border: "1px solid rgba(255,255,255,0.15)", color: "var(--text-muted)", textDecoration: "none",
          }}>← PREV</Link>
          <Link href={`/talents/${next.slug}`} className="td-nav-btn" style={{
            padding: "0.4rem 1rem", fontSize: "0.7rem", letterSpacing: "0.15em",
            border: `1px solid ${ac}`, color: ac, textDecoration: "none",
          }}>NEXT →</Link>
        </div>
      </header>

      {/* ─── Full-screen hero layout ─── */}
      <div className="td-hero-layout" style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>

        {/* Background large name watermark */}
        <div
          className="td-bg-name-large"
          style={{
            position: "absolute", top: "50%", left: "55%",
            transform: loaded ? "translate(-50%, -50%) rotate(-90deg)" : "translate(-50%, -30%) rotate(-90deg)",
            opacity: loaded ? 0.03 : 0,
            whiteSpace: "nowrap", fontSize: "clamp(8rem,20vw,18rem)", fontWeight: 900,
            fontFamily: "var(--font-heading), serif", letterSpacing: "0.1em",
            color: "var(--text)", lineHeight: 1, zIndex: 1,
            pointerEvents: "none", userSelect: "none",
          }}
        >
          {talent.nameEn}
        </div>

        {/* Vertical name text on the right side */}
        <div
          className="td-bg-name-vertical td-info-item"
          style={{
            position: "absolute", right: "2rem", top: "50%",
            transform: "translateY(-50%) rotate(180deg)",
            writingMode: "vertical-rl",
            fontSize: "0.65rem", letterSpacing: "0.4em", fontFamily: "monospace",
            color: `${ac}30`, zIndex: 2, pointerEvents: "none",
            opacity: loaded ? 1 : 0,
            transitionDelay: "1s",
          }}
        >
          {talent.nameEn}
        </div>

        {/* ─── Diagonal character background ─── */}
        <div
          className={`td-diagonal-bg td-char-area ${loaded ? "loaded" : "initial"}`}
          style={{
            position: "absolute", top: 0, left: 0, bottom: 0,
            width: "65%",
            background: grad,
            zIndex: 2,
          }}
        >
          {/* Grid pattern */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: `linear-gradient(${ac}08 1px, transparent 1px), linear-gradient(90deg, ${ac}08 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }} />

          {/* Radial glow from bottom */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: `radial-gradient(ellipse 80% 60% at 40% 90%, ${ac}25 0%, transparent 70%)`,
          }} />

          {/* Top gradient fade */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "15%",
            background: "linear-gradient(rgba(6,6,8,0.4), transparent)",
            pointerEvents: "none", zIndex: 3,
          }} />

          {/* Scan line effect */}
          <div style={{
            position: "absolute", left: 0, right: 0, height: 1,
            background: `linear-gradient(90deg, transparent, ${ac}20, transparent)`,
            animation: "scan-line 4s linear infinite",
            pointerEvents: "none", zIndex: 4,
          }} />

          {/* ─── Character image ─── */}
          <div
            className="td-char-main"
            style={{
              position: "absolute", bottom: "1.5rem", left: "30%",
              transform: loaded
                ? "translateX(-50%)"
                : "translateX(-50%) translateY(40px)",
              opacity: loaded ? 1 : 0,
              height: "92%", top: "auto", zIndex: 5,
              display: "flex", alignItems: "flex-end",
              filter: loaded ? "drop-shadow(0 0 60px rgba(0,0,0,0.6))" : "drop-shadow(0 0 60px rgba(0,0,0,0.6)) brightness(0.5)",
            }}
          >
            {allImages.length > 0 && (
            <img
              src={allImages[slideIdx]?.url}
              alt={talent.name}
              style={{
                maxHeight: "100%", objectFit: "contain", objectPosition: "bottom center",
                transition: "opacity 0.4s ease",
              }}
            />
            )}
          </div>

          {/* ─── Slide controls ─── */}
          {hasMultiple && (
          <div style={{
            position: "absolute", bottom: "1rem", left: "30%",
            transform: "translateX(-50%)", zIndex: 20,
            display: "flex", gap: "0.5rem", alignItems: "center",
          }}>
            <button
              onClick={() => setSlideIdx((p) => (p - 1 + allImages.length) % allImages.length)}
              style={{
                width: 28, height: 28, borderRadius: "50%",
                background: "rgba(0,0,0,0.6)", border: `1px solid ${ac}60`,
                color: "#fff", fontSize: "0.75rem", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >◀</button>
            {allImages.map((_, i) => (
              <div
                key={i}
                onClick={() => setSlideIdx(i)}
                style={{
                  width: i === slideIdx ? 16 : 6, height: 6, borderRadius: 3,
                  background: i === slideIdx ? ac : "rgba(255,255,255,0.3)",
                  cursor: "pointer", transition: "all 0.3s",
                }}
              />
            ))}
            <button
              onClick={() => setSlideIdx((p) => (p + 1) % allImages.length)}
              style={{
                width: 28, height: 28, borderRadius: "50%",
                background: "rgba(0,0,0,0.6)", border: `1px solid ${ac}60`,
                color: "#fff", fontSize: "0.75rem", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >▶</button>
          </div>
          )}

          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${15 + i * 12}%`,
                bottom: 0,
                width: 2, height: 2,
                borderRadius: "50%",
                background: ac,
                boxShadow: `0 0 6px ${ac}`,
                animation: `particle-float ${4 + i * 1.5}s ease-in-out ${i * 0.8}s infinite`,
                pointerEvents: "none", zIndex: 6,
              }}
            />
          ))}

          {/* Bottom gradient fade */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "20%",
            background: "linear-gradient(transparent, rgba(6,6,8,0.5))",
            pointerEvents: "none", zIndex: 6,
          }} />
        </div>

        {/* ─── Diagonal edge glow line ─── */}
        <div
          className="td-diagonal-edge"
          style={{
            position: "absolute", top: 0, bottom: 0, left: 0, width: "52%",
            zIndex: 3, pointerEvents: "none",
            opacity: loaded ? 1 : 0,
          }}
        >
          {/* The glowing diagonal line */}
          <div style={{
            position: "absolute", top: 0, right: 0, bottom: 0, width: "4px",
            background: `linear-gradient(to bottom, transparent, ${ac}60, ${ac}, ${ac}60, transparent)`,
            transform: "skewX(0deg)",
            filter: `blur(1px) drop-shadow(0 0 8px ${ac}) drop-shadow(0 0 20px ${ac}50)`,
          }} />
        </div>

        {/* ─── SD Character ─── */}
        <div
          className="td-char-sd-wrap"
          style={{
            position: "absolute", bottom: "6rem", left: "20%",
            zIndex: 20,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0) scale(1)" : "translateY(40px) scale(0.8)",
          }}
        >
          <div style={{ animation: "float 3s ease-in-out infinite" }}>
            {talent.sdImg?.url && (
            <img
              src={talent.sdImg.url}
              alt={`${talent.name} SD`}
              style={{
                height: 260, objectFit: "contain",
                filter: "drop-shadow(0 8px 30px rgba(0,0,0,0.7))",
              }}
            />
            )}
          </div>
        </div>

        {/* ─── Accent glow dots ─── */}
        <div style={{
          position: "absolute", bottom: "5rem", left: "8%", zIndex: 20,
          width: 6, height: 6, borderRadius: "50%",
          background: ac, boxShadow: `0 0 16px ${ac}, 0 0 40px ${ac}60`,
          animation: "pulse-glow 2s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", top: "30%", left: "5%", zIndex: 20,
          width: 4, height: 4, borderRadius: "50%",
          background: ac, boxShadow: `0 0 10px ${ac}`,
          animation: "pulse-glow 3s ease-in-out 1s infinite",
        }} />

        {/* ─── Right: Info panel ─── */}
        <div
          className="td-info-panel"
          style={{
            position: "absolute", right: 0, top: 0, bottom: 0,
            width: "45%",
            display: "flex", flexDirection: "column", justifyContent: "center",
            padding: "7rem 3rem 4rem 4rem",
            zIndex: 10,
          }}
        >
          {/* Name */}
          <div className="td-info-item" style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateX(0)" : "translateX(30px)",
            transitionDelay: "0.5s",
            marginBottom: "0.5rem",
          }}>
            <h1 style={{
              fontFamily: "var(--font-heading), serif",
              fontSize: "clamp(2.5rem, 4.5vw, 4rem)", lineHeight: 1.05,
              marginBottom: "0.5rem",
            }}>
              {talent.name}
            </h1>
            <p style={{
              color: `${ac}80`, fontSize: "0.8rem", letterSpacing: "0.2em",
              fontFamily: "monospace",
            }}>
              {talent.nameEn}
            </p>
          </div>

          {/* Accent line */}
          <div className="td-accent-line" style={{
            height: 2, marginBottom: "1.5rem", marginTop: "1rem",
            background: `linear-gradient(to right, ${ac}, ${ac}40, transparent)`,
            transform: loaded ? "scaleX(1)" : "scaleX(0)",
          }} />

          {/* Bio */}
          {talent.bio && (
          <div className="td-info-item" style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateX(0)" : "translateX(30px)",
            transitionDelay: "0.7s",
            marginBottom: "1.5rem",
          }}>
            <p style={{ fontSize: "0.875rem", lineHeight: 2.2, color: "rgba(255,255,255,0.55)" }}>
              {talent.bio}
            </p>
          </div>
          )}

          {/* Tags */}
          {tags.length > 0 && (
          <div className="td-info-item" style={{
            display: "flex", gap: "0.5rem", flexWrap: "wrap",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateX(0)" : "translateX(30px)",
            transitionDelay: "0.8s",
            marginBottom: "1.5rem",
          }}>
            {tags.map((tag) => (
              <span key={tag} style={{
                padding: "0.3rem 0.8rem", background: `${ac}10`, border: `1px solid ${ac}25`,
                color: ac, fontSize: "0.65rem", letterSpacing: "0.12em",
              }}>
                {tag}
              </span>
            ))}
          </div>
          )}

        </div>

        {/* ─── Diagonal sweep animation ─── */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 15, pointerEvents: "none", overflow: "hidden",
          opacity: loaded ? 0 : 1,
          transition: "opacity 0.5s 1.5s",
        }}>
          <div style={{
            position: "absolute", top: 0, bottom: 0, width: "30%",
            background: `linear-gradient(90deg, transparent, ${ac}15, ${ac}08, transparent)`,
            animation: "diagonal-sweep 1.5s cubic-bezier(0.16,1,0.3,1) forwards",
          }} />
        </div>

        {/* ─── Corner decorations ─── */}
        <div className="td-info-item" style={{
          position: "absolute", bottom: "2rem", right: "3rem", zIndex: 20,
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(10px)",
          transitionDelay: "1.2s",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ width: 30, height: 1, background: `${ac}40` }} />
            <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--text-muted)", fontFamily: "monospace" }}>
              Spiruna VIRTUAL AGENCY
            </span>
          </div>
        </div>
      </div>

      {/* ═══════ Below-fold: Profile / Intro / YouTube ═══════ */}
      <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "5rem 1.5rem 4rem" }}>

        {/* ── Profile ── */}
        <div style={{ marginBottom: "4rem" }}>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: ac, marginBottom: "1rem", textTransform: "uppercase" as const }}>
            PROFILE
          </p>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1px",
            border: `1px solid ${ac}20`,
          }}>
            {[
              { label: "名前", value: `${talent.name}（${talent.nameEn}）` },
              { label: "誕生日", value: talent.birthday || "—" },
              { label: "デビュー日", value: talent.debutDate || "—" },
              { label: "期生", value: talent.generation || "—" },
            ].map((item) => (
              <div key={item.label} style={{
                padding: "1.25rem 1.5rem",
                background: `${ac}06`,
                borderBottom: `1px solid ${ac}12`,
              }}>
                <p style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                  {item.label}
                </p>
                <p style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── SNS Links ── */}
        <div style={{ marginBottom: "4rem" }}>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: ac, marginBottom: "1rem", textTransform: "uppercase" as const }}>
            SNS
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {talent.tiktok && (
              <a href={talent.tiktok} target="_blank" rel="noopener noreferrer" className="td-social-btn" style={{
                padding: "0.7rem 1.5rem", border: `1px solid ${ac}30`,
                color: "var(--text)", fontSize: "0.75rem", letterSpacing: "0.1em", textDecoration: "none",
                display: "flex", alignItems: "center", gap: "0.5rem",
              }}>
                <span style={{ fontSize: "0.9rem" }}>♪</span> TikTok
              </a>
            )}
            {talent.youtube && (
              <a href={talent.youtube} target="_blank" rel="noopener noreferrer" className="td-social-btn" style={{
                padding: "0.7rem 1.5rem", border: `1px solid ${ac}30`,
                color: "var(--text)", fontSize: "0.75rem", letterSpacing: "0.1em", textDecoration: "none",
                display: "flex", alignItems: "center", gap: "0.5rem",
              }}>
                <span style={{ fontSize: "0.9rem" }}>▶</span> YouTube
              </a>
            )}
            {talent.twitter && (
              <a href={talent.twitter} target="_blank" rel="noopener noreferrer" className="td-social-btn" style={{
                padding: "0.7rem 1.5rem", border: `1px solid ${ac}30`,
                color: "var(--text)", fontSize: "0.75rem", letterSpacing: "0.1em", textDecoration: "none",
                display: "flex", alignItems: "center", gap: "0.5rem",
              }}>
                <span style={{ fontSize: "0.9rem" }}>𝕏</span> X
              </a>
            )}
          </div>
        </div>

        {/* ── Self Introduction ── */}
        {talent.intro && (
          <div style={{ marginBottom: "4rem" }}>
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: ac, marginBottom: "1rem", textTransform: "uppercase" as const }}>
              SELF INTRODUCTION
            </p>
            <div style={{
              padding: "2rem", borderLeft: `3px solid ${ac}`,
              background: `${ac}06`,
            }}>
              <p style={{ fontSize: "0.9rem", lineHeight: 2.2, color: "rgba(255,255,255,0.7)" }}>
                {talent.intro}
              </p>
            </div>
          </div>
        )}

        {/* ── YouTube Preview ── */}
        {ytId && (
          <div style={{ marginBottom: "4rem" }}>
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: ac, marginBottom: "1rem", textTransform: "uppercase" as const }}>
              MOVIE
            </p>
            <div style={{
              position: "relative", paddingBottom: "56.25%", height: 0,
              border: `1px solid ${ac}20`, overflow: "hidden",
            }}>
              <iframe
                src={`https://www.youtube.com/embed/${ytId}`}
                title={`${talent.name} - YouTube`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute", top: 0, left: 0,
                  width: "100%", height: "100%", border: "none",
                }}
              />
            </div>
          </div>
        )}

        {/* ── Back to talents list ── */}
        <div style={{ textAlign: "center", paddingTop: "2rem", borderTop: `1px solid ${ac}15` }}>
          <Link href="/talents" style={{
            display: "inline-block", padding: "0.75rem 2rem",
            border: `1px solid ${ac}30`, color: ac,
            fontSize: "0.75rem", letterSpacing: "0.15em",
            textDecoration: "none", transition: "background 0.2s, border-color 0.2s",
          }}>
            ← CREATORS一覧に戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
