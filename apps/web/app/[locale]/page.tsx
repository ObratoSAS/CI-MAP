import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Button } from '@novalms/ui';

export default async function LocaleHome({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'landing' });

  return (
    <div className="space-y-6">
      <header className="rounded-3xl bg-gradient-to-br from-brand to-brand-dark p-8 text-white shadow-2xl">
        <h1 className="text-4xl font-semibold leading-tight">{t('title')}</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-100/90">{t('subtitle')}</p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link href={`/${params.locale}/catalog`} className="inline-block">
            <Button className="bg-white text-brand hover:bg-slate-100" variant="primary">
              {t('ctaExplore')}
            </Button>
          </Link>
          <Link href={`/${params.locale}/auth/login`} className="inline-block">
            <Button variant="secondary">{t('ctaLogin')}</Button>
          </Link>
        </div>
      </header>
      <section className="grid gap-6 md:grid-cols-3">
        {FEATURES.map((feature) => (
          <article key={feature.id} className="rounded-2xl bg-slate-900/80 p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-white">{t(`features.${feature.id}.title`)}</h2>
            <p className="mt-2 text-sm text-slate-300">{t(`features.${feature.id}.description`)}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

const FEATURES = [
  { id: 'courses' },
  { id: 'assessments' },
  { id: 'analytics' },
] as const;
