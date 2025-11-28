import Link from "next/link";
import {
  MdLocalShipping,
  MdSecurity,
  MdSupportAgent,
  MdVerified,
  MdPayment,
  MdRefresh
} from "react-icons/md";

const features = [
  {
    id: 1,
    icon: MdLocalShipping,
    title: "Fast Delivery",
    description: "Fast delivery in Dhaka, nationwide shipping",
    color: "sky",
    link: "/products",
  },
  {
    id: 2,
    icon: MdSecurity,
    title: "Genuine Warranty",
    description: "Authentic products with official warranty",
    color: "emerald",
    link: "/products",
  },
  {
    id: 3,
    icon: MdSupportAgent,
    title: "24/7 Support",
    description: "Expert assistance whenever you need it",
    color: "amber",
    link: "/products",
  },
  {
    id: 4,
    icon: MdVerified,
    title: "Verified Products",
    description: "All items tested and verified before shipping",
    color: "blue",
    link: "/products",
  },
  {
    id: 5,
    icon: MdPayment,
    title: "Secure Payment",
    description: "Multiple payment options, fully secured",
    color: "purple",
    link: "/products",
  },
  {
    id: 6,
    icon: MdRefresh,
    title: "Easy Returns",
    description: "Hassle-free returns within 7 days",
    color: "rose",
    link: "/products",
  },
];

const colorClasses = {
  sky: "bg-sky-500/10 text-sky-700 dark:bg-sky-500/20 dark:text-sky-400 border-sky-500/20",
  emerald: "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-500/20",
  amber: "bg-amber-500/10 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border-amber-500/20",
  blue: "bg-blue-500/10 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border-blue-500/20",
  purple: "bg-purple-500/10 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400 border-purple-500/20",
  rose: "bg-rose-500/10 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400 border-rose-500/20",
};

export default function HeroFeatureCards() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-6 mt-4 sm:mt-8">
      {features.map((feature) => {
        const Icon = feature.icon;
        const colorClass = colorClasses[feature.color];

        return (
          <Link
            key={feature.id}
            href={feature.link}
            className="group font-urbanist relative overflow-hidden rounded-xl sm:rounded-2xl border border-slate-100 bg-white p-2 sm:p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-slate-200 dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:border-zinc-700"
          >
            <div className="flex flex-row sm:flex-col items-center sm:text-center gap-2 sm:gap-3">
              <div className={`inline-flex rounded-full p-1.5 sm:p-3 transition-transform duration-300 group-hover:scale-110 ${colorClass} bg-opacity-10 shrink-0`}>
                <Icon className="h-4 w-4 sm:h-7 sm:w-7" />
              </div>

              <div className="space-y-0.5 sm:space-y-1 min-w-0">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-zinc-100 truncate sm:whitespace-normal">
                  {feature.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-slate-500 font-medium dark:text-zinc-400 hidden sm:block">
                  {feature.description}
                </p>
              </div>
            </div>

            {/* Hover Effect Gradient */}
            <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${colorClass.split(' ')[0]} opacity-0 transition-opacity duration-300 group-hover:opacity-5`} />
          </Link>
        );
      })}
    </div>
  );
}

