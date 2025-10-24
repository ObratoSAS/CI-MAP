'use client';

import * as React from 'react';
import {zodResolver} from '@hookform/resolvers/zod';
import {useTranslations} from 'next-intl';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Alert} from '@/components/ui/alert';

const schema = z.object({
  email: z.string().email()
});

type ForgotValues = z.infer<typeof schema>;

export const ForgotForm = () => {
  const t = useTranslations('auth');
  const form = useForm<ForgotValues>({
    resolver: zodResolver(schema),
    defaultValues: {email: ''}
  });
  const [sent, setSent] = React.useState(false);

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setSent(true);
  };

  const errors = form.formState.errors;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="email">
          {t('fields.email')}
        </label>
        <Input id="email" type="email" {...form.register('email')} autoComplete="email" />
        {errors.email && <p className="text-sm text-red-600">{t('errors.email')}</p>}
      </div>
      {sent && <Alert variant="success">{t('success.emailSent')}</Alert>}
      <Button type="submit" className="w-full">
        {t('forgot.submit')}
      </Button>
    </form>
  );
};
