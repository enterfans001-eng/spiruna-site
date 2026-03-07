"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import type { Talent } from "@/lib/microcms";

type Props = { talents: Talent[] };

export default function Talents({ talents }: Props) {
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
    <section id="talents" ref={sectionRef} className="relative overflow-hidden" style={{ background: "var(--bg)", padding: "6rem 0" }}>
      <style>{`
        .talent-card { transition: transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s; }
        .talent-card:hover { transform: translateY(-10px); box-shadow: 0 30px 80px rgba(0,0,0,0.4); }
        .talent-card .char-full { transition: transform 0.6s cubic-bezier(0.16,1,0.3,1), filter 0.4s; }
        .talent-card:hover .char-full { transform: scale(1.06) translateY(-4px); }
        .talent-card .char-sd { opacity: 1; transform: translateY(0) scale(1); transition: opacity 0.4s, transform 0.5s cubic-bezier(0.16,1,0.3,1); }
        .talent-card:hover .char-sd { transform: translateY(-4px) scale(1.1); }
        .talent-card .name-en-bg { transition: opacity 0.4s, transform 0.6s; opacity: 1; transform: translateY(0); }
        .talent-card:hover .name-en-bg { opacity: 1; transform: translateY(-4px); }
        .talent-card .accent-line { transform: scaleX(1); transition: transform 0.5s cubic-bezier(0.16,1,0.3,1); transform-origin: left; }
        .talent-card:hover .accent-line { transform: scaleX(1); }
        .talent-card .glow-ring { opacity: 1; transition: opacity 0.5s; }
        .talent-card:hover .glow-ring { opacity: 1; }
        .talent-card .tag-badge { opacity: 1; transform: translateX(0); transition: opacity 0.3s 0.1s, transform 0.4s 0.1s; }
        .talent-card:hover .tag-badge { opacity: 1; transform: translateX(0); }
        @media (max-width: 768px) {
          .talents-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .talents-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" style={{
        width: 500, height: 800,
        background: "radial-gradient(ellipse at right, rgba(255,0,51,0.05) 0%, transparent 65%)",
      }} />

      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "3.5rem" }}>
          <div>
            <p className="section-label reveal">Our Creators</p>
            <h2 className="heading-serif reveal delay-1" style={{ fontSize: "clamp(2.5rem,5vw,4rem)" }}>CREATORS</h2>
          </div>
        </div>

        <div className="talents-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
          {talents.map((t, i) => (
            <Link
              key={t.talentId}
              href={`/talents/${t.slug}`}
              className={`talent-card card-cyber group cursor-pointer reveal delay-${(i % 3) + 1} overflow-hidden`}
              style={{ textDecoration: "none", display: "block" }}
            >
              {/* Image panel */}
              <div className="relative overflow-hidden" style={{ height: 340, background: t.gradient }}>
                {/* Grid pattern */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  backgroundImage: `linear-gradient(${t.accent}06 1px,transparent 1px),linear-gradient(90deg,${t.accent}06 1px,transparent 1px)`,
                  backgroundSize: "32px 32px",
                }} />

                {/* Bottom glow */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: `radial-gradient(ellipse 70% 50% at 50% 100%, ${t.accent}35 0%, transparent 100%)`,
                }} />

                {/* Glow ring */}
                <div className="glow-ring absolute inset-0 pointer-events-none" style={{
                  background: `radial-gradient(circle at 50% 80%, ${t.accent}25 0%, transparent 50%)`,
                }} />

                {/* Top ambient glow */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${t.accent}12 0%, transparent 100%)`,
                }} />

                {/* Background name text */}
                <div className="name-en-bg absolute pointer-events-none" style={{
                  bottom: "1rem", left: "50%", transform: "translateX(-50%)",
                  whiteSpace: "nowrap", fontSize: "3rem", fontWeight: 900,
                  fontFamily: "var(--font-heading), serif", letterSpacing: "0.08em",
                  color: `${t.accent}18`, userSelect: "none", lineHeight: 1,
                }}>
                  {t.nameEn}
                </div>

                {/* Full character */}
                {t.fullImg?.url && (
                <div className="absolute inset-0 flex items-start justify-center overflow-hidden">
                  <img
                    src={t.fullImg.url}
                    alt={t.name}
                    className="char-full relative z-10"
                    style={{
                      height: "160%",
                      objectFit: "contain",
                      objectPosition: "top",
                      marginTop: "5%",
                      filter: "drop-shadow(0 0 24px rgba(0,0,0,0.5))",
                    }}
                  />
                </div>
                )}

                {/* SD character - appears on hover */}
                {t.sdImg?.url && (
                <div className="absolute z-20 pointer-events-none" style={{ bottom: "0.5rem", right: "0.75rem" }}>
                  <img
                    src={t.sdImg.url}
                    alt={`${t.name} SD`}
                    className="char-sd"
                    style={{
                      height: 160,
                      objectFit: "contain",
                      filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.6))",
                    }}
                  />
                </div>
                )}

                {/* Tag badge on hover */}
                <div className="tag-badge absolute z-20" style={{ top: "0.75rem", left: "0.75rem" }}>
                  <span style={{
                    background: `${t.accent}20`, border: `1px solid ${t.accent}50`,
                    color: t.accent, fontSize: "0.6rem", letterSpacing: "0.1em",
                    padding: "0.25rem 0.6rem", display: "inline-block",
                  }}>
                    {t.tag.split("·")[0].trim()}
                  </span>
                </div>

                {/* ID badge */}
                <div className="absolute z-20" style={{ top: "0.75rem", right: "0.75rem" }}>
                  <span style={{
                    fontSize: "0.6rem", letterSpacing: "0.15em", fontFamily: "monospace",
                    color: `${t.accent}80`,
                  }}>
                    {t.talentId}
                  </span>
                </div>

                {/* Accent line bottom */}
                <div className="accent-line absolute bottom-0 left-0 right-0 z-20" style={{ height: 3, background: t.accent }} />
              </div>

              {/* Name section */}
              <div style={{ padding: "1.25rem 1.5rem", textAlign: "center", position: "relative" }}>
                <h3 className="heading-serif group-hover:text-red-400 transition-colors duration-300" style={{ fontSize: "1.25rem", marginBottom: "0.25rem" }}>
                  {t.name}
                </h3>
                <p style={{ fontSize: "0.7rem", fontFamily: "monospace", color: "var(--text-muted)", letterSpacing: "0.12em" }}>
                  {t.nameEn}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center reveal delay-3" style={{ marginTop: "3rem" }}>
          <a href="/talents" className="btn-ghost" style={{ fontSize: "0.75rem" }}>MORE CREATORS →</a>
        </div>
      </div>
    </section>
  );
}
