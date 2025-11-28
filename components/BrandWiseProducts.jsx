"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdShoppingCart } from "react-icons/md";
import { getBrandProducts } from "../lib/api";
import { useCart } from "./CartContext";
import ProductCard from "./ProductCard";

const formatCurrency = (value) => {
  const amount = Number(value);
  if (Number.isNaN(amount)) return "৳—";
  return `৳${amount.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
};

// Brand tabs configuration
const BRAND_TABS = [
  { id: 0, name: "All" },
  { id: 1682, name: "One Plus" }, // Redmi/OnePlus brand ID from API example
  // Add more brands as needed - these IDs should match your actual brand IDs
  { id: 1, name: "Pixel" },
  { id: 2, name: "Samsung" },
  { id: 3, name: "Xiaomi" },
];

export default function BrandWiseProducts() {
  const [selectedBrand, setSelectedBrand] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addItem, items } = useCart();

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const url = getBrandProducts(selectedBrand, 1);
        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data?.success && data?.data?.data) {
          // Limit to first 12 products for display
          setProducts(data.data.data.slice(0, 12));
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching brand products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [selectedBrand]);

  const calculatePrice = (product) => {
    const retailPrice = product?.retails_price || 0;
    if (product?.discount && product.discount_type === "Percentage") {
      return retailPrice - (retailPrice * product?.discount) / 100;
    } else if (product.discount && product.discount_type !== "Percentage") {
      return retailPrice - product.discount;
    }
    return retailPrice;
  };

  const handleAddToCart = (product) => {
    const price = calculatePrice(product);
    addItem({
      id: product.id,
      name: product.name,
      price: price || 0,
      image: product.image_path || product.image_url || "/globe.svg",
    });
  };

  const isInCart = (productId) => {
    return items.some((it) => String(it.id) === String(productId));
  };

  const isOutOfStock = (product) => {
    return product.current_stock === 0 || product.current_stock === null;
  };

  return (
    <section className="space-y-8 md:mt-24 mt-16">
      {/* Header */}
      <div className="flex flex-col gap-3 text-center lg:text-left">
        <div className="inline-flex items-center justify-center gap-2 self-center rounded-full bg-slate-900/5 border border-slate-900/10 px-5 py-1.5 text-sm font-bold tracking-wide text-slate-700 dark:bg-zinc-100/10 dark:text-zinc-300 dark:border-zinc-100/20 lg:self-start">
          Top Brands
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-urbanist sm:text-4xl dark:text-zinc-100">
          Explore by Brand
        </h2>
      </div>

      {/* Brand Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 border-b border-slate-100 md:pb-6 dark:border-zinc-800 lg:justify-start">
        {BRAND_TABS.map((brand) => (
          <button
            key={brand.id}
            onClick={() => setSelectedBrand(brand.id)}
            className={`rounded-full md:px-6 px-4 py-2.5 text-sm font-bold font-urbanist transition-all duration-300 ${selectedBrand === brand.id
              ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20 dark:bg-white dark:text-black dark:shadow-white/10"
              : "bg-white border border-slate-200 text-slate-600 hover:border-slate-400 hover:text-slate-900 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-200"
              }`}
          >
            {brand.name}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900 dark:border-zinc-700 dark:border-t-zinc-100" />
        </div>
      ) : products.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-lg font-medium text-slate-500 dark:text-zinc-400">No products found for this brand.</p>
        </div>
      ) : (
        <div className="-mx-6 overflow-x-auto px-6 scrollbar-hide pb-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((product) => {
              const imageSrc =
                product.image_path || product.image_url || "/globe.svg";
              const price = calculatePrice(product);
              const original = product.retails_price || 0;
              const hasDiscount = price !== original && original && product.discount;
              const stockOut = isOutOfStock(product);
              const inCart = isInCart(product.id);

              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  hasDiscount={hasDiscount}
                  imageSrc={imageSrc}
                  price={price}
                  stockOut={stockOut}
                  inCart={inCart}
                  original={original}
                  handleAddToCart={handleAddToCart}
                />
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}

