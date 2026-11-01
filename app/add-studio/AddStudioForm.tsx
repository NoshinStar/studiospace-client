"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { API_URL, AMENITIES, CATEGORIES } from "@/lib/constants";

export default function AddStudioForm() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [custom, setCustom] = useState("");

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
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5 MB.");
      return;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("image", file);
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
        { method: "POST", body: fd }
      );
      const json = await res.json();
      if (!json.success) throw new Error();
      setImage(json.data.url);
      toast.success("Image uploaded.");
    } catch {
      toast.error("Image upload failed. Paste an image URL instead.");
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
    const payload = {
      title: String(f.get("title")),
      category: String(f.get("category")),
      hourlyRate: Number(f.get("hourlyRate")),
      securityDeposit: Number(f.get("securityDeposit")),
      maxCapacity: Number(f.get("maxCapacity")),
      location: String(f.get("location")),
      image,
      amenities,
      overview: String(f.get("overview")),
      ownerEmail: user?.email,
      ownerName: user?.name,
    };

    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/studios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add the studio.");
      toast.success("Studio listed successfully!");
      router.push("/my-listings");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const field = "input input-bordered w-full";

  return (
    <form onSubmit={handleSubmit} className="card bg-base-200 shadow-md">
      <div className="card-body gap-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="form-control sm:col-span-2">
            <span className="label-text mb-1">Studio title</span>
            <input name="title" required placeholder="e.g. Pro Photography Suite" className={field} />
          </label>

          <label className="form-control">
            <span className="label-text mb-1">Category</span>
            <select name="category" required defaultValue="" className="select select-bordered w-full">
              <option value="" disabled>Select a category</option>
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.value}</option>
              ))}
            </select>
          </label>

          <label className="form-control">
            <span className="label-text mb-1">Location / address</span>
            <input name="location" required placeholder="e.g. Gulshan, Dhaka" className={field} />
          </label>

          <label className="form-control">
            <span className="label-text mb-1">Hourly rate ($)</span>
            <input name="hourlyRate" type="number" min="1" required placeholder="49" className={field} />
          </label>

          <label className="form-control">
            <span className="label-text mb-1">Security deposit ($)</span>
            <input name="securityDeposit" type="number" min="0" required placeholder="100" className={field} />
          </label>

          <label className="form-control">
            <span className="label-text mb-1">Max capacity (people)</span>
            <input name="maxCapacity" type="number" min="1" required placeholder="10" className={field} />
          </label>
        </div>

        <div className="space-y-2">
          <span className="label-text">Studio image</span>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Paste an image URL"
              className={field}
            />
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
          {amenities.filter((a) => !AMENITIES.includes(a)).length > 0 && (
            <div className="flex flex-wrap gap-2">
              {amenities.filter((a) => !AMENITIES.includes(a)).map((a) => (
                <button key={a} type="button" onClick={() => toggleAmenity(a)} className="badge badge-primary gap-1">
                  {a} ✕
                </button>
              ))}
            </div>
          )}
        </div>

        <label className="form-control">
          <span className="label-text mb-1">Detailed overview</span>
          <textarea
            name="overview"
            required
            rows={5}
            placeholder="Describe the space, equipment, rules and what makes it special."
            className="textarea textarea-bordered w-full"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="form-control">
            <span className="label-text mb-1">Host name</span>
            <input value={user?.name ?? ""} readOnly className={`${field} opacity-70`} />
          </label>
          <label className="form-control">
            <span className="label-text mb-1">Host email</span>
            <input value={user?.email ?? ""} readOnly className={`${field} opacity-70`} />
          </label>
        </div>

        <button type="submit" disabled={saving || uploading || !user} className="btn btn-primary w-full">
          {saving ? <span className="loading loading-spinner loading-sm" /> : "Add Studio"}
        </button>
      </div>
    </form>
  );
}