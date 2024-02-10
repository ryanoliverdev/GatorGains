'use client';
import Image from 'next/image';
import HeadingText from '@/components/ui/heading-text';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import image from '@/assets/liftingpic.jpg';
import FitnessTracking from '@/assets/FitnessTracking.jpg';
import CustomWorkout from '@/assets/CustomWorkout.jpg'
import AutomatedWorkout from '@/assets/AutomatedWorkout.jpg'
const longSubtext = `
  With GatorGains, you can effortlessly track your workouts 
  and monitor your progress over time. Whether you're a beginner 
  or a seasoned fitness enthusiast, our intuitive workout tracking 
  feature allows you to set personalized goals, log your activities, 
  and visualize your achievements. Stay motivated and accountable 
  as you take charge of your fitness journey.
`;

export default function FeatureCards() {
  return (
    <section className="bg-slate-50 dark:bg-slate-900">
      <div className="container space-y-8 py-12 text-center lg:py-20">
        <HeadingText subtext={longSubtext} className="custom-class">
        Achieve Your Fitness Goals with GatorGains!
        </HeadingText>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="flex flex-grow flex-col items-center p-8 w-full bg-gradient-to-b from-blue-700 to-indigo-500">
            <div className="flex items-center  justify-center">
              <Image src={FitnessTracking} width={600} className="mb-4 rounded-lg" alt={''} />
            </div>
            <div className=" font-light text-white text-muted-foreground">
              <CardTitle className='mb-6'>Effortlessly Track Your Progress</CardTitle>
              <p className='text-center'>
              Effortlessly track your workouts and monitor your progress over time. 
              Whether you're a beginner or a seasoned fitness enthusiast, our intuitive workout tracking feature allows 
              you to set personalized goals, log your activities, and visualize your achievements. Stay motivated and accountable 
              as you take charge of your fitness journey.
              </p>
            </div>
          </Card>
          <Card className="flex flex-grow flex-col items-center p-8 w-full bg-gradient-to-b from-blue-700 to-indigo-500">
            <div className="flex items-center justify-center">
              <Image src={CustomWorkout} width={600} className="mb-4 rounded-lg" alt={''} />
            </div>
            <div className="space-y-2 font-light text-white text-muted-foreground">
              <CardTitle className='mb-6'>Set Customized Workout Plans</CardTitle>
              <p className='text-center'>
              Create personalized routines with GatorGains. Customize workouts to match your fitness level, goals, and schedule. 
              Our app empowers you to tailor your exercise regimen according to your preferences and objectives, 
              ensuring that your workouts are effective and enjoyable.
              </p>
            </div>
          </Card>
          <Card className="flex flex-grow flex-col items-center p-8 w-full bg-gradient-to-b from-blue-700 to-indigo-500">
            <div className="flex items-center justify-center mb-4">
              <Image src={AutomatedWorkout} width={600} className="mb-4 rounded-lg" alt={''} />
            </div>
            <div className="space-y-2 font-light text-white text-muted-foreground">
              <CardTitle>Automated Workout Plans</CardTitle>
              <p className='text-center'>
              Utilize automated workout plans tailored to your fitness goals, preferences, and experience level. 
              Whether you're looking to build strength, improve endurance, or lose weight, our app generates customized routines based on 
              your input, including your experience level to help you get ready for your workout. 
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
