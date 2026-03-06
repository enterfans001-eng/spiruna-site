"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Page } from "@/lib/microcms";

type Props = { page: Page | null };

export default function PrivacyContent({ page }: Props) {
  return (
    <>
      <Header />
      <main style={{ background: "var(--bg)", minHeight: "100vh", paddingTop: "8rem", paddingBottom: "5rem" }}>
        <div style={{ maxWidth: "48rem", margin: "0 auto", padding: "0 1.5rem" }}>
          {/* Back link */}
          <a
            href="/"
            style={{
              display: "inline-block", fontSize: "0.75rem", color: "var(--text-muted)",
              textDecoration: "none", marginBottom: "2rem", transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            ← トップページに戻る
          </a>

          {/* Page title */}
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: "var(--red)", marginBottom: "0.75rem" }}>
            {page?.titleEn ?? "PRIVACY POLICY"}
          </p>
          <h1 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, marginBottom: "2rem",
          }}>
            {page?.title ?? "プライバシーポリシー"}
          </h1>

          {/* Body */}
          {page?.body ? (
            <div
              className="microcms-content"
              dangerouslySetInnerHTML={{ __html: page.body }}
            />
          ) : (
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              コンテンツを読み込めませんでした。
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
