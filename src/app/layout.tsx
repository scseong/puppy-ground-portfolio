import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import './variables.css';
import ReactQueryProviders from '@/utils/ReactQueryProviders';
import Header from './_components/layout/Header';
import Footer from './_components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Puppy Ground',
  description: '유기견 분양, 반려동물 용품 판매'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <ReactQueryProviders>
          <Header />
          {children}
          <Footer />
        </ReactQueryProviders>
      </body>
    </html>
  );
}
