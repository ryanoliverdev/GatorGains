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
import { getBrandedNutrition } from '@/client/nutrition';
import { format } from 'date-fns';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { Slider } from '../ui/slider';

export default function DietDrawer({
  options,
  servingSize,
  calories,
  servingUnit,
  foodName,
  foodId
}: {
  options: any;
  servingSize: number;
  calories: number;
  servingUnit: string;
  foodName: string;
  foodId: string;
}) {
  const getLogForUser = async () => {
    try {
      const formattedDate = format(new Date(), 'MM-dd-yyyy');
      const response = await fetch(
        `/api/foodLog/${options.user.email}?date=${formattedDate}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      return response;
    } catch (error: any) {
      console.error(error.message);
    }
  };
  const [isLoading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const router = useRouter();

  const logBrandedFood = async (
    item_id: string,
    serving: number | undefined
  ) => {
    try {
      setLoading(true);

      const macros = await getBrandedNutrition({ item_id, serving });
      const servingSize = serving || 1;
      const response = await fetch(`/api/foodLog/${options.user.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          foodName: macros.food_name,
          calories: macros.calories,
          protein: macros.protein,
          carbs: macros.carbs,
          fat: macros.fat,
          servingSize
        })
      });

      setLoading(false);
      setOpen(false);

      router.refresh();

      return response;
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const [modifiedCals, setCalories] = React.useState(0);
  const [totalServings, setTotalServings] = React.useState(1);
  const [modifiedServingSize, setServingSize] = React.useState(0);
  const [customCals, setCustomCals] = React.useState(0);

  function onClick(adjustment: number) {
    if (adjustment < 0) {
      setTotalServings(totalServings - 1);
    } else if (adjustment > 0) {
      setTotalServings(totalServings + 1);
    }
    const newVal = adjustment + modifiedServingSize;
    setServingSize(parseFloat(newVal.toFixed(2)));
    setCalories(Math.ceil((newVal / servingSize) * calories));
  }

  React.useEffect(() => {
    if (servingSize === 1) {
      setCustomCals(Math.ceil(calories));
      setCalories(Math.ceil(calories));
      setServingSize(parseFloat(servingSize.toFixed(2)));
    } else if (servingSize > 1) {
      setCustomCals(Math.ceil(calories / servingSize));
      setCalories(Math.ceil(calories));
      setServingSize(parseFloat(servingSize.toFixed(2)));
    } else if (servingSize < 1) {
      setCustomCals(Math.ceil(calories));
      setCalories(Math.ceil(calories));
      setServingSize(parseFloat(servingSize.toFixed(2)));
    }
  }, [calories, servingSize]);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button size={'icon'}>
          <Plus className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Total Calories</DrawerTitle>
            <DrawerDescription>
              Add {foodName} to diet tracking list.
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
                onClick={() => onClick(-parseFloat(servingSize.toFixed(2)))}
                disabled={modifiedServingSize <= 0}
              >
                <Minus className="h-4 w-4" />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-6xl font-bold tracking-tighter">
                  {totalServings}
                </div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  Serving Size
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(parseFloat(servingSize.toFixed(2)))}
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
            <div className="mt-6 h-[25px]">
              <div className="text-[0.70rem] text-center uppercase text-muted-foreground">
                1 serving is {calories} calories per {parseFloat(servingSize.toFixed(2))}{' '}
                {servingUnit}
              </div>
            </div>
          </div>
          <DrawerFooter>
            {isLoading ? (
              <Button
                disabled={isLoading}
                onClick={() => logBrandedFood(foodId, totalServings)}
              >
                Adding... <ReloadIcon className="ml-2 h-4 w-4 animate-spin" />{' '}
              </Button>
            ) : (
              <Button
                onClick={() => logBrandedFood(foodId, totalServings)}
              >
                Add Item
              </Button>
            )}
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
