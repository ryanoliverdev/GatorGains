'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export interface Group {
  id: string;
  name: string;
}

export default function GroupContent({ groups }: { groups: Group[] }) {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-3xl rounded-lg border divide-y shadow-sm">
        {groups.map((group, i) => (
          <div className="flex items-center justify-between p-4" key={group.id}>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-4">
                <div className="font-semibold">{group.name}</div>
              </div>
            </div>
            <Button>Join Group</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
