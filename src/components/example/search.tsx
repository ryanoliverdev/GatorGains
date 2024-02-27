'use client';
import React, { useState, useEffect } from 'react';
import { getFoodItems } from '@/client/nutrition';
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
import LogDailyFood from './logDailyFood';

interface FoodItem {
  food_name: string;
  serving_unit: string;
  serving_qty: number;
  photo: string;
}

interface BrandedFoodItem extends FoodItem {
  brand_name: string;
  nf_calories: number;
}

interface FoodItemsResult {
  commonFoods: FoodItem[];
  brandedFoods: BrandedFoodItem[];
}

const ExampleSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<FoodItemsResult>({
    commonFoods: [],
    brandedFoods: []
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.trim()) {
        getFoodItems(query)
          .then((data) => {
            setResults(data);
          })
          .catch(console.error);
      } else {
        setResults({ commonFoods: [], brandedFoods: [] });
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  return (
    <div>
      <div>
      <Card>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Food</Label>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="email"
            id="email"
            placeholder="Food"
          />
        </div>
        
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Food</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Serving Size</TableHead>
                <TableHead>Calories</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.brandedFoods.map((food, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <img
                      src={food.photo}
                      alt={food.food_name}
                      className="object-contain w-10"
                    />
                    {food.food_name}
                  </TableCell>
                  <TableCell>{food.brand_name}</TableCell>

                  <TableCell>{food.serving_qty}</TableCell>
                  <TableCell>{food.nf_calories}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
};

export default ExampleSearch;
