export default function Loading() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div>
          <div className="skeleton aspect-video w-full" />
          <div className="skeleton h-10 w-2/3 mt-8" />
          <div className="skeleton h-4 w-1/3 mt-4" />
          <div className="skeleton h-32 w-full mt-8" />
        </div>
        <div className="skeleton h-64 w-full" />
      </div>
    </section>
  );
}
