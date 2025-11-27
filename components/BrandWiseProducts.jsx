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
    <section className="space-y-6 md:mt-16 mt-10">
      {/* Header */}
      <div className="flex flex-col gap-3 text-center lg:text-left">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-urbanist sm:text-3xl dark:text-zinc-100">
          Top Brand Products
        </h2>
      </div>

      {/* Brand Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 border-b border-slate-200 md:pb-4 dark:border-zinc-700 lg:justify-start">
        {BRAND_TABS.map((brand) => (
          <button
            key={brand.id}
            onClick={() => setSelectedBrand(brand.id)}
            className={`rounded-full md:px-5 px-3 py-2 text-sm font-semibold font-urbanist transition-colors duration-200 ${
              selectedBrand === brand.id
                ? "bg-[#fb6913] text-white dark:bg-[#fb6913] dark:text-zinc-100"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-zinc-800 dark:text-zinc-300 cursor-pointer dark:hover:bg-zinc-700"
            }`}
          >
            {brand.name}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900 dark:border-zinc-700 dark:border-t-zinc-100" />
        </div>
      ) : products.length === 0 ? (
        <div className="py-12 text-center text-slate-600 dark:text-zinc-400">
          No products found for this brand.
        </div>
      ) : (
        <div className="-mx-6 overflow-x-auto px-6 scrollbar-hide">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pb-4">
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

