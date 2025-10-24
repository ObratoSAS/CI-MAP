'use client';

import {useTransition} from 'react';
import {useLocale, useTranslations} from 'next-intl';
import {usePathname, useRouter} from '@/lib/i18n/navigation';
import {Button} from '@/components/ui/button';
import {locales} from '@/lib/i18n/config';

export const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('common.languages');
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-2">
      {locales.map((loc) => (
        <Button
          key={loc}
          type="button"
          size="sm"
          variant={locale === loc ? 'default' : 'ghost'}
          onClick={() =>
            startTransition(() => {
              router.replace({pathname}, {locale: loc});
            })
          }
          disabled={isPending}
        >
          {t(loc as 'en' | 'es')}
        </Button>
      ))}
    </div>
  );
};
