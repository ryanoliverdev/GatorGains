'use server';
import { CardHeader, CardContent, Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { prisma } from '@/lib/prisma';

export default async function SummaryCard({
  options,
  totalFoodCalories,
  xp
}: {
  options: any;
  totalFoodCalories: number;
  xp: any;
}) {
  /*function getGreeting() {
    const hour = new Date().getHours();
    console.log("Current hour:",);
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    if (hour < 20) return 'Good evening';
    return 'Hello';
  }*/

  function getCurrentDateTime() {
    const now = new Date();

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };

    const formatter = new Intl.DateTimeFormat('en-US', options);
    const formattedDateTime = formatter.format(now);

    return `As of ${formattedDateTime}`;
  }

  return (
    <div className="flex flex-col sm:flex-row justify-center sm:justify-evenly ">
      <div className="flex flex-col lg:flex-row">
        <CardHeader className="flex justify-center">
          <div className="flex justify-center items-center">
            <img
              alt="Avatar"
              className="rounded-full object-cover"
              height="200"
              src={options.user.image}
              style={{
                aspectRatio: '50/50',
                objectFit: 'cover',
                imageRendering: 'auto' // or "pixelated"
              }}
              width="200"
            />
          </div>
        </CardHeader>
        <CardHeader className="flex justify-center">
          <div className="space-y-2 text-center">
            <h1 className="text-lg font-bold">Hello, {options.user.name}!✨</h1>
            <p className="text-xs leading-none">You look great today!</p>
          </div>
        </CardHeader>
      </div>
      <div className="flex justify-center items-center">
        <CardContent className="space-y-4 mt-4">
          <div className="space-y-2">
            <h2 className="text-base text-center font-bold">
              Today&apos;s Summary
            </h2>
            <p className="text-xs text-center leading-none">
              {getCurrentDateTime()}
            </p>
          </div>
          <div className="grid w-full grid-cols-1 items-stretch justify-center gap-4 justify-items-center">
            <div className="flex flex-col items-center justify-center space-y-2">
              <span className="text-sm font-medium">Calories Eaten</span>
              <span className="text-2xl font-extrabold">
                {totalFoodCalories}🥗
              </span>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2">
              <span className="text-sm font-medium">XP</span>
              <span className="text-2xl font-extrabold">{xp}🔥</span>
            </div>
          </div>
        </CardContent>
      </div>
    </div>
  );
}
