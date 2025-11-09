import Image from "next/image";
import Link from "next/link";

const footerMenus = [
  {
    title: "Shop",
    links: [
      { href: "/products", label: "All Products" },
      { href: "/collections/best-sellers", label: "Best Sellers" },
      { href: "/collections/new-arrivals", label: "New Arrivals" },
      { href: "/collections/best-deals", label: "Best Deals" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/support", label: "Help Center" },
      { href: "/policies", label: "Warranty & Returns" },
      { href: "/about", label: "About Apple Nation BD" },
      { href: "mailto:support@applenationbd.com", label: "Email Us" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/blogs", label: "Latest Blogs" },
      { href: "/", label: "Device Trade-In" },
      { href: "/", label: "Bulk Orders" },
      { href: "/", label: "Store Locator" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/90 text-slate-700 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-400">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12 sm:px-10 lg:px-16">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white">
                <Image
                  src="/logo.png"
                  alt="Apple Nation BD"
                  fill
                  className="object-contain p-1"
                  sizes="48px"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-slate-900 dark:text-zinc-100">
                  Apple Nation BD
                </span>
                <span className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-zinc-400">
                  Authentic Apple Gear
                </span>
              </div>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
              Bangladesh&apos;s trusted destination for premium Apple devices, accessories, and expert service. Genuine products, local warranty, and fast delivery nationwide.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <Link
                href="tel:+8801799000000"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 font-semibold text-slate-600 transition-colors hover:border-slate-400 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-white dark:focus-visible:ring-offset-zinc-900"
              >
                📞 01799-000000
              </Link>
              <Link
                href="https://www.facebook.com"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 font-semibold text-slate-600 transition-colors hover:border-slate-400 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-white dark:focus-visible:ring-offset-zinc-900"
              >
                👍 Follow on Facebook
              </Link>
            </div>
          </div>
          {footerMenus.map((menu) => (
            <div key={menu.title} className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900 dark:text-zinc-200">
                {menu.title}
              </h3>
              <ul className="flex flex-col gap-3 text-sm">
                {menu.links.map((link, index) => (
                  <li key={`${menu.title}-${link.label}-${index}`}>
                    <Link
                      href={link.href}
                      className="text-slate-600 transition-colors hover:text-slate-900 hover:underline dark:text-zinc-400 dark:hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4 border-t border-slate-200 pt-6 text-xs text-slate-500 dark:border-zinc-800 dark:text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Apple Nation BD. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="hover:text-slate-900 hover:underline dark:hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-900 hover:underline dark:hover:text-white">
              Terms & Conditions
            </Link>
            <Link href="/shipping" className="hover:text-slate-900 hover:underline dark:hover:text-white">
              Shipping Info
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

