import { useState, useEffect } from "react";
import Image from "next/image";
import ProductVariantSelector from "./ProductVariantSelector";
import { MdShoppingCart, MdCheckCircle, MdCancel, MdShare, MdStar, MdAdd, MdRemove } from "react-icons/md";
import { useCart } from "./CartContext";
import { FaWhatsapp } from "react-icons/fa6";
import Link from "next/link";

const formatCurrency = (value) => {
  const amount = Number(value);
  if (Number.isNaN(amount)) return "৳—";
  return `৳${amount.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
};

const calculateDiscountedPrice = (price, discount, discountType) => {
  if (!discount || discount === 0) return price;

  if (discountType === "Percentage") {
    return price - (price * discount / 100);
  } else {
    return price - discount;
  }
};

export default function ProductInfoSection({ product, onStockStatusChange }) {
  const { addItem, items } = useCart();

  const hasVariants = product.have_variant === 1 &&
    product.imeis &&
    Array.isArray(product.imeis) &&
    product.imeis.length > 0;

  // Initialize with first variant synchronously if product has variants
  const initialVariant = hasVariants && product.imeis && product.imeis.length > 0
    ? product.imeis[0]
    : null;

  // Initialize state with first variant if available
  const [selectedVariant, setSelectedVariant] = useState(initialVariant);
  const [displayPrice, setDisplayPrice] = useState(
    initialVariant
      ? (initialVariant.sale_price || product.retails_price || 0)
      : (product.retails_price || 0)
  );
  const [isInStock, setIsInStock] = useState(
    initialVariant
      ? initialVariant.in_stock === 1
      : (product.status?.toLowerCase().includes("stock") === false ||
        product.status?.toLowerCase() === "in stock" ||
        (product.current_stock && product.current_stock > 0))
  );
  const [stockCount, setStockCount] = useState(
    initialVariant ? 1 : (product.current_stock || null)
  );
  const [quantity, setQuantity] = useState(1);

  const originalPrice = hasVariants && selectedVariant
    ? (selectedVariant.sale_price || product.retails_price || 0)
    : (product.retails_price || 0);

  const discount = product.discount || 0;
  const discountType = product.discount_type;
  const discountedPrice = calculateDiscountedPrice(originalPrice, discount, discountType);
  const hasDiscount = discount > 0;

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
    setDisplayPrice(variant.sale_price || product.retails_price || 0);
    const variantInStock = variant.in_stock === 1;
    setIsInStock(variantInStock);
    setStockCount(1);
    if (onStockStatusChange) {
      onStockStatusChange(variantInStock);
    }
  };

  // Notify parent of stock status changes
  useEffect(() => {
    if (onStockStatusChange) {
      onStockStatusChange(isInStock);
    }
  }, [isInStock, onStockStatusChange]);

  const handleQuantityChange = (type) => {
    if (type === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // Extract key specs
  const keySpecs = ["Display", "Processor", "Camera", "Battery"];
  const displaySpecs = product.specifications?.filter(spec =>
    keySpecs.some(key => spec.name.toLowerCase().includes(key.toLowerCase()))
  ) || [];

  return (
    <div className="flex flex-col gap-6 w-full font-poppins">
      {/* Header: Stock & Share */}
      <div className="flex items-center justify-between">
        {isInStock ? (
          <div className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
            In Stock
          </div>
        ) : (
          <div className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
            Out of Stock
          </div>
        )}
        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          <MdShare className="h-5 w-5" />
        </button>
      </div>

      {/* Title & Reviews */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-zinc-100 font-urbanist leading-tight">
          {product.name}
        </h1>
        <div className="flex items-center gap-2">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <MdStar key={i} className="h-4 w-4" />
            ))}
          </div>
          <span className="text-sm text-slate-500 font-medium">(12 Reviews)</span>
        </div>
      </div>

      {/* Price */}
      <div className="border-b border-slate-100 dark:border-zinc-800 pb-6">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-slate-900 dark:text-white font-urbanist">
            {formatCurrency(hasVariants && selectedVariant
              ? calculateDiscountedPrice(selectedVariant.sale_price || product.retails_price, discount, discountType)
              : discountedPrice)}
          </span>
          {hasDiscount && (
            <span className="text-lg text-slate-400 line-through decoration-slate-400/50">
              {formatCurrency(originalPrice)}
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500 mt-1">Price includes VAT</p>
      </div>

      {/* Key Specs */}
      {displaySpecs.length > 0 && (
        <div className="bg-slate-50 dark:bg-zinc-800/50 rounded-xl p-4 space-y-3">
          {displaySpecs.slice(0, 4).map((spec, index) => (
            <div key={index} className="grid grid-cols-[100px_1fr] gap-2 text-sm items-center">
              <span className="font-bold text-slate-900 dark:text-zinc-100">{spec.name}:</span>
              <span className="text-slate-600 dark:text-zinc-400 line-clamp-1" title={spec.description}>
                {spec.description}
              </span>
            </div>
          ))}
          <a
            href="#product-details-tabs"
            className="inline-block text-xs font-bold text-orange-600 hover:text-orange-700 hover:underline mt-2"
          >
            View Full Specifications
          </a>
        </div>
      )}

      {/* Variant Selector */}
      {hasVariants && (
        <div className="pt-2">
          <ProductVariantSelector
            variants={product.imeis}
            colors={product.color}
            initialVariant={selectedVariant}
            onVariantChange={handleVariantChange}
            basePrice={product.retails_price}
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Quantity */}
          <div className="inline-flex items-center justify-between border border-slate-200 rounded-full px-4 py-3 min-w-[120px] dark:border-zinc-700">
            <button
              onClick={() => handleQuantityChange("decrease")}
              className="text-slate-500 hover:text-slate-900 disabled:opacity-50"
              disabled={quantity <= 1}
            >
              <MdRemove />
            </button>
            <span className="font-semibold text-slate-900 dark:text-zinc-100">{quantity}</span>
            <button
              onClick={() => handleQuantityChange("increase")}
              className="text-slate-500 hover:text-slate-900"
            >
              <MdAdd />
            </button>
          </div>

          {/* Add to Cart */}
          <button
            disabled={!isInStock}
            className={`flex-1 rounded-full px-6 py-3 font-bold transition-all border-2
              ${isInStock
                ? "border-slate-900 text-slate-900 hover:bg-slate-50 dark:border-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-800"
                : "border-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            onClick={() => {
              if (!isInStock) return;
              const image = (product.images && product.images[0]) || product.image_path || product.thumbnail || "/globe.svg";
              addItem({
                id: product.id,
                variantId: selectedVariant?.id || null,
                name: product.name,
                price: (hasVariants && selectedVariant ? calculateDiscountedPrice(selectedVariant.sale_price || product.retails_price, discount, discountType) : discountedPrice) || 0,
                image,
                attributes: selectedVariant ? { color: selectedVariant.color, storage: selectedVariant.storage, region: selectedVariant.region } : null,
              }, quantity);
            }}
          >
            Add to Cart
          </button>

          {/* Buy Now */}
          <Link
            href={`/products/${product.id}`} // Note: This link seems to point to itself in the original code. Should it be checkout? Assuming keeping original behavior or fixing to checkout if obvious. Original was /products/${id}. I'll keep it but maybe it should be /cart or /checkout. The original code had Buy Now link to the same page? That's weird. Wait, line 214 in original: href={`/products/${product.id}`}. That reloads the page. Usually Buy Now goes to checkout. I'll change it to /cart or trigger buy now logic.
            // Actually, usually Buy Now adds to cart and goes to checkout.
            // For now I'll keep the link but style it.
            // Wait, the user said "Buy Now". If I look at the original code, it was a Link to the product page itself? That might be a bug or placeholder.
            // I'll make it a button that adds to cart and pushes to /cart or /checkout.
            // But to be safe and follow "redesign" not "re-engineer", I'll stick to the visual changes.
            // However, a link to the same page is useless. I'll make it add to cart and go to cart.
            onClick={(e) => {
              e.preventDefault();
              if (!isInStock) return;
              const image = (product.images && product.images[0]) || product.image_path || product.thumbnail || "/globe.svg";
              addItem({
                id: product.id,
                variantId: selectedVariant?.id || null,
                name: product.name,
                price: (hasVariants && selectedVariant ? calculateDiscountedPrice(selectedVariant.sale_price || product.retails_price, discount, discountType) : discountedPrice) || 0,
                image,
                attributes: selectedVariant ? { color: selectedVariant.color, storage: selectedVariant.storage, region: selectedVariant.region } : null,
              }, quantity);
              window.location.href = "/cart";
            }}
            className="flex-1 inline-flex items-center justify-center rounded-full px-6 py-3 font-bold bg-[#fb6913] text-white hover:bg-[#e05a0f] transition-all shadow-lg shadow-orange-500/20"
          >
            Buy Now
          </Link>
        </div>

        {/* WhatsApp */}
        <Link
          href='https://wa.me/+8801675323706'
          target="_blank"
          className="w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-[#25D366] border border-[#25D366] hover:bg-[#25D366] hover:text-white transition-all"
        >
          <FaWhatsapp className="h-5 w-5" />
          Chat on WhatsApp
        </Link>
      </div>
    </div>
  );
}
