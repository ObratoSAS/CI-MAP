import { describe, it, expect } from 'vitest';
import { createSdk } from './index';

describe('NovaLmsSdk', () => {
  it('creates an instance', () => {
    const sdk = createSdk({ baseUrl: 'http://localhost:3001/api/v1' });
    expect(sdk).toBeTruthy();
  });
});
