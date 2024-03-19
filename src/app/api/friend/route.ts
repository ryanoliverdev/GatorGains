import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request, res: NextApiResponse) {
    const { userId, friendId } = (await req.json()) as {
        userId: string;
        friendId: string;
    };
    try {
      const existingFriend = await prisma.friend.findUnique({
        where: {
          userId_friendId: {
            userId,
            friendId,
          },
        },
      });

      if (existingFriend) {
        return new Response(
            JSON.stringify({
              status: 'error',
              message: 'Friend relationship already exists'
            }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
          );
      }
      
      const newFriend = await prisma.friend.create({
        data: {
          userId,
          friendId,
        },
      });
      return new Response(
        JSON.stringify({
          status: 'success',
          message: 'Friend added successfully.',
          friend: {
            user: newFriend.userId,
            friend: newFriend.friendId
          }
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } catch (error: any) {
        console.error(error);
        return new Response(
            JSON.stringify({
              status: 'error',
              message: 'Something wrong'
            }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
          );
    }
}