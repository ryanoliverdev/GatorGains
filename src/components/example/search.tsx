'use client'
import React, { useState, useEffect } from 'react';
import { getFoodItems } from '@/client/nutrition'; 

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
  const [results, setResults] = useState<FoodItemsResult>({ commonFoods: [], brandedFoods: [] });

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.trim()) {
        getFoodItems(query)
          .then(data => {
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
      <input
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
              <img src={food.photo} alt={food.food_name} style={{ width: 50, height: 50 }} />
              {food.food_name} - {food.serving_qty} {food.serving_unit}
            </li>
          ))}
        </ul>
        <h3>Branded Foods</h3>
        <ul>
          {results.brandedFoods.map((food, index) => (
            <li key={index}>
              <img src={food.photo} alt={food.food_name} style={{ width: 50, height: 50 }} />
              {food.food_name} ({food.brand_name}) - {food.serving_qty} {food.serving_unit}, {food.nf_calories} calories
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExampleSearch;
