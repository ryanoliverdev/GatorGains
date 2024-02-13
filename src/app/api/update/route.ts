import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, bio } = (await req.json()) as {
      email: string | undefined;
      bio: string | undefined;
    };
    console.log({ email, bio });

    const updateUser = await prisma.user.update({
        where: {
          email
        },
        data: {
          bio
        },
    });
    if (updateUser) {
        return new NextResponse(
            JSON.stringify({
              status: 'success',
              message: 'User updated successfully.',
              user: {
                email,
                bio
              },
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
    )};
  } catch (error: any) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({
        status: 'error',
        message: error.message,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
