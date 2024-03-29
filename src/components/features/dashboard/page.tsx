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
import IndLeaderBoard from './groupCard';
export async function DashboardFinal({ options }: { options: any }) {
  return (
    <div>
      <div className="container my-6 space-y-6">
        <div className="flex justify-center">
          <div className="w-full sm:rounded-lg sm:border divide-y shadow-sm">
            <SummaryCard options={options}></SummaryCard>
            <div className="flex flex-col lg:flex-row">
              {/* DashboardDiet */}
              <div className="w-full pb-8 lg:pb-0 border-b lg:border-r px-2 lg:w-2/3">
                <DashboardDiet></DashboardDiet>
              </div>
              {/* IndLeaderBoard */}
              <div className="w-full lg:w-1/3 px-2 lg:mt-0">
                <div className=" border-gray-300">
                  <IndLeaderBoard></IndLeaderBoard>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
