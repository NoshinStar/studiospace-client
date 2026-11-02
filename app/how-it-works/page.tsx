import Link from "next/link";

export const metadata = { title: "How It Works | StudioSpace" };

const steps = [
  { t: "Discover", d: "Browse studios by category, location and price." },
  { t: "Pick your slot", d: "Choose the date, start time and number of hours." },
  { t: "Send a request", d: "Your booking starts as Pending while the host reviews it." },
  { t: "Create", d: "Once confirmed, the slot is yours. Show up and shoot." },
];
const faqs = [
  { q: "Who confirms my booking?", a: "The studio host. Until then it shows as Pending." },
  { q: "Can I cancel a booking?", a: "Yes, while it is still Pending, from My Bookings." },
  { q: "How do I list a studio?", a: "Create an account, then choose Add New Studio from your profile menu." },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="max-w-7xl mx-auto px-4 py-16">
        <p className="eyebrow">• How it works</p>
        <h1 className="section-title mt-2">
          Booking a studio, <em>made simple</em>
        </h1>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.t} className="card bg-base-200 h-full">
              <div className="card-body gap-2">
                <span className="text-3xl font-bold text-primary">0{i + 1}</span>
                <h2 className="font-bold text-lg">{s.t}</h2>
                <p className="text-sm opacity-70">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-base-200">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="section-title text-center">
            Common <em>questions</em>
          </h2>
          <div className="mt-8 space-y-3">
            {faqs.map((f, i) => (
              <div key={f.q} className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="faq" defaultChecked={i === 0} />
                <div className="collapse-title font-semibold">{f.q}</div>
                <div className="collapse-content text-sm opacity-80">{f.a}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/studios" className="btn btn-primary">Explore Studios</Link>
          </div>
        </div>
      </section>
    </>
  );
}