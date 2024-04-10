'use server';

import DietComponent from './diet';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { Progress } from '../ui/progress';
import getCalorieInfo, { getFoodItems, getMacroInfo, getMacroPercentages } from './dietFunctions';
import TopComponent from './topComponent';
import ChangeCalorieButton from './changeCalorieButton';

export default async function MainDiet() {
  const session = await getServerSession(authOptions);

  if (session !== null) {

    const calInfo = await getCalorieInfo(session.user.id);
    const macroInfo = await getMacroInfo(session.user.id);
    const foodItems = await getFoodItems(session.user.id);
    const macroPercentages = await getMacroPercentages(session.user.id);

    return (
      <div>
        <div className="mt-6 flex items-center gap-6">
          <Progress
            indicatorColor='bg-blue-500'
            value={Math.min(
              (calInfo.totalFoodCalories / calInfo.userDailyCalories) * 100,
              100
            )}
          />
            <ChangeCalorieButton totalCals={calInfo.totalFoodCalories} calInfo={calInfo.userDailyCalories} userId={session.user.id} />
        </div>
        <TopComponent macros={macroInfo} macroPercentages={macroPercentages} userId={session.user.id} calInfo={calInfo.totalFoodCalories} userDailyCalories={calInfo.userDailyCalories} foods={foodItems}></TopComponent>
        <DietComponent options={session}></DietComponent>
      </div>
    );
  }
}
