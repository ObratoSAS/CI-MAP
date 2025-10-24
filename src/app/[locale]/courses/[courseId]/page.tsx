import {notFound} from 'next/navigation';
import {unstable_setRequestLocale} from 'next-intl/server';
import {CourseShell} from '@/components/domain/courses/course-shell';
import type {Course, Locale} from '@/types';

async function getCourse(courseId: string): Promise<Course | null> {
  const response = await fetch(`/api/courses/${courseId}`, {cache: 'no-store'});
  if (!response.ok) {
    return null;
  }
  return (await response.json()) as Course;
}

export default async function CoursePage({params}: {params: {courseId: string; locale: Locale}}) {
  unstable_setRequestLocale(params.locale);
  const course = await getCourse(params.courseId);
  if (!course) {
    notFound();
  }

  return <CourseShell course={course} participants={32} />;
}
