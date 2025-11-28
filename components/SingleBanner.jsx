"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchBanners, getBanners } from "../lib/api";

export default function SingleBanner() {
  const [bannerImage, setBannerImage] = useState("");
  const [bannerLink, setBannerLink] = useState("/products");

  // Fetch banner image from API
  useEffect(() => {
    const loadBannerImage = async () => {
      try {
        const apiUrl = getBanners();

        // Check if URL is valid
        if (!apiUrl) {
          console.warn("Banner API URL is not configured.");
          return;
        }

        console.log("Fetching single banner image from:", apiUrl);

        const response = await fetchBanners();
        if (response?.success && response?.data && Array.isArray(response.data) && response.data.length >= 5) {
          // Fifth banner (index 4)
          const banner = response.data[4];
          if (banner?.image_path) {
            setBannerImage(banner.image_path);
            // Use button_url if available, otherwise default to products page
            if (banner.button_url) {
              setBannerLink(banner.button_url);
            }
            console.log("Single banner image (5th) loaded");
          }
        } else {
          console.warn("Not enough banner data found in API response (need at least 5 banners)");
        }
      } catch (error) {
        console.error("Error fetching single banner image:", error);
        console.error("Attempted URL:", getBanners());
      }
    };

    loadBannerImage();
  }, []);

  // Don't render if no image
  if (!bannerImage) {
    return null;
  }

  return (
    <section className="w-full md:mt-24 mt-16">
      <Link
        href={bannerLink}
        className="group relative block overflow-hidden rounded-3xl shadow-2xl shadow-slate-200/50 dark:shadow-black/50"
      >
        <div className="relative h-48 w-full lg:h-[450px]">
          <Image
            src={bannerImage}
            alt="Banner"
            width={1500}
            height={1000}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority={false}
            unoptimized
          />
          {/* Premium Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
            <div className="transform translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <span className="inline-flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 px-6 py-2 text-sm font-bold text-white mb-4">
                Featured Collection
              </span>
              <div className="flex items-center gap-2 text-white font-urbanist font-bold text-lg">
                Shop Now <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}

