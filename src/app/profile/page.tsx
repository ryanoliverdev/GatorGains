import { Separator } from '@/components/ui/separator';
import { ProfileForm } from './profile-form';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

export default async function SettingsProfilePage() {
  const session = await getServerSession(authOptions);
  return (
    <div className="space-y-6">
      <ProfileForm email={session?.user?.email || ''} />
    </div>
  );
}
