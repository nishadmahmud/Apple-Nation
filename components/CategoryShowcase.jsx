import Link from "next/link";

const featuredCategories = [
  {
    id: "official-phone",
    name: "Official iPhone",
    description: "Authorized devices with local warranty coverage.",
  },
  {
    id: "smart-watches",
    name: "Smart Watches",
    description: "Track fitness, manage calls, and stay in style.",
  },
  {
    id: "earbuds",
    name: "EarBuds",
    description: "Immersive audio companions for every playlist.",
  },
  {
    id: "cover-glass",
    name: "Covers & Glass",
    description: "Protective gear tailored for Apple devices.",
  },
  {
    id: "powerbank",
    name: "Powerbank",
    description: "Stay powered wherever you go.",
  },
  {
    id: "charger-cable",
    name: "Chargers & Cables",
    description: "Fast charging essentials and braided cables.",
  },
];

export default function CategoryShowcase() {
  return (
    <section className="space-y-10">
      <div className="flex flex-col gap-4 text-center lg:text-left">
        <div className="inline-flex items-center justify-center gap-2 self-center rounded-full bg-sky-500/10 px-5 py-2 text-sm font-semibold uppercase tracking-wide text-sky-600 dark:bg-sky-400/10 dark:text-sky-300 lg:self-start">
          Shop by Category
        </div>
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Explore Essentials Tailored for Your Apple Ecosystem
          </h2>
          <p className="mx-auto max-w-3xl text-base text-slate-600 dark:text-zinc-400 lg:mx-0">
            Browse curated collections featuring the most-loved Apple Nation BD categories. Each section is optimized for quick discovery and deeper exploration.
          </p>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredCategories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.id}`}
            className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-lg shadow-slate-900/5 transition-transform duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700"
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-zinc-400">
                  Category
                </span>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-zinc-100">
                  {category.name}
                </h3>
              </div>
              <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white transition-colors duration-300 group-hover:bg-sky-600">
                View
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-600 transition-colors duration-300 group-hover:text-slate-700 dark:text-zinc-400 dark:group-hover:text-zinc-300">
              {category.description}
            </p>
            <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-zinc-500">
              Shop now
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </div>
            <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-sky-400/10 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />
          </Link>
        ))}
      </div>
    </section>
  );
}

