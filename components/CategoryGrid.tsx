import Link from "next/link";
import { Camera, Clapperboard, Mic, Music, Palette } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";

const icons = [Camera, Clapperboard, Mic, Music, Palette];

const blurbs = [
  "Cyc walls, lighting and backdrops",
  "Large stages for film and video",
  "Sound-treated rooms for audio",
  "Recording suites with live rooms",
  "Open spaces for art and craft",
];

export default function CategoryGrid() {
  return (
    <section className="bg-base-200">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <p className="eyebrow">• Browse by category</p>

        <h2 className="section-title mt-2">
          Whatever you make, <em>there&apos;s a room</em>
        </h2>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {CATEGORIES.map((c, i) => {
            const Icon = icons[i];

            return (
              <Link
                key={c.value}
                href={`/studios?category=${encodeURIComponent(c.value)}`}
                className="card bg-base-100 border border-base-300 hover:border-primary hover:-translate-y-1 transition h-full"
              >
                <div className="card-body items-start gap-3">
                  <span className="grid place-items-center w-12 h-12 rounded-full bg-primary/15 text-primary">
                    <Icon size={24} />
                  </span>

                  <h3 className="font-bold text-lg">{c.label}</h3>
                  <p className="text-sm opacity-70">{blurbs[i]}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}