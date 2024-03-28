"use server"

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
import GroupContent from './joinGroup';

export default async function IndLeaderBoard() {
  const session = await getServerSession(authOptions);

  // This will be where we calculate scores somehow in a bit and rank users
  async function getAllGroups() {
    const groups = await prisma.group.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return groups;
  }

  const topGroups = await getAllGroups();

  if (!topGroups) {
    return <p>Leaderboard is empty</p>;
  } else {
    return (
      <div className="container my-6 space-y-6">
        <GroupContent groups={topGroups}></GroupContent>
      </div>
    );
  }
}
