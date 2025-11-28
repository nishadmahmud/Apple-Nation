"use client";
import React, { useState } from "react";

const ProductDetailsTab = ({ product }) => {
  const [activeTab, setActiveTab] = useState("desc");

  // Helper function to sanitize HTML (basic)
  const sanitizeHTML = (html) => {
    if (!html) return "";
    return html
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
  };

  const description = sanitizeHTML(product.description || "");

  return (
    <div className="py-5">

      {/* ---------- Tabs ---------- */}
      {description && product?.specifications ? (
        <div className="mb-6 rounded-full bg-slate-100 dark:bg-zinc-800/50 p-1 inline-flex">
          <div className="flex font-medium">
            <button
              onClick={() => setActiveTab("desc")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === "desc"
                  ? "bg-white text-slate-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-100"
                  : "text-slate-500 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                }`}
            >
              Description
            </button>

            <button
              onClick={() => setActiveTab("specs")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === "specs"
                  ? "bg-white text-slate-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-100"
                  : "text-slate-500 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                }`}
            >
              Specifications
            </button>
          </div>
        </div>
      ) : null}

      {/* ---------- Description Section ---------- */}
      {activeTab === "desc" && description && (
        <div className="rounded-xl border border-slate-200 bg-white/95 p-8 dark:border-zinc-700 dark:bg-zinc-800/90 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <h2 className="mb-6 text-2xl font-urbanist font-semibold text-slate-900 dark:text-zinc-100">
            Product Description
          </h2>

          <div
            className="space-y-4 text-slate-600 dark:text-zinc-300 font-poppins
            [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-slate-900 [&_h1]:dark:text-zinc-100 [&_h1]:mt-6 [&_h1]:mb-3
            [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-slate-900 [&_h2]:dark:text-zinc-100 [&_h2]:mt-5 [&_h2]:mb-2
            [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-slate-800 [&_h3]:dark:text-zinc-200 [&_h3]:mt-4 [&_h3]:mb-2
            [&_p]:leading-relaxed [&_p]:mb-4
            [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:mb-4
            [&_ol]:ml-5 [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:mb-4
            [&_li]:pl-1
            [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-xl [&_img]:my-6 [&_img]:shadow-sm
            [&_strong]:font-semibold [&_strong]:text-slate-900 [&_strong]:dark:text-zinc-100
            [&_blockquote]:border-l-4 [&_blockquote]:border-orange-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      )}

      {/* ---------- Specification Section ---------- */}
      {activeTab === "specs" &&
        product.specifications &&
        Array.isArray(product.specifications) &&
        product.specifications.length > 0 && (
          <div className="mt-2 rounded-xl border border-slate-200 bg-white/95 p-6 dark:border-zinc-700 dark:bg-zinc-800/90 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="mb-4 font-urbanist text-xl font-semibold text-slate-900 dark:text-zinc-100">
              Specifications
            </h2>

            <dl className="space-y-3 font-poppins">
              {product.specifications.map((spec, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-1 sm:flex-row sm:gap-4 border-b border-slate-100 dark:border-zinc-800/50 last:border-0 pb-3 last:pb-0"
                >
                  <dt className="min-w-[140px] text-sm font-medium text-slate-500 dark:text-zinc-400">
                    {spec.name}
                  </dt>

                  <dd className="flex-1 text-sm font-medium text-slate-900 dark:text-zinc-100">
                    {spec.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}
    </div>
  );
};

export default ProductDetailsTab;
