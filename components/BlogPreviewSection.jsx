import Image from "next/image";
import Link from "next/link";

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function BlogPreviewSection({ posts = [] }) {
  if (!posts.length) {
    return null;
  }

  const highlightedPosts = posts.slice(0, 3);

  return (
    <section className="space-y-10 mt-16 font-urbanist">
      <div className="flex flex-col gap-3 text-center lg:text-left">
        <div className="inline-flex items-center justify-center gap-2 self-center rounded-full bg-amber-500/10 px-5 py-2 text-sm font-semibold uppercase tracking-wide text-amber-700 dark:bg-amber-400/10 dark:text-amber-300 lg:self-start">
          Insights & Stories
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-zinc-100">
          Stay informed with the Apple Nation blog
        </h2>
        <p className="mx-auto max-w-3xl text-base text-slate-700 dark:text-zinc-400 lg:mx-0">
          Read expert takes, buying guides, and how-tos to make the most of your Apple devices. Updated every week with fresh perspectives.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {highlightedPosts.map((post) => {
          const cover =
            post.image_path || post.thumbnail || post.cover_image || null;
          const targetHref = post.slug ? `/blogs/${post.slug}` : "/blogs";
          const excerpt =
            post.short_description || post.excerpt || post.description || "";
          const dateLabel =
            formatDate(post.published_at || post.created_at || post.updated_at) ||
            "Latest";

          return (
            <article
              key={post.id ?? post.slug}
              className="flex h-full flex-col justify-between gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white/95 shadow-lg shadow-slate-900/5 transition-transform duration-300 hover:-translate-y-1 hover:border-amber-500 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-amber-400"
            >
              <div className="flex flex-col gap-4 p-6">
                {cover ? (
                  <div className="relative h-40 w-full overflow-hidden rounded-xl bg-amber-100/50">
                    <Image
                      src={cover}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                ) : null}
                <div className="space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400">
                    {dateLabel}
                  </span>
                  <Link
                    href={targetHref}
                    className="text-left text-xl font-semibold text-slate-900 transition-colors duration-300 hover:text-amber-600 dark:text-zinc-100 dark:hover:text-amber-400 line-clamp-2"
                  >
                    {post.title}
                  </Link>
                  {excerpt ? (
                    <p className="text-sm leading-relaxed text-slate-700 dark:text-zinc-400 line-clamp-3">
                      {excerpt}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4 text-sm font-semibold text-slate-900 transition-colors duration-300 hover:text-amber-600 dark:border-zinc-800 dark:text-zinc-100 dark:hover:text-amber-400">
                <Link href={targetHref} className="flex items-center gap-2">
                  Read more
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

