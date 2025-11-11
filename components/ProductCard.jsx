 "use client";

import Image from "next/image";
import Link from "next/link";
import { MdShoppingCart } from "react-icons/md";
import { useCart } from "./CartContext";

const formatCurrency = (value) => {
  const amount = Number(value);
  if (Number.isNaN(amount)) return "৳—";
  return `৳${amount.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
};

export default function ProductCard({ product }) {
  const { addItem, items } = useCart();
  const imageSrc =
    product.image_path || product.image_url || product.thumbnail || "/globe.svg";
  const statusLabel = product.status || "Available";
  const price = product.discounted_price ?? product.retails_price;
  const original = product.retails_price;
  const hasDiscount = price !== original && original;
  
  // Only show tag if out of stock
  const isOutOfStock = statusLabel?.toLowerCase().includes("out") || 
                       statusLabel?.toLowerCase().includes("stock out") ||
                       statusLabel?.toLowerCase() === "stock out";

  return (
    <div className="group flex flex-col gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-lg shadow-slate-900/5 transition-transform duration-300 hover:-translate-y-1 hover:border-sky-500 hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-800/90 dark:hover:border-sky-500/60">
      <div className="relative h-44 w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-zinc-700/50">
        <Link href={`/products/${product.id}`}>
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </Link>
        {product.discount ? (
          <span className="absolute left-3 top-3 z-10 inline-flex items-center rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
            {product.discount_type === "Percentage"
              ? `${product.discount}% OFF`
              : `৳${Number(product.discount || 0).toLocaleString("en-US")}`}
          </span>
        ) : null}
        {isOutOfStock && (
          <span className="absolute right-3 top-3 z-10 inline-flex items-center rounded-full bg-red-500 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
            Out of Stock
          </span>
        )}
      </div>
      <div className="space-y-2">
        <Link href={`/products/${product.id}`} className="block">
          <h3 className="text-lg font-semibold text-slate-900 transition-colors duration-300 group-hover:text-sky-600 dark:text-zinc-100 dark:group-hover:text-sky-400 line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold text-slate-900 dark:text-zinc-100">
            {formatCurrency(price)}
          </span>
          {hasDiscount ? (
            <span className="text-sm text-slate-500 line-through dark:text-zinc-500">
              {formatCurrency(original)}
            </span>
          ) : null}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Link
          href={`/products/${product.id}`}
          className="text-xs font-semibold uppercase tracking-wide text-slate-500 hover:text-slate-900 dark:text-zinc-500"
        >
          View details →
        </Link>
        {items.some((it) => String(it.id) === String(product.id)) ? (
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-400 px-3 py-2 text-xs font-semibold text-emerald-600 transition-colors hover:bg-emerald-50 dark:border-emerald-600/40 dark:hover:bg-emerald-900/20"
          >
            In Cart
          </Link>
        ) : (
        <button
          type="button"
          onClick={() =>
            addItem({
              id: product.id,
              name: product.name,
              price: price || 0,
              image: imageSrc,
            })
          }
          className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600"
        >
          <MdShoppingCart className="h-4 w-4" />
          Add
        </button>
        )}
      </div>
    </div>
  );
}

