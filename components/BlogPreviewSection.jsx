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
    <section className="space-y-10 mt-24 font-urbanist">
      <div className="flex flex-col gap-3 text-center lg:text-left">
        <div className="inline-flex items-center justify-center gap-2 self-center rounded-full bg-amber-500/10 border border-amber-500/20 px-5 py-2 text-sm font-bold uppercase tracking-wide text-amber-600 dark:bg-amber-400/10 dark:text-amber-400 dark:border-amber-400/20 lg:self-start">
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
              className="group flex h-full flex-col justify-between gap-4 overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg shadow-slate-200/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/10 dark:border-zinc-800 dark:bg-zinc-900/80 dark:shadow-black/50 dark:hover:shadow-amber-500/5"
            >
              <div className="flex flex-col gap-4 p-6">
                {cover ? (
                  <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-amber-50 dark:bg-zinc-800/50">
                    <Image
                      src={cover}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                ) : null}
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wide text-amber-600 dark:text-amber-400">
                    {dateLabel}
                  </span>
                  <Link
                    href={targetHref}
                    className="block"
                  >
                    <h3 className="text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-amber-600 dark:text-zinc-100 dark:group-hover:text-amber-400 line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>
                  {excerpt ? (
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-zinc-400 line-clamp-3 font-poppins">
                      {excerpt}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4 text-sm font-bold text-slate-900 transition-colors duration-300 hover:text-amber-600 dark:border-zinc-800 dark:text-zinc-100 dark:hover:text-amber-400">
                <Link href={targetHref} className="flex items-center gap-2 group/link">
                  Read more
                  <span aria-hidden className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

