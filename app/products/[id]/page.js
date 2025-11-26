import { Suspense } from "react";
import Link from "next/link";
import { fetchProductDetail } from "../../../lib/api";
import LoadingSpinner from "../../../components/LoadingSpinner";
import ProductDetailsWrapper from "../../../components/ProductDetailsWrapper";
import { MdArrowBack } from "react-icons/md";

// Optimize for faster loading with short cache
export const revalidate = 30; // Revalidate every 30 seconds for balance

export async function generateMetadata({ params }) {
  const { id } = await params;
  const fallbackTitle = "Apple Product Details | Apple Nation BD";
  const canonical = `https://www.applenationbd.com/products/${id}`;

  try {
    const response = await fetchProductDetail(id);
    const product = response?.data;

    if (!product) {
      return {
        title: fallbackTitle,
        description: "Discover authentic Apple devices and accessories from Apple Nation BD.",
        alternates: { canonical },
      };
    }

    const title = `${product.name ?? "Apple Product"} Price in Bangladesh | Apple Nation BD`;
    const description =
      product.short_description ||
      product.meta_description ||
      `Buy ${product.name ?? "this Apple product"} with official warranty, installments, and nationwide delivery from Apple Nation BD.`;
    const image =
      (Array.isArray(product.images) && product.images[0]) ||
      (Array.isArray(product.image_paths) && product.image_paths[0]) ||
      "/opengraph-image.png";

    return {
      title,
      description,
      alternates: { canonical },
      openGraph: {
        title,
        description,
        url: canonical,
        type: "website",
        images: [
          {
            url: image,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [image],
      },
    };
  } catch (error) {
    console.error("Metadata generation failed for product", id, error);
    return {
      title: fallbackTitle,
      description: "Discover authentic Apple devices and accessories from Apple Nation BD.",
      alternates: { canonical },
    };
  }
}

// Helper function to format currency
const formatCurrency = (value) => {
  const amount = Number(value);
  if (Number.isNaN(amount)) return "৳—";
  return `৳${amount.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
};

// Helper function to calculate discounted price
const calculateDiscountedPrice = (price, discount, discountType) => {
  if (!discount || discount === 0) return price;
  
  if (discountType === "Percentage") {
    return price - (price * discount / 100);
  } else {
    return price - discount;
  }
};

// Helper function to sanitize HTML (basic)
const sanitizeHTML = (html) => {
  if (!html) return "";
  // Remove HTML entities encoding
  return html
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
};

async function ProductDetailsContent({ productId }) {
  try {
    // Fetch product detail with optimized caching
    const response = await fetchProductDetail(productId);
    
    if (!response?.success || !response?.data) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 text-slate-900 dark:bg-zinc-900 dark:text-zinc-100">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
              Product Not Found
            </h1>
            <p className="mt-2 text-slate-600 dark:text-zinc-400">
              The product you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              href="/products"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600"
            >
              <MdArrowBack className="h-5 w-5" />
              Back to Products
            </Link>
          </div>
        </div>
      );
    }

    const product = response.data;
    const images = product.images && Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : product.image_paths && Array.isArray(product.image_paths) && product.image_paths.length > 0
      ? product.image_paths
      : ["/globe.svg"];
    
    const discount = product.discount || 0;
    const discountType = product.discount_type;
    const hasDiscount = discount > 0;
    
    const description = sanitizeHTML(product.description || "");

    return (
      <div className="min-h-screen pt-5 bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-zinc-900 dark:text-zinc-100">
        <div className="mx-auto w-full md:max-w-10/12 max-w-11/12">
          {/* Back Button */}
          <Link
            href="/products"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            <MdArrowBack className="h-5 w-5" />
            Back to Products
          </Link>

          <ProductDetailsWrapper
            product={product}
            images={images}
            hasDiscount={hasDiscount}
            discount={discount}
            discountType={discountType}
          />

          {/* Description */}
          {description && (
            <div className="mt-12 rounded-xl border border-slate-200 bg-white/95 p-8 dark:border-zinc-700 dark:bg-zinc-800/90">
              <h2 className="mb-6 text-2xl font-semibold text-slate-900 dark:text-zinc-100">
                Product Description
              </h2>
              <div
                className="space-y-4 text-slate-700 dark:text-zinc-300 [&_h1]:mb-4 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-slate-900 [&_h1]:dark:text-zinc-100 [&_h2]:mb-3 [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-slate-900 [&_h2]:dark:text-zinc-100 [&_h3]:mb-2 [&_h3]:mt-4 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-slate-900 [&_h3]:dark:text-zinc-100 [&_p]:mb-3 [&_p]:leading-relaxed [&_ul]:mb-4 [&_ul]:ml-6 [&_ul]:list-disc [&_ul]:space-y-2 [&_li]:mb-1 [&_strong]:font-semibold [&_strong]:text-slate-900 [&_strong]:dark:text-zinc-100"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching product details:", error);
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 text-slate-900 dark:bg-zinc-900 dark:text-zinc-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
            Error Loading Product
          </h1>
          <p className="mt-2 text-slate-600 dark:text-zinc-400">
            Something went wrong while loading the product details.
          </p>
          <Link
            href="/products"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600"
          >
            <MdArrowBack className="h-5 w-5" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-100 text-slate-900 dark:bg-zinc-900 dark:text-zinc-100">
          <div className="flex flex-col items-center gap-4">
            <LoadingSpinner size="lg" />
            <p className="text-lg font-semibold text-slate-700 dark:text-zinc-300">
              Loading product details...
            </p>
          </div>
        </div>
      }
    >
      <ProductDetailsContent productId={id} />
    </Suspense>
  );
}

