"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { MdFilterList, MdGridView, MdViewList } from "react-icons/md";
import ProductCard from "./ProductCard";
import ProductFilters from "./ProductFilters";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import { motion, AnimatePresence } from "framer-motion";
import { fetchCategoryProducts } from "../lib/api";
import { useCart } from "./CartContext";

import LoadingSpinner from "./LoadingSpinner";

// Module-level cache to persist across soft navigations
const categoryCache = new Map();

export default function ProductsPageClient({
    categories,
    initialCategory,
    initialFilters,
}) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [showFilters, setShowFilters] = useState(false);
    const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
    const { addItem, items } = useCart();

    // Ref to track if we are currently fetching to prevent race conditions
    const fetchingRef = useRef(false);

    // Helper functions for ProductCard
    const calculatePrice = (product) => {
        const retailPrice = product?.retails_price || 0;
        if (product?.discount && product.discount_type === "Percentage") {
            return retailPrice - (retailPrice * product?.discount) / 100;
        } else if (product.discount && product.discount_type !== "Percentage") {
            return retailPrice - product.discount;
        }
        return retailPrice;
    };

    const handleAddToCart = (product) => {
        const price = calculatePrice(product);
        addItem({
            id: product.id,
            name: product.name,
            price: price || 0,
            image: product.image_path || product.image_url || "/globe.svg",
        });
    };

    const isInCart = (productId) => {
        return items.some((it) => String(it.id) === String(productId));
    };

    const isOutOfStock = (product) => {
        return product.current_stock === 0 || product.current_stock === null;
    };

    // Fetch products progressively with caching
    useEffect(() => {
        let isMounted = true;
        const currentCategoryFilter = initialFilters.category;

        const fetchProducts = async () => {
            fetchingRef.current = true;
            setLoading(true);
            setProducts([]);

            // If a specific category is selected
            if (currentCategoryFilter !== "all") {
                // Check cache first
                if (categoryCache.has(currentCategoryFilter)) {
                    setProducts(categoryCache.get(currentCategoryFilter));
                    setLoading(false);
                    fetchingRef.current = false;
                    return;
                }

                try {
                    // Fetch first page to get pagination info
                    const firstPageResult = await fetchCategoryProducts(currentCategoryFilter, 1, 20);
                    let categoryProducts = [];
                    let totalPages = 1;

                    if (Array.isArray(firstPageResult?.data?.data)) {
                        categoryProducts = [...firstPageResult.data.data];
                        totalPages = firstPageResult?.data?.last_page ||
                            firstPageResult?.data?.total_pages ||
                            Math.ceil((firstPageResult?.data?.total || 0) / 20) ||
                            1;
                    } else if (Array.isArray(firstPageResult?.data)) {
                        categoryProducts = [...firstPageResult.data];
                    } else if (Array.isArray(firstPageResult)) {
                        categoryProducts = [...firstPageResult];
                    }

                    // Fetch remaining pages if any
                    if (totalPages > 1) {
                        const remainingPages = [];
                        for (let page = 2; page <= totalPages; page++) {
                            remainingPages.push(fetchCategoryProducts(currentCategoryFilter, page, 20));
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

                    if (isMounted) {
                        // Update cache and state
                        categoryCache.set(currentCategoryFilter, categoryProducts);
                        setProducts(categoryProducts);
                    }
                } catch (error) {
                    console.error("Error fetching category products:", error);
                }
            } else {
                // Fetch ALL categories progressively
                const categoriesToFetch = categories.filter(cat => cat.product_count > 0);
                const totalCategories = categoriesToFetch.length;
                let loadedProducts = [];

                // First, immediately show any cached categories
                categoriesToFetch.forEach(cat => {
                    if (categoryCache.has(String(cat.id))) {
                        loadedProducts.push(...categoryCache.get(String(cat.id)));
                    }
                });

                if (loadedProducts.length > 0) {
                    // Remove duplicates
                    const uniqueProducts = [];
                    const seenIds = new Set();
                    loadedProducts.forEach(p => {
                        if (!seenIds.has(p.id)) {
                            seenIds.add(p.id);
                            uniqueProducts.push(p);
                        }
                    });
                    setProducts(uniqueProducts);
                }

                // Then fetch missing categories
                for (let i = 0; i < totalCategories; i++) {
                    const category = categoriesToFetch[i];
                    const categoryIdStr = String(category.id);

                    if (categoryCache.has(categoryIdStr)) {
                        if (isMounted) {
                            setLoadingProgress(Math.round(((i + 1) / totalCategories) * 100));
                        }
                        continue;
                    }

                    try {
                        // Fetch first page only for speed when loading "All"
                        const result = await fetchCategoryProducts(category.id, 1, 20);
                        let newProducts = [];

                        if (Array.isArray(result?.data?.data)) {
                            newProducts = result.data.data;
                        } else if (Array.isArray(result?.data)) {
                            newProducts = result.data;
                        } else if (Array.isArray(result)) {
                            newProducts = result;
                        }

                        if (newProducts.length > 0) {
                            // Update cache
                            categoryCache.set(categoryIdStr, newProducts);

                            if (isMounted) {
                                setProducts(prev => {
                                    const currentIds = new Set(prev.map(p => p.id));
                                    const uniqueNew = newProducts.filter(p => !currentIds.has(p.id));
                                    return [...prev, ...uniqueNew];
                                });
                            }
                        }
                    } catch (error) {
                        console.error(`Error fetching category ${category.name}:`, error);
                    }

                    if (isMounted) {
                        setLoadingProgress(Math.round(((i + 1) / totalCategories) * 100));
                    }
                }
            }

            if (isMounted) {
                setLoading(false);
                fetchingRef.current = false;
            }
        };

        fetchProducts();

        return () => {
            isMounted = false;
        };
    }, [initialFilters.category, categories]);

    // Filter and Sort Logic
    const filteredProducts = useMemo(() => {
        let result = [...products];

        // 1. Search
        if (initialFilters.search) {
            const query = initialFilters.search.toLowerCase().trim();
            result = result.filter(p =>
                (p.name || "").toLowerCase().includes(query)
            );
        }

        // 2. Price
        if (initialFilters.price && initialFilters.price !== "all") {
            const [minStr, maxStr] = initialFilters.price.split("-");
            const min = Number(minStr);
            const max = maxStr === "inf" ? null : Number(maxStr);

            if (!Number.isNaN(min)) {
                result = result.filter(p => {
                    const price = Number(p.discounted_price ?? p.retails_price ?? 0);
                    if (Number.isNaN(price)) return false;
                    return max === null ? price >= min : price >= min && price <= max;
                });
            }
        }

        // 3. Sort
        switch (initialFilters.sort) {
            case "price-low":
                result.sort((a, b) => (Number(a.discounted_price ?? a.retails_price ?? 0) - Number(b.discounted_price ?? b.retails_price ?? 0)));
                break;
            case "price-high":
                result.sort((a, b) => (Number(b.discounted_price ?? b.retails_price ?? 0) - Number(a.discounted_price ?? a.retails_price ?? 0)));
                break;
            case "name-asc":
                result.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
                break;
            case "name-desc":
                result.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
                break;
        }

        return result;
    }, [products, initialFilters]);

    // Pagination
    const itemsPerPage = 20;
    const totalItems = filteredProducts.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const currentPage = initialFilters.page || 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-zinc-900 dark:text-zinc-100">
            <div className="mx-auto w-full md:max-w-10/12 max-w-11/12 py-4 lg:py-8">
                {/* Mobile Header with Search */}
                <div className="mb-4 lg:mb-8">
                    <div className="flex justify-between gap-3">
                        <div className="hidden sm:block">
                            <h1 className="text-3xl font-urbanist font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-zinc-100">
                                {initialCategory ? initialCategory.name : "All Products"}
                            </h1>
                            <p className="mt-2 text-base text-slate-700 font-poppins dark:text-zinc-400">
                                {totalItems} product{totalItems !== 1 ? "s" : ""} found
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div>
                            <SearchBar initialQuery={initialFilters.search} />
                        </div>
                    </div>
                </div>

                {/* Mobile Control Bar */}
                <div className="mb-4 flex items-center gap-2 lg:hidden">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                    >
                        <MdFilterList className="h-5 w-5" />
                        Filters
                    </button>

                    <div className="flex gap-2 rounded-lg border border-slate-300 bg-white p-1 text-slate-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`rounded-md p-2 transition-colors ${viewMode === "grid"
                                ? "bg-orange-500 text-white"
                                : "text-slate-600 hover:bg-slate-100 dark:text-zinc-400 dark:hover:bg-zinc-700"
                                }`}
                            aria-label="Grid view"
                        >
                            <MdGridView className="h-5 w-5" />
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`rounded-md p-2 transition-colors ${viewMode === "list"
                                ? "bg-orange-500 text-white"
                                : "text-slate-600 hover:bg-slate-100 dark:text-zinc-400 dark:hover:bg-zinc-700"
                                }`}
                            aria-label="List view"
                        >
                            <MdViewList className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Mobile result count */}
                <p className="mb-4 text-sm text-slate-700 dark:text-zinc-400 lg:hidden">
                    {totalItems} product{totalItems !== 1 ? "s" : ""} found
                </p>

                {/* Mobile Filters Sheet */}
                {showFilters && (
                    <AnimatePresence>
                        <div className="fixed inset-0 z-9999 lg:hidden" style={{ zIndex: 999999 }}>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.5 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="absolute inset-0 bg-black/50"
                                onClick={() => setShowFilters(false)}
                                aria-hidden="true"
                            />
                            <motion.div
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "100%" }}
                                transition={{ type: "spring", stiffness: 130, damping: 22 }}
                                className="absolute inset-x-0 bottom-0 max-h-[80vh] overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl dark:bg-zinc-900"
                            >
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="text-lg font-semibold text-slate-900 dark:text-zinc-100">
                                        Filters
                                    </h2>
                                    <button
                                        onClick={() => setShowFilters(false)}
                                        className="text-sm font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400"
                                    >
                                        Done
                                    </button>
                                </div>
                                <ProductFilters categories={categories} />
                            </motion.div>
                        </div>
                    </AnimatePresence>
                )}

                <div className="flex flex-col gap-4 lg:flex-row lg:gap-3">
                    {/* Desktop Filters Sidebar */}
                    <aside className="hidden w-full shrink-0 lg:block lg:w-64">
                        <div className="sticky top-20 rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-lg shadow-slate-900/5 dark:border-zinc-700 dark:bg-zinc-800/90">
                            <ProductFilters categories={categories} />
                        </div>
                    </aside>

                    {/* Products Grid/List */}
                    <main className="flex-1">
                        {paginatedProducts.length > 0 ? (
                            <>
                                <div
                                    className={
                                        viewMode === "grid"
                                            ? "grid gap-x-6 gap-y-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                                            : "flex flex-col gap-4"
                                    }
                                >
                                    {paginatedProducts.map((product) => {
                                        const price = calculatePrice(product);
                                        const original = product.retails_price || 0;
                                        const hasDiscount = price !== original && original && product.discount;
                                        const stockOut = isOutOfStock(product);
                                        const inCart = isInCart(product.id);

                                        return (
                                            <ProductCard
                                                key={product.id}
                                                product={product}
                                                handleAddToCart={handleAddToCart}
                                                inCart={inCart}
                                                imageSrc={product.image_path || product.image_url || "/globe.svg"}
                                                price={price}
                                                original={original}
                                                stockOut={stockOut}
                                                hasDiscount={hasDiscount}
                                                className={viewMode === "list" ? "flex-row" : ""}
                                            />
                                        );
                                    })}
                                </div>
                                {loading && (
                                    <div className="mt-8 flex justify-center">
                                        <LoadingSpinner size="md" />
                                    </div>
                                )}
                                {totalPages > 1 && (
                                    <div className="mt-6 lg:mt-8">
                                        <Pagination
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            totalItems={totalItems}
                                            itemsPerPage={itemsPerPage}
                                        />
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white/95 p-12 text-center dark:border-zinc-700 dark:bg-zinc-800/90">
                                {loading ? (
                                    <div className="flex flex-col items-center gap-4">
                                        <LoadingSpinner size="lg" />
                                        <p className="text-lg font-semibold text-slate-700 dark:text-zinc-300">
                                            Loading products... {loadingProgress}%
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        <p className="text-lg font-semibold text-slate-900 dark:text-zinc-100">
                                            No products found
                                        </p>
                                        <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
                                            Try adjusting your filters to see more results.
                                        </p>
                                    </>
                                )}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
