import type { Metadata } from 'next';
import { Chivo, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const chivo = Chivo({
  subsets: ['latin'],
  variable: '--font-chivo',
  weight: ['600', '700', '800'],
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['500', '600', '700'],
  display: 'swap',
});

import { Header } from '@/components/Header/Header';
import { BottomNav } from '@/components/BottomNav/BottomNav';

export const metadata: Metadata = {
  title: 'AutoEquity | Apex Capital',
  description: 'Marketplace de Ativos - Investimento Fracionado',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${chivo.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}>
      <body>
        <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Header />
          <div style={{ flex: 1, paddingBottom: '64px' }}>
            {children}
          </div>
          <BottomNav />
        </main>
      </body>
    </html>
  );
}
