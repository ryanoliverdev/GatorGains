'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { getServerSession } from 'next-auth/next';
import CreateGroupForm from './createForm';
import { Card } from '@/components/ui/card';

export default async function createGroup() {
  const session = await getServerSession(authOptions);

  if (session === null) {
    return <p>Not authorized</p>;
  }

  return (
    <div className="container flex flex-col items-center mt-5">
        <h1 className='text-center mb-5 text-xl font-bold'>Create a Group</h1>
      <Card className='max-w-3xl w-full p-4'>
        <CreateGroupForm session={session} />
      </Card>
    </div>
  );
}
