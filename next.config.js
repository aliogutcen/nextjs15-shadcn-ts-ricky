/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rickandmortyapi.com',
        pathname: '/api/character/avatar/**'
      }
    ]
  },
  // For full SSR experience
  experimental: {
    // Ensures all pages are generated dynamically
    serverActions: {
      allowedOrigins:
        process.env.NODE_ENV === 'development'
          ? [
              'localhost:3000',
              'localhost:3001',
              'localhost:3002',
              'localhost:3003',
              'localhost:3004'
            ]
          : ['your-production-domain.com', 'www.your-production-domain.com']
    }
  }
}

export default nextConfig
