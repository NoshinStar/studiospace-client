import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { API_URL } from "@/lib/constants";
import { fmt12, fmtDate } from "@/lib/format";
import type { Booking } from "@/lib/types";
import HostActions from "./HostActions";

export const metadata = { title: "Booking Requests | StudioSpace" };

const badge: Record<Booking["status"], string> = {
  Pending: "badge-warning",
  Confirmed: "badge-success",
  Completed: "badge-info",
  Cancelled: "badge-error",
};

async function getRequests(email: string): Promise<Booking[] | null> {
  try {
    const res = await fetch(`${API_URL}/api/host-bookings?email=${encodeURIComponent(email)}`, {
      cache: "no-store",
    });
    return res.ok ? res.json() : null;
  } catch {
    return null;
  }
}

export default async function HostRequestsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login?callbackUrl=/host-requests");
  const requests = await getRequests(session.user.email);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <p className="eyebrow">• Host dashboard</p>
      <h1 className="section-title mt-2">
        Booking <em>requests</em>
      </h1>

      <div className="mt-10">
        {requests === null ? (
          <p className="text-center py-20 opacity-70">We couldn&apos;t load requests. Please refresh.</p>
        ) : requests.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold">No booking requests yet</h2>
            <p className="opacity-70 mt-2 mb-6">Requests for your studios will show up here.</p>
            <Link href="/my-listings" className="btn btn-primary">View my listings</Link>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-box border border-base-300">
            <table className="table">
              <thead>
                <tr>
                  <th>Studio</th>
                  <th>Guest</th>
                  <th>When</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((b) => (
                  <tr key={b._id}>
                    <td className="font-semibold min-w-44">{b.studioTitle}</td>
                    <td className="min-w-44">
                      <p>{b.userName}</p>
                      <p className="text-xs opacity-60">{b.userEmail}</p>
                    </td>
                    <td className="min-w-48">
                      <p>{fmtDate(b.date)}</p>
                      <p className="text-xs opacity-60">
                        {fmt12(b.startTime)} to {fmt12(b.endTime)}
                      </p>
                    </td>
                    <td>${b.totalPrice}</td>
                    <td><span className={`badge ${badge[b.status]}`}>{b.status}</span></td>
                    <td>
                      <HostActions id={b._id} email={session.user.email} status={b.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}