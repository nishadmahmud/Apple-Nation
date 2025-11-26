"use client";

import { useState } from "react";
import Image from "next/image";
import { noImage } from "@/app/layout";

export default function ProductImageGallery({ images, productName, hasDiscount, discount, discountType, isInStock }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  if (!images || images.length === 0) {
    images = ["/globe.svg"];
  }

  const selectedImage = images[selectedImageIndex] || images[0];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square w-120 overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-zinc-700 dark:bg-zinc-800/90">
        <Image
          src={selectedImage || noImage}
          alt={productName}
          width={1000}
          height={500}
          className="object-contain p-4 transition-opacity duration-300"
          
          priority={selectedImageIndex === 0}
        />
        {hasDiscount && (
          <span className="absolute left-4 top-4 z-10 inline-flex items-center rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg">
            {discountType === "Percentage"
              ? `${discount}% OFF`
              : `৳${Number(discount).toLocaleString("en-US")} OFF`}
          </span>
        )}
        {!isInStock && (
          <span className="absolute right-4 top-4 z-10 inline-flex items-center rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-lg">
            Out of Stock
          </span>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 justify-center items-center">
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedImageIndex(index)}
              className={`relative aspect-square overflow-hidden rounded-lg w-28 border-2 bg-white transition-all ${
                selectedImageIndex === index
                  ? "border-sky-500 ring-2 ring-sky-500/20 dark:border-sky-400 dark:ring-sky-400/20"
                  : "border-slate-200 hover:border-slate-300 dark:border-zinc-700 dark:hover:border-zinc-600"
              }`}
              aria-label={`View ${productName} - Image ${index + 1}`}
            >
              <Image
                src={image}
                alt={`${productName} - Image ${index + 1}`}
                fill
                className={`object-contain p-2 transition-opacity w-28 ${
                  selectedImageIndex === index ? "opacity-100" : "opacity-70 hover:opacity-100"
                }`}
               
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

