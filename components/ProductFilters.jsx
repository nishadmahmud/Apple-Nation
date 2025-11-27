"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getCategories } from "../lib/api";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: null },
  { label: "Under ৳1,000", min: 0, max: 1000 },
  { label: "৳1,000 - ৳2,500", min: 1000, max: 2500 },
  { label: "৳2,500 - ৳5,000", min: 2500, max: 5000 },
  { label: "৳5,000 - ৳10,000", min: 5000, max: 10000 },
  { label: "Over ৳10,000", min: 10000, max: null },
];

const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
];

export default function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);

  // Fetch categories from API
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const url = getCategories();
        if (!url) {
          console.warn("Categories API URL is not configured.");
          return;
        }

        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data?.success && Array.isArray(data?.data)) {
          const formattedCategories = data.data
            .filter((cat) => cat.product_count > 0) // Only show categories with products
            .map((cat) => ({
              id: String(cat.category_id),
              name: cat.name,
              product_count: cat.product_count,
            }));
          setCategories(formattedCategories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    loadCategories();
  }, []);

  const currentCategory = searchParams.get("category") || "all";
  const currentPriceRange = searchParams.get("price") || "all";
  const currentSort = searchParams.get("sort") || "default";

  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all" || value === "default") {
      params.delete(key);
    } else {
      params.set(key, String(value));
    }
    // Reset to page 1 when filters change
    params.delete("page");
    const newUrl = params.toString() 
      ? `/products?${params.toString()}`
      : "/products";
    router.push(newUrl);
  };

  return (
    <div className="space-y-6">

      {/* Sort Options */}
      <div>
        <h3 className="mb-4 text-base font-semibold text-slate-900 dark:text-zinc-100 font-poppins">
          Sort By
        </h3>
        <select
          value={currentSort}
          onChange={(e) => updateFilter("sort", e.target.value)}
          className="w-full cursor-pointer rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-zinc-600 dark:bg-zinc-700/70 dark:text-zinc-100 dark:focus:border-orange-500"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>


      {/* Category Filter */}
      <div>
        <button
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          className="mb-4 flex w-full items-center justify-between text-left cursor-pointer"
        >
          <h3 className="text-base font-semibold text-slate-900 font-poppins dark:text-zinc-100">
            Category
          </h3>
          {isCategoryOpen ? (
            <MdKeyboardArrowUp className="h-5 w-5 text-slate-600 dark:text-zinc-400" />
          ) : (
            <MdKeyboardArrowDown className="h-5 w-5 text-slate-600 dark:text-zinc-400" />
          )}
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isCategoryOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-2">
            <button
              onClick={() => updateFilter("category", "all")}
              className={`w-full rounded-full cursor-pointer font-urbanist px-4 py-2 text-left text-sm font-medium transition-colors duration-200 ${
                currentCategory === "all"
                  ? "bg-orange-500 text-white dark:bg-orange-400"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-zinc-700/70 dark:text-zinc-200 dark:hover:bg-zinc-600/80"
              }`}
            >
              All Products
            </button>
            {categories.map((category) => {
              const categoryIdStr = String(category.id);
              return (
                <button
                  key={category.id}
                  onClick={() => updateFilter("category", categoryIdStr)}
                  className={`w-full rounded-full font-urbanist cursor-pointer px-4 py-2 text-left text-sm font-medium transition-colors duration-200 ${
                    currentCategory === categoryIdStr
                      ? "bg-orange-500 text-white dark:bg-orange-500"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-zinc-700/70 dark:text-zinc-200 dark:hover:bg-zinc-600/80"
                  }`}
                >
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Price Filter */}
      <div>
        <button
          onClick={() => setIsPriceOpen(!isPriceOpen)}
          className="mb-4 flex w-full items-center justify-between text-left cursor-pointer"
        >
          <h3 className="text-base font-semibold text-slate-900 font-poppins dark:text-zinc-100">
            Price Range
          </h3>
          {isPriceOpen ? (
            <MdKeyboardArrowUp className="h-5 w-5 text-slate-600 dark:text-zinc-400" />
          ) : (
            <MdKeyboardArrowDown className="h-5 w-5 text-slate-600 dark:text-zinc-400" />
          )}
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isPriceOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-2">
            {PRICE_RANGES.map((range, index) => {
              const rangeValue = index === 0 ? "all" : `${range.min}-${range.max || "inf"}`;
              return (
                <button
                  key={index}
                  onClick={() => updateFilter("price", rangeValue)}
                  className={`w-full rounded-full px-4 py-2 text-left text-sm font-medium transition-colors duration-200 ${
                    currentPriceRange === rangeValue
                      ? "bg-orange-500 text-white dark:bg-orange-500"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-zinc-700/70 dark:text-zinc-200 dark:hover:bg-zinc-600/80"
                  }`}
                >
                  {range.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      
    </div>
  );
}

