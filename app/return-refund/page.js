import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

export const metadata = {
  title: "Return & Refund Policy | Apple Nation BD",
  description:
    "Review Apple Nation BD's 7-day return window, eligibility requirements, and refund timelines for Apple devices and accessories.",
  alternates: {
    canonical: "https://www.applenationbd.com/return-refund",
  },
  openGraph: {
    title: "Apple Nation BD Return & Refund Policy",
    description:
      "Everything you need to know about returns, exchanges, and refunds for purchases from Apple Nation BD.",
    url: "https://www.applenationbd.com/return-refund",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apple Nation BD Return & Refund Policy",
    description:
      "Understand eligibility, timelines, and how to start a return with Apple Nation BD.",
  },
};

export default function ReturnRefundPage() {
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
              Return and Refund Policy
            </h1>
            <p className="text-sm text-slate-600 dark:text-zinc-400">
              Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white/95 p-8 dark:border-zinc-700 dark:bg-zinc-800/90">
            <div className="prose prose-slate max-w-none space-y-6 text-slate-700 dark:prose-invert dark:text-zinc-300">
              <section>
                <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-zinc-100">
                  Return Policy
                </h2>
                <p className="mb-4 leading-relaxed">
                  We want you to be completely satisfied with your purchase. If you are not satisfied with a product you have purchased from Apple Nation BD, you may return it within 7 days of delivery for a full refund or exchange.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-zinc-100">
                  Eligibility for Returns
                </h2>
                <p className="mb-4 leading-relaxed">
                  To be eligible for a return, your item must be:
                </p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>Unused and in the same condition that you received it</li>
                  <li>In the original packaging with all tags and accessories included</li>
                  <li>Accompanied by the original receipt or proof of purchase</li>
                  <li>Returned within 7 days of the delivery date</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-zinc-100">
                  Non-Returnable Items
                </h2>
                <p className="mb-4 leading-relaxed">
                  The following items cannot be returned:
                </p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>Items that have been used, damaged, or altered</li>
                  <li>Items without original packaging or missing accessories</li>
                  <li>Items purchased more than 7 days ago</li>
                  <li>Personalized or custom-made products</li>
                  <li>Software, digital products, or gift cards</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-zinc-100">
                  How to Return an Item
                </h2>
                <p className="mb-4 leading-relaxed">
                  To initiate a return, please follow these steps:
                </p>
                <ol className="ml-6 list-decimal space-y-2">
                  <li>Contact our customer service team to request a return authorization</li>
                  <li>Package the item securely in its original packaging</li>
                  <li>Include the original receipt or proof of purchase</li>
                  <li>Ship the item back to us using a trackable shipping method</li>
                  <li>Wait for confirmation of receipt and processing</li>
                </ol>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-zinc-100">
                  Refund Process
                </h2>
                <p className="mb-4 leading-relaxed">
                  Once we receive and inspect your returned item, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.
                </p>
                <p className="mb-4 leading-relaxed">
                  If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 5-10 business days.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-zinc-100">
                  Refund Amount
                </h2>
                <p className="mb-4 leading-relaxed">
                  You will receive a full refund of the purchase price, excluding shipping costs. Original shipping fees are non-refundable unless the return is due to our error or a defective product.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-zinc-100">
                  Exchanges
                </h2>
                <p className="mb-4 leading-relaxed">
                  If you wish to exchange an item for a different size, color, or model, please contact our customer service team. Exchanges are subject to product availability and must be requested within the 7-day return period.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-zinc-100">
                  Defective Products
                </h2>
                <p className="mb-4 leading-relaxed">
                  If you receive a defective or damaged product, please contact us immediately. We will arrange for a replacement or full refund, and we will cover the return shipping costs.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-zinc-100">
                  Contact Us
                </h2>
                <p className="mb-4 leading-relaxed">
                  For questions about returns or refunds, please contact our customer service team through our support channels. We're here to help!
                </p>
              </section>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

