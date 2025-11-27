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
    <div className="flex flex-col gap-3 w-full">
      {/* Brand */}
      {product.brand_name && (
        <div className="flex items-center gap-3">
          {product.brand_image ? (
            <div className="relative h-12 w-12 overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-zinc-700 dark:bg-zinc-800/90">
              <Image
                src={product.brand_image}
                alt={product.brand_name}
                fill
                className="object-contain p-2"
                sizes="48px"
              />
            </div>
          ): ( <span className="text-sm font-medium text-slate-600 dark:text-zinc-400 font-poppins">
            {product.brand_name}
          </span>)}
         
        </div>
      )}

      {/* Product Name */}
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-urbanist dark:text-zinc-100">
        {product.name}
      </h1>

      <div className="flex items-baseline gap-3">
          <span className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
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

      {/* Variant Selector */}
      {hasVariants && (
        <div>
          <ProductVariantSelector
            variants={product.imeis}
            colors={product.color}
            initialVariant={selectedVariant}
            onVariantChange={handleVariantChange}
            basePrice={product.retails_price}
          />
        </div>
      )}

      {/* whatsapp */}

      <Link href='https://wa.me/+8801675323706' className="bg-[linear-gradient(90deg,#32e07a,#1aa87b)]
 rounded-full px-6 gap-1.5 py-2 text-base font-medium text-white flex justify-center items-center">
        <FaWhatsapp size={20}></FaWhatsapp>
        WhatsApp
      </Link>

      {/* Price and Add to Cart */}
      <div className="flex items-center gap-4">
        
        {/* Add / In Cart */}
        <button
          disabled={!isInStock}
          className={`inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-2 text-base font-medium font-poppins text-white shadow-lg transition-all ${
            isInStock
              ? "bg-orange-500 hover:bg-orange-600 hover:-translate-y-0.5 hover:shadow-xl dark:bg-orange-500 dark:hover:bg-orange-600"
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
                ? "In Cart"
                : "Add to Cart")
            : "Stock Out"}
        </button>

        <Link href={`/products/${product.id}`} className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-2 text-base font-medium font-poppins bg-white text-orange-500 border border-orange-600 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-orange-100">Buy it now</Link>


      </div>

      {/* Stock Status */}
      {/* <div className="flex items-center gap-2">
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
      </div> */}

     
      
    </div>
  );
}

