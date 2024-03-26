'use server';

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

// Server Action
export async function createGroup(name: string, description: string, userId: string) {
  // Create a new group
  const newGroup = await prisma.group.create({
    data: {
      name: name,
      description: description,
      groupLeader: userId

    }
  });

  redirect('/dashboard')
}
