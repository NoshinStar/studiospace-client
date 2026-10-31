
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import GoogleButton from "@/components/GoogleButton";

export default function LoginForm({
  callbackUrl,
}: {
  callbackUrl: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email: String(form.get("email")).trim(),
        password: String(form.get("password")),
      });

      if (error) {
        toast.error(error.message || "Invalid email or password.");
        return;
      }

      toast.success("Welcome back!");
      router.push(callbackUrl);
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-base-200 shadow-md">
      <div className="card-body gap-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="form-control w-full">
            <span className="label-text mb-1">Email</span>
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="input input-bordered w-full"
            />
          </label>

          <label className="form-control w-full">
            <span className="label-text mb-1">Password</span>
            <input
              name="password"
              type="password"
              required
              placeholder="Your password"
              className="input input-bordered w-full"
            />

            <button
              type="button"
              onClick={() => toast.info("Password reset is coming soon.")}
              className="link link-hover text-sm text-right mt-1 self-end"
            >
              Forgot Password?
            </button>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="divider my-0">OR</div>

        <GoogleButton callbackURL={callbackUrl} />

        <p className="text-center text-sm">
          New to StudioSpace?{" "}
          <Link href="/register" className="link link-primary font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
