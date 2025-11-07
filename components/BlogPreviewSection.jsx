import Link from "next/link";

const blogPreviews = [
  {
    id: "blog-101",
    title: "Top 5 Apple Ecosystem Essentials for 2025",
    excerpt:
      "Streamline your daily workflow with handpicked gadgets that elevate productivity across all Apple devices.",
    date: "Oct 12, 2025",
  },
  {
    id: "blog-102",
    title: "How to Extend Your iPhone Battery Health the Smart Way",
    excerpt:
      "Practical charging habits, recommended accessories, and maintenance tips straight from Apple-certified experts.",
    date: "Sep 28, 2025",
  },
  {
    id: "blog-103",
    title: "Choosing the Right Apple Watch for Your Lifestyle",
    excerpt:
      "Compare Ultra, Series, and SE lineups with feature breakdowns to find your ideal wearable.",
    date: "Sep 14, 2025",
  },
];

export default function BlogPreviewSection() {
  return (
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
  );
}

