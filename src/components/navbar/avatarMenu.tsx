'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export function AvatarMenu({ options }: { options: any }) {
  if (options === null) {
    return null;
  } else if (options.user !== null) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="md:ml-3 shadow-md cursor-pointer">
            <AvatarImage src={options.user.image} alt="@shadcn" />
            <AvatarFallback>
              {options.user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/groups/create">Create Group</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/groups/find">Find Groups</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/groups/view">View Groups</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => signOut()}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
}
