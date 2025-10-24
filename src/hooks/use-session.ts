'use client';

import {useQuery} from '@tanstack/react-query';
import type {Session} from '@/types';
import {queryKeys} from '@/lib/api/queries';

async function fetchSession(): Promise<Session> {
  const res = await fetch('/api/auth/session');
  if (!res.ok) {
    throw new Error('session-error');
  }
  return (await res.json()) as Session;
}

export function useSession() {
  return useQuery({
    queryKey: queryKeys.session,
    queryFn: fetchSession,
    staleTime: 60 * 1000
  });
}
