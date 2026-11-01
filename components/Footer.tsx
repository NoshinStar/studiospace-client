
"use client";

import Link from "next/link";
import { Aperture } from "lucide-react";
import {
  FaXTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa6";
import { toast } from "sonner";
import { CATEGORIES } from "@/lib/constants";

const socials = [
  { label: "X", href: "https://x.com", Icon: FaXTwitter },
  { label: "Instagram", href: "https://instagram.com", Icon: FaInstagram },
  { label: "YouTube", href: "https://youtube.com", Icon: FaYoutube },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: FaLinkedinIn },
];

export default function Footer() {
  const subscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    toast.success("You're subscribed! Watch your inbox for studio updates.");
    form.reset();
  };

  return (
    <footer className="bg-secondary text-secondary-content">
      <div className="max-w-7xl mx-auto px-4 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand and Social Links */}
        <div>
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-bold tracking-tight"
          >
            <Aperture className="text-primary" size={28} />
            <span>
              Studio<span className="text-primary">Space</span>
            </span>
          </Link>

          <p className="mt-4 text-sm opacity-80 leading-relaxed">
            Our mission is to put every creator in the right room, from cyc
            walls to sound stages, with transparent pricing and instant
            booking.
          </p>

          <div className="flex gap-2 mt-5">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="btn btn-circle btn-sm btn-outline border-secondary-content/40 text-secondary-content hover:bg-primary hover:border-primary hover:text-primary-content"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h6 className="font-semibold mb-4">Quick Links</h6>
          <ul className="space-y-2 text-sm opacity-80">
            <li>
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link href="/studios" className="hover:text-primary">
                Explore Studios
              </Link>
            </li>
            <li>
              <Link href="/how-it-works" className="hover:text-primary">
                How It Works
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-primary">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Popular Categories */}
        <div>
          <h6 className="font-semibold mb-4">Popular Categories</h6>
          <ul className="space-y-2 text-sm opacity-80">
            {CATEGORIES.map((c) => (
              <li key={c.value}>
                <Link
                  href={`/studios?category=${encodeURIComponent(c.value)}`}
                  className="hover:text-primary"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h6 className="font-semibold mb-4">Newsletter</h6>
          <p className="text-sm opacity-80 mb-3">
            New studios and creator tips, once a month.
          </p>

          <form onSubmit={subscribe} className="join w-full">
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="input join-item w-full bg-base-100 text-base-content"
            />
            <button type="submit" className="btn btn-primary join-item">
              Join
            </button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-secondary-content/20 py-5 text-center text-xs opacity-70 px-4">
        © {new Date().getFullYear()} StudioSpace. All rights reserved. · Terms
        of Service · Privacy Policy
      </div>
    </footer>
  );
}
