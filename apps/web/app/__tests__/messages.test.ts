import { describe, it, expect } from 'vitest';
import es from '../../messages/es.json';
import en from '../../messages/en.json';

describe('messages', () => {
  it('should have matching feature keys between locales', () => {
    const esFeatures = Object.keys(es.landing.features);
    const enFeatures = Object.keys(en.landing.features);
    expect(esFeatures).toEqual(enFeatures);
  });
});
