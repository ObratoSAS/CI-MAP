import {useTranslations} from 'next-intl';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Link} from '@/lib/i18n/navigation';

export default function LandingPage() {
  const t = useTranslations('landing');
  const actions = useTranslations('common.actions');

  return (
    <div className="space-y-16">
      <section className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {t('hero.title')}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">{t('hero.subtitle')}</p>
          <Button asChild size="lg">
            <Link href="/catalog">{t('hero.cta')}</Link>
          </Button>
        </div>
        <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-floating dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">
            {t('benefits.title')}
          </p>
          <ul className="space-y-3 text-slate-600 dark:text-slate-300">
            {t.raw('benefits.items').map((item: string) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 text-brand">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((index) => (
          <Card key={index} className="h-full">
            <CardHeader>
              <CardTitle>{`Aurora ${index}`}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {t('cardDescription')}
              </p>
              <Button asChild className="mt-4" variant="outline">
                <Link href="/catalog">{actions('viewAll')}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
