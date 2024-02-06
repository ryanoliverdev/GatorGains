import Link from 'next/link';
import Image from 'next/image';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import image from '@/assets/liftingpic.jpg';

export default function HeroHeader() {
  return (
    <div className="w-full bg-gradient-to-b from-blue-700 to-indigo-500">
      <div className="container">
        <section className="container flex flex-col gap-4 pb-12 pt-4 text-center lg:items-center lg:gap-8 lg:py-20">
          <div className="flex flex-1 flex-col items-center gap-4 text-center lg:gap-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-white lg:text-6xl">
                Fitness tracking made easy
              </h1>
              <h2 className="text-xl font-light text-white text-muted-foreground">
                Build your own workout plans and track your progress with our
                all-in-one fitness application Gator Gains.
              </h2>
            </div>
            <Image src={image} width={300} className="rounded-full shadow-2xl" alt={''} />
            <Link
              href="/register"
              className={`w-[10rem] ${cn(buttonVariants({ size: 'lg', variant: 'secondary' }))}`}
            >
              Get started
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
