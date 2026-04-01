import type { NextConfig } from "next";

const securityHeaders = [
  // HTTPS を強制（HSTS）
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // XSS 保護
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // クリックジャッキング防止
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // リファラー制御
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      // www → non-www リダイレクト
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.spiruna.jp" }],
        destination: "https://spiruna.jp/:path*",
        permanent: true,
      },
      // 旧 /talents → /creators リダイレクト
      {
        source: "/talents",
        destination: "/creators",
        permanent: true,
      },
      {
        source: "/talents/:slug*",
        destination: "/creators/:slug*",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      // /media → WordPress (media.spiruna.jp) に転送
      // ?_vproxy=1 を付与することで WordPress 側が「Vercel経由のアクセス」と判定できる
      {
        source: "/media",
        destination: "https://media.spiruna.jp?_vproxy=1",
      },
      {
        source: "/media/:path*",
        destination: "https://media.spiruna.jp/:path*?_vproxy=1",
      },
    ];
  },
};

export default nextConfig;
