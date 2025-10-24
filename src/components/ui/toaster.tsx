'use client';

import {useUIStore} from '@/lib/store/ui';
import {Button} from './button';

export const Toaster = () => {
  const toasts = useUIStore((state) => state.toasts);
  const dismiss = useUIStore((state) => state.dismissToast);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex w-full max-w-sm flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="status"
          className="rounded-lg border border-slate-200 bg-white p-4 shadow-lg dark:border-slate-700 dark:bg-slate-900"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{toast.title}</p>
              {toast.description && (
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{toast.description}</p>
              )}
            </div>
            <Button size="sm" variant="ghost" onClick={() => dismiss(toast.id)} aria-label="Dismiss notification">
              ×
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
