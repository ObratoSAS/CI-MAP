import {NextResponse} from 'next/server';
import {enrollments} from '@/mocks/fixtures/courses';

export async function GET() {
  return NextResponse.json(enrollments);
}
