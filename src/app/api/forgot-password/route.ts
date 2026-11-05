import { NextResponse } from "next/server";
import { randomBytes, createHash } from "crypto";
import prisma from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/mailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    // Validate email
    if (!email) {
      return NextResponse.json(
        { message: "Email is required." },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Do not reveal whether an email exists
    if (!user) {
      return NextResponse.json({
        message:
          "If an account with that email exists, a password reset link has been sent.",
      });
    }

    // Generate a secure random token
    const resetToken = randomBytes(32).toString("hex");

    // Hash the token before saving it
    const hashedToken = createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Remove previous reset tokens for this email
    await prisma.passwordResetToken.deleteMany({
      where: { email },
    });

    // Save the hashed token in MongoDB
    await prisma.passwordResetToken.create({
      data: {
        email,
        token: hashedToken,
        expires: new Date(Date.now() + 15 * 60 * 1000),
      },
    });

    // Create password reset URL
    const baseUrl = process.env.AUTH_URL || "http://localhost:3000";

    const resetUrl = `${baseUrl}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;

    // Send reset email
    try {
      await sendPasswordResetEmail(email, resetUrl);
    } catch (error) {
      // Delete token if email sending fails
      await prisma.passwordResetToken.deleteMany({
        where: { token: hashedToken },
      });

      throw error;
    }

    return NextResponse.json({
      message:
        "If an account with that email exists, a password reset link has been sent.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);

    return NextResponse.json(
      { message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}