"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdArrowForward } from "react-icons/md";
import { getAllCategories, fetchSliders, getSliders, fetchBanners, getBanners } from "../lib/api";

export default function CategoryBanner() {
  const [currentPhoneImage, setCurrentPhoneImage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [phoneImages, setPhoneImages] = useState([]);
  const [smartwatchImage, setSmartwatchImage] = useState("");
  const [earbudsImage, setEarbudsImage] = useState("");

  // Get category IDs for links
  const categories = getAllCategories();
  const officialPhoneCategory = categories.find(cat => cat.slug === "official-phone");
  const smartWatchesCategory = categories.find(cat => cat.slug === "smart-watches");
  const earbudsCategory = categories.find(cat => cat.slug === "earbuds");

  const officialPhoneId = officialPhoneCategory?.id;
  const smartWatchesId = smartWatchesCategory?.id;
  const earbudsId = earbudsCategory?.id;

  // Fetch slider images from API
  useEffect(() => {
    const loadSliderImages = async () => {
      try {
        const apiUrl = getSliders();

        // Check if URL is valid
        if (!apiUrl) {
          console.warn("Slider API URL is not configured.");
          return;
        }

        console.log("Fetching slider images from:", apiUrl);

        const response = await fetchSliders();
        if (response?.success && response?.data && response.data.length > 0) {
          // Get the first slider's image_path array
          const slider = response.data[0];
          if (slider.image_path && Array.isArray(slider.image_path) && slider.image_path.length > 0) {
            // Transform API images to match our structure
            const images = slider.image_path.map((url, index) => ({
              id: index + 1,
              url: url,
              alt: slider.title || `Slider Image ${index + 1}`,
            }));
            setPhoneImages(images);
            console.log("Successfully loaded", images.length, "slider images");
          } else {
            console.warn("Slider data found but no image_path array");
          }
        } else {
          console.warn("No slider data found in API response");
        }
      } catch (error) {
        console.error("Error fetching slider images:", error);
        console.error("Attempted URL:", getSliders());
      }
    };

    loadSliderImages();
  }, []);

  // Fetch banner images from API
  useEffect(() => {
    const loadBannerImages = async () => {
      try {
        const apiUrl = getBanners();

        // Check if URL is valid
        if (!apiUrl) {
          console.warn("Banner API URL is not configured.");
          return;
        }

        console.log("Fetching banner images from:", apiUrl);

        const response = await fetchBanners();
        if (response?.success && response?.data && Array.isArray(response.data) && response.data.length >= 2) {
          // First banner (index 0) for earbuds
          if (response.data[0]?.image_path) {
            setEarbudsImage(response.data[0].image_path);
            console.log("Earbuds banner image loaded");
          }

          // Second banner (index 1) for smartwatch
          if (response.data[1]?.image_path) {
            setSmartwatchImage(response.data[1].image_path);
            console.log("Smartwatch banner image loaded");
          }
        } else {
          console.warn("Not enough banner data found in API response (need at least 2 banners)");
        }
      } catch (error) {
        console.error("Error fetching banner images:", error);
        console.error("Attempted URL:", getBanners());
      }
    };

    loadBannerImages();
  }, []);

  // Auto-play phone slider
  useEffect(() => {
    if (!isAutoPlaying || phoneImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentPhoneImage((prev) => (prev + 1) % phoneImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, phoneImages.length]);

  const nextPhoneImage = () => {
    setCurrentPhoneImage((prev) => (prev + 1) % phoneImages.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const prevPhoneImage = () => {
    setCurrentPhoneImage((prev) => (prev - 1 + phoneImages.length) % phoneImages.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const goToPhoneImage = (index) => {
    setCurrentPhoneImage(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2.4fr_1fr] mt-4">
      {/* Large Phone Section - Premium Slider */}
      <div className="group relative col-span-1 overflow-hidden rounded-2xl shadow-2xl shadow-slate-200/50 dark:shadow-black/50 lg:min-h-[520px] h-[400px] lg:h-auto">
        <Link
          href={officialPhoneId ? `/products?category=${officialPhoneId}` : "/products"}
          className="block h-full w-full"
        >
          {/* Phone Background Images Slider */}
          {phoneImages.map((phone, index) => (
            <div
              key={phone.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentPhoneImage ? "opacity-100 scale-100" : "opacity-0 scale-105"
                }`}
            >
              <Image
                src={phone.url}
                alt={phone.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 70vw"
                priority={index === 0}
                unoptimized
              />
              {/* Premium Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
            </div>
          ))}

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-10 lg:p-12">
            <div className="transform transition-all duration-700 translate-y-0 opacity-100">
              <h2 className="text-3xl font-bold text-white md:text-5xl lg:text-6xl font-urbanist mb-4 drop-shadow-lg">
                Official Phones
              </h2>
              <p className="max-w-md text-lg text-slate-200 font-poppins mb-8 drop-shadow-md hidden md:block">
                Experience the latest technology with our curated collection of official smartphones.
              </p>

              <button className="group/btn inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/30 px-8 py-3 text-base font-semibold text-white transition-all duration-300 hover:bg-white hover:text-black hover:border-white">
                Shop Now
                <MdArrowForward className="h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </button>
            </div>

            {/* Slider Indicators */}
            <div className="absolute bottom-10 right-10 flex gap-2">
              {phoneImages.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    goToPhoneImage(index);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-500 ${index === currentPhoneImage
                    ? "w-8 bg-white"
                    : "w-2 bg-white/40 hover:bg-white/60"
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </Link>
      </div>

      {/* Right Column - Two Premium Cards */}
      <div className="flex flex-col gap-4 h-full">
        {/* Smart Watches Section */}
        <Link
          href={smartWatchesId ? `/products?category=${smartWatchesId}` : "/products"}
          className="group relative flex-1 overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl min-h-[200px]"
        >
          {smartwatchImage && (
            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
              <Image
                src={smartwatchImage}
                alt="Smart Watches"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 33vw"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            </div>
          )}
          <div className="absolute bottom-0 left-0 p-6 z-10 w-full">
            <div className="transform transition-transform duration-300 group-hover:-translate-y-1">
              <h3 className="text-2xl font-bold text-white font-urbanist mb-1">Smart Watches</h3>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-200 opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                Explore Collection <MdArrowForward />
              </div>
            </div>
          </div>
        </Link>

        {/* Earbuds Section */}
        <Link
          href={earbudsId ? `/products?category=${earbudsId}` : "/products"}
          className="group relative flex-1 overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl min-h-[200px]"
        >
          {earbudsImage && (
            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
              <Image
                src={earbudsImage}
                alt="Earbuds"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 33vw"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            </div>
          )}
          <div className="absolute bottom-0 left-0 p-6 z-10 w-full">
            <div className="transform transition-transform duration-300 group-hover:-translate-y-1">
              <h3 className="text-2xl font-bold text-white font-urbanist mb-1">Earbuds</h3>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-200 opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                Shop Audio <MdArrowForward />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

