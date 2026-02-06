import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendPasswordResetEmail(email: string, token: string) {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const resetUrl = `${baseUrl}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: process.env.SMTP_FROM || `"osu!Helper" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Сброс пароля — osu!Helper",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; background: #1a1a2e; color: #fff; border-radius: 12px;">
        <h2 style="color: #ff66ab; text-align: center;">osu!Helper</h2>
        <p>Вы запросили сброс пароля.</p>
        <p>Нажмите на кнопку ниже, чтобы задать новый пароль:</p>
        <div style="text-align: center; margin: 24px 0;">
          <a href="${resetUrl}" 
             style="background: #ff66ab; color: #fff; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">
            Сбросить пароль
          </a>
        </div>
        <p style="color: #888; font-size: 12px;">Ссылка действительна 1 час. Если вы не запрашивали сброс пароля, проигнорируйте это письмо.</p>
      </div>
    `,
  });
}
