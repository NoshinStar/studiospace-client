"use client";

import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function GoogleButton({
  callbackURL = "/",
}: {
  callbackURL?: string;
}) {
  const handleGoogle = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL,
    });

    if (error) {
      toast.error(
        error.message || "Google sign-in failed. Please try again."
      );
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogle}
      className="btn btn-outline w-full gap-2"
    >
      <FcGoogle size={22} />
      Continue with Google
    </button>
  );
}