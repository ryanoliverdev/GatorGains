'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useState } from 'react';
import { joinGroup } from '../groupActions';

export interface Group {
  id: string;
  name: string;
  groupLeaderName: string;
  emojiLogo: string;
}

export default function GroupContent({
  groups,
  userId
}: {
  groups: Group[];
  userId: string;
}) {
  const [search, setSearch] = useState('');
  const filteredCards = groups.filter(
    (card) =>
      card.groupLeaderName.toLowerCase().includes(search.toLowerCase()) ||
      card.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center">
      <div className=" w-full max-w-3xl mb-6">
        <Input
          className="sm:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Groups..."
          type="text"
        />
      </div>
      {filteredCards.length === 0 ? (
        <p>No groups found...</p>
      ) : (
        <div className="w-full max-w-3xl rounded-lg border divide-y shadow-sm">
          {filteredCards.map((group) => (
            <Link
              key={group.id}
              className="flex items-center justify-between p-4"
              href={`/groups/view/${group.id}`}
            >
              <div className="flex items-center space-x-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>{group.emojiLogo}</AvatarFallback>
                </Avatar>
                <div className="flex-col">
                  <h1 className="font-semibold">{group.name}</h1>
                  <h1>Owner - {group.groupLeaderName} </h1>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
