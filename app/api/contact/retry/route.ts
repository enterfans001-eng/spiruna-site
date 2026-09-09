import { NextRequest, NextResponse } from "next/server";
import { createForwarder, cronAuthorized } from "@/lib/contact-forwarder.mjs";

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!cronAuthorized(req.headers.get("authorization"), process.env.CRON_SECRET)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    return NextResponse.json(await createForwarder().retry());
  } catch {
    console.error("Contact forwarding: retry_service_failed");
    return NextResponse.json({ error: "retry_failed" }, { status: 503 });
  }
}
