"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { API_URL, AMENITIES, CATEGORIES } from "@/lib/constants";
import { uploadToImgbb } from "@/lib/imgbb";
import type { Studio } from "@/lib/types";

export default function EditStudioForm({ studio }: { studio: Studio }) {
  const router = useRouter();
  const [image, setImage] = useState(studio.image);
  const [amenities, setAmenities] = useState<string[]>(studio.amenities ?? []);
  const [custom, setCustom] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const toggleAmenity = (a: string) =>
    setAmenities((prev) => (prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]));

  const addCustom = () => {
    const v = custom.trim();
    if (!v) return;
    if (!amenities.includes(v)) setAmenities([...amenities, v]);
    setCustom("");
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      setImage(await uploadToImgbb(file));
      toast.success("Image uploaded.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please upload an image or paste an image URL.");
      return;
    }
    const f = new FormData(e.currentTarget);
    const gallery = String(f.get("gallery") ?? "")
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      title: String(f.get("title")),
      category: String(f.get("category")),
      hourlyRate: Number(f.get("hourlyRate")),
      securityDeposit: Number(f.get("securityDeposit")),
      maxCapacity: Number(f.get("maxCapacity")),
      location: String(f.get("location")),
      image,
      gallery,
      amenities,
      overview: String(f.get("overview")),
    };

    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/studios/${studio._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update the studio.");
      toast.success("Studio updated successfully!");
      router.push("/my-listings");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const field = "input input-bordered w-full";
  const customAmenities = amenities.filter((a) => !AMENITIES.includes(a));

  return (
    <form onSubmit={handleSubmit} className="card bg-base-200 shadow-md">
      <div className="card-body gap-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="form-control sm:col-span-2">
            <span className="label-text mb-1">Studio title</span>
            <input name="title" required defaultValue={studio.title} className={field} />
          </label>

          <label className="form-control">
            <span className="label-text mb-1">Category</span>
            <select name="category" required defaultValue={studio.category} className="select select-bordered w-full">
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.value}</option>
              ))}
            </select>
          </label>

          <label className="form-control">
            <span className="label-text mb-1">Location / address</span>
            <input name="location" required defaultValue={studio.location} className={field} />
          </label>

          <label className="form-control">
            <span className="label-text mb-1">Hourly rate ($)</span>
            <input name="hourlyRate" type="number" min="1" required defaultValue={studio.hourlyRate} className={field} />
          </label>

          <label className="form-control">
            <span className="label-text mb-1">Security deposit ($)</span>
            <input name="securityDeposit" type="number" min="0" required defaultValue={studio.securityDeposit} className={field} />
          </label>

          <label className="form-control">
            <span className="label-text mb-1">Max capacity (people)</span>
            <input name="maxCapacity" type="number" min="1" required defaultValue={studio.maxCapacity} className={field} />
          </label>
        </div>

        <div className="space-y-2">
          <span className="label-text">Main image</span>
          <div className="flex flex-col sm:flex-row gap-2">
            <input type="url" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Paste an image URL" className={field} />
            <label className={`btn btn-outline ${uploading ? "btn-disabled" : ""}`}>
              {uploading ? <span className="loading loading-spinner loading-sm" /> : "Upload image"}
              <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
            </label>
          </div>
          {image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt="Studio preview" className="mt-2 w-full max-h-56 object-cover rounded-box" />
          )}
        </div>

        <label className="form-control">
          <span className="label-text mb-1">More gallery images (optional, one URL per line)</span>
          <textarea
            name="gallery"
            rows={3}
            defaultValue={(studio.gallery ?? []).join("\n")}
            placeholder={"https://example.com/photo-2.jpg\nhttps://example.com/photo-3.jpg"}
            className="textarea textarea-bordered w-full"
          />
        </label>

        <div className="space-y-2">
          <span className="label-text">Amenities</span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {AMENITIES.map((a) => (
              <label key={a} className="label cursor-pointer justify-start gap-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary checkbox-sm"
                  checked={amenities.includes(a)}
                  onChange={() => toggleAmenity(a)}
                />
                <span className="label-text">{a}</span>
              </label>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addCustom();
                }
              }}
              placeholder="Add your own amenity"
              className={field}
            />
            <button type="button" onClick={addCustom} className="btn btn-outline">Add</button>
          </div>
          {customAmenities.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {customAmenities.map((a) => (
                <button key={a} type="button" onClick={() => toggleAmenity(a)} className="badge badge-primary gap-1">
                  {a} ✕
                </button>
              ))}
            </div>
          )}
        </div>

        <label className="form-control">
          <span className="label-text mb-1">Detailed overview</span>
          <textarea name="overview" required rows={5} defaultValue={studio.overview} className="textarea textarea-bordered w-full" />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="form-control">
            <span className="label-text mb-1">Host name</span>
            <input value={studio.ownerName} readOnly className={`${field} opacity-70`} />
          </label>
          <label className="form-control">
            <span className="label-text mb-1">Host email</span>
            <input value={studio.ownerEmail} readOnly className={`${field} opacity-70`} />
          </label>
        </div>

        <div className="flex gap-3">
          <button type="button" onClick={() => router.push("/my-listings")} className="btn btn-outline flex-1">
            Cancel
          </button>
          <button type="submit" disabled={saving || uploading} className="btn btn-primary flex-1">
            {saving ? <span className="loading loading-spinner loading-sm" /> : "Save Changes"}
          </button>
        </div>
      </div>
    </form>
  );
}