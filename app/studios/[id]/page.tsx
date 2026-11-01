import { notFound } from "next/navigation";
import { MapPin, Star, Users, ShieldCheck, Check } from "lucide-react";
import StudioGallery from "@/components/StudioGallery";
import { API_URL } from "@/lib/constants";
import type { Studio } from "@/lib/types";
import BookButton from "./BookButton";

type Review = { name?: string; rating?: number; comment?: string };

async function getStudio(id: string): Promise<Studio | null> {
  try {
    const res = await fetch(`${API_URL}/api/studios/${id}`, { cache: "no-store" });
    if (res.status === 404 || res.status === 400) return null;
    if (!res.ok) throw new Error("Failed to load");
    return res.json();
  } catch {
    throw new Error("We couldn't load this studio right now.");
  }
}

export default async function StudioDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const studio = await getStudio(id);
  if (!studio) notFound();

  const images = [studio.image, ...(studio.gallery ?? [])].filter(Boolean);
  const reviews = ((studio as Studio & { reviews?: Review[] }).reviews ?? []) as Review[];

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="min-w-0">
          <StudioGallery images={images} title={studio.title} />

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="badge badge-primary">{studio.category}</span>
            <span className="badge badge-outline gap-1">
              <Star size={12} className="fill-current" />
              {studio.rating > 0 ? studio.rating.toFixed(1) : "New"}
            </span>
          </div>

          <h1 className="section-title mt-3">{studio.title}</h1>
          <p className="flex items-center gap-1 mt-2 opacity-70">
            <MapPin size={16} /> {studio.location}
          </p>

          <h2 className="text-xl font-bold mt-10 mb-3">About this space</h2>
          <p className="leading-relaxed opacity-90 whitespace-pre-line">{studio.overview}</p>

          <h2 className="text-xl font-bold mt-10 mb-3">Amenities</h2>
          {studio.amenities?.length ? (
            <ul className="grid gap-2 sm:grid-cols-2">
              {studio.amenities.map((a) => (
                <li key={a} className="flex items-center gap-2">
                  <Check size={16} className="text-primary" /> {a}
                </li>
              ))}
            </ul>
          ) : (
            <p className="opacity-70">The host hasn&apos;t listed amenities yet.</p>
          )}

          <h2 className="text-xl font-bold mt-10 mb-3">Reviews</h2>
          {reviews.length === 0 ? (
            <div className="rounded-box bg-base-200 p-6 text-center">
              <p className="font-semibold">No reviews yet</p>
              <p className="text-sm opacity-70 mt-1">Be the first to book and share your experience.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((r, i) => (
                <div key={i} className="rounded-box bg-base-200 p-5">
                  <p className="font-semibold">{r.name ?? "Creator"}</p>
                  {r.rating ? <p className="text-sm opacity-70">{r.rating} / 5</p> : null}
                  <p className="mt-2">{r.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 h-fit space-y-6">
          <div className="card bg-base-200 shadow-md">
            <div className="card-body gap-4">
              <p className="text-3xl font-bold">
                ${studio.hourlyRate} <span className="text-base font-normal opacity-70">/ hour</span>
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Users size={16} className="text-primary" /> Up to {studio.maxCapacity} people
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-primary" /> ${studio.securityDeposit} refundable deposit
                </li>
              </ul>
              <BookButton studioId={studio._id} />
            </div>
          </div>

          <div className="card bg-base-200 shadow-md">
            <div className="card-body gap-3">
              <h3 className="font-bold">Hosted by</h3>
              <div className="flex items-center gap-3">
                <div className="avatar avatar-placeholder">
                  <div className="bg-primary text-primary-content w-12 rounded-full">
                    <span>{studio.ownerName?.charAt(0).toUpperCase()}</span>
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="font-semibold truncate">{studio.ownerName}</p>
                  <p className="text-sm opacity-70 truncate">{studio.ownerEmail}</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}