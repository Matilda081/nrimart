import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";
export default async function DashboardPage() {
  const session = await auth();

  // Protect the dashboard
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-10 shadow-lg text-center">
        <h1 className="text-3xl font-bold text-green-900">
          Welcome to NriMart!
        </h1>

        <p className="mt-3 text-gray-600">
          You have successfully logged in.
        </p>

        <div className="mt-6 space-y-3 text-left">
          <p>
            <strong>Name:</strong> {session.user.name || "Not provided"}
          </p>

          <p>
            <strong>Email:</strong> {session.user.email}
          </p>

          <p>
            <strong>Role:</strong> {session.user.role}
          </p>

          <LogoutButton/>
        </div>
      </div>
    </main>
  );
}