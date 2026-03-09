import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

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

    await getResend().emails.send({
      from: `Spiruna お問い合わせ <${fromAddress}>`,
      to: [toAddress],
      subject: `【Spiruna】お問い合わせ（${formType}）: ${body["お名前"] || "名前未入力"}`,
      text: mailBody,
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Contact form error:", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
