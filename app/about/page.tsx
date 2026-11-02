import Link from "next/link";
import { Eye, Handshake, Zap } from "lucide-react";

export const metadata = { title: "About Us | StudioSpace" };

const values = [
  { Icon: Eye, t: "Transparent", d: "Rates and deposits are shown up front. No hidden fees." },
  { Icon: Handshake, t: "Peer to peer", d: "Creators host creators, so every space is run by someone who gets it." },
  { Icon: Zap, t: "Fast to book", d: "From discovery to a booking request in a couple of minutes." },
];

export default function AboutPage() {
  return (
    <>
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="eyebrow">• About us</p>
        <h1 className="section-title mt-2">
          The right room for <em>every creator</em>
        </h1>
        <p className="mt-6 text-lg opacity-80 leading-relaxed">
          StudioSpace is a peer-to-peer marketplace for photographers, filmmakers, podcasters,
          musicians and artists. Hosts list their creative spaces, and creators discover and
          reserve them by the hour with clear pricing.
        </p>
      </section>

      <section className="bg-base-200">
        <div className="max-w-7xl mx-auto px-4 py-16 grid gap-5 sm:grid-cols-3">
          {values.map(({ Icon, t, d }) => (
            <div key={t} className="card bg-base-100 h-full">
              <div className="card-body gap-3">
                <span className="grid place-items-center w-12 h-12 rounded-full bg-primary/15 text-primary">
                  <Icon size={24} />
                </span>
                <h2 className="font-bold text-lg">{t}</h2>
                <p className="text-sm opacity-70">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="section-title">
          Ready to <em>create</em>?
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/studios" className="btn btn-primary">Explore Studios</Link>
          <Link href="/add-studio" className="btn btn-outline btn-primary">Host Your Space</Link>
        </div>
      </section>
    </>
  );
}