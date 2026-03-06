"use client";
import { useEffect, useRef, useState, useCallback } from "react";

type FormType = "corporate" | "individual";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formType, setFormType] = useState<FormType>("corporate");
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState({ pref: "", city: "", town: "" });
  const [addressDetail, setAddressDetail] = useState("");

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

  const lookupPostalCode = useCallback(async (code: string) => {
    const cleaned = code.replace(/[^0-9]/g, "");
    if (cleaned.length !== 7) return;
    try {
      const res = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${cleaned}`);
      const data = await res.json();
      if (data.results && data.results[0]) {
        const r = data.results[0];
        setAddress({ pref: r.address1, city: r.address2, town: r.address3 });
      }
    } catch {
      // ignore
    }
  }, []);

  const handlePostalChange = (val: string) => {
    setPostalCode(val);
    const cleaned = val.replace(/[^0-9]/g, "");
    if (cleaned.length === 7) {
      lookupPostalCode(cleaned);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "0.75rem 1rem",
    background: "var(--surface)", border: "1px solid var(--border)",
    color: "var(--text)", fontSize: "0.85rem",
    outline: "none", transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    display: "block", fontSize: "0.75rem", letterSpacing: "0.1em",
    marginBottom: "0.5rem", color: "var(--text)",
  };

  const requiredMark = <span style={{ color: "var(--red)", marginLeft: "0.3rem", fontSize: "0.7rem" }}>※</span>;

  const corporateCategories = ["プロモーション依頼", "取材", "その他"];
  const individualCategories = ["所属したい", "相談したい", "その他"];

  return (
    <section id="contact" ref={sectionRef} className="relative overflow-hidden" style={{ background: "var(--bg)", padding: "6rem 0" }}>
      <style>{`
        .contact-input:focus { border-color: var(--red) !important; }
        .contact-input::placeholder { color: var(--text-muted); font-size: 0.8rem; }
        .contact-textarea:focus { border-color: var(--red) !important; }
        .contact-textarea::placeholder { color: var(--text-muted); font-size: 0.8rem; }
        .type-btn { transition: background 0.2s, color 0.2s, border-color 0.2s; cursor: pointer; }
        .type-btn:hover { border-color: var(--red) !important; }
        .radio-item { transition: border-color 0.2s, background 0.2s; cursor: pointer; }
        .radio-item:hover { border-color: rgba(255,0,51,0.4) !important; }
      `}</style>

      <div style={{ maxWidth: "48rem", margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Header */}
        <div className="reveal" style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <p className="section-label" style={{ justifyContent: "center" }}>Contact</p>
          <h2 className="heading-serif" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "1rem" }}>
            お問い合わせ
          </h2>
          <p style={{ fontSize: "0.85rem", lineHeight: 2, color: "var(--text-muted)", maxWidth: "32rem", margin: "0 auto" }}>
            当事務所、所属Vライバーへの問い合わせや、<br />
            ライバー応募は下記よりお気軽にご連絡ください。
          </p>
        </div>

        {/* Form type toggle */}
        <div className="reveal delay-1" style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "3rem" }}>
          {(["corporate", "individual"] as const).map((type) => (
            <button
              key={type}
              className="type-btn"
              onClick={() => setFormType(type)}
              style={{
                padding: "0.7rem 2.5rem",
                fontSize: "0.8rem", letterSpacing: "0.15em", fontWeight: 600,
                background: formType === type ? "var(--red)" : "transparent",
                color: formType === type ? "#fff" : "var(--text-muted)",
                border: formType === type ? "1px solid var(--red)" : "1px solid rgba(255,255,255,0.15)",
              }}
            >
              {type === "corporate" ? "法人" : "個人"}
            </button>
          ))}
        </div>

        {/* Form */}
        <form className="reveal delay-2" onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>

          {/* ── Corporate fields ── */}
          {formType === "corporate" && (
            <>
              {/* 会社名 */}
              <div>
                <label style={labelStyle}>会社名{requiredMark}</label>
                <input className="contact-input" type="text" placeholder="株式会社○○" required style={inputStyle} />
              </div>

              {/* 会社住所 */}
              <div>
                <label style={labelStyle}>会社住所{requiredMark}</label>
                <div style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem", alignItems: "center" }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", flexShrink: 0 }}>〒</span>
                  <input
                    className="contact-input"
                    type="text"
                    placeholder="1234567"
                    value={postalCode}
                    onChange={(e) => handlePostalChange(e.target.value)}
                    style={{ ...inputStyle, maxWidth: "10rem" }}
                    maxLength={8}
                  />
                  <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", flexShrink: 0 }}>
                    ※郵便番号で自動入力
                  </span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
                  <input className="contact-input" type="text" placeholder="都道府県" value={address.pref} onChange={(e) => setAddress({ ...address, pref: e.target.value })} style={inputStyle} />
                  <input className="contact-input" type="text" placeholder="市区町村" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} style={inputStyle} />
                </div>
                <input className="contact-input" type="text" placeholder="番地・建物名" value={addressDetail} onChange={(e) => setAddressDetail(e.target.value)} style={inputStyle} />
              </div>

              {/* URL */}
              <div>
                <label style={labelStyle}>URL</label>
                <input className="contact-input" type="url" placeholder="https://example.com" style={inputStyle} />
              </div>

              {/* お名前 + フリガナ */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div>
                  <label style={labelStyle}>お名前{requiredMark}</label>
                  <input className="contact-input" type="text" placeholder="山田 太郎" required style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>フリガナ{requiredMark}</label>
                  <input className="contact-input" type="text" placeholder="ヤマダ タロウ" required style={inputStyle} />
                </div>
              </div>

              {/* 部署 */}
              <div>
                <label style={labelStyle}>部署</label>
                <input className="contact-input" type="text" placeholder="マーケティング部" style={inputStyle} />
              </div>

              {/* メールアドレス + 電話番号 */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div>
                  <label style={labelStyle}>メールアドレス{requiredMark}</label>
                  <input className="contact-input" type="email" placeholder="info@example.com" required style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>電話番号{requiredMark}</label>
                  <input className="contact-input" type="tel" placeholder="03-1234-5678" required style={inputStyle} />
                </div>
              </div>

              {/* 項目 */}
              <div>
                <label style={labelStyle}>項目{requiredMark}</label>
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  {corporateCategories.map((cat) => (
                    <label key={cat} className="radio-item" style={{
                      display: "flex", alignItems: "center", gap: "0.5rem",
                      padding: "0.5rem 1rem", fontSize: "0.8rem",
                      background: "var(--surface)", border: "1px solid var(--border)",
                      color: "var(--text-muted)",
                    }}>
                      <input type="radio" name="category" value={cat} required style={{ accentColor: "var(--red)" }} />
                      {cat}
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ── Individual fields ── */}
          {formType === "individual" && (
            <>
              {/* お名前 + フリガナ */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div>
                  <label style={labelStyle}>お名前{requiredMark}</label>
                  <input className="contact-input" type="text" placeholder="山田 太郎" required style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>フリガナ{requiredMark}</label>
                  <input className="contact-input" type="text" placeholder="ヤマダ タロウ" required style={inputStyle} />
                </div>
              </div>

              {/* SNSのURL */}
              <div>
                <label style={labelStyle}>SNSのURL</label>
                <input className="contact-input" type="url" placeholder="https://twitter.com/yourname" style={inputStyle} />
              </div>

              {/* メールアドレス + 電話番号 */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div>
                  <label style={labelStyle}>メールアドレス{requiredMark}</label>
                  <input className="contact-input" type="email" placeholder="your@email.com" required style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>電話番号</label>
                  <input className="contact-input" type="tel" placeholder="090-1234-5678" style={inputStyle} />
                </div>
              </div>

              {/* 項目 */}
              <div>
                <label style={labelStyle}>項目{requiredMark}</label>
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  {individualCategories.map((cat) => (
                    <label key={cat} className="radio-item" style={{
                      display: "flex", alignItems: "center", gap: "0.5rem",
                      padding: "0.5rem 1rem", fontSize: "0.8rem",
                      background: "var(--surface)", border: "1px solid var(--border)",
                      color: "var(--text-muted)",
                    }}>
                      <input type="radio" name="category" value={cat} required style={{ accentColor: "var(--red)" }} />
                      {cat}
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ── Common: お問い合わせ内容 ── */}
          <div>
            <label style={labelStyle}>お問い合わせ内容{requiredMark}</label>
            <textarea
              className="contact-textarea"
              placeholder="お問い合わせ内容をご記入ください"
              required
              rows={6}
              style={{
                ...inputStyle, resize: "vertical", lineHeight: 1.8,
                fontFamily: "inherit",
              }}
            />
          </div>

          {/* Submit */}
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <button
              type="submit"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                padding: "0.9rem 3rem",
                background: "var(--red)", color: "#fff",
                fontSize: "0.8rem", letterSpacing: "0.2em", fontWeight: 700,
                border: "1px solid var(--red)",
                cursor: "pointer",
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
              送信する
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
