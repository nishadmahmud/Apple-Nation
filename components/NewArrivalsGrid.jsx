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
    <section className="space-y-10 mt-16 font-urbanist">
      <div className="flex flex-col gap-3 text-center lg:text-left">
        <div className="inline-flex items-center justify-center gap-2 self-center rounded-full bg-[#fa6915f1] px-5 py-1.5 text-sm font-semibold tracking-wide text-white dark:bg-orange-400/10 dark:text-orange-300 lg:self-start">
          New Arrivals
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-zinc-100">
          Fresh drops curated for your Apple setup
        </h2>
        <p className="mx-auto max-w-2xl text-sm text-slate-600 dark:text-zinc-400 font-poppins lg:mx-0">
          Be the first to experience the latest releases and premium accessories stocked exclusively for Apple Nation BD customers.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
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
              className="group flex flex-col gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-lg shadow-slate-900/5 transition-transform duration-300 hover:-translate-y-1 hover:border-orange-500 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-orange-500/60 relative"
            >

              <span className="absolute left-2 z-40 top-3 rounded-full bg-green-500/15 px-3 py-1 text-xs font-semibold tracking-wide text-gray-600 dark:bg-orange-400/20 dark:text-orange-200">
                  {statusLabel}
                </span>
              <div className="relative h-44 md:h-52 w-full overflow-hidden rounded-xl dark:bg-zinc-800">
                <Image
                  src={imageSrc}
                  alt={item.name}
                  fill
                  className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                  
                />
                
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-slate-900 transition-colors duration-300 group-hover:text-orange-600 dark:text-zinc-100 dark:group-hover:text-orange-400 line-clamp-2 font-poppins">
                  {item.name}
                </h3>
                <div className="flex font-poppins items-center gap-2">
                  <span className="text-base font-semibold text-slate-900 dark:text-zinc-100">
                    {formatCurrency(price)}
                  </span>
                  {price !== original && original ? (
                    <span className="text-sm text-slate-600 line-through dark:text-zinc-500 font-poppins">
                      {formatCurrency(original)}
                    </span>
                  ) : null}
                </div>
              </div>
              <span className="text-xs font-semibold tracking-wide text-slate-700 hover:text-orange-500 dark:text-zinc-500 font-urbanist">
                View details →
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

