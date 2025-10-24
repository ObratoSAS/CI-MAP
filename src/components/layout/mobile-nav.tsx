'use client';

import {useTranslations} from 'next-intl';
import {Link, usePathname} from '@/lib/i18n/navigation';
import {Drawer} from '@/components/ui/drawer';
import {useUIStore} from '@/lib/store/ui';

export const MobileNav = () => {
  const isOpen = useUIStore((state) => state.isSidebarOpen);
  const close = useUIStore((state) => state.closeSidebar);
  const t = useTranslations('navigation');
  const pathname = usePathname();

  const links = [
    {href: '/', label: t('landing')},
    {href: '/catalog', label: t('catalog')},
    {href: '/dashboard', label: t('dashboard')},
    {href: '/calendar', label: t('calendar')},
    {href: '/messages', label: t('messages')},
    {href: '/admin', label: t('admin')}
  ];

  return (
    <Drawer open={isOpen} onOpenChange={(open) => (!open ? close() : undefined)} title={t('landing')}>
      <nav className="space-y-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={close}
            className={pathname === link.href ? 'text-brand font-medium' : 'text-slate-600 hover:text-brand'}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </Drawer>
  );
};
