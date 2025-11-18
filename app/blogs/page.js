import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchBlogs } from "../../lib/api";
import LoadingSpinner from "../../components/LoadingSpinner";
import { MdArrowBack, MdCalendarToday } from "react-icons/md";

export const metadata = {
  title: "Apple Nation Blog | Guides, Tips & Tech Stories",
  description:
    "Read buying guides, tips, and news about Apple devices, wearables, and premium accessories from the Apple Nation BD team.",
  alternates: {
    canonical: "https://www.applenationbd.com/blogs",
  },
  openGraph: {
    title: "Apple Nation Blog",
    description:
      "Insights, buying guides, and stories to help you get more from your Apple gear.",
    url: "https://www.applenationbd.com/blogs",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apple Nation Blog",
    description:
      "Guides and stories about iPhone, Mac, Apple Watch, and more from Apple Nation BD.",
  },
};

export const revalidate = 600; // Revalidate every 10 minutes

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

async function BlogsContent() {
  try {
    const response = await fetchBlogs();
    
    if (!response?.success || !Array.isArray(response?.data)) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 text-slate-900 dark:bg-zinc-900 dark:text-zinc-100">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
              No Blogs Found
            </h1>
            <p className="mt-2 text-slate-600 dark:text-zinc-400">
              There are no blog posts available at the moment.
            </p>
            <Link
              href="/"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600"
            >
              <MdArrowBack className="h-5 w-5" />
              Back to Home
            </Link>
          </div>
        </div>
      );
    }

    const blogs = response.data;

    return (
      <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-zinc-900 dark:text-zinc-100">
        <div className="mx-auto w-full max-w-7xl px-6 py-8 sm:px-10 lg:px-16">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-500/10 px-5 py-2 text-sm font-semibold uppercase tracking-wide text-amber-600 dark:bg-amber-400/10 dark:text-amber-300">
              Insights & Stories
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-zinc-100">
              Apple Nation Blog
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 dark:text-zinc-400">
              Read expert takes, buying guides, and how-tos to make the most of your Apple devices.
            </p>
          </div>

          {/* Blogs Grid */}
          {blogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-slate-600 dark:text-zinc-400">
                No blog posts available yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => {
                const cover =
                  blog.image_path || blog.thumbnail || blog.cover_image || null;
                const targetHref = blog.slug ? `/blogs/${blog.slug}` : `/blogs/${blog.id}`;
                const excerpt =
                  blog.short_description || blog.excerpt || blog.description || "";
                const dateLabel = formatDate(
                  blog.published_at || blog.created_at || blog.updated_at
                );

                return (
                  <article
                    key={blog.id ?? blog.slug}
                    className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white/95 shadow-lg shadow-slate-900/5 transition-transform duration-300 hover:-translate-y-1 hover:border-amber-500 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-amber-400"
                  >
                    {cover && (
                      <Link href={targetHref} className="relative h-48 w-full overflow-hidden bg-amber-100/50">
                        <Image
                          src={cover}
                          alt={blog.title || "Blog post"}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </Link>
                    )}
                    <div className="flex flex-1 flex-col gap-4 p-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400">
                          <MdCalendarToday className="h-4 w-4" />
                          {dateLabel}
                        </div>
                        <Link
                          href={targetHref}
                          className="text-left text-xl font-semibold text-slate-900 transition-colors duration-300 hover:text-amber-600 dark:text-zinc-100 dark:hover:text-amber-400 line-clamp-2"
                        >
                          {blog.title}
                        </Link>
                        {excerpt && (
                          <p className="text-sm leading-relaxed text-slate-600 dark:text-zinc-400 line-clamp-3">
                            {excerpt}
                          </p>
                        )}
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
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 text-slate-900 dark:bg-zinc-900 dark:text-zinc-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
            Error Loading Blogs
          </h1>
          <p className="mt-2 text-slate-600 dark:text-zinc-400">
            Something went wrong while loading the blog posts.
          </p>
          <Link
            href="/"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600"
          >
            <MdArrowBack className="h-5 w-5" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }
}

export default async function BlogsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-100 text-slate-900 dark:bg-zinc-900 dark:text-zinc-100">
          <div className="flex flex-col items-center gap-4">
            <LoadingSpinner size="lg" />
            <p className="text-lg font-semibold text-slate-700 dark:text-zinc-300">
              Loading blogs...
            </p>
          </div>
        </div>
      }
    >
      <BlogsContent />
    </Suspense>
  );
}

