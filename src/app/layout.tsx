import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import './variables.css';
import 'react-toastify/dist/ReactToastify.css';
import Script from 'next/script';
import localFont from 'next/font/local';

// const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Puppy Ground',
  description: '유기견 분양, 반려동물 용품 판매',
  icons: {
    icon: '/favicon.ico'
  }
};

const globalFont = localFont({
  src: '../../../fonts/Pretendard-Regular.otf',
  variable: '--main-font'
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&libraries=services&autoload=false`;

  return (
    <html lang="ko">
      {/* <body className={inter.className} suppressHydrationWarning={true}> */}
      <body suppressHydrationWarning={true} className={globalFont.variable}>
        <Script strategy="beforeInteractive" src={KAKAO_SDK_URL} />
        {children}
      </body>
    </html>
  );
}
