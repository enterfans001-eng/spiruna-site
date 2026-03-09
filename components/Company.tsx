"use client";
import { useEffect, useRef } from "react";

const rows = [
  ["運営会社", "株式会社エンターファンズ"],
  ["レーベル名", "Spiruna（スピルナ）"],
  ["事業内容", "TikTok Vクリエイターのマネジメント、プロデュース"],
];

export default function Company() {
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
    <section id="company" ref={sectionRef} className="py-20" style={{ background: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="md:flex md:gap-16 reveal">
          <div className="md:flex-shrink-0 mb-8 md:mb-0">
            <p className="section-label mb-4">Company</p>
            <h2 className="heading-serif text-3xl sm:text-4xl">会社概要</h2>
          </div>
          <div className="flex-1">
            <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
              <tbody>
                {rows.map(([label, value]) => (
                  <tr key={label} style={{ borderBottom: "1px solid rgba(255,0,51,0.1)" }}>
                    <td className="py-5 pr-8 whitespace-nowrap font-mono text-xs tracking-widest" style={{ color: "var(--red)", width: 140 }}>{label}</td>
                    <td className="py-5" style={{ color: "rgba(255,255,255,0.65)" }}>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
