"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function BookButton({ studioId }: { studioId: string }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const handleClick = () => {
    if (!session) {
      toast.info("Please log in to book this studio.");
      router.push(`/login?callbackUrl=/studios/${studioId}`);
      return;
    }
    toast.info("Booking is being set up. Check back in the next step.");
  };

  return (
    <button onClick={handleClick} className="btn btn-primary w-full">
      Book Workspace Now
    </button>
  );
}