"use client";
import { useEffect, useRef } from "react";

const schedule = [
  { day: "MON", label: "月曜", type: "Gaming", title: "週始めのFPS大会", time: "21:00", live: false },
  { day: "WED", label: "水曜", type: "Zatsudan", title: "深夜雑談 & Superchat読み", time: "23:00", live: false },
  { day: "FRI", label: "金曜", type: "Horror", title: "ホラーゲーム生配信", time: "22:00", live: true },
  { day: "SAT", label: "土曜", type: "Karaoke", title: "週末カラオケ配信", time: "20:00", live: false },
  { day: "SUN", label: "日曜", type: "Special", title: "コラボ・特別企画", time: "19:00", live: false },
];

const typeColors: Record<string, string> = {
  Gaming: "#ff0033",
  Zatsudan: "#ff6633",
  Horror: "#cc0044",
  Karaoke: "#ff3366",
  Special: "#ff0066",
};

export default function Schedule() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) => {
              el.classList.add("visible");
            });
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
      id="schedule"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Background accent */}
      <div
        className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
        style={{
          background: "radial-gradient(circle at top right, rgba(255,0,51,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-16">
          <p className="section-label reveal">Stream Schedule</p>
          <h2 className="heading-serif text-5xl md:text-6xl reveal delay-1">
            配信スケジュール
          </h2>
        </div>

        <div className="space-y-3">
          {schedule.map((item, i) => (
            <div
              key={item.day}
              className={`reveal delay-${i + 1} flex items-center gap-6 p-5 group cursor-pointer transition-all duration-300`}
              style={{
                border: "1px solid",
                borderColor: item.live ? "rgba(255,0,51,0.5)" : "rgba(255,0,51,0.1)",
                background: item.live ? "rgba(255,0,51,0.05)" : "var(--surface)",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,0,51,0.5)";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,0,51,0.05)";
              }}
              onMouseLeave={(e) => {
                if (!item.live) {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,0,51,0.1)";
                  (e.currentTarget as HTMLElement).style.background = "var(--surface)";
                }
              }}
            >
              {/* Left accent line */}
              <div
                className="absolute left-0 top-0 bottom-0 w-0.5 transition-all duration-300 group-hover:opacity-100"
                style={{ background: typeColors[item.type] || "var(--red)", opacity: item.live ? 1 : 0 }}
              />

              {/* Day */}
              <div className="w-16 text-center shrink-0">
                <div className="heading-serif text-xl" style={{ color: "var(--red)" }}>
                  {item.day}
                </div>
                <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {item.label}
                </div>
              </div>

              {/* Type badge */}
              <div
                className="shrink-0 px-2 py-0.5 text-xs tracking-widest"
                style={{
                  border: `1px solid ${typeColors[item.type]}40`,
                  color: typeColors[item.type],
                }}
              >
                {item.type}
              </div>

              {/* Title */}
              <div className="flex-1">
                <div className="text-sm font-medium">{item.title}</div>
              </div>

              {/* Time */}
              <div className="shrink-0 text-right">
                <div className="heading-serif text-lg">{item.time}</div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>JST</div>
              </div>

              {/* Live badge */}
              {item.live && (
                <div
                  className="shrink-0 px-3 py-1 text-xs font-bold tracking-widest flex items-center gap-1.5"
                  style={{ background: "var(--red)" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  LIVE
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 text-center reveal delay-5">
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost text-xs"
          >
            全スケジュールをチェック →
          </a>
        </div>
      </div>
    </section>
  );
}
