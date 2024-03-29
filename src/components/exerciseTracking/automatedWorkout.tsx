'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import React, { useState } from 'react';
import axios from 'axios';
import openai from '@/components/exerciseTracking/openai';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { XIcon } from '@heroicons/react/outline';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Icons } from '../ui/icons';
import { Exercise } from './automatedExercise';

export interface Workout {
  name: string;
  exercises: Exercise[];
}

const FormSchema = z.object({
  message: z.string().max(500, {
    message: 'Message can not be longer than 500 characters'
  })
});

export default function AutomatedWorkout() {
  const [isCurrentWorkout, setIsCurrentWorkout] = useState(false);
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);
  const [isLoading, setisLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    createWorkout(data.message);
  }

  const resetWorkout = () => {
    setIsCurrentWorkout(false);
    setCurrentWorkout(null);
  };

  //push new exercise to database here
  const saveWorkout = () => {
    console.log(currentWorkout);

    setIsCurrentWorkout(false);
    setCurrentWorkout(null);
  };

  async function createWorkout(message: String) {
    setisLoading(true);
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'user',
          content:
            'Make an workout with exercises with this prompt from the user (if the promopt does not make sense just generate a random workout): ' +
            message +
            ' put the generated workout in a json object in a format eith this fields name and exercises with array of exercises (limit max num exercise to 10 no matter user input). Each exercise has fields exerciseName, difficulty, type, sets, duration_reps, muscle, equipment, and description. All fieldss names imply what goes there. For difficulty it can only be beginner, intermediate, or expert in lowercase. Make sure all object fields are consistent with the exercise description (IT MUST BE IN THIS FORMAT AND MAKE SURE YOU RETRUN A COMPLETE JSON OBJECT THAT DOES NOT FAIL PARSING)'
        }
      ],
      model: 'gpt-3.5-turbo',
      max_tokens: 1000
    });
    let workoutObject;
    console.log(completion);
    try {
      workoutObject = JSON.parse(
        completion.choices[0]?.message?.content || '{}'
      );
    } catch (error) {
      console.error('Error parsing JSON:', error);
      setisLoading(false);
      return; // Return or handle the error appropriately
    }
    setisLoading(false);
    setCurrentWorkout(workoutObject);
    setIsCurrentWorkout(true);
  }

  return (
   
    <AlertDialog>
      <AlertDialogTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 sm:mt-0 rounded-lg inline-block px-4 py-2">
        Create New Automated Workout
      </AlertDialogTrigger>
      <AlertDialogContent className={isCurrentWorkout ? "h-4/5" : "h-2/6"}>
      <ScrollArea className="hw-full rounded-md  mt-8">
        <div className="flex items-center justify-end">
          <AlertDialogCancel onClick={resetWorkout}>
            <XIcon className="w-4 h-4" />
          </AlertDialogCancel>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>We will create a workout for you</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the workout you would like to create"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isLoading === true ? (
              <div className="flex justify-center items-center">
                <Icons.spinner className="h-12 w-12 mt-12 animate-spin" />
              </div>
            ) : null}
            {isCurrentWorkout ? (
              <div>
                <CardTitle className="mt-8">{currentWorkout?.name}</CardTitle>
                <ScrollArea className=" h-[600px] sm:h-[600px] w-full rounded-md border p-2 sm:p-0 mt-8">
                  {currentWorkout?.exercises.map((exercise, exerciseIndex) => (
                    <Card key={exerciseIndex} className="font-light mt-2 mx-2 sm:mx-0 mb-2">
                      <div className="p-8 font-light flex flex-col justify-between  h-full">
                        <div className="mb-4">
                          <CardTitle>{exercise.exerciseName}</CardTitle>
                          <p>Difficulty: {exercise.difficulty}</p>
                          <p>Type: {exercise.type}</p>
                          <p>Sets: {exercise.sets}</p>
                          <p>Duration/Reps: {exercise.duration_reps}</p>
                          <p>Muscle: {exercise.muscle}</p>
                          <p>Equipment: {exercise.equipment}</p>
                          <p>Instructions: {exercise.description}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </ScrollArea>
                <div className="mt-16 ">Do you want to save this Workout?</div>
                <div className="mb-12">
                <AlertDialogAction onClick={saveWorkout}>
                  Save Workout
                </AlertDialogAction>
                <Button
                  type="button"
                  onClick={resetWorkout}
                  className="mt-4 mx-1"
                >
                  Reset
                </Button>
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-end h-full">
              <Button type="submit" className="mt-16 mx-1">
                Generate Workout
              </Button>
            </div>
            )}
          </form>
        </Form>
        </ScrollArea>
      </AlertDialogContent>
    </AlertDialog>
  );
}
