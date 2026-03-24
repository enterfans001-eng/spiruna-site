import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const slug = searchParams.get("slug");
  const contentId = searchParams.get("contentId");
  const secret = searchParams.get("secret");
  const type = searchParams.get("type"); // "news" or "talent"

  // Validate secret
  if (secret !== process.env.PREVIEW_SECRET) {
    return new Response("Invalid secret", { status: 401 });
  }

  // Enable Draft Mode
  const draft = await draftMode();
  draft.enable();

  const targetId = slug || contentId;

  if (type === "news" && targetId) {
    redirect(`/news/${targetId}`);
  }

  if (targetId) {
    redirect(`/talents/${targetId}`);
  }

  redirect("/");
}
