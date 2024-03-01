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

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import exerciseData from '@/components/exerciseTracking/workoutData';

export default function WorkoutCard() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-around mt-12">
        <AlertDialog>
          <AlertDialogTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 sm:mt-0 rounded-lg inline-block px-4 py-2">
            Create New Custom Workout
          </AlertDialogTrigger>
        </AlertDialog>

        <AlertDialog>
          <AlertDialogTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 sm:mt-0 rounded-lg inline-block px-4 py-2">
            Create New Automated Workout
          </AlertDialogTrigger>
        </AlertDialog>
      </div>
      <h1 className="text-3xl font-bold text-primary text-center my-6 lg:text-4xl">
        Your Workouts
      </h1>
      <ScrollArea className=" h-[800px] sm:h-[850px] w-full rounded-md border p-4 ">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <div className="flex flex-row justify-between">
            <AccordionTrigger>Workout 1 </AccordionTrigger>
            <div>
            <Button className="mx-2 mt-2">Edit</Button>
            <Button className="mx-2 mt-2">Delete</Button>
            </div>
            </div>
            <AccordionContent>
         
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                    </div>
                  </Card>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <div className="flex flex-row justify-between">
            <AccordionTrigger>Workout 2 </AccordionTrigger>
            <div>
            <Button className="mx-2 mt-2">Edit</Button>
            <Button className="mx-2 mt-2">Delete</Button>
            </div>
            </div>
            <AccordionContent>
         
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                    </div>
                  </Card>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <div className="flex flex-row justify-between">
            <AccordionTrigger>Workout 3 </AccordionTrigger>
            <div>
            <Button className="mx-2 mt-2">Edit</Button>
            <Button className="mx-2 mt-2">Delete</Button>
            </div>
            </div>
            <AccordionContent>
         
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                    </div>
                  </Card>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ScrollArea>
    </div>
  );
}
