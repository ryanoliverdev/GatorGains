'use server';

import { prisma } from '@/lib/prisma';
import { redirect, useRouter } from 'next/navigation';

// Server Action
export async function createGroup(
  name: string,
  description: string,
  emoji: string,
  userId: string
) {
  // Create a new group

  const findUser = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });

  if (findUser === null || findUser.username === null) return redirect('/');

  const newGroup = await prisma.group.create({
    data: {
      name: name,
      description: description,
      emojiLogo: emoji,
      groupLeaderId: userId,
      groupLeaderName: findUser.username
    }
  });

  const updatedGroup = await prisma.group.update({
    where: {
      id: newGroup.id
    },
    data: {
      users: {
        connect: {
          id: userId
        }
      }
    }
  });

  redirect(`/groups/view/${updatedGroup.id}`);
}

export async function joinGroup(groupId: string, userId: string) {
  // Join a group
  const findGroup = await prisma.group.findUnique({
    where: {
      id: groupId
    }
  });

  if (findGroup === null) return redirect('/');

  await prisma.group.update({
    where: {
      id: groupId
    },
    data: {
      users: {
        connect: {
          id: userId
        }
      }
    }
  });

  redirect(`/groups/view/${groupId}`);
}

export async function sendMessage(
  groupId: string,
  userId: string,
  message: string
) {
  // Send a message to a group

  const findUser = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });

  if(findUser === null || findUser.username === null) return redirect('/');

  const findGroup = await prisma.group.findUnique({
    where: {
      id: groupId
    }
  });

  if (findGroup === null) return redirect('/');

  await prisma.message.create({
    data: {
      content: message,
      groupId: groupId,
      userId: userId,
      usersName: findUser.username
    }
  });
}
