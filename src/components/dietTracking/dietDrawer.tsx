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

  const logBrandedFood = async (
    item_id: string,
    serving: number | undefined
  ) => {
    try {
      const macros = await getBrandedNutrition({ item_id, serving });
      console.log(macros)
      const response = await fetch(`/api/foodLog/${options.user.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          foodName: macros.food_name,
          calories: macros.calories,
          protein: macros.protein,
          carbs: macros.carbs,
          fat: macros.fat
        })
      });
      return response;
    } catch (error: any) {
      console.error(error.message);
    }
  };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//     const response = await fetch(`/api/foodLog/${options.user.id}`, {
//         method: 'POST',
//         headers: {
//         'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//         foodName: foodName,
//         calories: modifiedCals,
//         protein: 0,
//         carbs: 0,
//         fat: 0,
//         }),
//     });



//     const data = await response.json();
//     } catch (error: any) {
//         console.error(error.message);
//     }
// };

  const [modifiedCals, setCalories] = React.useState(0);
  const [modifiedServingSize, setServingSize] = React.useState(0);
  const [customCals, setCustomCals] = React.useState(0);

  function onClick(adjustment: number) {
    const newVal = adjustment + modifiedServingSize;
    setServingSize(newVal);
    setCalories(customCals * newVal);
  }

  React.useEffect(() => {
    setCalories(Math.ceil(calories));
    setServingSize(servingSize);
    setCustomCals(Math.ceil(calories));

    if (servingSize !== 1) {
      setCustomCals(Math.ceil(calories / servingSize));
      setCalories(Math.ceil(calories / servingSize));
      setServingSize(1);
    }
  }, [servingSize]);

  return (
    <Drawer>
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
            <div className="mt-6 h-[25px]">
              <div className="text-[0.70rem] text-center uppercase text-muted-foreground">
                {customCals} calories per 1 {servingUnit}
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button onClick={() => logBrandedFood(foodId, modifiedServingSize)}>Add Item</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
