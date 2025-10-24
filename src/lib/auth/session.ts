import {cookies} from 'next/headers';
import {apiFetch} from '../api/fetcher';
import type {Session} from '@/types';

export async function getSession(): Promise<Session> {
  try {
    const token = cookies().get('aurora-session')?.value;
    const session = await apiFetch<Session>('/api/auth/session', {
      headers: token ? {Authorization: `Bearer ${token}`} : undefined,
      cache: 'no-store'
    });
    return session;
  } catch (error) {
    return {user: null, token: null};
  }
}
