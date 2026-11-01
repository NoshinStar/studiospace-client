"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function StudioGallery({ images, title }: { images: string[]; title: string }) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation={images.length > 1}
      pagination={{ clickable: true }}
      loop={images.length > 1}
      className="w-full rounded-box overflow-hidden"
    >
      {images.map((src, i) => (
        <SwiperSlide key={`${src}-${i}`}>
          <div className="aspect-video w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={`${title} photo ${i + 1}`} className="w-full h-full object-cover" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}