import Link from "next/link";

const bestDeals = [
  {
    id: "81588",
    name: "iPhone 16 Pro Max",
    price: "৳179,999",
    savings: "৳8,000 off",
    highlight: "Pre-order bonus bundle",
  },
  {
    id: "70234",
    name: "Apple Watch Ultra 2",
    price: "৳92,500",
    savings: "৳4,500 off",
    highlight: "Free Ocean Band upgrade",
  },
  {
    id: "62345",
    name: "AirPods Pro (2nd Gen)",
    price: "৳28,999",
    savings: "৳2,000 off",
    highlight: "AppleCare+ add-on 20% off",
  },
  {
    id: "53421",
    name: "MagSafe Powerbank",
    price: "৳9,999",
    savings: "৳1,200 off",
    highlight: "Complimentary fast charger",
  },
];

export default function BestDealsCarousel() {
  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-3 text-center lg:text-left">
        <div className="inline-flex items-center justify-center gap-2 self-center rounded-full bg-emerald-500/10 px-5 py-2 text-sm font-semibold uppercase tracking-wide text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-300 lg:self-start">
          Best Deals
        </div>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Limited-time savings you cannot miss
        </h2>
        <p className="mx-auto max-w-2xl text-base text-slate-600 dark:text-zinc-400 lg:mx-0">
          Handpicked offers from our merchandising team. Transparent pricing, original accessories, and remarkable value—updated daily.
        </p>
      </div>
      <div className="-mx-6 overflow-x-auto px-6">
        <div className="flex min-w-full snap-x snap-mandatory gap-6 pb-4">
          {bestDeals.map((deal) => (
            <article
              key={deal.id}
              className="group relative flex w-72 shrink-0 snap-start flex-col justify-between rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-lg shadow-slate-900/5 transition-transform duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-zinc-700"
            >
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-300">
                  Save more
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-zinc-100">
                  {deal.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-zinc-400">
                  {deal.highlight}
                </p>
              </div>
              <div className="mt-6 flex items-end justify-between">
                <div className="flex flex-col">
                  <span className="text-2xl font-semibold text-slate-900 dark:text-zinc-100">
                    {deal.price}
                  </span>
                  <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    {deal.savings}
                  </span>
                </div>
                <Link
                  href={`/products/${deal.id}`}
                  className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-sky-400 dark:hover:text-white dark:focus-visible:ring-offset-zinc-900"
                >
                  View Offer
                </Link>
              </div>
              <div className="absolute -right-16 top-0 h-24 w-24 rounded-full bg-emerald-500/10 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

