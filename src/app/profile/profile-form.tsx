'use client';

import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { cn } from '@/lib/utils';
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
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { prisma } from '@/lib/prisma';
import { useRouter } from 'next/navigation';

interface SessionProps {
  email: string;
}

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.'
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.'
    }),

  bio: z.string().max(160).min(4)
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.


export function ProfileForm({userName, userBio, userId}: {userName: string, userBio: string, userId: string}) {

  const router = useRouter();

  const defaultValues: Partial<ProfileFormValues> = {
    bio: userBio,
    username: userName
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange'
  });

  async function onSubmit(data: ProfileFormValues) {
    const { bio, username } = data;

    const res = await fetch('/api/user', {
      method: 'PUT',
      body: JSON.stringify({ userId, username, bio }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    toast({
      title: 'Success!',
      description: (
        <p>Your profile was succesfully updated!</p>
      )
    });

    router.refresh();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Information about yourself"
                  className="resize-none text-base"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Other users will be able to see your bio.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  );
}
