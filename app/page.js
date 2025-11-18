import BestDealsCarousel from "../components/BestDealsCarousel";
import BlogPreviewSection from "../components/BlogPreviewSection";
import CategoryShowcase from "../components/CategoryShowcase";
import HeroSection from "../components/HeroSection";
import NewArrivalsGrid from "../components/NewArrivalsGrid";
import TrustBanner from "../components/TrustBanner";
import CategoryBannerRow from "../components/CategoryBannerRow";
import SingleBanner from "../components/SingleBanner";
import BrandWiseProducts from "../components/BrandWiseProducts";
import {
  fetchBestDeals,
  fetchBlogs,
  fetchNewArrivals,
  fetchCategories,
} from "../lib/api";

export const revalidate = 600;

export const metadata = {
  title: "Apple Nation BD | Premium Apple & Lifestyle Tech",
  description:
    "Discover curated Apple devices, wearables, and lifestyle tech deals at Apple Nation BD. Explore best sellers, new arrivals, and brand-wise collections.",
  alternates: {
    canonical: "https://www.applenationbd.com/",
  },
};

const getHomeContent = async () => {
  const [categoriesResult, bestDealsResult, newArrivalsResult, blogsResult] = await Promise.allSettled([
    fetchCategories(),
    fetchBestDeals(),
    fetchNewArrivals(),
    fetchBlogs(),
  ]);

  const categories =
    categoriesResult.status === "fulfilled" && Array.isArray(categoriesResult.value?.data)
      ? categoriesResult.value.data
          .filter((cat) => cat.product_count > 0) // Only show categories with products
          .map((cat) => ({
            id: cat.category_id,
            name: cat.name,
            slug: cat.name.toLowerCase().replace(/\s+/g, "-"),
            image_url: cat.image_url,
            banner: cat.banner,
            product_count: cat.product_count,
          }))
      : [];

  const bestDeals =
    bestDealsResult.status === "fulfilled"
      ? Array.isArray(bestDealsResult.value?.data)
        ? bestDealsResult.value.data.slice(0, 8)
        : []
      : [];

  const newArrivals =
    newArrivalsResult.status === "fulfilled"
      ? Array.isArray(newArrivalsResult.value?.data?.data)
        ? newArrivalsResult.value.data.data.slice(0, 4)
        : []
      : [];

  const blogPosts =
    blogsResult.status === "fulfilled"
      ? Array.isArray(blogsResult.value?.data)
        ? blogsResult.value.data.slice(0, 3)
        : []
      : [];

  return {
    categories,
    bestDeals,
    newArrivals,
    blogPosts,
  };
};

export default async function Home() {
  const { categories, bestDeals, newArrivals, blogPosts } = await getHomeContent();

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-zinc-900 dark:text-zinc-100">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-24 px-6 pb-24 pt-6 sm:px-10 lg:px-16 lg:pb-32 lg:pt-8">
        <HeroSection />
        <CategoryShowcase categories={categories} />
        
        <section id="best-deals">
          <BestDealsCarousel deals={bestDeals} />
        </section>
        <section id="new-arrivals">
          <NewArrivalsGrid items={newArrivals} />
        </section>
        <CategoryBannerRow />
        <BrandWiseProducts />
        <SingleBanner />
        <BlogPreviewSection posts={blogPosts} />
        <TrustBanner />
      </main>
    </div>
  );
}
