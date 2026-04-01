import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  return NextResponse.next();
}

// /media への適用を削除:
// Vercel の外部リライト (rewrites) はカスタムリクエストヘッダーを
// リライト先に転送しないため、X-From-Vercel ヘッダーは media.spiruna.jp に届かない。
// middleware は /media に対して何もできないので matcher から外す。
export const config = {
  matcher: [],
};
