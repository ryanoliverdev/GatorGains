'use server';

import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar';
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { getServerSession } from 'next-auth/next';
import { prisma } from '@/lib/prisma';
import { ScrollArea } from '@/components/ui/scroll-area';
import { group } from 'console';
import { sendMessage } from '../../groupActions';
import SendButton from './sendMessageComponent';
import ProgressBar from '@/components/dietTracking/progressBar';

export default async function Component({
  params
}: {
  params: { groupId: string };
}) {
  const session = await getServerSession(authOptions);

  async function getGroupInfo() {
    const group = await prisma.group.findUnique({
      where: {
        id: params.groupId
      },
      include: {
        messages: {
          select: {
            usersName: true,
            content: true,
            createdAt: true
          }
        },
        users: {
          select: {
            id: true,
            username: true,
            xp: true,
            image: true
          }
        }
      }
    });

    return group;
  }

  const groupData = await getGroupInfo();

  if (session === null || groupData === null || groupData.users.length === 0) {
    return <p>No Access</p>;
  }

  const totalMembers = groupData.users.length;
  const currentTime = new Date();
  return (
    <div className="container mt-6 mb-6">
      <Card className=" h-[100%]">
        <CardHeader className="flex flex-col md:flex-row items-center justify-between pb-2 gap-2  md:items-start md:gap-4 md:pb-4">
          <div className="flex items-center gap-2">
            <Avatar className="w-10 h-10 border">
              <AvatarImage alt="Avatar" src="" />
              <AvatarFallback>{groupData.emojiLogo}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <CardTitle className="text-base font-bold">
                {groupData.name}
              </CardTitle>
              <CardDescription className="text-sm font-normal text-gray-500 dark:text-gray-400">
                {totalMembers} Members
              </CardDescription>
              <h1 className='text-sm font-normal text-gray-500 dark:text-gray-400'> {groupData.description} </h1>
            </div>
          </div>
          <div>
            <h1 className='text-base font-semibold'>Group XP - {groupData.users.reduce((acc, user) => acc + user.xp, 0)}</h1>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 mt-5">
          <div className="flex md:flex-row flex-col gap-4">
            <ScrollArea className="h-[600px]">
              <div className="grid gap-4">
                {groupData.users.map((user) => (
                  <Card key={user.id}>
                    <CardContent className="flex flex-col pt-5 gap-2 w-full md:w-[300px]">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-10 h-10 border">
                          <AvatarImage src={user.image || ''} alt="@shadcn" />
                          <AvatarFallback>
                            {user.username?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <CardTitle className="text-sm font-medium">
                            {user.username}
                          </CardTitle>
                          <CardDescription className="text-xs font-normal text-gray-500 dark:text-gray-400">
                            {user.xp} XP
                          </CardDescription>
                        </div>
                      </div>
                      <ProgressBar id={user.id} />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
            <Card className="flex-1">
              <CardHeader className="flex items-center h-10 px-4 gap-2 md:h-12 md:gap-4 lg:px-6">
                <CardTitle className="flex flex-row items-center gap-2">
                  Chat <Badge>{groupData.messages.length}</Badge>
                </CardTitle>
              </CardHeader>
              <ScrollArea className='h-[500px]'>
                <CardContent className="flex flex-col gap-4 p-4 text-sm">
                  {groupData.messages.reverse().map((message) => (
                    <div className="flex items-start gap-4">
                      <Avatar className="w-8 h-8">
                        <AvatarImage alt="logo" src="" />
                        <AvatarFallback>
                          {message.usersName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-semibold">{message.usersName}</div>
                        <p>{message.content}</p>
                        <time className="block mt-1 text-xs text-gray-500 dark:text-gray-400">
                          {Math.ceil(
                            Math.floor(
                              Math.floor(
                                Number(currentTime) - Number(message.createdAt)
                              ) / 1000
                            ) / 60
                          )}{' '}
                          minutes ago
                        </time>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </ScrollArea>
              <CardFooter className="p-2">
                <SendButton gId={groupData.id} uId={session.user.id} />
              </CardFooter>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function PaperclipIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function SendIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function SmileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  );
}
