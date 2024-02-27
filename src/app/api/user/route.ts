import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { firstname, email, password } = (await req.json()) as {
      firstname: string;
      email: string;
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
        password: hashed_password
      }
    });
  
    return new NextResponse(
      JSON.stringify({
        status: 'success',
        message: 'User registered successfully.',
        user: {
          name: user.name,
          email: user.email
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
    const { email, bio } = (await req.json()) as {
      email: string | undefined;
      bio: string | undefined;
    };
    const updateUser = await prisma.user.update({
      where: {
        email
      },
      data: {
        bio
      }
    });
     if (updateUser) {
      return new NextResponse(
        JSON.stringify({
          status: 'success',
          message: 'User updated successfully.',
          user: {
            email,
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