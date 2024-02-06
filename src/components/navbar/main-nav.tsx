'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/ui/icons';
import { Button } from '../ui/button';

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex w-full justify-between">
      <nav className="flex items-center gap-6 text-sm">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="hidden font-bold sm:inline-block">GatorGains</span>
        </Link>
        <Link
          href="/"
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === '/docs' ? 'text-foreground' : 'text-foreground/60'
          )}
        >
          Groups
        </Link>
        <Link
          href="/"
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname?.startsWith('/docs/components')
              ? 'text-foreground'
              : 'text-foreground/60'
          )}
        >
          Exercises
        </Link>
        <Link
          href="/"
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname?.startsWith('/themes')
              ? 'text-foreground'
              : 'text-foreground/60'
          )}
        >
          Tracking
        </Link>
        <Link
          href="/"
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname?.startsWith('/examples')
              ? 'text-foreground'
              : 'text-foreground/60'
          )}
        >
          Diet
        </Link>
      </nav>
      <div className=" space-x-3">
        <Button asChild variant="ghost">
          <Link href="/login">Sign In</Link>
        </Button>
        <Button asChild>
          <Link href="/register">Start Today</Link>
        </Button>
      </div>
    </div>
  );
}
