import Link from "next/link";
import StudioCard from "@/components/StudioCard";
import { API_URL, CATEGORIES } from "@/lib/constants";
import type { Studio } from "@/lib/types";

export const metadata = { title: "Explore Studios | StudioSpace" };

type Params = { category?: string; search?: string; sort?: string };

async function getStudios(params: Params): Promise<Studio[] | null> {
  const qs = new URLSearchParams();
  if (params.category) qs.set("category", params.category);
  if (params.search) qs.set("search", params.search);
  if (params.sort) qs.set("sort", params.sort);
  try {
    const res = await fetch(`${API_URL}/api/studios?${qs}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function StudiosPage({
  searchParams,
}: {
  searchParams: Promise<Params>;
}) {
  const params = await searchParams;
  const studios = await getStudios(params);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <p className="eyebrow">• Our spaces</p>
      <h1 className="section-title mt-2">
        Find your <em>perfect studio</em>
      </h1>

      <form action="/studios" method="get" className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_220px_220px_auto]">
        <input
          name="search"
          defaultValue={params.search ?? ""}
          placeholder="Search by name or location"
          className="input input-bordered w-full"
        />
        <select name="category" defaultValue={params.category ?? ""} className="select select-bordered w-full">
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
        <select name="sort" defaultValue={params.sort ?? "newest"} className="select select-bordered w-full">
          <option value="newest">Newest</option>
          <option value="rating">Top rated</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
        </select>
        <button type="submit" className="btn btn-primary">Apply</button>
      </form>

      <div className="mt-10">
        {studios === null ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold">We couldn&apos;t load studios right now</h2>
            <p className="opacity-70 mt-2">Please refresh the page in a moment.</p>
          </div>
        ) : studios.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold">No studios match your search</h2>
            <p className="opacity-70 mt-2 mb-6">Try a different keyword or clear the filters.</p>
            <Link href="/studios" className="btn btn-primary">Clear filters</Link>
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