import LoginForm from "./LoginForm";
import { safeCallback } from "@/lib/validators";

export const metadata = {
  title: "Login | StudioSpace",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;

  return (
    <section className="max-w-md mx-auto px-4 py-16">
      <h1 className="section-title text-center">
        Welcome <em>back</em>
      </h1>

      <p className="text-center opacity-70 mt-2 mb-8">
        Log in to manage your bookings and listings.
      </p>

      <LoginForm callbackUrl={safeCallback(callbackUrl)} />
    </section>
  );
}