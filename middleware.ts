import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // /media/* へのリクエストに X-From-Vercel ヘッダーを追加
  // これにより WordPress 側(.htaccess)でVercel経由かどうかを判別できる
  response.headers.set("X-From-Vercel", "true");

  return response;
}

export const config = {
  matcher: ["/media", "/media/:path*"],
};
