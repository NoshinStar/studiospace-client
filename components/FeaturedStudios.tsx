import Link from "next/link";
import StudioCard from "./StudioCard";
import { API_URL } from "@/lib/constants";
import type { Studio } from "@/lib/types";

async function getFeatured(): Promise<Studio[] | null> {
  try {
    const res = await fetch(`${API_URL}/api/studios?sort=newest&limit=6`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function FeaturedStudios() {
  const studios = await getFeatured();

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <p className="eyebrow">• Featured spaces</p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
        <h2 className="section-title">
          Fresh studios, <em>ready to book</em>
        </h2>
        <Link href="/studios" className="btn btn-outline btn-primary">View all studios</Link>
      </div>

      <div className="mt-10">
        {studios === null ? (
          <p className="text-center opacity-70 py-12">We couldn&apos;t load studios right now. Please refresh.</p>
        ) : studios.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-bold">No studios listed yet</h3>
            <p className="opacity-70 mt-2 mb-6">Be the first host on StudioSpace.</p>
            <Link href="/add-studio" className="btn btn-primary">List a studio</Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {studios.map((s) => (
              <StudioCard key={s._id} studio={s} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}