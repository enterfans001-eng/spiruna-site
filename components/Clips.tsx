"use client";
import { useEffect, useRef } from "react";

const clips = [
  {
    id: 1,
    title: "ホラゲでガチ絶叫した結果…",
    views: "124万回", likes: "8.2万",
    duration: "8:32",
    gradient: "linear-gradient(135deg, #1a0008 0%, #0d0020 100%)",
    accent: "#ff0033",
    category: "Horror",
    icon: "👻",
    date: "2025.01.18",
  },
  {
    id: 2,
    title: "FPS初心者がプロに勝った瞬間",
    views: "87万回", likes: "5.4万",
    duration: "12:04",
    gradient: "linear-gradient(135deg, #0a0a20 0%, #150010 100%)",
    accent: "#ff3300",
    category: "Gaming",
    icon: "🎯",
    date: "2025.01.12",
  },
  {
    id: 3,
    title: "深夜3時の限界雑談が面白すぎた",
    views: "203万回", likes: "14.1万",
    duration: "45:21",
    gradient: "linear-gradient(135deg, #050015 0%, #100008 100%)",
    accent: "#cc00ff",
    category: "Zatsudan",
    icon: "🌙",
    date: "2024.12.28",
  },
  {
    id: 4,
    title: "カラオケで声が出なくなった話",
    views: "56万回", likes: "3.8万",
    duration: "6:48",
    gradient: "linear-gradient(135deg, #15000a 0%, #0a0018 100%)",
    accent: "#ff0055",
    category: "Karaoke",
    icon: "🎤",
    date: "2024.12.15",
  },
  {
    id: 5,
    title: "10時間ゲームマラソン最終局面",
    views: "98万回", likes: "6.9万",
    duration: "2:14:33",
    gradient: "linear-gradient(135deg, #100a00 0%, #0f0010 100%)",
    accent: "#ff6600",
    category: "Gaming",
    icon: "⚡",
    date: "2024.12.01",
  },
  {
    id: 6,
    title: "ファン1000人とリアルタイム対戦",
    views: "312万回", likes: "22.6万",
    duration: "1:02:11",
    gradient: "linear-gradient(135deg, #0a0010 0%, #150008 100%)",
    accent: "#ff0033",
    category: "Special",
    icon: "🏆",
    date: "2024.11.20",
  },
];

export default function Clips() {
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
    <section id="clips" ref={sectionRef} className="relative py-32 overflow-hidden" style={{ background: "var(--bg)" }}>

      {/* BG accent */}
      <div className="absolute right-0 top-0 w-96 h-96 pointer-events-none" style={{
        background: "radial-gradient(ellipse at top right, rgba(255,0,51,0.05) 0%, transparent 70%)",
      }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-4">
          <div>
            <p className="section-label reveal">Popular Clips</p>
            <h2 className="heading-serif text-5xl md:text-6xl reveal delay-1">人気クリップ</h2>
          </div>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="btn-ghost text-xs reveal delay-2">
            全動画を見る →
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {clips.map((clip, i) => (
            <div
              key={clip.id}
              className={`card-cyber group cursor-pointer reveal delay-${(i % 3) + 1} overflow-hidden`}
            >
              {/* Thumbnail */}
              <div className="relative overflow-hidden" style={{ height: 190, background: clip.gradient }}>

                {/* Grid pattern on thumbnail */}
                <div className="absolute inset-0 pointer-events-none opacity-30" style={{
                  backgroundImage: `linear-gradient(${clip.accent}18 1px,transparent 1px),linear-gradient(90deg,${clip.accent}18 1px,transparent 1px)`,
                  backgroundSize: "40px 40px",
                }} />

                {/* Glow from center-bottom */}
                <div className="absolute inset-0" style={{
                  background: `radial-gradient(ellipse 60% 40% at 50% 100%, ${clip.accent}25 0%, transparent 100%)`,
                }} />

                {/* Large icon centered */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="text-6xl transition-transform duration-500 group-hover:scale-110"
                    style={{ filter: "drop-shadow(0 0 20px rgba(255,0,51,0.4))" }}
                  >
                    {clip.icon}
                  </span>
                </div>

                {/* Channel badge (top-left) */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "var(--red)" }}>
                    Y
                  </div>
                  <span className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.7)" }}>星奈ゆめ</span>
                </div>

                {/* Category (top-right) */}
                <div className="absolute top-3 right-3 px-2 py-0.5 text-xs tracking-widest" style={{
                  background: `${clip.accent}cc`, fontSize: "0.6rem", letterSpacing: "0.15em",
                }}>
                  {clip.category}
                </div>

                {/* Duration (bottom-right) */}
                <div className="absolute bottom-3 right-3 px-2 py-0.5 text-xs font-mono" style={{ background: "rgba(0,0,0,0.85)" }}>
                  {clip.duration}
                </div>

                {/* Date (bottom-left) */}
                <div className="absolute bottom-3 left-3 text-xs" style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.65rem" }}>
                  {clip.date}
                </div>

                {/* Play overlay on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "rgba(0,0,0,0.55)" }}>
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl pl-1 transition-transform duration-200 group-hover:scale-110" style={{ background: "var(--red)", boxShadow: "0 0 30px rgba(255,0,51,0.5)" }}>
                    ▶
                  </div>
                </div>

                {/* Bottom scan line on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: clip.accent }} />
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="text-sm font-medium mb-3 leading-snug group-hover:text-red-400 transition-colors duration-200" style={{ letterSpacing: "0.01em" }}>
                  {clip.title}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs" style={{ color: "var(--text-muted)" }}>
                    <span className="flex items-center gap-1">
                      <span style={{ color: clip.accent }}>▶</span>
                      {clip.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <span style={{ color: clip.accent }}>♥</span>
                      {clip.likes}
                    </span>
                  </div>
                  <div className="w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--red)" }}>
                    →
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
