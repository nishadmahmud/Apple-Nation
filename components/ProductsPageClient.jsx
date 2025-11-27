"use client";

import { useState } from "react";
import { MdFilterList, MdGridView, MdViewList } from "react-icons/md";
import ProductCard from "./ProductCard";
import ProductFilters from "./ProductFilters";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductsPageClient({
  initialProducts,
  totalPages,
  currentPage,
  totalItems,
  itemsPerPage,
  selectedCategory,
  searchQuery,
  filteredCount,
}) {
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-zinc-900 dark:text-zinc-100">
      <div className="mx-auto w-full md:max-w-10/12 max-w-11/12 py-4 lg:py-8">
        {/* Mobile Header with Search */}
        <div className="mb-4 lg:mb-8">
          <div className="flex justify-between gap-3">
            <div className="hidden sm:block">
              <h1 className="text-3xl font-urbanist font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-zinc-100">
                {selectedCategory ? selectedCategory.name : "All Products"}
              </h1>
              <p className="mt-2 text-base text-slate-700 font-poppins dark:text-zinc-400">
                {filteredCount} product{filteredCount !== 1 ? "s" : ""} found
              </p>
            </div>
            
            {/* Search Bar */}
            <div>
              <SearchBar initialQuery={searchQuery} />
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
              className={`rounded-md p-2 transition-colors ${
                viewMode === "grid"
                  ? "bg-orange-500 text-white"
                  : "text-slate-600 hover:bg-slate-100 dark:text-zinc-400 dark:hover:bg-zinc-700"
              }`}
              aria-label="Grid view"
            >
              <MdGridView className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`rounded-md p-2 transition-colors ${
                viewMode === "list"
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
          {filteredCount} product{filteredCount !== 1 ? "s" : ""} found
        </p>

        {/* Mobile Filters Sheet */}
        {showFilters && (
  <AnimatePresence>
    <div className="fixed inset-0 z-9999 lg:hidden" style={{ zIndex: 999999 }}>
      
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="absolute inset-0 bg-black/50"
        onClick={() => setShowFilters(false)}
        aria-hidden="true"
      />

      {/* Filters Panel */}
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

        <ProductFilters />
      </motion.div>
    </div>
  </AnimatePresence>
)}

        <div className="flex flex-col gap-4 lg:flex-row lg:gap-3">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden w-full shrink-0 lg:block lg:w-64">
            <div className="sticky top-20 rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-lg shadow-slate-900/5 dark:border-zinc-700 dark:bg-zinc-800/90">
              <ProductFilters />
            </div>
          </aside>

          {/* Products Grid/List */}
          <main className="flex-1">
            {initialProducts.length > 0 ? (
              <>
                <div
                  className={
                    viewMode === "grid"
                      ? "grid gap-x-6 gap-y-2 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                      : "flex flex-col gap-4"
                  }
                >
                  {initialProducts.map((product) => (
                    <ProductCard key={product.id} product={product} viewMode={viewMode} />
                  ))}
                </div>
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

