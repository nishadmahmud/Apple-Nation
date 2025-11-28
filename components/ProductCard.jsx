"use client";

import Image from "next/image";
import Link from "next/link";
import { MdShoppingCart } from "react-icons/md";

export default function ProductCard({
  product,
  handleAddToCart,
  inCart,
  imageSrc,
  price,
  original,
  stockOut,
  hasDiscount,
  className = ""
}) {

  const formatCurrency = (value) =>
    `৳${Number(value).toLocaleString("en-US")}`;

  // Safe handler for add to cart
  const onAddToCart = (e) => {
    e.preventDefault(); // Prevent link navigation if inside a link
    if (handleAddToCart) {
      handleAddToCart(product);
    } else {
      console.warn("handleAddToCart prop missing in ProductCard");
    }
  };

  return (
    <article
      className={`group relative flex w-full flex-col gap-4 overflow-hidden rounded-3xl border border-slate-100 bg-white p-4 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/10 dark:border-zinc-800 dark:bg-zinc-900/80 dark:shadow-black/50 dark:hover:shadow-orange-500/5 ${className}`}
    >
      {/* Product Image */}
      <div className="relative h-52 w-full overflow-hidden rounded-2xl bg-slate-50 dark:bg-zinc-800/50">
        <Link href={`/products/${product.id}`}>
          <Image
            src={imageSrc || product.image_path}
            alt={product.name}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
          />
        </Link>

        {/* Discount Badge */}
        {product.discount ? (
          <div className="absolute left-0 top-3 z-20 rounded-r-full bg-emerald-500 px-3 py-1 text-[10px] font-bold text-white shadow-md shadow-emerald-500/20 tracking-wide">
            {product.discount_type === "Percentage"
              ? `${product.discount}% OFF`
              : `৳${Number(product.discount || 0).toLocaleString("en-US")} OFF`}
          </div>
        ) : ""}

        {/* Stock Out */}
        {stockOut && (
          <div className="absolute right-3 top-3 z-20 rounded-full bg-red-500/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold text-white shadow-sm tracking-wide">
            Stock Out
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-2 px-1">
        <Link href={`/products/${product.id}`} className="block">
          <h3 className="text-sm font-bold text-slate-900 line-clamp-2 transition-colors font-urbanist duration-300 group-hover:text-orange-600 dark:text-zinc-100 dark:group-hover:text-orange-400">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-end gap-2 font-urbanist">
          <span className="text-xl font-bold text-slate-900 dark:text-zinc-100">
            {formatCurrency(price ? price : product?.discount ? product?.discounted_price : product?.retails_price)}
          </span>

          {hasDiscount && (
            <span className="text-xs font-semibold text-slate-400 line-through dark:text-zinc-500 mb-1">
              {formatCurrency(original || product.retails_price)}
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-auto flex items-center gap-2 font-urbanist md:flex-row flex-col pt-2">
        <Link
          href={`/products/${product.id}`}
          className="flex-1 rounded-full bg-slate-900 px-4 py-2 text-center text-xs font-bold text-white transition-all duration-300 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/20 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-orange-500 dark:hover:text-white w-full"
        >
          Buy Now
        </Link>

        {inCart ? (
          <Link
            href="/cart"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 transition-colors hover:bg-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400"
            title="View Cart"
          >
            <MdShoppingCart className="h-4 w-4" />
          </Link>
        ) : (
          <button
            type="button"
            onClick={onAddToCart}
            disabled={stockOut}
            className={`inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 transition-all duration-300 hover:border-orange-500 hover:text-orange-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:border-orange-500 dark:hover:text-orange-400 ${stockOut ? "cursor-not-allowed opacity-40" : ""
              }`}
            title="Add to Cart"
          >
            <MdShoppingCart className="h-4 w-4" />
          </button>
        )}
      </div>
    </article>
  );
}
