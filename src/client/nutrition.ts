'use server';
import axios from 'axios';

export interface BrandedNutritionInput {
  item_id: string,
  serving: number | undefined
}
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

  const commonFoods = response.data.common.slice(0, 10).map((item: { food_name: string; serving_unit: string; serving_qty: number; photo: { thumb: any; }; }) => ({
    food_name: item.food_name,
    serving_unit: item.serving_unit,
    serving_qty: item.serving_qty,
    photo: item.photo.thumb,
  }));

  const brandedFoods = response.data.branded.slice(0, 10).map((item: { food_name: string; serving_unit: string; serving_qty: number; brand_name: string; nf_calories: number; photo: { thumb: any; }; nix_item_id: string; }) => ({
    food_name: item.food_name,
    serving_unit: item.serving_unit,
    serving_qty: item.serving_qty,
    brand_name: item.brand_name,
    nf_calories: item.nf_calories,
    photo: item.photo.thumb,
    item_id: item.nix_item_id
  }));

  return { commonFoods, brandedFoods };
}

export const getBrandedNutrition = async (
  data: BrandedNutritionInput
) => {
  const response = await axios.get('https://trackapi.nutritionix.com/v2/search/item', {
  params: {
    upc: data.item_id
  },
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'x-app-id': process.env.nutritionixAppID,
    'x-app-key': process.env.nutritionixKey
  }
});
  return {
    food_name: response.data.foods[0].food_name,
    calories: response.data.foods[0].nf_calories,
    fat: response.data.foods[0].nf_total_fat,
    carbs: response.data.foods[0].nf_total_carbohydrate,
    protein: response.data.foods[0].nf_protein
  }
}

export const getCommonNutrition = async (
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
    food_name: response.data.foods[0].food_name,
    calories: response.data.foods[0].nf_calories,
    fat: response.data.foods[0].nf_total_fat,
    carbs: response.data.foods[0].nf_total_carbohydrate,
    protein: response.data.foods[0].nf_protein
  };
};
