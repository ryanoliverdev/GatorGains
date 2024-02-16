import Image from 'next/image';
import HeadingText from '@/components/ui/heading-text';
import image from '@/assets/liftingpic.jpg';
import MedalIcon from '@/assets/medal_icon.jpg';
import HandskakeIcon from '@/assets/handshake_icon.jpg';
import HandIcon from '@/assets/hand_icon.png';
import GroupImage from '@/assets/GroupWorkout.jpg';
import { Card } from '../ui/card';
import { Hand } from 'lucide-react';

export default function Features() {
  return (
    <section className="container space-y-8 py-12 text-center lg:py-20 ">
      <div className={`space-y-2 className`}>
        <h1 className="text-3xl font-bold text-primary lg:text-4xl">
          Join Fitness Groups
        </h1>
        <h2 className="font-light text-muted-foreground lg:text-lg">
          Connect with friends and form fitness groups to stay motivated,
          accountable, and inspired on your wellness journey.
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="grid grid-rows-1 md:grid-cols-1 ">
          {/* Content for each feature section */}

          <div className="flex flex-col md:flex-row items-center ">
            <div>
              <Image src={HandIcon} width={200} className="" alt={''} />
            </div>
            <div className="flex-1 text-center mx-8">
              <p className="md:text4xl text-2xl  text-center font-semibold">
                Motivation
              </p>
              <p className="font-light text-muted-foreground md:text-lg">
                Stay motivated by enaging in group challenges, accomplishing
                achievements, and recieiving support from group members.
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center ">
            <div>
              <Image src={HandskakeIcon} width={200} className="" alt={''} />
            </div>
            <div className="flex-1  mx-8">
              <p className="md:text4xl text-2xl  text-center font-semibold">
                Accountability
              </p>
              <p className="font-light text-muted-foreground md:text-lg">
                Keep yourself and friends accountable by setting and tracking
                fitness goals together with your group.
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center ">
            <div>
              <Image src={MedalIcon} width={200} className="" alt={''} />
            </div>
            <div className="flex-1  mx-8">
              <p className="md:text4xl text-2xl  text-center font-semibold">
                Competition
              </p>
              <p className="font-light text-muted-foreground md:text-lg">
                Engage in friendly competition, track achievements, and
                challenge your group members to push their limits and achieve
                their fitness goals.
              </p>
            </div>
          </div>
          {/* Repeat for other feature sections */}
        </div>

        {/* Background image */}
        <div className="flex flex-grow flex-col items-center justify-center gap-4 p-8 dark:bg-secondary border-none">
          <div className="flex"></div>
          <div className="space-y-2">
            <Image
              src={GroupImage}
              width={600}
              className="rounded-lg"
              alt={''}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
