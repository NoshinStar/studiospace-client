"use client";
import { useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";

const getTheme = () =>
  document.documentElement.getAttribute("data-theme") || "studio-light";

const subscribe = (callback: () => void) => {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
};

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => null);

  const toggle = () => {
    const next = theme === "studio-light" ? "studio-dark" : "studio-light";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  if (!theme) return <div className="w-10 h-10" />;

  return (
    <button onClick={toggle} className="btn btn-ghost btn-circle" aria-label="Toggle theme">
      {theme === "studio-light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}