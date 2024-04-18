import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { prisma } from '@/lib/prisma';
export const dynamic = 'force-dynamic';

export default async function IndLeaderBoard() {
  const session = await getServerSession(authOptions);

  // This will be where we calculate scores somehow in a bit and rank users
  async function getTopUsers() {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        image: true,
        username: true,
        xp: true
      },
      where: {
        username: {
          not: null
        }
      },
      orderBy: {
        xp: 'desc'
      }
    });

    return users;
  }

  const topUsers = await getTopUsers();

  if (!topUsers) {
    return <p>Leaderboard is empty</p>;
  } else {
    return (
      <div className="container my-6 space-y-6">
        <div className='flex justify-center items-center mb-12 mt-12'>
          <h1 className="animatedText font-bold text-6xl drop-shadow-md">Leaderboard</h1>
          <h1 className="animatedTrophy font-bold text-5xl drop-shadow-md">🏆</h1>
        </div>
        <div className="flex justify-center">
          <div className="w-full max-w-3xl rounded-lg border divide-y shadow-sm">
            {topUsers.map((topUser, i) => (
              <div
                className="flex items-center justify-between p-4"
                key={topUser.id}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-7 w-7 shadow-md cursor-pointer">
                      <AvatarImage
                        src={topUser.image ?? undefined}
                        alt="@shadcn"
                      />
                      <AvatarFallback>
                        {topUser.username
                          ? topUser.username.charAt(0).toUpperCase()
                          : ''}
                      </AvatarFallback>
                    </Avatar>
                    <div className="font-semibold">
                      {++i}. {topUser.username}
                    </div>
                  </div>
                </div>
                <div className="font-medium text-gray-500">{topUser.xp} XP</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
