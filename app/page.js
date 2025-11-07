import BestDealsCarousel from "../components/BestDealsCarousel";
import BlogPreviewSection from "../components/BlogPreviewSection";
import CategoryShowcase from "../components/CategoryShowcase";
import HeroSection from "../components/HeroSection";
import NewArrivalsGrid from "../components/NewArrivalsGrid";
import TrustBanner from "../components/TrustBanner";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-100">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-6 pb-24 pt-16 sm:px-10 lg:px-16 lg:pb-32 lg:pt-24">
        <HeroSection />
        <CategoryShowcase />
        <BestDealsCarousel />
        <NewArrivalsGrid />
        <BlogPreviewSection />
        <TrustBanner />
      </main>
    </div>
  );
}
