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