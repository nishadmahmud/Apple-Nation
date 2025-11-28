import { Geist, Geist_Mono, Poppins, Urbanist } from "next/font/google";
import "./globals.css";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { CartProvider } from "../components/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const metadata = {
  metadataBase: new URL("https://www.applenationbd.com"),
  title: {
    default: "Apple Nation BD",
    template: "%s | Apple Nation BD",
  },
  description:
    "Shop premium Apple devices, accessories, and curated tech essentials across Bangladesh.",
  keywords: [
    "Apple Bangladesh",
    "iPhone shop",
    "Apple Nation",
    "MacBook",
    "Apple accessories",
  ],
  authors: [{ name: "Apple Nation BD" }],
  openGraph: {
    type: "website",
    url: "https://www.applenationbd.com",
    title: "Apple Nation BD",
    description:
      "Your trusted destination for Apple products, wearables, and curated tech essentials across Bangladesh.",
    siteName: "Apple Nation BD",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Apple Nation BD preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apple Nation BD",
    description:
      "Shop premium Apple devices, accessories, and curated tech essentials across Bangladesh.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export const noImage = 'https://www.outletexpense.xyz/uploads/260-Biplob-Hossen/1764148676_6926c5c4d0fa2.jpg'


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${poppins.variable} ${geistMono.variable} ${urbanist.variable} min-h-screen bg-slate-100 text-slate-900 antialiased transition-colors duration-300 dark:bg-zinc-900 dark:text-zinc-100`}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const stored = localStorage.getItem('theme');
                  const theme = stored || 'light';
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <NavBar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
