'use client';

import { useRouter } from 'next/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '../ui/accordion';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle
} from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table';
import { removeFoodFromUser } from './dietFunctions';
import MacroChart from './macroChart';
import { useState } from 'react';
import { set } from 'date-fns';
import { Loader2 } from 'lucide-react';
import MacroProgress from './macroProgressBar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from 'recharts';

interface FoodItem {
  id: string;
  food_name: string;
  serving_qty: number;
  calories: number;
  protein: number;
}

interface Macros {
  name: string;
  value: number;
}
[];

export default function TopComponent({
  macros,
  foods,
  calInfo,
  userDailyCalories
}: {
  macros: Macros[];
  foods: FoodItem[];
  calInfo: number;
  userDailyCalories: number;
}) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [loadId, setLoadId] = useState('');

  const removeRefresh = async (foodId: string) => {
    setLoadId(foodId);
    setLoading(true);
    try {
      await removeFoodFromUser(foodId);
    } catch (error: any) {
      console.error(error.message);
    }
    await router.refresh();
    setLoading(false);
    setLoadId('');
  };

  const [newProteinPercentage, setNewProteinPercentage] = useState(0);
  const [newCarbPercentage, setNewCarbPercentage] = useState(0);
  const [newFatPercentage, setNewFatPercentage] = useState(0);

  async function changePercentages(
    newCarbPercentage: number,
    newProteinPercentage: number,
    newFatPercentage: number
  ) {
    await 
  }


  return (
    <Accordion type="single" className="mt-4" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Additional Food Information</AccordionTrigger>
        <AccordionContent>
          <div className="flex gap-6 flex-col lg:flex-row items-center sm:justify-center mt-5">
            <Card className="w-fit border-0 shadow-none sm:border sm:shadow-sm ">
              <CardTitle className="text-center mt-6">
                Macro Information
              </CardTitle>
              <CardContent className="flex flex-col">
                <div className="w-[348px] h-[348px]">
                  <MacroChart macros={macros}></MacroChart>
                </div>
                <div className="flex flex-col w-full font-semibold gap-1">
                  {macros.map((macro) => (
                    <MacroProgress
                      key={macro.name}
                      type={macro.name}
                      dailyCals={userDailyCalories}
                      amount={macro.value}
                    />
                  ))}
                </div>
              </CardContent>
              <CardFooter className='flex justify-center'>
                <Popover>
                  <PopoverTrigger className="underline text-blue-500">
                    Click or tap to modify macro percentages.
                  </PopoverTrigger>
                  <PopoverContent className="w-64">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Macro Information</h4>
                        <p className="text-sm text-muted-foreground">
                          Change your daily macro goals.
                        </p>
                      </div>
                      <div className="grid gap-2">
                        <div className="grid items-center gap-4">
                          <Label>Protein</Label>
                          <Input
                            onChange={(e) =>
                              setNewProteinPercentage(parseInt(e.target.value))
                            }
                            type="number"
                            id="setProtein"
                            defaultValue={calInfo}
                            className="col-span-2 h-8"
                          />
                          <Input
                            onChange={(e) =>
                              setNewCarbPercentage(parseInt(e.target.value))
                            }
                            type="number"
                            id="setCarbs"
                            defaultValue={calInfo}
                            className="col-span-2 h-8"
                          />
                          <Input
                            onChange={(e) =>
                              setNewFatPercentage(parseInt(e.target.value))
                            }
                            type="number"
                            id="setFat"
                            defaultValue={calInfo}
                            className="col-span-2 h-8"
                          />
                          <Button
                            onClick={async (e) => changePercentages(newCarbPercentage, newProteinPercentage, newFatPercentage)}
                          >
                            Update Calories
                          </Button>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </CardFooter>
            </Card>
            <Card className="w-fit sm:w-full">
              <CardTitle className="text-center mt-6">Added Foods</CardTitle>
              <CardContent className="w-full pt-5">
                <ScrollArea className="h-[352px] rounded-md ">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px] sm:w-[300px]">
                          Food
                        </TableHead>
                        <TableHead className="text-right">Servings</TableHead>
                        <TableHead className="text-right">Calories</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {foods.map((food) => (
                        <TableRow
                          key={food.id}
                          onClick={async () => await removeRefresh(food.id)}
                          className="cursor-pointer hover:bg-red-200"
                        >
                          <TableCell className="font-medium">
                            {isLoading && loadId === food.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              food.food_name
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            {food.serving_qty}
                          </TableCell>
                          <TableCell className="text-right">
                            {food.calories}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={2}>Total Calories</TableCell>
                        <TableCell className="text-right">{calInfo}</TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <div className="flex justify-center w-full">
                  <p className="text-sm text-center text-muted-foreground">
                    Click or tap on a food to remove it from your list.
                  </p>
                </div>
              </CardFooter>
            </Card>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
