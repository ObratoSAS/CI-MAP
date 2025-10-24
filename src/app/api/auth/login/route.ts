import {NextResponse} from 'next/server';
import {defaultSession} from '@/mocks/fixtures/auth';

export async function POST() {
  return NextResponse.json({success: true, session: defaultSession});
}
