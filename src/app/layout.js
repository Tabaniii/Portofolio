import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["800", "900"],
  display: "swap",
});

export const metadata = {
  title: "TABANI — Portfolio",
  description: "Portfolio Tabani — full-stack web developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="scroll-smooth motion-reduce:scroll-auto">
      <body className={`${inter.className} m-0 p-0 bg-brand-gray text-brand-red font-body`}>
        {children}
      </body>
    </html>
  );
}
