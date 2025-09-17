
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '4.5mb',
    },
    serverComponentsExternalPackages: ['@genkit-ai/googleai'],
  },
};

export default nextConfig;
