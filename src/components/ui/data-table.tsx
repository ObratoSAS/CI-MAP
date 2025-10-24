'use client';

import * as React from 'react';
import {Input} from './input';
import {Table, THead, TBody, TR, TH, TD} from './table';

interface Column<T> {
  accessor: keyof T;
  header: string;
  render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchable?: keyof T;
}

export function DataTable<T extends Record<string, unknown>>({data, columns, searchable}: DataTableProps<T>) {
  const [search, setSearch] = React.useState('');
  const [sortKey, setSortKey] = React.useState<keyof T | null>(null);
  const [direction, setDirection] = React.useState<'asc' | 'desc'>('asc');

  const filtered = React.useMemo(() => {
    const filteredData = !searchable || search.length === 0
      ? data
      : data.filter((item) =>
          `${item[searchable] ?? ''}`.toLowerCase().includes(search.toLowerCase())
        );

    if (!sortKey) return filteredData;

    return [...filteredData].sort((a, b) => {
      const valueA = `${a[sortKey] ?? ''}`.toLowerCase();
      const valueB = `${b[sortKey] ?? ''}`.toLowerCase();
      if (valueA < valueB) return direction === 'asc' ? -1 : 1;
      if (valueA > valueB) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, direction, search, searchable, sortKey]);

  return (
    <div className="space-y-4">
      {searchable && (
        <Input
          aria-label="Search"
          placeholder="Search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      )}
      <Table>
        <THead>
          <TR>
            {columns.map((column) => (
              <TH
                key={String(column.accessor)}
                onClick={() => {
                  if (sortKey === column.accessor) {
                    setDirection(direction === 'asc' ? 'desc' : 'asc');
                  } else {
                    setSortKey(column.accessor);
                    setDirection('asc');
                  }
                }}
                className="cursor-pointer select-none"
              >
                {column.header}
              </TH>
            ))}
          </TR>
        </THead>
        <TBody>
          {filtered.map((row) => (
            <TR key={String(row[columns[0].accessor])}>
              {columns.map((column) => (
                <TD key={String(column.accessor)}>
                  {column.render ? column.render(row) : `${row[column.accessor] ?? ''}`}
                </TD>
              ))}
            </TR>
          ))}
          {filtered.length === 0 && (
            <TR>
              <TD colSpan={columns.length} className="py-6 text-center text-slate-500">
                No data available
              </TD>
            </TR>
          )}
        </TBody>
      </Table>
    </div>
  );
}
