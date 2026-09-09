import { after, NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createForwarder, makeSubmission } from "@/lib/contact-forwarder.mjs";

export const runtime = "nodejs";
export const maxDuration = 60;

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

export async function POST(req: NextRequest) {
  const forwarder = createForwarder();
  let submission;
  try {
    const body = await req.json();
    // The forwarding flag is off until production secrets and storage are ready.
    // Invalid forwarding input must not stop the pre-existing email path.
    if (forwarder.enabled) {
      try {
        submission = makeSubmission(body);
        await forwarder.stage(submission);
      } catch {
        await forwarder.stageReview(body);
      }
    }

    // Build email body
    const fields = Object.entries(body)
      .filter(([key]) => key !== "_formType")
      .map(([key, value]) => `【${key}】\n${value}`)
      .join("\n\n");

    const formType = body["_formType"] === "individual" ? "個人" : "法人";

    const mailBody = `Spirunaサイトからお問い合わせがありました。\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `お問い合わせ種別: ${formType}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      `${fields}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `このメールはSpiruna公式サイトのお問い合わせフォームから自動送信されました。`;

    const fromAddress = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const toAddress = process.env.CONTACT_TO_EMAIL || "info@spiruna.jp";

    const result = await getResend().emails.send({
      from: `Spiruna お問い合わせ <${fromAddress}>`,
      to: [toAddress],
      subject: `【Spiruna】お問い合わせ（${formType}）: ${body["お名前"] || "名前未入力"}`,
      text: mailBody,
    });
    if (result.error || !result.data?.id) throw new Error("mail_send_failed");

    if (submission) {
      await forwarder.mailSent(submission, result.data.id);
      const payload = submission;
      after(() => forwarder.forward(payload));
    }

    return NextResponse.json({ success: true });
  } catch {
    if (submission) await forwarder.mailFailed(submission);
    console.error("Contact form error: mail_send_failed");
    return NextResponse.json(
      { success: false, error: "送信に失敗しました。時間をおいて再度お試しください。" },
      { status: 500 }
    );
  }
}
