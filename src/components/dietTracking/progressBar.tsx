'use server';

import DietComponent from './diet';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { Progress } from '../ui/progress';
import getCalorieInfo, { getFoodItems, getMacroInfo } from './dietFunctions';
import TopComponent from './topComponent';

export default async function ProgressBar({ id }: { id: string }) {
  const calInfo = await getCalorieInfo(id);

  return (
    <div className="flex flex-col mt-1">
      <Progress indicatorColor="bg-blue-500"
        value={Math.min(
          (calInfo.totalFoodCalories / calInfo.userDailyCalories) * 100,
          100
        )}
      />
      <h1 className="text-sm">
        {calInfo.totalFoodCalories} / {calInfo.userDailyCalories} Calories
      </h1>
    </div>
  );
}
