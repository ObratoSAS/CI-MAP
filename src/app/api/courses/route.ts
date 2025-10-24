import {NextResponse} from 'next/server';
import {courses} from '@/mocks/fixtures/courses';

export const revalidate = 60;

export async function GET() {
  return NextResponse.json(courses);
}
