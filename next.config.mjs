import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts');

const nextConfig = withNextIntl({
  reactStrictMode: true,
  experimental: {
    appDir: true
  }
});

export default nextConfig;
