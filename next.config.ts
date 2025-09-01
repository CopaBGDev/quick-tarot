import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // Uklonjeno remotePatterns da bi se dozvolile lokalne slike
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '4.5mb',
    },
  },
};

export default nextConfig;
