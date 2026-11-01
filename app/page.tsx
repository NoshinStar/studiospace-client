import HeroSlider from "@/components/HeroSlider";
import FeaturedStudios from "@/components/FeaturedStudios";
import CategoryGrid from "@/components/CategoryGrid";
import HowBookingWorks from "@/components/HowBookingWorks";
import HostGuarantee from "@/components/HostGuarantee";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <FeaturedStudios />
      <CategoryGrid />
      <HowBookingWorks />
      <HostGuarantee />
    </>
  );
}