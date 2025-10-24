import {getTranslations, unstable_setRequestLocale} from 'next-intl/server';
import {RegisterForm} from '@/components/domain/auth/register-form';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {locales, type Locale} from '@/lib/i18n/config';

export const metadata = {
  title: 'Aurora LMS · Register'
};

export default async function RegisterPage({params}: {params: {locale: Locale}}) {
  unstable_setRequestLocale(params.locale);
  const t = await getTranslations('auth');

  if (!locales.includes(params.locale)) {
    return null;
  }

  return (
    <div className="mx-auto grid w-full max-w-xl gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('register.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  );
}
