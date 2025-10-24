import {notFound} from 'next/navigation';
import {unstable_setRequestLocale, getTranslations} from 'next-intl/server';
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import type {Course, Locale} from '@/types';

async function getCourse(courseId: string): Promise<Course | null> {
  const response = await fetch(`/api/courses/${courseId}`, {cache: 'no-store'});
  if (!response.ok) {
    return null;
  }
  return (await response.json()) as Course;
}

export default async function SectionPage({
  params
}: {
  params: {courseId: string; sectionId: string; locale: Locale};
}) {
  unstable_setRequestLocale(params.locale);
  const [course, tCourses, tActivities] = await Promise.all([
    getCourse(params.courseId),
    getTranslations('courses'),
    getTranslations('activities')
  ]);
  if (!course) notFound();
  const section = course.sections.find((item) => item.id === params.sectionId);
  if (!section) notFound();

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <Badge variant="outline">{course.title}</Badge>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{section.title}</h1>
        <p className="text-slate-600 dark:text-slate-300">{section.summary}</p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>{tCourses('activities')}</CardTitle>
          <CardDescription>{tCourses('content')}</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {section.activities.map((activity) => (
              <li key={activity.id} className="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">{activity.title}</p>
                    <p className="text-sm text-slate-500">{activity.description}</p>
                  </div>
                  <Badge variant="outline">{tActivities(`${activity.type}.title` as const)}</Badge>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
