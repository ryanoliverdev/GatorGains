/**
 * v0 by Vercel.
 * @see https://v0.dev/t/fHR904xfVVE
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
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

export default function Component() {
  return (
    <div className="container">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 gap-2 md:flex-col md:items-start md:gap-4 md:pb-4">
          <div className="flex items-center gap-2">
            <Avatar className="w-10 h-10 border">
              <AvatarImage alt="Avatar" src="/placeholder-user.jpg" />
              <AvatarFallback>👨🏻</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <CardTitle className="text-base font-bold">Designers</CardTitle>
              <CardDescription className="text-sm font-normal text-gray-500 dark:text-gray-400">
                5 Members
              </CardDescription>
            </div>
          </div>
          <Button
            className="rounded-full md:ml-auto"
            size="icon"
            variant="outline"
          >
            <PlusIcon className="w-4 h-4" />
            <span className="sr-only">Add member</span>
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardContent className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Avatar className="w-10 h-10 border">
                    <AvatarImage alt="Avatar" src="/placeholder-user.jpg" />
                    <AvatarFallback>👨🏻</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <CardTitle className="text-sm font-medium">
                      Alice Freeman
                    </CardTitle>
                    <CardDescription className="text-xs font-normal text-gray-500 dark:text-gray-400">
                      @alicefreeman
                    </CardDescription>
                  </div>
                </div>
                <div className="grid gap-1.5 text-sm">
                  <div>🎨 120 XP</div>
                  <div>📝 50 XP</div>
                  <div>🏆 300 XP</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Avatar className="w-10 h-10 border">
                    <AvatarImage alt="Avatar" src="/placeholder-user.jpg" />
                    <AvatarFallback>👨🏻</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <CardTitle className="text-sm font-medium">
                      Bob Johnson
                    </CardTitle>
                    <CardDescription className="text-xs font-normal text-gray-500 dark:text-gray-400">
                      @bobjohnson
                    </CardDescription>
                  </div>
                </div>
                <div className="grid gap-1.5 text-sm">
                  <div>🎨 200 XP</div>
                  <div>📝 80 XP</div>
                  <div>🏆 150 XP</div>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card className="flex-1">
            <CardHeader className="flex items-center h-10 px-4 gap-2 md:h-12 md:gap-4 lg:px-6">
              <CardTitle>Chat</CardTitle>
              <Badge>3</Badge>
              <div className="ml-auto flex gap-2">
                <Button className="rounded-full" size="icon" variant="ghost">
                  <PaperclipIcon className="w-4 h-4" />
                  <span className="sr-only">Attach file</span>
                </Button>
                <Button className="rounded-full" size="icon" variant="ghost">
                  <SmileIcon className="w-4 h-4" />
                  <span className="sr-only">Insert emoji</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 p-4 text-sm">
              <div className="flex items-start gap-4">
                <Avatar className="w-8 h-8">
                  <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-semibold">Alice Freeman</div>
                  <p>
                    Hey everyone! Just submitted my latest design. Let me know
                    what you think! 😊
                  </p>
                  <time className="block mt-1 text-xs text-gray-500 dark:text-gray-400">
                    2 minutes ago
                  </time>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Avatar className="w-8 h-8">
                  <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-semibold">Bob Johnson</div>
                  <p>
                    Hey everyone! Just submitted my latest design. Let me know
                    what you think! 😊
                  </p>
                  <time className="block mt-1 text-xs text-gray-500 dark:text-gray-400">
                    5 minutes ago
                  </time>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Avatar className="w-8 h-8">
                  <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-semibold">Charlie Brown</div>
                  <p>
                    Hey everyone! Just submitted my latest design. Let me know
                    what you think! 😊
                  </p>
                  <time className="block mt-1 text-xs text-gray-500 dark:text-gray-400">
                    10 minutes ago
                  </time>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-2">
              <form>
                <div className="flex rounded-xl border">
                  <Input
                    className="flex-1 rounded-xl border-0"
                    placeholder="Type a message..."
                    type="text"
                  />
                  <Button
                    className="rounded-full"
                    type="submit"
                    variant="ghost"
                  >
                    <SendIcon className="w-5 h-5" />
                    <span className="sr-only">Send</span>
                  </Button>
                </div>
              </form>
            </CardFooter>
          </Card>
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
