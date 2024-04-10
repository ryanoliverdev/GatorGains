'use client';

import { Progress } from '../ui/progress';

export default function MacroProgress({
  amount,
  type,
  dailyCals
}: {
  amount: number;
  type: string;
  dailyCals: number;
}) {
  if (type === 'Protein') {
    return (
      <div className="flex gap-2 ">
        <h1 className="text-sm mr-1">Protein</h1>
        <Progress
          indicatorColor=" bg-green-400"
          value={Math.min(((amount * 4) / dailyCals) * 100, 100)}
        />
        <h1 className="text-sm">
          {(((amount * 4) / dailyCals) * 100).toFixed(1)}%
        </h1>
      </div>
    );
  } else if (type === 'Carbs') {
    return (
      <div className="flex gap-2 ">
        <h1 className="text-sm mr-3">Carbs</h1>
        <Progress
          indicatorColor="bg-red-400"
          value={Math.min(((amount * 4) / dailyCals) * 100, 100)}
        />
        <h1 className="text-sm">
          {(((amount * 4) / dailyCals) * 100).toFixed(1)}%
        </h1>
      </div>
    );
  } else if (type === 'Fat') {
    return (
      <div className="flex gap-2">
        <h1 className="text-sm mr-7">Fat</h1>
        <Progress
          indicatorColor="bg-yellow-200"
          value={Math.min(((amount * 9) / dailyCals) * 100, 100)}
        />
        <h1 className="text-sm">
          {(((amount * 9) / dailyCals) * 100).toFixed(1)}%
        </h1>
      </div>
    );
  }
}
