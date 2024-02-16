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
        image: true
      }
    });

    return users;
  }

  const topUsers = await getTopUsers();

  if (!topUsers) {
    return <p>Leaderboard is empty</p>;
  } else {
    return (
      <div className="md:container my-6 space-y-6 md:p-10 md:pb-16 md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="md:text-lg text-base w-[10px]">Rank</TableHead>
              <TableHead className="md:text-lg text-base text-left">User</TableHead>
              <TableHead className="md:text-lg text-base text-right">Score1</TableHead>
              <TableHead className="md:text-lg text-base text-right">Score2</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topUsers.map((topUser, i) => (
              <TableRow key={topUser.id}>
                {i < 3 ? (
                  <TableCell className="text-base md:text-lg font-bold text-yellow-400">
                    #{++i}
                  </TableCell>
                ) : (
                  <TableCell className="text-base md:text-lg font-bold">#{++i}</TableCell>
                )}
                <TableCell className="flex items-center space-x-2">
                  {topUser.image === null ? (
                    <Avatar className="md:ml-3 shadow-md h-6 w-6">
                      <AvatarImage alt="profileImage" />
                      <AvatarFallback>
                        {topUser.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <Avatar className="md:ml-3 shadow-md h-6 w-6">
                      <AvatarImage src={topUser.image} alt="profileImage" />
                      <AvatarFallback>
                        {topUser.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <p className="text-base md:text-lg">{topUser.name}</p>
                </TableCell>
                <TableCell className="md:text-lg text-base text-right">123</TableCell>
                <TableCell className="md:text-lg text-base text-right">580</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}
