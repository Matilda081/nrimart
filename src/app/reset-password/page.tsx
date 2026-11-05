import ResetPasswordForm from "./ResetPasswordForm";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{
    token?: string;
    email?: string;
  }>;
}) {
  const params = await searchParams;

  return (
    <ResetPasswordForm
      token={params.token || ""}
      email={params.email || ""}
    />
  );
}