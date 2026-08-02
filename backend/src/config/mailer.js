import nodemailer from "nodemailer";

const hasSmtp = !!process.env.SMTP_HOST;

const transporter = hasSmtp
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
    })
  : null;

export async function sendMail({ to, subject, text }) {
  if (!transporter) {
    console.log(`[mailer:stub] to=${to} subject="${subject}"`);
    return { stub: true };
  }
  return transporter.sendMail({ from: process.env.SMTP_USER || "no-reply@oinsfinance.com", to, subject, text });
}
