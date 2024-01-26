/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['www.animal.go.kr'],
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/*'
      },
      {
        protocol: 'https',
        hostname: 'mbcnyqlazlnrnrncctns.supabase.co',
        pathname: '/**'
      },
      {
        protocol: 'http',
        hostname: 'k.kakaocdn.net',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
        pathname: '/**'
      }
    ]
  }
  // async rewrites() {
  //   return [
  //     {
  //       destination: `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&libraries=services&autoload=false`,
  //       source: '/kakaomap'
  //     }
  //   ];
  // }
};

module.exports = nextConfig;
