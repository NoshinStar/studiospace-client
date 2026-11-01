import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import type { Studio } from "@/lib/types";

export default function StudioCard({ studio }: { studio: Studio }) {
  return (
    <div className="card bg-base-200 shadow-md h-full overflow-hidden">
      <figure className="relative aspect-4/3 w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={studio.image} alt={studio.title} className="w-full h-full object-cover" />
        <span className="badge badge-primary absolute top-3 left-3">{studio.category}</span>
      </figure>
      <div className="card-body p-5 flex flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3 className="card-title text-lg line-clamp-1">{studio.title}</h3>
          <span className="badge badge-outline gap-1 shrink-0">
            <Star size={12} className="fill-current" />
            {studio.rating > 0 ? studio.rating.toFixed(1) : "New"}
          </span>
        </div>
        <p className="flex items-center gap-1 text-sm opacity-70 line-clamp-1">
          <MapPin size={14} /> {studio.location}
        </p>
        <div className="mt-auto pt-4 flex items-center justify-between">
          <p className="font-bold text-lg">
            ${studio.hourlyRate} <span className="text-sm font-normal opacity-70">/ hr</span>
          </p>
          <Link href={`/studios/${studio._id}`} className="btn btn-primary btn-sm">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}