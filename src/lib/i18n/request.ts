import {getRequestConfig} from 'next-intl/server';
import {defaultLocale, locales, type Locale} from './config';

async function loadMessages(locale: Locale) {
  switch (locale) {
    case 'en':
      return (await import('../../messages/en')).default;
    case 'es':
    default:
      return (await import('../../messages/es')).default;
  }
}

export default getRequestConfig(async ({locale}) => {
  const normalized = locales.includes(locale as Locale)
    ? (locale as Locale)
    : defaultLocale;

  return {
    locale: normalized,
    messages: await loadMessages(normalized)
  };
});
