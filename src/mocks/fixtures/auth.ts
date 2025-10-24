import type {Session} from '@/types';
import {users} from './users';

export const defaultSession: Session = {
  user: users[3],
  token: 'mock-token'
};
