import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { API_URL } from "@/lib/constants";
import type { Studio } from "@/lib/types";
import EditStudioForm from "./EditStudioForm";

export const metadata = { title: "Update Studio | StudioSpace" };

async function getStudio(id: string): Promise<Studio | null> {
  try {
    const res = await fetch(`${API_URL}/api/studios/${id}`, { cache: "no-store" });
    if (res.status === 404 || res.status === 400) return null;
    if (!res.ok) throw new Error();
    return res.json();
  } catch {
    throw new Error("We couldn't load this studio right now.");
  }
}

export default async function EditStudioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect(`/login?callbackUrl=/studios/edit/${id}`);

  const studio = await getStudio(id);
  if (!studio) notFound();
  // শুধু মালিক edit করতে পারবে (server-side নিরাপত্তা JWT-র সময় যোগ হবে)
  if (studio.ownerEmail !== session.user.email) redirect("/my-listings");

  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="section-title text-center">
        Update your <em>studio</em>
      </h1>
      <p className="text-center opacity-70 mt-2 mb-8">Keep your listing accurate and appealing.</p>
      <EditStudioForm studio={studio} />
    </section>
  );
}