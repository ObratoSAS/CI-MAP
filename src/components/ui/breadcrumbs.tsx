import {Link} from '@/lib/i18n/navigation';
import {cn} from '@/lib/utils/cn';

interface Crumb {
  href: string;
  label: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: Crumb[];
  className?: string;
}

export const Breadcrumbs = ({items, className}: BreadcrumbsProps) => (
  <nav aria-label="Breadcrumb" className={cn('text-sm text-slate-500', className)}>
    <ol className="flex flex-wrap items-center gap-2">
      {items.map((item, index) => (
        <li key={`${item.href}-${item.label}`} className="flex items-center gap-2">
          {index > 0 && <span className="text-slate-400">/</span>}
          {item.current ? (
            <span aria-current="page" className="font-medium text-slate-700 dark:text-slate-200">
              {item.label}
            </span>
          ) : (
            <Link className="hover:text-brand" href={item.href}>
              {item.label}
            </Link>
          )}
        </li>
      ))}
    </ol>
  </nav>
);
