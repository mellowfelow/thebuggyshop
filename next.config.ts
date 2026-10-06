import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  devIndicators: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'drive.usercontent.google.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Combined model listings were split into one product per model; keep the old URLs working.
  async redirects() {
    return [
      { source: '/shop/off-road-buggies/can-am-maverick-commander-defender-limited-side-by-side/', destination: '/shop/off-road-buggies/can-am-maverick-side-by-side/', permanent: true },
      { source: '/shop/off-road-buggies/cfmoto-uforce-u10-pro-zforce-side-by-side/', destination: '/shop/off-road-buggies/cfmoto-uforce-u10-pro-side-by-side/', permanent: true },
      { source: '/shop/off-road-buggies/yamaha-wolverine-x2-850-rmax2-1000-side-by-side/', destination: '/shop/off-road-buggies/yamaha-wolverine-x2-850-1000-side-by-side/', permanent: true },
    ];
  },
  transpilePackages: ['motion'],
  webpack: (config, {dev}) => {
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
};

export default nextConfig;
