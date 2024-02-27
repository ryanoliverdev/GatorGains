'use client';
import ExampleSearch from '@/components/example/search';
import NutritionTable from '@/components/nutritionTracking/page';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';

export function DashboardFinal({ options }: { options: any }) {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {options.user.name}</p>
      <p>Here&apos;s your avatar, </p>
      <img src={options.user.image} alt="react logo" />
      <ExampleSearch></ExampleSearch>
    </div>
  );
}
