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

const blogPreviews = [
  {
    id: "blog-101",
    title: "Top 5 Apple Ecosystem Essentials for 2025",
    excerpt: "Streamline your daily workflow with handpicked gadgets that elevate productivity across all Apple devices.",
    date: "Oct 12, 2025",
  },
  {
    id: "blog-102",
    title: "How to Extend Your iPhone Battery Health the Smart Way",
    excerpt: "Practical charging habits, recommended accessories, and maintenance tips straight from Apple-certified experts.",
    date: "Sep 28, 2025",
  },
  {
    id: "blog-103",
    title: "Choosing the Right Apple Watch for Your Lifestyle",
    excerpt: "Compare Ultra, Series, and SE lineups with feature breakdowns to find your ideal wearable.",
    date: "Sep 14, 2025",
  },
];

const trustHighlights = [
  {
    title: "Official Warranty",
    description: "Every flagship device ships with authorized regional warranty and optional AppleCare+ add-ons.",
    icon: "shield",
  },
  {
    title: "Flexible Payments",
    description: "Installment facilities with leading banks and mobile wallets to keep upgrades within reach.",
    icon: "credit-card",
  },
  {
    title: "Expert Guidance",
    description: "Certified specialists ready 24/7 via chat, phone, and in-store appointments.",
    icon: "headset",
  },
  {
    title: "Nationwide Delivery",
    description: "Doorstep delivery in 64 districts with same-day service in Dhaka city.",
    icon: "truck",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-100">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-6 pb-24 pt-16 sm:px-10 lg:px-16 lg:pb-32 lg:pt-24">
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
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
                <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-sky-400/10 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </section>
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
        <section className="space-y-10">
          <div className="flex flex-col gap-3 text-center lg:text-left">
            <div className="inline-flex items-center justify-center gap-2 self-center rounded-full bg-amber-500/10 px-5 py-2 text-sm font-semibold uppercase tracking-wide text-amber-600 dark:bg-amber-400/10 dark:text-amber-300 lg:self-start">
              Insights & Stories
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Stay informed with the Apple Nation blog
            </h2>
            <p className="mx-auto max-w-3xl text-base text-slate-600 dark:text-zinc-400 lg:mx-0">
              Read expert takes, buying guides, and how-tos to make the most of your Apple devices. Updated every week with fresh perspectives.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {blogPreviews.map((post) => (
              <article
                key={post.id}
                className="flex h-full flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-lg shadow-slate-900/5 transition-transform duration-300 hover:-translate-y-1 hover:border-amber-500 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-amber-400"
              >
                <div className="space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400">
                    {post.date}
                  </span>
                  <h3 className="text-xl font-semibold text-slate-900 transition-colors duration-300 hover:text-amber-600 dark:text-zinc-100 dark:hover:text-amber-400">
                    {post.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
                    {post.excerpt}
                  </p>
                </div>
                <Link
                  href="/blogs"
                  className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-slate-900 transition-colors duration-300 hover:text-amber-600 dark:text-zinc-100 dark:hover:text-amber-400"
                >
                  Read more
                  <span aria-hidden>→</span>
                </Link>
              </article>
            ))}
          </div>
        </section>
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
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-500/15 text-sky-600 dark:bg-sky-400/10 dark:text-sky-300">
                  <span className="text-lg font-semibold">
                    {item.icon === "shield" && "🛡️"}
                    {item.icon === "credit-card" && "💳"}
                    {item.icon === "headset" && "🎧"}
                    {item.icon === "truck" && "🚚"}
                  </span>
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
              <h3 className="text-2xl font-semibold">Ready to experience the Apple Nation difference?</h3>
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
      </main>
    </div>
  );
}
