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
        const updatedExercise = await prisma.exercise.update({
            where: {
              id_userId: {
                userId: userId,
                id: exerciseId
              }
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

export async function deleteExerciseForUser(userId: string, exerciseId: string) {
    try {
        const result = await prisma.$transaction(async prisma => {
            const exercise = await prisma.exercise.findUnique({
              where: {
                id_userId: {
                  id: exerciseId,
                  userId: userId,
                }
              },
            });
      
            if (!exercise) {
              throw new Error('Exercise not found');
            }
            await prisma.exerciseEntry.deleteMany({
              where: {
                exerciseId: exercise.id,
                workout: {
                  userId: userId
                },
              },
            });
      
            const deletedExercise = await prisma.exercise.delete({
              where: {
                id_userId: {
                  id: exerciseId,
                  userId: userId,
                }
              },
            });
            return deletedExercise;
          });
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
  const exerciseIds: any[] = [];
  for (const exercise of workoutDetails.exercises) {
    let exerciseRecord = await prisma.exercise.findFirst({
      where: {
        userId: userId,
        exerciseName: exercise.exerciseName,
      },
      select: {
        id: true,
        userId: true
      }
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
          type: exercise.type,
          description: exercise.description,
        },
      });
    }

    exerciseIds.push({id: exerciseRecord.id, userId: exerciseRecord.userId });
  }

  const workout = await prisma.workout.create({
    data: {
      workoutName: workoutDetails.name,
      userId: userId,
      workoutDate: format(new Date(), 'MM-dd-yyyy')
    },
  });

  for (const { id, userId } of exerciseIds) {
    await prisma.exerciseEntry.create({
      data: {
        workoutId: workout.id,
        exerciseId: id,
        exerciseUserId: userId
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
                      exerciseId: exercise.id,
                      exerciseUserId: exercise.userId
                  },
              });
          }
            return workout;
        });

        console.log('Workout and exercises saved successfully:', result);
        return result;
    } catch (error) {
        console.error('Failed to save custom workout', error);
    }
}

export async function updateWorkout(userId: string, oldWorkoutName: string, updatedWorkoutDetails: any) {
    try {
      const result = await prisma.$transaction(async (prisma) => {
        const existingWorkout = await prisma.workout.findUnique({
          where: {
              userId,
              workoutName: oldWorkoutName,
          },
        });
  
        if (!existingWorkout) {
          throw new Error('Workout not found');
        }
  
        const updatedWorkout = await prisma.workout.update({
          where: {
            id: existingWorkout.id,
          },
          data: {
            workoutName: updatedWorkoutDetails.workoutName,
            workoutDate: format(new Date(), 'MM-dd-yyyy'),
          },
        });

        await prisma.exerciseEntry.deleteMany({
          where: {
            workoutId: existingWorkout.id,
          },
        });

        for (const selectedExercise of updatedWorkoutDetails.exercises) {
          const exerciseName = selectedExercise.exerciseName;
          const exercise = await getExerciseByName(userId, exerciseName);
          if (!exercise) {
            console.error('Exercise not found:', exerciseName);
            throw new Error('Exercise not found');
          }
          await prisma.exerciseEntry.create({
            data: {
              workoutId: updatedWorkout.id,
              exerciseId: exercise.id,
              exerciseUserId: userId
            },
          });
        }
  
        return updatedWorkout;
      });
  
      console.log('Workout updated successfully:', result);
      return result;
    } catch (error) {
      console.error('Failed to update workout', error);
      throw error;
    }
  }

  export async function deleteWorkout(userId: string, workoutName: string) {
    try {
      const result = await prisma.$transaction(async (prisma) => {
        const workout = await prisma.workout.findUnique({
          where: {
            userId,
            workoutName,
          },
        });
  
        if (!workout) {
          throw new Error('Workout not found');
        }

        await prisma.exerciseEntry.deleteMany({
          where: {
            workoutId: workout.id,
          },
        });

        const deletedWorkout = await prisma.workout.delete({
          where: {
            id: workout.id,
          },
        });
  
        return deletedWorkout;
      });
  
      console.log('Workout deleted successfully:', result);
      return result;
    } catch (error) {
      console.error('Failed to delete workout', error);
      throw error;
    }
  }