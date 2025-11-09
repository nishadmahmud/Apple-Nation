import { Suspense } from "react";
import ProductCard from "../../components/ProductCard";
import ProductFilters from "../../components/ProductFilters";
import SearchBar from "../../components/SearchBar";
import Pagination from "../../components/Pagination";
import LoadingSpinner from "../../components/LoadingSpinner";
import {
  fetchAllProducts,
  fetchCategoryProducts,
  getAllCategories,
} from "../../lib/api";

function FiltersWrapper() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-4">
          <LoadingSpinner size="sm" />
          <span className="ml-2 text-sm text-slate-600 dark:text-zinc-400">
            Loading filters...
          </span>
        </div>
      }
    >
      <ProductFilters />
    </Suspense>
  );
}

function SearchBarWrapper({ initialQuery }) {
  return (
    <Suspense fallback={<div className="h-10 w-full sm:min-w-[300px] rounded-lg border border-slate-300 bg-slate-100 dark:border-zinc-700 dark:bg-zinc-800 animate-pulse" />}>
      <SearchBar initialQuery={initialQuery} />
    </Suspense>
  );
}

export const revalidate = 600; // Revalidate every 10 minutes

// Cache for all products - this will persist across requests in the same server instance
let cachedAllProducts = null;
let cacheTimestamp = null;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds

// Cached function to fetch all products from all categories
async function getAllProductsFromCategories() {
  // Check if we have a valid cache
  if (cachedAllProducts && cacheTimestamp && Date.now() - cacheTimestamp < CACHE_DURATION) {
    return cachedAllProducts;
  }

  const categories = getAllCategories();
  let allProducts = [];
  
  try {
    // Fetch all categories in parallel
    const categoryPromises = categories.map(async (category) => {
      try {
        // Get total pages from category metadata
        const totalPages = category.totalPages || 1;
        const pagePromises = [];
        
        // Fetch all pages for this category
        for (let page = 1; page <= totalPages; page++) {
          pagePromises.push(fetchCategoryProducts(category.id, page, 20));
        }
        
        const pageResults = await Promise.allSettled(pagePromises);
        const categoryProducts = [];
        
        pageResults.forEach((result) => {
          if (result.status === "fulfilled") {
            let pageProducts = [];
            if (Array.isArray(result.value?.data?.data)) {
              pageProducts = result.value.data.data;
            } else if (Array.isArray(result.value?.data)) {
              pageProducts = result.value.data;
            } else if (Array.isArray(result.value)) {
              pageProducts = result.value;
            }
            if (pageProducts.length > 0) {
              categoryProducts.push(...pageProducts);
            }
          }
        });
        
        return categoryProducts;
      } catch (error) {
        console.error(`Error fetching products for category ${category.name}:`, error);
        return [];
      }
    });
    
    // Wait for all categories to be fetched
    const allCategoryResults = await Promise.allSettled(categoryPromises);
    
    // Merge all products from all categories
    allCategoryResults.forEach((result) => {
      if (result.status === "fulfilled" && Array.isArray(result.value)) {
        allProducts.push(...result.value);
      }
    });
    
    // Remove duplicates based on product ID
    const uniqueProducts = [];
    const seenIds = new Set();
    allProducts.forEach((product) => {
      if (product.id && !seenIds.has(product.id)) {
        seenIds.add(product.id);
        uniqueProducts.push(product);
      }
    });
    
    // Update cache
    cachedAllProducts = uniqueProducts;
    cacheTimestamp = Date.now();
    
    return uniqueProducts;
  } catch (error) {
    console.error("Error fetching all category products:", error);
    return [];
  }
}

