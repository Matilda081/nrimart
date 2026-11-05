"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  FiLock,
  FiCheckCircle,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiShield,
} from "react-icons/fi";

export default function ResetPasswordForm({
  token,
  email,
}: {
  token: string;
  email: string;
}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // PASSWORD STRENGTH
  const strength = [
    password.length >= 8,
    /[A-Z]/.test(password) && /[a-z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length;

  const strengthLabel = [
    "Enter a password",
    "Weak",
    "Fair",
    "Good",
    "Strong",
  ][strength];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Password reset failed");
        return;
      }

      setSuccess(true);
      toast.success("Password changed successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
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
        <div className="relative overflow-hidden bg-[#123d2a] px-6 py-9 text-center sm:px-8">

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

              <FiLock className="text-4xl text-[#e5b94f]" />

            </div>

            <p className="mt-5 text-sm font-medium tracking-wide text-green-100">
              ACCOUNT SECURITY
            </p>

          </div>
        </div>

        {/* FORM CONTENT */}
        <div className="px-6 py-9 sm:px-9 sm:py-10">

          {success ? (

            /* SUCCESS SCREEN */
            <div className="py-5 text-center">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50 shadow-inner">

                <FiCheckCircle className="text-5xl text-green-600" />

              </div>

              <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-green-700">
                Password successfully changed
              </p>

              <h2 className="mt-3 text-3xl font-bold text-gray-900">
                Password Updated!
              </h2>

              <p className="mt-4 text-sm leading-7 text-gray-500">
                Your NriMart account password has been changed successfully.
                You can now log in using your new password.
              </p>

              <Link
                href="/login"
                className="group mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#17633d] py-4 font-semibold text-white shadow-lg shadow-green-900/15 transition duration-300 hover:-translate-y-1 hover:bg-[#104b2e] hover:shadow-xl"
              >
                Go to Login
                <FiArrowRight className="transition duration-300 group-hover:translate-x-1" size={19} />
              </Link>

            </div>

          ) : (

            <>

              {/* HEADING */}
              <div className="mb-8">

                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-green-700">
                  Secure your account
                </p>

                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                  Create New Password
                </h1>

                <p className="mt-3 text-sm leading-7 text-gray-500">
                  Choose a strong new password for your NriMart account.
                  Make sure you can remember it.
                </p>

              </div>

              {/* INVALID LINK */}
              {!token || !email ? (

                <div className="rounded-xl border border-red-100 bg-red-50 p-5">

                  <p className="text-sm font-semibold text-red-700">
                    Invalid Reset Link
                  </p>

                  <p className="mt-2 text-sm leading-6 text-red-600">
                    This password reset link is incomplete. Please request
                    a new password reset link.
                  </p>

                  <Link
                    href="/forgot-password"
                    className="mt-4 inline-block text-sm font-bold text-green-800 hover:underline"
                  >
                    Request New Reset Link →
                  </Link>

                </div>

              ) : (

                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* NEW PASSWORD */}
                  <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      New Password
                    </label>

                    <div className="group relative">

                      <FiLock
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition group-focus-within:text-green-700"
                        size={19}
                      />

                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your new password"
                        required
                        minLength={8}
                        autoComplete="new-password"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-12 text-sm text-gray-800 outline-none transition duration-300 placeholder:text-gray-400 focus:border-green-700 focus:bg-white focus:ring-4 focus:ring-green-700/10"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-green-800"
                      >
                        {showPassword ? (
                          <FiEyeOff size={19} />
                        ) : (
                          <FiEye size={19} />
                        )}
                      </button>

                    </div>

                    {/* PASSWORD STRENGTH */}
                    {password.length > 0 && (

                      <div className="mt-3">

                        <div className="flex items-center justify-between">

                          <span className="text-xs text-gray-500">
                            Password strength
                          </span>

                          <span className="text-xs font-semibold text-green-800">
                            {strengthLabel}
                          </span>

                        </div>

                        <div className="mt-2 flex gap-1.5">

                          {[1, 2, 3, 4].map((level) => (
                            <div
                              key={level}
                              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                                strength >= level
                                  ? strength === 1
                                    ? "bg-red-400"
                                    : strength === 2
                                      ? "bg-yellow-400"
                                      : strength === 3
                                        ? "bg-green-400"
                                        : "bg-green-700"
                                  : "bg-gray-200"
                              }`}
                            />
                          ))}

                        </div>

                        <p className="mt-2 text-xs text-gray-400">
                          Use at least 8 characters, uppercase and lowercase
                          letters, numbers and symbols.
                        </p>

                      </div>

                    )}

                  </div>

                  {/* CONFIRM PASSWORD */}
                  <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Confirm New Password
                    </label>

                    <div className="group relative">

                      <FiLock
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition group-focus-within:text-green-700"
                        size={19}
                      />

                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your new password"
                        required
                        minLength={8}
                        autoComplete="new-password"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-12 text-sm text-gray-800 outline-none transition duration-300 placeholder:text-gray-400 focus:border-green-700 focus:bg-white focus:ring-4 focus:ring-green-700/10"
                      />

                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-green-800"
                      >
                        {showConfirmPassword ? (
                          <FiEyeOff size={19} />
                        ) : (
                          <FiEye size={19} />
                        )}
                      </button>

                    </div>

                    {confirmPassword.length > 0 && (
                      <p className={`mt-2 text-xs ${
                        password === confirmPassword
                          ? "text-green-700"
                          : "text-red-500"
                      }`}>
                        {password === confirmPassword
                          ? "✓ Passwords match"
                          : "Passwords do not match"}
                      </p>
                    )}

                  </div>

                  {/* SECURITY NOTICE */}
                  <div className="flex items-start gap-3 rounded-xl border border-green-100 bg-green-50/70 p-4">

                    <FiShield className="mt-0.5 shrink-0 text-green-700" size={19} />

                    <p className="text-xs leading-6 text-gray-600">
                      Keep your password private. Never share your account
                      password with anyone.
                    </p>

                  </div>

                  {/* RESET BUTTON */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#17633d] py-4 font-semibold text-white shadow-lg shadow-green-900/15 transition duration-300 hover:-translate-y-1 hover:bg-[#104b2e] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                  >

                    {loading ? (
                      <>
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Updating Password...
                      </>
                    ) : (
                      <>
                        Reset Password
                        <FiArrowRight className="transition duration-300 group-hover:translate-x-1" size={19} />
                      </>
                    )}

                  </button>

                </form>

              )}

            </>

          )}

          {/* BACK TO LOGIN */}
          {!success && (
            <div className="mt-9 border-t border-gray-100 pt-6 text-center">

              <Link
                href="/login"
                className="text-sm font-semibold text-green-800 transition hover:text-green-600 hover:underline"
              >
                ← Back to Login
              </Link>

            </div>
          )}

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