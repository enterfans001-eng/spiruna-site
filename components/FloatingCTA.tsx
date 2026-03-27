"use client";
import { useEffect, useState } from "react";

export default function FloatingCTA({ href = "/audition", external = false }: { href?: string; external?: boolean }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const circleText = "V CREATOR Audition \u00B7 V CREATOR Audition \u00B7 ";

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label="V CREATOR 募集中"
      className="floating-cta-outer"
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 9999,
        width: 150,
        height: 150,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.4s ease, transform 0.4s ease",
        transform: visible ? "scale(1)" : "scale(0.8)",
        textDecoration: "none",
        cursor: "pointer",
      }}
    >
      <style>{`
        @keyframes cta-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .floating-cta-ring { animation: cta-spin 15s linear infinite; }
        .floating-cta-wrap:hover .floating-cta-ring { animation-duration: 6s; }
        .floating-cta-wrap:hover .floating-cta-center {
          background: var(--red) !important;
          border-color: var(--red) !important;
          transform: scale(1.05);
        }
        .floating-cta-wrap:hover .floating-cta-label { color: #fff !important; }
        @media (max-width: 640px) {
          .floating-cta-outer { width: 105px !important; height: 105px !important; bottom: 5rem !important; right: 0.75rem !important; }
          .floating-cta-inner-circle { width: 72px !important; height: 72px !important; }
          .floating-cta-label { font-size: 0.55rem !important; }
        }
      `}</style>

      <div className="floating-cta-wrap" style={{ position: "relative", width: "100%", height: "100%" }}>
        {/* Rotating circle text */}
        <svg
          className="floating-cta-ring"
          viewBox="0 0 100 100"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        >
          <defs>
            <path
              id="floatingCirclePath"
              d="M 50,50 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
            />
          </defs>
          <text
            style={{
              fontSize: "7.8px",
              fill: "var(--red)",
              letterSpacing: "1.5px",
              fontFamily: "var(--font-cyber)",
            }}
          >
            <textPath href="#floatingCirclePath">{circleText}</textPath>
          </text>
        </svg>

        {/* Center button */}
        <div
          className="floating-cta-center floating-cta-inner-circle"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 102,
            height: 102,
            borderRadius: "50%",
            background: "rgba(255,0,51,0.08)",
            border: "1px solid rgba(255,0,51,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            transition: "background 0.3s, border-color 0.3s, transform 0.3s",
          }}
        >
          <span
            className="floating-cta-label"
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "var(--red)",
              lineHeight: 1.4,
              textAlign: "center",
              letterSpacing: "0.05em",
              transition: "color 0.3s",
            }}
          >
            V CREATOR
            <br />
            募集中！
          </span>
        </div>
      </div>
    </a>
  );
}
