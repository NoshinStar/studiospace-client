"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { clientFetch } from "@/lib/api-client";

export default function CancelBookingButton({
  bookingId,
  userEmail,
}: {
  bookingId: string;
  userEmail: string;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    setLoading(true);

    try {
      const response = await clientFetch(`/api/bookings/${bookingId}/cancel`, {
        method: "PATCH",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not cancel booking.");
      }

      toast.success("Booking cancelled successfully!");
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="btn btn-outline btn-error btn-sm"
      >
        Cancel Booking
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-base-100 p-6 shadow-xl">
            <h2 className="text-lg font-bold">Cancel this booking?</h2>

            <p className="mt-3 text-sm text-base-content/70">
              Are you sure you want to cancel this booking? This action cannot
              be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                disabled={loading}
                className="btn btn-ghost btn-sm"
              >
                Keep Booking
              </button>

              <button
                onClick={handleCancel}
                disabled={loading}
                className="btn btn-error btn-sm"
              >
                {loading ? "Cancelling..." : "Yes, Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
