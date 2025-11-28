"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { MdHome, MdGridView, MdShoppingCart, MdLocalOffer } from "react-icons/md";
import { useCart } from "./CartContext";
import dynamic from "next/dynamic";

const CartDrawer = dynamic(() => import("./CartDrawer"), { ssr: false });

export default function MobileBottomNav() {
    const pathname = usePathname();
    const { count } = useCart();
    const [cartOpen, setCartOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // Hide on product details pages (e.g., /products/123) but show on /products
    const isProductDetails = pathname.startsWith('/products/') && pathname.split('/').length > 2;

    if (isProductDetails) return null;

    const navItems = [
        {
            label: "Home",
            href: "/",
            icon: MdHome,
        },
        {
            label: "Products",
            href: "/products",
            icon: MdGridView,
        },
        {
            label: "Cart",
            action: () => setCartOpen(true),
            icon: MdShoppingCart,
            isCart: true,
        },
        {
            label: "Offers",
            href: "/#best-deals",
            icon: MdLocalOffer,
        },
    ];

    return (
        <>
            <div className="fixed bottom-0 left-0 right-0 z-50 block lg:hidden">
                <nav className="flex items-center justify-around border-t border-slate-200 bg-white/95 px-2 py-2 pb-safe backdrop-blur-lg dark:border-zinc-800 dark:bg-zinc-900/95">
                    {navItems.map((item, index) => {
                        const Icon = item.icon;
                        const isActive = item.href === "/" ? pathname === "/" : item.href && pathname.startsWith(item.href);
                        const isCart = item.isCart;

                        if (isCart) {
                            return (
                                <button
                                    key={index}
                                    onClick={item.action}
                                    className="group relative flex flex-col items-center justify-center gap-1 p-2 text-slate-900 transition-colors hover:text-orange-600 dark:text-zinc-400 dark:hover:text-orange-500"
                                >
                                    <div className="relative">
                                        <Icon className={`h-6 w-6 transition-transform duration-300 group-hover:scale-110 ${cartOpen ? "text-orange-600 dark:text-orange-500" : ""}`} />
                                        {count > 0 && (
                                            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-orange-600 text-[10px] font-bold text-white shadow-sm ring-1 ring-white dark:ring-zinc-900">
                                                {count}
                                            </span>
                                        )}
                                    </div>
                                    <span className={`text-[10px] font-black ${cartOpen ? "text-orange-600 dark:text-orange-500" : ""}`}>
                                        {item.label}
                                    </span>
                                </button>
                            );
                        }

                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className={`group flex flex-col items-center justify-center gap-1 p-2 transition-colors ${isActive
                                    ? "text-orange-600 dark:text-orange-500"
                                    : "text-slate-900 hover:text-orange-600 dark:text-zinc-400 dark:hover:text-orange-500"
                                    }`}
                            >
                                <Icon className={`h-6 w-6 transition-transform duration-300 group-hover:scale-110 ${isActive ? "scale-110" : ""}`} />
                                <span className="text-[10px] font-black">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
        </>
    );
}
