'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '../ui/accordion';
import { Card, CardContent, CardTitle } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '../ui/table';
import MacroChart from './macroChart';
import MacroProgress from './macroProgressBar';

interface FoodItem {
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

export default function DashboardTopComponent({ macros, foods, calInfo, userDailyCalories, macroPercentages}: { macros: Macros[], foods: FoodItem[], calInfo: number,userDailyCalories: number, macroPercentages: any}) {


  return (
      
          <div className="flex gap-2 flex-col md:flex-row items-center sm:justify-center mt-5">
            <Card className="w-fit border-0 shadow-none md:border md:shadow-sm ">
              <CardTitle className="text-center mt-6">
                Macro Information
              </CardTitle>
              <CardContent className="w-auto h-auto">
              <div className="w-[348px] h-[348px]">
                  <MacroChart macros={macros}></MacroChart>
                </div>
                <div className="flex flex-col w-full font-semibold gap-1">
                  {macros.map((macro) => (
                    <MacroProgress
                      totalEaten={calInfo}
                      key={macro.name}
                      type={macro.name}
                      dailyCals={userDailyCalories}
                      amount={macro.value}
                      macroInfo={macroPercentages}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="w-fit">
              <CardContent className="w-fit pt-5 h-[300px]">
                <ScrollArea className="h-[260px] rounded-md ">
                  <Table className='w-fit'>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-fit">Food</TableHead>
                        <TableHead className="text-right">Servings</TableHead>
                        <TableHead className="text-right">Calories</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {foods.map((food) => (
                        <TableRow key={food.food_name}>
                          <TableCell className="font-medium">
                            {food.food_name}
                          </TableCell>
                          <TableCell className="text-right">{food.serving_qty}</TableCell>
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
            </Card>
          </div>
          
  );
}
