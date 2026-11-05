import {compare} from "bcryptjs"
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt",
  },

  providers: [
    Google,
    Credentials({
  credentials: {
    email: {
      label: "Email",
      type: "email",
    },
    password: {
      label: "Password",
      type: "password",
    },
  },

  async authorize(credentials) {
    if (
      !credentials?.email ||
      !credentials?.password ||
      typeof credentials.email !== "string" ||
      typeof credentials.password !== "string"
    ) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: {
        email: credentials.email.toLowerCase(),
      },
    });

    if (!user || !user.password) {
      return null;
    }

    const isPasswordValid = await compare(
      credentials.password,
      user.password
    );

    if (!isPasswordValid) {
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.role,
    };
  },
}),
  ],

  callbacks: {
  async jwt({ token, user }) {
    // Save user information when logging in
    if (user) {
      token.id = user.id;
      token.name = user.name;
      token.email = user.email;
      token.picture = user.image;
    }

    // Retrieve the user's role from MongoDB
    if (token.id) {
      const dbUser = await prisma.user.findUnique({
        where: {
          id: token.id as string,
        },
        select: {
          id: true,
          role: true,
        },
      });

      if (dbUser) {
        token.id = dbUser.id;
        token.role = dbUser.role;
      }
    }

    return token;
  },

  async session({ session, token }) {
    if (session.user) {
      session.user.id = token.id as string;
      session.user.name = token.name ?? null;
      session.user.email = token.email as string;
      session.user.image = token.picture as string | null;
      session.user.role = token.role as "USER" | "ADMIN";
    }

    return session;
  },
},

});