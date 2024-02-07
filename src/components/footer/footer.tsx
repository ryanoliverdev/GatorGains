'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

export default function Footer() {
  const pathname = usePathname();

  return (

    <div className="mt-auto">
      <footer className=" w-full mx-auto max-w-screen-xl p-6 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link href="/">
            <h1 className="mb-2 text-2xl font-bold sm:mb-0 mr-4">
              GatorGains
            </h1>
          </Link>
          <ul className="mb-6 flex flex-wrap items-center sm:mb-0">
            {footerLinks.map((link) => (
              <li key={link.route}>
                <Link href={link.path}                   className={cn(
                    'mr-4 transition-colors hover:text-foreground/80 md:mr-6',
                    pathname === link.path
                      ? 'text-foreground'
                      : 'text-foreground/60'
                  )}>
                  {link.route}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <hr className="my-6 text-muted-foreground sm:mx-auto lg:my-8" />
        <span className="block text-sm text-muted-foreground sm:text-center">
          © {new Date().getFullYear()}{" "}
          <a
            target="_blank"
            href="/"
            className="hover:underline"
          >
            Gator Gains
          </a>
          . All Rights Reserved.
        </span>
      </footer>
    </div>

  )
}

export const footerLinks = [
  {
    route: 'Home',
    path: '/'
  },
  {
    route: 'Groups',
    path: ''
  },
  {
    route: 'Exercises',
    path: ''
  },
  {
    route: 'Tracking',
    path: ''
  },
  {
    route: 'Diet',
    path: ''
  },
  {
    route: 'Contact',
    path: ''
  },
  {
    route: 'About',
    path: ''
  },
  {
    route: 'FAQ',
    path: ''
  },
  {
    route: 'Support',
    path: ''
  }
];