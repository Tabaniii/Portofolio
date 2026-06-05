import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["800", "900"],
  display: "swap",
});

export const metadata = {
  title: "TABANI — Portfolio",
  description: "Portfolio Tabani — Junior Programmer Laravel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

