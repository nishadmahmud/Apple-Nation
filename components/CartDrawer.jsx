"use client";

import Link from "next/link";
import Image from "next/image";
import { MdClose, MdDelete, MdShoppingCart } from "react-icons/md";
import { useCart } from "./CartContext";

const formatCurrency = (value) => {
  const amount = Number(value);
  if (Number.isNaN(amount)) return "৳—";
  return `৳${amount.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
};

export default function CartDrawer({ open, onClose }) {
  const { items, updateQuantity, removeItem, subtotal, count, isHydrated } = useCart();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000]">
      {/* Transparent click-away (no dark overlay) */}
      <button
        className="absolute inset-0"
        aria-label="Close cart"
        onClick={onClose}
      />
      {/* Compact dropdown near top-right */}
      <div className="absolute right-6 top-16 z-[1001] w-[380px] max-h-[70vh] overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-2xl dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-zinc-700">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-zinc-100">
            <MdShoppingCart className="h-5 w-5" />
            Cart ({count})
          </div>
          <button
            className="rounded-full p-2 hover:bg-slate-100 dark:hover:bg-zinc-800"
            aria-label="Close"
            onClick={onClose}
          >
            <MdClose className="h-5 w-5" />
          </button>
        </div>
        <div className="max-h-[52vh] overflow-auto px-4 py-3 text-sm">
          {!isHydrated ? (
            <p className="text-slate-700 dark:text-zinc-400">Loading…</p>
          ) : items.length === 0 ? (
            <p className="text-slate-700 dark:text-zinc-400">Your cart is empty.</p>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.key}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-800 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                >
                  <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-white">
                    <Image src={item.image || "/globe.svg"} alt={item.name} fill className="object-contain p-1" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900 dark:text-zinc-100">{item.name}</p>
                    {item.attributes ? (
                      <p className="truncate text-xs text-slate-600 dark:text-zinc-400">
                        {item.attributes.color} {item.attributes.storage} {item.attributes.region}
                      </p>
                    ) : null}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border border-slate-300 bg-white px-2 py-0.5 text-xs dark:border-zinc-600 dark:bg-zinc-900">
                        <button
                          className="px-2"
                          onClick={() => updateQuantity(item.key, Math.max(1, item.quantity - 1))}
                          aria-label="Decrease"
                        >
                          −
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          className="px-2"
                          onClick={() => updateQuantity(item.key, item.quantity + 1)}
                          aria-label="Increase"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm font-semibold text-slate-900 dark:text-zinc-100">{formatCurrency(item.price)}</span>
                    </div>
                  </div>
                  <button
                    className="rounded-full p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30"
                    aria-label="Remove"
                    onClick={() => removeItem(item.key)}
                  >
                    <MdDelete className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="border-t border-slate-200 p-4 text-sm dark:border-zinc-700">
          <div className="mb-3 flex items-center justify-between text-sm text-slate-700 dark:text-zinc-300">
            <span>Subtotal</span>
            <span className="font-semibold text-slate-900 dark:text-zinc-100">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex gap-3">
            <Link
              href="/cart"
              onClick={onClose}
              className="inline-flex flex-1 items-center justify-center rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800/70"
            >
              View Cart
            </Link>
            <Link
              href="/checkout"
              onClick={onClose}
              className="inline-flex flex-1 items-center justify-center rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


