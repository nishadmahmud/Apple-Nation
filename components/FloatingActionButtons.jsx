"use client";

import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { MdCompare } from "react-icons/md";

export default function FloatingActionButtons() {
    return (
        <div className="fixed bottom-24 right-4 z-40 flex flex-col items-end gap-3 lg:bottom-8 lg:right-8">
            {/* Compare Button (Placeholder) */}
            <button
                className="group flex h-12 items-center rounded-full bg-slate-900 text-white shadow-lg shadow-slate-900/20 transition-all hover:pr-4 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
                aria-label="Compare Products"
            >
                <div className="flex h-12 w-12 items-center justify-center rounded-full">
                    <MdCompare className="h-6 w-6" />
                </div>
                <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-bold transition-all duration-200 ease-out group-hover:max-w-xs">
                    Compare Products
                </span>
            </button>

            {/* WhatsApp Button */}
            <Link
                href="https://wa.me/8801859013606"
                target="_blank"
                className="group flex h-12 items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-green-500/30 transition-all hover:pr-4 hover:bg-[#20bd5a]"
                aria-label="Chat on WhatsApp"
            >
                <div className="flex h-12 w-12 items-center justify-center rounded-full">
                    <FaWhatsapp className="h-6 w-6" />
                </div>
                <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-bold transition-all duration-200 ease-out group-hover:max-w-xs">
                    Talk to us
                </span>
            </Link>
        </div>
    );
}
