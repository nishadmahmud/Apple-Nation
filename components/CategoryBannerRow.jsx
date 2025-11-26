"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { getCategoryId, fetchBanners, getBanners } from "../lib/api";

export default function CategoryBannerRow() {
  const [bannerImage, setBannerImage] = useState("");

  const smartWatchesId = getCategoryId("smart-watches") || "smart-watches";

  useEffect(() => {
    const loadBanner = async () => {
      try {
        const apiUrl = getBanners();
        if (!apiUrl) return;

        const response = await fetchBanners();
        if (
          response?.success &&
          Array.isArray(response.data) &&
          response.data.length >= 1
        ) {
          // Just take **first banner**
          if (response.data[2]?.image_path) {
            setBannerImage(response.data[2].image_path);
          }
        }
      } catch (err) {
        console.error("Error loading single banner:", err);
      }
    };

    loadBanner();
  }, []);

  return (
    <section className="mt-16">
      <Link
        href={`/products?category=${smartWatchesId}`}
        className="flex items-center overflow-hidden justify-between w-full"
      >
        {/* LEFT SIDE TEXT */}
        <div className="space-y-4">
          <h2 className="text-2xl md:text-4xl font-urbanist font-bold">
            Samsung Galaxy Phone Collection
          </h2>
          <p className="text-slate-600 dark:text-slate-300 font-poppins md:w-4/5 md:text-base text-sm">
            Discover the latest samsung galaxy series phone with advanced health tracking,
            longer battery life, and modern style.
          </p>

          <button className="inline-block bg-orange-500 hover:bg-orange-700 text-white font-semibold px-7 py-2 rounded-full transition">
            Shop Now
          </button>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="relative">
          {bannerImage && (
            <Image
              src={bannerImage}
              alt="Smartwatch Banner"
              width={600}
              height={600}
              className="object-cover rounded-2xl transition-transform md:w-md"
              unoptimized
            />
          )}
        </div>
      </Link>
    </section>
  );
}
