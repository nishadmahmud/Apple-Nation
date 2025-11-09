"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/categories/official-phone", label: "Categories" },
  { href: "/collections/best-deals", label: "Collections" },
  { href: "/blogs", label: "Blogs" },
  { href: "/support", label: "Support" },
];

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/30 bg-slate-100/95 backdrop-blur-xl backdrop-saturate-150 dark:border-zinc-800/30 dark:bg-zinc-950/95">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-6 py-4 sm:px-10 lg:px-16 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-slate-900 dark:text-zinc-100">
                Apple Nation BD
              </span>
            </div>
          </Link>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:border-slate-400 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-white dark:focus-visible:ring-offset-zinc-900 lg:hidden"
            aria-label="Open navigation menu"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
            Menu
          </button>
        </div>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 dark:text-zinc-300 lg:flex">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 transition-colors hover:bg-slate-900/5 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:hover:bg-zinc-800/70 dark:hover:text-white dark:focus-visible:ring-offset-zinc-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Link
            href="/cart"
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition-transform hover:-translate-y-0.5 hover:bg-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-sky-400 dark:hover:text-white dark:focus-visible:ring-offset-zinc-900"
          >
            View Cart
          </Link>
        </div>
      </div>
    </header>
  );
}

