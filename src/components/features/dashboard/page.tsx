'use server';

import ExampleSearch from '@/components/example/search';
import NutritionTable from '@/components/nutritionTracking/page';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import DashboardDiet from '@/components/dietTracking/dashboardDiet';
import { Card } from '@/components/ui/card';
import SummaryCard from '@/components/features/dashboard/summaryCard';
import IndLeaderBoard from './groupCard';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import getCalorieInfo from '@/components/dietTracking/dietFunctions';
import { prisma } from '@/lib/prisma';

export async function DashboardFinal({ options }: { options: any }) {
  const session = await getServerSession(authOptions);



  
  async function getUserXP(userId: string) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId
        }
      });
      return user;
    } catch (error) {
      console.error("Error getting user:", error);
      return null;
    }
  }

  if (session !== null) {
    const user = await getUserXP(session.user.id);
    const calInfo = await getCalorieInfo(session.user.id);
    return (
      <div>
        <div className="container my-6 space-y-6">
          <div className="flex justify-center">
            <div className="w-full sm:rounded-lg sm:border divide-y shadow-sm">
              <SummaryCard options={options} totalFoodCalories={calInfo.totalFoodCalories} xp={user?.xp}></SummaryCard>
              <div className="flex flex-col xl:flex-row">
                {/* DashboardDiet */}
                <div className="w-full pb-8 xl:pb-0 border-b xl:border-b-0 xl:border-r px-2 xl:w-2/3">
                  <DashboardDiet></DashboardDiet>
                </div>
                {/* IndLeaderBoard */}
                <div className="w-full xl:w-1/3 px-2 xl:mt-0">
                  <div className=" border-gray-300">
                    <IndLeaderBoard></IndLeaderBoard>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


