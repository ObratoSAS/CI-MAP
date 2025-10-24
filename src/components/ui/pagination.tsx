'use client';

import {Button} from './button';

interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({page, pageCount, onPageChange}: PaginationProps) => {
  const prevDisabled = page <= 1;
  const nextDisabled = page >= pageCount;

  return (
    <nav className="flex items-center justify-between gap-4" aria-label="Pagination">
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={prevDisabled}
        onClick={() => onPageChange(page - 1)}
      >
        ←
      </Button>
      <span className="text-sm text-slate-600 dark:text-slate-300">
        {page} / {pageCount}
      </span>
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={nextDisabled}
        onClick={() => onPageChange(page + 1)}
      >
        →
      </Button>
    </nav>
  );
};
