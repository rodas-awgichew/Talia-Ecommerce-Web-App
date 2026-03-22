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

  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${cormorant.variable} min-h-screen flex flex-col`}
      >
        {!isAuthPage && <Navbar />}

        <main className={`flex-grow ${!isAuthPage ? "pt-20" : ""}`}>
          {children}
        </main>

        {!isAuthPage && <Footer />}
      </body>
    </html>
  );
}
// import { Montserrat, Cormorant_Garamond } from "next/font/google";
// import "./globals.css";
// import Navbar from "@/src/components/shared/Navbar";
// import Footer from "@/src/components/shared/Footer";

// const montserrat = Montserrat({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

// const cormorant = Cormorant_Garamond({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600"],
//   style: ["normal", "italic"],
//   variable: "--font-serif",
// });

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body
//         className={`${montserrat.variable} ${cormorant.variable} min-h-screen flex flex-col`}
//       >
//         <Navbar />
//         <main className="flex-grow pt-20">{children}</main>
//         <Footer />
//       </body>
//     </html>
//   );
// }
