'use client';

import { useRouter } from 'next/navigation';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { changeCalories } from './dietFunctions';
import { use, useEffect, useState } from 'react';
import { Button } from '../ui/button';

export default function ChangeCalorieButton({
  calInfo,
  userId,
  totalCals
}: {
  calInfo: number;
  userId: string;
  totalCals: number;
}) {
  const [modifiedCals, setModifiedCals] = useState(calInfo);
  const newRouter = useRouter();

  async function setCalories(newCalories: number) {
    await changeCalories(userId, newCalories);
    newRouter.refresh();
  }

  useEffect(() => {
    setModifiedCals(calInfo);
  }, [calInfo]);

  return (
    <div className="flex flex-row font-semibold w-[270px] gap-2">
      {totalCals} /
      <Popover>
        <PopoverTrigger className="underline text-blue-500">
          {modifiedCals}
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Calories</h4>
              <p className="text-sm text-muted-foreground">
                Change your daily calorie goal.
              </p>
            </div>
            <div className="grid gap-2">
              <div className="grid items-center gap-4">
                <Input
                  onChange={(e) => setModifiedCals(parseInt(e.target.value))}
                  type="number"
                  id="setCalories"
                  defaultValue={calInfo}
                  className="col-span-2 h-8"
                />
                <Button onClick={async (e) => setCalories(modifiedCals)}>
                  Update Calories
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
       Calories
    </div>
  );
}
