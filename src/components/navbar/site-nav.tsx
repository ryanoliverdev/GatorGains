import Link from 'next/link';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/ui/icons';
import { MainNav } from '@/components/navbar/main-nav';
import { MobileNav } from '@/components/navbar/mobile-nav';
import { buttonVariants } from '@/components/ui/button';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-center md:justify-end">
          <span className="sm:hidden font-bold mr-[20px]">GatorGains</span>
        </div>
      </div>
    </header>
  );
}