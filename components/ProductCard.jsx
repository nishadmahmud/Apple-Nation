"use client";

import Image from "next/image";
import Link from "next/link";
import { MdShoppingCart } from "react-icons/md";

export default function ProductCard({ product, handleAddToCart, inCart, imageSrc, price, original, stockOut, hasDiscount }) {
  
  const formatCurrency = (value) =>
    `৳${Number(value).toLocaleString("en-US")}`;

  return (
    <article
      className="group relative flex md:w-60 w-42 shrink-0 snap-start flex-col gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-500 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-800/90 dark:hover:border-orange-400/60"
    >
      {/* Product Image */}
      <div className="relative h-44 w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-zinc-700/60">
        <Link href={`/products/${product.id}`}>
          <Image
            src={imageSrc || product.image_path}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 16rem, 18rem"
            unoptimized
          />
        </Link>

        {/* Discount Badge */}
        {product.discount && (
          <span className="absolute left-3 top-3 z-10 inline-flex items-center rounded-full bg-emerald-600 px-3 py-1 text-[10px] font-semibold text-white shadow-md tracking-wide">
            {product.discount_type === "Percentage"
              ? `${product.discount}% OFF`
              : `৳${Number(product.discount || 0).toLocaleString("en-US")}`}
          </span>
        )}

        {/* Stock Out */}
        {stockOut && (
          <span className="absolute right-3 top-3 z-10 inline-flex items-center rounded-full bg-red-600 px-3 py-1.5 text-[10px] font-semibold text-white shadow-md tracking-wide">
            Stock Out
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-1.5">
        <Link href={`/products/${product.id}`} className="block">
          <h3 className="text-sm font-medium text-slate-900 line-clamp-2 transition-colors font-poppins duration-300 group-hover:text-orange-600 dark:text-zinc-100 dark:group-hover:text-orange-400">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2 font-poppins">
          <span className="text-xl font-semibold text-slate-900 dark:text-zinc-100">
            {formatCurrency(price ? price : product?.discount ? product?.discounted_price : product?.retails_price)}
          </span>

          {hasDiscount && (
            <span className="text-sm text-slate-500 line-through dark:text-zinc-500">
              {formatCurrency(original || product.retails_price)}
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-auto flex items-center gap-2 font-urbanist md:flex-row flex-col">
        <Link
          href={`/products/${product.id}`}
          className="flex-1 rounded-full bg-[#fb6913] px-2 py-1.5 text-center text-xs font-medium text-white transition-colors hover:bg-orange-600 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-orange-400 w-full"
        >
          Buy Now
        </Link>

        {inCart ? (
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 rounded-full border border-green-300 bg-green-100 px-4 py-1.5 justify-center   text-xs font-semibold text-green-600 transition-colors hover:bg-slate-50 dark:border-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 w-fit"
          >
            <MdShoppingCart className="h-4 w-4" />
            In Cart
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => handleAddToCart(product)}
            disabled={stockOut}
            className={`inline-flex md:w-fit w-full text-center justify-center items-center gap-0.5 rounded-full border border-slate-900 bg-white px-3 py-1.5 text-xs font-medium text-slate-900 transition-colors hover:bg-slate-50 dark:border-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 ${
              stockOut ? "cursor-not-allowed opacity-40" : ""
            }`}
          >
            <MdShoppingCart className="h-3.5 w-3.5" />
            Add to Cart
          </button>
        )}
      </div>
    </article>
  );
}
