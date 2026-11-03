
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { auth } from "@/lib/auth";
import { clientFetch } from "@/lib/api-client";
import { fmt12, fmtDate } from "@/lib/format";
import type { Booking } from "@/lib/types";
import CancelBookingButton from "./CancelBookingButton";

export default async function MyBookingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login?callbackUrl=/my-bookings");
  }

  let bookings: Booking[] = [];

try {
  const response = await clientFetch("/api/my-bookings", {
    cache: "no-store",
  });

  if (response.ok) {
    const data = await response.json();
    bookings = Array.isArray(data) ? data : data.bookings ?? [];
  }
} catch (error) {
  console.error("Failed to load bookings:", error);
}

  return (
    <main className="min-h-screen bg-base-200 px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Bookings</h1>
          <p className="mt-2 text-base-content/70">
            View and manage your workspace bookings.
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="rounded-2xl bg-base-100 p-10 text-center shadow-sm">
            <CalendarDays className="mx-auto mb-4 h-12 w-12 text-base-content/40" />
            <h2 className="text-xl font-semibold">No bookings yet</h2>
            <p className="mt-2 text-base-content/60">
              You haven&apos;t booked a workspace yet.
            </p>
            <Link href="/studios" className="btn btn-primary mt-6">
              Explore Workspaces
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="overflow-hidden rounded-2xl bg-base-100 shadow-sm"
              >
                <div className="flex flex-col gap-5 p-5 sm:flex-row">
                  {booking.studioImage && (
                    <img
                      src={booking.studioImage}
                      alt={booking.studioTitle}
                      className="h-44 w-full rounded-xl object-cover sm:w-56"
                    />
                  )}

                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <h2 className="text-xl font-bold">
                        {booking.studioTitle}
                      </h2>
                      <span className="badge badge-outline">
                        {booking.status}
                      </span>
                    </div>

                    <p className="mt-3 flex items-center gap-2 text-sm text-base-content/70">
                      <MapPin size={16} />
                      {booking.studioLocation}
                    </p>

                    <p className="mt-2 flex items-center gap-2 text-sm">
                      <CalendarDays size={16} />
                      {fmtDate(booking.date)}
                    </p>

                    <p className="mt-2 flex items-center gap-2 text-sm">
                      <Clock size={16} />
                      {fmt12(booking.startTime)} – {fmt12(booking.endTime)}
                      {" "}({booking.hours} hours)
                    </p>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-base-300 pt-4">
                      <div>
                        <p className="text-sm text-base-content/60">
                          Booking total
                        </p>
                        <p className="text-xl font-bold">
                          ${booking.totalPrice}
                        </p>
                      </div>

                      <p className="text-sm text-base-content/60">
                        Deposit: ${booking.securityDeposit}
                      </p>

                      {booking.status === "Pending" && (
                        <CancelBookingButton
                          bookingId={booking._id}
                          userEmail={session.user.email}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
