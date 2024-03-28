'use server';

import ExampleSearch from '@/components/example/search';
import NutritionTable from '@/components/nutritionTracking/page';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import DashboardDiet from '@/components/dietTracking/dashboardDiet';
import { Card } from '@/components/ui/card';
import SummaryCard from '@/components/features/dashboard/summaryCard';

export async function DashboardFinal({ options }: { options: any }) {
  return (
    <div>
      <div className="container my-6 space-y-6">
        <div className="flex justify-center">
          <div className="w-full rounded-lg border divide-y shadow-sm">
            <SummaryCard options={options}></SummaryCard>
            <DashboardDiet></DashboardDiet>
          </div>
        </div>
      </div>
    </div>
  );
}
