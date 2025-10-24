import {NextResponse} from 'next/server';
import {gradeItems} from '@/mocks/fixtures/courses';

export async function GET(_: Request, {params}: {params: {courseId: string}}) {
  const courseGrades = gradeItems.filter((item) => item.courseId === params.courseId);
  return NextResponse.json(courseGrades);
}
