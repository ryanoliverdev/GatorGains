'use server';

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

// Server Action
export async function createGroup(
  name: string,
  description: string,
  userId: string
) {
  // Create a new group

  const findName = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });

  if (findName === null || findName.username === null) return redirect('/');

  const newGroup = await prisma.group.create({
    data: {
      name: name,
      description: description,
      groupLeaderId: userId,
      groupLeaderName: findName.username
    }
  });

  redirect('/dashboard');
}
