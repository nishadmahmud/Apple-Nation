import { Suspense } from "react";
import ProductsPageClient from "../../components/ProductsPageClient";
import LoadingSpinner from "../../components/LoadingSpinner";
import { fetchCategories } from "../../lib/api";

export const metadata = {
  title: "All Products | Apple Nation BD",
  description:
    "Browse every Apple device, accessory, and lifestyle gadget available at Apple Nation BD. Filter by category, price, or search instantly.",
  alternates: {
    // canonical: "https://www.applenationbd.com/products",
  },
  openGraph: {
    title: "Shop Apple Products & Accessories | Apple Nation BD",
    description:
      "Explore the complete catalog of Apple Nation BD. Compare iPhone, iPad, Mac, Watch, audio gear, and premium accessories in one place.",
    // url: "https://www.applenationbd.com/products",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop Apple Products & Accessories | Apple Nation BD",
    description:
      "Explore the full Apple Nation BD collection with smart filters, search, and instant availability.",
  },
};

export const revalidate = 600; // Revalidate every 10 minutes

async function ProductsContent({ searchParams }) {
  // Await searchParams in Next.js 15
  const params = await searchParams;
  const categoryId = params?.category || "all";
  const priceRange = params?.price || "all";
  const sortOption = params?.sort || "default";
  const searchQuery = params?.search || "";
  const currentPage = Number(params?.page) || 1;
  const itemsPerPage = 20;

  // Fetch categories from API
  const categoriesResult = await fetchCategories();
  const categories =
    categoriesResult?.success && Array.isArray(categoriesResult?.data)
      ? categoriesResult.data.map((cat) => ({
        id: String(cat.category_id),
        name: cat.name,
        slug: cat.name.toLowerCase().replace(/\s+/g, "-"),
        product_count: cat.product_count,
      }))
      : [];

  // Sort categories: Smartphone, Earbuds, Earphone first
  const priorityCategories = ["Smartphone", "Earbuds", "Earphone"];
  categories.sort((a, b) => {
    const aIndex = priorityCategories.indexOf(a.name);
    const bIndex = priorityCategories.indexOf(b.name);

    // If both are priority categories, sort by their order in priorityCategories
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;

    // If only a is priority, it comes first
    if (aIndex !== -1) return -1;

    // If only b is priority, it comes first
    if (bIndex !== -1) return 1;

    // Otherwise, keep original order (or sort alphabetically if preferred, but API order is usually fine)
    return 0;
  });

  // Get selected category for display
  const selectedCategory = categories.find(
    (cat) => String(cat.id) === String(categoryId)
  );

  return (
    <ProductsPageClient
      categories={categories}
      initialCategory={selectedCategory}
      initialFilters={{
        category: categoryId,
        price: priceRange,
        sort: sortOption,
        search: searchQuery,
        page: currentPage,
      }}
    />
  );
}

export default async function ProductsPage({ searchParams }) {
  // Await searchParams in Next.js 15
  const params = await searchParams;

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-100 text-slate-900 dark:bg-zinc-900 dark:text-zinc-100">
          <div className="flex flex-col items-center gap-4">
            <LoadingSpinner size="lg" />
            <p className="text-lg font-semibold text-slate-700 dark:text-zinc-300">
              Loading products...
            </p>
          </div>
        </div>
      }
    >
      <ProductsContent searchParams={params} />
    </Suspense>
  );
}

