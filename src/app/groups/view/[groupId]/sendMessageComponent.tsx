'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SendIcon } from 'lucide-react';
import { sendMessage } from '../../groupActions';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SendButton({ gId, uId }: { gId: string; uId: string }) {
  const [message, setMessage] = useState('');

  const router = useRouter();

  return (
    <form>
      <div className="flex rounded-xl border">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 rounded-xl border-0"
          placeholder="Type a message..."
          type="text"
          minLength={1}
          maxLength={200}
        />
        <Button
          className="rounded-full"
          onClick={async (e) => {
            e.preventDefault();
            if (message.length > 0) {
              await sendMessage(gId, uId, message);
              setMessage('');
              router.refresh();
            } else console.log('Message is empty');
          }}
          variant="ghost"
        >
          <SendIcon className="w-5 h-5" />
          <span className="sr-only">Send</span>
        </Button>
      </div>
    </form>
  );
}
