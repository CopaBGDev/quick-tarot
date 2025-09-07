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
      // Ovi moduli su opcione zavisnosti Genkita i nisu potrebni u produkciji,
      // ali Next.js pokušava da ih uključi. Ovim ih eksplicitno isključujemo.
      config.externals.push('@opentelemetry/exporter-jaeger');
      config.externals.push('@genkit-ai/firebase');
    }
    return config;
  },
};

export default nextConfig;
