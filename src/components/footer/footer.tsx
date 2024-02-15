'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

export default function Footer() {
  const pathname = usePathname();

  return (

    <div className="mt-auto bg-gray-100">
      <footer className=" w-full mx-auto max-w-screen-xl p-6 md:py-8">
        <div className="flex flex-col lg:flex-row mx-auto items-center justify-between">
          <Link href="/">
            <h1 className="sm:text-center mb-8 text-2xl font-bold lg:mb-0 lg:mr-8">
              GatorGains
            </h1>
          </Link>
          <ul className="mb-0 md:w-auto grid grid-cols-4 gap-x-4 md:gap-x-48 gap-y-2 items-center">
            {footerLinks.map((link) => (
              <li key={link.route}>
                <Link href={link.path}                   className={cn(
                    'mr-4 transition-colors hover:text-foreground/80 hover:underline md:mr-6',
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
        <hr className="my-6 text-muted-foreground mx-auto " />
        <span className="block text-sm text-muted-foreground text-center">
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