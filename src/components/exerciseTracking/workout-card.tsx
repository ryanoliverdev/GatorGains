'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import React, { useState } from 'react';
import { useToast } from '../ui/use-toast';
import { ToastAction } from '@radix-ui/react-toast';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import workoutData from '@/components/exerciseTracking/workoutData';
import exerciseData from '@/components/exerciseTracking/exerciseData';
import { XIcon } from '@heroicons/react/outline';
import { Command } from 'cmdk';
import Select from 'react-select';
import AutomatedWorkout from '@/components/exerciseTracking/automatedWorkout';

import ValueType from 'react-select';
const formSchema = z.object({
  workoutName: z.string().min(1, {
    message: 'You need to enter a Workout Name'
  })
});

export default function WorkoutCard() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workoutName: ''
    }
  });

  async function onSubmitCustom(values: z.infer<typeof formSchema>) {
    //post new exercises here

    console.log(values);
    console.log(selected);
    setChangesMade(false);
  }

  async function onSubmitEdit(values: z.infer<typeof formSchema>) {
    //edit exercises here

    console.log(values);
    console.log(selected);
    setChangesMade(false);
  }

  const handleCustomClick = () => {
    form.reset({
      workoutName: ''
    }); // Reset form to blank values
  };

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

  interface Workout {
    name: string;
    exercises: Exercise[];
  }
  const handleEditClick = (workout: Workout) => {
    form.reset({
      workoutName: workout.name
    }); // Update default values for the form
  };

  const handleExitClick = () => {
    setChangesMade(false);
  };

  const options = exerciseData.exercises.map((exercise) => ({
    value: exercise.exerciseName,
    label: exercise.exerciseName
  }));

  const [selected, setSelected] = useState([]);
  const [changesMade, setChangesMade] = useState(false);

  const handleSelectChange = (selectedOptions) => {
    setSelected(selectedOptions);
    setChangesMade(true);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-around mt-12">
        <AlertDialog>
          <AlertDialogTrigger
            className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 sm:mt-0 rounded-lg inline-block px-4 py-2"
            onClick={handleCustomClick}
          >
            Create New Custom Workout
          </AlertDialogTrigger>
          <AlertDialogContent>
            <div className="flex items-center justify-end">
              <AlertDialogCancel>
                <div onClick={handleExitClick}>
                  <XIcon className="w-4 h-4" />
                </div>
              </AlertDialogCancel>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmitCustom)}
                className="space-y-1"
              >
                <FormField
                  control={form.control}
                  name="workoutName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Workout Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Workout Name" {...field} />
                      </FormControl>
                      <FormDescription>
                        (your name for the exercise){' '}
                        <span className="text-red-600">(required)</span>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="h-96">
                  <h1>Select Exercises in Workout</h1>
                  <Select
                    options={options}
                    isMulti
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={handleSelectChange}
                  />
                </div>
                {form.formState.isValid && changesMade && (
                  <AlertDialogAction type="submit">Submit</AlertDialogAction>
                )}
              </form>
            </Form>
          </AlertDialogContent>
        </AlertDialog>
        <AutomatedWorkout></AutomatedWorkout>
      </div>
      <h1 className="text-3xl font-bold text-primary text-center my-6 lg:text-4xl">
        Your Workouts
      </h1>
      <ScrollArea className=" h-[800px] sm:h-[850px] w-full rounded-md border ">
        <Accordion type="single" collapsible className="w-full">
          {workoutData.map((workout, index) => (
            <div key={index} className="my-2 sm:m-auto">
              <AccordionItem
                className="mt-0"
                key={index}
                value={`item-${index}`}
              >
                <div className="flex flex-row justify-between">
                  <AccordionTrigger
                    className={`overflow-hidden ${workout.name.length > 20 && !/\s/.test(workout.name) ? 'break-all' : ''} w-40 sm:w-auto`}
                  >
                    {workout.name}
                  </AccordionTrigger>
                  <div className="flex flex-row">
                    <AlertDialog>
                      <AlertDialogTrigger
                        className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg inline-block my-2 mr-1 py-1 px-2 sm:py-2 sm:px-4"
                        onClick={() => handleEditClick(workout)}
                      >
                        Edit
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <div className="flex items-center justify-end">
                          <AlertDialogCancel>
                            <div onClick={handleExitClick}>
                              <XIcon className="w-4 h-4" />
                            </div>
                          </AlertDialogCancel>
                        </div>
                        <Form {...form}>
                          <form
                            onSubmit={form.handleSubmit(onSubmitEdit)}
                            className="space-y-1"
                          >
                            <FormField
                              control={form.control}
                              name="workoutName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Workout Name</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Workout Name"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    (your name for the exercise){' '}
                                    <span className="text-red-600">
                                      (required)
                                    </span>
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <div className="h-96">
                              <h1>Select Exercises in Workout</h1>

                              <Select
                                options={options}
                                isMulti
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={handleSelectChange}
                                defaultValue={workout.exercises.map(
                                  (exercise) => ({
                                    value: exercise.exerciseName,
                                    label: exercise.exerciseName
                                  })
                                )}
                              />
                            </div>
                            {form.formState.isValid && changesMade && (
                              <AlertDialogAction type="submit">
                                Submit
                              </AlertDialogAction>
                            )}
                          </form>
                        </Form>
                      </AlertDialogContent>
                    </AlertDialog>
                    <AlertDialog>
                      <AlertDialogTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg inline-block my-2  py-1 px-2 sm:py-2 sm:px-4">
                        Delete
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure you want to delete this exercise?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {workout.exercises.map((exercise, exerciseIndex) => (
                      <Card key={exerciseIndex} className="font-light">
                        <div className="p-8 font-light flex flex-col justify-between h-full">
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
                  </div>
                </AccordionContent>
              </AccordionItem>
            </div>
          ))}
        </Accordion>
      </ScrollArea>
    </div>
  );
}
