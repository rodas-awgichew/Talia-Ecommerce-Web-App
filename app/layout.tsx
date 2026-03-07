"use client";

import { Montserrat, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/src/components/shared/Navbar";
import Footer from "@/src/components/shared/Footer";
import { usePathname } from "next/navigation";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${cormorant.variable} min-h-screen flex flex-col ${!isAdmin ? 'pt-20' : ''}`}>
        {!isAdmin && <Navbar />}
        <main className="flex-grow">
          {children}
        </main>
        {!isAdmin && <Footer />}
      </body>
    </html>
  );
}
