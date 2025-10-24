import {NextResponse} from 'next/server';
import {announcements} from '@/mocks/fixtures/courses';

export async function GET(_: Request, {params}: {params: {courseId: string}}) {
  const courseAnnouncements = announcements.filter((item) => item.courseId === params.courseId);
  return NextResponse.json(courseAnnouncements);
}
