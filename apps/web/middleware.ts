import createMiddleware from 'next-intl/middleware';

const locales = ['es', 'en'] as const;

export default createMiddleware({
  locales,
  defaultLocale: 'es',
});

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
};
