import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

export const metadata = {
  title: "Privacy Policy | Apple Nation BD",
  description:
    "Understand how Apple Nation BD collects, uses, stores, and protects your personal information when you shop online or in-store.",
  alternates: {
    canonical: "https://www.applenationbd.com/privacy",
  },
  openGraph: {
    title: "Apple Nation BD Privacy Policy",
    description:
      "Our commitment to safeguarding your personal data, purchase history, and communications.",
    url: "https://www.applenationbd.com/privacy",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apple Nation BD Privacy Policy",
    description:
      "Learn how we keep your Apple Nation BD shopping data and communications secure.",
  },
};

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-sm text-slate-600 dark:text-zinc-400">
              Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white/95 p-8 dark:border-zinc-700 dark:bg-zinc-800/90">
            <div className="prose prose-slate max-w-none space-y-6 text-slate-700 dark:prose-invert dark:text-zinc-300">
              <section>
                <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-zinc-100">
                  Introduction
                </h2>
                <p className="mb-4 leading-relaxed">
                  Apple Nation BD ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-zinc-100">
                  Information We Collect
                </h2>
                <p className="mb-4 leading-relaxed">
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>Name, email address, phone number, and shipping address</li>
                  <li>Payment information (processed securely through third-party payment processors)</li>
                  <li>Order history and purchase preferences</li>
                  <li>Account credentials if you create an account</li>
                  <li>Communications with our customer service team</li>
                </ul>
                <p className="mt-4 leading-relaxed">
                  We also automatically collect certain information when you visit our website, such as:
                </p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>IP address and browser type</li>
                  <li>Device information and operating system</li>
                  <li>Pages visited and time spent on pages</li>
                  <li>Referring website addresses</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-zinc-100">
                  How We Use Your Information
                </h2>
                <p className="mb-4 leading-relaxed">
                  We use the information we collect to:
                </p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>Process and fulfill your orders</li>
                  <li>Send you order confirmations and shipping updates</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Improve our website and services</li>
                  <li>Send you promotional communications (with your consent)</li>
                  <li>Detect and prevent fraud or abuse</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-zinc-100">
                  Information Sharing and Disclosure
                </h2>
                <p className="mb-4 leading-relaxed">
                  We do not sell your personal information. We may share your information with:
                </p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>Service providers who assist us in operating our website and conducting our business</li>
                  <li>Payment processors to handle transactions</li>
                  <li>Shipping companies to deliver your orders</li>
                  <li>Legal authorities when required by law or to protect our rights</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-zinc-100">
                  Data Security
                </h2>
                <p className="mb-4 leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-zinc-100">
                  Cookies and Tracking Technologies
                </h2>
                <p className="mb-4 leading-relaxed">
                  We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-zinc-100">
                  Your Rights
                </h2>
                <p className="mb-4 leading-relaxed">
                  You have the right to:
                </p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>Access and receive a copy of your personal data</li>
                  <li>Rectify inaccurate or incomplete information</li>
                  <li>Request deletion of your personal data</li>
                  <li>Object to processing of your personal data</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-zinc-100">
                  Children's Privacy
                </h2>
                <p className="mb-4 leading-relaxed">
                  Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-zinc-100">
                  Changes to This Privacy Policy
                </h2>
                <p className="mb-4 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-zinc-100">
                  Contact Us
                </h2>
                <p className="mb-4 leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us through our support channels.
                </p>
              </section>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

