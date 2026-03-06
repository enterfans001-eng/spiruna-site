"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyContent() {
  const sectionStyle: React.CSSProperties = {
    marginBottom: "2.5rem",
  };

  const headingStyle: React.CSSProperties = {
    fontSize: "0.85rem",
    fontWeight: 700,
    color: "var(--red)",
    marginBottom: "0.75rem",
    letterSpacing: "0.05em",
  };

  const textStyle: React.CSSProperties = {
    fontSize: "0.8rem",
    lineHeight: 2,
    color: "rgba(255,255,255,0.65)",
  };

  const listStyle: React.CSSProperties = {
    ...textStyle,
    paddingLeft: "1.25rem",
    listStyleType: "disc",
  };

  return (
    <>
      <Header />
      <main style={{ background: "var(--bg)", minHeight: "100vh", paddingTop: "8rem", paddingBottom: "5rem" }}>
        <div style={{ maxWidth: "48rem", margin: "0 auto", padding: "0 1.5rem" }}>
          {/* Back link */}
          <a
            href="/"
            style={{
              display: "inline-block",
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              textDecoration: "none",
              marginBottom: "2rem",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            ← トップページに戻る
          </a>

          {/* ===== Privacy Policy ===== */}
          <div style={{ marginBottom: "5rem" }}>
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: "var(--red)", marginBottom: "0.75rem" }}>
              PRIVACY POLICY
            </p>
            <h1 style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 700,
              marginBottom: "2rem",
            }}>
              プライバシーポリシー
            </h1>

            <p style={{ ...textStyle, marginBottom: "2.5rem" }}>
              Vクリエイター事務所スピルナ(以下「当事務所」)は、以下のとおり個人情報保護方針を定め、個人情報保護の仕組みを構築し、全従業員に個人情報保護の重要性の認識と取組みを徹底させることにより、個人情報の保護を推進致します。
            </p>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>個人情報の管理</h2>
              <p style={textStyle}>
                当事務所は、お客さまの個人情報を正確かつ最新の状態に保ち、個人情報への不正アクセス・紛失・破損・改ざん・漏洩などを防止するため、セキュリティシステムの維持・管理体制の整備・社員教育の徹底等の必要な措置を講じ、安全対策を実施し個人情報の厳重な管理を行ないます。
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>個人情報の利用目的</h2>
              <p style={textStyle}>
                お客様からの信頼を確保するため、お客様のご意見を尊重し、お客様のニーズにあった良質で、安全な商品・サービスの提供に努めます。
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>個人情報の第三者への開示・提供の禁止</h2>
              <p style={{ ...textStyle, marginBottom: "0.75rem" }}>
                当事務所は、お客さまよりお預かりした個人情報を適切に管理し、次のいずれかに該当する場合を除き、個人情報を第三者に開示いたしません。
              </p>
              <ul style={listStyle}>
                <li>お客さまの同意がある場合</li>
                <li>お客さまが希望されるサービスを行なうために当事務所が業務を委託する業者に対して開示する場合</li>
                <li>法令に基づき開示することが必要である場合</li>
              </ul>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>個人情報の安全対策</h2>
              <p style={textStyle}>
                お客様からの信頼を確保するため、お客様のご意見を尊重し、お客様のニーズにあった良質で、安全な商品・サービスの提供に努めます。
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>ご本人の照会</h2>
              <p style={textStyle}>
                お客さまがご本人の個人情報の照会・修正・削除などをご希望される場合には、ご本人であることを確認の上、対応させていただきます。
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>法令、規範の遵守と見直し</h2>
              <p style={textStyle}>
                当事務所は、保有する個人情報に関して適用される日本の法令、その他規範を遵守するとともに、本ポリシーの内容を適宜見直し、その改善に努めます。
              </p>
            </div>

            <div>
              <h2 style={headingStyle}>個人情報お問い合わせ窓口</h2>
              <p style={textStyle}>
                （受付24時間 土日祝祭日は除く）<br />
                Vクリエイター事務所 スピルナ 個人情報ご相談窓口担当者まで<br />
                〒151-0051 東京都渋谷区千駄ヶ谷5-27-5 WeWorkリンクスクエア新宿 16F<br />
                mail: info@spiruna.com
              </p>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "linear-gradient(to right, var(--red), transparent 60%)", marginBottom: "5rem" }} />

          {/* ===== Compliance ===== */}
          <div>
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: "var(--red)", marginBottom: "0.25rem" }}>
              COMPLIANCE
            </p>
            <h2 style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 700,
              marginBottom: "0.5rem",
            }}>
              コンプライアンス
            </h2>

            <p style={{ ...textStyle, marginBottom: "2.5rem" }}>
              Vクリエイター事務所スピルナ(以下「当事務所」)は、法令遵守体制の構築を目的として「コンプライアンス規程」を定め、役員及び社員の法令及び社会規範の遵守の浸透、啓発を図っております。
              また、下記の通り、業務遂行にあたっての法令及び社内規定の遵守、社会規範を尊重、公正かつ適切な事業活動を行うための原則を掲げ、コンプライアンス体制の確立に取り組んでおります。
              当事務所は企業活動及び社会貢献の使命達成のため取引先企業やお客様、および当事務所従業者からお預かりした個人情報は、その取扱いに関しまして本個人情報保護方針を定め、厳正な管理のもとでその責務を履行してまいります。
            </p>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>法令・社会規範の遵守</h2>
              <p style={textStyle}>
                業務に関係する法令及びその趣旨を正しく理解し、これを遵守します。また、社会規範に則った良識ある倫理的な事業活動を行います。個人情報の取扱い、その他詳細項目は関連ページに掲載しております。
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>お客様からの信頼</h2>
              <p style={textStyle}>
                お客様からの信頼を確保するため、お客様のご意見を尊重し、お客様のニーズにあった良質で、安全な商品・サービスの提供に努めます。
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>公正な事業活動</h2>
              <p style={textStyle}>
                お客様からの信頼を確保するため、お客様のご意見を尊重し、お客様のニーズにあった良質で、安全な商品・サービスの提供に努めます。
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>社会への貢献・責任</h2>
              <p style={textStyle}>
                すべての人々の人権を尊重し、不当な差別などにつながる行為は容認しません。
                また、従業員の安全と健康の確保に努め、互いに信頼感のある健全な職場環境の維持に努めます。
              </p>
            </div>

            <div>
              <h2 style={headingStyle}>コンプライアンス体制の推進・改善</h2>
              <p style={textStyle}>
                本規範に基づき、常に自らの活動を律するとともに、コンプライアンス体制の推進・改善に努めます。
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
