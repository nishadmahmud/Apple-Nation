"use client";

import Image from "next/image";
import Link from "next/link";

import { getCategoryId } from "../lib/api";

export default function CategoryBannerRow() {
  const smartWatchesId = getCategoryId("smart-watches") || "smart-watches";
  const headphonesId = getCategoryId("headphones") || "headphones";
  return (
    <section className="grid gap-4 sm:grid-cols-2">
      <Link
        href={`/products?category=${smartWatchesId}`}
        className="group relative block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-800"
      >
        <div className="relative h-72 w-full sm:h-80 lg:h-96">
          <Image
            src="https://www.gadgetboddaa.com/_next/image?url=https%3A%2F%2Fwww.outletexpense.xyz%2Fuploads%2F188-MD.-Alamin%2F1757580673.jpg&w=1920&q=75&dpl=dpl_6WN3M3DvNUSRMDgWoGLnzs95CDYS"
            alt="Smart Watches"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={false}
            unoptimized
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <h3 className="rounded-full bg-white/90 px-4 py-1.5 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur">
            Smart Watches
          </h3>
        </div>
      </Link>

      <Link
        href={`/products?category=${headphonesId}`}
        className="group relative block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-800"
      >
        <div className="relative h-72 w-full sm:h-80 lg:h-96">
          <Image
            src="https://images.unsplash.com/photo-1545127398-14699f92334b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735"
            alt="Headphones"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={false}
            unoptimized
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <h3 className="rounded-full bg-white/90 px-4 py-1.5 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur">
            Headphones
          </h3>
        </div>
      </Link>
    </section>
  );
}


