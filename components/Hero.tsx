"use client";
import { useEffect, useState } from "react";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "次世代バーチャルクリエイターを、世界へ。";

  /* ── Load trigger ── */
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  /* ── Typing animation ── */
  useEffect(() => {
    if (!loaded) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 80);
    return () => clearInterval(interval);
  }, [loaded]);

  return (
    <section
      className="relative overflow-hidden md:min-h-screen md:flex md:items-center"
      style={{ background: "#060608" }}
    >
      {/* ─── Character Image: Center ─── */}
      {/* PC: covers entire section / Mobile: covers first 100vh only */}
      <div
        className="absolute top-0 left-0 right-0 h-screen md:h-full md:bottom-0 transition-opacity duration-1000"
        style={{ opacity: loaded ? 1 : 0 }}
      >
        <img
          src="/hero-character.png"
          alt="Spiruna Key Visual"
          className="absolute top-0 left-1/2 -translate-x-1/2 h-full object-cover object-center"
          style={{
            width: "auto",
            minWidth: "100%",
            minHeight: "100%",
            filter: "brightness(1.05) contrast(1.08)",
          }}
        />

        {/* Bottom gradient — section boundary */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{ background: "linear-gradient(transparent, #060608)" }}
        />

        {/* Text readability overlay — PC left side only */}
        <div
          className="absolute inset-0 pointer-events-none hidden md:block"
          style={{
            background: "linear-gradient(to right, rgba(6,6,8,0.7) 0%, rgba(6,6,8,0.4) 25%, transparent 50%)",
          }}
        />
      </div>

      {/* ─── Mobile: Scroll indicator on first screen ─── */}
      <div
        className="relative z-20 h-screen flex flex-col items-center justify-end pb-8 md:hidden"
        style={{ pointerEvents: "none" }}
      >
        <span className="text-xs tracking-[0.3em]" style={{ color: "var(--text-muted)", fontFamily: "var(--font-cyber)" }}>
          SCROLL
        </span>
        <div className="relative w-px h-12 mt-2">
          <div
            className="absolute top-0 w-px h-full"
            style={{ background: "linear-gradient(to bottom, var(--red), transparent)" }}
          />
          <div
            className="absolute w-1.5 h-1.5 rounded-full -left-[2px]"
            style={{
              background: "var(--red)",
              animation: "data-stream 2s ease-in-out infinite",
              boxShadow: "0 0 8px var(--red)",
            }}
          />
        </div>
      </div>

      {/* ─── HUD: Top Right Label ─── */}
      <div
        className="absolute top-20 right-6 md:right-10 z-20 transition-all duration-700 hidden md:block"
        style={{
          opacity: loaded ? 0.7 : 0,
          transform: loaded ? "translateX(0)" : "translateX(20px)",
          transitionDelay: "0.8s",
        }}
      >
        <span
          style={{
            color: "var(--red)",
            fontSize: "0.6rem",
            letterSpacing: "0.25em",
            fontFamily: "var(--font-cyber)",
          }}
        >
          ◆ Spiruna // KEY VISUAL 2026
        </span>
      </div>

      {/* ─── HUD: Corner Brackets (top-right area) ─── */}
      <div className="absolute top-16 right-4 md:right-8 w-[45%] md:w-[52%] h-[75%] pointer-events-none z-10 hidden md:block">
        {/* Top-left corner */}
        <div
          className="absolute top-0 left-0 w-5 h-5 transition-opacity duration-700"
          style={{
            borderTop: "1px solid rgba(255,0,51,0.3)",
            borderLeft: "1px solid rgba(255,0,51,0.3)",
            opacity: loaded ? 0.6 : 0,
            transitionDelay: "1s",
          }}
        />
        {/* Top-right corner */}
        <div
          className="absolute top-0 right-0 w-5 h-5 transition-opacity duration-700"
          style={{
            borderTop: "1px solid rgba(255,0,51,0.3)",
            borderRight: "1px solid rgba(255,0,51,0.3)",
            opacity: loaded ? 0.6 : 0,
            transitionDelay: "1.1s",
          }}
        />
        {/* Bottom-left corner */}
        <div
          className="absolute bottom-0 left-0 w-5 h-5 transition-opacity duration-700"
          style={{
            borderBottom: "1px solid rgba(255,0,51,0.3)",
            borderLeft: "1px solid rgba(255,0,51,0.3)",
            opacity: loaded ? 0.6 : 0,
            transitionDelay: "1.2s",
          }}
        />
        {/* Bottom-right corner */}
        <div
          className="absolute bottom-0 right-0 w-5 h-5 transition-opacity duration-700"
          style={{
            borderBottom: "1px solid rgba(255,0,51,0.3)",
            borderRight: "1px solid rgba(255,0,51,0.3)",
            opacity: loaded ? 0.6 : 0,
            transitionDelay: "1.3s",
          }}
        />
      </div>

      {/* ─── HUD: Right-side dot indicators ─── */}
      <div
        className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20 hidden md:flex"
        style={{ opacity: loaded ? 0.5 : 0, transition: "opacity 0.7s ease", transitionDelay: "1.2s" }}
      >
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div
            key={n}
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: n <= 2 ? "var(--red)" : "rgba(255,255,255,0.15)",
            }}
          />
        ))}
      </div>

      {/* ─── Main Content ─── */}
      {/* PC: overlays on image (centered by flex) / Mobile: below the fold with dark bg */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:pl-6 lg:pr-12 md:pt-20 md:pb-20">
        {/* Mobile: dark background behind text area */}
        <div
          className="absolute inset-0 md:hidden"
          style={{ background: "#060608" }}
        />
        <div
          className="relative max-w-lg transition-all duration-1000 py-12 md:py-0"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateX(0)" : "translateX(-30px)",
          }}
        >
          {/* Subtitle with lines */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px" style={{ background: "var(--red)" }} />
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "var(--red)",
                fontSize: "0.7rem",
                letterSpacing: "0.3em",
                fontWeight: 600,
                fontFamily: "var(--font-cyber)",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.28 0 .56.04.81.1v-3.5a6.37 6.37 0 0 0-.81-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.35 8.35 0 0 0 4.76 1.49V6.75a4.79 4.79 0 0 1-1-.06z"/>
              </svg>
              TIKTOK V VIRTUAL AGENCY
            </span>
            <div className="w-8 h-px" style={{ background: "var(--red)" }} />
          </div>

          {/* Main Title */}
          <h1
            className="heading-serif mb-10"
            style={{
              fontSize: "clamp(3.5rem, 8vw, 6.5rem)",
              lineHeight: 1.1,
              letterSpacing: "0.04em",
              color: "#ffffff",
              fontWeight: 400,
            }}
          >
            Spiruna
          </h1>

          {/* Typing text */}
          <div className="mb-6 mt-6 min-h-[2.5rem]">
            <p
              className="text-base leading-8 typing-cursor inline"
              style={{ color: "rgba(255,255,255,0.75)", paddingRight: "4px" }}
            >
              {typedText}
            </p>
          </div>

          {/* Description */}
          <p
            className="text-sm leading-7 mb-10 max-w-sm"
            style={{ color: "rgba(255,255,255,0.75)", textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}
          >
            才能を発掘し、個性を磨き、TikTokの先へ——Spirunaは、光り輝く存在を生み出すTikTok V 専門事務所です。
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <a href="#talents" className="btn-primary">
              <span style={{ color: "var(--cyan)" }}>◆</span> CREATORS
            </a>
            <a href="#audition" className="btn-ghost">
              AUDITION →
            </a>
          </div>
        </div>
      </div>

      {/* ─── Bottom: Scroll Indicator (PC only) ─── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 z-20 hidden md:flex"
        style={{ color: "var(--text-muted)" }}
      >
        <span className="text-xs tracking-[0.3em]" style={{ fontFamily: "var(--font-cyber)" }}>
          SCROLL
        </span>
        <div className="relative w-px h-12">
          <div
            className="absolute top-0 w-px h-full"
            style={{ background: "linear-gradient(to bottom, var(--red), transparent)" }}
          />
          <div
            className="absolute w-1.5 h-1.5 rounded-full -left-[2px]"
            style={{
              background: "var(--red)",
              animation: "data-stream 2s ease-in-out infinite",
              boxShadow: "0 0 8px var(--red)",
            }}
          />
        </div>
      </div>

      {/* ─── Bottom Right: Label ─── */}
      <div
        className="absolute bottom-6 right-8 z-20 hidden md:block"
        style={{
          color: "rgba(255,255,255,0.2)",
          fontSize: "0.55rem",
          letterSpacing: "0.2em",
          fontFamily: "var(--font-cyber)",
        }}
      >
        NEXT GEN · V-CREATOR · Spiruna
      </div>
    </section>
  );
}
