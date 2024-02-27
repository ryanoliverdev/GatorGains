import { useSession, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardFinal } from '@/components/features/dashboard/page';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

export default async function DietTracking() {
  const session = await getServerSession(authOptions);

  // If there's a session (user is logged in), render the dashboard

  return (
    <p>Hello</p>
  );
}
