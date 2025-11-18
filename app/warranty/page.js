import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

export const metadata = {
  title: "Warranty Policy | Apple Nation BD",
  description:
    "Get clarity on Apple Nation BD warranty coverage, service process, and documentation required for Apple devices and accessories.",
  alternates: {
    canonical: "https://www.applenationbd.com/warranty",
  },
  openGraph: {
    title: "Apple Nation BD Warranty Policy",
    description:
      "Learn what’s covered, what isn’t, and how to file a warranty claim for your Apple Nation BD purchase.",
    url: "https://www.applenationbd.com/warranty",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apple Nation BD Warranty Policy",
    description:
      "Warranty coverage details and claim steps for Apple Nation BD customers.",
  },
};

export default function WarrantyPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-zinc-900 dark:text-zinc-100">
      <div className="mx-auto w-full max-w-4xl px-6 py-8 sm:px-10 lg:px-16">
        {/* Back Button */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          <MdArrowBack className="h-5 w-5" />
          Back to Home
        </Link>

        {/* Content */}
        <article className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
              Warranty Policy
            </h1>
            <p className="text-sm text-slate-600 dark:text-zinc-400">
              Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white/95 p-8 dark:border-zinc-700 dark:bg-zinc-800/90">
            <div className="prose prose-slate max-w-none space-y-6 text-slate-700 dark:prose-invert dark:text-zinc-300">
              <section>
                <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-zinc-100">
                  Warranty Coverage
                </h2>
                <p className="mb-4 leading-relaxed">
                  All products sold by Apple Nation BD come with manufacturer warranty as specified by the brand. We ensure that all products are genuine and come with official warranty support. Warranty terms vary by product and manufacturer.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-zinc-100">
                  Warranty Period
                </h2>
                <p className="mb-4 leading-relaxed">
                  Warranty periods depend on the product type and manufacturer:
                </p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>Apple products: Typically 1 year from date of purchase (Apple Limited Warranty)</li>
                  <li>Accessories: Varies by manufacturer, typically 3-12 months</li>
                  <li>Extended warranties: Available for select products (terms apply)</li>
                </ul>
                <p className="mt-4 leading-relaxed">
                  Please check your product documentation or contact us for specific warranty information for your purchase.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-zinc-100">
                  What's Covered
                </h2>
                <p className="mb-4 leading-relaxed">
                  Warranty typically covers:
                </p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>Manufacturing defects</li>
                  <li>Hardware malfunctions under normal use</li>
                  <li>Battery issues (within warranty period)</li>
                  <li>Display defects</li>
                  <li>Component failures</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-zinc-100">
                  What's Not Covered
                </h2>
                <p className="mb-4 leading-relaxed">
                  Warranty does not cover:
                </p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>Physical damage from accidents, drops, or misuse</li>
                  <li>Water damage or liquid contact</li>
                  <li>Unauthorized repairs or modifications</li>
                  <li>Normal wear and tear</li>
                  <li>Cosmetic damage that doesn't affect functionality</li>
                  <li>Damage from using non-original accessories</li>
                  <li>Software issues (unless hardware-related)</li>
                  <li>Loss or theft</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-zinc-100">
                  Warranty Claim Process
                </h2>
                <p className="mb-4 leading-relaxed">
                  To file a warranty claim:
                </p>
                <ol className="ml-6 list-decimal space-y-2">
                  <li>Contact our customer service team with your order number and product details</li>
                  <li>Describe the issue you're experiencing</li>
                  <li>Provide photos or videos if requested</li>
                  <li>We will assess your claim and guide you through the warranty process</li>
                  <li>If approved, we will arrange for repair, replacement, or refund as per warranty terms</li>
                </ol>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-zinc-100">
                  Required Documentation
                </h2>
                <p className="mb-4 leading-relaxed">
                  When filing a warranty claim, please have ready:
                </p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>Original purchase receipt or invoice</li>
                  <li>Product serial number or IMEI</li>
                  <li>Product packaging (if available)</li>
                  <li>Warranty card (if provided)</li>
                  <li>Photos or videos showing the defect</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-zinc-100">
                  Warranty Service Options
                </h2>
                <p className="mb-4 leading-relaxed">
                  Depending on the product and issue, warranty service may include:
                </p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>Repair by authorized service center</li>
                  <li>Replacement with a new or refurbished unit</li>
                  <li>Refund (if repair/replacement is not possible)</li>
                </ul>
                <p className="mt-4 leading-relaxed">
                  The specific service option will be determined based on the warranty terms and the nature of the issue.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-zinc-100">
                  International Warranty
                </h2>
                <p className="mb-4 leading-relaxed">
                  Some products may have international warranty coverage. Please check with us or the manufacturer to confirm if your product is eligible for warranty service outside of Bangladesh.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-zinc-100">
                  Extended Warranty
                </h2>
                <p className="mb-4 leading-relaxed">
                  We offer extended warranty options for select products. Extended warranty provides additional coverage beyond the standard manufacturer warranty. Terms and conditions apply. Please contact us for more information about extended warranty options.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-zinc-100">
                  Contact Us
                </h2>
                <p className="mb-4 leading-relaxed">
                  For warranty inquiries or to file a warranty claim, please contact our customer service team through our support channels. We're committed to ensuring you receive proper warranty support for your purchase.
                </p>
              </section>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

