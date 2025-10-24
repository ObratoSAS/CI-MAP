'use client';

import * as React from 'react';
import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import {Select} from '@/components/ui/select';
import {Input} from '@/components/ui/input';
import {Pagination} from '@/components/ui/pagination';
import {Badge} from '@/components/ui/badge';
import {Link} from '@/lib/i18n/navigation';
import type {Course} from '@/types';

interface CatalogViewProps {
  courses: Course[];
}

export const CatalogView = ({courses}: CatalogViewProps) => {
  const t = useTranslations('catalog');
  const actions = useTranslations('common.actions');
  const [search, setSearch] = React.useState('');
  const [category, setCategory] = React.useState('all');
  const [modality, setModality] = React.useState('all');
  const [price, setPrice] = React.useState('all');
  const [page, setPage] = React.useState(1);

  const filtered = React.useMemo(() => {
    const result = courses.filter((course) => {
      const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'all' || course.categoryId === category;
      const matchesModality = modality === 'all' || course.modality === modality;
      const matchesPrice = price === 'all' || course.price === price;
      return matchesSearch && matchesCategory && matchesModality && matchesPrice;
    });
    return result;
  }, [category, courses, modality, price, search]);

  const pageSize = 6;
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  React.useEffect(() => {
    setPage(1);
  }, [search, category, modality, price]);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-4">
        <Input
          placeholder={t('search')}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="md:col-span-2"
        />
        <Select value={category} onChange={(event) => setCategory(event.target.value)} aria-label={t('filters.category')}>
          <option value="all">{t('filters.category')}</option>
          {[...new Set(courses.map((course) => course.categoryId))].map((value) => (
            <option key={value} value={value}>
              {value.replace('category-', '')}
            </option>
          ))}
        </Select>
        <Select value={modality} onChange={(event) => setModality(event.target.value)} aria-label={t('filters.modality')}>
          <option value="all">{t('filters.modality')}</option>
          <option value="online">{t('modality.online')}</option>
          <option value="hybrid">{t('modality.hybrid')}</option>
          <option value="onsite">{t('modality.onsite')}</option>
        </Select>
        <Select value={price} onChange={(event) => setPrice(event.target.value)} aria-label={t('filters.price')}>
          <option value="all">{t('filters.price')}</option>
          <option value="free">{t('price.free')}</option>
          <option value="paid">{t('price.paid')}</option>
        </Select>
      </div>
      {filtered.length === 0 && <p className="text-slate-500">{t('empty')}</p>}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {paginated.map((course) => (
          <Card key={course.id} className="flex h-full flex-col overflow-hidden">
            <div className="relative h-40 w-full overflow-hidden">
              <Image src={course.cover ?? '/images/placeholder.svg'} alt={course.title} fill className="object-cover" sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw" />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center justify-between gap-2">
                <span>{course.title}</span>
                <Badge variant="outline">{t(`modality.${course.modality}` as const)}</Badge>
              </CardTitle>
              <CardDescription>{course.summary}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto space-y-4">
              <div className="flex flex-wrap gap-2">
                {course.tags?.map((tag) => (
                  <Badge key={tag} variant="outline">
                    #{tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
                <span>{course.price === 'free' ? t('price.free') : t('price.paid')}</span>
                <Link className="text-brand" href={`/courses/${course.id}`}>
                  {actions('viewAll')}
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
    </div>
  );
};
