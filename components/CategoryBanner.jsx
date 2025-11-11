"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdChevronLeft, MdChevronRight, MdArrowForward } from "react-icons/md";
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
        className="group relative min-h-[400px] overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl lg:min-h-[500px]"
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
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />

        {/* Content */}
        <div className="relative z-10 flex h-full min-h-[400px] flex-col justify-between p-6 lg:min-h-[500px] lg:p-8">
          <div className="space-y-3 lg:space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm lg:px-4 lg:py-2 lg:text-sm">
              Official Phones
            </div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-5xl">
              Latest iPhone Series
            </h2>
            <p className="max-w-md text-sm text-slate-200 lg:text-base">
              Discover the newest iPhone models with cutting-edge technology and premium design.
            </p>
            
            {/* CTA Button - Moved up on mobile */}
            <div className="mt-40 lg:mt-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-xs font-semibold text-white transition-transform duration-300 group-hover:scale-105 lg:px-6 lg:py-3 lg:text-sm">
                SHOP NOW
                <MdArrowForward className="h-3 w-3 lg:h-4 lg:w-4" />
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Arrows - Hidden on mobile */}
        <button
          onClick={(e) => {
            e.preventDefault();
            prevPhoneImage();
          }}
          className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur-sm transition-all hover:bg-white/30 lg:flex"
          aria-label="Previous phone image"
        >
          <MdChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            nextPhoneImage();
          }}
          className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur-sm transition-all hover:bg-white/30 lg:flex"
          aria-label="Next phone image"
        >
          <MdChevronRight className="h-6 w-6 text-white" />
        </button>

        {/* Slider Indicators */}
        <div className="absolute bottom-4 left-6 z-20 flex items-center gap-2 lg:bottom-6 lg:left-8">
          {phoneImages.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                goToPhoneImage(index);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentPhoneImage
                  ? "w-8 bg-white"
                  : "w-2 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to phone image ${index + 1}`}
            />
          ))}
        </div>
      </Link>

      {/* Right Column - Two Smaller Sections */}
      <div className="flex flex-col gap-4">
        {/* Smart Watches Section */}
        <Link
          href={smartWatchesId ? `/products?category=${smartWatchesId}` : "/products"}
          className="group relative min-h-[240px] flex-1 overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
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
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-black/50" />

          {/* Content */}
          <div className="relative z-10 flex h-full min-h-[240px] flex-col justify-between p-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">
                Smart Watches
              </h3>
              <p className="text-sm text-slate-200">
                Track your fitness, stay connected
              </p>
            </div>

            <div className="mt-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-xs font-semibold text-white transition-transform duration-300 group-hover:scale-105">
                SHOP NOW
                <MdArrowForward className="h-3 w-3" />
              </span>
            </div>
          </div>
        </Link>

        {/* Earbuds Section */}
        <Link
          href={earbudsId ? `/products?category=${earbudsId}` : "/products"}
          className="group relative min-h-[240px] flex-1 overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
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
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-black/50" />

          {/* Content */}
          <div className="relative z-10 flex h-full min-h-[240px] flex-col justify-between p-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">
                Earbuds
              </h3>
              <p className="text-sm text-slate-200">
                Premium sound quality
              </p>
            </div>

            <div className="mt-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-xs font-semibold text-white transition-transform duration-300 group-hover:scale-105">
                SHOP NOW
                <MdArrowForward className="h-3 w-3" />
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

