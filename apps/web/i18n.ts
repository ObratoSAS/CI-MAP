export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];

export function getMessages(locale: Locale) {
  switch (locale) {
    case 'es':
      return import('./messages/es.json').then((mod) => mod.default);
    case 'en':
      return import('./messages/en.json').then((mod) => mod.default);
    default:
      return import('./messages/es.json').then((mod) => mod.default);
  }
}
