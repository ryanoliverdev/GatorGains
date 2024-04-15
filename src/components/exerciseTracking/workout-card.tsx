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
import React, { useState, useEffect, BaseSyntheticEvent } from 'react';
import { useToast } from '../ui/use-toast';
import { ToastAction } from '@radix-ui/react-toast';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { XIcon } from '@heroicons/react/outline';
import { Command } from 'cmdk';
import Select from 'react-select';
import AutomatedWorkout from '@/components/exerciseTracking/automatedWorkout';
import { MultiValue, ActionMeta } from 'react-select';
import { Workout } from '@/components/exerciseTracking/automatedWorkout';
import { getUserExercises, getAllWorkouts, saveCustomWorkout, updateWorkout, deleteWorkout } from '@/app/exercises/exerciseActions';

import ValueType from 'react-select';
const formSchema = z.object({
  workoutName: z.string().min(1, {
    message: 'You need to enter a Workout Name'
  })
});

export default function WorkoutCard({ session }: { session: any }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workoutName: ''
    }
  });

  async function onSubmitCustom(values: z.infer<typeof formSchema>) {
    const workoutDetails = {
      workoutName: values.workoutName,
      exercises: selected.map(ex => ({
        exerciseName: ex.label
      }))
    };
    saveCustomWorkout(session.user.id, workoutDetails);
    setChangesMade(false);
  }

  async function onSubmitEdit(values: z.infer<typeof formSchema>, oldWorkoutName: string) {
    const workoutDetails = {
      workoutName: values.workoutName,
      exercises: selected.map(ex => {
        return { exerciseName: ex.label };
      }),
    };
    updateWorkout(session.user.id, oldWorkoutName, workoutDetails);

    console.log(values);
    console.log(selected);
    setChangesMade(false);
  }

  const handleSubmitEdit = (oldWorkoutName: string) => async (values: z.infer<typeof formSchema>, event?: BaseSyntheticEvent) => {
    await onSubmitEdit(values, oldWorkoutName);
    event?.preventDefault();
  };
  const handleCustomClick = () => {
    form.reset({
      workoutName: ''
    }); // Reset form to blank values
  };

  interface SelectedOption {
    value: string;
    label: string;
  }

  const handleEditClick = (workout: any) => {
    form.reset({
      workoutName: workout.workoutName
    }); // Update default values for the form
  };

  const handleExitClick = () => {
    setChangesMade(false);
  };

  const [selected, setSelected] = useState<SelectedOption[]>([]);
  const [changesMade, setChangesMade] = useState(false);
  const [userWorkout, setUserWorkout] = useState<any[]>([]);
  const [userExercises, setUserExercises] = useState<any[]>([]);

  const options = userExercises!.map(workout => ({
    value: workout.exerciseName,
    label: workout.exerciseName
  }));

  const handleSelectChange = (
    newValue: MultiValue<{ value: string; label: string }>,
    actionMeta: ActionMeta<{ value: string; label: string }>
  ) => {
    if (
      actionMeta.action === 'select-option' ||
      actionMeta.action === 'remove-value'
    ) {
      setSelected(newValue as SelectedOption[]);
      setChangesMade(true);
    }
  };

  useEffect(() => {
    const retreiveUserWorkouts = async (userId: string) => {
      try {
        const workouts = await getAllWorkouts(userId);
        setUserWorkout(workouts);
        const exercises = await getUserExercises(userId);
        setUserExercises(exercises);
      } catch (error) {
        console.error('Failed to retrieve exercises for user', error);
        throw error;
      }
    }
    retreiveUserWorkouts(session.user.id);
  }, []);

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
          <AlertDialogContent className="h-auto">
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
                  <div className="">
                    <h1>Select Exercises in Workout</h1>
                    <Select
                      options={options}
                      isMulti
                      className="basic-multi-select mb-12"
                      classNamePrefix="select"
                      onChange={handleSelectChange}
                    />
                  </div>
                  <AlertDialogAction
                    type="submit"
                    disabled={!form.formState.isValid || !changesMade}
                  >
                    Submit
                  </AlertDialogAction>
                </form>
              </Form>
          </AlertDialogContent>
        </AlertDialog>
        <AutomatedWorkout session={session}></AutomatedWorkout>
      </div>
      <h1 className="text-3xl font-bold text-primary text-center my-6 lg:text-4xl">
        Your Workouts
      </h1>
      <ScrollArea className="p-6 h-[800px] sm:h-[850px] w-full rounded-md border mb-8 ">
        <Accordion type="single" collapsible className="w-full">
          {userWorkout.map((workout, index) => (
            <div key={index} className="my-2 sm:m-auto">
              <AccordionItem
                className="mt-0"
                key={index}
                value={`item-${index}`}
              >
                <div className="flex flex-row justify-between">
                  <AccordionTrigger
                    className={`overflow-hidden ${workout.workoutName!.length > 20 && !/\s/.test(workout.workoutName!) ? 'break-all' : ''} w-40 sm:w-auto`}
                  >
                    {workout.workoutName}
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
                            onSubmit={form.handleSubmit(handleSubmitEdit(workout.workoutName))} 
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

                            <div className="">
                              <h1>Select Exercises in Workout</h1>

                              <Select
                                options={options}
                                isMulti
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={handleSelectChange}
                                defaultValue={workout!.ExerciseEntry.map(
                                  (exercise: { exerciseName: any; }) => ({
                                    value: exercise.exerciseName,
                                    label: exercise.exerciseName
                                  })
                                )}
                              />
                            </div>
                            <AlertDialogAction
                              type="submit"
                              disabled={!form.formState.isValid || !changesMade}
                            >
                              Submit
                            </AlertDialogAction>
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
                          <AlertDialogAction onClick={async () => deleteWorkout(session.user.id, workout.workoutName)}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {workout.ExerciseEntry.map((entry: any) => (
                      <Card key={entry.exercise.id} className="font-light">
                        <div className="p-8 font-light flex flex-col justify-between h-full">
                          <div className="mb-4">
                            <CardTitle>{entry.exercise.exerciseName}</CardTitle>
                            <p>Difficulty: {entry.exercise.difficulty}</p>
                            <p>Type: {entry.exercise.type}</p>
                            <p>Sets: {entry.exercise.sets}</p>
                            <p>Duration/Reps: {entry.exercise.duration_reps}</p>
                            <p>Muscle: {entry.exercise.muscle}</p>
                            <p>Equipment: {entry.exercise.equipment}</p>
                            <p>Instructions: {entry.exercise.description}</p>
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
