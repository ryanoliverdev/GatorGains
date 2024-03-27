'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form';
import { useToast } from '../ui/use-toast';
import { signIn } from 'next-auth/react';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { format } from 'date-fns';
import { ToastAction } from '@radix-ui/react-toast';

const formSchema = z
  .object({
    firstname: z.string().min(1, {
      message: 'You need to enter a first name.'
    }),
    lastname: z.string().min(1, {
      message: 'You need to enter a last name.'
    }),
    username: z.string().min(5, {
      message: 'You need to enter a username over 5 characters.'
    }),
    email: z
      .string()
      .min(1, { message: 'This field has to be filled.' })
      .email('This is not a valid email.'),
    password: z.string().min(1, {
      message: 'You need to enter a password.'
    }),
    confirmPassword: z.string().min(1, {
      message: 'You need to confirm your password.'
    })
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords do not match!',
        path: ['confirmPassword']
      });
    }
  });

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const toast = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  // THIS IS WHERE YOU WILL IMPLEMENT REGISTER TO NEXTAUTH
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (res.status == 200) {
        signIn('credentials', {
          email: values.email,
          password: values.password,
          redirect: true,
          callbackUrl: `${window.location.origin}/profile`
        });
      } else if (res.status == 400) {
        toast.toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'A user with that email already exists',
          action: <ToastAction altText="Try again">Try again</ToastAction>
        });
      }
      setIsLoading(false);
    } catch (error: any) {
      toast.toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
        action: <ToastAction altText="Try again">Try again</ToastAction>
      });
      console.log(error.message);
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Email</FormLabel>
                    <FormControl>
                      <Input
                        className="mb-3"
                        id="email"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Username</FormLabel>
                    <FormControl>
                      <Input
                        className="mb-3"
                        id="username"
                        type="username"
                        autoCapitalize="none"
                        autoCorrect="off"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-base">First Name</FormLabel>
                      <FormControl>
                        <Input
                          className="mb-3"
                          id="firstname"
                          type="name"
                          autoCapitalize="none"
                          autoCorrect="off"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-base">Last Name</FormLabel>
                      <FormControl>
                        <Input
                          className="mb-3"
                          id="lastname"
                          type="name"
                          autoCapitalize="none"
                          autoCorrect="off"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Password</FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="confirmPassword"
                        type="password"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={isLoading} type="submit">
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Register
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
