// next.config.ts

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/(.*)',
        has: [
          {
            type: 'host',
            value: 'freelancerspalace.com',
          },
        ],
        destination: 'https://freelancersverse.com/:path*',
        permanent: true,
      },
      {
        source: '/(.*)',
        has: [
          {
            type: 'host',
            value: 'www.freelancerspalace.com',
          },
        ],
        destination: 'https://freelancersverse.com/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

