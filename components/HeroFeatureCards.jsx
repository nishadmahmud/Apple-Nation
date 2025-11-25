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
    <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-6">
      {features.map((feature) => {
        const Icon = feature.icon;
        const colorClass = colorClasses[feature.color];
        
        return (
          <Link
            key={feature.id}
            href={feature.link}
            className="group font-urbanist relative overflow-hidden rounded-lg border hover:border-[#fb6913] bg-white/95 p-3 shadow-sm transition duration-500 ease-in-out hover:-translate-y-1 border-slate-300 hover:shadow-lg sm:p-6 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-zinc-700"
          >
            <div className={`mb-2 inline-flex rounded-xl border p-2 sm:mb-4 sm:p-3 ${colorClass}`}>
              <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <h3 className="text-xs font-semibold text-slate-900 sm:mb-1 sm:text-base dark:text-zinc-100">
              {feature.title}
            </h3>
            <p className="hidden text-sm leading-relaxed text-slate-700 sm:block dark:text-zinc-400">
              {feature.description}
            </p>
            
            {/* Hover Effect Gradient */}
            <div className={`absolute inset-0 -z-10 bg-linear-to-br ${colorClass.split(' ')[0]} opacity-0 transition-opacity duration-300 group-hover:opacity-5`} />
          </Link>
        );
      })}
    </div>
  );
}

