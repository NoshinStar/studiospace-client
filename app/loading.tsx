import { Aperture } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[60vh] grid place-items-center">
      <div className="text-center">
        <Aperture className="mx-auto text-primary animate-spin" size={48} />
        <p className="mt-4 text-sm opacity-70">Setting up the lights...</p>
      </div>
    </div>
  );
}