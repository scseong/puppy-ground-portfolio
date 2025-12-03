/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

const nextConfig = {
  reactStrictMode: false,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      },
      {
        protocol: 'http',
        hostname: 'k.kakaocdn.net',
        pathname: '/**'
      },
      {
        protocol: 'http',
        hostname: 'openapi.animal.go.kr',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'phcdhdnsnzcqiqgptczm.supabase.co',
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

module.exports = withBundleAnalyzer(nextConfig);
