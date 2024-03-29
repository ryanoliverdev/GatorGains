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

interface FoodItem {
    food_name: string;
    serving_qty: number;
    calories: number;
    protein: number;
}

export default function DashboardTopComponent({ macros, foods, calInfo }: { macros: any, foods: FoodItem[], calInfo: number}) {
  return (
      
          <div className="flex gap-2 flex-col md:flex-row items-center sm:justify-center mt-5">
            <Card className="w-fit border-0 shadow-none md:border md:shadow-sm ">
              <CardTitle className="text-center mt-6">
                Macro Information
              </CardTitle>
              <CardContent className="w-[310px] h-[300px]">
                <MacroChart macros={macros}></MacroChart>
              </CardContent>
            </Card>
            <Card className="w-fit">
              <CardContent className="w-fit pt-5 h-[300px">
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
