"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { loginSchema } from "@/lib/validations/auth";
import { z } from "zod";
import { FcGoogle } from "react-icons/fc";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiShield,
} from "react-icons/fi";

type LoginInput = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: "/dashboard",
      });

      if (result?.error) {
        toast.error("Invalid email or password");
        return;
      }

      toast.success("Login successful!");

      router.push(result?.url || "/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f7ef] px-4 py-8 sm:px-6 lg:flex lg:items-center lg:justify-center lg:py-12">

      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl lg:grid-cols-2">

        {/* LEFT ANIMATED BRANDING SECTION */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-[#123d2a] p-10 text-white lg:flex xl:p-14">

          {/* ANIMATED BACKGROUND */}
          <div className="nrimart-orb absolute -right-10 top-20 h-48 w-48 rounded-full bg-[#e5b94f]/20 blur-3xl" />

          <div className="nrimart-glow absolute bottom-20 left-10 h-64 w-64 rounded-full bg-green-400/20 blur-3xl" />

          <div className="nrimart-orb absolute bottom-10 right-1/3 h-32 w-32 rounded-full bg-yellow-300/10 blur-2xl" />

          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-green-500/10" />

          <div className="absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-yellow-500/10" />

          {/* LOGO */}
          <div className="relative z-10">
            <Link href="/" className="text-3xl font-extrabold tracking-tight">
              NriMart<span className="text-[#e5b94f]">.</span>
            </Link>

            <p className="mt-2 text-sm text-green-100">
              Fresh choices. Better living.
            </p>
          </div>

          {/* WELCOME CONTENT */}
          <div className="relative z-10 my-12 nrimart-fade">

            <div className="mb-6 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm text-green-100">
              Welcome Back
            </div>

            <h1 className="max-w-md text-4xl font-bold leading-tight xl:text-5xl">
              Your trusted rice market is just a login away.
            </h1>

            <p className="mt-6 max-w-md leading-7 text-green-100">
              Sign in to your NriMart account and enjoy a simple,
              convenient way to discover quality rice for your home.
            </p>

            <div className="mt-10 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e5b94f] text-[#123d2a]">
                <FiShield size={21} />
              </div>

              <div>
                <p className="font-semibold">
                  Welcome to your NriMart account
                </p>

                <p className="text-sm text-green-100">
                  Simple, secure and convenient shopping.
                </p>
              </div>

            </div>
          </div>

          <p className="relative z-10 text-sm text-green-200">
            © 2026 NriMart. All rights reserved.
          </p>

        </section>

        {/* RIGHT LOGIN SECTION */}
        <section className="px-5 py-9 sm:px-10 sm:py-12 lg:px-12 xl:px-16">

          <div className="mx-auto max-w-md">

            {/* MOBILE LOGO */}
            <div className="mb-8 text-center lg:hidden">

              <Link href="/" className="text-3xl font-extrabold text-[#123d2a]">
                NriMart<span className="text-[#d6a83c]">.</span>
              </Link>

              <p className="mt-1 text-sm text-gray-500">
                Fresh choices. Better living.
              </p>

            </div>

            {/* FORM HEADING */}
            <div className="mb-8 nrimart-fade">

              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-700">
                Welcome back
              </p>

              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Login to your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Enter your details below to access your NriMart account.
              </p>

            </div>

            {/* LOGIN FORM */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >

              {/* EMAIL */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Email Address
                </label>

                <div className="relative">

                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={19} />

                  <input
                    type="email"
                    placeholder="Enter your email address"
                    {...register("email")}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-sm text-gray-800 outline-none transition focus:border-green-700 focus:bg-white focus:ring-2 focus:ring-green-700/10"
                  />

                </div>

                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.email.message}
                  </p>
                )}

              </div>

              {/* PASSWORD */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Password
                </label>

                <div className="relative">

                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={19} />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password")}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-12 text-sm text-gray-800 outline-none transition focus:border-green-700 focus:bg-white focus:ring-2 focus:ring-green-700/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-green-800"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <FiEyeOff size={19} />
                    ) : (
                      <FiEye size={19} />
                    )}
                  </button>

                </div>

                {errors.password && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}

              </div>

              {/* FORGOT PASSWORD */}
              <div className="text-right">

                <Link
                  href="/forgot-password"
                  className="text-sm font-semibold text-green-800 transition hover:text-green-600 hover:underline"
                >
                  Forgot password?
                </Link>

              </div>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#17633d] py-3.5 font-semibold text-white shadow-md transition duration-300 hover:bg-[#104b2e] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Logging in..." : "Login"}

                {!isSubmitting && <FiArrowRight size={19} />}

              </button>

            </form>

            {/* DIVIDER */}
            <div className="my-6 flex items-center gap-4">

              <div className="h-px flex-1 bg-gray-200" />

              <span className="text-xs font-medium text-gray-400">
                OR CONTINUE WITH
              </span>

              <div className="h-px flex-1 bg-gray-200" />

            </div>

            {/* GOOGLE LOGIN */}
            <button
              type="button"
              onClick={() =>
                signIn("google", {
                  callbackUrl: "/dashboard",
                })
              }
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 py-3.5 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
            >
              <FcGoogle size={21} />
              Continue with Google
            </button>

            {/* REGISTER LINK */}
            <p className="mt-8 text-center text-sm text-gray-600">

              Don't have an account?{" "}

              <Link
                href="/register"
                className="font-bold text-green-800 transition hover:text-green-600"
              >
                Create Account
              </Link>

            </p>

          </div>

        </section>

      </div>

    </main>
  );
}