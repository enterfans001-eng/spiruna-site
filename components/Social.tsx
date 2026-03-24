"use client";
import { useEffect, useRef } from "react";

const socials = [
  {
    name: "TikTok",
    handle: "@spiruna_official",
    desc: "タレントの最新クリップ・ショート動画を毎日更新。フォローして見逃しゼロに。",
    icon: "♪",
    color: "#ff0050",
    stat: "48万",
    statLabel: "Followers",
    url: "https://tiktok.com",
  },
  {
    name: "YouTube",
    handle: "@spiruna_agency",
    desc: "タレントのロング配信アーカイブ・オリジナル企画を公開中。",
    icon: "▶",
    color: "#ff2200",
    stat: "32万",
    statLabel: "Subscribers",
    url: "https://youtube.com",
  },
  {
    name: "X / Twitter",
    handle: "@spiruna_vt",
    desc: "事務所の最新情報・タレントの配信告知をリアルタイムでお届け。",
    icon: "✕",
    color: "#ffffff",
    stat: "15万",
    statLabel: "Followers",
    url: "https://twitter.com",
  },
  {
    name: "Discord",
    handle: "Spiruna Community",
    desc: "タレントとファンが集まる公式コミュニティ。配信前の盛り上がりはここから。",
    icon: "◎",
    color: "#5865f2",
    stat: "8.4万",
    statLabel: "Members",
    url: "https://discord.com",
  },
];

export default function Social() {
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="social"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{ background: "var(--bg-2)" }}
    >
      <div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none" style={{
        width: 400, height: 600,
        background: "radial-gradient(ellipse at left, rgba(255,0,51,0.06) 0%, transparent 70%)",
      }} />

      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p className="section-label reveal" style={{ justifyContent: "center" }}>Follow & Contact</p>
          <h2 className="heading-serif reveal delay-1" style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)", marginBottom: "1rem" }}>
            SNS & お問い合わせ
          </h2>
          <p className="reveal delay-2" style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
            Spirunaの最新情報をフォローしよう。お仕事・取材のご依頼もこちらから。
          </p>
        </div>

        {/* Social cards */}
        <div className="grid md:grid-cols-2" style={{ gap: "1.25rem", marginBottom: "3.5rem" }}>
          {socials.map((s, i) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`card-cyber flex reveal delay-${i + 1} group`}
              style={{ textDecoration: "none", padding: "1.75rem", gap: "1.25rem" }}
            >
              <div
                className="shrink-0 w-12 h-12 flex items-center justify-center text-xl font-bold transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: `${s.color}18`,
                  border: `1px solid ${s.color}40`,
                  color: s.color,
                }}
              >
                {s.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs tracking-widest uppercase font-semibold" style={{ color: s.color }}>
                    {s.name}
                  </span>
                  <div className="text-right">
                    <div className="heading-serif text-lg leading-none" style={{ color: "var(--red)" }}>{s.stat}</div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>{s.statLabel}</div>
                  </div>
                </div>
                <div className="text-xs mb-2 font-mono" style={{ color: "var(--text-muted)" }}>{s.handle}</div>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{s.desc}</p>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
