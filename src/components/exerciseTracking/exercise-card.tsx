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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import React, { useState } from 'react';
import { useToast } from '../ui/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import workoutData from '@/components/exerciseTracking/workoutData';
import exerciseData from '@/components/exerciseTracking/exerciseData';
import { XIcon } from '@heroicons/react/outline';
import AutomatedExercise from '@/components/exerciseTracking/automatedExercise';

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

const formSchema = z.object({
  exerciseName: z.string().min(1, {
    message: 'You need to enter a Exercise Name'
  }),
  difficulty: z.string().optional(),
  type: z.string().optional(),
  sets: z.string().optional(),
  duration_reps: z.string().optional(),
  muscle: z.string().optional(),
  equipment: z.string().optional(),
  description: z.string().optional()
});

export default function ExerciseCard() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      exerciseName: '',
      difficulty: '',
      type: '',
      sets: '',
      duration_reps: '',
      muscle: '',
      equipment: '',
      description: ''
    }
  });

  async function onSubmitCustom(values: z.infer<typeof formSchema>) {
    //post new exercises here

    console.log(values);
  }

  async function onSubmitEdit(values: z.infer<typeof formSchema>) {
    //edit exercises here

    console.log(values);
  }

  const handleCustomClick = () => {
    form.reset({
      exerciseName: '',
      difficulty: '',
      type: '',
      sets: '',
      duration_reps: '',
      muscle: '',
      equipment: '',
      description: ''
    }); // Reset form to blank values
  };

  const handleEditClick = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    console.log(exercise);
    form.reset({
      exerciseName: exercise.exerciseName,
      difficulty: exercise.difficulty,
      type: exercise.type,
      sets: exercise.sets,
      duration_reps: exercise.duration_reps,
      muscle: exercise.muscle,
      equipment: exercise.equipment,
      description: exercise.description
    }); // Update default values for the form
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-around mt-12">
        <AlertDialog>
          <AlertDialogTrigger
            className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 sm:mt-0 rounded-lg inline-block px-4 py-2"
            onClick={handleCustomClick}
          >
            Create New Custom Exercise
          </AlertDialogTrigger>
          <AlertDialogContent >
            <ScrollArea className=" h-[800px] sm:h-[850px] w-full rounded-md border">
              <div className="my-12">
                <div className="flex items-center justify-end">
                  <AlertDialogCancel>
                    <XIcon className="w-4 h-4" />
                  </AlertDialogCancel>
                </div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmitCustom)}
                    className="space-y-1"
                  >
                    <FormField
                      control={form.control}
                      name="exerciseName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Exercise Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Exercise Name" {...field} />
                          </FormControl>
                          <FormDescription>
                            (your name for the exercise){' '}
                            <span className="text-red-600">(required)</span>
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="difficulty"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Difficulty</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select exercise difficulty" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="beginner">beginner</SelectItem>
                              <SelectItem value="intermediate">
                                intermediate
                              </SelectItem>
                              <SelectItem value="expert">expert</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            (select the difficulty level of the exercise)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Exercise Type</FormLabel>
                          <FormControl>
                            <Input placeholder="Exercise Type" {...field} />
                          </FormControl>
                          <FormDescription>
                            (cardio, lifting, streching, abs, etc.)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="sets"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sets</FormLabel>
                          <FormControl>
                            <Input placeholder="Sets" {...field} />
                          </FormControl>
                          <FormDescription>
                            (number of sets for the exercise)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="duration_reps"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Durations/Reps</FormLabel>
                          <FormControl>
                            <Input placeholder="Duration/Reps" {...field} />
                          </FormControl>
                          <FormDescription>
                            (duration or number of repetitions)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="muscle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Muscle</FormLabel>
                          <FormControl>
                            <Input placeholder="Muscle" {...field} />
                          </FormControl>
                          <FormDescription>
                            {' '}
                            (primary muscle targeted by the exercise)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="equipment"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Equipment</FormLabel>
                          <FormControl>
                            <Input placeholder="Equipment" {...field} />
                          </FormControl>
                          <FormDescription>
                            (equipment required for this exercise (e.g.,
                            dumbbell, barbell, resistance band))
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Description"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            (brief description of the exercise)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {form.formState.isValid && (
                      <AlertDialogAction type="submit">
                        Submit
                      </AlertDialogAction>
                    )}
                  </form>
                </Form>
              </div>
            </ScrollArea>
          </AlertDialogContent>
        </AlertDialog>
        <AutomatedExercise>
          
        </AutomatedExercise>

      </div>

      <h1 className="text-3xl font-bold text-primary text-center my-6 lg:text-4xl">
        Your Exercises
      </h1>
      <ScrollArea className="p-3 h-[800px] sm:h-[850px] w-full rounded-md border  mx-0">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {exerciseData.exercises.map((exercise, index) => (
            <Card key={index} className="font-light">
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
                <div className="flex flex-row justify-center mt-auto">
                  <AlertDialog>
                    <AlertDialogTrigger
                      className="bg-primary text-primary-foreground hover:bg-primary/90 mx-2 rounded-lg inline-block px-4 py-2"
                      onClick={() => handleEditClick(exercise)} // Assuming handleEditClick is your event handler function
                    >
                      Edit
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <ScrollArea className="h-[800px] sm:h-[850px] w-full rounded-md border p-4 ">
                        <div className="my-12">
                          <div className="flex items-center justify-end">
                            <AlertDialogCancel>
                              <XIcon className="w-4 h-4" />
                            </AlertDialogCancel>
                          </div>
                          <Form {...form}>
                            <form
                              onSubmit={form.handleSubmit(onSubmitEdit)}
                              className="space-y-1"
                            >
                              <FormField
                                control={form.control}
                                name="exerciseName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Exercise Name</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Exercise Name"
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
                              <FormField
                                control={form.control}
                                name="difficulty"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Difficulty</FormLabel>
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select exercise difficulty" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="beginner">
                                          beginner
                                        </SelectItem>
                                        <SelectItem value="intermediate">
                                          intermediate
                                        </SelectItem>
                                        <SelectItem value="expert">
                                          expert
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormDescription>
                                      (select the difficulty level of the
                                      exercise)
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Exercise Type</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Exercise Type"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormDescription>
                                      (cardio, lifting, streching, abs, etc.)
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="sets"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Sets</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Sets" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                      (number of sets for the exercise)
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="duration_reps"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Durations/Reps</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Duration/Reps"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormDescription>
                                      (duration or number of repetitions)
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="muscle"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Muscle</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Muscle" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                      {' '}
                                      (primary muscle targeted by the exercise)
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="equipment"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Equipment</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Equipment"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormDescription>
                                      (equipment required for this exercise
                                      (e.g., dumbbell, barbell, resistance
                                      band))
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                      <Textarea
                                        placeholder="Description"
                                        className="resize-none"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormDescription>
                                      (brief description of the exercise)
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              {form.formState.isValid && (
                                <AlertDialogAction type="submit">
                                  Submit
                                </AlertDialogAction>
                              )}
                            </form>
                          </Form>
                        </div>
                      </ScrollArea>
                    </AlertDialogContent>
                  </AlertDialog>
                  <AlertDialog>
                    <AlertDialogTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 mx-2 rounded-lg inline-block px-4 py-2">
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
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
