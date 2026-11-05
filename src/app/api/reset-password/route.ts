import { NextResponse } from "next/server";
import { createHash } from "crypto";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, token, password } = body;

    // Validate required fields
    if (!email || !token || !password) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    // Validate password length
    if (typeof password !== "string" || password.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }

    if (typeof email !== "string" || typeof token !== "string") {
      return NextResponse.json(
        { message: "Invalid reset request." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Hash the received token
    const hashedToken = createHash("sha256")
      .update(token)
      .digest("hex");

    // Find a valid, unexpired reset token
    const resetToken = await prisma.passwordResetToken.findFirst({
      where: {
        email: normalizedEmail,
        token: hashedToken,
        expires: {
          gt: new Date(),
        },
      },
    });

    if (!resetToken) {
      return NextResponse.json(
        { message: "Invalid or expired reset link." },
        { status: 400 }
      );
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found." },
        { status: 404 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Update the user's password
    await prisma.user.update({
      where: { email: normalizedEmail },
      data: {
        password: hashedPassword,
      },
    });

    // Delete the used reset token
    await prisma.passwordResetToken.deleteMany({
      where: { email: normalizedEmail },
    });

    return NextResponse.json({
      message: "Password reset successful. You can now log in.",
    });

  } catch (error) {
    console.error("Reset password error:", error);

    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}