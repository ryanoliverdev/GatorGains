import { Providers } from './providers';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/components/navbar/site-nav';
import { Toaster } from "@/components/ui/toaster"
import Footer from '@/components/footer/footer';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GatorGains',
  description: 'Modern Fitness and Nutrition Tracker',
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className= "flex flex-col min-h-screen relative">
        <SiteHeader></SiteHeader>
        <Providers>{children}</Providers>
        <Toaster />
        <Footer></Footer>
      </body>
    </html>
  );
}
