"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Contact() {
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
    <section id="contact" ref={sectionRef} className="relative overflow-hidden" style={{ background: "var(--bg)", padding: "6rem 0" }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,0,51,0.04) 0%, transparent 70%)",
      }} />

      <div style={{ maxWidth: "48rem", margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
        <div className="reveal">
          <p className="section-label" style={{ justifyContent: "center" }}>Contact</p>
          <h2 className="heading-serif" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "1rem" }}>
            お問い合わせ
          </h2>
          <p className="reveal delay-1" style={{ fontSize: "0.85rem", lineHeight: 2, color: "var(--text-muted)", maxWidth: "32rem", margin: "0 auto 2.5rem" }}>
            当事務所、所属Vライバーへの問い合わせや、<br />
            ライバー応募は下記よりお気軽にご連絡ください。
          </p>
        </div>

        <div className="reveal delay-2">
          <Link
            href="/contact"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              padding: "1rem 3.5rem",
              background: "var(--red)", color: "#fff",
              fontSize: "0.85rem", letterSpacing: "0.2em", fontWeight: 700,
              border: "1px solid var(--red)",
              textDecoration: "none",
              transition: "background 0.2s, transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--red)";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 0 30px rgba(255,0,51,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--red)";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            お問い合わせはこちら →
          </Link>
        </div>
      </div>
    </section>
  );
}
