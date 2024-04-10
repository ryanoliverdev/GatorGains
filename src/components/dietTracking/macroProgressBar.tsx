'use client';

import { Progress } from '../ui/progress';

export default function MacroProgress({
  amount,
  type,
  dailyCals,
  macroInfo,
  totalEaten,
}: {
  amount: number;
  type: string;
  dailyCals: number;
  macroInfo: any;
  totalEaten: number;
}) {
    console.log(macroInfo.dailyProteinPercentage)
    console.log((((amount * 4) * 100) / ((macroInfo.dailyProteinPercentage/100) * dailyCals)))
  if (type === 'Protein') {
    return (
      <div className="flex gap-2 ">
        <h1 className="text-sm mr-1">Protein</h1>
        <Progress
          indicatorColor=" bg-green-400"
          value={Math.min((((amount * 4) * 100) / ((macroInfo.dailyProteinPercentage/100) * dailyCals)), 100)}
        />
        <h1 className="text-sm w-[150px] text-right">
        {(((amount * 4) / dailyCals) * 100).toFixed(1)}% / {macroInfo.dailyProteinPercentage}%
        </h1>
      </div>
    );
  } else if (type === 'Carbs') {
    return (
      <div className="flex gap-2 ">
        <h1 className="text-sm mr-3">Carbs</h1>
        <Progress
          indicatorColor="bg-red-400"
          value={Math.min((((amount * 4) * 100) / ((macroInfo.dailyCarbsPercentage/100) * dailyCals)), 100)}
        />
        <h1 className="text-sm w-[150px] text-right">
        {(((amount * 4) / dailyCals) * 100).toFixed(1)}% / {macroInfo.dailyCarbsPercentage}%
        </h1>
      </div>
    );
  } else if (type === 'Fat') {
    return (
      <div className="flex gap-2">
        <h1 className="text-sm mr-7">Fat</h1>
        <Progress
          indicatorColor="bg-yellow-200"
          value={Math.min((((amount * 9) * 100) / ((macroInfo.dailyFatPercentage/100) * dailyCals)), 100)}
        />
        <h1 className="text-sm w-[150px] text-right">
        {(((amount * 9) / dailyCals) * 100).toFixed(1)}% / {macroInfo.dailyFatPercentage}%
        </h1>
      </div>
    );
  }
}
