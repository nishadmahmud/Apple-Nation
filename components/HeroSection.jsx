import Image from "next/image";
import Link from "next/link";

const featuredHeroImages = [
  {
    src: "/window.svg",
    alt: "Apple Nation gadgets collage",
  },
  {
    src: "/globe.svg",
    alt: "Global delivery illustration",
  },
];

export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden rounded-3xl bg-linear-to-br from-slate-200 via-white to-slate-100 p-8 shadow-lg shadow-slate-900/5 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900">
      <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="flex flex-col gap-6">
          <div className="inline-flex items-center gap-3 rounded-full bg-slate-900/5 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-slate-700 dark:bg-white/10 dark:text-zinc-200">
            Apple Nation BD
            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              Gadget Hub
            </span>
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Discover premium Apple accessories and curated tech essentials.
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-slate-700 dark:text-zinc-300">
            Shop the latest devices, authentic accessories, and unbeatable deals for your everyday tech lifestyle. Fast delivery across Bangladesh with trusted warranty support.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-full bg-sky-600 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-sky-600/30 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-zinc-900"
            >
              Shop Now
            </Link>
            <Link
              href="/collections/best-deals"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-8 py-3 text-base font-semibold text-slate-900 transition-colors duration-300 hover:border-slate-400 hover:bg-slate-200/60 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-zinc-500 dark:hover:bg-zinc-800/60"
            >
              View Best Deals
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 dark:text-zinc-400">
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Genuine Warranty Support
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-sky-500" />
              Next-day Dhaka Delivery
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              24/7 Expert Assistance
            </span>
          </div>
        </div>
        <div className="relative flex items-center justify-center">
          <div className="grid w-full max-w-md gap-6">
            {featuredHeroImages.map((item) => (
              <figure
                key={item.src}
                className="group relative overflow-hidden rounded-2xl bg-white/80 p-6 shadow-xl shadow-slate-900/10 backdrop-blur-sm transition-transform duration-500 hover:-translate-y-1 dark:bg-zinc-900/60"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={420}
                  height={320}
                  className="h-40 w-full object-contain"
                  priority
                />
                <figcaption className="mt-4 text-center text-sm font-medium text-slate-700 dark:text-zinc-300">
                  Elevate your Apple experience with curated gear.
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="absolute -left-20 top-8 hidden h-32 w-32 rounded-full bg-sky-400/20 blur-3xl lg:block" />
          <div className="absolute -right-14 -bottom-8 hidden h-28 w-28 rounded-full bg-emerald-400/20 blur-3xl lg:block" />
        </div>
      </div>
    </section>
  );
}

