import {cn} from '@/lib/utils/cn';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive' | 'success';
}

export const Alert = ({className, variant = 'default', ...props}: AlertProps) => {
  const base = 'rounded-lg border px-4 py-3 text-sm';
  const variants: Record<NonNullable<AlertProps['variant']>, string> = {
    default: 'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200',
    destructive: 'border-red-500 bg-red-50 text-red-700 dark:border-red-700 dark:bg-red-950/50 dark:text-red-200',
    success: 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:border-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-200'
  };
  return <div className={cn(base, variants[variant], className)} {...props} />;
};
