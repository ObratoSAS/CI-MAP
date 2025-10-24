import {NextResponse} from 'next/server';
import {messages} from '@/mocks/fixtures/messages';

export async function GET(_: Request, {params}: {params: {threadId: string}}) {
  const threadMessages = messages.filter((message) => message.threadId === params.threadId);
  return NextResponse.json(threadMessages);
}
