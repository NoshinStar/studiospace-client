import AddStudioForm from "./AddStudioForm";

export const metadata = { title: "Add New Studio | StudioSpace" };

export default function AddStudioPage() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="section-title text-center">
        List your <em>studio</em>
      </h1>
      <p className="text-center opacity-70 mt-2 mb-8">
        Share your space with creators. It takes a couple of minutes.
      </p>
      <AddStudioForm />
    </section>
  );
}