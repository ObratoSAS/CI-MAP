import {unstable_setRequestLocale, getTranslations} from 'next-intl/server';
import {AdminOverview} from '@/components/domain/admin/admin-overview';
import {courses} from '@/mocks/fixtures/courses';
import {users} from '@/mocks/fixtures/users';
import {getSession} from '@/lib/auth/session';
import type {Locale} from '@/types';

export default async function AdminPage({params}: {params: {locale: Locale}}) {
  unstable_setRequestLocale(params.locale);
  const [t, session] = await Promise.all([getTranslations('admin'), getSession()]);

  if (session.user?.role !== 'admin') {
    return (
      <p className="text-sm text-red-600">{t('manage')}</p>
    );
  }

  const stats = [
    {label: t('users.title'), value: String(users.length), action: t('users.create')},
    {label: t('courses.title'), value: String(courses.length), action: t('courses.create')},
    {label: t('categories.title'), value: '6', action: t('categories.create')}
  ];

  return <AdminOverview stats={stats} />;
}
