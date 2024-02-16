'use server';
import axios from 'axios';

export interface ExerciseInput {
  exercise: string,
  weight: number | undefined,
  height: number | undefined,
  age: number | undefined
}

export const getNutrition = async (
  data: ExerciseInput
) => {
  const response = await axios.post(
    'https://trackapi.nutritionix.com/v2/natural/exercise',
    {
      query: data.exercise,
      weight : data.weight,
      height: data.height,
      age: data.age
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
    caloriesBurned: response.data.exercises[0].nf_calories
  };
};
