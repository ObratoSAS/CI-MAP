import {cn} from '@/lib/utils/cn';

export const Table = ({className, ...props}: React.HTMLAttributes<HTMLTableElement>) => (
  <div className="w-full overflow-x-auto">
    <table
      className={cn(
        'min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800',
        className
      )}
      {...props}
    />
  </div>
);

export const THead = ({className, ...props}: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className={cn('bg-slate-50 dark:bg-slate-900', className)} {...props} />
);

export const TBody = ({className, ...props}: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody className={cn('divide-y divide-slate-200 dark:divide-slate-800', className)} {...props} />
);

export const TR = ({className, ...props}: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr className={cn('hover:bg-slate-50 dark:hover:bg-slate-900', className)} {...props} />
);

export const TH = ({className, ...props}: React.ThHTMLAttributes<HTMLTableCellElement>) => (
  <th className={cn('px-4 py-3 text-left font-semibold uppercase tracking-wide text-slate-500', className)} {...props} />
);

export const TD = ({className, ...props}: React.TdHTMLAttributes<HTMLTableCellElement>) => (
  <td className={cn('px-4 py-3 text-slate-700 dark:text-slate-200', className)} {...props} />
);
