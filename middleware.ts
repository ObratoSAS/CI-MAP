import createMiddleware from 'next-intl/middleware';
import {defaultLocale, locales} from './src/lib/i18n/config';

export default createMiddleware({
  locales,
  defaultLocale,
  localeDetection: true
});

export const config = {
  matcher: ['/((?!_next|.*\..*).*)']
};
