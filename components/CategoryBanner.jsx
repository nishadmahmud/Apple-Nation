"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdArrowForward } from "react-icons/md";
import { getAllCategories } from "../lib/api";

// Phone slider images
const phoneImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=1000&fit=crop&q=80",
    alt: "iPhone 15 Pro Max",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=1000&fit=crop&q=80",
    alt: "iPhone 16 Pro",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&h=1000&fit=crop&q=80",
    alt: "Latest iPhone Models",
  },
];

// Smartwatch image
const smartwatchImage = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop&q=80";

// Earbuds image
const earbudsImage = "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800&h=800&fit=crop&q=80";

export default function CategoryBanner() {
  const [currentPhoneImage, setCurrentPhoneImage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Get category IDs for links
  const categories = getAllCategories();
  const officialPhoneCategory = categories.find(cat => cat.slug === "official-phone");
  const smartWatchesCategory = categories.find(cat => cat.slug === "smart-watches");
  const earbudsCategory = categories.find(cat => cat.slug === "earbuds");
  
  const officialPhoneId = officialPhoneCategory?.id;
  const smartWatchesId = smartWatchesCategory?.id;
  const earbudsId = earbudsCategory?.id;

  // Auto-play phone slider
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentPhoneImage((prev) => (prev + 1) % phoneImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

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
    <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
      {/* Large Phone Section */}
      <Link
        href={officialPhoneId ? `/products?category=${officialPhoneId}` : "/products"}
        className="group relative aspect-[16/9] overflow-hidden rounded-md shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl lg:aspect-auto lg:min-h-[500px]"
      >
        {/* Phone Background Images Slider */}
        {phoneImages.map((phone, index) => (
          <div
            key={phone.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentPhoneImage ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={phone.url}
              alt={phone.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 66vw, 50vw"
              priority={index === 0}
            />
          </div>
        ))}

        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/20 to-black/30" />

        {/* Content - All at bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10 space-y-1 p-2 md:space-y-3 md:p-6 lg:space-y-4 lg:p-8">
          <div className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm md:gap-2 md:px-3 md:py-1.5 md:text-xs lg:px-4 lg:py-2 lg:text-sm">
            Official Phones
          </div>
          <h2 className="text-sm font-bold text-white sm:text-xl md:text-2xl lg:text-5xl">
            Latest iPhone Series
          </h2>
          <p className="hidden max-w-md text-sm text-slate-200 md:block lg:text-base">
            Discover the newest iPhone models with cutting-edge technology and premium design.
          </p>


          {/* CTA Button */}
          <div>
            <span className="inline-flex items-center gap-1 rounded-full bg-red-600 px-3 py-1.5 text-[10px] font-semibold text-white transition-transform duration-300 group-hover:scale-105 md:gap-2 md:px-5 md:py-2.5 md:text-xs lg:px-6 lg:py-3 lg:text-sm">
              SHOP NOW
              <MdArrowForward className="h-2 w-2 md:h-3 md:w-3 lg:h-4 lg:w-4" />
            </span>
          </div>
          
          {/* Slider Indicators */}
          <div className="flex items-center gap-1.5 py-1 md:gap-2 md:py-2">
            {phoneImages.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  goToPhoneImage(index);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 md:h-2 ${
                  index === currentPhoneImage
                    ? "w-6 bg-white md:w-8"
                    : "w-1.5 bg-white/40 hover:bg-white/60 md:w-2"
                }`}
                aria-label={`Go to phone image ${index + 1}`}
              />
            ))}
          </div>

          
        </div>
      </Link>

      {/* Right Column - Two Smaller Sections */}
      <div className="flex flex-col gap-4">
        {/* Smart Watches Section */}
        <Link
          href={smartWatchesId ? `/products?category=${smartWatchesId}` : "/products"}
          className="group relative min-h-[180px] flex-1 overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl md:min-h-[240px]"
        >
          {/* Background Image */}
          <Image
            src={smartwatchImage}
            alt="Smart Watches"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 50vw, 33vw"
          />

          {/* Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/20 to-black/30" />

          {/* Content - All at bottom */}
          <div className="absolute bottom-0 left-0 right-0 z-10 space-y-1 p-3 md:space-y-2 md:p-6">
            <h3 className="text-sm font-bold text-white md:text-xl lg:text-2xl">
              Smart Watches
            </h3>
            <p className="text-[10px] text-slate-200 md:text-sm">
              Track your fitness, stay connected
            </p>
            <div className="pt-1 md:pt-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-red-600 px-3 py-1.5 text-[10px] font-semibold text-white transition-transform duration-300 group-hover:scale-105 md:gap-2 md:px-4 md:py-2 md:text-xs">
                SHOP NOW
                <MdArrowForward className="h-2 w-2 md:h-3 md:w-3" />
              </span>
            </div>
          </div>
        </Link>

        {/* Earbuds Section */}
        <Link
          href={earbudsId ? `/products?category=${earbudsId}` : "/products"}
          className="group relative min-h-[180px] flex-1 overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl md:min-h-[240px]"
        >
          {/* Background Image */}
          <Image
            src={earbudsImage}
            alt="Earbuds"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 50vw, 33vw"
          />

          {/* Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/20 to-black/30" />

          {/* Content - All at bottom */}
          <div className="absolute bottom-0 left-0 right-0 z-10 space-y-1 p-3 md:space-y-2 md:p-6">
            <h3 className="text-sm font-bold text-white md:text-xl lg:text-2xl">
              Earbuds
            </h3>
            <p className="text-[10px] text-slate-200 md:text-sm">
              Premium sound quality
            </p>
            <div className="pt-1 md:pt-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-red-600 px-3 py-1.5 text-[10px] font-semibold text-white transition-transform duration-300 group-hover:scale-105 md:gap-2 md:px-4 md:py-2 md:text-xs">
                SHOP NOW
                <MdArrowForward className="h-2 w-2 md:h-3 md:w-3" />
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

