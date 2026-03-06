"use client";
import { useEffect, useRef } from "react";

const steps = [
  { num: "01", label: "エントリー", desc: "フォームから必要事項を入力して応募。" },
  { num: "02", label: "書類選考", desc: "プロフィール・自己PR動画を審査。1週間以内に結果をお知らせします。" },
  { num: "03", label: "面接", desc: "オンライン面接でビジョンと個性を確認。" },
  { num: "04", label: "デビュー", desc: "SPIRUNAの一員として、バーチャルの世界へ。" },
];

export default function Audition() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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
    if (contentRef.current) observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="audition" ref={sectionRef} className="relative overflow-hidden" style={{ background: "var(--bg-2)", scrollMarginTop: "5rem" }}>
      <style>{`
        .aud-hero-img { transition: transform 8s ease-out; }
        .aud-hero-img.loaded { transform: scale(1.05); }
        .aud-cta-btn { transition: transform 0.2s, box-shadow 0.2s; }
        .aud-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(255,0,51,0.3); }
        @keyframes aud-shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>

      {/* ===== Hero Section with Stage Image ===== */}
      <div style={{ position: "relative", minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* BG Image */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <img
            src="/audition-hero.png"
            alt=""
            style={{
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center 30%",
            }}
          />
          {/* Gradient overlays */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(6,6,8,0.4) 0%, rgba(6,6,8,0.2) 40%, rgba(6,6,8,0.7) 75%, var(--bg-2) 100%)",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, rgba(6,6,8,0.6) 0%, transparent 30%, transparent 70%, rgba(6,6,8,0.6) 100%)",
          }} />
          {/* Scan lines overlay */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
            pointerEvents: "none",
          }} />
        </div>

        {/* Hero Content */}
        <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "6rem 1.5rem 4rem" }}>
          <p style={{
            fontSize: "0.7rem", letterSpacing: "0.4em", color: "var(--red)",
            marginBottom: "1rem", textTransform: "uppercase" as const,
          }}>
            — AUDITION —
          </p>
          <h2 style={{
            fontFamily: "var(--font-cyber)", fontWeight: 700,
            fontSize: "clamp(2.5rem, 8vw, 6rem)", lineHeight: 1,
            marginBottom: "0.75rem",
            letterSpacing: "0.05em",
            textShadow: "0 4px 40px rgba(0,0,0,0.5), 0 0 80px rgba(255,0,51,0.15)",
          }}>
            BE THE <span style={{ color: "var(--red)" }}>NEXT</span>
          </h2>
          <p style={{
            display: "inline-block",
            fontSize: "1rem", fontWeight: 700, letterSpacing: "0.3em",
            color: "#fff",
            marginBottom: "1.5rem",
            padding: "0.5rem 1.5rem",
            border: "1px solid rgba(255,255,255,0.5)",
            background: "rgba(255,0,51,0.15)",
            backdropFilter: "blur(4px)",
            textShadow: "0 2px 12px rgba(0,0,0,0.5)",
          }}>
            オーディション開催中
          </p>
          <p style={{
            fontSize: "0.9rem", lineHeight: 2,
            maxWidth: "28rem", margin: "0 auto 2.5rem",
            color: "rgba(255,255,255,0.85)",
            textShadow: "0 2px 16px rgba(0,0,0,0.6)",
          }}>
            あなたの才能と個性が、TikTokの世界を変える。<br />
            SPIRUNAは常に新しいクリエイターを求めています。
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#contact" className="aud-cta-btn" style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              padding: "0.9rem 2.5rem",
              background: "var(--red)", color: "#fff",
              fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em",
              textDecoration: "none",
            }}>
              LINEから今すぐ応募
            </a>
          </div>

          {/* Scroll hint */}
          <div style={{ marginTop: "3rem" }}>
            <div style={{
              width: 1, height: 40, background: "linear-gradient(to bottom, var(--red), transparent)",
              margin: "0 auto 0.5rem",
            }} />
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "var(--text-muted)" }}>SCROLL</p>
          </div>
        </div>
      </div>

      {/* ===== Content Below Hero ===== */}
      <div ref={contentRef} style={{ maxWidth: "72rem", margin: "0 auto", padding: "4rem 1.5rem 5rem", position: "relative" }}>

        {/* Steps */}
        <div className="reveal delay-3" style={{ marginBottom: "4rem" }}>
          <p style={{
            fontSize: "0.65rem", letterSpacing: "0.3em",
            textAlign: "center", color: "var(--text-muted)", marginBottom: "3rem",
          }}>
            — AUDITION FLOW —
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {steps.map((s, i) => (
              <div key={s.num} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-5 left-full w-full h-px -translate-x-1/2 z-0" style={{ background: "rgba(255,0,51,0.15)" }} />
                )}
                <div className="relative z-10 text-center">
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 1rem",
                    border: "1px solid rgba(255,0,51,0.3)",
                    background: "var(--bg-2)",
                  }}>
                    <span style={{ fontSize: "0.7rem", fontFamily: "monospace", color: "var(--red)" }}>{s.num}</span>
                  </div>
                  <h4 style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.5rem" }}>{s.label}</h4>
                  <p style={{ fontSize: "0.7rem", lineHeight: 1.7, color: "var(--text-muted)" }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
