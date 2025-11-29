import Link from "next/link";
import { MdArrowBack, MdEmail, MdPhone, MdLocationOn, MdWhatsapp, MdAccessTime, MdPublic, MdChat } from "react-icons/md";

export const metadata = {
  title: "Contact Apple Nation BD | Store, Support & WhatsApp",
  description:
    "Message Apple Nation BD on WhatsApp, call us, or visit our Jamuna Future Park showroom. Get fast support for orders, warranty, and product advice.",
  alternates: {
    canonical: "https://www.applenationbd.com/contact",
  },
  openGraph: {
    title: "Contact Apple Nation BD",
    description:
      "Reach our Jamuna Future Park showroom or chat with our team on WhatsApp, Messenger, and email for instant Apple product support.",
    url: "https://www.applenationbd.com/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Apple Nation BD",
    description:
      "Need Apple product support? Chat on WhatsApp or visit our Jamuna Future Park store.",
  },
};

const contactMethods = [
  {
    icon: MdPhone,
    label: "Call Us",
    value: "+880 1675-323706",
    href: "tel:+8801675323706",
    description: "Speak directly with our sales & support team.",
  },
  {
    icon: MdWhatsapp,
    label: "WhatsApp",
    value: "+880 1859-013606",
    href: "https://wa.me/8801859013606",
    description: "Quick replies on WhatsApp for orders & updates.",
  },
  {
    icon: MdEmail,
    label: "Email",
    value: "applenationbd706@gmail.com",
    href: "mailto:applenationbd706@gmail.com",
    description: "For detailed inquiries and partnership opportunities.",
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/iAppleNationBD/",
    handle: "@iAppleNationBD",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/applenationbd",
    handle: "@applenationbd",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@applenationbd",
    handle: "@applenationbd",
  },
  {
    label: "Website",
    href: "https://www.applenationbd.com/",
    handle: "applenationbd.com",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-zinc-900 dark:text-zinc-100">
      <div className="mx-auto w-full max-w-5xl px-6 py-10 sm:px-10 lg:px-16">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          <MdArrowBack className="h-5 w-5" />
          Back to Home
        </Link>

        <div className="space-y-6">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-sky-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-sky-600 dark:bg-sky-400/10 dark:text-sky-300">
              Need Assistance?
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
              Contact Apple Nation BD
            </h1>
            <p className="max-w-2xl text-base text-slate-600 dark:text-zinc-400">
              We&apos;re here to help with product recommendations, order updates, warranty claims, or anything else you need. Reach out through any channel below and our team will respond as soon as possible.
            </p>
          </div>

          <div className="grid gap-6 items-stretch lg:grid-cols-2">
            {/* Row 1 - Visit Store (left), Message Us (right) */}
            <section className="h-full rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800/90">
              <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-zinc-100">
                Visit Our Store
              </h2>
              <div className="flex flex-col gap-4 text-sm text-slate-700 dark:text-zinc-300">
                <div className="flex items-start gap-3">
                  <MdLocationOn className="mt-1 h-5 w-5 text-sky-500" />
                  <p>
                    Level 4 (Block A), Shop 4A006B<br />
                    Jamuna Future Park, Dhaka 1229<br />
                    Bangladesh
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <MdAccessTime className="mt-1 h-5 w-5 text-emerald-500" />
                  <p>
                    <span className="font-semibold">Store Hours</span><br />
                    Sunday - Tuesday: 11:00 AM – 9:00 PM<br />
                    Wednesday: Closed<br />
                    Thursday - Saturday: 11:00 AM – 10:00 PM
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="https://maps.app.goo.gl/91L2mHTZWar7MzRr7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:border-slate-400 hover:text-slate-900 dark:border-zinc-600 dark:text-zinc-200 dark:hover:border-zinc-500 dark:hover:text-white"
                  >
                    <MdPublic className="h-5 w-5" />
                    View on Maps
                  </Link>
                  <Link
                    href="tel:+8801675323706"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:border-slate-400 hover:text-slate-900 dark:border-zinc-600 dark:text-zinc-200 dark:hover:border-zinc-500 dark:hover:text-white"
                  >
                    <MdPhone className="h-5 w-5" />
                    Call Store
                  </Link>
                </div>
              </div>
            </section>
            <section className="h-full rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800/90">
              <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-zinc-100">
                Message Us
              </h2>
              <p className="mb-4 text-sm text-slate-600 dark:text-zinc-400">
                Prefer messaging? Drop us a quick note on Facebook Messenger or WhatsApp for real-time responses from our team.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="https://www.facebook.com/messages/t/applenationbangladesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:border-slate-400 hover:text-slate-900 dark:border-zinc-600 dark:text-zinc-200 dark:hover:border-zinc-500 dark:hover:text-white"
                >
                  <MdChat className="h-5 w-5" />
                  Messenger
                </Link>
                <Link
                  href="https://wa.me/8801859013606"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:border-slate-400 hover:text-slate-900 dark:border-zinc-600 dark:text-zinc-200 dark:hover:border-zinc-500 dark:hover:text-white"
                >
                  <MdWhatsapp className="h-5 w-5" />
                  WhatsApp
                </Link>
                <Link
                  href="mailto:applenationbd706@gmail.com"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:border-slate-400 hover:text-slate-900 dark:border-zinc-600 dark:text-zinc-200 dark:hover:border-zinc-500 dark:hover:text-white"
                >
                  <MdEmail className="h-5 w-5" />
                  Send Email
                </Link>
              </div>
            </section>

            {/* Row 2 - Contact Channels (left), Connect Online (right) */}
            <section className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-800/90">
              <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-zinc-100">
                Contact Channels
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {contactMethods.map(({ icon: Icon, label, value, description, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className={`group flex flex-col gap-1.5 rounded-xl border border-slate-200 bg-white/80 p-3 text-left transition-transform hover:-translate-y-1 hover:border-sky-500 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-900/60 dark:hover:border-sky-500/40 ${label === "Email" ? "sm:col-span-2" : ""}`}
                  >
                    <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-400">
                      <Icon className="h-4 w-4" />
                      {label}
                    </div>
                    <span className="text-lg font-semibold text-slate-900 dark:text-zinc-100">
                      {value}
                    </span>
                    <p className="text-xs text-slate-600 transition-colors group-hover:text-slate-500 dark:text-zinc-400 dark:group-hover:text-zinc-300">
                      {description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
            <section className="h-full rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800/90">
              <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-zinc-100">
                Connect Online
              </h2>
              <ul className="space-y-3 text-sm text-slate-700 dark:text-zinc-300">
                {socialLinks.map(({ label, href, handle }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3 transition-colors hover:border-sky-500 hover:bg-sky-50 dark:border-zinc-700 dark:hover:border-sky-500/40 dark:hover:bg-zinc-900/70"
                    >
                      <span className="font-semibold text-slate-900 dark:text-zinc-100">
                        {label}
                      </span>
                      <span className="text-xs text-slate-500 transition-colors group-hover:text-slate-700 dark:text-zinc-400 dark:group-hover:text-zinc-200">
                        {handle}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}


