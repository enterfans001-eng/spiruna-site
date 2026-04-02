"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { type Talent, optimizeImg } from "@/lib/microcms";

/* ─── Data ─── */

const LINE_URL = "https://lin.ee/Xj5yngP";

declare global {
  interface Window { fbq?: (...args: unknown[]) => void; }
}

/** Fire Meta Pixel CompleteRegistration on CTA click */
function trackCTAClick() {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "CompleteRegistration");
  }
}

const merits = [
  {
    num: "01",
    title: "Gaming PC",
    titleJa: "ゲーミングPC無料貸出",
    desc: "Spirunaでは過去に配信実績があるクリエイター限定で、高性能PCの無料貸出及び、LIVE2Dの無料提供を行っております。",
    accent: "#ff0033",
    icon: "",
  },
  {
    num: "02",
    title: "Events Projects",
    titleJa: "年間1億円以上投資する事務所イベントと企業案件",
    desc: "Spirunaでは、運営会社の強力なバックアップで魅力的な事務所イベントを数々手掛けています。あなたの活躍の幅をより広げるイベント、企業案件を提供します。",
    accent: "#cc00ff",
    icon: "",
  },
  {
    num: "03",
    title: "Manager Support",
    titleJa: "充実のマネージャー体制",
    desc: "Spirunaは業界最大規模の正社員数を抱えており、クリエイター1名毎に専門のマネージャーが付きます。業界歴が長い専門マネージャーがあなたをゴールに近づけます。",
    accent: "#00f0ff",
    icon: "",
  },
];

const fallbackTalents: Talent[] = [
  {
    id: "1", createdAt: "", updatedAt: "", publishedAt: "", revisedAt: "",
    name: "クリエイター1", nameEn: "Creator 01",
    accent: "#ff0033",
    fullImg: { url: "/talent1-full.webp", width: 800, height: 1200 },
    slug: "creator-1",
  },
  {
    id: "2", createdAt: "", updatedAt: "", publishedAt: "", revisedAt: "",
    name: "クリエイター2", nameEn: "Creator 02",
    accent: "#3366ff",
    fullImg: { url: "/talent2-full.webp", width: 800, height: 1200 },
    slug: "creator-2",
  },
  {
    id: "3", createdAt: "", updatedAt: "", publishedAt: "", revisedAt: "",
    name: "クリエイター3", nameEn: "Creator 03",
    accent: "#ff0033",
    fullImg: { url: "/talent3-full.webp", width: 800, height: 1200 },
    slug: "creator-3",
  },
  {
    id: "4", createdAt: "", updatedAt: "", publishedAt: "", revisedAt: "",
    name: "クリエイター4", nameEn: "Creator 04",
    accent: "#3366ff",
    fullImg: { url: "/talent1-full.webp", width: 800, height: 1200 },
    slug: "creator-4",
  },
];

const steps = [
  { num: "01", label: "エントリー", desc: "公式LINEから必要事項を入力して応募。" },
  { num: "02", label: "書類選考", desc: "プロフィール・志望動機を審査。1週間以内に結果をお知らせします。" },
  { num: "03", label: "面接", desc: "オンライン面接でビジョンと個性を確認。" },
  { num: "04", label: "デビュー", desc: "Spirunaの一員として、バーチャルの世界へ。" },
];

const faqs = [
  {
    q: "配信経験がなくても応募できますか？",
    a: "はい、経験は不問です。やる気と個性を最も重視しています。未経験の方でも、Spirunaの育成プログラムでしっかりサポートします。",
  },
  {
    q: "必要な機材はありますか？",
    a: "配信可能なPCがあれば始められます。持っていない方でも、過去の配信実績や見込みがあると判断した方は、高性能ゲーミングPCの無料貸出制度を受けられます。",
  },
  {
    q: "活動頻度はどのくらいですか？",
    a: "基本的には週5〜7日、2時間以上の配信を推奨しておりますが、ライフスタイルに合わせて柔軟に調整可能です。副業としての配信も歓迎しております。",
  },
  {
    q: "報酬体系はどうなっていますか？",
    a: "詳細は面接時にご説明しますが、案件報酬・TikTok収益・グッズ売上など複数の収益源を用意しています。",
  },
  {
    q: "年齢制限はありますか？",
    a: "18歳以上の方が対象です。未成年の方は保護者の同意が必要となります。",
  },
  {
    q: "違約金やノルマはありますか？",
    a: "どちらも一切ございません。安心してご活動頂ける体制を整えております。",
  },
];

