import {NextResponse} from 'next/server';
import {calendarEvents} from '@/mocks/fixtures/courses';

export async function GET() {
  return NextResponse.json(calendarEvents);
}
