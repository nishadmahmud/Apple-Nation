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
    <section className="space-y-12 rounded-3xl bg-white/90 p-10 shadow-xl shadow-slate-900/5 backdrop-blur-sm dark:bg-zinc-900/70">
      <div className="flex flex-col gap-3 text-center lg:text-left">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Why shoppers trust Apple Nation BD
        </h2>
        <p className="mx-auto max-w-3xl text-base text-slate-600 dark:text-zinc-400 lg:mx-0">
          We combine authentic products, expert support, and reliable logistics so you can upgrade with confidence.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {trustHighlights.map((item) => (
          <div
            key={item.title}
            className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/10 dark:border-zinc-800 dark:bg-zinc-950/40 dark:hover:shadow-zinc-900/30"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-500/15 text-xl text-sky-600 dark:bg-sky-400/10 dark:text-sky-300">
              {item.icon}
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-zinc-100">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 px-6 py-8 text-center text-white sm:flex-row sm:text-left">
        <div className="space-y-1">
          <h3 className="text-2xl font-semibold">
            Ready to experience the Apple Nation difference?
          </h3>
          <p className="text-sm text-white/70">
            Explore our full catalog or connect with a specialist for personalized recommendations.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            Browse catalog
          </Link>
          <Link
            href="/support"
            className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            Talk to expert
          </Link>
        </div>
      </div>
    </section>
  );
}

