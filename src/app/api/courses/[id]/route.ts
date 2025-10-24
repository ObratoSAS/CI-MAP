import {NextResponse} from 'next/server';
import {courses} from '@/mocks/fixtures/courses';

export async function GET(_: Request, {params}: {params: {id: string}}) {
  const course = courses.find((item) => item.id === params.id);
  if (!course) {
    return NextResponse.json({message: 'not-found'}, {status: 404});
  }
  return NextResponse.json(course);
}
