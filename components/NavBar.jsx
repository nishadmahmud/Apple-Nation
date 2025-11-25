"use client";

import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { useCart } from "./CartContext";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { createPortal } from "react-dom";
import { MdClose, MdShoppingCart, MdMenu } from "react-icons/md";
import NavBarSearch from "./NavBarSearch";
import { ShoppingCart } from "lucide-react";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Wait for next tick to avoid cascading renders
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);


  return (
        <header className="sticky top-0 z-50 border-b border-slate-200/50 bg-white/90 backdrop-blur-xl backdrop-saturate-150 dark:border-zinc-700/30 dark:bg-zinc-900/95">
          <div className="mx-auto flex w-full max-w-10/12 flex-col gap-2 py-2  lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center justify-between gap-6">
              <Link href="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
            <div className="relative h-8 w-8 md:w-12 md:h-12 shrink-0 overflow-hidden rounded-full">
              <Image
                src="https://www.outletexpense.xyz/uploads/260-Biplob-Hossen/1764051566_69254a6e812ce.png"
                alt="Apple Nation BD"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 32px, 40px"
                priority
              />
            </div>
            
          </Link>
          <div className="flex items-center gap-2 lg:hidden">
                <button
              type="button"
              onClick={() => setMiniOpen(true)}
                  className="relative inline-flex items-center justify-center rounded-full border border-slate-300 p-2 text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-white"
              aria-label="View cart"
            >
              <MdShoppingCart className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-sky-600 text-[10px] font-bold text-white dark:bg-sky-500">
                  {count}
                </span>
              )}
            </button>
                <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 p-2 text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-white"
              aria-label="Open navigation menu"
            >
              <MdMenu className="h-6 w-6" />
            </button>
          </div>

           <nav className="hidden items-center gap-4 text-xs font-semibold text-slate-700 dark:text-zinc-300 lg:flex">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-2 transition-colors hover:text-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white  dark:hover:text-white dark:focus-visible:ring-offset-zinc-900 font-urbanist text-sm"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        </div>
           
       <div className="flex items-center gap-2">
         <div className="hidden items-center gap-3 lg:flex">
          <NavBarSearch />
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
         <button
  type="button"
  onClick={() => setMiniOpen(true)}
  className="relative inline-flex font-urbanist items-center justify-center rounded-full gap-2 bg-[#fb6913] px-3.5 py-1.5 text-xs font-semibold cursor-pointer text-white shadow-lg shadow-slate-900/10 transition-transform hover:-translate-y-0.5 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:ring-offset-2 hover:text-black focus-visible:ring-offset-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-gray-50 dark:hover:text-black dark:focus-visible:ring-offset-zinc-900"
>
  <span className="relative">
    <ShoppingCart size={20} />

    {/* Badge positioned on top of icon */}
    <span className="absolute top-0 -right-1 inline-flex h-3 min-w-3 items-center justify-center rounded-full bg-gray-100 text-[8px] font-semibold text-[#fb6913] px-1 dark:bg-gray-900 dark:text-white">
      {count}
    </span>
  </span>

  Cart
</button>

        </div>
       </div>
      </div>
      
      <CartDrawer open={miniOpen} onClose={() => setMiniOpen(false)} />
      
      {/* Mobile Menu Drawer - Using Portal */}
      {mounted && mobileMenuOpen && typeof document !== 'undefined' && createPortal(
        <div className="lg:hidden">
          {/* Backdrop */}
          <div
            className="mobile-menu-backdrop fixed inset-0 bg-black/50"
            style={{ zIndex: 999998 }}
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          {/* Drawer */}
          <aside className="mobile-menu-drawer fixed inset-y-0 left-0 w-80 max-w-[85vw] overflow-y-auto bg-white shadow-2xl dark:bg-zinc-900"
            style={{ zIndex: 999999 }}>
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 dark:border-zinc-700">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-zinc-100">Menu</h2>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-full p-2 text-slate-600 hover:bg-slate-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                  aria-label="Close menu"
                >
                  <MdClose className="h-6 w-6" />
                </button>
              </div>
              
              {/* Search Bar */}
              <div className="border-b border-slate-200 px-4 py-4 dark:border-zinc-700">
                <NavBarSearch />
              </div>
              
              {/* Navigation Links */}
              <nav className="flex-1 px-4 py-4">
                <div className="flex flex-col gap-2">
                  {navigationLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </nav>
              
              {/* Footer Actions */}
              <div className="border-t border-slate-200 px-4 py-4 space-y-3 dark:border-zinc-700">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700 dark:text-zinc-300">Theme</span>
                  <ThemeToggle />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setMiniOpen(true);
                  }}
                  className="relative w-full inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-sky-600 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-sky-400"
                >
                  <MdShoppingCart className="h-5 w-5" />
                  View Cart
                  {count > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-sky-600 text-[10px] font-bold text-white dark:bg-sky-500">
                      {count}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </aside>
        </div>,
        document.body
      )}
    </header>
  );
}

