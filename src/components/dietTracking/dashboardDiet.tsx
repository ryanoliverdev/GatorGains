'use server';

import DietComponent from './diet';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { Progress } from '../ui/progress';
import getCalorieInfo, { getFoodItems, getMacroInfo } from './dietFunctions';
import TopComponent from './topComponent';
import DashboardTopComponent from './dashboardTopComponent';
import { Card, CardTitle } from '@/components/ui/card';
export default async function DashboardDiet() {
  const session = await getServerSession(authOptions);

  if (session !== null) {
    const calInfo = await getCalorieInfo(session.user.id);
    const macroInfo = await getMacroInfo(session.user.id);
    const foodItems = await getFoodItems(session.user.id);

    return (
      <div className="p-4">
        <CardTitle className="text-center mt-6">Today&apos;s Foods</CardTitle>
        <div>
          <div className="mt-6 flex items-center gap-6 mb-4">
            <Progress
              value={Math.min(
                (calInfo.totalFoodCalories / calInfo.userDailyCalories) * 100,
                100
              )}
            />
            <h1 className="font-semibold w-[200px]">
              {calInfo.totalFoodCalories} / {calInfo.userDailyCalories} Calories
            </h1>
          </div>
          <DashboardTopComponent
            macros={macroInfo}
            calInfo={calInfo.totalFoodCalories}
            foods={foodItems}
          ></DashboardTopComponent>
        </div>
      </div>
    );
  }
}
