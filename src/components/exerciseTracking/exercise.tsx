'use client';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import ExerciseCard from "@/components/exerciseTracking/exercise-card";
import WorkoutCard from "@/components/exerciseTracking/workout-card";

export default function ExerciseComponent() {
  return (
    <div className="flex justify-center mt-10">  
    <Tabs defaultValue="exercises" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="exercises">Exercises</TabsTrigger>
        <TabsTrigger value="workouts">Workouts</TabsTrigger>
      </TabsList>
      <TabsContent value="exercises">
      <div className="w-full h-full"> 
      <ExerciseCard></ExerciseCard>
      </div>
      </TabsContent>
      <TabsContent value="workouts">
      <div className="w-full h-full"> 
      <WorkoutCard></WorkoutCard>
      </div>
      </TabsContent>
    </Tabs>
    </div>
  )
}
