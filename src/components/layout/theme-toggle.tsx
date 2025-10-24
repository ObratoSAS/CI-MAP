'use client';

import {useTranslations} from 'next-intl';
import {useTheme} from 'next-themes';
import {Button} from '@/components/ui/button';

export const ThemeToggle = () => {
  const {setTheme, theme, resolvedTheme} = useTheme();
  const t = useTranslations('common.theme');

  const cycleTheme = () => {
    const current = theme ?? resolvedTheme ?? 'system';
    if (current === 'light') setTheme('dark');
    else if (current === 'dark') setTheme('system');
    else setTheme('light');
  };

  const label = theme ?? resolvedTheme ?? 'system';

  return (
    <Button type="button" variant="ghost" size="sm" onClick={cycleTheme} aria-label={t(label as 'light' | 'dark' | 'system')}>
      {t(label as 'light' | 'dark' | 'system')}
    </Button>
  );
};
