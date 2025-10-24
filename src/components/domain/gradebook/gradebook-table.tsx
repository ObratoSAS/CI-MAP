'use client';

import * as React from 'react';
import {useTranslations} from 'next-intl';
import {DataTable} from '@/components/ui/data-table';
import {Button} from '@/components/ui/button';
import type {GradeItem, User} from '@/types';

interface GradebookProps {
  grades: GradeItem[];
  students: User[];
}

export const GradebookTable = ({grades, students}: GradebookProps) => {
  const t = useTranslations('gradebook');
  const data = students.map((student) => {
    const studentGrades = grades.filter((grade) => grade.userId === student.id);
    const average =
      studentGrades.reduce((total, grade) => total + grade.score / grade.maxScore, 0) /
      Math.max(studentGrades.length, 1);
    return {
      id: student.id,
      name: student.name,
      average: `${Math.round(average * 100)}%`
    };
  });

  const columns = [
    {accessor: 'name' as const, header: t('columns.student')},
    {accessor: 'average' as const, header: t('columns.average')}
  ];

  const exportCSV = () => {
    const header = columns.map((column) => column.header).join(',');
    const rows = data.map((row) => `${row.name},${row.average}`).join('\n');
    const csv = `${header}\n${rows}`;
    const blob = new Blob([csv], {type: 'text/csv'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'gradebook.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{t('title')}</h2>
        <Button type="button" variant="outline" onClick={exportCSV}>
          {t('filters.export')}
        </Button>
      </div>
      <DataTable data={data} columns={columns} searchable="name" />
    </div>
  );
};
