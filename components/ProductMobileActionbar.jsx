"use client";

import { MdShoppingCart } from "react-icons/md";

export default function ProductMobileActionbar({ onAddToCart, onBuyNow, isInStock }) {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 block lg:hidden">
            <div className="flex items-center gap-3 border-t border-slate-200 bg-white px-4 py-3 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] dark:border-zinc-800 dark:bg-zinc-900">
                {/* Shop Now Button */}
                <button
                    onClick={onBuyNow}
                    disabled={!isInStock}
                    className="flex-1 rounded-full bg-[#fb6913] px-6 py-3 text-sm font-bold text-white transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Shop Now
                </button>

                {/* Add To Cart Button */}
                <button
                    onClick={onAddToCart}
                    disabled={!isInStock}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-900 transition-colors hover:bg-slate-50 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
                >
                    <MdShoppingCart className="h-5 w-5" />
                    Add To Cart
                </button>
            </div>
        </div>
    );
}
