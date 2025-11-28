"use client";

import { useState } from "react";
import ProductImageGallery from "./ProductImageGallery";
import ProductInfoSection from "./ProductInfoSection";

export default function ProductDetailsWrapper({ product, images, hasDiscount, discount, discountType }) {
  const [isInStock, setIsInStock] = useState(true);

  const handleStockStatusChange = (inStock) => {
    setIsInStock(inStock);
  };

  return (
    <div className="flex md:flex-row flex-col gap-5 md:gap-10">
      {/* Image Gallery */}
      {/* Image Gallery */}
      <div className="w-full md:w-1/2">
        <ProductImageGallery
          images={images}
          productName={product.name}
          hasDiscount={hasDiscount}
          discount={discount}
          discountType={discountType}
          isInStock={isInStock}
        />
      </div>

      {/* Product Info */}
      <ProductInfoSection
        product={product}
        onStockStatusChange={handleStockStatusChange}
      />
    </div>
  );
}

