"use client";
import { useEffect, useRef } from "react";

const pillars = [
  {
    num: "01",
    title: "Value",
    titleJa: "TikTok V特化",
    desc: "TikTok V 専門レーベル「Spiruna」は最速で伸びるためのコンテンツ戦略・運営サポート・成長導線を提供。",
    accent: "#ff0033",
  },
  {
    num: "02",
    title: "Support",
    titleJa: "特待生制度あり",
    desc: "Spirunaでは、過去配信実績があるクリエイター限定で高性能ゲーミングPCの貸出を行っております。詳しくは当事務所までお問い合わせください。",
    accent: "#cc00ff",
  },
  {
    num: "03",
    title: "Game",
    titleJa: "ゲームサポート",
    desc: "TikTok V配信で定番の妨害サーバー構築から、OBS設定まで当事務所の専門スタッフが対応いたします。",
    accent: "#ff6600",
  },
];

export default function Concept() {
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
      { threshold: 0.06 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="concept" ref={sectionRef} className="relative py-16 sm:py-32 overflow-hidden" style={{ background: "var(--bg-2)" }}>
      <style>{`
        @media (max-width: 640px) {
          .concept-header { text-align: left !important; margin-left: 0 !important; margin-right: 0 !important; max-width: none !important; }
          .concept-header .section-label { justify-content: flex-start !important; }
          .concept-desc { font-size: 0.8125rem !important; line-height: 1.85 !important; }
          .concept-mission-inner { flex-direction: column !important; }
          .concept-mission-text { border-left: none !important; padding-left: 0 !important; border-top: 1px solid rgba(255,0,51,0.2); padding-top: 1rem; }
        }
      `}</style>

      {/* BG accents */}
      <div className="absolute right-0 top-0 pointer-events-none" style={{
        width: 600, height: 600,
        background: "radial-gradient(ellipse at top right, rgba(255,0,51,0.06) 0%, transparent 60%)",
      }} />
      <div className="absolute left-0 bottom-0 pointer-events-none" style={{
        width: 400, height: 400,
        background: "radial-gradient(ellipse at bottom left, rgba(204,0,255,0.04) 0%, transparent 60%)",
      }} />

      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Header */}
        <div className="concept-header" style={{ marginBottom: "3rem", textAlign: "center", maxWidth: "40rem", marginLeft: "auto", marginRight: "auto" }}>
          <p className="section-label reveal" style={{ justifyContent: "center" }}>Our Concept</p>
          <h2 className="heading-serif reveal delay-1" style={{ fontSize: "clamp(1.75rem, 5vw, 3.75rem)", marginBottom: "1.25rem" }}>
            次世代の<br />
            <span style={{ color: "var(--red)" }}>バーチャルを</span>、創る
          </h2>
          <p className="concept-desc reveal delay-2" style={{ fontSize: "0.875rem", lineHeight: 2, color: "rgba(255,255,255,0.6)", marginBottom: "0.75rem" }}>
            本事務所は、株式会社エンターファンズが運営するTikTok V専門のマネジメントレーベルです。
            配信アプリを主軸とする従来のVライバー事務所とは異なり、TikTokというプラットフォームに最適化したコンテンツ戦略・運営サポート・成長導線を提供しています。
          </p>
          <p className="concept-desc reveal delay-3" style={{ fontSize: "0.875rem", lineHeight: 2, color: "rgba(255,255,255,0.6)", marginBottom: "1.5rem" }}>
            Linearがこれまで培ってきた
            ライバーマネジメント・イベント運営・クリエイター支援のノウハウを基盤に、
            TikTok Vならではの可能性を最大限に引き出します。
          </p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: "1.25rem", marginBottom: "3.5rem" }}>
          {pillars.map((p, i) => (
            <div
              key={p.num}
              className={`card-cyber group reveal delay-${i + 1} relative overflow-hidden`}
              style={{ padding: "1.75rem" }}
            >
              {/* BG number watermark */}
              <div className="absolute pointer-events-none" style={{
                top: "0.75rem", right: "1rem",
                fontFamily: "var(--font-serif)",
                fontSize: "5rem",
                fontWeight: 700,
                color: `${p.accent}08`,
                lineHeight: 1,
                userSelect: "none",
              }}>
                {p.num}
              </div>

              {/* Accent line top */}
              <div style={{ marginBottom: "1.25rem", width: "1.5rem", height: "2px", background: p.accent }} />

              {/* Number */}
              <div style={{ fontSize: "0.75rem", fontFamily: "monospace", marginBottom: "0.5rem", letterSpacing: "0.15em", color: p.accent }}>
                {p.num}
              </div>

              {/* Title */}
              <h3 className="heading-serif group-hover:text-red-400 transition-colors duration-300" style={{ fontSize: "1.5rem", marginBottom: "0.25rem", color: "var(--text)" }}>
                {p.title}
              </h3>
              <p style={{ fontSize: "0.75rem", letterSpacing: "0.2em", marginBottom: "1rem", color: p.accent }}>
                {p.titleJa}
              </p>

              {/* Desc */}
              <p style={{ fontSize: "0.8125rem", lineHeight: 1.9, color: "rgba(255,255,255,0.55)" }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Mission statement */}
        <div className="reveal delay-4">
          <div style={{ padding: "1px", background: "linear-gradient(90deg, var(--red), transparent 60%)" }}>
            <div style={{ padding: "1.5rem", background: "var(--bg-2)" }}>
              <div className="concept-mission-inner" style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
                <div style={{ flexShrink: 0 }}>
                  <p style={{ fontSize: "0.75rem", letterSpacing: "0.3em", marginBottom: "0.25rem", color: "var(--red)" }}>MISSION</p>
                  <p className="heading-serif" style={{ fontSize: "clamp(1.25rem, 3vw, 1.875rem)", whiteSpace: "nowrap" }}>
                    才能に、<span style={{ color: "var(--red)" }}>居場所を。</span>
                  </p>
                </div>
                <div className="concept-mission-text" style={{ borderLeft: "1px solid rgba(255,0,51,0.2)", paddingLeft: "2rem" }}>
                  <p style={{ fontSize: "0.8125rem", lineHeight: 1.9, color: "rgba(255,255,255,0.55)" }}>
                    どれだけ輝く才能を持っていても、正しい場所と環境がなければ届かない。
                    Spirunaは、クリエイター一人ひとりの個性と夢を最大限に活かすため、
                    戦略・技術・コミュニティのすべてを提供します。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
