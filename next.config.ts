import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === 'production';
const enableChallenges = process.env.ENABLE_CHALLENGES === 'true';

const nextConfig: NextConfig = {
  // Hanya export static untuk production tanpa challenges
  output: isProduction && !enableChallenges ? 'export' : undefined,
  distDir: 'dist',
  
  images: {
    unoptimized: true,
  },
  
  trailingSlash: true,
  
  // Security Headers untuk Production
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https:; frame-ancestors 'none';",
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
    ];
  },

  // Redirects untuk security
  async redirects() {
    if (!isProduction) return [];
    
    return [
      {
        source: '/:path*',
        has: [{ type: 'header' as const, key: 'x-forwarded-proto', value: 'http' }],
        destination: 'https://:path*',
        permanent: true,
      }
    ];
  },
};

export default nextConfig;
