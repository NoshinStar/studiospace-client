import { Search, Clock, CalendarCheck, Clapperboard } from "lucide-react";

const steps = [
  { Icon: Search, title: "Discover Spaces", text: "Browse studios by category, location and price." },
  { Icon: Clock, title: "Select Shoot Hours", text: "Pick the date and the hours that suit your session." },
  { Icon: CalendarCheck, title: "Book Instantly", text: "Send your request and track its status in My Bookings." },
  { Icon: Clapperboard, title: "Create & Produce", text: "Arrive, set up and focus on making great work." },
];

export default function HowBookingWorks() {
  return (
    <section className="bg-[#14100D] text-[#ECE7E1]">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <p className="eyebrow">• How booking works</p>
        <h2 className="section-title mt-2">
          From browse to create in <em>four steps</em>
        </h2>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ Icon, title, text }, i) => (
            <div key={title} className="relative rounded-box border border-white/10 p-6 h-full">
              <span className="absolute top-4 right-5 text-5xl font-bold text-white/10">0{i + 1}</span>
              <span className="grid place-items-center w-11 h-11 rounded-full bg-primary/20 text-primary">
                <Icon size={22} />
              </span>
              <h3 className="mt-5 font-bold text-lg">{title}</h3>
              <p className="mt-2 text-sm text-white/70">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}