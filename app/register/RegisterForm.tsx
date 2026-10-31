
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { validatePassword } from "@/lib/validators";
import GoogleButton from "@/components/GoogleButton";

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const name = String(form.get("name")).trim();
    const email = String(form.get("email")).trim();
    const image = String(form.get("photo")).trim();
    const password = String(form.get("password"));

    const err = validatePassword(password);
    setPasswordError(err);
    if (err) return;

    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        image: image || undefined,
      });

      if (error) {
        toast.error(error.message || "Registration failed. Please try again.");
        return;
      }

      toast.success("Account created! Please log in.");
      router.push("/login");
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
            <span className="label-text mb-1">Name</span>
            <input name="name" type="text" required placeholder="Your full name" className="input input-bordered w-full" />
          </label>

          <label className="form-control w-full">
            <span className="label-text mb-1">Email</span>
            <input name="email" type="email" required placeholder="you@example.com" className="input input-bordered w-full" />
          </label>

          <label className="form-control w-full">
            <span className="label-text mb-1">Photo URL</span>
            <input name="photo" type="url" placeholder="https://i.ibb.co/your-photo.jpg" className="input input-bordered w-full" />
          </label>

          <label className="form-control w-full">
            <span className="label-text mb-1">Password</span>
            <input
              name="password"
              type="password"
              required
              placeholder="Min 6 chars, upper and lower case"
              className={`input input-bordered w-full ${passwordError ? "input-error" : ""}`}
              onChange={() => passwordError && setPasswordError(null)}
            />
            {passwordError && (
              <span className="text-error text-sm mt-1">{passwordError}</span>
            )}
          </label>

          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading ? <span className="loading loading-spinner loading-sm" /> : "Register"}
          </button>
        </form>

        <div className="divider my-0">OR</div>

        <GoogleButton />

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="link link-primary font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
