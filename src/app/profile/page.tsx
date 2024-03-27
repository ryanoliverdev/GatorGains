'use server';

import { Separator } from '@/components/ui/separator';
import { ProfileForm } from './profile-form';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { prisma } from '@/lib/prisma';

export default async function SettingsProfilePage() {
  const session = await getServerSession(authOptions);

  async function getUserNameAndBio() {
    const info = await prisma.user.findUnique({
      where: {
        id: session?.user?.id
      }
    });

    return { name: info?.username, bio: info?.bio };
  }

  const info = await getUserNameAndBio();

  return (
    <div className="space-y-6">
      {info.name === null && (
        <h1 className=" text-red-500 font-bold">
          Please update your account with a username!
        </h1>
      )}
      <ProfileForm
        userName={info.name || ''}
        userBio={info.bio || ''}
        userId={session?.user?.id || ''}
      />
    </div>
  );
}
