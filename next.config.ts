import type { NextConfig } from 'next'
import path from 'node:path'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  // Static export — emits a fully pre-rendered site to ./out for S3 + CloudFront.
  // No Node runtime at request time, so middleware, runtime image optimization
  // and server actions are off the table.
  output: 'export',
  // Required by `output: 'export'`. next/image renders as a plain <img> tag
  // pointing at the source file; no on-demand transform happens at runtime.
  // Files in public/ are served as-is.
  images: {
    unoptimized: true,
  },
  // S3 serves /about/index.html when the user requests /about/; without
  // trailingSlash a bare /about would 404 unless we add a CloudFront Function.
  trailingSlash: true,
  reactStrictMode: true,
  turbopack: {
    root: path.resolve(__dirname),
  },
  experimental: {
    optimizePackageImports: ['motion', 'lenis'],
  },
}

export default withNextIntl(nextConfig)
