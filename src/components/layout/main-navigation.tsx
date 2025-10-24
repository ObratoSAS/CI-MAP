'use client';

import {useTranslations} from 'next-intl';
import {Link, usePathname} from '@/lib/i18n/navigation';
import {useSession} from '@/hooks/use-session';
import {Button} from '@/components/ui/button';
import {useUIStore} from '@/lib/store/ui';

export const MainNavigation = () => {
  const pathname = usePathname();
  const t = useTranslations('navigation');
  const {data} = useSession();
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);

  const links = [
    {href: '/', label: t('landing')},
    {href: '/catalog', label: t('catalog')},
    {href: '/dashboard', label: t('dashboard')},
    {href: '/calendar', label: t('calendar')},
    {href: '/messages', label: t('messages')}
  ];

  return (
    <nav className="flex flex-1 items-center justify-between">
      <div className="flex items-center gap-2">
        <Button type="button" variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
          ☰
        </Button>
        <span className="text-base font-semibold text-brand">Aurora</span>
      </div>
      <ul className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex dark:text-slate-300">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={pathname === link.href || (link.href !== '/' && pathname.startsWith(`${link.href}/`)) ? 'text-brand underline underline-offset-4' : 'hover:text-brand'}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-3">
        {data?.user ? (
          <span className="text-sm text-slate-600 dark:text-slate-300">{data.user.name}</span>
        ) : (
          <Link href="/auth/login" className="text-sm text-brand">
            {t('login')}
          </Link>
        )}
      </div>
    </nav>
  );
};
