import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "送信完了 | Spiruna",
};

export default function ThanksPage() {
  return (
    <>
      <Header />
      <main style={{ background: "var(--bg)", minHeight: "100vh", paddingTop: "10rem", paddingBottom: "5rem" }}>
        <div style={{ maxWidth: "40rem", margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
          <p style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>✓</p>
          <h1 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, marginBottom: "1.5rem",
          }}>
            送信が完了しました
          </h1>
          <p style={{ fontSize: "0.85rem", lineHeight: 2, color: "var(--text-muted)", marginBottom: "3rem" }}>
            お問い合わせいただきありがとうございます。<br />
            内容を確認の上、担当者よりご連絡いたします。<br />
            通常2〜3営業日以内にご返信いたします。
          </p>
          <Link
            href="/"
            style={{
              display: "inline-block",
              padding: "0.9rem 3rem",
              background: "var(--red)", color: "#fff",
              fontSize: "0.8rem", letterSpacing: "0.2em", fontWeight: 700,
              border: "1px solid var(--red)",
              textDecoration: "none",
              transition: "background 0.2s, transform 0.2s",
            }}
          >
            トップページに戻る
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
