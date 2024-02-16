'use client';

import * as React from 'react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import svglogo from '@/assets/logosvggradient.svg';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';

export function MobileNav({ options }: { options: any }) {
  const [open, setOpen] = React.useState(false);
  if (options === null) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          >
            <svg
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
            >
              <path
                d="M3 5H11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M3 12H16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M3 19H21"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pr-0">
          <MobileLink
            href="/"
            className="flex items-center gap-x-3"
            onOpenChange={setOpen}
          >
            <Image width={40} src={svglogo} alt="logo"></Image>

            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">GatorGains</span>
            </Link>
          </MobileLink>
          <ScrollArea className="my-6 h-[70%] pb-10 pl-6">
            <div className="flex flex-col space-y-3">
              <MobileLink href="/" onOpenChange={setOpen}>
                Home
              </MobileLink>
              <MobileLink
                href="/leaderboards/individual"
                onOpenChange={setOpen}
              >
                Leaderboards
              </MobileLink>
            </div>
          </ScrollArea>
          <div className="flex flex-col justify-end space-y-3 w-11/12">
            <Button asChild variant="secondary">
              <MobileLink onOpenChange={setOpen} href="/login">
                Sign In
              </MobileLink>
            </Button>
            <Button asChild>
              <MobileLink onOpenChange={setOpen} href="/register">
                Start Today
              </MobileLink>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  } else if (options.user !== null) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          >
            <svg
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
            >
              <path
                d="M3 5H11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M3 12H16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M3 19H21"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pr-0">
          <MobileLink
            href="/"
            className="flex items-center gap-x-3"
            onOpenChange={setOpen}
          >
            <Image width={40} src={svglogo} alt="logo"></Image>

            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">GatorGains</span>
            </Link>
          </MobileLink>
          <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
            <div className="flex flex-col space-y-3">
              <MobileLink href="/" onOpenChange={setOpen}>
                Home
              </MobileLink>
              <MobileLink href="/dashboard" onOpenChange={setOpen}>
                Dashboard
              </MobileLink>
              <MobileLink href="/" onOpenChange={setOpen}>
                Groups
              </MobileLink>
              <MobileLink
                href="/leaderboards/individual"
                onOpenChange={setOpen}
              >
                Leaderboards
              </MobileLink>
              <MobileLink href="/" onOpenChange={setOpen}>
                Exercises
              </MobileLink>
              <MobileLink href="/" onOpenChange={setOpen}>
                Tracking
              </MobileLink>
              <MobileLink href="/" onOpenChange={setOpen}>
                Diet
              </MobileLink>
              <MobileLink
                className="font-bold"
                href="/"
                onClick={() => signOut()}
              >
                Sign Out
              </MobileLink>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    );
  }
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
