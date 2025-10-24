const locales = ['es', 'en'];

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  i18n: {
    locales,
    defaultLocale: 'es',
  },
  transpilePackages: ['@novalms/ui', '@novalms/sdk', '@novalms/lib'],
  env: {
    NEXT_PUBLIC_AVAILABLE_LOCALES: locales.join(','),
  },
};

export default nextConfig;
