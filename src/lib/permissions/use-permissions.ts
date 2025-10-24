'use client';

import {useMemo} from 'react';
import {useSession} from '@/hooks/use-session';
import type {Role} from '@/types';

type Capability =
  | 'courses:create'
  | 'courses:grade'
  | 'courses:view'
  | 'admin:manage'
  | 'messages:send'
  | 'activities:submit';

const permissionsMap: Record<Role, Capability[]> = {
  admin: ['courses:create', 'courses:grade', 'courses:view', 'admin:manage', 'messages:send', 'activities:submit'],
  teacher: ['courses:create', 'courses:grade', 'courses:view', 'messages:send'],
  student: ['courses:view', 'messages:send', 'activities:submit'],
  guest: ['courses:view']
};

export function usePermissions() {
  const {data} = useSession();

  return useMemo(() => {
    const role: Role = data?.user?.role ?? 'guest';
    const capabilities = permissionsMap[role] ?? [];

    return {
      role,
      can: (capability: Capability) => capabilities.includes(capability),
      capabilities
    };
  }, [data]);
}
