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
    <section className="w-full mt-16">
      <Link
        href={bannerLink}
        className="group relative block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-800"
      >
        <div className="relative h-64 w-full lg:h-96">
          <Image
            src={bannerImage}
            alt="Banner"
            width={1500}
            height={1000}
            className="object-contain"
         
            priority={false}
            unoptimized
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
      </Link>
    </section>
  );
}

