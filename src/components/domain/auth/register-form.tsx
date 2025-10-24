'use client';

import * as React from 'react';
import {zodResolver} from '@hookform/resolvers/zod';
import {useTranslations} from 'next-intl';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {Input} from '@/components/ui/input';
import {Select} from '@/components/ui/select';
import {Button} from '@/components/ui/button';
import {Alert} from '@/components/ui/alert';
import {useUIStore} from '@/lib/store/ui';

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['student', 'teacher', 'admin'])
});

type RegisterValues = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const t = useTranslations('auth');
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {name: '', email: '', password: '', role: 'student'}
  });
  const pushToast = useUIStore((state) => state.pushToast);
  const [success, setSuccess] = React.useState(false);

  const onSubmit = async (values: RegisterValues) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    setSuccess(true);
    pushToast({title: t('success.accountCreated'), description: values.name});
    form.reset({name: '', email: '', password: '', role: 'student'});
  };

  const errors = form.formState.errors;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="name">
          {t('fields.name')}
        </label>
        <Input id="name" {...form.register('name')} autoComplete="name" />
        {errors.name && <p className="text-sm text-red-600">{t('errors.required')}</p>}
      </div>
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
        <Input id="password" type="password" {...form.register('password')} autoComplete="new-password" />
        {errors.password && <p className="text-sm text-red-600">{t('errors.passwordLength')}</p>}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="role">
          {t('fields.role')}
        </label>
        <Select id="role" value={form.watch('role')} onChange={(event) => form.setValue('role', event.target.value as RegisterValues['role'])}>
          <option value="student">{t('roles.student')}</option>
          <option value="teacher">{t('roles.teacher')}</option>
          <option value="admin">{t('roles.admin')}</option>
        </Select>
      </div>
      {success && <Alert variant="success">{t('success.accountCreated')}</Alert>}
      <Button type="submit" className="w-full">
        {t('register.submit')}
      </Button>
    </form>
  );
};
