"use server"

import { prisma } from "@/lib/prisma"
import { format } from "date-fns";

export default async function getCalorieInfo(retId: string) {
  
    // const userInfo = await prisma.user.findUnique({
    //     where: {
    //         id: retId
    //     }
    // })

    const userCalories = 2000;
    var totalCalories = 0;

    const today = new Date();
    const formattedDate = format(today, 'MM-dd-yyyy');
    
    const foodInfo = await prisma.dailyFoodLog.findUnique({
        where: {
            userId_date: {
                userId: retId,
                date: formattedDate
            }
        },
        include: {
            FoodEntry: {
                include: {
                    foodItem: true,
                }
            }
        }
    })

    if(foodInfo != null) {
        foodInfo.FoodEntry.forEach((item) => {
            totalCalories += item.foodItem.calories * item.servingSize
        })
    }

    return {userDailyCalories: userCalories, totalFoodCalories: totalCalories}

   
}   

export async function getMacroInfo(retId: string) {

    const today = new Date();
    const formattedDate = format(today, 'MM-dd-yyyy');
    
    const foodInfo = await prisma.dailyFoodLog.findUnique({
        where: {
            userId_date: {
                userId: retId,
                date: formattedDate
            }
        },
        include: {
            FoodEntry: {
                include: {
                    foodItem: true,
                }
            }
        }
    })


    var totalProtein = 0;
    var totalCarbs = 0;
    var totalFat = 0;

    if(foodInfo != null) {
        foodInfo.FoodEntry.forEach((item) => {
            totalProtein += item.foodItem.protein * item.servingSize
            totalCarbs += item.foodItem.carbs * item.servingSize
            totalFat += item.foodItem.fat * item.servingSize
            
        })
    }

    return [
        { name: 'Protein', value: totalProtein },
        { name: 'Carbs', value: totalCarbs },
        { name: 'Fat', value: totalFat },
      ];
   
}   

interface FoodItem {
    food_name: string;
    serving_qty: number;
    calories: number;
    protein: number;
}

export async function getFoodItems(retId: string) {

    const today = new Date();
    const formattedDate = format(today, 'MM-dd-yyyy');
    
    const foodInfo = await prisma.dailyFoodLog.findUnique({
        where: {
            userId_date: {
                userId: retId,
                date: formattedDate
            }
        },
        include: {
            FoodEntry: {
                include: {
                    foodItem: true,
                }
            }
        }
    })


    var foodItems: FoodItem[] = [];

    if(foodInfo != null) {
        foodInfo.FoodEntry.forEach((item) => {
            foodItems.push({food_name: item.foodItem.foodName, serving_qty: item.servingSize, calories: item.foodItem.calories * item.servingSize, protein: item.foodItem.protein * item.servingSize})
        })
    }

    return foodItems;
   
}   




