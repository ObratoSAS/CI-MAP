import {unstable_setRequestLocale} from 'next-intl/server';
import {CalendarView} from '@/components/domain/calendar/calendar-view';
import {calendarEvents} from '@/mocks/fixtures/courses';
import type {Locale} from '@/types';

export default async function CalendarPage({params}: {params: {locale: Locale}}) {
  unstable_setRequestLocale(params.locale);
  return <CalendarView events={calendarEvents} />;
}
