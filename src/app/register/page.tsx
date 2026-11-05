"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiShield,
} from "react-icons/fi";

import {
  registerSchema,
  type RegisterInput,
} from "@/lib/validations/auth";

export default function RegisterPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
    },
  });

  const onSubmit = async (values: RegisterInput) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      toast.success("Account created successfully!");
      router.push("/login");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f7ef] px-4 py-8 sm:px-6 lg:flex lg:items-center lg:justify-center lg:py-12">

      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl lg:grid-cols-2">

        {/* LEFT BRANDING SECTION */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-[#123d2a] p-10 text-white lg:flex xl:p-14">

          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-green-500/10" />
          <div className="absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-yellow-500/10" />

          <div className="relative z-10">
            <Link href="/" className="text-3xl font-extrabold tracking-tight">
              NriMart<span className="text-[#e5b94f]">.</span>
            </Link>

            <p className="mt-2 text-sm text-green-100">
              Fresh choices. Better living.
            </p>
          </div>

          <div className="relative z-10 my-12">
            <div className="mb-6 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm text-green-100">
              Welcome to NriMart
            </div>

            <h1 className="max-w-md text-4xl font-bold leading-tight xl:text-5xl">
              Quality rice for every home.
            </h1>

            <p className="mt-6 max-w-md leading-7 text-green-100">
              Join NriMart and enjoy a simple way to discover
              quality rice in the sizes your family needs.
            </p>

            <div className="mt-10 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e5b94f] text-[#123d2a]">
                <FiShield size={21} />
              </div>

              <div>
                <p className="font-semibold">Your account, your convenience</p>
                <p className="text-sm text-green-100">
                  A simple and secure shopping experience.
                </p>
              </div>
            </div>
          </div>

          <p className="relative z-10 text-sm text-green-200">
            © 2026 NriMart. All rights reserved.
          </p>
        </section>

        {/* RIGHT REGISTRATION SECTION */}
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
            <div className="mb-8">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-700">
                Get started today
              </p>

              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Create your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Join NriMart and make your shopping experience
                easier and more convenient.
              </p>
            </div>

            {/* REGISTRATION FORM */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >

              {/* FULL NAME */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Full Name
                </label>

                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={19} />

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    {...register("name")}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-sm text-gray-800 outline-none transition focus:border-green-700 focus:bg-white focus:ring-2 focus:ring-green-700/10"
                  />
                </div>

                {errors.name && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

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
                    placeholder="Create a password"
                    {...register("password")}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-12 text-sm text-gray-800 outline-none transition focus:border-green-700 focus:bg-white focus:ring-2 focus:ring-green-700/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-800"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FiEyeOff size={19} /> : <FiEye size={19} />}
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Confirm Password
                </label>

                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={19} />

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    {...register("confirmPassword")}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-12 text-sm text-gray-800 outline-none transition focus:border-green-700 focus:bg-white focus:ring-2 focus:ring-green-700/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-800"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <FiEyeOff size={19} /> : <FiEye size={19} />}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* TERMS */}
              <div>
                <label className="flex items-start gap-3 text-sm leading-6 text-gray-600">
                  <input
                    type="checkbox"
                    {...register("termsAccepted")}
                    className="mt-1 h-4 w-4 shrink-0 accent-green-800"
                  />

                  <span>
                    I agree to the{" "}
                    <Link href="/terms" className="font-semibold text-green-800 underline">
                      Terms and Conditions
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="font-semibold text-green-800 underline">
                      Privacy Policy
                    </Link>.
                  </span>
                </label>

                {errors.termsAccepted && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.termsAccepted.message}
                  </p>
                )}
              </div>

              {/* CREATE ACCOUNT */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#17633d] py-3.5 font-semibold text-white shadow-md transition duration-300 hover:bg-[#104b2e] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}

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

            {/* GOOGLE */}
            <button
              type="button"
              onClick={() =>
                signIn("google", { callbackUrl: "/dashboard" })
              }
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 py-3.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 hover:border-gray-300"
            >
              <FcGoogle size={21} />
              Continue with Google
            </button>

            {/* LOGIN LINK */}
            <p className="mt-8 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-green-800 hover:text-green-600"
              >
                Login
              </Link>
            </p>

          </div>
        </section>
      </div>
    </main>
  );
}