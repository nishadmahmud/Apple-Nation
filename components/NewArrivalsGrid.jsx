import Link from "next/link";

const newArrivals = [
  {
    id: "91123",
    name: "iPad Air M3",
    price: "৳84,999",
    status: "Just landed",
  },
  {
    id: "81124",
    name: "Beats Solo Buds",
    price: "৳18,499",
    status: "Fresh stock",
  },
  {
    id: "71125",
    name: "HomePod mini 2",
    price: "৳15,999",
    status: "New colorways",
  },
  {
    id: "61126",
    name: "Belkin 3-in-1 Charger",
    price: "৳12,999",
    status: "Editor’s pick",
  },
];

export default function NewArrivalsGrid() {
  return (
    <section className="space-y-10">
      <div className="flex flex-col gap-3 text-center lg:text-left">
        <div className="inline-flex items-center justify-center gap-2 self-center rounded-full bg-sky-500/10 px-5 py-2 text-sm font-semibold uppercase tracking-wide text-sky-600 dark:bg-sky-400/10 dark:text-sky-300 lg:self-start">
          New Arrivals
        </div>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Fresh drops curated for your Apple setup
        </h2>
        <p className="mx-auto max-w-2xl text-base text-slate-600 dark:text-zinc-400 lg:mx-0">
          Be the first to experience the latest releases and premium accessories stocked exclusively for Apple Nation BD customers.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {newArrivals.map((item) => (
          <Link
            key={item.id}
            href={`/products/${item.id}`}
            className="group flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-lg shadow-slate-900/5 transition-transform duration-300 hover:-translate-y-1 hover:border-sky-500 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-sky-500/60"
          >
            <span className="w-fit rounded-full bg-sky-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-300">
              {item.status}
            </span>
            <h3 className="text-lg font-semibold text-slate-900 transition-colors duration-300 group-hover:text-sky-600 dark:text-zinc-100 dark:group-hover:text-sky-400">
              {item.name}
            </h3>
            <span className="text-base font-medium text-slate-700 dark:text-zinc-300">
              {item.price}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-zinc-500">
              View details →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

