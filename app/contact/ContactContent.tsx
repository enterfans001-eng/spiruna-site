"use client";
import { useState, useCallback } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type FormType = "corporate" | "individual";

export default function ContactContent() {
  const [formType, setFormType] = useState<FormType>("corporate");
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState({ pref: "", city: "", town: "" });
  const [addressDetail, setAddressDetail] = useState("");

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
    <>
      <Header />
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
      <main style={{ background: "var(--bg)", minHeight: "100vh", paddingTop: "8rem", paddingBottom: "5rem" }}>
        <div style={{ maxWidth: "48rem", margin: "0 auto", padding: "0 1.5rem" }}>
          <Link
            href="/"
            style={{
              display: "inline-block", fontSize: "0.75rem", color: "var(--text-muted)",
              textDecoration: "none", marginBottom: "2rem", transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            ← トップページに戻る
          </Link>

          <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: "var(--red)", marginBottom: "0.75rem" }}>
            CONTACT
          </p>
          <h1 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, marginBottom: "1rem",
          }}>
            お問い合わせ
          </h1>
          <p style={{ fontSize: "0.85rem", lineHeight: 2, color: "var(--text-muted)", marginBottom: "2.5rem" }}>
            当事務所、所属Vライバーへの問い合わせや、<br />
            ライバー応募は下記よりお気軽にご連絡ください。
          </p>

          {/* Form type toggle */}
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "3rem" }}>
            {(["corporate", "individual"] as const).map((type) => (
              <button
                key={type}
                className="type-btn"
                onClick={() => setFormType(type)}
                type="button"
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
          <form
            action="https://formsubmit.co/info@spiruna.jp"
            method="POST"
            style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}
          >
            {/* FormSubmit settings */}
            <input type="hidden" name="_subject" value="【SPIRUNA】お問い合わせがありました" />
            <input type="hidden" name="_next" value="https://spiruna.jp/contact/thanks" />
            <input type="hidden" name="_captcha" value="true" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="お問い合わせ種別" value={formType === "corporate" ? "法人" : "個人"} />

            {/* Corporate fields */}
            {formType === "corporate" && (
              <>
                <div>
                  <label style={labelStyle}>会社名{requiredMark}</label>
                  <input name="会社名" className="contact-input" type="text" placeholder="株式会社○○" required style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle}>会社住所{requiredMark}</label>
                  <div style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem", alignItems: "center" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", flexShrink: 0 }}>〒</span>
                    <input
                      name="郵便番号"
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
                    <input name="都道府県" className="contact-input" type="text" placeholder="都道府県" value={address.pref} onChange={(e) => setAddress({ ...address, pref: e.target.value })} style={inputStyle} />
                    <input name="市区町村" className="contact-input" type="text" placeholder="市区町村" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} style={inputStyle} />
                  </div>
                  <input name="番地・建物名" className="contact-input" type="text" placeholder="番地・建物名" value={addressDetail} onChange={(e) => setAddressDetail(e.target.value)} style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle}>URL</label>
                  <input name="URL" className="contact-input" type="url" placeholder="https://example.com" style={inputStyle} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  <div>
                    <label style={labelStyle}>お名前{requiredMark}</label>
                    <input name="お名前" className="contact-input" type="text" placeholder="山田 太郎" required style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>フリガナ{requiredMark}</label>
                    <input name="フリガナ" className="contact-input" type="text" placeholder="ヤマダ タロウ" required style={inputStyle} />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>部署</label>
                  <input name="部署" className="contact-input" type="text" placeholder="マーケティング部" style={inputStyle} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  <div>
                    <label style={labelStyle}>メールアドレス{requiredMark}</label>
                    <input name="メールアドレス" className="contact-input" type="email" placeholder="info@example.com" required style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>電話番号{requiredMark}</label>
                    <input name="電話番号" className="contact-input" type="tel" placeholder="03-1234-5678" required style={inputStyle} />
                  </div>
                </div>

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
                        <input type="radio" name="項目" value={cat} required style={{ accentColor: "var(--red)" }} />
                        {cat}
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Individual fields */}
            {formType === "individual" && (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  <div>
                    <label style={labelStyle}>お名前{requiredMark}</label>
                    <input name="お名前" className="contact-input" type="text" placeholder="山田 太郎" required style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>フリガナ{requiredMark}</label>
                    <input name="フリガナ" className="contact-input" type="text" placeholder="ヤマダ タロウ" required style={inputStyle} />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>SNSのURL</label>
                  <input name="SNSのURL" className="contact-input" type="url" placeholder="https://twitter.com/yourname" style={inputStyle} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  <div>
                    <label style={labelStyle}>メールアドレス{requiredMark}</label>
                    <input name="メールアドレス" className="contact-input" type="email" placeholder="your@email.com" required style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>電話番号</label>
                    <input name="電話番号" className="contact-input" type="tel" placeholder="090-1234-5678" style={inputStyle} />
                  </div>
                </div>

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
                        <input type="radio" name="項目" value={cat} required style={{ accentColor: "var(--red)" }} />
                        {cat}
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Common: お問い合わせ内容 */}
            <div>
              <label style={labelStyle}>お問い合わせ内容{requiredMark}</label>
              <textarea
                name="お問い合わせ内容"
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
      </main>
      <Footer />
    </>
  );
}
