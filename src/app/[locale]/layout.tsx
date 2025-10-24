import type {Metadata} from 'next';
import {NextIntlClientProvider, getMessages, unstable_setRequestLocale} from 'next-intl/server';
import {Providers} from '@/components/layout/providers';
import {MainNavigation} from '@/components/layout/main-navigation';
import {LanguageSwitcher} from '@/components/layout/language-switcher';
import {ThemeToggle} from '@/components/layout/theme-toggle';
import {MobileNav} from '@/components/layout/mobile-nav';
import '@/styles/globals.css';
import {locales, type Locale} from '@/lib/i18n/config';

export const metadata: Metadata = {
  title: 'Aurora LMS',
  description: 'Modern LMS experience inspired by Moodle with a contemporary frontend stack'
};

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: {locale: Locale};
}) {
  const locale = params.locale;

  if (!locales.includes(locale)) {
    return children;
  }

  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Providers>
        <header className="border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
          <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
            <MainNavigation />
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </header>
        <MobileNav />
        <main className="mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-7xl flex-col gap-8 px-6 py-8">{children}</main>
        <footer className="border-t border-slate-200 bg-white py-6 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
            <span>© {new Date().getFullYear()} Aurora LMS</span>
            <span>Frontend prototype for Moodle-inspired experiences</span>
          </div>
        </footer>
      </Providers>
    </NextIntlClientProvider>
  );
}
