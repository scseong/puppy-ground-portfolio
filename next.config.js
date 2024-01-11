/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mbcnyqlazlnrnrncctns.supabase.co',
        pathname: '/**'
      }
    ]
  }
};

module.exports = nextConfig;
