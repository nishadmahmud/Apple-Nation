"use client";

import { useState } from "react";
import Image from "next/image";
import ReactImageMagnify from "react-image-magnify";
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

  if (!images || images.length === 0) {
    images = ["/globe.svg"];
  }

  const selectedImage = images[selectedImageIndex] || images[0];

  return (
    <div className="space-y-4">
      {/* Main Zoom Image */}
      <div className="
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
        md:overflow-visible 
        rounded-xl 
        border border-slate-200 
        bg-white 
        dark:border-zinc-700 
        dark:bg-zinc-800/90 
        p-2 sm:p-3 md:p-4
      ">
        <ReactImageMagnify
          {...{
            smallImage: {
              alt: productName,
              isFluidWidth: true,
              src: selectedImage || noImage,
            },
            largeImage: {
              src: selectedImage || noImage,
              width: 1600,
              height: 1600,
            },
            enlargedImageContainerDimensions: {
              width: "150%",
              height: "100%",
            },
            enlargedImagePosition: "beside",
          }}
        />

        {hasDiscount && (
          <span className="absolute left-3 top-3 sm:left-4 sm:top-4 z-10 inline-flex items-center rounded-full bg-emerald-500 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-white shadow-lg">
            {discountType === "Percentage"
              ? `${discount}% OFF`
              : `৳${Number(discount).toLocaleString("en-US")} OFF`}
          </span>
        )}

        {!isInStock && (
          <span className="absolute right-3 top-3 sm:right-4 sm:top-4 z-10 inline-flex items-center rounded-full bg-red-500 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-white shadow-lg">
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
                ${
                  selectedImageIndex === index
                    ? "border-orange-500 ring-2 ring-orange-500/20 dark:border-orange-400 dark:ring-orange-400/20"
                    : "border-slate-200 hover:border-slate-300 dark:border-zinc-700 dark:hover:border-zinc-600"
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
                  ${
                    selectedImageIndex === index
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
