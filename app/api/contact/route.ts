import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const port = Number(process.env.SMTP_PORT) || 465;
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Build email body
    const fields = Object.entries(body)
      .filter(([key]) => key !== "_formType")
      .map(([key, value]) => `【${key}】\n${value}`)
      .join("\n\n");

    const formType = body["_formType"] === "individual" ? "個人" : "法人";

    const mailBody = `SPIRUNAサイトからお問い合わせがありました。\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `お問い合わせ種別: ${formType}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      `${fields}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `このメールはSPIRUNA公式サイトのお問い合わせフォームから自動送信されました。`;

    await transporter.sendMail({
      from: `"SPIRUNA お問い合わせ" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: `【SPIRUNA】お問い合わせ（${formType}）: ${body["お名前"] || "名前未入力"}`,
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
