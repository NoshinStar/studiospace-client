"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Aperture, Menu } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/studios", label: "Explore Studios" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About Us" },
];

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const navItems = links.map((l) => (
    <li key={l.href}>
      <Link
        href={l.href}
        className={
          isActive(l.href)
            ? "font-semibold text-primary border-b-2 border-primary rounded-none"
            : "hover:text-primary"
        }
      >
        {l.label}
      </Link>
    </li>
  ));

  return (
    <header className="sticky top-0 z-50 bg-base-100/90 backdrop-blur border-b border-base-300">
      <div className="navbar max-w-7xl mx-auto px-4">
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle" aria-label="Open menu">
              <Menu size={22} />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-56 p-2 shadow-lg border border-base-300"
            >
              {navItems}
            </ul>
          </div>
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight">
            <Aperture className="text-primary" size={28} />
            <span>
              Studio<span className="text-primary">Space</span>
            </span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1">{navItems}</ul>
        </div>

        <div className="navbar-end gap-2">
          <ThemeToggle />
          {/* Auth-এর পর এখানে user avatar dropdown আসবে */}
          <Link href="/login" className="btn btn-outline btn-primary btn-sm">
            Login
          </Link>
          <Link href="/register" className="btn btn-primary btn-sm">
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}