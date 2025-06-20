import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/page";
import FilterModal from "@/components/Filter/FilterModal";
import { FilterProvider } from "./contex/FilterContext";
import { HomeModalProvider } from "./contex/HomeModalContext";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rate Estate Rental",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased` }
      >
          <FilterProvider>
          <HomeModalProvider>
        <Navbar/>
        {children}
         <FilterModal />
         <Toaster position="top-center" />
         </HomeModalProvider>
        </FilterProvider>
      </body>
    </html>
  );
}
