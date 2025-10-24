import { locales, type Locale } from '../i18n';

export default async function getRequestConfig() {
  return {
    locales,
    defaultLocale: 'es' as Locale,
  };
}
