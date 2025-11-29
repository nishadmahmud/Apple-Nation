"use client";

import { MdAdd } from "react-icons/md";

export default function Compare() {
    return (
        <div className="min-h-screen bg-slate-50 pb-20 pt-10 dark:bg-zinc-900">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-zinc-100 sm:text-4xl font-urbanist">
                        Compare Products
                    </h1>
                    <p className="mt-4 text-lg text-slate-600 dark:text-zinc-400">
                        Add products to compare their features and specs.
                    </p>
                </div>

                {/* Add Product Slots */}
                <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
                    {/* Slot 1 */}
                    <div className="flex flex-col items-center justify-center gap-6 rounded-2xl border-2 border-dashed border-slate-300 bg-white p-12 text-center transition-all hover:border-slate-400 hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-900/50 dark:hover:border-zinc-600 dark:hover:bg-zinc-800">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 dark:bg-zinc-800">
                            <MdAdd className="h-10 w-10 text-slate-400 dark:text-zinc-500" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-zinc-100">Add Product 1</h3>
                            <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400">Select a product to compare</p>
                        </div>
                        <button className="rounded-full bg-slate-900 px-8 py-3 text-sm font-bold text-white transition-transform hover:scale-105 hover:bg-slate-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
                            Add Product
                        </button>
                    </div>

                    {/* Slot 2 */}
                    <div className="flex flex-col items-center justify-center gap-6 rounded-2xl border-2 border-dashed border-slate-300 bg-white p-12 text-center transition-all hover:border-slate-400 hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-900/50 dark:hover:border-zinc-600 dark:hover:bg-zinc-800">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 dark:bg-zinc-800">
                            <MdAdd className="h-10 w-10 text-slate-400 dark:text-zinc-500" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-zinc-100">Add Product 2</h3>
                            <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400">Select a product to compare</p>
                        </div>
                        <button className="rounded-full bg-slate-900 px-8 py-3 text-sm font-bold text-white transition-transform hover:scale-105 hover:bg-slate-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
                            Add Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}