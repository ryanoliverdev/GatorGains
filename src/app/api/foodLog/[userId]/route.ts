import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { format } from 'date-fns';
import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
  { params }: { params: { userId: string } },
  res: NextApiResponse
) {
  try {
    const currUserId = params.userId as string;
    const { foodName, calories, protein, carbs, fat, servingSize } =
      (await req.json()) as {
        foodName: string;
        calories: number;
        protein: number;
        carbs: number;
        fat: number;
        servingSize: number;
      };
    const today = new Date();
    const formattedDate = format(today, 'MM-dd-yyyy');

    const foodItem = await prisma.foodItem.upsert({
      where: { foodName },
      update: {},
      create: {
        foodName,
        calories,
        protein,
        carbs,
        fat
      }
    });

    const dailyFoodLog = await prisma.dailyFoodLog.upsert({
      where: { userId_date: { userId: currUserId, date: formattedDate } },
      update: {},
      create: {
        userId: currUserId,
        date: formattedDate
      }
    });

    await prisma.user.update({
      where: { id: currUserId },
      data: {
        xp: {
          increment: 5 
        }
      }
    });

    const foodEntry = await prisma.foodEntry.create({
      data: {
        dailyFoodLog: {
          connect: { id: dailyFoodLog.id }
        },
        foodItem: {
          connect: { id: foodItem.id }
        },
        servingSize
      }
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

export async function GET(
  req: Request,
  { params }: { params: { userId: string } },
  res: NextApiResponse
) {
  try {
    const userId = params.userId as string;
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const date = searchParams.get('date') || format(new Date(), 'MM-dd-yyyy');
    const result = await prisma.dailyFoodLog.findMany({
      where: {
        userId,
        date
      },
      select: {
        FoodEntry: {
          select: {
            servingSize: true,
            foodItem: {
              select: {
                foodName: true,
                calories: true,
                protein: true,
                carbs: true,
                fat: true
              }
            }
          }
        }
      }
    });
    const adjustedResult = result.map((logEntry) => ({
      foodEntries: logEntry.FoodEntry.map((entry) => ({
        foodName: entry.foodItem.foodName,
        calories: entry.foodItem.calories * entry.servingSize,
        protein: entry.foodItem.protein * entry.servingSize,
        carbs: entry.foodItem.carbs * entry.servingSize,
        fat: entry.foodItem.fat * entry.servingSize,
        servingSize: entry.servingSize
      }))
    }));
    return new NextResponse(
      JSON.stringify({
        status: 'success',
        message: 'Food log retrieved successfully.',
        adjustedResult
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