/* ─── FAQ Item ─── */

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`reveal delay-${(index % 3) + 1}`}
      style={{
        borderBottom: "1px solid rgba(255,0,51,0.1)",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          padding: "1.25rem 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          color: "var(--text)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span
            style={{
              fontSize: "0.65rem",
              fontFamily: "monospace",
              color: "var(--red)",
              letterSpacing: "0.1em",
              flexShrink: 0,
            }}
          >
            Q.{String(index + 1).padStart(2, "0")}
          </span>
          <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>{q}</span>
        </div>
        <span
          style={{
            fontSize: "1.25rem",
            color: "var(--red)",
            transition: "transform 0.3s",
            transform: open ? "rotate(45deg)" : "rotate(0)",
            flexShrink: 0,
          }}
        >
          +
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? "200px" : "0",
          overflow: "hidden",
          transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <p
          style={{
            padding: "0 0 1.25rem 2.75rem",
            fontSize: "0.8125rem",
            lineHeight: 2,
            color: "rgba(255,255,255,0.55)",
          }}
        >
          {a}
        </p>
      </div>
    </div>
  );
}

/* ─── Hero Slider ─── */

const kvImages = [
  { src: "/lp-kv1.webp", srcPc: "/lp-kv1-pc.webp", alt: "才能に、居場所を。" },
  { src: "/lp-kv2.webp", srcPc: "/lp-kv2-pc.webp", alt: "一期生大募集" },
];

function HeroSlider({ heroRef }: { heroRef: React.RefObject<HTMLElement | null> }) {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % kvImages.length);
    }, 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const goTo = (idx: number) => {
    setCurrent(idx);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % kvImages.length);
    }, 5000);
  };

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      <a
        href={LINE_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={trackCTAClick}
        style={{ display: "block", position: "relative" }}
      >
        {/* Slides */}
        <div className="lp-hero-slide-wrap" style={{ position: "relative", width: "100%", overflow: "hidden", background: "var(--bg)" }}>
          {/* Hidden image to set natural height */}
          <picture className="lp-hero-spacer" style={{ width: "100%", display: "block", visibility: "hidden" }}>
            <source media="(min-width: 769px)" srcSet={kvImages[0].srcPc} />
            <img src={kvImages[0].src} alt="" style={{ width: "100%", height: "auto", display: "block" }} />
          </picture>
          {kvImages.map((img, i) => (
            <picture
              key={i}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                opacity: current === i ? 1 : 0,
                transition: "opacity 0.8s ease-in-out",
              }}
            >
              <source media="(min-width: 769px)" srcSet={img.srcPc} />
              <img
                src={img.src}
                alt={img.alt}
                className="lp-hero-img"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  display: "block",
                }}
              />
            </picture>
          ))}
          {/* Bottom gradient fade to next section */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "15%",
              background: "linear-gradient(to bottom, transparent, var(--bg))",
              pointerEvents: "none",
            }}
          />
        </div>
      </a>

      {/* Dots */}
      <div style={{
        position: "absolute",
        bottom: "1.5rem",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: "0.5rem",
        zIndex: 20,
      }}>
        {kvImages.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            style={{
              width: current === i ? 24 : 8,
              height: 8,
              borderRadius: 4,
              border: "none",
              background: current === i ? "var(--red)" : "rgba(255,255,255,0.3)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              padding: 0,
            }}
          />
        ))}
      </div>
    </section>
  );
}

/* ─── Main Component ─── */

type Props = { talents: Talent[] };

