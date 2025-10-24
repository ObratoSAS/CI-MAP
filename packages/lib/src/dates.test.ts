import { describe, it, expect } from 'vitest';
import { formatDateISO } from './dates';

describe('formatDateISO', () => {
  it('formats date in ISO string with timezone', () => {
    const formatted = formatDateISO('2024-01-10T12:00:00Z', 'UTC');
    expect(formatted).toContain('2024-01-10');
  });
});
