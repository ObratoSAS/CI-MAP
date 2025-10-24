import {getTranslations, unstable_setRequestLocale} from 'next-intl/server';
import {ForgotForm} from '@/components/domain/auth/forgot-form';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {locales, type Locale} from '@/lib/i18n/config';

export const metadata = {
  title: 'Aurora LMS · Forgot password'
};

export default async function ForgotPasswordPage({params}: {params: {locale: Locale}}) {
  unstable_setRequestLocale(params.locale);
  const t = await getTranslations('auth');

  if (!locales.includes(params.locale)) {
    return null;
  }

  return (
    <div className="mx-auto grid w-full max-w-md gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('forgot.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <ForgotForm />
        </CardContent>
      </Card>
    </div>
  );
}
