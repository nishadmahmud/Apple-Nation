"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getAllCategories } from "../lib/api";
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
  const categories = getAllCategories();

  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);

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
      {/* Category Filter */}
      <div>
        <button
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          className="mb-4 flex w-full items-center justify-between text-left"
        >
          <h3 className="text-lg font-semibold text-slate-900 dark:text-zinc-100">
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
              className={`w-full rounded-lg px-4 py-2 text-left text-sm font-medium transition-colors duration-200 ${
                currentCategory === "all"
                  ? "bg-sky-600 text-white dark:bg-sky-500"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
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
                  className={`w-full rounded-lg px-4 py-2 text-left text-sm font-medium transition-colors duration-200 ${
                    currentCategory === categoryIdStr
                      ? "bg-sky-600 text-white dark:bg-sky-500"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
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
          className="mb-4 flex w-full items-center justify-between text-left"
        >
          <h3 className="text-lg font-semibold text-slate-900 dark:text-zinc-100">
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
                  className={`w-full rounded-lg px-4 py-2 text-left text-sm font-medium transition-colors duration-200 ${
                    currentPriceRange === rangeValue
                      ? "bg-sky-600 text-white dark:bg-sky-500"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                  }`}
                >
                  {range.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sort Options */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-zinc-100">
          Sort By
        </h3>
        <select
          value={currentSort}
          onChange={(e) => updateFilter("sort", e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-sky-500"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

