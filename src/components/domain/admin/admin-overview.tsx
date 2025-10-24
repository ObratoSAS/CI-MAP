'use client';

import {useTranslations} from 'next-intl';
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import {Button} from '@/components/ui/button';

interface AdminOverviewProps {
  stats: {label: string; value: string; action: string}[];
}

export const AdminOverview = ({stats}: AdminOverviewProps) => {
  const t = useTranslations('admin');

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardHeader>
            <CardTitle>{stat.label}</CardTitle>
            <CardDescription>{t('title')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-3xl font-semibold text-slate-900 dark:text-slate-100">{stat.value}</p>
            <Button type="button" variant="outline">
              {stat.action}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
