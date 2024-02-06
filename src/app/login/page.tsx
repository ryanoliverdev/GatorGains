import { UserAuthForm } from '@/components/auth/user-auth-form-login';
import Link from 'next/link';

export default function Login() {
  return (
    <div className="container my-20">
      <div className="mx-auto flex w-full flex-col sm:p-8 sm:shadow-xl justify-center space-y-6 sm:w-[400px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Member Login
          </h1>
        </div>
        <UserAuthForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          If you're not already a member of Gator Gains{' '}
          <Link
            href="/register"
            className="underline underline-offset-4 hover:text-primary"
          >
            register here
          </Link>
          !
        </p>
        
      </div>
    </div>
  );
}
