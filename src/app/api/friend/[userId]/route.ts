import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma'; 
import { format } from 'date-fns';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { userId: string } }) {
    try {
        const userId = params.userId as string;
        const user = await prisma.user.findUnique({
          where: {
            id: userId
          },
          include: {
            friends: {
              select: {
                friend: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        });
    
        if (!user) {
          return new Response(
            JSON.stringify({
              status: 'error',
              message: `User not found.`
            }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
          );
        }
        const friendNames = user.friends.map((friend) => friend.friend.name);
        return new Response(
            JSON.stringify({
              status: 'success',
              message: 'Friends retrieved successfully.',
              friend: {
                friendNames
              }
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
          );
      } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({
              status: 'error',
              message: `Server error.`
            }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
          );
      }
}