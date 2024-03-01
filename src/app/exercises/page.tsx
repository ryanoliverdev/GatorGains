
import { useSession, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardFinal } from '@/components/features/dashboard/page';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import DietComponent from '@/components/dietTracking/diet';

import ExerciseComponent from '@/components/exerciseTracking/exercise';

export default async function ExerciseTracking() {
  const session = await getServerSession(authOptions);

  return (
    <div className="container">
        <ExerciseComponent></ExerciseComponent> 
    </div>
  );
}