import {notFound} from 'next/navigation';
import {unstable_setRequestLocale, getTranslations} from 'next-intl/server';
import {GradebookTable} from '@/components/domain/gradebook/gradebook-table';
import {Breadcrumbs} from '@/components/ui/breadcrumbs';
import type {Course, GradeItem, Locale, User} from '@/types';
import {users} from '@/mocks/fixtures/users';

async function getCourse(courseId: string): Promise<Course | null> {
  const response = await fetch(`/api/courses/${courseId}`, {cache: 'no-store'});
  if (!response.ok) {
    return null;
  }
  return (await response.json()) as Course;
}

async function getGrades(courseId: string): Promise<GradeItem[]> {
  const response = await fetch(`/api/grades/${courseId}`, {cache: 'no-store'});
  if (!response.ok) {
    return [];
  }
  return (await response.json()) as GradeItem[];
}

export default async function GradebookPage({params}: {params: {courseId: string; locale: Locale}}) {
  unstable_setRequestLocale(params.locale);
  const [course, grades, tGradebook, tNav] = await Promise.all([
    getCourse(params.courseId),
    getGrades(params.courseId),
    getTranslations('gradebook'),
    getTranslations('navigation')
  ]);
  if (!course) notFound();

  const students: User[] = users.filter((user) => user.role === 'student');

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          {href: '/', label: tNav('landing')},
          {href: `/courses/${course.id}`, label: course.title},
          {href: `/gradebook/${course.id}`, label: tGradebook('title'), current: true}
        ]}
      />
      <GradebookTable grades={grades} students={students} />
    </div>
  );
}
