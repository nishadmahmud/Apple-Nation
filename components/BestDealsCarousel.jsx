import Image from "next/image";
import Link from "next/link";

const formatCurrency = (value) => {
  const amount = Number(value);
  if (Number.isNaN(amount)) return "৳—";
  return `৳${amount.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
};

export default function BestDealsCarousel({ deals = [] }) {
  if (!deals.length) {
    return null;
  }

  return (
    <section className="space-y-8 mt-16">
      <div className="flex flex-col gap-3 text-center lg:text-left">
        <div className="inline-flex items-center justify-center gap-2 self-center rounded-full bg-emerald-500/10 px-5 py-2 text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300 lg:self-start">
          Best Deals
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-zinc-100">
          Limited-time savings you cannot miss
        </h2>
        <p className="mx-auto max-w-2xl text-base text-slate-700 dark:text-zinc-400 lg:mx-0">
          Handpicked offers from our merchandising team. Transparent pricing, original accessories, and remarkable value—updated daily.
        </p>
      </div>
      <div className="-mx-6 overflow-x-auto px-6 scrollbar-hide">
        <div className="flex snap-x snap-mandatory gap-6 pb-4">
          {deals.map((deal) => {
            const imageSrc = deal.image_path || deal.image_url || "/file.svg";
            const discounted = deal.discounted_price ?? deal.retails_price;
            const original = deal.retails_price;
            return (
              <article
                key={deal.id}
                className="group relative flex w-72 shrink-0 snap-start flex-col gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-lg shadow-slate-900/5 transition-transform duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-zinc-700"
              >
                <div className="relative h-40 w-full overflow-hidden rounded-xl bg-slate-100">
                  <Image
                    src={imageSrc}
                    alt={deal.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 16rem, 18rem"
                  />
                  {deal.discount ? (
                    <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white shadow">
                      {deal.discount_type === "Percentage"
                        ? `${deal.discount}% OFF`
                        : `৳${Number(deal.discount || 0).toLocaleString("en-US")}`}
                    </span>
                  ) : null}
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-slate-900 line-clamp-2 dark:text-zinc-100">
                    {deal.name}
                  </h3>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-600 dark:text-zinc-500">
                    {deal.status || "Available"}
                  </p>
                </div>
                <div className="mt-auto flex items-end justify-between">
                  <div className="flex flex-col">
                    <span className="text-2xl font-semibold text-slate-900 dark:text-zinc-100">
                      {formatCurrency(discounted)}
                    </span>
                    {discounted !== original && original ? (
                      <span className="text-sm font-medium text-slate-600 line-through dark:text-zinc-500">
                        {formatCurrency(original)}
                      </span>
                    ) : null}
                  </div>
                  <Link
                    href={`/products/${deal.id}`}
                    className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-sky-400 dark:hover:text-white dark:focus-visible:ring-offset-zinc-900"
                  >
                    View Offer
                  </Link>
                </div>
                <div className="absolute -right-16 top-0 h-24 w-24 rounded-full bg-emerald-500/10 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

