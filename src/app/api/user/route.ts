import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { firstname, email, username, password } = (await req.json()) as {
      firstname: string;
      email: string;
      username: string;
      password: string;
    };

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });
  
    if (existingUser) {
      return new Response(
        JSON.stringify({
          status: 'error',
          message: 'User already exists'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
  
    const hashed_password = await hash(password, 12);
  
    const user = await prisma.user.create({
      data: {
        name: firstname,
        email: email.toLowerCase(),
        username: username,
        password: hashed_password
      }
    });
  
    return new NextResponse(
      JSON.stringify({
        status: 'success',
        message: 'User registered successfully.',
        user: {
          name: user.name,
          email: user.email,
          username: user.username
        }
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: 'error',
        message: error.message
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function PUT(req: Request) {
  try {

    const { userId, username, bio } = (await req.json()) as {
      userId: string | undefined;
      username: string | undefined;
      bio: string | undefined;
    };

    console.log(userId, username, bio);

    const updateUser = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        bio: bio,
        username: username
      }
    });
     if (updateUser) {
      return new NextResponse(
        JSON.stringify({
          status: 'success',
          message: 'User updated successfully.',
          user: {
            username,
            bio
          }
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error: any) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({
        status: 'error',
        message: error.message
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}