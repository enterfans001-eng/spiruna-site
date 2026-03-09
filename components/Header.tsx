"use client";
import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const doc = document.documentElement;
      const pct = (window.scrollY / (doc.scrollHeight - doc.clientHeight)) * 100;
      setProgress(Math.min(pct, 100));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/#concept", label: "Concept" },
    { href: "/#talents", label: "Creators" },
    { href: "/#news", label: "News" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* Scroll progress bar */}
      <div
        id="scroll-progress"
        style={{ width: `${progress}%` }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "border-b" : ""
        }`}
        style={{
          background: scrolled ? "rgba(6,6,8,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          borderColor: scrolled ? "rgba(255,0,51,0.15)" : "transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center" style={{ padding: "4px 0" }}>
            <img src="/logo-spiruna.png" alt="SPIRUNA" style={{ height: 32, width: "auto" }} />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-xs tracking-widest uppercase transition-colors duration-200"
                style={{ color: "var(--text-muted)", letterSpacing: "0.2em" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--red)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                {l.label}
              </a>
            ))}
            <a
              href="/#audition"
              className="btn-primary text-xs"
            >
              <span>✦</span> AUDITION
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block h-px w-6 transition-all duration-300"
                style={{
                  background: "var(--text)",
                  transform: menuOpen
                    ? i === 0 ? "rotate(45deg) translateY(8px)" : i === 2 ? "rotate(-45deg) translateY(-8px)" : "scaleX(0)"
                    : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300"
          style={{
            maxHeight: menuOpen ? "360px" : "0",
            borderTop: menuOpen ? "1px solid rgba(255,0,51,0.15)" : "none",
            background: "rgba(6,6,8,0.97)",
          }}
        >
          <div className="px-6 py-6 flex flex-col gap-5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm tracking-widest uppercase"
                style={{ color: "var(--text-muted)", letterSpacing: "0.2em" }}
              >
                {l.label}
              </a>
            ))}
            <a href="/#audition" onClick={() => setMenuOpen(false)} className="btn-primary text-xs w-fit">
              <span>✦</span> AUDITION
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
