"use client";
export default function Footer() {
  const navGroups = [
    {
      label: "Agency",
      links: [
        { href: "/#concept", label: "Concept" },
        { href: "/#talents", label: "Creators" },
        { href: "/#news", label: "News" },
      ],
    },
    {
      label: "Join Us",
      links: [
        { href: "/#audition", label: "Audition" },
        { href: "/contact", label: "Contact" },
      ],
    },
    {
      label: "Follow",
      links: [
        { href: "https://www.tiktok.com/@v_spiruna", label: "TikTok" },
        { href: "https://x.com/Spiruna_info", label: "X / Twitter" },
      ],
    },
  ];

  return (
    <footer
      className="relative border-t"
      style={{ borderColor: "rgba(255,0,51,0.1)", background: "var(--bg)" }}
    >
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "4rem 1.5rem" }}>
        <div className="grid md:grid-cols-4" style={{ gap: "3rem", marginBottom: "3rem" }}>
          {/* Logo + description */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <img
                src="/logo-spiruna.png"
                alt="Spiruna"
                style={{ height: 64, width: "auto" }}
              />
            </div>
            <p className="text-xs leading-6" style={{ color: "var(--text-muted)" }}>
              TikTok V Virtual Agency<br />
              次世代バーチャルクリエイターの<br />
              発掘・育成・マネジメント
            </p>
          </div>

          {/* Nav groups */}
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="text-xs tracking-widest mb-5 uppercase" style={{ color: "var(--red)", letterSpacing: "0.2em" }}>
                {group.label}
              </p>
              <nav className="flex flex-col gap-3">
                {group.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-xs transition-colors duration-200"
                    style={{ color: "var(--text-muted)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between" style={{ paddingTop: "2rem", borderTop: "1px solid rgba(255,0,51,0.08)", gap: "1rem" }}>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            © 2026 Spiruna Agency. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {[
              { label: "プライバシーポリシー", href: "/privacy" },
              { label: "二次創作ガイドライン", href: "/guidelines" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-xs transition-colors duration-200"
                style={{ color: "var(--text-muted)", fontSize: "0.65rem" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
