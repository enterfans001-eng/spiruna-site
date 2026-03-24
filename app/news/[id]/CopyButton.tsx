"use client";

export default function CopyButton({ url }: { url: string }) {
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(url);
        alert("URLをコピーしました");
      }}
      style={{
        display: "inline-flex", alignItems: "center", gap: "0.5rem",
        padding: "0.5rem 1.25rem", background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.15)", color: "#fff",
        fontSize: "0.7rem", letterSpacing: "0.1em", cursor: "pointer",
      }}
    >
      URL Copy
    </button>
  );
}
