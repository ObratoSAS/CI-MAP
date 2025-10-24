export const metadata = {
  title: 'Aurora LMS',
  description: 'Modern LMS experience inspired by Moodle 4.x'
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
