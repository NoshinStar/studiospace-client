"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// ছবি না এলে Unsplash থেকে নিজের URL বসাও (w=1920 রাখো)
const slides = [
  {
    image: "https://images.unsplash.com/photo-1519183071298-a2962feb14f4?w=1920",
    title: "Premium",
    accent: "photo studios",
    text: "Cyclorama walls, pro lighting and backdrops, booked by the hour.",
  },
  {
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1920",
    title: "Record in",
    accent: "sound-ready rooms",
    text: "Music suites and podcast lounges with treated acoustics and broadcast gear.",
  },
  {
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1920",
    title: "Host your space,",
    accent: "earn from it",
    text: "List your studio, set your rate and welcome verified creators.",
  },
];

export default function HeroSlider() {
  return (
    <Swiper
      modules={[Autoplay, Pagination, EffectFade]}
      effect="fade"
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      loop
      className="w-full"
    >
      {slides.map((s) => (
        <SwiperSlide key={s.accent}>
          <div className="relative h-[70vh] min-h-[460px] max-h-[720px] w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.image} alt={s.accent} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center text-white">
              <h1 className="section-title max-w-3xl">
                {s.title} <em>{s.accent}</em>
              </h1>
              <p className="mt-4 max-w-xl text-lg text-white/85">{s.text}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/studios" className="btn btn-primary">Explore Studios</Link>
                <Link href="/studios" className="btn btn-outline text-white border-white/70 hover:bg-white hover:text-black">
                  Host Your Space
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}