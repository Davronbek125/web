import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#090c10',
};

export const metadata: Metadata = {
  title: 'KINOSTREAM UZ — Milliy va Xalqaro Kino Platformasi',
  description:
    'Netflix va Kinopoisk darajasidagi o‘zbek tilidagi eng yirik kino platformasi. 4K Ultra HD format, professional dublyaj, seriallar va yangi premyerlar.',
  keywords: [
    'kino',
    'serial',
    'ozbekcha kino',
    'tarjima kinolar',
    'striming',
    'netflix uzbekistan',
    '4k filmlar',
    'kinopoisk',
  ],
  authors: [{ name: 'KinoStream Team' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="uz"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#090c10] text-slate-100 selection:bg-red-600 selection:text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
