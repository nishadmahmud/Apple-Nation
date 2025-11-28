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
    <section className="space-y-8 mt-24">
      <div className="flex flex-col gap-3 text-center lg:text-left">
        <div className="inline-flex items-center justify-center gap-2 self-center rounded-full bg-orange-500/10 border border-orange-500/20 px-5 py-2 text-sm font-bold uppercase tracking-wide text-orange-600 dark:bg-orange-400/10 dark:text-orange-400 dark:border-orange-400/20 lg:self-start">
          Best Deals
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-zinc-100 font-urbanist">
          Limited-time savings you cannot miss
        </h2>
        <p className="mx-auto max-w-2xl text-base text-slate-700 dark:text-zinc-400 lg:mx-0 font-poppins">
          Handpicked offers from our merchandising team. Transparent pricing, original accessories, and remarkable value—updated daily.
        </p>
      </div>
      <div className="-mx-6 overflow-x-auto px-6 scrollbar-hide pb-8">
        <div className="flex snap-x snap-mandatory gap-6">
          {deals.map((deal) => {
            const imageSrc = deal.image_path || deal.image_url || "/file.svg";
            const discounted = deal.discounted_price ?? deal.retails_price;
            const original = deal.retails_price;
            return (
              <article
                key={deal.id}
                className="group relative flex w-72 shrink-0 snap-start flex-col gap-4 overflow-hidden rounded-3xl border border-slate-100 bg-white p-4 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/10 dark:border-zinc-800 dark:bg-zinc-900/80 dark:shadow-black/50 dark:hover:shadow-orange-500/5"
              >
                <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-slate-50 dark:bg-zinc-800/50">
                  <Image
                    src={imageSrc}
                    alt={deal.name}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 16rem, 18rem"
                  />
                  {deal.discount ? (
                    <div className="absolute left-0 top-4 rounded-r-full bg-orange-500 px-4 py-1.5 text-xs font-bold text-white shadow-lg shadow-orange-500/30">
                      {deal.discount_type === "Percentage"
                        ? `${deal.discount}% OFF`
                        : `৳${Number(deal.discount || 0).toLocaleString("en-US")} OFF`}
                    </div>
                  ) : null}
                </div>
                <div className="space-y-3 px-2">
                  <h3 className="text-lg font-bold text-slate-900 line-clamp-2 dark:text-zinc-100 group-hover:text-orange-600 transition-colors font-urbanist">
                    {deal.name}
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-500 font-poppins">
                    {deal.status || "Available"}
                  </p>
                </div>
                <div className="mt-auto flex items-end justify-between px-2 pb-2">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-slate-900 dark:text-zinc-100 font-urbanist">
                      {formatCurrency(discounted)}
                    </span>
                    {discounted !== original && original ? (
                      <span className="text-sm font-medium text-slate-400 line-through dark:text-zinc-500 font-poppins">
                        {formatCurrency(original)}
                      </span>
                    ) : null}
                  </div>
                  <Link
                    href={`/products/${deal.id}`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white transition-all duration-300 hover:bg-orange-600 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-orange-500 dark:hover:text-white"
                    aria-label="View Offer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

