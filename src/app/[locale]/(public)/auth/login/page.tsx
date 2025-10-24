import {getTranslations, unstable_setRequestLocale} from 'next-intl/server';
import Link from 'next/link';
import {LoginForm} from '@/components/domain/auth/login-form';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {locales, type Locale} from '@/lib/i18n/config';

export const metadata = {
  title: 'Aurora LMS · Login'
};

export default async function LoginPage({params}: {params: {locale: Locale}}) {
  unstable_setRequestLocale(params.locale);
  const t = await getTranslations('auth');

  if (!locales.includes(params.locale)) {
    return null;
  }

  return (
    <div className="mx-auto grid w-full max-w-md gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('login.title')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <LoginForm />
          <div className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300">
            <Link href="/auth/forgot-password" className="text-brand">
              {t('login.forgot')}
            </Link>
            <Link href="/auth/register" className="text-brand">
              {t('login.register')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
