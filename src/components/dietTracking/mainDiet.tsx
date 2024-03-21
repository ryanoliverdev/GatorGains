'use server';

import DietComponent from './diet';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { Progress } from '../ui/progress';
import getCalorieInfo from './dietFunctions';

export default async function MainDiet() {
  const session = await getServerSession(authOptions);

  if (session !== null) {

    const calInfo = await getCalorieInfo(session.user.id);


    return (
      <div>
        <div className="mt-6 flex items-center gap-6">
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
        <DietComponent options={session}></DietComponent>
      </div>
    );
  }
}
