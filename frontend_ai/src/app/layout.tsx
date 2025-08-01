import SidebarNavigation from '@/components/SidebarNavigation';
import { geistMono, geistSans } from '@/constant';
import { ThemeProvider } from '@/context/ThemeProvider';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Electronic Medical Records',
  description: 'Created by the Kadabite company',
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.className} ${geistMono.className}`}>
      <body className="antialiased">
        <ThemeProvider>
          <SidebarNavigation>{children}</SidebarNavigation>
        </ThemeProvider>
      </body>
    </html>
  );
}
