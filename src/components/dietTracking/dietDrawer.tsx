import * as React from 'react';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';
import { number } from 'zod';

const data = [
  {
    goal: 400
  },
  {
    goal: 300
  },
  {
    goal: 200
  },
  {
    goal: 300
  },
  {
    goal: 200
  },
  {
    goal: 278
  },
  {
    goal: 189
  },
  {
    goal: 239
  },
  {
    goal: 300
  },
  {
    goal: 200
  },
  {
    goal: 278
  },
  {
    goal: 189
  },
  {
    goal: 349
  }
];

export default function DietDrawer({
  servingSize,
  calories
}: {
  servingSize: number;
  calories: number;
}) {
  const [modifiedCals, setCalories] = React.useState(calories);
  const [modifiedServingSize, setServingSize] = React.useState(servingSize);

  function onClick(adjustment: number) {
    setServingSize(adjustment + modifiedServingSize);

    if (adjustment > 0) setCalories(calories * (modifiedServingSize + 1));
    else setCalories(calories * (modifiedServingSize - 1));
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Total Calories</DrawerTitle>
            <DrawerDescription>
              Add item to diet tracking list.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex flex-col items-center mb-5">
              <div className="text-7xl font-bold justify-center tracking-tighter">
                {modifiedCals}
              </div>
              <div className="text-[0.70rem] uppercase text-muted-foreground">
                Total Calories
              </div>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(-1)}
                disabled={modifiedServingSize <= 1}
              >
                <Minus className="h-4 w-4" />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-6xl font-bold tracking-tighter">
                  {modifiedServingSize}
                </div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  Serving Size
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(1)}
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
            <div className="mt-3 h-[120px]">
              <div className="text-[0.70rem] uppercase text-muted-foreground">
                {calories} calories per {servingSize} serving(s)
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button>Add Item</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
