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
    </div>
  );
}
