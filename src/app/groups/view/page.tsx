'use server';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { prisma } from '@/lib/prisma';
import GroupContent from './showGroups';

export default async function IndLeaderBoard() {
  const session = await getServerSession(authOptions);

  // This will be where we calculate scores somehow in a bit and rank users
  async function getAllUserGroups() {
    const groups = await prisma.user.findUnique({
      where: {
        id: session?.user.id
      },
      select: {
        groups: {
          select: {
            id: true,
            name: true,
            groupLeaderName: true,
            emojiLogo: true
          }
        }
      }
    });

    return groups;
  }

  const topGroups = await getAllUserGroups();

  if (session === null || topGroups === null) {
    return <p>No Access</p>;
  } else {
    return (
      <div className="container my-6 space-y-6">
        <GroupContent
          groups={topGroups.groups} // Update the type of the groups prop
          userId={session.user.id}
        ></GroupContent>
      </div>
    );
  }
}
