import Image from "next/image";
import Link from "next/link";

const formatCurrency = (value) => {
  const amount = Number(value);
  if (Number.isNaN(amount)) return "৳—";
  return `৳${amount.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
};

export default function NewArrivalsGrid({ items = [] }) {
  if (!items.length) {
    return null;
  }

  return (
    <section className="space-y-10 mt-24 font-urbanist">
      <div className="flex flex-col gap-3 text-center lg:text-left">
        <div className="inline-flex items-center justify-center gap-2 self-center rounded-full bg-orange-500/10 border border-orange-500/20 px-5 py-1.5 text-sm font-bold tracking-wide text-orange-600 dark:bg-orange-400/10 dark:text-orange-400 dark:border-orange-400/20 lg:self-start">
          New Arrivals
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-zinc-100">
          Fresh drops curated for your Apple setup
        </h2>
        <p className="mx-auto max-w-2xl text-sm text-slate-600 dark:text-zinc-400 font-poppins lg:mx-0">
          Be the first to experience the latest releases and premium accessories stocked exclusively for Apple Nation BD customers.
        </p>
      </div>
      <div className="grid gap-6 grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {items.map((item) => {
          const imageSrc =
            item.image_path || item.image_url || item.thumbnail || "/globe.svg";
          const statusLabel = item.status || item.category_name || "Available";
          const price = item.discounted_price ?? item.retails_price;
          const original = item.retails_price;

          return (
            <Link
              key={item.id}
              href={`/products/${item.id}`}
              className="group flex flex-col gap-4 overflow-hidden rounded-3xl border border-slate-100 bg-white p-4 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/10 dark:border-zinc-800 dark:bg-zinc-900/80 dark:shadow-black/50 dark:hover:shadow-orange-500/5 relative"
            >

              <div className="absolute left-0 top-3 z-20 rounded-r-full bg-orange-500/10 backdrop-blur-sm px-3 py-1 text-[10px] font-bold text-orange-600 shadow-sm tracking-wide border border-orange-500/20 dark:bg-orange-400/10 dark:text-orange-400">
                {statusLabel}
              </div>
              <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-slate-50 dark:bg-zinc-800/50">
                <Image
                  src={imageSrc}
                  alt={item.name}
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-110"

                />

              </div>
              <div className="space-y-2 px-1">
                <h3 className="text-sm font-bold text-slate-900 transition-colors duration-300 group-hover:text-orange-600 dark:text-zinc-100 dark:group-hover:text-orange-400 line-clamp-2 font-urbanist">
                  {item.name}
                </h3>
                <div className="flex font-urbanist items-end gap-2">
                  <span className="text-lg font-bold text-slate-900 dark:text-zinc-100">
                    {formatCurrency(price)}
                  </span>
                  {price !== original && original ? (
                    <span className="text-xs font-semibold text-slate-400 line-through dark:text-zinc-500 mb-1">
                      {formatCurrency(original)}
                    </span>
                  ) : null}
                </div>
              </div>
              <span className="mt-auto text-xs font-bold tracking-wide text-slate-500 hover:text-orange-600 dark:text-zinc-500 font-urbanist flex items-center gap-1 transition-colors">
                View details <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
