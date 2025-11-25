"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdSearch, MdClose, MdKeyboardArrowDown } from "react-icons/md";
import { fetchCategories, fetchCategoryProducts } from "../lib/api";

// In-memory cache for search results
const searchCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const MAX_CACHE_SIZE = 20; // Maximum number of cached searches

// Cache for all products (loaded once)
let allProductsCache = null;
let allProductsCacheTime = null;
const ALL_PRODUCTS_CACHE_TTL = 30 * 60 * 1000; // 30 minutes - longer cache for better performance
let isLoadingProducts = false; // Prevent multiple simultaneous loads

const formatCurrency = (value) => {
  const amount = Number(value);
  if (Number.isNaN(amount)) return "৳—";
  return `৳${amount.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
};

// Get cached search results
const getCachedResults = (query) => {
  const normalizedQuery = query.toLowerCase().trim();
  const cached = searchCache.get(normalizedQuery);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.results;
  }
  return null;
};

// Set cached search results
const setCachedResults = (query, results) => {
  const normalizedQuery = query.toLowerCase().trim();
  
  // Limit cache size
  if (searchCache.size >= MAX_CACHE_SIZE) {
    // Remove oldest entry
    const firstKey = searchCache.keys().next().value;
    searchCache.delete(firstKey);
  }
  
  searchCache.set(normalizedQuery, {
    results,
    timestamp: Date.now(),
  });
};

// Client-side product search
const searchProducts = (products, query, limit = 8) => {
  if (!query || query.trim().length < 2) return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return products
    .filter((product) => {
      const name = String(product.name || "").toLowerCase();
      // Match if query is found anywhere in the product name
      return name.includes(normalizedQuery);
    })
    .slice(0, limit);
};

export default function NavBarSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const inputRef = useRef(null);
  const resultsRef = useRef(null);
  const debounceTimer = useRef(null);
  const abortControllerRef = useRef(null);
  const containerRef = useRef(null);

  // Load products quickly - only top 10 categories with most products
  useEffect(() => {
    const loadAllProducts = async () => {
      // Check if cache is still valid
      if (
        allProductsCache &&
        allProductsCacheTime &&
        Date.now() - allProductsCacheTime < ALL_PRODUCTS_CACHE_TTL
      ) {
        console.log("✓ Using cached products:", allProductsCache.length);
        return;
      }

      // Prevent multiple simultaneous loads
      if (isLoadingProducts) {
        return;
      }

      isLoadingProducts = true;

      try {
        console.log("⚡ Loading products for search...");
        const startTime = Date.now();
        
        // Fetch categories first
        const categoriesResult = await fetchCategories();
        
        if (!categoriesResult?.success || !Array.isArray(categoriesResult?.data)) {
          console.error("❌ Failed to fetch categories");
          isLoadingProducts = false;
          return;
        }

        // Only fetch from TOP 10 categories (by product count) for speed
        const topCategories = categoriesResult.data
          .filter((cat) => cat.product_count > 0)
          .sort((a, b) => b.product_count - a.product_count)
          .slice(0, 10); // Only top 10!
        
        console.log("📦 Fetching from top", topCategories.length, "categories");

        // Fetch all in parallel with timeout
        const TIMEOUT = 5000; // 5 second timeout per category
        const categoryPromises = topCategories.map(async (category) => {
          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);
            
            const result = await fetchCategoryProducts(category.category_id, 1, 30);
            clearTimeout(timeoutId);
            
            let categoryProducts = [];
            if (Array.isArray(result?.data?.data)) {
              categoryProducts = result.data.data;
            } else if (Array.isArray(result?.data)) {
              categoryProducts = result.data;
            } else if (Array.isArray(result)) {
              categoryProducts = result;
            }
            
            return categoryProducts;
          } catch (error) {
            console.warn(`⚠️ Skipped category ${category.name}`);
            return [];
          }
        });

        const results = await Promise.allSettled(categoryPromises);
        
        // Merge and deduplicate
        const seenIds = new Set();
        const allProducts = [];
        
        results.forEach((result) => {
          if (result.status === "fulfilled" && Array.isArray(result.value)) {
            result.value.forEach((product) => {
              if (product.id && !seenIds.has(product.id)) {
                seenIds.add(product.id);
                allProducts.push(product);
              }
            });
          }
        });

        const loadTime = Date.now() - startTime;
        console.log(`✓ Loaded ${allProducts.length} products in ${loadTime}ms`);
        
        if (allProducts.length > 0) {
          allProductsCache = allProducts;
          allProductsCacheTime = Date.now();
        } else {
          console.error("❌ No products loaded!");
        }
      } catch (error) {
        console.error("❌ Error loading products:", error);
      } finally {
        isLoadingProducts = false;
      }
    };

    // Start loading immediately
    loadAllProducts();
  }, []);

  // Handle search with debouncing and caching
  const performSearch = useCallback(async (searchQuery) => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    // Check cache first - instant results!
    const cachedResults = getCachedResults(searchQuery);
    if (cachedResults) {
      setResults(cachedResults);
      setLoading(false);
      return;
    }

    // Use cached products if available
    let productsToSearch = allProductsCache;
    
    if (!productsToSearch || productsToSearch.length === 0) {
      // Products not loaded yet, show loading
      setLoading(true);
      
      // Retry up to 5 times (5 seconds total)
      let retries = 0;
      const maxRetries = 10;
      const retryInterval = setInterval(() => {
        retries++;
        if (allProductsCache && allProductsCache.length > 0) {
          clearInterval(retryInterval);
          performSearch(searchQuery);
        } else if (retries >= maxRetries) {
          clearInterval(retryInterval);
          setLoading(false);
          setResults([]);
          console.error("❌ Products failed to load");
        }
      }, 500);
      return;
    }

    setLoading(false);

    // Perform client-side search - very fast!
    const searchResults = searchProducts(productsToSearch, searchQuery, 8);
    
    // Cache results for instant future searches
    setCachedResults(searchQuery, searchResults);
    
    setResults(searchResults);
  }, []);

  // Debounced search handler - reduced delay for faster response
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (query.trim().length >= 2) {
      // Check cache immediately for instant results
      const cachedResults = getCachedResults(query);
      if (cachedResults) {
        setResults(cachedResults);
        setLoading(false);
      } else {
        // Reduced debounce from 300ms to 150ms for faster response
        debounceTimer.current = setTimeout(() => {
          performSearch(query);
        }, 150);
      }
    } else {
      setResults([]);
      setLoading(false);
    }

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [query, performSearch]);

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1);
    if (value.trim().length >= 2) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showResults || results.length === 0) {
      if (e.key === "Enter" && query.trim().length >= 2) {
        handleViewAll();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleProductClick(results[selectedIndex].id);
        } else if (results.length > 0) {
          handleProductClick(results[0].id);
        } else {
          handleViewAll();
        }
        break;
      case "Escape":
        setShowResults(false);
        inputRef.current?.blur();
        break;
      default:
        break;
    }
  };

  // Handle product click
  const handleProductClick = (productId) => {
    setShowResults(false);
    setQuery("");
    router.push(`/products/${productId}`);
  };

  // Handle view all results
  const handleViewAll = () => {
    setShowResults(false);
    router.push(`/products?search=${encodeURIComponent(query.trim())}`);
  };

  // Handle clear
  const handleClear = () => {
    setQuery("");
    setResults([]);
    setShowResults(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowResults(false);
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current) {
      const selectedElement = resultsRef.current.children[selectedIndex];
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [selectedIndex]);

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl">
      {/* Search Input */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 top-1 flex items-center pl-3.5">
          <MdSearch className="h-6 w-6 text-slate-400 dark:text-zinc-500" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (query.trim().length >= 2 && results.length > 0) {
              setShowResults(true);
            }
            setIsExpanded(true);
          }}
          placeholder="Search products..."
          className="block w-full rounded-full border border-slate-300 bg-white px-10 md:pr-32 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-700 dark:focus:border-slate-500 font-urbanist"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-2 text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300"
            aria-label="Clear search"
          >
            <MdClose className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <div
          ref={resultsRef}
          className="absolute top-full z-50 mt-2 w-full max-h-96 overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-xl dark:border-zinc-700 dark:bg-zinc-800"
        >
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900 dark:border-zinc-600 dark:border-t-zinc-100" />
            </div>
          ) : results.length > 0 ? (
            <>
              <div className="max-h-80 overflow-y-auto">
                {results.map((product, index) => {
                  const imageSrc =
                    product.image_path ||
                    product.image_url ||
                    "/globe.svg";
                  const price =
                    product.discounted_price ?? product.retails_price;
                  const isSelected = index === selectedIndex;

                  return (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      onClick={() => handleProductClick(product.id)}
                      className={`flex items-center gap-3 border-b border-slate-100 px-4 py-3 transition-colors hover:bg-slate-50 dark:border-zinc-700 dark:hover:bg-zinc-700/50 ${
                        isSelected ? "bg-slate-50 dark:bg-zinc-700/50" : ""
                      }`}
                    >
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-zinc-700">
                        <Image
                          src={imageSrc}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                          unoptimized
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="truncate text-sm font-semibold text-slate-900 dark:text-zinc-100">
                          {product.name}
                        </h4>
                        <p className="text-xs font-medium text-slate-600 dark:text-zinc-400">
                          {formatCurrency(price)}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
              {query.trim().length >= 2 && (
                <div className="border-t border-slate-200 px-4 py-3 dark:border-zinc-700">
                  <button
                    type="button"
                    onClick={handleViewAll}
                    className="flex w-full items-center justify-between text-sm font-semibold text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
                  >
                    <span>View all results for "{query}"</span>
                    <MdKeyboardArrowDown className="h-5 w-5 rotate-[-90deg]" />
                  </button>
                </div>
              )}
            </>
          ) : query.trim().length >= 2 ? (
            <div className="px-4 py-8 text-center text-sm text-slate-600 dark:text-zinc-400">
              No products found for "{query}"
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

