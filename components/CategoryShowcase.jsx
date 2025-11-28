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

  const displayedCategories = showAll ? categories : categories.slice(0, INITIAL_CATEGORIES_COUNT);
  const hasMoreCategories = categories.length > INITIAL_CATEGORIES_COUNT;

  return (
    <section ref={sectionRef} className="space-y-10 font-urbanist mt-24">
      <div className="flex flex-col gap-4 text-center lg:text-left">
        <div className="inline-flex items-center justify-center gap-2 self-center rounded-full bg-orange-500/10 border border-orange-500/20 px-5 py-1.5 text-sm font-bold tracking-wide text-orange-600 dark:bg-orange-400/10 dark:text-orange-400 dark:border-orange-400/20 lg:self-start">
          Shop by Category
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-zinc-100">
            Explore Essentials
          </h2>
          <p className="mx-auto max-w-3xl text-base text-slate-500 font-poppins dark:text-zinc-400 lg:mx-0">
            Browse our curated collections. Each section is optimized for quick discovery.
          </p>
        </div>
      </div>
      <div className="space-y-8">
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8">
          {displayedCategories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className="group flex flex-col items-center gap-4 p-4 rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 dark:hover:bg-zinc-800 dark:hover:shadow-black/50"
            >
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-slate-50 dark:bg-zinc-800/50 transition-all duration-300 group-hover:scale-110 group-hover:bg-orange-50 dark:group-hover:bg-orange-500/10">
                {category.image_url ? (
                  <Image
                    src={category.image_url}
                    alt={category.name}
                    width={64}
                    height={64}
                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                    unoptimized
                  />
                ) : (
                  <MdMemory className="h-8 w-8 text-slate-400 transition-colors duration-300 group-hover:text-orange-500" />
                )}
              </div>
              <h3 className="text-center text-sm font-bold text-slate-700 transition-colors duration-300 group-hover:text-orange-600 dark:text-zinc-300 dark:group-hover:text-orange-400">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
        {hasMoreCategories && (
          <div className="flex justify-center">
            {!showAll ? (
              <button
                onClick={() => setShowAll(true)}
                className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-orange-500 hover:text-orange-600 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-orange-500 dark:hover:text-orange-400"
              >
                View All Categories
                <MdKeyboardArrowDown className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-1" />
              </button>
            ) : (
              <button
                onClick={() => {
                  setShowAll(false);
                  setTimeout(() => {
                    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 100);
                }}
                className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-orange-500 hover:text-orange-600 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-orange-500 dark:hover:text-orange-400"
              >
                Show Less
                <MdKeyboardArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1" />
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

