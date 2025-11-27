import Image from "next/image";
import Link from "next/link";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";
import { FaInstagram, FaTiktok, FaFacebookF } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";

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
      { href: "/warranty", label: "Warranty Policy" },
      { href: "/return-refund", label: "Return & Refund" },
      { href: "/contact", label: "Contact Us" },
      { href: "/about", label: "About Apple Nation BD" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t font-urbanist border-slate-200 bg-white text-slate-700 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-400">
      <div className="mx-auto flex w-full md:max-w-10/12 max-w-11/12 flex-col gap-8 pt-5 pb-5 md:pt-10">
        {/* Mobile Layout: Stacked rows */}
        <div className="flex flex-col gap-6 lg:hidden">
          {/* Row 1: Name/Logo */}
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
                <span className="text-xs font-medium uppercase tracking-wide text-slate-600 dark:text-zinc-400">
                  Authentic Apple Gear
                </span>
              </div>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-slate-700 dark:text-zinc-400">
              Bangladesh&apos;s trusted destination for premium Apple devices, accessories, and expert service.
            </p>
          </div>
          
          {/* Row 2: Shop and Support side by side */}
          <div className="grid grid-cols-2 gap-6">
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
                        className="text-slate-700 transition-colors hover:text-slate-900 hover:underline dark:text-zinc-400 dark:hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          {/* Row 3: Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900 dark:text-zinc-200">
              Contact
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-slate-700 dark:text-zinc-400">
              <li className="flex items-start gap-2">
                <MdLocationOn className="mt-0.5 h-4 w-4" />
                <span>Level 4 (Block A), Shop 4A006B, Jamuna Future Park, Dhaka 1229</span>
              </li>
              <li className="flex items-center gap-2">
                <MdPhone className="h-4 w-4" />
                <Link href="tel:+8801675323706" className="hover:underline hover:text-slate-900 dark:hover:text-white">
                  01675-323706
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <FaWhatsapp className="h-4 w-4" />
                <Link href="https://wa.me/8801859013606" className="hover:underline hover:text-slate-900 dark:hover:text-white">
                  WhatsApp: 01859-013606
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <MdEmail className="h-4 w-4" />
                <Link href="mailto:applenationbd706@gmail.com" className="hover:underline hover:text-slate-900 dark:hover:text-white">
                  applenationbd706@gmail.com
                </Link>
              </li>
              <li className="mt-2 flex items-center gap-2">
                <Link href="https://instagram.com/applenationbd" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="rounded-full border border-slate-300 p-2 transition-colors hover:border-slate-400 hover:text-slate-900 dark:border-zinc-700 dark:hover:border-zinc-500">
                  <FaInstagram className="h-4 w-4" />
                </Link>
                <Link href="https://www.tiktok.com/@applenationbd" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="rounded-full border border-slate-300 p-2 transition-colors hover:border-slate-400 hover:text-slate-900 dark:border-zinc-700 dark:hover:border-zinc-500">
                  <FaTiktok className="h-4 w-4" />
                </Link>
                <Link href="https://www.facebook.com/iAppleNationBD/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="rounded-full border border-slate-300 p-2 transition-colors hover:border-slate-400 hover:text-slate-900 dark:border-zinc-700 dark:hover:border-zinc-500">
                  <FaFacebookF className="h-4 w-4" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Desktop Layout: All in one row */}
        <div className="hidden grid-cols-[1.2fr_1fr_1fr_1fr] items-start gap-8 lg:grid">
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
                <span className="text-xs font-medium uppercase tracking-wide text-slate-600 dark:text-zinc-400">
                  Authentic Apple Gear
                </span>
              </div>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-slate-700 dark:text-zinc-400">
              Bangladesh&apos;s trusted destination for premium Apple devices, accessories, and expert service.
            </p>
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
                      className="text-slate-700 transition-colors hover:text-slate-900 hover:underline dark:text-zinc-400 dark:hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {/* Contact (Short) */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900 dark:text-zinc-200">
              Contact
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-slate-700 dark:text-zinc-400">
              <li className="flex items-start gap-2">
                <MdLocationOn className="mt-0.5 h-4 w-4" />
                <span>Level 4 (Block A), Shop 4A006B, Jamuna Future Park, Dhaka 1229</span>
              </li>
              <li className="flex items-center gap-2">
                <MdPhone className="h-4 w-4" />
                <Link href="tel:+8801675323706" className="hover:underline hover:text-slate-900 dark:hover:text-white">
                  01675-323706
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <FaWhatsapp className="h-4 w-4" />
                <Link href="https://wa.me/8801859013606" className="hover:underline hover:text-slate-900 dark:hover:text-white">
                  WhatsApp: 01859-013606
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <MdEmail className="h-4 w-4" />
                <Link href="mailto:applenationbd706@gmail.com" className="hover:underline hover:text-slate-900 dark:hover:text-white">
                  applenationbd706@gmail.com
                </Link>
              </li>
              <li className="mt-2 flex items-center gap-2">
                <Link href="https://instagram.com/applenationbd" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="rounded-full border border-slate-300 p-2 transition-colors hover:border-slate-400 hover:text-slate-900 dark:border-zinc-700 dark:hover:border-zinc-500">
                  <FaInstagram className="h-4 w-4" />
                </Link>
                <Link href="https://www.tiktok.com/@applenationbd" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="rounded-full border border-slate-300 p-2 transition-colors hover:border-slate-400 hover:text-slate-900 dark:border-zinc-700 dark:hover:border-zinc-500">
                  <FaTiktok className="h-4 w-4" />
                </Link>
                <Link href="https://www.facebook.com/iAppleNationBD/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="rounded-full border border-slate-300 p-2 transition-colors hover:border-slate-400 hover:text-slate-900 dark:border-zinc-700 dark:hover:border-zinc-500">
                  <FaFacebookF className="h-4 w-4" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t border-slate-200 pt-6 text-xs text-slate-600 dark:border-zinc-800 dark:text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Apple Nation BD. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="hover:text-slate-900 hover:underline dark:hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-900 hover:underline dark:hover:text-white">
              Terms & Conditions
            </Link>
            <Link href="/return-refund" className="hover:text-slate-900 hover:underline dark:hover:text-white">
              Return & Refund
            </Link>
            <Link href="/warranty" className="hover:text-slate-900 hover:underline dark:hover:text-white">
              Warranty Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

