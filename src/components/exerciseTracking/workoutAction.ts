'use server';

import { prisma } from '@/lib/prisma';;
import { format } from 'date-fns';

async function addExerciseToTodayWorkout(userId: string, exerciseName: string, workoutDate: string | Date) {
    const formattedDate = typeof workoutDate === 'string' ? workoutDate : format(workoutDate, 'MM-dd-yyyy');

    let workout = await prisma.workout.findFirst({
      where: {
        userId: userId,
        workoutDate: formattedDate,
      },
    });
  
    if (!workout) {
      workout = await prisma.workout.create({
        data: {
          userId: userId,
          workoutDate: formattedDate,
        },
      });
    }

    const exercise = await prisma.exercise.findFirst({
        where: {
            userId: userId,
            exerciseName: exerciseName,
        },
    });
  
    if (!exercise) {
      return new Error("Exercise not found");
    }
    
    const exerciseEntry = await prisma.exerciseEntry.create({
        data: {
          workout: {
            connect: { id: workout.id }
          },
          exercise: {
            connect: { exerciseName: exercise.exerciseName }
          }
        }
    });

    return exerciseEntry;
}