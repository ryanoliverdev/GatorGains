"use server"

import { useSession, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardFinal } from '@/components/features/dashboard/page';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import MainDiet from '@/components/dietTracking/mainDiet';

export default async function DietTracking() {

  return (
    <div className="sm:container mx-2">
        <MainDiet></MainDiet>
    </div>
  );
}
