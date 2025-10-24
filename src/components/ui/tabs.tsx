'use client';

import * as React from 'react';
import {cn} from '@/lib/utils/cn';

type Tab = {
  value: string;
  label: string;
  content: React.ReactNode;
};

interface TabsProps {
  tabs: Tab[];
  defaultValue: string;
  className?: string;
}

export const Tabs = ({tabs, defaultValue, className}: TabsProps) => {
  const [active, setActive] = React.useState(defaultValue);
  const current = tabs.find((tab) => tab.value === active) ?? tabs[0];

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setActive(tab.value)}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
              active === tab.value
                ? 'bg-brand text-brand-foreground shadow'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
        {current?.content}
      </div>
    </div>
  );
};
