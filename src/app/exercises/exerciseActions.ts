'use server';

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Exercise } from '@/components/exerciseTracking/automatedExercise';

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