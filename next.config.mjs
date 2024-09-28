// next.config.mjs
/** @type {import('next').NextConfig} */
import withBundleAnalyzer from '@next/bundle-analyzer';

const enableBundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  images: {
    domains: [process.env.NEXT_PUBLIC_IMAGE_DOMAINS],
  },
};

export default enableBundleAnalyzer(nextConfig);
