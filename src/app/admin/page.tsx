import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import LogoutButton from "../dashboard/LogoutButton";

export default async function AdminPage() {
  const session = await auth();

  // Check if user is logged in
  if (!session?.user) {
    redirect("/login");
  }

  // Only ADMIN can access this page
  if (session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#F7F8F2]">

      {/* HEADER */}
      <header className="border-b border-green-100 bg-white px-6 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">

          <Link
            href="/"
            className="text-2xl font-extrabold text-green-900"
          >
            Nri<span className="text-green-500">Mart</span>
          </Link>

          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-800">
            ADMIN PANEL
          </span>

        </div>
      </header>

      {/* ADMIN CONTENT */}
      <div className="mx-auto max-w-7xl px-6 py-12">

        <section className="rounded-3xl bg-linear-to-r from-green-900 to-green-600 p-8 text-white shadow-lg md:p-12">

          <p className="text-sm font-semibold uppercase tracking-widest text-green-200">
            Administrator Dashboard
          </p>

          <h1 className="mt-4 text-3xl font-extrabold md:text-5xl">
            Welcome, {session.user.name || "Administrator"}!
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-green-100 md:text-base">
            Manage your NriMart platform, monitor your products
            and maintain your grocery catalogue.
          </p>

        </section>

        {/* ADMIN OVERVIEW */}
        <section className="mt-10">

          <h2 className="text-2xl font-extrabold text-gray-900">
            Admin Overview
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-2">

            <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900">
                Product Management
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Manage your NriMart rice products and package sizes.
              </p>

              <p className="mt-5 text-sm font-semibold text-green-700">
                Coming soon
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900">
                Administrator Account
              </h3>

              <p className="mt-3 text-sm text-gray-500">
                Name: {session.user.name || "Not provided"}
              </p>

              <p className="mt-2 break-all text-sm text-gray-500">
                Email: {session.user.email}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Role: {session.user.role}
              </p>
            </div>

          </div>

        </section>

        {/* NAVIGATION */}
        <section className="mt-8 flex flex-wrap items-center justify-between gap-4">

          <Link
            href="/dashboard"
            className="rounded-full border border-green-700 px-6 py-3 text-sm font-bold text-green-800 transition hover:bg-green-50"
          >
            Customer Dashboard
          </Link>

          <LogoutButton />

        </section>

      </div>

    </main>
  );
}