// Helper function to format currency
const formatCurrency = (value) => {
  const amount = Number(value);
  if (Number.isNaN(amount)) return "৳—";
  return `৳${amount.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
};

// Filter products by price range
const filterByPrice = (products, priceRange) => {
  if (!priceRange || priceRange === "all") return products;

  const [minStr, maxStr] = priceRange.split("-");
  const min = Number(minStr);
  const max = maxStr === "inf" ? null : Number(maxStr);

  if (Number.isNaN(min)) return products;

  return products.filter((product) => {
    const price = Number(product.discounted_price ?? product.retails_price ?? 0);
    if (Number.isNaN(price)) return false;
    
    if (max === null) {
      return price >= min;
    }
    return price >= min && price <= max;
  });
};

// Filter products by search query
const filterBySearch = (products, searchQuery) => {
  if (!searchQuery || searchQuery.trim() === "") return products;
  
  const query = searchQuery.toLowerCase().trim();
  return products.filter((product) => {
    const name = String(product.name || "").toLowerCase();
    return name.includes(query);
  });
};

// Sort products
const sortProducts = (products, sortOption) => {
  const sorted = [...products];

  switch (sortOption) {
    case "price-low":
      return sorted.sort((a, b) => {
        const priceA = Number(a.discounted_price ?? a.retails_price ?? 0);
        const priceB = Number(b.discounted_price ?? b.retails_price ?? 0);
        return priceA - priceB;
      });
    case "price-high":
      return sorted.sort((a, b) => {
        const priceA = Number(a.discounted_price ?? a.retails_price ?? 0);
        const priceB = Number(b.discounted_price ?? b.retails_price ?? 0);
        return priceB - priceA;
      });
    case "name-asc":
      return sorted.sort((a, b) => {
        const nameA = String(a.name || "").toLowerCase();
        const nameB = String(b.name || "").toLowerCase();
        return nameA.localeCompare(nameB);
      });
    case "name-desc":
      return sorted.sort((a, b) => {
        const nameA = String(a.name || "").toLowerCase();
        const nameB = String(b.name || "").toLowerCase();
        return nameB.localeCompare(nameA);
      });
    default:
      return sorted;
  }
};

async function ProductsContent({ searchParams }) {
  // Await searchParams in Next.js 15
  const params = await searchParams;
  const categoryId = params?.category || "all";
  const priceRange = params?.price || "all";
  const sortOption = params?.sort || "default";
  const searchQuery = params?.search || "";
  const currentPage = Number(params?.page) || 1;
  const itemsPerPage = 20;

  const categories = getAllCategories();

  // Fetch all products from all categories (cached)
  const allProducts = await getAllProductsFromCategories();

  // If a specific category is selected, fetch that category's products
  // Otherwise use all products
  let productsData = allProducts;
  if (categoryId !== "all") {
    try {
      const selectedCategory = categories.find(
        (cat) => String(cat.id) === String(categoryId)
      );
      
      // Get total pages from category metadata, or try to detect from API response
      let totalPages = selectedCategory?.totalPages || 1;
      
      // Fetch first page to check actual total pages from API
      const firstPageResult = await fetchCategoryProducts(categoryId, 1, 20);
      let categoryProducts = [];
      
      // Extract products from first page
      if (Array.isArray(firstPageResult?.data?.data)) {
        categoryProducts = [...firstPageResult.data.data];
        // Try to get total pages from API response
        totalPages = firstPageResult?.data?.last_page || 
                    firstPageResult?.data?.total_pages ||
                    Math.ceil((firstPageResult?.data?.total || 0) / 20) ||
                    totalPages;
      } else if (Array.isArray(firstPageResult?.data)) {
        categoryProducts = [...firstPageResult.data];
      } else if (Array.isArray(firstPageResult)) {
        categoryProducts = [...firstPageResult];
      }
      
      // Fetch remaining pages if there are more
      if (totalPages > 1) {
        const remainingPages = [];
        for (let page = 2; page <= totalPages; page++) {
          remainingPages.push(fetchCategoryProducts(categoryId, page, 20));
        }
        
        const remainingResults = await Promise.allSettled(remainingPages);
        
        remainingResults.forEach((result) => {
          if (result.status === "fulfilled") {
            let pageProducts = [];
            if (Array.isArray(result.value?.data?.data)) {
              pageProducts = result.value.data.data;
            } else if (Array.isArray(result.value?.data)) {
              pageProducts = result.value.data;
            } else if (Array.isArray(result.value)) {
              pageProducts = result.value;
            }
            if (pageProducts.length > 0) {
              categoryProducts.push(...pageProducts);
            }
          }
        });
      }
      
      // Use category products if we got them
      if (categoryProducts.length > 0) {
        productsData = categoryProducts;
      }
    } catch (error) {
      console.error("Error fetching category products:", error);
      // If category fetch fails, keep using all products
    }
  }

  // Apply ALL filters on frontend
  // 1. Search filter
  let filteredProducts = filterBySearch(productsData, searchQuery);
  
  // 2. Price filter
  filteredProducts = filterByPrice(filteredProducts, priceRange);

  // 3. Sorting
  filteredProducts = sortProducts(filteredProducts, sortOption);
  
  // 4. Pagination
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  
  // Get selected category for display
  const selectedCategory = categories.find(
    (cat) => String(cat.id) === String(categoryId)
  );

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="mx-auto w-full max-w-7xl px-6 py-8 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-zinc-100">
                {selectedCategory ? selectedCategory.name : "All Products"}
              </h1>
              <p className="mt-2 text-base text-slate-600 dark:text-zinc-400">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
              </p>
            </div>
            <SearchBarWrapper initialQuery={searchQuery} />
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Filters Sidebar */}
          <aside className="w-full shrink-0 lg:w-64">
            <div className="sticky top-8 rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-lg shadow-slate-900/5 dark:border-zinc-800 dark:bg-zinc-900/60">
              <FiltersWrapper />
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            {paginatedProducts.length > 0 ? (
              <>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="mt-8">
                    <Suspense fallback={<div className="h-12" />}>
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalItems={totalItems}
                        itemsPerPage={itemsPerPage}
                      />
                    </Suspense>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white/95 p-12 text-center dark:border-zinc-800 dark:bg-zinc-900/60">
                <p className="text-lg font-semibold text-slate-900 dark:text-zinc-100">
                  No products found
                </p>
                <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
                  Try adjusting your filters to see more results.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default async function ProductsPage({ searchParams }) {
  // Await searchParams in Next.js 15
  const params = await searchParams;
  
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-100 text-slate-900 dark:bg-zinc-950 dark:text-zinc-100">
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

