'use client';

import { getServerSession } from 'next-auth/next';
import { Session } from 'next-auth';
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
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { prisma } from '@/lib/prisma';
import { redirect, useRouter } from 'next/navigation';
import { createGroup } from '../groupActions';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.'
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.'
    }),

  bio: z.string().max(160).min(4),
  emoji: z.string().min(1, {
    message: 'Please select an emoji.'
  })
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function CreateGroupForm({ session }: { session: Session }) {
  const user = session.user;

  const defaultValues: Partial<ProfileFormValues> = {
    bio: '',
    username: '',
    emoji: ''
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange'
  });

  async function onSubmit(data: ProfileFormValues) {
    const { bio, username, emoji } = data;

    createGroup(username, bio, emoji, user.id);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Group Name</FormLabel>
                <FormControl>
                  <Input placeholder="Group" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public group name. This can&apos;t be changed and
                  will be seen by everyone.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="emoji"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Group Logo</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a group emoji to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="🏋️">🏋️</SelectItem>
                    <SelectItem value="💪">💪</SelectItem>
                    <SelectItem value="💯">💯</SelectItem>
                    <SelectItem value="🔥">🔥</SelectItem>
                    <SelectItem value="👌">👌</SelectItem>
                    <SelectItem value="⚡">⚡</SelectItem>
                    <SelectItem value="💸">💸</SelectItem>
                    <SelectItem value="🧗‍♀️">🧗‍♀️</SelectItem>
                    <SelectItem value="🏃">🏃</SelectItem>
                    <SelectItem value="🌊">🌊</SelectItem>


                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Group Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Information about your group"
                    className="resize-none text-base"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Other users will be able to see your group description.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Create Group</Button>
        </form>
      </Form>
    </div>
  );
}
