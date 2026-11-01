export default function Loading() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="skeleton h-4 w-24" />
      <div className="skeleton h-10 w-72 mt-3" />
      <div className="skeleton h-12 w-full mt-8" />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card bg-base-200 overflow-hidden">
            <div className="skeleton aspect-4/3 w-full rounded-none" />
            <div className="p-5 space-y-3">
              <div className="skeleton h-5 w-3/4" />
              <div className="skeleton h-4 w-1/2" />
              <div className="skeleton h-9 w-full" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}