import {unstable_setRequestLocale} from 'next-intl/server';
import {MessagesPanel} from '@/components/domain/messages/messages-panel';
import type {Locale} from '@/types';
import {threads, messages} from '@/mocks/fixtures/messages';
import {users} from '@/mocks/fixtures/users';

export default async function MessagesPage({params}: {params: {locale: Locale}}) {
  unstable_setRequestLocale(params.locale);
  return <MessagesPanel threads={threads} messages={messages} users={users} />;
}
