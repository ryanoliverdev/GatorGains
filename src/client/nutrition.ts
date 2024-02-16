'use server';
import axios from 'axios';

export interface NutritionInput {
  foodName: string,
  serving: number | undefined
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
