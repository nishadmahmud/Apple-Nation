import { Suspense } from "react";
import Link from "next/link";
import { fetchProductDetail } from "../../../lib/api";
import LoadingSpinner from "../../../components/LoadingSpinner";
import ProductDetailsWrapper from "../../../components/ProductDetailsWrapper";
import { MdArrowBack } from "react-icons/md";
import ProductDetailsTab from "@/components/ProductDetailsTab";

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
              href="/"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600"
            >
              <MdArrowBack className="h-5 w-5" />
              Back
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
   
    return (
      <div className="min-h-screen pt-5 bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-zinc-900 dark:text-zinc-100">
        <div className="mx-auto w-full md:max-w-10/12 max-w-11/12">
          {/* Back Button */}
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            <MdArrowBack className="h-5 w-5" />
            Back
          </Link>

          <ProductDetailsWrapper
            product={product}
            images={images}
            hasDiscount={hasDiscount}
            discount={discount}
            discountType={discountType}
          />
          
          <ProductDetailsTab product={product}></ProductDetailsTab>



          
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
            href="/"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600"
          >
            <MdArrowBack className="h-5 w-5" />
            Back
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

