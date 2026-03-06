"use client";
import { useEffect, useRef } from "react";

const tags = ["Gaming", "Singing", "Horror", "FPS", "JRPG", "Zatsudan", "Karaoke", "Collabo"];

const stats = [
  { label: "LEVEL", value: "MAX" },
  { label: "RANK", value: "S+" },
  { label: "ACTIVE", value: "2Y" },
  { label: "STREAMS", value: "850+" },
];

export default function About() {
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
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-32 overflow-hidden" style={{ background: "var(--bg-2)" }}>

      {/* Ticker */}
      <div className="overflow-hidden py-3 mb-24 border-y" style={{ borderColor: "rgba(255,0,51,0.12)" }}>
        <div className="ticker-inner select-none">
          {tags.map((t, i) => (
            <span key={`a-${i}`} className="mx-8 flex items-center gap-6">
              <span className="text-xs tracking-[0.3em] uppercase" style={{ color: "var(--text-muted)" }}>{t}</span>
              <span style={{ color: "var(--red)" }}>✦</span>
            </span>
          ))}
          {tags.map((t, i) => (
            <span key={`b-${i}`} className="mx-8 flex items-center gap-6">
              <span className="text-xs tracking-[0.3em] uppercase" style={{ color: "var(--text-muted)" }}>{t}</span>
              <span style={{ color: "var(--red)" }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* ── LEFT: Character Image Panel ── */}
        <div className="reveal-left hidden md:block">
          <div className="relative mx-auto" style={{ width: 340, height: 440 }}>

            {/* Outer red glow */}
            <div className="absolute -inset-4 pointer-events-none" style={{
              background: "radial-gradient(ellipse, rgba(255,0,51,0.12) 0%, transparent 70%)",
            }} />

            {/* Main panel */}
            <div className="absolute inset-0" style={{
              background: "linear-gradient(150deg, #12000a 0%, #090010 60%, #12000a 100%)",
              border: "1px solid rgba(255,0,51,0.2)",
            }} />

            {/* Gradient fill (light from below) */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(255,0,51,0.2) 0%, transparent 100%)",
            }} />

            {/* Top header bar */}
            <div className="absolute top-0 left-0 right-0 h-7 flex items-center justify-between px-3" style={{
              background: "rgba(255,0,51,0.07)", borderBottom: "1px solid rgba(255,0,51,0.18)",
            }}>
              <span style={{ color: "var(--red)", fontSize: "0.58rem", letterSpacing: "0.25em" }}>CHARACTER DATA</span>
              <div className="flex gap-1">
                {[1,2,3].map(n => (
                  <div key={n} className="w-1.5 h-1.5 rounded-full" style={{ background: n === 1 ? "var(--red)" : "rgba(255,0,51,0.3)" }} />
                ))}
              </div>
            </div>

            {/* Corner brackets */}
            {[
              { top: 28, left: 0 },
              { top: 28, right: 0 },
              { bottom: 0, left: 0 },
              { bottom: 0, right: 0 },
            ].map((pos, i) => (
              <div key={i} className="absolute w-5 h-5 pointer-events-none" style={{
                ...pos,
                borderTop: i < 2 ? "2px solid var(--red)" : "none",
                borderBottom: i >= 2 ? "2px solid var(--red)" : "none",
                borderLeft: i % 2 === 0 ? "2px solid var(--red)" : "none",
                borderRight: i % 2 === 1 ? "2px solid var(--red)" : "none",
              }} />
            ))}

            {/* Character art */}
            <div className="absolute left-0 right-0 flex justify-center" style={{ top: 28, bottom: 0 }}>
              <svg viewBox="0 0 240 400" width="240" height="360" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="bg2" cx="50%" cy="90%" r="55%">
                    <stop offset="0%" stopColor="#ff0033" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#ff0033" stopOpacity="0" />
                  </radialGradient>
                  <filter id="softglow">
                    <feGaussianBlur stdDeviation="2.5" result="b"/>
                    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                </defs>
                <rect width="240" height="400" fill="url(#bg2)"/>

                {/* Hair back */}
                <path d="M72 95 Q60 55 78 18 Q95 -2 120 5 Q145 -2 162 18 Q180 55 168 95" fill="#1c0012" stroke="none"/>
                <path d="M60 105 Q40 75 52 35 Q68 8 90 12 L80 85Z" fill="#1c0012"/>
                <path d="M180 105 Q200 75 188 35 Q172 8 150 12 L160 85Z" fill="#1c0012"/>
                {/* Long hair strands */}
                <path d="M62 100 Q40 130 42 180 Q46 195 56 190 Q50 145 65 115Z" fill="#1c0012" stroke="#ff003318" strokeWidth="0.5"/>
                <path d="M178 100 Q200 130 198 180 Q194 195 184 190 Q190 145 175 115Z" fill="#1c0012" stroke="#ff003318" strokeWidth="0.5"/>

                {/* Head */}
                <ellipse cx="120" cy="105" rx="52" ry="56" fill="#160010" stroke="#ff003355" strokeWidth="0.8"/>

                {/* Hair front */}
                <path d="M70 88 Q88 50 120 55 Q152 50 170 88 Q150 32 120 38 Q90 32 70 88Z" fill="#200015"/>
                <path d="M70 88 Q75 70 85 72 L82 90Z" fill="#200015"/>
                <path d="M170 88 Q165 70 155 72 L158 90Z" fill="#200015"/>

                {/* Eyes */}
                <ellipse cx="99" cy="107" rx="11" ry="8" fill="#0c0008"/>
                <ellipse cx="141" cy="107" rx="11" ry="8" fill="#0c0008"/>
                <ellipse cx="99" cy="108" rx="7" ry="5.5" fill="#cc0028" filter="url(#softglow)"/>
                <ellipse cx="141" cy="108" rx="7" ry="5.5" fill="#cc0028" filter="url(#softglow)"/>
                <circle cx="96" cy="106" r="2.5" fill="white" opacity="0.9"/>
                <circle cx="138" cy="106" r="2.5" fill="white" opacity="0.9"/>
                {/* Eye lines */}
                <path d="M88 101 Q97 97 110 100" stroke="#ff003370" strokeWidth="1.5" fill="none"/>
                <path d="M130 100 Q143 97 152 101" stroke="#ff003370" strokeWidth="1.5" fill="none"/>

                {/* Nose hint */}
                <path d="M117 122 Q120 126 123 122" stroke="#ff003340" strokeWidth="1" fill="none" strokeLinecap="round"/>
                {/* Mouth */}
                <path d="M107 132 Q120 141 133 132" stroke="#ff005060" strokeWidth="1.5" fill="none" strokeLinecap="round"/>

                {/* Neck */}
                <path d="M106 156 L106 178 Q120 183 134 178 L134 156 Q127 162 120 162 Q113 162 106 156Z" fill="#160010" stroke="#ff003330" strokeWidth="0.5"/>

                {/* Choker */}
                <rect x="105" y="172" width="30" height="6" rx="3" fill="#ff0033" opacity="0.85"/>
                <circle cx="120" cy="175" r="2" fill="white" opacity="0.6"/>

                {/* Body */}
                <path d="M72 185 Q95 174 106 183 L108 295 Q92 305 74 308 Q58 296 54 268Z" fill="#140010" stroke="#ff003325" strokeWidth="0.8"/>
                <path d="M168 185 Q145 174 134 183 L132 295 Q148 305 166 308 Q182 296 186 268Z" fill="#140010" stroke="#ff003325" strokeWidth="0.8"/>
                <path d="M106 183 Q120 177 134 183 L136 300 Q120 312 104 300Z" fill="#180012" stroke="#ff003335" strokeWidth="0.8"/>
                <path d="M106 183 L120 207 L134 183" stroke="#ff0033" strokeWidth="1.5" fill="none" strokeLinecap="round"/>

                {/* Outfit details */}
                <path d="M108 215 Q120 210 132 215" stroke="#ff003350" strokeWidth="1" fill="none"/>
                <path d="M85 230 Q78 225 75 235" stroke="#ff003340" strokeWidth="1" fill="none"/>
                <path d="M155 230 Q162 225 165 235" stroke="#ff003340" strokeWidth="1" fill="none"/>

                {/* Arms */}
                <path d="M72 190 Q50 220 46 265 Q52 285 62 292 Q72 272 76 240 Q78 215 78 192Z" fill="#140010" stroke="#ff003325" strokeWidth="0.8"/>
                <ellipse cx="55" cy="298" rx="12" ry="14" fill="#160010" stroke="#ff003345" strokeWidth="0.8"/>
                <path d="M168 190 Q190 220 194 265 Q188 285 178 292 Q168 272 164 240 Q162 215 162 192Z" fill="#140010" stroke="#ff003325" strokeWidth="0.8"/>
                <ellipse cx="185" cy="298" rx="12" ry="14" fill="#160010" stroke="#ff003345" strokeWidth="0.8"/>

                {/* Skirt */}
                <path d="M80 298 Q100 308 120 312 Q140 308 160 298 L168 388 Q120 400 72 388Z" fill="#110010" stroke="#ff003325" strokeWidth="0.8"/>
                <path d="M85 305 L76 382" stroke="#ff003218" strokeWidth="0.5"/>
                <path d="M108 311 L103 394" stroke="#ff003218" strokeWidth="0.5"/>
                <path d="M132 311 L137 394" stroke="#ff003218" strokeWidth="0.5"/>
                <path d="M155 305 L164 382" stroke="#ff003218" strokeWidth="0.5"/>

                {/* Decorative elements */}
                <path d="M28 165 L32 171 L28 177 L24 171Z" fill="#ff0033" opacity="0.5"/>
                <path d="M212 148 L216 154 L212 160 L208 154Z" fill="#ff0033" opacity="0.35"/>
                <circle cx="32" cy="210" r="2" fill="#ff0033" opacity="0.3"/>
                <circle cx="208" cy="230" r="1.5" fill="#ff0033" opacity="0.3"/>
                <path d="M20 250 L23 250" stroke="#ff0033" strokeWidth="1" opacity="0.4"/>
                <path d="M217 250 L220 250" stroke="#ff0033" strokeWidth="1" opacity="0.4"/>

                {/* Ground reflection glow */}
                <ellipse cx="120" cy="396" rx="72" ry="7" fill="#ff0033" opacity="0.12" filter="url(#softglow)"/>
              </svg>
            </div>

            {/* Stat bars overlay */}
            <div className="absolute bottom-3 left-3 right-3">
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                {stats.map((s) => (
                  <div key={s.label} className="flex items-center justify-between">
                    <span style={{ color: "var(--red)", fontSize: "0.55rem", letterSpacing: "0.2em" }}>{s.label}</span>
                    <span className="font-mono" style={{ fontSize: "0.65rem", color: "var(--text)" }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Scan line */}
            <div className="absolute left-0 right-0 pointer-events-none overflow-hidden" style={{ top: 28, bottom: 40 }}>
              <div style={{
                position: "absolute", left: 0, right: 0, height: 50,
                background: "linear-gradient(transparent, rgba(255,0,51,0.04), transparent)",
                animation: "scanline 5s linear infinite",
              }} />
            </div>
          </div>
        </div>

        {/* ── RIGHT: Text & Cards ── */}
        <div>
          <p className="section-label reveal">About</p>
          <h2 className="heading-serif mb-8 reveal delay-1" style={{ fontSize: "clamp(2.5rem,5vw,3.5rem)" }}>
            暗闇に咲く、<br />
            <span style={{ color: "var(--red)" }}>赤い花</span>
          </h2>
          <p className="text-sm leading-8 mb-5 reveal delay-2" style={{ color: "var(--text-muted)" }}>
            2022年よりバーチャル空間から配信活動を開始。
            ホラーゲームを笑いながらクリアし、激しいFPSで敵を蹴散らし、
            深夜の雑談で視聴者の心を掴む——それが星奈ゆめのスタイル。
          </p>
          <p className="text-sm leading-8 mb-10 reveal delay-3" style={{ color: "var(--text-muted)" }}>
            「強くてカッコいい」だけじゃない、人間らしい弱さと熱量を持つVTuber。
            あなたの夜を、もっと特別なものに。
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-2 gap-3 reveal delay-4">
            {[
              { icon: "🎮", title: "Gamer", desc: "FPS・RPG・ホラー何でもこなす万能ゲーマー" },
              { icon: "🎤", title: "Singer", desc: "月1カラオケ配信で喉を酷使する歌い手" },
              { icon: "🌙", title: "Night Owl", desc: "深夜配信が得意な夜型VTuber" },
              { icon: "🔥", title: "Challenger", desc: "どんな困難も正面突破するスタイル" },
            ].map((card) => (
              <div key={card.title} className="card-cyber p-5">
                <div className="text-2xl mb-2">{card.icon}</div>
                <div className="heading-serif text-base mb-1" style={{ color: "var(--red)" }}>{card.title}</div>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{card.desc}</p>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6 reveal delay-5">
            {tags.map((t) => (
              <span key={t} className="px-3 py-1 text-xs tracking-widest uppercase" style={{
                border: "1px solid rgba(255,0,51,0.25)", color: "var(--text-muted)",
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
