import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { getMessages, locales, type Locale } from '../../i18n';
import { Providers } from '../../components/providers';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamic = 'force-static';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="UTC">
      <Providers>
        <div className="min-h-screen bg-slate-950 text-slate-100">
          <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
        </div>
      </Providers>
    </NextIntlClientProvider>
  );
}
