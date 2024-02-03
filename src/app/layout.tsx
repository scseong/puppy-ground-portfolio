import type { Metadata } from 'next';
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
  src: [
    {
      path: './assets/fonts/Pretendard-Regular.woff2',
      weight: '400'
    },
    {
      path: './assets/fonts/Pretendard-Medium.woff2',
      weight: '500'
    },
    {
      path: './assets/fonts/Pretendard-Bold.woff2',
      weight: '700'
    },
    {
      path: './assets/fonts/Pretendard-ExtraBold.woff2',
      weight: '800'
    }
  ],
  variable: '--main-font',
  display: 'swap'
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const KAKAO_SDK_URL = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services&autoload=false`;

  return (
    <html lang="ko" className={globalFont.variable}>
      {/* <body className={inter.className} suppressHydrationWarning={true}> */}
      <body suppressHydrationWarning={true}>
        <Script strategy="beforeInteractive" src={KAKAO_SDK_URL} />
        {children}
      </body>
    </html>
  );
}
