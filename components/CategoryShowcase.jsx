"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdMemory, MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const INITIAL_CATEGORIES_COUNT = 16; // 2 rows × 8 categories

export default function CategoryShowcase({ categories = [] }) {
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef(null);

  if (!categories.length) {
    return null;
  }

  // Define priority categories
  const priorityCategories = ["Smartphone", "Earbuds", "Earphone"];

  // Sort categories
  const sortedCategories = [...categories].sort((a, b) => {
    const aName = a.name || "";
    const bName = b.name || "";

    const aPriorityIndex = priorityCategories.findIndex(p => aName.toLowerCase().includes(p.toLowerCase()));
    const bPriorityIndex = priorityCategories.findIndex(p => bName.toLowerCase().includes(p.toLowerCase()));

    // If both are priority categories, sort by their order in the priority list
    if (aPriorityIndex !== -1 && bPriorityIndex !== -1) {
      return aPriorityIndex - bPriorityIndex;
    }

    // If only a is priority, it comes first
    if (aPriorityIndex !== -1) return -1;

    // If only b is priority, it comes first
    if (bPriorityIndex !== -1) return 1;

    // Otherwise keep original order (or alphabetical if preferred, but keeping original for now)
    return 0;
  });

  const displayedCategories = showAll ? sortedCategories : sortedCategories.slice(0, INITIAL_CATEGORIES_COUNT);
  const hasMoreCategories = sortedCategories.length > INITIAL_CATEGORIES_COUNT;

  return (
    <section ref={sectionRef} className="space-y-10 font-urbanist mt-16">
      <div className="flex flex-col gap-4 text-center lg:text-left">
        <div className="inline-flex items-center justify-center gap-2 self-center rounded-full bg-[#fa6915f1] px-5 py-1.5 text-sm  font-semibold tracking-wide text-white dark:bg-orange-400/10 dark:text-orange-300 lg:self-start">
          Shop by Category
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-zinc-100">
            Explore Essentials Tailored for Your Ecosystem
          </h2>
          <p className="mx-auto max-w-3xl text-sm text-slate-500 poppins dark:text-zinc-400 lg:mx-0">
            Browse curated collections featuring the most-loved Apple Nation BD categories. Each section is optimized for quick discovery and deeper exploration.
          </p>
        </div>
      </div>
      <div className="space-y-6">
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8">
          {displayedCategories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className="group relative flex flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border border-slate-200 bg-white/85 p-6 shadow-lg shadow-slate-900/5 transition-transform duration-300 hover:-translate-y-1 hover:border-orange-500 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-orange-500/60"
            >
              {category.image_url ? (
                <div className="relative overflow-hidden">
                  <Image
                    src={category.image_url}
                    alt={category.name}
                    width={300}
                    height={300}
                    className="object-cover transition-transform duration-300 group-hover:scale-110 md:w-16 w-10"
                    sizes="56px"
                    unoptimized
                  />
                </div>
              ) : (
                <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-orange-500/15 text-orange-600 transition-transform duration-300 group-hover:scale-110 dark:bg-orange-400/10 dark:text-orange-200">
                  <MdMemory className="h-7 w-7" aria-hidden />
                </span>
              )}
              <h3 className="text-center text-sm font-semibold text-slate-900 dark:text-zinc-100">
                {category.name}
              </h3>
              {/* {category.product_count > 0 && (
                <span className="text-xs text-slate-500 dark:text-zinc-400">
                  {category.product_count} {category.product_count === 1 ? "item" : "items"}
                </span>
              )} */}
            </Link>
          ))}
        </div>
        {hasMoreCategories && (
          <div className="flex justify-center">
            {!showAll ? (
              <button
                onClick={() => setShowAll(true)}
                className="inline-flex items-center gap-2 rounded-full border border-orange-600 bg-white px-6 py-2 text-sm font-semibold text-orange-600 transition-colors hover:bg-orange-50 dark:border-orange-400 cursor-pointer dark:bg-zinc-800 dark:text-orange-400 dark:hover:bg-zinc-700"
              >
                View All Categories
                <MdKeyboardArrowDown className="h-5 w-5" />
              </button>
            ) : (
              <button
                onClick={() => {
                  setShowAll(false);
                  // Smooth scroll to top of categories section
                  setTimeout(() => {
                    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 100);
                }}
                className="inline-flex items-center gap-2 rounded-full border-2 border-orange-600 bg-white px-6 py-3 text-sm font-semibold text-orange-600 transition-colors hover:bg-orange-50 dark:border-orange-400 dark:bg-zinc-800 dark:text-orange-400 dark:hover:bg-zinc-700"
              >
                Show Less
                <MdKeyboardArrowUp className="h-5 w-5" />
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

