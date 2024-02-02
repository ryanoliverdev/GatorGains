import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {SiteHeader} from "@/components/navbar/site-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GatorGains",
  description: "Modern Fitness and Nutrition Tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader></SiteHeader>
        {children}
        </body>
    </html>
  );
}
