import { ShieldCheck, BadgeCheck, Wrench, Headset } from "lucide-react";

const items = [
  { Icon: ShieldCheck, title: "Liability protection", text: "Clear booking terms and refundable deposits protect hosts and creators." },
  { Icon: BadgeCheck, title: "Verified profiles", text: "Every host and creator signs in with a verified account." },
  { Icon: Wrench, title: "Equipment safety", text: "Hosts list gear and rules up front so everyone knows what to expect." },
  { Icon: Headset, title: "24/7 host support", text: "Our team is around whenever a session needs a hand." },
];

export default function HostGuarantee() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <p className="eyebrow">• Host guarantee & creator support</p>
      <h2 className="section-title mt-2">
        Book with <em>confidence</em>
      </h2>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ Icon, title, text }) => (
          <div key={title} className="card bg-base-200 h-full">
            <div className="card-body gap-3">
              <span className="grid place-items-center w-12 h-12 rounded-full bg-primary/15 text-primary">
                <Icon size={24} />
              </span>
              <h3 className="font-bold text-lg">{title}</h3>
              <p className="text-sm opacity-70">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}