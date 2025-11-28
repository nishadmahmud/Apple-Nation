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
    <section className="space-y-8 font-urbanist md:mt-24 mt-16 md:rounded-3xl bg-white p-6 rounded-2xl shadow-xl shadow-slate-200/50 backdrop-blur-sm dark:bg-zinc-900/70 dark:shadow-black/50 sm:space-y-10 sm:p-8 lg:space-y-12 lg:p-12 border border-slate-100 dark:border-zinc-800">
      <div className="flex flex-col gap-3 text-center lg:text-left">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl dark:text-zinc-100">
          Why shoppers trust Apple Nation BD
        </h2>
        <p className="mx-auto max-w-3xl text-base text-slate-600 dark:text-zinc-400 sm:text-lg lg:mx-0 font-poppins">
          We combine authentic products, expert support, and reliable logistics so you can upgrade with confidence.
        </p>
      </div>
      <div className="grid gap-4 md:gap-6 md:grid-cols-2">
        {trustHighlights.map((item) => (
          <div
            key={item.title}
            className="flex gap-4 md:rounded-2xl rounded-xl border border-slate-100 bg-slate-50/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/50 hover:bg-white hover:border-slate-200 dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:shadow-black/30 dark:hover:bg-zinc-800 dark:hover:border-zinc-700"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sky-500/10 text-2xl text-sky-600 dark:bg-sky-400/10 dark:text-sky-400 sm:h-14 sm:w-14">
              {item.icon}
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-zinc-400 font-poppins">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center justify-between gap-6 md:rounded-2xl rounded-xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-6 py-8 text-center text-white shadow-lg shadow-slate-900/20 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 dark:shadow-black/40 sm:flex-row sm:gap-8 sm:px-10 sm:py-10 sm:text-left">
        <div className="space-y-2">
          <h3 className="text-xl font-bold sm:text-2xl">
            Ready to experience the Apple Nation difference?
          </h3>
          <p className="text-sm text-slate-300 sm:text-base font-poppins">
            Explore our full catalog or connect with a specialist for personalized recommendations.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            Browse catalog
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}

