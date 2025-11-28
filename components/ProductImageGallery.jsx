"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { noImage } from "@/app/layout";

export default function ProductImageGallery({
  images,
  productName,
  hasDiscount,
  discount,
  discountType,
  isInStock
}) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef(null);

  if (!images || images.length === 0) {
    images = ["/globe.svg"];
  }

  const selectedImage = images[selectedImageIndex] || images[0];

  const handleMouseMove = (e) => {
    if (!imageContainerRef.current) return;
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div className="space-y-4">
      {/* Main Zoom Image */}
      <div
        className="
          relative 
          aspect-square 
          w-full 
          max-w-full
          sm:max-w-sm 
          md:max-w-md 
          lg:max-w-lg 
          xl:max-w-3xl 
          mx-auto
          z-10 
          rounded-2xl 
          border border-slate-100 
          bg-white 
          shadow-sm
          dark:border-zinc-800 
          dark:bg-zinc-900 
          cursor-crosshair
        "
        ref={imageContainerRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
      >
        {/* Base Image */}
        <div className="relative h-full w-full">
          <Image
            src={selectedImage || noImage}
            alt={productName}
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Zoomed Image Flyout (Separate Modal/Pane) */}
        {isHovering && (
          <div
            className="absolute left-[105%] top-0 z-50 h-[400px] w-[400px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl dark:border-zinc-700 dark:bg-zinc-800 hidden lg:block"
            style={{
              backgroundImage: `url(${selectedImage || noImage})`,
              backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
              backgroundSize: "200%", // 2x zoom
              backgroundRepeat: "no-repeat"
            }}
          />
        )}

        {hasDiscount && (
          <span className="absolute left-3 top-3 sm:left-4 sm:top-4 z-20 inline-flex items-center rounded-full bg-emerald-500 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-white shadow-lg">
            {discountType === "Percentage"
              ? `${discount}% OFF`
              : `৳${Number(discount).toLocaleString("en-US")} OFF`}
          </span>
        )}

        {!isInStock && (
          <span className="absolute right-3 top-3 sm:right-4 sm:top-4 z-20 inline-flex items-center rounded-full bg-red-500 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-white shadow-lg">
            Stock Out
          </span>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="
          grid 
          grid-cols-4 
          md:grid-cols-4 
          gap-2 sm:gap-3 
          justify-center 
          items-center 
        ">
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedImageIndex(index)}
              className={`
                relative 
                aspect-square 
                overflow-hidden 
                rounded-lg 
                w-full 
                border-2 
                bg-white 
                transition-all
                ${selectedImageIndex === index
                  ? "border-slate-900 ring-1 ring-slate-900 dark:border-zinc-100 dark:ring-zinc-100"
                  : "border-slate-100 hover:border-slate-300 dark:border-zinc-800 dark:hover:border-zinc-700"
                }
              `}
              aria-label={`View ${productName} - Image ${index + 1}`}
            >
              <Image
                src={image}
                alt={`${productName} - Image ${index + 1}`}
                fill
                className={`
                  object-contain 
                  p-1 sm:p-2 
                  transition-opacity 
                  ${selectedImageIndex === index
                    ? "opacity-100"
                    : "opacity-70 hover:opacity-100"
                  }
                `}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
