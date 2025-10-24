import type { Config } from 'tailwindcss';
const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    './src/stories/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#2563eb',
          foreground: '#ffffff',
          muted: '#1e3a8a'
        }
      },
      borderRadius: {
        xl: '1rem'
      },
      boxShadow: {
        floating: '0 10px 40px rgba(15, 23, 42, 0.15)'
      }
    }
  },
  plugins: []
};

export default config;
