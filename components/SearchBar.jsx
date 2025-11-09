"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MdSearch } from "react-icons/md";

export default function SearchBar({ initialQuery = "" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const debounceTimer = useRef(null);

  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  const updateSearch = (query) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (query.trim()) {
      params.set("search", query.trim());
    } else {
      params.delete("search");
    }
    
    params.delete("page");
    const newUrl = params.toString() 
      ? `/products?${params.toString()}`
      : "/products";
    router.push(newUrl);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Clear existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Debounce the search - wait 500ms after user stops typing
    debounceTimer.current = setTimeout(() => {
      updateSearch(value);
    }, 500);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Clear debounce timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    updateSearch(searchQuery);
  };

  const handleClear = () => {
    setSearchQuery("");
    // Clear debounce timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    updateSearch("");
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return (
    <form onSubmit={handleSearch} className="w-full sm:w-auto sm:min-w-[300px]">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MdSearch className="h-5 w-5 text-slate-400 dark:text-zinc-500" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(e);
            }
          }}
          placeholder="Search products..."
          className="block w-full rounded-lg border border-slate-300 bg-white px-10 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-sky-500"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300"
            aria-label="Clear search"
          >
            <span className="text-lg leading-none">×</span>
          </button>
        )}
      </div>
    </form>
  );
}

