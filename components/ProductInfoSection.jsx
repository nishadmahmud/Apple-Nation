"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ProductVariantSelector from "./ProductVariantSelector";
import { MdShoppingCart, MdCheckCircle, MdCancel } from "react-icons/md";
import { useCart } from "./CartContext";
import { FaWhatsapp } from "react-icons/fa6";
import Link from "next/link";

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
  console.log(product);

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
    <div className="flex flex-col gap-6 w-full font-poppins">
      {/* Brand & Title */}
      <div className="space-y-2">
        {product.brand_name && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-orange-600 dark:text-orange-400 uppercase tracking-wider">
              {product.brand_name}
            </span>
          </div>
        )}
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 font-urbanist dark:text-zinc-100 leading-tight">
          {product.name}
        </h1>
      </div>

      {/* Price & Stock */}
      <div className="flex flex-col gap-4 border-b border-slate-100 dark:border-zinc-800 pb-3">
        <div className="flex items-end gap-3 flex-wrap">
          <span className="text-4xl font-bold text-slate-900 dark:text-zinc-100 font-urbanist">
            {formatCurrency(hasVariants && selectedVariant
              ? calculateDiscountedPrice(selectedVariant.sale_price || product.retails_price, discount, discountType)
              : discountedPrice)}
          </span>
          {hasDiscount && (
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg text-slate-400 line-through decoration-slate-400/50 dark:text-zinc-500">
                {formatCurrency(originalPrice)}
              </span>
              <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-bold text-red-600 dark:bg-red-900/20 dark:text-red-400">
                {discountType === "Percentage" ? `-${discount}%` : "SALE"}
              </span>
            </div>
          )}
        </div>

        {/* Stock Indicator */}
        <div className="flex items-center gap-2">
          {isInStock ? (
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full text-sm font-medium">
              <MdCheckCircle className="h-4 w-4" />
              <span>In Stock</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full text-sm font-medium">
              <MdCancel className="h-4 w-4" />
              <span>Out of Stock</span>
            </div>
          )}
        </div>
      </div>

      {/* Variant Selector */}
      {hasVariants && (
        <div className="pt-1">
          <ProductVariantSelector
            variants={product.imeis}
            colors={product.color}
            initialVariant={selectedVariant}
            onVariantChange={handleVariantChange}
            basePrice={product.retails_price}
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-3 mt-2">
        <div className="flex gap-3 w-full">
          <button
            disabled={!isInStock}
            className={`flex-1 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-semibold transition-all ${isInStock
              ? "bg-slate-900 text-white hover:bg-slate-800 hover:-translate-y-0.5 shadow-lg shadow-slate-200/50 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 dark:shadow-none"
              : "cursor-not-allowed bg-slate-200 text-slate-400 dark:bg-zinc-800 dark:text-zinc-600"
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
                ? "In Cart"
                : "Add to Cart")
              : "Stock Out"}
          </button>

          <Link
            href={`/products/${product.id}`}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-semibold bg-orange-500 text-white shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-orange-500/30"
          >
            Buy Now
          </Link>
        </div>

        <Link
          href='https://wa.me/+8801675323706'
          target="_blank"
          className="w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium bg-[#25D366] text-white hover:bg-[#20bd5a] transition-colors shadow-lg shadow-green-500/20"
        >
          <FaWhatsapp className="h-5 w-5" />
          Chat on WhatsApp
        </Link>
      </div>
    </div>
  );
}
