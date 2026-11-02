import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { API_URL } from "@/lib/constants";
import type { Booking, Studio } from "@/lib/types";

export const metadata = { title: "Dashboard | StudioSpace" };

async function getList<T>(path: string): Promise<T[]> {
  try {
    const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
    return res.ok ? res.json() : [];
  } catch {
    return [];
  }
}

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login?callbackUrl=/dashboard");
  const email = encodeURIComponent(session.user.email);

  const [studios, bookings] = await Promise.all([
    getList<Studio>(`/api/my-studios?email=${email}`),
    getList<Booking>(`/api/my-bookings?email=${email}`),
  ]);
  const pending = bookings.filter((b) => b.status === "Pending").length;

  const cards = [
    { label: "My studio listings", value: studios.length, sub: "", href: "/my-listings", cta: "Manage listings" },
    { label: "My bookings", value: bookings.length, sub: `${pending} pending`, href: "/my-bookings", cta: "View bookings" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <p className="eyebrow">• Dashboard</p>
      <h1 className="section-title mt-2">
        Welcome, <em>{session.user.name.split(" ")[0]}</em>
      </h1>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <div key={c.label} className="card bg-base-200 h-full">
            <div className="card-body gap-2">
              <p className="text-sm opacity-70">{c.label}</p>
              <p className="text-4xl font-bold">{c.value}</p>
              <p className="text-sm text-primary min-h-5">{c.sub}</p>
              <Link href={c.href} className="btn btn-outline btn-primary btn-sm mt-2 self-start">
                {c.cta}
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/add-studio" className="btn btn-primary">Add New Studio</Link>
        <Link href="/studios" className="btn btn-outline">Explore Studios</Link>
      </div>
    </section>
  );
}