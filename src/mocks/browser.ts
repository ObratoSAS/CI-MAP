import {setupWorker} from 'msw/browser';
import {handlers} from './handlers';

export const worker = setupWorker(...handlers);

export async function enableMocking() {
  if (typeof window === 'undefined') return;
  if (process.env.NEXT_PUBLIC_API_MOCKING === 'disabled') return;
  await worker.start({onUnhandledRequest: 'bypass'});
}
