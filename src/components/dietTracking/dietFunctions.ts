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

    console.log("These are the total calories:  " + totalCalories)

    return {userDailyCalories: userCalories, totalFoodCalories: totalCalories}

   
}   

