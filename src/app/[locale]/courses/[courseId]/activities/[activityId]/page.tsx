import {notFound} from 'next/navigation';
import {unstable_setRequestLocale, getTranslations} from 'next-intl/server';
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import type {Course, Locale} from '@/types';

async function getCourse(courseId: string): Promise<Course | null> {
  const response = await fetch(`/api/courses/${courseId}`, {cache: 'no-store'});
  if (!response.ok) {
    return null;
  }
  return (await response.json()) as Course;
}

export default async function ActivityPage({
  params
}: {
  params: {courseId: string; activityId: string; locale: Locale};
}) {
  unstable_setRequestLocale(params.locale);
  const [course, tActivities] = await Promise.all([
    getCourse(params.courseId),
    getTranslations('activities')
  ]);
  if (!course) notFound();
  const activity = course.sections.flatMap((section) => section.activities).find((item) => item.id === params.activityId);
  if (!activity) notFound();

  const content = (() => {
    switch (activity.type) {
      case 'assignment':
        return (
          <div className="space-y-4">
            <p>{activity.description}</p>
            <Textarea placeholder={tActivities('assignment.upload')} />
            <Button type="button">{tActivities('assignment.submit')}</Button>
          </div>
        );
      case 'quiz':
        return (
          <div className="space-y-4">
            <p>{tActivities('quiz.timer')}: 20 min</p>
            <Button type="button">{tActivities('quiz.start')}</Button>
          </div>
        );
      case 'forum':
        return (
          <div className="space-y-4">
            <Textarea placeholder={tActivities('forum.newThread')} />
            <Button type="button">{tActivities('forum.reply')}</Button>
          </div>
        );
      default:
        return (
          <div className="space-y-4">
            <p>{tActivities('resource.title')}</p>
            <Button type="button">{tActivities('resource.download')}</Button>
          </div>
        );
    }
  })();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{activity.title}</CardTitle>
        <CardDescription>{tActivities(`${activity.type}.title` as const)}</CardDescription>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  );
}
