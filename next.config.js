/** @type {import('next').NextConfig} */
const nextConfig = {
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
      }
    ]
  }
};

module.exports = nextConfig;
