'use client';

import * as React from 'react';
import {zodResolver} from '@hookform/resolvers/zod';
import {useTranslations} from 'next-intl';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Alert} from '@/components/ui/alert';
import {useUIStore} from '@/lib/store/ui';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

type LoginValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const t = useTranslations('auth');
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {email: '', password: ''}
  });
  const pushToast = useUIStore((state) => state.pushToast);
  const [error, setError] = React.useState<string | null>(null);

  const onSubmit = async (values: LoginValues) => {
    setError(null);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(values)
      });
      if (!response.ok) {
        throw new Error('login-error');
      }
      pushToast({title: t('login.title'), description: t('success.signedIn')});
    } catch (err) {
      setError(t('errors.invalidCredentials'));
    }
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
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="password">
          {t('fields.password')}
        </label>
        <Input id="password" type="password" {...form.register('password')} autoComplete="current-password" />
        {errors.password && <p className="text-sm text-red-600">{t('errors.passwordLength')}</p>}
      </div>
      {error && <Alert variant="destructive">{error}</Alert>}
      <Button type="submit" className="w-full">
        {t('login.submit')}
      </Button>
    </form>
  );
};
