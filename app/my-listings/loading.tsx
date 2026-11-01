
export default function Loading() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="skeleton h-4 w-28" />

      <div className="skeleton h-10 w-80 mt-3" />

      <div className="mt-10 space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton h-20 w-full" />
        ))}
      </div>
    </section>
  );
}
