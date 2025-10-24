import {NextResponse} from 'next/server';
import {threads} from '@/mocks/fixtures/messages';

export async function GET() {
  return NextResponse.json(threads);
}
