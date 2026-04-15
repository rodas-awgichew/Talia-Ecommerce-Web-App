"use client";

import { usePathname } from "next/navigation";
import { Montserrat, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/src/components/shared/Navbar";
import Footer from "@/src/components/shared/Footer";

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
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAuthPage = pathname.startsWith("/auth");
   const isAdminPage = pathname.startsWith("/admin");

 return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">

        {/* 🚫 Hide on auth + admin */}
        {!isAuthPage && !isAdminPage && <Navbar />}

        <main className={`flex-grow ${!isAuthPage && !isAdminPage ? "pt-20" : ""}`}>
          {children}
        </main>

        {!isAuthPage && !isAdminPage && <Footer />}
      </body>
    </html>
  );
}