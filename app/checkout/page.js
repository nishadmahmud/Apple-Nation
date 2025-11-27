"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../../components/CartContext";
import { MdCheckCircle } from "react-icons/md";
import { Box, List } from "lucide-react";

const formatCurrency = (value) => {
  const amount = Number(value);
  if (Number.isNaN(amount)) return "৳—";
  return `৳${amount.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
};

export default function CheckoutPage() {
  const { items, subtotal, clear, isHydrated } = useCart();
  const [placed, setPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    delivery: "inside-dhaka",
    notes: "",
  });

  const shippingFee = useMemo(() => {
    if (form.delivery === "inside-dhaka") return 80;
    if (form.delivery === "outside-dhaka") return 120;
    return 0;
  }, [form.delivery]);

  const total = useMemo(() => subtotal + shippingFee, [subtotal, shippingFee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const canSubmit =
    form.fullName.trim().length > 2 &&
    form.phone.trim().length >= 10 &&
    form.address.trim().length > 5 &&
    items.length > 0;

  const handlePlaceOrder = async () => {
    if (!canSubmit) return;
    setLoading(true);
    try {
      // In a real app, send to backend. For now, stash the order locally.
      const order = {
        id: `ORD-${Date.now()}`,
        customer: form,
        items,
        subtotal,
        shipping: shippingFee,
        total,
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem("appleNation.lastOrder", JSON.stringify(order));
      await new Promise((r) => setTimeout(r, 700));
      setPlaced(true);
      clear();
    } finally {
      setLoading(false);
    }
  };

  if (!isHydrated) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <span className="text-sm text-slate-600 dark:text-zinc-400">Loading…</span>
      </div>
    );
  }

  if (placed) {
    return (
      <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-zinc-900 dark:text-zinc-100">
        <div className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-10 lg:px-16">
          <div className="rounded-2xl border border-slate-200 bg-white/95 p-10 text-center dark:border-zinc-700 dark:bg-zinc-800/90">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/20">
              <MdCheckCircle className="h-7 w-7" />
            </div>
            <h1 className="mb-2 text-2xl font-bold">Order placed successfully!</h1>
            <p className="mb-6 text-sm text-slate-600 dark:text-zinc-400">
              We&apos;ll contact you soon to confirm your order and delivery details.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600"
              >
                Continue Shopping
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800/70"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-zinc-900 dark:text-zinc-100">
      <div className="mx-auto w-full max-w-11/12 md:max-w-10/12 py-8">
        <h1 className="mb-6 text-2xl font-bold font-urbanist flex items-center gap-1">
          <Box></Box>
          Checkout</h1>
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* <section className="space-y-4 rounded-2xl border border-slate-200 bg-white/95 p-6 dark:border-zinc-700 dark:bg-zinc-800/90">
            <h2 className="text-lg font-semibold">Shipping details</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Full name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-zinc-600 dark:bg-zinc-900"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="01XXXXXXXXX"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-zinc-600 dark:bg-zinc-900"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Email (optional)
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-zinc-600 dark:bg-zinc-900"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Address
                </label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="House, road, area"
                  rows={3}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-zinc-600 dark:bg-zinc-900"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Dhaka"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-zinc-600 dark:bg-zinc-900"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Delivery method
                </label>
                <select
                  name="delivery"
                  value={form.delivery}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-zinc-600 dark:bg-zinc-900"
                >
                  <option value="inside-dhaka">Inside Dhaka (৳80)</option>
                  <option value="outside-dhaka">Outside Dhaka (৳120)</option>
                  <option value="pickup">Store Pickup (Free)</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Order notes (optional)
                </label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Any special instructions…"
                  rows={2}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-zinc-600 dark:bg-zinc-900"
                />
              </div>
              <div className="sm:col-span-2">
                <button
                  onClick={handlePlaceOrder}
                  disabled={!canSubmit || loading}
                  className={`inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white transition-colors ${
                    canSubmit && !loading
                      ? "bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600"
                      : "cursor-not-allowed bg-slate-400 dark:bg-zinc-600"
                  }`}
                >
                  {loading ? "Placing Order..." : "Place Order"}
                </button>
              </div>
            </div>
          </section> */}

          <div className="space-y-4">

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
  <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white font-urbanists">
    📍 Delivery Information
  </h2>
  <p className="text-sm font-poppins text-slate-500 mb-4">
    Where should we deliver your order?
  </p>

  <div className="grid gap-4 sm:grid-cols-2 font-poppins">

    {/* Full Name */}
    <div >
      <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">Full Name</label>
      <input
        type="text"
        name="fullName"
        value={form.fullName}
        onChange={handleChange}
        placeholder="Enter your full name"
        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-900"
      />
    </div>

    {/* Phone */}
    <div>
      <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">Phone Number</label>
      <input
        type="tel"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="+8801XXXXXXXX"
        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-900"
      />
     
    </div>

    {/* Email */}
    <div className="hidden">
      <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">Email (optional)</label>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="you@example.com"
        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-900"
      />
    </div>

    {/* Address */}
    <div className="sm:col-span-2">
      <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">Address</label>
      <textarea
        name="address"
        value={form.address}
        onChange={handleChange}
        placeholder="House number and street name"
        rows={3}
        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-900"
      />
    </div>

    {/* City */}
    <div className="hidden">
      <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">City</label>
      <input
        type="text"
        name="city"
        value={form.city}
        onChange={handleChange}
        placeholder="Enter your city"
        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-900"
      />
    </div>
  </div>
</section>


<section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
  <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white font-urbanist">
    🚚 Shipping Method
  </h2>
  <p className="text-sm font-poppins text-slate-500 mb-4">Choose your preferred delivery option</p>

  <div className="space-y-3 font-poppins">

    {/* Inside Dhaka */}
    <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-4 hover:bg-slate-50 dark:border-zinc-700 dark:hover:bg-zinc-700/40">
      <div className="flex items-start gap-3">
        <input
          type="radio"
          name="delivery"
          value="inside-dhaka"
          checked={form.delivery === "inside-dhaka"}
          onChange={handleChange}
          className="mt-1 h-4 w-4"
        />
        <div>
          <p className="font-medium">Inside Dhaka</p>
          <p className="text-sm text-slate-500">Delivery within 1–2 business days</p>
        </div>
      </div>
      <span className="font-semibold">৳80</span>
    </label>

    {/* Outside Dhaka */}
    <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-4 hover:bg-slate-50 dark:border-zinc-700 dark:hover:bg-zinc-700/40">
      <div className="flex items-start gap-3">
        <input
          type="radio"
          name="delivery"
          value="outside-dhaka"
          checked={form.delivery === "outside-dhaka"}
          onChange={handleChange}
          className="mt-1 h-4 w-4"
        />
        <div>
          <p className="font-medium">Outside Dhaka</p>
          <p className="text-sm text-slate-500">Delivery within 3–5 business days</p>
        </div>
      </div>
      <span className="font-semibold">৳120</span>
    </label>
  </div>
</section>


<section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
  <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white font-urbanist">
    💳 Payment Method
  </h2>
  <p className="text-sm font-poppins text-slate-500 mb-4">All transactions are secure and encrypted</p>

  <div className="space-y-3 font-poppins">

    {/* Cash on Delivery */}
    <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-4 hover:bg-slate-50 dark:border-zinc-700 dark:hover:bg-zinc-700/40">
      <div className="flex items-center gap-3">
        <input
          type="radio"
          name="payment"
          value="cod"
          checked={form.payment === "cod"}
          onChange={handleChange}
          className="h-4 w-4"
        />
        <p className="font-medium">Cash on Delivery</p>
      </div>
    </label>

    {/* Online Payment */}
    <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-4 hover:bg-slate-50 dark:border-zinc-700 dark:hover:bg-zinc-700/40">
      <div className="flex items-center gap-3">
        <input
          type="radio"
          name="payment"
          value="online"
          checked={form.payment === "online"}
          onChange={handleChange}
          className="h-4 w-4"
        />
        <p className="font-medium">Online Payment</p>
      </div>
    </label>

  </div>
</section>


 <div className="sm:col-span-2">
                <button
                  onClick={handlePlaceOrder}
                  disabled={!canSubmit || loading}
                  className={`inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white transition-colors ${
                    canSubmit && !loading
                      ? "bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600"
                      : "cursor-not-allowed bg-slate-400 dark:bg-zinc-600"
                  }`}
                >
                  {loading ? "Placing Order..." : "Place Order"}
                </button>
              </div>

          </div>

          <aside className="sticky top-10 space-y-4 rounded-2xl border border-slate-200 bg-white/95 p-6 dark:border-zinc-700 dark:bg-zinc-800/90">
            <h2 className="text-xl font-semibold font-urbanist flex items-center gap-1.5">
              <List size={20}></List>
              Order summary</h2>
            <div className="space-y-3 font-poppins">
              {items.map((item) => (
                <div key={item.key} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-white">
                      <Image src={item.image || "/globe.svg"} alt={item.name} fill className="object-contain p-1" />
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-slate-600 dark:text-zinc-400">
                        Qty {item.quantity}
                        {item.attributes
                          ? ` — ${item.attributes.color || ""} ${item.attributes.storage || ""} ${item.attributes.region || ""}`
                          : ""}
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-200 pt-4 text-sm dark:border-zinc-700 font-poppins">
              <div className="mb-2 flex items-center justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">{formatCurrency(subtotal)}</span>
              </div>
              <div className="mb-2 flex items-center justify-between">
                <span>Shipping</span>
                <span className="font-semibold">{formatCurrency(shippingFee)}</span>
              </div>
              <div className="flex items-center justify-between text-base font-bold">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}


