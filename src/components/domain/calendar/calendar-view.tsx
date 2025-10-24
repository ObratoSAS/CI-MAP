'use client';

import * as React from 'react';
import {useTranslations} from 'next-intl';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import type {CalendarEvent} from '@/types';

interface CalendarViewProps {
  events: CalendarEvent[];
}

export const CalendarView = ({events}: CalendarViewProps) => {
  const t = useTranslations('calendar');
  const tActivities = useTranslations('activities');
  const [view, setView] = React.useState<'month' | 'week'>('month');

  const typeLabel = (type: CalendarEvent['type']) => {
    if (type === 'assignment') return tActivities('assignment.title');
    if (type === 'session') return t('types.session');
    if (type === 'meeting') return t('types.meeting');
    return t('types.reminder');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setView('month')}
          className={`rounded-full px-4 py-2 text-sm ${
            view === 'month' ? 'bg-brand text-white' : 'bg-slate-200 dark:bg-slate-800'
          }`}
        >
          {t('views.month')}
        </button>
        <button
          type="button"
          onClick={() => setView('week')}
          className={`rounded-full px-4 py-2 text-sm ${
            view === 'week' ? 'bg-brand text-white' : 'bg-slate-200 dark:bg-slate-800'
          }`}
        >
          {t('views.week')}
        </button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>
        </CardHeader>
        <CardContent>
          {events.length === 0 ? (
            <p className="text-sm text-slate-500">{t('empty')}</p>
          ) : (
            <ul className="space-y-3">
              {events.map((event) => (
                <li key={event.id} className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 p-4 dark:border-slate-800">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{event.title}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-300">
                      {new Date(event.start).toLocaleString()} · {event.description}
                    </p>
                  </div>
                  <Badge variant="outline">{typeLabel(event.type)}</Badge>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
