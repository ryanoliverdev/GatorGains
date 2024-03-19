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
import { Icons } from '../ui/icons';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Exercise {
  exerciseName: string;
  difficulty: string;
  type: string;
  sets: string;
  duration_reps: string;
  muscle: string;
  equipment: string;
  description: string;
}

const FormSchema = z.object({
  message: z.string().max(500, {
    message: 'Message can not be longer than 500 characters'
  })
});

export default function AutomatedExercise() {
  const [isCurrentExercise, setIsCurrentExercise] = useState(false);
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [isLoading, setisLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    createExercise(data.message);
  }

  const resetExercise = () => {
    setIsCurrentExercise(false);
    setCurrentExercise(null);
  };

  //push new exercise to database here
  const saveExercise = () => {
    console.log(currentExercise);

    setIsCurrentExercise(false);
    setCurrentExercise(null);
  };

  async function createExercise(message: String) {
    setisLoading(true);
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'user',
          content:
            'Make an exercise with this prompt from the user (if the promopt does not make sense just generate a random exercise):' +
            message +
            '. put the generated exercise in a json object in a format eith this fields and order exerciseName, difficulty, type, sets, duration_reps, muscle, equipment, and description. All fieldss names imply what goes there. For difficulty it can only be beginner, intermediate, or expert in lowercase. Make sure all object fields are consistent with the description'
        }
      ],
      model: 'gpt-3.5-turbo',
      max_tokens: 500
    });
    let exerciseObject;
    try {
      exerciseObject = JSON.parse(
        completion.choices[0]?.message?.content || '{}'
      );
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return; // Return or handle the error appropriately
    }
    setisLoading(false);
    setCurrentExercise(exerciseObject);
    setIsCurrentExercise(true);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 sm:mt-0 rounded-lg inline-block px-4 py-2">
        Create New Automated Exercise
      </AlertDialogTrigger>
      <AlertDialogContent>
      <ScrollArea className=" h-[600px] sm:h-auto w-full rounded-md  mt-8">
        <div className="flex items-center justify-end">
          <AlertDialogCancel onClick={resetExercise}>
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
                  <FormLabel>We will create an exercise for you</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the exercise you would like to create"
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
            {isCurrentExercise ? (
              <div>
                <Card className="font-light mt-4">
                  <div className="p-8 font-light flex flex-col justify-between h-full">
                    <CardTitle className="mb-4">
                      {currentExercise?.exerciseName}
                    </CardTitle>
                    <p>Difficulty: {currentExercise?.difficulty}</p>
                    <p>Type: {currentExercise?.type}</p>
                    <p>Sets: {currentExercise?.sets}</p>
                    <p>Duration/Reps: {currentExercise?.duration_reps}</p>
                    <p>Muscle: {currentExercise?.muscle}</p>
                    <p>Equipment: {currentExercise?.equipment}</p>
                    <p>Instructions: {currentExercise?.description}</p>
                  </div>
                </Card>
                <div className="mt-16">Do you want to save this Exercise?</div>
                <AlertDialogAction onClick={saveExercise}>
                  Save Exercise
                </AlertDialogAction>
                <Button
                  type="button"
                  onClick={resetExercise}
                  className="mt-4 mx-1"
                >
                  Reset
                </Button>
              </div>
            ) : (
              <Button type="submit" className="mt-16 mx-1">
               Create Exercise
              </Button>
            )}
          </form>
        </Form>
        </ScrollArea>
      </AlertDialogContent>
    </AlertDialog>
  );
}
