import {notFound} from 'next/navigation';
import {unstable_setRequestLocale, getTranslations} from 'next-intl/server';
import {CatalogView} from '@/components/domain/catalog/catalog-view';
import type {Course} from '@/types';
import {locales, type Locale} from '@/lib/i18n/config';

export const revalidate = 120;

async function getCourses(locale: Locale): Promise<Course[]> {
  const response = await fetch('/api/courses', {
    headers: {
      'Accept-Language': locale
    },
    next: {revalidate: 120}
  });

  if (!response.ok) {
    throw new Error('catalog-error');
  }

  return (await response.json()) as Course[];
}

export default async function CatalogPage({params}: {params: {locale: Locale}}) {
  const locale = params.locale;
  if (!locales.includes(locale)) {
    notFound();
  }
  unstable_setRequestLocale(locale);
  const t = await getTranslations('catalog');
  const courses = await getCourses(locale);

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">{t('title')}</h1>
        <p className="text-slate-600 dark:text-slate-300">
          {t('description')}
        </p>
      </header>
      <CatalogView courses={courses} />
    </section>
  );
}
