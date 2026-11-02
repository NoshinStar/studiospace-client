"use client";
import Link from "next/link";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="max-w-xl mx-auto px-4 py-24 text-center">
      <p className="eyebrow">• Something went wrong</p>
      <h1 className="section-title mt-2">
        We hit a <em>snag</em>
      </h1>
      <p className="opacity-70 mt-3">Please try again. If it keeps happening, come back in a few minutes.</p>
      <div className="mt-8 flex justify-center gap-3">
        <button onClick={reset} className="btn btn-primary">Try again</button>
        <Link href="/" className="btn btn-outline">Home</Link>
      </div>
    </section>
  );
}