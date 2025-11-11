"use client";

import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { useCart } from "./CartContext";
import { useState } from "react";
import dynamic from "next/dynamic";

const CartDrawer = dynamic(() => import("./CartDrawer"), { ssr: false });

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/#best-deals", label: "Best Deals" },
  { href: "/#new-arrivals", label: "New Arrivals" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact" },
];

export default function NavBar() {
  const { count } = useCart();
  const [miniOpen, setMiniOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/30 bg-slate-100/95 backdrop-blur-xl backdrop-saturate-150 dark:border-zinc-700/30 dark:bg-zinc-900/95">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-2 sm:px-8 lg:px-12 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-white sm:h-9 sm:w-9">
              <Image
                src="/logo.png"
                alt="Apple Nation BD"
                fill
                className="object-contain p-0.5"
                sizes="(max-width: 640px) 32px, 36px"
                priority
              />
            </div>
            <div className="hidden flex-col sm:flex">
              <span className="text-base font-bold leading-tight text-slate-900 dark:text-zinc-100">
                Apple Nation BD
              </span>
              <span className="text-[10px] font-medium uppercase tracking-wide text-slate-500 dark:text-zinc-400">
                Gadget Store
              </span>
            </div>
          </Link>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-2.5 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:border-slate-400 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-white dark:focus-visible:ring-offset-zinc-900 lg:hidden"
            aria-label="Open navigation menu"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
            Menu
          </button>
        </div>
        <nav className="hidden items-center gap-4 text-xs font-medium text-slate-600 dark:text-zinc-300 lg:flex">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 transition-colors hover:bg-slate-900/5 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:hover:bg-zinc-800/70 dark:hover:text-white dark:focus-visible:ring-offset-zinc-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMiniOpen(true)}
            className="relative inline-flex items-center justify-center rounded-full bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg shadow-slate-900/10 transition-transform hover:-translate-y-0.5 hover:bg-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-sky-400 dark:hover:text-white dark:focus-visible:ring-offset-zinc-900"
          >
            View Cart
            <span className="ml-2 inline-flex min-w-5 items-center justify-center rounded-full bg-sky-600 px-1.5 text-[10px] font-bold text-white dark:bg-sky-500">
              {count}
            </span>
          </button>
        </div>
      </div>
      <CartDrawer open={miniOpen} onClose={() => setMiniOpen(false)} />
    </header>
  );
}

