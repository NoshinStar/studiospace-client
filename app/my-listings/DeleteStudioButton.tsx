
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { clientFetch } from "@/lib/api-client";

export default function DeleteStudioButton({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);

    try {
      const res = await clientFetch(`/api/studios/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete the studio.");
      }

      toast.success("Studio deleted successfully.");
      setOpen(false);
      router.refresh();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="btn btn-error btn-outline btn-sm gap-1"
      >
        <Trash2 size={14} />
        Delete
      </button>

      {open && (
        <div className="modal modal-open" role="dialog" aria-modal="true">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Delete this studio?
            </h3>

            <p className="py-4 opacity-80">
              <span className="font-semibold">{title}</span> will be
              permanently removed. This action cannot be undone.
            </p>

            <div className="modal-action">
              <button
                onClick={() => setOpen(false)}
                disabled={deleting}
                className="btn"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className="btn btn-error"
              >
                {deleting ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  "Yes, delete"
                )}
              </button>
            </div>
          </div>

          <div
            className="modal-backdrop"
            onClick={() => !deleting && setOpen(false)}
          />
        </div>
      )}
    </>
  );
}
