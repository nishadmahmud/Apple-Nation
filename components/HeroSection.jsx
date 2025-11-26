import CategoryBanner from "./CategoryBanner";
import HeroFeatureCards from "./HeroFeatureCards";

export default function HeroSection() {
  return (
    <section className="space-y-4">
      {/* Category Banner - Three Sections */}
      <CategoryBanner />
      
      {/* Feature Cards */}
      <HeroFeatureCards />
    </section>
  );
}

