
export default function MyBookingsLoading() {
  return (
    <main className="min-h-screen bg-base-200 px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <div className="skeleton mb-3 h-9 w-48" />
          <div className="skeleton h-4 w-72 max-w-full" />
        </div>

        <div className="space-y-5">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex flex-col gap-5 rounded-2xl bg-base-100 p-5 shadow-sm sm:flex-row"
            >
              <div className="skeleton h-44 w-full rounded-xl sm:w-56" />

              <div className="flex-1 space-y-4">
                <div className="skeleton h-6 w-2/3" />
                <div className="skeleton h-4 w-1/2" />
                <div className="skeleton h-4 w-1/3" />
                <div className="skeleton h-4 w-1/2" />
                <div className="skeleton mt-6 h-10 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
