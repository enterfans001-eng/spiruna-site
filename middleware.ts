import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // リクエストヘッダーに X-From-Vercel を追加してバックエンドに転送
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("X-From-Vercel", "true");

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/media", "/media/:path*"],
};
