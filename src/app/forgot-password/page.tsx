"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  FiMail,
  FiArrowLeft,
  FiCheckCircle,
  FiShield,
  FiArrowRight,
} from "react-icons/fi";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Something went wrong");
        return;
      }

      setSubmitted(true);
      toast.success("Check your email for reset instructions");
    } catch (error) {
      console.error(error);
      toast.error("Unable to process your request");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f8f7ef] px-4 py-10 sm:px-6">

      {/* ANIMATED BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-green-300/30 blur-3xl animate-pulse" />

        <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-yellow-300/25 blur-3xl animate-pulse" />

        <div className="absolute right-1/4 top-1/4 h-40 w-40 rounded-full bg-green-200/30 blur-3xl animate-pulse" />

        <div className="absolute left-1/4 top-1/3 h-3 w-3 rounded-full bg-[#d6a83c]/50 animate-bounce" />

        <div className="absolute bottom-1/4 right-1/4 h-2 w-2 rounded-full bg-green-600/40 animate-ping" />

      </div>

      {/* MAIN CARD */}
      <div className="relative z-10 mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-white/70 bg-white shadow-2xl shadow-green-900/10">

        {/* BRANDING HEADER */}
        <div className="relative overflow-hidden bg-[#123d2a] px-6 py-10 text-center sm:px-8">

          {/* HEADER GLOW EFFECTS */}
          <div className="absolute -right-12 -top-16 h-48 w-48 rounded-full bg-[#e5b94f]/20 blur-3xl animate-pulse" />

          <div className="absolute -bottom-16 -left-12 h-48 w-48 rounded-full bg-green-400/20 blur-3xl animate-pulse" />

          <div className="relative z-10">

            <Link
              href="/"
              className="text-3xl font-extrabold tracking-tight text-white"
            >
              NriMart<span className="text-[#e5b94f]">.</span>
            </Link>

            <p className="mt-2 text-sm text-green-100">
              Fresh choices. Better living.
            </p>

            <div className="mx-auto mt-7 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/20 bg-white/10 shadow-lg backdrop-blur-sm transition duration-500 hover:scale-110">

              <FiMail className="text-4xl text-[#e5b94f]" />

            </div>

            <p className="mt-5 text-sm font-medium tracking-wide text-green-100">
              ACCOUNT RECOVERY
            </p>

          </div>
        </div>

        {/* FORM SECTION */}
        <div className="px-6 py-9 sm:px-9 sm:py-10">

          {!submitted ? (
            <>

              <div className="mb-8">

                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-green-700">
                  Don't worry, we've got you
                </p>

                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                  Forgot Password?
                </h1>

                <p className="mt-3 text-sm leading-7 text-gray-500">
                  It happens! Enter the email address associated with your
                  NriMart account and we'll send you a secure link to reset
                  your password.
                </p>

              </div>

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* EMAIL INPUT */}
                <div>

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Email Address
                  </label>

                  <div className="group relative">

                    <FiMail
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition group-focus-within:text-green-700"
                      size={19}
                    />

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your registered email"
                      required
                      autoComplete="email"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-4 text-sm text-gray-800 outline-none transition duration-300 placeholder:text-gray-400 focus:border-green-700 focus:bg-white focus:ring-4 focus:ring-green-700/10"
                    />

                  </div>

                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#17633d] py-4 font-semibold text-white shadow-lg shadow-green-900/15 transition duration-300 hover:-translate-y-1 hover:bg-[#104b2e] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >

                  {isLoading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Sending instructions...
                    </>
                  ) : (
                    <>
                      Send Reset Link
                      <FiArrowRight className="transition duration-300 group-hover:translate-x-1" size={19} />
                    </>
                  )}

                </button>

              </form>

              {/* SECURITY MESSAGE */}
              <div className="mt-7 flex items-start gap-3 rounded-xl border border-green-100 bg-green-50/70 p-4">

                <FiShield className="mt-0.5 shrink-0 text-green-700" size={19} />

                <p className="text-xs leading-6 text-gray-600">
                  Your account security matters to us. We'll only send
                  password reset instructions to your registered email.
                </p>

              </div>

            </>
          ) : (

            /* SUCCESS MESSAGE */
            <div className="py-5 text-center">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50 shadow-inner">

                <FiCheckCircle className="text-5xl text-green-600" />

              </div>

              <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-green-700">
                Email instructions sent
              </p>

              <h2 className="mt-3 text-3xl font-bold text-gray-900">
                Check Your Email!
              </h2>

              <p className="mt-4 text-sm leading-7 text-gray-500">
                If an account exists for{" "}
                <strong className="break-all text-gray-800">
                  {email}
                </strong>
                , you'll receive instructions to reset your password.
              </p>

              <div className="mt-7 rounded-xl border border-green-100 bg-green-50 p-4">

                <FiMail className="mx-auto text-2xl text-green-700" />

                <p className="mt-2 text-sm font-medium text-green-900">
                  Please check your inbox and spam folder.
                </p>

              </div>

              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-6 text-sm font-semibold text-green-800 transition hover:text-green-600 hover:underline"
              >
                Try another email address
              </button>

            </div>

          )}

          {/* BACK TO LOGIN */}
          <div className="mt-9 border-t border-gray-100 pt-6">

            <Link
              href="/login"
              className="group flex items-center justify-center gap-2 text-sm font-semibold text-green-800 transition hover:text-green-600"
            >

              <FiArrowLeft className="transition duration-300 group-hover:-translate-x-1" />

              Back to Login

            </Link>

          </div>

        </div>

        {/* FOOTER */}
        <div className="border-t border-gray-100 bg-gray-50 px-6 py-5 text-center">

          <p className="text-xs text-gray-400">
            © 2026 NriMart. All rights reserved.
          </p>

        </div>

      </div>

    </main>
  );
}