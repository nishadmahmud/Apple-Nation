"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export default function Pagination({ currentPage, totalPages, totalItems, itemsPerPage }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const updatePage = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newPage === 1) {
      params.delete("page");
    } else {
      params.set("page", String(newPage));
    }
    const newUrl = params.toString() 
      ? `/products?${params.toString()}`
      : "/products";
    router.push(newUrl);
    
    // Scroll to top of products
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }
    
    return pages;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
      <p className="text-sm text-slate-600 dark:text-zinc-400">
        Showing <span className="font-semibold text-slate-900 dark:text-zinc-100">{startItem}</span> to{" "}
        <span className="font-semibold text-slate-900 dark:text-zinc-100">{endItem}</span> of{" "}
        <span className="font-semibold text-slate-900 dark:text-zinc-100">{totalItems}</span> products
      </p>
      
      <div className="flex items-center gap-2">
        <button
          onClick={() => updatePage(currentPage - 1)}
          disabled={currentPage === 1}
          className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white dark:border-zinc-600 dark:bg-zinc-700/70 dark:text-zinc-300 dark:hover:bg-zinc-600/80 dark:disabled:hover:bg-zinc-700/70"
          aria-label="Previous page"
        >
          <MdChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-1">
          {getPageNumbers().map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => updatePage(pageNum)}
              className={`inline-flex items-center justify-center rounded-lg border px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 ${
                pageNum === currentPage
                  ? "border-sky-500 bg-sky-600 text-white dark:bg-sky-500"
                  : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:border-zinc-600 dark:bg-zinc-700/70 dark:text-zinc-300 dark:hover:bg-zinc-600/80"
              }`}
              aria-label={`Go to page ${pageNum}`}
              aria-current={pageNum === currentPage ? "page" : undefined}
            >
              {pageNum}
            </button>
          ))}
        </div>

        <button
          onClick={() => updatePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white dark:border-zinc-600 dark:bg-zinc-700/70 dark:text-zinc-300 dark:hover:bg-zinc-600/80 dark:disabled:hover:bg-zinc-700/70"
          aria-label="Next page"
        >
          <MdChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

