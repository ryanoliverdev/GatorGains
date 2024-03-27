'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/ui/icons';
import { Button } from '../ui/button';
import Image from 'next/image';
import logo from '@/assets/logosvggradient.svg';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '../ui/navigation-menu';

export function MainNav({ options }: { options: any }) {
  const pathname = usePathname();
  if (options === null) {
    return (
      <div className="hidden md:flex w-full justify-between">
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src={logo} width={30} alt="gator logo" />
            <span className="text-primary hidden text-base font-bold sm:inline-block">
              GatorGains
            </span>
          </Link>
          <Link
            href="/"
            className={cn(
              'transition-colors hover:text-foreground/80',
              pathname === '/docs' ? 'text-foreground' : 'text-foreground/60'
            )}
          >
            Home
          </Link>
          <Link
            href="/leaderboards"
            className={cn(
              'transition-colors hover:text-foreground/80',
              pathname === '/docs' ? 'text-foreground' : 'text-foreground/60'
            )}
          >
            Leaderboards
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
  } else if (options.user !== null) {
    return (
      <div className="hidden md:flex w-full justify-between">
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src={logo} width={30} alt="gator logo" />
            <span className="text-primary hidden text-base font-bold sm:inline-block">
              GatorGains
            </span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
            <NavigationMenuItem>
                <Link href="/dashboard" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Dashboard
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger>Groups</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[300px] lg:w-[300px] lg:grid-cols-[1]">
                    
                    <ListItem href="/groups/create" title="Create Group">
                      Create a new group and invite friends.
                    </ListItem>
                    <ListItem href="/groups/find" title="Find Groups">
                      Find groups to join. 
                    </ListItem>
                    <ListItem
                      href="/groups/view"
                      title="My Groups"
                    >
                      View your groups and group information.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/leaderboards" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Leaderboards
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/exercises" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Exercises
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/diet" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Diet
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
      </div>
    );
  }
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
