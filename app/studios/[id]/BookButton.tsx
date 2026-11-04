
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { clientFetch } from "@/lib/api-client";

type StudioInfo = {
  _id: string;
  title: string;
  hourlyRate: number;
  securityDeposit: number;
  ownerEmail: string;
};

export default function BookButton({
  studio,
}: {
  studio: StudioInfo;
}) {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [hours, setHours] = useState(1);
  const [loading, setLoading] = useState(false);

  const today = new Date().toLocaleDateString("en-CA");

  const endMinutes =
    Number(startTime.split(":")[0]) * 60 +
    Number(startTime.split(":")[1]) +
    hours * 60;

  const endTime = `${String(Math.floor(endMinutes / 60)).padStart(2, "0")}:${String(
    endMinutes % 60
  ).padStart(2, "0")}`;

  const totalPrice = studio.hourlyRate * hours;

  const handleBook = async () => {
    if (!session) {
      toast.info("Please log in to book this studio.");
      router.push(`/login?callbackUrl=/studios/${studio._id}`);
      return;
    }

    if (!date) {
      toast.error("Please select a booking date.");
      return;
    }

    if (endMinutes > 24 * 60) {
      toast.error("Please choose a shorter duration.");
      return;
    }

    if (studio.ownerEmail === session.user.email) {
      toast.error("You cannot book your own studio.");
      return;
    }

    setLoading(true);

    try {
  const safeHours = hours;

  const res = await clientFetch("/api/bookings", {
    method: "POST",
    body: JSON.stringify({
      studioId: studio._id,
      date,
      startTime,
      hours: safeHours,
    }),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Booking failed.");
  }

      toast.success("Booking created successfully!");
      setIsOpen(false);
      router.push("/my-bookings");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => {
          if (!session) {
            toast.info("Please log in to book this studio.");
            router.push(`/login?callbackUrl=/studios/${studio._id}`);
            return;
          }
          setIsOpen(true);
        }}
        className="btn btn-primary w-full"
      >
        Book Workspace Now
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-base-100 p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold">Book Your Workspace</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="btn btn-ghost btn-sm"
                aria-label="Close booking modal"
              >
                ✕
              </button>
            </div>

            <p className="mb-4 font-medium">{studio.title}</p>

            <label className="mb-2 block text-sm font-medium">
              Booking Date
            </label>
            <input
              type="date"
              min={today}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input input-bordered mb-4 w-full"
            />

            <label className="mb-2 block text-sm font-medium">
              Starting Time
            </label>
            <select
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="select select-bordered mb-4 w-full"
            >
              {Array.from({ length: 18 }, (_, i) => {
                const hour = i + 6;
                const value = `${String(hour).padStart(2, "0")}:00`;
                return (
                  <option key={value} value={value}>
                    {value}
                  </option>
                );
              })}
            </select>

            <label className="mb-2 block text-sm font-medium">
              Duration
            </label>
            <select
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="select select-bordered mb-5 w-full"
            >
              {Array.from({ length: 8 }, (_, i) => i + 1).map((hour) => (
                <option key={hour} value={hour}>
                  {hour} {hour === 1 ? "hour" : "hours"}
                </option>
              ))}
            </select>

            <div className="mb-5 space-y-2 rounded-xl bg-base-200 p-4">
              <div className="flex justify-between">
                <span>Hourly rate</span>
                <span>${studio.hourlyRate}</span>
              </div>
              <div className="flex justify-between">
                <span>Duration</span>
                <span>{hours} hours</span>
              </div>
              <div className="flex justify-between">
                <span>Time</span>
                <span>
                  {startTime} – {endTime}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Security deposit (refundable)</span>
                <span>${studio.securityDeposit}</span>
              </div>
              <div className="divider my-1" />
              <div className="flex justify-between font-bold">
                <span>Booking total</span>
                <span>${totalPrice}</span>
              </div>
            </div>

            <button
              onClick={handleBook}
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
