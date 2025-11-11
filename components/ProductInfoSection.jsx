"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ProductVariantSelector from "./ProductVariantSelector";
import { MdShoppingCart, MdCheckCircle, MdCancel } from "react-icons/md";
import { useCart } from "./CartContext";

const formatCurrency = (value) => {
  const amount = Number(value);
  if (Number.isNaN(amount)) return "৳—";
  return `৳${amount.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
};

const calculateDiscountedPrice = (price, discount, discountType) => {
  if (!discount || discount === 0) return price;
  
  if (discountType === "Percentage") {
    return price - (price * discount / 100);
  } else {
    return price - discount;
  }
};

export default function ProductInfoSection({ product, onStockStatusChange }) {
  const { addItem, items } = useCart();
  const hasVariants = product.have_variant === 1 && 
                     product.imeis && 
                     Array.isArray(product.imeis) && 
                     product.imeis.length > 0;

  // Initialize with first variant synchronously if product has variants
  const initialVariant = hasVariants && product.imeis && product.imeis.length > 0
    ? product.imeis[0]
    : null;

  // Initialize state with first variant if available
  const [selectedVariant, setSelectedVariant] = useState(initialVariant);
  const [displayPrice, setDisplayPrice] = useState(
    initialVariant 
      ? (initialVariant.sale_price || product.retails_price || 0)
      : (product.retails_price || 0)
  );
  const [isInStock, setIsInStock] = useState(
    initialVariant
      ? initialVariant.in_stock === 1
      : (product.status?.toLowerCase().includes("stock") === false || 
         product.status?.toLowerCase() === "in stock" ||
         (product.current_stock && product.current_stock > 0))
  );
  const [stockCount, setStockCount] = useState(
    initialVariant ? 1 : (product.current_stock || null)
  );

  const originalPrice = hasVariants && selectedVariant 
    ? (selectedVariant.sale_price || product.retails_price || 0)
    : (product.retails_price || 0);
  
  const discount = product.discount || 0;
  const discountType = product.discount_type;
  const discountedPrice = calculateDiscountedPrice(originalPrice, discount, discountType);
  const hasDiscount = discount > 0;

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
    setDisplayPrice(variant.sale_price || product.retails_price || 0);
    const variantInStock = variant.in_stock === 1;
    setIsInStock(variantInStock);
    setStockCount(1);
    if (onStockStatusChange) {
      onStockStatusChange(variantInStock);
    }
  };

  // Notify parent of stock status changes
  useEffect(() => {
    if (onStockStatusChange) {
      onStockStatusChange(isInStock);
    }
  }, [isInStock, onStockStatusChange]);

  return (
    <div className="flex flex-col gap-6">
      {/* Brand */}
      {product.brand_name && (
        <div className="flex items-center gap-3">
          {product.brand_image && (
            <div className="relative h-12 w-12 overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-zinc-700 dark:bg-zinc-800/90">
              <Image
                src={product.brand_image}
                alt={product.brand_name}
                fill
                className="object-contain p-2"
                sizes="48px"
              />
            </div>
          )}
          <span className="text-sm font-medium text-slate-600 dark:text-zinc-400">
            {product.brand_name}
          </span>
        </div>
      )}

      {/* Product Name */}
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-zinc-100">
        {product.name}
      </h1>

      {/* Variant Selector */}
      {hasVariants && (
        <div className="rounded-xl border border-slate-200 bg-white/95 p-6 dark:border-zinc-700 dark:bg-zinc-800/90">
          <ProductVariantSelector
            variants={product.imeis}
            colors={product.color}
            initialVariant={selectedVariant}
            onVariantChange={handleVariantChange}
            basePrice={product.retails_price}
          />
        </div>
      )}

      {/* Price and Add to Cart */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-bold text-slate-900 dark:text-zinc-100">
            {formatCurrency(hasVariants && selectedVariant 
              ? calculateDiscountedPrice(selectedVariant.sale_price || product.retails_price, discount, discountType)
              : discountedPrice)}
          </span>
          {hasDiscount && (
            <span className="text-xl text-slate-500 line-through dark:text-zinc-500">
              {formatCurrency(originalPrice)}
            </span>
          )}
        </div>
        {/* Add / In Cart */}
        <button
          disabled={!isInStock}
          className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-semibold text-white shadow-lg transition-all ${
            isInStock
              ? "bg-sky-600 hover:bg-sky-700 hover:-translate-y-0.5 hover:shadow-xl dark:bg-sky-500 dark:hover:bg-sky-600"
              : "cursor-not-allowed bg-slate-400 opacity-50 dark:bg-zinc-600"
          }`}
          onClick={() => {
            if (!isInStock) return;
            const already =
              items?.some((it) =>
                String(it.id) === String(product.id) &&
                (selectedVariant ? String(it.variantId) === String(selectedVariant?.id) : true)
              ) || false;
            if (already) {
              window.location.href = "/cart";
              return;
            }
            const image =
              (product.images && product.images[0]) ||
              product.image_path ||
              product.thumbnail ||
              "/globe.svg";
            addItem(
              {
                id: product.id,
                variantId: selectedVariant?.id || null,
                name: product.name,
                price:
                  (hasVariants && selectedVariant
                    ? calculateDiscountedPrice(
                        selectedVariant.sale_price || product.retails_price,
                        discount,
                        discountType
                      )
                    : discountedPrice) || 0,
                image,
                attributes: selectedVariant
                  ? {
                      color: selectedVariant.color,
                      storage: selectedVariant.storage,
                      region: selectedVariant.region,
                    }
                  : null,
              },
              1
            );
          }}
        >
          <MdShoppingCart className="h-5 w-5" />
          {isInStock
            ? (items?.some((it) =>
                String(it.id) === String(product.id) &&
                (selectedVariant ? String(it.variantId) === String(selectedVariant?.id) : true)
              )
                ? "In Cart - View"
                : "Add to Cart")
            : "Out of Stock"}
        </button>
      </div>

      {/* Stock Status */}
      <div className="flex items-center gap-2">
        {isInStock ? (
          <>
            <MdCheckCircle className="h-5 w-5 text-emerald-500" />
            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
              In Stock
              {stockCount && ` (${stockCount} available)`}
              {hasVariants && selectedVariant && (
                <span className="ml-1 text-slate-600 dark:text-zinc-400">
                  - {selectedVariant.color}
                  {selectedVariant.storage && `, ${selectedVariant.storage}GB`}
                  {selectedVariant.region && `, ${selectedVariant.region}`}
                </span>
              )}
            </span>
          </>
        ) : (
          <>
            <MdCancel className="h-5 w-5 text-red-500" />
            <span className="text-sm font-medium text-red-600 dark:text-red-400">
              Out of Stock
              {hasVariants && selectedVariant && (
                <span className="ml-1 text-slate-600 dark:text-zinc-400">
                  - {selectedVariant.color}
                  {selectedVariant.storage && `, ${selectedVariant.storage}GB`}
                  {selectedVariant.region && `, ${selectedVariant.region}`}
                </span>
              )}
            </span>
          </>
        )}
      </div>

      {/* Specifications */}
      {product.specifications && Array.isArray(product.specifications) && product.specifications.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white/95 p-6 dark:border-zinc-700 dark:bg-zinc-800/90">
          <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-zinc-100">
            Specifications
          </h2>
          <dl className="space-y-3">
            {product.specifications.map((spec, index) => (
              <div key={index} className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                <dt className="min-w-[120px] text-sm font-medium text-slate-600 dark:text-zinc-400">
                  {spec.name}:
                </dt>
                <dd className="flex-1 text-sm text-slate-900 dark:text-zinc-100">
                  {spec.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}

