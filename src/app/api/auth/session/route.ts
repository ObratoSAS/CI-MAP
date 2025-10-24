import {NextResponse} from 'next/server';
import {defaultSession} from '@/mocks/fixtures/auth';

export async function GET() {
  return NextResponse.json(defaultSession);
}
