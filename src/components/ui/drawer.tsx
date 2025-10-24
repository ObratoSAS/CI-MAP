'use client';

import * as React from 'react';

interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  position?: 'left' | 'right';
}

export const Drawer = ({open, onOpenChange, title, children, position = 'left'}: DrawerProps) => {
  React.useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onOpenChange(false);
      }
    };
    if (open) {
      document.addEventListener('keydown', handler);
    }
    return () => document.removeEventListener('keydown', handler);
  }, [open, onOpenChange]);

  if (!open) return null;

  const asideClasses =
    'h-full w-full max-w-md border-slate-200 bg-white p-6 shadow-xl transition-transform dark:border-slate-800 dark:bg-slate-950';

  return (
    <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true">
      {position === 'right' && <div className="flex-1 bg-slate-900/60" onClick={() => onOpenChange(false)} />}
      <aside className={position === 'left' ? `${asideClasses} border-r` : `${asideClasses} border-l`}>
        <header className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
          <button
            type="button"
            className="text-slate-500 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            onClick={() => onOpenChange(false)}
          >
            ×
          </button>
        </header>
        <div className="space-y-4 overflow-y-auto">{children}</div>
      </aside>
      {position === 'left' && <div className="flex-1 bg-slate-900/60" onClick={() => onOpenChange(false)} />}
    </div>
  );
};
