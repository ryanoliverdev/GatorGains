'use server';
import axios from 'axios';

export interface NutritionInput {
  foodName: string,
  serving: number | undefined
}

export const getFoodItems = async (
  food: string
) => {
  const response = await axios.post(
    'https://trackapi.nutritionix.com/v2/search/instant',
    {
      query: food
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'x-app-id': process.env.nutritionixAppID,
        'x-app-key': process.env.nutritionixKey
      }
    }
  );

  const brandedFoods = response.data.branded.slice(0, 5).map((item: { food_name: string; serving_unit: string; serving_qty: number; brand_name: string; nf_calories: number; photo: { thumb: any; }; nix_item_id: string }) => ({
    food_name: item.food_name,
    serving_unit: item.serving_unit,
    serving_qty: item.serving_qty,
    brand_name: item.brand_name,
    nf_calories: item.nf_calories,
    photo: item.photo.thumb,
    item_id: item.nix_item_id
  }));

  return { brandedFoods };
}

export const getNutrition = async (
    data: NutritionInput
) => {
  const response = await axios.post(
    'https://trackapi.nutritionix.com/v2/natural/nutrients',
    {
      query: data.foodName,
      serving: data.serving
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'x-app-id': process.env.nutritionixAppID,
        'x-app-key': process.env.nutritionixKey
      }
    }
  );
  return {
    calories: response.data.foods[0].nf_calories,
    fat: response.data.foods[0].nf_total_fat,
    carbs: response.data.foods[0].nf_total_carbohydrate,
    protein: response.data.foods[0].nf_protein
  };
};
