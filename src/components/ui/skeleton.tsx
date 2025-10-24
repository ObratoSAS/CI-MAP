import {cn} from '@/lib/utils/cn';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Skeleton = ({className, ...props}: SkeletonProps) => (
  <div className={cn('animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800', className)} {...props} />
);
