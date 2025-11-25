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
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-[2fr_1fr] mt-2">
      {/* Large Phone Section */}
      <Link
        href={officialPhoneId ? `/products?category=${officialPhoneId}` : "/products"}
        className="group relative col-span-2 aspect-16/10 overflow-hidden rounded-md shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl lg:col-span-1 lg:aspect-auto lg:min-h-[500px]"
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
              unoptimized
            />
          </div>
        ))}

        {/* Dark Overlay for Text Readability */}
       

        {/* Content - All at bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10 space-y-1 p-2 md:space-y-3 md:p-3 lg:space-y-4 ">
          


          
          {/* Slider Indicators */}
          <div className="flex items-center justify-center gap-1.5 py-1 md:gap-2 md:py-2">
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
      <div className="col-span-2 grid grid-cols-2 gap-2 lg:col-span-1 lg:flex lg:flex-col">
        {/* Smart Watches Section */}
        <Link
          href={smartWatchesId ? `/products?category=${smartWatchesId}` : "/products"}
          className="group relative min-h-[160px] flex-1 overflow-hidden rounded-md shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl md:min-h-[240px]"
        >
          {/* Background Image */}
          {smartwatchImage && (
            <Image
              src={smartwatchImage}
              alt="Smart Watches"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 50vw, 33vw"
              unoptimized
            />
          )}

        

          
          
        </Link>

        {/* Earbuds Section */}
        <Link
          href={earbudsId ? `/products?category=${earbudsId}` : "/products"}
          className="group relative min-h-[160px] flex-1 overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl md:min-h-[240px]"
        >
          {/* Background Image */}
          {earbudsImage && (
            <Image
              src={earbudsImage}
              alt="Earbuds"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 50vw, 33vw"
              unoptimized
            />
          )}

         
        </Link>
      </div>
    </div>
  );
}

