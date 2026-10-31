import RegisterForm from "./RegisterForm";

export const metadata = {
  title: "Register | StudioSpace",
};

export default function RegisterPage() {
  return (
    <section className="max-w-md mx-auto px-4 py-16">
      <h1 className="section-title text-center">
        Create your <em>account</em>
      </h1>

      <p className="text-center opacity-70 mt-2 mb-8">
        Join StudioSpace to book or host creative studios.
      </p>

      <RegisterForm />
    </section>
  );
}