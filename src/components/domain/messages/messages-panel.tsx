'use client';

import * as React from 'react';
import {useTranslations} from 'next-intl';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Textarea} from '@/components/ui/textarea';
import {Button} from '@/components/ui/button';
import type {Message, MessageThread, User} from '@/types';

interface MessagesPanelProps {
  threads: MessageThread[];
  messages: Message[];
  users: User[];
}

export const MessagesPanel = ({threads, messages, users}: MessagesPanelProps) => {
  const t = useTranslations('messages');
  const [selected, setSelected] = React.useState<MessageThread | null>(threads[0] ?? null);
  const conversation = messages.filter((message) => message.threadId === selected?.id);

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>{t('inbox')}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {threads.map((thread) => (
              <li key={thread.id}>
                <button
                  type="button"
                  onClick={() => setSelected(thread)}
                  className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                    selected?.id === thread.id
                      ? 'border-brand bg-brand/10'
                      : 'border-slate-200 hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-900'
                  }`}
                >
                  <p className="font-medium text-slate-900 dark:text-slate-100">{thread.subject}</p>
                  <p className="text-xs text-slate-500">{new Date(thread.updatedAt).toLocaleString()}</p>
                </button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card className="h-full">
        <CardHeader>
          <CardTitle>{selected?.subject ?? t('title')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {conversation.map((message) => {
              const author = users.find((user) => user.id === message.authorId);
              return (
                <div key={message.id} className="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{author?.name}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{message.body}</p>
                </div>
              );
            })}
          </div>
          <Textarea placeholder={t('placeholder')} />
          <Button type="button">{t('send')}</Button>
        </CardContent>
      </Card>
    </div>
  );
};
