import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import  prisma  from "@/lib/prisma";
import { registerSchema } from "@/lib/validations/auth";

export async function POST(request: Request) {
  try {
    // Get the submitted registration information
    const body = await request.json();

    // Validate the information using Zod
    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Invalid registration information",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // Extract the validated information
    const { name, email, password } = validation.data;

    // Check whether the email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email is already registered" },
        { status: 409 }
      );
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the user in MongoDB
    const user = await prisma.user.create({
      data: {
        name,
        email: email.trim().toLowerCase(),
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        message: "Registration successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);

    return NextResponse.json(
      { message: "Something went wrong during registration" },
      { status: 500 }
    );
  }
}