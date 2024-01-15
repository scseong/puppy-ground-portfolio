/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mbcnyqlazlnrnrncctns.supabase.co',
        pathname: '/**'
      }
    ],
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/*'
      }
    ]
  }
};

module.exports = nextConfig;

