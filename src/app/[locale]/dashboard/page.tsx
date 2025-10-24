import {getTranslations, unstable_setRequestLocale} from 'next-intl/server';
import {DashboardView} from '@/components/domain/dashboard/dashboard-view';
import {getSession} from '@/lib/auth/session';
import type {Course, Enrollment, GradeItem, Locale} from '@/types';

async function fetchJSON<T>(path: string): Promise<T> {
  const response = await fetch(path, {next: {revalidate: 30}});
  if (!response.ok) {
    throw new Error('dashboard-fetch-error');
  }
  return (await response.json()) as T;
}

export default async function DashboardPage({params}: {params: {locale: Locale}}) {
  unstable_setRequestLocale(params.locale);
  const session = await getSession();
  const courses = await fetchJSON<Course[]>('/api/courses');
  const enrollments = await fetchJSON<Enrollment[]>('/api/enrollments');
  const gradesArrays = await Promise.all(courses.map((course) => fetchJSON<GradeItem[]>(`/api/grades/${course.id}`)));
  const grades = gradesArrays.flat();
  const t = await getTranslations('dashboard');

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">{t('title')}</h1>
        <p className="text-slate-600 dark:text-slate-300">{session.user?.name}</p>
      </header>
      <DashboardView role={session.user?.role ?? 'guest'} user={session.user} courses={courses} enrollments={enrollments} grades={grades} />
    </section>
  );
}
