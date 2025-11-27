'use client'
import Link from "next/link";
import React, { useEffect, useState } from "react";

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

  // Detect which section is visible (active)
  useEffect(() => {
    const handleScroll = () => {
      const descSection = document.getElementById("desc");
      const specsSection = document.getElementById("specs");

      if (!descSection || !specsSection) return;

      const scrollY = window.scrollY;

      if (scrollY >= specsSection.offsetTop - 150) {
        setActiveTab("specs");
      } else {
        setActiveTab("desc");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="py-5">

      {/* ---------- Tabs ---------- */}

      {
        description && product?.specifications ? ( <div className="sticky top-0 mb-2 z-20 rounded-full
       bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-b border-slate-200 dark:border-zinc-700">
        <div className="flex gap-6 px-10 py-3 font-medium">

          <Link
            href="#desc"
            onClick={() => setActiveTab("desc")}
            className={`border-b-2 font-urbanist transition-all ${
              activeTab === "desc"
                ? "border-orange-500 text-orange-600 font-medium"
                : "border-transparent text-slate-600 dark:text-zinc-400"
            }`}
          >
            Description
          </Link>

          <Link
            href="#specs"
            onClick={() => setActiveTab("specs")}
            className={`pb-2 border-b-2 font-urbanist transition-all ${
              activeTab === "specs"
                ? "border-orange-500 text-orange-600"
                : "border-transparent text-slate-600 dark:text-zinc-400"
            }`}
          >
            Specifications
          </Link>

        </div>
      </div>): ""
      }
     

      {/* ---------- Description Section ---------- */}
      {description && (
        <div
          id="desc"
          className="rounded-xl border border-slate-200 bg-white/95 p-8 dark:border-zinc-700 dark:bg-zinc-800/90"
        >
          <h2 className="mb-6 text-2xl font-urbanist font-semibold text-slate-900 dark:text-zinc-100">
            Product Description
          </h2>

          <div
            className="space-y-4 text-slate-600 dark:text-zinc-300
            [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-slate-600 [&_h1]:dark:text-zinc-100
            [&_h2]:text-xl [&_h2]:font-medium [&_h2]:text-slate-600 [&_h2]:dark:text-zinc-100
            [&_p]:leading-relaxed [&_ul]:ml-6 [&_ul]:list-disc [&_ul]:space-y-2 font-poppins"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      )}

      {/* ---------- Specification Section ---------- */}
      {product.specifications &&
        Array.isArray(product.specifications) &&
        product.specifications.length > 0 && (
          <div
            id="specs"
            className="mt-2 rounded-xl border border-slate-200 bg-white/95 p-6 dark:border-zinc-700 dark:bg-zinc-800/90"
          >
            <h2 className="mb-4 font-urbanist text-xl font-semibold text-slate-900 dark:text-zinc-100">
              Specifications
            </h2>

            <dl className="space-y-3 font-poppins">
              {product.specifications.map((spec, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-1 sm:flex-row sm:gap-4"
                >
                  <dt className="min-w-[120px] text-sm font-medium text-slate-600 dark:text-zinc-400">
                    {spec.name}:
                  </dt>

                  <dd className="flex-1 text-sm text-slate-900 dark:text-zinc-100">
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
