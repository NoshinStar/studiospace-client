
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Pencil } from "lucide-react";
import { auth } from "@/lib/auth";
import { API_URL } from "@/lib/constants";
import type { Studio } from "@/lib/types";
import DeleteStudioButton from "./DeleteStudioButton";

export const metadata = {
  title: "My Studio Listings | StudioSpace",
};

async function getMyStudios(email: string): Promise<Studio[] | null> {
  try {
    const res = await fetch(
      `${API_URL}/api/my-studios?email=${encodeURIComponent(email)}`,
      { cache: "no-store" }
    );

    if (!res.ok) return null;

    return res.json();
  } catch {
    return null;
  }
}

export default async function MyListingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login?callbackUrl=/my-listings");
  }

  const studios = await getMyStudios(session.user.email);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">• Host dashboard</p>
          <h1 className="section-title mt-2">
            My studio <em>listings</em>
          </h1>
        </div>

        <Link href="/add-studio" className="btn btn-primary">
          Add New Studio
        </Link>
      </div>

      <div className="mt-10">
        {studios === null ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold">
              We couldn&apos;t load your listings
            </h2>
            <p className="opacity-70 mt-2">
              Please refresh the page in a moment.
            </p>
          </div>
        ) : studios.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold">
              You haven&apos;t listed any studios yet
            </h2>
            <p className="opacity-70 mt-2 mb-6">
              List your first space and start getting bookings.
            </p>
            <Link href="/add-studio" className="btn btn-primary">
              List a studio
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-box border border-base-300">
            <table className="table">
              <thead>
                <tr>
                  <th>Studio</th>
                  <th>Category</th>
                  <th>Rate</th>
                  <th>Location</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {studios.map((s) => (
                  <tr key={s._id}>
                    <td>
                      <div className="flex items-center gap-3 min-w-56">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={s.image}
                          alt={s.title}
                          className="w-16 h-12 rounded-lg object-cover"
                        />

                        <Link
                          href={`/studios/${s._id}`}
                          className="font-semibold hover:text-primary"
                        >
                          {s.title}
                        </Link>
                      </div>
                    </td>

                    <td>
                      <span className="badge badge-primary badge-outline">
                        {s.category}
                      </span>
                    </td>

                    <td className="whitespace-nowrap">
                      ${s.hourlyRate} / hr
                    </td>

                    <td>{s.location}</td>

                    <td>
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/studios/edit/${s._id}`}
                          className="btn btn-outline btn-sm gap-1"
                        >
                          <Pencil size={14} />
                          Update
                        </Link>

                        <DeleteStudioButton
                          id={s._id}
                          title={s.title}
                        />
                      </div>
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
