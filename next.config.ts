import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '4.5mb',
    },
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // These modules are optional dependencies of Genkit and are not needed in production,
      // but Next.js tries to bundle them. This explicitly excludes them.
      config.externals.push('@opentelemetry/exporter-jaeger');
      config.externals.push('@genkit-ai/firebase');
    }
    return config;
  },
};

export default nextConfig;
