'use server';

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Exercise } from '@/components/exerciseTracking/automatedExercise';
import { format } from 'date-fns';

export async function createExerciseForUser(userId: string, exerciseDetails: Exercise) {
    try {
        const exercise = await prisma.exercise.create({
            data: {
                ...exerciseDetails,
                sets: exerciseDetails.sets!.toString(),
                user: { connect: { id: userId } }
            },
        });
        return exercise;
    } catch (error) {
        console.error("Failed to create exercise for user:", error);
        throw error;
    }
}

export async function editExerciseForUser(userId: string, exerciseId: string, exerciseDetails: Exercise) {
    try {
        if (exerciseDetails.sets) {
            exerciseDetails.sets = exerciseDetails.sets.toString();
        }
        console.log(userId, exerciseDetails.exerciseName);
        const updatedExercise = await prisma.exercise.update({
            where: {
                userId: userId,
                id: exerciseId
            },
            data: {
                ...exerciseDetails
            },
        });
        return updatedExercise;
    } catch (error) {
        console.error("Failed to update exercise:", error);
        throw error;
    }
}

export async function deleteExerciseForUser(exerciseId: string) {
    try {
        const deletedExercise = await prisma.exercise.delete({
            where: {
                id: exerciseId,
            },
        });
        return deletedExercise;
    } catch (error) {
        console.error("Failed to delete exercise:", error);
        throw error;
    }
}

export async function getUserExercises(userId: string): Promise<Exercise[]>{
    try {
        const exercises = await prisma.exercise.findMany({
            where: {
                userId: userId,
            },
        });
        return exercises;
    } catch (error) {
        console.error("Failed to retrieve exercises for user", error);
        throw error;
    }
}

export async function getExerciseByName(userId: string, exerciseName: string) {
    try {
        const exercise = await prisma.exercise.findFirst({
            where: {
                userId: userId,
                exerciseName: exerciseName,
            },
        });
        return exercise;
    } catch (error) {
        console.error("Failed to retrieve exercise by name", error);
        throw error;
    }
}

export async function saveWorkoutForUser(userId: string, workoutDetails: any) {
    const exerciseNames = [];
  for (const exercise of workoutDetails.exercises) {
    let exerciseRecord = await prisma.exercise.findFirst({
      where: {
        exerciseName: exercise.exerciseName,
        userId: userId,
      },
    });

    if (!exerciseRecord) {
      exerciseRecord = await prisma.exercise.create({
        data: {
          userId: userId,
          exerciseName: exercise.exerciseName,
          difficulty: exercise.difficulty,
          duration_reps: exercise.duration_reps.toString(),
          equipment: exercise.equipment,
          muscle: exercise.muscle,
          sets: exercise.sets.toString(),
          type: exercise.type
        },
      });
    }

    exerciseNames.push(exerciseRecord.exerciseName);
  }

  const workout = await prisma.workout.create({
    data: {
      workoutName: workoutDetails.name,
      userId: userId,
      workoutDate: format(new Date(), 'MM-dd-yyyy')
    },
  });

  for (const exerciseName of exerciseNames) {
    await prisma.exerciseEntry.create({
      data: {
        workoutId: workout.id,
        exerciseName: exerciseName
      },
    });
  }
}

export async function getAllWorkouts(userId: string) {
    try {
        const workouts = await prisma.workout.findMany({
            where: {
                userId: userId,
            },
            include: {
                ExerciseEntry: {
                    include: {
                        exercise: true,
                    },
                },
            },
        });
        return workouts;
    } catch (error) {
        console.error("Failed to retrieve workouts for user", error);
        throw error;
    }
}

export async function saveCustomWorkout(userId: string, workoutDetails: any) {
    try {
        const result = await prisma.$transaction(async (prisma) => {
            const workout = await prisma.workout.create({
                data: {
                    userId: userId,
                    workoutName: workoutDetails.workoutName,
                    workoutDate: format(new Date(), 'MM-dd-yyyy')
                },
            });

            for (const selectedExercise of workoutDetails.exercises) {
                const exerciseName = selectedExercise.exerciseName;
                const exercise = await getExerciseByName(userId, exerciseName);

                if (!exercise) {
                    console.error('Exercise not found:', exerciseName);
                    throw new Error('Exercise not found');
                }

                await prisma.exerciseEntry.create({
                    data: {
                        workoutId: workout.id,
                        exerciseName: exerciseName,
                    },
                });
            }
            return workout;
        });

        console.log('Workout and exercises saved successfully:', result);
        return result;
    } catch (error) {
        console.error('Failed to save custom workout', error);
        throw error;
    }
}