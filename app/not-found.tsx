import Link from "next/link";

export default function NotFound() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-20 text-center">
      <svg
        viewBox="0 0 200 150"
        className="w-56 mx-auto text-primary"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <rect x="20" y="55" width="160" height="80" rx="8" />
        <path d="M20 55 L32 22 H180 V55 Z" />
        <path d="M62 22 L50 55 M102 22 L90 55 M142 22 L130 55" />
        <text x="100" y="108" textAnchor="middle" fontSize="36" fontWeight="700" fill="currentColor" stroke="none">
          404
        </text>
      </svg>
      <p className="eyebrow mt-6">• Page not found</p>
      <h1 className="section-title mt-2">
        This scene <em>was cut</em>
      </h1>
      <p className="opacity-70 mt-3 max-w-md mx-auto">
        The page you&apos;re looking for doesn&apos;t exist or has moved to another set.
      </p>
      <Link href="/" className="btn btn-primary mt-8">Return to Home</Link>
    </section>
  );
}