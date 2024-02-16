import HeroHeader from '@/components/home/hero';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from '@/components/ui/carousel';
import Features from '@/components/home/features';
import FeatureCards from '@/components/home/feature-card';
export default function Home() {
  return (
    <>
      <HeroHeader />
      <FeatureCards />
      <Features />
    </>
  );
}
