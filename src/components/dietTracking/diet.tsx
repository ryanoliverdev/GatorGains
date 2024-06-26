'use client';
import React, { useState, useEffect } from 'react';
import {
  getFoodItems,
  getBrandedNutrition,
  getCommonNutrition
} from '@/client/nutrition';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '../ui/command';
import NutritionTable from '../nutritionTracking/page';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table';
import Image from 'next/image';
import { Card } from '../ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '../ui/select';
import { Button } from '../ui/button';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { Plus } from 'lucide-react';
import DietDrawer from './dietDrawer';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { Icons } from '../ui/icons';
import { Progress } from '../ui/progress';
import getUserDailyCalories from './dietFunctions';
import { useRouter } from 'next/navigation';
import MacroChart from './macroChart';
import Example from './macroChart';

interface FoodItem {
  food_name: string;
  serving_unit: string;
  serving_qty: number;
  photo: string;
}

interface BrandedFoodItem extends FoodItem {
  brand_name: string;
  nf_calories: number;
  item_id: string;
}

interface FoodItemsResult {
  commonFoods: FoodItem[];
  brandedFoods: BrandedFoodItem[];
}

interface CalorieInfo {
  userDailyCalories: number;
  totalFoodCalories: number;
}

// const logCommonFood = async (foodName: string, serving: number | undefined) => {
//   const macros = await getCommonNutrition({ foodName, serving });
//   const response = await fetch(`/api/foodLog/${userId}`, {
//     method: 'POST',
//     headers: {
//     'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       macros
//     }),
//   });
//   return response;
// }

export default function DietComponent({ options }: { options: any }) {
  const [isLoading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<FoodItemsResult>({
    commonFoods: [],
    brandedFoods: []
  });
  const [foodType, setFoodType] = useState('branded');

  useEffect(() => {

    setLoading(true);
    const handler = setTimeout(() => {
      if (query.trim()) {
        getFoodItems(query)
          .then((data) => {
            setResults(data);
            setLoading(false);
          })
          .catch(console.error);
      } else {
        setResults({ commonFoods: [], brandedFoods: [] });
      }
    }, 3000);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  return (
    <div>
      
      <div>
        <Card className="p-5 mt-6 mb-6">
          <div className="flex justify-between flex-col md:flex-row gap-4 mb-5">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="food"
                id="food"
                placeholder="Food Search..."
              />
            </div>
            <Select defaultValue="branded" onValueChange={setFoodType}>
              <SelectTrigger className="md:w-[280px]">
                <SelectValue placeholder="Food Type..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Food Types</SelectLabel>
                  <SelectItem value="branded">Branded Food</SelectItem>
                  <SelectItem value="common">Common Food</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {query !== '' &&
            (isLoading === true ? (
              <Icons.spinner className="h-4 w-4 animate-spin" />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Food</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                {foodType === 'branded' && (
                  <TableBody>
                    {results.brandedFoods.map((food) => (
                      <TableRow key={food.food_name + food.brand_name}>
                        <TableCell className="font-medium">
                          <img
                            src={food.photo}
                            alt={food.food_name}
                            className="object-contain w-10"
                          />
                          <p>{food.food_name}</p>
                          <p className="text-green-600">
                            {food.nf_calories % 1 > 0
                              ? food.nf_calories.toFixed(2)
                              : food.nf_calories}{' '}
                            Cals
                          </p>
                          <p className="text-green-800">
                            {food.serving_qty % 1 > 0
                              ? food.serving_qty.toFixed(2)
                              : food.serving_qty}{' '}
                            {food.serving_unit}
                          </p>
                        </TableCell>
                        <TableCell>{food.brand_name}</TableCell>

                        <TableCell className="text-end">
                          <DietDrawer
                            options={options}
                            servingUnit={food.serving_unit}
                            servingSize={food.serving_qty}
                            calories={food.nf_calories}
                            foodName={food.food_name}
                            foodId={food.item_id}
                          ></DietDrawer>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
                {foodType === 'common' && (
                  <TableBody>
                    {results.commonFoods.map((food, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          <img
                            src={food.photo}
                            alt={food.food_name}
                            className="object-contain w-10"
                          />
                          {food.food_name}
                        </TableCell>
                        <TableCell>{food.serving_qty}</TableCell>
                        <TableCell>{food.serving_unit}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            ))}
        </Card>
      </div>
      {/* <input
        type="text"
        placeholder="Search for food..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div>
        <h3>Common Foods</h3>
        <ul>
          {results.commonFoods.map((food, index) => (
            <li key={index}>
              <img
                src={food.photo}
                alt={food.food_name}
                style={{ width: 50, height: 50 }}
              />
              {food.food_name} - {food.serving_qty} {food.serving_unit}
            </li>
          ))}
        </ul>
        <h3>Branded Foods</h3>
        <ul>
          {results.brandedFoods.map((food, index) => (
            <li key={index}>
              <img
                src={food.photo}
                alt={food.food_name}
                style={{ width: 50, height: 50 }}
              />
              {food.food_name} ({food.brand_name}) - {food.serving_qty}{' '}
              {food.serving_unit}, {food.nf_calories} calories
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
}
