import { Inter } from "next/font/google";
import { PageTransitionProvider } from "../components/PageTransition";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["800", "900"],
  display: "swap",
});

export const metadata = {
  title: "TABANI — Full-Stack developer",
  description: "TABANI — Full-Stack developer.",
  verification: {
    google: "f_tYe3ZsDiCbSJ0hnS4whXiFuq9YhMKXEte2YoAYuD4",
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://tabani.me"
  ),
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
  openGraph: {
    title: "TABANI — Full-Stack developer",
    description: "TABANI — Full-Stack developer.",
    url: "/",
    siteName: "TABANI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TABANI Portfolio",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TABANI — Full-Stack developer",
    description: "TABANI — Full-Stack developer.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="motion-reduce:scroll-auto">
      <body className={`${inter.className} m-0 p-0 w-full overflow-x-hidden bg-black text-brand-red font-body antialiased`}>
        <PageTransitionProvider>{children}</PageTransitionProvider>
      </body>
    </html>
  );
}
