import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma'; 
import { format } from 'date-fns';
import { NextResponse } from 'next/server';

export async function POST(req: Request, { params }: { params: { userId: string } }, res: NextApiResponse) {
  try {
    const userId = params.userId as string;
    console.log(userId)
    const { foodName, calories, protein, carbs, fat } = await req.json() as {
      foodName: string;
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
    };

    const today = new Date();
    const formattedDate = format(today, 'MM/dd/yyyy');

    const foodItem = await prisma.foodItem.upsert({
      where: { foodName },
      update: {},
      create: {
        foodName,
        calories,
        protein,
        carbs,
        fat,
      },
    });

    const dailyFoodLog = await prisma.dailyFoodLog.upsert({
        where: { date: formattedDate },
        update: {}, 
        create: {
          userId,
          date: formattedDate,
        },
      });

    const foodEntry = await prisma.foodEntry.create({
      data: {
        dailyFoodLog: {
            connect: { id: dailyFoodLog.id },
          },
        foodItem: {
          connect: { id: foodItem.id },
        }
      },
    });
    return new NextResponse(
        JSON.stringify({
          status: 'success',
          message: 'Food log added successfully.',
          foodEntry
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

export async function GET(req: Request, { params }: { params: { userId: string } }, res: NextApiResponse) {
  try {
    const userId = params.userId as string;
    const { date } = await req.json() as { date: string };
    const result = await prisma.dailyFoodLog.findMany({
      where: {
        userId: userId,
        date: date,
      },
      select: {
        FoodEntry: {
          select: {
            foodItem: {
              select: {
                foodName: true,
                calories: true,
                protein: true,
                carbs: true,
                fat: true,
              },
            },
          },
        },
      },
    });
    return new NextResponse(
      JSON.stringify({
        status: 'success',
        message: 'Food log retrieved successfully.',
        result
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