import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT || 465),
  secure: Number(process.env.EMAIL_SERVER_PORT || 465) === 465,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export async function sendPasswordResetEmail(
  email: string,
  resetUrl: string
) {
  if (
    !process.env.EMAIL_SERVER_USER ||
    !process.env.EMAIL_SERVER_PASSWORD ||
    !process.env.EMAIL_SERVER_HOST
  ) {
    throw new Error("Email configuration is missing");
  }

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.EMAIL_SERVER_USER,
    to: email,
    subject: "Reset Your NriMart Password",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 25px; color: #333;">
        <h2 style="color: #166534;">NriMart</h2>
        <h3>Password Reset Request</h3>
        <p>We received a request to reset your password.</p>
        <p>Click the button below to choose a new password.</p>
        <a href="${resetUrl}"
          style="display:inline-block; background:#166534; color:white;
          padding:14px 25px; text-decoration:none; border-radius:8px;">
          Reset Password
        </a>
        <p>This link expires in 15 minutes.</p>
        <p>If you did not request this, you can ignore this email.</p>
      </div>
    `,
  });
}