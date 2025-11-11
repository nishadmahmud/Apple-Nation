import Link from "next/link";

const trustHighlights = [
  {
    title: "Official Warranty",
    description:
      "Every flagship device ships with authorized regional warranty and optional AppleCare+ add-ons.",
    icon: "🛡️",
  },
  {
    title: "Flexible Payments",
    description:
      "Installment facilities with leading banks and mobile wallets to keep upgrades within reach.",
    icon: "💳",
  },
  {
    title: "Expert Guidance",
    description:
      "Certified specialists ready 24/7 via chat, phone, and in-store appointments.",
    icon: "🎧",
  },
  {
    title: "Nationwide Delivery",
    description:
      "Doorstep delivery in 64 districts with same-day service in Dhaka city.",
    icon: "🚚",
  },
];

export default function TrustBanner() {
  return (
    <section className="space-y-8 rounded-3xl bg-white/90 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-sm dark:bg-zinc-900/70 sm:space-y-10 sm:p-8 lg:space-y-12 lg:p-10">
      <div className="flex flex-col gap-3 text-center lg:text-left">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl dark:text-zinc-100">
          Why shoppers trust Apple Nation BD
        </h2>
        <p className="mx-auto max-w-3xl text-sm text-slate-600 dark:text-zinc-400 sm:text-base lg:mx-0">
          We combine authentic products, expert support, and reliable logistics so you can upgrade with confidence.
        </p>
      </div>
      <div className="grid gap-4 md:gap-6 md:grid-cols-2">
        {trustHighlights.map((item) => (
          <div
            key={item.title}
            className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/10 dark:border-zinc-800 dark:bg-zinc-950/40 dark:hover:shadow-zinc-900/30 sm:gap-4 sm:p-6"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-500/15 text-lg text-sky-600 dark:bg-sky-400/10 dark:text-sky-300 sm:h-12 sm:w-12 sm:text-xl">
              {item.icon}
            </div>
            <div className="space-y-1 sm:space-y-2">
              <h3 className="text-base font-semibold text-slate-900 dark:text-zinc-100 sm:text-lg">
                {item.title}
              </h3>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-zinc-400 sm:text-sm">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-4 py-6 text-center text-white dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 sm:flex-row sm:gap-6 sm:px-6 sm:py-8 sm:text-left">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold sm:text-2xl">
            Ready to experience the Apple Nation difference?
          </h3>
          <p className="text-xs text-white/70 sm:text-sm">
            Explore our full catalog or connect with a specialist for personalized recommendations.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-slate-900 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 sm:px-6 sm:py-3 sm:text-sm"
          >
            Browse catalog
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-white/40 px-5 py-2.5 text-xs font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 sm:px-6 sm:py-3 sm:text-sm"
          >
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}

