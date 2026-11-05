import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

import {
  FiHome,
  FiShoppingBag,
  FiUser,
  FiShield,
  FiArrowRight,
  FiCheckCircle,
} from "react-icons/fi";

export default async function DashboardPage() {
  const session = await auth();

  // Protect dashboard
  if (!session?.user) {
    redirect("/login");
  }

  const name = session.user.name || "NriMart Customer";
  const email = session.user.email || "Email unavailable";
  const role = session.user.role || "USER";

  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <main className="min-h-screen bg-[#F7F8F2]">
      {/* TOP NAVIGATION */}
      <nav className="sticky top-0 z-50 border-b border-green-100 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-tight text-green-900"
          >
            Nri<span className="text-green-500">Mart</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-green-800 transition hover:bg-green-50 sm:flex"
            >
              <FiHome />
              Home
            </Link>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 font-bold text-green-800">
              {initials}
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN DASHBOARD */}
      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-12">
        {/* WELCOME BANNER */}
        <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#123D28] via-[#17633B] to-[#279653] p-7 text-white shadow-xl md:p-12">
          <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full border-35px border-white/10" />

          <div className="absolute -bottom-24 right-36 h-56 w-56 rounded-full bg-white/5" />

          <div className="relative z-10 max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">
              <FiCheckCircle className="text-green-200" />
              Account successfully authenticated
            </div>

            <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">
              Welcome back, {name.split(" ")[0]}!
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-7 text-green-50 md:text-base">
              Welcome to your NriMart dashboard. Your favourite quality rice
              and trusted grocery shopping experience starts here.
            </p>

            <Link
              href="/"
              className="mt-7 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 font-bold text-green-900 shadow-lg transition hover:-translate-y-1 hover:bg-green-50"
            >
              Explore NriMart
              <FiArrowRight />
            </Link>
          </div>
        </section>

        {/* ACCOUNT OVERVIEW */}
        <section className="mt-10">
          <h2 className="text-2xl font-extrabold text-gray-900">
            Account Overview
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Manage and view your account information.
          </p>
        </section>

        {/* ACCOUNT CARDS */}
        <section className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {/* PERSONAL INFORMATION */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-xl text-green-800">
              <FiUser />
            </div>

            <h3 className="mt-5 text-lg font-bold text-gray-900">
              Personal Information
            </h3>

            <p className="mt-3 wrap-break-wordbreak-words text-sm text-gray-500">
              {name}
            </p>

            <p className="mt-2 break-all text-sm text-gray-500">
              {email}
            </p>
          </div>

          {/* ACCOUNT ROLE */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-xl text-amber-700">
              <FiShield />
            </div>

            <h3 className="mt-5 text-lg font-bold text-gray-900">
              Account Role
            </h3>

            <p className="mt-3 text-sm text-gray-500">
              Your current account permission.
            </p>

            <span className="mt-3 inline-flex rounded-full bg-green-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-green-800">
              {role}
            </span>
          </div>

          {/* SHOPPING */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-xl text-orange-600">
              <FiShoppingBag />
            </div>

            <h3 className="mt-5 text-lg font-bold text-gray-900">
              Start Shopping
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Discover quality Nigerian rice in different package sizes.
            </p>

            <Link
              href="/"
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-green-700 hover:text-green-900"
            >
              Browse Products
              <FiArrowRight />
            </Link>
          </div>
        </section>

        {/* ACCOUNT STATUS */}
        <section className="mt-8 rounded-2xl border border-green-100 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Your Account is Active
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                You have successfully signed in to NriMart.
                Your account information is available securely.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm font-semibold text-green-700">
              <FiCheckCircle className="text-xl" />
              Verified Session
            </div>
          </div>
        </section>

        {/* LOGOUT */}
        <section className="mt-8 flex justify-end">
          <LogoutButton />
        </section>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 bg-white px-5 py-7 text-center">
        <p className="text-sm text-gray-500">
          © 2026 NriMart. Quality Rice, Trusted Shopping.
        </p>
      </footer>
    </main>
  );
}