'use client';

import * as React from 'react';
import {useTranslations} from 'next-intl';
import {Tabs} from '@/components/ui/tabs';
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {Link} from '@/lib/i18n/navigation';
import {Breadcrumbs} from '@/components/ui/breadcrumbs';
import type {Activity, Course} from '@/types';

interface CourseShellProps {
  course: Course;
  participants: number;
}

export const CourseShell = ({course, participants}: CourseShellProps) => {
  const t = useTranslations('courses');
  const nav = useTranslations('navigation');

  const sectionsContent = (
    <div className="space-y-4">
      {course.sections.map((section) => (
        <Card key={section.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {section.title}
              <Badge variant="outline">{section.activities.length} {t('activities')}</Badge>
            </CardTitle>
            <CardDescription>{section.summary}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {section.activities.map((activity) => (
                <ActivityRow key={activity.id} activity={activity} courseId={course.id} />
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const tabs = [
    {value: 'content', label: t('content'), content: sectionsContent},
    {
      value: 'participants',
      label: t('participants'),
      content: <p className="text-slate-600 dark:text-slate-300">{participants} {t('participants')}</p>
    },
    {value: 'grades', label: t('grades'), content: <p className="text-slate-600 dark:text-slate-300">{t('grades')}</p>},
    {
      value: 'announcements',
      label: t('announcements'),
      content: <p className="text-slate-600 dark:text-slate-300">{t('announcements')}</p>
    }
  ];

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          {href: '/', label: nav('landing')},
          {href: '/catalog', label: nav('catalog')},
          {href: `/courses/${course.id}`, label: course.title, current: true}
        ]}
      />
      <header className="space-y-4">
        <Badge variant="outline">{course.tags?.[0] ?? t('content')}</Badge>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">{course.title}</h1>
        <p className="text-slate-600 dark:text-slate-300">{course.summary}</p>
      </header>
      <Tabs tabs={tabs} defaultValue="content" />
    </div>
  );
};

const icons: Record<Activity['type'], string> = {
  assignment: '📝',
  quiz: '❓',
  forum: '💬',
  resource: '📄'
};

const ActivityRow = ({activity, courseId}: {activity: Activity; courseId: string}) => {
  const t = useTranslations('courses');
  return (
    <li className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
      <div className="flex items-center gap-3">
        <span className="text-xl" aria-hidden>
          {icons[activity.type]}
        </span>
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{activity.title}</p>
          <p className="text-sm text-slate-500 dark:text-slate-300">{activity.description}</p>
        </div>
      </div>
      <Link href={`/courses/${courseId}/activities/${activity.id}`} className="text-sm text-brand">
        {t('content')}
      </Link>
    </li>
  );
};
