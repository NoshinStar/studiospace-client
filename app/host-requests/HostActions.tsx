"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { clientFetch } from "@/lib/api-client"; // ✅ clientFetch ইমপোর্ট করো

type Status = "Pending" | "Confirmed" | "Completed" | "Cancelled";

// ✅ প্রপস থেকে email সরিয়ে দাও
export default function HostActions({ id, status }: { id: string; status: Status }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const update = async (next: "Confirmed" | "Cancelled" | "Completed", okMsg: string) => {
    setBusy(true);
    try {
      // ✅ fetch-এর বদলে clientFetch ব্যবহার করো
      const res = await clientFetch(`/api/bookings/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }), // ✅ body থেকে email বাদ দাও
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed.");
      toast.success(okMsg);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  if (status === "Pending") {
    return (
      <div className="flex justify-end gap-2">
        <button disabled={busy} onClick={() => update("Confirmed", "Booking confirmed.")} className="btn btn-success btn-sm">
          Confirm
        </button>
        <button disabled={busy} onClick={() => update("Cancelled", "Request rejected.")} className="btn btn-error btn-outline btn-sm">
          Reject
        </button>
      </div>
    );
  }
  if (status === "Confirmed") {
    return (
      <div className="flex justify-end">
        <button disabled={busy} onClick={() => update("Completed", "Marked as completed.")} className="btn btn-outline btn-sm">
          Mark completed
        </button>
      </div>
    );
  }
  return <span className="block text-right text-sm opacity-60">None</span>;
}