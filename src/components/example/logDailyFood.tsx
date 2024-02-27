'use client'

interface LogDailyFoodProps {
    userId: string;
  }
  

const LogDailyFood = ({ userId }: LogDailyFoodProps) => {
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
        const response = await fetch(`/api/foodLog/${userId}`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            foodName: "apple",
            calories: 95,
            protein: 0.5,
            carbs: 25,
            fat: 0.3,
            }),
        });
    
        const data = await response.json();
        } catch (error: any) {
            console.error(error.message);
        }
    };
    
    return (
        <button onClick={handleSubmit}> Click It to use the logging api </button>
    );
};

export default LogDailyFood;