export default function AuditionLP({ talents }: Props) {
  const heroRef = useRef<HTMLElement>(null);
  const meritRef = useRef<HTMLElement>(null);
  const creatorsRef = useRef<HTMLElement>(null);
  const flowRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll(".reveal,.reveal-left,.reveal-right")
              .forEach((el) => el.classList.add("visible"));
          }
        });
      },
      { threshold: 0.05 }
    );
    [heroRef, meritRef, creatorsRef, flowRef, faqRef, ctaRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .lp-cta-btn { transition: transform 0.2s, box-shadow 0.2s; }
        .lp-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(255,0,51,0.3); }
        .merit-card { transition: transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s; }
        .merit-card:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
        .talent-lp-card { transition: transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s; }
        .talent-lp-card:hover { transform: translateY(-8px); box-shadow: 0 30px 80px rgba(0,0,0,0.4); }
        .talent-lp-card .char-img { transition: transform 0.6s cubic-bezier(0.16,1,0.3,1); }
        .talent-lp-card:hover .char-img { transform: scale(1.06) translateY(-4px); }
        /* Desktop */
        @media (min-width: 769px) {
          .lp-hero-slide-wrap { height: 90vh !important; }
          .lp-hero-slide-wrap .lp-hero-spacer { display: none !important; }
          .lp-hero-slide-wrap .lp-hero-img { object-fit: cover !important; object-position: center 20% !important; }
          .lp-merits-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .lp-creators-grid { grid-template-columns: repeat(4, 1fr) !important; max-width: 72rem !important; }
          .lp-creators-grid .talent-lp-card:nth-child(n+3) { display: block !important; }
        }
        /* Tablet & Mobile */
        @media (max-width: 768px) {
          .lp-merits-grid { grid-template-columns: 1fr !important; }
          .lp-creators-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 0.75rem !important; }
          .lp-creators-grid .talent-lp-card:nth-child(n+3) { display: none !important; }
          .lp-steps-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 1.25rem 0.75rem !important; }
          .lp-hero-heading { font-size: 2.2rem !important; line-height: 1.2 !important; }
          .lp-hero-sub { font-size: 0.8rem !important; line-height: 2 !important; }
          .lp-section { padding: 4rem 0 !important; }
          .lp-section-inner { padding: 0 1rem !important; }
          .lp-section-head { margin-bottom: 2.5rem !important; }
          .lp-final-cta-btn { padding: 1rem 2rem !important; width: 100%; justify-content: center; }
          .merit-card { padding: 1.5rem 1.25rem !important; }
          .lp-faq-answer { padding-left: 2rem !important; }
        }
        @media (max-width: 480px) {
          .lp-hero-heading { font-size: 1.85rem !important; }
        }
      `}</style>

      {/* ═══════ HERO — KV Image Slider ═══════ */}
      <HeroSlider heroRef={heroRef} />

      {/* ═══════ WHY SPIRUNA ═══════ */}
      <section
        ref={meritRef}
        className="lp-section relative overflow-hidden"
        style={{ background: "var(--bg-2)", padding: "6rem 0" }}
      >
        {/* BG accent */}
        <div
          className="absolute right-0 top-0 pointer-events-none"
          style={{
            width: 600,
            height: 600,
            background: "radial-gradient(ellipse at top right, rgba(255,0,51,0.06) 0%, transparent 60%)",
          }}
        />

        <div className="lp-section-inner" style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>
          <div className="lp-section-head" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p className="section-label reveal" style={{ justifyContent: "center" }}>
              BENEFIT 特典
            </p>
            <h2
              className="heading-serif reveal delay-1"
              style={{ fontSize: "clamp(1.75rem, 5vw, 3rem)", marginBottom: "1rem" }}
            >
              V配信の<span style={{ color: "var(--red)" }}>最先端へ</span>
            </h2>
          </div>

          <div
            className="lp-merits-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}
          >
            {merits.map((m, i) => (
              <div
                key={m.num}
                className={`merit-card card-cyber reveal delay-${i + 1} relative overflow-hidden`}
                style={{ padding: "2rem 1.75rem" }}
              >
                {/* BG number */}
                <div
                  className="absolute pointer-events-none"
                  style={{
                    top: "0.75rem",
                    right: "1rem",
                    fontFamily: "var(--font-serif)",
                    fontSize: "5rem",
                    fontWeight: 700,
                    color: `${m.accent}08`,
                    lineHeight: 1,
                    userSelect: "none",
                  }}
                >
                  {m.num}
                </div>

                {/* Accent line */}
                <div style={{ marginBottom: "1.25rem", width: "1.5rem", height: "2px", background: m.accent }} />

                {/* Icon + Number */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                  {m.icon && <span style={{ fontSize: "1.5rem" }}>{m.icon}</span>}
                  <span style={{ fontSize: "0.75rem", fontFamily: "monospace", letterSpacing: "0.15em", color: m.accent }}>
                    {m.num}
                  </span>
                </div>

                {/* Title */}
                <h3 className="heading-serif" style={{ fontSize: "1.35rem", marginBottom: "0.25rem" }}>
                  {m.title}
                </h3>
                <p style={{ fontSize: "0.75rem", letterSpacing: "0.2em", marginBottom: "1rem", color: m.accent }}>
                  {m.titleJa}
                </p>

                {/* Desc */}
                <p style={{ fontSize: "0.8125rem", lineHeight: 1.9, color: "rgba(255,255,255,0.55)" }}>{m.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackCTAClick}
              className="lp-cta-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "1rem 3rem",
                background: "var(--red)",
                color: "#fff",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textDecoration: "none",
              }}
            >
              LINEから今すぐ応募
            </a>
          </div>
        </div>
      </section>

      {/* ═══════ CREATORS ═══════ */}
      <section
        ref={creatorsRef}
        className="relative overflow-hidden"
        style={{ background: "var(--bg)", padding: "6rem 0" }}
      >
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: 500,
            height: 800,
            background: "radial-gradient(ellipse at left, rgba(255,0,51,0.04) 0%, transparent 65%)",
          }}
        />

        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p className="section-label reveal" style={{ justifyContent: "center" }}>
              Active Creators
            </p>
            <h2
              className="heading-serif reveal delay-1"
              style={{ fontSize: "clamp(1.75rem, 5vw, 3rem)", marginBottom: "1rem" }}
            >
              活躍中の <span style={{ color: "var(--red)" }}>クリエイター</span>
            </h2>
            <p
              className="reveal delay-2"
              style={{ fontSize: "0.875rem", lineHeight: 2, color: "rgba(255,255,255,0.55)", maxWidth: "36rem", margin: "0 auto" }}
            >
              Spiruna所属のクリエイターたちが、日々TikTokで活躍しています。
            </p>
          </div>

          <div
            className="lp-creators-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.25rem" }}
          >
            {(talents.length > 0 ? talents.slice(0, 4) : fallbackTalents).map((t, i) => {
              const defaultColors = ["#ff0033", "#3366ff"];
              const ac = t.accent || defaultColors[i % 2];
              const grad = t.gradient || `linear-gradient(135deg, ${ac}18 0%, rgba(6,6,8,0.95) 100%)`;
              const heroUrl = t.fullImgs && t.fullImgs.length > 0 ? t.fullImgs[0].url : t.fullImg?.url;

              return (
                <Link
                  key={t.talentId}
                  href={`/creators/${t.slug}`}
                  className={`talent-lp-card card-cyber group reveal delay-${(i % 4) + 1} overflow-hidden`}
                  style={{ textDecoration: "none", display: "block" }}
                >
                  <div className="relative overflow-hidden" style={{ height: 280, background: grad }}>
                    {/* Grid pattern */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundImage: `linear-gradient(${ac}06 1px,transparent 1px),linear-gradient(90deg,${ac}06 1px,transparent 1px)`,
                        backgroundSize: "32px 32px",
                      }}
                    />
                    {/* Bottom glow */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: `radial-gradient(ellipse 70% 50% at 50% 100%, ${ac}35 0%, transparent 100%)` }}
                    />
                    {/* Character */}
                    {heroUrl && (
                      <div className="absolute inset-0 flex items-start justify-center overflow-hidden">
                        <img
                          src={optimizeImg(heroUrl, 600)}
                          alt={t.name}
                          className="char-img relative z-10"
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
                    {/* Accent line */}
                    <div className="absolute bottom-0 left-0 right-0 z-20" style={{ height: 3, background: ac }} />
                  </div>
                  <div style={{ padding: "1rem 1.25rem", textAlign: "center" }}>
                    <h3
                      className="heading-serif group-hover:text-red-400 transition-colors duration-300"
                      style={{ fontSize: "1.1rem", marginBottom: "0.2rem" }}
                    >
                      {t.name}
                    </h3>
                    <p style={{ fontSize: "0.65rem", fontFamily: "monospace", color: "var(--text-muted)", letterSpacing: "0.12em" }}>
                      {t.nameEn}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center reveal delay-3" style={{ marginTop: "2.5rem" }}>
            <a href="/creators" className="btn-ghost" style={{ fontSize: "0.75rem" }}>
              ALL CREATORS →
            </a>
          </div>
        </div>
      </section>

      {/* ═══════ FLOW ═══════ */}
      <section
        id="flow"
        ref={flowRef}
        className="relative overflow-hidden"
        style={{ background: "var(--bg-2)", padding: "6rem 0", scrollMarginTop: "5rem" }}
      >
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p className="section-label reveal" style={{ justifyContent: "center" }}>
              Audition Flow
            </p>
            <h2
              className="heading-serif reveal delay-1"
              style={{ fontSize: "clamp(1.75rem, 5vw, 3rem)", marginBottom: "1rem" }}
            >
              応募の<span style={{ color: "var(--red)" }}>流れ</span>
            </h2>
          </div>

          <div className="reveal delay-2" style={{ display: "flex", flexDirection: "column", gap: "0", maxWidth: "36rem", margin: "0 auto" }}>
            {steps.map((s, i) => (
              <div key={s.num} style={{ display: "flex", alignItems: "flex-start", gap: "1.25rem", position: "relative" }}>
                {/* Vertical connector line */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid rgba(255,0,51,0.3)",
                      background: "var(--bg-2)",
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ fontSize: "0.75rem", fontFamily: "monospace", color: "var(--red)" }}>{s.num}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div style={{ width: 1, height: 40, background: "rgba(255,0,51,0.15)" }} />
                  )}
                </div>
                <div style={{ paddingTop: "0.6rem", paddingBottom: i < steps.length - 1 ? "1.5rem" : 0 }}>
                  <h4 style={{ fontSize: "0.95rem", fontWeight: 600, marginBottom: "0.35rem" }}>{s.label}</h4>
                  <p style={{ fontSize: "0.75rem", lineHeight: 1.8, color: "var(--text-muted)" }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FAQ ═══════ */}
      <section
        ref={faqRef}
        className="relative overflow-hidden"
        style={{ background: "var(--bg)", padding: "6rem 0" }}
      >
        <div style={{ maxWidth: "48rem", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p className="section-label reveal" style={{ justifyContent: "center" }}>
              FAQ
            </p>
            <h2
              className="heading-serif reveal delay-1"
              style={{ fontSize: "clamp(1.75rem, 5vw, 3rem)", marginBottom: "1rem" }}
            >
              よくある<span style={{ color: "var(--red)" }}>質問</span>
            </h2>
          </div>

          <div>
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FINAL CTA ═══════ */}
      <section
        ref={ctaRef}
        className="relative overflow-hidden"
        style={{ background: "var(--bg-2)", padding: "6rem 0" }}
      >
        {/* BG accents */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,0,51,0.08) 0%, transparent 70%)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 10,
            maxWidth: "48rem",
            margin: "0 auto",
            padding: "0 1.5rem",
            textAlign: "center",
          }}
        >
          <p className="section-label reveal" style={{ justifyContent: "center" }}>
            Join Us
          </p>
          <h2
            className="heading-serif reveal delay-1"
            style={{
              fontSize: "clamp(1.75rem, 5vw, 3rem)",
              marginBottom: "1.5rem",
            }}
          >
            あなたの<span style={{ color: "var(--red)" }}>一歩</span>が、
            <br />
            始まりになる。
          </h2>
          <p
            className="reveal delay-2"
            style={{
              fontSize: "0.9rem",
              lineHeight: 2.2,
              color: "rgba(255,255,255,0.6)",
              marginBottom: "2.5rem",
            }}
          >
            経験不問。年齢不問。<br />
            必要なのは、バーチャルの世界で輝きたいという想い。<br />
            Spirunaがあなたの夢を全力でサポートします。
          </p>

          <div className="reveal delay-3" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackCTAClick}
              className="lp-cta-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "1.1rem 3.5rem",
                background: "var(--red)",
                color: "#fff",
                fontSize: "0.9rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textDecoration: "none",
              }}
            >
              LINEから今すぐ応募
            </a>
          </div>

          <p
            className="reveal delay-4"
            style={{
              marginTop: "1.5rem",
              fontSize: "0.7rem",
              color: "var(--text-muted)",
              letterSpacing: "0.05em",
            }}
          >
            ※ 応募はLINE公式アカウントから受け付けています
          </p>
        </div>
      </section>
    </>
  );
}
